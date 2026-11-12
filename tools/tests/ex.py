import asyncio,sys
from playwright.async_api import async_playwright
async def m(lid,out,w):
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome");pg=await b.new_page(viewport={'width':w,'height':900})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto(f"file:///home/claude/athmer/index.html#{lid}");await pg.wait_for_timeout(1500)
    # click interactive things
    for sel in ['.wp[data-p="interc"]','.cp[data-p="comb"]','.wn[data-n="sq"]','.hl[data-l="3"]']:
      try: await pg.locator(sel).first.click(timeout=800)
      except Exception: pass
    await pg.wait_for_timeout(400)
    await pg.screenshot(path=out,full_page=True)
    ov=await pg.evaluate("document.documentElement.scrollWidth")
    print(lid,errs,'scrollW',ov);await b.close()
asyncio.run(m(sys.argv[1],sys.argv[2],int(sys.argv[3])))
