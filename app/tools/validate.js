// Content validator: checks every unit file against CONTENT_SCHEMA.md.
// Used by test/content.test.js and runnable on its own:
//   node app/tools/validate.js                 (all units, example included)
//   node app/tools/validate.js app/src/units/u3.js
const path = require("node:path");
const { Engine: E } = require("../src/engine.js");

const KINDS = ["word", "sentence", "form", "rule", "role", "clause", "transform", "fact", "hook", "sense", "claim", "parallel", "unseen", "trap"];
const STATUS = ["book", "exam", "general", "unsure"];
const SECTIONS = ["Α1", "Β1", "Β2", "Β3", "Β4", "Γ1", "Γ2", "Γ3", "Γ4"];
const POS = ["noun", "verb", "adj", "adv", "pron", "prep", "conj", "num", "particle", "phrase", "article", "interj"];
const GENDERS = ["m", "f", "n", "m/f"];
const HOOK_TYPES = ["root", "ablaut", "remote", "exam"];
const TRAP_CATS = ["read", "noun", "verb", "syntax", "translate", "interpret", "marking"];
const FACT_TOPICS = ["Σωκράτης", "Πλάτων", "Πρωταγόρας", "Πολιτεία", "Αριστοτέλης", "ΗΝ", "Πολιτικά"];
const CHAIN_T = ["thesis", "quote", "gloss", "link", "close"];
const PARALLEL_BUCKETS = E.PARALLEL_BUCKETS;
const UNIT_REFS = E.UNIT_REFS;
const GREEK = /[Ͱ-Ͽἀ-῿]/;

const isStr = (x) => typeof x === "string" && x.trim().length > 0;
const isArr = (x, min = 0) => Array.isArray(x) && x.length >= min;
const n = E.norm;
const sk = E.strictKey;
const words = (s) => String(s || "").trim().split(/\s+/).filter(Boolean).length;

/**
 * Validate one unit. Returns { errors: string[], warnings: string[] }.
 * `ctx.ids` (a Set) accumulates ids across units for course-wide uniqueness.
 */
function validateUnit(unit, ctx = { ids: new Set() }) {
  const errors = [];
  const warnings = [];
  const err = (where, msg) => errors.push(`${where}: ${msg}`);
  const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

  if (!unit || typeof unit !== "object") return { errors: ["unit: not an object (did the file set module.exports = unit?)"], warnings };
  const U = unit.id || "?";
  if (!/^u\d+(_example)?$/.test(String(unit.id))) err(U, "id must look like u3 (or u0_example)");
  if (!isStr(unit.title)) err(U, "title missing");
  if (!isStr(unit.blurb)) err(U, "blurb missing");
  if (!isArr(unit.exam, 1) || unit.exam.some((s) => !SECTIONS.includes(s))) err(U, `exam must list sections from ${SECTIONS.join(" ")}`);
  if (!isArr(unit.lessons, 1)) { err(U, "lessons missing"); return { errors, warnings }; }

  unit.lessons.forEach((l, li) => {
    const Lid = l.id || `${U} lesson ${li + 1}`;
    if (l.id !== `${unit.id}l${li + 1}`) err(Lid, `lesson id must be ${unit.id}l${li + 1}`);
    if (!isStr(l.title)) err(Lid, "title missing");
    if (!isArr(l.items, 1)) { err(Lid, "items missing"); return; }
    let quizzable = 0;
    for (const it of l.items) {
      const id = it.id || "(no id)";
      const w = `${Lid} › ${id}`;
      if (!isStr(it.id)) err(w, "id missing");
      else {
        if (!it.id.startsWith(`${unit.id.replace(/_example$/, "")}-`)) err(w, `id must start with "${unit.id.replace(/_example$/, "")}-"`);
        if (ctx.ids.has(it.id)) err(w, "duplicate id (ids are unique across the whole course)");
        ctx.ids.add(it.id);
      }
      if (!KINDS.includes(it.kind)) { err(w, `unknown kind "${it.kind}"`); continue; }
      if (it.kind !== "rule") quizzable++;
      if (!isStr(it.say)) err(w, "say missing (one-breath Greek line)");
      else { if (it.say.length > 160) err(w, `say is ${it.say.length} chars (max 160)`); if (!GREEK.test(it.say)) err(w, "say must be in Greek"); }
      if (!STATUS.includes(it.status)) err(w, `status must be one of ${STATUS.join("/")}`);
      if (it.status === "unsure") warn(w, "status unsure: needs a human reviewer (φιλόλογος)");
      if (!isStr(it.src)) err(w, "src missing (where the fact was checked)");
      if (it.exam !== undefined && (!Array.isArray(it.exam) || it.exam.some((y) => !Number.isInteger(y) || y < 2000 || y > 2030))) err(w, "exam must be a list of years");
      if (it.status === "exam" && !(Array.isArray(it.exam) && it.exam.length)) warn(w, 'status "exam" but no exam years listed');
      if (it.unit_ref !== undefined && !UNIT_REFS.includes(it.unit_ref)) err(w, `unit_ref must be one of the 19 Φάκελος codes (${UNIT_REFS.join(" ")})`);
      if (it.transfer !== undefined && typeof it.transfer !== "boolean") err(w, "transfer must be true/false");
      if (it.tier !== undefined && ![1, 2, 3].includes(it.tier)) err(w, "tier must be 1, 2 or 3");
      try { CHECK[it.kind](it, err, warn, w); } catch (e) { err(w, `validator crashed on this item: ${e.message}`); }
    }
    if (quizzable === 0) err(Lid, "a lesson needs at least one quizzable item (anything but rule)");
  });
  return { errors, warnings };
}

