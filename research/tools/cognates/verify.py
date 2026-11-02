#!/usr/bin/env python3
"""Verify the modern-Greek cognates in src_part*.txt against el.wiktionary (and en.wiktionary as fallback).

For every (ancient lemma family, modern word) pair we fetch the modern word's wiktionary page, take the
etymology section, follow up to two hops of linked words, and look for any of the family's root needles
(unaccented stems). Output: verified.json  {modern_word: {"status":..., "hops":n, "site":...}}

Run:  python3 verify.py   (needs network; results cached in .cache/)
"""
import json, os, re, sys, time, unicodedata, urllib.parse, urllib.request, glob

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '.cache'); os.makedirs(CACHE, exist_ok=True)
UA = 'ancient-greek-panhellenic-research/1.0 (educational project; contact ionpetro@gmail.com)'

def norm(s):
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('ς', 'σ')
    return s

def parse_src():
    entries = []
    for f in sorted(glob.glob(os.path.join(HERE, 'src_part*.txt'))):
        for ln, line in enumerate(open(f, encoding='utf-8'), 1):
            line = line.rstrip('\n')
            if not line.strip() or line.startswith('#'):
                continue
            parts = [p.strip() for p in line.split(' | ')]
            if len(parts) < 5:
                print('BAD LINE', f, ln, line[:80]); continue
            lemma, forms, units, modern, needles = parts[:5]
            note = parts[5] if len(parts) > 5 else ''
            mods = [m.strip() for m in modern.split(',') if m.strip()]
            dropped = [m for m in mods if m.endswith('?')]
            mods = [m for m in mods if not m.endswith('?')]
            entries.append(dict(lemma=lemma, forms=[x.strip() for x in forms.split(',') if x.strip()],
                                units=[int(u) for u in re.findall(r'\d+', units)],
                                modern=mods, needles=[norm(n) for n in needles.split(',') if n.strip()],
                                note=note, src=os.path.basename(f), line=ln, dropped=dropped))
    return entries

def api(site, titles):
    key = os.path.join(CACHE, site + '_' + str(abs(hash('|'.join(titles))) % 10**12) + '.json')
    # stable cache key
    import hashlib
    key = os.path.join(CACHE, site + '_' + hashlib.md5('|'.join(titles).encode()).hexdigest() + '.json')
    if os.path.exists(key):
        return json.load(open(key, encoding='utf-8'))
    url = f'https://{site}.wiktionary.org/w/api.php?' + urllib.parse.urlencode({
        'action': 'query', 'prop': 'revisions', 'rvprop': 'content', 'rvslots': 'main',
        'titles': '|'.join(titles), 'format': 'json', 'formatversion': 2, 'redirects': 1})
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            data = json.load(urllib.request.urlopen(req, timeout=40))
            json.dump(data, open(key, 'w', encoding='utf-8'), ensure_ascii=False)
            time.sleep(0.25)
            return data
        except Exception as e:
            time.sleep(1.5 * (attempt + 1))
    return {}

def fetch_pages(site, words):
    out = {}
    words = list(dict.fromkeys(words))
    for i in range(0, len(words), 40):
        batch = words[i:i + 40]
        data = api(site, batch)
        q = data.get('query', {})
        redir = {r['from']: r['to'] for r in q.get('redirects', [])}
        norm_map = {r['from']: r['to'] for r in q.get('normalized', [])}
        pages = {p['title']: p for p in q.get('pages', [])}
        for w in batch:
            t = norm_map.get(w, w); t = redir.get(t, t)
            p = pages.get(t)
            if p and not p.get('missing') and p.get('revisions'):
                out[w] = p['revisions'][0]['slots']['main']['content']
    return out

def greek_section(wt, site):
    """Return the Modern Greek (el) or Ancient Greek part's etymology text."""
    if site == 'el':
        m = re.search(r'==\{\{-el-\}\}==(.*?)(?=\n==\{\{-|\Z)', wt, re.S)
        sec = m.group(1) if m else wt
        e = re.search(r'===\{\{ετυμολογία\}\}===(.*?)(?=\n===|\Z)', sec, re.S)
        return e.group(1) if e else sec[:1500]
    else:
        m = re.search(r'==Greek==(.*?)(?=\n==[^=]|\Z)', wt, re.S)
        sec = m.group(1) if m else wt
        e = re.search(r'===Etymology[^=]*===(.*?)(?=\n===|\Z)', sec, re.S)
        return e.group(1) if e else sec[:1500]

def links(text):
    ws = re.findall(r'\[\[([^\]\|#]+)(?:\|[^\]]*)?\]\]', text)
    ws += re.findall(r'\{\{(?:ετυμ|ετ|λ|l|m|cog|inh|der|bor)\|[^|}]*\|(?:[^|}]*\|)?([^|}]+)', text)
    out = []
    for w in ws:
        w = w.strip()
        if re.search(r'[Ͱ-Ͽἀ-῿]', w) and len(w) < 40 and ':' not in w:
            out.append(w)
    return list(dict.fromkeys(out))

def main():
    entries = parse_src()
    allw = {}
    for e in entries:
        for m in e['modern']:
            allw.setdefault(m, []).append(e)
    words = list(allw)
    print(len(entries), 'entries,', len(words), 'modern words')
    el = fetch_pages('el', words)
    print('el pages found:', len(el))
    ety = {w: greek_section(wt, 'el') for w, wt in el.items()}
    # second hop pages
    hop2_words = set()
    for w, t in ety.items():
        hop2_words.update(links(t))
    el2 = fetch_pages('el', [x for x in hop2_words if x not in el])
    for w, wt in el2.items(): ety[w] = greek_section(wt, 'el')
    hop3 = set()
    for w in hop2_words:
        if w in ety: hop3.update(links(ety[w]))
    el3 = fetch_pages('el', [x for x in hop3 if x not in ety])
    for w, wt in el3.items(): ety[w] = greek_section(wt, 'el')
    print('etymology texts total:', len(ety))
    def check(w, e):
        needles = set(e['needles'])
        if len(norm(e['lemma'])) >= 5: needles.add(norm(e['lemma'])[:5])
        needles = {n.strip() for n in needles if len(n.strip()) >= 3}
        hit = lambda txt: next((n for n in needles if n in txt), None)
        if w in ety:
            h = hit(norm(ety[w]))
            if h: return dict(status='verified', hops=0, needle=h)
            l1 = links(ety[w])
            for x in l1:
                if x in ety:
                    h = hit(norm(ety[x]) + ' ' + norm(x))
                    if h: return dict(status='verified', hops=1, needle=h, via=x)
            for x in l1:
                for y in links(ety.get(x, '')):
                    if y in ety:
                        h = hit(norm(ety[y]) + ' ' + norm(y))
                        if h: return dict(status='verified', hops=2, needle=h, via=x + '>' + y)
        nw = norm(w); notes = norm(e['note'])
        if nw in notes and re.search('τθδδ|exam', notes):
            return dict(status='exam')
        h = hit(nw)
        if h: return dict(status='transparent', needle=h)
        return dict(status='etym-mismatch' if w in ety else 'no-page')
    result = {}
    for ei, e in enumerate(entries):
        for w in e['modern']:
            result[f"{ei}|{w}"] = check(w, e)
    json.dump(result, open(os.path.join(HERE, 'verified.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    from collections import Counter
    print(Counter(r['status'] for r in result.values()))

if __name__ == '__main__':
    main()
