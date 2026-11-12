import asyncio,sys
from playwright.async_api import async_playwright
LID=sys.argv[1];W=int(sys.argv[2]) if len(sys.argv)>2 else 1280
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=await b.new_page(viewport={"width":W,"height":900});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    await pg.goto(f"file:///home/claude/athmer/index.html#{LID}");await pg.wait_for_timeout(600)
    await pg.evaluate("localStorage.clear()");await pg.reload();await pg.wait_for_timeout(900)
    await pg.click('.tab[data-t="activities"]');await pg.wait_for_timeout(400)
    n=await pg.evaluate(f"L('{LID}').activities.length")
    for i in range(n):
      await pg.evaluate(f"startLevel('{LID}',{i})");await pg.wait_for_timeout(500)
      t=await pg.evaluate("PLAY.a.type")
      if t in("runner","catch","pop"):
        await pg.click('#rngo' if t=="runner" else '#ago');await pg.wait_for_timeout(2500)
        await pg.screenshot(path=f"/tmp/mx_{LID}_{i}.png")
        await pg.evaluate("PLAY.rt.auto=true;PLAY.rt.k=5")
      elif t=="match":
        for _ in range(12):
          pr=await pg.evaluate("(()=>{const c=PLAY.cards;for(let a=0;a<c.length;a++){if(PLAY.got.has(c[a].p))continue;for(let b=a+1;b<c.length;b++){if(c[b].p===c[a].p)return [a,b]}}return null})()")
          if not pr: break
          await pg.click(f'.mcard[data-k="{pr[0]}"]');await pg.click(f'.mcard[data-k="{pr[1]}"]');await pg.wait_for_timeout(700)
      elif t=="order":
        R=await pg.evaluate("PLAY.a.rounds.length")
        for r in range(R):
          items=await pg.evaluate("PLAY.a.rounds[PLAY.r].items")
          for w in items:
            await pg.click(f'.chip-g[data-w="{w}"]');await pg.wait_for_timeout(120)
          await pg.wait_for_timeout(2400)
      await pg.wait_for_selector('.result',timeout=120000)
      print(i,t,await pg.evaluate(f"JSON.stringify(gstate('{LID}').lv[{i}])"))
    print("totals",await pg.evaluate(f"JSON.stringify(gameTotals('{LID}'))"),"errors",errs)
    await b.close()
asyncio.run(main())
