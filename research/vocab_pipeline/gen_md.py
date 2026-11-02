import json,collections,re
F=json.load(open('final_entries.json'))
N=json.load(open('pool_stats.json'))['N']
T1=[r for r in F if r['tier']==1]; T2=[r for r in F if r['tier']==2]; T3=[r for r in F if r['tier']==3]
pos_t=collections.Counter(r['pos'] for r in F)
pos1=collections.Counter(r['pos'] for r in T1)
syl=[r for r in F if r['freq']['taught_syllabus']]
uns=[r for r in F if r['freq']['unseen_2021_26']]
both=[r for r in F if r['freq']['taught_syllabus'] and r['freq']['unseen_2021_26']]
unc=[r for r in F if r['uncertain']]
dccn=sum(1 for r in F if r['freq']['dcc_core_rank'])
groups=list(F[0]['freq']['per100k_by_author'])
skip={'ὁ','καί','δέ','εἰμί','οὗτος','αὐτός','μέν','οὐ','ὅς','γάρ','ἐγώ','τις','ἐν','ἄν','ἀλλά','σύ','ἤ','τε','περί','ὡς','μή','εἰς','πρός','ἐπί','ἐκ','διά','κατά','εἰ','ὅτι','οὖν','ὑπό','παρά','μετά','ἀπό','σύν','ἀντί','πρό','ἐκεῖνος','γε','δή','ὦ','ἑαυτοῦ'}
def topg(g,n=14):
    rs=[r for r in sorted(F,key=lambda r:-r['freq']['per100k_by_author'][g]) if r['lemma'] not in skip][:n]
    return ', '.join(f"{r['lemma']} ({r['freq']['per100k_by_author'][g]:.0f})" for r in rs)
