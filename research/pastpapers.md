# Past Panhellenic Ancient Greek papers (Αρχαία Ελληνικά Ο.Π. Ανθρωπιστικών Σπουδών): what is actually tested

Research date: 2026-11-02. Target exam: June 2027 (Γ΄ Λυκείου, school year 2026-27).
Everything below was computed from papers I downloaded and read as text (PDF to text with PyMuPDF). Raw papers are in `research/pastpapers-raw/` (gitignored, local only). Nothing here is from memory unless marked.

Legend: **[READ]** I read the primary paper or answer sheet. **[COMPUTED]** counted by script over the papers I hold (regex counts were spot-checked by hand where I say so). **[SECONDARY]** press / tutoring page. **[UNVERIFIED]** could not confirm.

---

## 0. The twelve findings that matter for the app

1. **The taught text is a closed pool.** Since 2021 every taught passage is one of the passages of the "Φάκελος Υλικού" / school book "Φιλοσοφικός Λόγος" (19 numbered passages in the 2026-27 syllabus, ΦΕΚ Β΄ 4857/4.8.2026, απόφαση 102749/Δ2, see `official-2027-syllabus-ancient-greek-section.txt`). The same passages come back again and again, also across June and September, and the old (2000-2020) Θεωρητική papers use the same book. [COMPUTED] with 5-word shingle overlap: June 2026 = Sept 2023 επαναληπτικές (90 % identical text) = June 2016 (86 %) = επαναληπτικές 2013 (88 %): Aristotle EN B 1.5-8. June 2025 (Republic 514a-515c) = επαναληπτικές 2012 / 2020 and ομογενείς 2020 (81-88 %). June 2021 (Protagoras 322a-323a) = June 2015 (85 %). Sept 2023 ομογενείς = June 2014 (88 %): EN B 1.1-4. Sept 2025 ομογενείς (Prot 320c-321b) = επαναληπτικές 2010 and 2018 (88 %). So old papers (2000-2020) are legitimate practice for the taught part, except where the old passage is no longer in the syllabus (section 4.4).
2. **The unseen text is NOT recycled and cannot be predicted by passage.** [COMPUTED] None of the 14 distinct unseen passages of 2021-2026 overlaps more than 5 % (5-word shingles, i.e. only common formulas) with any of the other ~60 papers I hold (June 2000-2026, επαναληπτικές 2000-2020 where text parsed, ομογενείς 2016-2020). The only overlaps are same-day twins (Sept 2022 e/o, Sept 2024 e/o, June 2020 new/old system). What is predictable is the **author** (Lysias, Xenophon, Thucydides, Plato, Isocrates; section 6.1) and the **question types** (sections 7-8).
3. **Format since 2023 is fixed** (ΦΕΚ spec in `official-fek-5136-2022-ancient-greek-format.txt` + all 10 papers 2023-2026 June/Sept): Α1 (10) + Β1 (10) + Β2 parallel text (10) + Β3 etymology (10) + Β4 closed question on author/work/genre (10) = 50 for the taught part; Γ1 translation **20** + Γ2 comprehension (10) + Γ3 grammar (10) + Γ4 syntax (10) = 50 for the unseen. In 2019-2022 the translation was only 10 marks and the taught part had one more question (Α1 + Β1-Β5 with the parallel text as Β5, Β3 closed, Β4 etymology + semantic-change sentences). The marks sequence was checked in the 2019-2026 papers. [READ + COMPUTED]
4. **There is no translation of the taught text any more.** Last time: June 2018 (Α1 translation of the taught passage, 10 marks). From June 2019 (new system) the taught part is comprehension only (also in the old-system paper of June 2020). The taught text is read, understood and quoted (Greek words/phrases must be found and cited) but not translated. This changes what Gnothi must drill: **Greek-word-level reading of the taught passages** (pronoun references, citing evidence, expressive means, etymology from the passage), not translation of them.
5. **Γ3 (grammar) is 100 % "produce the form the committee asks for".** 10 marks, usually two sub-parts (a single list or table in S2024 e/o and S2025o). In the 16 papers 2021-2025 (hand-coded): a list of "give the requested form of this word" in at least 8 (J2021, J2022, J2023, J2024, J2025, J2026, S2024e, S2025e); "transfer these inflected forms to the other number" in 10 (J2021, J2022, J2026, S2021e, S2021o, S2022e, S2022o, S2023e, S2023o, S2025e); **matching table "form ↔ grammatical identification" only in the 5 ομογενείς papers** of September (0 of the 11 other papers); degrees of comparison in 9 (regex, indicative). Tricky irregular forms are normal (οἴσω → ἐνήνοχε, ἄξω → ἀγάγωμεν, φανῆναι → φάνηθι, ἰδεῖν → ὀψομένη, ἔχειν → σχές, φησίν → φαίη).
6. **Γ4 (syntax)** always starts with 4-10 bold words/phrases to be characterised syntactically (16/16). Second part (Γ4.β), hand-coded over the 16 papers: classify a subordinate clause (5), participle: classify and analyse into a clause (3), direct to indirect speech (2), indirect to direct (2), conditional: identify and convert to προσδοκώμενο (2), nothing (2, both ομογενείς). Participles/infinitives dominate the word lists (section 8).
7. **Etymology (Β3 since 2023) has three shapes:** find in the taught text a cognate of 5 modern Greek words (J2023, J2026, S2024 e/o, S2025e); fill 5 modern-Greek sentences with cognates of a given ancient form (J2024: συντείνει, αἵρεσιν, κρατῆρι, ἐνέπλησε, χρώμενος; J2025: φέροντας; S2023e: συναλλάγμασιν); match ancient ↔ modern (S2023o, S2025o; 2021-2022 Β4α). The "write a sentence using the modern word in a different meaning" sub-question (Β4β) existed in 6 papers (J2021, J2022, S2021e/o, S2022e/o) and **has not appeared since 2023** (still allowed by the ΦΕΚ spec). [COMPUTED + READ]
8. **Closed author/work question (Β4 / Β3 older):** Σωστό/Λάθος, multiple choice or matching on the *introductory chapters* of the book (life of Plato and Aristotle, Socrates, Heraclitus/Democritus on eudaimonia, parts of the soul, Lyceum). It is the cheapest 10 marks. Recurring facts (counted over the 16 papers, [COMPUTED] keyword counts checked by hand): Plato's Sicilian voyages (7 of 16 papers), Aristotle's arrival in the Academy while Plato was in Sicily (J2023, S2022e/o, S2024e/o), Eudoxus of Cnidus (4), Theophrastus / Lyceum / Peripatos (4), eudaimonia as ἐνέργεια ψυχῆς (7), parts of the soul (9), Heraclitus ἦθος ἀνθρώπῳ δαίμων (3), the Academy (8), Xenocrates (2).
9. **Parallel text (Β2, Β5 before 2023):** always a modern-Greek text from any literature (Orwell, Marcus Aurelius, Anonymus Iamblichi, Rousseau commentary, Euripides, Lucretius, Archilochus, Plutarch, Papanoutsos, Kostaras, Stathopoulos, Plato's Gorgias). Question = present the view / list N similarities (J2024: two; S2025e: three; J2025: one similarity and one difference; S2025o: two similarities and one difference) or compare with the ancient text. The ancient side must be quoted.
10. **The exam is hard on the marks distribution.** [SECONDARY] 2026: 18,977 candidates in the Humanities field, 55.67 % below 10 (Protothema 25 Jun 2026; iefimerida). 2025: 47.69 % below 10 and 2.29 % scored 18-20 (Naftemporiki 26 Jun 2025, citing the Ministry; population not fully clear). Tutors called both 2025 and 2026 "βατά" on the taught part, with the 2026 unseen "πιο απαιτητικό από το περσινό".
11. **ΟΕΦΕ / tutor comments** [SECONDARY/READ]: 2024 press release (4 Jun 2024): Α1 clear, Β1 "απαιτεί καλή γνώση των ερμηνευτικών σχολίων του Φακέλου Υλικού και συνδυαστική σκέψη", Β2 "συνδυαστική και κριτική σκέψη", Β3-Β4 "καμία δυσκολία", unseen: long periodic sentence, Γ3-Γ4 "βατές … απαιτούν καλή γνώση της Γραμματικής και του Συντακτικού"; participle analysis (Γ4.β) "δεν έχει ζητηθεί εδώ και πολλά χρόνια" (in June papers it was last set in 2016 and then 2024; I also found it in Sept 2022 and Sept 2024). 2026 (Poukamisas, CNN): "Πολλά χρόνια είχαμε να δούμε απόσπασμα δικανικού λόγου" (true for June: last forensic speech in a June paper before 2026 was Lysias 14 in June 2008 [COMPUTED]; but Lysias was the author of 4 of the 8 distinct September unseens 2023-2025).
12. **Syllabus drift:** the old papers contain taught passages that are no longer examinable: Thucydides Epitaphios (June 2003, 2004, 2005), Plato Republic 360 (Gyges, 2000) and 615c-616a (Er, 2007), Protagoras 323c-324d and 326c-e (June 2002, 2017, επαναληπτικές 2011), Aristotle EN B3 and B6.1-4 (June 2012), Epictetus Diatribai (June 2022 second fragment; not in the 2026-27 list), Aristotle Politics Θ 2.1-4 as excerpted in 2006 (partly overlapping, see 4.3). Use them for the unseen-type grammar/syntax only, not as taught text.

---

## 1. What I opened (coverage)

61 papers read. Years covered:

| Group | Years | Source |
|---|---|---|
| **June, ημερήσια/εσπερινά (main)** | **2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020 (new system) + 2020 (old system), 2021, 2022, 2023, 2024, 2025, 2026** = 28 papers | 2021-2026: official https://panellinies.edu.gr/themata/arxaia-ellinika/gel (PDFs under `/panellinies_themata/ΙΟΥΝΙΟΣ_YYYY/`); 2005-2014: https://palia-themata.weebly.com/alpharhochialphaiotaalpha.html (`ak2005.pdf` … `ak2014.pdf`); 2000-2004 and 2015-2020: Google-Drive PDFs linked from https://www.panellinies.net/αρχαία-ελληνικά/ (page per year, e.g. `/arxaia-2001/`, `/αρχαία-ελληνικά-γελ-πανελλήνιες-2019/`) |
| **September 2021-2025** (επαναληπτικές ΓΕΛ + ομογενείς) | 2021 e/o, 2022 e/o, 2023 e/o, 2024 e/o, 2025 e/o = 10 papers | https://panellinies.edu.gr/themata/arxaia-ellinika/gel (the "ΣΕΠΤΕΜΒΡΙΟΣ_2024/202509_ARXAIA_OMOG.pdf" file is actually the Sept 2025 ομογενείς, misfiled; checked by its date 10 Sept 2025) |
| **Old επαναληπτικές** (June/July/Sept) | 2000, 2003-2013, 2015-2020 = 18 papers (2001 and 2002 downloads failed, 2014 link not found) | panellinies.net year pages |
| **Ομογενείς 2016-2020** | 5 papers | panellinies.net |
| Answer sheets read | June 2021, 2022, 2023, 2024 (ΟΕΦΕ), 2025 (Poukamisas), 2026 (Diakrotima), 2024 ΟΕΦΕ press note | `research/pastpapers-raw/20xx-answers*.txt` (saved by a sibling task) |

Not covered: εσπερινά-only papers, 2000-2015 ομογενείς, επαναληπτικές 2001, 2002, 2014, Sept 2010/2018 unseen authors (taught parts identified, unseen header not parsed), the unseen text of June 2001 (PDF uses a legacy Greek font that extracts as garbage; the taught passage there is EN B6 "Ἐν παντὶ δὴ συνεχεῖ", the unseen is [UNVERIFIED]). No 2021 June εσπερινά.

Counts below are "papers I actually opened". Where a regex produced a count I say so.

---

## 2. Format timeline

| Period | What the paper looked like | Marks |
|---|---|---|
| **2000-2004** | Α: translate part of the **taught** passage (10). Β1-Β5: five 10-mark questions (content, bio, "δύο ομόρριζες λέξεις"; in 2000 "ένα συνώνυμο", in 2001 "παράγωγο ουσιαστικό με παραγωγική κατάληξη"). Γ: unseen: translate (20) + forms (Γ2, 5+5) + syntax (Γ3, 5+5). | 10 + 50 + 40 |
| **2005-2014** (Θεωρητική Κατεύθυνσης) | Α1 translate taught passage (10); Β1 15, Β2 15, Β3 10 (bio / background), Β4 10 (etymology: «δύο ομόρριζες» 2005-2009; «μία ετυμολογικά συγγενή λέξη … για καθεμιά από τις παρακάτω λέξεις της νέας ελληνικής» 2010-2013); Γ1 translate unseen 20, Γ2 forms 10 (5+5, later one list of 10), Γ3 syntax 10 (6+4). | 10 + 15 + 15 + 10 + 10 + 20 + 10 + 10 |
| **2015-2018** | 2015 and 2017: Α1 translation (10) + Β1-Β5 five 10-mark questions (Β4 Σ/Λ, Β5 etymology matching + semantic-change sentences from 2017) ; Γ 20 + 10 + 10. 2016 and 2018: like 2005-2014 (15 + 15 + 10 + 10). Last translation of a taught passage: June 2018. | 100 |
| **June 2019, June 2020 (new system)** | First papers **without translation of the taught text**. Α1 (Σ/Λ with citation, 6+4), Β1, Β2, Β3 (Σ/Λ), Β4 (α matching etymology + β semantic-change sentences), **Β5 parallel text**; Γ1 translation **10**, Γ2, Γ3, Γ4. The old-system paper of the same day (Wed 17 Jun 2020) also had Σ/Λ Α1 and a parallel text (Plato Prot. 324d). | 60 taught + 40 unseen (all questions 10 marks) |
| **2021-2022** (6 papers) | same as 2019-2020: Α1, Β1-Β5 (Β5 parallel text), Γ1 translation **10**, Γ2, Γ3, Γ4. | 60 + 40 |
| **2023-2026** (10 papers) | Α1 (10), Β1, Β2 parallel text, Β3 etymology, Β4 closed author question; Γ1 translation **20**, Γ2, Γ3, Γ4. | 50 + 50 |

Official spec (ΦΕΚ, saved in `official-fek-5136-2022-ancient-greek-format.txt`) [READ]: taught excerpt 12-20 lines + parallel text from "αρχαία ή νεότερη γραμματεία, ελληνική ή παγκόσμια"; **(i)** one comprehension question (may be closed type: Σ/Λ, multiple choice, matching, gap-fill, or open); **(ii)** two interpretive questions (first on ideas/values/characters/historical context/structure/style of the taught text, second on the parallel text in relation to it); **(iii)** one closed question on genre/author/work; **(iv)** one lexical-semantic question (link ancient and modern words, keep or change of meaning, word families, synonyms/antonyms). Unseen: Attic prose, 12-20 lines, with a short introductory note; translate 8-10 lines (20 marks); one comprehension question; one grammar question (may have two sub-questions); one syntax question (recognition of words/phrases/clauses, transformation; may have two sub-questions). Each question 10 marks, translation 20. Papers 2023-2026 follow this exactly.

Duration 3 hours; earliest leaving time 10:00 (2026 paper) [READ]. Instruction 4 in 2026: "Κάθε απάντηση τεκμηριωμένη είναι αποδεκτή."

---

## 3. Section Α1 (comprehension on the taught text, 10 marks)

Always split in two parts (6+4 in June 2025; 6+4 in 2023; 4+6 in 2026; 6 + 4 in 2021 etc.).

Question shapes seen in the 16 papers 2021-2025 [READ + COMPUTED]:

| Shape | Exact exam phrasing (excerpt) | Papers |
|---|---|---|
| **Σωστό/Λάθος on text content** | «Να γράψετε στο τετράδιό σας τον αριθμό που αντιστοιχεί σε καθεμιά από τις παρακάτω περιόδους λόγου και δίπλα σε αυτόν τη λέξη «Σωστό», αν είναι σωστή, ή τη λέξη «Λάθος», αν είναι λανθασμένη» | 15 of 16 (all except J2025, which is multiple choice) |
| …**with citation of the Greek words that confirm it** | «…με βάση το αρχαίο κείμενο (μονάδες 3) και να τεκμηριώσετε κάθε απάντησή σας γράφοντας τις λέξεις/φράσεις του αρχαίου κειμένου που την επιβεβαιώνουν (μονάδες 3)» (J2024: «…με παραπομπές στο κείμενο») | J2021, J2024, S2021e/o, S2022e/o, S2023e (7 certain). June 2026 explicitly says «Δεν απαιτείται αναφορά σε χωρία του κειμένου.» |
| **Pronoun / adverb reference** | «Σε ποια λέξη του αρχαίου κειμένου αναφέρεται η αντωνυμία «αὐτῶν»;», «…Σε ποια φράση … αναφέρεται το επίρρημα «οὕτω»;», «Σε ποια λέξη … αναφέρεται η μετοχή «ὡρισμένῃ»;» (also «ἡ φράση «τῆς δὲ»») | **8 of 16** (June 2021, 2025, 2026; Sept 2021 e/o, 2023e, 2024 e/o). 3 of 6 June papers. Items always from the quoted passage; the antecedent can be a whole phrase list («τὰ ἐν τοῖς συναλλάγμασι, τὰ ἐν τοῖς δεινοῖς, τὰ περὶ τὰς ἐπιθυμίας, τὰς περὶ τὰς ὀργὰς» for «αὐτοῖς», 2026) |
| **Multiple choice α/β/γ with a question stem** | «Ποια είναι η κύρια αιτία η οποία εμποδίζει τους δεσμώτες να στρέψουν τα κεφάλια τους;» (3 items, 6 marks) | J2025 |
| **Column matching** | «Με βάση το δεύτερο απόσπασμα … να αντιστοιχίσετε τις φράσεις της Στήλης Α με τον χαρακτηρισμό που τους αποδίδεται στη Στήλη Β» (1 παράδειγμα, 2 αντίθεση, 3 αναλογία) | J2022 (words vs ἄνθρωπος/ζῷον), J2023 (παράδειγμα/αναλογία), S2022e (quote ↔ correct paraphrase) |

Pattern for the app: tapping the **Greek words in the passage** (evidence) is as important as the Σ/Λ choice.

---

## 4. The taught passages

### 4.1 June papers 2000-2026 (28 papers): what was set

| Year | Date | Taught passage | Unseen passage |
|---|---|---|---|
| 2000 | Sat 10 Jun | Plato Rep. 360a-d (Gyges) | Isocrates, Nicocles 27-28 |
| 2001 | Tue 29 May | Aristotle EN B 6 (μεσότης) | unidentified (font) |
| 2002 | Thu 6 Jun | Plato Prot. 323c-… «Ἐν γὰρ ταῖς ἄλλαις ἀρεταῖς» (+326d-e translated) | Demosthenes, Against Meidias 169-170 |
| 2003 | Thu 5 Jun | Thucydides, Epitaphios 41 (+35 translated) | Xenophon, Mem. 4.4.16 |
| 2004 | Thu 3 Jun | Thucydides, Epitaphios 42 (+43) | Xenophon, Mem. 1.6.14 |
| 2005 | Tue 7 Jun | Thucydides, Epitaphios 40 | Lycurgus, Against Leocrates 83-84 |
| 2006 | Thu 1 Jun | Aristotle Pol. Θ 2.1-4 (education) | Xenophon, Symp. 2.10 |
| 2007 | Tue 29 May | Plato Rep. 615c-616a | Plato, Alcibiades I 133b-c |
| 2008 | Thu 29 May | Aristotle EN B 6.4-10 | Lysias 14 (Against Alcibiades I) 46-47 |
| 2009 | Mon 25 May | Aristotle EN B 1.1-4 | Thucydides 5.115 |
| 2010 | Wed 26 May | Aristotle EN B 6.12-16 | Xenophon, Mem. 4.8.8-9 |
| 2011 | Fri 20 May | Plato Rep. 519b-d | Xenophon, Symp. 1.11-12 |
| 2012 | Mon 28 May | Aristotle EN B 3.1-2 / B 6.1-4 | Thucydides 7.61 |
| 2013 | Mon 27 May | Aristotle Pol. A 1.1, Γ 1.2-… (+A2 translated) | Thucydides 7.28 |
| 2014 | Mon 2 Jun | Aristotle EN B 1.1-4 | Isocrates, Archidamus 103-105 |
| 2015 | Mon 25 May | Plato Prot. 322a-d | Thucydides 1.15.1-2 |
| 2016 | Wed 18 May | Aristotle EN B 1.5-8 | Plato, Euthydemus 289d-290a |
| 2017 | Fri 9 Jun | Plato Prot. 323a-… «Ἐν γὰρ ταῖς ἄλλαις ἀρεταῖς» | Isocrates, Philip 26-27 |
| 2018 | Mon 11 Jun | Plato Rep. 519c-520a | **Aristotle, Rhetoric A 1-2** |
| 2019 | Mon 10 Jun | Plato Prot. 321b-322a | Xenophon, Cynegeticus 13.1-5 |
| 2020 new | Wed 17 Jun | Plato Rep. 518b-519a | Xenophon, Poroi 5.11-13 |
| 2020 old | Wed 17 Jun | Aristotle EN B 1.5-7, B 6.9-10 (+Prot. 324d parallel) | Xenophon, Poroi 5.11-13 (same) |
| **2021** | Wed 16 Jun | Plato Prot. 322a-323a | Xenophon, Apology 31-34 |
| **2022** | Mon 6 Jun | Aristotle Pol. A 1.10-11 (1253a7-18) + Epictetus, Diatribai B 10.1-4 | Thucydides 1.121.1-4 |
| **2023** | Tue 6 Jun | Aristotle Pol. A 1.1-8 (1252a1-7, b27-32) + Γ 6.3-4 (1281a39-b10) | Plato, Theages 121b-d |
| **2024** | Tue 4 Jun | Plutarch, De Alex. fort. 6 (329a-d) | Thucydides 8.81.1-2 |
| **2025** | Mon 2 Jun | Plato Rep. 514a-515c (cave) | Xenophon, Mem. 2.1.22-23 (Prodicus: Heracles) |
| **2026** | Wed 3 Jun | Aristotle EN B 1.5-8 (1103b2-25) | Lysias 7 (Περὶ τοῦ Σηκοῦ) 27-29 |

[READ] for every row except where marked; passage ranges taken from the paper headers. 2013 and 2006 taught ranges are as printed there (their numbering differs from today's).

**Taught work, 28 June papers [COMPUTED from this table]:** Aristotle EN 9 (2001, 2008, 2009, 2010, 2012, 2014, 2016, 2020old, 2026), Plato Republic 6 (2000, 2007, 2011, 2018, 2020new, 2025), Plato Protagoras 5 (2002, 2015, 2017, 2019, 2021), Aristotle Politics 4 (2006, 2013, 2022, 2023), Thucydides Epitaphios 3 (2003-2005, gone since), Plutarch 1 (2024).
**Six June papers 2021-2026 used six different works/blocks in a row; no June passage repeated within 2021-2026,** but June 2026 repeated Sept 2023 (επαναληπτικές) and June 2016.

### 4.2 September (επαναληπτικές + ομογενείς) 2021-2025

| Session | Taught passage(s) | Unseen |
|---|---|---|
| Sept 2021 e (Wed 8 Sep) | EN B 6.4-8 + B 6.16 | Plutarch, Laconic Apophthegms 222b-d (Callicratidas) |
| Sept 2021 o | same | Isocrates, Against the Sophists 3-4 |
| Sept 2022 e (Sat 10 Sep) / o | Aristotle Metaph. A 2 982b12-28 + Pol. Θ 1.3-2.1 (1337b5-11 fragment) | Plato, Laws A 641a-c (same in e and o) |
| Sept 2023 e (Sat 9 Sep) | EN B 1.5-8 | Lysias 1 (Euphiletus) 9-13 |
| Sept 2023 o (Fri 15 Sep) | EN B 1.1-4 | Lysias 3 (Against Simon) 5-8 |
| Sept 2024 e/o (Tue 10 Sep) | Aristotle, Protrepticus 8-9 | Lysias, fr. Against Aeschines the Socratic 1-2 (same text in e and o) |
| Sept 2025 e (Wed 10 Sep) | Plato Prot. 321b-322c | Lysias 12 (Against Eratosthenes) 7-10 |
| Sept 2025 o | Plato Prot. 320c-321b | Xenophon, Mem. 1.1.1-3 |

The επαναληπτικές/ομογενείς taught text **usually differs from June** (the committee spreads the 19 passages) but the same Σ/Λ + matching style applies. September 2024-2025 ομογενείς Γ3/Γ4 are the easiest I read (matching table in Γ3; Γ4 only syntactic recognition, no Γ4.β).

### 4.3 The 19 syllabus passages of 2026-27 and where each has come up (papers I hold)

Numbering from the official syllabus [READ]. "Where" = papers whose taught text overlaps it (exact ranges overlap, so "≈"; [COMPUTED] overlap or reading of headers).

| # | Passage | Appearances | Count |
|---|---|---|---|
| A.1 | Aristotle Metaph. A 2, 982b12-28 | Sept 2022 e, o | 2 |
| A.2 | Aristotle Protrepticus 8-9 | Sept 2024 e, o | 2 |
| A.3 | Epicurus, Letter to Menoeceus 122 | **never in a paper I hold** | 0 |
| B.4 | Plato Prot. 320c-321b | Sept 2025 o; επαν. 2010; επαν. 2018; ομογ. 2018 | 4 |
| B.5 | Plato Prot. 321b-322a | June 2019; Sept 2025 e (321b-322c) | 2 |
| B.6 | Plato Prot. 322a-323a | June 2015 (322a-d); June 2021; επαν. 2003 (Ζεὺς οὖν δείσας…, 322c-d); επαν. 2009 (322b6-323a3) | 4 |
| B.7 | Aristotle Pol. A 1.12 (in translation) | n/a (translation text, never a Greek question) | 0 |
| Γ.8 | Plato Rep. 514a-515c | June 2025; επαν. 2008 (514a-515a); επαν. 2012; επαν. 2020; ομογ. 2016; ομογ. 2020 | 6 |
| Γ.9 | Plato Rep. 518b-519a | June 2020 (new) | 1 |
| Γ.10 | Plato Rep. 519b-520a | June 2011 (519b-d); June 2018 (519c-520a); ομογ. 2016 (519b-c) | 3 |
| Γ.11 | Aristotle Pol. Θ 1.3-2.1 | Sept 2022 e, o; ≈ June 2006 (Θ 2.1-4, partial overlap, check) | 2-3 |
| Δ.12 | Aristotle EN B 1.1-4 | June 2009; June 2014; Sept 2023 o; επαν. 2017 / ομογ. 2017 (B1.1-3) | 5 |
| Δ.13 | Aristotle EN B 1.5-8 | June 2016; June 2026; Sept 2023 e; επαν. 2007; επαν. 2013; June 2020 old (B1.5-7) | 6 |
| Δ.14 | Aristotle EN B 6.4-8 | June 2001; June 2008 (B6.4-10); επαν. 2015 (B6.4-8, 14-16); Sept 2021 e, o | 5 |
| Δ.15 | Aristotle EN B 6.10-13, 16 | June 2010 (B6.12-16); επαν. 2019 / ομογ. 2019 (B6.10-16); Sept 2021 e/o (B6.16); June 2020 old (B6.9-10) | 6 |
| Ε.16 | Aristotle Pol. A 1.1-8 | June 2013; επαν. 2016 (A1.1, Γ1.1-2); June 2023 | 3 |
| Ε.17 | Aristotle Pol. A 1.10-11 | June 2022 | 1 |
| Ε.18 | Aristotle Pol. Γ 6.3-4 | June 2023 | 1 |
| ΣΤ.21 | Plutarch, De Alex. fort. 6 | June 2024 | 1 |

The numbers 19-20 are missing from the official list (the Epictetus pair that appeared in June 2022 is **not** in the 2026-27 list; I could not confirm what 19-20 used to be [UNVERIFIED]).

**Passages never set (or only in translation) in any paper I hold: Epicurus A.3, Pol. A 1.12.** Rep. 518b-519a (Γ.9) and Pol. A 1.10-11 (Ε.17), Γ 6.3-4 (Ε.18), Plutarch (ΣΤ.21) have been set exactly once. These are *not* predictions (the committee has no known rotation rule): they just mean **all 19 passages must be learnt to the same depth**. If the app wants a prioritisation hint only: all four EN blocks Δ.12-15 together account for 22 of the ~55 taught-passage slots over 2000-2026.

### 4.4 Taught passages that appeared but are no longer examinable (2026-27)
Thucydides Epitaphios (June 2003-2005; επαν. 2000, 2004, 2005), Plato Rep. 360, 615c-616a, Protagoras 323c-324d / 326c-e (June 2002, 2017; επαν. 2011), Aristotle EN B3.1-2, B6.1-4 (June 2012; επαν. 2006, 2017), Epictetus (June 2022), Aristotle Pol. A 2.x / Γ 1 sections of 2006, 2013, 2016. Do not teach these in Gnothi.

---

## 5. Β-questions on the taught text (interpretive, parallel, lexical, closed)

### 5.1 Β1 interpretive question (10 marks), 2021-2026 exact content [READ]

| Paper | Question |
|---|---|
| J2021 | Ποια είναι τα μέρη της πολιτικής αρετής και ποια η λειτουργία τους στην πολιτική κοινωνία; (Prot.) |
| J2022 | Ποια άποψη διατυπώνει ο Αριστοτέλης για τον ρόλο της φύσης και του λόγου στον χαρακτηρισμό του ανθρώπου ως πολιτικού όντος; (+ Β2 on Epictetus: how he presents man (6) + two linguistic choices (4)) |
| J2023 | Πώς ορίζει ο Αριστοτέλης την «πόλιν» και ποιος ο σκοπός της ύπαρξής της; |
| J2024 | two characteristics Plutarch attributes to Alexander (2) + link to the new notion of homeland and οἰκουμένη (8) |
| J2025 | Ποιος είναι ο βασικός εκφραστικός τρόπος, με τον οποίο ο Πλάτωνας παρουσιάζει το θέμα του μύθου … (εικόνα/παρομοίωση of the cave) και πώς συνδέεται με την έλλειψη παιδείας; Να τεκμηριώσετε με αναφορές από το κείμενο |
| J2026 | Πώς γεννιούνται και φθείρονται οι τέχνες και οι αρετές (7) και ποια η συμβολή του δασκάλου (3); |
| S2021e/o | two forms of μεσότητα (6) + two different expressive means by which they are shown (4); Β2: content of «προαιρετική» (6) and «φρόνιμος» (4) |
| S2022e/o | how Aristotle links θαυμάζειν and φιλοσοφεῖν (6) + two linguistic choices showing the historical development (4); Β2: link of free-citizen education with the passage «Δῆλον οὖν… αὑτῆς ἕνεκέν ἐστιν» |
| S2023e | in which fields of human life Aristotle focuses to show the social dimension of virtue (6) + two expressive means (4) |
| S2024e/o | which characteristics make philosophy superior to other sciences (second paragraph) |
| S2025e | πώς σχετίζονται οι όροι «ἔντεχνος σοφία σὺν πυρί» και «ἔμπυρος τέχνη» με την «περὶ τὸν βίον σοφίαν» και με την πολιτική αρετή |

Pattern: **content (bookwork from the "ερμηνευτικά σχόλια" of the Φάκελος Υλικού) + 1-2 language/expression observations** (ΟΕΦΕ 2024: needs the interpretive notes). "Εκφραστικοί τρόποι / γλωσσικές επιλογές" asked in 5 of 16 papers (J2021 Β2 "4 γλωσσικές επιλογές", J2025, S2021e, S2022e, S2023e): the usual ones are antithesis, repetition, imperative/jussive («πάντες μετεχόντων»), question, comparison, strong verbs like «κτείνειν ὡς νόσον πόλεως».

### 5.2 Parallel texts (all 16 papers have one, modern Greek)

Plato's Gorgias 483b-d (Callicles), Papanoutsos "Νόμος και Αρετή", Anonymus Iamblichi, Marcus Aurelius (Τὰ εἰς ἑαυτόν 10.6), Orwell "1984", Stathopoulos (justice as equity), Archilochus fr. 128 (×2), Kostaras "Φιλοσοφική Προπαιδεία" (×2), Plutarch "Περί παίδων ἀγωγῆς" (S2023o), Rousseau commentary (S2023e), Theodoridis "Εισαγωγή στη Φιλοσοφία" (×2), Lucretius V (S2025o), Euripides Suppliants 195-218 (S2025e). The June 2019 and επαν. 2013 old parallels (Aeschylus PV 476-506; Plato Gorgias 324d) already appeared before the new format.

Question shapes: «Να εντοπίσετε δύο ομοιότητες …» (J2024), «μία ομοιότητα … και μία διαφορά» (J2025), «τρεις (3) ομοιότητες» (S2025e), «δύο (2) ομοιότητες και μία (1) διαφορά» (S2025o), «Ποια είναι η άποψη που διατυπώνει … Να τη συγκρίνετε με την αντίστοιχη άποψη του …» (J2021, J2022), «Να παρουσιάσετε τα χαρακτηριστικά του φανταστικού «Υπερανθρώπου» όπως αυτά περιγράφονται στο 2ο απόσπασμα του Αριστοτέλη και στο απόσπασμα του Ανωνύμου Ιαμβλίχου» (J2023), «Πώς παρουσιάζονται η συμπεριφορά και οι επιλογές του ατόμου στα πεδία της ανθρώπινης πράξης στο παράλληλο κείμενο και στο απόσπασμα «Οὕτω δὴ … ἄδικοι»» (J2026). In 2025-26 the answer must quote the passages of both texts («Να τεκμηριώσετε … αναφέροντας τα αντίστοιχα χωρία των δύο κειμένων»).

### 5.3 Etymology / lexical question (Β4α 2021-22; Β3 2023-26) [READ + COMPUTED]

All 16 papers 2021-2025 have it (10 marks). Shapes and the actual items:

| Shape | Papers | Items |
|---|---|---|
| Modern Greek word → find a cognate **in the taught text** | J2023, J2026, S2021e/o (6 words), S2024e/o, S2025e | J2023: οπτική, σύσταση, λάθος, δοχείο, ποδήλατο (tutor sheet, Diakrotima 2023: ὁρῶμεν, συνεστηκυῖαν, ἀλήθειαν, ἐνδέχεται, πολύποδα). J2026: ρυπογόνος, ανάθεση, ένδεια, ξέφρενος, διάστρεμμα (tutor sheet: γινόμενον, νομοθέτου, ἔδει, σώφρονες, ἀναστρέφεσθαι). S2021e: αλοιφή, λήμμα, εξαιρετικός, λιποθυμία, πρακτορείο, ουσιαστικό. S2024: κοινόχρηστα, όρεξη, απόκτημα, διαθήκη, άξιος. S2025e: κλεψύδρα, πέρασμα, εργόχειρο, καταμερισμός, άσωτος |
| **Fill the gap** with a cognate of an ancient form | J2024, J2025, S2023e | J2024: συντείνει → ένταση, αἵρεσιν → προαιρετική, κρατῆρι → κράση, ἐνέπλησε → πληθυσμού, χρώμενος → χρήσης. J2025: «φέροντας» → οισοφάγος, φόρος, φορέματα, φέρσιμο, φερέφωνο (suppletive stems: φορ-, οἰσ-). S2023e: «συναλλάγμασιν» → 5 sentences needing compound nouns/adjectives of the ἀλλάσσω family (e.g. «Τα δύο αδέλφια ήταν ίδια και ……», «Ο συνήγορος πέτυχε την …… του κατηγορουμένου», «Η …… των εποχών …», «…… μαθητών ανάμεσα στις δύο χώρες»); answers not read |
| **Match** ancient ↔ modern (one or two extras on the right) | J2021 B4α, J2022 B4α, S2022e/o, S2023o, S2025o | e.g. σποράδην–σπαρτά, σκεδαννύμενοι–διασκέδαση, ἀπώλλυντο–πανωλεθρία, ἱκανός–άφιξη, μετεχόντων–σχολικός, θές–παρακαταθήκη (J2021) |
| **Semantic-change sentence** (Β4β) | J2021, J2022, S2021e/o, S2022e/o | «διεφθείροντο», «δημιουργοί»; «ἀδούλευτον», «προηγουμένων»; «φρόνιμος», «πάθεσι»; «πρόχειρα», «διαγωγὴν» |

Old-format wording (2002-2015) was «Να γράψετε δύο ομόρριζες λέξεις της αρχαίας ή της νέας ελληνικής» (2005-2009 for words of the text) or «μία ετυμολογικά συγγενή λέξη … για καθεμιά από τις παρακάτω λέξεις της νέας ελληνικής» (2010-2013, 10 words); in 2000 «ένα συνώνυμο» and in 2001 «παράγωγο ουσιαστικό με την παραγωγική κατάληξη…». The ΟΕΦΕ 2024 note: Β3 "καμία δυσκολία". The skill is word-family recognition including **stem alternations** (ἔδει ~ ένδεια; γινόμενον ~ ρυπογόνος; συντείνει ~ ένταση; οἰσ- ~ οισοφάγος).

### 5.4 Closed author/work question (Β3 in 2021-22, Β4 since 2023)
Shapes: Σ/Λ (J2021, J2025, J2026, S2022e/o, S2024e, S2025e), multiple choice α/β (J2023, S2023e), multiple choice α/β/γ (J2024), matching names (J2022 and S2021o), quotes ↔ philosopher (S2021e, with Heraclitus, Democritus, Protagoras, Aristotle). Content = the introductory chapters of the book listed in the syllabus: Socrates (dialectic, induction, trial; Δ2, Δ3), Plato's life (E1: Sicilian voyages, Pythagoreans, 7th Letter), Republic introduction (the three classes, guardians' education, philosopher-kings, justice), Aristotle's life (born Stagira, Academy, Eudoxus, Macedonia, Lyceum, Theophrastus), EN and Politics introductions (eudaimonia ἐνέργεια ψυχῆς, parts of the soul λόγον ἔχον/ἄλογον, polis as κοινωνία). Official statements that appeared: «Η 7η Επιστολή δίνει πληροφορίες για τη ζωή του Πλάτωνα.» (J2021 true), «Πηγή πληροφοριών για τη ζωή του Πλάτωνα είναι η 15η επιστολή του» (J2025 false), «Για τον Αριστοτέλη η ευδαιμονία είναι στατική κατάσταση και όχι ενέργεια της ψυχής» (J2026 false), «Ο Αριστοτέλης γεννήθηκε στη Μίεζα και πέθανε στη Χαλκίδα» (J2026, key: Λάθος; he was born in Stagira), «Ο Ξενοκράτης διηύθυνε … την Ακαδημία» (J2024).

---

## 6. The unseen text (Γ)

### 6.1 Authors and passages

**June, 28 papers:** Xenophon 10 (2003, 2004, 2006, 2010, 2011, 2019, 2020 ×2 same passage, 2021, 2025), Thucydides 6 (2009, 2012, 2013, 2015, 2022, 2024), Isocrates 3 (2000, 2014, 2017), Plato 3 (2007, 2016, 2023), Lysias 2 (2008, 2026), Demosthenes 1 (2002), Lycurgus 1 (2005), Aristotle (Rhetoric) 1 (2018), unknown 1 (2001). [COMPUTED from the table in 4.1]. **June 2021-2026: Xenophon ×2, Thucydides ×2, Plato ×1, Lysias ×1.**
**September 2021-2025, 8 distinct passages:** Lysias 4 (2023e Euphiletus, 2023o Against Simon, 2024 Against Aeschines, 2025e Against Eratosthenes), Xenophon 1, Plato 1, Isocrates 1, Plutarch 1.
**Old επαναληπτικές 2000-2020 (identified):** Thucydides 2.54, 2.63, 2.89, 1.72, 1.75; Xenophon Mem. 2.2, 4.2, Hell. 6.4, 4.5, Agesilaus, Oec. 7, Cyropaedia 1.6; Demosthenes ×3 (Spoudias, Aristocrates, Philip's letter); Andocides De pace; Antiphon On the Chorus-boy; Lysias 15; Lucian De somnio; Dio Chrysostom Or. 8 [READ]. So the unseen pool is any classical or post-classical Attic prose: **historiography, oratory (forensic, deliberative), Socratic dialogues**, never poetry.

Each unseen has a 1-3 line introduction in modern Greek giving context (e.g. 2026: «Οι μορίαι ήταν ιερά ελαιόδεντρα … Ο ομιλητής … υπερασπίζεται τον εαυτό του …») and 2-4 glossed rare words (2026: «ἄερκτος: αφύλακτος», «ἐπεργάζομαι: εργάζομαι παράνομα», «ἀπογράφω: καταγγέλλω»). Footnote glosses are part of the paper [READ].

Length of the printed text: ~150-260 words (counted on 2021-2026 extractions, [COMPUTED]); the translation part is 8-10 lines (ΦΕΚ).

### 6.2 Γ1 translation
20 marks (2023-2026; 10 in 2021-22). The translated stretch is marked with start…end words: «ὥστε τίς ἂν … ἀφανίζειν.» (J2026), «κατασκοπεῖσθαι δὲ θαμὰ … ἄπειρος διαβιώσῃ» (J2025), «Οἱ δὲ προεστῶτες … Πελοποννησίων.» (J2024), «Ὦ Σώκρατες … περὶ αὐτοῦ δεδιότι» (J2023). Long periodic sentences with participles are typical (ΟΕΦΕ 2024: «ο μακροπερίοδος λόγος»).

### 6.3 Γ2 comprehension (10 marks)
Open question about the content, phrased «Με ποια επιχειρήματα…», «Για ποιους λόγους…», «Πώς περιγράφονται…», «Να αναφέρετε δύο (2) ενέργειες … Να τεκμηριώσετε με παραπομπές στο κείμενο» (S2025e), «Ποιες σκοπιμότητες εξυπηρετεί η ενέργειά του αυτή;» (J2024). Closed Σ/Λ version only in Sept 2021 o and Sept 2022 o (5 statements). The answer must be derived from the text, not general knowledge.

---

## 7. Γ3 grammar question: what is asked

10 marks, always 2 sub-parts (6+4 or 5+5 or one list of 9-10 items). Hand-coded over the 16 papers 2021-2025; in brackets the June papers. [READ]

| Pattern | Papers | Notes |
|---|---|---|
| **List of 5-10 words, each with the requested form** | J2023 (9 items), J2024 (6), J2025 (6), J2026 (4), S2024e (10) , S2025e (5), J2021 (3 imperatives) | the committee text: «Να γράψετε τους τύπους που ζητούνται για καθεμιά από τις παρακάτω λέξεις» + «ο ίδιος τύπος στο …/στον ίδιο χρόνο και στην ίδια φωνή» |
| **Transfer inflected forms to the other number** | J2021, J2022, J2026, S2021e, S2021o, S2022e, S2022o, S2023e, S2023o, S2025e (10/16) | either a quoted phrase or a list of nouns «παιδὸς, χοροῦ, πόλει, ὄφελος, ἀνθρώποις» (S2022o) |
| **Degrees** (comparative/superlative of adjectives/adverbs; "τον ίδιο τύπο στον συγκριτικό/υπερθετικό", "τους άλλους δύο βαθμούς") | J2021, J2022, J2023, J2024, J2025, S2022e, S2023e, S2024e, S2025e? (9/16) | adverbs ῥᾳδίως → υπερθετικό, πρῶτον → other two degrees, πάλαι → συγκριτικό |
| **Verb to another tense/mood/voice** (imperative aor. 2nd sg, infinitive of other tense, perfect, future) | all except S2021o, S2022o, S2023o, S2024o, S2025o (the five ομογενείς) | J2021: all verb forms → β΄ ενικό προστακτικής; J2022: → β΄ ενικό προστακτικής αορίστου; J2024: → παρακείμενο; J2020: μετοχές → β΄ ενικό οριστικής παρατατικού; S2021e: aorist forms → present |
| **Third declension / case form of a noun** | J2025 («τα ουσιαστικά της γ΄ κλίσης … στη γενική ενικού»), J2023 (τὸ ἄστυ → ονομ. πληθ.), S2025e | |
| **Matching table** (form ↔ identification such as «γ΄ πληθυντικό πρόσωπο οριστικής μέλλοντα», «απαρέμφατο ενεστώτα», «μετοχή ενεστώτα»; 5 or 10 items) | S2021o, S2022o, S2023o, S2024o, S2025o (**all 5 ομογενείς, 0 others**) | ομογενείς are the easier version |
| **Pronoun forms** («ἑαυτοῦ: την αιτιατική πληθυντικού θηλυκού γένους στο β΄ πρόσωπο», «ὅστις: ο ίδιος τύπος στον άλλο αριθμό») | J2023, J2024 | tests τονισμός + reflexive person |

Counts of mentioned categories inside the Γ3 block (regex over the 16 papers, spot-checked on the 6 June papers): imperative 7, optative 3, subjunctive 1, infinitive 9 (includes matching-table items), participle 7, aorist β΄ 5, perfect 4, future 7, imperfect 3, degrees 9, case-form requests 7, number change 10, matching table 5. In the **old June papers 2000-2018 (n = 19)** the picture is different: imperative 15, optative 12, perfect 11, aorist β΄ 10, future 10, subjunctive 6, infinitive 9, degrees 13, case forms 13, **vocative 7**, "same person / same voice" cues 11. [COMPUTED regex; verbs/moods are plain-language keywords, so these are reliable, but they count "mentioned in the block", not "number of items".] The new exams drifted from mood-heavy to **number-transfer + list of forms + matching**. Vocative and subjunctive are nearly gone since 2021 (1 and 1 of 16).

**Irregular/trap forms actually demanded (with answer-sheet solutions where I read them):** ἔχειν → σχές (J2023); ἄγω: ἄξω → ἀγάγωμεν (J2025); ὁρῶ: ἰδεῖν → ὀψομένη (J2025); φανῆναι → φάνηθι; μεγάλας → τῶν μειζόνων; οὐδενός → οὐδεμιᾷ; ἐπισκοπεῖν → ἐπεσκόπει; διαβεβλημένος → διαβλήθητι; ἀφανίζειν → ἀφανιεῖν; φησίν → φαίη; περιοικοῦσι → περιῴκουν (all J2025-2026); J2024 perfect forms: ἔπεισε → πέπεικε, ψηφισαμένων → ἐψηφισμένων, πλεύσας → πεπλευκώς, κατῆγεν → κατῆχεν (sheet gives «κατῆχεν / καταγήοχεν»); J2021 «ἔγνω → γνῶθι, ζῆν → ζῆθι/ζῇ, τεθνάναι → τεθνηκὼς ἴσθι» (answer sheet; classical grammar may say τέθναθι, i.e. **tutor sheets disagree; do not hard-code**); S2024e: οἴσω → γ΄ ενικό οριστικής παρακειμένου (ἐνήνοχε, **my inference**, sheet not read); τὸ ἄστυ → τὰ ἄστη; ἀγεννής → ἀγεννοῦς; ῥᾷστον → ῥᾴδιον / ῥᾷον; καταβαίνοντες → καταβησόμενοι; ἐπιμεληθῆναι → ἐπιμεληθέντων; ὅστις → οἵτινες (J2023 sheet).

---

## 8. Γ4 syntax question

10 marks, 2 parts. **Γ4.α** (4-8 marks, 16/16 papers): «Να χαρακτηρίσετε (πλήρως) συντακτικά τους όρους που εμφανίζονται στο αδίδακτο κείμενο με έντονα γράμματα». Number of words/phrases asked: 4 (J2021, S2021e), 5 (S2025o), 6 (J2022, J2025, J2026, S2021o, S2022e, S2023o, S2024e, S2025e), 7 (J2023, J2024), 8 (S2022o, S2023e), 10 (S2024o).

The words asked (June 2021-2026) [READ + answer sheets]:
- J2021: διὰ τὸ μεγαλύνειν (αιτιολογικό/αναγκαστικό αίτιο: articular infinitive with διά + accusative), τοῦ ζῆν (articular infinitive = genitive of comparison after κρεῖττον), τοῦ ἀνδρός (κτητική), ἀξιομακαριστότατον (κατηγορούμενο στο αντικείμενο).
- J2022: ἔχοντες (αιτιολογική μετοχή), ἐπικρατῆσαι (τελικό απαρέμφατο, υποκείμενο στο εἰκός), πλήθει (δοτική της αναφοράς), μισθῷ (δοτική του μέσου), ναυβάτας (αντικείμενο στο ὑπολαβεῖν), ἢ οἰκεία (β΄ όρος σύγκρισης).
- J2023: τὸν αὐτόν (ομοιόπτωτος επιθετικός), τοῦτο (υποκείμενο), ὀνομάζειν (τελικό απαρέμφατο υποκείμενο στο δεῖ), πάντων (γενική διαιρετική), εἰς τὸ ἄστυ (εμπρόθετος, κίνηση προς τόπο), μοι (έμμεσο αντικείμενο), σοφὸν (κατηγορούμενο στο αντικείμενο).
- J2024: τὰ πράγματα, ἄδειαν, ὡς τὸν Τισσαφέρνην, ἐκκλησίας (υποκείμενο της γενικής απόλυτης), τῶν μελλόντων (έναρθρη επιθετική μετοχή, αντικειμενική γενική), οἴκοι, τῷ Τισσαφέρνει.
- J2025: ἰδεῖν, τῆς φύσεως (γενική συγκριτική), τῷ Ἡρακλεῖ, ἀποροῦντα (κατηγορηματική μετοχή), φίλην (κατηγορούμενο), τῶν χαλεπῶν (γενική αντικειμενική).
- J2026: οὔσης (γενική απόλυτη, χρονική), ἀδικεῖν (τελικό απαρέμφατο, υποκείμενο του ἐξῆν), ἐμαυτῷ (δοτική αντικειμενική), ἐλαῶν (αντικείμενο στο ἐπιμελεῖσθαι), ὡς ἀφανίσαντα (αιτιολογική μετοχή υποκειμενικής αιτιολογίας), ἐπιμελητὴς (κατηγορούμενο).

Hand count over these 6 June papers: **infinitive** in 6/6, **participle** in 4/6 (J2022, J2024, J2025, J2026), **predicate (κατηγορούμενο, incl. predicative to the object)** in 4/6, **genitive/dative types (αντικειμενική, συγκριτική, διαιρετική, κτητική)** in 6/6. The answer format on the committee/tutor sheets is "term: role + on which word it depends".

**Γ4.β second part** (16 papers): see finding 6. Instruction wordings: «να αναγνωρίσετε το είδος του υποθετικού λόγου και να τον μετατρέψετε στο προσδοκώμενο» (J2026; J2021 «να εντοπίσετε και να χαρακτηρίσετε ως προς το είδος … αιτιολογώντας … Να κάνετε όλες τις απαραίτητες αλλαγές ώστε να δηλώνει το προσδοκώμενο»), «να μεταφέρετε το απόσπασμα στον πλάγιο λόγο με απαρεμφατική σύνταξη και με εξάρτηση από τη φράση «Οἱ Κορίνθιοι ἔλεγον»» (J2022), «με εξάρτηση από τη φράση «Δημόδοκος ἔλεγεν ὅτι»» (J2023), «Να εντοπίσετε τον πλάγιο λόγο και να τον μετατρέψετε σε ευθύ» (S2025e), «να χαρακτηρίσετε συντακτικά τη μετοχή και να την αναλύσετε στην αντίστοιχη δευτερεύουσα πρόταση» (J2024, S2024e), «να εντοπίσετε τη δευτερεύουσα ονοματική πρόταση, να αναγνωρίσετε το είδος της, να δικαιολογήσετε την εκφορά της και να δηλώσετε τον συντακτικό της ρόλο» (J2025).

Conditional conversions asked: J2021 real (εἰ + ind.) → προσδοκώμενο (ἐάν + υποτακτική …, ind. future); J2026 «Πῶς δ’ ἄν, εἰ μὴ … ἦν … ἐπεχείρησα» (**αντίθετο του πραγματικού**) → προσδοκώμενο.

Old June (2000-2018, n=19) syntax part [COMPUTED regex, indicative]: conditional 7/19 (identify, "λανθάνων", convert to μη πραγματικό / προσδοκώμενο / αόριστη επανάληψη), direct→indirect 4/19, indirect→direct 1/19, participle analysis 3/19, clause classification 3/19, plain recognition 19/19.

---

## 9. What this means for the game: 30 exam-style question patterns

Prompt wording is quoted from the papers; "Data" = what the content file needs. All items must be our own Greek text; the ancient passages are public domain, the school-book commentary is not.

| # | Pattern (exam wording) | Section | Mechanic | Data needed |
|---|---|---|---|---|
| 1 | «…«Σωστό» ή «Λάθος», με βάση το αρχαίο κείμενο» (+ «γράφοντας τις λέξεις/φράσεις … που την επιβεβαιώνουν») | Α1 | Choose Σ/Λ, then tap the evidence words in the Greek passage | passage tokens; statement; correct token span |
| 2 | «Σε ποια λέξη/φράση του αρχαίου κειμένου αναφέρεται η αντωνυμία «αὐτοῖς»;» | Α1 | Tap the antecedent in the passage | anaphora annotations |
| 3 | «…η μετοχή «ὡρισμένῃ»;» / «το επίρρημα «οὕτω»;» | Α1 | same, participles/adverbs as the pointer | |
| 4 | Multiple choice α/β/γ: «Ποια είναι η κύρια αιτία …;» | Α1 | 3 options | question + 3 answers per passage |
| 5 | Στήλη Α–Β: phrase ↔ «παράδειγμα / αντίθεση / αναλογία» | Α1 | Match pairs | |
| 6 | Quote ↔ correct paraphrase («νοηματική απόδοση») | Α1 | choose 1 of 3 | |
| 7 | «Να εντοπίσετε δύο εκφραστικούς τρόπους / γλωσσικές επιλογές» | Β1 | Pick technique (αντίθεση, επανάληψη, ερώτηση, προστακτική, παρομοίωση) and tap words | annotated devices |
| 8 | «Πώς ορίζει ο Αριστοτέλης την πόλιν …» (short answer, 10 marks) | Β1 | Self-check against a checklist of expected points; or build the answer from sentence tiles | 3-5 key points per passage |
| 9 | «Ποια είναι τα μέρη της πολιτικής αρετής …» (bookwork) | Β1 | recall + order tiles | |
| 10 | Parallel text: «Να εντοπίσετε δύο ομοιότητες / μία ομοιότητα και μία διαφορά» | Β2 | Sort statements into ομοιότητα / διαφορά / δεν προκύπτει | our own modern-Greek parallels (public-domain authors only or paraphrase) |
| 11 | «Να συγκρίνετε με την άποψη του Πρωταγόρα/Αριστοτέλη» | Β2 | Pair ancient quote with modern statement | |
| 12 | Etymology: «Να βρείτε στο διδαγμένο κείμενο μία ετυμολογικά συγγενή λέξη για …» (5 modern words) | Β3 | Tap the cognate in the passage | word-family tags per passage |
| 13 | Etymology gap-fill: «Να συμπληρώσετε … με ουσιαστικά ετυμολογικά συγγενή της μετοχής «φέροντας»» | Β3 | pick the right derivative per sentence | |
| 14 | Etymology matching: «αντιστοιχίσετε … (στη Στήλη Β περισσεύει μία λέξη)» | Β3 | match with a distractor | |
| 15 | Semantic change: «μία περίοδο λόγου όπου η ίδια λέξη χρησιμοποιείται με διαφορετική σημασία» | Β3 (2021-22) | choose which sentence uses the word in a different sense | |
| 16 | Author/work/genre Σ/Λ («Ο Αριστοτέλης γεννήθηκε στη Μίεζα») | Β4 | Σ/Λ quick fire | fact bank with src |
| 17 | Multiple choice about the intro chapters («Η σχολή που ίδρυσε ο Θεόφραστος ονομαζόταν…») | Β4 | MC | |
| 18 | Quote ↔ philosopher (Ηράκλειτος/Δημόκριτος/Πρωταγόρας/Αριστοτέλης) | Β4 | match | |
| 19 | Translation of a stretch of the unseen (8-10 lines) | Γ1 | **Tile builder**: arrange our own Greek translation chunks; plus "choose the right translation of this clause" for participle/genitive absolute chunks | our own translations; chunk alignment |
| 20 | «Με ποια επιχειρήματα υποστηρίζει ο ομιλητής την αθωότητά του;» | Γ2 | Select the supported points (checklist) | |
| 21 | List of forms: «ᾠήθην: το απαρέμφατο στον ίδιο χρόνο» | Γ3 | Type the form (accent-insensitive but letter-exact) | verb paradigm engine |
| 22 | «…μεταφέρετε τους κλιτούς τύπους στον άλλο αριθμό» (whole phrase) | Γ3 | type or tile-build | declension engine |
| 23 | Degrees: «τον ίδιο τύπο στον υπερθετικό βαθμό» (ῥᾳδίως) | Γ3 | type | |
| 24 | Imperative/optative/subjunctive requests («το β΄ ενικό της προστακτικής του ίδιου χρόνου στην ίδια φωνή») | Γ3 | type + feedback with stem | principal parts |
| 25 | Transfer to perfect/future («οι μετοχές … στον παρακείμενο / στον μέλλοντα») | Γ3 | type | principal parts incl. suppletive stems (οἴσω/ἐνήνοχε) |
| 26 | Matching table: form ↔ identification («γ΄ ενικό οριστικής παρακειμένου») | Γ3 | match 5-10 pairs | |
| 27 | «Να χαρακτηρίσετε πλήρως συντακτικά …»: ἀδικεῖν: τελικό απαρέμφατο υποκείμενο του ἐξῆν; οὔσης: γενική απόλυτη | Γ4.α | pick the label from a menu + tap the word it depends on | syntactic annotation |
| 28 | Participle: «να χαρακτηρίσετε τη μετοχή και να την αναλύσετε στη δευτερεύουσα πρόταση» (προσελθὼν → ἐπεὶ προσῆλθεν) | Γ4.β | choose type, then build the clause from tiles | |
| 29 | Direct↔indirect: «με εξάρτηση από τη φράση «Δημόδοκος ἔλεγεν ὅτι»» | Γ4.β | tile builder, accept ὅτι/ὡς-clause or infinitive | |
| 30 | Conditional: identify type, convert to προσδοκώμενο (εἰ + ind. → ἐάν + υποτ. …) | Γ4.β | choose type; then build the converted pair | |
| 31 | Subordinate clause: «είδος, εισαγωγή, εκφορά, συντακτικός ρόλος» («ἐπειδὴ τάχιστα ἐξῆλθον») | Γ4.β | four-field form | |
| 32 | Ποιητικό αίτιο / active↔passive: «πολλὰ αὐτοῖς γέγραπται: να αναγνωρίσετε το είδος της σύνταξης…» (June 2019) | Γ4.β | build active/passive variants | |

Game notes: (a) accuracy of answer checking: exam answers ignore accents/breathings in marking only loosely, but the **form** matters; Gnothi can be letter-strict, accent-lenient. (b) Γ3/Γ4 transfer items (patterns 21-31) are the most automatable exam content and should drive the speed round; patterns 1-3, 7, 12 need annotated passages; pattern 19 needs our own translations. (c) A mock "Διαγώνισμα" should reproduce the exact mark structure of section 2 (50 + 50, Γ1 20).

---

## 10. Uncertainties

- Regex counts for the 2000-2020 papers (feature tables in sections 7-8) count "mentioned in the grammar block" and used patterns tuned on the 2021-2026 papers. They are indicative, not exact.
- I did not read answer sheets for every year. The solutions quoted come from the sheets for J2021, J2022, J2023, J2024 (ΟΕΦΕ), J2025 (Poukamisas), J2026 (Diakrotima); these are "προτεινόμενες απαντήσεις" by tutoring groups, not the Ministry's marking scheme, and tutor sheets can disagree on subtle labels (e.g. «τελικό απαρέμφατο ως υποκείμενο» vs other names).
- J2025's Β3 sheet answers (οισοφάγος…) and J2026's Β4 (γινόμενον for ρυπογόνος) are from the sheets; I did not verify the etymologies independently.
- Percentages for 2025/2026 marks are from the press (Naftemporiki, Protothema, iefimerida), not from the Ministry PDF.
- 2001 unseen, Sept 2010/2018 unseen authors: not identified.
- Passage ranges for 2013, 2006, 2016 follow the old book's numbering; mapping to the 2026-27 numbered list is approximate.

---

## 11. Sources

Primary papers (2021-2026, June and September, ΓΕΛ and ομογενείς): https://panellinies.edu.gr/themata/arxaia-ellinika/gel (PDFs under /panellinies_themata/ΙΟΥΝΙΟΣ_2021 … ΙΟΥΝΙΟΣ_2026 and ΣΕΠΤΕΜΒΡΙΟΣ_2021 … ΣΕΠΤΕΜΒΡΙΟΣ_2025).
2005-2014 June: https://palia-themata.weebly.com/alpharhochialphaiotaalpha.html (ak2005.pdf … ak2014.pdf).
2000-2004, 2015-2020 June and επαναληπτικές/ομογενείς: https://www.panellinies.net/αρχαία-ελληνικά/ and the per-year pages (e.g. https://www.panellinies.net/arxaia-2001/, https://www.panellinies.net/αρχαία-ελληνικά-γελ-πανελλήνιες-2019/, https://www.panellinies.net/arxaia-epanaliptikes-2000/).
Format spec: ΦΕΚ text in `official-fek-5136-2022-ancient-greek-format.txt` (saved by a sibling task). Syllabus 2026-27: ΦΕΚ Β΄ 4857/4.8.2026, απόφαση 102749/Δ2 (`official-2027-syllabus-ancient-greek-section.txt`). Teaching guidelines 2026-27 (`official-guidelines-2026-27-ancient-greek-gamma.txt`: "τα κείμενα αυτενέργειας … δεν αποτελούν εξεταστέα ύλη"; required grammar: Γυμνάσιο books + Εγχειρίδιο Γλωσσικής Διδασκαλίας ενότητες 1-21).
Answers/comments: https://www.cnn.gr/ellada/story/479806/panellinies-2025-arketa-vata-kai-xoris-dyskolies-ta-themata-sta-arxaia-ellinika ; https://www.cnn.gr/ellada/story/536796/panellinies-2026-apaititika-mathimatika-kai-viologia-gia-kala-diavasmenous-to-agnosto-sta-arxaia ; https://www.alfavita.gr/panellinies/518394_panellinies-2026-ta-themata-oi-ektimiseis-kai-oi-apantiseis-sta-arhaia-ellinika (page itself only links to the sub-articles) ; ΟΕΦΕ press note 4 June 2024 (`pastpapers-raw/2024-oefe-comment.txt`).
Statistics: https://www.naftemporiki.gr/society/1973688/vathmologies-panelladikon-2025-se-poia-mathimata-aristeysan-oi-ypopsifioi-poy-kategrapsan-tis-cheiroteres-epidoseis/ (2025: 2.29 % 18-20; 47.69 % below 10) ; https://www.protothema.gr/greece/article/1840926/ta-statistika-stoiheia-apo-tis-vathmologies-ton-panelladikon-oi-adunamoi-krikoi-ta-agathia-kai-oi-ekplixeis/ (2026: 18,977 candidates, 55.67 % below 10) ; https://www.iefimerida.gr/ellada/panellinies-2026-arhaia-mathimatika-apiasti-basi (55.67 % below 10).

Scripts used (in the session scratchpad, not committed): PyMuPDF text extraction; regex feature extraction (`analyse.py`, `analyse2.py`); 5-word shingle overlap (`overlap.py`).
