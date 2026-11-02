# vocab_pipeline

Scripts that produced `research/vocab.jsonl` (2026-11-02). Rough, re-runnable, written for one-off research.

Inputs are downloaded, never committed (see `.gitignore`: `research/source-data/`, `research/pastpapers-raw/`):

* Gorman treebanks: `git clone https://github.com/vgorman1/Greek-Dependency-Trees` (Attic prose XML) -> `parse_gorman.py` builds the form->lemma dictionary (CC BY-NC-SA 4.0, attribution: V. Gorman, JOHD 6:1, doi 10.5334/johd.13).
* Perseus TEI texts: `PerseusDL/canonical-greekLit` (tlg0003 Thucydides, 0010 Isocrates, 0014 Demosthenes, 0026 Aeschines, 0028 Antiphon, 0030 Hyperides, 0032 Xenophon, 0059 Plato, 0086 Aristotle, 0540 Lysias, 0007 Plutarch Moralia, 0004 Diogenes Laertius) -> `ptext.py`, `lemrun.py`.
* kaikki.org Wiktionary extract of Ancient Greek -> `kidx.py` (fallback form index); UD Perseus/PROIEL conllu (fallback forms); DCC Greek Core list (`dcc.html` scraped).
* Exam papers: `research/pastpapers-raw/*.txt` (local only) -> unseen passages isolated in `stats.py`.

Order: `parse_gorman.py` -> `kidx.py` -> `ptext.py` -> `lemrun.py` -> `stats.py` -> `taught.py`, `taught2.py`, `taught3.py` -> `cand.py` -> `table.py` -> `authored/auth_*.txt` (hand-authored entries; format `pos | lemma | forms | gender | class | el | note`) -> `build.py` -> `finalize.py` -> `gen_md.py`. `lem.py`, `alias.py`, `srcnames.py`, `manual_map.txt`, `names.txt` are shared helpers/data. Paths inside the scripts point to a scratch folder; adjust them before re-running.
`coverage.py` and `cov2.py` produce the coverage numbers in vocab.md section 1.
