/* ===== رسومات تفاعلية خاصة بالدروس ===== */
window.WIDGETS = window.WIDGETS || {};
/* جدول دوري مبسّط يبرز تجمّع العناصر الانتقالية */
WIDGETS.tblock = el => {
  const row4=[["Sc","سكانديوم"],["Ti","تيتانيوم"],["V","فناديوم"],["Cr","كروم"],["Mn","منغنيز"],["Fe","حديد"],["Co","كوبالت"],["Ni","نيكل"],["Cu","نحاس"],["Zn","خارصين"]];
  const w=40,h=40,cells=[];
  const kind=(c,r)=>{if(c<=1)return "s";if(c>=12)return "p";return "t"};
  const shape=[[0,17],[0,1,12,13,14,15,16,17],[0,1,12,13,14,15,16,17],[...Array(18).keys()],[...Array(18).keys()],[...Array(18).keys()],[...Array(18).keys()]];
  shape.forEach((cs,r)=>cs.forEach(c=>{if(r===0&&c===0){cells.push([c,r,"h"]);return}cells.push([c,r,r<3&&c>=12?"p":kind(c,r)])}));
  el.className="widget";
  el.innerHTML=`<svg viewBox="0 0 ${18*w+20} ${7*h+70}" class="ptab" role="img" aria-label="الجدول الدوري: العناصر الانتقالية بين المجموعتين II و III">
   <g transform="translate(10 30)" direction="ltr">${cells.map(([c,r,k])=>{const t4=r===3&&k==="t"?row4[c-2]:null;return `<g class="pc ${k}" ${t4?`data-i="${c-2}" tabindex="0"`:""}><rect x="${c*w}" y="${r*h}" width="${w-3}" height="${h-3}" rx="5"/>${t4?`<text x="${c*w+(w-3)/2}" y="${r*h+25}">${t4[0]}</text>`:""}</g>`}).join("")}
   <text x="${0.5*w}" y="-10" class="gl">I</text><text x="${1.5*w}" y="-10" class="gl">II</text><text x="${12.5*w}" y="-10" class="gl">III</text></g></svg>
   <div class="w-bar"><span class="legend"><i class="k-t"></i>العناصر الانتقالية</span><span class="w-cap" id="tb-cap">اضغطي على أي رمز في الصف الأول من العناصر الانتقالية لتعرفي اسمه.</span></div>`;
  el.querySelectorAll(".pc[data-i]").forEach(g=>{const f=()=>{el.querySelectorAll(".pc.sel").forEach(x=>x.classList.remove("sel"));g.classList.add("sel");const e=row4[+g.dataset.i];el.querySelector("#tb-cap").innerHTML=`<b>${e[0]}</b>: ${e[1]} (العدد الذري ${21+(+g.dataset.i)})`};g.onclick=f;g.onkeydown=ev=>{if(ev.key==="Enter")f()}});
};
/* أنابيب ألوان أيونات العناصر الانتقالية (الجدول 1-1) */
WIDGETS.tubes = el => {
  const T=[["النحاس (II)","Cu²⁺","أزرق","#2F6FD0"],["الحديد (II)","Fe²⁺","أخضر","#3E9A5A"],["الحديد (III)","Fe³⁺","أصفر محمر","#D27A2C"],["الكروم (III)","Cr³⁺","أخضر","#3E9A5A"],["الكوبالت (II)","Co²⁺","وردي","#E78FB3"],["البرمنجنات (VII)","MnO₄⁻","بنفسجي","#7B3FA0"],["الكرومات (VI)","CrO₄²⁻","أصفر","#F2C230"],["الدايكرومات (VI)","Cr₂O₇²⁻","برتقالي","#EE7B22"]];
  el.className="widget";
  el.innerHTML=`<div class="tubes">${T.map((t,i)=>`<button class="tb-i" data-i="${i}" aria-label="أنبوبة ${t[0]}"><svg viewBox="0 0 60 150" aria-hidden="true"><path d="M14 6h32M18 6v108a12 12 0 0 0 24 0V6" fill="#fff" stroke="currentColor" stroke-width="3"/><path class="lq" d="M20.5 50v64a9.5 9.5 0 0 0 19 0V50z" fill="var(--rule)" data-c="${t[3]}"/></svg><b dir="ltr">${t[1]}</b><small>${t[0]}</small><span class="cn">اضغطي</span></button>`).join("")}</div>
  <div class="w-bar"><button class="btn ghost sm" id="tb-all">أظهري كل الألوان</button><span class="w-cap">الجدول 1-1: ألوان بعض أيونات العناصر الانتقالية في محاليلها المائية.</span></div>`;
  const show=b=>{const t=T[+b.dataset.i];b.querySelector(".lq").setAttribute("fill",t[3]);b.querySelector(".cn").textContent=t[2];b.classList.add("on")};
  el.querySelectorAll(".tb-i").forEach(b=>b.onclick=()=>show(b));
  el.querySelector("#tb-all").onclick=()=>el.querySelectorAll(".tb-i").forEach(show);
};
window.__widgets = () => document.querySelectorAll("[data-widget]").forEach(el => { const f = WIDGETS[el.dataset.widget]; if (f && !el.dataset.done) { el.dataset.done = 1; f(el); } });

