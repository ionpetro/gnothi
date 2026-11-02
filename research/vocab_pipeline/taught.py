import re,json,collections
from lxml import etree
def clean(x):
    x=re.sub(r'<note.*?</note>','',x,flags=re.S)
    x=re.sub(r'<(?!milestone)[^>]+>',' ',x)
    return x
def load(k):
    import glob
    fn=glob.glob(f'perseus/{k}*.xml')[0]
    t=open(fn,encoding='utf8').read()
    t=t[t.find('<body'):]
    return t
def steph(t,a,b_next):
    # milestones with n="320c"
    i=re.search(r'<milestone[^>]*n="%s"[^>]*/>'%a,t); 
    j=re.search(r'<milestone[^>]*n="%s"[^>]*/>'%b_next,t)
    assert i and j,(a,b_next)
    seg=t[i.end():j.start()]
    return re.sub(r'<milestone[^>]*/>',' ',clean(seg))
def bekker(t,p1,l1,p2,l2):
    ms=[]
    cur=None
    for m in re.finditer(r'<milestone[^>]*/>',t):
        s=m.group(0)
        n=re.search(r'n="([^"]*)"',s).group(1)
        if 'unit="page"' in s or 'unit="bekker_page"' in s: cur=n; ms.append((m.start(),m.end(),cur,0)); 
        elif 'unit="line"' in s or 'unit="Line"' in s:
            try: ms.append((m.start(),m.end(),cur,int(n)))
            except: pass
    # start: last marker with page==p1 and line<=l1 (if none, page marker)
    cand=[x for x in ms if x[2]==p1 and x[3]<=l1]
    st=cand[-1]
    # end: first marker after with (page==p2 and line>l2) or page != p2 after p2 seen
    seen=False; en=None
    for x in ms:
        if x[0]<=st[0]: continue
        if x[2]==p2: seen=True
        if seen and (x[2]!=p2 or x[3]>l2): en=x; break
    seg=t[st[1]:en[0]]
    return re.sub(r'<milestone[^>]*/>',' ',clean(seg))
T={}
P='tlg0059.tlg022'; t=load(P); T['Prot 320c-323a']=steph(t,'320c','323b')
t=load('tlg0059.tlg030'); T['Rep 514a-515c']=steph(t,'514a','515d'); T['Rep 518b-519a']=steph(t,'518b','519b'); T['Rep 519b-520a']=steph(t,'519b','520b')
t=load('tlg0007.tlg087.perseus-grc3'); T['Plut AlexFort 329A-D']=steph(t,'329a','329e')
t=load('tlg0086.tlg025'); T['Metaph A2 982b12-28']=bekker(t,'982b',12,'982b',28)
t=load('tlg0086.tlg010'); 
T['NE B1 1103a14-b25']=bekker(t,'1103a',14,'1103b',25)
T['NE B6 1106a26-b7']=bekker(t,'1106a',26,'1106b',7)
T['NE B6 1106b18-28']=bekker(t,'1106b',18,'1106b',28)
T['NE B6 1106b36-1107a6']=bekker(t,'1106b',36,'1107a',6)
t=load('tlg0086.tlg035')
T['Pol A1 1252a1-7']=bekker(t,'1252a',1,'1252a',7)
T['Pol A1 1252b27-32']=bekker(t,'1252b',27,'1252b',32)
T['Pol A1 1253a7-18']=bekker(t,'1253a',7,'1253a',18)
T['Pol A1 1253a29-39']=bekker(t,'1253a',29,'1253a',39)
try: T['Pol G6 1281a39-b10']=bekker(t,'1281a',39,'1281b',10)
except Exception as e: print('G6 fail',e)
try: T['Pol Th1 1337a33-b11']=bekker(t,'1337a',33,'1337b',11)
except Exception as e: print('Th fail',e)
# Epicurus DL X 122
t=load('tlg0004.tlg001')
m=re.search(r'n="122"',t[t.find('n="10"'):]) 
seg=t[t.find('n="10"'):]
i=seg.find('Μήτε νέος'); 
print('DL idx',i)
T['Epic Men 122']=clean(seg[i:i+1400]) if i>0 else ''
for k,v in T.items():
    v=re.sub(r'\s+',' ',v).strip(); T[k]=v
    print(k,len(v.split()),v[:70],'...',v[-50:])
json.dump(T,open('taught_texts.json','w'),ensure_ascii=False,indent=1)
