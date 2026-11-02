import re,glob,collections,json,os,unicodedata
auth_map=[('antiphon','Antiphon'),('aristotle','Aristotle'),('dem','Demosthenes'),('isaeus','Isaeus'),('isocrates','Isocrates'),('lysias','Lysias'),('plato','Plato'),('plut','Plutarch'),('ps_xen','PsXenophon'),('thuc','Thucydides'),('xen','Xenophon')]
def auth(fn):
    b=os.path.basename(fn).lower()
    for k,v in auth_map:
        if b.startswith(k): return v
corp=collections.defaultdict(collections.Counter)  # author -> lemma counter
forms=collections.defaultdict(collections.Counter) # (form)->lemma counts
pos=collections.defaultdict(collections.Counter)
ntok=collections.Counter()
rx=re.compile(r'<word [^>]*?form="([^"]*)"[^>]*?lemma="([^"]*)"[^>]*?postag="([^"]*)"')
for fn in sorted(glob.glob('gorman/*.xml')):
    a=auth(fn)
    t=open(fn,encoding='utf8').read()
    for m in rx.finditer(t):
        f,l,p=m.groups()
        if not l or p.startswith('u') or not p.strip('-') and False: continue
        if not re.search(r'[Ͱ-Ͽἀ-῿]',l): continue
        l=re.sub(r'\d+$','',l)
        corp[a][l]+=1; ntok[a]+=1
        forms[f][l]+=1; pos[l][p[:1]]+=1
json.dump({a:dict(c) for a,c in corp.items()},open('lemma_by_author.json','w'),ensure_ascii=False)
json.dump({f:dict(c) for f,c in forms.items()},open('form2lemma.json','w'),ensure_ascii=False)
json.dump({l:dict(c) for l,c in pos.items()},open('lemma_pos.json','w'),ensure_ascii=False)
print(ntok, sum(ntok.values()))
tot=collections.Counter()
for a,c in corp.items(): tot.update(c)
print(len(tot))
for l,n in tot.most_common(40): print(l,n,end=' | ')
