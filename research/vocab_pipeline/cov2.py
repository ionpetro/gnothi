import json,re,collections
from lem import *
from alias import ALIAS
F=json.load(open('final_entries.json')); U=json.load(open('unseen_parsed.json'))
def key(l): return strip_all(norm(re.sub(r'\d+$','',l))).lower()
def mk(pred):
    s=set()
    for r in F:
        if pred(r): s.add(key(r['lemma']))
    for a,b in ALIAS.items():
        if key(b) in s: s.add(key(a))
    return s
tests={
 'pool-only: balanced>=25 (no exam info)':lambda r:r['freq']['balanced_per100k']>=25,
 'pool-only: balanced>=12':lambda r:r['freq']['balanced_per100k']>=12,
 'pool-only: balanced>=12 OR Γ syllabus':lambda r:r['freq']['balanced_per100k']>=12 or r['freq']['taught_syllabus']>0,
 'all entries':lambda r:True}
for name,p in tests.items():
    s=mk(p); tot=0;c=0
    per={}
    for k,v in U.items():
        t=0;cc=0
        for w in tokens(v['text']):
            l=lemmatize(w)
            if not l or l[0].isupper(): continue
            t+=1; cc+= key(l) in s
        per[k]=(cc,t); tot+=t; c+=cc
    print(name,len(s),f"{c}/{tot}={c/tot:.3f}", ' '.join(f"{k}:{a/b:.2f}" for k,(a,b) in per.items()))