const distinct = (arr, w, err, what, key = n) => { const seen = new Set(); for (const x of arr) { const k = key(x); if (seen.has(k)) err(w, `${what}: duplicate "${x}"`); seen.add(k); } };
const noOverlap = (answers, distractors, w, err, what = "distractors", key = n) => { for (const d of distractors) if (answers.some((a) => key(a) === key(d))) err(w, `${what}: "${d}" equals an accepted answer`); };
/** Modern-Greek explanation field: must contain Greek letters. */
const hasGreek = (v, w, err, field) => { if (!isStr(v)) err(w, `${field} missing`); else if (!GREEK.test(v)) err(w, `${field} must be in Greek`); };
/** Ancient-Greek field: Greek letters; anything longer than one word must show polytonic marks (breathings, circumflex, subscript). */
const grc = (v, w, err, field) => {
  if (!isStr(v)) { err(w, `${field} missing`); return; }
  if (!GREEK.test(v)) { err(w, `${field} must be Ancient Greek (contains no Greek letters)`); return; }
  if (words(v) > 1 && !E.isPolytonic(v)) err(w, `${field} must be polytonic as the school books print it (no breathings/circumflex found in "${v.slice(0, 40)}")`);
};
const tokensOf = (s) => E.tokens(s).map(E.stripMarks);
const inText = (text, phrase) => E.findPhrase(E.tokens(text), phrase).length > 0 || n(text).includes(n(phrase));

