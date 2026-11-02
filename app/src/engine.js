// Pure game logic for "Gnothi": dates, streaks, spaced review, polytonic answer checking, question
// builders for every item kind, Θέμα της ημέρας, Στάδιο (speed round), Διαγώνισμα, Athenian ranks.
// No DOM access, so `npm test` can check everything.
// Content comes in as an array of unit objects (see CONTENT_SCHEMA.md); `indexCourse` makes it queryable.

const Engine = (() => {
  // ---------- constants ----------
  const EXAM_DATE = "2027-05-31"; // Monday 31 May 2027, 08:30 (ministry schedule of 11.09.2026 as republished; confirm in spring)
  const EXAM_TIME = "08:30";
  const REVIEW_CAP_DAYS_BEFORE = 7; // from May on, no review is scheduled later than exam - 7 days (2027-05-24)
  const SECTION_MARKS = { "Α1": 10, "Β1": 10, "Β2": 10, "Β3": 10, "Β4": 10, "Γ1": 20, "Γ2": 10, "Γ3": 10, "Γ4": 10 };
  const SECTIONS = Object.keys(SECTION_MARKS);
  const STADION_MS = 20000;
  const SITTING_WEIGHT = 12; // estimated graded steps per sitting («συνέχεια»)
  const UNIT_REFS = ["Α.1", "Α.2", "Α.3", "Β.4", "Β.5", "Β.6", "Β.7", "Γ.8", "Γ.9", "Γ.10", "Γ.11", "Δ.12", "Δ.13", "Δ.14", "Δ.15", "Ε.16", "Ε.17", "Ε.18", "ΣΤ.21"];

  // ---------- dates (local calendar days as "YYYY-MM-DD") ----------
  function dayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  function parseDay(key) {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d, 12); // noon avoids DST edge cases
  }
  function addDays(key, n) {
    const d = parseDay(key);
    d.setDate(d.getDate() + n);
    return dayKey(d);
  }
  function daysBetween(a, b) {
    return Math.round((parseDay(b) - parseDay(a)) / 86400000);
  }
  /** Monday of the week that holds `key`. */
  function weekKey(key) {
    const d = parseDay(key);
    const dow = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - dow);
    return dayKey(d);
  }
  function isWeekend(key) {
    const dow = parseDay(key).getDay();
    return dow === 0 || dow === 6;
  }
  function weekday(key) { return parseDay(key).getDay(); } // 0 = Sunday
  /** Weekdays strictly between a and b. */
  function missedWeekdays(a, b) {
    let n = 0;
    for (let k = addDays(a, 1); k < b; k = addDays(k, 1)) if (!isWeekend(k)) n++;
    return n;
  }
  const GR_DAYS = ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"];
  const GR_MONTHS_GEN = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"];
  function fmtDayGr(key) {
    const d = parseDay(key);
    return `${GR_DAYS[d.getDay()]} ${d.getDate()} ${GR_MONTHS_GEN[d.getMonth()]}`;
  }

  // ---------- state ----------
  const GOALS = [
    { xp: 10, id: "pais", label: "Παῖς", sub: "1 μάθημα · ~4′" },
    { xp: 20, id: "ephebos", label: "Ἔφηβος", sub: "2 μαθήματα · ~8′" },
    { xp: 40, id: "hoplites", label: "Ὁπλίτης", sub: "4 μαθήματα · ~15′" },
  ];
  const MAX_FREEZES = 2;
  const OBOLS_PER_DRACHMA = 6;

  function freshState() {
    return {
      v: 1,
      onboarded: false,
      name: "",
      goal: 10,
      sound: true,
      examDate: EXAM_DATE,
      fakelos: "Β.4", // «στο σχολείο είμαστε στην ενότητα …» (Φάκελος code), drives the swipe set and the text drills
      xp: 0, // οβολοί
      days: {}, // dayKey -> xp earned that day
      streak: 0,
      bestStreak: 0,
      lastDay: null,
      freezes: 1, // ἐκεχειρίαι
      freezeWeek: null,
      done: {}, // lessonId | roundupId -> { perfect, at }
      sittings: {}, // lessonId -> sittings completed so far
      items: {}, // itemId -> { box, due, right, wrong }
      stadionBest: 0,
      practices: 0,
      dailies: {}, // dayKey -> { section, score, marks }
      dailyStreak: 0,
      mocks: [], // { at, score, marks, sections: {Α1: [score, marks], ...} }
      answered: 0,
      correct: 0,
      badges: {}, // badgeId -> dayKey
      updatedAt: 0,
    };
  }

  /**
   * Record activity on `today` and update the streak («σερί»).
   * Weekends never break a streak. A missed weekday uses a freeze («ἐκεχειρία») if one is left.
   * One free freeze per week (capped at MAX_FREEZES), +1 every 7-day streak.
   */
  function touchStreak(s, today) {
    const out = { streakUp: false, usedFreeze: 0, reset: false };
    const wk = weekKey(today);
    if (s.freezeWeek !== wk) {
      s.freezeWeek = wk;
      if (s.freezes < 1) s.freezes = 1;
    }
    if (s.lastDay === today) return out;
    if (!s.lastDay || s.lastDay > today) {
      s.streak = 1;
    } else {
      const missed = missedWeekdays(s.lastDay, today);
      if (missed === 0) s.streak += 1;
      else if (missed <= s.freezes) { s.freezes -= missed; out.usedFreeze = missed; s.streak += 1; }
      else { s.streak = 1; out.reset = true; }
    }
    out.streakUp = true;
    s.lastDay = today;
    if (s.streak > s.bestStreak) s.bestStreak = s.streak;
    if (s.streak > 0 && s.streak % 7 === 0 && s.freezes < MAX_FREEZES) s.freezes += 1;
    return out;
  }
  function liveStreak(s, today) {
    if (!s.lastDay) return 0;
    if (s.lastDay === today) return s.streak;
    const missed = missedWeekdays(s.lastDay, today);
    return missed <= s.freezes ? s.streak : 0;
  }
  function addXp(s, today, n) {
    s.xp += n;
    s.days[today] = (s.days[today] || 0) + n;
  }
  function weekXp(s, today) {
    const start = weekKey(today);
    let t = 0;
    for (const [k, v] of Object.entries(s.days)) if (k >= start && k <= today) t += v;
    return t;
  }
  /** οβολοί shown as δραχμές + οβολοί on the profile (6 οβολοί = 1 δραχμή). */
  function drachmas(xp) { return { drachmas: Math.floor(xp / OBOLS_PER_DRACHMA), obols: xp % OBOLS_PER_DRACHMA }; }

  // ---------- exam countdown ----------
  function examDate(s) { return (s && /^\d{4}-\d{2}-\d{2}$/.test(s.examDate || "") ? s.examDate : EXAM_DATE); }
  /** Days left and the study phase, drawn as the Ιερά Οδός. */
  function countdown(s, today) {
    const date = examDate(s);
    const days = daysBetween(today, date);
    const phase = days > 120 ? { id: "foundations", label: "Θεμέλια", sub: "Μάθε τις μονάδες" }
      : days > 30 ? { id: "walls", label: "Τείχη", sub: "Επανάληψη και διαγωνίσματα" }
      : days >= 0 ? { id: "panathenaia", label: "Παναθήναια", sub: "Μόνο επανάληψη και Θέμα της ημέρας" }
      : { id: "after", label: "Μετά την εξέταση", sub: "Γνῶθι σαυτόν." };
    return { days, date, label: fmtDayGr(date), time: EXAM_TIME, phase };
  }

  // ---------- spaced review (Leitner boxes) ----------
  const INTERVALS = [1, 3, 7, 14, 30, 60]; // days until the next review for box 1..6
  function reviewCap(s) { return addDays(examDate(s), -REVIEW_CAP_DAYS_BEFORE); }
  function capDue(s, due, today) {
    const cap = reviewCap(s);
    if (due <= cap) return due;
    return cap > today ? cap : addDays(today, 1);
  }
  /**
   * The same headword is drilled in several units (the vocabulary of a reference text, then again in
   * the unseen core). Progress for such a word is kept under ONE id, the first occurrence in course
   * order, so review, the Στάδιο and the counters never double count it.
   */
  const CANON = new Map();
  const canon = (id) => CANON.get(id) || id;
  function learn(s, id, today) {
    id = canon(id);
    if (!s.items[id]) s.items[id] = { box: 1, due: capDue(s, addDays(today, INTERVALS[0]), today), right: 0, wrong: 0 };
  }
  /**
   * Grade one answer. A miss drops the item to box 1. `weight: 0.5` (self-graded swipe cards)
   * drops only one box on a miss and still promotes on a hit.
   */
  function grade(s, id, correct, today, { weight = 1 } = {}) {
    id = canon(id);
    learn(s, id, today);
    const it = s.items[id];
    if (correct) {
      it.right += 1;
      if (it.due <= today) it.box = Math.min(it.box + 1, INTERVALS.length);
    } else {
      it.wrong += 1;
      it.box = weight < 1 ? Math.max(1, it.box - 1) : 1;
    }
    it.due = capDue(s, addDays(today, INTERVALS[it.box - 1]), today);
  }
  function dueItems(s, today) {
    return Object.entries(s.items)
      .filter(([, v]) => v.due <= today)
      .sort((a, b) => (a[1].due < b[1].due ? -1 : a[1].due > b[1].due ? 1 : a[1].box - b[1].box))
      .map(([k]) => k);
  }
  /** Τετράδιο λαθών: items missed at least twice, worst first. */
  function notebookItems(s) {
    return Object.entries(s.items).filter(([, v]) => v.wrong >= 2).sort((a, b) => b[1].wrong - a[1].wrong || a[1].box - b[1].box).map(([k]) => k);
  }

  // ---------- source labels ----------
  /**
   * Cards carry a `src` written for the authors (it may name research notes such as «syntax.md §3.2»).
   * The student sees only the part that means something to her: the school book, the Panhellenic
   * year, the Φάκελος unit. File names and section numbers of our notes are dropped.
   */
  function cleanSrc(src) {
    const parts = String(src || "").split(/[·;]/).map((seg) => {
      let t = seg
        .replace(/\([^)]*(?:ctx|myth-busters|INFERRED|CHECK)[^)]*\)/gi, " ")
        .replace(/\([≃⩽≈≤]\)/g, " ")
        .replace(/\b[\w.-]+\.(?:md|jsonl?|txt)\b(?:\s*§[\w.,§ ]*)?/gi, " ")
        .replace(/§[\w.,§ ]*/g, " ")
        .replace(/\bel\.wiktionary\b/gi, "Βικιλεξικό").replace(/\ben\.wiktionary\b/gi, "Wiktionary")
        .replace(/\bministry guidelines\b/i, "Οδηγίες ΥΠΑΙΘ")
        .replace(/\s+/g, " ").trim();
      const m = t.match(/^\((.*)\)$/);
      if (m) t = m[1];
      return t.replace(/(?:,\s*δεν υπάρχει|κλειδί όπως|όπως)?\s*στο$/, "").replace(/\(\s*\)/g, "").replace(/^[,\s]+|[,\s]+$/g, "").trim();
    }).filter(Boolean);
    return parts.join(" · ") || "Gnothi";
  }

  // ---------- answer normalisation (polytonic-aware) ----------
  /**
   * `norm`: NFD, strip every combining mark (accents, breathings, diaeresis, iota subscript U+0345),
   * final sigma → σ, lowercase, punctuation and spaces collapsed, movable ν in parentheses dropped,
   * spelling doublets folded (ττ/σσ, ξυν-/συν-, γίγν-/γίν-, ἐς/εἰς). Letters are never ignored.
   * A written iota adscript (τῆι) stays a letter: write it subscript (τῇ) as the school books do.
   */
  const PUNCT = /[.,;:!?«»"'’‘ʼ᾽᾿()\[\]—–\-·…]/g;
  const normCache = new Map();
  function norm(str) {
    const key = String(str || "");
    let out = normCache.get(key);
    if (out === undefined) {
      out = key
        .replace(/\(ν\)/g, "")
        .normalize("NFD").replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[ςϲ]/g, "σ")
        .replace(PUNCT, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/ττ/g, "σσ")
        .replace(/(^| )ξυν/g, "$1συν")
        .replace(/γιγν/g, "γιν")
        .replace(/(^| )εσ(?= |$)/g, "$1εισ");
      if (normCache.size > 50000) normCache.clear();
      normCache.set(key, out);
    }
    return out;
  }
  /** Like `norm` but keeps accents, breathings and the subscript: the comparison for `strict` forms. */
  function strictKey(str) {
    return String(str || "")
      .replace(/\(ν\)/g, "")
      .normalize("NFC")
      .toLowerCase()
      .replace(/[ςϲ]/g, "σ")
      .replace(PUNCT, " ")
      .replace(/\s+/g, " ")
      .trim()
      .normalize("NFC");
  }
  function sameAnswer(a, b) { return norm(a) === norm(b); }
  function accepts(answers, typed) { return (Array.isArray(answers) ? answers : [answers]).some((a) => sameAnswer(a, typed)); }
  function acceptsStrict(answers, typed) { return (Array.isArray(answers) ? answers : [answers]).some((a) => strictKey(a) === strictKey(typed)); }
  /**
   * Check a typed form. `strict` items (where the accent decides: ποιεῖ/ποίει, λῦσαι/λύσαι) must match
   * accents too; an accent-only slip is reported so the UI can give half credit and show the rule.
   */
  function checkTyped(answers, typed, strict = false) {
    const loose = accepts(answers, typed);
    if (!strict) return { ok: loose, accentOnly: false };
    const exact = acceptsStrict(answers, typed);
    return { ok: exact, accentOnly: !exact && loose };
  }
  /** Greek text → display tokens (punctuation kept on the token) */
  function tokens(grc) { return String(grc).split(/\s+/).filter(Boolean); }
  const stripMarks = (w) => norm(w).replace(/\s/g, "");
  /** True when the string carries breathings, circumflex, grave or subscript (U+1F00-1FFF after NFC). */
  const isPolytonic = (str) => /[ἀ-῿]/.test(String(str || "").normalize("NFC"));
  const hasGreekLetters = (str) => /[Ͱ-Ͽἀ-῿]/.test(String(str || ""));
  /** Indices of the first contiguous occurrence of `phrase` (tokens) inside `toks`; [] if absent. */
  function findPhrase(toks, phrase) {
    const want = tokens(phrase).map(stripMarks).filter(Boolean);
    const have = toks.map(stripMarks);
    if (!want.length) return [];
    for (let i = 0; i + want.length <= have.length; i++) {
      let ok = true;
      for (let j = 0; j < want.length; j++) if (have[i + j] !== want[j]) { ok = false; break; }
      if (ok) return want.map((_, j) => i + j);
    }
    return [];
  }

  // ---------- grammar cells ----------
  const VERB_CELL = /^(ind|subj|opt|impv|inf|ptc)\b/;
  const isVerbCell = (cell) => VERB_CELL.test(String(cell || ""));
  const CELL_EL = {
    ind: "οριστικής", subj: "υποτακτικής", opt: "ευκτικής", impv: "προστακτικής", inf: "απαρέμφατο", ptc: "μετοχή",
    pres: "ενεστώτα", impf: "παρατατικού", fut: "μέλλοντα", aor: "αορίστου", aor2: "αορίστου β΄", perf: "παρακειμένου", plup: "υπερσυντελίκου", futp: "συντελεσμένου μέλλοντα",
    aorp: "παθητικού αορίστου", aor2p: "παθητικού αορίστου β΄",
    act: "ενεργητικής φωνής", mid: "μέσης φωνής", pass: "παθητικής φωνής", mp: "μεσοπαθητικής φωνής",
    nom: "ονομαστική", gen: "γενική", dat: "δοτική", acc: "αιτιατική", voc: "κλητική",
    sg: "ενικού", pl: "πληθυντικού", du: "δυϊκού",
    m: "αρσενικού γένους", f: "θηλυκού γένους", n: "ουδετέρου γένους",
    pos: "θετικού βαθμού", comp: "συγκριτικού βαθμού", sup: "υπερθετικού βαθμού",
    adv: "επίρρημα",
  };
  const PERSON_EL = { 1: "α΄", 2: "β΄", 3: "γ΄" };
  /** Machine cell key → the identification the exam's matching tables print («γ΄ πληθυντικό οριστικής μέλλοντα»). */
  function cellLabel(cell) {
    const parts = String(cell || "").split(".");
    if (!parts[0]) return "";
    if (isVerbCell(cell)) {
      const mood = parts[0];
      const out = [];
      const pn = parts.find((p) => /^[123](sg|pl|du)$/.test(p));
      if (pn) out.push(`${PERSON_EL[pn[0]]} ${CELL_EL[pn.slice(1)].replace(/ού$/, "ό")}`);
      out.push(CELL_EL[mood]);
      const tense = parts.find((p) => CELL_EL[p] && /^(pres|impf|fut|aor|aor2|perf|plup|futp|aorp|aor2p)$/.test(p));
      if (tense) out.push(CELL_EL[tense]);
      if (mood === "ptc") {
        const c = parts.find((p) => /^(nom|gen|dat|acc|voc)$/.test(p)), n = parts.find((p) => /^(sg|pl|du)$/.test(p)), g = parts.find((p) => /^[mfn]$/.test(p));
        if (c || n || g) out.push([c && CELL_EL[c], n && CELL_EL[n], g && CELL_EL[g]].filter(Boolean).join(" "));
      }
      const voice = parts.find((p) => /^(act|mid|pass|mp)$/.test(p));
      if (voice && !/^aor2?p$/.test(tense || "")) out.push(CELL_EL[voice]);
      return out.join(" ").replace(/\s+/g, " ").trim();
    }
    if (parts[0] === "adv") return `${CELL_EL.adv} ${CELL_EL[parts[1]] || ""}`.trim();
    const out = [];
    const c = parts.find((p) => /^(nom|gen|dat|acc|voc)$/.test(p)), n = parts.find((p) => /^(sg|pl|du)$/.test(p)), g = parts.find((p) => /^[mfn]$/.test(p)), d = parts.find((p) => /^(pos|comp|sup)$/.test(p));
    if (c) out.push(CELL_EL[c]);
    if (n) out.push(CELL_EL[n]);
    if (g) out.push(CELL_EL[g]);
    if (d) out.push(CELL_EL[d]);
    return out.join(" ");
  }
  const CELL_RE = /^(?:(?:nom|gen|dat|acc|voc)\.(?:sg|pl|du)(?:\.[mfn])?(?:\.(?:pos|comp|sup))?|adv\.(?:pos|comp|sup)|(?:ind|subj|opt|impv)\.(?:pres|impf|fut|aor|aor2|perf|plup|futp|aorp|aor2p)\.[123](?:sg|pl|du)(?:\.(?:act|mid|pass|mp))?|inf\.(?:pres|fut|aor|aor2|perf|futp|aorp|aor2p)(?:\.(?:act|mid|pass|mp))?|ptc\.(?:pres|fut|aor|aor2|perf|futp|aorp|aor2p)\.(?:nom|gen|dat|acc|voc)\.(?:sg|pl|du)\.[mfn](?:\.(?:act|mid|pass|mp))?)$/;
  const isCell = (cell) => CELL_RE.test(String(cell || ""));

  // ---------- course index ----------
  const WEIGHT = { word: 2, sentence: 2, form: 1.5, role: 2, clause: 1.5, transform: 1.5, fact: 1, hook: 1, sense: 1, claim: 2, parallel: 1.5, unseen: 3, trap: 1 };
  const KINDS = Object.keys(WEIGHT).concat("rule");
  const itemWeight = (it) => (it.kind === "rule" ? 1 + ((it.quiz || []).length) : WEIGHT[it.kind] || 1);

  function sortUnits(units) {
    const n = (u) => (u.id === "u0_example" ? 0 : parseInt(String(u.id).replace(/^u/, ""), 10) || 999);
    return units.slice().sort((a, b) => n(a) - n(b));
  }

  function indexCourse(units) {
    const course = { units: sortUnits(units) };
    const items = new Map();
    const lessons = [];
    const byKind = {};
    for (const u of course.units) {
      for (const l of u.lessons) {
        lessons.push({ ...l, unitId: u.id });
        for (const it of l.items) {
          const full = { ...it, lessonId: l.id, unitId: u.id };
          items.set(it.id, full);
          (byKind[it.kind] = byKind[it.kind] || []).push(full);
        }
      }
    }
    for (const k of KINDS) byKind[k] = byKind[k] || [];
    // the same headword in several lessons shares one progress id (the first in course order)
    const firstOf = new Map();
    for (const w of byKind.word.concat(byKind.hook)) {
      const key = w.kind + "|" + norm(lemmaOf(w)) + (w.kind === "hook" ? "|" + norm(w.el) : "");
      if (!firstOf.has(key)) firstOf.set(key, w.id);
      else CANON.set(w.id, firstOf.get(key));
    }
    const isDup = (it) => CANON.has(it.id);
    const unitOf = (id) => course.units.find((u) => u.id === id);
    /** items of units that feed an exam section */
    const forSection = (sec, kind) => [...items.values()].filter((it) => (!kind || it.kind === kind) && (unitOf(it.unitId).exam || []).includes(sec));
    const sentenceChunks = [...new Set(byKind.sentence.flatMap((x) => x.chunks))];
    return { course, items, lessons, byKind, unitOf, forSection, sentenceChunks, isDup };
  }
  /** The headword without its article («ὁ ἀνήρ» → «ἀνήρ»). */
  const lemmaOf = (it) => String(it.grc || it.lemma || "").replace(/^(ὁ|ἡ|τό|οἱ|αἱ|τά|ὁ, ἡ|ὁ\/ἡ)\s+/u, "").trim();

  /** Items of a lesson split into sittings of roughly SITTING_WEIGHT graded steps. */
  /**
   * A wall of three or more rule cards in a row is spread over the non-rule items that follow it
   * (the first rule stays, the others are dealt out evenly, every group keeping its order), so a
   * sitting is never «five rules and their quizzes» before the student touches a single Greek form.
   */
  function spreadRules(items) {
    const out = [];
    let i = 0;
    while (i < items.length) {
      if (items[i].kind !== "rule") { out.push(items[i]); i += 1; continue; }
      let j = i; while (j < items.length && items[j].kind === "rule") j += 1;
      const rules = items.slice(i, j);
      let k = j; while (k < items.length && items[k].kind !== "rule") k += 1;
      const others = items.slice(j, k);
      if (rules.length < 3 || !others.length) { out.push(...rules, ...others); i = k; continue; }
      const chunk = Math.max(1, Math.floor(others.length / rules.length));
      let o = 0;
      for (const rule of rules) { out.push(rule); out.push(...others.slice(o, o + chunk)); o += chunk; }
      out.push(...others.slice(o));
      i = k;
    }
    return out;
  }
  function lessonSittings(ix, lessonId) {
    const l = ix.lessons.find((x) => x.id === lessonId);
    if (!l) return [];
    const out = [[]];
    let w = 0;
    for (const it of spreadRules(l.items)) {
      const iw = itemWeight(it);
      if (w + iw > SITTING_WEIGHT && out[out.length - 1].length) { out.push([]); w = 0; }
      out[out.length - 1].push(it.id);
      w += iw;
    }
    // a stub of a last sitting (under half a sitting's weight) joins the one before it: never «one rule and one form» as a part
    const rulesOnly = (sit) => sit.every((id) => (ix.items.get(id) || {}).kind === "rule");
    if (out.length > 1 && (w < SITTING_WEIGHT / 2 || rulesOnly(out[out.length - 1]))) out[out.length - 2].push(...out.pop());
    return out;
  }

  // ---------- path (Ιερά Οδός): first lesson of every unit open, sequential inside, roundup last ----------
  const GREEK_NUM = ["Α", "Β", "Γ", "Δ", "Ε", "ΣΤ", "Ζ", "Η", "Θ", "Ι", "ΙΑ", "ΙΒ", "ΙΓ", "ΙΔ", "ΙΕ"];
  function pathNodes(ix) {
    const nodes = [];
    for (const u of ix.course.units) {
      u.lessons.forEach((l, i) => nodes.push({ id: l.id, unitId: u.id, title: l.title, letter: GREEK_NUM[i] || "•", kind: "lesson", index: i }));
      nodes.push({ id: `${u.id}-review`, unitId: u.id, title: "Ανακεφαλαίωση", letter: "Ω", kind: "roundup", index: u.lessons.length });
    }
    return nodes;
  }
  function isUnlocked(ix, s, nodeId) {
    if (s.done[nodeId]) return true;
    const nodes = pathNodes(ix);
    const n = nodes.find((x) => x.id === nodeId);
    if (!n) return false;
    const unitNodes = nodes.filter((x) => x.unitId === n.unitId);
    if (n.kind === "roundup") return unitNodes.filter((x) => x.kind === "lesson").every((x) => s.done[x.id]);
    return n.index === 0 || !!s.done[unitNodes[n.index - 1].id];
  }
  /** Next thing to do: the unit in progress first, else the first open node. */
  function nextNode(ix, s) {
    const nodes = pathNodes(ix).filter((n) => !s.done[n.id] && isUnlocked(ix, s, n.id));
    const started = nodes.find((n) => n.index > 0 || (s.sittings[n.id] || 0) > 0);
    return started || nodes[0] || null;
  }
  function unitProgress(ix, s, unitId) {
    const nodes = pathNodes(ix).filter((n) => n.unitId === unitId);
    const done = nodes.filter((n) => s.done[n.id]).length;
    return { done, total: nodes.length };
  }
  /** Sittings still to play on the whole Ιερά Οδός (lessons count their remaining parts, a roundup counts one). */
  function remainingSittings(ix, s) {
    let n = 0;
    for (const node of pathNodes(ix)) {
      if (s.done[node.id]) continue;
      n += node.kind === "roundup" ? 1 : Math.max(0, lessonSittings(ix, node.id).length - (s.sittings[node.id] || 0));
    }
    return n;
  }

  // ---------- randomness ----------
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, r) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function pickDistinct(pool, n, r, exclude = [], key = (x) => x) {
    const seen = new Set(exclude.map(key));
    const out = [];
    for (const x of shuffle(pool, r)) {
      if (seen.has(key(x))) continue;
      seen.add(key(x));
      out.push(x);
      if (out.length === n) break;
    }
    return out;
  }
  /** Seed from a date so «Θέμα της ημέρας» is the same if she reopens it. */
  function dateSeed(key) { let h = 7; for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

  // ---------- labels and helpers ----------
  const L = {
    guess: "Μάντεψε πρώτα", newWord: "Νέα λέξη", meaning: "Σημασία", reverse: "Αντίστροφα", gender: "Γένος", genitive: "Γενική",
    parts: "Αρχικοί χρόνοι", hook: "Ετυμολογία", hookFind: "Β3: βρες στο κείμενο", hookGap: "Β3: συμπλήρωσε", cell: "Ποιος τύπος;", type: "Γράψε τον τύπο", buildForm: "Χτίσε τον τύπο",
    translate: "Μετάφρασε", note: "Συντακτικό στο κείμενο", anaphora: "Σε ποια λέξη αναφέρεται;", device: "Εκφραστικό μέσο", role: "Συντακτικός ρόλος", label: "Πλήρως συντακτικά", find: "Βρες στο κείμενο", bucket: "Ταξινόμησε",
    steps: "Αναγνώρισε την πρόταση", transform: "Μετατροπή", tf: "Σωστό ή λάθος;", sense: "Άλλη σημασία", chain: "Χτίσε την απάντηση", best: "Ποιο επιχείρημα;", parallel: "Παράλληλο κείμενο", checklist: "Τα σημεία της απάντησης", passage: "Αδίδακτο",
    spot: "Βρες την παγίδα", match: "Αντιστοίχισε", matchTable: "Αναγνώρισε τους τύπους", swipe: "Γρήγορη επανάληψη", decode: "Νέο: εφάρμοσε τον κανόνα", review: "Επανάληψη", again: "Ξανά",
    stadion: "Στάδιο", rule: "Κανόνας", quiz: "Έλεγχος",
  };
  const wrap = (s) => `<span class="w">${s}</span>`;
  const labelOf = (it) => ({ word: it.grc, sentence: it.grc, form: it.given, rule: it.title, role: it.w, clause: it.grc, transform: it.from, fact: it.q, hook: it.grc, sense: it.grc, claim: it.q, parallel: it.grc_quote, unseen: it.title_el, trap: it.ask }[it.kind] || it.id);
  const meaningOf = (it) => ({ word: it.el, hook: it.el, form: (it.answer || [])[0], role: (it.answer || [])[0], sense: it.text_el }[it.kind] || "");
  /** Principal parts (verbs, six) or lemma + genitive (nouns), as the forms string lists them. */
  const partsOf = (it) => (Array.isArray(it.principal_parts) && it.principal_parts.length ? it.principal_parts.map((p) => (p == null ? "—" : String(p).trim())) : String(it.forms || "").split(/\s*;\s*|\s*,\s*/).map((x) => x.trim()).filter(Boolean));
  const GENDERS = { m: "αρσενικό", f: "θηλυκό", n: "ουδέτερο", "m/f": "αρσενικό και θηλυκό" };
  const POS_EL = { noun: "ουσιαστικό", verb: "ρήμα", adj: "επίθετο", adv: "επίρρημα", pron: "αντωνυμία", prep: "πρόθεση", conj: "σύνδεσμος", num: "αριθμητικό", particle: "μόριο", phrase: "φράση", article: "άρθρο", interj: "επιφώνημα" };
  const PART_LABELS = ["ενεστώτας", "μέλλοντας", "αόριστος", "παρακείμενος", "παρακείμενος μ/π", "παθητικός αόριστος"];

  // ---------- question builders ----------
  // Every question: { type, itemId, label, prompt, ..., answer, explain }.

  function distinctBy(pool, n, r, exclude, key) { return pickDistinct(pool, n, r, exclude, key); }

  // words
  function qWordMeaning(ix, it, r, { guess = false, label } = {}) {
    const same = ix.byKind.word.filter((x) => x.id !== it.id && x.pos === it.pos && norm(x.el) !== norm(it.el));
    const other = ix.byKind.word.filter((x) => x.id !== it.id && x.pos !== it.pos && norm(x.el) !== norm(it.el));
    let wrong = distinctBy(same.filter((x) => x.unitId === it.unitId), 2, r, [it], (x) => norm(x.el));
    wrong = wrong.concat(distinctBy(same.concat(other), 3 - wrong.length, r, [it, ...wrong], (x) => norm(x.el)));
    const options = shuffle([it.el, ...wrong.map((x) => x.el)], r);
    return {
      type: "mcq", itemId: it.id, guess, label: label || (guess ? L.guess : L.meaning),
      prompt: guess ? `Δεν την έχεις μάθει ακόμη. Τι μπορεί να σημαίνει το ${wrap(it.grc)};` : `Τι σημαίνει το ${wrap(it.grc)};`,
      word: it.grc, sub: it.forms, options, answer: it.el, explain: `${it.forms || it.grc}: ${it.el}.${it.hook ? " " + it.hook : ""}`,
    };
  }
  function qWordReverse(ix, it, r) {
    const pool = ix.byKind.word.filter((x) => x.id !== it.id && norm(x.el) !== norm(it.el));
    const wrong = distinctBy(pool.filter((x) => x.pos === it.pos), 3, r, [it], (x) => norm(x.grc));
    const more = wrong.length < 3 ? distinctBy(pool, 3 - wrong.length, r, [it, ...wrong], (x) => norm(x.grc)) : [];
    const options = shuffle([it.grc, ...wrong.concat(more).map((x) => x.grc)], r);
    return { type: "mcq", itemId: it.id, label: L.reverse, prompt: `Ποια αρχαία λέξη σημαίνει ${wrap("«" + it.el + "»")};`, options, answer: it.grc, explain: `${it.forms || it.grc}: ${it.el}.`, grcOptions: true };
  }
  function qWordGender(ix, it, r) {
    const options = shuffle(["αρσενικό", "θηλυκό", "ουδέτερο"].concat(it.gender === "m/f" ? [GENDERS["m/f"]] : []), r);
    return { type: "mcq", itemId: it.id, label: L.gender, prompt: `Τι γένος είναι το ${wrap(lemmaOf(it))};`, sub: it.forms, options, answer: GENDERS[it.gender], explain: `${it.forms}, ${GENDERS[it.gender]}${it.class ? " (" + it.class + ")" : ""}. ${it.trap || ""}`.trim() };
  }
  function qWordGenitive(ix, it, r) {
    const gen = partsOf(it)[1];
    if (!gen) return null;
    const pool = ix.byKind.word.filter((x) => x.pos === "noun" && x.id !== it.id).map((x) => partsOf(x)[1]).filter((g) => g && norm(g) !== norm(gen));
    const same = ix.byKind.word.filter((x) => x.pos === "noun" && x.id !== it.id && x.class === it.class).map((x) => partsOf(x)[1]).filter((g) => g && norm(g) !== norm(gen));
    let wrong = distinctBy(same, 3, r, [gen], norm);
    wrong = wrong.concat(distinctBy(pool, 3 - wrong.length, r, [gen, ...wrong], norm));
    if (wrong.length < 2) return null;
    return { type: "mcq", itemId: it.id, label: L.genitive, prompt: `Ποια είναι η γενική του ${wrap(it.grc)};`, options: shuffle([gen, ...wrong], r), answer: gen, explain: `${it.forms}: ${it.el}.${it.trap ? " " + it.trap : ""}`, grcOptions: true };
  }
  /** αρχικοί χρόνοι builder: the six labelled slots (missing ones skipped) filled from a pool with look-alike parts of other verbs. */
  function qPrincipalParts(ix, it, r) {
    const parts = partsOf(it);
    if (it.pos !== "verb" || parts.length < 3) return null;
    const slots = [], answer = [];
    parts.forEach((p, i) => { if (p && p !== "—" && i < PART_LABELS.length) { slots.push({ label: PART_LABELS[i] }); answer.push(p); } });
    if (answer.length < 2) return null;
    const others = ix.byKind.word.filter((x) => x.pos === "verb" && x.id !== it.id).flatMap((x) => partsOf(x)).filter((p) => p && p !== "—");
    const extra = distinctBy(others.filter((p) => !answer.some((q) => norm(q) === norm(p))), Math.min(4, Math.max(2, 8 - answer.length)), r, answer, norm);
    if (extra.length < 1) return null;
    return { type: "slots", itemId: it.id, label: L.parts, prompt: `Οι αρχικοί χρόνοι του ${wrap(it.grc)}`, slots, tiles: shuffle([...answer, ...extra], r), answer, explain: `${it.forms}: ${it.el}.${it.hook ? " " + it.hook : ""}` };
  }
  function qWordEtym(ix, it, r) {
    const target = (it.etym || [])[0];
    if (!target) return null;
    const pool = ix.byKind.word.flatMap((x) => (x.id === it.id ? [] : (x.etym || []).map((e) => e.el))).concat(ix.byKind.hook.filter((h) => norm(lemmaOf(h)) !== norm(lemmaOf(it))).flatMap((h) => [h.el, ...(h.more || [])]));
    const wrong = distinctBy(pool.filter((e) => norm(e) !== norm(target.el)), 3, r, [target.el], norm);
    if (wrong.length < 2) return null;
    return { type: "mcq", itemId: it.id, label: L.hook, prompt: `Ποια νεοελληνική λέξη είναι ετυμολογικά συγγενής με το ${wrap(it.grc)};`, options: shuffle([target.el, ...wrong], r), answer: target.el, explain: `${lemmaOf(it)} → ${target.el}.${target.exam ? ` Ζεύγος των Πανελλαδικών ${target.exam}.` : ""} ${it.hook || ""}`.trim() };
  }

  // sentences
  function qSentenceBuild(ix, it, r) {
    const pool = ix.sentenceChunks.filter((c) => !it.chunks.includes(c));
    let extra = distinctBy(pool, 2, r, it.chunks);
    if (extra.length < 1) extra = ["όμως", "και έτσι"].slice(0, 2);
    return { type: "build", itemId: it.id, label: L.translate, prompt: "Χτίσε τη μετάφραση με τη σειρά", word: it.grc, tiles: shuffle([...it.chunks, ...extra], r), answer: it.chunks, explain: it.el };
  }
  const ROLE_BANK = ["υποκείμενο", "αντικείμενο", "κατηγορούμενο", "γενική κτητική", "δοτική προσωπική", "επιρρηματικός προσδιορισμός του χρόνου", "τελικό απαρέμφατο", "ειδικό απαρέμφατο", "επιρρηματική χρονική μετοχή", "επιρρηματική αιτιολογική μετοχή", "γενική απόλυτη", "ποιητικό αίτιο", "εμπρόθετος προσδιορισμός του σκοπού"];
  function qSentenceNote(ix, it, r, n = 0) {
    const note = (it.notes || [])[n];
    if (!note) return null;
    const pool = ix.byKind.sentence.flatMap((s) => (s.notes || []).map((x) => x.role_el)).concat(ix.byKind.role.flatMap((x) => x.answer || []), ROLE_BANK);
    const wrong = distinctBy(pool.filter((x) => norm(x) !== norm(note.role_el)), 3, r, [note.role_el], norm);
    if (wrong.length < 2) return null;
    return { type: "mcq", itemId: it.id, label: L.note, prompt: `${wrap(note.w)}: τι είναι συντακτικά;`, word: it.grc, hl: note.w, options: shuffle([note.role_el, ...wrong], r), answer: note.role_el, explain: `${note.w}: ${note.role_el}${note.dep ? " (" + (/^στ[οη]ν? /.test(note.dep) ? note.dep : "στο " + note.dep) + ")" : ""}.` };
  }
  function qFind(ix, it, r, f) {
    const spec = f || (it.find || [])[0];
    if (!spec) return null;
    const toks = tokens(it.grc);
    const want = spec.words.map(stripMarks);
    const answer = toks.map((t, i) => (want.includes(stripMarks(t)) ? i : -1)).filter((i) => i >= 0);
    if (!answer.length) return null;
    return { type: "find", itemId: it.id, label: L.find, prompt: spec.ask, words: toks, answer, explain: spec.why || `${spec.words.join(", ")}.` };
  }
  /** Α1: «Σε ποια λέξη του αρχαίου κειμένου αναφέρεται η αντωνυμία «…»;» (tap one word, or the phrase). */
  function qAnaphora(ix, it, r, n = 0) {
    const a = (it.anaphora || [])[n];
    if (!a) return null;
    const toks = tokens(it.grc);
    const refToks = tokens(a.ref);
    let answer, single = false;
    if (refToks.length === 1) { const w = stripMarks(a.ref); answer = toks.map((t, i) => (stripMarks(t) === w ? i : -1)).filter((i) => i >= 0); single = true; }
    else answer = findPhrase(toks, a.ref);
    if (!answer.length) return null;
    return { type: "find", itemId: it.id, label: L.anaphora, prompt: `Σε ποια λέξη του αρχαίου κειμένου αναφέρεται η αντωνυμία ${wrap("«" + a.w + "»")};`, words: toks, answer, single, explain: `${a.w} → ${a.ref}.${a.why ? " " + a.why : ""}` };
  }
  const DEVICE_BANK = ["αντίθεση", "επανάληψη", "αναλογία", "ρητορική ερώτηση", "ασύνδετο σχήμα", "πολυσύνδετο", "α΄ πληθυντικό πρόσωπο", "υποθετικός λόγος του αντίθετου του πραγματικού", "έναρθρο απαρέμφατο", "σχήμα κατ' άρσιν και θέσιν", "παρομοίωση", "μεταφορά", "επαγωγικό παράδειγμα", "πολύπτωτο", "χιαστό σχήμα"];
  function qDevice(ix, it, r, n = 0) {
    const d = (it.devices || [])[n];
    if (!d) return null;
    const pool = ix.byKind.sentence.flatMap((s) => (s.devices || []).map((x) => x.name_el)).concat(DEVICE_BANK);
    const wrong = distinctBy(pool.filter((x) => norm(x) !== norm(d.name_el)), 3, r, [d.name_el], norm);
    if (wrong.length < 2) return null;
    return { type: "mcq", itemId: it.id, label: L.device, prompt: `Ποιο εκφραστικό μέσο βλέπεις στο ${wrap("«" + d.words + "»")};`, word: it.grc, hl: d.words, options: shuffle([d.name_el, ...wrong], r), answer: d.name_el, explain: `${d.words}: ${d.name_el}. ${d.effect_el || ""}`.trim() };
  }
  /** Α1 Σωστό/Λάθος on the content of a reference text, with the Greek words that prove it. */
  function qSentenceTf(ix, it, r, n = 0) {
    const t = (it.tf || [])[n];
    if (!t) return null;
    return { type: "tf", itemId: it.id, label: L.tf, prompt: t.q, word: it.grc, answer: !!t.a, yes: "Σωστό", no: "Λάθος", explain: `${t.why || ""}${t.evidence ? ` Τεκμηρίωση: «${t.evidence}».` : ""}`.trim() };
  }

  // forms (Γ3)
  const ENDING_BANK = ["ων", "ους", "ας", "ες", "σι", "σιν", "οι", "αι", "α", "η", "ῃ", "ῳ", "ου", "ης", "ος", "ον", "ω", "εις", "ει", "ομεν", "ετε", "ουσι", "σαι", "σθαι", "ναι", "θη", "θητι", "σω", "σομαι", "ε", "ετω", "ντων", "οιμι", "οις", "οι", "ωμεν", "ητε", "ωσι"];
  function qCell(ix, it, r, { label, guess = false } = {}) {
    // a strict item (accent decides) may offer the accent-only twin as a distractor
    const key = it.strict ? strictKey : norm;
    const wrong = distinctBy((it.distractors || []).filter((d) => !(it.strict ? acceptsStrict(it.answer, d) : accepts(it.answer, d))), 3, r, it.answer, key);
    return { type: "mcq", itemId: it.id, guess, label: label || (guess ? L.guess : it.transfer ? L.decode : L.cell), prompt: `${wrap(it.given)}: ${it.ask}`, word: it.given, sub: it.ctx || it.lemma, options: shuffle([it.answer[0], ...wrong], r), answer: it.answer[0], strict: !!it.strict, explain: `${it.answer.join(" / ")}. ${it.why || it.rule || ""}`.trim(), grcOptions: true };
  }
  function qType(ix, it, r) {
    const tiles = it.tiles ? shuffle([...it.tiles, ...distinctBy(ENDING_BANK.filter((t) => !it.tiles.some((u) => norm(u) === norm(t))), 3, r, it.tiles, norm)], r) : null;
    return { type: "type", itemId: it.id, label: it.transfer ? L.decode : L.type, prompt: `${wrap(it.given)}: ${it.ask}`, word: it.given, sub: it.ctx || it.lemma, answer: it.answer, strict: !!it.strict, tiles, explain: `${it.answer.join(" / ")}. ${it.why || it.rule || ""}`.trim() };
  }
  function qFormBuild(ix, it, r) {
    if (!it.tiles) return null;
    const extra = distinctBy(ENDING_BANK.filter((t) => !it.tiles.some((u) => norm(u) === norm(t))), Math.max(2, 5 - it.tiles.length), r, it.tiles, norm);
    return { type: "build", itemId: it.id, label: L.buildForm, prompt: `${wrap(it.given)}: ${it.ask}`, word: it.given, sub: it.ctx || it.lemma, tiles: shuffle([...it.tiles, ...extra], r), answer: it.tiles, joiner: "", grcTiles: true, explain: `${it.tiles.join("-")} = ${it.answer[0]}. ${it.why || it.rule || ""}`.trim() };
  }
  /** Γ3 ομογενών shape: Στήλη Α forms ↔ Στήλη Β their grammatical identification. */
  function qMatchTable(ix, forms, r) {
    const uniq = [];
    const seenL = new Set(), seenR = new Set();
    for (const x of shuffle(forms.filter((f) => f.kind === "form" && isCell(f.cell)), r)) {
      const a = norm(x.answer[0]), b = norm(cellLabel(x.cell));
      if (!b || seenL.has(a) || seenR.has(b)) continue;
      seenL.add(a); seenR.add(b); uniq.push(x);
      if (uniq.length === 4) break;
    }
    if (uniq.length < 3) return null;
    const pairs = uniq.map((it) => [it.answer[0], cellLabel(it.cell), it.id]);
    return { type: "match", itemId: null, itemIds: uniq.map((x) => x.id), label: L.matchTable, prompt: "Αντιστοίχισε κάθε τύπο της Στήλης Α με την ορθή γραμματική του αναγνώριση στη Στήλη Β", pairs, left: shuffle(pairs.map((p) => p[0]), r), right: shuffle(pairs.map((p) => p[1]), r), spare: [] };
  }

  // rules (inline quiz)
  function qRuleQuiz(ix, it, r, i) {
    const q = (it.quiz || [])[i];
    if (!q) return null;
    const base = { itemId: it.id, label: L.quiz, explain: q.why || it.say };
    if (q.t === "mcq") return { ...base, type: "mcq", prompt: q.q, options: shuffle(q.options, r), answer: q.a };
    if (q.t === "tf") return { ...base, type: "tf", prompt: q.q, answer: q.a, yes: "Σωστό", no: "Λάθος" };
    if (q.t === "bucket") return { ...base, type: "bucket", label: L.bucket, prompt: q.q || "Βάλε το καθένα στο σωστό κουτί", buckets: q.buckets, items: shuffle(q.items, r), answer: q.items };
    return null;
  }

  // roles (Γ4α)
  /** «ΛΕΞΗ: χαρακτηρισμός στο ΚΥΡΙΑ ΛΕΞΗ.» The «στο …» is added only when the marker phrase does not already name the head word. */
  function roleExplain(it) {
    const head = String(it.dep || "").replace(/^στ\S*\s+/u, "");
    const named = !it.dep || (head && norm(it.answer[0]).includes(norm(head)));
    return `${it.w}: ${it.answer[0]}${named ? "" : " " + it.dep}. ${it.why || ""}`.trim();
  }
  function qRoleMcq(ix, it, r, { guess = false } = {}) {
    const wrong = distinctBy((it.distractors || []).filter((d) => !accepts(it.answer, d)), 3, r, it.answer, norm);
    return { type: "mcq", itemId: it.id, guess, label: guess ? L.guess : L.role, prompt: `${wrap(it.w)}: είναι …`, word: it.grc, hl: it.w, options: shuffle([it.answer[0], ...wrong], r), answer: it.answer[0], explain: roleExplain(it) };
  }
  function qRoleBuild(ix, it, r) {
    const others = ix.byKind.role.filter((x) => x.id !== it.id).flatMap((x) => x.tiles || []);
    const extra = distinctBy(others.filter((t) => !it.tiles.some((u) => norm(u) === norm(t))), 2, r, it.tiles, norm);
    const fallback = ["γενική κτητική", "αντικείμενο", "κατηγορούμενο"].filter((t) => !it.tiles.some((u) => norm(u) === norm(t)));
    const tiles = shuffle([...it.tiles, ...(extra.length >= 2 ? extra : extra.concat(fallback.slice(0, 2 - extra.length)))], r);
    return { type: "build", itemId: it.id, label: L.role, prompt: `${wrap(it.w)}: είναι …`, word: it.grc, hl: it.w, tiles, answer: it.tiles, explain: roleExplain(it) };
  }
  /** «Πλήρως συντακτικά»: pick the label AND tap the head word («στο …») in the sentence. */
  function qLabel(ix, it, r) {
    if (!it.head) return null;
    const toks = tokens(it.grc);
    const head = findPhrase(toks, it.head);
    if (!head.length) return null;
    const wrong = distinctBy((it.distractors || []).filter((d) => !accepts(it.answer, d)), 3, r, it.answer, norm);
    return { type: "label", itemId: it.id, label: L.label, prompt: `${wrap(it.w)}: είναι … Διάλεξε τον χαρακτηρισμό και μετά πάτα τη λέξη στην οποία αναφέρεται («στο …»)`, word: it.grc, hl: it.w, options: shuffle([it.answer[0], ...wrong], r), answer: it.answer[0], words: toks, head, dep: it.dep, explain: roleExplain(it) };
  }

  // clauses (Γ4β): six boxes as the Εγχειρίδιο template, scored 1+1+1+1+1+2
  const CLAUSE_STEPS = [["kind_el", "kind", "Είδος της πρότασης", 1], ["intro_el", "intro", "Εισαγωγή", 1], ["neg_el", "neg", "Άρνηση", 1], ["fn_el", "fn", "Συντακτική λειτουργία", 1], ["dep_el", "dep", "Εξάρτηση", 1], ["mood_el", "mood", "Εκφορά και γιατί", 2]];
  function qClauseSteps(ix, it, r) {
    const d = it.distractors || {};
    const steps = CLAUSE_STEPS.map(([f, k, q, marks]) => ({ q, options: shuffle([it[f], ...(d[k] || []).slice(0, 3)], r), answer: it[f], marks }));
    return {
      type: "steps", itemId: it.id, label: L.steps, prompt: "Χτίσε την απάντηση βήμα-βήμα, όπως τη βαθμολογεί η επιτροπή", word: it.grc, steps,
      explain: it.why || `${it.kind_el}· εισάγεται ${it.intro_el}· άρνηση ${it.neg_el}· ${it.fn_el}· ${it.dep_el}· εκφέρεται με ${it.mood_el}.`,
    };
  }

  // transformations (Γ4β)
  function qTransform(ix, it, r, { faded = 0 } = {}) {
    const answer = tokens(it.to[0]).map((t) => t.replace(/[.,;:!?«»·]+$/g, ""));
    const hints = (it.steps || []).slice(0, faded);
    return { type: "transform", itemId: it.id, label: L.transform, prompt: it.ask, word: it.from, tiles: shuffle(it.tiles, r), answer, accepted: it.to, orderFree: !!it.orderFree, changed: it.changed, hints, explain: `${it.to[0]} ${it.why ? "— " + it.why : ""}`.trim() };
  }

  // facts (Β4)
  function qFact(ix, it, r, { guess = false } = {}) {
    if (it.t === "tf") return { type: "tf", itemId: it.id, guess, label: guess ? L.guess : L.tf, prompt: it.q, answer: !!it.a, yes: "Σωστό", no: "Λάθος", explain: `${it.why}${it.flip ? ` ${it.a ? "Η παγίδα θα ήταν: " : "Σωστά: "}«${it.flip}»` : ""}` };
    return { type: "mcq", itemId: it.id, guess, label: guess ? L.guess : "Εισαγωγή", prompt: it.q, options: shuffle(it.options, r), answer: it.a, explain: it.why };
  }

  // hooks (Β3)
  function qHook(ix, it, r, { guess = false } = {}) {
    const pool = ix.byKind.hook.filter((x) => x.id !== it.id && norm(x.el) !== norm(it.el));
    const wrong = distinctBy(pool.filter((x) => x.unitId === it.unitId), 3, r, [it], (x) => norm(x.el));
    const more = wrong.length < 3 ? distinctBy(pool, 3 - wrong.length, r, [it, ...wrong], (x) => norm(x.el)) : [];
    return { type: "mcq", itemId: it.id, guess, label: guess ? L.guess : it.transfer ? L.decode : L.hook, prompt: guess ? `Ποια νεοελληνική λέξη μπορεί να συγγενεύει με το ${wrap(it.grc)};` : `Ποια νεοελληνική λέξη είναι ετυμολογικά συγγενής με το ${wrap(it.grc)};`, word: it.grc, sub: (it.forms || []).slice(0, 3).join(", "), options: shuffle([it.el, ...wrong.concat(more).map((x) => x.el)], r), answer: it.el, explain: `${it.grc} → ${it.el}${(it.more || []).length ? ", " + it.more.slice(0, 4).join(", ") : ""}. ${it.story || ""}`.trim() };
  }
  /** Β3 shape B (2023, 2026): «βρες στο κείμενο μία ετυμολογικά συγγενή λέξη της λέξης …»: tap the form inside a sentence of the course. */
  function qHookFind(ix, it, r) {
    const forms = (it.forms || []).map(stripMarks).filter(Boolean);
    if (!forms.length) return null;
    const candidates = ix.byKind.sentence.filter((s) => tokens(s.grc).some((t) => forms.includes(stripMarks(t))));
    if (!candidates.length) return null;
    const same = candidates.filter((s) => s.unitId === it.unitId);
    const s = (same.length ? same : candidates)[Math.floor(r() * (same.length ? same : candidates).length)];
    const toks = tokens(s.grc);
    const answer = toks.map((t, i) => (forms.includes(stripMarks(t)) ? i : -1)).filter((i) => i >= 0);
    return { type: "find", itemId: it.id, label: L.hookFind, prompt: `Βρες στο κείμενο μία λέξη ετυμολογικά συγγενή με τη λέξη ${wrap("«" + it.el + "»")}`, words: toks, answer, single: true, explain: `${it.el} ~ ${it.grc}. ${it.story || ""}`.trim() };
  }
  /** Β3 shape C (2024, 2025): fill the gap of a modern sentence with a cognate. */
  function qHookGap(ix, it, r, n = 0) {
    const g = (it.gaps || [])[n];
    if (!g) return null;
    const pool = ix.byKind.hook.filter((x) => x.id !== it.id).flatMap((x) => [x.el, ...(x.more || [])]).concat(ix.byKind.word.flatMap((x) => (x.etym || []).map((e) => e.el)));
    const wrong = distinctBy(pool.filter((x) => norm(x) !== norm(g.a) && !(it.more || []).some((m) => norm(m) === norm(x)) && norm(x) !== norm(it.el)), 3, r, [g.a], norm);
    if (wrong.length < 2) return null;
    return { type: "mcq", itemId: it.id, label: L.hookGap, prompt: `Συμπλήρωσε με λέξη ετυμολογικά συγγενή του ${wrap(it.grc)}: ${g.s}`, options: shuffle([g.a, ...wrong], r), answer: g.a, explain: `${g.s.replace(/_{2,}/, g.a)} (${it.grc} → ${g.a}).` };
  }
  /** Β3 exam shape A: 5 ancient words left, 7 modern right (2 spare). */
  function qMatchSpare(ix, hooks, r, n = 5, spareN = 2) {
    const picked = [];
    const seenL = new Set(), seenM = new Set();
    for (const x of shuffle(hooks, r)) {
      const a = norm(x.grc), b = norm(x.el);
      if (seenL.has(a) || seenM.has(b)) continue;
      seenL.add(a); seenM.add(b); picked.push(x);
      if (picked.length === n) break;
    }
    if (picked.length < 3) return null;
    const pairs = picked.map((h) => [h.grc, h.el, h.id]);
    const spare = distinctBy(ix.byKind.hook.filter((h) => !picked.includes(h) && !pairs.some((p) => norm(p[1]) === norm(h.el))).map((h) => h.el), spareN, r, [], norm);
    return { type: "match", itemId: null, itemIds: picked.map((h) => h.id), label: "Θέμα Β3", prompt: `Αντιστοίχισε τις αρχαίες με τις νεοελληνικές λέξεις (${spare.length} ${spare.length === 1 ? "νεοελληνική περισσεύει" : "νεοελληνικές περισσεύουν"})`, pairs, left: shuffle(pairs.map((p) => p[0]), r), right: shuffle(pairs.map((p) => p[1]).concat(spare), r), spare };
  }
  function qMatch(ix, its, r) {
    // both columns must be unambiguous: no two rows may share a left label or a right meaning
    const uniq = [];
    const seenL = new Set(), seenM = new Set();
    for (const x of shuffle(its.filter((y) => labelOf(y) && meaningOf(y)), r)) {
      const a = norm(labelOf(x)), b = norm(meaningOf(x));
      if (seenL.has(a) || seenM.has(b)) continue;
      seenL.add(a); seenM.add(b); uniq.push(x);
      if (uniq.length === 4) break;
    }
    if (uniq.length < 3) return null;
    const pairs = uniq.map((it) => [labelOf(it), meaningOf(it), it.id]);
    return { type: "match", itemId: null, itemIds: uniq.map((x) => x.id), label: L.match, prompt: uniq.every((x) => x.kind === "form") ? (uniq.every((x) => x.ask === uniq[0].ask) && uniq[0].ask.length <= 90 ? `Πάτα μια λέξη και μετά τον τύπο της: ${uniq[0].ask}` : "Πάτα μια λέξη και μετά τον τύπο που ζητά η άσκηση") : uniq.every((x) => x.kind === "role") ? "Πάτα μια λέξη και μετά τον συντακτικό της ρόλο" : "Πάτα μια λέξη και μετά τη σημασία της", rightGrc: uniq.every((x) => x.kind === "form"), pairs, left: shuffle(pairs.map((p) => p[0]), r), right: shuffle(pairs.map((p) => p[1]), r), spare: [] };
  }

  // sense (Β3 shape D): the same word with its modern meaning
  function qSense(ix, it, r, { guess = false } = {}) {
    const options = shuffle(it.sentences, r);
    return { type: "mcq", itemId: it.id, guess, label: guess ? L.guess : L.sense, prompt: `Στο κείμενο «${it.grc}» σημαίνει «${it.text_el}». Σε ποια πρόταση η λέξη έχει τη νεοελληνική σημασία «${it.modern_el}»;`, options, answer: it.sentences[it.a], explain: it.why };
  }

  // claims (Β1): the answer chain, and «ποιο επιχείρημα απαντά καλύτερα»
  function qChain(ix, it, r) {
    const tiles = shuffle([...it.chain.map((t) => ({ ...t, real: true })), ...(it.distractors || []).map((t) => ({ ...t, real: false }))], r);
    return { type: "chain", itemId: it.id, label: L.chain, prompt: it.q, tiles, answer: it.chain.map((t) => t.el), marks: it.marks, explain: `${it.why || ""} Πρότυπη απάντηση: ${it.chain.map((t) => (t.grc ? `${t.el} («${t.grc}»)` : t.el)).join(" ")}`.trim() };
  }
  function qClaimBest(ix, it, r) {
    if (!it.best) return null;
    return { type: "mcq", itemId: it.id, label: L.best, prompt: `${it.q} Ποια απάντηση τεκμηριώνεται καλύτερα από το κείμενο;`, options: shuffle(it.best.options, r), answer: it.best.a, explain: it.why || "" };
  }

  // parallel (Β2): sort statements into ομοιότητα / διαφορά / δεν προκύπτει
  const PARALLEL_BUCKETS = ["ομοιότητα", "διαφορά", "δεν προκύπτει"];
  function qParallel(ix, it, r) {
    const buckets = PARALLEL_BUCKETS.filter((b) => it.items.some((x) => x.bucket === b)).length >= 2 ? PARALLEL_BUCKETS : [...new Set(it.items.map((x) => x.bucket))];
    return { type: "bucket", itemId: it.id, label: L.parallel, prompt: `${it.author_el}: «${it.modern}» — σε σχέση με το «${it.grc_quote}». Κάθε πρόταση: ομοιότητα, διαφορά ή δεν προκύπτει;`, buckets, items: shuffle(it.items.map((x) => ({ text: x.el, bucket: x.bucket })), r), answer: it.items, explain: it.why || "" };
  }

  // unseen (Γ2): the checklist of expected points
  function qChecklist(ix, it, r, n = 0) {
    const q = (it.questions || [])[n];
    if (!q) return null;
    const items = shuffle([...q.points.map((p) => ({ text: p, real: true })), ...(q.distractors || []).map((p) => ({ text: p, real: false }))], r);
    return { type: "checklist", itemId: it.id, label: L.checklist, prompt: q.q, passage: it.grc, intro: it.intro_el, items, answer: q.points, explain: q.why || `Τα σημεία που περιμένει η επιτροπή: ${q.points.join("· ")}.` };
  }

  // traps, swipe
  function qSpot(ix, it, r) {
    const showWrong = r() < 0.6;
    // distractors must look like the real fix: a similar number of words and length, same unit first
    const words = (t) => String(t).trim().split(/\s+/).length;
    const like = (t) => Math.abs(words(t) - words(it.right)) <= 1 && String(t).length <= String(it.right).length * 2 + 6;
    const others = ix.byKind.trap.filter((x) => x.id !== it.id);
    const taken = (x) => norm(x) === norm(it.right) || norm(x) === norm(it.wrong);
    const fromUnit = others.filter((x) => x.unitId === it.unitId).flatMap((x) => [x.right, x.wrong]).filter((x) => like(x) && !taken(x));
    const fromAll = others.flatMap((x) => [x.right, x.wrong]).filter((x) => like(x) && !taken(x));
    let wrong = distinctBy(fromUnit, 2, r, [it.right, it.wrong], norm);
    if (wrong.length < 2) wrong = wrong.concat(distinctBy(fromAll, 2 - wrong.length, r, [it.right, it.wrong, ...wrong], norm));
    if (wrong.length < 2) wrong = wrong.concat(distinctBy(others.flatMap((x) => [x.right, x.wrong]).filter((x) => !taken(x)), 2 - wrong.length, r, [it.right, it.wrong, ...wrong], norm));
    const fixOptions = shuffle([it.right, it.wrong, ...wrong], r);
    return { type: "spot", itemId: it.id, label: L.spot, prompt: it.ask, shown: showWrong ? it.wrong : it.right, isRight: !showWrong, fixOptions, fix: it.right, explain: it.why };
  }
  function qSwipe(ix, words) {
    return { type: "swipe", itemId: null, itemIds: words.map((w) => w.id), label: L.swipe, prompt: "Ξέρεις τη σημασία; Γύρνα την κάρτα και πες την αλήθεια.", cards: words.map((w) => ({ itemId: w.id, front: w.grc, sub: w.forms, back: w.el, hook: w.hook || "" })) };
  }

  /** The intro (teach) step for any item kind. */
  const qIntro = (it) => ({ type: "intro", itemId: it.id, kind: it.kind });

  /** The quick check right after an intro. */
  function qCheck(ix, it, r) {
    switch (it.kind) {
      case "word": return qWordMeaning(ix, it, r, { label: L.newWord });
      case "sentence": return qSentenceBuild(ix, it, r);
      case "form": return qCell(ix, it, r);
      case "role": return qRoleMcq(ix, it, r);
      case "clause": return qClauseSteps(ix, it, r);
      case "transform": return qTransform(ix, it, r, { faded: (it.steps || []).length });
      case "fact": return qFact(ix, it, r);
      case "hook": return qHook(ix, it, r);
      case "sense": return qSense(ix, it, r);
      case "claim": return qChain(ix, it, r);
      case "parallel": return qParallel(ix, it, r);
      case "unseen": return qChecklist(ix, it, r, 0);
      case "trap": return qSpot(ix, it, r);
      default: return null;
    }
  }
  /** Practice questions for an item (the harder ones). */
  function qPractice(ix, it, r) {
    const out = [];
    switch (it.kind) {
      case "word": {
        if (it.pos === "noun" && it.gender) out.push(qWordGender(ix, it, r));
        if (it.pos === "noun") out.push(qWordGenitive(ix, it, r));
        if (it.pos === "verb") out.push(qPrincipalParts(ix, it, r));
        out.push(qWordEtym(ix, it, r));
        out.push(qWordReverse(ix, it, r));
        break;
      }
      case "sentence": out.push(qSentenceNote(ix, it, r, 0)); out.push(qFind(ix, it, r)); out.push(qAnaphora(ix, it, r, 0)); out.push(qSentenceTf(ix, it, r, 0)); out.push(qDevice(ix, it, r, 0)); break;
      case "form": out.push(qFormBuild(ix, it, r) || qType(ix, it, r)); break;
      case "role": out.push(qLabel(ix, it, r) || qRoleBuild(ix, it, r)); break;
      case "transform": out.push(qTransform(ix, it, r, { faded: Math.max(0, (it.steps || []).length - 2) })); break;
      case "hook": out.push(qHookFind(ix, it, r) || qHookGap(ix, it, r, 0) || qHook(ix, it, r)); break;
      case "fact": out.push(qFact(ix, it, r)); break;
      case "claim": out.push(qClaimBest(ix, it, r)); break;
      case "unseen": out.push(qChecklist(ix, it, r, 1)); break;
      case "trap": out.push(qSpot(ix, it, r)); break;
      default: break;
    }
    return out.filter(Boolean);
  }
  /** One retrieval question for a learned item (review, Στάδιο pool, daily mix). */
  function qReview(ix, it, r) {
    const roll = r();
    switch (it.kind) {
      case "word": {
        const alts = [() => qWordMeaning(ix, it, r, { label: L.review }), () => qWordReverse(ix, it, r)];
        if (it.pos === "noun" && it.gender) alts.push(() => qWordGender(ix, it, r));
        if (it.pos === "noun") alts.push(() => qWordGenitive(ix, it, r));
        if (it.pos === "verb") alts.push(() => qPrincipalParts(ix, it, r));
        if (it.etym && it.etym.length) alts.push(() => qWordEtym(ix, it, r));
        return alts[Math.floor(roll * alts.length)]() || qWordMeaning(ix, it, r, { label: L.review });
      }
      case "sentence": {
        const alts = [() => qSentenceBuild(ix, it, r), () => qSentenceNote(ix, it, r, 0), () => qFind(ix, it, r), () => qAnaphora(ix, it, r, 0), () => qSentenceTf(ix, it, r, 0), () => qDevice(ix, it, r, 0)];
        return alts[Math.floor(roll * alts.length)]() || qSentenceBuild(ix, it, r);
      }
      case "form": return roll < 0.45 ? qCell(ix, it, r, { label: L.review }) : roll < 0.75 ? (qFormBuild(ix, it, r) || qType(ix, it, r)) : qType(ix, it, r);
      case "rule": return qRuleQuiz(ix, it, r, Math.floor(roll * (it.quiz || []).length)) || null;
      case "role": return roll < 0.4 ? qRoleMcq(ix, it, r) : roll < 0.7 ? qRoleBuild(ix, it, r) : (qLabel(ix, it, r) || qRoleMcq(ix, it, r));
      case "clause": return qClauseSteps(ix, it, r);
      case "transform": return qTransform(ix, it, r, { faded: 0 });
      case "fact": return qFact(ix, it, r);
      case "hook": return roll < 0.5 ? qHook(ix, it, r) : (qHookFind(ix, it, r) || qHookGap(ix, it, r, 0) || qHook(ix, it, r));
      case "sense": return qSense(ix, it, r);
      case "claim": return roll < 0.6 ? qChain(ix, it, r) : (qClaimBest(ix, it, r) || qChain(ix, it, r));
      case "parallel": return qParallel(ix, it, r);
      case "unseen": return qChecklist(ix, it, r, Math.floor(roll * (it.questions || []).length)) || qChecklist(ix, it, r, 0);
      case "trap": return qSpot(ix, it, r);
      default: return null;
    }
  }

  // ---------- lesson / roundup / practice ----------
  const quizzable = (it) => it.kind !== "rule";
  /** Which item kinds can open a lesson with a no-penalty guess. */
  function qGuess(ix, it, r) {
    switch (it.kind) {
      case "word": return qWordMeaning(ix, it, r, { guess: true });
      case "form": return qCell(ix, it, r, { guess: true });
      case "role": return qRoleMcq(ix, it, r, { guess: true });
      case "fact": return qFact(ix, it, r, { guess: true });
      case "hook": return qHook(ix, it, r, { guess: true });
      case "sense": return qSense(ix, it, r, { guess: true });
      default: return null;
    }
  }

  /**
   * One sitting of a lesson: guess first (pretest, no penalty) -> each item's intro + quick check
   * (transfer items skip the intro) -> practice (held-back / harder questions) -> a match round
   * -> one or two older due items interleaved. Missed questions are re-queued by the UI.
   */
  function buildLesson(ix, s, lessonId, seed, sitting = 0) {
    const r = rng(seed);
    const sittings = lessonSittings(ix, lessonId);
    const ids = sittings[Math.min(sitting, sittings.length - 1)] || [];
    const its = ids.map((id) => ix.items.get(id));
    const steps = [];
    const guessable = its.find((x) => !x.transfer && qGuess(ix, x, r));
    if (guessable) { const g = qGuess(ix, guessable, r); if (g) steps.push(g); }

    const practice = [];
    let textN = 0;
    for (const it of its) {
      if (it.kind === "rule") {
        steps.push(qIntro(it));
        (it.quiz || []).forEach((_, i) => { const q = qRuleQuiz(ix, it, r, i); if (q) steps.push(q); });
        continue;
      }
      if (it.transfer) { practice.push(qCheck(ix, it, r)); continue; }
      // a headword she already met in an earlier unit is not re-taught: one retrieval question instead of the card
      if (it.kind === "word" && ix.isDup(it) && s.items[canon(it.id)]) { steps.push(qWordMeaning(ix, it, r, { label: L.review })); practice.push(...qPractice(ix, it, r)); continue; }
      steps.push(qIntro(it));
      let chk = qCheck(ix, it, r);
      // reference-text sentences: every second card is checked the way Θέμα Α1/Β3 asks (Σ/Λ, anaphora, note, find)
      // instead of one more translation build, so a text lesson is not «card, tiles, card, tiles» six times over
      if (it.kind === "sentence" && it.unit_ref && textN++ % 2 === 1) {
        const alt = qSentenceTf(ix, it, r, 0) || qAnaphora(ix, it, r, 0) || qSentenceNote(ix, it, r, 0) || qFind(ix, it, r);
        if (alt) { practice.push(chk); chk = alt; }
      }
      if (chk) steps.push(chk);
      practice.push(...qPractice(ix, it, r));
    }
    const transfers = practice.filter((q) => q && q.label === L.decode);
    const rest = shuffle(practice.filter((q) => q && !transfers.includes(q)), r);
    steps.push(...shuffle([...transfers, ...rest.slice(0, Math.max(2, 5 - transfers.length))], r));

    const matchable = its.filter((x) => ["word", "hook", "form", "role", "sense"].includes(x.kind));
    if (matchable.length >= 3) {
      const m = matchable.every((x) => x.kind === "hook") && ix.byKind.hook.length >= 7 ? qMatchSpare(ix, matchable, r)
        : matchable.every((x) => x.kind === "form") ? (qMatchTable(ix, matchable, r) || qMatch(ix, matchable, r))
        : qMatch(ix, matchable, r);
      if (m) steps.push(m);
    }

    const own = new Set(its.map((x) => x.id));
    const older = dueItems(s, dayKey()).filter((id) => !own.has(id) && ix.items.has(id)).slice(0, 2);
    for (const id of older) { const q = qReview(ix, ix.items.get(id), r); if (q) steps.push({ ...q, label: L.review }); }
    return steps.filter(Boolean);
  }

  /** Ανακεφαλαίωση: 8-10 mixed retrieval questions from the unit and a match. */
  function buildRoundup(ix, s, unitId, seed) {
    const r = rng(seed);
    const unit = ix.unitOf(unitId);
    const its = unit.lessons.flatMap((l) => l.items.map((x) => ix.items.get(x.id))).filter(quizzable);
    const steps = [];
    const picks = interleave(shuffle(its, r), 8);
    for (const it of picks) { const q = qReview(ix, it, r); if (q) steps.push(q); }
    const matchable = its.filter((x) => ["word", "hook", "form", "role", "sense"].includes(x.kind));
    if (matchable.length >= 3) { const m = qMatch(ix, matchable, r); if (m) steps.push(m); }
    return steps;
  }

  /** Never two items of the same kind (or the same lemma) in a row when it can be avoided. */
  function interleave(items, n = items.length) {
    const out = [];
    const pool = items.slice();
    const sig = (x) => `${x.kind}|${x.lemma || x.grc || ""}`;
    while (pool.length && out.length < n) {
      const last = out[out.length - 1];
      let i = last ? pool.findIndex((x) => x.kind !== last.kind) : 0;
      if (i < 0) i = pool.findIndex((x) => sig(x) !== sig(last));
      if (i < 0) i = 0;
      out.push(pool.splice(i, 1)[0]);
    }
    return out;
  }

  /**
   * Επανάληψη: due items first (oldest due, lowest box), then 30% from the Τετράδιο λαθών, then the
   * weakest boxes; interleaved by kind. 10 questions.
   */
  function buildPractice(ix, s, seed, n = 10) {
    const r = rng(seed);
    const today = dayKey();
    const has = (id) => ix.items.has(id) && quizzable(ix.items.get(id));
    const due = dueItems(s, today).filter(has);
    const notebook = notebookItems(s).filter((id) => has(id) && !due.includes(id));
    const weak = Object.entries(s.items).filter(([id]) => has(id) && !due.includes(id) && !notebook.includes(id)).sort((a, b) => a[1].box - b[1].box || b[1].wrong - a[1].wrong).map(([id]) => id);
    const nb = Math.round(n * 0.3);
    let ids = due.slice(0, n - Math.min(nb, notebook.length)).concat(notebook.slice(0, nb));
    if (ids.length < n) ids = ids.concat(weak.slice(0, n - ids.length));
    const picked = interleave(ids.slice(0, n).map((id) => ix.items.get(id)));
    return picked.map((it) => qReview(ix, it, r)).filter(Boolean);
  }
  /** Daily vocabulary swipe set: due words + words of the Φάκελος unit the class is on. */
  function buildSwipe(ix, s, seed, n = 25) {
    const r = rng(seed);
    const today = dayKey();
    const words = ix.byKind.word.filter((w) => !ix.isDup(w));
    const due = dueItems(s, today).map((id) => ix.items.get(id)).filter((x) => x && x.kind === "word");
    const school = ix.byKind.word.filter((w) => w.unit_ref === s.fakelos).map((w) => ix.items.get(canon(w.id))).filter((w, i, a) => a.indexOf(w) === i && !due.includes(w));
    const learned = words.filter((w) => s.items[w.id] && !due.includes(w) && !school.includes(w));
    const set = due.slice(0, 15).concat(shuffle(school, r).slice(0, 10));
    const fill = shuffle(learned.length ? learned : words.filter((w) => !set.includes(w)), r);
    const cards = set.concat(fill).slice(0, n);
    return cards.length ? qSwipe(ix, shuffle(cards, r)) : null;
  }

  // ---------- Στάδιο (speed round) ----------
  function stadionPool(ix, s) {
    const kinds = new Set(["form", "role", "hook", "fact", "word"]);
    let pool = Object.keys(s.items).map((id) => ix.items.get(id)).filter((x) => x && kinds.has(x.kind));
    if (pool.length < 6) pool = ix.lessons.slice(0, 3).flatMap((l) => l.items.map((x) => ix.items.get(x.id))).filter((x) => kinds.has(x.kind));
    if (pool.length < 6) pool = [...ix.items.values()].filter((x) => kinds.has(x.kind));
    return pool;
  }
  /** Three options, 20 seconds, one miss ends the lap. */
  function stadionQuestion(ix, s, r) {
    const pool = stadionPool(ix, s);
    if (!pool.length) return null;
    const it = pool[Math.floor(r() * pool.length)];
    let q;
    if (it.kind === "form") q = qCell(ix, it, r, { label: L.stadion });
    else if (it.kind === "role") q = qRoleMcq(ix, it, r);
    else if (it.kind === "hook") q = qHook(ix, it, r);
    else if (it.kind === "fact") q = qFact(ix, it, r);
    else q = r() < 0.5 ? qWordMeaning(ix, it, r) : qWordReverse(ix, it, r);
    if (q.type === "mcq") {
      const wrong = q.options.filter((o) => o !== q.answer).slice(0, 2);
      q = { ...q, options: shuffle([q.answer, ...wrong], r) };
    }
    return { ...q, label: L.stadion, ms: STADION_MS };
  }

  // ---------- Θέμα της ημέρας and Διαγώνισμα ----------
  const DAILY_BY_WEEKDAY = { 1: "Γ3", 2: "Γ4", 3: "Α1+Β3", 4: "Γ1+Γ2", 5: "Β4", 6: "Β1+Β2", 0: "mix" };
  /** Items of a kind the student can be asked: from units she started, else the first lesson of the units feeding the section. */
  function drawPool(ix, s, kind, section, filter = () => true) {
    const started = new Set(Object.keys(s.items).map((id) => (ix.items.get(id) || {}).unitId).filter(Boolean));
    const all = ix.byKind[kind].filter(filter);
    let pool = all.filter((x) => started.has(x.unitId));
    if (pool.length < 2) pool = all.filter((x) => (ix.unitOf(x.unitId).exam || []).includes(section) && x.lessonId === ix.unitOf(x.unitId).lessons[0].id);
    if (pool.length < 2) pool = all;
    return pool;
  }
  const withMarks = (qs, marks, section) => { const live = qs.filter(Boolean); const each = marks / Math.max(1, live.length); return live.map((q) => ({ ...q, section, marks: each })); };
  /** One exam section as questions worth its real marks (scaled). */
  function buildSection(ix, s, section, r, size = 1) {
    const M = SECTION_MARKS;
    const pick = (pool, n) => shuffle(pool, r).slice(0, n);
    const taught = (x) => !!x.unit_ref;
    if (section === "Α1") {
      const tfs = pick(drawPool(ix, s, "sentence", "Α1", (x) => taught(x) && x.tf && x.tf.length), 2 + (size - 1)).map((it) => qSentenceTf(ix, it, r, Math.floor(r() * it.tf.length)));
      const ana = pick(drawPool(ix, s, "sentence", "Α1", (x) => taught(x) && x.anaphora && x.anaphora.length), 1).map((it) => qAnaphora(ix, it, r, Math.floor(r() * it.anaphora.length)));
      let qs = tfs.concat(ana);
      if (!qs.length) qs = pick(drawPool(ix, s, "sentence", "Α1", taught), 2).map((it) => qSentenceBuild(ix, it, r));
      return withMarks(qs, M["Α1"], "Α1");
    }
    if (section === "Β1") return withMarks(pick(drawPool(ix, s, "claim", "Β1"), size).map((it) => qChain(ix, it, r)), M["Β1"], "Β1");
    if (section === "Β2") return withMarks(pick(drawPool(ix, s, "parallel", "Β2"), size).map((it) => qParallel(ix, it, r)), M["Β2"], "Β2");
    if (section === "Β3") {
      const hooks = drawPool(ix, s, "hook", "Β3");
      const finds = pick(hooks, 3).map((it) => qHookFind(ix, it, r)).filter(Boolean);
      if (finds.length >= 3) return withMarks(finds.concat(pick(drawPool(ix, s, "sense", "Β3"), 1).map((it) => qSense(ix, it, r))), M["Β3"], "Β3");
      const m = qMatchSpare(ix, hooks, r);
      return withMarks(m ? [m] : pick(hooks, 3).map((it) => qHook(ix, it, r)), M["Β3"], "Β3");
    }
    if (section === "Β4") return withMarks(pick(drawPool(ix, s, "fact", "Β4"), size === 1 ? 3 : 5).map((it) => qFact(ix, it, r)), M["Β4"], "Β4");
    if (section === "Γ1") return withMarks(pick(drawPool(ix, s, "sentence", "Γ1", (x) => !taught(x)), 2 + (size - 1)).map((it) => qSentenceBuild(ix, it, r)), M["Γ1"], "Γ1");
    if (section === "Γ2") return withMarks(pick(drawPool(ix, s, "unseen", "Γ2", (x) => x.questions && x.questions.length), 1).map((it) => qChecklist(ix, it, r, Math.floor(r() * it.questions.length))), M["Γ2"], "Γ2");
    if (section === "Γ3") {
      const nominal = pick(drawPool(ix, s, "form", "Γ3", (x) => !isVerbCell(x.cell)), 2 + (size - 1));
      const verbal = pick(drawPool(ix, s, "form", "Γ3", (x) => isVerbCell(x.cell)), 3 + (size - 1));
      return withMarks(nominal.concat(verbal).map((it) => (r() < 0.5 ? qCell(ix, it, r) : qType(ix, it, r))), M["Γ3"], "Γ3");
    }
    if (section === "Γ4") {
      const roles = pick(drawPool(ix, s, "role", "Γ4"), 3 + (size - 1)).map((it) => qLabel(ix, it, r) || (r() < 0.5 ? qRoleMcq(ix, it, r) : qRoleBuild(ix, it, r)));
      const b = r() < 0.5 ? pick(drawPool(ix, s, "clause", "Γ4"), 1).map((it) => qClauseSteps(ix, it, r)) : pick(drawPool(ix, s, "transform", "Γ4"), 1).map((it) => qTransform(ix, it, r, { faded: 0 }));
      const extra = b.length ? b : pick(drawPool(ix, s, "transform", "Γ4"), 1).map((it) => qTransform(ix, it, r, { faded: 0 })).concat(pick(drawPool(ix, s, "clause", "Γ4"), 1).map((it) => qClauseSteps(ix, it, r))).slice(0, 1);
      return withMarks(roles.concat(extra), M["Γ4"], "Γ4");
    }
    return [];
  }
  /** Θέμα της ημέρας: date-seeded, one exam section (or pair) per weekday, scored with its real marks. */
  function buildDaily(ix, s, dateKey) {
    const r = rng(dateSeed(dateKey));
    const sec = DAILY_BY_WEEKDAY[weekday(dateKey)];
    let steps, title, marks;
    if (sec === "mix") { steps = withMarks(buildPractice(ix, s, dateSeed(dateKey), 6), 20, "mix"); title = "Μικτό από τα αδύναμα κουτιά"; marks = 20; }
    else {
      const secs = sec.split("+");
      steps = secs.flatMap((x) => buildSection(ix, s, x, r));
      title = `Θέμα ${secs.join(" + ")}`;
      marks = secs.reduce((a, x) => a + SECTION_MARKS[x], 0);
    }
    if (!steps.length) { steps = withMarks(buildPractice(ix, s, dateSeed(dateKey), 6), 20, "mix"); title = "Μικτό"; marks = 20; }
    // nothing learned yet: a taste of the first lessons, so the tile never opens on an empty run
    if (!steps.length) { const firsts = ix.lessons.slice(0, 3).flatMap((l) => l.items.map((x) => ix.items.get(x.id))).filter(quizzable); steps = withMarks(interleave(shuffle(firsts, r)).slice(0, 6).map((it) => qReview(ix, it, r)), 20, "mix"); title = "Μικτό από τα πρώτα μαθήματα"; marks = 20; }
    return { section: sec, title, marks, steps, date: dateKey };
  }
  /** Μικρό διαγώνισμα: one paper scaled to ~25 minutes, every Θέμα with its real marks. */
  function buildMock(ix, s, seed) {
    const r = rng(seed);
    const steps = SECTIONS.flatMap((sec) => buildSection(ix, s, sec, r, sec === "Β4" ? 2 : 1));
    return { steps, marks: 100 };
  }
  /** Score a finished run of marked questions: per-section [got, total]. */
  function scoreSections(results) {
    const out = {};
    for (const { q, score } of results) {
      if (!q.section) continue;
      out[q.section] = out[q.section] || [0, 0];
      out[q.section][0] += (q.marks || 0) * score;
      out[q.section][1] += q.marks || 0;
    }
    return out;
  }
  /** Raw marks /100 → the 20-point scale the ministry publishes (÷5; the conversion is inferred, say so in the UI). */
  const toTwenty = (score, marks) => (marks ? Math.round((score / marks) * 20 * 10) / 10 : 0);
  function recordDaily(s, dateKey, score, marks, section) {
    const prev = addDays(dateKey, -1);
    const had = !!s.dailies[dateKey];
    s.dailies[dateKey] = { section, score: Math.round(score * 10) / 10, marks };
    if (!had) s.dailyStreak = s.dailies[prev] || (isWeekend(prev) && (s.dailies[addDays(prev, -1)] || s.dailies[addDays(prev, -2)])) ? s.dailyStreak + 1 : 1;
  }

  // ---------- badges: Athenian ranks and honours ----------
  const unitsFeeding = (ix, sec) => ix.course.units.filter((u) => (u.exam || []).includes(sec));
  const BADGES = [
    { id: "pais", name: "Παῖς", desc: "Το πρώτο μάθημα", test: (s) => Object.keys(s.done).length >= 1 },
    { id: "anamartitos", name: "Ἀναμάρτητος", desc: "Μάθημα χωρίς λάθος", test: (s) => Object.values(s.done).some((d) => d.perfect) },
    { id: "ephebos", name: "Ἔφηβος", desc: "Σερί 7 ημερών", test: (s) => s.bestStreak >= 7 },
    { id: "polites", name: "Πολίτης", desc: "12 μαθήματα", test: (s) => Object.keys(s.done).length >= 12 },
    { id: "bouleutes", name: "Βουλευτής", desc: "Σερί 30 ημερών", test: (s) => s.bestStreak >= 30 },
    { id: "grammateus", name: "Γραμματεύς", desc: "50 τύποι σε κουτί 3+", test: (s, ix) => ix && Object.entries(s.items).filter(([id, v]) => v.box >= 3 && (ix.items.get(id) || {}).kind === "form").length >= 50 },
    { id: "rhetor", name: "Ῥήτωρ", desc: "30 προτάσεις αδιδάκτου σε κουτί 3+", test: (s, ix) => ix && Object.entries(s.items).filter(([id, v]) => { const it = ix.items.get(id); return v.box >= 3 && it && it.kind === "sentence" && !it.unit_ref; }).length >= 30 },
    { id: "strategos", name: "Στρατηγός", desc: "Όλα τα κείμενα αναφοράς", test: (s, ix) => ix && unitsFeeding(ix, "Α1").length > 0 && unitsFeeding(ix, "Α1").every((u) => u.lessons.every((l) => s.done[l.id])) },
    { id: "olympionikes", name: "Ὀλυμπιονίκης", desc: "Στάδιο 15+", test: (s) => s.stadionBest >= 15 },
    { id: "akademaikos", name: "Ἀκαδημαϊκός", desc: "Η Εισαγωγή (Β4) ολόκληρη", test: (s, ix) => ix && unitsFeeding(ix, "Β4").filter((u) => !(u.exam || []).includes("Α1")).some((u) => s.done[`${u.id}-review`]) },
    { id: "mantis", name: "Μάντις", desc: "10 Θέματα της ημέρας στη σειρά", test: (s) => s.dailyStreak >= 10 },
    { id: "philosophos", name: "Φιλόσοφος", desc: "Διαγώνισμα 20/20", test: (s) => s.mocks.some((m) => m.marks > 0 && m.score >= m.marks) },
    { id: "gnothi20", name: "Γνῶθι το 20", desc: "Όλοι οι τίτλοι", test: (s) => BADGES.filter((b) => b.id !== "gnothi20").every((b) => s.badges[b.id]) },
  ];
  function awardBadges(s, today, ix) {
    const fresh = [];
    for (const b of BADGES) if (!s.badges[b.id] && b.test(s, ix)) { s.badges[b.id] = today; fresh.push(b); }
    return fresh;
  }

  return {
    EXAM_DATE, EXAM_TIME, SECTION_MARKS, SECTIONS, STADION_MS, GOALS, MAX_FREEZES, OBOLS_PER_DRACHMA, INTERVALS, BADGES, L, GENDERS, POS_EL, PART_LABELS, UNIT_REFS, KINDS, PARALLEL_BUCKETS, CLAUSE_STEPS,
    dayKey, parseDay, addDays, daysBetween, weekKey, isWeekend, weekday, missedWeekdays, fmtDayGr,
    freshState, touchStreak, liveStreak, addXp, weekXp, drachmas, countdown, examDate, reviewCap,
    learn, grade, canon, cleanSrc, dueItems, notebookItems,
    norm, strictKey, sameAnswer, accepts, acceptsStrict, checkTyped, tokens, stripMarks, isPolytonic, hasGreekLetters, findPhrase, isVerbCell, isCell, cellLabel, lemmaOf,
    indexCourse, sortUnits, lessonSittings, itemWeight, pathNodes, isUnlocked, nextNode, unitProgress, remainingSittings,
    rng, shuffle, pickDistinct, dateSeed, interleave,
    labelOf, meaningOf, partsOf,
    qWordMeaning, qWordReverse, qWordGender, qWordGenitive, qPrincipalParts, qWordEtym, qSentenceBuild, qSentenceNote, qFind, qAnaphora, qDevice, qSentenceTf,
    qCell, qType, qFormBuild, qMatchTable, qRuleQuiz, qRoleMcq, qRoleBuild, qLabel, qClauseSteps, qTransform, qFact, qHook, qHookFind, qHookGap, qMatchSpare, qMatch,
    qSense, qChain, qClaimBest, qParallel, qChecklist, qSpot, qSwipe, qIntro, qCheck, qPractice, qReview, qGuess,
    buildLesson, buildRoundup, buildPractice, buildSwipe, stadionQuestion, stadionPool,
    buildSection, buildDaily, buildMock, scoreSections, toTwenty, recordDaily, DAILY_BY_WEEKDAY, awardBadges,
  };
})();

if (typeof module !== "undefined") module.exports = { Engine };