/* ===== محاكي تفاعل الفلزات القلوية مع الماء (يُستخدم في الشرح واللعبة) ===== */
(function(){
  const st=document.createElement("style");
  st.textContent=`.wsim{display:block;width:100%;max-width:560px;margin:0 auto;border-radius:14px;background:linear-gradient(#EEF4F3,#F8FAF9)}
  [data-theme="dark"] .wsim{background:linear-gradient(#1B2726,#152020)}
  .wsim-ctl{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0 4px}
  .wsim-ctl .mb{font:600 15px var(--body);border:0;border-radius:12px;padding:9px 14px;background:var(--palm-tint);color:var(--palm);cursor:pointer;min-width:84px}
  .wsim-ctl .mb b{display:block;font:700 19px var(--display)}
  .wsim-ctl .mb[aria-pressed="true"]{background:var(--palm);color:#fff}
  .wsim-ctl .ind{background:var(--date-tint);color:var(--ink)}
  .wsim-ctl .ind[aria-pressed="true"]{background:#7A4DB0;color:#fff}
  .wsim-obs{margin-top:10px;padding:14px 16px;border-radius:14px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--rule);min-height:96px}
  .wsim-obs h4{margin:0 0 6px;font:700 17px var(--display);color:var(--palm)}
  .wsim-obs ul{margin:0;padding-inline-start:20px;line-height:1.9}
  .wsim-obs .eq{direction:ltr;text-align:center;font:600 16px/1.6 var(--body);margin-top:8px;padding:8px;border-radius:10px;background:var(--sheet);overflow-x:auto;white-space:nowrap}`;
  document.head.appendChild(st);
  const SPEC={
    li:{speed:.35,bub:.25,melt:false,flame:null,boom:false,size:13},
    na:{speed:1.6,bub:.7,melt:true,flame:null,boom:false,size:11},
    k:{speed:2.4,bub:1,melt:true,flame:"#A673E0",boom:false,size:11},
    cs:{speed:0,bub:2,melt:true,flame:"#FFD25A",boom:true,size:10}
  };
  /* يرسم الحوض ويحرّك قطعة الفلز. ind: هل أُضيف الكاشف العام؟ */
  window.waterSim=function(host,m,ind){
    const sp=SPEC[m];host.innerHTML=`<svg class="wsim" viewBox="0 0 400 210" role="img" aria-label="حوض ماء وقطعة فلز قلوي">
      <defs><linearGradient id="wsg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
      <path d="M30 70v100a22 22 0 0 0 22 22h296a22 22 0 0 0 22-22V70" fill="none" stroke="#7E8C87" stroke-width="5" stroke-linecap="round"/>
      <path class="wat" d="M33 104h334v66a19 19 0 0 1-19 19H52a19 19 0 0 1-19-19z" fill="${ind?"#5DAE62":"#BFE0EA"}" opacity=".85"/>
      <rect x="33" y="104" width="334" height="40" fill="url(#wsg)"/>
      <g class="bubs"></g><g class="pc"></g><g class="fx"></g>
    </svg>`;
    const svg=host.querySelector("svg"),wat=svg.querySelector(".wat"),bubs=svg.querySelector(".bubs"),pc=svg.querySelector(".pc"),fx=svg.querySelector(".fx");
    let x=200,dir=1,t=0,B=[],alive=true,boomed=false;const t0=performance.now();
    const NS="http://www.w3.org/2000/svg",mk=(n,a)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e};
    const lerp=(a,b,f)=>Math.round(a+(b-a)*f),mix=f=>`rgb(${lerp(93,122,f)},${lerp(174,77,f)},${lerp(98,176,f)})`;
    function frame(now){
      if(!alive||!svg.isConnected)return;t=(now-t0)/1000;
      /* لون الكاشف يتحوّل تدريجيًا إلى البنفسجي (محلول قلوي) */
      if(ind){const f=Math.min(1,t/(m==="li"?6:m==="cs"?1:3));wat.setAttribute("fill",mix(f))}
      if(sp.boom){
        if(!boomed&&t>.6){boomed=true;for(let i=0;i<14;i++){const a=i/14*6.28;fx.appendChild(mk("line",{x1:200,y1:100,x2:200+Math.cos(a)*70,y2:100+Math.sin(a)*45,stroke:i%2?"#FFB547":"#FF7A3D","stroke-width":4,"stroke-linecap":"round",opacity:1}))}
          fx.appendChild(mk("circle",{cx:200,cy:100,r:30,fill:"#FFE08A",opacity:.9}));for(let i=0;i<20;i++)B.push({x:200+(Math.random()-.5)*120,y:110+Math.random()*60,r:2+Math.random()*4,v:.8+Math.random()*1.4})}
        if(boomed){fx.style.opacity=Math.max(0,1-(t-.6)/1.4);pc.innerHTML=""}
        else{pc.innerHTML="";pc.appendChild(mk("rect",{x:194,y:96,width:12,height:9,rx:2,fill:"#9AA3A8"}))}
      }else{
        x+=dir*sp.speed*(1+Math.sin(t*3)*.4);if(x>330||x<70)dir*=-1;
        const y=101+Math.sin(t*4)*1.2;pc.innerHTML="";
        const melted=sp.melt&&t>.8;
        if(melted)pc.appendChild(mk("circle",{cx:x,cy:y+1,r:sp.size*.6,fill:"#D9DEE2",stroke:"#8E979C","stroke-width":1.5}));
        else pc.appendChild(mk("rect",{x:x-sp.size/2,y:y-5,width:sp.size,height:9,rx:2,fill:"#B8C0C5",stroke:"#7E878C","stroke-width":1.2}));
        if(melted)pc.appendChild(mk("circle",{cx:x-2,cy:y-1,r:1.6,fill:"#fff"}));
        if(sp.flame&&t>1){const h=22+Math.sin(t*23)*5+Math.random()*4;pc.appendChild(mk("path",{d:`M${x-9} ${y-2}Q${x-10} ${y-h*.6} ${x} ${y-h}Q${x+10} ${y-h*.6} ${x+9} ${y-2}z`,fill:sp.flame,opacity:.85}));pc.appendChild(mk("path",{d:`M${x-4} ${y-2}Q${x-4} ${y-h*.4} ${x} ${y-h*.6}Q${x+4} ${y-h*.4} ${x+4} ${y-2}z`,fill:"#E9D8FF",opacity:.9}))}
        if(Math.random()<sp.bub)B.push({x:x+(Math.random()-.5)*14,y:y+4,r:1.2+Math.random()*2,v:.25+Math.random()*.5,up:true});
      }
      bubs.innerHTML="";B=B.filter(b=>{b.y-=b.v;b.x+=(Math.random()-.5)*.6;b.r+=.02;return b.y>60&&b.r<7});
      B.forEach(b=>bubs.appendChild(mk("circle",{cx:b.x,cy:b.y,r:b.r,fill:"none",stroke:"#fff","stroke-width":1.2,opacity:b.y<104?.4:.9})));
      requestAnimationFrame(frame)}
    requestAnimationFrame(frame);
    return ()=>{alive=false};
  };
  const INFO={
    li:{n:"الليثيوم",s:"Li",obs:["يطفو على سطح الماء ويتحرّك.","يتفاعل بشكل ثابت (فوران وفقاعات غاز).","لا ينصهر، لأن الحرارة الناتجة لا تكفي لصهره."],eq:"2Li(s) + 2H₂O(l) → 2LiOH(aq) + H₂(g)",w:"ليثيوم + ماء ← هيدروكسيد الليثيوم + هيدروجين"},
    na:{n:"الصوديوم",s:"Na",obs:["يطفو ويتحرّك بسرعة على سطح الماء.","ينصهر فيصبح كرة فضية لامعة، لأن التفاعل طارد للحرارة.","يتفاعل بشدة. وإذا وُضع على ورقة ترشيح يشتعل الهيدروجين بلهب أصفر."],eq:"2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)",w:"صوديوم + ماء ← هيدروكسيد الصوديوم + هيدروجين"},
    k:{n:"البوتاسيوم",s:"K",obs:["يطفو وينصهر.","يشتعل ويتفاعل بشدة مكوّنًا لهبًا بنفسجيًا (ليلكيًا).","قد ينفجر في نهاية التفاعل."],eq:"2K(s) + 2H₂O(l) → 2KOH(aq) + H₂(g)",w:"بوتاسيوم + ماء ← هيدروكسيد البوتاسيوم + هيدروجين"},
    cs:{n:"الروبيديوم والسيزيوم",s:"Rb / Cs",obs:["ينفجران فور ملامستهما الماء.","لذلك لا تُجرى هذه التجربة في المختبر المدرسي."],eq:"2Cs(s) + 2H₂O(l) → 2CsOH(aq) + H₂(g)",w:"سيزيوم + ماء ← هيدروكسيد السيزيوم + هيدروجين"}
  };
  window.ALKALI_INFO=INFO;
  WIDGETS.water=el=>{
    el.className="widget";let m="li",ind=false,stop=null;
    el.innerHTML=`<div class="wsim-ctl" role="group" aria-label="اختاري الفلز">${Object.keys(INFO).map(k=>`<button class="mb" data-m="${k}" aria-pressed="${k===m}"><b dir="ltr">${INFO[k].s}</b>${INFO[k].n}</button>`).join("")}<button class="mb ind" aria-pressed="false"><b>+</b>الكاشف العام</button></div><div class="wsim-h"></div><div class="wsim-obs"></div><div class="w-bar"><span class="w-cap">اختاري فلزًا لترَي ما يحدث عند وضع قطعة صغيرة منه في الماء. أضيفي الكاشف العام لترَي لون المحلول الناتج.</span></div>`;
    const run=()=>{if(stop)stop();stop=waterSim(el.querySelector(".wsim-h"),m,ind);const I=INFO[m];
      el.querySelector(".wsim-obs").innerHTML=`<h4>${I.n} في الماء</h4><ul>${I.obs.map(o=>`<li>${o}</li>`).join("")}${ind?`<li>يتحوّل لون الكاشف العام من الأخضر إلى <b style="color:#7A4DB0">البنفسجي</b>: المحلول الناتج <b>قلوي</b> بسبب ذوبان الهيدروكسيد.</li>`:""}</ul><div class="eq">${I.eq}</div><p class="soft" style="margin:6px 0 0;text-align:center">${I.w}</p>`;
      el.querySelectorAll(".mb[data-m]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===m))};
    el.querySelectorAll(".mb[data-m]").forEach(b=>b.onclick=()=>{m=b.dataset.m;run()});
    el.querySelector(".mb.ind").onclick=e=>{ind=!ind;e.currentTarget.setAttribute("aria-pressed",ind);run()};
    run();
  };
  /* مخطط اتجاهات المجموعة I: أعمدة درجة الانصهار والكثافة */
  WIDGETS.trends=el=>{
    el.className="widget";
    const D=[["Li","ليثيوم",181,0.53],["Na","صوديوم",98,0.97],["K","بوتاسيوم",63,0.86],["Rb","روبيديوم",39,1.53],["Cs","سيزيوم",29,1.88]];
    const P={mp:{t:"درجة الانصهار (°C)",i:2,max:200,c:"#C2852A",note:"تقلّ درجة الانصهار كلما نزلنا في المجموعة، لأن الرابطة الفلزية تضعف."},de:{t:"الكثافة (g/cm³)",i:3,max:2,c:"#1D6672",note:"تزداد الكثافة عمومًا نزولًا في المجموعة، مع استثناء: البوتاسيوم أقل كثافة بقليل من الصوديوم."}};
    let k="mp";
    const draw=()=>{const p=P[k];el.querySelector(".tr-svg").innerHTML=`<svg viewBox="0 0 420 230" style="width:100%;max-width:560px;display:block;margin:auto" role="img" aria-label="${p.t}" direction="ltr">
      <line x1="40" y1="190" x2="410" y2="190" stroke="var(--rule)" stroke-width="2"/>
      ${D.map((d,j)=>{const h=d[p.i]/p.max*160,x=55+j*72;return `<g><rect x="${x}" y="${190-h}" width="46" height="${h}" rx="6" fill="${p.c}" opacity="${k==="de"&&d[0]==="K"?.6:1}"><animate attributeName="height" from="0" to="${h}" dur=".6s"/><animate attributeName="y" from="190" to="${190-h}" dur=".6s"/></rect><text x="${x+23}" y="${182-h}" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">${d[p.i]}</text><text x="${x+23}" y="210" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">${d[0]}</text></g>`}).join("")}
      <path d="M20 40v140" stroke="var(--soft)" stroke-width="2" marker-end="url(#ar)"/><defs><marker id="ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--soft)"/></marker></defs>
    </svg><p class="soft" style="text-align:center;margin:6px 0 0">${p.note}</p>`};
    el.innerHTML=`<div class="wsim-ctl"><button class="mb" data-k="mp" aria-pressed="true">درجة الانصهار</button><button class="mb" data-k="de" aria-pressed="false">الكثافة</button></div><div class="tr-svg"></div><div class="w-bar"><span class="w-cap">من أعلى المجموعة (Li) إلى أسفلها (Cs). القيم من كتاب الطالب وكتاب النشاط، وأُضيفت كثافتا Li و Rb ودرجة انصهار Cs للمقارنة.</span></div>`;
    el.querySelectorAll(".mb").forEach(b=>b.onclick=()=>{k=b.dataset.k;el.querySelectorAll(".mb").forEach(x=>x.setAttribute("aria-pressed",x===b));draw()});draw();
  };
})();

/* ===== الدرس 1-4: سلسلة النشاط الكيميائي ومختبر الإزاحة ===== */
(function(){
  const st=document.createElement("style");
  st.textContent=`.ser{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:16px;align-items:start}
  @media (max-width:700px){.ser{grid-template-columns:1fr}}
  .ser-l{list-style:none;margin:0;padding:0;display:grid;gap:5px;position:relative}
  .ser-l li button{width:100%;display:flex;align-items:center;gap:10px;border:0;border-radius:10px;padding:6px 12px;font:600 15px var(--body);cursor:pointer;color:var(--ink);background:var(--paper);box-shadow:inset 0 0 0 1px var(--rule);text-align:start}
  .ser-l li button b{font:700 17px var(--display);min-width:34px;direction:ltr;text-align:center}
  .ser-l li.nm button{background:var(--date-tint);font-style:normal}
  .ser-l li button[aria-pressed="true"]{background:var(--palm);color:#fff;box-shadow:none}
  .ser-card{border-radius:14px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--rule);padding:14px 16px;position:sticky;top:80px}
  .ser-card h4{margin:0 0 8px;font:700 19px var(--display);color:var(--palm)}
  .ser-card dl{margin:0;display:grid;gap:8px}.ser-card dt{font-weight:700;font-size:14px;color:var(--soft)}.ser-card dd{margin:0;line-height:1.7}
  .ser-card .eq{direction:ltr;text-align:start;font:600 15px var(--body);background:var(--sheet);border-radius:8px;padding:4px 8px;margin-top:4px;overflow-x:auto;white-space:nowrap}
  .dlab-ctl{display:grid;gap:10px;margin-bottom:10px}
  .dlab-ctl .row{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
  .dlab-ctl .row>span{font-weight:700;color:var(--soft);min-width:70px}
  .dlab-ctl button{border:0;border-radius:10px;padding:7px 12px;font:600 14px var(--body);background:var(--palm-tint);color:var(--palm);cursor:pointer}
  .dlab-ctl button[aria-pressed="true"]{background:var(--palm);color:#fff}
  .dsim{display:block;width:100%;max-width:340px;margin:0 auto}
  .dlab-out{border-radius:14px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--rule);padding:12px 16px;margin-top:8px;line-height:1.8}
  .dlab-out .eq{direction:ltr;text-align:center;font:600 15px var(--body);background:var(--sheet);border-radius:8px;padding:6px;margin-top:6px;overflow-x:auto;white-space:nowrap}`;
  document.head.appendChild(st);

  /* بيانات الفلزات (من الجدول 4-1 والشكل 4-1 في كتاب الطالب) */
  const SER=[
    ["K","البوتاسيوم","يتفاعل بشدة مع الماء البارد منتجًا الهيدروجين.","تفاعل قوي جدًا (خطير، يُتجنّب في المختبر).","لا يُختزل أكسيده بالكربون (أنشط من الكربون).","2K(s) + 2H₂O(l) → 2KOH(aq) + H₂(g)"],
    ["Na","الصوديوم","يتفاعل بشدة مع الماء البارد منتجًا الهيدروجين.","تفاعل قوي جدًا (خطير، يُتجنّب في المختبر).","لا يُختزل أكسيده بالكربون.","2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)"],
    ["Ca","الكالسيوم","يتفاعل بشدة مع الماء البارد، وينتج الهيدروجين بسرعة ومحلولًا قلويًا (ماء الجير).","تفاعل عنيف جدًا، غير آمن في المختبر.","لا يُختزل أكسيده بالكربون.","Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g)"],
    ["Mg","الماغنيسيوم","بطيء جدًا مع الماء البارد، ويتوهّج مع بخار الماء فيكوّن أكسيد الماغنيسيوم والهيدروجين.","يتفاعل بأمان منتجًا كلوريد الماغنيسيوم والهيدروجين.","لا يُختزل أكسيده بالكربون.","Mg(s) + 2H₂O(g) → MgO(s) + H₂(g)"],
    ["Al","الألومنيوم","يتفاعل مع بخار الماء عند التسخين (بعد إزالة طبقة أكسيد الألومنيوم الواقية).","يتفاعل بقوة أقل منتجًا الهيدروجين.","لا يُختزل أكسيده بالكربون.","2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)"],
    ["C","الكربون","لافلز يُدرج في السلسلة للمقارنة.","—","يختزل أكاسيد الفلزات التي تقع تحته فقط.","2CuO(s) + C(s) → 2Cu(s) + CO₂(g)",1],
    ["Zn","الخارصين","لا يتفاعل بشكل ملحوظ مع الماء البارد، ويتفاعل مع بخار الماء عند التسخين.","يتفاعل بقوة أقل منتجًا الهيدروجين.","يُختزل أكسيده بالكربون.","Zn(s) + H₂O(g) → ZnO(s) + H₂(g)"],
    ["Fe","الحديد","يتفاعل مع بخار الماء عند التسخين (النشاط 1-2: الصوف الحديدي الساخن).","يتفاعل بقوة أقل منتجًا الهيدروجين.","يُختزل أكسيده بالكربون.","Fe(s) + H₂O(g) → FeO(s) + H₂(g)"],
    ["Sn","القصدير","—","—","يُختزل أكسيده بالكربون.",""],
    ["Pb","الرصاص","لا يتفاعل.","لا يتفاعل (حسب الجدول 4-1).","يُختزل أكسيده بالكربون.",""],
    ["H","الهيدروجين","لافلز يُدرج في السلسلة للمقارنة.","الفلزات فوقه تزيحه من الماء والأحماض، والفلزات تحته لا تستطيع.","—","",1],
    ["Cu","النحاس","لا يتفاعل مع الماء ولا بخار الماء حتى عند التسخين.","لا يتفاعل مع الأحماض المخففة.","يُختزل أكسيده بالكربون بسهولة.","2CuO(s) + C(s) → 2Cu(s) + CO₂(g)"],
    ["Ag","الفضة","لا تتفاعل.","لا تتفاعل.","—",""],
    ["Au","الذهب","لا يتفاعل.","لا يتفاعل، ويوجد في الطبيعة بهيئته النقية.","—",""]
  ];
  WIDGETS.series=el=>{
    el.className="widget";let k=0;
    el.innerHTML=`<div class="ser"><div><p class="soft" style="margin:0 0 8px;text-align:center">⬆ زيادة النشاط الكيميائي</p><ol class="ser-l">${SER.map((s,i)=>`<li class="${s[6]?'nm':''}"><button data-i="${i}" aria-pressed="${i===k}"><b>${s[0]}</b>${s[1]}${s[6]?' <small style="color:var(--soft)">(لافلز)</small>':''}</button></li>`).join("")}</ol></div><div class="ser-card" aria-live="polite"></div></div><div class="w-bar"><span class="w-cap">الشكل 4-1: سلسلة النشاط الكيميائي. اضغطي على أي عنصر لتعرفي كيف يتفاعل.</span></div>`;
    const show=()=>{const s=SER[k];el.querySelector(".ser-card").innerHTML=`<h4><bdi dir="ltr">${s[0]}</bdi> ${s[1]}</h4><dl><dt>مع الماء أو بخار الماء</dt><dd>${s[2]}</dd><dt>مع حمض الهيدروكلوريك المخفف</dt><dd>${s[3]}</dd><dt>اختزال أكسيده بالكربون</dt><dd>${s[4]}</dd></dl>${s[5]?`<div class="eq">${s[5]}</div>`:""}`;
      el.querySelectorAll(".ser-l button").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===k))};
    el.querySelectorAll(".ser-l button").forEach(b=>b.onclick=()=>{k=+b.dataset.i;show()});show();
  };

  /* مختبر الإزاحة: فلز في محلول ملح فلز آخر */
  const MET={Mg:{n:"الماغنيسيوم",r:5,c:"#C9CED3",ion:"Mg²⁺",sol:null},Zn:{n:"الخارصين",r:4,c:"#AEB6BD",ion:"Zn²⁺",sol:null},Fe:{n:"الحديد",r:3,c:"#6B7177",ion:"Fe²⁺",sol:"#BFDDB0"},Cu:{n:"النحاس",r:2,c:"#B5633A",ion:"Cu²⁺",sol:"#5B9BE0"},Ag:{n:"الفضة",r:1,c:"#DADDE0",ion:"Ag⁺",sol:null}};
  const SALT={Mg:["كبريتات الماغنيسيوم","MgSO₄"],Zn:["كبريتات الخارصين","ZnSO₄"],Fe:["كبريتات الحديد (II)","FeSO₄"],Cu:["كبريتات النحاس (II)","CuSO₄"],Ag:["نترات الفضة","AgNO₃"]};
  const COAT={Cu:"بُنّي محمر",Fe:"رمادي داكن",Ag:"رمادي-فضي (بلّورات فلزية)",Zn:"رمادي-فضي",Mg:"رمادي"};
  const colName=c=>c==="#5B9BE0"?"أزرق":c==="#BFDDB0"?"أخضر فاتح":"عديم اللون";
  window.DISP={MET,SALT,COAT};
  window.dispResult=(m,s)=>{const M=MET[m],T=MET[s];const ok=M.r>T.r;const before=T.sol||"#EEF5F8",after=ok?(M.sol||"#EEF5F8"):before;
    const eqs={"Zn-Cu":"Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)","Fe-Cu":"Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)","Mg-Cu":"Mg(s) + CuSO₄(aq) → MgSO₄(aq) + Cu(s)","Zn-Fe":"Zn(s) + FeSO₄(aq) → ZnSO₄(aq) + Fe(s)","Mg-Fe":"Mg(s) + FeSO₄(aq) → MgSO₄(aq) + Fe(s)","Mg-Zn":"Mg(s) + ZnSO₄(aq) → MgSO₄(aq) + Zn(s)","Cu-Ag":"Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)","Zn-Ag":"Zn(s) + 2AgNO₃(aq) → Zn(NO₃)₂(aq) + 2Ag(s)","Fe-Ag":"Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)","Mg-Ag":"Mg(s) + 2AgNO₃(aq) → Mg(NO₃)₂(aq) + 2Ag(s)"};
    const ion={"Zn-Cu":"Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)","Fe-Cu":"Fe(s) + Cu²⁺(aq) → Fe²⁺(aq) + Cu(s)","Mg-Cu":"Mg(s) + Cu²⁺(aq) → Mg²⁺(aq) + Cu(s)","Zn-Fe":"Zn(s) + Fe²⁺(aq) → Zn²⁺(aq) + Fe(s)","Mg-Fe":"Mg(s) + Fe²⁺(aq) → Mg²⁺(aq) + Fe(s)","Mg-Zn":"Mg(s) + Zn²⁺(aq) → Mg²⁺(aq) + Zn(s)","Cu-Ag":"Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s)","Zn-Ag":"Zn(s) + 2Ag⁺(aq) → Zn²⁺(aq) + 2Ag(s)","Fe-Ag":"Fe(s) + 2Ag⁺(aq) → Fe²⁺(aq) + 2Ag(s)","Mg-Ag":"Mg(s) + 2Ag⁺(aq) → Mg²⁺(aq) + 2Ag(s)"};
    const key=m+"-"+s;
    return {ok,before,after,coat:ok?MET[s].c:null,
      obs:m===s?"الفلز في محلول ملحه نفسه: لا يحدث تفاعل.":ok?`يحدث تفاعل: ${T.sol?`يتلاشى اللون ${colName(before)} للمحلول${after!=="#EEF5F8"?` ويصبح ${colName(after)}`:" ويصبح عديم اللون"}`:after!=="#EEF5F8"?`يصبح لون المحلول ${colName(after)}`:"يبقى المحلول عديم اللون"}، ويتكوّن على الفلز راسب ${COAT[s]} من ${T.n}.`:`لا يحدث تفاعل، لأن ${M.n} أقل نشاطًا من ${T.n}.`,
      why:ok?`${M.n} أنشط من ${T.n}، فيزيحه من محلول ملحه ويحلّ محلّه.`:"",eq:ok?eqs[key]:"",ion:ok?ion[key]:""}};
  window.dispSim=(host,m,s,play)=>{const R=dispResult(m,s);
    host.innerHTML=`<svg class="dsim" viewBox="0 0 220 230" role="img" aria-label="كأس فيها محلول وشريط فلز"><path d="M40 30v160a20 20 0 0 0 20 20h100a20 20 0 0 0 20-20V30" fill="none" stroke="#6e7f88" stroke-width="5" stroke-linecap="round"/><path class="sl" d="M43 80h134v110a17 17 0 0 1-17 17H60a17 17 0 0 1-17-17z" fill="${R.before}"/><rect x="98" y="14" width="24" height="170" rx="4" fill="${MET[m].c}" stroke="#555" stroke-width="2"/><g class="ct" opacity="0">${[...Array(14)].map((_,i)=>`<circle cx="${100+(i*7)%22}" cy="${92+i*6.5}" r="${3+(i%3)}" fill="${R.coat||'none'}"/>`).join("")}</g></svg>`;
    if(!R.ok||play==="before")return R;const sl=host.querySelector(".sl"),ct=host.querySelector(".ct");
    const go=()=>{sl.style.transition="fill 2.2s ease";ct.style.transition="opacity 2.2s ease";requestAnimationFrame(()=>{sl.setAttribute("fill",R.after);sl.style.fill=R.after;ct.setAttribute("opacity","1");ct.style.opacity=1})};
    if(play!==false)setTimeout(go,300);else{sl.setAttribute("fill",R.after);ct.setAttribute("opacity","1")}
    return R};
  WIDGETS.displab=el=>{
    el.className="widget";let m="Zn",s="Cu";
    el.innerHTML=`<div class="dlab-ctl"><div class="row"><span>الفلز:</span>${Object.keys(MET).map(k=>`<button data-m="${k}"><bdi dir="ltr">${k}</bdi> ${MET[k].n}</button>`).join("")}</div><div class="row"><span>المحلول:</span>${Object.keys(SALT).map(k=>`<button data-s="${k}">${SALT[k][0]}</button>`).join("")}</div></div><div class="dlab-h"></div><div class="dlab-out" aria-live="polite"></div><div class="w-bar"><span class="w-cap">مختبر الإزاحة (الجدول 6-1): اختاري فلزًا ومحلولًا، وراقبي ما يحدث.</span></div>`;
    const run=()=>{el.querySelectorAll("[data-m]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===m));el.querySelectorAll("[data-s]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.s===s));
      const R=dispSim(el.querySelector(".dlab-h"),m,s);el.querySelector(".dlab-out").innerHTML=`<b>${MET[m].n} + ${SALT[s][0]}</b><br>${R.obs}${R.why?`<br>${R.why}`:""}${R.eq?`<div class="eq">${R.eq}</div><div class="eq">${R.ion}</div>`:""}`};
    el.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{m=b.dataset.m;run()});el.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{s=b.dataset.s;run()});run();
  };
})();

