import glob,os,re,json
from lxml import etree
out={}
for fn in sorted(glob.glob('perseus/*.xml')):
    try:
        t=etree.parse(fn)
    except Exception as e:
        print('ERR',fn,e); continue
    root=t.getroot()
    ns={'t':'http://www.tei-c.org/ns/1.0'}
    title=''.join(root.xpath('string((//t:titleStmt/t:title)[1])',namespaces=ns)).strip()
    auth=''.join(root.xpath('string((//t:titleStmt/t:author)[1])',namespaces=ns)).strip()
    etree.strip_elements(root,'{http://www.tei-c.org/ns/1.0}note','{http://www.tei-c.org/ns/1.0}head','{http://www.tei-c.org/ns/1.0}teiHeader','{http://www.tei-c.org/ns/1.0}label','{http://www.tei-c.org/ns/1.0}speaker',with_tail=False)
    body=root.xpath('//t:body',namespaces=ns)
    txt=' '.join(' '.join(b.itertext()) for b in body)
    txt=re.sub(r'\s+',' ',txt)
    key=os.path.basename(fn).replace('.xml','')
    out[key]={'title':title,'author':auth,'text':txt}
json.dump(out,open('perseus_texts.json','w'),ensure_ascii=False)
for k,v in out.items():
    greek=len(re.findall(r'[Ͱ-Ͽἀ-῿]+',v['text']))
    v['n']=greek
    print(k,v['author'][:12],'|',v['title'][:50],'|',greek)
