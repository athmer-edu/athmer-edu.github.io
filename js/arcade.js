/* ===== ألعاب حركة إضافية: «السلة» (التقاط ما يسقط) و«الفقاعات» (فرقعة الإجابات الصاعدة) =====
   {type:"catch"|"pop", title, intro, theme, rounds:[{prompt, good:[...], bad:[...], why?}], facts:[...]} */
(function(){
const TH={oasis:["#7EC8E3","#F6E7C4"],sea:["#4FA3CF","#D8F0F8"],forest:["#8FD0E8","#E3F2DA"],night:["#1B3A4B","#3E6A73"]};
function shell(host,lv,help,btn){
  host.innerHTML=`<div class="rn">
    <div class="rn-q" aria-live="polite"><div class="rn-qt" id="aq">استعدّي…</div></div>
    <div class="rn-stage"><canvas id="ac" aria-label="${lv.title}"></canvas>
      <div class="rn-hud"><span id="ah"></span><span><b id="as">0</b> نقطة</span><span id="ar"></span></div>
      <div class="rn-fact" id="af" hidden></div>
      <div class="rn-over" id="aov"><div><h3>${lv.title}</h3><p>${lv.intro||""}</p><p class="rn-help">${help}</p><button class="btn date" id="ago">${btn}</button></div></div></div>
    <div class="rn-ctl"><button class="btn ghost sm" id="apause">إيقاف مؤقت</button></div>
    <div class="rn-fb" id="afb" aria-live="polite"></div></div>`;
  const cv=host.querySelector("#ac"),cx=cv.getContext("2d"),$=s=>host.querySelector(s);
  const G={cv,cx,$,W:0,H:0,font:getComputedStyle(document.body).fontFamily,dpr:Math.min(2,devicePixelRatio||1),hearts:3,pts:0,miss:0,ri:-1,run:false,paused:false,ended:false,auto:false,k:1,objs:[],fx:[],t:0};
  const size=()=>{const r=cv.getBoundingClientRect();G.W=r.width;G.H=r.height;cv.width=G.W*G.dpr;cv.height=G.H*G.dpr;cx.setTransform(G.dpr,0,0,G.dpr,0,0)};size();
  G.ro=new ResizeObserver(size);G.ro.observe(cv);
  G.hud=()=>{$("#ah").innerHTML=[0,1,2].map(i=>`<i class="${i<G.hearts?"on":""}">♥</i>`).join("");$("#as").textContent=G.pts;$("#ar").textContent=`الجولة ${Math.max(1,G.ri+1)}/${lv.rounds.length}`};
  G.fb=(h,c)=>{const f=$("#afb");f.innerHTML=h;f.className="rn-fb "+c};
  G.fact=()=>{const facts=lv.facts||[];if(!facts.length)return;const f=$("#af");f.hidden=false;f.innerHTML=`<b>معلومة إضافية</b>${facts[(G.ri)%facts.length]}`;clearTimeout(G.ft);G.ft=setTimeout(()=>f.hidden=true,4500)};
  G.pill=(t,x,y,col,scale=1,alpha=1)=>{cx.save();cx.globalAlpha=alpha;cx.font=`700 ${17*scale}px ${G.font}`;cx.direction="rtl";cx.textAlign="center";cx.textBaseline="middle";const w=Math.min(G.W*.42,cx.measureText(t).width+28*scale),h=36*scale;
    cx.fillStyle="rgba(0,0,0,.12)";cx.beginPath();cx.roundRect(x-w/2+2,y-h/2+4,w,h,h/2);cx.fill();cx.fillStyle=col;cx.beginPath();cx.roundRect(x-w/2,y-h/2,w,h,h/2);cx.fill();cx.fillStyle="#1A2622";cx.fillText(t,x,y+1,w-16);cx.restore();return w};
  G.bg=th=>{const c=TH[th]||TH.oasis,g=cx.createLinearGradient(0,0,0,G.H);g.addColorStop(0,c[0]);g.addColorStop(1,c[1]);cx.fillStyle=g;cx.fillRect(0,0,G.W,G.H)};
  G.burst=(x,y,col)=>{for(let i=0;i<14;i++){const a=Math.random()*6.3,v=60+Math.random()*120;G.fx.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.7,col})}};
  G.drawFx=dt=>{G.fx.forEach(p=>{p.l-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=200*dt;cx.globalAlpha=Math.max(0,p.l/.7);cx.fillStyle=p.col;cx.beginPath();cx.arc(p.x,p.y,4,0,7);cx.fill()});cx.globalAlpha=1;G.fx=G.fx.filter(p=>p.l>0)};
  const pause=p=>{if(!G.run||G.ended)return;G.paused=p;$("#apause").textContent=p?"متابعة":"إيقاف مؤقت";if(!p)G.last=performance.now()};
  $("#apause").onclick=()=>pause(!G.paused);G.vis=()=>{if(document.hidden)pause(true)};document.addEventListener("visibilitychange",G.vis);
  G.clean=()=>{cancelAnimationFrame(G.raf);G.ro.disconnect();document.removeEventListener("visibilitychange",G.vis);clearTimeout(G.ft);if(G.offKeys)G.offKeys()};
  G.finish=(done,out)=>{if(G.ended)return;G.ended=true;G.run=false;const stars=out?1:G.miss<=1?3:G.miss<=3?2:1;setTimeout(()=>{G.clean();done({stars,pts:G.pts,miss:G.miss,out})},800)};
  G.loop=(update,draw)=>{G.last=performance.now();const step=now=>{if(!cv.isConnected){G.clean();return}G.raf=requestAnimationFrame(step);let dt=Math.min(.05,(now-G.last)/1000);G.last=now;if(G.run&&!G.paused&&!G.ended){dt*=G.k;G.t+=dt;update(dt)}draw(dt)};G.raf=requestAnimationFrame(step)};
  G.hud();return G;
}
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};

