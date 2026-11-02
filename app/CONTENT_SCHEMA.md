# Gnothi content schema (authoritative)

This is the contract between content writers and the engine. One file per unit in `app/src/units/<id>.js`.
The complete worked example is [`src/units/u0_example.js`](src/units/u0_example.js): one item of every kind, every Greek fact checked against `research/`. Copy its shape.

Check your unit with `npm test` (runs the validator in `app/tools/validate.js` plus the engine on your items across 40 seeds) or `node app/tools/validate.js app/src/units/u3.js` for a readable report. Zero errors are required; read the warnings.

## 1. The unit file

```js
(function () {
  const unit = {
    id: "u3",                                   // u1 … u14 (u0_example is the fixture)
    title: "Ονόματα: άρθρο, κλίσεις, η γ΄ κλίση, μετοχές ως ονόματα (Γ3)",
    blurb: "Η αλλαγή πτώσης και αριθμού είναι σε κάθε Γ3· η γ΄ κλίση είναι το δύσκολο 40%.",   // one line under the title on the Ιερά Οδός
    exam: ["Γ3"],                               // Θέματα this unit feeds: Α1 Β1 Β2 Β3 Β4 Γ1 Γ2 Γ3 Γ4 (Θέμα της ημέρας and the mock draw from these)
    lessons: [
      { id: "u3l1", title: "Διάβασε την εκφώνηση", items: [ /* items */ ] },   // lesson ids are <unit>l<n>, numbered from 1
    ],
  };
  if (typeof GNOTHI_UNITS !== "undefined") GNOTHI_UNITS.push(unit);   // browser build
  if (typeof module !== "undefined") module.exports = unit;           // tests and site build
})();
```

Rules: plain JS object literal, no imports, no helper functions that generate items (the validator must see the literal data). Lessons are served in «sittings» of ~12 graded steps automatically, so a vocabulary or text lesson may hold 25-40 items.

Which unit feeds which Θέμα: text units (u2, u5, u8, u11) `["Α1", "Β1", "Β2", "Β3"]`; u1 `["Β3"]`; grammar units (u3, u4, u6, u9) `["Γ3"]`; u7 `["Γ1", "Γ2", "Γ3"]`; u10 `["Γ4"]`; u12 `["Γ4"]`; u13 `["Β4"]`; u14 `["Γ1", "Γ2", "Γ3", "Γ4"]`.

## 2. Fields every item has

| field | required | what |
|---|---|---|
| `id` | yes | unique across the whole course, prefixed with the unit id and a dash: `u3-polis-genpl`, `u8-s-d13-edei` |
| `kind` | yes | one of the 14 kinds below |
| `say` | yes | one-breath Greek teaching line, ≤ 160 characters, shown at the bottom of the card («Σε μια ανάσα») |
| `status` | yes | `"book"` checked in the school books (Οικονόμου, Μουμτζάκης, Εγχειρίδιο, Φάκελος, Φιλοσοφικός Λόγος) · `"exam"` taken from a real paper or its tutor key, with the year · `"general"` standard Attic not in the school books (constructed example) · `"unsure"` flag for the philologist (shows as «προς έλεγχο») |
| `src` | yes | free text: where you checked it (`"Οικονόμου §351"`, `"Παν. 2026 Γ3β"`, `"Φάκελος Υλικού Δ.13"`, `"Μουμτζάκης, τελικές προτάσεις"`). Research file names (`morphology.md §4`) may follow after `·`; the student never sees them |
| `exam` | optional (required on `sentence`, `unseen`) | list of years the item appeared in a paper, e.g. `[2026]`; shown as «Παν. 2026». Only from `research/pastpapers.md`, `morphology.md` §1.2/§9, `syntax.md` §1.2, `interpretation.md` §4/§6.3 |
| `unit_ref` | optional (required on `claim`, `parallel`; expected on text `sentence`s and text `word`s) | the Φάκελος code of the reference text: `"Α.1" … "ΣΤ.21"` (19 codes). A `sentence` without it is an unseen-passage sentence (Γ1 pool) |
| `transfer` | optional | `true` on a `form` or `hook` means: never shown on an intro card, asked cold as «Νέο: εφάρμοσε τον κανόνα». Put it in the lesson that teaches the rule it needs |
| `tier` | optional | 1-3 on words (1 = must know) |

