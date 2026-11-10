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