/* ---------- السلة: التقطي الصحيح وتجنّبي الخطأ ---------- */
window.CATCH=function(host,lv,done){
  const G=shell(host,lv,"حرّكي السلة بالفأرة أو بإصبعكِ أو بالأسهم ← →. التقطي ما يطابق المطلوب فقط، وتجنّبي الباقي.","ابدئي اللعب");
  const {cx,$}=G;let bx=.5,queue=[],spawnT=0,speed=95;host.__rt=G;
  const keys={};const kd=e=>{if(e.key==="ArrowLeft"||e.key==="ArrowRight"){keys[e.key]=e.type==="keydown";e.preventDefault()}};
  document.addEventListener("keydown",kd);document.addEventListener("keyup",kd);G.offKeys=()=>{document.removeEventListener("keydown",kd);document.removeEventListener("keyup",kd)};
  const setX=cl=>{const r=G.cv.getBoundingClientRect();bx=Math.max(.08,Math.min(.92,(cl-r.left)/r.width))};
  G.cv.addEventListener("pointermove",e=>setX(e.clientX));G.cv.addEventListener("pointerdown",e=>setX(e.clientX));
  G.cv.addEventListener("touchmove",e=>{setX(e.touches[0].clientX);e.preventDefault()},{passive:false});
  function next(){G.ri++;if(G.ri>=lv.rounds.length){G.finish(done,false);return}const R=lv.rounds[G.ri];$("#aq").textContent=`الجولة ${G.ri+1}: ${R.prompt}`;
    queue=shuf([...R.good.map(t=>({t,ok:1})),...R.bad.map(t=>({t,ok:0}))]);spawnT=.6;G.hud();if(G.ri>0)G.fact()}
  $("#ago").onclick=()=>{$("#aov").hidden=true;G.run=true;next()};
  G.loop(dt=>{
    if(keys.ArrowLeft)bx=Math.max(.08,bx-dt*.9);if(keys.ArrowRight)bx=Math.min(.92,bx+dt*.9);
    if(G.auto){const t=G.objs.filter(o=>o.ok&&!o.done).sort((a,b)=>b.y-a.y)[0];const bad=G.objs.find(o=>!o.ok&&!o.done&&o.y>G.H*.5&&Math.abs(o.x-bx*G.W)<90);if(t)bx+=(t.x/G.W-bx)*Math.min(1,dt*8);else if(bad)bx=bx<.5?.85:.15}
    spawnT-=dt;if(spawnT<=0&&queue.length){const it=queue.shift();G.objs.push({...it,x:G.W*(.12+Math.random()*.76),y:-20,v:speed+G.ri*14+Math.random()*25});spawnT=1.25-Math.min(.45,G.ri*.12)}
    const by=G.H-54,bw=Math.max(110,G.W*.17);
    G.objs.forEach(o=>{if(o.done)return;o.y+=o.v*dt;
      if(o.y>by-10&&o.y<by+24&&Math.abs(o.x-bx*G.W)<bw/2+20){o.done=1;
        if(o.ok){G.pts+=10;G.burst(o.x,by,"#F2B632");G.fb(`أحسنتِ! «${o.t}» +10`,"ok")}else{G.miss++;G.hearts--;G.burst(o.x,by,"#C8473A");G.fb(`«${o.t}» ليس منها${lv.rounds[G.ri].why?`: <span>${lv.rounds[G.ri].why}</span>`:""}`,"no");if(G.hearts<=0){G.hud();G.finish(done,true)}}G.hud()}
      else if(o.y>G.H+20){o.done=1;if(o.ok){G.miss++;G.fb(`فاتتكِ: «${o.t}»`,"no")}}});
    G.objs=G.objs.filter(o=>!o.done||o.y<0);
    if(!queue.length&&!G.objs.some(o=>!o.done)&&G.run&&!G.ended){G.objs=[];G.run=false;setTimeout(()=>{if(!G.ended){G.run=true;next()}},700/G.k)}
  },dt=>{G.bg(lv.theme);const by=G.H-54,bw=Math.max(110,G.W*.17),x=bx*G.W;cx.fillStyle="#F2B632";cx.beginPath();cx.arc(G.W*.88,48,26,0,7);cx.fill();cx.fillStyle=lv.theme==="oasis"?"#E2C17E":"#8DC07A";cx.fillRect(0,G.H-14,G.W,14);[.06,.94].forEach(f=>{const tx=G.W*f;cx.fillStyle="#7A5230";cx.fillRect(tx-6,G.H-120,12,110);cx.fillStyle="#3F8A5E";cx.beginPath();cx.arc(tx,G.H-140,44,0,7);cx.fill()});
    G.objs.forEach(o=>{if(!o.done)G.pill(o.t,o.x,o.y,"#fff")});
    cx.fillStyle="#8A5A2B";cx.beginPath();cx.moveTo(x-bw/2,by);cx.lineTo(x+bw/2,by);cx.lineTo(x+bw/2-14,by+44);cx.lineTo(x-bw/2+14,by+44);cx.fill();
    cx.strokeStyle="#C2852A";cx.lineWidth=3;for(let i=1;i<4;i++){cx.beginPath();cx.moveTo(x-bw/2+6+i*2,by+i*11);cx.lineTo(x+bw/2-6-i*2,by+i*11);cx.stroke()}
    cx.fillStyle="#6B4320";cx.fillRect(x-bw/2-4,by-6,bw+8,10);G.drawFx(dt)});
  return {stop:G.clean,R:G};
};

