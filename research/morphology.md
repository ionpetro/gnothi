# Gnothi research: MORPHOLOGY of Attic Greek for the Panhellenic exam (Αρχαία Ελληνικά, Ομάδα Προσανατολισμού Ανθρωπιστικών Σπουδών)

Written 2026-11-02 for the June 2027 exams. Scope: everything a Γ' Λυκείου candidate must be able to FORM and RECOGNISE (nouns, adjectives, comparison, adverbs, numerals, pronouns, the whole verb system, non-finite forms). Syntax is another agent's job; it appears here only where it decides a form (which participle, which mood).

How to read the tags:
- **[A]** = a form type that actually appears in the Panhellenic papers I read (June main sessions 2019-2026, Sept resits 2021-2025, plus 2008-2009 old format). Highest priority.
- **[B]** = in the official school grammar (Οικονόμου) or in the Εγχειρίδιο Γλωσσικής Διδασκαλίας (units 1-21), but not seen in the papers I read. Teach after [A].
- **[C]** = general Greek-grammar knowledge outside the school books (kept to a minimum). Never let [C] block progress.
- **UNSURE** = I could not confirm it from a primary source. Treat as open.
- Where a form is printed in Greek, it is the form the SCHOOL grammar prints, checked against the official PDF (S1), unless marked [C].

---

## 0. Sources, and how much I trust each

