import json,sys
for p in sys.argv[1:]:
    try:
        nb=json.load(open(p))
        for c in nb.get('cells',[]):
            if c.get('cell_type')=='code': c['outputs']=[]; c['execution_count']=None
            c.get('attachments') and c.pop('attachments')
        json.dump(nb,open(p,'w'),indent=1,ensure_ascii=False)
    except Exception as e: print('skip',p,e)
