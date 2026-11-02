import json,re,collections
from lem import *
from alias import ALIAS
F=json.load(open('final_entries.json'))
E=json.load(open('exam_lemmas.json')); U=json.load(open('unseen_parsed.json')); T=json.load(open('taught_texts.json'))
have=set()
tierof={}
def key(l): return strip_all(norm(re.sub(r'\d+$','',l))).lower()
for r in F:
    have.add(key(r['lemma'])); tierof[key(r['lemma'])]=r['tier']
for a,b in ALIAS.items():
    if key(b) in have: have.add(key(a)); tierof[key(a)]=tierof[key(b)]
def cov(texts):
    tot=0;c=collections.Counter();miss=collections.Counter()
    for t in texts:
        for w in tokens(t):
            l=lemmatize(w)
            if not l: miss['?'+w]+=1; tot+=1; c['unk']+=1; continue
            tot+=1
            k=key(l)
            if k in have: c['in_t%d'%tierof[k]]+=1
            else: miss[l]+=1; c['miss']+=1
    return tot,c,miss
tot,c,miss=cov([v['text'] for v in U.values()])
print('unseen tokens',tot,dict(c)); print(miss.most_common(60))
srcs=[v for k,v in T.items() if '(Alyk)' not in k and '(Blyk)' not in k]
tot,c,miss=cov(srcs)
print('taught tokens',tot,dict(c)); print(miss.most_common(60))