const CHECK = {
  word(it, err, warn, w) {
    grc(it.grc, w, err, "grc");
    if (!POS.includes(it.pos)) err(w, `pos must be one of ${POS.join("/")}`);
    hasGreek(it.el, w, err, "el");
    if (!isStr(it.forms)) err(w, "forms missing (dictionary form as the school grammar prints it)");
    else {
      const parts = E.partsOf(it);
      const lemma = E.lemmaOf(it);
      if (parts[0] && n(parts[0]) !== n(lemma) && !n(parts[0]).startsWith(n(lemma).slice(0, 3))) warn(w, `forms should start with the lemma (${parts[0]} vs ${lemma})`);
      if (it.pos === "noun" && parts.length < 2) err(w, "a noun needs lemma + genitive in forms (ἀνήρ, ἀνδρός)");
      if (it.pos === "verb") {
        if (!isArr(it.principal_parts) || it.principal_parts.length !== 6) err(w, "a verb needs principal_parts: a list of 6 (ενεστώτας, μέλλοντας, αόριστος, παρακείμενος, παρακείμενος μ/π, παθητικός αόριστος), «—» where none)");
        else if (it.principal_parts.slice(0, 2).some((p) => !isStr(p))) err(w, "principal_parts[0..1] (ενεστώτας, μέλλοντας) must be strings («—» if the tense does not exist)");
      }
    }
    if (it.pos === "noun" && !GENDERS.includes(it.gender)) err(w, "gender must be m/f/n/m/f for a noun");
    if (["noun", "adj", "verb"].includes(it.pos) && !isStr(it.class)) err(w, "class missing (κλίση / κατηγορία ρήματος as a Greek string)");
    if (!isStr(it.hook)) warn(w, "hook missing (memory hook in Greek)"); else if (!GREEK.test(it.hook)) err(w, "hook must be in Greek");
    if (it.etym !== undefined) {
      if (!Array.isArray(it.etym)) err(w, "etym must be a list of {el, exam}");
      else for (const e of it.etym) { hasGreek(e.el, w, err, "etym.el"); if (e.exam !== undefined && e.exam !== null && !Number.isInteger(e.exam)) err(w, "etym.exam must be a year or null"); }
    }
    if (it.trap !== undefined && !GREEK.test(it.trap)) err(w, "trap must be in Greek");
  },
  sentence(it, err, warn, w) {
    grc(it.grc, w, err, "grc");
    hasGreek(it.el, w, err, "el");
    if (!isArr(it.chunks, 3) || it.chunks.length > 9) err(w, "chunks must be 3-9 Greek tiles");
    else {
      if (n(it.chunks.join(" ")) !== n(it.el)) err(w, `chunks must join to el exactly: "${it.chunks.join(" ")}" vs "${it.el}"`);
      distinct(it.chunks, w, err, "chunks");
    }
    if (!Array.isArray(it.gloss) || it.gloss.length > 4) err(w, "gloss must be a list of 0-4 {grc, el}");
    else for (const g of it.gloss) { grc(g.grc, w, err, "gloss.grc"); hasGreek(g.el, w, err, "gloss.el"); }
    if (!Array.isArray(it.notes) || it.notes.length > 3) err(w, "notes must be a list of 0-3 {w, role_el, dep}");
    else for (const nt of it.notes) {
      if (!isStr(nt.w)) err(w, "note.w missing"); else if (!inText(it.grc, nt.w)) err(w, `note.w "${nt.w}" is not in grc`);
      hasGreek(nt.role_el, w, err, "note.role_el");
      if (!isStr(nt.dep)) err(w, "note.dep missing (the word it depends on)");
    }
    if (it.find !== undefined) {
      if (!Array.isArray(it.find)) err(w, "find must be a list of {ask, words, why}");
      else for (const f of it.find) {
        hasGreek(f.ask, w, err, "find.ask");
        if (!isArr(f.words, 1)) err(w, "find.words missing");
        else { const toks = tokensOf(it.grc); for (const t of f.words) if (!toks.includes(E.stripMarks(t))) err(w, `find word "${t}" is not a token of grc`); }
      }
    }
    if (it.anaphora !== undefined) {
      if (!Array.isArray(it.anaphora)) err(w, "anaphora must be a list of {w, ref, why}");
      else for (const a of it.anaphora) {
        if (!isStr(a.w)) err(w, "anaphora.w missing"); else if (!tokensOf(it.grc).includes(E.stripMarks(a.w))) err(w, `anaphora.w "${a.w}" is not a token of grc`);
        if (!isStr(a.ref)) err(w, "anaphora.ref missing"); else if (!E.findPhrase(E.tokens(it.grc), a.ref).length) err(w, `anaphora.ref "${a.ref}" does not occur in grc (give the word(s) exactly as the text prints them)`);
      }
    }
    if (it.devices !== undefined) {
      if (!Array.isArray(it.devices)) err(w, "devices must be a list of {name_el, words, effect_el}");
      else for (const d of it.devices) { hasGreek(d.name_el, w, err, "device.name_el"); if (!isStr(d.words)) err(w, "device.words missing"); else if (!inText(it.grc, d.words)) err(w, `device.words "${d.words}" is not in grc`); if (d.effect_el !== undefined) hasGreek(d.effect_el, w, err, "device.effect_el"); }
    }
    if (it.tf !== undefined) {
      if (!Array.isArray(it.tf) || it.tf.length > 3) err(w, "tf must be a list of 0-3 {q, a, evidence, why}");
      else for (const t of it.tf) { hasGreek(t.q, w, err, "tf.q"); if (typeof t.a !== "boolean") err(w, "tf.a must be true/false"); hasGreek(t.why, w, err, "tf.why"); if (t.evidence !== undefined && !inText(it.grc, t.evidence)) err(w, `tf.evidence "${t.evidence}" is not in grc`); }
    }
    if (!Array.isArray(it.exam)) err(w, "exam must be a list of years ([] if never in a paper)");
    if (it.unit_ref === undefined) warn(w, "no unit_ref: treated as an unseen-passage sentence (Γ1), not a reference text (Α1)");
  },
  form(it, err, warn, w) {
    grc(it.lemma, w, err, "lemma");
    grc(it.given, w, err, "given");
    hasGreek(it.ask, w, err, "ask");
    if (!E.isCell(it.cell)) err(w, `cell "${it.cell}" is not a valid key (nominal: gen.pl, acc.sg.f.comp, adv.sup; verbal: ind.impf.3pl.act, subj.aor2.1pl.act, inf.fut.act, ptc.fut.nom.sg.f.mid)`);
    const key = it.strict ? sk : n;
    if (!isArr(it.answer, 1) || it.answer.some((a) => !isStr(a))) err(w, "answer must be a non-empty list of strings (first = preferred)");
    else {
      for (const a of it.answer) if (!GREEK.test(a)) err(w, `answer "${a}" must be Greek`);
      if (!isArr(it.distractors, 3)) err(w, "distractors: at least 3 wrong forms");
      else { distinct(it.distractors, w, err, "distractors", key); noOverlap(it.answer, it.distractors, w, err, "distractors", key); if (!it.strict) for (const d of it.distractors) if (sk(d) !== n(d) && it.answer.some((a) => n(a) === n(d))) err(w, `distractor "${d}" differs from the answer only by accent: set strict: true`); }
      if (it.tiles !== undefined) {
        if (!isArr(it.tiles, 2)) err(w, "tiles must have at least 2 pieces");
        else if (n(it.tiles.join("")) !== n(it.answer[0])) err(w, `tiles must join to the answer: ${it.tiles.join("+")} vs ${it.answer[0]}`);
      }
    }
    if (it.strict !== undefined && typeof it.strict !== "boolean") err(w, "strict must be true/false");
    hasGreek(it.rule, w, err, "rule");
    hasGreek(it.why, w, err, "why");
    if (it.ctx !== undefined) grc(it.ctx, w, err, "ctx");
  },
  rule(it, err, warn, w) {
    hasGreek(it.title, w, err, "title");
    if (!isArr(it.ex, 2) || it.ex.length > 4) err(w, "ex must be 2-4 {grc, el} examples");
    else for (const e of it.ex) { if (!isStr(e.grc)) err(w, "ex.grc missing"); hasGreek(e.el, w, err, "ex.el"); }
    if (!Array.isArray(it.terms)) err(w, "terms must be a list (school terms the rule introduces)");
    if (!isArr(it.quiz, 1) || it.quiz.length > 5) err(w, "quiz must have 1-5 questions");
    else it.quiz.forEach((q, i) => {
      const qw = `${w} quiz[${i}]`;
      if (q.t === "mcq") {
        if (!isStr(q.q)) err(qw, "q missing");
        if (!isArr(q.options, 3)) err(qw, "options: at least 3");
        else { distinct(q.options, qw, err, "options", sk); if (!q.options.includes(q.a)) err(qw, "a must be one of the options"); }
        if (!isStr(q.why)) err(qw, "why missing");
      } else if (q.t === "tf") {
        if (!isStr(q.q)) err(qw, "q missing");
        if (typeof q.a !== "boolean") err(qw, "a must be true/false");
        if (!isStr(q.why)) err(qw, "why missing");
      } else if (q.t === "bucket") {
        if (!isArr(q.buckets, 2) || q.buckets.length > 4) err(qw, "buckets: 2-4");
        else distinct(q.buckets, qw, err, "buckets");
        if (!isArr(q.items, 3)) err(qw, "items: at least 3 {text, bucket}");
        else for (const x of q.items) { if (!isStr(x.text)) err(qw, "item.text missing"); if (!(q.buckets || []).includes(x.bucket)) err(qw, `item bucket "${x.bucket}" is not one of the buckets`); }
      } else err(qw, `t must be mcq/tf/bucket (got "${q.t}")`);
    });
  },
  role(it, err, warn, w) {
    grc(it.grc, w, err, "grc");
    if (!isStr(it.w)) err(w, "w missing"); else if (!inText(it.grc, it.w)) err(w, `w "${it.w}" is not in grc`);
    if (!isArr(it.answer, 1)) err(w, "answer: list of accepted role phrases (first = the marker phrase, naming the head word «στο …»)");
    else for (const a of it.answer) hasGreek(a, w, err, "answer");
    if (!isStr(it.dep) || !/^στ(ο|η|ον|ην|ις|ους|α) /.test(it.dep)) err(w, 'dep must start with "στο " / "στη " / "στον " (the word the role attaches to)');
    if (it.head !== undefined) { if (!isStr(it.head)) err(w, "head must be the head word as printed in grc"); else if (!E.findPhrase(E.tokens(it.grc), it.head).length) err(w, `head "${it.head}" is not in grc`); }
    else warn(w, "head missing: the «πλήρως συντακτικά» tap-the-head-word question will not be built");
    if (!isArr(it.tiles, 2)) err(w, "tiles: at least 2 pieces");
    else if (isArr(it.answer, 1) && n(it.tiles.join(" ")) !== n(it.answer[0])) err(w, `tiles must join to answer[0]: "${it.tiles.join(" ")}" vs "${it.answer[0]}"`);
    if (!isArr(it.distractors, 3)) err(w, "distractors: 3 plausible wrong roles");
    else { distinct(it.distractors, w, err, "distractors"); if (isArr(it.answer, 1)) noOverlap(it.answer, it.distractors, w, err); for (const d of it.distractors) hasGreek(d, w, err, "distractor"); }
    hasGreek(it.why, w, err, "why");
  },
  clause(it, err, warn, w) {
    grc(it.grc, w, err, "grc");
    if (isStr(it.grc) && !/«[^»]+»/.test(it.grc)) err(w, "grc must mark the clause with « »");
    for (const [f] of E.CLAUSE_STEPS) hasGreek(it[f], w, err, f);
    if (!it.distractors || typeof it.distractors !== "object") err(w, "distractors must be {kind, intro, neg, fn, dep, mood} lists");
    else for (const [f, k] of E.CLAUSE_STEPS) {
      const d = it.distractors[k];
      if (!isArr(d, 2)) err(w, `distractors.${k}: at least 2`);
      else { distinct(d, w, err, `distractors.${k}`); noOverlap([it[f] || ""], d, w, err, `distractors.${k}`); }
    }
    if (it.convert !== undefined) grc(it.convert, w, err, "convert");
    hasGreek(it.why, w, err, "why");
  },
  transform(it, err, warn, w) {
    grc(it.from, w, err, "from");
    hasGreek(it.ask, w, err, "ask");
    if (!isArr(it.to, 1) || it.to.some((x) => !isStr(x))) err(w, "to: list of accepted Greek answers (first = model)");
    else {
      for (const t of it.to) grc(t, w, err, "to");
      const ws = E.tokens(it.to[0]).map((t) => E.stripMarks(t.replace(/[.,;:!?«»·]+$/g, "")));
      if (!isArr(it.tiles, ws.length + 1)) err(w, "tiles must hold every word of to[0] plus at least one wrong-form tile");
      else {
        // a tile is used once in the game, so a word that repeats in to[0] («καὶ … καὶ») needs as many tiles
        const tl = it.tiles.map(E.stripMarks);
        const count = (arr, x) => arr.filter((y) => y === x).length;
        for (const x of new Set(ws)) {
          const need = count(ws, x), have = count(tl, x);
          if (have < need) err(w, `tile "${x}" (from to[0]) ${need > 1 ? `is needed ${need} times but given ${have}` : "is missing"}`);
        }
        for (const x of new Set(tl)) if (count(tl, x) > Math.max(1, count(ws, x))) err(w, `tiles: "${x}" repeats more often than to[0] needs it`);
      }
      if (n(it.to[0]) === n(it.from)) err(w, "to[0] equals from: nothing changes");
    }
    if (typeof it.orderFree !== "boolean") err(w, "orderFree must be true/false");
    if (it.changed !== undefined && !Number.isInteger(it.changed)) err(w, "changed must be an integer");
    if (!Array.isArray(it.steps) || it.steps.length > 6) err(w, "steps: 0-6 Greek micro-steps");
    else for (const s of it.steps) hasGreek(s, w, err, "step");
    hasGreek(it.why, w, err, "why");
  },
  fact(it, err, warn, w) {
    hasGreek(it.q, w, err, "q");
    if (it.t === "tf") {
      if (typeof it.a !== "boolean") err(w, "a must be true/false for tf");
      hasGreek(it.flip, w, err, "flip (the one-fact-changed twin of the statement)");
      if (isStr(it.flip) && n(it.flip) === n(it.q)) err(w, "flip equals q");
    } else if (it.t === "mcq") {
      if (!isArr(it.options, 3)) err(w, "options: at least 3 (the exam uses α/β/γ)");
      else { distinct(it.options, w, err, "options"); if (!it.options.includes(it.a)) err(w, "a must be one of the options"); }
    } else err(w, 't must be "tf" or "mcq"');
    hasGreek(it.why, w, err, "why");
    if (!FACT_TOPICS.includes(it.topic)) err(w, `topic must be one of ${FACT_TOPICS.join("/")}`);
  },
  hook(it, err, warn, w) {
    grc(it.grc, w, err, "grc");
    hasGreek(it.el, w, err, "el");
    if (!HOOK_TYPES.includes(it.type)) err(w, `type must be one of ${HOOK_TYPES.join("/")}`);
    hasGreek(it.story, w, err, "story");
    if (it.more !== undefined) { if (!Array.isArray(it.more)) err(w, "more must be a list of modern cognates"); else { for (const m of it.more) hasGreek(m, w, err, "more"); noOverlap([it.el], it.more, w, err, "more"); } }
    if (it.forms !== undefined && (!Array.isArray(it.forms) || it.forms.some((f) => !isStr(f) || !GREEK.test(f)))) err(w, "forms must be a list of attested Greek forms");
    if (it.units !== undefined && !Array.isArray(it.units)) err(w, "units must be a list (Φάκελος codes or teaching-unit numbers)");
    if (it.gaps !== undefined) {
      if (!Array.isArray(it.gaps)) err(w, "gaps must be a list of {s, a}");
      else for (const g of it.gaps) { hasGreek(g.s, w, err, "gap.s"); if (!/_{2,}/.test(String(g.s || ""))) err(w, "gap.s must contain the gap as ___"); hasGreek(g.a, w, err, "gap.a"); }
    }
  },
  sense(it, err, warn, w) {
    grc(it.grc, w, err, "grc");
    hasGreek(it.text_el, w, err, "text_el");
    hasGreek(it.modern_el, w, err, "modern_el");
    if (!isArr(it.sentences, 3) || it.sentences.length > 4) err(w, "sentences: 3-4 modern sentences, exactly one with the modern sense");
    else { distinct(it.sentences, w, err, "sentences"); for (const s of it.sentences) hasGreek(s, w, err, "sentence"); if (!Number.isInteger(it.a) || it.a < 0 || it.a >= it.sentences.length) err(w, "a must be the index of the sentence with the modern sense"); }
    hasGreek(it.why, w, err, "why");
  },
  claim(it, err, warn, w) {
    hasGreek(it.q, w, err, "q");
    if (it.unit_ref === undefined) err(w, "unit_ref missing (the Φάκελος passage the question is about)");
    if (!isArr(it.chain, 4) || it.chain.length > 7) err(w, "chain: 4-7 ordered tiles {t, el, grc?}");
    else {
      for (const t of it.chain) { if (!CHAIN_T.includes(t.t)) err(w, `chain tile t must be one of ${CHAIN_T.join("/")}`); hasGreek(t.el, w, err, "chain.el"); if (t.grc !== undefined) grc(t.grc, w, err, "chain.grc"); }
      if (!it.chain.some((t) => t.t === "quote" || isStr(t.grc))) err(w, "chain needs at least one quote tile (the Greek evidence)");
      distinct(it.chain.map((t) => t.el), w, err, "chain tiles");
    }
    if (!isArr(it.distractors, 2) || it.distractors.length > 4) err(w, "distractors: 2-4 wrong tiles {t, el, grc?}");
    else { for (const t of it.distractors) hasGreek(t.el, w, err, "distractor.el"); if (isArr(it.chain)) noOverlap(it.chain.map((t) => t.el), it.distractors.map((t) => t.el), w, err); }
    if (it.best !== undefined) {
      if (!it.best || !isArr(it.best.options, 3)) err(w, "best.options: at least 3 one-sentence answers");
      else { distinct(it.best.options, w, err, "best.options"); if (!it.best.options.includes(it.best.a)) err(w, "best.a must be one of best.options"); }
    }
    if (it.marks !== undefined && !/^\d+(\+\d+)*$/.test(String(it.marks))) err(w, 'marks must look like "10" or "7+3"');
    hasGreek(it.why, w, err, "why");
  },
  parallel(it, err, warn, w) {
    if (it.unit_ref === undefined) err(w, "unit_ref missing");
    hasGreek(it.modern, w, err, "modern (our own paraphrase, never the exam's copyrighted parallel text)");
    hasGreek(it.author_el, w, err, "author_el");
    grc(it.grc_quote, w, err, "grc_quote");
    if (!isArr(it.items, 3) || it.items.length > 5) err(w, "items: 3-5 {el, bucket}");
    else {
      for (const x of it.items) { hasGreek(x.el, w, err, "item.el"); if (!PARALLEL_BUCKETS.includes(x.bucket)) err(w, `item.bucket must be one of ${PARALLEL_BUCKETS.join("/")}`); }
      distinct(it.items.map((x) => x.el), w, err, "items");
      if (new Set(it.items.map((x) => x.bucket)).size < 2) err(w, "items must use at least two different buckets");
    }
    hasGreek(it.why, w, err, "why");
  },
  unseen(it, err, warn, w) {
    hasGreek(it.title_el, w, err, "title_el");
    if (!isStr(it.author)) err(w, "author missing");
    if (!isStr(it.ref)) err(w, "ref missing (work and section)");
    hasGreek(it.intro_el, w, err, "intro_el");
    grc(it.grc, w, err, "grc");
    if (isStr(it.grc) && words(it.grc) < 40) warn(w, `grc has only ${words(it.grc)} words; the exam prints 12-20 lines`);
    if (!Array.isArray(it.gloss) || it.gloss.length > 4) err(w, "gloss must be a list of 0-4 {grc, el}");
    else for (const g of it.gloss) { grc(g.grc, w, err, "gloss.grc"); hasGreek(g.el, w, err, "gloss.el"); }
    if (!isArr(it.questions, 1)) err(w, "questions: at least one {q, points, distractors}");
    else for (const q of it.questions) {
      hasGreek(q.q, w, err, "question.q");
      if (!isArr(q.points, 2) || q.points.length > 5) err(w, "question.points: 2-5 expected points");
      else { for (const p of q.points) hasGreek(p, w, err, "point"); distinct(q.points, w, err, "points"); }
      if (!isArr(q.distractors, 1)) err(w, "question.distractors: at least 1 wrong point");
      else { for (const p of q.distractors) hasGreek(p, w, err, "distractor"); if (isArr(q.points)) noOverlap(q.points, q.distractors, w, err); }
    }
    for (const f of ["sentences", "forms", "roles", "transforms"]) if (it[f] !== undefined && (!Array.isArray(it[f]) || it[f].some((x) => !isStr(x)))) err(w, `${f} must be a list of item ids`);
    if (!Array.isArray(it.exam)) err(w, "exam must be a list of years ([] for a new passage)");
  },
  trap(it, err, warn, w) {
    if (!isStr(it.wrong)) err(w, "wrong missing");
    if (!isStr(it.right)) err(w, "right missing");
    if (isStr(it.wrong) && isStr(it.right) && sk(it.wrong) === sk(it.right)) err(w, "wrong equals right");
    hasGreek(it.ask, w, err, "ask");
    hasGreek(it.why, w, err, "why");
    if (!TRAP_CATS.includes(it.cat)) err(w, `cat must be one of ${TRAP_CATS.join("/")}`);
  },
};

