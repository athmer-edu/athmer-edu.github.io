import asyncio,sys
from playwright.async_api import async_playwright
LID=sys.argv[1]
async def play(pg):
    t=await pg.evaluate("PLAY.a.type")
    if t=="sort":
        n=await pg.evaluate("PLAY.items.length")
        for k in range(n):
            ans=await pg.evaluate("PLAY.items[PLAY.k][1]")
            await pg.click(f'.bin-g[data-v="{ans}"]'); await pg.wait_for_timeout(620)
    elif t=="match":
        for _ in range(12):
            pr=await pg.evaluate("(()=>{const c=PLAY.cards;for(let a=0;a<c.length;a++){if(PLAY.got.has(c[a].p))continue;for(let b=a+1;b<c.length;b++){if(c[b].p===c[a].p)return [a,b]}}return null})()")
            if not pr: break
            await pg.click(f'.mcard[data-k="{pr[0]}"]'); await pg.click(f'.mcard[data-k="{pr[1]}"]'); await pg.wait_for_timeout(700)
    elif t=="order":
        R=await pg.evaluate("PLAY.a.rounds.length")
        for r in range(R):
            items=await pg.evaluate("PLAY.a.rounds[PLAY.r].items")
            for w in items:
                await pg.click(f'.chip-g[data-w="{w}"]'); await pg.wait_for_timeout(120)
            await pg.wait_for_timeout(2400)
    elif t=="blanks":
        for _ in range(14):
            w=await pg.evaluate("(()=>{const p=PLAY.parts.find(p=>p.ans&&!p.fill);return p?p.ans:null})()")
            if not w: break
            await pg.click(f'.chip-g:not([disabled]):text-is("{w}")'); await pg.wait_for_timeout(200)
        await pg.wait_for_timeout(600)
    elif t=="data":
        n=await pg.evaluate("PLAY.a.qs.length")
        for _ in range(n):
            j=await pg.evaluate("PLAY.a.qs[PLAY.qi][2]")
            await pg.click(f'.ropts .opt[data-j="{j}"]'); await pg.wait_for_timeout(1300)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
        pg=await b.new_page(viewport={"width":1280,"height":900})
        errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(f"file:///home/claude/athmer/index.html#{LID}"); await pg.wait_for_timeout(700)
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(1000)
        await pg.click("#in"); await pg.wait_for_timeout(500)
        await pg.screenshot(path=f"/tmp/{LID}-ex.png", full_page=True)
        await pg.click('.tab[data-t="activities"]'); await pg.wait_for_timeout(300)
        n=await pg.evaluate(f"L('{LID}').activities.length")
        await pg.click('[data-lv="0"]'); await pg.wait_for_timeout(400)
        for i in range(n):
            await play(pg)
            if i<n-1:
                await pg.click('#next'); await pg.wait_for_timeout(400)
        print("levels",await pg.evaluate(f"JSON.stringify(gameTotals('{LID}'))"))
        await pg.click('#toMap2'); await pg.wait_for_timeout(300)
        await pg.click('.tab[data-t="exams"]'); await pg.wait_for_timeout(400)
        await pg.evaluate("document.querySelectorAll('.mc[data-g=\"x\"]').forEach(q=>q.querySelectorAll('.opt')[+q.dataset.r].click())")
        await pg.evaluate("document.querySelectorAll('.fq').forEach(q=>{q.querySelectorAll('.m-row').forEach(r=>{r.querySelector('select').value=r.dataset.a});q.querySelector('.fchk').click()})")
        bad=await pg.evaluate("[...document.querySelectorAll('.fq .m-row')].filter(r=>!r.classList.contains('ok')).length")
        broken=await pg.evaluate("[...document.querySelectorAll('img')].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)")
        await pg.screenshot(path=f"/tmp/{LID}-xm.png", full_page=True)
        print("path",await pg.evaluate(f"JSON.stringify(pathState('{LID}').exam)"),"fill-bad",bad,"broken",broken)
        await pg.set_viewport_size({"width":390,"height":844}); await pg.wait_for_timeout(300)
        o1=await pg.evaluate("document.documentElement.scrollWidth")
        await pg.click('.tab[data-t="explain"]'); await pg.wait_for_timeout(400)
        print("overflow",o1,await pg.evaluate("document.documentElement.scrollWidth"),"errors",errs)
        await b.close()
asyncio.run(main())
