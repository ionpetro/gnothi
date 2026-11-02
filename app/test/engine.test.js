// Engine unit tests: streaks, spaced review, the polytonic normaliser, cells, unlocking, countdown,
// scoring, Athenian badges. Dates are fixed so the tests never depend on today.
const test = require("node:test");
const assert = require("node:assert/strict");
const { loadUnits } = require("../src/course.js");
const { Engine: E } = require("../src/engine.js");

const IX = E.indexCourse(loadUnits({ example: true }));

test("weekends never break a streak", () => {
  const s = E.freshState();
  E.touchStreak(s, "2026-10-30"); // Fri
  E.touchStreak(s, "2026-11-02"); // Mon
  assert.equal(s.streak, 2);
  assert.equal(s.freezes, 1);
});

test("a missed weekday uses a freeze (ἐκεχειρία), two missed reset", () => {
  const s = E.freshState();
  E.touchStreak(s, "2026-11-02");
  const a = E.touchStreak(s, "2026-11-04");
  assert.equal(a.usedFreeze, 1);
  assert.equal(s.streak, 2);
  const b = E.touchStreak(s, "2026-11-07");
  assert.ok(b.reset);
  assert.equal(s.streak, 1);
});

test("same-day activity doesn't double count and a 7-day streak earns a freeze", () => {
  const s = E.freshState();
  E.touchStreak(s, "2026-11-02");
  E.touchStreak(s, "2026-11-02");
  assert.equal(s.streak, 1);
  for (let d = 1; d < 7; d++) E.touchStreak(s, E.addDays("2026-11-02", d));
  assert.equal(s.streak, 7);
  assert.equal(s.freezes, 2);
});

test("leitner boxes climb on time, drop on a miss, and reach the 60-day box", () => {
  const s = E.freshState();
  E.learn(s, "x", "2026-11-02");
  assert.equal(s.items.x.due, "2026-11-03");
  E.grade(s, "x", true, "2026-11-03");
  assert.equal(s.items.x.box, 2);
  assert.equal(s.items.x.due, "2026-11-06");
  E.grade(s, "x", true, "2026-11-04"); // early: no promotion
  assert.equal(s.items.x.box, 2);
  E.grade(s, "x", false, "2026-11-06");
  assert.equal(s.items.x.box, 1);
  let day = "2026-11-07";
  for (let i = 0; i < 6; i++) { day = s.items.x.due; E.grade(s, "x", true, day); }
  assert.equal(s.items.x.box, 6);
  assert.equal(E.daysBetween(day, s.items.x.due), 60);
});

test("swipe grades count half: a miss drops one box, not to box 1", () => {
  const s = E.freshState();
  E.learn(s, "w", "2026-11-01");
  s.items.w.box = 4;
  E.grade(s, "w", false, "2026-11-01", { weight: 0.5 });
  assert.equal(s.items.w.box, 3);
});

test("from May every due date is capped at exam minus 7 days (2027-05-24)", () => {
  const s = E.freshState();
  assert.equal(E.reviewCap(s), "2027-05-24");
  E.learn(s, "y", "2027-04-20");
  s.items.y.box = 5;
  E.grade(s, "y", true, "2027-05-02");
  assert.equal(s.items.y.due, "2027-05-24");
  E.grade(s, "y", true, "2027-05-26");
  assert.equal(s.items.y.due, "2027-05-27", "after the cap, review tomorrow");
  s.examDate = "2027-06-09";
  assert.equal(E.reviewCap(s), "2027-06-02");
});

test("notebook holds items missed twice, worst first", () => {
  const s = E.freshState();
  E.grade(s, "a", false, "2026-11-01"); E.grade(s, "a", false, "2026-11-01"); E.grade(s, "a", false, "2026-11-01");
  E.grade(s, "b", false, "2026-11-01"); E.grade(s, "b", false, "2026-11-01");
  E.grade(s, "c", false, "2026-11-01");
  assert.deepEqual(E.notebookItems(s), ["a", "b"]);
});

