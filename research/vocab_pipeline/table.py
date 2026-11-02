import json,collections,re
P=json.load(open('pool_stats.json')); stat=P['stat']; N=P['N']
E=json.load(open('exam_lemmas.json'))
dcc=json.load(open('dcc.json'))
tl=E['taught']; ul=E['unseen']
def dkey(h): return h.split()[0]
dccrank={}
for h,v in dcc.items():
    for part in re.split(r'[ ,]',h):
        pass
    dccrank[h.split()[0]]=v['rank']
rows={}
allem=set(stat)|set(tl)|set(ul)
for l in allem:
    st=stat.get(l,{'bal':0,'spread':0,'n':0,'by':{}})
    t=tl.get(l,{}); u=ul.get(l,{})
    tG=sum(v for k,v in t.items() if '(Alyk)' not in k and '(Blyk)' not in k)
    tA=sum(v for k,v in t.items() if '(Alyk)' in k); tB=sum(v for k,v in t.items() if '(Blyk)' in k)
    rows[l]={'lemma':l,'bal':round(st['bal'],2),'spread':st['spread'],'n':st['n'],'by':st['by'],'taughtG':tG,'taughtA':tA,'taughtB':tB,'taught_src':sorted(k for k in t),'unseen':sum(u.values()),'unseen_ids':sorted(u),'dcc':dccrank.get(l)}
json.dump(rows,open('table.json','w'),ensure_ascii=False)
def cnt(f): return sum(1 for r in rows.values() if f(r) and r['lemma'][0].islower() or (f(r) and not r['lemma'][0].isupper()))
import itertools
low={l:r for l,r in rows.items() if not l[0].isupper()}
print('lowercase lemmas',len(low))
print('taughtG',sum(1 for r in low.values() if r['taughtG']))
print('taughtG+A+B',sum(1 for r in low.values() if r['taughtG'] or r['taughtA'] or r['taughtB']))
print('unseen',sum(1 for r in low.values() if r['unseen']))
for th in (20,10,6,4,3,2):
    print('bal>=',th,sum(1 for r in low.values() if r['bal']>=th))
for th in (5,6,7):
    print('spread>=',th,sum(1 for r in low.values() if r['spread']>=th))
U=set(l for l,r in low.items() if r['taughtG'] or r['unseen'] or r['bal']>=6)
print('union',len(U))
U2=set(l for l,r in low.items() if r['taughtG'] or r['unseen'] or r['bal']>=10)
print('union bal10',len(U2))
print('dcc in low',sum(1 for r in low.values() if r['dcc']))
