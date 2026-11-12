/* ============ رسومات العلوم البيئية ============ */
const EA=window.ENVART;
const H=(chip,t)=>`<div class="head"><span class="chip">${chip}</span><h1 class="t">${t}</h1></div>`;
function bindChoice(box,q){box.addEventListener('click',e=>{const b=e.target.closest('.opt');if(!b||b.disabled)return;const ok=+b.dataset.j===q.a;b.classList.add(ok?'right':'wrong');if(ok)$$('.opt',box).forEach(x=>x.disabled=true);else b.disabled=true;$('.fbx',box).innerHTML=`<div class="fb ${ok?'ok':'no'}">${ok?'✔ صحيح! ':'✘ ليست هذه. '}${ok?q.x:(q.w||'فكّري مرة أخرى.')}</div>`})}
const chk=(q)=>`<div class="chk" data-s="${q.s}"><div class="q">${q.q}</div><div class="opts">${shuffle(q.o.map((o,j)=>[o,j])).map(([o,j])=>`<button class="opt" data-j="${j}">${o}</button>`).join('')}</div><div class="fbx"></div></div>`;
const reveal=el=>el.addEventListener('click',e=>{const c=e.target.closest('.card,.term,.mc');if(c)c.classList.add('open')});
const EQ=(t,s,fs=34)=>`<div class="ex" data-s="${s}" style="direction:ltr;text-align:center"><span class="n" style="font-size:calc(${fs}px*var(--fs))">${t}</span></div>`;
const SL=[];const add=(sec,title,render)=>SL.push({sec,title,render});
let idx=0,S={},cur={};
const QA=(Q,cols=1,fs=30)=>`<div class="qa" style="gap:12px;grid-template-columns:repeat(${cols},1fr)">${Q.map((q,i)=>`<div class="card" tabindex="0" style="padding:8px 20px"><div class="q" style="font-size:calc(${fs}px*var(--fs))">${q[0]}</div><div class="a" style="font-size:calc(${fs}px*var(--fs))">${q[1]}</div><div class="tapme">اضغطي لإظهار الإجابة</div></div>`).join('')}</div>`;
const C5=(C,cols)=>`<div class="cols5" style="grid-template-columns:repeat(${cols||C.length},1fr)">${C.map((c,i)=>`<div class="c5" style="--c:${c[0]};justify-content:center" data-s="${i+1}">${c[3]?`<span class="no">${ar(i+1)}</span>`:''}<div class="tt">${c[1]}</div><div class="why">${c[2]}</div></div>`).join('')}</div>`;
function home(t1,t2,sub,pages,fig,cap){return el=>{el.innerHTML=`<div class="home"><div class="col" style="gap:20px">
  <div class="sub">العلوم البيئية • الصف الحادي عشر • الوحدة الأولى: مقدمة في الإدارة البيئية</div>
  <h1>${t1} <span>${t2}</span></h1><div class="sub" style="color:var(--turq)">${sub}</div>
  <div class="sub">إعداد: أ. رتاج الراسبي • كتاب الطالب صـ ${pages} • ٤٠ دقيقة</div>
  <div><button class="big" id="go1">ابدئي الدرس ←</button></div></div>
  <figure class="pic">${fig}<figcaption>${cap}</figcaption></figure></div>`;$('#go1',el).onclick=()=>go(idx+1)}}
function crit(outcome,items){return el=>{const plan=SECS.map(([n,m])=>`<span class="pl" style="flex:${m}"><b>${ar(m)} د</b>${n}</span>`).join('');
  el.innerHTML=`<div class="outcome">${outcome}</div><div class="letter"><h1 class="t" style="font-size:calc(50px*var(--fs))">في نهاية الحصة أستطيع أن:</h1><ol style="font-size:calc(30px*var(--fs))">${items.map(i=>`<li>${i}</li>`).join('')}</ol></div><div class="plan">${plan}</div>`}}
function exh(k,p1,p2,s1,s2){return el=>{el.innerHTML=`<div class="exh"><div class="k">${k}</div><div class="p"><span>${p1}</span><span>${p2}</span></div><div class="s">${s1}</div><div class="s">${s2}</div></div>`}}
function bq(chip,title,Q){const sm=Q.length>3?'font-size:calc(28px*var(--fs));':'';return el=>{el.innerHTML=`${H(chip,title)}${Q.map((q,i)=>`<div class="bq" style="${sm}margin-top:${i?10:0}px">${q[0]}</div><div class="ans" style="${sm}" data-s="${i+1}"><b>الإجابة:</b> ${q[1]}</div>`).join('')}`}}
function mindmap(core,B){return el=>{const full=!!S.full;S.o=S.o||{};
  el.innerHTML=`<div class="head" style="justify-content:space-between"><div style="display:flex;gap:16px;align-items:center"><span class="chip">تصحيح الخريطة</span><h1 class="t">الخريطة الذهنية للدرس</h1></div><div class="tabs"><button data-f="0" aria-pressed="${!full}">الخريطة فارغة</button><button data-f="1" aria-pressed="${full}">إظهار الحلول</button></div></div>
  <div class="mm"><svg class="ln" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${B.map(b=>`<path d="M50 50 C${(50+b.x)/2} 50 ${(50+b.x)/2} ${b.y} ${b.x} ${b.y}" stroke="${b.c}" fill="none" vector-effect="non-scaling-stroke" style="stroke-width:7px"/>`).join('')}</svg>
  <div class="core">${core}</div>
  ${B.map((b,k)=>`<div class="br" style="--c:${b.c};left:${b.x}%;top:${b.y}%"><div class="bt" data-b="${k}">${b.t}</div><div class="its">${b.i.map((t,j)=>{const on=full||S.o[k+'-'+j];return `<button class="bi ${on?'shown':'blank'}" data-o="${k}-${j}">${on?t:'؟'}</button>`}).join('')}</div></div>`).join('')}</div>`;
  el.onclick=e=>{const f=e.target.closest('[data-f]');if(f){S.full=f.dataset.f==='1';if(!S.full)S.o={};render(true);return}const o=e.target.closest('[data-o]');if(o){S.o[o.dataset.o]=1;render(true);return}const t=e.target.closest('[data-b]');if(t){B[+t.dataset.b].i.forEach((_,j)=>S.o[t.dataset.b+'-'+j]=1);render(true)}}}}
const svgw=(s,mh)=>s.replace('style="width:100%;height:auto"',`style="width:100%;height:auto;max-height:${mh||600}px"`);
