#!/usr/bin/env python3
"""Extract the ORIGINAL ancient Greek of the examined sections from the two official
school PDFs, for LOCAL use (the books are (c) Ministry / ITYE Diophantos; only the public
domain ancient Greek is kept in texts.jsonl, never the translations or commentary).

  curl -L -o research/source-data/filosofikos-logos.pdf  <ebooks.edu.gr 8547/2534 pdf>
  curl -L -o research/source-data/fakelos.pdf            <ebooks.edu.gr 8547/5293 pdf>
  python3 -m venv .venv && .venv/bin/pip install pymupdf
  .venv/bin/python research/tools/extract_texts.py   (needs the *.txt dumps made with pymupdf)

Writes research/source-data/extracted.json  {key: greek}  (gitignored).
"""
import json, re, sys, pathlib

SD = pathlib.Path(__file__).resolve().parent.parent / "source-data"
POLY = re.compile(r'[ἀ-῿]')
HEAD = re.compile(r'^(=====PAGE.*|\d+|ΠΛΑΤΩΝ|ΠΡΩΤΑΓΟΡΑΣ|ΠΟΛΙΤΕΙΑ|ΑΡΙΣΤΟΤΕΛΗΣ|ΗΘΙΚΑ ΝΙΚΟΜΑΧΕΙΑ|ΠΟΛΙΤΙΚΑ|ΑΡΧΑΙΑ ΕΛΛΗΝΙΚΑ.*)\s*$')

def clean_join(lines):
    out = ""
    for ln in lines:
        ln = ln.replace("­", "­")  # keep soft hyphens for now
        if not out:
            out = ln; continue
        if out.endswith("­"):
            out = out[:-1] + ln
        elif out.endswith("-") or out.endswith("‐"):
            out = out[:-1] + ln
        elif len(out.split(" ")[-1]) == 1 and len(out) <= 1:   # drop cap alone
            out = out + ln
        else:
            out = out + " " + ln
    out = out.replace("­", "")
    return re.sub(r'\s+', ' ', out).strip()

def textbook_units(lines):
    """header line index of 'ΕΝΟΤΗΤΑ Nη' for each unit, keyed by (part, n); part 1=Plato,2=Arist NE,3=Politics"""
    idx = [i for i, l in enumerate(lines) if re.match(r'^ΕΝΟΤΗΤΑ \d+[ηή]\s*$', l)]
    res, part, last = {}, 0, 99
    for i in idx:
        n = int(re.search(r'\d+', lines[i]).group())
        res[n if n not in res else None] = i  # first pass placeholder
    return idx

def extract_before(lines, h):
    """Greek text immediately before header line h (walk backwards)."""
    sel = []
    i = h - 1
    while i >= 0:
        l = lines[i].strip()
        if HEAD.match(l) or l == "":
            i -= 1; continue
        if POLY.search(l):
            sel.append(l); i -= 1; continue
        if len(l) == 1 and sel:       # drop cap with no polytonic mark
            sel.append(l); i -= 1; continue
        break
    sel.reverse()
    # drop-cap line may be single letter => join without space
    return clean_join(sel)

if __name__ == "__main__":
    tb = (SD / "filosofikos-logos.txt").read_text().split("\n")
    idx = [i for i, l in enumerate(tb) if re.match(r'^ΕΝΟΤΗΤΑ \d+[ηή]\s*$', l)]
    # idx order: Plato/Protagoras+Republic 1-15, Aristotle NE 1-10, Politics 11-20
    keys = [f"T{n}" for n in range(1, 16)] + [f"T{n}" for n in range(1, 11)] + [f"T{n}" for n in range(11, 21)]
    part = ["PL"] * 15 + ["NE"] * 10 + ["PO"] * 10
    out = {}
    for k, p, i in zip(keys, part, idx):
        out[f"{p}{k[1:]}"] = extract_before(tb, i)
    (SD / "extracted.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))
    for k, v in out.items():
        print(k, len(v), v[:70], "...", v[-50:])