| ID | Source | What I used it for | Trust |
|---|---|---|---|
| S1 | **Μιχ. Χ. Οικονόμου, *Γραμματική της Αρχαίας Ελληνικής* (Γυμνασίου-Λυκείου), ΥΠΑΙΘ / ΙΤΥΕ «Διόφαντος», code 22-0012**, official PDF (about 330 pp.; 36 chapters; Παράρτημα «Κατάλογος ανώμαλων ρημάτων» on pp. 293-314). https://ebooks.edu.gr/ebooks/d/8547/756/22-0012-02_Grammatiki-tis-Archaias-Ellinikis_Gymnasiou-Lykeiou.pdf (catalogue page: https://ebooks.edu.gr/ebooks/handle/8547/283) | I downloaded the PDF, extracted the text (kept in gitignored `research/source-data/oikonomou-grammar.txt`) and read: ch.10-11 (3rd decl., anomalous nouns), ch.17 (comparison, adverbs), ch.19 (pronouns), ch.22-31 (verbs), the whole Παράρτημα (principal parts). **This is the reference the exam is built on.** Where S1 and other grammars differ, S1 wins. | Primary, official |
| S2 | **Εγχειρίδιο Γλωσσικής Διδασκαλίας (για την Αρχαία Ελληνική)**, Μήτσης-Ζαμάρου-Παπανδρέου, ΙΤΥΕ, code 22-0013 (the book is labelled Α' Λυκείου but the 2027 decision makes units 1-21 examinable for Γ'). PDF https://ebooks.edu.gr/ebooks/d/8547/5488/22-0013-02_Egxeiridio-Glossikis-Didaskalias_A-Lykeiou.pdf (catalogue https://ebooks.edu.gr/ebooks/handle/8547/5486) | Read prologue + unit titles (§1.3). Its prologue says it does NOT repeat tables; it drills "the choice of the requested forms always in close relation to syntactic position inside a sentence" and "transformation of sentences". | Primary, official |
| S3 | **Υπουργική Απόφαση 90176/Δ2/06-07-2026, «Καθορισμός εξεταστέας ύλης για το έτος 2027»** (ΦΕΚ B' 4210, number as recorded in the Carpe research notes; I did not check the ΦΕΚ itself). https://www.minedu.gov.gr/publications/90176_%CE%942_06_07_26_%CE%95%CE%9E%CE%95%CE%A4%CE%91%CE%A3%CE%A4%CE%95%CE%91_%CE%A5%CE%9B%CE%97_2027.pdf (also https://alfavita.gr/sites/default/files/2026-07/90176_%CE%942_06_07_26_%CE%95%CE%9E%CE%95%CE%A4%CE%91%CE%A3%CE%A4%CE%95%CE%91_%CE%A5%CE%9B%CE%97_2027.pdf ; news item https://www.alfavita.gr/panellinies/552814_panellinies-2027-anakoinothike-i-exetastea-yli-ton-gel) | The exact scope sentence for grammar (§1.1). | Primary, official |
| S4 | **ΦΕΚ 5136/2022 (format of the exam)** and **ΙΕΠ teaching instructions 2025-26 / 2026-27** (in `research/official-fek-5136-2022-ancient-greek-format.txt`, `research/official-guidelines-2026-27-arch-C-lykeiou.txt`, saved by sibling agents) | One grammar question of 10 points, possibly split in two parts; the "textbooks to know" sentence. | Primary, official |
| S5 | **Past papers** (θέματα), official PDFs. June main: 2019, 2020, 2021, 2022 (https://www.in.gr/wp-content/uploads/2022/06/them_arx_gel_220606-1.pdf), 2023 (https://alfavita.gr/sites/default/files/2023-06/ARXAIA_OP_HM_NEO_2023_21.pdf), 2024 (https://alfavita.gr/sites/default/files/2024-06/them_arxaia_gel_240604.pdf), 2025 (https://alfavita.gr/sites/default/files/2025-06/them_arxaia_gel_250602.pdf), 2026. Sept resits (Επαναληπτικές) and homogeneous-candidate sessions (Ομογενών) 2021-2025. 2008-2014 and 2015-2020 old-format papers. Raw text in gitignored `research/pastpapers-raw/`. | The ONLY honest frequency evidence in this file. Every count below was read by me from these papers, not estimated. | Primary |
| S6 | **Answer keys**: Διακρότημα (2021-2024, 2026), Πουκαμισάς (2025), ΟΕΦΕ (2024) | Cross-check only. The official ministry key is not public. Keys contain slips (see §1.5). Verify forms from S1. | Secondary |
| S7 | General Greek grammar knowledge (Smyth, Wiktionary-style paradigms) | Only for items S1 does not print; always marked [C]. | General |

Method note: I extracted all Γ3 (grammar) questions from every paper listed in S5 with `pypdf` and read each one. I did not trust any key blindly; the forms in this file were checked against S1.

Gymnasium split: I did not open the three Gymnasium textbooks, but a sibling agent saved the **ΙΕΠ 2025-26 teaching guidance for Α΄/Β΄/Γ΄ Γυμνασίου** (`research/official-gymnasium-ancient-greek-guidance-2025-26.txt`, source: iep.edu.gr / minedu.gov.gr, "Σχολικό Έτος 2025-2026 | Οδηγίες Διδασκαλίας"). §2.1 summarises what it says about morphology. It is the guidance of the CURRENT year; the candidate (Γ' Λυκείου in 2026-27) was in Γ' Γυμνασίου in 2023-24, so cuts may differ (UNSURE).

---

## 1. How the exam actually tests morphology

### 1.1 What the ministry says (verbatim scope, S3 + S4)
- Exam text of the grammar scope: "Οι μαθητές και οι μαθήτριες, για να είναι σε θέση να προσεγγίζουν το νόημα των αρχαίων ελληνικών κειμένων, πρέπει να γνωρίζουν την ύλη Γραμματικής και Συντακτικού που περιλαμβάνεται: α) στα σχολικά βιβλία του Γυμνασίου Αρχαία Ελληνική Γλώσσα Α΄, Β΄, Γ΄ Γυμνασίου, β) ολόκληρη την ύλη που περιλαμβάνεται στο σχολικό βιβλίο Εγχειρίδιο Γλωσσικής Διδασκαλίας (ενότητες 1-21)."
- The 2027 decision's reference book list also names Οικονόμου *Γραμματική* and Μουμτζάκης *Συντακτικό*. So the working scope = Οικονόμου's morphology as exercised in Attic prose + the 21 Εγχειρίδιο units.
- Format (ΦΕΚ 5136/2022 as saved in `research/official-fek-5136-2022-ancient-greek-format.txt`; the 2025 and 2026 papers still follow it exactly): the unseen Attic prose text (12-20 lines, with a short intro) carries **one grammar question worth 10 points which may be split into two sub-questions**, one syntax question worth 10, a comprehension question worth 10 and the translation worth 20. So morphology = **10 of 100 points** (about 10 sub-items) and the forms always come from the unseen passage printed on the paper.
- Instruction 4 of every paper: "Κάθε απάντηση τεκμηριωμένη είναι αποδεκτή." So correct alternative forms are accepted (ἰδιαιτέραν / ἰδιωτέραν, ἔλαττον / ἔλασσον, διαφέρουσι / διαφέρουσιν, double forms listed in S1).

### 1.2 The 10 points: how the question has looked, year by year (S5, my reading)
June main sessions (new format starts 2019; Γ3 = 10 points; Γ4 is syntax):

| Year | Γ3 content |
|---|---|
| 2019 | (α, 4 pts) the 3rd-declension nouns and the pronouns of a quoted passage → other number, same case and gender. (β, 6 pts) write the verbs that are plural and put them in the **aorist subjunctive active**, same person and number. |
| 2020 | (α, 3) three participles (ἐκλιπούσας, εἰσελθούσας, καταδαπανηθείσας) → **2nd person singular of the imperfect indicative**, same voice. (β, 4) the adverbs that are in the comparative → **the other two degrees**. (γ, 3) τις → dative pl; προσόδους → nominative pl; πολίταις → vocative sg. |
| 2021 | (α, 7) adjectives → other number **and** comparative; every other declinable → other number. (β, 3) **2nd sg imperative** of all verb forms of the phrase, same tense and voice (ἔγνω, ζῆν, τεθνάναι). |
| 2022 | (α, 5) all declinable forms of "Ἡμεῖς δὲ νῦν καὶ ἀδικούμενοι τὸν πόλεμον ἐγείρομεν" → other number. (β, 5) verbs → **2nd sg aorist imperative, same voice**; the adjective → comparative (same gender, number, case). |
| 2023 | Nine single forms (10 pts): ἔχειν → 2sg imp **aor. β'**; ῥᾷστον → positive and comparative; ἀγεννής → gen sg; ἐπιθυμεῖ → infinitive same tense/voice; τὸ ἄστυ → nom pl; καταβαίνοντες → future (same form); πάλαι → comparative; ἐπιμεληθῆναι → participle masc gen pl same tense/voice; ὅστις → other number. |
| 2024 | (α, 6) πλῆθος → dat pl; ἰδίαν → comparative; πολλά → superlative; ἑαυτοῦ → acc pl fem 2nd person; ὑπαρχουσῶν → masculine; ἐλπίδων → dat sg. (β, 4) four verb forms in a quoted passage → **perfect**, same form. |
| 2025 | (α, 4) find the 3rd-declension nouns of a passage → **genitive sg** (γυναῖκας, φύσει, σῶμα, καθαρότητι). (β, 6) φανῆναι → 2sg imp same tense/voice; μεγάλας → gen pl **comparative** same gender; ἰδεῖν → nom sg **future participle** fem; ἐπισκοπεῖν → 3sg imperfect; ἄξω → 1pl **aorist β' subjunctive**; οὐδενός → dat sg fem. |
| 2026 | (α, 6) all declinable forms of a quoted passage → other number (τοῦτον δ᾽ ὃς οὔτε … ᾑρημένος). (β, 4) διαβεβλημένος → 2sg **imperative of the passive aorist**; ἀφανίζειν → **future infinitive**; φησιν → same person/number **optative present**; περιοικοῦσι → same person/number **imperfect indicative**. |

September resits (Επαναληπτικές) and homogeneous candidates (Ομογενών):

| Session | Γ3 content |
|---|---|
| Sept 2021 resit | (α, 6) the aorist verb forms of a quoted sentence → present; (β, 4) declinables → other number. |
| Sept 2021 homog. | Matching Στήλη Α/Β: 5 verb forms identified (λέγουσι = 3pl pres ind; τιμῶντες = ptc pres; πείθειν = inf pres; ποιήσειν = inf fut; γενήσονται = 3pl fut ind) + 5 nouns/pronouns → other number. |
| Sept 2022 resit | (α, 6) verbs → future + the adjective in its other degrees; (β, 4) declinables → other number. |
| Sept 2022 homog. | Nouns → other number + matching (ἐλέγομεν, τυγχάνοι, εἰπεῖν, μαχόμενοι, γέγονεν → 1pl impf, 3sg opt pres, inf aor β', ptc pres, 3sg perfect). |
| Sept 2023 resit | πρῶτον → other two degrees (2); rewrite a passage with all declinables in the plural (8). |
| Sept 2023 homog. | other number + matching (μεθύων, ποιεῖν, τὴν οἰκίαν, ἐξῆλθον = 1sg aor β', παῖδας). |
| Sept 2024 resit | Ten forms: ᾠήθην → infinitive; τολμῆσαι → 3pl opt pres; αἰσχράν → comparative; ῥᾳδίως → superlative; ἐξευρεῖν → 2sg imp; περιιδεῖν → 2pl fut ind; τῶν ὄντων → dat pl; οἴσω → 3sg perfect; μνᾶς → nom pl; τοιαῦτα → gen pl fem. |
| Sept 2024 homog. | Ten-item matching (ἄνδρες = voc pl of 3rd decl noun, ἐμέ = acc sg 1st-person personal pronoun, οὗτος = nom sg masc demonstrative, οἱ πονηρότατοι = nom pl masc superlative of a 2nd-decl adjective…). |
| Sept 2025 resit | (α, 5) every nominal form of "ἵνα αὐτοῖς ᾖ … πέπρακται" → same case, other number; (β, 5) παραδιδόασιν → same form in aorist β'; ἐξελάσαντες → 3sg future ind; σῶσαι → passive aorist infinitive; **πέπρακται → 2sg imperative perfect same voice**; διαλαβόντες → 2sg imp aor β'. |
| Sept 2025 homog. | Matching (λόγοις dat pl 2nd decl; γραψάμενοι nom pl masc aorist ptc; σημαίνειν; ἔπεισαν = 3pl aor ind act; τούτων gen pl neut demonstrative). |

Old format (2008-2018, read from `research/pastpapers-raw/old/` and the 2015-2018 PDFs): translation was Γ1 (20 pts) and **Γ2 (10 pts) was always the same drill: ~10 words of the unseen text, each with its own one-line instruction "Να γράψετε τον τύπο που ζητείται"**. Examples (verbatim instructions):
- 2010: πλείω → dat pl masc **positive**; γήρως → dat sg; δυσμαθέστερον → acc sg fem positive; ἐμὲ → gen pl 2nd person; ὁρᾶν → 3sg imperfect; ἀποβαίνειν → 2sg **imp aor β'**; γίγνεσθαι → 1pl **opt aor β'**; αἰσθανόμενον → 3pl perfect ind; ἀδικεῖν → aorist infinitive.
- 2011: κρείττονος → acc pl fem same degree; ὅ τι → gen sg; ἔφη → 3sg opt pres; φέρειν → inf aor β'; εἰσίτω → 2sg same mood and tense; δόξειε → 3sg ind of the same tense.
- 2012: ἀγών → acc pl; ναυσίν → voc sg; πρώτοις → comparative; σφαλέντες → dat pl; κρατήσωμεν → 2sg imp pres; πάσχειν → 3sg fut; ἔχουσιν → 1sg opt aor β'; μνήσθητε → 3pl of the same tense.
- 2013: τινων → acc sg fem; ὄντι → dat pl; ἐπῃτιῶντο → 2sg imp pres; ὑπολαμβάνοντες → dat pl of the **aorist passive participle**; ἐξελάσειαν → 3pl opt **future**; εἴη → 3sg future; ἐπράχθη → 3sg **imperative perfect**.
- 2014: ὑμᾶς → acc sg 3rd person; πόρρω → superlative; ἀγαθῶν → the adverb; αὑτὰς → gen pl 2nd person; ἡγεμόνα → dat pl; οἶμαι → 3sg imperfect; ὑπέλαβον → **perfect passive infinitive**; ἔγνωσαν → 3sg opt; καταστᾶσαν → 2sg imp.
- 2015: ἦν → 3sg future; ἐλαχίστην → dat pl comparative fem; προσσχόντες → 1pl subj; ἐπιπλέοντες → 2pl imp; κατεστρέφοντο → 3sg imp perfect; μάλιστα → positive; διαρκῆ → voc sg masc; οὐδείς → gen sg fem; ἐξῇσαν → inf aorist β'.
- 2016: ἔφην → 2pl imp pres; κτησάμενος → 2sg imperfect; τις → gen pl fem; εὐδαίμων → voc sg fem; ᾤμην → 3sg aorist passive; φανήσεσθαι → **3sg imperative perfect**; πάλαι → comparative; τυγχάνει → 3pl opt aor β'; οὖσα → dat pl future.
- 2017: ἀναγιγνώσκῃ → 2sg imp aor β'; ἀπαριθμῶν → 3pl opt pres; τοῖς ἀκούουσιν → future infinitive; μάλιστ᾽ → positive; φαίνεσθαι → 2pl subj aor β' passive; plus a sentence to the other number.
- 2018: ἀφωρισμένης → 3sg aor pass ind; ὑπέχειν → 2sg imp aor β'; πολλῶν → dat pl fem superlative; δρῶσιν → gen pl masc present participle; plus a sentence to the other number.
(2008-2009 had 5 verb items + 5 nominal items in two sub-questions, e.g. 2008: εἴρηκα → 2pl ind aor β'; ἐξευρεῖν → inf pres; καταψηφίσασθε → 3pl fut; παραλελειμμένα → 3sg of the same tense; μεγάλη → acc pl superlative; πόλει → voc sg.)
**Conclusion: the grammar question has been the same 10-form drill for 18 years; 2019-2022 briefly switched to "put the whole phrase in the other number/other tense", and 2023-2026 returned to the 10-form list.** A pool of ~2,000 exam-style items auto-generated from the unseen-style prose lemmas can cover it; the app does not need to invent a new question type, only to cover all the instruction templates in §1.6.

### 1.3 What the Εγχειρίδιο's 21 units contain (S2; unit titles read)
1 Συμπληρωματικά για το κατηγορούμενο (κατηγορηματική / επιρρηματική / προληπτικό) · 2 Αντικείμενο: άμεσο/έμμεσο, κατηγορούμενο του αντικειμένου, σύστοιχο · **3 Φωνηεντόληκτα ουσιαστικά γ' κλίσης (μονόθεμα)** · **4 (διπλόθεμα)** · **5 Υγρόληκτα ουσιαστικά γ' κλίσης** · **6 Επίθετα της γ' κλίσης; η κλίση της μετοχής του παθητικού αορίστου** · 7 Δευτερεύουσες προτάσεις · 8-10 Υποθετικοί λόγοι (πραγματικός/αντίθετο/προσδοκώμενο/αόριστη επανάληψη) · **11 Ρήματα υγρόληκτα και ενρινόληκτα (ενεστώτας, παρατατικός, μέλλοντας)** · **12 Οι άλλοι χρόνοι των υγρολήκτων και ενρινολήκτων** · **13 Αντωνυμίες: κτητικές και αλληλοπαθητικές** · **14 Φωνηεντόληκτα ρήματα σε -μι** · 15 Πλάγιος λόγος · **16 Άλλα ρήματα β' συζυγίας (εἰμί, φημί, οἶδα, δέδοικα)** · **17 Αόριστοι β' βαρυτόνων ρημάτων που κλίνονται κατά τα ρήματα σε -μι (ἔβην, ἔγνων, ἔδυν…)** · **18 Αριθμητικά** · **19 Συνηρημένα ουσιαστικά α' και β' κλίσης** · **20 Συνηρημένα επίθετα β' κλίσης** · **21 Αττικόκλιτα δευτερόκλιτα ονόματα**.
So the book that the ministry makes examinable is **half morphology** (units 3-6, 11-14, 16-21), and the morphology chosen is exactly the "irregular and harder" part of S1.

### 1.4 What is examined, tallied
**Long baseline (11 papers 2008-2018, form-list era; count of papers whose morphology question asks for the category as a TARGET; scripted keyword count on the instruction text, then checked by eye):** optative **9/11**, infinitive **9/11**, imperative **8/11**, future **8/11**, aorist β' **6/11**, perfect (incl. perfect imperative/infinitive) **6/11**, vocative singular **5/11**, subjunctive 3/11, imperfect 3/11, participle as target 2/11; superlative/comparative/positive-of-a-degree in **10/11**. Singular/plural change and case change in every paper.
**Recent baseline (13 papers: 8 June mains 2019-2026 + 5 Sept resits 2021-2025; counted by hand):**
- **Nominal inflection (number/case/gender change)**: **13 of 13 papers**. "Move declinables to the other number" appears (as a whole-phrase instruction, or as a single item like 2023 ὅστις) in 9 of 13: 2019, 2021, 2022, 2023, 2026; Sept 2021, 2022, 2023, 2025.
- **Comparison (adjectives AND adverbs)**: 9 of 13 (2020 adv.; 2021; 2022; 2023 ×2; 2024 ×2; 2025 μεγάλας; Sept 2022; Sept 2023 adv.; Sept 2024 ×2). Adverb comparison alone: 2020, 2023 (πάλαι), Sept 2023, 2024 (ῥᾳδίως), Sept 2024.
- **Imperative (2nd sg) of some tense/voice**: 7 of 13 (June 2021, 2022, 2023, 2025, 2026; Sept 2024; Sept 2025). Targets seen: present, aorist α' act/mid, **aorist β' act (σχές, ἔξευρε, διάλαβε)**, **passive aorist (φάνηθι, διαβλήθητι)**, **perfect (πέπραξο)**, and the "irregular root" γνῶθι/ζῆθι.
- **Future (indicative, infinitive, participle)**: 6 of 13 (2023, 2025, 2026, Sept 2022, Sept 2024, Sept 2025); contracted/Attic futures (ἀφανιεῖν, ἐξελᾷ) and middle futures (ὄψομαι: ἰδεῖν → ὀψομένη).
- **Infinitive as target**: 4 of 13. **Participle as target**: 2 of 13 (but a participle as INPUT is in almost every paper, and nominal change of participles counts as nominal inflection).
- **Perfect/pluperfect as target**: 3 of 13 (2024 ×4, Sept 2024, Sept 2025).
- **Aorist β' somewhere (input or target)**: 6 of 13 (2023, 2025, Sept 2021, Sept 2024, Sept 2025, 2019 aor. subj.).
- **Optative as target**: 2 of 13 (2026 φαίη; Sept 2024 τολμῷεν). **Subjunctive as target**: 2 of 13 (2019 aor. act; 2025 aor. β' ἀγάγωμεν).
- **Imperfect as target**: 3 (2020, 2025, 2026).
- **-μι and irregular verbs as INPUT**: 2023 ἐπιθυμεῖ…, 2025 Sept παραδιδόασιν, 2026 φησιν, 2021 ἔγνω/ζῆν/τεθνάναι, Sept 2024 οἴσω/περιιδεῖν/τῶν ὄντων, 2025 ἰδεῖν/ἄξω, 2022 homog. γέγονεν/εἰπεῖν. Since the passage is a random Attic prose text, the irregular verbs that appear are the **very common ones** (εἰμί, ἔχω, ἄγω, φέρω, ὁράω, λέγω, δίδωμι, φημί, γίγνομαι, οἶδα, βαίνω, αἱρέω, ἔρχομαι) plus **compounds** (ἐκλείπω, εἰσέρχομαι, διαλαμβάνω, περιοράω, ἐξευρίσκω, ἐπισκοπέω, περιοικέω, διαβάλλω, ἐπιμελέομαι, καταβαίνω).
- **Matching tasks (Στήλη Α / Στήλη Β)** are used only in the Ομογενών sessions (2021-2025 every year), not in June.
Pattern change worth building the app around: since **2023 the question is a list of 9-10 explicit single forms, each with its own one-line instruction**, instead of "put the whole phrase in the plural". The whole-phrase transformation keeps coming back in resits.

### 1.5 Answer keys are not fully reliable: slips and doubtful points I found
- 2023 Διακρότημα key prints "ἀγεννοῡς" and "σχὲς / ῥᾴδιον / ῥᾷον": fine in content (σχές is right: S1 §314, 1 prints σχές for the simple imperative; the compound would be παράσχες). ✔.
- 2024 key (ΟΕΦΕ): ἰδίαν → "ἰδιωτέραν / ἰδιαιτέραν" ✔ (S1 §195δ lists both ἰδιαίτερος and ἰδιώτερος); "κατῆχεν / καταγήοχεν" for the perfect of κατῆγεν: the ordinary form is **κατῆχε(ν)** (ἦχα, S1 §Παράρτημα ἄγω); καταγήοχα is Hellenistic (S1: μτγν.). Accept both; teach κατῆχα first.
- 2025 Poukamisas key: "ἰδεῖν → ὀψομένη" ✔; "ἄξω → ἀγάγωμεν" ✔ (accent!); "οὐδενός → οὐδεμιᾷ" ✔; "φανῆναι → φάνηθι" ✔ (aor. β' passive keeps -ηθι, S1 §315).
- 2021 key: "ζῆν → Ζῆ (Ζῆθι)" prints both. S1 §325 gives the present of ζῶ following -άω with η, so the present imperative 2sg by S1's own logic is **ζῆ** (ζῆε → ζῆ); ζῆθι is the form the key adds. UNSURE which the committee prefers; accept both.
- 2021 key: "τεθνάναι → τεθνηκὼς/τεθνεὼς ἴσθι": consistent with S1 §287 (perfect active imperative is almost always periphrastic: λελυκὼς ἴσθι).
- General lesson for the app: **never trust a key blindly; generate every answer from rules and a hand-checked lemma table, and let a human tick the irregular ones.** Hence the test vectors in §9.

---

### 1.6 The instruction templates (the exact Greek phrasings the app must reproduce; "σχηματίζεται" = what the student must do)
Verbs (always relative to the form printed in the passage):
- «το β΄ ενικό πρόσωπο της προστακτικής του ίδιου χρόνου στην ίδια φωνή» (imperative, same tense and voice)
- «το β΄ ενικό της προστακτικής αορίστου β΄ στην ίδια φωνή» / «… του παρακειμένου στην ίδια φωνή»
- «το γ΄ πληθυντικό πρόσωπο της ευκτικής του ενεστώτα / του μέλλοντα / του αορίστου β΄ στην ίδια φωνή»
- «το α΄ πληθυντικό της υποτακτικής αορίστου β΄ στην ίδια φωνή»
- «το γ΄ ενικό της οριστικής μέλλοντα / παρακειμένου / παρατατικού στην ίδια φωνή»
- «το απαρέμφατο του ίδιου χρόνου στην ίδια φωνή» / «… του μέλλοντα» / «… του αορίστου β΄» / «το απαρέμφατο παθητικού αορίστου»
- «τη μετοχή του αρσενικού γένους στη γενική πληθυντικού στον ίδιο χρόνο και στην ίδια φωνή»
- «τον ίδιο τύπο στον μέλλοντα» (same person/number/mood, future) · «να μεταφέρετε τα ρήματα στον παρακείμενο στον ίδιο τύπο στον οποίο βρίσκονται»
- «ο ίδιος τύπος στον αόριστο β΄ στην ίδια φωνή»
Nominals:
- «τη δοτική πληθυντικού» · «την κλητική ενικού» · «τον ίδιο τύπο στη δοτική πληθυντικού» · «τη γενική του ενικού στο ίδιο γένος»
- «τον ίδιο τύπο στον συγκριτικό / στον υπερθετικό βαθμό» · «τον θετικό βαθμό» · «τους άλλους δύο βαθμούς του επιρρήματος»
- «τον ίδιο τύπο στο αρσενικό» (for a participle/adjective) · «την αιτιατική πληθυντικού θηλυκού γένους στο β΄ πρόσωπο» (reflexive) · «τον ίδιο τύπο στον άλλο αριθμό»
Sentence level: «να μεταφέρετε τους κλιτούς τύπους στον αντίθετο / άλλο αριθμό» · «να εντοπίσετε τα τριτόκλιτα ουσιαστικά και να τα γράψετε στη γενική ενικού» · «να εντοπίσετε τους ονοματικούς τύπους … στην ίδια πτώση του άλλου αριθμού».
Matching (homogeneous sessions): «Να γράψετε τον αριθμό που αντιστοιχεί σε κάθε τύπο της Στήλης Α και δίπλα το γράμμα της Στήλης Β που αντιστοιχεί στην ορθή γραμματική του αναγνώριση» (answers like "γ΄ πληθυντικό πρόσωπο οριστικής μέλλοντα", "αιτιατική ενικού θηλυκού ουσιαστικού α΄ κλίσης", "ονομαστική πληθυντικού αρσενικού υπερθετικού βαθμού επιθέτου β΄ κλίσης").
The app's lesson prompts should use these phrasings word for word (Carpe did the same with the Latin papers).

---

## 2. Who teaches what: Gymnasium → Εγχειρίδιο → Οικονόμου, and the three "layers"

### 2.1 What the Gymnasium actually teaches (ΙΕΠ 2025-26 guidance, morphology only; ✅ = to be taught, ❌ = cut that year)
- **Α΄ Γυμνασίου** (book Μπεζαντάκος κ.ά.): article, 2nd declension nouns, 1st declension nouns, 2nd-class adjectives -ος -η -ον, personal pronouns, **οὗτος αὕτη τοῦτο**; present and future indicative active of barytone verbs + present of εἰμί, future of stop-stem verbs; **augment, imperfect and aorist indicative active, imperfect of εἰμί**; **reduplication, perfect/pluperfect indicative active**; formation of infinitives and of participles of the indicative active; and (unit 12, carried to Β΄) 3rd-declension vowel stems -ις/-εως, -εύς/-έως and -ων/-οντος.
- **Β΄ Γυμνασίου**: **3rd declension** (vowel stems, stops, nasal/liquid/sigma stems, neuter -μα/-ατος, -ας/-αντος, -ων/-οντος); **middle voice** (present, imperfect, future, infinitive, participle; middle aorist, perfect, pluperfect indicative; future of εἰμί); **3rd-declension adjectives** (-ύς -εῖα -ύ; -ης -ες; -ων -ον); interrogative τίς and indefinite τις; relative ὅς and **ὅστις (ὅ τι vs ὅτι)**; **subjunctive** (present, aorist, perfect; active and middle; εἰμί); **imperative** (present, aorist, perfect; active and middle; imperative of εἰμί); πολύς and μέγας; ✅ also the participle's syntax.
- **Γ΄ Γυμνασίου**: **comparison of adjectives and adverbs** (emphasis on regular forms; irregular ones only for recognition: ἄριστος, ἐλάχιστος, πλέον, μάλιστα…); contract verbs (the **"β΄ τάξη συνηρημένων ρημάτων" (book pp. 34-37) is ❌ not taught** in 2025-26; the other class is implied taught: UNSURE which is which); **optative** (present, future, aorist of active and middle barytone verbs, εἰμί, perfect active; recognition exercises, not production); **aorist β΄**; **ἡ γυνή, ὁ παῖς**; the definitive-intensive pronoun αὐτός ("η οριστική – επαναληπτική αντωνυμία"); **passive tenses of vowel and stop verbs (passive aorist α΄)**; **❌ "Οι αυτοπαθητικές αντωνυμίες δεν θα διδαχθούν."**
- Lyceum: the Εγχειρίδιο (§1.3) adds what the Gymnasium doesn't: 3rd-decl vowel and liquid stems in depth, participle of the passive aorist, liquid/nasal verbs, **all the -μι verbs**, root aorists, numerals, contract nouns/adjectives, Attic 2nd decl., possessive and reciprocal pronouns. The Λύκειο textbook «Φιλοσοφικός Λόγος» teaches **no grammar**.
- **Consequences that matter for the app:** (1) even the Gymnasium guidance says optative, comparison, aorist β΄ and the irregular comparatives are taught for **recognition rather than production**, yet the exam asks for production (2026 φαίη; 2025 μειζόνων); (2) the guidance **cuts** the reflexive pronouns and the β΄ class of contract verbs, yet the papers examine them (2024 ἑαυτοῦ → ὑμᾶς αὐτάς; 2026 περιοικοῦσι → περιῴκουν); (3) **contract verbs and reflexive pronouns are the likely "gap" for any student whose school followed the cuts: teach them fully in the app.**

### 2.2 The school grammar's own order (S1 table of contents) and the three "layers"

S1 is organised: 1st part (Phonology: letters, accent, vowel/consonant changes ch.1-4) → 2nd part **Τυπολογικό** (ch.5 parts of speech … ch.31 uninflected) → 3rd part Ετυμολογικό (word formation). Morphology chapters: 6 article, 7-11 nouns (ch.8 1st decl., ch.9 2nd decl., ch.10 3rd decl., ch.11 anomalous nouns), 12-16 adjectives (ch.13 2nd decl., ch.14 3rd decl., ch.15 anomalous, ch.16 participles), 17 comparison, 18 numerals, 19 pronouns, 20 the verb (voices, tenses, augment 4-5, εἰμί), 21 vowel-stem verbs, 22 non-contract vowel verbs, 23 consonant verbs (stops), 24 liquid/nasal, 25 **second tenses**, 26 contract verbs, 27 -μι verbs, 28 aorists β' of barytones like -μι, 29 other -μι verbs, 30 **anomalous, deponent and impersonal verbs**, 31 uninflected parts.

For teaching the app I would group the whole into three layers (matches how the exam probes):
1. **Layer 1 "Παράδειγμα και κανόνας"**: regular systems (article, 1st/2nd decl., regular -ω verbs, contract verbs, regular comparison, regular participles). Mostly Gymnasium level.
2. **Layer 2 "Εξαιρέσεις"**: 3rd declension, irregular comparison, second tenses (aorist β', second perfect, second passive), liquid/nasal verbs, -μι verbs, root aorists. Εγχειρίδιο units 3-6, 11-17.
3. **Layer 3 "Ο μηχανισμός"**: augment and reduplication with prepositions, accent rules for verb forms (imperatives of aorist β', infinitive/participle accent), principal parts of ~100 common verbs. The exam does not ask for these directly, but **each Γ3 form needs them** (περιοικοῦσι → περιῴκουν; ἐπισκοπεῖν → ἐπεσκόπει; ἐξευρεῖν → ἔξευρε).


---

## 3. Nouns (S1 ch.6-11; Εγχειρίδιο units 3, 4, 5, 19, 21)

Nominal forms asked in the 2019-2026 papers (inputs and targets, so you know the lemma pool): γυναῖκας, φύσει, σῶμα, καθαρότητι, πλῆθος, ἐλπίδων, ἄστυ, ἀγεννής, ὅστις, τις, προσόδους, πολίταις, μνᾶς, ἄνδρες, δικασταί, παῖδας, οἰκίαν, ἡγεμόνα, ἀγών, ναυσίν, ὕβρει, ὄντι/ὄντων, ἔρημος, σοφός/-ή (adjectives), οὐδείς, πλείω. **3rd-declension forms are the single biggest block (2019 α, 2023 ἄστυ, 2024 πλῆθος/ἐλπίδων, 2025 α entire sub-question "find the 3rd-decl. nouns → gen sg")** [A].

### 3.1 The article [A] (S1 ch.6)
ὁ ἡ τό · τοῦ τῆς τοῦ · τῷ τῇ τῷ · τόν τήν τό · pl οἱ αἱ τά · τῶν τῶν τῶν · τοῖς ταῖς τοῖς · τούς τάς τά · dual τώ τά τώ / τοῖν. No vocative. Traps: nom pl masc/fem **οἱ αἱ** carry no accent (proclitic), but τά (neuter) does; ἡ/ἥ, ὁ/ὅ, οἱ/οἷ, αἱ/αἵ (article vs relative: breathing + accent distinguish). Exam relevance: an answer must carry the article only when the instruction speaks of "τὸ ἄστυ" (2023: "τὸ ἄστυ: την ονομαστική πληθυντικού" → **τὰ ἄστη**).

### 3.2 First declension [A] (S1 ch.8)
- Feminine, pure α: ἡμέρα · ἡμέρας · ἡμέρᾳ · ἡμέραν · ὦ ἡμέρα | pl ἡμέραι · ἡμερῶν · ἡμέραις · ἡμέρας. (α is pure after ε, ι, ρ: χώρα, σοφία, οἰκία, ἡμέρα.)
- Feminine, impure α: θάλαττα · θαλάττης · θαλάττῃ · θάλατταν · ὦ θάλαττα (also μοῦσα, γλῶσσα, τράπεζα, δόξα, μέλιττα). Exam shows θάλαττα/θάλασσα variants (Thucydides prints σσ); accept both.
- Feminine in -η: τιμή · τιμῆς · τιμῇ · τιμήν · ὦ τιμή.
- Masculine in -ας / -ης: νεανίας · νεανίου · νεανίᾳ · νεανίαν · ὦ νεανία | πολίτης · πολίτου · πολίτῃ · πολίτην · **ὦ πολῖτα** | pl πολῖται · πολιτῶν · πολίταις · πολίτας. (2020 asked exactly πολίταις → voc sg.)
- Contracted: μνᾶ (from μνάα) · μνᾶς · μνᾷ · μνᾶν · ὦ μνᾶ | pl **μναῖ** · μνῶν · μναῖς · μνᾶς (2024 resit: μνᾶς → nom pl); Ἑρμῆς (Ἑρμέας) · Ἑρμοῦ · Ἑρμῇ · Ἑρμῆν · ὦ Ἑρμῆ; Βορρᾶς · Βορρᾶ · Βορρᾷ · Βορρᾶν · ὦ Βορρᾶ; συκῆ (συκέα) · συκῆς · συκῇ · συκῆν. [B]
- Traps (1-8), all derived from S1 rules and from what the committee likes:
  1. Masculine gen sg is **-ου** (πολίτου), not -ης; nom pl **-αι**. Students write πολίτης/πολίτης for gen.
  2. Masculine voc sg ends in short **-α** for -της nouns (πολῖτα, κριτά, προφῆτα) and -ᾱ for -ας (νεανία), but **Ἑρμῆ** (contract) and names in -ης (-εύς go to 3rd).
  3. **Gen pl is always -ῶν with circumflex**, e.g. ἡμερῶν, πολιτῶν, θαλαττῶν. (Feminine gen pl of *adjectives/participles* follows the masculine accent, see §4.)
  4. Dat sg needs the **iota subscript**: ἡμέρᾳ, τιμῇ, πολίτῃ; the answer checker must NOT ignore η vs ει or α vs αι (only the subscript mark is ignorable).
  5. Pure vs impure α decides gen/dat sg (-ᾱς/-ᾳ vs -ης/-ῃ); S1 pure α: after ε, ι, ρ.
  6. Accent is persistent: if the nom is paroxytone, long ultima in gen turns it: χώρα → χώρας, but ἡ γνώμη → γνώμης; oxytone nouns get circumflex in gen/dat: τιμή → τιμῆς, τιμῇ.
  7. Acc pl of the masculine: πολίτας (-ας short), acc pl of feminine: ἡμέρας.
  8. Foreign/short names (Ἀλεξᾶς -ᾶ -ᾷ -ᾶν) are "ιδιόκλιτα" (S1 §151): rare.

### 3.3 Second declension [A] (S1 ch.9; Εγχειρίδιο units 19, 21)
- λόγος · λόγου · λόγῳ · λόγον · ὦ λόγε | οἱ λόγοι · λόγων · λόγοις · λόγους. Neuter: δῶρον · δώρου · δώρῳ · δῶρον | pl δῶρα · δώρων · δώροις · δῶρα (nom/acc/voc equal; neuter plural subject takes singular verb is syntax). Feminines in -ος: ἡ ὁδός, ἡ νῆσος, ἡ νόσος, ἡ ψῆφος, ἡ ἄμπελος, ἡ ἔρημος, ἡ βίβλος, ἡ κέλευθος. [A]
- Contracted [B, unit 19]: ὁ νοῦς (νόος) · νοῦ · νῷ · νοῦν · ὦ νοῦ | οἱ νοῖ · νῶν · νοῖς · νοῦς; τὸ ὀστοῦν (ὀστέον) · ὀστοῦ · ὀστῷ · ὀστοῦν | pl ὀστᾶ · ὀστῶν · ὀστοῖς · ὀστᾶ; ὁ περίπλους (περίπλοος) same as νοῦς but acc περίπλουν. The dative "ῷ" is spelled with subscript.
- Attic second declension [B, unit 21]: ὁ νεώς (temple) · νεώ · νεῴ · νεών · ὦ νεώς | pl οἱ νεῴ · νεῶν · τοῖς νεῴς · τοὺς νεώς; ὁ λεώς, ὁ λαγώς (hare), ὁ Μενέλεως (Μενέλεω · Μενέλεῳ · Μενέλεων · ὦ Μενέλεως), τὸ ἀνώγεων. Rule: **ω replaces ο/ου; accent stays where the Ionic form had it (gen sg ending ω keeps the accent on the same syllable as nom: νεώς → νεώ)**. Unit 21 sentences: "Ἔστι κατὰ τὴν ὁδὸν τὴν ἐς Ἀθήνας ἐκ Φαληροῦ νεὼς Ἥρας" and "Ὁ δῆμος ὑπόχρεως τῶν πλουσίων ἦν".
- Traps: voc of -ος nouns is -ε, **but ὦ θεός** (and ὦ ἄδελφε regular); gen pl accent: λόγων but ὁδῶν (circumflex on ultima for oxytones); dat pl -οις; **neuter plural -α is short**, so ὄνομα/πρᾶγμα (3rd decl.) look like it: the checker must keep ὀνόματα vs ὄνομα.

### 3.4 Third declension [A]: the hard 40 % of the grammar question (S1 ch.10-11; Εγχειρίδιο units 3, 4, 5)
S1's classes (the exam's own terms): **αφωνόληκτα** (guttural/labial: φύλαξ; dental: ἐλπίς, παῖς, σῶμα; -ντ: γίγας, ὀδούς, γέρων), **ημιφωνόληκτα**: **ενρινόληκτα** (-ων/-ήν: ἡγεμών, ἀγών, ποιμήν, Ἕλλην) and **υγρόληκτα** (-ηρ/-ωρ: πατήρ, ῥήτωρ, ἀστήρ) and **σιγμόληκτα** (-ος: γένος; -ης: Σωκράτης, ἀληθής; Περικλῆς), and **φωνηεντόληκτα** (-ις: πόλις; -υς: πῆχυς; -υ: ἄστυ; -εύς: βασιλεύς; -οῦς: βοῦς; -αῦς: γραῦς, ναῦς anomalous). Terminology for the answer: "γεν. ενικού" etc.

**General endings (S1 §141):** masc/fem nom -ς/–, gen -ος (ή -ως), dat -ι, acc -α/-ν; pl -ες, -ων, -σι(ν), -ας (-ς); neuter nom/acc/voc pl **-ᾰ** (short). The stem is found from the **genitive** (gen sg minus -ος). Voc sg usually = nom (ὦ φύλαξ) but see exceptions.

**3.4.1 Stops and -ντ-:**
| Lemma | Gen sg | Dat sg | Acc sg | Voc sg | Nom pl | Gen pl | Dat pl | Acc pl |
|---|---|---|---|---|---|---|---|---|
| ὁ φύλαξ | φύλακος | φύλακι | φύλακα | φύλαξ | φύλακες | φυλάκων | φύλαξι(ν) | φύλακας |
| ἡ ἐλπίς (oxytone) | ἐλπίδος | ἐλπίδι | ἐλπίδα | ἐλπίς | ἐλπίδες | **ἐλπίδων** | ἐλπίσι(ν) | ἐλπίδας |
| ἡ χάρις (barytone) | χάριτος | χάριτι | **χάριν** | ὦ χάρι | χάριτες | χαρίτων | χάρισι(ν) | χάριτας |
| ὁ/ἡ ὄρνις | ὄρνιθος | ὄρνιθι | ὄρνιν | ὦ ὄρνι | ὄρνιθες | ὀρνίθων | ὄρνισι(ν) | ὄρνιθας |
| ὁ/ἡ παῖς | παιδός | παιδί | παῖδα | ὦ παῖ | παῖδες | **παίδων** | παισί(ν) | παῖδας |
| τὸ σῶμα | σώματος | σώματι | σῶμα | σῶμα | σώματα | σωμάτων | **σώμασι(ν)** | σώματα |
| τὸ πρᾶγμα | πράγματος | πράγματι | πρᾶγμα | | πράγματα | πραγμάτων | πράγμασι(ν) | πράγματα |
| ὁ γίγας | γίγαντος | γίγαντι | γίγαντα | ὦ γίγαν | γίγαντες | γιγάντων | **γίγασι(ν)** | γίγαντας |
| ὁ ὀδούς | ὀδόντος | ὀδόντι | ὀδόντα | ὀδούς | ὀδόντες | ὀδόντων | **ὀδοῦσι(ν)** | ὀδόντας |
| ὁ γέρων | γέροντος | γέροντι | γέροντα | ὦ γέρον | γέροντες | γερόντων | **γέρουσι(ν)** | γέροντας |
| τὸ ὕδωρ | ὕδατος | ὕδατι | ὕδωρ | | ὕδατα | ὑδάτων | ὕδασι(ν) | ὕδατα |
S1 rules to teach with these (§123): 1) stop stems drop the stop before -σι (ἐλπίσι, παισί, σώμασι); -ντ- stems drop ντ and lengthen (γίγασι, ὀδοῦσι, γέρουσι, ἄρχουσι, λέουσι); 2) **barytone dental stems in -ις have acc sg in -ν and voc = stem without the dental** (χάριν, ὦ χάρι, ὄρνιν) while oxytone ones have -α (ἐλπίδα, πατρίδα, ἀσπίδα); 3) barytone -ων (-οντος) / -ας (-αντος) and οξύτονο τυραννίς and ὁ/ἡ παῖς form the voc without ending: ὦ γέρον, ὦ γίγαν, ὦ παῖ.
Traps (exam-proven): ἐλπίδων → dat sg ἐλπίδι (2024); σῶμα → gen sg σώματος and dat pl σώμασι (2025 ×); **neuter nouns in -μα and -ος have nom = acc = voc**; the accent of the plural **σώματα** (not σῶματα); **monosyllables put the accent on the ending in gen/dat of all numbers (φλογός, φλογί, φλογῶν, φλοξί) except παῖς, δᾴς, θώς, οὖς, Τρώς, φῶς in the gen pl: παίδων, ὤτων, φώτων** (S1 §145).

**3.4.2 Nasal and liquid stems (υγρόληκτα, ενρινόληκτα) [A, Εγχειρίδιο unit 5]:**
- ὁ ἀγών · ἀγῶνος · ἀγῶνι · ἀγῶνα · ὦ ἀγών | pl ἀγῶνες · ἀγώνων · ἀγῶσι(ν) · ἀγῶνας (2012 asked ἀγών → acc pl). Dative plural loses ν: ἀγῶσι; φρήν → φρεσί (stem φρεν-, exception: ν drops without lengthening); μήν; ποιμήν · ποιμένος · … · ὦ ποιμήν; Ἕλλην · Ἕλληνος · … · pl Ἕλληνες · Ἑλλήνων · Ἕλλησι(ν) · Ἕλληνας.
- ὁ ἡγεμών · ἡγεμόνος · ἡγεμόνι · ἡγεμόνα · **ὦ ἡγεμών** (oxytone → voc = nom) | pl ἡγεμόνες · ἡγεμόνων · ἡγεμόσι(ν) · ἡγεμόνας. (2014 asked ἡγεμόνα → dat pl: **ἡγεμόσι(ν)**.)
- ὁ πατήρ · πατρός · πατρί · πατέρα · **ὦ πάτερ** | πατέρες · πατέρων · **πατράσι(ν)** · πατέρας; ἡ μήτηρ (μητρός, μητέρα, μητράσι, ὦ μῆτερ), ἡ θυγάτηρ (θυγατρός, θυγατέρα, θυγατράσι), ὁ ἀνήρ · **ἀνδρός · ἀνδρί · ἄνδρα · ὦ ἄνερ** | ἄνδρες · ἀνδρῶν · **ἀνδράσι(ν)** · ἄνδρας; ἡ γαστήρ (γαστρός, γαστέρα); ὁ ἀστήρ · ἀστέρος · ἀστέρι · ἀστέρα | ἀστέρες · ἀστέρων · **ἀστράσι(ν)**.
- ὁ ῥήτωρ · ῥήτορος · ῥήτορι · ῥήτορα · ὦ ῥῆτορ | ῥήτορες · ῥητόρων · ῥήτορσι(ν) · ῥήτορας; ὁ σωτήρ (σωτῆρος, ὦ σῶτερ); ὁ ἀήρ (ἀέρος); ἡ χείρ · χειρός · χειρί · χεῖρα | χεῖρες · χειρῶν · **χερσί(ν)** · χεῖρας; ὁ κύων (κυνός, ὦ κύον; dat pl κυσί(ν)).
- Traps: **πατήρ/ἀνήρ/μήτηρ/θυγάτηρ/γαστήρ drop ε in gen/dat sg and take -α- in dat pl; ἀνήρ takes δ (ἀνδρ-)**; acc sg πατέρα (not πατρα); voc **ὦ πάτερ/ὦ ἄνερ**; participle of εἰμί, ὤν, has gen ὄντος.

**3.4.3 Sigma stems (σιγμόληκτα) [A]:**
- τὸ γένος · γένους · γένει · γένος · γένος | pl γένη · γενῶν · γένεσι(ν) · γένη. (also τεῖχος, ἔτος, ἔθνος, ὄρος, μέρος, θάρσος, κράτος, ἔπος, μέγεθος, πλῆθος, βέλος, κάλλος, ἄλγος, αἶσχος.) **πλῆθος → dat pl πλήθεσι(ν)** (2024).
 Contraction origin: γένεσ-ος → γένε-ος → γένους (gen sg), γένεσ-ι → γένει (dat sg), γένεσ-α → γένη (nom/acc pl), γενέσ-ων → γενῶν (gen pl, circumflex!). 
- τὸ γῆρας · γήρως · γήρᾳ · γῆρας (only sg); τὸ κρέας · κρέως · κρέᾳ | pl κρέα · κρεῶν · κρέασι(ν); τὸ κέρας · κέρως or κέρατος · κέρᾳ or κέρατι (double: S1 §137).
- Masculine/fem -ης: ὁ Σωκράτης · Σωκράτους · Σωκράτει · Σωκράτη · **ὦ Σώκρατες** | Σωκράται (the plural of these masculine names is inflected like the 1st declension, S1 §133) · Σωκρατῶν · Σωκράταις · Σωκράτας; ὁ Περικλῆς · Περικλέους · Περικλεῖ · Περικλέα · **ὦ Περίκλεις**; ἡ τριήρης · τριήρους · τριήρει · τριήρη · ὦ τριῆρες | pl τριήρεις · τριήρων · τριήρεσι(ν) · τριήρεις; ἡ ἀλήθεια is 1st decl; ὁ/ἡ συγγενής · συγγενοῦς · συγγενεῖ · συγγενῆ (Εγχειρίδιο unit 6 for adjectives).
- Traps: **Σωκράτης is σ-stem (3rd) not 1st-decl: gen -ους, acc -η**; voc is ὦ Σώκρατες (accent retracts) but ὦ Περίκλεις; neuter -ος words have no distinct plural acc/nom; **the plural of a neuter σ-stem has circumflex gen pl (γενῶν) and acute elsewhere**; ὁ/ἡ τριήρης nom pl = acc pl (τριήρεις).
- Words in -ας (gen -ως/-ατος), -ως (αἰδώς/ἠώς: αἰδοῦς), -ους/-ων are [B].

**3.4.4 Vowel stems (φωνηεντόληκτα) [A]:**
- **-ις / -υ (stem -ι-, -υ-, with gen -εως):** ἡ πόλις · πόλεως · πόλει · πόλιν · ὦ πόλι | πόλεις · **πόλεων** · πόλεσι(ν) · πόλεις (S1 §112: gen sg -εως (quantity metathesis, accent unchanged — "πόλεως" keeps the accent on the antepenult despite the long ending), dat sg -ει (contracted), acc pl = nom pl). Same for πρᾶξις, δύναμις, ὕβρις (ὕβρει asked 2013 → acc sg ὕβριν), μάντις, ὁ πῆχυς (πήχεως), τὸ ἄστυ · **ἄστεως** · ἄστει · ἄστυ | pl **ἄστη** · ἄστεων · ἄστεσι(ν) · ἄστη (2023!). Neuter -υ: nom pl ἄστη (from ἄστεα), **gen pl ἄστεων** and gen sg ἄστεως (S1 §112, 2: these stems "τονίζονται στη γενική του ενικού και του πληθυντικού στην προπαραλήγουσα αντίθετα με τον κανόνα"; dual ἄστει, ἀστέοιν), dat pl ἄστεσι(ν). Like ἡ δύναμις (δυνάμεων), ὁ πέλεκυς (πελέκεων), ὁ πῆχυς.
- **-ευς:** ὁ βασιλεύς · **βασιλέως** · **βασιλεῖ** · βασιλέα · **ὦ βασιλεῦ** | **βασιλεῖς** · βασιλέων · **βασιλεῦσι(ν)** · βασιλέας (S1 §116: acc pl -ᾶς, later = nom pl βασιλεῖς). Like ἱερεύς, γραμματεύς, ἱππεύς, γονεύς, Ἀχιλλεύς. After a vowel (ἁλιεύς, Πειραιεύς) contraction gives gen sg ἁλιέως/ἁλιῶς, acc ἁλιέα/ἁλιᾶ.
- **βοῦς / γραῦς:** ὁ/ἡ βοῦς · βοός · βοΐ · βοῦν · ὦ βοῦ | βόες · βοῶν · βουσί(ν) · **βοῦς** (acc pl, **not βόας**: S1 §114). ἡ γραῦς · γραός · γραΐ · γραῦν · ὦ γραῦ | γρᾶες · γραῶν · γραυσί(ν) · γραῦς. Circumflex on the monosyllables βοῦς, βοῦν, βοῦ, **βοῦς (acc pl)** by S1 §144α.
- **ἡ ναῦς** (S1 §150, 11): ναῦς · **νεώς** · **νηΐ** · ναῦν · ὦ ναῦ | **νῆες** · **νεῶν** · **ναυσί(ν)** · ναῦς · ὦ νῆες (2012 asked ναυσίν → voc sg: **ὦ ναῦ**? S1 prints ὦ ναῦ for voc sg; accept "ναῦ").
- **ὁ Ζεύς** (S1 §150, 5): Ζεύς · **Διός** · **Διί** · **Δία** · **ὦ Ζεῦ**; ἡ γυνή · **γυναικός** · γυναικί · γυναῖκα · **ὦ γύναι** | γυναῖκες · γυναικῶν · **γυναιξί(ν)** · γυναῖκας (S1 §149, 3: "κατά την α΄ κλίση" in nom sg only). 2025 asked γυναῖκας → gen sg **γυναικός**.
- Other irregulars from S1 §150 [B, worth drilling because the Εγχειρίδιο/past papers can pick them]: τὸ οὖς · ὠτός · ὠτί · οὖς | ὦτα · ὤτων · **ὠσί(ν)** · ὦτα; τὸ ὕδωρ · ὕδατος; τὸ δόρυ · δόρατος; τὸ γόνυ · γόνατος; ὁ μάρτυς · μάρτυρος · μάρτυρα · ὦ μάρτυς · pl μάρτυρες · μαρτύρων · **μάρτυσι(ν)**; ἡ κλείς · κλειδός · κλεῖδα/κλεῖν · κλεισί(ν); ὁ Ἀπόλλων (Ἀπόλλωνος, Ἀπόλλωνα/Ἀπόλλω, ὦ Ἄπολλον), ὁ Ποσειδῶν (Ποσειδῶνος, ὦ Πόσειδον); ἡ χείρ; ὁ ἡ κύων; ὁ Ἄρης (Ἄρεως, Ἄρει, Ἄρη/Ἄρην, ὦ Ἄρες); ὁ Οἰδίπους; ὁ υἱός (2nd decl. and also υἱέος…); τὸ πῦρ (πυρός, pl πυρά - πυρῶν - πυροῖς 2nd decl.).
- Defective/odd (S1 §§147-153): ὁ λύχνος - τὰ λύχνα, ὁ σῖτος - τὰ σῖτα, ὁ δεσμός - οἱ δεσμοί/τὰ δεσμά, τὸ στάδιον - τὰ στάδια/οἱ στάδιοι; ἄκλιτα (τὸ χρεών, τὰ γράμματα ἄλφα βῆτα, τὸ λέγειν); ἐλλειπτικά: τὸ ὄφελος, τὸ ὄναρ, τὸ ὕπαρ only nom/acc/voc sg; ὦ μέλε; ὦ τᾶν.
- **Accent summary for 3rd decl. (S1 §§143-145):** (1) monosyllable nom/acc/voc of stems in ι/υ/ου/αυ get circumflex (κῖς, δρῦς, βοῦς, γραῦς, τὸ πῦρ, τὸ οὖς, ἡ γλαῦξ, voc -εῦ βασιλεῦ); (2) monosyllables in gen/dat of all numbers have the accent on the ending (φλογός, νυκτός, θηρός; **exceptions in gen pl παίδων, ὤτων, φώτων, δᾴδων, θώων, Τρώων**); (3) -ι and -α of 3rd-declension endings are short, hence σώματα, ἀγῶνα, ἔρωτα; (4) accent shifts of ν-stems: ἡγεμών → ἡγεμόνος (acute on the first syllable of stem), πατήρ → πατρός.

**3.4.5 What the exam does with 3rd-declension forms (so the app can generate it):** every example above is either "same case, other number" (2019 α, 2021-2022-2026 whole-phrase tasks, 2023 ὅστις, ἄστυ, 2025 Sept α) or a single target (gen sg, dat pl, dat sg, voc sg, acc pl, acc sg; **never the full paradigm**). Item generator = (lemma, input cell) → (output cell). To keep correctness: **hand-verify the stem table, generate the cells with rules, and mark 50 irregular lemmas for double entry.**

### 3.5 Gender cues and what the student must know (only for agreement) [C unless S1]
Masculine: -ας, -ης (1st), -ος (2nd; exceptions feminine listed above), -ων, -ηρ, -ωρ, -ευς, -ις/-ων when "of persons"; feminine: -α/-η (1st), -ις (gen -εως: πόλις), -ξ/-ψ in most (φλόξ, φλέψ; but ὁ φύλαξ, ὁ κῆρυξ), -ις/-υς (γλαῦξ ... ), -ων for -ών places: ἡ ἀηδών, ἡ εἰκών; neuter: -ον (2nd), -μα, -ος (σ-stems), -ας (κέρας), -υ, -αρ/-ωρ (ὕδωρ, ἧπαρ). In the exam the gender is given by the article or the form, so **the app should always print the article** (ὁ φύλαξ, ἡ ἐλπίς, τὸ σῶμα).

---

## 4. Adjectives and participles as nominals (S1 ch.12-16; Εγχειρίδιο units 6, 20)
- **Three classes (S1 §§155-157):** (1) τρικατάληκτα **-ος -η/-α -ον** (σοφός, σοφή, σοφόν; δίκαιος, δικαία, δίκαιον; ἐλεύθερος, ἐλευθέρα, ἐλεύθερον — **α after ε, ι, ρ**), also -ος -α -ον in the same rule; (2) δικατάληκτα **-ος -ον** (ἄφθονος, ἄφθονον; contracted ἀργυροῦς), **-ης -ες** (ἀληθής, ἀληθές), **-ων -ον** (σώφρων, σῶφρον), **-ις -ι** (εὔχαρις), -ους -ουν (εὔνους, εὔνουν); (3) τρικατάληκτα **-ύς -εῖα -ύ** (βαρύς, βαρεῖα, βαρύ), **-ων -ουσα -ον** (participles, ἑκών), **-ας -αινα -αν** (μέλας, μέλαινα, μέλαν), **-εις -εσσα -εν** (χαρίεις, χαρίεσσα, χαρίεν), -ᾱς -ᾶσα -αν (πᾶς), -ης/-ώς.
- Declension anchors [A]: 
  - σοφός · σοφοῦ · σοφῷ · σοφόν | σοφή · σοφῆς · σοφῇ · σοφήν | pl σοφοί · σοφῶν · σοφοῖς · σοφούς | σοφαί · **σοφῶν** · σοφαῖς · σοφάς. (Gen pl fem of an oxytone adjective is circumflex -ῶν: σοφῶν; of a paroxytone like ἄξιος: ἀξίων (no circumflex): follow the masc. accent.)
  - ἀληθής, ἀληθές · gen ἀληθοῦς · dat ἀληθεῖ · acc ἀληθῆ (m/f), ἀληθές (n) | pl ἀληθεῖς (m/f nom = acc), ἀληθῆ (n) · ἀληθῶν · ἀληθέσι(ν). εὐγενής, ἀσθενής, ἀσφαλής, σαφής, συγγενής (2023: **ἀγεννής → gen sg ἀγεννοῦς**).
  - σώφρων, σῶφρον · gen σώφρονος · dat σώφρονι · acc σώφρονα, σῶφρον · voc **ὦ σῶφρον** | pl σώφρονες, σώφρονα · σωφρόνων · σώφροσι(ν). Like εὐδαίμων, ἄφρων, μνήμων; **voc sg neuter/masc: ὦ εὔδαιμον**. 2016 asked εὐδαίμων → voc sg fem: ὦ εὔδαιμον.
  - εὔχαρις · εὔχαρι · gen εὐχάριτος · acc εὔχαριν; χαρίεις, χαρίεσσα, χαρίεν · gen χαρίεντος, χαριέσσης, χαρίεντος · dat pl χαρίεσι(ν), χαριέσσαις.
  - βαρύς, βαρεῖα, βαρύ · gen βαρέος, βαρείας, βαρέος · dat βαρεῖ, βαρείᾳ, βαρεῖ · acc βαρύν, βαρεῖαν, βαρύ | pl βαρεῖς, βαρεῖαι, βαρέα · βαρέων, **βαρειῶν**, βαρέων · βαρέσι(ν), βαρείαις, βαρέσι(ν) · βαρεῖς, βαρείας, βαρέα. Like ταχύς, ἡδύς, εὐρύς, γλυκύς, ὀξύς, βραδύς, βραχύς.
  - μέλας, μέλαινα, μέλαν · gen μέλανος, μελαίνης · acc μέλανα, μέλαιναν.
  - πᾶς, πᾶσα, πᾶν · **παντός, πάσης, παντός** · παντί, πάσῃ · πάντα, πᾶσαν, πᾶν | πάντες, πᾶσαι, πάντα · **πάντων, πασῶν**, πάντων · πᾶσι(ν), πάσαις, πᾶσι(ν) · πάντας, πάσας, πάντα. (Exam: πάντα → dat pl 2011 → πᾶσι.)
  - μέγας, μεγάλη, μέγα · gen μεγάλου, μεγάλης, μεγάλου · acc μέγαν, μεγάλην, **μέγα** · voc **μεγάλε**, only nom/acc sg masc/neut are irregular; plural regular (μεγάλοι…). πολύς, πολλή, πολύ · gen πολλοῦ, πολλῆς, πολλοῦ · dat πολλῷ, πολλῇ · acc πολύν, πολλήν, πολύ · pl πολλοί, πολλαί, πολλά (regular from the stem πολλ-) [A: 2024 πολλά → superlative πλεῖστα]. Others (S1 ch.15): πρᾶος (πρᾷος: πρᾶος, πραεῖα, πρᾶον), σῶς/σῶν (σῶς, σῶν), φροῦδος.
  - Contracted adjectives [B, unit 20]: χρυσοῦς, χρυσῆ, χρυσοῦν (χρύσεος), gen χρυσοῦ, χρυσῆς; **ἀργυροῦς, ἀργυρᾶ, ἀργυροῦν** (α after ρ/ε/ι); ἁπλοῦς, ἁπλῆ, ἁπλοῦν; διπλοῦς; εὔνους, εὔνουν (gen εὔνου, pl εὔνοι, **neuter pl εὔνοα uncontracted**: S1 ch.13 "το οα στο τέλος του πληθ. των ουδετέρων μένει ασυναίρετο"); Attic adjectives -ως, -ων (ἵλεως, ἵλεων; πλέως), 2nd decl. endings of "Attic": ἵλεως · ἵλεω · ἵλεῳ · ἵλεων | pl ἵλεῳ · ἵλεων · ἵλεῳς [B, rare].
- **Participles are adjectives**; the exam treats "την μετοχή του αρσενικού γένους στη γενική πληθυντικού". Full tables (S1 ch.16; Εγχειρίδιο unit 6): 
  | Participle | Masc nom/gen | Fem nom/gen | Neut nom/gen | Dat pl (m / f / n) |
  |---|---|---|---|---|
  | present act. λύων | λύων / λύοντος | λύουσα / λυούσης | λῦον / λύοντος | λύουσι(ν) / λυούσαις / λύουσι(ν) |
  | aorist α' act. λύσας | λύσας / λύσαντος | λύσασα / λυσάσης | λῦσαν / λύσαντος | λύσασι(ν) / λυσάσαις / λύσασι(ν) |
  | aorist β' act. λαβών | λαβών / λαβόντος | λαβοῦσα / λαβούσης | λαβόν / λαβόντος | λαβοῦσι(ν) / λαβούσαις / λαβοῦσι(ν) |
  | perfect act. λελυκώς | λελυκώς / λελυκότος | λελυκυῖα / λελυκυίας | λελυκός / λελυκότος | λελυκόσι(ν) / λελυκυίαις / λελυκόσι(ν) |
  | passive aorist λυθείς | λυθείς / λυθέντος | λυθεῖσα / λυθείσης | λυθέν / λυθέντος | λυθεῖσι(ν) / λυθείσαις / λυθεῖσι(ν) |
  | middle/passive λυόμενος, λυσάμενος, λελυμένος | -ος -η -ον (2nd/1st decl.) | | | |
  | contract present τιμῶν | τιμῶν / τιμῶντος | τιμῶσα / τιμώσης | τιμῶν / τιμῶντος | τιμῶσι(ν) / τιμώσαις |
  | εἰμί ὤν | ὤν / ὄντος | οὖσα / οὔσης | ὄν / ὄντος | **οὖσι(ν)** / οὔσαις / **οὖσι(ν)** (2024 resit: τῶν ὄντων → dat pl) |
  | οἶδα εἰδώς | εἰδώς / εἰδότος | εἰδυῖα / εἰδυίας | εἰδός / εἰδότος | εἰδόσι(ν) / εἰδυίαις |
  | ἰών (εἶμι) | ἰών / ἰόντος | ἰοῦσα / ἰούσης | ἰόν / ἰόντος | ἰοῦσι(ν) |
  | τίθημι τιθείς / θείς | τιθείς, τιθέντος / θείς, θέντος | τιθεῖσα, τιθείσης / θεῖσα | τιθέν / θέν | τιθεῖσι(ν) / θεῖσι(ν) |
  | δίδωμι διδούς / δούς | διδούς, διδόντος / δούς, δόντος | διδοῦσα, διδούσης / δοῦσα | διδόν / δόν | διδοῦσι(ν) / δοῦσι(ν) |
  | ἵστημι ἱστάς / στάς | ἱστάς, ἱστάντος / στάς, στάντος | ἱστᾶσα / στᾶσα | ἱστάν / στάν | ἱστᾶσι(ν) / στᾶσι(ν) |
  | ἵημι ἱείς / εἵς | ἱείς, ἱέντος / εἵς, ἕντος | ἱεῖσα / εἷσα | ἱέν / ἕν | ἱεῖσι(ν) / εἷσι(ν) |
  | δείκνυμι δεικνύς | δεικνύς / δεικνύντος | δεικνῦσα / δεικνύσης | δεικνύν / δεικνύντος | δεικνῦσι(ν) / δεικνύσαις |
  | βαίνω-type root aor. βάς, γνούς, δύς | βάς / βάντος; γνούς / γνόντος; δύς / δύντος | βᾶσα / βάσης; γνοῦσα / γνούσης; δῦσα / δύσης | βάν / βάντος; γνόν; δύν | βᾶσι(ν); γνοῦσι(ν); δῦσι(ν) |
  Grammatical pattern used by the exam (2024): ὑπαρχουσῶν (fem gen pl) → "τον ίδιο τύπο στο αρσενικό" = ὑπαρχόντων [A]. Trap: **fem gen pl of participles is oxytone-circumflex -ουσῶν, -ασῶν, -εισῶν, -υιῶν, -μένων**; masc gen pl -όντων, -άντων, -έντων, -ότων. The checker needs the accent only to separate λυουσῶν/λυόντων? no: the letters differ, so accent-insensitive checking is safe here.
- **Dat pl endings of 3rd-decl. adjectives/participles** (-σι(ν) with ν dropped before σ: λύουσι, χαρίεσι, πᾶσι) and the **nominative sg masc** (λύων, λύσας, λελυκώς, λυθείς, λαβών) are examined repeatedly: the "nom. sg of the future participle fem" in 2025 (ὀψομένη) and the 2023 "ἐπιμεληθῆναι → ptc masc gen pl" (ἐπιμεληθέντων).

---

## 5. Comparison of adjectives and adverbs (S1 ch.17, §§189-204) [A: 9 of 13 recent papers, 10 of 11 older papers]

### 5.1 The rules the exam needs
- Regular: add **-τερος, -τέρα, -τερον / -τατος, -τάτη, -τατον** to the stem of the masculine (S1 §193). The result is a 2nd/1st-declension adjective (so its gen pl fem is -ῶν, nom pl -οι/-αι/-α).
- **The ο/ω rule (S1 §194)** for 2nd-declension adjectives: the stem vowel stays **ο** if the syllable before it is long (by nature or by position), becomes **ω** if the previous syllable is short: ξηρός → ξηρότερος, γενναῖος → γενναιότερος, θερμός → θερμότερος, ἔνδοξος → ἐνδοξότερος, but **σοφός → σοφώτερος**, **νέος → νεώτερος**, ἄξιος → ἀξιώτερος. Use only S1's own examples in the app; mixed cases such as ἰσχυρότερος (short υ before ρ) are **UNSURE** and should not be generated.
- Stems in **-ης**: -έστερος (ἀληθέστερος, εὐγενέστερος). Stems in **-ων**: -έστερος (σωφρονέστερος, εὐδαιμονέστερος). **-υς**: -ύτερος (βαρύτερος, γλυκύτερος); **-ας**: -άντερος (μελάντερος); **-εις**: -έστερος (χαριέστερος); **-ις** (εὔχαρις): ἀχαρίστερος (S1). Contracted adjectives in -ους/-οῦς: **-ούστερος, -ούστατος** (εὐνούστερος, ἁπλούστερος) (S1 §195β).
- Analogical endings (S1 §195): -αίτερος (παλαιός → παλαίτερος, γεραίτερος, ἴσος → ἰσαίτερος, ἥσυχος → ἡσυχαίτερος / ἡσυχώτερος, **ἴδιος → ἰδιαίτερος / ἰδιώτερος**, φίλος → φιλαίτερος / φίλτερος / φιλίων); -ίστερος (ἅρπαξ, κλέπτης, πλεονέκτης, λάλος); -ούστερος.
- **Irregular (S1 §196), the lemma table to memorise in full** (comp. / superl. / note): 
  | Positive | Comparative (m/f · n) | Superlative |
  |---|---|---|
  | αἰσχρός | αἰσχίων · αἴσχιον | αἴσχιστος |
  | ἐχθρός | ἐχθίων · ἔχθιον (also ἐχθρότερος) | ἔχθιστος (also ἐχθρότατος) |
  | ἡδύς | ἡδίων · ἥδιον | ἥδιστος |
  | καλός | καλλίων · κάλλιον | κάλλιστος |
  | μέγας | μείζων · μεῖζον | μέγιστος |
  | ῥᾴδιος | ῥᾴων · ῥᾷον | ῥᾷστος |
  | ταχύς | θάττων · θᾶττον | τάχιστος |
  | ἀγαθός | ἀμείνων · ἄμεινον / βελτίων · βέλτιον / κρείττων · κρεῖττον / λῴων · λῷον | ἄριστος / βέλτιστος / κράτιστος / λῷστος |
  | κακός | κακίων · κάκιον / χείρων · χεῖρον | κάκιστος / χείριστος |
  | μακρός | μακρότερος | μακρότατος, also μήκιστος |
  | μικρός | μικρότερος / ἐλάττων · ἔλαττον / ἥττων · ἧττον | μικρότατος / ἐλάχιστος / (adv.) ἥκιστα |
  | ὀλίγος | μείων · μεῖον | ὀλίγιστος |
  | πολύς | πλείων · πλέον | πλεῖστος |
  Elliptical (§201): ἄνω → ἀνώτερος, ἀνώτατος; κάτω → κατώτερος; πρό → πρότερος, **πρῶτος**; ὑπέρ → ὑπέρτερος; ὕστερος, ὕστατος; ὕπατος; ἔσχατος. Some adjectives have no degrees (material, location, origin: λίθινος, χερσαῖος, πατρῷος, ἀθάνατος, πάνσοφος) (§202).
- **Declension of the comparative in -ίων / -ων (S1 §197, stem βελτιον- / βελτιοσ-):** nom ὁ ἡ βελτίων, τὸ βέλτιον · gen βελτίονος · dat βελτίονι · acc βελτίονα **or βελτίω**, τὸ βέλτιον · voc ὦ βέλτιον | pl **βελτίονες or βελτίους**, βελτίονα or **βελτίω** · βελτιόνων · **βελτίοσι(ν)** · acc **βελτίονας or βελτίους**. (Why the exam loves it: 2023 "ῥᾷστον → comparative", 2025 μεγάλας → **μειζόνων** (gen pl, the contracted forms don't exist in gen pl), 2011 κρείττονος → acc pl fem **κρείττονας / κρείττους**, 2015 ἐλαχίστην → dat pl comparative fem **ἐλάττοσι(ν)**.)
- **Participles can only be compared periphrastically** (μᾶλλον/μάλιστα + positive, §§198-200): δυνάμενος → μᾶλλον δυνάμενος. Also single-ending adjectives.
- **Adverbs (S1 §§203-204):** formed from the gen pl of the adjective by changing the final **-ν to -ς**: σοφῶν → σοφῶς, ἀληθῶν → ἀληθῶς, ἡδέων → ἡδέως, σωφρόνων → σωφρόνως, ταχέων → ταχέως, ῥᾳδίων → **ῥᾳδίως**, καλῶν → καλῶς. **Comparative adverb = neuter singular of the comparative adjective; superlative adverb = neuter PLURAL of the superlative adjective**: σοφῶς · σοφώτερον · σοφώτατα; ἡδέως · ἥδιον · ἥδιστα; καλῶς · κάλλιον · κάλλιστα; ταχέως · θᾶττον · τάχιστα; ῥᾳδίως · ῥᾷον · ῥᾷστα.
  Special adverbs: **εὖ · ἄμεινον / βέλτιον / κρεῖττον · ἄριστα / βέλτιστα / κράτιστα**; ὀλίγον · μεῖον / ἔλαττον / ἧττον · ὀλίγιστα / ἐλάχιστα / ἥκιστα; πολύ · πλέον · πλεῖστα (or πλεῖστον); **μάλα · μᾶλλον · μάλιστα**; place adverbs in -τέρω, -τάτω: ἄνω · ἀνωτέρω · ἀνωτάτω, ἔξω · ἐξωτέρω, ἔσω, κάτω, **πόρρω · πορρωτέρω · πορρωτάτω** (2014), ἐγγύς · ἐγγυτέρω / ἐγγύτερον / ἔγγιον · ἐγγυτάτω / ἐγγύτατα / ἔγγιστα, πέρα · περαιτέρω; time adverbs: **πάλαι · παλαίτερον · παλαίτατα** (2016, 2023), πρωί · πρωιαίτερον / πρῳαίτερον, ὀψέ · ὀψιαίτερον.
  **Exam proof that adverbs are asked from forms of the opposite degree:** 2014 ἀγαθῶν → "το επίρρημα στον θετικό βαθμό" = εὖ; 2013/2014/2017 μάλιστα → "θετικός" = μάλα; 2020 θᾶττον → other two degrees = ταχέως, τάχιστα; 2023 Sept πρῶτον → "τους άλλους δύο βαθμούς" (πρό? πρότερον): **UNSURE what the committee accepted; S1 §201 lists πρότερος/πρῶτος only as adjective degrees; the adverbs πρότερον (comparative) and πρῶτον (superlative) belong to the adjective πρῶτος family; the positive has no adverb (πρό is a preposition).** Do not put πρῶτον in the generator.
- Traps (exam-proven or rule-derived): (1) **agreement**: the instruction "τον ίδιο τύπο στον συγκριτικό βαθμό" for the feminine accusative ἰδίαν means **ἰδιαιτέραν** (or ἰδιωτέραν), not the masculine ἰδιαίτερος; (2) *ῥᾷστον / ῥᾷον / ῥᾴδιον*: iota subscript needed (ῥᾴδιος has **ᾳ**), the checker must keep ᾳ vs α only as a free alternative; (3) μείζων/μεῖζον accents (neuter oxytone→ circumflex); (4) πλείων/πλεῖον vs πλέον: both appear in S1 (πλέον is the neuter used as adverb/noun); (5) θάττων not *ταχύτερος*: exam wants the irregular (although ταχύτερος exists in later Greek, S1 §196: θάττων/τάχιστος); (6) the comparative of a feminine participle/adjective of 3rd class is NOT -τέρα unless regular; (7) don't confuse comparative degree adjectives (μείζονες) with superlatives (μέγιστοι).

---

## 6. Numerals (S1 ch.18; Εγχειρίδιο unit 18) [B; οὐδείς and the first four numerals are inflection items, so they count as A]
- **Inflected: 1-4 and the hundreds** (200 diakosioi, 300 triakosioi … 900; 1000 chilioi; 10 000 myrioi are adjective-like -οι -αι -α).
  | | masc | fem | neut |
  |---|---|---|---|
  | 1 | εἷς · ἑνός · ἑνί · ἕνα | μία · μιᾶς · μιᾷ · μίαν | ἕν · ἑνός · ἑνί · ἕν |
  | 2 | δύο · δυοῖν · δυοῖν (dat. also δυσί(ν) in prose) · δύο | same | same |
  | 3 | τρεῖς · τριῶν · τρισί(ν) · τρεῖς | same | τρία · τριῶν · τρισί(ν) · τρία |
  | 4 | τέτταρες/τέσσαρες · τεττάρων · τέτταρσι(ν) · τέτταρας | same | τέτταρα … |
  **οὐδείς / μηδείς decline like εἷς** (οὐδείς, οὐδεμία, οὐδέν; οὐδενός, οὐδεμιᾶς, οὐδενός; οὐδενί, οὐδεμιᾷ; οὐδένα, οὐδεμίαν, οὐδέν; plural οὐδένες, οὐδένων, οὐδέσι(ν), οὐδένας for masculine only) (S1 §239). 2015 οὐδείς → gen sg fem οὐδεμιᾶς; 2025 οὐδενός → dat sg fem οὐδεμιᾷ.
- Cardinals 5-199: **πέντε, ἕξ, ἑπτά, ὀκτώ, ἐννέα, δέκα, ἕνδεκα, δώδεκα, τρεῖς/τρία καὶ δέκα, εἴκοσι(ν), τριάκοντα, τετταράκοντα, πεντήκοντα, ἑξήκοντα, ἑβδομήκοντα, ὀγδοήκοντα, ἐνενήκοντα, ἑκατόν** (all indeclinable); compounds: "εἷς καὶ εἴκοσι" or "εἴκοσι καὶ εἷς".
- Ordinals: πρῶτος, δεύτερος, τρίτος, τέταρτος, πέμπτος, ἕκτος, ἕβδομος, ὄγδοος, ἔνατος, δέκατος, … εἰκοστός, τριακοστός, ἑκατοστός (-τός up to 19, except δεύτερος, ἕβδομος, ὄγδοος; -στός from 20).
- Other classes: time-adjectives in -αῖος (δευτεραῖος, τριταῖος); multiplicatives in -πλοῦς (διπλοῦς, τριπλοῦς), proportionals in -πλάσιος (διπλάσιος); numeral adverbs: ἅπαξ, δίς, τρίς, τετράκις, πεντάκις… πολλάκις, ὁσάκις, ποσάκις.
- Greek numeral letters [C]: α΄=1 … θ΄=9, ι΄=10, κ΄=20, ρ΄=100; S1 §209 has a table.
- Trap: **δύο is the only dual-ish case system: δυοῖν for gen/dat; dative plural δυσί(ν) is the usual prose form.** The app can drill with real sentences (the Εγχειρίδιο unit 18 starts "Ἑπτὰ …").

---

## 7. Pronouns and pronominal adjectives (S1 ch.19; Εγχειρίδιο unit 13) [A: 2-4 items per paper]

### 7.1 Personal [A]
| | 1sg | 2sg | 3sg (only αὐτός) | 1pl | 2pl |
|---|---|---|---|---|---|
| nom | ἐγώ | σύ | αὐτός -ή -ό | ἡμεῖς | ὑμεῖς |
| gen | ἐμοῦ / μου | σοῦ / σου | αὐτοῦ -ῆς -οῦ | ἡμῶν | ὑμῶν |
| dat | ἐμοί / μοι | σοί / σοι | αὐτῷ -ῇ -ῷ | ἡμῖν | ὑμῖν |
| acc | ἐμέ / με | σέ / σε | αὐτόν -ήν -ό | ἡμᾶς | ὑμᾶς |
3rd person personal pronoun = the oblique cases of **αὐτός** (S1 §221): so "τον ενικό στο γ΄ πρόσωπο" of ὑμᾶς in 2014 asks for αὐτόν (accept αὐτήν/αὐτό only if the instruction gives gender). **μου/μοι/με are enclitic** (no accent unless emphatic ἐμοῦ…). αὐτός = "he/self" (predicative position: αὐτὸς ὁ ἀνήρ) and "the same" (ὁ αὐτός, crasis αὑτός, ταὐτό).
### 7.2 Reflexive [A] (the 2025-26 Gymnasium guidance CUTS them, yet 2014 and 2024 examined them: teach fully)
ἐμαυτοῦ -ῆς (myself), σεαυτοῦ -ῆς (also σαυτοῦ), ἑαυτοῦ -ῆς -οῦ (also αὑτοῦ): gen ἑαυτοῦ ἑαυτῆς ἑαυτοῦ; dat ἑαυτῷ ἑαυτῇ ἑαυτῷ; acc ἑαυτόν ἑαυτήν ἑαυτό; **plural: ἑαυτῶν, ἑαυτοῖς -αῖς, ἑαυτούς -άς -ά** (3rd person) but **1st/2nd person plural are two words: ἡμῶν αὐτῶν, ἡμῖν αὐτοῖς, ἡμᾶς αὐτούς; ὑμῶν αὐτῶν, ὑμῖν αὐτοῖς, ὑμᾶς αὐτούς/αὐτάς** (2024: ἑαυτοῦ → "την αιτιατική πληθυντικού θηλυκού γένους στο β΄ πρόσωπο" = **ὑμᾶς αὐτάς**; 2014: αὑτάς → "τη γενική πληθυντικού στο β΄ πρόσωπο στο ίδιο γένος" = **ὑμῶν αὐτῶν** (same form for all genders)). No nominative. Trap: breathing αὑτ- (rough, "αὑτός" crasis) vs αὐτ- (smooth); when the checker ignores breathings, "αὑτάς" and "αὐτάς" collapse, which is fine, but **ἑαυτάς vs αὐτάς differ in letters**.
### 7.3 Reciprocal [A/B]
ἀλλήλων · ἀλλήλοις -αις -οις · ἀλλήλους -ας -α. No singular, no nominative. Dual ἀλλήλω. (Εγχειρίδιο unit 13.)
### 7.4 Possessive [B]
ἐμός -ή -όν, σός -ή -όν (ὁ ἐμὸς πατήρ), ἡμέτερος -α -ον, ὑμέτερος -α -ον, **3rd person none: use gen of αὐτός (αὐτοῦ, αὐτῆς, αὐτῶν) or ἑαυτοῦ in reflexive sense; ὅς, ἥ, ὅν "his own" is Homeric.** Trap: Greek puts the article before the possessive (ὁ ἐμὸς φίλος) and the possessive gen after the noun (ὁ φίλος μου).
### 7.5 Demonstrative [A]
- ὅδε ἥδε τόδε ("this here"): article + -δε, accent as the article: gen τοῦδε τῆσδε τοῦδε · dat τῷδε τῇδε τῷδε · acc τόνδε τήνδε τόδε | οἵδε αἵδε τάδε · τῶνδε · τοῖσδε ταῖσδε · τούσδε τάσδε τάδε. 
- **οὗτος αὕτη τοῦτο** ("this", mostly backward-looking): gen τούτου ταύτης τούτου · dat τούτῳ ταύτῃ τούτῳ · acc τοῦτον ταύτην τοῦτο | **οὗτοι αὗται ταῦτα** · **τούτων** (all genders) · τούτοις ταύταις τούτοις · τούτους ταύτας ταῦτα. Rule: the stem has **ου** when the next syllable has ο/ω, **αυ** when it has α/η. Trap list: αὕτη (nom sg fem, rough breathing + acute) vs αὑτή; ταῦτα (neuter pl, 2024: τοιαῦτα parallels it) vs ταύτας; nom pl masc οὗτοι (not οὗτοι/ούτοι; rough breathing).
- ἐκεῖνος -η -ο (neuter ἐκεῖνο without ν); τοιοῦτος -αύτη -οῦτο(ν), τοσοῦτος -αύτη -οῦτο(ν), τηλικοῦτος (like οὗτος) and τοιόσδε, τοσόσδε, τηλικόσδε (like ὅδε-type: τοιοῦδε? **UNSURE**: S1 §226 should be read before generating -όσδε forms; the exam 2024 asked τοιαῦτα → "τη γενική πληθυντικού στο θηλυκό γένος" = **τοιούτων**). 
### 7.6 Relative [A]
- ὅς ἥ ὅ · gen οὗ ἧς οὗ · dat ᾧ ᾗ ᾧ · acc ὅν ἥν ὅ | οἵ αἵ ἅ · ὧν · οἷς αἷς οἷς · οὕς ἅς ἅ; ὅσπερ (adds -περ: ὅνπερ, ᾧπερ, οἵπερ…).
- **ὅστις ἥτις ὅ,τι** (S1 §241): gen **οὗτινος / ὅτου**, ἧστινος, οὗτινος / ὅτου · dat **ᾧτινι / ὅτῳ**, ᾗτινι, ᾧτινι / ὅτῳ · acc ὅντινα, ἥντινα, ὅ,τι | nom pl **οἵτινες, αἵτινες, ἅτινα / ἅττα** · gen ὧντινων (also ὅτων) · dat οἷστισι(ν) (ὅτοις) αἷστισι(ν) · acc οὕστινας, ἅστινας, ἅτινα / ἅττα. 2023: ὅστις → other number = **οἵτινες**; 2011: ὅ τι → gen sg same gender = **οὗτινος / ὅτου**. Trap: ἅττα (indefinite neuter pl) has **no breathing change** and differs from ἄττα (enclitic τινά); ὅ τι (relative neuter) vs ὅτι (conjunction: no separation, no breathing?).
- Others like adjectives: ὅσος -η -ον, οἷος -α -ον, ὁποῖος, ἡλίκος, ὁπόσος.
### 7.7 Interrogative, indefinite, distributive [A]
- **τίς τί** (always acute on ι, never grave): gen τίνος / τοῦ · dat τίνι / τῷ · acc τίνα τί | τίνες τίνα · τίνων · τίσι(ν) · τίνας τίνα.
- **τὶς τὶ enclitic**: gen τινός / του · dat τινί / τῳ · acc τινά τι | τινές τινά / ἄττα · τινῶν · τισί(ν) · τινάς τινά / ἄττα. (2020: τις → dat pl τισί(ν).) Trap: τίς vs τις differ only by accent/enclisis; **the checker must treat them as different words in recognition items** (identify "ερωτηματική" vs "αόριστη").
- ὁ δεῖνα (rarely), ἔνιοι -αι -α (pl only); πᾶς (παντός…), ἕκαστος, ἄλλος (-η, -ο: no ν), ἕτερος, ἑκάτερος, ἀμφότεροι, οὐδέτερος.
- **Correlative table (S1 §244):** τίς; ~ τις ~ ὅδε/οὗτος/ἐκεῖνος ~ ὅς/ὅστις; πότερος; ~ ἕτερος ~ … ~ ὁπότερος; πόσος; ~ ποσός ~ τοσοῦτος ~ ὅσος/ὁπόσος; ποῖος; ~ ποιός ~ τοιοῦτος ~ οἷος/ὁποῖος; πηλίκος; ~ - ~ τηλικοῦτος ~ ἡλίκος/ὁπηλίκος. The adverbs follow the same pattern (S1 §363α): ποῦ; ποῖ; πόθεν; πότε; πῶς; ~ που/ποτέ/πως (enclitic) ~ ἐνταῦθα, ἐκεῖ, τότε, οὕτω(ς) ~ οὗ/ὅπου, ὅτε, ὡς/ὅπως.

---

## 8. The verb (S1 ch.20-31; Εγχειρίδιο units 11, 12, 14, 16, 17) [A: 6-10 of the 10 points]

### 8.1 Categories and the school's terminology (S1 ch.20)
- **Φωνές**: ενεργητική, μέση, παθητική. **Διαθέσεις**: ενεργητική, μέση (άμεση/έμμεση/δυναμική/αποθετική), παθητική. **Εγκλίσεις**: οριστική, υποτακτική, ευκτική, προστακτική + ονοματικοί τύποι (απαρέμφατο, μετοχή, ρηματικά επίθετα). **Χρόνοι**: ενεστώτας, παρατατικός, μέλλοντας, αόριστος (α΄ και β΄), παρακείμενος, υπερσυντέλικος, συντελεσμένος μέλλοντας. **Ιστορικοί χρόνοι** (παρατατικός, αόριστος, υπερσυντέλικος) take the **αύξηση**; the others don't. **Συζυγίες**: α΄ συζυγία (ρήματα σε -ω: φωνηεντόληκτα [λύω / κελεύω], περισπώμενα/συνηρημένα [τιμῶ, ποιῶ, δηλῶ], αφωνόληκτα [λείπω, γράφω, πείθω], υγρόληκτα [μένω, ἀγγέλλω], ενρινόληκτα [νέμω, τέμνω, φαίνω]) and β΄ συζυγία (ρήματα σε -μι).
- Verbal forms are built from "χρονικά θέματα": present stem (ενεστώτα/παρατατικού), future, aorist α΄, aorist β΄, perfect, passive aorist, passive future. **The principal parts ("αρχικοί χρόνοι") are the starting point** (§8.12).

### 8.2 Personal endings (the whole system on one page) [A]
| | Active | Middle-passive |
|---|---|---|
| Primary (present, future, perfect, subj.) | -ω, -εις, -ει, -ομεν, -ετε, -ουσι(ν) (subj. -ω -ῃς -ῃ -ωμεν -ητε -ωσι(ν)) | -ομαι, -ῃ / -ει, -εται, -όμεθα, -εσθε, -ονται (subj. -ωμαι -ῃ -ηται -ώμεθα -ησθε -ωνται) |
| Secondary (imperfect, aorist β΄) | -ον, -ες, -ε(ν), -ομεν, -ετε, -ον | -όμην, -ου, -ετο, -όμεθα, -εσθε, -οντο |
| Aorist α΄ | -σα, -σας, -σε(ν), -σαμεν, -σατε, -σαν | -σάμην, -σω, -σατο, -σάμεθα, -σασθε, -σαντο |
| Perfect | -κα, -κας, -κε(ν), -καμεν, -κατε, -κασι(ν) | -μαι, -σαι, -ται, -μεθα, -σθε, -νται (3pl periphrastic for stops) |
| Pluperfect | -κειν, -κεις, -κει(ν), -κεμεν, -κετε, -κεσαν | -μην, -σο, -το, -μεθα, -σθε, -ντο |
| Aorist passive | -θην, -θης, -θη, -θημεν, -θητε, -θησαν | — (future passive -θήσομαι, middle endings) |
Subjunctive aorist (no augment): act. λύσω, λύσῃς, λύσῃ, λύσωμεν, λύσητε, λύσωσι(ν); mid. λύσωμαι, λύσῃ, λύσηται…; pass. λυθῶ, λυθῇς, λυθῇ, λυθῶμεν, λυθῆτε, λυθῶσι(ν).
Optative: pres. λύοιμι, λύοις, λύοι, λύοιμεν, λύοιτε, λύοιεν; aor. α΄ act. λύσαιμι, λύσειας (λύσαις), λύσειε(ν) (λύσαι), λύσαιμεν, λύσαιτε, λύσειαν (λύσαιεν); aor. pass. **λυθείην, λυθείης, λυθείη, λυθεῖμεν / λυθείημεν, λυθεῖτε / λυθείητε, λυθεῖεν / λυθείησαν** (S1 §316); fut. λύσοιμι; mid. pres. λυοίμην, λύοιο, λύοιτο… ; aor. mid. λυσαίμην, λύσαιο, λύσαιτο…
Imperative: pres. act. λῦε, λυέτω, λύετε, λυόντων / λυέτωσαν; mid. λύου, λυέσθω, λύεσθε, λυέσθων; aor. α΄ act. **λῦσον**, λυσάτω, λύσατε, λυσάντων / λυσάτωσαν; mid. **λῦσαι**, λυσάσθω; aor. pass. **λύθητι**, λυθήτω, λύθητε, λυθέντων / λυθήτωσαν; perf. M/P **λέλυσο**, λελύσθω, λέλυσθε; perf. act. mostly periphrastic **λελυκὼς ἴσθι**, **λελυκὼς ἔστω** (S1 §287, 1: monolectic only 3sg λελυκέτω, rare).
Infinitives: λύειν, λύεσθαι · λῦσαι, λύσασθαι · λυθῆναι · λελυκέναι, λελύσθαι · λύσειν, λύσεσθαι, λυθήσεσθαι. Participles: see §4.

### 8.3 Augment and reduplication: the mechanism behind every "same tense/another tense" question [A]
**Augment** (only in the indicative of past tenses, never in subj./opt./imp./inf./ptc.):
- **Syllabic ἐ-** before a consonant: λύω → ἔλυον / ἔλυσα; ῥ- doubles: ῥίπτω → ἔρριπτον.
- **Temporal lengthening** before a vowel: α, ε → η; ο → ω; ι → ῑ; υ → ῡ; αι → ῃ; ει → ῃ (rare ει stays); οι → ῳ; αυ, ευ → ηυ (εὑρίσκω → ηὕρισκον / εὕρισκον, both in S1); ᾱ, η, ω unchanged. ἀκούω → ἤκουον; ἄγω → ἦγον; αἱρέω → ᾕρουν; οἰκέω → ᾤκουν; αὐξάνω → ηὔξανον; ἐλπίζω → ᾔλπιζον; ἐθέλω → ἤθελον / ἠθέλησα.
- **Irregular augments (S1 §269, Εγχειρίδιο): ἔχω → εἶχον; ἕπομαι → εἱπόμην; ἕλκω → εἷλκον; ἐργάζομαι → εἰργαζόμην; ἐάω → εἴων; ὁράω → ἑώρων; ἀνοίγω → ἀνέῳγον; ὠθέω → ἐώθουν; ὠνέομαι → ἐωνούμην; ἁλίσκομαι → ἡλισκόμην / ἑάλων; βούλομαι → ἐβουλόμην / ἠβουλόμην; δύναμαι → ἐδυνάμην / ἠδυνάμην; μέλλω → ἔμελλον / ἤμελλον; ἐσθίω → ἤσθιον; οἶδα → ᾔδη(ν); ἔρχομαι → ᾖα / ᾔειν; καθίζω → ἐκάθιζον; καθεύδω → ἐκάθευδον / καθηῦδον.**
- **Compound verbs:** augment goes **after the preposition**, which loses a final vowel (except περί, πρό in some, ἀμφί): ἀπο-βάλλω → ἀπέβαλλον; ἐκ-λείπω → **ἐξέλειπον**; εἰσ-έρχομαι → εἰσῄειν; **περι-οικέω → περιῴκουν** (2026); **ἐπι-σκοπέω → ἐπεσκόπουν** (2025: ἐπισκοπεῖν → 3sg impf **ἐπεσκόπει**); συν-λέγω → **συνέλεγον**; κατα-βαίνω → κατέβαινον; ἐν-έχω; πρό + ἔ → προὔ- (crasis: προὔλεγον) [B]; ἀμφιέννυμι → ἠμφίεσα; εὖ- and δυσ-: εὐεργετέω → εὐηργέτουν / ηὐεργέτουν.
**Reduplication** (perfect, pluperfect, and present reduplication of -μι and a few -ω verbs):
- consonant + ε (λέλυκα); aspirate → unaspirated (θύω → τέθυκα, φιλέω → πεφίληκα, χορεύω → κεχόρευκα); ρ → ἐρρ- (ῥίπτω → ἔρριφα); stems that begin with two consonants (other than stop + liquid), or with ζ, ξ, ψ, take a plain ἐ- instead of reduplication: ζητέω → ἐζήτηκα, σπείρω → ἔσπαρμαι, στρώννυμι → ἔστρωμαι, γιγνώσκω → ἔγνωκα, κτάομαι → ἔκτημαι / κέκτημαι (both in S1); stop + liquid usually does reduplicate (πέπλευκα, βέβληκα, τέτραμμαι).
- Vowel-initial verbs: temporal augment (ἦχα, ᾔτηκα, ᾔσθημαι) or **Attic reduplication** (ἐλήλυθα, ἀκήκοα, ἐλήλακα, ἐδήδοκα, ὀμώμοκα, ἀλήλιφα, ἐγήγερμαι, ἐγρήγορα).
- **ει- perfects (S1 §272):** λαμβάνω → **εἴληφα, εἴλημμαι**; λαγχάνω → εἴληχα; λέγω → **εἴρηκα**; διαλέγομαι → διείλεγμαι; συλλέγω → συνείλοχα; μείρομαι → εἵμαρται; εἴωθα.
- Compounds: reduplication after the preposition: ἀποδίδωμι → ἀποδέδωκα, καταβαίνω → καταβέβηκα, **διαβάλλω → διαβέβληκα**, εἰσέρχομαι → εἰσελήλυθα, **ἀναγιγνώσκω → ἀνέγνωκα**.
- Pluperfect = augment + perfect stem + -κειν: ἐλελύκειν, ἠκηκόειν, ἐληλύθειν, ἐγεγόνειν.
**Exam proof (2024, 4 pts):** four verbs of a Thucydides passage → perfect "στον ίδιο τύπο": ἔπεισε → **πέπεικε(ν)**; ψηφισαμένων → **ἐψηφισμένων**; πλεύσας → **πεπλευκώς**; κατῆγεν → **κατῆχε(ν)**. Sept 2024: οἴσω → 3sg perfect **ἐνήνοχε(ν)**.

### 8.4 Future and aorist formation [A]
- **Regular future:** stem + σ + thematic endings (λύσω, λύσεις, … λύσουσι). Stops: κ,γ,χ + σ = ξ; π,β,φ + σ = ψ; τ,δ,θ + σ = σ (dental drops): λέγω λέξω, πράττω πράξω, γράφω γράψω, πείθω πείσω. Middle/passive: λύσομαι (mid.), λυθήσομαι (pass.). Infinitive λύσειν, participle λύσων.
- **Attic contracted futures** (conj. like φιλῶ): (a) liquid and nasal verbs: μένω → **μενῶ**, ἀγγέλλω → ἀγγελῶ, νέμω → νεμῶ, φαίνω → φανῶ, κρίνω → κρινῶ, τέμνω → τεμῶ, βάλλω → βαλῶ, φθείρω → φθερῶ, αἴρω → ἀρῶ, ἐγείρω → ἐγερῶ, τείνω → τενῶ (S1 §302): -ῶ, -εῖς, -εῖ, -οῦμεν, -εῖτε, -οῦσι(ν); (b) **-ίζω verbs with more than two syllables and stem in -δ**: κομίζω → **κομιῶ**, νομίζω → νομιῶ, ἐλπίζω → ἐλπιῶ, **ἀφανίζω → ἀφανιῶ, ἀφανιεῖν** (2026: ἀφανίζειν → fut inf **ἀφανιεῖν**), φροντίζω → φροντιῶ, ἀγωνίζομαι → ἀγωνιοῦμαι, λογίζομαι → λογιοῦμαι (but κτίζω → κτίσω, σχίζω → σχίσω) (S1 §295); (c) a few vowel verbs: **ἐλαύνω → ἐλῶ, ἐλᾷς, ἐλᾷ** (Sept 2025 ἐξελάσαντες → 3sg **ἐξελᾷ**), καλέω → καλῶ, τελέω → τελῶ, ἀπόλλυμι → ἀπολῶ, ἀμφιέννυμι → ἀμφιῶ, καθίζω → καθιῶ, βιβάζω → βιβῶ.
- **Future of -ω with active meaning in the middle (S1 §359, 3):** ᾄδω → ᾄσομαι, ἀκούω → ἀκούσομαι, ἁμαρτάνω → ἁμαρτήσομαι, **βαίνω → βήσομαι**, γελάω → γελάσομαι, **γιγνώσκω → γνώσομαι**, δάκνω → δήξομαι, θέω → θεύσομαι, λαγχάνω → λήξομαι, **λαμβάνω → λήψομαι**, μανθάνω → μαθήσομαι, ὄμνυμι → ὀμοῦμαι, **ὁράω → ὄψομαι**, τίκτω → τέξομαι, τυγχάνω → τεύξομαι, + φεύγω → φεύξομαι, πίνω → πίομαι, ἐσθίω → ἔδομαι, πίπτω → πεσοῦμαι, ἀποθνῄσκω → ἀποθανοῦμαι, χαίρω → χαιρήσω, (ἀπο)λαύω, βοάω… The Doric futures πεσοῦμαι, πλευσοῦμαι, φευξοῦμαι are on the list (S1 notes them "δωρικός").
- **Middle futures with passive meaning:** ἀδικήσομαι, ἁλώσομαι (of αἱρέω), πείσομαι (πάσχω), κωλύσομαι, οἰκήσομαι (S1 §359, 4).
- **Future perfect** (σχεδόν only passive/middle): λελύσομαι / λελυμένος ἔσομαι; active periphrastic λελυκὼς ἔσομαι; τεθνήξω, ἑστήξω.
- **Aorist α΄:** stem + σ + α (ἔλυσα) with the same stop rules as the future (ἔπεισα, ἔγραψα, ἔπραξα). Liquid/nasal aorists have no σ and lengthen the stem vowel: μένω → ἔμεινα; φαίνω → ἔφηνα; τείνω → ἔτεινα; κρίνω → ἔκρινα (no lengthening before ι/ῑ/ῡ); ἀγγέλλω → ἤγγειλα; νέμω → ἔνειμα; σπείρω → ἔσπειρα; αἴρω → ἦρα; ἐγείρω → ἤγειρα; φθείρω → ἔφθειρα (S1 ch.24: ε → ει, α → η, but ᾱ after ι/ρ).
- **Root ("κ" ) aorists of -μι verbs:** ἔθηκα, ἧκα, ἔδωκα (κ-aorist singular only; plural uses root forms: ἔθεμεν ἔθετε ἔθεσαν) (S1 §344).
- **Aorist β΄** (see §8.7).

### 8.5 Contract verbs (περισπώμενα; the 2025-26 Gymnasium guidance cuts the β' class, yet 2026 examined περιοικοῦσι: teach all three) [A: τολμῷεν, ἐπιθυμεῖ → ἐπιθυμεῖν, ἐπισκοπεῖν, περιοικοῦσι, ἀποροῦντα, ἀδικούμενοι, ἐπιμεληθῆναι appear in the papers] (S1 ch.26, §§322-331)
- **Contraction chart (S1 §324):** α + ε/η = ᾱ; α + ει/ῃ = ᾳ; α + ο/ω/ου = ω; α + οι = ῳ. ε + ε = ει; ε + ο = ου; ε + ω/η = ω/η (no change); ε + οι = οι; ε + ου = ου. ο + ε/ο/ου = ου; ο + η/ω = ω; ο + ει/ῃ/οι = οι.
- **Present and imperfect of the three models (S1 pp. 204-208):**
  - τιμάω: τιμῶ, τιμᾷς, τιμᾷ, τιμῶμεν, τιμᾶτε, τιμῶσι(ν) | impf ἐτίμων, ἐτίμας, ἐτίμα, ἐτιμῶμεν, ἐτιμᾶτε, ἐτίμων | subj = pres. ind. | opt τιμῴην / τιμῷμι, τιμῴης / τιμῷς, τιμῴη / τιμῷ, τιμῷμεν (τιμῴημεν), τιμῷτε (τιμῴητε), τιμῷεν (τιμῴησαν) — **S1 gives both families (α' and β' τύπος)** | imp τίμα, τιμάτω, τιμᾶτε, τιμώντων / τιμάτωσαν | inf τιμᾶν | ptc τιμῶν, τιμῶσα, τιμῶν (gen τιμῶντος, τιμώσης).
  - ποιέω: ποιῶ, ποιεῖς, ποιεῖ, ποιοῦμεν, ποιεῖτε, ποιοῦσι(ν) | impf ἐποίουν, ἐποίεις, ἐποίει, ἐποιοῦμεν, ἐποιεῖτε, ἐποίουν | subj ποιῶ, ποιῇς, ποιῇ, ποιῶμεν, ποιῆτε, ποιῶσι(ν) | opt ποιοίην / ποιοῖμι, ποιοίης, ποιοίη, ποιοῖμεν, ποιοῖτε, ποιοῖεν | imp ποίει, ποιείτω, ποιεῖτε, ποιούντων | inf ποιεῖν | ptc ποιῶν, ποιοῦσα, ποιοῦν.
  - δηλόω: δηλῶ, δηλοῖς, δηλοῖ, δηλοῦμεν, δηλοῦτε, δηλοῦσι(ν) | impf ἐδήλουν, ἐδήλους, ἐδήλου, ἐδηλοῦμεν, ἐδηλοῦτε, ἐδήλουν | subj δηλῶ, δηλοῖς, δηλοῖ, δηλῶμεν, δηλῶτε, δηλῶσι(ν) | opt δηλοίην / δηλοῖμι … | imp δήλου, δηλούτω, δηλοῦτε | inf δηλοῦν | ptc δηλῶν, δηλοῦσα, δηλοῦν.
  - Middle/passive: τιμῶμαι, τιμᾷ, τιμᾶται, τιμώμεθα, τιμᾶσθε, τιμῶνται; ποιοῦμαι, ποιῇ / ποιεῖ, ποιεῖται, ποιούμεθα, ποιεῖσθε, ποιοῦνται; impf ἐτιμώμην, ἐτιμῶ, ἐτιμᾶτο / ἐποιούμην, ἐποιοῦ, ἐποιεῖτο; ptc τιμώμενος, ποιούμενος, δηλούμενος (2026 asked ἀδικούμενοι, ἐπιμελουμένων in the passage).
  - **2020 paper proved the passive imperfect 2sg: καταδαπανηθείσας → κατεδαπανῶ** (δαπανάω: ἐδαπανάου → ἐδαπανῶ). 
- Special verbs (S1 §§325-327): **ζῶ, πεινῶ, διψῶ, χρῶμαι** have η instead of α: ζῶ, ζῇς, ζῇ, ζῶμεν, ζῆτε, ζῶσι(ν); impf ἔζων, ἔζης, ἔζη, ἐζῶμεν, ἐζῆτε, ἔζων; opt ζῴην…; imp ζῆ (contracted like -άω, S1 logic) and ζῆθι (both accepted by the 2021 key); inf ζῆν; ptc ζῶν, ζῶσα, ζῶν. χρῶμαι: χρῇ (2sg), χρῆται; impf ἐχρώμην, ἐχρῶ, ἐχρῆτο. **πλέω, πνέω, ῥέω, θέω, νέω, χέω, δέω (need):** contract only ε + ε/ι (πλεῖς, πλεῖ, but πλέω, πλέομεν, πλέουσι).
- **Tense formation (S1 §331 tables):** most contracts lengthen the final vowel before the tense suffix: **α → η** (τιμήσω, ἐτίμησα, τετίμηκα, τετίμημαι, ἐτιμήθην), **ε → η** (ποιήσω, ἐποίησα, πεποίηκα, πεποίημαι, ἐποιήθην), **ο → ω** (δηλώσω, ἐδήλωσα, δεδήλωκα, δεδήλωμαι, ἐδηλώθην). But a list (S1 pp. 212-216) **keeps the short vowel** and takes σ only before θ, μ, τ: αἰνέω (ᾔνεσα, ᾔνηκα), **αἱρέω** (αἱρήσω, εἷλον, ᾕρηκα, ᾕρημαι, ᾑρέθην), δέω (δήσω, ἔδησα, δέδεκα, δέδεμαι, ἐδέθην), καλέω (καλῶ, ἐκάλεσα, κέκληκα, κέκλημαι, ἐκλήθην), τελέω (τελῶ, ἐτέλεσα, τετέλεκα, τετέλεσμαι, ἐτελέσθην), ἀρκέω, αἰδέομαι, ἀκέομαι, ἐμέω, ξέω, ἀλέω, ἀρόω, χόω, σπάω (ἐσπάσθην), χαλάω, γελάω (γελάσομαι, ἐγέλασα), δράω (δράσω, δέδρακα, δέδραμαι, ἐδράσθην), θηράω, ἐάω, ἰάομαι, αἰτιάομαι, δειλιάω, ἀπο-δειλιάω.
- Trap list from the papers: (1) **imperative of -έω: ποίει (acute on the first syllable) ≠ ποιεῖ (indicative)**; (2) -άω 3sg **τιμᾷ** needs ᾳ; (3) subjunctive ≠ indicative for -έω verbs (ποιῇς ≠ ποιεῖς, ποιῇ ≠ ποιεῖ) but = for -άω; (4) **optative has two families** (τιμῴην / τιμῷμι); (5) **participle fem -οῦσα (ποιοῦσα) but -ῶσα (τιμῶσα)**; (6) augment of contract verbs follows the unmodified stem (ἐποίουν, ἐτίμων, ἐδήλουν) and compound-aug (ἐπεσκόπουν).

### 8.6 Stop-stem, liquid and vowel verbs: key facts (S1 ch.22-24, Εγχειρίδιο units 11, 12) [A]
- **Vowel-stem barytone verbs** (S1 ch.22): λύω, παύω, κελεύω, παιδεύω, βασιλεύω, ἀκούω, κρούω, πιστεύω… Tense characters κ (perfect), σ, θη; short ι/υ lengthen before σ/κ/θ/μ/τ: λύω → λύσω, λέλυκα, ἐλύθην. **A closed list (S1 §291) takes σ before θ, μ, τ**: ἀκούω (ἠκούσθην), κελεύω (ἐκελεύσθην, κεκέλευσμαι), κρούω, παύω (ἐπαύσθην / ἐπαύθην), ξύω, πταίω, σείω, χρίω, ψαύω, θραύω, κλῄω / κλείω (ἐκλείσθην, κέκλειμαι), πρίω, λούω (λέλουμαι), γεύω, ἀνύω, παίω.
- **Stops (S1 ch.23 §§292-300):** guttural (πράττω, πλέκω, λέγω, ἄρχω, τάττω, ἀλλάττω, κηρύττω, φυλάττω), labial (γράφω, πέμπω, τρίβω, κόπτω, βλάπτω, λείπω, ἅπτω, κρύπτω, τύπτω, στρέφω), dental (πείθω, φράζω, ἐλπίζω, κομίζω, ὀνομάζω, ἀρπάζω). Perfect active: dental drops (κεκόμικα, πέπεικα), labial/guttural become aspirate (γέγραφα, τέτριφα, κέκοφα, πέπραχα, τέταχα, κεκήρυχα, τετάραχα).
- **Perfect middle-passive clashes (S1 §298-300):** guttural + μαι = γμαι (λέλεγμαι, πέπραγμαι), + σαι = ξαι (λέλεξαι), + ται = κται (πέπρακται); labial + μαι = μμαι (γέγραμμαι, τέτριμμαι), + σαι = ψαι (γέγραψαι), + ται = πται (γέγραπται); dental + μαι = σμαι (πέπεισμαι, κεκόμισμαι), σαι (πέπεισαι), ται = σται (πέπεισται); 3pl is periphrastic: γεγραμμένοι εἰσί(ν), πεπεισμένοι εἰσί(ν); **liquid verbs**: πέφασμαι (φαίνω), ἔσταλμαι (στέλλω), ἤγγελμαι, κέκριμαι. 
- **Imperative of the perfect M/P (S1 §287, 2): λέλυσο, πέπεισο, γέγραψο, πέπραξο, λέλεξο, τέτριψο; 3sg λελύσθω, πεπεῖσθω, γεγράφθω, πεπράχθω** (2013: ἐπράχθη → **πεπράχθω**; 2025 Sept: πέπρακται → **πέπραξο**; 2016: φανήσεσθαι → "γ΄ ενικό προστακτικής παρακειμένου" = **πεφάνθω**; 2015: κατεστρέφοντο → **κατεστράφθω**).
- **Passive aorist:** λύω → ἐλύθην; stops: ἐγράφθην (but β΄ ἐγράφην), ἐπείσθην, ἐλέχθην, ἐπράχθην, ἐκομίσθην, ἐδιώχθην, ἐτάχθην, ἐλείφθην, ἐπέμφθην, ἐστράφθην / ἐστράφην, ἐπλέχθην / ἐπλάκην, ἐκόπην; liquids: ἠγγέλθην, ἐκρίθην, ἐστάλην, ἐφάνθην / ἐφάνην, ἐφθάρην, ἐσπάρην, ἐτμήθην; σ before θ: ἐκελεύσθην, ἠκούσθην, ἐκωλύθην.
- **Passive future:** λυθήσομαι; γραφήσομαι (β΄), πεισθήσομαι, ληφθήσομαι, ὀφθήσομαι, βληθήσομαι; **mid. futures used as passive: πείσομαι (from πάσχω!)**.

### 8.7 Second tenses (δεύτεροι χρόνοι, S1 ch.25) [A: 6 of 13 recent papers; 6 of 11 older papers]
- **Aorist β' (active and middle).** Formed from a **different, usually short and unsuffixed, stem** with the **endings of the imperfect** in the indicative (ἔ-λαβ-ον) and the **endings of the present** in the other moods (subj. λάβω, opt. λάβοιμι, imp. λαβέ, inf. λαβεῖν, ptc. λαβών). Stems (S1 §314): from the pure root (αἰσθάνομαι → ᾐσθόμην, ἁμαρτάνω → ἥμαρτον, λανθάνω → ἔλαθον), contracted (ἕπομαι → ἑσπόμην, ἔχω → ἔσχον), minus reduplication (γίγνομαι → ἐγενόμην, πίπτω → ἔπεσον), with reduplication (ἄγω → ἤγαγον), vowel change (τρέπω → ἔτραπον, λείπω → ἔλιπον), or suppletive roots (αἱρέω → εἷλον, ὁράω → εἶδον, λέγω → εἶπον, φέρω → ἤνεγκον [S1 lists both ἤνεγκα and ἤνεγκον], ἔρχομαι → ἦλθον, ἐσθίω → ἔφαγον, τρέχω → ἔδραμον, πάσχω → ἔπαθον, εὑρίσκω → ηὗρον, πίνω → ἔπιον, ἀποθνῄσκω → ἀπέθανον, τίκτω → ἔτεκον, βάλλω → ἔβαλον, μανθάνω → ἔμαθον, τυγχάνω → ἔτυχον, λαγχάνω → ἔλαχον, λαμβάνω → ἔλαβον, φεύγω → ἔφυγον, κάμνω → ἔκαμον, τέμνω → ἔτεμον, δάκνω → ἔδακον, ὀφλισκάνω → ὦφλον, ὀφείλω → ὤφελον).
  **Tables for exam cells:** λαμβάνω: subj λάβω, λάβῃς, λάβῃ, λάβωμεν, λάβητε, λάβωσι(ν); opt λάβοιμι, λάβοις, λάβοι, λάβοιμεν, λάβοιτε, λάβοιεν; imp λαβέ, λαβέτω, λάβετε, λαβόντων; inf λαβεῖν; ptc λαβών, λαβοῦσα, λαβόν. Middle: ἐλαβόμην, ἐλάβου, ἐλάβετο…; subj λάβωμαι; opt λαβοίμην; imp **λαβοῦ**, λαβέσθω; inf **λαβέσθαι**; ptc λαβόμενος.
  **Accent rules (S1 §§312-313) that the exam tests:** (1) aor. β' inf. act. is perispomenon-oxytone **-εῖν** (λαβεῖν, ἐλθεῖν, ἰδεῖν), ptc. masc. **-ών** (λαβών) — **accent on the ending, always**; (2) 2sg imp. of **ἔρχομαι, εὑρίσκω, λαμβάνω, λέγω, ὁράω** (aor. β') when simple is oxytone: **ἐλθέ, εὑρέ, λαβέ, εἰπέ, ἰδέ**; compounds are NOT: **ἄπελθε, ἔξευρε, παράλαβε, πρόειπε, πάριδε** (Sept 2024 ἐξευρεῖν → **ἔξευρε**; Sept 2025 διαλαβόντες → **διάλαβε**); other aor. β' verbs are normal-recessive (ἔλιπον → λίπε, ἔβαλον → βάλε, ἔπιον → πίε); (3) middle imp. 2sg is perispomenon: **γενοῦ, λαβοῦ, ἐλοῦ, ἰδοῦ** (compound: συγγενοῦ, ἀντιλαβοῦ) except monosyllabic + disyllabic prep.: **σχοῦ → πάρασχου, σποῦ → ἔπισπου**; (4) middle inf. paroxytone **-έσθαι** (γενέσθαι, λαβέσθαι). The simple ἔχω: aor. β' ἔσχον, subj σχῶ, σχῇς, σχῇ (**σχῶ, not ἔχω-form**), opt **σχοίην, σχοίης, σχοίη, σχοῖμεν…**; imp **σχές**, **σχεῖν**, ptc σχών; compounds: παράσχω, παράσχοιμι, παράσχες (S1 §314). 2023: ἔχειν → 2sg imp aor. β' = **σχές**.
  Teaching tip from the papers: *aorist β' appears every year as INPUT (εἶδον, ἔλαβον, ἦλθον, ἔσχον, ἤγαγον) and in 3-5 targets per 10 years.* 
- **Passive aorist β' / passive future β' (S1 §315-317):** like the α' forms without θ: ἐγράφην, γραφῆναι, γραφείς; γραφήσομαι; imperative **γράφηθι** (the -θι is kept!), ptc γραφείς / γραφέντος. Verbs: φαίνω (ἐφάνην, **φάνηθι**), γράφω, κόπτω (ἐκόπην), κλέπτω (ἐκλάπην), τρέπω (ἐτράπην), τρέφω (ἐτράφην), στρέφω (ἐστράφην), πλέκω (ἐπλάκην), ῥίπτω (ἐρρίφην), σήπω (ἐσάπην), τήκω (ἐτάκην), πήγνυμι (ἐπάγην), ῥήγνυμι (ἐρράγην), φθείρω (ἐφθάρην), σφάλλω (ἐσφάλην), μίγνυμι (ἐμίγην), ἐκπλήττω (ἐξεπλάγην), συλλέγω (συνελέγην). **Rule: monosyllabic stem in -ε- → -α-: κλέπτω ἐκλάπην, τρέπω ἐτράπην, τρέφω ἐτράφην; stem in -η- → -α-: σήπω ἐσάπην, τήκω ἐτάκην** (exceptions: πλήττω → ἐπλήγην; συλλέγω → συνελέγην). 
- **Perfect β' / pluperfect β' (S1 §318-319):** without κ, vowel ε → ο: λείπω → λέλοιπα, πάσχω → πέπονθα, πείθω → πέποιθα ("I trust"), τίκτω → τέτοκα, γίγνομαι → γέγονα, φαίνω → πέφηνα, κράζω → κέκραγα, φεύγω → πέφευγα, κλέπτω → κέκλοφα, τρέπω → τέτροφα, ῥήγνυμι → ἔρρωγα, πήγνυμι → πέπηγα, ἐγείρω → ἐγρήγορα, ἀπόλλυμι → ἀπόλωλα, σήπω → σέσηπα. Doubletes with different meaning (S1 §320-321): πέπεικα (I have persuaded) / **πέποιθα** (I trust); πέπραχα (I have done) / **πέπραγα** (I have fared); ἐφάνθην (shown by another) / **ἐφάνην** (appeared); ἐτρεψάμην (I put to flight) / ἐτραπόμην (I turned); διέφθαρκα / διέφθορα.
- **Wordlist of "verbs the exam passage will contain" by this layer:** ἔχω (σχ-), ἄγω (ἀγαγ-), λαμβάνω (λαβ-), ὁράω (ἰδ-), λέγω (εἰπ-), φέρω (ἐνεγκ-), ἔρχομαι (ἐλθ-), γίγνομαι (γεν-), πίπτω (πεσ-), πάσχω (παθ-), μανθάνω (μαθ-), εὑρίσκω (εὑρ-), βάλλω (βαλ-), λείπω (λιπ-), τυγχάνω (τυχ-), ἁμαρτάνω (ἁμαρτ-), αἱρέω (ἑλ-), φεύγω (φυγ-), ἀποθνῄσκω (θαν-).

### 8.8 Liquid and nasal verbs (υγρόληκτα, ενρινόληκτα; Εγχειρίδιο units 11-12; S1 ch.24 §§301-309) [A]
- Present stem has -λλ-, -ρρ-?, -ν-, -αιν-, -ειν-, -υν- built from a root + j (βάλλ-ω ← βαλ-j-ω; φαίν-ω ← φαν-j-ω; μένω has no suffix; τέμνω has -ν-; ἐλαύνω has -νυ-). Future **contract in -ῶ** (§8.4); aorist α΄ without σ and with stem lengthening; **perfect active in -κα**: ἤγγελκα, ἔσταλκα, κέκρικα, τέτμηκα, μεμένηκα, νενέμηκα, ἔφθαρκα, ἔσπαρκα, ἦρκα; **perfect M/P**: ἤγγελμαι, ἔσταλμαι, κέκριμαι, ἔφθαρμαι, ἔσπαρμαι, τέταμαι, τέτμημαι, ἦρμαι, and for -αίνω verbs in -ν- the form with σ: **πέφασμαι, πέφανσαι, πέφανται** (S1 §307-308); pass. aor. α΄ ἠγγέλθην, ἐκρίθην, ἐτμήθην, ἤρθην, ἐφάνθην; pass. aor. β΄ ἐστάλην, ἐφάνην, ἐφθάρην, ἐσπάρην.
- Compounded stems lose their stem vowel in certain forms: βάλλω → βέβληκα, ἔβλήθην, βλητέος (stem βλη-); τέμνω → τέτμηκα (τμη-); κάμνω → κέκμηκα (κμη-); τείνω → τέταμαι (τα-). (S1 §309.)
- Trap: *ἔμεινα* not *ἔμενα*; *ἔφηνα* but *ἐπέρανα* (ρ preceding, so ᾱ) [C]; *ἀπέκτεινα* (aorist of ἀποκτείνω), fut *ἀποκτενῶ*, perf *ἀπέκτονα* [C].

### 8.9 Verbs in -μι (β' συζυγία; S1 ch.27-29; Εγχειρίδιο units 14, 16, 17) [A as input (φησιν, παραδιδόασιν, τῶν ὄντων, ἔγνω, γέγονεν); B for the full cell tables]
**Structure (S1 §335):** reduplicating present stem (δί-δω-μι, τί-θη-μι, ἵ-στη-μι, ἵ-η-μι), **no thematic vowel** in the present indicative/impv./inf./ptc. and the imperfect; **strong (long-vowel) stem in the singular active indicative and in the subjunctive, weak (short-vowel) stem elsewhere**: δίδωμι, δίδως, δίδωσι | δίδομεν, δίδοτε, διδόασι(ν). The aorist β' of τίθημι, ἵημι, δίδωμι is a κ-aorist in the singular indicative active (ἔθηκα, ἧκα, ἔδωκα) and a root aorist in the rest (S1 §344).
Verified cell tables (core):
| | δίδωμι (δω-/δο-) | τίθημι (θη-/θε-) | ἵστημι (στη-/στα-) | ἵημι (ἡ-/ἑ-) |
|---|---|---|---|---|
| pres ind. | δίδωμι δίδως δίδωσι(ν) δίδομεν δίδοτε διδόασι(ν) | τίθημι τίθης τίθησι(ν) τίθεμεν τίθετε τιθέασι(ν) | ἵστημι ἵστης ἵστησι(ν) ἵσταμεν ἵστατε ἱστᾶσι(ν) | ἵημι ἵης ἵησι(ν) ἵεμεν ἵετε ἱᾶσι(ν) |
| impf | ἐδίδουν ἐδίδους ἐδίδου ἐδίδομεν ἐδίδοτε ἐδίδοσαν | ἐτίθην ἐτίθεις ἐτίθει ἐτίθεμεν ἐτίθετε ἐτίθεσαν | ἵστην ἵστης ἵστη ἵσταμεν ἵστατε ἵστασαν | ἵην ἵεις ἵει ἵεμεν ἵετε ἵεσαν |
| subj pres | διδῶ διδῷς διδῷ διδῶμεν διδῶτε διδῶσι(ν) | τιθῶ τιθῇς τιθῇ τιθῶμεν τιθῆτε τιθῶσι(ν) | ἱστῶ ἱστῇς ἱστῇ ἱστῶμεν ἱστῆτε ἱστῶσι(ν) | ἱῶ ἱῇς ἱῇ ἱῶμεν ἱῆτε ἱῶσι(ν) |
| opt pres | διδοίην διδοίης διδοίη διδοῖμεν διδοῖτε διδοῖεν | τιθείην τιθείης τιθείη τιθεῖμεν τιθεῖτε τιθεῖεν | ἱσταίην ἱσταίης ἱσταίη ἱσταῖμεν ἱσταῖτε ἱσταῖεν | ἱείην ἱείης ἱείη ἱεῖμεν ἱεῖτε ἱεῖεν |
| imp pres 2sg | δίδου | τίθει | ἵστη | ἵει |
| inf, ptc pres | διδόναι, διδούς | τιθέναι, τιθείς | ἱστάναι, ἱστάς | ἱέναι, ἱείς |
| aor ind | ἔδωκα ἔδωκας ἔδωκε(ν) ἔδομεν ἔδοτε ἔδοσαν | ἔθηκα ἔθηκας ἔθηκε(ν) ἔθεμεν ἔθετε ἔθεσαν | ἔστην ἔστης ἔστη ἔστημεν ἔστητε ἔστησαν | ἧκα ἧκας ἧκε(ν) εἷμεν εἷτε εἷσαν |
| aor subj | δῶ δῷς δῷ δῶμεν δῶτε δῶσι(ν) | θῶ θῇς θῇ θῶμεν θῆτε θῶσι(ν) | στῶ στῇς στῇ στῶμεν στῆτε στῶσι(ν) | ὦ ᾖς ᾖ ὦμεν ἦτε ὦσι(ν) |
| aor opt | δοίην δοίης δοίη δοῖμεν δοῖτε δοῖεν | θείην θείης θείη θεῖμεν θεῖτε θεῖεν | σταίην σταίης σταίη σταῖμεν σταῖτε σταῖεν | εἵην εἵης εἵη εἷμεν εἷτε εἷεν |
| aor imp 2sg | **δός** (compound ἀπόδος) | **θές** (ἀπόθες) | **στῆθι** (ἀνάστηθι) | **ἕς** (ἄφες) |
| aor inf, ptc | δοῦναι, δούς | θεῖναι, θείς | στῆναι, στάς | εἷναι, εἵς |
| aor mid. ind. | ἐδόμην ἔδου ἔδοτο ἐδόμεθα ἔδοσθε ἔδοντο | ἐθέμην ἔθου ἔθετο ἐθέμεθα ἔθεσθε ἔθεντο | (no mid. aor. β') | εἵμην εἷσο εἷτο εἵμεθα εἷσθε εἷντο |
| aor mid. imp 2sg | δοῦ (ἐκδοῦ) | θοῦ (κατάθου) | | οὗ (ἀφοῦ) |
| fut / aor pass / perf | δώσω / ἐδόθην / δέδωκα, δέδομαι | θήσω / ἐτέθην / τέθηκα, κεῖμαι | στήσω / ἐστάθην / ἕστηκα (intrans.) | ἥσω / -εἵθην / -εἷκα, -εἷμαι |
(S1 pp. 222-229 for these tables. Note that **ἔστην is a root aorist in all persons; τίθημι/ἵημι/δίδωμι have κ-aorists in the singular only.** The 2sg impv. aor. of τίθημι/ἵημι/δίδωμι ends in **-ς** (θές, ἕς, δός).)
**Accent of compounds (S1 §345):** imperative aor. β' accent goes up as far as the final syllable of a disyllabic preposition: ἀνά-στηθι, ἀπό-δοτε, κατά-θεσθε, **ἄφ-ες**, ἄφ-ετε, πρόσ-θες, ἔπι-θες; middle 2sg imp: ἐκ-θοῦ, ἀφοῦ, προδοῦ but **κατά-θου**; infinitive and participle keep the simple verb's accent: ἀφ-ιστάναι, προσ-τιθέναι, συν-ιέναι, ἀπο-διδόναι, συν-ιστάς, ἀπο-θέμενος, ἀπο-δούς.
- **δείκνυμι (S1 §§333-337, ch.27 A'):** strong stem δεικνῡ-/weak δεικνῠ-: pres. δείκνυμι, δείκνυς, δείκνυσι(ν), δείκνυμεν, δείκνυτε, **δεικνύασι(ν)**; impf ἐδείκνυν, ἐδείκνυς, ἐδείκνυ, ἐδείκνυμεν, ἐδείκνυτε, ἐδείκνυσαν; subj δεικνύω, δεικνύῃς…; opt δεικνύοιμι…; imp δείκνυ, δεικνύτω, δείκνυτε, δεικνύντων; inf δεικνύναι; ptc δεικνύς, δεικνῦσα, δεικνύν; fut δείξω; aor ἔδειξα; perf δέδειχα, δέδειγμαι; ἐδείχθην. Same type: ζεύγνυμι, ῥήγνυμι, πήγνυμι, μείγνυμι, κατάγνυμι, ἀνοίγνυμι, **ὄμνυμι, ἀπόλλυμι, κεράννυμι, κρεμάννυμι, πετάννυμι, ῥώννυμι, σβέννυμι, ζώννυμι, στρώννυμι, ἀμφιέννυμι** (S1 §333).
- **Other -μι verbs [A/B in Εγχειρίδιο unit 16]:** 
  - **εἰμί** (be): εἰμί, εἶ, ἐστί(ν), ἐσμέν, ἐστέ, εἰσί(ν) | impf ἦν, ἦσθα, ἦν, ἦμεν, ἦτε, ἦσαν | subj ὦ, ᾖς, ᾖ, ὦμεν, ἦτε, ὦσι(ν) | opt εἴην, εἴης, εἴη, εἶμεν (εἴημεν), εἶτε (εἴητε), εἶεν (εἴησαν) | imp ἴσθι, ἔστω, ἔστε, ὄντων / ἔστωσαν | inf εἶναι | ptc ὤν, οὖσα, ὄν | fut ἔσομαι, ἔσῃ / ἔσει, ἔσται, ἐσόμεθα, ἔσεσθε, ἔσονται; inf ἔσεσθαι; ptc ἐσόμενος. (S1 §§274-275.) Enclitic present (except εἶ); ἔστι(ν) accent: ἔστιν at the start / after οὐκ, καί, εἰ, ὡς, ἀλλ᾽ …
  - **εἶμι** (shall go; present with future sense in prose): εἶμι, εἶ, εἶσι(ν), ἴμεν, ἴτε, ἴασι(ν) | impf ᾖα / ᾔειν, ᾔεις / ᾔεισθα, ᾔει(ν), ᾖμεν, ᾖτε, ᾖσαν / ᾔεσαν | subj ἴω, ἴῃς, ἴῃ… | opt ἴοιμι / ἰοίην … | imp **ἴθι**, ἴτω, ἴτε, ἰόντων / ἴτωσαν | inf ἰέναι | ptc ἰών, ἰοῦσα, ἰόν (S1 §351, 2). Compounds: ἔξειμι, εἴσειμι, ἄπειμι, πρόσειμι. Trap: **εἶσι (he goes) ≠ εἰσί (they are)**, **ἴθι ≠ ἴσθι**, **ἰέναι ≠ εἶναι**, **ἰών ≠ ὤν**.
  - **φημί**: φημί, φῄς, φησί(ν), φαμέν, φατέ, φασί(ν) | impf ἔφην, ἔφησθα / ἔφης, ἔφη, ἔφαμεν, ἔφατε, ἔφασαν | subj φῶ, φῇς, φῇ, φῶμεν, φῆτε, φῶσι(ν) | opt **φαίην**, φαίης, **φαίη**, φαῖμεν (φαίημεν), φαῖτε, φαῖεν (φαίησαν) | imp φάθι, φάτω, φάτε | inf φάναι | ptc **φάσκων** in S1 (also φάς, φᾶσα, φάν [C]) | fut φήσω | aor ἔφησα (S1 §351, 3). 2026: φησιν → same person/number optative = **φαίη**. 
  - **οἶδα** (know): οἶδα, οἶσθα, οἶδε(ν), ἴσμεν, ἴστε, ἴσασι(ν) | plup ᾔδειν (ᾔδη), ᾔδεις (ᾔδησθα), ᾔδει(ν), ᾖσμεν (ᾔδεμεν), ᾖστε (ᾔδετε), ᾖσαν (ᾔδεσαν) | subj εἰδῶ, εἰδῇς, εἰδῇ… | opt εἰδείην, εἰδείης, εἰδείη, εἰδεῖμεν… | imp **ἴσθι**, ἴστω, ἴστε | inf εἰδέναι | ptc εἰδώς, εἰδυῖα, εἰδός (gen εἰδότος, εἰδυίας) | fut εἴσομαι / εἰδήσω (S1 §351, 7). 
  - **δέδοικα / δέδια** (fear): δέδοικα / δέδια, δέδοικας / δέδιας, δέδοικε / δέδιε, δεδοίκαμεν / δέδιμεν, δεδοίκατε / δέδιτε, δεδοίκασι / δεδίασι(ν) | plup ἐδεδοίκειν / ἐδέδισαν | subj δεδίω? S1 prints δε-δί-ῃ… | inf δεδοικέναι / δεδιέναι | ptc δεδοικώς / δεδιώς | fut δείσομαι | aor ἔδεισα.
  - **κεῖμαι** (lie, perfect of τίθεμαι): κεῖμαι, κεῖσαι, κεῖται, κείμεθα, κεῖσθε, κεῖνται | impf ἐκείμην, ἔκεισο, ἔκειτο | subj κέωμαι? (S1: κέ-ηται, κέ-ωνται) | opt κέοιτο | imp κεῖσο, κείσθω | inf κεῖσθαι | ptc κείμενος | fut κείσομαι.
  - **κάθημαι** (sit): κάθημαι, κάθησαι (κάθῃ), κάθηται, καθήμεθα, κάθησθε, κάθηνται | impf ἐκαθήμην / καθήμην | subj καθῶμαι | opt καθοίμην | imp κάθησο | inf καθῆσθαι | ptc καθήμενος | fut καθεδοῦμαι.
  - **δύναμαι, ἐπίσταμαι, ἐπαινέω? (no)**: δύναμαι, δύνασαι, δύναται, δυνάμεθα, δύνασθε, δύνανται | impf ἐδυνάμην / ἠδυνάμην, ἐδύνω / ἠδύνω, ἐδύνατο … | subj δύνωμαι, δύνῃ, δύνηται | opt δυναίμην, δύναιο, δύναιτο | imp δύνασο | inf δύνασθαι | ptc δυνάμενος | fut δυνήσομαι | aor ἠδυνήθην / ἐδυνήθην (S1 §347, 5; ἐπίσταμαι same pattern, impf ἠπιστάμην, imp ἐπίστασο, fut ἐπιστήσομαι, aor ἠπιστήθην).
  - **πίμπλημι, πίμπρημι** (compounds ἐμπίπλημι without μ), **ὀνίνημι, ἅγαμαι, κρέμαμαι, ἠμί** (ἦν δ' ἐγώ, ἦ δ' ὅς: only impf. 1sg/3sg), **τέθνηκα** (τέθναμεν, τεθνάναι, τεθνεώς), **βέβηκα** (βεβώς, βεβῶσι), **ἔοικα** (εἴξασι, εἰκώς), **χρή** (χρῆν, χρῇ, χρείη, χρῆναι, τὸ χρεών), **εἵμαρται, πέπρωται** (S1 §351).
- **Root aorists of barytone verbs inflected like -μι (S1 ch.28; Εγχειρίδιο unit 17) [B; 2021 γνῶθι/ζῆθι/τεθνάναι tested them]:** 
  | | ἔβην (βαίνω) | ἔγνων (γιγνώσκω) | ἔδυν (δύω / δύομαι) |
  |---|---|---|---|
  | ind | ἔβην ἔβης ἔβη ἔβημεν ἔβητε ἔβησαν | ἔγνων ἔγνως ἔγνω ἔγνωμεν ἔγνωτε ἔγνωσαν | ἔδυν ἔδυς ἔδυ ἔδυμεν ἔδυτε ἔδυσαν |
  | subj | βῶ βῇς βῇ βῶμεν βῆτε βῶσι(ν) | γνῶ γνῷς γνῷ γνῶμεν γνῶτε γνῶσι(ν) | δύω δύῃς δύῃ δύωμεν δύητε δύωσι(ν) |
  | opt | βαίην βαίης βαίη βαῖμεν βαῖτε βαῖεν | γνοίην γνοίης γνοίη γνοῖμεν γνοῖτε γνοῖεν | δύην (δυίην) … [UNSURE] |
  | imp 2sg | **βῆθι** | **γνῶθι** | **δῦθι** |
  | inf | βῆναι | γνῶναι | δῦναι |
  | ptc | βάς βᾶσα βάν (gen βάντος) | γνούς γνοῦσα γνόν (γνόντος) | δύς δῦσα δύν (δύντος) |
  The same pattern: ἔφθην (φθάνω: φθῶ, φθαίην, φθῆναι, φθάς), ἀπέδραν (ἀποδιδράσκω: δρῶ, δραίην, δρᾶθι, δρᾶναι, δράς), ἐγήρᾱν, ἐρρύην (ῥέω), ἔφυν (φύω), ἐβίων (ζῶ: βιῶ, βιῴην, βιῶναι, βιούς), ἑάλων (ἁλίσκομαι: ἁλῶ, ἁλοίην, ἁλῶναι, ἁλούς), ἔσβην.
  (S1 §§349-350; verified.) Compounds' imperatives: κατάβηθι / κατάβα (UNSURE which Attic prose prefers; S1 prints βῆθι only; avoid composing compound imp. of βαίνω until S1 §345's rules are checked).
- Traps: (1) **singular vs plural stem** (δίδωμι vs δίδομεν; ἵστημι vs ἵσταμεν; θῶ vs θῆτε are long vs short vowel); (2) **ἔθηκα/ἔδωκα/ἧκα are "aorist β'" in S1's language even though they have κ**; (3) the imperfect 3sg ἐδίδου / ἐτίθει / ἵει / ἵστη (contract-style endings); (4) **2sg imperative present τίθει, δίδου, ἵει, ἵστη**; (5) **ὦ, ᾖς, ᾖ (subj. of εἰμί and aor. of ἵημι are identical)**; (6) εἷναι / εἶναι (inf. aor. ἵημι vs εἰμί) — rough breathing vs smooth; (7) τιθέασι(ν), ἱᾶσι(ν), διδόασι(ν), δεικνύασι(ν) are the 3pl presents (S1), not *τιθῶσι*.

### 8.10 Deponents, impersonals, verbs whose tenses differ in meaning (S1 §§359-361) [A/B]
- **Αποθετικά (S1 §360):** μέσα αποθετικά (middle aorist with active sense): αἰσθάνομαι (ᾐσθόμην), ἀσπάζομαι, ἕπομαι (ἑσπόμην), θεάομαι, πυνθάνομαι (ἐπυθόμην), ὑπισχνέομαι (ὑπεσχόμην), φθέγγομαι, μάχομαι (ἐμαχεσάμην), γίγνομαι (ἐγενόμην), ἔρχομαι (ἦλθον), ἀφικνέομαι (ἀφικόμην), διαλέγομαι?; παθητικά αποθετικά (passive aorist with active sense): βούλομαι (ἐβουλήθην), δύναμαι (ἐδυνήθην), διανοοῦμαι (διενοήθην), ἐπιμελοῦμαι (ἐπεμελήθην), οἴομαι (ᾠήθην), ἐναντιοῦμαι (ἠναντιώθην), ἁμιλλῶμαι; μεικτά αποθετικά (both aorists, different sense): αἰτιῶμαι (ᾐτιασάμην accused / ᾐτιάθην was accused), βιάζομαι, δωροῦμαι, ἐργάζομαι (εἰργασάμην / εἰργάσθην), ἰῶμαι, κτῶμαι (ἐκτησάμην / ἐκτήθην), μιμοῦμαι, χρῶμαι (ἐχρησάμην / ἐχρήσθην), ὠνοῦμαι (ἐπριάμην / ἐωνήθην).
- **Tenses with unexpected meaning (S1 §359):** ἥκω = I have come (ἥξω, ἧκον = I had come); οἴχομαι = I have gone; οἶδα, δέδοικα, ἔοικα, εἴωθα (perfect = present); ἕστηκα = I stand; κέκτημαι = I possess; μέμνημαι = I remember; τέθνηκα = I am dead; πέφυκα = I am by nature; passive aorists with middle sense (ᾐσχύνθην, ἐφοβήθην, ἐπορεύθην, ὡρμήθην); middle futures with passive sense.
- **Impersonal verbs (S1 §361):** δεῖ, χρή, προσήκει, δοκεῖ, μέλει, μεταμέλει, μέτεστι, ἔνεστι, ἔξεστι, εἵμαρται, πέπρωται; and passives of verbs of saying with infinitive subject: λέγεται, ὁμολογεῖται, ἀγγέλλεται…
- Exam examples of impersonal: 2026 "ἐξῆν … ἀδικεῖν" (Lysias), 2024 "ἐκπίπτοιεν"… 

### 8.11 Verbal adjectives (ρηματικά επίθετα) [B]
- **-τός** (what can/has been done: λυτός, ποιητός, γραπτός, ἀκουστός, ὁρατός, αἱρετός, θετός, δοτός, στατός, ληπτός, ἰτός) and **-τέος, -τέα, -τέον** (what must be done; with the dative of the agent): λυτέος, ποιητέος, πρακτέος, γραπτέος, ἀκτέος (ἄγω), αἱρετέος, ληπτέος, οἰστέος (φέρω), ἰτέον (εἶμι), σκεπτέον (σκοπέω), πειστέον (πείθομαι), ἀφελητέον. Neuter singular -τέον (impersonal, accusative of the person with ἐστί omitted: "ποιητέον ἐστί σοι"). Stem for both = the verbal stem of the passive aorist/perfect (S1 ch.33 §§…, and the catalogue gives them under "Ρηματ. επίθ."). 

### 8.12 Principal parts: the school catalogue ("Κατάλογος ανώμαλων ρημάτων", S1 Παράρτημα pp. 293-314) [A]
Format: present — future — aorist — perfect act. — perfect M/P — aorist pass. (S1's own forms; [C] rows are my additions of very common regular verbs, not taken from S1). **This list is the mandatory "αρχικοί χρόνοι" set of the app.**
| # | Present | Future | Aorist | Perf. act. | Perf. M/P | Aor. pass. | Notes |
|---|---|---|---|---|---|---|---|
| 1 | ἄγω | ἄξω | ἤγαγον (β΄) | ἦχα (μτγν. ἀγήοχα) | ἦγμαι | ἤχθην | imperf ἦγον; fut mid ἄξομαι; fut pass ἀχθήσομαι; mid aor β΄ ἠγαγόμην; imp aor β΄ ἄγαγε |
| 2 | αἱρέω -ῶ | αἱρήσω | εἷλον | ᾕρηκα | ᾕρημαι | ᾑρέθην | mid αἱροῦμαι: αἱρήσομαι, εἱλόμην; passive also ἁλίσκομαι |
| 3 | αἴρω | ἀρῶ | ἦρα | ἦρκα | ἦρμαι | ἤρθην | mid ἀροῦμαι, ἠράμην |
| 4 | αἰσθάνομαι | αἰσθήσομαι | ᾐσθόμην | — | ᾔσθημαι | — | |
| 5 | ἀκούω | ἀκούσομαι | ἤκουσα | ἀκήκοα | — | ἠκούσθην | plup ἠκηκόειν |
| 6 | ἁλίσκομαι | ἁλώσομαι | ἑάλων / ἥλων | ἑάλωκα / ἥλωκα | — | — | subj ἁλῶ, ptc ἁλούς, inf ἁλῶναι |
| 7 | ἁμαρτάνω | ἁμαρτήσομαι | ἥμαρτον | ἡμάρτηκα | — | ἡμαρτήθη | |
| 8 | ἀναλίσκω | ἀναλώσω | ἀνήλωσα | ἀνήλωκα | ἀνήλωμαι | ἀνηλώθην | |
| 9 | ἀποθνῄσκω | ἀποθανοῦμαι | ἀπέθανον | τέθνηκα | — | — | fut perf τεθνήξω |
| 10 | ἀπόλλυμι | ἀπολῶ | ἀπώλεσα | ἀπολώλεκα | — | — | mid ἀπόλλυμαι: ἀπολοῦμαι, ἀπωλόμην, ἀπόλωλα |
| 11 | ἀφικνέομαι -οῦμαι | ἀφίξομαι | ἀφικόμην | — | ἀφῖγμαι | — | |
| 12 | βαίνω | βήσομαι | ἔβην | βέβηκα | -βέβαμαι | -εβάθην | |
| 13 | βάλλω | βαλῶ | ἔβαλον | βέβληκα | βέβλημαι | ἐβλήθην | fut pass βληθήσομαι; mid aor β΄ ἐβαλόμην |
| 14 | βούλομαι | βουλήσομαι | — | — | βεβούλημαι | ἐβουλήθην / ἠβουλήθην | imperf ἐβουλόμην / ἠβουλόμην |
| 15 | γίγνομαι | γενήσομαι | ἐγενόμην | γέγονα / γεγένημαι | — | — | dep.; imp γενοῦ |
| 16 | γιγνώσκω | γνώσομαι | ἔγνων | ἔγνωκα | ἔγνωσμαι | ἐγνώσθην | |
| 17 | δάκνω | δήξομαι | ἔδακον | — | δέδηγμαι | ἐδήχθην | |
| 18 | δέω (need) / δέομαι | δεήσω / δεήσομαι | ἐδέησα | δεδέηκε | δεδέημαι | ἐδεήθην | δεῖ, ἔδει |
| 19 | δοκέω -ῶ | δόξω | ἔδοξα | (δέδοκται) | | | δοκεῖ |
| 20 | ἐγείρω | ἐγερῶ | ἤγειρα | ἐγρήγορα (β΄, "am awake") | ἐγήγερμαι | ἠγέρθην | mid aor β΄ ἠγρόμην |
| 21 | ἐθέλω | ἐθελήσω | ἠθέλησα | ἠθέληκα | — | — | |
| 22 | ἐλαύνω | ἐλῶ | ἤλασα | ἐλήλακα | ἐλήλαμαι | ἠλάθην | |
| 23 | ἔρχομαι | (εἶμι) | ἦλθον | ἐλήλυθα | — | — | imperf ᾖα / ᾔειν; imp ἐλθέ |
| 24 | ἐρωτάω -ῶ | ἐρωτήσω / ἐρήσομαι | ἠρώτησα / ἠρόμην | ἠρώτηκα | ἠρώτημαι | ἠρωτήθην | |
| 25 | ἐσθίω | ἔδομαι | ἔφαγον | ἐδήδοκα | -εδήδεσμαι | — | imperf ἤσθιον |
| 26 | εὑρίσκω | εὑρήσω | ηὗρον / εὗρον | ηὕρηκα / εὕρηκα | εὕρημαι | ηὑρέθην / εὑρέθην | imp εὑρέ |
| 27 | ἔχω | ἕξω / σχήσω | ἔσχον | ἔσχηκα | -έσχημαι | — | imperf εἶχον; mid aor ἐσχόμην |
| 28 | ζῶ | ζήσω / βιώσομαι | ἐβίων | βεβίωκα | βεβίωται | — | ζῇς ζῇ, ἔζων |
| 30 | κάμνω | καμοῦμαι | ἔκαμον | κέκμηκα | — | — | |
| 31 | καλέω -ῶ | καλῶ | ἐκάλεσα | κέκληκα | κέκλημαι | ἐκλήθην | fut pass κληθήσομαι |
| 32 | κλέπτω | κλέψω / κλέψομαι | ἔκλεψα | κέκλοφα | κέκλεμμαι | ἐκλάπην | |
| 33 | λαγχάνω | λήξομαι | ἔλαχον | εἴληχα | εἴληγμαι | ἐλήχθην | |
| 34 | λαμβάνω | λήψομαι | ἔλαβον | εἴληφα | εἴλημμαι | ἐλήφθην | fut pass ληφθήσομαι; mid aor β΄ ἐλαβόμην; imp λαβέ |
| 35 | λανθάνω | λήσω | ἔλαθον | λέληθα | — | — | |
| 36 | λέγω | λέξω / ἐρῶ | ἔλεξα / εἶπον (εἶπα) | εἴρηκα | λέλεγμαι / εἴρημαι | ἐλέχθην / ἐρρήθην | fut pass λεχθήσομαι / ῥηθήσομαι; imp εἰπέ |
| 37 | λείπω | λείψω | ἔλιπον | λέλοιπα | λέλειμμαι | ἐλείφθην | |
| 38 | μανθάνω | μαθήσομαι | ἔμαθον | μεμάθηκα | — | — | |
| 39 | μάχομαι | μαχοῦμαι | ἐμαχεσάμην | — | μεμάχημαι | — | |
| 40 | μένω | μενῶ | ἔμεινα | μεμένηκα | — | — | |
| 41 | (ἀνα)μιμνήσκω / μιμνήσκομαι | -μνήσω / -μνήσομαι | -έμνησα | — | μέμνημαι | ἐμνήσθην | μνησθήσομαι |
| 42 | νέμω | νεμῶ | ἔνειμα | νενέμηκα | νενέμημαι | ἐνεμήθην | |
| 43 | οἴομαι / οἶμαι | οἰήσομαι | — | — | — | ᾠήθην | imperf ᾤμην / ᾠόμην |
| 44 | ὄμνυμι | ὀμοῦμαι | ὤμοσα | ὀμώμοκα | ὀμώμο(σ)μαι | ὠμό(σ)θην | |
| 45 | ὁράω -ῶ | ὄψομαι | εἶδον | ἑόρακα / ἑώρακα | ἑώραμαι / ὦμμαι | ὤφθην | imperf ἑώρων; fut pass ὀφθήσομαι; imp ἰδέ; mid aor β΄ -ειδόμην |
| 46 | ὀφείλω | ὀφειλήσω | ὠφείλησα / ὦφλον | ὠφείληκα | — | ὠφειλήθην | |
| 47 | πάσχω | πείσομαι | ἔπαθον | πέπονθα | — | — | |
| 48 | πείθω | πείσω | ἔπεισα | πέπεικα | πέπεισμαι | ἐπείσθην | pf β΄ πέποιθα (trust); mid πείθομαι: πείσομαι, ἐπιθόμην; fut pass πεισθήσομαι |
| 49 | πίνω | πίομαι | ἔπιον | πέπωκα | πέπομαι | ἐπόθην | |
| 50 | πίπτω | πεσοῦμαι | ἔπεσον | πέπτωκα | — | — | |
| 51 | πλήττω (ἐκπλήττω) | ἐκπλήξω | ἐξέπληξα | — | ἐκπέπληγμαι | ἐξεπλάγην | fut pass ἐκπλαγήσομαι; simple πλήττω: ἐπλήγην |
| 52 | πυνθάνομαι | πεύσομαι | ἐπυθόμην | — | πέπυσμαι | — | |
| 53 | στρέφω | στρέψω | ἔστρεψα | — | ἔστραμμαι | ἐστράφην | fut pass στραφήσομαι |
| 54 | σκοπέω -ῶ / σκοπέομαι | σκέψομαι | ἐσκεψάμην | — | ἔσκεμμαι | — | |
| 55 | τείνω | τενῶ | ἔτεινα | -τέτακα | τέταμαι | -ετάθην | |
| 56 | τέμνω | τεμῶ | ἔτεμον | τέτμηκα | τέτμημαι | ἐτμήθην | |
| 57 | τίκτω | τέξομαι | ἔτεκον | τέτοκα | — | — | |
| 58 | τρέπω | τρέψω | ἔτρεψα (ποιητ. ἔτραπον) | τέτροφα | τέτραμμαι | ἐτράπην / ἐτρέφθην | mid aor ἐτρεψάμην / ἐτραπόμην |
| 59 | τρέφω | θρέψω | ἔθρεψα | (ποιητ.) τέτροφα | τέθραμμαι | ἐτράφην | |
| 60 | τρέχω | δραμοῦμαι | ἔδραμον | δεδράμηκα | — | — | |
| 61 | τυγχάνω | τεύξομαι | ἔτυχον | τετύχηκα | — | — | |
| 62 | φαίνω | φανῶ | ἔφηνα | -πέφαγκα (act.) / πέφηνα (β΄, mid.) | πέφασμαι | ἐφάνθην (pass.) / ἐφάνην (appeared) | mid φαίνομαι: φανοῦμαι, φανήσομαι; imp φάνηθι |
| 63 | φέρω | οἴσω | ἤνεγκα / ἤνεγκον | ἐνήνοχα | ἐνήνεγμαι | ἠνέχθην | fut pass οἰσθήσομαι / ἐνεχθήσομαι; mid οἴσομαι, ἠνεγκάμην |
| 64 | φεύγω | φεύξομαι | ἔφυγον | πέφευγα | — | — | |
| 65 | φθάνω | φθήσομαι | ἔφθασα / ἔφθην | — | — | — | |
| 66 | φθείρω | φθερῶ | ἔφθειρα | ἔφθαρκα | ἔφθαρμαι | ἐφθάρην | |
| 67 | φύω | φύσω (ποιητ.) | ἔφῡσα | πέφυκα (β΄) | — | ἔφυν (aor β΄ "was born") | |
| 68 | χαίρω | χαιρήσω | — | γέγηθα (ποιητ.) | — | ἐχάρην | |
| 69 | χρῶμαι | χρήσομαι | ἐχρησάμην | — | κέχρημαι | ἐχρήσθην | S1 lists the perfect as κέχρημαι (acts as 'I have used') |
| 70 | ὠθέω -ῶ | ὤσω | ἔωσα | — | -έωσμαι | ἐώσθην | |
| 71 | ὠνέομαι -οῦμαι | ὠνήσομαι | ἐπριάμην | ἐώνημαι | — | ἐωνήθην | |
| 72 | ἐπιμελέομαι | ἐπιμελήσομαι | — | — | ἐπιμεμέλημαι | ἐπεμελήθην | fut pass ἐπιμεληθήσομαι |
| 73 | ἐπιλανθάνομαι | ἐπιλήσομαι | ἐπελαθόμην | — | ἐπιλέλησμαι | — | |
| 74 | ἕπομαι | ἕψομαι | ἑσπόμην | — | — | — | |
| 75 | ἄχθομαι | ἀχθέσομαι | — | — | — | ἠχθέσθην | |
| 76 | ἥδομαι | ἡσθήσομαι | — | — | — | ἥσθην | |
| 77 | καθίζω | καθιῶ | ἐκάθισα | — | — | — | |
| 78 | καθέζομαι | καθεδοῦμαι | — | — | — | — | |
| 79 | ποιέω -ῶ [C] | ποιήσω | ἐποίησα | πεποίηκα | πεποίημαι | ἐποιήθην | |
| 80 | τιμάω -ῶ [C] | τιμήσω | ἐτίμησα | τετίμηκα | τετίμημαι | ἐτιμήθην | |
| 81 | δηλόω -ῶ [C] | δηλώσω | ἐδήλωσα | δεδήλωκα | δεδήλωμαι | ἐδηλώθην | |
| 82 | ἀδικέω -ῶ [C] | ἀδικήσω | ἠδίκησα | ἠδίκηκα | ἠδίκημαι | ἠδικήθην | mid fut ἀδικήσομαι (be wronged) |
| 83 | κομίζω [C] | κομιῶ | ἐκόμισα | κεκόμικα | κεκόμισμαι | ἐκομίσθην | |
| 84 | πράττω [C] | πράξω | ἔπραξα | πέπραχα / πέπραγα | πέπραγμαι | ἐπράχθην | |
| 85 | γράφω [C] | γράψω | ἔγραψα | γέγραφα | γέγραμμαι | ἐγράφην | fut pass γραφήσομαι |
| 86 | πέμπω [C] | πέμψω | ἔπεμψα | πέπομφα | πέπεμμαι | ἐπέμφθην | |
| 87 | κρίνω [C] | κρινῶ | ἔκρινα | κέκρικα | κέκριμαι | ἐκρίθην | |
| 88 | ἀγγέλλω [C] | ἀγγελῶ | ἤγγειλα | ἤγγελκα | ἤγγελμαι | ἠγγέλθην | |
| 89 | στέλλω [C] | στελῶ | ἔστειλα | ἔσταλκα | ἔσταλμαι | ἐστάλην | |
| 90 | ἀποκρίνομαι [C] | ἀποκρινοῦμαι | ἀπεκρινάμην | — | — | ἀπεκρίθην | |
| 91 | κελεύω | κελεύσω | ἐκέλευσα | κεκέλευκα | κεκέλευσμαι | ἐκελεύσθην | |
| 92 | παύω | παύσω | ἔπαυσα | πέπαυκα | πέπαυμαι | ἐπαύθην / ἐπαύσθην | |
| 93 | δείκνυμι | δείξω | ἔδειξα | δέδειχα | δέδειγμαι | ἐδείχθην | |
| 94 | δίδωμι | δώσω | ἔδωκα | δέδωκα | δέδομαι | ἐδόθην | aor mid. ἐδόμην; fut pass δοθήσομαι |
| 95 | τίθημι | θήσω | ἔθηκα | τέθηκα / τέθεικα | τέθειμαι / κεῖμαι | ἐτέθην | aor mid. ἐθέμην; fut pass τεθήσομαι |
| 96 | ἵστημι | στήσω | ἔστησα (trans.) / ἔστην (intrans.) | ἕστηκα (intrans.) | — | ἐστάθην | fut pass σταθήσομαι; fut perf ἑστήξω |
| 97 | ἵημι | ἥσω | ἧκα | -εἷκα | -εἷμαι | -εἵθην | mid aor β΄ -εἵμην |
| 98 | εἰμί | ἔσομαι | — | — | — | — | |
| 99 | εἶμι | — | — | — | — | — | |
| 100 | φημί | φήσω | ἔφησα | — | — | — | |
| 101 | οἶδα | εἴσομαι / εἰδήσω | — | — | — | — | plup ᾔδη |
(Additional rows in S1 that are NOT in this list but worth adding for the course: δύναμαι, ἐπίσταμαι, κεῖμαι, κάθημαι, πίμπλημι, πίμπρημι, ὀνίνημι, δέδοικα, ἔοικα, μέμνημαι, κέκτημαι (κτάομαι), χράω, χρή, δεῖ, μέλει, μέλλω, σπένδω, σβέννυμι, ῥήγνυμι, πήγνυμι, ζεύγνυμι, μείγνυμι, κεράννυμι, κρεμάννυμι, ἀνοίγω, ἀνοίγνυμι.)
Row numbers are for reference only; rows 93-101 (the -μι verbs and εἰμί/εἶμι/φημί/οἶδα) are given in full in §8.9.

### 8.13 What students typically get wrong in verbs (analysis from the rules and from past-paper structure; not measured data)
1. **Augment placement in compounds** (the exam's favourite hidden step): ἐξελάσαντες, περιοικοῦσι, ἐπισκοπεῖν, καταβαίνοντες. The augment goes after the preposition; ἐκ- becomes ἐξ-; π.χ. ἐπεσκόπει not ἐπισκόπει.
2. **Accent of 2sg imperative aorist β΄** (σχές, ἔξευρε, διάλαβε, ἰδέ, εἰπέ, ἐλθέ, λαβέ) and of **infinitives/participles** in passive/middle aorists (λυθῆναι / λύσασθαι; λυθείς).
3. **Confusing the mood by accent**: λῦσαι (aor. inf. act. and aor. imp. mid. 2sg) vs λύσαι (opt. 3sg act.); **ποιεῖ vs ποίει**; φιλεῖ vs φίλει; εἰπέ vs εἶπε; the checker must accept ONLY the right accent on a bench of "accent-critical pairs" (§10).
4. **Subjunctive vs indicative** in -έω and in -ω presents: ποιῇς vs ποιεῖς; λύῃ vs λύει (ῃ vs ει).
5. **Perfect passive of stop stems** (πέπρακται, γέγραπται, πέπεισται, λέλεκται; πεπράχθω), and **the 3pl periphrasis**.
6. **Future types**: κομιῶ / ἀφανιεῖν / μενῶ / ἐλῶ / ὄψομαι / λήψομαι / γνώσομαι / ἀποθανοῦμαι: students add -σω regularly.
7. **Optative endings**: -οιμι, -σαιμι, **-ειας / -ειε / -ειαν (1st aor. act.)** and **-θείην** for the passive aorist (λυθεῖεν for 3pl).
8. **Participle declension**: fem -ουσα / -ασα / -εισα (λύουσα, λύσασα, λυθεῖσα) and **gen pl fem circumflex** λυουσῶν / λυσασῶν; neuter stem with -ντ- (λύοντος); perfect -κότος, fem -κυίας.
9. **Aorist β΄ forms built with the aorist α΄ sigma** (*ἔλαβσα*), or imperfect confusion (ἔλαβον vs ἐλάμβανον).
10. **Contracted forms**: -ῶ / -ᾷς / -ᾷ vs -οῦσι; ζῇς not *ζᾷς*; πεινῇς.
11. **-μι verbs**: forgetting the long vowel in the singular (δίδως not *δίδοις*? not an error in the app but exam: διδοῖς appears in contracts); 3pl τιθέασι; imperative δός / θές / ἕς; subjunctive διδῶ.
12. **Deponents**: giving an active or passive form for a deponent (γίγνομαι → ἐγενόμην, not *ἐγενήθην*) and deponents whose aorist is passive (βούλομαι → ἐβουλήθην, **οἴομαι → ᾠήθην** (Sept 2024: ᾠήθην → inf **οἰηθῆναι**)).
13. **Verbs with two aorists with different meaning** (φαίνομαι: ἐφάνην appeared / ἐφάνθην was shown) and **two perfects** (πέπεικα / πέποιθα).

---

## 9. Verified test vectors (use them as regression tests for the form generator)
Format: lemma/form in the passage → instruction → expected answer (accepted alternatives in brackets). **[X]** = taken from the paper named, answer checked against S1 rules; **[S1]** = copied from a paradigm printed in S1; **[D]** = derived by me from S1 rules (flag for a human check before shipping).

*Verbs, same-form instructions (the 2019-2026 style)*
1. [2025] φανῆναι → 2sg imperative, same tense and voice → **φάνηθι** (passive aor. β΄, S1 §315).
2. [2025] ἰδεῖν → nom sg fem future participle, same voice → **ὀψομένη** (S1 §359,3 + ὁράω row).
3. [2025] ἐπισκοπεῖν → 3sg imperfect, same voice → **ἐπεσκόπει**.
4. [2025] ἄξω → 1pl subjunctive aor. β΄, same voice → **ἀγάγωμεν** (S1 ἄγω: ἤγαγον).
5. [2023] ἔχειν → 2sg imperative aor. β΄ → **σχές** (S1 §314).
6. [2023] καταβαίνοντες → future, same form → **καταβησόμενοι** (βήσομαι).
7. [2023] ἐπιμεληθῆναι → participle masc gen pl, same tense and voice → **ἐπιμεληθέντων**.
8. [2026] διαβεβλημένος → 2sg imperative passive aorist → **διαβλήθητι**.
9. [2026] ἀφανίζειν → future infinitive → **ἀφανιεῖν** (S1 §295).
10. [2026] φησιν → optative present, same person/number → **φαίη** (S1 §351,3).
11. [2026] περιοικοῦσι → imperfect, same person/number → **περιῴκουν**.
12. [2024] ἔπεισε → perfect, same form → **πέπεικε(ν)**; ψηφισαμένων → **ἐψηφισμένων**; πλεύσας → **πεπλευκώς**; κατῆγεν → **κατῆχε(ν)** (key also ἀγήοχε).
13. [Sept 2024] ᾠήθην → infinitive same tense → **οἰηθῆναι**; ἐξευρεῖν → 2sg imperative → **ἔξευρε**; τολμῆσαι → 3pl optative present → **τολμῷεν (τολμῴησαν)** (S1 §324); οἴσω → 3sg perfect → **ἐνήνοχε(ν)**; περιιδεῖν → 2pl future indicative same voice → **περιόψεσθε** [UNSURE about the committee's treatment of "same voice" for a middle future; accept περιόψεσθε].
14. [Sept 2025] ἐξελάσαντες → 3sg future ind. → **ἐξελᾷ**; σῶσαι → passive aor. infinitive → **σωθῆναι**; πέπρακται → 2sg imperative perfect same voice → **πέπραξο**; διαλαβόντες → 2sg imperative aor. β΄ → **διάλαβε**; παραδιδόασιν → same form in aor. β΄ → **παρέδοσαν** (accept παρέδωκαν).
15. [2021] ἔγνω → **γνῶθι**; ζῆν → **ζῆ / ζῆθι**; τεθνάναι → **τεθνηκὼς / τεθνεὼς ἴσθι**.
16. [2020] ἐκλιπούσας → 2sg impf. **ἐξέλειπες**; εἰσελθούσας → **εἰσῄεις (εἰσῄεισθα)**; καταδαπανηθείσας → **κατεδαπανῶ** [D].
17. [2013] ἐπράχθη → 3sg imperative perfect → **πεπράχθω**; [2015] κατεστρέφοντο → **κατεστράφθω** [D].
18. [2012] κρατήσωμεν → 2sg imperative present → **κράτει**; ἔχουσιν → 1sg optative aor. β΄ → **σχοίην**; μνήσθητε → 3pl indicative of the same tense → **ἐμνήσθησαν** [D]; [2010] γίγνεσθαι → 1pl optative aor. β΄ → **γενοίμεθα**.
*Nominals*
19. [2025] γυναῖκας → gen sg **γυναικός**; φύσει → **φύσεως**; σῶμα → **σώματος**; καθαρότητι → **καθαρότητος**.
20. [2024] πλῆθος → dat pl **πλήθεσι(ν)**; ἐλπίδων → dat sg **ἐλπίδι**; ὑπαρχουσῶν → masc **ὑπαρχόντων**; ἑαυτοῦ → acc pl fem 2nd pers. **ὑμᾶς αὐτάς**; ἰδίαν → **ἰδιαιτέραν (ἰδιωτέραν)**; πολλά → **πλεῖστα**.
21. [2023] τὸ ἄστυ → nom pl **τὰ ἄστη**; ἀγεννής → gen sg **ἀγεννοῦς**; ὅστις → **οἵτινες**; ῥᾷστον → positive **ῥᾴδιον**, comparative **ῥᾷον**; πάλαι → **παλαίτερον**.
22. [2020] τις → dat pl **τισί(ν)**; πρόσοδος → nom pl **πρόσοδοι**; πολίτης → voc sg **ὦ πολῖτα**; θᾶττον → **ταχέως**, **τάχιστα**.
23. [Sept 2024] αἰσχράν → comparative **αἰσχίονα / αἰσχίω** (or αἰσχροτέραν) [S1 lists αἰσχίων only]; ῥᾳδίως → superlative **ῥᾷστα**; τῶν ὄντων → dat pl **τοῖς οὖσι(ν)**; μνᾶς → nom pl **μναῖ**; τοιαῦτα → gen pl fem **τοιούτων**.
24. [2014] ὑμᾶς → acc sg 3rd person **αὐτόν**; πόρρω → superlative **πορρωτάτω**; ἀγαθῶν (adv.) → positive **εὖ**; αὑτὰς → gen pl 2nd person **ὑμῶν αὐτῶν**; ἡγεμόνα → dat pl **ἡγεμόσι(ν)**.
25. [2011/2015/2016] κρείττονος → acc pl fem **κρείττονας / κρείττους**; ὅ τι → gen sg **οὗτινος / ὅτου**; μάλιστα → positive **μάλα**; οὐδείς → gen sg fem **οὐδεμιᾶς**; εὐδαίμων → voc sg fem **εὔδαιμον**.
26. [2012/2013] ἀγών → acc pl **ἀγῶνας**; ναυσίν → voc sg **ναῦ**; ὕβρει → acc sg **ὕβριν**; τινων → acc sg fem **τινά**.
*Systematic bench (S1 paradigms)*
27. 3rd decl: ὁ ἀνήρ → gen **ἀνδρός**, dat pl **ἀνδράσι(ν)**, voc **ἄνερ**; ὁ πατήρ → gen pl **πατέρων**, dat pl **πατράσι(ν)**; ἡ ναῦς → gen **νεώς**, nom pl **νῆες**, gen pl **νεῶν**; ὁ Ζεύς → **Διός, Διί, Δία, ὦ Ζεῦ**; τὸ γένος → gen pl **γενῶν**; ἡ πόλις → gen **πόλεως**, gen pl **πόλεων**, voc **ὦ πόλι**; ὁ βασιλεύς → nom pl **βασιλεῖς**, dat pl **βασιλεῦσι(ν)**; ὁ βοῦς → acc pl **βοῦς**; ὁ γέρων → dat pl **γέρουσι(ν)**; ἡ χάρις → acc **χάριν**; ὁ παῖς → gen pl **παίδων**.
28. Comparison: μέγας → μείζων, μέγιστος; πολύς → πλείων, πλεῖστος; ἀγαθός → ἀμείνων / βελτίων / κρείττων / λῴων; ταχύς → θάττων, τάχιστος; καλός → καλλίων, κάλλιστος; μικρός → ἐλάττων, ἐλάχιστος; ὀλίγος → μείων; εὖ → ἄμεινον, ἄριστα; μάλα → μᾶλλον, μάλιστα.
29. -μι: δίδωμι → aor. imp. **δός**, aor. inf. **δοῦναι**, aor. ptc. **δούς**; τίθημι → **θές, θεῖναι, θείς**; ἵστημι → aor. imp. **στῆθι**; ἵημι → **ἕς, εἷναι, εἵς**; οἶδα → imp. **ἴσθι**, inf. **εἰδέναι**, ptc. **εἰδώς**; εἰμί → imp. **ἴσθι**, ptc **ὤν**; εἶμι → imp. **ἴθι**, inf. **ἰέναι**; φημί → inf. **φάναι**.
30. Contract: ποιέω → imp. **ποίει**; τιμάω → impf. 3sg **ἐτίμα**, opt. 3pl **τιμῷεν**; δηλόω → ptc. fem **δηλοῦσα**, inf. **δηλοῦν**; ζῶ → 3sg **ζῇ**.

## 10. Implementation notes for the Gnothi builders (everything from the Carpe pipeline applies, plus what Greek adds)

**10.1 Answer checking (the "ignore accents but not letters" rule)** 
- Normalisation for a lenient comparison: Unicode NFD; remove combining accents (U+0300 grave, U+0301 acute, U+0342 circumflex/perispomeni), breathings (U+0313, U+0314), diaeresis (U+0308), macron/breve (U+0304, U+0306, which S1 prints on ᾱ ῑ ῡ ᾰ ῐ ῠ), and iota subscript (U+0345); lowercase; fold final sigma ς → σ; strip movable ν in brackets: accept φησί(ν)/φησί; ignore the apostrophe of elision (’, ᾿) and the coronis; fold θάλαττα/θάλασσα, ἔλαττον/ἔλασσον, θάρρος/θάρσος, ξύν/σύν, ἐς/εἰς, αἰεί/ἀεί, via an alias list, because the exam texts (Oxford editions) print the Thucydidean spellings while the school grammar prints the Attic ones.
- **Accent-critical pairs: the lenient comparison becomes wrong when two different grammatical forms differ only in accent/breathing/subscript.** Build a list from the lemma table automatically: for every pair (formA, formB) with the same stripped string but different (lemma, cell), flag the stripped string. For flagged strings the checker must require the exact polytonic form (or the answer UI must offer the accented variants as choices). Examples in the exam-relevant system (non-exhaustive): ποιεῖ / ποίει · φιλεῖ / φίλει · τιμᾷ / τίμα · λῦσαι (aor. inf. act. = aor. imp. mid.) / λύσαι (aor. opt. act.) · εἶπε(ν) / εἰπέ · ἔλαβε / λαβέ · ἦλθε / ἐλθέ · εἶδε / ἰδέ · ἔσχε / σχές · ἦγε / ἄγε · εἶσι (εἶμι) / εἰσί (εἰμί) · εἶ (εἰμί or εἶμι) / εἰ · ἴσθι (εἰμί or οἶδα) · ἦν (εἰμί) / ἥν (rel.) · ἡ / ἥ / ᾗ · οἱ / οἵ · ὁ / ὅ · ὦ / ὧ / ᾧ · ᾖ (subj. εἰμί) / ᾗ (rel. dat.) · ὄν / ὤν / ὅν / ὧν · τίς / τις · πῶς / πως · ποῦ / που · ποτέ / πότε · ἄρα / ἆρα · ἄν / ἐάν / ἦν · οὐ / οὗ / οὖ · ἵστη (pres. imp.) / ἔστη (aor.). In the stage "accent matters" the answer UI should be tile-based (pick a ready-made polytonic form) rather than free typing; for free typing accept monotonic input and give the accent as a **second micro-step** ("τόνισε τον τύπο").
- Typing polytonic Greek on a phone is unrealistic: tiles, multiple choice, and an accent/breathing picker are the right interaction. **Do not make the student type polytonic characters** except in an optional "expert mode".
- Fonts: choose one that has full polytonic coverage (Gentium Plus, Alegreya, Cardo, Noto Serif/GFS Didot variants) [C, to be verified on the build]. The polytonic characters used in S1 include ᾱ ᾰ ῑ ῐ ῡ ῠ (macron/breve), ᾳ ῃ ῳ, ἀ ἁ ἂ ἃ ἄ ἅ ἆ ἇ …, ῥ ῤ, and the apostrophe ’.

**10.2 Data model**
- `lemma`: {id, pos, class, principal parts (§8.12), gender/article, stem(s), irregular overrides, src (S1 §, exam year if seen), status (book/exam/general/unsure)}.
- Generators (JS, pure): regular nominal classes (1st, 2nd, contract, 3rd by stem type), adjectives (3 classes + participles), comparison (regular rules + irregular table), verbs (augment/reduplication, ending tables, formation rules for liquid/stop/vowel/contract stems), -μι (explicit tables for δίδωμι, τίθημι, ἵστημι, ἵημι, δείκνυμι, εἰμί, εἶμι, φημί, οἶδα, root aorists). **Each generator must reproduce every paradigm that S1 prints**; the PDF text is local (`research/source-data/oikonomou-grammar.txt`) so a script can diff generated forms against S1 tables to catch errors. Use the 30 test-vector groups in §9 as unit tests.
- Item types (same as Carpe): (1) one-form transformation exactly as in §1.6 (the exam's own sentence shape); (2) recognise/match (Στήλη Α/Β); (3) principal-parts completion (give 3 of 6); (4) number/case change of a whole phrase (2022, 2026 style); (5) accent micro-step; (6) guess-first opener (let the student predict the aorist of λαμβάνω before showing ἔλαβον); (7) apply-the-rule to unseen lemma (e.g. fold a new -ντ stem into the γίγας pattern); (8) sort yes/no (is this form aorist β΄? is it 3rd decl.?); (9) timed round "Αγορά".
- **Mine the exam passages:** the unseen texts 2008-2026 (public domain Attic prose) are the natural corpus for sentences; the translations/keys are NOT to be copied (copyright of the committees/tutoring centres). Keep raw papers in gitignored `research/pastpapers-raw/`.

**10.3 Hooks from Modern Greek for a Greek student** [C]
- **Aorists survive**: έβαλα ← ἔβαλον, είπα ← εἶπον, είδα ← εἶδον, έφαγα ← ἔφαγον, έμαθα ← ἔμαθον, έπεσα ← ἔπεσον, έπαθα ← ἔπαθον, ήπια ← ἔπιον, ήρθα ← ἦλθον, βρήκα ← ηὗρον, έτυχα; the passive aorist -θηκα ← -θην (λύθηκα ← ἐλύθην).
- **Contracts**: αγαπώ, τιμώ, μιλώ, ποιώ, φορώ, μπορώ ↔ -άω/-έω/-όω.
- **3rd declension still alive in frozen phrases**: του πλήθους, της πόλεως, του σώματος, του βασιλέως, του άνδρα / ανδρός (ανδρικός), του πατρός (πατρικός), της χειρός (χειρουργός), του Διός.
- **Comparatives in fixed expressions**: άριστος, βέλτιστος, κάλλιστα, πλείστος, ελάχιστος, μέγιστος, χείριστος, άμεινον, κρείττων, μείζων, ελάσσων, παλαιότερος; "εν οίδα ότι ουδέν οίδα" (οἶδα), "γνῶθι σαυτόν" (γνῶθι: the app's name!), "ἴθι" , "δός", "ἄφες", "ἀνάστηθι", "ἰδού".
- **Participle in -μένος** (λυμένος ≈ λελυμένος) and the indeclinable -οντας (≈ -ων).
- Etymology bridges (Β3 question, other agent) double as morphology aids: ὅραμα/ὄψις (ὁράω), λῆψις/λῆμμα/πρόληψη (λαμβάνω), φόρος/φορά/φορέας (φέρω), γένεση/γονιός (γίγνομαι), δόση/δότης (δίδωμι), θέση/θέμα (τίθημι), στάση/στατός (ἵστημι), ἀνεκτός (ἔχω), ἀκτέον…

**10.4 Mascot lines ("teach it in one breath", short, in Greek) — examples for the course**
- "Στα ουδέτερα της γ΄ κλίσης το -α του πληθυντικού είναι βραχύ: σώματα, ἄστη, γένη."
- "Η κλητική του πατήρ είναι πάτερ· του ἀνήρ, ἄνερ· του Ζεύς, Ζεῦ."
- "Αόριστος β΄: ο ίδιος ρυθμός με τον παρατατικό στην οριστική, με τον ενεστώτα στις άλλες εγκλίσεις."
- "Απλό ρήμα, β΄ ενικό πρόσωπο της προστακτικής του αορίστου β΄ οξύτονο: ἐλθέ, εἰπέ, εὑρέ, ἰδέ, λαβέ· σύνθετο: ἔξελθε, ἀπόλαβε."
- "Μέλλοντας σε -ίζω: κομιῶ, νομιῶ, ἀφανιῶ· μέλλοντας υγρόληκτων: μενῶ, φανῶ."
- "Συγκριτικός: ἀγαθός, αμείνων· μέγας, μείζων· πολύς, πλείων· ταχύς, θάττων· καλός, καλλίων· κακός, χείρων."
- "Επίρρημα: ο συγκριτικός είναι ουδέτερο ενικού, ο υπερθετικός ουδέτερο πληθυντικού: σοφῶς, σοφώτερον, σοφώτατα."

---

## 11. The "cheap points" cheat list: 30 clusters that decide Γ3 (most-to-least expected value)
1. Number/case change of declinable forms: 3rd declension stems (σῶμα/σώματος, ἐλπίς/ἐλπίδος, γένος/γένους, πόλις/πόλεως, ἄστυ/ἄστη, ἀνήρ/ἀνδρός, πατήρ/πατρός, γυνή/γυναικός, παῖς/παιδός, βασιλεύς/βασιλέως).
2. Comparative/superlative of adjectives and adverbs (the 13 irregulars; -τερος/-ότερος/-ώτερος; -έστερος; adverb = neuter sg/pl).
3. 2sg imperative of every tense (λῦσον, λῦσαι, λύθητι, λέλυσο, σχές, λαβέ, γνῶθι, δός).
4. Future: -σω, -ῶ liquid, -ιῶ, middle futures with active meaning, ὄψομαι, βήσομαι, ἐλῶ.
5. Infinitive and participle of each tense (λῦσαι, λυθῆναι, λελυκέναι; λύσας, λυθείς, λελυκώς; fem and masc genitives).
6. Optative of present, aorist, aorist β΄, passive aorist, contracts (τιμῴην, ποιοίην), -μι (διδοίην).
7. Aorist β΄ stems (λαβ-, ἰδ-, εἰπ-, ἐλθ-, ἔσχ-, ἀγαγ-, εὑρ-).
8. Augment with prefixes (περιοικέω → περιῴκουν, ἐξελαύνω → ἐξήλαυνον, ἐπισκοπέω → ἐπεσκόπουν, εἰσέρχομαι → εἰσῄειν).
9. Perfect with Attic reduplication and ει-perfects (ἐλήλυθα, ἀκήκοα, εἴληφα, εἴρηκα).
10. Perfect M/P of stop stems (γέγραπται, πέπρακται, πέπεισται, λέλεκται).
11. Pronoun cells: ὅστις, οὗτος (αὕτη, ταῦτα), τίς/τις, οὐδείς, ἑαυτοῦ, ἐμαυτοῦ, αὐτός, ἀλλήλων.
12. Participles of εἰμί and -μι verbs (ὤν, οὖσα; διδούς; τιθείς; ἱστάς; εἰδώς).
13. Vocative singular (πολῖτα, ὦ πάτερ, ὦ ἄνερ, ὦ γύναι, ὦ βασιλεῦ, ὦ πόλι, ὦ Σώκρατες).
14. Contract nouns/adjectives (μνᾶ, νοῦς, ἀργυροῦς, εὔνους).
15. Attic second declension (νεώς, λεώς) and 3rd declension neuter σ-stems.
16. ζῶ, πεινῶ, διψῶ, χρῶμαι (η instead of α).
17. φημί (φαίη), οἶδα (εἰδέναι, ἴσθι), εἶμι (ἰέναι, ἴθι), εἰμί (εἶναι, ὤν, ἔσομαι).
18. Root aorists (ἔβην, ἔγνων, ἔδυν, ἔστην).
19. Passive aorist β΄ and 3sg imp -ηθι (φάνηθι, γράφηθι).
20. ἔχω/σχ- (σχές, σχοίην, εἶχον, ἕξω/σχήσω, ἔσχηκα).
21. ναῦς/βοῦς/Ζεύς/γυνή/χείρ/οὖς.
22. Numerals εἷς/δύο/τρεῖς/τέσσαρες.
23. Dual and poetic forms: not examined (S1 prints the dual; no past paper asked it). Skip.
24. Verb accent: aor. β΄ inf. and ptc. on the ending; aor. α΄ inf. act. -σαι paroxytone, opt. -σαι; perfect inf. -έναι.
25. Deponents with passive aorist (ᾠήθην, ἐβουλήθην, ἐδυνήθην, ἐπεμελήθην).
26. Middle futures with passive sense (πείσομαι, ἁλώσομαι, ἀδικήσομαι).
27. Verbal adjectives -τός / -τέος (syntax of "must", other agent).
28. Compound verbs' imperative accent (ἄφες, ἀπόδος, κατάθες; ἔξευρε).
29. Principal parts of ~100 verbs.
30. The instruction vocabulary itself (§1.6): identifying what "στην ίδια φωνή" or "τον ίδιο τύπο" means.

---

## 12. Suggested morphology course map (≈ 28 weeks, Nov 2026 → June 2027) — see also the syntax agent's plan
1. **Εισαγωγή στο Γ3**: the anatomy of the 10-form question, instruction vocabulary, first-day sample (pronouns + imperatives). [week 1]
2. **Ονόματα Α**: article, 1st/2nd declension, contracts (μνᾶ, νοῦς), Attic 2nd. [weeks 2-3]
3. **Γ΄ κλίση Α**: stops and -ντ-; the rule "find the stem from the genitive". [weeks 4-5]
4. **Γ΄ κλίση Β**: ν/ρ stems, σ-stems (γένος, Σωκράτης, τριήρης), vowel stems (πόλις, ἄστυ, βασιλεύς), irregulars (ναῦς, βοῦς, Ζεύς, γυνή, ἀνήρ, πατήρ, χείρ, οὖς). [weeks 6-8]
5. **Επίθετα και μετοχές**: all three classes, participles all tenses and genders, comparison and adverbs. [weeks 9-12]
6. **Αντωνυμίες και αριθμητικά**. [weeks 13-14]
7. **Ρήματα Α**: endings, augment/reduplication, contract verbs, futures, aorist α΄, perfect. [weeks 15-19]
8. **Ρήματα Β**: second tenses, passive aorists, liquid/nasal verbs, moods (subjunctive/optative/imperative by tense, with accent). [weeks 20-23]
9. **Ρήματα Γ**: -μι verbs, εἰμί/εἶμι/φημί/οἶδα, root aorists, deponents, principal parts. [weeks 24-26]
10. **Διαγωνίσματα και επανάληψη**: Γ3-style mocks (10 mixed forms in 4 minutes), speed round "Αγορά", mistakes notebook, spaced review. [weeks 27-28, then continuous]
Order logic: the Εγχειρίδιο itself puts 3rd declension first (units 3-6) and the irregular verb classes later (11-17); the exam gives most points for nominals and for imperative/future/aorist β΄, so units 3-5 and 7-8 come before -μι.

---

## 13. Open questions / things I could NOT confirm
1. **What the sister's school really taught**: §2.1 comes from the 2025-26 ΙΕΠ Gymnasium guidance (cuts: β΄ τάξη contract verbs, reflexive pronouns); her cohort did Γ' Γυμνασίου in 2023-24 and the cuts may have differed. I did not open the three Gymnasium textbooks. Treat the whole of Οικονόμου's morphology of Attic prose as examinable and ask her teacher which -μι verbs, anomalous verbs and contract classes were skipped.
2. **How much of Οικονόμου beyond the Γ3 history is examined**: no past paper has asked the dual, the Homeric/poetic forms, the future perfect, or most of S1 ch.29 (κεῖμαι, κάθημαι, δύναμαι); they remain in the course map at [B].
3. **Committee preferences on doublets** (ζῆ/ζῆθι; φάσκων vs φάς; πρότερον for πρῶτον; παρέδοσαν vs παρέδωκαν; περιόψεσθε for "same voice"; αἰσχίονα vs αἰσχροτέραν). I list them as accepted-alternatives in the app and ask the user to confirm with a teacher.
4. **Accent of some rare forms** (εὐδαίμων voc fem: εὔδαιμον; ἄστεων gen pl; ἰσχυρότερος; compound imperatives of βαίνω). Only generate those that S1 prints.
5. **The ministry's answer key** is not public; all keys here are tutoring-group keys with occasional slips (§1.5).
6. **Fonts and input** (polytonic on small screens) not tested in a browser.
7. **No frequency evidence for 2027 itself**; the June 2027 paper will be built on the same Γ3 formula (10 points) but from the new syllabus (Protagoras / Republic / Aristotle). The unseen text is Attic prose by any author (2026 Lysias; 2025 Xenophon; 2024 Thucydides; 2023 Plato; 2022 Thucydides).

---

## 14. URLs and files used
- Oikonomou grammar (official PDF): https://ebooks.edu.gr/ebooks/d/8547/756/22-0012-02_Grammatiki-tis-Archaias-Ellinikis_Gymnasiou-Lykeiou.pdf · catalogue https://ebooks.edu.gr/ebooks/handle/8547/283
- Εγχειρίδιο Γλωσσικής Διδασκαλίας: https://ebooks.edu.gr/ebooks/d/8547/5488/22-0013-02_Egxeiridio-Glossikis-Didaskalias_A-Lykeiou.pdf · https://ebooks.edu.gr/ebooks/handle/8547/5486
- Ministry decision 90176/Δ2/06-07-2026 (exam material 2027): https://www.minedu.gov.gr/publications/90176_%CE%942_06_07_26_%CE%95%CE%9E%CE%95%CE%A4%CE%91%CE%A3%CE%A4%CE%95%CE%91_%CE%A5%CE%9B%CE%97_2027.pdf · news https://www.alfavita.gr/panellinies/552814_panellinies-2027-anakoinothike-i-exetastea-yli-ton-gel
- ΙΕΠ 2025-26 Ancient Greek instructions: https://www.iep.edu.gr/wp-content/uploads/2025/09/149796_2_%CE%A3%CE%A5%CE%9D_111111_%CE%9F%CE%94%CE%97%CE%93%CE%99%CE%95%CE%A3_%CE%91%CE%A1%CE%A7_%CE%95%CE%9B%CE%9B_%CE%93%CE%95%CE%9B_2025_26-1.pdf
- Past papers (official PDFs mirrored by the press): 2025 https://alfavita.gr/sites/default/files/2025-06/them_arxaia_gel_250602.pdf · 2024 https://alfavita.gr/sites/default/files/2024-06/them_arxaia_gel_240604.pdf · 2023 https://alfavita.gr/sites/default/files/2023-06/ARXAIA_OP_HM_NEO_2023_21.pdf · 2022 https://www.in.gr/wp-content/uploads/2022/06/them_arx_gel_220606-1.pdf · articles with all years: https://www.alfavita.gr/panellinies/479543_panellinies-2025-ta-themata-sta-arhaia-ellinika · https://www.alfavita.gr/panellinies/448745_panelladikes-2024-ta-themata-sta-arhaia-ellinika · https://www.alfavita.gr/panellinies/418110_panelladikes-2023-ta-themata-sta-arhaia-ellinika · https://www.alfavita.gr/panellinies/383087_panelladikes-2022-i-ektimisi-gia-ta-themata-sta-arhaia-ellinika · official archive site https://panellinies.edu.gr/ (Latin pattern /panellinies_themata/ΙΟΥΝΙΟΣ_YYYY/…).
- Answer keys cross-checked: CNN Greece 2025 https://www.cnn.gr/ellada/story/475954/panellinies-2025-aftes-einai-oi-apantiseis-sta-arxaia-ellinika-sta-gel · alfavita 2024 https://www.alfavita.gr/panellinies/448748_panelladikes-2024-oi-apantiseis-gia-ta-themata-ton-arhaion-ellinikon · ΟΕΦΕ 2024 comment https://www.oefe.gr/panellinies/2024/sxoliasmos_arxaia_gel_24.pdf
- greek-language.gr grammar tools (pointer to Οικονόμου): https://www.greek-language.gr/greekLang/ancient_greek/tools/grammars/index.html
- Cypriot ministry exercise-type samples (format of grammar exercises, not the Panhellenic exam): https://sch.cy/sm/443/endeiktikoi_typoi_askiseon_grammatikis_syntaktikou.pdf
- Local files: `research/source-data/oikonomou-grammar.txt`, `egxeiridio.txt`, `syllabus-2027.txt`; `research/pastpapers-raw/*.txt` and `old/`; `research/official-*.txt`.
