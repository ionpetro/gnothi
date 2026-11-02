#!/usr/bin/env python3
"""Cross-check extracted school-book Greek against the Perseus (Burnet/Bekker-type) edition.
Usage: verify_against_perseus.py <perseus.xml> <extracted greek text file or string>
Prints word-level differences (diacritics stripped first, then with diacritics)."""
import re, sys, unicodedata, difflib, html

def strip_tags(x):
    x = re.sub(r'<teiHeader.*?</teiHeader>', ' ', x, flags=re.S)
    x = re.sub(r'<note.*?</note>', ' ', x, flags=re.S)
    x = re.sub(r'<[^>]+>', ' ', x)
    return html.unescape(x)

def norm_keep(t):
    t = unicodedata.normalize('NFC', t)
    t = t.replace('᾽', '’').replace('ʼ', '’').replace('᾽', '’').replace("'", '’').replace('ʼ', '’')
    t = re.sub(r'[\[\]<>«»“”"—–·;:,.!?()··]', ' ', t)
    return t.split()

def base(w):
    d = unicodedata.normalize('NFD', w.lower())
    d = ''.join(c for c in d if not unicodedata.combining(c))
    d = d.replace('ς', 'σ').replace('’', '')
    return d

def compare(perseus_xml, ours):
    P = norm_keep(strip_tags(open(perseus_xml, encoding='utf8').read()))
    O = norm_keep(ours)
    Pb = [base(w) for w in P]; Ob = [base(w) for w in O]
    # locate: first 5 words of ours
    k = 5
    start = None
    for i in range(len(Pb) - k):
        if Pb[i:i+k] == Ob[:k]:
            start = i; break
    if start is None:
        return None, "START NOT FOUND"
    win = Pb[start:start + len(Ob) + 40]
    sm = difflib.SequenceMatcher(None, Ob, win, autojunk=False)
    diffs = []
    for tag, a1, a2, b1, b2 in sm.get_opcodes():
        if tag == 'equal': continue
        if b1 >= len(Ob) + 20 and tag == 'insert': continue
        diffs.append((tag, ' '.join(O[a1:a2]), ' '.join(P[start+b1:start+b2])))
    # accent-level diffs among aligned equal words
    acc = []
    for tag, a1, a2, b1, b2 in sm.get_opcodes():
        if tag == 'equal':
            for x, y in zip(O[a1:a2], P[start+b1:start+b2]):
                if unicodedata.normalize('NFC', x) != unicodedata.normalize('NFC', y):
                    acc.append((x, y))
    return diffs, acc

if __name__ == '__main__':
    d, a = compare(sys.argv[1], sys.argv[2] if not sys.argv[2].startswith('@') else open(sys.argv[2][1:]).read())
    print('LETTER-LEVEL DIFFS:', d)
    print('ACCENT/BREATHING DIFFS:', a)
