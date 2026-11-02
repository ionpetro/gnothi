import json,re,unicodedata,collections
def nm(w):
    w=unicodedata.normalize('NFD',w)
    w=re.sub('[̄̆]','',w)
    w=w.replace('̀','́').replace('ʼ','’').replace("'",'’')
    return unicodedata.normalize('NFC',w)
form2lem=collections.defaultdict(set)
lemmas={}   # (word,pos)-> brief
n=0
for line in open('kaikki_grc.jsonl',encoding='utf8'):
    d=json.loads(line); w=nm(d['word']); pos=d.get('pos')
    fo=None
    for s in d.get('senses',[]):
        for f in s.get('form_of',[]) or []:
            form2lem[w].add(nm(f['word']))
        for f in s.get('alt_of',[]) or []:
            form2lem[w].add(nm(f['word']))
    isform=any(s.get('form_of') for s in d.get('senses',[]))
    if not isform:
        gl=[g for s in d.get('senses',[]) for g in s.get('glosses',[])][:3]
        lemmas.setdefault(w,[]).append({'pos':pos,'gl':gl,'ht':[h.get('expansion') for h in d.get('head_templates',[])][:1]})
        for f in d.get('forms',[]):
            if f.get('source')=='conjugation' or f.get('source')=='declension':
                form2lem[nm(f['form'])].add(w)
json.dump({k:sorted(v) for k,v in form2lem.items()},open('k_form2lem.json','w'),ensure_ascii=False)
json.dump(lemmas,open('k_lemmas.json','w'),ensure_ascii=False)
print(len(form2lem),len(lemmas))