# top overall by balanced rate (non-function words)
top=[r for r in sorted(F,key=lambda r:-r['freq']['balanced_per100k']) if r['lemma'] not in skip][:60]
multi=[(r['lemma'],len({s['text'] for s in r['sources'] if s['type']=='unseen-exam'})) for r in F]
multi=sorted([(l,n) for l,n in multi if n>=4 and l not in skip],key=lambda x:-x[1])
pospp=[r for r in F if r['pos']=='verb' and r['tier']==1]
md=[]
A=md.append
A(f"""# Vocabulary research: Αρχαία Ελληνικά Γ΄ Λυκείου (Πανελλαδικές 2027) — project "Gnothi"

Compiled 2026-11-02. This is the vocabulary layer for the Gnothi app. Everything below is either (a) measured on real ancient-Greek text that was downloaded and counted, (b) read from the official 2026-27 ministerial decisions and the 14 Panhellenic papers of 2021-2026 that are already in `research/pastpapers-raw/`, or (c) written by me from knowledge of the school grammar (principal parts, modern-Greek meanings, class labels). Group (c) is NOT copied from any textbook and has NOT been checked by a Greek teacher yet — see section 9.

| File | What it is |
|---|---|
| `research/vocab.jsonl` | **{len(F)}** lemma entries, one JSON object per line (schema in section 6) |
| `research/vocab_names.jsonl` | {sum(1 for _ in open('names.txt',encoding='utf8'))} proper names of the texts (Ζεύς, Προμηθεύς, Πλάτων ...) kept apart from the vocabulary |
| `research/vocab_pipeline/` | the scripts that produced the numbers (re-runnable; they download the corpora, nothing copyrighted is stored) |
| `research/vocab.md` | this file |

## 1. Bottom line

1. **The vocabulary is two things, not one.** (i) The *taught texts*: since 2021 the Γ΄ Λυκείου Humanities paper has been built on the new book «Αρχαία Ελληνικά, Φιλοσοφικός Λόγος» + «Φάκελος Υλικού» (Plato *Protagoras* 320c-323a, *Republic* 514a-515c / 518b-519a / 519b-520a, Aristotle *Metaphysics* A2, *Nicomachean Ethics* B1 and B6, *Politics* A1, Γ6, Θ1, Aristotle *Protrepticus* 8-9, Epicurus *Letter to Menoeceus* 122, Plutarch *De Alexandri fortuna* 329A-D). These {len(syl)} lemmas are the closed, learnable part. (ii) The *unseen* (αδίδακτο): any Attic prose; the committee gives only 1-4 footnoted glosses per passage (about 3 words on average), so the student must already know the high-frequency core. In the 14 papers 2021-2026 the unseen authors were Lysias x5, Xenophon x3, Plato x2, Thucydides x2, Isocrates x1, Plutarch x1 (section 3).
2. **{len(F)} entries, in three tiers.** Tier 1 = **{len(T1)}** core entries (taught-text or exam-unseen words that are not hapax-rare, plus every lemma whose balanced frequency is >= 25 per 100,000 tokens); tier 2 = {len(T2)} text-specific words (rare in general Attic prose, but they occur in the taught texts or in a past unseen: μεσότης, ἔλλειψις, τειχίον, κατάγειος ...); tier 3 = {len(T3)} further frequent Attic words (fillers from the corpus, plus the words of the Α΄ and Β΄ Λυκείου texts). The app can teach tier 1 first (target 600-900), tier 2 right after the matching taught passage, tier 3 as optional drill.
3. **Coverage test (honest version).** The 14 past unseen passages have 2,048 running tokens, 1,990 of them common words (the rest are names). A list built **only from corpus frequency, without looking at the exam** covers: balanced rate >= 25 (453 lemmas) **78%** of those tokens; >= 12 (766 lemmas) **84%**; >= 12 plus all Γ΄ syllabus words (1,267 lemmas) **87%**. The last 13% is the tail of rarer words (ἀγεννής, ἐμαλακίσατο, τιτθός ...) that no frequency list catches — the committee glosses only about 3 of them per paper, so the student also needs word-formation skills (πρόθεση + ρήμα, επίθετα σε -ικός/-ώδης), not only memorised lists. Our 1,549 entries cover 99.9% of the 1,990 tokens, but that figure is in-sample (the exam lemmas were added on purpose). For the Γ΄ taught set (4,410 tokens): 4,352 tokens (98.7%) are in the vocabulary; the rest are names.
4. **The exam asks forms, not only meanings.** Every paper asks 6-10 morphology items on the unseen: principal-part forms (ᾠήθην → inf.; οἴσω → perfect; ἐξευρεῖν → imperative; περιιδεῖν → future), comparative/superlative of adjectives and adverbs (ῥᾷστον, αἰσχρὰν, ῥᾳδίως, πάλαι, πρῶτον), 3rd-declension plurals (ἄστυ, μνᾶς, πλῆθος), crasis, and the syntax label of 6-7 words. This is why every verb entry carries all six principal parts (α΄ ενικό of ενεστώτας, μέλλοντας, αόριστος, παρακείμενος ενεργ., παρακείμενος μέσου/παθ., αόριστος παθ.), every noun its genitive, every irregular adjective its comparison.

## 2. Official scope (read, not summarised from memory)

* **ΥΑ 90176/Δ2/06-07-2026 (ΦΕΚ Β΄ 4210)** — Panhellenic 2027 examinable material. PDF: https://alfavita.gr/sites/default/files/2026-07/90176_%CE%942_06_07_26_%CE%95%CE%9E%CE%95%CE%A4%CE%91%CE%A3%CE%A4%CE%95%CE%91_%CE%A5%CE%9B%CE%97_2027.pdf (also linked from https://www.alfavita.gr/panellinies/552814_panellinies-2027-anakoinothike-i-exetastea-yli-ton-gel ). Books: Κοπιδάκης-Πατρικίου-Λυπουρλής-Μωραΐτου «Αρχαία Ελληνικά, Φιλοσοφικός Λόγος» (Γ΄ ΓΕΛ), «Φάκελος Υλικού», Ζαμάρου-Μήτσης-Παπανδρέου «Εγχειρίδιο Γλωσσικής Διδασκαλίας» (units 1-21), Οικονόμου Γραμματική, Μουμτζάκης Συντακτικό.
* **Taught passages (exam text printed in the paper):** Protagoras 320c-321b, 321b-322a, 322a-323a (units 2-4); Republic 514a-515c, 518b-519a, 519b-520a; Aristotle Metaph. A 2 (982b12-28 — the ΥΑ prints "98b12-28"), Protrepticus fr. 8-9, Pol. A 1.1-8 (1252a1-7 + b27-32), A 1.10-11 (1253a7-18), A 1.12 (1253a29-39, only in translation), Γ 6.3-4 (1281a39-b10), Θ 1.3-2.1 (1337a33-b11), EN B 1.1-4 (1103a14-b2), B 1.5-8 (1103b2-25), B 6.4-8 (1106a26-b7), B 6.10-13,16 (1106b18-28, b36-1107a6); Epicurus, *Letter to Menoeceus* 122; Plutarch, *De Alexandri fortuna aut virtute* 6, 329A-D. Excluded: Hesiod *Theogony* 507-569 and Aeschylus *PV* 436-506.
* **Unseen:** "Αδίδακτο πεζό κείμενο αρχαίων Ελλήνων συγγραφέων της αττικής διαλέκτου". Grammar/syntax scope: Gymnasium Ancient Greek A-B-Γ plus the Εγχειρίδιο Γλωσσικής Διδασκαλίας units 1-21 (i.e. no extra word list is imposed).
* **School-year texts that build up to it** (ΥΑ 102749/Δ2 of 2026 — number read from the document; the ΦΕΚ Β΄ 4857/4-8-2026 reference comes from alfavita and was not checked on et.gr — https://filologikos-istotopos.gr/wp-content/uploads/2026/07/yli-Α_Β_Γ__ΓΕΛ_ΤΡΑΠ_ΘΕΜ_2026_27.pdf): **Α΄ Λυκείου** «Αρχαίοι Έλληνες Ιστοριογράφοι»: Thucydides III 71-75, 81 (70, 78, 82-83 only in translation), Xenophon *Hellenica* II 2.1-4, 2.16-23, 3.50-56, 4.18-23 (+ translation-only parts); **Β΄ Λυκείου** «Ρητορικά Κείμενα»: Lysias *Ὑπὲρ Μαντιθέου* (whole speech except §14-17). Their lemmas are in the tier-3 layer and are marked `course-Α-Λυκείου` / `course-Β-Λυκείου` in `sources`.
* The Ministry publishes **no word list**. (Carpe could parse a glossary from the textbook; for Gnothi the equivalent printed lexicon is the teacher's/pupil's book glossary, which is copyrighted and not downloadable. We therefore built the list from the texts themselves.)

## 3. What the past papers show (2021-2026, 14 papers read from `research/pastpapers-raw/`)

| Paper | Taught text | Unseen (αδίδακτο) |
|---|---|---|
| Ιούν. 2021 | Plato, Prot. 322a-323a | Xenophon, *Apology* 31-34 |
| Σεπτ. 2021 (επαναλ.) | Aristotle, EN B6.4-8 (+ 2nd fragment) | Plutarch, *Λακωνικά ἀποφθέγματα* 222B-D (Callicratidas) |
| Σεπτ. 2021 (ομογ.) | Aristotle, EN B6.4-8 (+ 2nd fragment) | Isocrates, *Κατὰ σοφιστῶν* 3-4 |
| Ιούν. 2022 | Aristotle, Pol. 1253a7-18 | Thucydides I 121.1-4 |
| Σεπτ. 2022 | Aristotle, Metaph. A2 | Plato, *Laws* I 641a3-c7 |
| Ιούν. 2023 | Aristotle, Pol. A 1.1-8 | Plato, *Theages* 121b1-d6 |
| Σεπτ. 2023 (ομογ.) | Aristotle, EN B1.1-4 | Lysias, *Πρὸς Σίμωνα ἀπολογία* 5-8 |
| Σεπτ. 2023 (επαναλ.) | Aristotle, EN B1.5-8 | Lysias, *Ὑπὲρ τοῦ Ἐρατοσθένους φόνου* 9-13 |
| Ιούν. 2024 | Plutarch, *De Alex. fort.* 329A-D | Thucydides VIII 81.1-2 |
| Σεπτ. 2024 | Aristotle, Protrepticus 8-9 | Lysias, *Πρὸς Αἰσχίνην τὸν Σωκρατικὸν* fr. 1.1-2 |
| 10 Σεπτ. 2025 (εισαγ.) | Plato, Prot. 320c-321b | Xenophon, *Memorabilia* I 1-3 |
| Σεπτ. 2025 (επαναλ.) | Plato, Prot. 321b-322c | Lysias, *Κατὰ Ἐρατοσθένους* 7-10 |
| Ιούν. 2025 | Plato, Rep. 514a-515c | Xenophon, *Memorabilia* II 1.22-23 (printed "II 2.1.22-23") |
| Ιούν. 2026 | Aristotle, EN B1.5-8 | Lysias 7, *Περὶ τοῦ Σηκοῦ ἀπολογία* 27-29 |

Tally of the 14: **Lysias 5, Xenophon 3, Plato 2, Thucydides 2, Isocrates 1, Plutarch 1**; five of the last eight papers were Lysias. Demosthenes and Aristotle's *Rhetoric* did not appear in 2021-2026. The secondary list of the June papers 2000-2023 (https://www.alfavita.gr/panellinies/448652_panelladikes-arhaia-ellinika-erga-poy-exetastikan-os-adidakto-keimeno-tin) gives 24 entries: Xenophon 9, Thucydides 5, Isocrates 3, Plato 2, Demosthenes 2 (the 2002 and 2003 entries are identical, so probably one), Lysias 1, Aristotle (*Rhetoric*, 2018) 1, Lycurgus 1 — I did not re-verify the pre-2021 entries against the original papers. For the pool I therefore counted Xenophon, Thucydides, Plato, Lysias, Isocrates, Demosthenes, Aristotle (EN, Pol., Rhet., Ath. Pol.), Plutarch (*Moralia*), plus Aeschines/Antiphon/Hyperides as "other orators"; Arrian was left out (he is not in the list above and writes Ionic-tinged Koine).

**Glosses given by the committee in 2021-2026 (everything else must be known):** προσάντης = απότομος, ἐμαλακίσατο = δείλιασε, ἐφιεμένων, ἀπαλλάττομαι = φεύγω, ἐπαρῶμαι = καταριέμαι, ἐντρυφῶμαι, ὑπολαβεῖν, ναυβάτας = πεζοναύτες, ὠνητή, Καδμεία νίκη = Πύρρειος, θεραπεία τοῦ φύντος, οὐκ ἀγεννής, τῶν ἡλικιωτῶν, τὸν τιτθόν, τὸ μειράκιον, ἐκκόψας (τὰς θύρας), ἀδελφιδοῦς, ἄδειαν = αμνηστία, ἀνωλοφύρατο, ξυνωμοσίαι, μυρεψικήν, ἀφορμῆς, πολυσαρκία, ὀρθοτέρα, ὥρα, θαμά, ἐξώλειαν, οἱ γραψάμενοι, διετεθρύλητο, αἰτιάσασθαι, οἰωνοῖς, τοὺς ὄρνιθας, ἄερκτος = αφύλακτος, ἐπεργάζομαι, ἀπογράφω. All of them are in `vocab.jsonl` (tier 2/3, `sources` contains the paper).

**Morphology/syntax items asked on the unseen (shows which lemma features matter):**
* 2021J: comparative of adjectives, number change; 2nd sg imperative of all verbs of a clause. 2021S: aorist forms → present; number change; Στήλη Α/Β: λέγουσι, τιμῶντες, πείθειν, ποιήσειν, γενήσονται.
* 2022J: number change; imperative aorist of ἀμύνομαι etc.; 2022S: future of τυγχάνοι/γίγνοιτο, degrees of ὀρθή...
* 2023J: ἔχειν (imper. aor. β΄), ῥᾷστον (positive/comparative), ἀγεννής (gen.), ἐπιθυμεῖ (inf.), τὸ ἄστυ (nom. pl.), καταβαίνοντες (future), πάλαι (comparative), ἐπιμεληθῆναι (part. gen. pl.), ὅστις (other number). 2023S: πρῶτον (degrees), μεθύων, ποιεῖν, τὴν οἰκίαν, ἐξῆλθον, παῖδας.
* 2024J: πλῆθος (dat. pl.), ἰδίαν/πολλὰ (comparison), ἑαυτοῦ, ὑπαρχουσῶν, ἐλπίδων; perfect of ἔπεισε, ψηφισαμένων, πλεύσας, κατῆγεν. 2024S: ᾠήθην, τολμῆσαι, αἰσχράν, ῥᾳδίως, ἐξευρεῖν, περιιδεῖν, τῶν ὄντων, οἴσω, μνᾶς, τοιαῦτα.
* 2025J: φανῆναι, μεγάλας, ἰδεῖν, ἐπισκοπεῖν, ἄξω, οὐδενός; 2025S: παραδιδόασιν, ἐξελάσαντες, σῶσαι, πέπρακται, διαλαβόντες, λόγοις, γραψάμενοι, σημαίνειν, ἔπεισαν, τούτων. 2026J: διαβεβλημένος, ἀφανίζειν, φησιν, περιοικοῦσι, ᾑρημένος.

Lemmas that occur in at least 4 of the 14 unseen passages (besides articles/particles): {', '.join(f"{l} ({n})" for l,n in multi[:45])}.

## 4. How the numbers were made (method)

1. **Corpus.** Full texts of Xenophon, Thucydides, Plato, Lysias, Isocrates (speeches), Demosthenes, Aristotle (EN, Politics, Rhetoric, Ath.Pol.), Aeschines, Antiphon, Hyperides, Plutarch *Moralia*, as TEI XML from Perseus `canonical-greekLit` (https://github.com/PerseusDL/canonical-greekLit; texts public domain, TEI by Perseus CC BY-SA). Notes, headings, speaker labels removed. 2.34M running tokens, grouped in 9 author groups (sizes: {', '.join(f"{g} {n:,}" for g,n in N.items())}).
2. **Lemmatisation.** Form→lemma dictionary built from Vanessa Gorman's hand-corrected dependency treebanks of Attic prose (https://github.com/vgorman1/Greek-Dependency-Trees; CC BY-NC-SA 4.0; 328,000 tokens: Xenophon *Hellenica* 1-3, *Anabasis* 1,3, *Cyropaedia*, *Symposium*, *Hiero*; Thucydides 1 and 3.1-40; Lysias 1,12-15,19,23; Plato *Apology*, *Crito*; Demosthenes; Isocrates 18; Aristotle *Politics* 1-2; Plutarch *Alex. fort.*, *Lycurgus*, *Alcibiades*; Antiphon; Isaeus), with the Universal Dependencies Perseus/PROIEL treebanks and the Wiktionary extract of kaikki.org (https://kaikki.org/dictionary/Ancient%20Greek/) as fall-backs; {254+127} rare forms were mapped by hand (`manual_map.txt`). The dictionary lemmatises **94.7%** of the 2.44M tokens (the rest are names, crasis, hapaxes); the most frequent reading of an ambiguous form wins, so counts are good to a few per cent, not exact.
3. **Frequency.** For each lemma the rate per 100,000 tokens is computed inside each of the 9 author groups; the *balanced rate* is the mean over the groups (so that Demosthenes' and Plato's size does not drown Lysias, who is the most likely 2027 author). `author_groups_ge3` = in how many groups the rate is >= 3.
4. **Taught-text lemmas.** The passages above were cut from the Perseus texts at the Stephanus/Bekker marks (Bekker lines are accurate to about +-4 lines because Perseus marks every 5th line) and lemmatised; the Protrepticus passage was read from the printed 2024S paper. These cuts live only in the scratch area; they are public-domain Greek, but I did not commit them.
5. **Exam signal.** The 14 unseen passages were isolated from the papers, glosses removed, and lemmatised the same way: `unseen_2021_26` = number of tokens, `sources` lists the paper.
6. **External cross-check.** Dickinson College Commentaries Greek Core List (500 most frequent words from the TLG; https://dcc.dickinson.edu/greek-core-list, CC BY-SA): **{dccn}** of its 523 headwords are entries here (the rest are Homeric/Koine-only or ordinals and were left out on purpose; the useful ones such as ἀνά, ἵημι, ἔθνος, οὐρανός, πίπτω, βαίνω were added by hand).
7. **What was authored by me.** Lemma display form, class label (κλίση), gender/article, genitive, the six principal parts, and the modern-Greek meanings were written from my knowledge of the school grammar (Οικονόμου/Τζάρτζανος conventions: ενεστώτας, μέλλοντας, αόριστος α΄/β΄, παρακείμενος ενεργ., παρακείμενος μέσου/παθ., αόριστος παθητικός; συνηρημένα με την ευθεία μορφή «ποιῶ (ποιέω)»). Automatic sanity checks done: exactly one accent mark per authored word; headword attested with identical accent in the 2.4M-token corpus for 97% of the entries (the other 53 are rare words that the corpus simply does not contain); no duplicate lemmas.

## 5. Tiers and counts

| | entries | meaning |
|---|---|---|
| tier 1 | {len(T1)} | (taught-text or exam-unseen word AND balanced rate >= 3) OR balanced rate >= 25 |
| tier 2 | {len(T2)} | in taught text or past unseen, but rare in general Attic (rate < 3): text-specific |
| tier 3 | {len(T3)} | frequent Attic fillers + Α΄/Β΄ Λυκείου course words |

By part of speech (all / tier 1): {', '.join(f"{p} {pos_t[p]}/{pos1[p]}" for p in pos_t)}.
Entries found in the Γ΄ taught texts: **{len(syl)}**; in the 14 past unseen passages: **{len(uns)}**; in both: {len(both)}.

Most frequent content words by author group (rate per 100,000 tokens) — this is what an unseen from that author is made of:
""")
for g in ['Lysias','Xenophon','Thucydides','Plato','Isocrates','Demosthenes','Plutarch','Aristotle']:
    A(f"* **{g}**: {topg(g)}")
