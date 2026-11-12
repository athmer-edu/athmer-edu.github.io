import sys,re
eng=open('./slides/chem10-2-1.html').read()
art=open('./js/envart.js').read()
common=open('tools/decks-env/common-env.js').read()
def build(key,title,brand,out):
    s=eng
    s=s.replace('<title>استخلاص الفلزات</title>',f'<title>{title}</title>',1)
    s=s.replace('<div id="brand">استخلاص <b>الفلزات</b></div>',f'<div id="brand">{brand}</div>',1)
    a=s.index('<script>\n/* ===== رسومات الوحدة الثانية'); b=s.index('</script>',a)
    s=s[:a]+'<script>\n'+art+'\n'+s[b:]
    a=s.index('/* ============ رسومات ============ */'); b=s.index('/* ============ حركة الإلكترونات')
    deck=open(f'tools/decks-env/{key}.js').read()
    s=s[:a]+common+'\n'+deck+'\n'+s[b:]
    s=s.replace('rt-21-idx',f'rt-{key}-idx')
    open(out,'w').write(s)
D={'e11':('الاستدامة','<b>الاستدامة</b>','env11-1-1'),'e12':('دورة الماء','دورة <b>الماء</b>','env11-1-2'),'e13a':('النظم البيئية','النظم <b>البيئية</b>','env11-1-3a'),'e13b':('دورة الكربون','دورة <b>الكربون</b>','env11-1-3b')}
for k in sys.argv[1:]:
    t,b,o=D[k];build(k,t,b,f'./slides/{o}.html');print('built',o)
