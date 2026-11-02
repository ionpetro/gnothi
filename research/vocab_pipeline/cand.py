import json,re,collections
from lem import *
P=json.load(open('pool_stats.json')); stat=P['stat']
T=json.load(open('taught_texts.json'))
U=json.load(open('unseen_parsed.json'))
dcc=json.load(open('dcc.json'))
tl=collections.defaultdict(collections.Counter)  # lemma -> source -> count
unk=collections.Counter()
for src,txt in T.items():
    for w in tokens(txt):
        l=lemmatize(w)
        if l: tl[l][src]+=1
        else: unk[w]+=1
ul=collections.defaultdict(collections.Counter)
uunk=collections.Counter()
for k,v in U.items():
    for w in tokens(v['text']):
        l=lemmatize(w)
        if l: ul[l][k]+=1
        else: uunk[w]+=1
print('taught lemmas',len(tl),'unseen lemmas',len(ul))
print('unk taught',unk.most_common(60))
print('unk unseen',uunk.most_common(60))
json.dump({'taught':{l:dict(c) for l,c in tl.items()},'unseen':{l:dict(c) for l,c in ul.items()},'unk_t':dict(unk),'unk_u':dict(uunk)},open('exam_lemmas.json','w'),ensure_ascii=False)