test("the normaliser ignores accents, breathings, subscript, final sigma, case and punctuation but never letters", () => {
  assert.ok(E.accepts(["περιῴκουν"], "περιωκουν"));
  assert.ok(E.accepts(["ἀγάγωμεν"], "ΑΓΑΓΩΜΕΝ"));
  assert.ok(E.accepts(["τῇ πόλει"], "τη πολει."));
  assert.ok(E.accepts(["ἀθροίζω"], "ἁθροίζω"));
  assert.ok(E.accepts(["ξυνέλεγον"], "συνέλεγον"));
  assert.ok(E.accepts(["γίγνεται"], "γίνεται"));
  assert.ok(E.accepts(["πράττω"], "πράσσω"));
  assert.ok(E.accepts(["ἐστί(ν)"], "ἐστίν") === false, "a bracketed movable ν is dropped, a written one stays a letter");
  assert.ok(E.accepts(["ἐστί(ν)"], "ἐστί"));
  assert.ok(!E.accepts(["περιῴκουν"], "περιοίκουν"), "ω and ο are different letters");
  assert.ok(!E.accepts(["λῦσαι"], "λύσει"));
  assert.equal(E.norm("Πῶς δ’ ἄν, εἰ μὴ …;"), "πωσ δ αν ει μη");
  assert.equal(E.norm("σοφός"), E.norm("σοφὸς"));
});

test("strict forms report an accent-only slip instead of a plain miss", () => {
  assert.deepEqual(E.checkTyped(["ἀγάγωμεν"], "ἀγαγῶμεν", true), { ok: false, accentOnly: true });
  assert.deepEqual(E.checkTyped(["ἀγάγωμεν"], "ἀγάγωμεν", true), { ok: true, accentOnly: false });
  assert.deepEqual(E.checkTyped(["ἀγάγωμεν"], "ἀγαγῶμεν", false), { ok: true, accentOnly: false });
  assert.deepEqual(E.checkTyped(["ποιεῖ"], "ποίει", true), { ok: false, accentOnly: true });
  assert.deepEqual(E.checkTyped(["ποιεῖ"], "ποιῶ", true), { ok: false, accentOnly: false });
  assert.ok(E.acceptsStrict(["λῦσαι"], "Λῦσαι"));
});

test("polytonic detection and tokens", () => {
  assert.ok(E.isPolytonic("τῇ πόλει"));
  assert.ok(E.isPolytonic("ἀνήρ"));
  assert.ok(!E.isPolytonic("πόλις"), "a lone acute normalises to the modern tonos; single words are allowed without polytonic marks");
  assert.ok(!E.isPolytonic("η πόλη είναι"));
  assert.deepEqual(E.findPhrase(E.tokens("κατὰ γὰρ τὰς τούτων διαφορὰς ἀκολουθοῦσιν αἱ ἕξεις."), "τὰς τούτων διαφορὰς"), [2, 3, 4]);
  assert.deepEqual(E.findPhrase(E.tokens("ἐκ τοῦ κιθαρίζειν"), "λύειν"), []);
  assert.equal(E.lemmaOf({ grc: "ὁ ἀνήρ" }), "ἀνήρ");
  assert.equal(E.lemmaOf({ grc: "ἄγω" }), "ἄγω");
});