/* ===== الوحدة الثانية ===== */
(function(){
  if(!window.U2ART)return;
  const st=document.createElement("style");
  st.textContent=`.u2-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:0 0 10px}
  .u2-tabs button{border:0;border-radius:10px;padding:7px 12px;font:600 14px var(--body);background:var(--palm-tint);color:var(--palm);cursor:pointer}
  .u2-tabs button[aria-pressed="true"]{background:var(--palm);color:#fff}
  .u2-out{border-radius:14px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--rule);padding:12px 16px;margin-top:10px;line-height:1.8;min-height:70px}
  .u2-out h4{margin:0 0 4px;font:700 17px var(--display);color:var(--palm)}
  .u2-out .eq{direction:ltr;text-align:center;font:600 15px var(--body);background:var(--sheet);border-radius:8px;padding:6px;margin-top:6px;overflow-x:auto;white-space:nowrap}
  .u2-fig{background:#fff;border-radius:14px;overflow:hidden;max-width:640px;margin:0 auto}
  .u2-fig .fz{transition:opacity .25s}
  .u2-tubes{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
  .u2-tubes button{border:0;background:#fff;border-radius:14px;padding:8px;box-shadow:inset 0 0 0 1px var(--rule);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;font:600 13px var(--body);max-width:150px;color:#1A2622}
  .u2-tubes button.on{box-shadow:inset 0 0 0 3px var(--palm)}`;
  document.head.appendChild(st);

  WIDGETS.extract=el=>{el.className="widget";let k=null;
    el.innerHTML=`<div class="u2-tabs">${U2ART.METHODS.map(g=>`<button data-k="${g.k}" aria-pressed="false">${g.n.split(" (")[0]}</button>`).join("")}</div><div class="u2-fig"></div><div class="u2-out" aria-live="polite"><span class="soft">اضغطي على طريقة لتعرفي أي الفلزات تُستخلص بها ولماذا.</span></div><div class="w-bar"><span class="w-cap">الجدول 2-2: طرق استخلاص الفلزات حسب نشاطها الكيميائي.</span></div>`;
    const WHY={el:"فلزات نشطة جدًا، لا يستطيع الكربون اختزالها، وتحتاج طاقة كبيرة تُوفَّر بالكهرباء.",c:"فلزات معتدلة النشاط تقع تحت الكربون، فيختزل الكربون أكاسيدها. خامات الكبريتيد تُسخَّن في الهواء أولًا لتصبح أكاسيد.",s:"النحاس قليل النشاط، يُستخلص بتسخين خام الكبريتيد في الهواء.",n:"غير نشطة كيميائيًا، فتوجد في القشرة الأرضية عناصر منفردة نقية (Native)."};
    const draw=()=>{el.querySelector(".u2-fig").innerHTML=U2ART.ladder({hl:k});el.querySelectorAll("[data-k]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.k===k));
      if(k){const g=U2ART.METHODS.find(x=>x.k===k);el.querySelector(".u2-out").innerHTML=`<h4>${g.n}</h4>${g.m.map(m=>m[1]).join("، ")}<br><b>لماذا؟</b> ${WHY[k]}`}};
    el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{k=k===b.dataset.k?null:b.dataset.k;draw()});draw();
  };
  WIDGETS.furnace=el=>{el.className="widget";let k=null;const keys=Object.keys(U2ART.FZ);
    el.innerHTML=`<div class="u2-tabs">${keys.map(z=>`<button data-k="${z}" aria-pressed="false">${U2ART.FZ[z].n.split(":")[0]}</button>`).join("")}</div><div class="u2-fig"></div><div class="u2-out" aria-live="polite"><span class="soft">اضغطي على أي جزء من الفرن أو زر بالأعلى.</span></div><div class="w-bar"><span class="w-cap">الشكل 1-2 والشكل 2-2: الفرن العالي وسلسلة تفاعلاته.</span></div>`;
    const draw=()=>{const f=el.querySelector(".u2-fig");f.innerHTML=U2ART.furnace({hl:k,click:true});f.querySelectorAll(".fz").forEach(g=>g.onclick=()=>{k=g.dataset.z;draw()});
      el.querySelectorAll("[data-k]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.k===k));
      if(k){const z=U2ART.FZ[k];el.querySelector(".u2-out").innerHTML=`<h4>${z.n}</h4>${z.d}${z.eq?z.eq.split(" • ").map(e=>`<div class="eq">${e}</div>`).join(""):""}`}};
    el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{k=b.dataset.k;draw()});draw();
  };
  WIDGETS.bos=el=>{el.className="widget";let k=0;
    el.innerHTML=`<div class="u2-tabs">${["المرحلة (أ)","المرحلة (ب)","المرحلة (ج)"].map((n,i)=>`<button data-k="${i}">${n}</button>`).join("")}</div><div class="u2-fig"></div><div class="u2-out" aria-live="polite"></div><div class="w-bar"><span class="w-cap">الشكل 3-2: عملية الأكسجين الأساسية لصناعة الفولاذ.</span></div>`;
    const draw=()=>{el.querySelector(".u2-fig").innerHTML=U2ART.bos(k);el.querySelector(".u2-out").innerHTML=U2ART.BOS[k];el.querySelectorAll("[data-k]").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.k===k))};
    el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{k=+b.dataset.k;draw()});draw();
  };
  WIDGETS.alloyslide=el=>{el.className="widget";
    el.innerHTML=`<div class="two" style="gap:12px"><div><h4 style="margin:0 0 6px;text-align:center;font-family:var(--display)">فلز نقي</h4><div class="lp"></div></div><div><h4 style="margin:0 0 6px;text-align:center;font-family:var(--display)">سبيكة</h4><div class="la"></div></div></div><div style="text-align:center;margin-top:10px"><button class="btn sm" id="push">اطرقي (طبّقي قوة)</button> <button class="btn ghost sm" id="rst">أعيدي</button></div><div class="u2-out" aria-live="polite"><span class="soft">اضغطي «اطرقي» وقارني بين التركيبين.</span></div>`;
    const draw=(s1,s2)=>{el.querySelector(".lp").innerHTML=U2ART.lattice("pure",s1);el.querySelector(".la").innerHTML=U2ART.lattice("alloy",s2)};draw(0,0);
    el.querySelector("#push").onclick=()=>{let f=0;const go=()=>{f+=2;draw(Math.min(f,36),Math.min(f,4));if(f<36)requestAnimationFrame(go);else el.querySelector(".u2-out").innerHTML="في الفلز النقي الذرات متشابهة الحجم وترتيبها منتظم، فتنزلق الطبقات بسهولة. أما في السبيكة فذرات العنصر المختلف تُخلّ بالترتيب المنتظم، فيصعب انزلاق الطبقات: <b>أقل مرونة وأكثر صلادة</b>."};go()};
    el.querySelector("#rst").onclick=()=>{draw(0,0)};
  };
  WIDGETS.rusttubes=el=>{el.className="widget";const seen=new Set();
    el.innerHTML=`<div class="u2-tubes">${U2ART.TUBES.map((T,i)=>`<button data-i="${i}">${U2ART.tube(i,false,96)}<b>${T.n}</b><span>${T.c}</span></button>`).join("")}</div><div style="text-align:center;margin-top:8px"><button class="btn sm" id="wk">بعد أسبوع…</button></div><div class="u2-out" aria-live="polite"><span class="soft">توقّعي أولًا: في أي الأنابيب ستصدأ المسامير؟ اضغطي على أنبوبة، أو «بعد أسبوع» لكشف الكل.</span></div><div class="w-bar"><span class="w-cap">الشكل 5-2: تجربة استقصاء العوامل التي تؤدي إلى تكوّن الصدأ.</span></div>`;
    const show=i=>{const b=el.querySelector(`[data-i="${i}"]`),T=U2ART.TUBES[i];b.querySelector("svg").outerHTML=U2ART.tube(i,true,96);b.classList.add("on");el.querySelector(".u2-out").innerHTML=`<b>${T.n}: ${T.rust?"صدأ":"لا صدأ"}</b> — ${T.why}`};
    el.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>show(+b.dataset.i));
    el.querySelector("#wk").onclick=()=>{U2ART.TUBES.forEach((_,i)=>show(i));el.querySelector(".u2-out").innerHTML="<b>النتيجة:</b> يصدأ الحديد فقط بوجود <b>الماء والأكسجين معًا</b> (الأنبوبتان 1 و 4)."};
  };
  WIDGETS.cuo=el=>{el.className="widget";let d=false;
    el.innerHTML=`<div class="u2-fig"></div><div style="text-align:center;margin-top:8px"><button class="btn sm" id="ht">سخّني 5 دقائق</button></div><div class="u2-out" aria-live="polite"></div><div class="w-bar"><span class="w-cap">النشاط 1-2: استخلاص النحاس من أكسيده باستخدام الفحم.</span></div>`;
    const draw=()=>{el.querySelector(".u2-fig").innerHTML=U2ART.cuo(d);el.querySelector(".u2-out").innerHTML=d?`<b>الملاحظات:</b> يظهر نحاس بُنّي محمر حيث يلتقي المسحوقان، ويتعكّر ماء الجير بسبب ثاني أكسيد الكربون.<div class="eq">2CuO(s) + C(s) → 2Cu(s) + CO₂(g)</div>`:"طبقة أكسيد النحاس (II) السوداء في الأسفل، وفوقها طبقة مسحوق الفحم دون خلط.";el.querySelector("#ht").textContent=d?"أعيدي التجربة":"سخّني 5 دقائق"};
    el.querySelector("#ht").onclick=()=>{d=!d;draw()};draw();
  };
})();

