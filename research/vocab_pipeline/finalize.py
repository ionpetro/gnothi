import json,re,collections,unicodedata
from srcnames import srcname
E=json.load(open('entries_raw.json'))
U=json.load(open('unseen_parsed.json'))
dcc=json.load(open('dcc.json'))
exam_ids={'2021J':'Ιούνιος 2021','2021S-epan':'Σεπτ. 2021 (επαναληπτικές)','2021S-omog':'Σεπτ. 2021 (ομογενών)','2022J':'Ιούνιος 2022','2022S':'Σεπτ. 2022','2023J':'Ιούνιος 2023','2023S-omog':'Σεπτ. 2023 (ομογενών)','2023S-epan':'Σεπτ. 2023 (επαναληπτικές)','2024J':'Ιούνιος 2024','2024S':'Σεπτ. 2024','2025S-omog':'Σεπτ. 2025 (εισαγωγικές)','2025S-epan':'Σεπτ. 2025 (επαναληπτικές)','2025J':'Ιούνιος 2025','2026J':'Ιούνιος 2026'}
tr={'α':'a','β':'b','γ':'g','δ':'d','ε':'e','ζ':'z','η':'e','θ':'th','ι':'i','κ':'k','λ':'l','μ':'m','ν':'n','ξ':'x','ο':'o','π':'p','ρ':'r','σ':'s','ς':'s','τ':'t','υ':'u','φ':'ph','χ':'ch','ψ':'ps','ω':'o'}
def slug(w):
    w=unicodedata.normalize('NFD',w.lower())
    w=''.join(c for c in w if not unicodedata.combining(c))
    return ''.join(tr.get(c,c if c.isalnum() else '') for c in w)
