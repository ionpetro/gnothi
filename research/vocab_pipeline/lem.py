import json,re,unicodedata,collections,glob
def norm(w):
    w=unicodedata.normalize('NFD',w)
    w=w.replace('̀','́')  # grave->acute
    w=w.replace('ʼ','’').replace("'",'’').replace('᾽','’').replace('ʼ','’')
    return unicodedata.normalize('NFC',w)
def strip_acc(w):
    w=unicodedata.normalize('NFD',w)
    w=re.sub('[̀́͂̈]','',w)
    return unicodedata.normalize('NFC',w)
def strip_all(w):
    w=unicodedata.normalize('NFD',w)
    w=re.sub('[̀́͂̈̓̔ͅ]','',w).replace('ς','σ')
    return unicodedata.normalize('NFC',w)
G=json.load(open('form2lemma.json'))
F=collections.defaultdict(collections.Counter)
for f,c in G.items():
    for l,n in c.items(): F[norm(f)][l]+=n*100
# UD fallback
for fn in glob.glob('ud/*.conllu'):
    for line in open(fn,encoding='utf8'):
        if line[0].isdigit():
            p=line.split('\t')
            if len(p)>3 and '-' not in p[0] and p[3]!='PUNCT' and re.search(r'[Ͱ-Ͽἀ-῿]',p[2]):
                F[norm(p[1])][re.sub(r'\d+$','',p[2])]+=1
A=collections.defaultdict(collections.Counter)
for f,c in F.items():
    A[strip_acc(f)].update(c)
B=collections.defaultdict(collections.Counter)
for f,c in F.items(): B[strip_all(f)].update(c)
K=json.load(open('k_form2lem.json'))
KL=json.load(open('k_lemmas.json'))
def klem(w):
    n=norm(w); lo=n.lower()
    for x in (n,lo):
        if x in K:
            c=[l for l in K[x] if l in KL] or K[x]
            return c[0]
    return None
MAN={}
for ln in open('manual_map.txt',encoding='utf8'):
    if '=' in ln:
        a,b=ln.strip().split('=',1); MAN[norm(a).lower()]=b
def lemmatize(w):
    w=w.strip('\u00b7\u0387;')
    r=lemmatize0(w)
    if r: return r
    m=MAN.get(norm(w).lower())
    if m: return m
    return klem(w)
def lemmatize0(w):
    n=norm(w)
    if n in F: return F[n].most_common(1)[0][0]
    # capitalised -> lower
    lo=n.lower()
    if lo in F: return F[lo].most_common(1)[0][0]
    s=strip_acc(lo)
    if s in A: return A[s].most_common(1)[0][0]
    s=strip_all(lo)
    if s in B: return B[s].most_common(1)[0][0]
    return None
tokre=re.compile(r"[Ͱ-Ͽἀ-῿]+[’ʼ']?")
def tokens(text): return tokre.findall(text)
