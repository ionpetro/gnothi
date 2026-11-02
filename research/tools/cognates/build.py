#!/usr/bin/env python3
"""Build research/cognates.jsonl from src_part*.txt + verified.json (+ manual_ok.txt).
Fields: lemma, forms (as attested in the reference texts), units (Φάκελος units 1-21),
modern_el (verified or exam-attested), modern_el_unchecked, verification (word -> how), note, source[].
"""
import json, os, re, datetime
import verify
HERE = os.path.dirname(os.path.abspath(__file__))
entries = verify.parse_src()
res = json.load(open(os.path.join(HERE, 'verified.json'), encoding='utf-8'))
manual = {}
for l in open(os.path.join(HERE, 'manual_ok.txt'), encoding='utf-8'):
    if l.startswith('#') or not l.strip(): continue
    w, lem, why = [x.strip() for x in l.split('|', 2)]
    manual[(w, lem)] = why
out = []
for ei, e in enumerate(entries):
    ok, unchecked, how = [], [], {}
    for w in e['modern']:
        r = res[f'{ei}|{w}']
        st = r['status']
        if st == 'verified':
            ok.append(w); how[w] = 'el.wiktionary etymology' + (f" (via {r['via']})" if r.get('via') else '')
        elif st == 'exam':
            ok.append(w); how[w] = 'exam paper / ΤΘΔΔ question bank pairing'
        elif st == 'transparent':
            ok.append(w); how[w] = 'transparent shared stem'
        elif (w, e['lemma']) in manual:
            ok.append(w); how[w] = 'manual: ' + manual[(w, e['lemma'])]
        else:
            unchecked.append(w)
    src = [f"Φάκελος Υλικού, Δ.Ε. {','.join(map(str, e['units']))}", 'el.wiktionary (ετυμολογία) checked 2026-11-02']
    for m in re.findall(r'ΤΘΔΔ\d+', e['note']): src.append(f'ΤΘΔΔ λεξιλογική άσκηση {m[4:]} (Μαυρακάκης worksheet)')
    for m in re.findall(r'exam (\d{4}(?:-\d{2})?)', e['note']): src.append(f'Πανελλαδικές {m}')
    note = e['note']
    out.append(dict(lemma=e['lemma'], forms=e['forms'], units=e['units'], modern_el=ok,
                    modern_el_unchecked=unchecked, verification=how, note=note, source=list(dict.fromkeys(src))))
path = os.path.join(HERE, '..', '..', 'cognates.jsonl')
with open(path, 'w', encoding='utf-8') as f:
    for o in out: f.write(json.dumps(o, ensure_ascii=False) + '\n')
tot = sum(len(o['modern_el']) for o in out); unc = sum(len(o['modern_el_unchecked']) for o in out)
print(len(out), 'lemmas;', tot, 'modern words accepted;', unc, 'unchecked')
print([ (o['lemma'], o['modern_el_unchecked']) for o in out if o['modern_el_unchecked']])
