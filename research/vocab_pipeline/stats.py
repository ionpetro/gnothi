import json,re,collections,glob,os
from lem import *
# DCC
dcc={}
t=open('dcc.html',encoding='utf8').read()
for r in re.findall(r'<tr[^>]*>(.*?)</tr>',t,re.S)[1:]:
    c=[re.sub(r'<[^>]+>','',x).strip() for x in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>',r,re.S)]
    if len(c)>=5:
        dcc[c[0]]={'def':c[1],'pos':c[2],'group':c[3],'rank':int(c[4]) if c[4].isdigit() else None}
json.dump(dcc,open('dcc.json','w'),ensure_ascii=False)
# groups
L=json.load(open('lemmatized_perseus.json'))
def group(k):
    a=k.split('.')[0]; w=k.split('.')[1]
    if a=='tlg0032': return 'Xenophon'
    if a=='tlg0003': return 'Thucydides'
    if a=='tlg0059': return None if w=='tlg036' else 'Plato'
    if a=='tlg0540': return 'Lysias'
    if a=='tlg0010': return 'Isocrates' if w<='tlg021' else None
    if a=='tlg0014': return 'Demosthenes'
    if a=='tlg0086': return 'Aristotle' if w in ('tlg010','tlg035','tlg038','tlg003') else None
    if a=='tlg0007': return 'Plutarch'
    if a in ('tlg0026','tlg0028','tlg0030'): return 'Orators'
    return None
G=collections.defaultdict(collections.Counter); N=collections.Counter()
for k,v in L.items():
    g=group(k)
    if not g: continue
    G[g].update(v['lem']); N[g]+=sum(v['lem'].values())
print(N)
groups=list(G)
# lemma stats
allem=set()
for g in groups: allem|=set(G[g])
stat={}
for l in allem:
    per=[G[g].get(l,0)/N[g]*100000 for g in groups]
    stat[l]={'bal':sum(per)/len(groups),'spread':sum(1 for p in per if p>=3),'n':sum(G[g].get(l,0) for g in groups),'by':{g:G[g].get(l,0) for g in groups}}
json.dump({'N':N,'stat':stat},open('pool_stats.json','w'),ensure_ascii=False)
# exam unseen
unseen={}
gl=collections.defaultdict(set)
for fn in sorted(glob.glob('unseen/*.txt')):
    k=os.path.basename(fn)[:-4]
    if k.endswith('_taught_head'): continue
    s=open(fn,encoding='utf8').read()
    # passage = after header lines until first 'Γ1'
    i=s.find('Γ1'); body=s[:i if i>0 else None]
    lines=body.split('\n')
    pas=[];gloss=[]
    for ln in lines[1:]:
        m=re.match(r'^\s*([^\s:]+[^:]{0,40}?)\s*:\s*(.+)$',ln)
        if m and re.search(r'[Ͱ-Ͽἀ-῿]',m.group(1)) and len(m.group(1))<40 and not ln.strip().startswith(('Στο','Οι ','Ο ')): gloss.append((m.group(1).strip(),m.group(2).strip()))
        else:
            tk=re.findall(r'[\u0370-\u03ff\u1f00-\u1fff]+',ln)
            if tk and sum(1 for x in tk if re.search(r'[\u1f00-\u1fff]',x))/len(tk)>=0.5: pas.append(ln)
    unseen[k]={'text':'\n'.join(pas),'gloss':gloss}
json.dump(unseen,open('unseen_parsed.json','w'),ensure_ascii=False,indent=1)
for k,v in unseen.items(): print(k,len(tokens(v['text'])),len(v['gloss']),[g[0] for g in v['gloss']][:6])
