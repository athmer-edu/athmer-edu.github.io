import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome")
        pg = await b.new_page(viewport={"width":1920,"height":1080})
        errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("file:///home/claude/athmer/slides/"+__import__('sys').argv[1]+".html"); await pg.wait_for_timeout(800)
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(600)
        n = await pg.evaluate("SL.length")
        for i in range(n):
            await pg.evaluate(f"go({i})"); await pg.evaluate("$('#bAll').click()")
            await pg.evaluate("$$('.card,.term,.mc').forEach(c=>c.classList.add('open'));$$('.cmp td').forEach(t=>t.click())")
            await pg.wait_for_timeout(500)
            ov = await pg.evaluate("(()=>{const s=$('#screen');const el=s.firstElementChild;let mx=0;el.querySelectorAll('*').forEach(x=>{const r=x.getBoundingClientRect();if(r.height&&getComputedStyle(x).visibility!=='hidden')mx=Math.max(mx,r.bottom)});return [Math.round(mx),Math.round(s.getBoundingClientRect().bottom)]})()")
            print(i, await pg.evaluate("SL[idx].title"), ov, "OVER" if ov[0]>ov[1]+2 else "")
            await pg.screenshot(path=f"/tmp/d{i:02d}.png")
        print("errors", errs); await b.close()
asyncio.run(main())