test("grammar cells are validated and read back as the exam's identifications", () => {
  for (const c of ["gen.pl", "acc.sg.f.comp", "adv.sup", "ind.impf.3pl.act", "subj.aor2.1pl.act", "opt.pres.3sg.act", "impv.aorp.2sg", "inf.fut.act", "ptc.fut.nom.sg.f.mid", "ind.perf.3sg.act"]) assert.ok(E.isCell(c), c);
  for (const c of ["gen", "ind.fut", "impv.fut.2sg.act.x", "ger.gen", "subj.aor2.4pl.act", ""]) assert.ok(!E.isCell(c), `bad cell accepted: ${c}`);
  assert.equal(E.cellLabel("ind.fut.3pl.act"), "γ΄ πληθυντικό οριστικής μέλλοντα ενεργητικής φωνής");
  assert.equal(E.cellLabel("subj.aor2.1pl.act"), "α΄ πληθυντικό υποτακτικής αορίστου β΄ ενεργητικής φωνής");
  assert.equal(E.cellLabel("inf.fut.act"), "απαρέμφατο μέλλοντα ενεργητικής φωνής");
  assert.equal(E.cellLabel("ptc.fut.nom.sg.f.mid"), "μετοχή μέλλοντα ονομαστική ενικού θηλυκού γένους μέσης φωνής");
  assert.equal(E.cellLabel("gen.pl.f.comp"), "γενική πληθυντικού θηλυκού γένους συγκριτικού βαθμού");
  assert.equal(E.cellLabel("impv.aorp.2sg"), "β΄ ενικό προστακτικής παθητικού αορίστου");
  assert.equal(E.cellLabel("adv.sup"), "επίρρημα υπερθετικού βαθμού");
  assert.ok(E.isVerbCell("inf.fut.act") && !E.isVerbCell("gen.pl"));
});

test("first lesson of every unit is open, the rest unlock in order, roundup last", () => {
  const s = E.freshState();
  const u = IX.course.units[0];
  assert.ok(E.isUnlocked(IX, s, u.lessons[0].id));
  assert.ok(!E.isUnlocked(IX, s, u.lessons[1].id));
  assert.ok(!E.isUnlocked(IX, s, `${u.id}-review`));
  s.done[u.lessons[0].id] = { perfect: true, at: "2026-11-01" };
  assert.ok(E.isUnlocked(IX, s, u.lessons[1].id));
  s.done[u.lessons[1].id] = { perfect: false, at: "2026-11-01" };
  assert.ok(E.isUnlocked(IX, s, `${u.id}-review`));
  assert.equal(E.nextNode(IX, s).id, `${u.id}-review`);
  assert.deepEqual(E.unitProgress(IX, s, u.id), { done: 2, total: 3 });
  assert.equal(E.pathNodes(IX)[0].letter, "Α");
});

test("lessons are split into sittings by weight and every item is served once", () => {
  for (const l of IX.lessons) {
    const sittings = E.lessonSittings(IX, l.id);
    assert.deepEqual(sittings.flat(), l.items.map((i) => i.id));
    for (const sit of sittings) assert.ok(sit.length >= 1);
  }
});

test("countdown counts days to Monday 31 May 2027 and names the phase", () => {
  const s = E.freshState();
  const c = E.countdown(s, "2026-11-02");
  assert.equal(c.days, 210);
  assert.equal(c.phase.id, "foundations");
  assert.equal(c.label, "Δευτέρα 31 Μαΐου");
  assert.equal(c.time, "08:30");
  assert.equal(E.countdown(s, "2027-04-01").phase.id, "walls");
  assert.equal(E.countdown(s, "2027-05-20").phase.id, "panathenaia");
  assert.equal(E.countdown(s, "2027-06-03").phase.id, "after");
  s.examDate = "2027-06-09";
  assert.equal(E.countdown(s, "2027-06-02").days, 7);
});