POSAB={'noun':'n','verb':'v','adjective':'adj','adverb':'adv','preposition':'prep','conjunction':'conj','particle':'part','pronoun':'pron','article':'art','numeral':'num','interjection':'int'}
UNCERTAIN={
 'ἔθω':'Σπάνιο λήμμα· ο συνήθης τύπος είναι ο παρακείμενος εἴωθα (ενεστ. σημασία).',
 'μείρομαι':'Στο κείμενο του Πρωταγόρα εμφανίζεται ως εἱμαρμένος/εἵμαρται· το λήμμα προέρχεται από τη λημματοποίηση του corpus.',
 'ἐμπολίζω':'Αβέβαιο λήμμα για το ἐμπολισθεῖσιν του Πλουτάρχου (Περὶ τῆς Ἀλεξάνδρου τύχης 329 Α-D) — ελέγξτε με το σχολικό λεξιλόγιο.',
 'ἀποτρέπω':'Ο παρακείμενος ενεργητικής φωνής παραλείφθηκε επειδή δεν είναι σίγουρος· ελέγξτε.',
 'πωλέω':'Οι τύποι παρακειμένου/αορίστου παθητικού προέρχονται από το πιπράσκω.',
 'ταὐτός':'Δεν είναι αυτοτελές λήμμα: κράση του τὸ αὐτό· δείτε το αὐτός.',
 'σφεῖς':'Κυρίως Θουκυδίδης/Ξενοφών· χρήση περιορισμένη στα σχολικά κείμενα.',
 'ἄερκτος':'Η σημασία «αφύλακτος» προέρχεται από το γλωσσάρι της επίσημης εξέτασης του 2026 (ο όρος δεν είναι συνηθισμένος).',
 'τρέπω':'Ο παρακείμενος τέτροφα/τέτραφα είναι σπάνιος· στα σχολικά βιβλία συνήθως αναφέρεται το τέτραμμαι.',
 'τρέφω':'Η μετάθεση της δασύτητας (τρέφω → θρέψω, τέθραμμαι) να ελεγχθεί με το σχολικό βιβλίο.',
 'ἀνολοφύρομαι':'Σπάνιο· σε εξέταση Ιουνίου 2024 (ἀνωλοφύρατο).',
 'προΐστημι':'Ο συνδυασμός μέσης/αμετάβατης φωνής να ελεγχθεί σε σχολικό λεξικό.',
 'μέτειμι':'Δύο ρήματα: μέτειμι (εἰμί) και μέτειμι (εἶμι)· ο τύπος μέτεστι + γεν. είναι ο συνήθης.',
 'δέομαι':'Στατιστικά αναμειγνύεται με το δεῖ/δέω· δείτε τα αντίστοιχα λήμματα.',
 'ἐρῶ':'Μέλλων του λέγω· δεν συγχέεται με το ἐράω.',
 'ἐξίστημι':'Έλεγχος του μέλλοντα (ἐκστήσω).',
}
out=[]
for e in E:
    L=e['lemma']
    tG=e['taught_syllabus']; tA=e['taught_alyk']; tB=e['taught_blyk']; un=e['unseen_exam_counts']
    nG=sum(tG.values()); nUn=sum(un.values())
    bal=e['bal_per100k']
    tier=3
    if (nG or nUn) and bal>=3 or bal>=25: tier=1
    elif nG or nUn: tier=2
    elif tA or tB: tier=3
    if nG and bal<3: tier=2
    srcs=[]
    for s,c in sorted(tG.items(),key=lambda x:-x[1]): srcs.append({'type':'taught-Γ','text':srcname.get(s,s),'count':c})
    for s,c in sorted(un.items()): srcs.append({'type':'unseen-exam','text':exam_ids.get(s,s),'count':c})
    for s,c in sorted(tA.items()): srcs.append({'type':'course-Α-Λυκείου','text':srcname.get(s,s),'count':c})
    for s,c in sorted(tB.items()): srcs.append({'type':'course-Β-Λυκείου','text':srcname.get(s,s),'count':c})
    by=e['per100k_by_author']; top=sorted(by.items(),key=lambda x:-x[1])[:3]
    note=f"Attic-prose pool (Perseus canonical-greekLit, 2.34M tokens, 9 author groups): {e['n_corpus']} tokens; balanced rate {bal} per 100k; in {e['spread_groups']}/9 author groups at >=3 per 100k (top: {', '.join(a+' '+str(v) for a,v in top if v>0)})"
    if nG: note+=f"; Γ΄ syllabus texts: {nG}x"
    if nUn: note+=f"; unseen papers 2021-26: {nUn}x in {len(un)} paper(s)"
    if tA or tB: note+=f"; Α΄/Β΄ course texts: {sum(tA.values())+sum(tB.values())}x"
    if e['dcc_rank']: note+=f"; DCC Greek core list rank {e['dcc_rank']}"
    unc=L in UNCERTAIN
    g=e['gender']
    if g in ('ὁ','ἡ','τό'): g={'ὁ':'m','ἡ':'f','τό':'n'}[g]
    elif g=='ὁ / ἡ': g='m/f'
    row=dict(id=f"{slug(L)}-{POSAB[e['pos']]}",lemma=L,forms=e['forms'],pos=e['pos'],gender=g,
             **({'class':e['class_note']} if e['class_note'] else {}),
             el=e['el'], **({'principal_parts':[None if p in('—','-') else p for p in e['pp']]} if e.get('pp') else {}),
             sources=srcs,tier=tier,freq={'tokens_in_pool':e['n_corpus'],'balanced_per100k':bal,'author_groups_ge3':e['spread_groups'],'per100k_by_author':by,'taught_syllabus':nG,'unseen_2021_26':nUn,'dcc_core_rank':e['dcc_rank']},
             freq_note=note,corpus_form_attested=not any(p.startswith('head:') for p in e.get('attest_problems',[])),uncertain=unc)
    if unc: row['uncertain_note']=UNCERTAIN[L]
    out.append(row)
# dedupe id collisions
c=collections.Counter()
for r in out:
    c[r['id']]+=1
    if c[r['id']]>1: r['id']=f"{r['id']}{c[r['id']]}"
out.sort(key=lambda r:(r['tier'],-r['freq']['balanced_per100k']))
with open('/Users/ionpetro/Documents/jobmachine/experiments/ancient-greek-panhellenic/research/vocab.jsonl','w',encoding='utf8') as f:
    for r in out: f.write(json.dumps(r,ensure_ascii=False)+'\n')
print(len(out),collections.Counter(r['tier'] for r in out),collections.Counter(r['pos'] for r in out))
print('uncertain',sum(r['uncertain'] for r in out), 'unattested heads',sum(1 for r in out if not r['corpus_form_attested']))
# names
names=[]
for ln in open('names.txt',encoding='utf8'):
    p=[x.strip() for x in ln.split(' | ')]
    names.append(dict(lemma=p[0],forms=p[1],gender={'ὁ':'m','ἡ':'f','τό':'n'}.get(p[2],p[2]),el=p[3],where=p[4]))
with open('/Users/ionpetro/Documents/jobmachine/experiments/ancient-greek-panhellenic/research/vocab_names.jsonl','w',encoding='utf8') as f:
    for r in names: f.write(json.dumps(r,ensure_ascii=False)+'\n')
json.dump(out,open('final_entries.json','w'),ensure_ascii=False)
