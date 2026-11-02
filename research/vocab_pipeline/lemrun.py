import json,collections,re
from lem import *
P=json.load(open('perseus_texts.json'))
unk=collections.Counter(); tot=0; hit=0
res={}
for k,v in P.items():
    toks=tokens(v['text'])
    c=collections.Counter(); u=collections.Counter()
    for t in toks:
        l=lemmatize(t)
        if l: c[l]+=1
        else: u[norm(t).lower()]+=1
    res[k]={'n':len(toks),'lem':dict(c),'unk':sum(u.values())}
    unk.update(u); tot+=len(toks); hit+=sum(c.values())
json.dump(res,open('lemmatized_perseus.json','w'),ensure_ascii=False)
print(tot,hit,hit/tot)
print(unk.most_common(80))
