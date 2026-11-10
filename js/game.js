/* ===== لعبة الأنشطة + طريق الإثمار + الشهادة ===== */
const LV_META={
  sort:{name:"صندوق الفرز",tag:"سرعة وتركيز",ic:"M5 7h14l-1.5 12h-11zM9 7V4h6v3"},
  match:{name:"ذاكرة الأزواج",tag:"اقلبي وطابقي",ic:"M4 5h7v14H4zM13 5h7v14h-7z"},
  blanks:{name:"أكملي الجملة",tag:"كلمات مفقودة",ic:"M4 8h16M4 12h7M15 12h5M4 16h16"},
  data:{name:"تحدّي الجدول",tag:"ضد الوقت",ic:"M12 7v5l3 2M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18"},
  colors:{name:"مختبر الألوان",tag:"خمّني اللون",ic:"M9 3h6M10 3v10a4 4 0 1 0 4 0V3M9 13h6"},
  react:{name:"مختبر الماء",tag:"راقبي واستنتجي",ic:"M4 14c2-2 4-2 6 0s4 2 6 0 4-2 4-2M4 18c2-2 4-2 6 0s4 2 6 0 4-2 4-2M12 3v6M9 6l3 3 3-3"},
  order:{name:"سباق الترتيب",tag:"رتّبي بالتسلسل",ic:"M5 18h3v-5H5zM10.5 18h3V9h-3zM16 18h3V5h-3z"},
  check:{name:"ارسمي وتحقّقي",tag:"المستوى الأخير",ic:"M4 20l4-1 11-11-3-3L5 16zM14 6l3 3"}
};
const G=()=>{S.game=S.game||{};return S.game};
const gstate=id=>(G()[id]=G()[id]||{lv:{}});
let PLAY=null; /* {id, i, ...runtime} */