**Language rule.** Fields that hold Ancient Greek (`grc`, `forms`, `principal_parts`, `given`, `ctx`, `lemma`, `answer`, `distractors` of forms, `tiles` of forms/transforms, `from`, `to`, `grc_quote`, `convert`, `gloss.grc`, `ex.grc`, `chain.grc`) are **polytonic, exactly as the Φάκελος / Οικονόμου print them** (breathings, circumflex, iota subscript). The validator rejects any multi-word Greek field without polytonic marks. Everything the student reads as explanation (`el`, `say`, `ask`, `why`, `rule`, `hook`, `story`, roles, clause boxes, questions, points) is modern Greek with school terminology (Οικονόμου / Μουμτζάκης / ΙΤΥΕ). Write iota subscript, not adscript (τῇ, not τῆι).

**Answer checking.** `norm()` ignores accents, breathings, diaeresis, iota subscript, final-sigma shape, case, punctuation and bracketed movable ν, and folds the doublets ττ/σσ, ξυν-/συν-, γίγν-/γίν-, ἐς/εἰς. Letters are never ignored (ω ≠ ο). A `form` with `strict: true` compares accents too (ποιεῖ/ποίει, ἀγάγωμεν/ἀγαγῶμεν): an accent-only slip earns half credit with the message «Σωστά γράμματα, λάθος τόνος». The validator forces `strict` when a distractor differs from the answer only by accent.

## 3. The 14 item kinds

