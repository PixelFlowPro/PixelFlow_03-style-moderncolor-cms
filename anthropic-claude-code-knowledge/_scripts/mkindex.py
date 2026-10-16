import os,re,sys
root=sys.argv[1]
for d in sorted(os.listdir(root)):
    p=os.path.join(root,d)
    if not os.path.isdir(p) or d.startswith('06'): continue
    rows=[]
    for dp,_,fs in os.walk(p):
        for f in sorted(fs):
            if not f.endswith('.md') or f=='INDEX.md': continue
            fp=os.path.join(dp,f); t=open(fp,errors='replace').read(6000)
            m=re.search(r"^title: ['\"]?(.*?)['\"]?$",t,re.M) or re.search(r'^# (.+)$',t,re.M)
            rows.append((os.path.relpath(fp,p), m.group(1).strip() if m else f))
    rows.sort()
    with open(os.path.join(p,'INDEX.md'),'w') as o:
        o.write(f'# Index — {d}\n\n{len(rows)} files\n\n| File | Title |\n|---|---|\n')
        for r,t in rows: o.write(f'| [{r}]({r}) | {t.replace("|","/")} |\n')
    print(d,len(rows))