test("Θέμα της ημέρας maps weekdays to the real Θέματα and records a daily streak", () => {
  const s = E.freshState();
  assert.equal(E.buildDaily(IX, s, "2026-11-02").section, "Γ3"); // Monday
  assert.equal(E.buildDaily(IX, s, "2026-11-03").section, "Γ4"); // Tuesday
  assert.equal(E.buildDaily(IX, s, "2026-11-04").section, "Α1+Β3"); // Wednesday
  assert.equal(E.buildDaily(IX, s, "2026-11-05").section, "Γ1+Γ2"); // Thursday
  assert.equal(E.buildDaily(IX, s, "2026-11-06").section, "Β4"); // Friday
  assert.equal(E.buildDaily(IX, s, "2026-11-07").section, "Β1+Β2"); // Saturday
  assert.equal(E.buildDaily(IX, s, "2026-11-08").section, "mix"); // Sunday
  assert.equal(E.buildDaily(IX, s, "2026-11-04").marks, 20);
  assert.equal(E.buildDaily(IX, s, "2026-11-05").marks, 30);
  E.recordDaily(s, "2026-11-02", 7, 10, "Γ3");
  E.recordDaily(s, "2026-11-03", 8, 10, "Γ4");
  assert.equal(s.dailyStreak, 2);
  E.recordDaily(s, "2026-11-03", 9, 10, "Γ4"); // redo same day: no change
  assert.equal(s.dailyStreak, 2);
  E.recordDaily(s, "2026-11-09", 5, 10, "Γ3"); // Monday after a skipped week
  assert.equal(s.dailyStreak, 1);
});

test("section scoring adds marks per section and converts to the 20-point scale", () => {
  const res = [{ q: { section: "Γ1", marks: 10 }, score: 1 }, { q: { section: "Γ1", marks: 10 }, score: 0 }, { q: { section: "Γ4", marks: 3 }, score: 0.5 }];
  assert.deepEqual(E.scoreSections(res), { "Γ1": [10, 20], "Γ4": [1.5, 3] });
  assert.equal(E.toTwenty(71, 100), 14.2);
  assert.equal(Object.values(E.SECTION_MARKS).reduce((a, b) => a + b, 0), 100);
});

test("badges are Athenian and award once", () => {
  const s = E.freshState();
  s.done.x = { perfect: true, at: "2026-11-01" };
  const fresh = E.awardBadges(s, "2026-11-01", IX);
  assert.deepEqual(fresh.map((b) => b.id).sort(), ["anamartitos", "pais"]);
  assert.deepEqual(E.awardBadges(s, "2026-11-02", IX), []);
  s.stadionBest = 15;
  assert.deepEqual(E.awardBadges(s, "2026-11-02", IX).map((b) => b.id), ["olympionikes"]);
  s.mocks.push({ at: "2026-11-02", score: 100, marks: 100 });
  assert.deepEqual(E.awardBadges(s, "2026-11-02", IX).map((b) => b.id), ["philosophos"]);
  for (const b of E.BADGES) if (b.id !== "gnothi20") s.badges[b.id] = "2026-11-02";
  assert.deepEqual(E.awardBadges(s, "2026-11-03", IX).map((b) => b.id), ["gnothi20"]);
});

test("week xp only counts this week, οβολοί show as δραχμές", () => {
  const s = E.freshState();
  E.addXp(s, "2026-10-30", 10);
  E.addXp(s, "2026-11-02", 15);
  assert.equal(E.weekXp(s, "2026-11-03"), 15);
  assert.equal(E.weekKey("2026-11-08"), "2026-11-02");
  assert.deepEqual(E.drachmas(25), { drachmas: 4, obols: 1 });
});

test("sentence find, anaphora and Σ/Λ mark the right tokens despite accents and punctuation", () => {
  const it = IX.items.get("u0-s-d13-edei");
  const q = E.qFind(IX, it, E.rng(1));
  assert.deepEqual(q.answer.map((i) => q.words[i]).sort(), ["ἐγίνοντο", "ἔδει"].sort());
  const a = E.qAnaphora(IX, IX.items.get("u0-s-d13-toutwn"), E.rng(1), 0);
  assert.deepEqual(a.answer.map((i) => a.words[i]), ["τὰς", "ἐνεργείας"]);
  assert.equal(a.single, false);
  const t = E.qSentenceTf(IX, it, E.rng(1), 0);
  assert.equal(t.type, "tf");
  assert.equal(t.answer, false);
  assert.match(t.explain, /οὐδὲν ἂν ἔδει/);
});

