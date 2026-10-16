import sys, re, os
from bs4 import BeautifulSoup
from markdownify import markdownify as md
url, src, dst = sys.argv[1], sys.argv[2], sys.argv[3]
html = open(src, encoding='utf-8', errors='replace').read()
s = BeautifulSoup(html, 'html.parser')
title = (s.find('meta', property='og:title') or {}).get('content') or (s.title.string if s.title else url)
desc = (s.find('meta', attrs={'name':'description'}) or {}).get('content', '')
for t in s(['script','style','noscript','svg','nav','footer','header','form','iframe','button']): t.decompose()
node = s.find('article') or s.find('main') or s.body
text = md(str(node), heading_style='ATX', bullets='-')
text = re.sub(r'\n{3,}', '\n\n', text).strip()
os.makedirs(os.path.dirname(dst) or ".", exist_ok=True)
open(dst,'w').write(f"---\ntitle: {title!r}\nsource: {url}\ndescription: {desc!r}\nscraped: 2026-10-16\n---\n\n{text}\n")
