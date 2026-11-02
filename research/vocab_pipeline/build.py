import json,re,glob,collections,unicodedata
from lem import strip_all,norm,tokens
from alias import ALIAS
def key(l):
    l=re.sub(r'\d+$','',l)
    return strip_all(norm(l)).lower()
POS={'n':'noun','a':'adjective','v':'verb','adv':'adverb','prep':'preposition','conj':'conjunction','part':'particle','pron':'pronoun','art':'article','num':'numeral','int':'interjection'}
# ---------- read authored entries
auth=[];seen={}
for fn in sorted(glob.glob('auth_*.txt'), key=lambda x:int(re.search(r'auth_(\d+)',x).group(1))):
    for ln in open(fn,encoding='utf8'):
        if not ln.strip(): continue
        p=re.split(r'\s*\|\s*',ln.rstrip('\n'))
        while len(p)<7: p.append('')
        if len(p)>7: p=p[:6]+[' | '.join(p[6:])]
        pos,lemma,forms,gender,cls,el,flag=[x.strip() for x in p[:7]]
        k=(norm(lemma),pos)
        if k in seen: print('DUP',lemma,pos,fn); continue
        seen[k]=1
        auth.append(dict(pos=pos,lemma=lemma,forms=forms,gender=gender,cls=cls,el=el,flag=flag,file=fn))
print('authored',len(auth))
rows=json.load(open('table.json'))
rk=collections.defaultdict(list)
for l,r in rows.items(): rk[key(l)].append(l)
# alias reverse: authored key -> list of alias lemmas
al=collections.defaultdict(list)
for a,b in ALIAS.items(): al[key(b)].append(a)
P=json.load(open('pool_stats.json'))
E=json.load(open('exam_lemmas.json')); dcc=json.load(open('dcc.json'))
# corpus token set for attestation
L=json.load(open('perseus_texts.json'))
toks=collections.Counter()
for v in L.values():
    for t in tokens(v['text']): toks[strip_all(norm(t)).lower()]+=1
for src in json.load(open('taught_texts.json')).values():
    for t in tokens(src): toks[strip_all(norm(t)).lower()]+=1
for u in json.load(open('unseen_parsed.json')).values():
    for t in tokens(u['text']): toks[strip_all(norm(t)).lower()]+=1
exact=collections.Counter()
for v in L.values():
    for t in tokens(v['text']): exact[norm(t).lower()]+=1
for src in list(json.load(open('taught_texts.json')).values()):
    for t in tokens(src): exact[norm(t).lower()]+=1
prefix=set()
for t in toks:
    for n in range(4,min(len(t),14)+1): prefix.add(t[:n])
def variants(f):
    f=re.sub(r'\([^)]*\)','',f) if False else f
    out=[]
    for part in re.split(r'\s*/\s*|\s*\(\s*|\s*\)\s*',f):
        part=part.strip(' ,·')
        if part and part!='—' and not part.startswith('μτχ') and re.search(r'[ἀ-῿Ͱ-Ͽ]',part): out.append(part.split()[0] if ' ' in part and False else part)
    return out
def attest(f):
    res=[]
    for v in variants(f):
        w=strip_all(norm(v)).lower()
        w=w.split()[0] if w else w
        if not w: continue
        stem=w[:-2] if len(w)>6 else w[:-1]
        if len(stem)<4: stem=w
        res.append((v, stem in prefix or w in toks))
    return res
tl=E['taught']; ul=E['unseen']
srcname={'Prot 320c-323a':'Πρωταγόρας 320c-323a','Rep 514a-515c':'Πολιτεία 514a-515c','Rep 518b-519a':'Πολιτεία 518b-519a','Rep 519b-520a':'Πολιτεία 519b-520a','Plut AlexFort 329A-D':'Πλούταρχος, Περὶ Ἀλεξάνδρου τύχης 329A-D','Metaph A2 982b12-28':'Αριστοτέλης, Μετὰ τὰ φυσικά Α2','NE B1 1103a14-b25':'Ἠθικά Νικομάχεια Β1','NE B6 1106a26-b7':'Ἠθικά Νικομάχεια Β6.4-8','NE B6 1106b18-28':'Ἠθικά Νικομάχεια Β6.10-13','NE B6 1106b36-1107a6':'Ἠθικά Νικομάχεια Β6.16','Pol A1 1252a1-7':'Πολιτικά Α1 1252a','Pol A1 1252b27-32':'Πολιτικά Α1 1252b','Pol A1 1253a7-18':'Πολιτικά Α1 1253a7-18','Pol A1 1253a29-39':'Πολιτικά Α1 1253a29-39','Pol G6 1281a39-b10':'Πολιτικά Γ6','Pol Th1 1337a33-b11':'Πολιτικά Θ1','Epic Men 122':'Ἐπίκουρος, Ἐπιστολὴ Μενοικέως 122','Aristotle Protrepticus 8-9 (exam text 2024S)':'Προτρεπτικὸς 8-9','Thuc III 71-75,81 (Alyk)':'Α΄ Λυκείου Θουκυδίδης Γ 71-75,81','Xen Hell II (Alyk)':'Α΄ Λυκείου Ξενοφῶν Ἑλληνικά Β','Lysias 16 Mantitheos (Blyk)':'Β΄ Λυκείου Λυσίας Ὑπὲρ Μαντιθέου'}
def collect(keyl):
    names=set(rk.get(keyl,[]))|set(al.get(keyl,[]))
    # add alias lemmas
    for a in list(names): pass
    return names
