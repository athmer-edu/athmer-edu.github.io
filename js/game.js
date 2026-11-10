/* ===== لعبة الأنشطة + طريق الإثمار + الشهادة ===== */
const LV_META={
  sort:{name:"صندوق الفرز",tag:"سرعة وتركيز",ic:"M5 7h14l-1.5 12h-11zM9 7V4h6v3"},
  match:{name:"ذاكرة الأزواج",tag:"اقلبي وطابقي",ic:"M4 5h7v14H4zM13 5h7v14h-7z"},
  blanks:{name:"أكملي الجملة",tag:"كلمات مفقودة",ic:"M4 8h16M4 12h7M15 12h5M4 16h16"},
  data:{name:"تحدّي الجدول",tag:"ضد الوقت",ic:"M12 7v5l3 2M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18"},
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
    el.innerHTML=`${playHead()}<div class="mem-g">${PLAY.cards.map((c,k)=>`<button class="mcard ${PLAY.got.has(c.p)?'got':''} ${PLAY.open.includes(k)?'up':''} ${c.kind}" data-k="${k}" aria-label="بطاقة ${k+1}"><span class="in"><span class="back"><svg viewBox="0 0 32 32"><path d="M16 28V15" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/><path d="M15.6 16c-5.5.3-9-2.6-9.6-8 5.6-.2 9 2.8 9.6 8zM15.4 12.5c.2-5 3.4-8.4 9-8.6.1 5-3.2 8.4-9 8.6z" fill="currentColor"/></svg></span><span class="face"><small>${c.kind==="prop"?"خاصية":"سبب"}</small>${c.t}</span></span></button>`).join("")}</div><p class="soft" style="text-align:center">المحاولات: <b id="mv">${PLAY.moves}</b></p>`;
    el.querySelectorAll(".mcard").forEach(b=>b.onclick=()=>{const k=+b.dataset.k,c=PLAY.cards[k];if(PLAY.lock||PLAY.got.has(c.p)||PLAY.open.includes(k))return;PLAY.open.push(k);b.classList.add("up");
      if(PLAY.open.length===2){PLAY.moves++;$("#mv").textContent=PLAY.moves;const[x,y]=PLAY.open.map(j=>PLAY.cards[j]);const ok=x.p===y.p&&x.kind!==y.kind;PLAY.lock=true;
        if(ok){PLAY.pts+=15;PLAY.got.add(x.p);bump(true);setTimeout(()=>{PLAY.open=[];PLAY.lock=false;if(PLAY.got.size===a.items.length)endLevel(PLAY.moves<=6?3:PLAY.moves<=9?2:1);else drawLevel()},600)}
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
  if(a.type==="check"){
    el.innerHTML=`${playHead()}<div class="two"><div data-widget="lattice-static"></div><ul class="criteria big">${a.items.map((x,k)=>`<li><label><input type="checkbox" data-k="${k}" ${PLAY.ticks[k]?'checked':''}>${x}</label></li>`).join("")}</ul></div><div style="text-align:center;margin-top:14px"><button class="btn date" id="fin" ${PLAY.ticks.every(Boolean)?'':'disabled'}>أنهيت رسمي</button></div>`;
    hydrateStatic();
    el.querySelectorAll("input[data-k]").forEach(c=>c.onchange=()=>{PLAY.ticks[+c.dataset.k]=c.checked;$("#fin").disabled=!PLAY.ticks.every(Boolean)});
    $("#fin").onclick=()=>{PLAY.pts+=30;endLevel(3)};
  }
  const tm=$("#toMap");if(tm)tm.onclick=()=>{clearInterval(PLAY&&PLAY.tm);PLAY=null;render()};
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
  const x=cv.getContext("2d"),W=cv.width,H=cv.height;x.direction="rtl";
  const paper=x.createLinearGradient(0,0,W,H);paper.addColorStop(0,"#FBF8F1");paper.addColorStop(1,"#F3EEE2");x.fillStyle=paper;x.fillRect(0,0,W,H);
  /* زخرفة النخيل الخفيفة */
  x.save();x.globalAlpha=.06;x.strokeStyle="#1F4A3D";x.lineWidth=3;for(let i=0;i<18;i++){x.beginPath();x.moveTo(-40+i*110,H);x.quadraticCurveTo(80+i*110,H-260,160+i*110,H-420);x.stroke()}x.restore();
  /* إطار */
  x.strokeStyle="#1F4A3D";x.lineWidth=10;x.strokeRect(40,40,W-80,H-80);x.strokeStyle=o.medal.c;x.lineWidth=3;x.strokeRect(62,62,W-124,H-124);
  [[62,62],[W-62,62],[62,H-62],[W-62,H-62]].forEach(([cx,cy])=>{x.save();x.translate(cx,cy);x.fillStyle=o.medal.c;x.beginPath();x.arc(0,0,16,0,7);x.fill();x.fillStyle="#1F4A3D";x.beginPath();x.arc(0,0,7,0,7);x.fill();x.restore()});
  const C=(t,y,font,color="#1A2622")=>{x.font=font;x.fillStyle=color;x.textAlign="center";x.fillText(t,W/2,y)};
  /* شعار */
  x.save();x.translate(W/2,150);x.strokeStyle="#1F4A3D";x.fillStyle="#1F4A3D";x.lineWidth=5;x.lineCap="round";x.beginPath();x.moveTo(0,40);x.lineTo(0,-10);x.stroke();x.beginPath();x.ellipse(-22,-10,24,11,-.6,0,7);x.fill();x.beginPath();x.ellipse(22,-24,24,11,.6,0,7);x.globalAlpha=.75;x.fill();x.globalAlpha=1;x.fillStyle=o.medal.c;x.beginPath();x.arc(26,18,13,0,7);x.fill();x.restore();
  C("منصة أثمِر",236,'700 34px Alexandria',"#1F4A3D");
  C("شهادة إثمار",340,'800 96px Alexandria',"#1A2622");
  C("تشهد منصة أثمِر بأن الطالبة",420,'500 34px "IBM Plex Sans Arabic"',"#5E6B66");
  C(o.name,530,'600 86px "Playpen Sans Arabic"',"#1F4A3D");
  x.strokeStyle=o.medal.c;x.lineWidth=3;x.beginPath();x.moveTo(W/2-360,568);x.lineTo(W/2+360,568);x.stroke();
  C("قد أتمّت بنجاح درس",640,'500 34px "IBM Plex Sans Arabic"',"#5E6B66");
  C(`«${o.lesson}»  ${o.code}`,712,'700 54px Alexandria',"#9C4F2E");
  C(o.subj,770,'500 30px "IBM Plex Sans Arabic"',"#5E6B66");
  /* الإحصاءات */
  const stats=[[`${o.T.T.stars}/${o.T.T.max}`,"نجوم الأنشطة"],[`${o.T.T.pts}`,"نقاط اللعبة"],[`${o.T.ex.best||0}/${o.T.nX}`,"أسئلة الاختبارات"]];
  stats.forEach((sv,i)=>{const cx=W/2+(i-1)*260;x.font='700 46px Alexandria';x.fillStyle="#1A2622";x.textAlign="center";x.direction="ltr";x.fillText(sv[0],cx,860);x.direction="rtl";x.font='500 24px "IBM Plex Sans Arabic"';x.fillStyle="#5E6B66";x.fillText(sv[1],cx,898)});
  /* الوسام */
  x.save();x.translate(250,830);x.fillStyle=o.medal.c;x.beginPath();x.moveTo(-40,40);x.lineTo(-60,150);x.lineTo(-20,125);x.lineTo(0,160);x.lineTo(10,60);x.fill();x.beginPath();x.moveTo(40,40);x.lineTo(60,150);x.lineTo(20,125);x.lineTo(0,160);x.lineTo(-10,60);x.globalAlpha=.85;x.fill();x.globalAlpha=1;
  const rg=x.createRadialGradient(-20,-20,10,0,0,90);rg.addColorStop(0,o.medal.c2);rg.addColorStop(1,o.medal.c);x.fillStyle=rg;x.beginPath();x.arc(0,0,86,0,7);x.fill();x.strokeStyle="#fff";x.lineWidth=4;x.beginPath();x.arc(0,0,70,0,7);x.stroke();
  x.fillStyle="#fff";x.beginPath();x.arc(0,8,26,0,7);x.fill();x.strokeStyle="#fff";x.lineWidth=5;x.beginPath();x.moveTo(0,-18);x.quadraticCurveTo(4,-34,18,-38);x.stroke();
  x.restore();x.font='700 30px Alexandria';x.fillStyle=o.medal.c;x.textAlign="center";x.fillText(`ثمرة ${o.medal.k}`,250,1040);
  /* التوقيع والتاريخ */
  x.textAlign="center";x.font='600 52px "Playpen Sans Arabic"';x.fillStyle="#1A2622";x.fillText(TEACHER,W-290,960);x.strokeStyle="#1A2622";x.lineWidth=2;x.beginPath();x.moveTo(W-430,985);x.lineTo(W-150,985);x.stroke();x.font='500 24px "IBM Plex Sans Arabic"';x.fillStyle="#5E6B66";x.fillText("معلمة المادة",W-290,1020);
  const d=new Date().toLocaleDateString("ar-OM",{year:"numeric",month:"long",day:"numeric"});C(d,1020,'500 24px "IBM Plex Sans Arabic"',"#5E6B66");
  C("كلُّ درسٍ بذرة، وكلُّ نجاحٍ ثمرة",1058,'600 26px "Playpen Sans Arabic"',"#1F4A3D");
}

function bindPath(id){document.querySelectorAll("[data-gotab]").forEach(b=>b.onclick=()=>{tab=b.dataset.gotab;render();const tb=document.querySelector(".tabs");if(tb)window.scrollTo({top:tb.getBoundingClientRect().top+scrollY-90,behavior:"smooth"})});const ce=$("#cert");if(ce)ce.onclick=()=>showCert(id)}
function refreshPath(id){const old=document.querySelector(".path");if(!old)return;const f=find(id);const tmp=document.createElement("div");tmp.innerHTML=finishBox(id,f.sk);old.replaceWith(tmp.firstElementChild);bindPath(id);const d=$("#done");if(d&&!d.disabled)d.onclick=()=>{if(needLogin())return;S.status[id]="fruit";save();toast("أثمر تعبك! ثمرة جديدة في شجرتك");render();confetti();setTimeout(()=>showCert(id),700)}}
