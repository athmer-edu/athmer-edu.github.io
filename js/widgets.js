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