/* ---------- الفقاعات: فرقعي الإجابات الصحيحة ---------- */
window.POP=function(host,lv,done){
  const G=shell(host,lv,"الفقاعات تصعد من قاع البحر. اضغطي على كل فقاعة تحمل إجابة صحيحة قبل أن تهرب، ولا تضغطي الخطأ!","ابدئي الفرقعة");
  const {cx,$}=G;let queue=[],spawnT=0;host.__rt=G;
  const hit=(cl,ct)=>{if(!G.run||G.paused)return;const r=G.cv.getBoundingClientRect();const x=cl-r.left,y=ct-r.top;const b=G.objs.filter(o=>!o.done).find(o=>Math.hypot(o.x-x,o.y-y)<o.r+8);if(b)pop(b)};
  G.cv.addEventListener("pointerdown",e=>hit(e.clientX,e.clientY));
  function pop(b){b.done=1;if(b.ok){G.pts+=10;G.burst(b.x,b.y,"#ffffff");G.fb(`صحيح! «${b.t}» +10`,"ok")}else{G.miss++;G.hearts--;G.burst(b.x,b.y,"#C8473A");G.fb(`«${b.t}» ليست صحيحة${lv.rounds[G.ri].why?`: <span>${lv.rounds[G.ri].why}</span>`:""}`,"no");if(G.hearts<=0){G.hud();G.finish(done,true)}}G.hud()}
  function next(){G.ri++;if(G.ri>=lv.rounds.length){G.finish(done,false);return}const R=lv.rounds[G.ri];$("#aq").textContent=`الجولة ${G.ri+1}: ${R.prompt}`;
    queue=shuf([...R.good.map(t=>({t,ok:1})),...R.bad.map(t=>({t,ok:0}))]);spawnT=.4;G.hud();if(G.ri>0)G.fact()}
  $("#ago").onclick=()=>{$("#aov").hidden=true;G.run=true;next()};
  G.loop(dt=>{
    spawnT-=dt;if(spawnT<=0&&queue.length){const it=queue.shift();const r=Math.max(46,Math.min(70,G.W*.075));G.objs.push({...it,r,x:G.W*(.14+Math.random()*.72),y:G.H+r,v:52+G.ri*10+Math.random()*18,ph:Math.random()*6});spawnT=1.05-Math.min(.35,G.ri*.1)}
    G.objs.forEach(o=>{if(o.done)return;o.y-=o.v*dt;o.ph+=dt*2;o.x+=Math.sin(o.ph)*18*dt;
      if(G.auto&&o.ok&&o.y<G.H*.6)pop(o);
      if(o.y<-o.r){o.done=1;if(o.ok){G.miss++;G.fb(`هربت فقاعة صحيحة: «${o.t}»`,"no");G.hud()}}});
    G.objs=G.objs.filter(o=>!o.done);
    if(!queue.length&&!G.objs.length&&G.run&&!G.ended){G.run=false;setTimeout(()=>{if(!G.ended){G.run=true;next()}},700/G.k)}
  },dt=>{G.bg("sea");
    cx.fillStyle="rgba(255,255,255,.18)";for(let i=0;i<6;i++){cx.beginPath();cx.ellipse((i*170+G.t*20)%(G.W+200)-100,G.H-30,120,26,0,0,7);cx.fill()}
    cx.fillStyle="#E9C98B";cx.fillRect(0,G.H-18,G.W,18);
    G.objs.forEach(o=>{const g=cx.createRadialGradient(o.x-o.r*.35,o.y-o.r*.35,o.r*.1,o.x,o.y,o.r);g.addColorStop(0,"rgba(255,255,255,.95)");g.addColorStop(.6,"rgba(210,240,250,.75)");g.addColorStop(1,"rgba(120,190,220,.55)");
      cx.fillStyle=g;cx.beginPath();cx.arc(o.x,o.y,o.r,0,7);cx.fill();cx.strokeStyle="rgba(255,255,255,.9)";cx.lineWidth=2;cx.stroke();
      cx.font=`700 ${Math.max(13,o.r*.3)}px ${G.font}`;cx.direction="rtl";cx.textAlign="center";cx.textBaseline="middle";cx.fillStyle="#103A4A";
      const words=o.t.split(" ");const lines=[];let cur="";words.forEach(w=>{const tt=cur?cur+" "+w:w;if(cx.measureText(tt).width>o.r*1.7&&cur){lines.push(cur);cur=w}else cur=tt});lines.push(cur);
      lines.slice(0,3).forEach((l,i)=>cx.fillText(l,o.x,o.y+(i-(Math.min(3,lines.length)-1)/2)*o.r*.34))});
    G.drawFx(dt)});
  return {stop:G.clean,R:G};
};
})();
