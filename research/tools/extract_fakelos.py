#!/usr/bin/env python3
"""Extract the ancient Greek of every 'ΚΕΙΜΕΝΟ ΑΝΑΦΟΡΑΣ' (reference text) in the Φάκελος Υλικού
text dump (research/source-data/fakelos.txt, made with pymupdf). Local use only."""
import re, json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from extract_texts import POLY, clean_join, SD

lines = (SD / "fakelos.txt").read_text().split("\n")
out = {}
heads = [i for i, l in enumerate(lines) if l.strip().startswith("ΚΕΙΜΕΝΟ ΑΝΑΦΟΡΑΣ") or re.match(r'^(ΚΕΙΜΕΝΟ|Κείμενο) (ΑΝΑΦΟΡΑΣ|Αναφοράς)', l.strip())]
CITE = re.compile(r'^(ΑΡΙΣΤΟΤΕΛΗΣ|Αριστοτέλης|ΠΛΑΤΩΝ|ΕΠΙΚΟΥΡΟΣ|ΠΛΟΥΤΑΡΧΟΣ|Πλάτων),')
TERMINAL = tuple(".;·?!»”…]")

def run(i, collect):
    """collect consecutive Greek lines from line i; return next index"""
    while i < len(lines):
        l = lines[i].strip()
        if l == "": i += 1; continue
        if l.startswith("=====PAGE"): break
        if POLY.search(l) or len(l) < 4: collect.append(l); i += 1; continue
        break
    return i

for n, h in enumerate(heads):
    i = h + 1
    cite = ""
    while i < len(lines) and (not lines[i].strip() or re.match(r'^\d+$', lines[i].strip())): i += 1
    if CITE.match(lines[i].strip()):
        cite = lines[i].strip(); i += 1
    sel = []
    i = run(i, sel)
    pages = 1
    # continue on the next page while the Greek is cut mid-sentence
    force = {8: 1, 10: 1}.get(n + 1, 0)   # unit 8: the cite line + footer sit between the two pages
    if force:
        j = i
        while j < len(lines) and not lines[j].startswith("=====PAGE"): j += 1
        more = []
        run(j + 1, more)
        sel += more; pages += 1
    while sel and not sel[-1].rstrip("\u00ad-").endswith(TERMINAL) and pages < 4:
        j = i
        while j < len(lines) and not lines[j].startswith("=====PAGE"): j += 1
        j += 1
        more = []
        j2 = run(j, more)
        if not more: break
        sel += more; pages += 1; i = j2
    out[n + 1] = {"cite": cite, "greek": clean_join(sel), "line": h + 1, "pages": pages}
(SD / "extracted_fakelos.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))
for k, v in out.items():
    print(k, v["line"], v["pages"], v["cite"][:50], len(v["greek"]), "|", v["greek"][:60], "...", v["greek"][-40:])