/** Validate a list of units together (course-wide id uniqueness, Β3 pool size, unseen cross-references). */
function validateCourse(units) {
  const ctx = { ids: new Set() };
  const all = { errors: [], warnings: [] };
  const unitIds = new Set();
  for (const u of units) {
    if (unitIds.has(u && u.id)) all.errors.push(`${u.id}: duplicate unit id`);
    unitIds.add(u && u.id);
    const r = validateUnit(u, ctx);
    all.errors.push(...r.errors);
    all.warnings.push(...r.warnings);
  }
  // cross-references of unseen passages must point at existing items of the right kind
  const kindOf = new Map();
  for (const u of units) for (const l of u.lessons || []) for (const it of l.items || []) kindOf.set(it.id, it.kind);
  const want = { sentences: "sentence", forms: "form", roles: "role", transforms: "transform" };
  for (const u of units) for (const l of u.lessons || []) for (const it of l.items || []) if (it.kind === "unseen") {
    for (const [f, k] of Object.entries(want)) for (const id of it[f] || []) {
      if (!kindOf.has(id)) all.errors.push(`${l.id} › ${it.id}: ${f} refers to unknown item "${id}"`);
      else if (kindOf.get(id) !== k) all.errors.push(`${l.id} › ${it.id}: ${f} item "${id}" is a ${kindOf.get(id)}, not a ${k}`);
    }
  }
  return all;
}

module.exports = { validateUnit, validateCourse, KINDS, STATUS, SECTIONS, POS, GENDERS, HOOK_TYPES, TRAP_CATS, FACT_TOPICS, CHAIN_T };

if (require.main === module) {
  const { loadUnits } = require("../src/course.js");
  const args = process.argv.slice(2);
  const units = args.length ? args.map((f) => { const p = path.resolve(f); delete require.cache[p]; return require(p); }) : loadUnits({ example: true });
  const r = validateCourse(units);
  const items = units.reduce((a, u) => a + (u.lessons || []).reduce((b, l) => b + (l.items || []).length, 0), 0);
  for (const w of r.warnings) console.log(`warn  ${w}`);
  for (const e of r.errors) console.log(`ERROR ${e}`);
  console.log(`${units.length} unit(s), ${items} items, ${r.errors.length} error(s), ${r.warnings.length} warning(s)`);
  process.exit(r.errors.length ? 1 : 0);
}