### `word` (u2, u5, u7, u8, u11)
```js
{ id: "u8-aner", kind: "word", grc: "ὁ ἀνήρ", forms: "ἀνήρ, ἀνδρός", pos: "noun", gender: "m",
  class: "γ΄ κλίση, υγρόληκτο διπλόθεμα (ἀνερ-/ἀνδρ-)", el: "άνδρας· σύζυγος· άνθρωπος",
  hook: "Το θέμα ἀνδρ- κρύβεται στα ανδρείος, ανδριάντας. Κλητική ἄνερ, δοτική πληθυντικού ἀνδράσι.",   // Greek memory hook
  etym: [{ el: "ανδρείος", exam: null }],       // optional, Β3 relatives (exam = the year the committee used the pair, or null)
  trap: "Κλητική ἄνερ· δοτική πληθυντικού ἀνδράσι(ν).",   // optional, the form fact that costs marks
  unit_ref: "Β.6", tier: 1, say: "…", status: "book", src: "Οικονόμου, γ΄ κλίση (ἀνήρ)" }
{ id: "u7-ago", kind: "word", grc: "ἄγω", forms: "ἄγω ; ἄξω ; ἤγαγον ; ἦχα ; ἦγμαι ; ἤχθην",
  principal_parts: ["ἄγω", "ἄξω", "ἤγαγον", "ἦχα", "ἦγμαι", "ἤχθην"],   // verbs: exactly 6 (ενεστώτας, μέλλοντας, αόριστος, παρακείμενος, παρακείμενος μ/π, παθητικός αόριστος), "—" where none
  pos: "verb", class: "αφωνόληκτο· αόριστος β΄ με αττικό αναδιπλασιασμό", el: "οδηγώ, φέρνω", hook: "…", trap: "…", tier: 1, say: "…", status: "book", src: "Οικονόμου, κατάλογος ανωμάλων ρημάτων (ἄγω)" }
```
- `grc`: the lemma as the school grammar prints it: nouns **with the article** (`ὁ ἀνήρ`, `ἡ πόλις`, `τὸ ἄστυ`), contract verbs with the uncontracted form in brackets (`ποιῶ (ποιέω)`). `forms`: nouns `lemma, genitive`; adjectives all genders (`ἀγαθός, -ή, -όν`); verbs the six principal parts separated by ` ; ` (copy from `research/vocab.jsonl` `forms` / `principal_parts`, then check Οικονόμου's catalogue; the catalogue wins).
- `pos`: `noun verb adj adv pron prep conj num particle phrase article interj`. `gender` `m f n m/f` is required for nouns. `class`: free Greek string (κλίση / verb class) from `vocab.jsonl`.
- `el`: our own gloss, text sense first, senses separated by `·`.
- Questions generated: meaning (mcq), reverse, gender, genitive, principal-parts slots (six), etymology, match, swipe.

### `sentence` (u2, u5, u8, u11 for reference texts; u14 for unseen passages)
```js
{ id: "u8-s-d13-toutwn", kind: "sentence", unit_ref: "Δ.13",
  grc: "Διὸ δεῖ τὰς ἐνεργείας ποιὰς ἀποδιδόναι· κατὰ γὰρ τὰς τούτων διαφορὰς ἀκολουθοῦσιν αἱ ἕξεις.",   // verbatim from research/texts.jsonl
  el: "Γι’ αυτό πρέπει να δίνουμε στις ενέργειές μας μια ορισμένη ποιότητα· γιατί οι έξεις ακολουθούν τις διαφορές αυτών.",   // OUR literal translation in exam register
  chunks: ["Γι’ αυτό πρέπει να δίνουμε", "στις ενέργειές μας", "μια ορισμένη ποιότητα·", "γιατί οι έξεις", "ακολουθούν τις διαφορές αυτών."],   // 3-9 tiles that join with single spaces to el
  gloss: [{ grc: "ἕξις", el: "έξη, μόνιμη κατάσταση του χαρακτήρα" }],                     // 0-4 hard words
  notes: [{ w: "ἀποδιδόναι", role_el: "τελικό απαρέμφατο, υποκείμενο στο απρόσωπο ρήμα δεῖ", dep: "δεῖ" }],   // 0-3 Μουμτζάκης labels; w must occur in grc
  find: [{ ask: "Βρες τα δύο άναρθρα απαρέμφατα", words: ["ἀποδιδόναι"], why: "…" }],       // optional tap-the-words (Γ3α 2025 «βρες τα τριτόκλιτα», Α1 evidence words)
  anaphora: [{ w: "τούτων", ref: "τὰς ἐνεργείας", why: "…" }],                             // optional Α1 «σε ποια λέξη αναφέρεται η αντωνυμία»; w a token of grc, ref a word or phrase of grc
  devices: [{ name_el: "αναλογία", words: "κατὰ γὰρ τὰς τούτων διαφορὰς", effect_el: "…" }],   // optional Β1 «γλωσσικές επιλογές»; words occur in grc
  tf: [{ q: "Οι ενέργειες ακολουθούν τις έξεις.", a: false, evidence: "κατὰ γὰρ τὰς τούτων διαφορὰς ἀκολουθοῦσιν αἱ ἕξεις", why: "…" }],   // 0-3 Α1 Σωστό/Λάθος statements with the Greek words that prove them
  exam: [2026], say: "…", status: "exam", src: "Φάκελος Υλικού Δ.13· Παν. 2026 Α1β" }
```
- Reference-text sentences carry `unit_ref`; sentences of an unseen passage (u14) do not, and should be listed in the `unseen` item's `sentences`.
- The 19 reference texts are public domain and may be quoted in full (`research/texts.jsonl`); the Φάκελος translation and commentary may not. Translate yourself, literally, as the markers accept.
- Questions: translation build, note mcq, find, anaphora tap (single word or phrase), Σ/Λ, device mcq.

### `form` (u3, u4, u6, u9, u14)
```js
{ id: "u4-perioikoun", kind: "form", lemma: "περιοικῶ (περιοικέω)", given: "περιοικοῦσι", ctx: "ἀμφοτέρωθεν δὲ γείτονες περιοικοῦσιν",
  ask: "να γραφεί στο ίδιο πρόσωπο και αριθμό της οριστικής παρατατικού",   // exact exam wording (research/morphology.md §1.6)
  cell: "ind.impf.3pl.act",                         // machine key, see list below
  answer: ["περιῴκουν"],                             // accepted polytonic spellings, first = preferred (list the variants: ["ζῆ", "ζῆθι"], ["ἀθροίζω", "ἁθροίζω"])
  strict: false,                                     // true when the accent decides the form (ποιεῖ/ποίει, λῦσαι/λύσαι, εἶπε/εἰπέ, τίς/τις)
  distractors: ["περιοίκουν", "ἐπεριοίκουν", "περιῴκησαν"],   // 3-5 wrong forms from neighbouring cells of the same lemma
  tiles: ["περι", "ῴκ", "ουν"],                      // optional stem + sign + ending for the build game; must join to answer[0]
  rule: "Σύνθετο με περί: αύξηση μετά την πρόθεση, οι → ῳ.",   // one breath
  why: "…",                                          // 2 lines shown after answering
  exam: [2026], say: "…", status: "exam", src: "Παν. 2026 Γ3β· Οικονόμου (αύξηση συνθέτων)" }
```
- `cell` keys. Nominal: `nom|gen|dat|acc|voc` + `.sg|.pl|.du` (+ `.m|.f|.n` for adjectives/pronouns/participles, + `.pos|.comp|.sup` for degrees); adverbs `adv.pos|adv.comp|adv.sup`. Verbal: `ind|subj|opt|impv` + `.` tense `pres|impf|fut|aor|aor2|perf|plup|futp|aorp|aor2p` + `.` person-number `1sg…3pl` + `.` voice `act|mid|pass|mp` (omit the voice after `aorp`/`aor2p`); `inf.<tense>.<voice>`; `ptc.<tense>.<case>.<number>.<gender>.<voice>`. Examples: `gen.pl`, `acc.pl.f.comp`, `impv.aor2.2sg.act`, `impv.aorp.2sg`, `opt.pres.3sg.act`, `subj.aor2.1pl.act`, `inf.fut.act`, `ptc.fut.nom.sg.f.mid`. The engine turns a cell into the exam's identification («γ΄ πληθυντικό οριστικής μέλλοντα ενεργητικής φωνής») for the Γ3 matching table, and tells nominal from verbal items.
- Questions: cell mcq, typed answer (polytonic key row; «Δείξε μου πλακίδια» fallback), build, Γ3 table match, Στάδιο.

### `rule` (any grammar/syntax unit)
```js
{ id: "u4-r-augment", kind: "rule", title: "Η αύξηση μετά την πρόθεση",
  say: "Στα σύνθετα η αύξηση μπαίνει μετά την πρόθεση, που χάνει το τελικό φωνήεν: ἀπο-βάλλω → ἀπ-έ-βαλλον.",
  ex: [{ grc: "περιοικοῦσι → περιῴκουν", el: "η αύξηση μέσα, το περί μένει ακέραιο (Παν. 2026)" }, { grc: "ἐκλείπω → ἐξέλειπον", el: "το ἐκ γίνεται ἐξ" }],   // 2-4
  terms: ["αύξηση", "σύνθετο ρήμα"],
  quiz: [                                                           // 1-5 inline checks, asked right after the card
    { t: "tf", q: "καταβαίνω → παρατατικός κατέβαινον", a: true, why: "…" },
    { t: "mcq", q: "ἀποβάλλω → γ΄ ενικό παρατατικού;", options: ["ἀπέβαλλε", "ἠπόβαλλε", "ἀποέβαλλε"], a: "ἀπέβαλλε", why: "…" },
    { t: "bucket", q: "Πού μπαίνει η αύξηση;", buckets: ["μετά την πρόθεση", "στην αρχή"], items: [{ text: "εἰσέρχομαι", bucket: "μετά την πρόθεση" }, { text: "λύω", bucket: "στην αρχή" }, { text: "συλλέγω", bucket: "μετά την πρόθεση" }] },
  ], status: "book", src: "Οικονόμου, η αύξηση των συνθέτων" }
```
A `rule` is never graded as a card itself; its quiz questions are. A lesson needs at least one non-rule item. Bucket quizzes are how you drill clause kinds, conditional types, participle kinds, declensions, οὐ/μή.

### `role` (u10, u14): Γ4α «ΛΕΞΗ: [είδος] στο «ΚΥΡΙΑ ΛΕΞΗ»»
```js
{ id: "u10-adikein", kind: "role", grc: "τῷ βουλομένῳ τότε μᾶλλον ἐξῆν ἀδικεῖν ἢ νυνί", w: "ἀδικεῖν",
  answer: ["τελικό απαρέμφατο ως υποκείμενο στο απρόσωπο ρήμα ἐξῆν (ετεροπροσωπία)", "τελικό απαρέμφατο, υποκείμενο στο απρόσωπο ρήμα ἐξῆν"],   // marker phrase first (it names the head word), accepted variants after
  dep: "στο ἐξῆν",                                  // always starts with «στο / στη / στον»
  head: "ἐξῆν",                                     // the head word as printed in grc: drives the «πλήρως» tap-the-head-word question (warned if missing)
  tiles: ["τελικό απαρέμφατο", "ως υποκείμενο", "στο απρόσωπο ρήμα ἐξῆν", "(ετεροπροσωπία)"],   // must join to answer[0]
  distractors: ["ειδικό απαρέμφατο, αντικείμενο στο ἐξῆν", "τελικό απαρέμφατο, αντικείμενο στο ρήμα ἐξῆν", "έναρθρο απαρέμφατο, υποκείμενο στο ἐξῆν"],
  why: "…", exam: [2026], say: "…", status: "exam", src: "Παν. 2026 Γ4α· κλειδί (ανεπίσημο)" }
```
Copy phrasings from `research/syntax.md` §2 (the keys' formulas). Questions: role mcq, build the phrase, `label` (pick the label, then tap the head word; both must be right).

### `clause` (u12): Γ4β «να αναγνωρίσετε το είδος, να δικαιολογήσετε την εκφορά, να δηλώσετε τον συντακτικό ρόλο»
```js
{ id: "u12-hin-eien", kind: "clause", grc: "Ἑρμῆν πέμπει ἄγοντα … αἰδῶ τε καὶ δίκην, «ἵν’ εἶεν πόλεων κόσμοι τε καὶ δεσμοὶ φιλίας συναγωγοί»",   // clause in « »
  kind_el: "δευτερεύουσα επιρρηματική τελική πρόταση",       // the six boxes of the Εγχειρίδιο (unit 7) template
  intro_el: "με τον τελικό σύνδεσμο ἵνα",
  neg_el: "μή",
  fn_el: "επιρρηματικός προσδιορισμός του σκοπού στο πέμπει",
  dep_el: "από το ρήμα κίνησης πέμπει (ιστορικός ενεστώτας)",
  mood_el: "ευκτική του πλαγίου λόγου (εἶεν), γιατί εξαρτάται από ιστορικό χρόνο και δηλώνει σκοπό στο παρελθόν",
  distractors: { kind: [2+], intro: [2+], neg: [2+], fn: [2+], dep: [2+], mood: [2+] },   // plausible wrong answers per box
  convert: "…",       // optional: the participle / conditional equivalent (Greek)
  why: "…", unit_ref: "Β.6", say: "…", status: "book", src: "Μουμτζάκης, τελικές προτάσεις" }
```
Scored 1+1+1+1+1+2 like a Γ4β. Use the keys' Greek verbatim (`research/syntax.md` §3.15-§3.18, §4.2). Mark constructed justifications `status: "general"`.

### `transform` (u12): Γ4β conversions
```js
{ id: "u12-prosdokomeno", kind: "transform", from: "Πῶς δ’ ἄν, εἰ μὴ … κακονούστατος ἦν, … ἀφανίζειν ἐπεχείρησα τοῦ χωρίου;",
  ask: "Να αναγνωρίσετε το είδος του υποθετικού λόγου και να τον μετατρέψετε στο προσδοκώμενο.",
  to: ["Πῶς δ’, ἐὰν μὴ … κακονούστατος ὦ, … ἀφανίζειν ἐπιχειρήσω τοῦ χωρίου;"],   // accepted answers, first = model; list the alternatives the keys accept (ὅτι-clause and infinitive, ὡς/ὅτι)
  tiles: [ /* every word of to[0] + 2-5 wrong-form tiles (ἄν, εἰ, ἦν, ἐπεχείρησα, ἐπιχειρήσαιμι) */ ],
  orderFree: false,      // true when word order may vary (the engine then checks the set of tiles)
  changed: 3,            // optional: words that change, shown as a hint
  steps: ["…", "…", "…"],   // 0-6 Greek micro-steps: all shown on the intro, faded in practice, none in review
  why: "…", exam: [2026], say: "…", status: "exam", src: "Παν. 2026 Γ4β· κλειδί" }
```
A word that repeats in `to[0]` («καὶ … καὶ») needs as many tiles. Punctuation stays glued to its word (`δ’,`, `ὦ,`, `χωρίου;`).

### `fact` (u13): Θέμα Β4
```js
{ id: "u13-mieza", kind: "fact", q: "Ο Αριστοτέλης γεννήθηκε στα Στάγειρα και πέθανε στη Μίεζα.", t: "tf", a: false,
  flip: "Ο Αριστοτέλης γεννήθηκε στα Στάγειρα και πέθανε στη Χαλκίδα.",   // required for tf: the one-fact-changed twin (the true version of a false item, or the trap of a true one)
  why: "…", topic: "Αριστοτέλης", exam: [2026], say: "…", status: "exam", src: "Φιλοσοφικός Λόγος, Εισαγωγή: Αριστοτέλης, Βίος· Παν. 2026 Β3" }
{ id: "u13-eudoxos", kind: "fact", q: "Ποιον γνώρισε ο Αριστοτέλης στην Ακαδημία …;", t: "mcq", options: ["τον Εύδοξο τον Κνίδιο", "τον Θεόφραστο", "τον Ξενοκράτη"], a: "τον Εύδοξο τον Κνίδιο", why: "…", topic: "Αριστοτέλης", … }
```
`topic`: `Σωκράτης Πλάτων Πρωταγόρας Πολιτεία Αριστοτέλης ΗΝ Πολιτικά`. Every fact traces to the textbook introductions listed in the syllabus (`research/interpretation.md` §3), in our own wording; the committee flips one place, person, number, order or adds an over-general word.

### `hook` (u1, text units): Θέμα Β3 etymology
```js
{ id: "u1-dei", kind: "hook", grc: "δεῖ", el: "ένδεια", more: ["δέον", "δεοντολογία", "δέηση"],   // el = the one cognate the match/mcq asks; more = other verified cognates
  forms: ["ἔδει", "δεῖ", "ἐνδεής"],                 // forms attested in the reference texts (research/cognates.jsonl): the find-in-text question taps one of them inside a sentence of the course
  units: ["Δ.13", "Β.6"],                            // where they occur (Φάκελος codes or teaching-unit numbers)
  type: "exam",                                      // root (transparent stem) · ablaut (stem alternation: φέρω/φορ-/οἰσ-) · remote (far relative the committee accepted: τέχνη~τόκος) · exam (pair used by the committee)
  story: "ἔδει (δεῖ = χρειάζεται): η ένδεια είναι η έλλειψη. Ζεύγος του 2026.",
  gaps: [{ s: "Η ___ του έργου σε εργολάβο έγινε με διαγωνισμό.", a: "ανάθεση" }],   // optional Β3 shape C (fill the gap), gap written as ___
  exam: [2026], say: "…", status: "exam", src: "Παν. 2026 Β4 (ένδεια → ἔδει)· cognates.jsonl" }
```
The Β3 match (5 ancient, 7 modern, 2 spare) needs ≥ 7 hooks in the course with distinct `el`. Find-in-text answers must be words that actually occur in a `sentence` of the course (the validator does not check this; the engine falls back to the mcq when none exists).

### `sense` (u1): Β3 shape D «η ίδια λέξη με διαφορετική σημασία»
```js
{ id: "u1-politeia", kind: "sense", grc: "πολιτεία", text_el: "πολίτευμα", modern_el: "το κράτος",
  sentences: ["Η Πολιτεία οφείλει να προστατεύει τους αδύναμους πολίτες.", "…", "…"], a: 0,   // 3-4 modern sentences, exactly one with the modern sense; a = its index
  why: "…", unit_ref: "Δ.13", say: "…", status: "book", src: "Φάκελος Υλικού Δ.13 (λεξιλόγιο)" }
```

### `claim` (u2, u5, u8, u11): Β1 answer builder
```js
{ id: "u8-ethos", kind: "claim", unit_ref: "Δ.13", marks: "7+3",
  q: "Με ποιο επιχείρημα αποδεικνύει ο Αριστοτέλης ότι η ηθική αρετή αποκτιέται με τον εθισμό; Να τεκμηριώσετε με αναφορές στο κείμενο.",   // as the committee phrases it
  chain: [                                            // 4-7 ordered tiles of the full-mark answer; at least one quote tile
    { t: "thesis", el: "…" }, { t: "quote", el: "Το δηλώνει ρητά:", grc: "ἐκ τῶν αὐτῶν καὶ διὰ τῶν αὐτῶν καὶ γίνεται πᾶσα ἀρετὴ καὶ φθείρεται" },
    { t: "gloss", el: "…" }, { t: "link", el: "…", grc: "οὐδὲν ἂν ἔδει τοῦ διδάξοντος" }, { t: "close", el: "…" },
  ],
  distractors: [{ t: "thesis", el: "…" }, { t: "quote", el: "…", grc: "…" }],   // 2-4 wrong tiles: a claim the passage does not make, a quote from another passage, an anachronism
  best: { options: ["…", "…", "…"], a: "…" },        // optional: «ποιο επιχείρημα απαντά καλύτερα» mcq
  why: "…", exam: [2026], say: "…", status: "exam", src: "Φάκελος Υλικού Δ.13· Παν. 2026 Β1" }
```
`t`: `thesis quote gloss link close`. Scored per tile (order and no distractors). The model paragraph is shown after answering.

### `parallel` (u2, u5, u8, u11): Β2
```js
{ id: "u8-marcus", kind: "parallel", unit_ref: "Δ.13",
  author_el: "Μάρκος Αυρήλιος, Τὰ εἰς ἑαυτόν 5.16 (δική μας απόδοση)",
  modern: "Ο νους σου παίρνει τον χαρακτήρα των σκέψεων που συνηθίζει να κάνει …",   // OUR 2-4 sentence paraphrase of a public-domain author, or an original statement; never the exam's copyrighted parallel texts
  grc_quote: "πράττοντες γὰρ τὰ ἐν τοῖς συναλλάγμασι … γινόμεθα οἳ μὲν δίκαιοι οἳ δὲ ἄδικοι",   // the phrase of the reference text to pair with it
  items: [{ el: "…", bucket: "ομοιότητα" }, { el: "…", bucket: "διαφορά" }, { el: "…", bucket: "δεν προκύπτει" }],   // 3-5 statements, at least two buckets used
  why: "…", say: "…", status: "general", src: "Μάρκος Αυρήλιος 5.16 (δική μας απόδοση)" }
```

### `unseen` (u14): Γ1/Γ2
```js
{ id: "u14-lysias-7", kind: "unseen", title_el: "Λυσίας, Περὶ τοῦ Σηκοῦ Ἀπολογία 7.27-28", author: "Λυσίας", ref: "Περὶ τοῦ Σηκοῦ Ἀπολογία 7.27-28 (εκδ. Thalheim)",
  intro_el: "Οι μορίαι ήταν ιερά ελαιόδεντρα …",      // the 1-3 line context note as the exam gives it, our wording
  grc: "Πότερον δέ μοι κρεῖττον ἦν, ὦ βουλή, …",     // 12-20 lines, public domain (Perseus), Attic prose by the exam's authors (Lysias-heavy)
  gloss: [{ grc: "ἄερκτος", el: "αφύλακτος" }],       // 0-4, rare words only (the exam glosses ~3)
  sentences: ["u14-s-lysias-poteron"],                 // ids of the sentence items that chunk it for Γ1 (unit_ref-less sentences)
  questions: [{ q: "Με ποια επιχειρήματα …;", points: ["…", "…", "…"], distractors: ["…"], why: "…" }],   // Γ2 checklist: 2-5 expected points + ≥ 1 wrong point
  forms: ["u14-f-perioikoun"], roles: ["u14-ro-adikein"], transforms: ["u14-t-prosdokomeno"],   // ids of the Γ3/Γ4 items built on it (validated course-wide)
  exam: [2026], say: "…", status: "exam", src: "Παν. 2026 Γ" }
```
Questions: passage card, then `checklist` (answer in your head or type freely, reveal the points, tick what you had; distractors shown struck through).

### `trap` (u14, and 1-2 per grammar unit): spot-the-trap
```js
{ id: "u14-katege", kind: "trap", wrong: "κατήγαγε", right: "κατῆχε", ask: "κατῆγεν: να μεταφέρετε το ρήμα στον παρακείμενο, στον ίδιο τύπο", why: "…", cat: "read", exam: [2024], say: "…", status: "exam", src: "Παν. 2024 Γ3β" }
```
`cat`: `read` (instruction reading) · `noun` · `verb` · `syntax` · `translate` · `interpret` · `marking`. An accent-only trap (ἀγαγῶμεν → ἀγάγωμεν) is allowed. Items missed twice land in the Τετράδιο λαθών automatically.

## 4. How the engine turns items into a lesson

1. **Μάντεψε πρώτα**: the first guessable item (word, form, role, fact, hook, sense) is asked cold, no penalty.
2. For each item: **intro card → quick check** (word: meaning mcq · sentence: translation build · form: cell mcq · role: role mcq · clause: 6-box builder · transform: with all steps shown · fact/hook/sense/trap: their question · claim: chain · parallel: bucket · unseen: passage card + checklist). `rule` cards are followed by their inline quiz. `transfer` items skip the intro.
3. **Practice**: harder questions, shuffled (gender/genitive/principal parts/etymology/reverse · sentence note, find, anaphora, Σ/Λ, device · form build or typed · role label or build · hook find-in-text or gap · claim best · transform with fewer hints), transfer items always included.
4. **Match** when the sitting has ≥ 3 words/hooks/forms/roles/senses (hooks → the Β3 5+2 shape; forms → the Γ3 form ↔ identification table).
5. **1-2 older due items** interleaved. Missed questions return at the end («Ξανά»).

Question types the UI renders: `intro mcq tf build match slots bucket find steps transform spot type swipe label chain checklist`. Spaced review: boxes 1/3/7/14/30/60 days, miss → box 1, swipe miss → one box down; from May every due date is capped at exam − 7 days (2027-05-24). Στάδιο pools: `form role hook fact word`. Θέμα της ημέρας: Δευτέρα Γ3, Τρίτη Γ4, Τετάρτη Α1+Β3, Πέμπτη Γ1+Γ2, Παρασκευή Β4, Σάββατο Β1+Β2, Κυριακή mixed; it draws from units the student has started, else from the first lesson of the units whose `exam` lists that Θέμα. Μικρό διαγώνισμα: all nine Θέματα with their real marks (10/10/10/10/10/20/10/10/10), result ≈ /20 (÷5, flagged as inferred).

## 5. Rules for writers

- Never invent a form, meaning, gender, label or fact. Sources in order of authority: Οικονόμου (grammar, incl. the Κατάλογος ανωμάλων ρημάτων), Μουμτζάκης (syntax labels), the Εγχειρίδιο Γλωσσικής Διδασκαλίας, the Φάκελος / Φιλοσοφικός Λόγος (text, intro facts), `research/vocab.jsonl`, `cognates.jsonl`, `texts.jsonl`, then a real paper's tutor key (keys contain slips: «φοβοῖ» 2023, «καταγήοχεν» 2024). Anything else is `general`; anything you could not confirm is `unsure`.
- «Seen in exam» (`exam: [year]`, `status: "exam"`) only from `research/pastpapers.md`, `morphology.md` §1.2/§9, `syntax.md` §1.2, `interpretation.md` §4/§6.3, with the year. Never predict a passage.
- No statistics in `say`/`why` beyond «στα 6 διαγωνίσματα 2021-2026 ζητήθηκε …»; never a probability.
- Distractors must be plausible and wrong: neighbouring cells of the same lemma, roles of the same case, clause kinds with the same introducer, intro facts with one element flipped. The validator rejects distractors equal to an accepted answer (accent-insensitively, unless the form is `strict`).
- Copyright: the ancient texts are public domain; the Φάκελος translations, comments, exercises, the textbook and the exam's parallel texts are not. Write your own translations, glosses, points and paraphrases. Full-text dumps stay in `research/source-data/`, `research/pastpapers-raw/`, `research/official-*.txt` (gitignored).
- Keep `say` ≤ 160 characters, warm and dry, never childish. Use the school's terminology (αρχικοί χρόνοι, συνηρημένα, αόριστος β΄, ευκτική, επιρρηματική/κατηγορηματική/επιθετική μετοχή, γενική απόλυτη, τελικό/ειδικό/έναρθρο απαρέμφατο, ταυτοπροσωπία/ετεροπροσωπία, ειδικές/ενδοιαστικές/πλάγιες ερωτηματικές/αιτιολογικές/τελικές/αποτελεσματικές/χρονικές/υποθετικές, σύστοιχο αντικείμενο, ποιητικό αίτιο, κατηγορούμενο, επιρρηματικοί προσδιορισμοί).
- Run `npm test` before handing the unit in. Zero errors; look at the warnings.
