import re,json,glob
from lxml import etree
NS='{http://www.tei-c.org/ns/1.0}'
def divtext(el):
    etree.strip_elements(el,NS+'note',with_tail=False)
    return re.sub(r'\s+',' ',' '.join(el.itertext())).strip()
def get(k):
    fn=glob.glob(f'perseus/{k}*.xml')[0]
    return etree.parse(fn).getroot()
def path(root,*ns):
    els=[root.xpath('//t:body',namespaces={'t':NS[1:-1]})[0]]
    for n in ns:
        nxt=[]
        for e in els:
            nxt+= [d for d in e.iter(NS+'div') if d.get('n')==str(n) and d.get('type')=='textpart' and d.getparent() in (e,) or (d.get('n')==str(n) and d.get('type')=='textpart' and d.getparent() is e)]
        els=nxt
    return els
T=json.load(open('taught_texts.json'))
r=get('tlg0003.tlg001')
out=[]
for ch in (71,72,73,74,75,81):
    els=path(r,3,ch)
    out+= [divtext(e) for e in els]
T['Thuc III 71-75,81 (Alyk)']=' '.join(out)
r=get('tlg0032.tlg001')
out=[]
for ch,secs in ((2,[1,2,3,4]+list(range(16,24))),(3,range(50,57)),(4,range(18,24))):
    for s in secs:
        els=path(r,2,ch,s); out+=[divtext(e) for e in els]
T['Xen Hell II (Alyk)']=' '.join(out)
r=get('tlg0540.tlg016')
print(etree.tostring(r.xpath('//t:body',namespaces={'t':NS[1:-1]})[0])[:300])
T['Lysias 16 Mantitheos (Blyk)']=divtext(r.xpath('//t:body',namespaces={'t':NS[1:-1]})[0])
T['Epic Men 122']=T['Epic Men 122'].split('Ἃ δέ σοι συνεχῶς')[0]
T['Pol A1 1253a7-18']=re.sub(r'Hom\. Il\. 9\.63[^ ]*','',T['Pol A1 1253a7-18'])
prot=open('/Users/ionpetro/Documents/jobmachine/experiments/ancient-greek-panhellenic/research/pastpapers-raw/ΣΕΠΤΕΜΒΡΙΟΣ_2024__2024_09_them_arxaia_100924.txt',encoding='utf8').read()
a=prot.find('Τὰ ὑποκείμενα'); b=prot.find('Α1.α.',a)
T['Aristotle Protrepticus 8-9 (exam text 2024S)']=re.sub(r'\s+',' ',prot[a:b])
for k,v in T.items(): print(k,len(v.split()))
json.dump(T,open('taught_texts.json','w'),ensure_ascii=False,indent=1)
