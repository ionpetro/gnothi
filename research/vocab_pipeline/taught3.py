import re,json,glob
from lxml import etree
NS='{http://www.tei-c.org/ns/1.0}'
def divtext(el):
    etree.strip_elements(el,NS+'note',with_tail=False)
    return re.sub(r'\s+',' ',' '.join(el.itertext())).strip()
def get(k):
    return etree.parse(glob.glob(f'perseus/{k}*.xml')[0]).getroot()
def child(e,sub,n):
    for d in e.iter(NS+'div'):
        if d is e: continue
        if d.get('subtype')==sub and d.get('n')==str(n): 
            # ensure direct textpart child (nearest textpart ancestor is e)
            p=d.getparent()
            while p is not None and p.get('type')!='textpart' and p.get('type')!='edition': p=p.getparent()
            if p is e: return d
def find(root,*spec):
    e=root.xpath('//t:div[@type="edition"]',namespaces={'t':NS[1:-1]})[0]
    for sub,n in spec:
        e=child(e,sub,n)
        if e is None: return None
    return e
T=json.load(open('taught_texts.json'))
r=get('tlg0003.tlg001'); out=[]
for ch in (71,72,73,74,75,81):
    e=find(r,('book',3),('chapter',ch)); out.append(divtext(e))
T['Thuc III 71-75,81 (Alyk)']=' '.join(out)
r=get('tlg0032.tlg001'); out=[]
for ch,secs in ((2,[1,2,3,4]+list(range(16,24))),(3,range(50,57)),(4,range(18,24))):
    for s in secs:
        e=find(r,('book',2),('chapter',ch),('section',s)); out.append(divtext(e))
T['Xen Hell II (Alyk)']=' '.join(out)
for k in list(T)[-6:]: print(k,len(T[k].split()))
json.dump(T,open('taught_texts.json','w'),ensure_ascii=False,indent=1)