A(f"""
Top 60 content lemmas by balanced rate: {', '.join(f"{r['lemma']} ({r['freq']['balanced_per100k']:.0f})" for r in top)}.

## 6. Schema of `vocab.jsonl`

One JSON object per line. Fields:
* `id` — transliterated lemma + `-n|-v|-adj|-adv|-prep|-conj|-part|-pron|-art|-num|-int` (stable).
* `lemma` — headword as in the school grammar (verbs in the ευθεία μορφή of the Gorman lemma, e.g. ποιέω; the contracted 1st person is in `forms`).
* `forms` — the dictionary string: nouns `ἀνήρ, ἀνδρός` + `gender` (`m`/`f`/`n`/`m/f`); adjectives `ἀγαθός, -ή, -όν`; verbs the six principal parts separated by ` ; ` (— = none); prepositions with their cases.
* `principal_parts` — verbs only: list of 6 strings or null (order: ενεστ., μέλλ., αόρ., παρακ. ενεργ., παρακ. μέσου/παθ., αόρ. παθ.).
* `pos`, `gender`, `class` (κλίση / είδος ρήματος: συνηρημένο, υγρόληκτο, αφωνόληκτο, σε -μι, αποθετικό ...), `el` (modern-Greek meaning(s), set phrases after `·`).
* `sources` — list of `{{type, text, count}}`: `taught-Γ` (passage of the Γ΄ syllabus), `unseen-exam` (paper 2021-2026), `course-Α-Λυκείου`, `course-Β-Λυκείου`.
* `tier` (1/2/3), `freq` (`tokens_in_pool`, `balanced_per100k`, `author_groups_ge3`, `per100k_by_author`, `taught_syllabus`, `unseen_2021_26`, `dcc_core_rank`), `freq_note` (human-readable sentence with the real counts).
* `corpus_form_attested` — headword found with the same accent in the corpus; `uncertain` (+ `uncertain_note`) — {len(unc)} entries are marked uncertain (see section 9).

## 7. Suggested use in the app (hooks for the engine)

* **Lesson order:** teach tier-1 words in the order of the taught text the student is reading (the `sources` field gives the passage), then tier 2 of that passage, then the unseen core by `balanced_per100k` descending, Lysias-heavy first (`per100k_by_author.Lysias`).
* **Question builders that these fields make possible:** meaning MC (`el`), principal-part fill-in / "find the aorist" (`principal_parts`; the six parts are the exam's favourite morphology), "μεταφέρετε στην ίδια φωνή/ευκτική" generators (verbs flagged `αποθετικό`, `συνηρημένο`, `σε -μι`), comparison drills (adjectives with `class` containing συγκριτ./υπερθ.), gender+genitive drills for the 3rd declension (`forms` + `class`), sort-the-lemma by declension (α΄/β΄/γ΄ κλίση).
* **Answer checking** should compare after removing accents, breathings, iota subscript and case (not letters); `vocab.jsonl` stores polytonic forms only; the Greek name of the exam committee's terms (αόριστος β΄, παρακείμενος, ευκτική ...) is already in the `class` strings.
* **Frequency honesty:** the "ιδανικό" show-off statistics for the student (e.g. «αυτή η λέξη εμφανίζεται 1.589 φορές στους 9 συγγραφείς της πισίνας μας») may use `freq.tokens_in_pool`; say "σε 2,3 εκατ. λέξεις αττικής πρόζας" — not "στις Πανελλήνιες".

## 8. Proper names

`vocab_names.jsonl` has the names that occur in the taught texts and in the past unseen passages (Πρωταγόρας, Προμηθεύς, Ἐπιμηθεύς, Ἥφαιστος, Ἀθηνᾶ, Ἑρμῆς, Ἀλέξανδρος, Δαρεῖος, Ζήνων, Γλαύκων, Ἡρακλῆς, Λυσίας, Ξενοφῶν ...) with their genitive and a Greek gloss. They are kept out of the vocabulary and out of the counts, as in Carpe.

## 9. Uncertain items and honest limits

* **Principal parts and meanings were written by a language model from the school-grammar convention, not copied from the textbook glossary.** For the 1,000 most common entries I am confident; for rare verbs (the compound verbs of tier 2/3) a Greek teacher or the Fable review pass should check the aorist passive and the perfect forms. Forms I deliberately left as "—" are those I am not sure exist in Attic.
* **Marked `uncertain: true` ({len(unc)}):** {', '.join(r['lemma'] for r in unc)}. Reasons are in `uncertain_note`.
* **Lemma conventions:** a few Gorman lemmas were merged to the school lemma (πράσσω→πράττω, θάλασσα/θάλαττα, φάος→φῶς, νόος→νοῦς, ἐρέω→ἐρῶ). δέω (δένω) and δεῖ/δέομαι are separate entries but their statistics overlap a little in the treebank.
* **Frequency is Attic-prose frequency**, not frequency in the exam. The exam signal is `unseen_2021_26` (only about 2,050 tokens in 14 passages, so a count of 1 is weak evidence).
* **Copyright:** the Greek texts are public domain; the translations, glosses and meanings above are my own wording; the exam glosses quoted in section 3 are short facts from the state exam papers; the Gorman treebank and the DCC list are used as counting sources (attribution above; Gorman is CC BY-NC-SA, our app is non-commercial open source). No textbook text is stored.
* **Not done:** the Εγχειρίδιο Γλωσσικής Διδασκαλίας units 1-21 and the Γυμνάσιο books were not available as downloadable PDFs in this session, so their example sentences are not in the pool (they are exercises on the same Attic vocabulary); the Aristotle *Protrepticus* (Iamblichus) was taken from the exam print only.

## 10. Source list

* ΥΑ 90176/Δ2/06-07-2026 (ΦΕΚ Β΄ 4210), PDF above; ΥΑ 102749/Δ2 (2026), PDF above.
* Panhellenic papers 2021-2026: `research/pastpapers-raw/` (official ΥΠΑΙΘΑ papers, local only).
* Perseus Digital Library `canonical-greekLit`, https://github.com/PerseusDL/canonical-greekLit.
* V. Gorman, *Dependency Treebanks of Ancient Greek Prose*, Journal of Open Humanities Data 6:1 (2020), https://doi.org/10.5334/johd.13 ; https://github.com/vgorman1/Greek-Dependency-Trees.
* Universal Dependencies, Ancient Greek Perseus and PROIEL, https://github.com/UniversalDependencies/UD_Ancient_Greek-Perseus (-PROIEL).
* kaikki.org Wiktionary extract, https://kaikki.org/dictionary/Ancient%20Greek/.
* Dickinson College Commentaries, Greek Core List, https://dcc.dickinson.edu/greek-core-list.
* Secondary list of unseen authors 2000-2023, https://www.alfavita.gr/panellinies/448652_panelladikes-arhaia-ellinika-erga-poy-exetastikan-os-adidakto-keimeno-tin (not re-verified).
""")
open('/Users/ionpetro/Documents/jobmachine/experiments/ancient-greek-panhellenic/research/vocab.md','w',encoding='utf8').write('\n'.join(md))
print(len('\n'.join(md)))