/* ===== الوحدة الثانية ===== */
(function(){
  const st=document.createElement("style");
  st.textContent=`.ext{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:14px}@media (max-width:700px){.ext{grid-template-columns:1fr}}
  .ext ol{list-style:none;margin:0;padding:0;display:grid;gap:4px}
  .ext li button{width:100%;display:flex;gap:10px;align-items:center;border:0;border-radius:10px;padding:6px 12px;font:600 15px var(--body);cursor:pointer;color:var(--ink);text-align:start;background:var(--c);}
  .ext li button b{font:700 16px var(--display);min-width:30px;direction:ltr;text-align:center}
  .ext li button[aria-pressed="true"]{outline:3px solid var(--palm);outline-offset:1px}
  .ext-card{border-radius:14px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--rule);padding:14px 16px;align-self:start}
  .ext-card h4{margin:0 0 6px;font:700 19px var(--display);color:var(--palm)}.ext-card .m{display:inline-block;border-radius:999px;padding:3px 12px;font-weight:700;margin-bottom:8px}
  .ext-card .eq{direction:ltr;font:600 15px var(--body);background:var(--sheet);border-radius:8px;padding:5px 8px;margin-top:6px;overflow-x:auto;white-space:nowrap}
  .fur{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:14px;align-items:start}@media (max-width:700px){.fur{grid-template-columns:1fr}}
  .fur svg{width:100%;max-width:380px;display:block;margin:auto}.fur .z{cursor:pointer}.fur .z:hover rect,.fur .z.on rect{stroke:var(--date);stroke-width:4}
  .alloy-w{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media (max-width:600px){.alloy-w{grid-template-columns:1fr}}
  .alloy-w figure{margin:0;text-align:center;background:var(--paper);border-radius:14px;padding:10px;box-shadow:inset 0 0 0 1px var(--rule)}
  .alloy-w svg{width:100%;max-width:300px}.alloy-w figcaption{font-weight:700;margin-top:4px}
  .rust-t{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}@media (max-width:600px){.rust-t{grid-template-columns:repeat(2,1fr)}}
  .rust-t button{border:0;background:var(--paper);border-radius:14px;padding:8px;box-shadow:inset 0 0 0 1px var(--rule);cursor:pointer;font:600 14px var(--body);color:var(--ink)}
  .rust-t button svg{width:100%;max-width:110px;display:block;margin:auto}.rust-t button.on{box-shadow:inset 0 0 0 3px var(--palm)}`;
  document.head.appendChild(st);

  /* 2-1: طريقة الاستخلاص حسب الموقع في السلسلة */
  const EX=[["K","البوتاسيوم","e"],["Na","الصوديوم","e","الملح الصخري (NaCl)"],["Ca","الكالسيوم","e"],["Mg","الماغنيسيوم","e"],["Al","الألومنيوم","e","البوكسيت (Al₂O₃)"],["C","الكربون","x"],["Zn","الخارصين","c","بلند الخارصين (ZnS)","2ZnO(s) + C(s) → 2Zn(s) + CO₂(g)"],["Fe","الحديد","c","الهيماتيت (Fe₂O₃)","Fe₂O₃(s) + 3CO(g) → 2Fe(l) + 3CO₂(g)"],["Sn","القصدير","c","حجر القصدير (SnO₂)","SnO₂(s) + C(s) → Sn(s) + CO₂(g)"],["Pb","الرصاص","c","الجالينا (PbS)","2PbO(s) + C(s) → 2Pb(s) + CO₂(g)"],["Cu","النحاس","s","بيريت النحاس (CuFeS₂)","2CuO(s) + C(s) → 2Cu(s) + CO₂(g)"],["Ag","الفضة","n"],["Au","الذهب","n"]];
  const MT={e:["التحليل الكهربائي للمركب المصهور","#F4D9CF","فلز نشط جدًا (أنشط من الكربون)، فلا يختزله الكربون، ويحتاج طاقة كبيرة توفّرها الكهرباء."],c:["اختزال الأكسيد بالكربون","#D9ECDF","فلز معتدل النشاط (تحت الكربون)، فيختزل الكربون أو أحادي أكسيد الكربون أكسيده. خام الكبريتيد يُسخَّن في الهواء أولًا ليتحوّل إلى أكسيد."],s:["تسخين خام الكبريتيد في الهواء (ثم الاختزال)","#D6E9F2","أقل نشاطًا، ويوجد أحيانًا بصورة طبيعية نقية."],n:["يوجد بصورة طبيعية نقية (غير مندمجة)","#F6EBD9","غير نشط كيميائيًا، فيوجد في القشرة الأرضية عنصرًا منفردًا."],x:["لافلز للمقارنة","#EEF2F5","الحد الفاصل: ما فوقه لا يُختزل بالكربون، وما تحته يُختزل."]};
  WIDGETS.extract=el=>{el.className="widget";let k=7;
    el.innerHTML=`<div class="ext"><div><p class="soft" style="margin:0 0 6px;text-align:center">⬆ زيادة النشاط الكيميائي</p><ol>${EX.map((e,i)=>`<li><button data-i="${i}" style="--c:${MT[e[2]][1]}"><b>${e[0]}</b>${e[1]}</button></li>`).join("")}</ol></div><div class="ext-card" aria-live="polite"></div></div><div class="w-bar"><span class="w-cap">الجدول 2-2: طريقة الاستخلاص حسب النشاط. اضغطي على أي عنصر.</span></div>`;
    const show=()=>{const e=EX[k],m=MT[e[2]];el.querySelector(".ext-card").innerHTML=`<h4><bdi dir="ltr">${e[0]}</bdi> ${e[1]}</h4><span class="m" style="background:${m[1]}">${m[0]}</span><p style="margin:4px 0">${m[2]}</p>${e[3]?`<p style="margin:4px 0"><b>الخام:</b> ${e[3]}</p>`:""}${e[4]?`<div class="eq">${e[4]}</div>`:""}`;el.querySelectorAll(".ext button").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===k))};
    el.querySelectorAll(".ext button").forEach(b=>b.onclick=()=>{k=+b.dataset.i;show()});show()};

  /* 2-2: الفرن العالي التفاعلي */
  const FZ=[["top","المواد الأولية (الحمولة)","تدخل من أعلى الفرن: خام الحديد (الهيماتيت Fe₂O₃)، وفحم الكوك (C)، والحجر الجيري (CaCO₃).",""],
    ["gas","خروج الغازات الساخنة","تخرج الغازات العادمة الساخنة من أعلى الفرن، وتُستخدم كمبادلات حرارية لتسخين الهواء الداخل، فتقلّ تكلفة الطاقة.",""],
    ["c600","المنطقة العليا (~600 °C)","يُختزل خام الحديد بأحادي أكسيد الكربون (العامل المختزل الرئيسي): أكسيد الحديد (III) + أحادي أكسيد الكربون ← حديد + ثاني أكسيد الكربون","Fe₂O₃(s) + 3CO(g) → 2Fe(l) + 3CO₂(g)"],
    ["c1000","المنطقة الوسطى (~1000 °C)","يُختزل ثاني أكسيد الكربون عندما يصعد عبر الفرن فينتج أحادي أكسيد الكربون. ويتفكك الحجر الجيري حراريًا إلى جير حي.","CO₂(g) + C(s) → 2CO(g)<br>CaCO₃(s) → CaO(s) + CO₂(g)"],
    ["c1900","المنطقة السفلى (~1900 °C)","يحترق الكربون بشدة في تيارات الهواء الساخن عند قاعدة الفرن.","C(s) + O₂(g) → CO₂(g)"],
    ["air","دخول الهواء الساخن","تُضخ تيارات قوية من الهواء الساخن عبر ثقوب في أسفل الفرن.",""],
    ["slag","الخبث (سيليكات الكالسيوم)","الجير الحي (قاعدة) يتفاعل مع السيليكا (شائبة حمضية) فيكوّن الخبث المنصهر، يطفو فوق الحديد لأن كثافته أقل، ويخرج من مخرج منفصل.","CaO(s) + SiO₂(s) → CaSiO₃(l)"],
    ["iron","الحديد المنصهر","يتدفق الحديد إلى القاع لكثافته العالية، ويُجمع سائلًا لأن الحرارة أعلى من درجة انصهاره. يُسمّى «حديد الصب» وفيه نحو 4% كربون.",""]];
  WIDGETS.furnace=el=>{el.className="widget";let k=2;const K="#1A2622";
    el.innerHTML=`<div class="fur"><svg viewBox="0 0 320 430" role="img" aria-label="الفرن العالي"><g font-family="IBM Plex Sans Arabic,Tahoma" font-size="13" fill="${K}">
      <path d="M130 20h60l-14 30h-32z" fill="#7A7F84"/><path d="M110 60h100l40 230-20 60H90l-20-60z" fill="#E9ECEE" stroke="${K}" stroke-width="3"/>
      <path d="M118 70h84l34 210H84z" fill="url(#fg)"/><defs><linearGradient id="fg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#F6D27A"/><stop offset="1" stop-color="#D9573D"/></linearGradient></defs>
      <rect x="92" y="300" width="136" height="22" fill="#8C8F73"/><rect x="92" y="322" width="136" height="26" fill="#3E3E3E"/>
      <g class="z" data-k="top"><rect x="122" y="2" width="76" height="22" rx="6" fill="#fff" stroke="${K}"/><text x="160" y="18" text-anchor="middle">الحمولة</text></g>
      <g class="z" data-k="gas"><rect x="222" y="40" width="88" height="24" rx="6" fill="#fff" stroke="${K}"/><text x="266" y="57" text-anchor="middle">غازات ساخنة</text></g>
      <g class="z" data-k="c600"><rect x="122" y="96" width="76" height="26" rx="6" fill="#fff" stroke="${K}"/><text x="160" y="114" text-anchor="middle" direction="ltr">600 °C</text></g>
      <g class="z" data-k="c1000"><rect x="118" y="164" width="84" height="26" rx="6" fill="#fff" stroke="${K}"/><text x="160" y="182" text-anchor="middle" direction="ltr">1000 °C</text></g>
      <g class="z" data-k="c1900"><rect x="114" y="236" width="92" height="26" rx="6" fill="#fff" stroke="${K}"/><text x="160" y="254" text-anchor="middle" direction="ltr">1900 °C</text></g>
      <g class="z" data-k="air"><rect x="4" y="272" width="74" height="24" rx="6" fill="#fff" stroke="${K}"/><text x="41" y="289" text-anchor="middle">هواء ساخن</text></g>
      <g class="z" data-k="slag"><rect x="240" y="300" width="74" height="24" rx="6" fill="#fff" stroke="${K}"/><text x="277" y="317" text-anchor="middle">الخبث</text></g>
      <g class="z" data-k="iron"><rect x="232" y="336" width="84" height="24" rx="6" fill="#fff" stroke="${K}"/><text x="274" y="353" text-anchor="middle">حديد منصهر</text></g>
      <path d="M78 284h14M242 284h-14" stroke="${K}" stroke-width="3"/><path d="M228 312h12M228 340h4" stroke="${K}" stroke-width="3"/><path d="M200 50l22 2" stroke="${K}" stroke-width="3"/>
    </g></svg><div class="ext-card" aria-live="polite"></div></div><div class="w-bar"><span class="w-cap">الشكلان 1-2 و 2-2: اضغطي على أي جزء من الفرن لتعرفي ما يحدث فيه.</span></div>`;
    const show=()=>{const z=FZ.find(f=>f[0]===FZ[k][0]);el.querySelector(".ext-card").innerHTML=`<h4>${z[1]}</h4><p style="margin:4px 0;line-height:1.8">${z[2]}</p>${z[3]?`<div class="eq">${z[3]}</div>`:""}`;el.querySelectorAll(".z").forEach(g=>g.classList.toggle("on",g.dataset.k===z[0]))};
    el.querySelectorAll(".z").forEach(g=>g.onclick=()=>{k=FZ.findIndex(f=>f[0]===g.dataset.k);show()});show()};

  /* 2-3: فلز نقي مقابل سبيكة عند الطرق */
  WIDGETS.alloy=el=>{el.className="widget";
    const grid=(alloy,shift)=>{let s="";for(let r=0;r<5;r++)for(let c=0;c<7;c++){const big=alloy&&((r===1&&c===2)||(r===3&&c===4)||(r===2&&c===6));const dx=r<2?shift:0;s+=`<circle cx="${30+c*36+dx+(big?0:0)}" cy="${30+r*34}" r="${big?22:16}" fill="${big?'#C2852A':'#9FB7C8'}" stroke="#1A2622" stroke-width="1.5"/>`}return s};
    el.innerHTML=`<div class="alloy-w"><figure><svg viewBox="0 0 290 190" class="pm"></svg><figcaption>فلز نقي: ذرات متشابهة في ترتيب منتظم</figcaption></figure><figure><svg viewBox="0 0 290 190" class="al"></svg><figcaption>سبيكة: ذرات عنصر مختلف تُخلّ بالترتيب</figcaption></figure></div><div class="w-bar"><button class="btn sm" id="hit">اطرقي (طبّقي قوة)</button><button class="btn ghost sm" id="rs">إعادة</button><span class="w-cap" id="ac">الشكل 4-2: قارني ماذا يحدث للطبقات عند تطبيق قوة.</span></div>`;
    const draw=s=>{el.querySelector(".pm").innerHTML=grid(false,s);el.querySelector(".al").innerHTML=grid(true,Math.min(s,4))};draw(0);
    el.querySelector("#hit").onclick=()=>{let s=0;const t=setInterval(()=>{s+=3;draw(s);if(s>=36){clearInterval(t);el.querySelector("#ac").innerHTML="في الفلز النقي <b>انزلقت الطبقات</b> فتغيّر الشكل، وفي السبيكة <b>منعت الذرات المختلفة الانزلاق</b>، فهي أصلد وأقل مرونة."}},40)};
    el.querySelector("#rs").onclick=()=>{draw(0);el.querySelector("#ac").textContent="الشكل 4-2: قارني ماذا يحدث للطبقات عند تطبيق قوة."}};

  /* 2-4: تجربة الصدأ */
  const RT=[["1","ماء مقطّر + هواء","تجربة ضابطة","يصدأ","الماء والأكسجين متوفران.","#BFE0EA",1,1],["2","هواء جاف (كلوريد الكالسيوم)","","لا يصدأ","لا يوجد ماء: كلوريد الكالسيوم عامل تجفيف.","#fff",0,0],["3","ماء مغلي + طبقة زيت","","لا يصدأ","لا يوجد أكسجين: الغلي أزال الهواء الذائب، والزيت يمنع ذوبانه.","#BFE0EA",0,2],["4","ماء + أكسجين نقي","","صدئ جدًا","أكسجين نقي وماء: صدأ شديد.","#BFE0EA",2,3]];
  WIDGETS.rust=el=>{el.className="widget";let k=0;
    const tube=t=>`<svg viewBox="0 0 80 170" aria-hidden="true"><path d="M20 8h40M24 8v130a16 16 0 0 0 32 0V8" fill="#fff" stroke="#1A2622" stroke-width="3"/>${t[5]!=="#fff"?`<path d="M26 80v58a14 14 0 0 0 28 0V80z" fill="${t[5]}"/>`:`<path d="M26 120v18a14 14 0 0 0 28 0v-18z" fill="#eee"/>`}${t[7]===2?`<rect x="26" y="72" width="28" height="8" fill="#F2C94C"/>`:""}<rect x="37" y="30" width="6" height="110" fill="${t[6]===2?'#A0461E':t[6]?'#B8774B':'#8A9096'}"/>${t[6]?`<circle cx="40" cy="100" r="${t[6]*5}" fill="#A0461E" opacity=".7"/>`:""}</svg>`;
    el.innerHTML=`<div class="rust-t">${RT.map((t,i)=>`<button data-i="${i}">${tube(t)}<div>الأنبوبة ${t[0]}</div><small>${t[1]}</small></button>`).join("")}</div><div class="ext-card" style="margin-top:10px" aria-live="polite"></div><div class="w-bar"><span class="w-cap">الشكل 5-2: تجربة استقصاء العوامل المؤدية إلى الصدأ.</span></div>`;
    const show=()=>{const t=RT[k];el.querySelector(".ext-card").innerHTML=`<h4>الأنبوبة ${t[0]}: ${t[3]}</h4><p style="margin:0">${t[1]}${t[2]?` (${t[2]})`:""}. ${t[4]}</p>`;el.querySelectorAll(".rust-t button").forEach(b=>b.classList.toggle("on",+b.dataset.i===k))};
    el.querySelectorAll(".rust-t button").forEach(b=>b.onclick=()=>{k=+b.dataset.i;show()});show()};
})();