entries=[]
unmatched=[]
for a in auth:
    k=key(a['lemma'])
    ex=unicodedata.normalize('NFC',a['lemma'])
    names={ex} if ex in rows else set(rk.get(k,[]))
    for x in al.get(k,[]): names.add(x)
    names={n for n in names if n in rows}
    if not names: unmatched.append(a['lemma'])
    # aggregate stats
    byg=collections.Counter(); bal=0; spread=0; n=0
    # per-group counts: sum; bal sum of bal (additive per 100k)
    tG=collections.Counter(); tA=collections.Counter(); tB=collections.Counter(); un=collections.Counter()
    for nm in names:
        r=rows[nm]; bal+=r['bal']; n+=r['n']
        for g,c in r['by'].items(): byg[g]+=c
        for s,c in tl.get(nm,{}).items():
            if '(Alyk)' in s: tA[s]+=c
            elif '(Blyk)' in s: tB[s]+=c
            else: tG[s]+=c
        for s,c in ul.get(nm,{}).items(): un[s]+=c
    Ng=P['N']
    per={g:round(byg[g]/Ng[g]*100000,1) for g in Ng}
    spread=sum(1 for v in per.values() if v>=3)
    # dcc
    d=None
    for h,v in dcc.items():
        if key(h.split()[0])==k: d=v['rank']; break
    e=dict(id=None,lemma=a['lemma'],forms=a['forms'],pos=POS[a['pos']],gender=a['gender'] if a['gender'] not in ('-','m/f/n','m/f','m/n') else None,
           class_note=a['cls'],el=a['el'],note=a['flag'],
           n_corpus=n,bal_per100k=round(bal,1),spread_groups=spread,per100k_by_author=per,
           taught_syllabus=dict(tG),taught_alyk=dict(tA),taught_blyk=dict(tB),unseen_exam_counts=dict(un),dcc_rank=d,gorman_lemmas=sorted(names))
    entries.append(e)
print('unmatched (no corpus stats):',unmatched)
json.dump(entries,open('entries_raw.json','w'),ensure_ascii=False,indent=0)
# attestation / review report
rev=[]
for e,a in zip(entries,auth):
    probs=[]
    if a['pos']=='v':
        pp=[x.strip() for x in a['forms'].split(';')]
        e['pp']=pp
        for i,f in enumerate(pp):
            for v,ok in attest(f):
                if not ok: probs.append(f'pp{i+1}:{v}')
    elif a['pos']=='n':
        parts=[x.strip() for x in a['forms'].split(',')]
        e['pp']=None
        # headword exact attestation
        h=norm(parts[0]).lower()
        h=h.split()[0]
        if exact.get(h,0)==0 and strip_all(h) not in toks: probs.append('head:'+parts[0])
        if len(parts)>1:
            g=parts[1].strip().split()[0]
            if g.startswith('-'): pass
            else:
                if exact.get(norm(g).lower(),0)==0 and strip_all(norm(g)).lower() not in toks: probs.append('gen:'+g)
    else:
        e['pp']=None
        h=norm(a['lemma']).lower()
        if exact.get(h,0)==0 and strip_all(h) not in toks and ' ' not in h: probs.append('head:'+a['lemma'])
    e['attest_problems']=probs
    if probs: rev.append((a['lemma'],probs))
print('review items',len(rev))
print(' ; '.join(f"{l}:{','.join(p)}" for l,p in rev))
json.dump(entries,open('entries_raw.json','w'),ensure_ascii=False,indent=0)