test("Β3 find-in-text points at a form of the hook that occurs in a sentence of the course", () => {
  const h = IX.items.get("u0-h-dei");
  const q = E.qHookFind(IX, h, E.rng(3));
  assert.ok(q, "hook find built");
  assert.ok(q.answer.length >= 1);
  for (const i of q.answer) assert.ok(["εδει", "δει", "ενδεησ"].includes(E.stripMarks(q.words[i])), q.words[i]);
  const g = E.qHookGap(IX, IX.items.get("u0-h-tithemi"), E.rng(3), 0);
  assert.equal(g.answer, "ανάθεση");
});

test("clause steps carry the six boxes (1+1+1+1+1+2) and the right answers", () => {
  const it = IX.items.get("u0-c-hin-eien");
  const q = E.qClauseSteps(IX, it, E.rng(2));
  assert.equal(q.steps.length, 6);
  assert.equal(q.steps[0].answer, it.kind_el);
  assert.equal(q.steps[5].answer, it.mood_el);
  assert.equal(q.steps.reduce((a, s) => a + s.marks, 0), 7);
});

test("the «πλήρως συντακτικά» question asks for the label and the head word", () => {
  const q = E.qLabel(IX, IX.items.get("u0-ro-adikein"), E.rng(2));
  assert.equal(q.type, "label");
  assert.ok(q.options.includes(q.answer));
  assert.deepEqual(q.head.map((i) => q.words[i]), ["ἐξῆν"]);
});

test("Β3 match has 5 pairs and 2 spare modern words when the pool allows", () => {
  const q = E.qMatchSpare(IX, IX.byKind.hook, E.rng(4));
  assert.equal(q.pairs.length, 5);
  assert.equal(q.spare.length, 2);
  assert.equal(q.right.length, 7);
});

test("the Γ3 table match pairs forms with their identification", () => {
  const q = E.qMatchTable(IX, IX.byKind.form, E.rng(5));
  assert.ok(q);
  assert.ok(q.pairs.some((p) => p[1] === "γ΄ πληθυντικό οριστικής παρατατικού ενεργητικής φωνής"));
});

test("principal parts fill six slots, skipping the ones a verb lacks", () => {
  const full = E.qPrincipalParts(IX, IX.items.get("u0-ago"), E.rng(6));
  assert.equal(full.slots.length, 6);
  assert.deepEqual(full.answer, ["ἄγω", "ἄξω", "ἤγαγον", "ἦχα", "ἦγμαι", "ἤχθην"]);
  const part = E.qPrincipalParts(IX, IX.items.get("u0-phemi"), E.rng(6));
  assert.equal(part.slots.length, 3);
  assert.deepEqual(part.slots.map((s) => s.label), ["ενεστώτας", "μέλλοντας", "αόριστος"]);
});

test("a strict form keeps its accent-only twin among the options", () => {
  let seen = false;
  for (let i = 0; i < 20 && !seen; i++) { const q = E.qCell(IX, IX.items.get("u0-f-agagomen"), E.rng(i)); if (q.options.includes("ἀγαγῶμεν")) seen = true; assert.ok(q.strict); }
  assert.ok(seen, "ἀγαγῶμεν offered as a distractor");
});

test("chain, parallel and checklist questions are built from claim, parallel and unseen items", () => {
  const c = E.qChain(IX, IX.items.get("u0-cl-d13-ethos"), E.rng(7));
  assert.equal(c.tiles.length, 8);
  assert.equal(c.answer.length, 5);
  const p = E.qParallel(IX, IX.items.get("u0-pa-marcus"), E.rng(7));
  assert.deepEqual(p.buckets, ["ομοιότητα", "διαφορά", "δεν προκύπτει"]);
  const k = E.qChecklist(IX, IX.items.get("u0-un-lysias-7"), E.rng(7), 0);
  assert.equal(k.items.filter((x) => x.real).length, 3);
  assert.equal(k.items.length, 5);
});

