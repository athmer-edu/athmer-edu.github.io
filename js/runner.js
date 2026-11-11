/* ===== لعبة «العدّاءة»: لعبة جري بثلاثة مسارات (على طريقة ألعاب الجري)، وكل بوابة إجابة =====
   المستوى: {type:"runner", title, intro, theme:"oasis"|"sea"|"forest", qs:[[سؤال,[خيارات 2-3],رقم الصحيح,معلومة]], facts:[...]} */
window.RUNNER=function(host,lv,done){
  const TH={oasis:{sky:["#7EC8E3","#E8F6FB"],ground:"#E9C98B",ground2:"#DDB873",road:"#8A7F73",side:"palm"},
            sea:{sky:["#5FB3D9","#E3F4FA"],ground:"#7FC3DE",ground2:"#5FA6D4",road:"#7D8B95",side:"buoy"},
            forest:{sky:["#8FD0E8","#EEF8EC"],ground:"#8DC07A",ground2:"#78AE66",road:"#857B70",side:"tree"}}[lv.theme||"oasis"];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  host.innerHTML=`<div class="rn">
    <div class="rn-q" aria-live="polite"><div class="rn-qt" id="rnq">استعدّي…</div><div class="rn-opts" id="rno" dir="ltr"></div></div>
    <div class="rn-stage"><canvas id="rnc" aria-label="لعبة الجري: حرّكي العدّاءة إلى بوابة الإجابة الصحيحة"></canvas>
      <div class="rn-hud"><span id="rnh"></span><span><b id="rns">0</b> نقطة</span><span id="rnp"></span></div>
      <div class="rn-fact" id="rnf" hidden></div>
      <div class="rn-over" id="rnov"><div><h3>${lv.title}</h3><p>${lv.intro||""}</p><p class="rn-help">← → أو اسحبي يمينًا ويسارًا لتغيير المسار • ↑ أو اسحبي للأعلى للقفز فوق الحواجز</p><button class="btn date" id="rngo">ابدئي الجري</button></div></div></div>
    <div class="rn-ctl"><button class="btn ghost" data-m="-1" aria-label="المسار الأيسر">◀</button><button class="btn ghost" data-m="0" aria-label="قفز">▲ قفز</button><button class="btn ghost" data-m="1" aria-label="المسار الأيمن">▶</button><button class="btn ghost sm" id="rnpause">إيقاف مؤقت</button></div>
    <div class="rn-fb" id="rnfb" aria-live="polite"></div></div>`;
  const cv=host.querySelector("#rnc"),cx=cv.getContext("2d"),$=s=>host.querySelector(s);
  const font=getComputedStyle(document.body).fontFamily;
  let W=0,Hh=0,dpr=Math.min(2,devicePixelRatio||1);
  const size=()=>{const r=cv.getBoundingClientRect();W=r.width;Hh=r.height;cv.width=W*dpr;cv.height=Hh*dpr;cx.setTransform(dpr,0,0,dpr,0,0)};
  size();const ro=new ResizeObserver(size);ro.observe(cv);
  /* العالم */
  const D=100,F=11,PD=5;
  const R={lane:0,x:0,jy:0,jv:0,phase:0,hearts:3,pts:0,miss:0,ok:0,qi:-1,speed:15,objs:[],t:0,dist:0,run:false,paused:false,ended:false,auto:false,k:1,fb:0,stumble:0};
  host.__rt=R;
  const qs=lv.qs.map(q=>{const n=q[1].length;const lanes=n===2?[-1,1]:[-1,0,1];const ord=[...q[1].keys()].sort(()=>Math.random()-.5);return {q:q[0],opts:ord.map((oi,j)=>({t:q[1][oi],lane:lanes[j],ok:oi===q[2]})),x:q[3],block:n===2?0:null}});
  const facts=(lv.facts||[]).slice();
  const proj=(lx,d)=>{const s=F/(F+Math.max(d,-F+1));const hy=Hh*.34;return {x:W/2+lx*W*.30*s,y:hy+(Hh-hy)*s,s}};
  /* تسلسل العناصر */
  function spawnQuestion(){R.qi++;if(R.qi>=qs.length){R.objs.push({k:"finish",d:D});return}
    const Q=qs[R.qi];$("#rnq").textContent=`${R.qi+1}/${qs.length}: ${Q.q}`;
    $("#rno").innerHTML=[-1,0,1].map(l=>{const o=Q.opts.find(o=>o.lane===l);return `<span class="${o?"":"rn-x"}">${o?o.t:"حاجز"}</span>`}).join("");
    R.objs.push({k:"gate",d:D,Q});
    if(Q.block===0)R.objs.push({k:"wall",d:D,lane:0});
    /* بين الأسئلة: عملات، وحاجز، ومعلومة */
    const cl=[-1,0,1][Math.random()*3|0];for(let i=0;i<6;i++)R.objs.push({k:"coin",d:D+18+i*5,lane:cl});
    if(R.qi%2===1)R.objs.push({k:"bar",d:D+52,lane:[-1,0,1][Math.random()*3|0]});
    if(facts.length&&R.qi%2===0)R.objs.push({k:"fact",d:D+46,lane:[-1,0,1][Math.random()*3|0],t:facts.shift()});
  }
  function hud(){$("#rnh").innerHTML=[0,1,2].map(i=>`<i class="${i<R.hearts?"on":""}">♥</i>`).join("");$("#rns").textContent=R.pts;$("#rnp").textContent=`${Math.min(R.qi+1,qs.length)}/${qs.length}`}
  function feedback(html,cls){const f=$("#rnfb");f.innerHTML=html;f.className="rn-fb "+cls}
  function showFact(t){const f=$("#rnf");f.hidden=false;f.innerHTML=`<b>معلومة إضافية</b>${t}`;clearTimeout(R.ft);R.ft=setTimeout(()=>f.hidden=true,4200)}
  function move(m){if(!R.run||R.paused)return;if(m===0){if(R.jy<=0.01){R.jv=7.2}}else R.lane=Math.max(-1,Math.min(1,R.lane+m))}
  /* التحكم */
  const key=e=>{if(!R.run)return;if(e.key==="ArrowLeft"){move(-1);e.preventDefault()}else if(e.key==="ArrowRight"){move(1);e.preventDefault()}else if(e.key==="ArrowUp"||e.key===" "){move(0);e.preventDefault()}};
  document.addEventListener("keydown",key);
  let tx=null,ty=null;cv.addEventListener("touchstart",e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
  cv.addEventListener("touchend",e=>{if(tx==null)return;const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)<20&&Math.abs(dy)<20){const r=cv.getBoundingClientRect();move(e.changedTouches[0].clientX<r.left+r.width/2?-1:1)}else if(Math.abs(dx)>Math.abs(dy))move(dx>0?1:-1);else if(dy<0)move(0);tx=null},{passive:true});
  cv.addEventListener("mousedown",e=>{const r=cv.getBoundingClientRect();move(e.clientX<r.left+r.width/2?-1:1)});
  host.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>move(+b.dataset.m));
  const pause=p=>{if(!R.run||R.ended)return;R.paused=p;$("#rnpause").textContent=p?"متابعة":"إيقاف مؤقت";if(!p)last=performance.now()};
  $("#rnpause").onclick=()=>pause(!R.paused);
  const vis=()=>{if(document.hidden)pause(true)};document.addEventListener("visibilitychange",vis);
  $("#rngo").onclick=()=>{$("#rnov").hidden=true;R.run=true;spawnQuestion();hud();last=performance.now()};
  /* الرسم */
  const rr=(x,y,w,h,r)=>{cx.beginPath();cx.roundRect?cx.roundRect(x,y,w,h,r):cx.rect(x,y,w,h)};
  function txt(t,x,y,size,col,maxW,weight=700){cx.font=`${weight} ${size}px ${font}`;cx.fillStyle=col;cx.textAlign="center";cx.direction="rtl";cx.textBaseline="middle";
    const words=t.split(" ");const lines=[];let cur="";words.forEach(w=>{const tt=cur?cur+" "+w:w;if(cx.measureText(tt).width>maxW&&cur){lines.push(cur);cur=w}else cur=tt});lines.push(cur);
    lines.slice(0,3).forEach((l,i)=>cx.fillText(l,x,y+(i-(Math.min(lines.length,3)-1)/2)*size*1.12))}
  function scenery(){const hy=Hh*.34;const g=cx.createLinearGradient(0,0,0,hy);g.addColorStop(0,TH.sky[0]);g.addColorStop(1,TH.sky[1]);cx.fillStyle=g;cx.fillRect(0,0,W,hy+1);
    cx.fillStyle="#F2B632";cx.beginPath();cx.arc(W*.82,hy*.38,Math.min(W,Hh)*.06,0,7);cx.fill();
    cx.fillStyle="rgba(255,255,255,.85)";const off=(R.dist*.6)%W;[[.2,.25],[.55,.15],[.9,.3]].forEach(([a,b])=>{const x=(a*W-off+W)%W;cx.beginPath();cx.ellipse(x,b*hy,40,14,0,0,7);cx.ellipse(x+26,b*hy-8,26,12,0,0,7);cx.fill()});
    cx.fillStyle=TH.ground;cx.fillRect(0,hy,W,Hh-hy);
    cx.fillStyle=TH.ground2;for(let i=0;i<8;i++){const d=((i*13-R.dist)%104+104)%104;const a=proj(-3.2,d),b=proj(3.2,d);cx.globalAlpha=.35;cx.fillRect(0,a.y,W,3*a.s);cx.globalAlpha=1}
    const L=proj(-1.55,D),Rr=proj(1.55,D),L0=proj(-1.55,-3),R0=proj(1.55,-3);
    cx.fillStyle=TH.road;cx.beginPath();cx.moveTo(L.x,L.y);cx.lineTo(Rr.x,Rr.y);cx.lineTo(R0.x,R0.y);cx.lineTo(L0.x,L0.y);cx.fill();
    cx.strokeStyle="rgba(255,255,255,.75)";[-0.5,0.5].forEach(l=>{for(let i=0;i<14;i++){const d0=((i*8-R.dist*1)%112+112)%112-6,d1=d0+4;const a=proj(l*1.0,d0),b=proj(l*1.0,d1);cx.lineWidth=Math.max(1,5*a.s);cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}});
    cx.strokeStyle="#5E5650";cx.lineWidth=3;[[L,L0],[Rr,R0]].forEach(([a,b])=>{cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()});
    for(let i=0;i<10;i++){const d=((i*11-R.dist)%110+110)%110;[-2.4,2.4].forEach(sx=>{const p=proj(sx,d);side(p.x,p.y,p.s)})}}
  function side(x,y,s){if(TH.side==="palm"){cx.strokeStyle="#7A5230";cx.lineWidth=7*s;cx.beginPath();cx.moveTo(x,y);cx.quadraticCurveTo(x+8*s,y-60*s,x,y-110*s);cx.stroke();cx.fillStyle="#3F8A5E";for(let k=0;k<5;k++){cx.beginPath();cx.ellipse(x+Math.cos(k*1.25)*30*s,y-112*s+Math.sin(k*1.25)*8*s,34*s,9*s,k*1.25,0,7);cx.fill()}}
    else if(TH.side==="tree"){cx.fillStyle="#7A5230";cx.fillRect(x-5*s,y-50*s,10*s,50*s);cx.fillStyle="#3F8A5E";cx.beginPath();cx.arc(x,y-70*s,34*s,0,7);cx.fill()}
    else{cx.fillStyle="#fff";cx.beginPath();cx.ellipse(x,y-10*s,14*s,18*s,0,0,7);cx.fill();cx.fillStyle="#C8473A";cx.fillRect(x-14*s,y-14*s,28*s,8*s)}}
  function runner(){const p=proj(R.x,PD);const s=p.s*1.25,y=p.y-R.jy*26*s,x=p.x;
    cx.fillStyle="rgba(0,0,0,.18)";cx.beginPath();cx.ellipse(x,p.y,30*s,8*s,0,0,7);cx.fill();
    const sw=Math.sin(R.phase)*(R.jy>0.01?0:1);cx.strokeStyle="#1F4A3D";cx.lineWidth=10*s;cx.lineCap="round";
    cx.beginPath();cx.moveTo(x-8*s,y-34*s);cx.lineTo(x-10*s+sw*8*s,y-4*s);cx.moveTo(x+8*s,y-34*s);cx.lineTo(x+10*s-sw*8*s,y-4*s);cx.stroke();
    cx.fillStyle=R.stumble>0&&((R.t*20|0)%2)?"#C8473A":"#2E7D6B";rr(x-22*s,y-92*s,44*s,62*s,16*s);cx.fill();
    cx.fillStyle="#F2B632";rr(x-16*s,y-86*s,32*s,30*s,8*s);cx.fill();
    cx.strokeStyle="#2E7D6B";cx.lineWidth=9*s;cx.beginPath();cx.moveTo(x-22*s,y-80*s);cx.lineTo(x-32*s,y-56*s+sw*10*s);cx.moveTo(x+22*s,y-80*s);cx.lineTo(x+32*s,y-56*s-sw*10*s);cx.stroke();
    cx.fillStyle="#1A2622";cx.beginPath();cx.arc(x,y-108*s,19*s,0,7);cx.fill();cx.beginPath();cx.moveTo(x-19*s,y-104*s);cx.quadraticCurveTo(x,y-80*s,x+19*s,y-104*s);cx.fill()}
  function drawObj(o){const p=proj(o.lane||0,o.d);if(o.d<-4||o.d>D+2)return;const s=p.s;
    if(o.k==="coin"&&!o.got){cx.fillStyle="#F2B632";cx.strokeStyle="#C2852A";cx.lineWidth=3*s;cx.beginPath();cx.ellipse(p.x,p.y-30*s,13*s*Math.abs(Math.cos(R.t*4)),13*s,0,0,7);cx.fill();cx.stroke()}
    if(o.k==="fact"&&!o.got){cx.fillStyle="#fff";cx.shadowColor="#F2B632";cx.shadowBlur=20*s;cx.beginPath();cx.arc(p.x,p.y-40*s,18*s,0,7);cx.fill();cx.shadowBlur=0;cx.fillStyle="#3F8A5E";cx.font=`700 ${22*s}px ${font}`;cx.textAlign="center";cx.textBaseline="middle";cx.fillText("؟",p.x,p.y-40*s)}
    if(o.k==="bar"){const w=W*.30*s*.9;cx.fillStyle="#C8473A";rr(p.x-w/2,p.y-34*s,w,16*s,4*s);cx.fill();cx.fillStyle="#fff";for(let i=0;i<4;i++)cx.fillRect(p.x-w/2+i*w/4+w/16,p.y-34*s,w/10,16*s);cx.fillStyle="#5E5650";cx.fillRect(p.x-w/2,p.y-18*s,6*s,18*s);cx.fillRect(p.x+w/2-6*s,p.y-18*s,6*s,18*s)}
    if(o.k==="wall"){const w=W*.30*s*.95;cx.fillStyle="#7D8790";rr(p.x-w/2,p.y-120*s,w,120*s,8*s);cx.fill();cx.fillStyle="#C8473A";cx.fillRect(p.x-w/2,p.y-120*s,w,14*s);txt("حاجز",p.x,p.y-60*s,20*s,"#fff",w*.9)}
    if(o.k==="gate"){o.Q.opts.forEach(op=>{const q=proj(op.lane,o.d);const w=W*.30*q.s*.95,h=150*q.s;const col=o.res?(op.ok?"#3F8A5E":(op.lane===o.pick?"#C8473A":"#9AA7B0")):"#1F4A3D";
      cx.fillStyle=col;cx.fillRect(q.x-w/2,q.y-h,8*q.s,h);cx.fillRect(q.x+w/2-8*q.s,q.y-h,8*q.s,h);rr(q.x-w/2,q.y-h,w,h*.62,10*q.s);cx.fill();
      cx.fillStyle="rgba(255,255,255,.96)";rr(q.x-w/2+6*q.s,q.y-h+6*q.s,w-12*q.s,h*.62-12*q.s,8*q.s);cx.fill();
      if(q.s>.16)txt(op.t,q.x,q.y-h+h*.31,Math.max(9,19*q.s),"#1A2622",w-18*q.s)})}
    if(o.k==="finish"){const a=proj(-1.5,o.d),b=proj(1.5,o.d);const h=170*a.s;cx.fillStyle="#C2852A";cx.fillRect(a.x,a.y-h,8*a.s,h);cx.fillRect(b.x-8*a.s,b.y-h,8*a.s,h);for(let i=0;i<12;i++){cx.fillStyle=i%2?"#1A2622":"#fff";cx.fillRect(a.x+(b.x-a.x)*i/12,a.y-h,(b.x-a.x)/12,24*a.s)}txt("خط النهاية",(a.x+b.x)/2,a.y-h-18*a.s,22*a.s,"#1F4A3D",400)}}
  /* التحديث */
  let last=performance.now(),raf;
  function step(now){if(!host.isConnected){cleanup();return}raf=requestAnimationFrame(step);let dt=Math.min(.05,(now-last)/1000);last=now;
    if(R.run&&!R.paused&&!R.ended){dt*=R.k;R.t+=dt;const v=R.speed*(R.stumble>0?.55:1);R.dist+=v*dt;R.phase+=dt*v*.9;R.stumble=Math.max(0,R.stumble-dt);
      if(R.auto){const g=R.objs.find(o=>o.k==="gate"&&!o.res);if(g)R.lane=g.Q.opts.find(o=>o.ok).lane;const b=R.objs.find(o=>o.k==="bar"&&o.d>PD&&o.d<PD+9&&o.lane===R.lane);if(b&&R.jy<=0.01)R.jv=7.2}
      R.x+=(R.lane-R.x)*Math.min(1,dt*14);
      if(R.jy>0||R.jv>0){R.jv-=22*dt;R.jy=Math.max(0,R.jy+R.jv*dt);if(R.jy===0)R.jv=0}
      R.objs.forEach(o=>{o.d-=v*dt;
        if(o.k==="coin"&&!o.got&&o.d<PD+1&&o.d>PD-2&&Math.abs(R.x-o.lane)<.45){o.got=1;R.pts+=2;hud()}
        if(o.k==="fact"&&!o.got&&o.d<PD+1&&o.d>PD-2&&Math.abs(R.x-o.lane)<.45){o.got=1;R.pts+=10;hud();showFact(o.t)}
        if(o.k==="bar"&&!o.hit&&o.d<PD+.5&&o.d>PD-1.5&&Math.abs(R.x-o.lane)<.45&&R.jy<.6){o.hit=1;R.stumble=.8;R.pts=Math.max(0,R.pts-5);feedback("تعثّرتِ بالحاجز! اقفزي ↑ أو غيّري المسار. −5","no");hud()}
        if(o.k==="gate"&&!o.res&&o.d<PD){const lane=Math.round(R.x);o.pick=lane;const op=o.Q.opts.find(p=>p.lane===lane);o.res=1;
          if(op&&op.ok){R.ok++;const b=Math.round(R.speed);R.pts+=30;feedback(`صحيح! +30 ${o.Q.x?`<span>${o.Q.x}</span>`:""}`,"ok");R.speed=Math.min(26,R.speed+.7)}
          else{R.miss++;R.hearts--;R.stumble=.6;feedback(`الإجابة: <b>${o.Q.opts.find(p=>p.ok).t}</b>${o.Q.x?` <span>${o.Q.x}</span>`:""}`,"no")}
          hud();if(R.hearts<=0){finish(true);return}setTimeout(()=>{if(!R.ended)spawnQuestion();hud()},reduce?300:900/R.k)}
        if(o.k==="finish"&&o.d<PD&&!R.ended)finish(false)});
      R.objs=R.objs.filter(o=>o.d>-6)}
    cx.clearRect(0,0,W,Hh);scenery();R.objs.slice().sort((a,b)=>b.d-a.d).forEach(o=>{if(o.d>=PD-0.5)drawObj(o)});runner();R.objs.filter(o=>o.d<PD-0.5).forEach(drawObj)}
  function finish(out){if(R.ended)return;R.ended=true;R.run=false;const stars=out?1:R.miss===0?3:R.miss<=2?2:1;
    setTimeout(()=>{cleanup();done({stars,pts:R.pts,miss:R.miss,ok:R.ok,out})},out?900:700)}
  function cleanup(){cancelAnimationFrame(raf);ro.disconnect();document.removeEventListener("keydown",key);document.removeEventListener("visibilitychange",vis);clearTimeout(R.ft)}
  raf=requestAnimationFrame(step);hud();
  return {stop:cleanup,R};
};