function starsHTML(n,max=3){return `<span class="stars-r" aria-label="${n} من ${max} نجوم">${[...Array(max)].map((_,i)=>`<svg viewBox="0 0 24 24" class="${i<n?'on':''}"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"/></svg>`).join("")}</span>`}
function gameTotals(id){const C=L(id),g=gstate(id);let pts=0,stars=0,done=0;C.activities.forEach((a,i)=>{const r=g.lv[i];if(r){pts+=r.pts;stars+=r.stars;done++}});return{pts,stars,done,n:C.activities.length,max:C.activities.length*3}}

function gameView(id){
  const C=L(id);if(PLAY&&PLAY.id===id)return `<div class="game" id="game"><div id="play"></div></div>`;
  const g=gstate(id),T=gameTotals(id);
  return `<div class="game" id="game">
   <div class="hud"><div class="hud-k"><span class="hud-n">${T.pts}</span><small>نقطة</small></div><div class="hud-k"><span class="hud-n">${T.stars}<em>/${T.max}</em></span><small>نجمة</small></div><div class="hud-bar"><span style="width:${T.done/T.n*100}%"></span></div><div class="hud-k"><span class="hud-n">${T.done}<em>/${T.n}</em></span><small>مستوى</small></div></div>
   <p class="soft game-lede">مرّي بالمستويات بالترتيب. كل مستوى تنهينه يفتح الذي بعده، واجمعي ثلاث نجوم في كل واحد.</p>
   <ol class="trail">${C.activities.map((a,i)=>{const r=g.lv[i],open=i===0||g.lv[i-1],m=LV_META[a.type];
     return `<li class="lv ${r?'done':open?'open':'locked'}"><button data-lv="${i}" ${open?'':'disabled'}><span class="node"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${m.ic}"/></svg></span><span class="lv-t"><small>المستوى ${i+1} • ${m.tag}</small><b>${m.name}</b><span>${a.title}</span></span><span class="lv-s">${r?starsHTML(r.stars)+`<small>${r.pts} نقطة</small>`:open?'<span class="go-pill">ابدئي</span>':'<span class="lock">مقفل</span>'}</span></button></li>`}).join("")}</ol>
  </div>`;
}
function gameBind(id){
  const box=$("#game");if(!box)return;
  box.querySelectorAll("[data-lv]").forEach(b=>b.onclick=()=>{startLevel(id,+b.dataset.lv)});
  if(PLAY&&PLAY.id===id)drawLevel();
}
function startLevel(id,i){const a=L(id).activities[i];PLAY={id,i,a,pts:0,miss:0,k:0,t0:Date.now()};
  if(a.type==="sort")PLAY.items=shuffleA(a.items);
  if(a.type==="match"){const cards=[];a.items.forEach((it,pi)=>{cards.push({p:pi,t:it[0],kind:"prop"});cards.push({p:pi,t:a.reasons[it[1]],kind:"why"})});PLAY.cards=shuffleA(cards);PLAY.open=[];PLAY.got=new Set();PLAY.moves=0}
  if(a.type==="blanks"){PLAY.parts=[];const re=/\{([^}]+)\}/g;let last=0,m;while((m=re.exec(a.text))){PLAY.parts.push({t:a.text.slice(last,m.index)});PLAY.parts.push({ans:m[1],fill:null});last=re.lastIndex}PLAY.parts.push({t:a.text.slice(last)});PLAY.bank=shuffleA(a.bank.map((w,k)=>({w,k,used:false})))}
  if(a.type==="data"){PLAY.qi=0;PLAY.ok=0}
  if(a.type==="colors"){PLAY.items=shuffleA(a.items)}
  if(a.type==="react"){PLAY.qi=0;PLAY.ok=0}
  if(a.type==="order"){PLAY.r=0;PLAY.got=[];PLAY.pool=shuffleA(a.rounds[0].items)}
  if(a.type==="check")PLAY.ticks=a.items.map(()=>false);
  render();setTimeout(()=>{const g=$("#game");if(g)g.scrollIntoView({behavior:"smooth",block:"start"})},40)}
const shuffleA=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};

function playHead(){const m=LV_META[PLAY.a.type];return `<div class="ph"><button class="btn ghost sm" id="toMap">خريطة المستويات</button><div class="ph-t"><small>المستوى ${PLAY.i+1}</small><b>${m.name}</b></div><div class="ph-s"><span><b id="pp">${PLAY.pts}</b> نقطة</span><span class="miss"><b id="pm">${PLAY.miss}</b> خطأ</span></div></div><p class="soft">${PLAY.a.intro}</p>`}
function bump(ok,el){const pp=$("#pp"),pm=$("#pm");if(pp)pp.textContent=PLAY.pts;if(pm)pm.textContent=PLAY.miss;if(el){el.classList.remove("pop","shake");void el.offsetWidth;el.classList.add(ok?"pop":"shake")}}

function drawLevel(){
  const el=$("#play");if(!el)return;const a=PLAY.a;
  if(a.type==="sort"){
    const it=PLAY.items[PLAY.k];
    el.innerHTML=`${playHead()}<div class="sortg"><div class="deck-c"><div class="count">${PLAY.k+1} / ${PLAY.items.length}</div><div class="card-g" id="cg">${it[0]}</div></div><div class="bins-g">${a.options.map(o=>`<button class="bin-g" data-v="${o}"><b>${o}</b></button>`).join("")}</div><div class="fbk" id="fbk"></div></div>`;
    el.querySelectorAll(".bin-g").forEach(b=>b.onclick=()=>{if(PLAY.lock)return;const ok=b.dataset.v===it[1];if(ok)PLAY.pts+=10;else PLAY.miss++;bump(ok,$("#cg"));b.classList.add(ok?"good":"bad");$("#fbk").innerHTML=ok?"صحيح! +10":`خطأ، الصحيح: <b>${it[1]}</b>`;$("#fbk").className="fbk "+(ok?"ok":"no");PLAY.lock=true;
      setTimeout(()=>{PLAY.lock=false;PLAY.k++;if(PLAY.k>=PLAY.items.length)endLevel(PLAY.miss<=1?3:PLAY.miss<=3?2:1);else drawLevel()},ok?550:1300)});
  }
  if(a.type==="match"){
    el.innerHTML=`${playHead()}<div class="mem-g">${PLAY.cards.map((c,k)=>`<button class="mcard ${PLAY.got.has(c.p)?'got':''} ${PLAY.open.includes(k)?'up':''} ${c.kind}" data-k="${k}" aria-label="بطاقة ${k+1}"><span class="in"><span class="back"><svg viewBox="0 0 32 32"><path d="M16 28V15" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/><path d="M15.6 16c-5.5.3-9-2.6-9.6-8 5.6-.2 9 2.8 9.6 8zM15.4 12.5c.2-5 3.4-8.4 9-8.6.1 5-3.2 8.4-9 8.6z" fill="currentColor"/></svg></span><span class="face"><small>${(a.labels||["خاصية","سبب"])[c.kind==="prop"?0:1]}</small>${c.t}</span></span></button>`).join("")}</div><p class="soft" style="text-align:center">المحاولات: <b id="mv">${PLAY.moves}</b></p>`;
    el.querySelectorAll(".mcard").forEach(b=>b.onclick=()=>{const k=+b.dataset.k,c=PLAY.cards[k];if(PLAY.lock||PLAY.got.has(c.p)||PLAY.open.includes(k))return;PLAY.open.push(k);b.classList.add("up");
      if(PLAY.open.length===2){PLAY.moves++;$("#mv").textContent=PLAY.moves;const[x,y]=PLAY.open.map(j=>PLAY.cards[j]);const ok=x.p===y.p&&x.kind!==y.kind;PLAY.lock=true;
        if(ok){PLAY.pts+=15;PLAY.got.add(x.p);bump(true);setTimeout(()=>{PLAY.open=[];PLAY.lock=false;if(PLAY.got.size===a.items.length){const n=a.items.length;endLevel(PLAY.moves<=n+2?3:PLAY.moves<=n+5?2:1)}else drawLevel()},600)}
        else{PLAY.miss++;bump(false);setTimeout(()=>{PLAY.open=[];PLAY.lock=false;drawLevel()},1000)}}});
  }
  if(a.type==="blanks"){
    const nxt=PLAY.parts.findIndex(p=>p.ans&&!p.fill);
    el.innerHTML=`${playHead()}<p class="sent">${PLAY.parts.map((p,k)=>p.ans?`<span class="slot-g ${p.fill?'filled':''} ${k===nxt?'now':''}">${p.fill||"؟"}</span>`:p.t).join("")}</p><div class="chips">${PLAY.bank.map(b=>`<button class="chip-g" data-k="${b.k}" ${b.used?'disabled':''}>${b.w}</button>`).join("")}</div><div class="fbk" id="fbk"></div>`;
    el.querySelectorAll(".chip-g").forEach(b=>b.onclick=()=>{const k=+b.dataset.k,w=a.bank[k],p=PLAY.parts[nxt];if(!p)return;
      if(w===p.ans){p.fill=w;PLAY.bank.find(x=>x.k===k).used=true;PLAY.pts+=10;bump(true);const done=!PLAY.parts.some(q=>q.ans&&!q.fill);if(done)setTimeout(()=>endLevel(PLAY.miss===0?3:PLAY.miss<=2?2:1),500);else drawLevel()}
      else{PLAY.miss++;bump(false,b);$("#fbk").textContent="ليست هذه الكلمة. فكّري في معنى الجملة.";$("#fbk").className="fbk no"}});
  }
  if(a.type==="data"){
    const q=a.qs[PLAY.qi],ord=PLAY.ord&&PLAY.ord.q===PLAY.qi?PLAY.ord.o:(PLAY.ord={q:PLAY.qi,o:shuffleA(q[1].map((_,j)=>j))}).o;
    el.innerHTML=`${playHead()}<details class="dtab" ${innerWidth>700?'open':''}><summary>الجدول</summary><div class="tbl"><table><thead><tr>${a.cols.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${a.rows.map(r=>`<tr>${r.map((c,i)=>`<td${i?' class="num"':""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>
     <div class="rush"><div class="rq"><small>سؤال ${PLAY.qi+1} من ${a.qs.length}</small><b>${q[0]}</b></div><div class="tbar"><span id="tb"></span></div><div class="ropts">${ord.map(j=>`<button class="opt" data-j="${j}">${q[1][j]}</button>`).join("")}</div><div class="fbk" id="fbk"></div></div>`;
    const T=20000,t0=Date.now();clearInterval(PLAY.tm);PLAY.tm=setInterval(()=>{const left=Math.max(0,T-(Date.now()-t0));const tb=$("#tb");if(!tb){clearInterval(PLAY.tm);return}tb.style.width=(left/T*100)+"%";tb.classList.toggle("low",left<6000);if(!left){clearInterval(PLAY.tm);answer(-1)}},100);
    const answer=j=>{clearInterval(PLAY.tm);const left=Math.max(0,T-(Date.now()-t0));const ok=j===q[2];el.querySelectorAll(".ropts .opt").forEach(b=>{b.disabled=true;if(+b.dataset.j===q[2])b.classList.add("right")});
      if(ok){const bonus=Math.round(left/2000);PLAY.pts+=10+bonus;PLAY.ok++;$("#fbk").innerHTML=`صحيح! +10 ومكافأة سرعة +${bonus}`;$("#fbk").className="fbk ok"}else{PLAY.miss++;if(j>=0)el.querySelector(`.opt[data-j="${j}"]`).classList.add("wrong");$("#fbk").innerHTML=(j<0?"انتهى الوقت. ":"")+q[3];$("#fbk").className="fbk no"}bump(ok);
      setTimeout(()=>{PLAY.qi++;if(PLAY.qi>=a.qs.length)endLevel(PLAY.ok===a.qs.length?3:PLAY.ok>=a.qs.length-2?2:1);else drawLevel()},ok?1100:2600)};
    el.querySelectorAll(".ropts .opt").forEach(b=>b.onclick=()=>answer(+b.dataset.j));
  }
  if(a.type==="colors"){
    const it=PLAY.items[PLAY.k],hex=n=>(a.palette.find(p=>p[0]===n)||[0,"#ccc"])[1];
    el.innerHTML=`${playHead()}<div class="lab-g"><div class="tube-wrap"><div class="count">${PLAY.k+1} / ${PLAY.items.length}</div><svg viewBox="0 0 120 230" class="tube" role="img" aria-label="أنبوبة اختبار"><path d="M30 10h60M38 10v160a22 22 0 0 0 44 0V10" fill="#fff" stroke="currentColor" stroke-width="4"/><path id="liq" d="M41 80v90a19 19 0 0 0 38 0V80z" fill="var(--rule)"/><text x="60" y="140" text-anchor="middle" font-size="40" font-weight="700" fill="var(--soft)" id="qm">؟</text></svg><div class="ion-l"><b>${it[0]}</b><span dir="ltr">${it[1]}</span></div></div>
     <div class="swatches">${a.palette.map(p=>`<button class="sw" data-c="${p[0]}"><i style="background:${p[1]}"></i>${p[0]}</button>`).join("")}</div><div class="fbk" id="fbk"></div></div>`;
    el.querySelectorAll(".sw").forEach(b=>b.onclick=()=>{if(PLAY.lock)return;PLAY.lock=true;const ok=b.dataset.c===it[2];$("#liq").setAttribute("fill",hex(it[2]));$("#qm").textContent="";if(ok)PLAY.pts+=10;else PLAY.miss++;bump(ok,b);b.classList.add(ok?"good":"bad");$("#fbk").innerHTML=ok?"صحيح! +10":`اللون الصحيح: <b>${it[2]}</b>`;$("#fbk").className="fbk "+(ok?"ok":"no");
      setTimeout(()=>{PLAY.lock=false;PLAY.k++;if(PLAY.k>=PLAY.items.length)endLevel(PLAY.miss<=1?3:PLAY.miss<=3?2:1);else drawLevel()},ok?900:1700)});
  }
  if(a.type==="react"){
    const q=a.rounds[PLAY.qi];
    el.innerHTML=`${playHead()}<div class="rush"><div class="rq"><small>تجربة ${PLAY.qi+1} من ${a.rounds.length}${q.ind?" • أُضيف الكاشف العام":""}</small><b>${q.q}</b></div><div id="sim"></div><div class="ropts">${q.o.map((o,j)=>`<button class="opt" data-j="${j}">${o}</button>`).join("")}</div><div class="fbk" id="fbk"></div></div>`;
    if(PLAY.stop)PLAY.stop();PLAY.stop=window.waterSim($("#sim"),q.m,q.ind);
    el.querySelectorAll(".ropts .opt").forEach(b=>b.onclick=()=>{if(PLAY.lock)return;PLAY.lock=true;const j=+b.dataset.j,ok=j===q.a;el.querySelectorAll(".ropts .opt").forEach(x=>{x.disabled=true;if(+x.dataset.j===q.a)x.classList.add("right")});if(!ok)b.classList.add("wrong");
      if(ok){PLAY.pts+=15;PLAY.ok++}else PLAY.miss++;bump(ok);$("#fbk").innerHTML=(ok?"صحيح! +15 ":"")+q.x;$("#fbk").className="fbk "+(ok?"ok":"no");
      setTimeout(()=>{PLAY.lock=false;PLAY.qi++;if(PLAY.qi>=a.rounds.length){if(PLAY.stop)PLAY.stop();endLevel(PLAY.ok===a.rounds.length?3:PLAY.ok>=a.rounds.length-1?2:1)}else drawLevel()},ok?1800:3200)});
  }
  if(a.type==="order"){
    const R=a.rounds[PLAY.r];
    el.innerHTML=`${playHead()}<div class="ordg"><div class="rq"><small>جولة ${PLAY.r+1} من ${a.rounds.length}</small><b>${R.q}</b></div>
     <div class="ladder"><span class="end">${R.lo}</span><ol>${R.items.map((_,k)=>`<li class="${PLAY.got[k]?'in':''} ${k===PLAY.got.length?'now':''}">${PLAY.got[k]||(k+1)}</li>`).join("")}</ol><span class="end">${R.hi}</span></div>
     <div class="chips">${PLAY.pool.map(w=>`<button class="chip-g" data-w="${w}" ${PLAY.got.includes(w)?'disabled':''}>${w}</button>`).join("")}</div><div class="fbk" id="fbk">${R.tip?`<span class="soft">${R.tip}</span>`:""}</div></div>`;
    el.querySelectorAll(".chip-g").forEach(b=>b.onclick=()=>{if(PLAY.lock)return;const w=b.dataset.w;
      if(w===R.items[PLAY.got.length]){PLAY.got.push(w);PLAY.pts+=10;bump(true);
        if(PLAY.got.length===R.items.length){PLAY.lock=true;$("#fbk").innerHTML=`<b>أحسنتِ!</b> ${R.x||""}`;$("#fbk").className="fbk ok";el.querySelectorAll(".ladder li").forEach(l=>l.classList.add("in"));
          setTimeout(()=>{PLAY.lock=false;PLAY.r++;if(PLAY.r>=a.rounds.length)endLevel(PLAY.miss===0?3:PLAY.miss<=2?2:1);else{PLAY.got=[];PLAY.pool=shuffleA(a.rounds[PLAY.r].items);drawLevel()}},2200)}
        else drawLevel()}
      else{PLAY.miss++;bump(false,b);$("#fbk").textContent="ليس هذا دوره في الترتيب. فكّري في الاتجاه نزولًا في المجموعة.";$("#fbk").className="fbk no"}});
  }
  if(a.type==="check"){
    el.innerHTML=`${playHead()}<div class="two"><div data-widget="lattice-static"></div><ul class="criteria big">${a.items.map((x,k)=>`<li><label><input type="checkbox" data-k="${k}" ${PLAY.ticks[k]?'checked':''}>${x}</label></li>`).join("")}</ul></div><div style="text-align:center;margin-top:14px"><button class="btn date" id="fin" ${PLAY.ticks.every(Boolean)?'':'disabled'}>أنهيت رسمي</button></div>`;
    hydrateStatic();
    el.querySelectorAll("input[data-k]").forEach(c=>c.onchange=()=>{PLAY.ticks[+c.dataset.k]=c.checked;$("#fin").disabled=!PLAY.ticks.every(Boolean)});
    $("#fin").onclick=()=>{PLAY.pts+=30;endLevel(3)};
  }
  if(window.fixFormulas)fixFormulas(el);
  const tm=$("#toMap");if(tm)tm.onclick=()=>{clearInterval(PLAY&&PLAY.tm);if(PLAY&&PLAY.stop)PLAY.stop();PLAY=null;render()};
}
function endLevel(stars){
  const {id,i}=PLAY,g=gstate(id),prev=g.lv[i];const res={stars,pts:PLAY.pts};
  if(!prev||res.pts>prev.pts||res.stars>prev.stars)g.lv[i]={stars:Math.max(stars,prev?prev.stars:0),pts:Math.max(res.pts,prev?prev.pts:0)};save();
  const C=L(id),last=i===C.activities.length-1,msg=stars===3?"أداء رائع!":stars===2?"أحسنتِ!":"بداية جيدة، أعيدي المحاولة لتجمعي نجومًا أكثر";
  $("#play").innerHTML=`<div class="result"><div class="r-stars">${starsHTML(stars)}</div><h2>${msg}</h2><p class="r-pts"><b>${res.pts}</b> نقطة • <b>${PLAY.miss}</b> خطأ</p><div class="r-act"><button class="btn ghost" id="again">أعيدي المستوى</button>${last?`<button class="btn" id="toMap2">خريطة المستويات</button>`:`<button class="btn" id="next">المستوى التالي</button>`}</div></div>`;
  if(stars===3)confetti();refreshPath(id);
  $("#again").onclick=()=>startLevel(id,i);
  const n=$("#next");if(n)n.onclick=()=>startLevel(id,i+1);
  const m=$("#toMap2");if(m)m.onclick=()=>{PLAY=null;render()};
  if(gameTotals(id).done===C.activities.length&&last){toast("أنهيتِ كل المستويات! خطوة جديدة نحو الشهادة")}
}
function hydrateStatic(){if(window.__staticLattice)window.__staticLattice()}

/* ===== قصاصات احتفال ===== */
function confetti(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const c=document.createElement("canvas");c.className="confetti";document.body.appendChild(c);const x=c.getContext("2d");const W=c.width=innerWidth,H=c.height=innerHeight;const cols=["#1F4A3D","#C2852A","#9C4F2E","#1D6672","#E3AE5C","#7CC3A4"];
  const P=[...Array(140)].map(()=>({x:W/2+(Math.random()-.5)*200,y:H*.35,vx:(Math.random()-.5)*16,vy:-Math.random()*16-4,s:6+Math.random()*7,r:Math.random()*6,c:cols[Math.random()*cols.length|0],leaf:Math.random()<.4}));let f=0;
  (function tick(){x.clearRect(0,0,W,H);P.forEach(p=>{p.vy+=.45;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=.1;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;if(p.leaf){x.beginPath();x.ellipse(0,0,p.s,p.s/2.2,0,0,7);x.fill()}else x.fillRect(-p.s/2,-p.s/3,p.s,p.s/1.5);x.restore()});if(++f<160)requestAnimationFrame(tick);else c.remove()})()}

/* ===== طريق الإثمار ===== */
function pathState(id){const C=L(id);if(!C)return null;const seen=((S.seen||{})[id]||{}).explain;const T=gameTotals(id);const ex=(S.exam||{})[id]||{};const nX=(C.exams||[]).filter(e=>e.type==="mcq").length;
  return {seen:!!seen,game:T.done===T.n,exam:nX===0||(ex.n||0)>=nX,T,ex,nX}}
function finishBox(id,sk){
  const P=pathState(id),done=st(id)==="fruit";
  if(!P)return done?`<div class="finish"><p>أثمر هذا الدرس في شجرتك.</p><a class="btn ghost sm" href="#${sk}">العودة إلى الوحدات</a></div>`:`<div class="finish"><p>أنهيتِ الدرس وفهمتِه؟</p><button class="btn date" id="done">${IC.fruit}إنهاء الدرس وإضافة ثمرته</button></div>`;
  const steps=[["الشرح","افتحي تبويب الشرح وشاهدي العرض",P.seen,"explain"],["الأنشطة",`أنهي مستويات اللعبة (${P.T.done}/${P.T.n})`,P.game,"activities"],["أسئلة الاختبارات",`حلّي أسئلة الاختيار من متعدد (${Math.min(P.ex.n||0,P.nX)}/${P.nX})`,P.exam,"exams"]];
  const ready=steps.every(s=>s[2]);
  return `<div class="path"><div class="path-h"><b>طريق الإثمار</b><span class="soft">ثلاث خطوات، وبعدها شهادتك</span></div>
   <ol class="path-s">${steps.map((s,i)=>`<li class="${s[2]?'ok':''}"><button data-gotab="${s[3]}"><span class="dot">${s[2]?'✓':i+1}</span><span><b>${s[0]}</b><small>${s[1]}</small></span></button></li>`).join("")}<li class="${done?'ok':''} cert-step"><span class="dot">${done?'✓':'★'}</span><span><b>الشهادة</b><small>${done?'استلمتِها':'تُفتح بعد الخطوات الثلاث'}</small></span></li></ol>
   <div class="path-a">${done?`<button class="btn date" id="cert">${IC.fruit}عرض شهادتي</button>`:`<button class="btn date" id="done" ${ready?'':'disabled'}>${IC.fruit}إنهاء الدرس واستلام الشهادة</button>`}</div></div>`;
}

/* ===== الشهادة ===== */
function medalOf(id){const P=pathState(id);const g=P.T.max?P.T.stars/P.T.max:1;const e=P.nX?(P.ex.best||0)/P.nX:1;const sc=Math.round((g*.5+e*.5)*100);return sc>=85?{k:"ذهبية",c:"#C9962B",c2:"#F2D27A",sc}:sc>=65?{k:"فضية",c:"#8A97A0",c2:"#D9E1E6",sc}:{k:"برونزية",c:"#A3653A",c2:"#E3B08A",sc}}
async function showCert(id){
  const f=find(id),s=SUBJECTS[f.sk];const acct=(S.user&&S.user.name)||"";if(!S.certNameEdited)S.certName=acct;
  const ov=document.createElement("div");ov.className="cert-ov";ov.innerHTML=`<div class="cert-box" role="dialog" aria-modal="true" aria-label="شهادة إتمام الدرس"><div class="cert-top"><label for="cn">اسمكِ في الشهادة <small style="font-weight:400;color:var(--soft)">(من حسابكِ، ويمكنكِ تصحيحه)</small></label><input id="cn" value="${S.certName.replace(/"/g,"&quot;")}" maxlength="40"><button class="btn ghost sm" id="cx">إغلاق</button></div><canvas id="cv" width="1600" height="1130"></canvas><div class="cert-act"><a class="btn" id="dl" download="شهادة-${f.l[0]}.png">تحميل الشهادة</a><button class="btn ghost" id="pr">طباعة</button></div></div>`;
  document.body.appendChild(ov);
  try{await Promise.all(['700 60px Alexandria','800 60px Alexandria','500 30px "IBM Plex Sans Arabic"','600 80px "Playpen Sans Arabic"'].map(x=>document.fonts.load(x)))}catch(e){}
  const draw=()=>{drawCert($("#cv"),{name:S.certName||"اسم الطالبة",lesson:f.l[1],code:f.l[0],subj:`${s.name} • ${s.grade} • الوحدة ${ORD[f.u.n]}`,medal:medalOf(id),T:pathState(id)});try{$("#dl").href=$("#cv").toDataURL("image/png")}catch(e){}};
  draw();
  $("#cn").oninput=e=>{S.certName=e.target.value;S.certNameEdited=true;save();draw()};
  $("#cx").onclick=()=>ov.remove();ov.onclick=e=>{if(e.target===ov)ov.remove()};
  $("#pr").onclick=()=>{try{const w=window.open("");w.document.write(`<img src="${$("#cv").toDataURL()}" style="width:100%">`);w.document.close();w.onload=()=>w.print();setTimeout(()=>w.print(),400)}catch(e){toast("الطباعة غير متاحة هنا، حمّلي الشهادة ثم اطبعيها")}};
}
function drawCert(cv,o){
  const x=cv.getContext("2d"),W=cv.width,H=cv.height,BW=330,BX=W-BW,CX=(BX)/2,GOLD="#C9962B",GOLD2="#F2D27A",INK="#1A2622",SOFT="#6B746F",PALM="#1F4A3D";
  x.direction="rtl";x.textAlign="center";x.textBaseline="alphabetic";
  const star8=(cx,cy,r,fill,alpha=1)=>{x.save();x.globalAlpha=alpha;x.fillStyle=fill;for(const a of [0,Math.PI/4]){x.save();x.translate(cx,cy);x.rotate(a);x.fillRect(-r*.7,-r*.7,r*1.4,r*1.4);x.restore()}x.restore()};
  const txt=(t,X,Y,font,color,dir="rtl")=>{x.font=font;x.fillStyle=color;x.direction=dir;x.fillText(t,X,Y);x.direction="rtl"};
  const goldGrad=(y0,y1)=>{const g=x.createLinearGradient(0,y0,0,y1);g.addColorStop(0,"#E9C46A");g.addColorStop(.5,"#B8862A");g.addColorStop(1,"#E2B85A");return g};
  /* الورق */
  const bg=x.createRadialGradient(CX,H*.4,100,CX,H*.5,1100);bg.addColorStop(0,"#FFFDF7");bg.addColorStop(1,"#F1E9D8");x.fillStyle=bg;x.fillRect(0,0,W,H);
  /* علامة مائية: غصن */
  x.save();x.globalAlpha=.07;x.strokeStyle=PALM;x.fillStyle=PALM;x.lineWidth=6;x.lineCap="round";x.beginPath();x.moveTo(60,H-40);x.bezierCurveTo(260,H-260,380,H-420,560,H-520);x.stroke();
  for(let i=0;i<9;i++){const t=i/9,px=60+500*t,py=H-40-480*t+Math.sin(t*3)*20;x.save();x.translate(px,py);x.rotate(-.7+(i%2?1.2:-.2));x.beginPath();x.ellipse(i%2?28:-28,0,34,13,0,0,7);x.fill();x.restore()}x.restore();
  /* الشريط الجانبي */
  const bd=x.createLinearGradient(BX,0,W,H);bd.addColorStop(0,"#163A30");bd.addColorStop(1,"#21503F");x.fillStyle=bd;x.fillRect(BX,0,BW,H);
  for(let yy=40;yy<H;yy+=74)for(let xx=BX+37+((yy/74)%2?37:0);xx<W;xx+=74)star8(xx,yy,13,GOLD,.13);
  x.fillStyle=goldGrad(0,H);x.fillRect(BX-6,0,6,H);x.fillRect(BX+10,0,1.5,H);
  /* إطار المساحة الرئيسية */
  x.strokeStyle=GOLD;x.lineWidth=3;x.strokeRect(34,34,BX-74,H-68);x.lineWidth=1.2;x.strokeRect(48,48,BX-102,H-96);
  [[34,34],[BX-40,34],[34,H-34],[BX-40,H-34]].forEach(([cx,cy])=>{star8(cx,cy,15,GOLD);star8(cx,cy,7,"#FFFDF7")});
  /* محتوى الشريط */
  x.save();x.translate(W-BW/2,150);x.strokeStyle=GOLD2;x.fillStyle=GOLD2;x.lineWidth=6;x.lineCap="round";x.beginPath();x.moveTo(0,46);x.quadraticCurveTo(2,10,-2,-20);x.stroke();
  x.beginPath();x.ellipse(-26,-8,30,13,-.6,0,7);x.fill();x.globalAlpha=.8;x.beginPath();x.ellipse(24,-28,30,13,.6,0,7);x.fill();x.globalAlpha=1;x.fillStyle="#E9C46A";x.beginPath();x.arc(28,22,15,0,7);x.fill();x.restore();
  txt("أثمِر",W-BW/2,268,'800 68px Alexandria',GOLD2);
  txt("منصة الكيمياء والعلوم البيئية",W-BW/2,312,'500 21px "IBM Plex Sans Arabic"',"#CFE3D9");
  /* الوسام */
  const MX=W-BW/2,MY=600,R=118;
  x.fillStyle=o.medal.c;[[-1],[1]].forEach(([s])=>{x.beginPath();x.moveTo(MX+s*30,MY+60);x.lineTo(MX+s*70,MY+250);x.lineTo(MX+s*42,MY+225);x.lineTo(MX+s*20,MY+258);x.lineTo(MX+s*2,MY+80);x.closePath();x.globalAlpha=s>0?1:.82;x.fill()});x.globalAlpha=1;
  x.beginPath();for(let i=0;i<=48;i++){const a=i/48*Math.PI*2,rr=i%2?R:R-12;x.lineTo(MX+Math.cos(a)*rr,MY+Math.sin(a)*rr)}x.closePath();const mg=x.createRadialGradient(MX-40,MY-50,10,MX,MY,R);mg.addColorStop(0,o.medal.c2);mg.addColorStop(1,o.medal.c);x.fillStyle=mg;x.fill();
  x.strokeStyle="rgba(255,255,255,.85)";x.lineWidth=3;x.beginPath();x.arc(MX,MY,R-26,0,7);x.stroke();x.lineWidth=1.2;x.beginPath();x.arc(MX,MY,R-34,0,7);x.stroke();
  x.fillStyle="#fff";x.beginPath();x.arc(MX,MY+10,30,0,7);x.fill();x.strokeStyle="#fff";x.lineWidth=6;x.lineCap="round";x.beginPath();x.moveTo(MX,MY-18);x.quadraticCurveTo(MX+4,MY-38,MX+20,MY-44);x.stroke();
  x.fillStyle="#fff";x.beginPath();x.ellipse(MX-16,MY-34,14,6,-.5,0,7);x.fill();
  txt(`ثمرة ${o.medal.k}`,MX,MY+305,'700 38px Alexandria',GOLD2);
  txt("كلُّ درسٍ بذرة،",MX,H-120,'500 27px "Playpen Sans Arabic"',"#E8F1EC");
  txt("وكلُّ نجاحٍ ثمرة",MX,H-78,'500 27px "Playpen Sans Arabic"',"#E8F1EC");
  /* العنوان */
  txt("شهادة إثمار",CX,232,'800 112px Alexandria',goldGrad(140,240));
  const div=(y,w)=>{x.strokeStyle=GOLD;x.lineWidth=2;x.beginPath();x.moveTo(CX-w,y);x.lineTo(CX-22,y);x.moveTo(CX+22,y);x.lineTo(CX+w,y);x.stroke();star8(CX,y,11,GOLD);[-w,w].forEach(d=>{x.fillStyle=GOLD;x.beginPath();x.arc(CX+d,y,4,0,7);x.fill()})};
  div(282,250);
  txt("تُمنح هذه الشهادة للطالبة المتميّزة",CX,360,'500 32px "IBM Plex Sans Arabic"',SOFT);
  /* الاسم */
  let fs=96;x.font=`600 ${fs}px "Playpen Sans Arabic"`;while(x.measureText(o.name).width>BX-260&&fs>50){fs-=4;x.font=`600 ${fs}px "Playpen Sans Arabic"`}
  txt(o.name,CX,478,`600 ${fs}px "Playpen Sans Arabic"`,PALM);
  const nw=Math.min(BX-260,x.measureText(o.name).width+120)/2;x.strokeStyle=GOLD;x.lineWidth=2.5;x.beginPath();x.moveTo(CX-nw,520);x.quadraticCurveTo(CX,505,CX+nw,520);x.stroke();
  [[-nw,1],[nw,-1]].forEach(([d,s])=>{x.save();x.translate(CX+d,520);x.fillStyle=GOLD;x.rotate(s*.5);x.beginPath();x.ellipse(s*14,-4,14,5,0,0,7);x.fill();x.restore()});
  txt("تقديرًا لإتمامها بنجاح درس",CX,592,'500 31px "IBM Plex Sans Arabic"',SOFT);
  txt(o.lesson,CX,668,'700 60px Alexandria',"#9C4F2E");
  txt(`${o.code}  •  ${o.subj}`,CX,722,'500 26px "IBM Plex Sans Arabic"',SOFT);
  /* الإحصاءات */
  const stats=[[`${o.T.T.stars}/${o.T.T.max}`,"نجوم الأنشطة"],[`${o.T.T.pts}`,"نقاط اللعبة"],[`${o.T.ex.best||0}/${o.T.nX}`,"أسئلة الاختبارات"]];
  stats.forEach((sv,i)=>{const cx=CX+(1-i)*250,y=770,w=220,h=96;x.fillStyle="rgba(255,255,255,.75)";x.strokeStyle="rgba(201,150,43,.55)";x.lineWidth=1.5;x.beginPath();x.roundRect(cx-w/2,y,w,h,18);x.fill();x.stroke();txt(sv[0],cx,y+50,'800 40px Alexandria',INK,"ltr");txt(sv[1],cx,y+80,'500 20px "IBM Plex Sans Arabic"',SOFT)});
  /* التوقيع والتاريخ */
  const SX=CX+300,DX=CX-300,LY=1000;
  let sf=56;x.font=`600 ${sf}px "Playpen Sans Arabic"`;while(x.measureText(TEACHER).width>330&&sf>34){sf-=2;x.font=`600 ${sf}px "Playpen Sans Arabic"`}txt(TEACHER,SX,LY-16,`600 ${sf}px "Playpen Sans Arabic"`,INK);
  const d=new Date().toLocaleDateString("ar-OM",{year:"numeric",month:"long",day:"numeric"});txt(d,DX,LY-22,'500 30px "IBM Plex Sans Arabic"',INK);
  x.strokeStyle=INK;x.lineWidth=1.5;[SX,DX].forEach(cx=>{x.beginPath();x.moveTo(cx-175,LY);x.lineTo(cx+175,LY);x.stroke()});
  txt("معلمة المادة",SX,LY+36,'500 22px "IBM Plex Sans Arabic"',SOFT);txt("تاريخ الإتمام",DX,LY+36,'500 22px "IBM Plex Sans Arabic"',SOFT);
  star8(CX,LY-10,16,GOLD,.9);star8(CX,LY-10,7,"#FFFDF7");
}
function bindPath(id){document.querySelectorAll("[data-gotab]").forEach(b=>b.onclick=()=>{tab=b.dataset.gotab;render();const tb=document.querySelector(".tabs");if(tb)window.scrollTo({top:tb.getBoundingClientRect().top+scrollY-90,behavior:"smooth"})});const ce=$("#cert");if(ce)ce.onclick=()=>showCert(id)}
function refreshPath(id){const old=document.querySelector(".path");if(!old)return;const f=find(id);const tmp=document.createElement("div");tmp.innerHTML=finishBox(id,f.sk);old.replaceWith(tmp.firstElementChild);bindPath(id);const d=$("#done");if(d&&!d.disabled)d.onclick=()=>{if(needLogin())return;S.status[id]="fruit";save();toast("أثمر تعبك! ثمرة جديدة في شجرتك");render();confetti();setTimeout(()=>showCert(id),700)}}

function bindExamExtra(id){const C=L(id);if(!C||!C.exams)return;
  document.querySelectorAll(".fq .fchk").forEach(b=>b.onclick=()=>{const q=b.closest(".fq");let ok=0,n=0;q.querySelectorAll(".m-row").forEach(r=>{n++;const g=r.querySelector("select").value===r.dataset.a;if(g)ok++;r.classList.toggle("ok",g);r.classList.toggle("no",!g)});toast(ok===n?"إجابة كاملة، أحسنتِ":`${ok} من ${n} صحيحة`)});
  document.querySelectorAll(".mq .mchk").forEach(b=>b.onclick=()=>{const q=b.closest(".mq"),e=C.exams[+q.dataset.i];const sel=[...q.querySelectorAll("input:checked")].map(x=>+x.value);q.querySelectorAll(".mopt").forEach((l,k)=>{const want=e.ok.includes(k);l.classList.toggle("ok",want);l.classList.toggle("no",!want&&sel.includes(k))});const right=sel.length===e.ok.length&&sel.every(v=>e.ok.includes(v));const ex=q.querySelector(".explain");ex.innerHTML=`<b>${right?"إجابة صحيحة.":"الإجابة الصحيحة مظلّلة بالأخضر."}</b> ${e.x||""}`;ex.classList.add("show")});
}