test("a headword taught in several units shares one progress id and is listed once", () => {
  const mk = (id, unit, lesson) => ({ id: unit, title: unit, exam: [], lessons: [{ id: lesson, title: lesson, items: [{ id, kind: "word", grc: "ἡ πόλις", forms: "πόλις, πόλεως", el: "πόλη", pos: "noun", gender: "f", class: "γ΄", say: "x", src: "x", status: "book" }] }] });
  const IXd = E.indexCourse([mk("a-polis", "u1", "u1l1"), mk("b-polis", "u2", "u2l1")]);
  assert.equal(E.canon("b-polis"), "a-polis");
  assert.equal(IXd.isDup(IXd.items.get("b-polis")), true);
  assert.equal(IXd.isDup(IXd.items.get("a-polis")), false);
  const s = E.freshState();
  E.grade(s, "b-polis", true, "2026-11-02");
  assert.deepEqual(Object.keys(s.items), ["a-polis"]);
});

test("source labels never show our research file names to the student", () => {
  assert.equal(E.cleanSrc("Παν. 2026 Γ3β· morphology.md §1.2"), "Παν. 2026 Γ3β");
  assert.equal(E.cleanSrc("cognates.jsonl (el.wiktionary)"), "Βικιλεξικό");
  assert.equal(E.cleanSrc("syntax.md §3.5 (ctx δικό μας)"), "Gnothi");
  for (const it of IX.items.values()) assert.ok(!/\.(md|jsonl?|txt)\b|§/.test(E.cleanSrc(it.src)), `${it.id}: ${E.cleanSrc(it.src)}`);
});

test("remaining sittings count every part still to play and shrink as parts and roundups are done", () => {
  const s = E.freshState();
  const total = E.remainingSittings(IX, s);
  const nodes = E.pathNodes(IX);
  const expected = nodes.reduce((a, n) => a + (n.kind === "roundup" ? 1 : E.lessonSittings(IX, n.id).length), 0);
  assert.equal(total, expected);
  const first = nodes.find((n) => n.kind === "lesson");
  s.sittings[first.id] = 1;
  assert.equal(E.remainingSittings(IX, s), total - 1);
  s.done[first.id] = { perfect: false, at: "2026-11-01" };
  assert.equal(E.remainingSittings(IX, s), total - E.lessonSittings(IX, first.id).length);
  const ru = nodes.find((n) => n.kind === "roundup");
  s.done[ru.id] = { perfect: true, at: "2026-11-01" };
  assert.equal(E.remainingSittings(IX, s), total - E.lessonSittings(IX, first.id).length - 1);
});

test("a lesson never re-teaches a headword already learned in an earlier unit, and transfer items are asked cold", () => {
  const dup = IX.byKind.word.find((w) => IX.isDup(w));
  if (dup) {
    const s = E.freshState();
    const sit = E.lessonSittings(IX, dup.lessonId).findIndex((ids) => ids.includes(dup.id));
    const before = E.buildLesson(IX, s, dup.lessonId, 3, sit);
    assert.ok(before.some((q) => q.type === "intro" && q.itemId === dup.id), "unlearned duplicate still gets its card");
    E.learn(s, dup.id, "2026-11-01");
    const after = E.buildLesson(IX, s, dup.lessonId, 3, sit);
    assert.ok(!after.some((q) => q.type === "intro" && q.itemId === dup.id), "learned duplicate gets no card");
    assert.ok(after.some((q) => q.itemId === dup.id && q.type === "mcq"), "but is still asked once");
  }
  const tr = IX.byKind.form.find((f) => f.transfer);
  const steps = E.buildLesson(IX, E.freshState(), tr.lessonId, 5, E.lessonSittings(IX, tr.lessonId).findIndex((ids) => ids.includes(tr.id)));
  assert.ok(!steps.some((q) => q.type === "intro" && q.itemId === tr.id), "transfer items have no intro card");
  assert.ok(steps.some((q) => q.itemId === tr.id && q.label === E.L.decode), "transfer items are asked as decode");
});
