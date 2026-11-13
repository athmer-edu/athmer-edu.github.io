/* ===== رسومات تفاعلية: العلوم البيئية، الوحدة الأولى ===== */
(function(){
if(!window.ENVART)return;
const E=window.ENVART,W=window.WIDGETS;
const bar=cap=>`<div class="w-bar"><span class="w-cap">${cap}</span></div>`;

/* رسم ثابت من ENVART: <div data-widget="efig" data-f="interception" data-cap="..."> */
W.efig=el=>{el.className="widget";const f=el.dataset.f;const o={};if(el.dataset.k!=null)o.k=+el.dataset.k;if(el.dataset.o)try{Object.assign(o,JSON.parse(el.dataset.o))}catch(e){}el.innerHTML=`<div class="ew-fig">${E[f](o)}</div>${el.dataset.cap?bar(el.dataset.cap):""}`};

/* 1-1: ممارسات مستدامة وغير مستدامة */
const SU=[["الصيد الجائر لثور البيسون الأمريكي",0,"أدى إلى فقدان شبه كلي للنوع حتى شارف على الانقراض."],["التخلص من القمامة في الأنهار والمحيطات",0,"يلوّث المياه العذبة والمناطق الساحلية التي توفر الغذاء للإنسان."],["انبعاثات المصانع ومحطات الطاقة",0,"تلوّث الهواء فيصبح ضارًا بالتنفس."],["القطع السريع الجائر للغابات",0,"إزالة الغابات تفقدنا تنقية الماء والهواء والمواطن البيئية."],["إعادة تشجير المناطق المقطوعة",1,"محاولة لإصلاح الضرر الذي سببته إزالة الغابات."],["استخدام طاقة الرياح والطاقة الشمسية",1,"مصدران يمكن توليدهما باستمرار، بدل الفحم والنفط اللذين يستغرق تكوّنهما نحو 300 مليون سنة."],["قطع الأشجار مع خطة لإعادة زراعتها وإدارة معدل قطعها",1,"إدارة الغابات: نستفيد من الخشب ونحمي الغابة."],["الاستخدام المفرط للفحم الحجري والنفط",0,"ستنفد الإمدادات قبل إعادة تكوّنها."]];
W.sust=el=>{el.className="widget";
  el.innerHTML=`<p class="ew-q">لكل ممارسة: هل هي مستدامة أم غير مستدامة؟</p><div class="ew-sust">${SU.map((s,i)=>`<div class="ew-sc" data-i="${i}"><p>${s[0]}</p><div class="ew-b"><button class="btn ghost sm" data-v="1">مستدامة</button><button class="btn ghost sm" data-v="0">غير مستدامة</button></div><div class="ew-why" hidden></div></div>`).join("")}</div><div class="w-bar"><span class="w-cap" id="su-s">أجبتِ عن 0 من ${SU.length}</span></div>`;
  let n=0,ok=0;el.querySelectorAll(".ew-sc").forEach(c=>c.onclick=e=>{const b=e.target.closest("[data-v]");if(!b||c.dataset.done)return;c.dataset.done=1;const s=SU[+c.dataset.i],good=+b.dataset.v===s[1];n++;if(good)ok++;
    c.classList.add(good?"ok":"no");const w=c.querySelector(".ew-why");w.hidden=false;w.innerHTML=`<b>${s[1]?"مستدامة":"غير مستدامة"}:</b> ${s[2]}`;el.querySelector("#su-s").textContent=`أجبتِ عن ${n} من ${SU.length} • الصحيح ${ok}`})};

/* 1-2: دورة الماء التفاعلية */
const WD={evap:"يتحوّل الماء من سائل إلى غاز بامتصاص طاقة الشمس، فتبرد البيئة. تبقى الشوائب (الأملاح والغبار والملوثات) وينتج بخار ماء نقي.",transp:"انتقال الماء عبر النبات وخروجه، أساسًا من ثغور الأوراق (وفي بعض النباتات من الساق) إلى الغلاف الجوي.",cond:"يتحوّل بخار الماء إلى سائل بإطلاق الطاقة فترتفع حرارة المحيط. يحدث عندما يلتقي الهواء الدافئ الرطب بهواء بارد أو يرتفع إلى أعلى، فتتكوّن السحب.",precip:"سقوط الماء المتكثف في السحب على شكل مطر أو ثلج أو برد أو صقيع أو ضباب. الصحاري أقل من 250 mm في السنة، والمناطق الاستوائية المطيرة أكثر من 2000 mm.",interc:"حجب الأمطار بأوراق الأشجار أو المظلة النباتية أو النثار، فلا تصل إلى التربة، ويتبخر الماء في النهاية إلى الغلاف الجوي.",runoff:"الماء الذي لا تعترضه النباتات ولا تمتصه التربة يجري على السطح إلى البحيرات أو الأنهار أو البحر.",ground:"الماء الذي تمتصه التربة يجدّد المياه الجوفية في طبقات المياه الجوفية (صخور منفذة تخزن الماء في مسامها)."};
W.wcycle=el=>{el.className="widget";let quiz=false;const keys=Object.keys(E.WP);
  const draw=()=>{el.querySelector(".ew-fig").innerHTML=E.water(quiz?{letters:{evap:"؟",transp:"؟",cond:"؟",precip:"؟",interc:"؟",runoff:"؟",ground:"؟"}}:{});el.querySelectorAll(".wp").forEach(g=>{g.style.cursor="pointer";g.setAttribute("tabindex","0");g.onclick=g.onkeydown=ev=>{if(ev.type==="keydown"&&ev.key!=="Enter")return;show(g.dataset.p)}})};
  el.innerHTML=`<div class="ew-fig"></div><div class="ew-card" aria-live="polite"><p>اضغطي على اسم أي مرحلة في الرسم لتقرئي وصفها.</p></div><div class="w-bar"><button class="btn ghost sm" id="wq">اختبري نفسكِ: أخفي الأسماء</button><span class="w-cap">الشكل 1-1: دورة الماء. الأسهم تبيّن اتجاه انتقال الماء.</span></div>`;
  const show=k=>{const [n,c]=E.WP[k];el.querySelector(".ew-card").innerHTML=`<h4 style="color:${c}">${n}</h4><p>${WD[k]}</p>`;if(quiz){const t=el.querySelector(`.wp[data-p="${k}"] text`);if(t)t.textContent=n}};
  el.querySelector("#wq").onclick=e=>{quiz=!quiz;e.target.textContent=quiz?"أظهري الأسماء":"اختبري نفسكِ: أخفي الأسماء";draw();el.querySelector(".ew-card").innerHTML=quiz?"<p>سمّي كل مرحلة في ذهنكِ، ثم اضغطي «؟» لتتأكدي.</p>":"<p>اضغطي على اسم أي مرحلة في الرسم لتقرئي وصفها.</p>"};draw()};

/* 1-2: الرطوبة والرياح ومعدل النتح */
W.transp=el=>{el.className="widget";
  el.innerHTML=`<div class="ew-two"><div><label class="ew-rng">الرطوبة: <b id="hv"></b><input type="range" id="hum" min="10" max="95" value="40"></label><label class="ew-rng">الرياح: <select id="wnd"><option value="0">هادئ</option><option value="1">عاصف</option></select></label><div class="ew-meter"><span>معدل النتح والتبخر</span><div><i id="mt"></i></div><b id="mv"></b></div></div><div class="ew-card" id="tx" aria-live="polite"></div></div>${bar("كلما زاد منحدر الرطوبة بين الورقة والهواء زاد معدل النتح.")}`;
  const f=()=>{const h=+el.querySelector("#hum").value,w=+el.querySelector("#wnd").value;const r=Math.max(5,Math.min(100,(100-h)*(w?1.35:1)));el.querySelector("#hv").textContent=h+"%";el.querySelector("#mt").style.width=r+"%";el.querySelector("#mv").textContent=r>66?"مرتفع":r>33?"متوسط":"منخفض";
    el.querySelector("#tx").innerHTML=`<p>${h>65?"<b>الرطوبة مرتفعة:</b> يقل منحدر الرطوبة بين الورقة والهواء، فيتباطأ النتح.":"<b>الرطوبة منخفضة:</b> منحدر الرطوبة كبير، فتنتقل الرطوبة من الورقة إلى الهواء بسرعة."}</p><p>${w?"<b>يوم عاصف:</b> يدفع الهواء الرطوبة بعيدًا عن الورقة، فيزيد منحدر الرطوبة ويزداد النتح.":"<b>هواء هادئ:</b> تتجمع الرطوبة قرب الورقة فيقل المنحدر."}</p>`};
  el.querySelector("#hum").oninput=f;el.querySelector("#wnd").onchange=f;f()};

/* 1-3: مستويات التركيب */
const HL=[["الفرد","أصغر عنصر في تركيب النظام البيئي: ضفدع واحد أو نبات واحد. وكل فرد عضو في نوع."],["الجماعة الأحيائية","مجموعة أفراد من النوع نفسه تعيش في النظام البيئي، مثل جماعة طيور السنونو حتى وهي تهاجر بين نصفي الكرة الأرضية."],["المجتمع الأحيائي","الجماعات الأحيائية المختلفة التي تعيش معًا: أعشاب وأشجار وحشرات وثدييات وطيور."],["النظام البيئي","مجتمع أحيائي يتفاعل مع العوامل غير الحيوية في منطقة أصغر، مثل بركة أو أرض رطبة أو واحة."],["المنطقة الأحيائية","مجموعة نظم بيئية في نطاق جغرافي واسع يحددها المناخ والغطاء النباتي السائد، مثل الغابة الاستوائية المطيرة."]];
W.hier=el=>{el.className="widget";let k=0;const d=()=>{el.querySelector(".ew-fig").innerHTML=E.hierarchy({hl:k});el.querySelectorAll(".hl").forEach(g=>{g.style.cursor="pointer";g.onclick=()=>{k=+g.dataset.l;d()}});el.querySelector(".ew-card").innerHTML=`<h4>${k+1}. ${HL[k][0]}</h4><p>${HL[k][1]}</p>`};
  el.innerHTML=`<div class="ew-fig"></div><div class="ew-card" aria-live="polite"></div>${bar("اضغطي على أي مستوى. التسلسل من الأبسط (الفرد) إلى الأعقد (المنطقة الأحيائية).")}`;d()};

/* 1-3: التفاعلات الحيوية */
const IA=[["ذكر غزال يتنافس مع ذكر غزال آخر للتزاوج مع إناث القطيع","المنافسة داخل النوع"],["الأسود والضباع تفترس النوع نفسه من الظباء","المنافسة بين الأنواع"],["الأسد يقتل الظبي ويأكله","الافتراس"],["آكلات الأعشاب تتغذى على الأعشاب في السافانا","الرعي"],["أسماك الهامور تتنافس على الغذاء","المنافسة داخل النوع"],["الفهد والأسد يصطادان الفريسة نفسها في المنطقة نفسها","المنافسة بين الأنواع"],["القرش يأكل السلحفاة","الافتراس"],["سلحفاة بحرية تتغذى على الطحالب","الرعي"]];
const IT=["المنافسة داخل النوع","المنافسة بين الأنواع","الافتراس","الرعي"];
W.interact=el=>{el.className="widget";let i=0,ok=0;const order=IA.map((_,j)=>j).sort(()=>Math.random()-.5);
  const d=()=>{if(i>=order.length){el.querySelector(".ew-iq").innerHTML=`<h4>انتهيتِ: ${ok} من ${IA.length}</h4><button class="btn sm" id="ag">من جديد</button>`;el.querySelector("#ag").onclick=()=>{i=0;ok=0;d()};return}
    const q=IA[order[i]];el.querySelector(".ew-iq").innerHTML=`<p class="ew-q">${i+1}/${IA.length}: ${q[0]}</p><div class="ew-b">${IT.map(t=>`<button class="btn ghost sm" data-t="${t}">${t}</button>`).join("")}</div><div class="ew-why" hidden></div>`;
    el.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{const good=b.dataset.t===q[1];if(good)ok++;el.querySelectorAll("[data-t]").forEach(x=>{x.disabled=true;if(x.dataset.t===q[1])x.classList.add("ew-ok")});if(!good)b.classList.add("ew-no");const w=el.querySelector(".ew-why");w.hidden=false;w.innerHTML=`${good?"صحيح.":"الإجابة:"} <b>${q[1]}</b> <button class="btn sm" id="nx">التالي</button>`;el.querySelector("#nx").onclick=()=>{i++;d()}})};
  el.innerHTML=`<div class="ew-iq"></div>${bar("حدّدي نوع التفاعل الحيوي في كل مثال.")}`;d()};

/* 1-3: الهرم البيئي وقاعدة 10% */
W.pyr=el=>{el.className="widget";
  el.innerHTML=`<label class="ew-rng">طاقة المنتجات (kJ): <input type="number" id="pe" value="10000" min="10" step="10" style="width:120px"></label><div class="ew-fig"></div><div class="ew-card" aria-live="polite"></div>${bar("الشكل 1-6: ينتقل نحو 10% فقط من الطاقة إلى المستوى التالي، ويُفقد الباقي في الفضلات والتنفس والتكاثر والنمو.")}`;
  const f=()=>{const p=Math.max(10,+el.querySelector("#pe").value||10000);const v=[p,p/10,p/100,p/1000];const fmt=x=>(+x.toFixed(2)).toLocaleString("en-US")+" kJ";
    el.querySelector(".ew-fig").innerHTML=E.pyramid({energy:v.map(fmt)});
    el.querySelector(".ew-card").innerHTML=`<p>المستهلك الأولي يحصل على ${fmt(v[1])}، والثانوي ${fmt(v[2])}، والثالثي ${fmt(v[3])} فقط، أي <b>0.1%</b> من طاقة المنتجات.</p><p>لذلك يتحدد طول السلسلة الغذائية بكمية الطاقة المنتقلة، ونادرًا ما تزيد على أربعة أو خمسة مستويات.</p>`};
  el.querySelector("#pe").oninput=f;f()};

/* 1-3: شبكة غذائية تفاعلية (الشبكة من ملف أسئلة الوحدة) */
const WN={phy:["عوالق نباتية",700,470,"#E3F2E1"],alg:["طحالب",860,470,"#E3F2E1"],zoo:["عوالق حيوانية",420,400],sf:["سمكة صغيرة",640,320],jel:["قنديل البحر",130,300],sq:["حبار",380,230],bf:["سمكة كبيرة",820,190],tur:["سلحفاة",150,120],sh:["قرش",520,60]};
const WE=[["phy","zoo"],["phy","sf"],["alg","sf"],["zoo","sf"],["zoo","jel"],["zoo","tur"],["zoo","sq"],["sf","sq"],["sf","bf"],["sf","sh"],["jel","tur"],["sq","tur"],["sq","sh"],["bf","sh"],["tur","sh"]];
W.fweb=el=>{el.className="widget";
  el.innerHTML=`<div class="ew-fig">${E.web(WN,WE,{h:520,label:"شبكة غذائية في المحيط الأطلسي الشمالي"})}</div><div class="ew-card" aria-live="polite"><p>اضغطي على أي كائن حي لتعرفي ماذا يأكل، ومن يأكله.</p></div>${bar("السهم يشير إلى اتجاه انتقال الطاقة: من الكائن الذي يُؤكل إلى الذي يأكله.")}`;
  const svg=el.querySelector("svg");svg.querySelectorAll(".wn").forEach(g=>{g.style.cursor="pointer";g.onclick=g.onkeydown=ev=>{if(ev.type==="keydown"&&ev.key!=="Enter")return;const k=g.dataset.n;
    const eats=WE.filter(e=>e[1]===k).map(e=>WN[e[0]][0]),eaten=WE.filter(e=>e[0]===k).map(e=>WN[e[1]][0]);
    svg.querySelectorAll(".we").forEach(p=>{const on=p.dataset.a===k||p.dataset.b===k;p.setAttribute("stroke",on?(p.dataset.b===k?"#C8473A":"#2E7DB5"):"#C9D6D2");p.setAttribute("stroke-width",on?5:2)});
    const role=!eats.length?"منتج (يصنع غذاءه بالتمثيل الضوئي)":!eaten.length?"مفترس علوي: لا يتغذى عليه أحد في هذه الشبكة":"مستهلك";
    el.querySelector(".ew-card").innerHTML=`<h4>${WN[k][0]}</h4><p><b>دوره:</b> ${role}.</p>${eats.length?`<p><b style="color:#C8473A">يتغذى على:</b> ${eats.join("، ")}.</p>`:""}${eaten.length?`<p><b style="color:#2E7DB5">يتغذى عليه:</b> ${eaten.join("، ")}.</p>`:""}`}})};

/* 1-3: دورة الكربون */
const CD={photo:["التمثيل الضوئي","تمتص النباتات والعوالق النباتية CO₂ من الهواء، وتحوله باستخدام طاقة الضوء والماء إلى جلوكوز.","6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂"],respP:["تنفّس النباتات","يستخدم النبات الجلوكوز في التنفس فيطلق CO₂ إلى الغلاف الجوي.","C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O"],respA:["تنفّس الحيوانات","تكسر الحيوانات الجلوكوز بالأكسجين وتطلق CO₂ والماء.","C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O"],respD:["تنفّس المحلّلات","البكتيريا والفطريات تتنفس وهي تحلل المادة الميتة فتطلق CO₂.","C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O"],feed:["التغذية","يأكل المستهلك الأولي النبات فينتقل الكربون إلى جسمه، ثم من مستوى غذائي إلى آخر.",""],death:["الموت والفضلات","البول والبراز والأجسام الميتة تحمل الكربون إلى المحلّلات في التربة.",""],decomp:["التحلّل","تتحلل النباتات الميتة ويعود الكربون إلى الغلاف الجوي.",""],fossil:["التحجّر","تعرّض المادة العضوية المدفونة لضغط وحرارة مرتفعَين ملايين السنين يكوّن الفحم والنفط والغاز.",""],comb:["الاحتراق","حرق الوقود الأحفوري يطلق الكربون المخزّن منذ ملايين السنين على شكل CO₂.","CH₄ + 2O₂ → CO₂ + 2H₂O<br>2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O"]};
W.ccycle=el=>{el.className="widget";
  el.innerHTML=`<div class="ew-fig">${E.carbon()}</div><div class="ew-card" aria-live="polite"><p>اضغطي على اسم أي عملية لتقرئي شرحها ومعادلتها.</p></div>${bar("الشكل 1-9: دورة الكربون. معظم الكربون مخزّن في الصخور والرواسب، والأقل في المحيطات والغلاف الجوي والكائنات الحية.")}`;
  el.querySelectorAll(".cp").forEach(g=>{g.style.cursor="pointer";g.setAttribute("tabindex","0");g.onclick=g.onkeydown=ev=>{if(ev.type==="keydown"&&ev.key!=="Enter")return;const c=CD[g.dataset.p];el.querySelector(".ew-card").innerHTML=`<h4 style="color:${E.CP[g.dataset.p][1]}">${c[0]}</h4><p>${c[1]}</p>${c[2]?`<p class="eqline" dir="ltr">${c[2]}</p>`:""}`}})};

/* 1-3: العوامل المحددة للتمثيل الضوئي */
W.limit=el=>{el.className="widget";
  el.innerHTML=`<div class="ew-two"><div><label class="ew-rng">شدة الضوء: <input type="range" id="li" min="0" max="100" value="30"></label><label class="ew-rng">تركيز CO₂: <select id="co"><option value="0">منخفض</option><option value="1">مرتفع</option></select></label><label class="ew-rng">درجة الحرارة: <select id="tp"><option value="0">منخفضة</option><option value="1" selected>مناسبة</option></select></label><label class="ew-rng">الماء: <select id="wa"><option value="1">متوفر</option><option value="0">قليل</option></select></label><div class="ew-meter"><span>معدل التمثيل الضوئي</span><div><i id="rt"></i></div><b id="rv"></b></div></div><div class="ew-card" id="lx" aria-live="polite"></div></div>${bar("الشكل 1-11: إذا كان أي عامل محدودًا أو غائبًا، تتباطأ عملية التمثيل الضوئي أو تتوقف.")}`;
  const f=()=>{const l=+el.querySelector("#li").value/100,co=+el.querySelector("#co").value,tp=+el.querySelector("#tp").value,wa=+el.querySelector("#wa").value;
    const cap=Math.min(co?.95:.55,tp?1:.45,wa?1:.35);const r=Math.min(l*1.6,cap);
    el.querySelector("#rt").style.width=(r*100)+"%";el.querySelector("#rv").textContent=Math.round(r*100)+"%";
    const lim=l*1.6<cap?"شدة الضوء":(!wa&&cap===.35)?"الماء":(!tp&&cap===.45)?"درجة الحرارة":"تركيز ثاني أكسيد الكربون";
    el.querySelector("#lx").innerHTML=`<h4>العامل المحدِّد الآن: ${lim}</h4><p>${lim==="شدة الضوء"?"زيادة شدة الضوء تزيد المعدل بشكل يتناسب معها.":"زيادة شدة الضوء لن ترفع المعدل؛ يجب زيادة "+lim+"."}</p>`};
  el.querySelectorAll("input,select").forEach(x=>x.oninput=x.onchange=f);f()};

/* 1-3: انبعاثات عُمان وتقنيات الحياد الكربوني */
W.oman=el=>{el.className="widget";
  el.innerHTML=`<div class="ew-tabs"><button class="btn sm" data-v="0">الانبعاثات حسب القطاع (2021)</button><button class="btn ghost sm" data-v="1">تقنيات الحياد الكربوني (2050)</button></div><div class="ew-fig"></div><div class="ew-card" aria-live="polite"></div>${bar("المصدر: الشكلان 1-12 و 1-17 في كتاب الطالب (البرنامج الوطني لصافي الانبعاثات الصفري 2023).")}`;
  let v=0;const d=()=>{el.querySelectorAll("[data-v]").forEach(b=>b.className="btn sm"+(+b.dataset.v===v?"":" ghost"));
    if(!v){el.querySelector(".ew-fig").innerHTML=E.omanBars();el.querySelector(".ew-card").innerHTML=`<p>قُدّرت انبعاثات سلطنة عُمان عام 2021 بنحو <b>90 مليون طن</b> مكافئ CO₂، و<b>95%</b> منها من خمسة قطاعات. اضغطي على أي قطاع.</p>`;
      el.querySelectorAll(".sb").forEach(g=>{g.style.cursor="pointer";g.onclick=()=>{const s=E.SECT[+g.dataset.i];el.querySelector(".ew-card").innerHTML=`<h4>${s[0]}</h4><p>${s[1]} مليون طن مكافئ CO₂، أي نحو ${Math.round(s[1]/90*100)}% من انبعاثات السلطنة.</p>`}})}
    else{el.querySelector(".ew-fig").innerHTML=E.techBars();el.querySelector(".ew-card").innerHTML=`<p>لو نجحت التقنيات الست جميعها لانخفضت الانبعاثات بنحو <b>35 + 20 + 15 + 8 + 7 + 6 = 91%</b>. اضغطي على أي تقنية.</p>`;
      el.querySelectorAll(".tb").forEach(g=>{g.style.cursor="pointer";g.onclick=()=>{const t=E.TECH[+g.dataset.i];el.querySelector(".ew-card").innerHTML=`<h4 style="color:${t[2]}">${t[0]}: ${t[1]}%</h4><p>${t[3]}</p>`}})}};
  el.querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>{v=+b.dataset.v;d()});d()};

/* مختبر إثرائي داخل الصفحة: <div data-widget="sim" data-src="..." data-t="..."> */
W.sim=el=>{el.className="sim-box";el.innerHTML=`<div class="sim-head"><b>${el.dataset.t}</b><a href="${el.dataset.src}" target="_blank" rel="noopener">فتح بملء الشاشة</a></div><iframe src="${el.dataset.src}" loading="lazy" title="${el.dataset.t}"></iframe>`};
})();

/* ===== رسومات تفاعلية: العلوم البيئية، الوحدة الثانية (البحوث البيئية وجمع البيانات) ===== */
(function(){
if(!window.ENVART||!window.ENVART.smethod)return;
const E=window.ENVART,W=window.WIDGETS;
const bar=cap=>`<div class="w-bar"><span class="w-cap">${cap}</span></div>`;
const $q=(el,s)=>el.querySelector(s);
const r2=(x,d=3)=>+x.toFixed(d);

/* تصنيف عام: <div data-widget="cls" data-k="qq"> */
const CLS={
 qq:{q:"صنّفي كل مثال: بيانات نوعية أم بيانات كمية؟",c:["نوعية","كمية"],it:[
  ["أطوال جميع الطالبات في صف دراسي واحد",1,"قياسات عددية."],["آراء الناس بخصوص الحلوى الأفضل مذاقًا",0,"آراء وصفية لا تُعد."],
  ["حضور 500 شخص ندوة",1,"عدد."],["دراسة حالة في كتاب مدرسي",0,"وصف."],["إجابات «نعم» و«لا» في استبانة",0,"كلمات (فئات) لا قياس."],
  ["صور فوتوجرافية للحياة البرية",0,"صور = بيانات نوعية."],["متوسط درجة الحرارة اليومية لبلدة على مدى شهر",1,"قياس عددي."],["وصف لدب قطبي",0,"وصف."],
  ["مساحات قاعات التدريس بالمتر المربع",1,"قياس عددي (m²)."],["مذكرات وصفية لعالم عن عمله الميداني",0,"ملاحظات وصفية."]]},
 hyp:{q:"هل هذه العبارة فرضية جيدة؟",c:["فرضية جيدة","ليست فرضية جيدة"],it:[
  ["تناقص هطول الأمطار السنوي يتسبب في موت النباتات في هذه المنطقة.",0,"جملة قصيرة فيها سبب ونتيجة، ويمكن اختبارها."],
  ["لماذا تموت النباتات في هذه المنطقة؟",1,"هذا سؤال، والفرضية لا تكون على شكل سؤال."],
  ["تسرّب مواد سامة لوّث التربة فماتت النباتات.",0,"سبب ونتيجة، ويمكن اختبارها بتحليل التربة."],
  ["النباتات جميلة في فصل الربيع.",1,"رأي لا يتضمن سببًا ونتيجة، ولا يمكن اختباره بتجربة."],
  ["نمو النبات يتحسن عند إضافة الأسمدة السائلة إلى مياه الري.",0,"قابلة للاختبار بمجموعة ضابطة وتجريبية."],
  ["ربما يحدث شيء ما للأسماك بسبب أشياء كثيرة في البحر والهواء والشمس والناس.",1,"غير مختصرة وغير محددة، فلا يمكن اختبارها."]]},
 gtype:{q:"ما التمثيل البياني الأنسب لكل مجموعة بيانات؟",c:["أعمدة أو دائري","خطي","مبعثر"],it:[
  ["عدد كل حيوان (زرافة، فيل، ظبي) في محمية",0,"بيانات ذات فئات."],["درجة الحرارة اليومية في موقعين خلال أسبوعين",1,"بيانات مستمرة تتغير مع الزمن."],
  ["طول الشجرة مقابل قطرها لعشرين شجرة",2,"علاقة بين متغيرين مستمرين."],["عدد صغار البيسون في أربع محميات",0,"فئات (محميات)."],
  ["عدد أسماك السلمون كل عام من 2007 إلى 2016",1,"بيانات مستمرة مع الزمن."],["مستوى الزئبق في التربة مقابل البعد عن المنجم",1,"تغيّر قيمة مع المسافة (الكتاب يطلب تمثيلًا خطيًا)."]]},
 rs:{q:"عشوائية أم منتظمة؟",c:["عشوائية","منتظمة"],it:[
  ["سحب أرقام من حقيبة لتحديد مربعات الشبكة",0,"الاختيار بالقرعة."],["كل ثالث منزل في الجانب الأيسر من الشارع",1,"فاصل منتظم."],
  ["عينة بعد كل خمسة أمتار على النمط الشبكي",1,"مسافات منتظمة."],["إحداثيات ينتجها برنامج حاسوبي",0,"أرقام عشوائية."],
  ["مربع قياسي كل 3 m على مقطع من المد المنخفض إلى المد العالي",1,"مسافات منتظمة على مقطع."],["تقلل تحيز الباحث لأن لكل فرد فرصة متساوية",0,"هذه ميزة العشوائية."]]},
 tech:{q:"اختاري تقنية جمع العينات المناسبة:",c:["المربع القياسي","المصيدة الشراكية","شبكة الاصطياد","الجمع بالركل","ضع علامة-أطلق-أعد الإمساك"],it:[
  ["الأعشاب والحزازيات في حقل",0,"كائنات ثابتة."],["الخنافس النشطة على سطح الأرض ليلًا",1,"حشرات زاحفة على الأرض."],
  ["الحشرات على الأعشاب الطويلة",2,"تُمسح الأعشاب بحركة الرقم 8."],["يرقات اللافقاريات في قاع فلج",3,"مياه جارية ضحلة."],
  ["تقدير حجم جماعة البط في بحيرة",4,"حيوانات متنقلة يصعب عدّها كلها (مؤشر لينكولن)."],["البرنقيل والمحار على شاطئ صخري",0,"كائنات ثابتة."],
  ["الحلازين البطيئة الحركة على الصخور",0,"تتحرك ببطء شديد."],["تقدير عدد أسماك القرش المطرقة حول جزيرة",4,"إمساك ووسم ثم إعادة إمساك."]]}
};
window.CLSDATA=Object.assign(window.CLSDATA||{},CLS);
W.cls=el=>{el.className="widget";const D=window.CLSDATA[el.dataset.k];let n=0;
  el.innerHTML=`<p class="ew-q">${D.q}</p><div class="ew-sust">${D.it.map((s,i)=>`<div class="ew-sc" data-i="${i}"><p>${s[0]}</p><div class="ew-b">${D.c.map((c,j)=>`<button class="btn ghost sm" data-v="${j}">${c}</button>`).join("")}</div><div class="ew-why" hidden></div></div>`).join("")}</div>${bar(`<span class="cls-s">أجبتِ عن 0 من ${D.it.length}</span>`)}`;
  let ok=0;el.querySelectorAll(".ew-sc").forEach(c=>c.onclick=e=>{const b=e.target.closest("button");if(!b||c.dataset.done)return;const it=D.it[+c.dataset.i],good=+b.dataset.v===it[1];c.dataset.done=1;n++;if(good)ok++;c.classList.add(good?"ok":"no");const w=$q(c,".ew-why");w.hidden=false;w.innerHTML=`<b>${good?"صحيح.":"الإجابة: "+D.c[it[1]]+"."}</b> ${it[2]}`;$q(el,".cls-s").textContent=`أجبتِ عن ${n} من ${D.it.length} • الصحيح ${ok}`})};

/* 2-1: حلقة المنهج العلمي */
const SMD=["مراقبة أو مشاهدة تصف مشكلة. غالبًا تكون نوعية في البداية: «النباتات تموت في هذه المنطقة».","سؤال واحد قصير يبدأ بـ: ماذا/لماذا/كيف/هل. مثل: «لماذا تموت النباتات هنا؟»","إجابة محتملة عن «لماذا؟»: جملة مختصرة فيها سبب ونتيجة، قابلة للاختبار. «تناقص هطول الأمطار يسبب موت النباتات».","جملة تبين النتيجة المتوقعة إن كانت الفرضية صحيحة: «النباتات التي تُروى أقل ستذبل أسرع».","تجربة بلا تحيز: متغير مستقل واحد يُغيَّر، ومتغير تابع يُقاس، ومتغيرات ضابطة ثابتة، ومجموعة ضابطة للمقارنة.","تمثيل البيانات بيانيًا، والبحث عن الأنماط والقيم الشاذة: هل تدعم الفرضية أم تدحضها؟","إن دعمت البيانات الفرضية تُقدَّم النتائج، ويمكن إعادة اختبارها لاحقًا. وإن تكرر دعمها كثيرًا قد تصبح نظرية علمية."];
W.smloop=el=>{el.className="widget";let hl=-1,fail=false;
  const draw=()=>{$q(el,".ew-fig").innerHTML=E.smethod({hl,fail});el.querySelectorAll(".smn").forEach(g=>{g.setAttribute("tabindex","0");g.onclick=g.onkeydown=ev=>{if(ev.type==="keydown"&&ev.key!=="Enter")return;hl=+g.dataset.i;fail=false;show()}})};
  const show=()=>{draw();$q(el,".ew-card").innerHTML=fail?`<h4 style="color:#C8473A">الفرضية غير صحيحة: حلقة التغذية الراجعة</h4><p>لا نتوقف! نعود إلى خطوة الفرضية فنقترح <b>فرضية ثانية</b> ونختبرها بتجربة جديدة. لهذا يُسمّى المنهج العلمي <b>حلقة تغذية راجعة</b>: النتائج تعود فتوجّه الخطوة التالية.</p>`:hl<0?`<p>اضغطي على أي خطوة لتقرئي ما يحدث فيها، أو جرّبي زر «الفرضية غير صحيحة».</p>`:`<h4 style="color:${E.SM[hl][1]}">${hl+1}. ${E.SM[hl][0]}</h4><p>${SMD[hl]}</p>`};
  el.innerHTML=`<div class="ew-fig"></div><div class="ew-card" aria-live="polite"></div><div class="w-bar"><button class="btn ghost sm" id="smf">الفرضية غير صحيحة؟</button><button class="btn ghost sm" id="smn">الخطوة التالية ←</button><span class="w-cap">الشكل 2-1: المنهج العلمي حلقة تغذية راجعة.</span></div>`;
  $q(el,"#smf").onclick=()=>{fail=!fail;hl=-1;show()};$q(el,"#smn").onclick=()=>{fail=false;hl=(hl+1)%7;show()};show()};

/* 2-1: تحديد المتغيرات في تجربة */
const VX=[["تأثير الأسمدة على نمو النبات","كمية الأسمدة المستخدمة","معدل نمو النبات","نباتات لم تُزوَّد بالأسمدة","درجة الحرارة، كمية الماء، كمية الضوء، نوع النبات"],
 ["تأثير الملح على ملوحة الماء","كمية الملح المضافة إلى الماء","ملوحة الماء","ماء بدون إضافة ملح","حجم الماء، درجة الحرارة"],
 ["تأثير ضوء الشمس على نمو النبات","كمية ضوء الشمس","معدل النمو أو تدهور حالة النبات","نباتات تتعرض لكمية قياسية من الضوء","كمية الماء، نوع التربة، الرياح، الآفات"],
 ["تأثير pH على فقس بيض الأسماك","مستوى حامضية الماء أو قاعديته (pH)","فقس بيض الأسماك","بيض من النوع نفسه عند pH الطبيعي له","درجة الحرارة، نوع السمك، حجم الماء"],
 ["تأثير تسرب مياه الصرف الصحي على الكائنات المائية","تسرب مياه الصرف الصحي","الكائنات الحية المائية في اتجاه التسرب","عينات من موقع بعيد لم يتأثر بالتسرب","وقت جمع العينات، طريقة الجمع، عمق الماء"],
 ["تأثير درجة حرارة الغرفة على درجات الاختبار","درجة حرارة الغرفة","درجات الطالبات في اختبار الرياضيات","الدرجات عندما تكون حرارة الغرفة معتدلة","راحة الطالبات، الإضاءة، الضوضاء، الزمن المتاح"]];
const VR=[["المتغير المستقل","#2E7DB5"],["المتغير التابع","#3F8A5E"],["المجموعة الضابطة","#D9822B"],["المتغيرات الضابطة","#6A5ACD"]];
W.varid=el=>{el.className="widget";let k=0;
  const draw=()=>{const x=VX[k];const opts=[1,2,3,4].map(j=>[x[j],j-1]).sort(()=>Math.random()-.5);
    $q(el,".vx-body").innerHTML=`<p class="ew-q">التجربة: <b>${x[0]}</b>. ضعي كل عبارة في دورها: اختاري الدور ثم اضغطي العبارة.</p><div class="ew-tabs">${VR.map((r,j)=>`<button class="btn ghost sm vr" data-r="${j}" style="box-shadow:inset 0 0 0 2px ${r[1]}">${r[0]}</button>`).join("")}</div><div class="ew-sust">${opts.map(o=>`<div class="ew-sc vo" data-a="${o[1]}"><p>${o[0]}</p><div class="ew-why" hidden></div></div>`).join("")}</div>`;
    let role=-1;el.querySelectorAll(".vr").forEach(b=>b.onclick=()=>{role=+b.dataset.r;el.querySelectorAll(".vr").forEach(z=>z.style.background="");b.style.background=VR[role][1]+"22"});
    el.querySelectorAll(".vo").forEach(c=>c.onclick=()=>{if(role<0||c.dataset.done){if(role<0)$q(el,".vx-msg").textContent="اختاري الدور أولًا من الأزرار الملوّنة.";return}const a=+c.dataset.a,ok=a===role;const w=$q(c,".ew-why");w.hidden=false;if(ok){c.dataset.done=1;c.classList.add("ok");w.innerHTML=`<b style="color:${VR[a][1]}">${VR[a][0]}</b> ✔`}else{c.classList.add("no");w.innerHTML=`ليس «${VR[role][0]}». حاولي دورًا آخر.`;setTimeout(()=>{c.classList.remove("no");w.hidden=true},1400)}
      const done=el.querySelectorAll(".vo[data-done]").length;$q(el,".vx-msg").textContent=done===4?"أحسنتِ! حدّدتِ الأدوار الأربعة.":`حدّدتِ ${done} من 4.`})};
  el.innerHTML=`<div class="ew-tabs">${VX.map((x,i)=>`<button class="btn ghost sm vt" data-k="${i}">${i+1}</button>`).join("")}</div><div class="vx-body"></div>${bar(`<span class="vx-msg">الجدولان 2-2 و 2-3 من كتاب الطالب.</span>`)}`;
  el.querySelectorAll(".vt").forEach(b=>b.onclick=()=>{k=+b.dataset.k;draw();$q(el,".vx-msg").textContent="حدّدتِ 0 من 4."});draw()};

/* 2-2: محاكاة جمع العينات في حقل */
W.sampfield=el=>{el.className="widget";let mode="rand",kind="point",pts=[],ys=[];const F=E.FIELD;
  const trueA=F.filter(p=>p[2]===0).length,trueB=F.filter(p=>p[2]===1).length;
  const newRand=()=>{pts=[];for(let i=0;i<24;i++){let x;do{x=42+Math.random()*816}while(x>468&&x<532);pts.push([x,42+Math.random()*316])}ys=[0,1,2,3].map(()=>32+Math.random()*336)};
  const est=()=>{let cA=0,cB=0,aA=0,aB=0;
    if(kind==="point"){const P=mode==="sys"?(()=>{const a=[];for(let y=70;y<380;y+=78)for(let x=70;x<880;x+=100)a.push([x,y]);return a})():pts;
      P.forEach(p=>{const n=F.filter(f=>Math.abs(f[0]-p[0])<22&&Math.abs(f[1]-p[1])<22).length;if(p[0]<490){cA+=n;aA++}else{cB+=n;aB++}});
      const sq=44*44,eA=aA?Math.round(cA/aA/sq*(450*360)):0,eB=aB?Math.round(cB/aB/sq*(370*360)):0;return [eA,eB,aA,aB]}
    const Y=mode==="sys"?[80,160,240,320]:ys;Y.forEach(y=>{F.forEach(f=>{if(Math.abs(f[1]-y)<12){if(f[0]<490)cA++;else cB++}})});const band=24*Y.length;return [Math.round(cA/band*360),Math.round(cB/band*360),Y.length,Y.length]};
  const draw=()=>{$q(el,".ew-fig").innerHTML=E.field({mode,kind,pts,ys});const [eA,eB,nA,nB]=est();
    $q(el,".ew-card").innerHTML=`<p>العدد الحقيقي للنبات: المنطقة A = <b>${trueA}</b>، المنطقة B = <b>${trueB}</b></p><p>تقدير العينة: المنطقة A ≈ <b>${eA}</b> (${nA} ${kind==="point"?"مربعات":"مقاطع"})، المنطقة B ≈ <b>${eB}</b> (${nB} ${kind==="point"?"مربعات":"مقاطع"})</p><p class="soft">${mode==="rand"?"اضغطي «عينة عشوائية جديدة» عدة مرات: قد تقع النقاط كلها في الجزء الكثيف أو الفارغ من B، فيُبالغ التقدير أو ينقص.":"العينة المنتظمة تغطي المنطقة كلها بالتساوي، فتُظهر أن النبات في B متجمّع في الأعلى."}</p>`};
  el.innerHTML=`<div class="ew-tabs"><button class="btn ghost sm" data-m="rand">عشوائية</button><button class="btn ghost sm" data-m="sys">منتظمة</button><span style="width:12px"></span><button class="btn ghost sm" data-kd="point">نقطية (مربعات)</button><button class="btn ghost sm" data-kd="line">خطية (مقاطع)</button><span style="width:12px"></span><button class="btn sm" id="sfn">عينة عشوائية جديدة</button></div><div class="ew-fig"></div><div class="ew-card" aria-live="polite"></div>${bar("الشكل 2-6: الاستراتيجية نفسها قد تعطي نتائج مختلفة في المنطقة B.")}`;
  const mark=()=>{el.querySelectorAll("[data-m]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===mode));el.querySelectorAll("[data-kd]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.kd===kind));$q(el,"#sfn").disabled=mode!=="rand"};
  el.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{mode=b.dataset.m;mark();draw()});el.querySelectorAll("[data-kd]").forEach(b=>b.onclick=()=>{kind=b.dataset.kd;mark();draw()});
  $q(el,"#sfn").onclick=()=>{newRand();draw()};newRand();mark();draw()};

/* 2-2: حجم العينة */
W.ssize=el=>{el.className="widget";
  el.innerHTML=`<label class="ew-rng">حجم الجماعة الأحيائية (أو عدد المنازل): <input type="number" id="pn" min="1" max="1000000" value="7200" style="width:140px"></label><div class="ew-card" aria-live="polite"></div>${bar("القاعدة: الحد الأدنى 100، والحد الأقصى 10% من الجماعة بشرط ألا يتجاوز 1000، وإن كانت الجماعة أقل من 100 نشمل الجميع.")}`;
  const f=()=>{const N=Math.max(1,Math.round(+$q(el,"#pn").value||1));let h;
    if(N<100)h=`<h4>نشمل الجميع: ${N}</h4><p>الجماعة أقل من 100، فيجب تضمين جميع الأفراد أو نقاط جمع العينة في المسح.</p>`;
    else{const t=Math.round(N*.1),mx=Math.min(t,1000);h=`<h4>الحد الأقصى = ${mx}</h4><p>10% من ${N} = <b>${t}</b>${t>1000?" وهو أكبر من 1000، فالحد الأقصى <b>1000</b>":""}.</p><p>الحد الأدنى الذي يعطي نتائج ذات معنى: <b>${Math.min(100,N)}</b>.</p>`}
    $q(el,".ew-card").innerHTML=h};$q(el,"#pn").oninput=f;f()};

/* 2-2: مؤشر لينكولن */
W.lincoln=el=>{el.className="widget";
  el.innerHTML=`<div class="ew-two"><div><label class="ew-rng">n₁ (أُمسكت ووُسمت أولًا): <b id="v1"></b><input type="range" id="n1" min="5" max="300" value="200"></label><label class="ew-rng">n₂ (أُمسكت في العينة الثانية): <b id="v2"></b><input type="range" id="n2" min="5" max="300" value="200"></label><label class="ew-rng">m₂ (الموسومة بينها): <b id="v3"></b><input type="range" id="m2" min="1" max="100" value="20"></label>
  <div class="ew-b"><button class="btn ghost sm" data-p="200,200,20">البط (المثال 1)</button><button class="btn ghost sm" data-p="22,14,2">نسور السمك</button><button class="btn ghost sm" data-p="25,40,10">القواقع السوداء</button><button class="btn ghost sm" data-p="20,10,5">القرش المطرقة</button></div></div><div class="ew-card" aria-live="polite"></div></div>${bar("N = (n₁ × n₂) ÷ m₂ • يُعطى الجواب عددًا صحيحًا لأنه لا يوجد «جزء من كائن حي».")}`;
  const f=()=>{const a=+$q(el,"#n1").value,b=+$q(el,"#n2").value;const m=Math.min(+$q(el,"#m2").value,b);$q(el,"#m2").value=m;$q(el,"#v1").textContent=a;$q(el,"#v2").textContent=b;$q(el,"#v3").textContent=m;
    $q(el,".ew-card").innerHTML=`<p style="direction:ltr;text-align:center;font-size:20px;font-family:var(--display)">N = (${a} × ${b}) ÷ ${m} = ${a*b} ÷ ${m} = <b>${Math.round(a*b/m)}</b></p><p>حجم الجماعة الأحيائية التقديري ≈ <b>${Math.round(a*b/m)}</b> فردًا.</p><p class="soft">لاحظي: كلما قلّ عدد الموسومة المعاد إمساكها (m₂) كان التقدير أكبر، لأن الموسومة «ضاعت» بين أفراد كثيرين.</p>`};
  ["#n1","#n2","#m2"].forEach(s=>$q(el,s).oninput=f);el.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{const p=b.dataset.p.split(",");$q(el,"#n1").value=p[0];$q(el,"#n2").value=p[1];$q(el,"#m2").value=p[2];f()});f()};

/* 2-2: مؤشر سيمبسون: جدول قابل للتعديل */
const SP={"المثال 2":[["أ",5],["ب",8],["ج",2],["د",7],["هـ",3]],"أسماك النهر":[["السلمون المرقط",83],["الباس",65],["الكارب",110],["السلور",9]],"الشاطئ A":[["محار",320],["حلزون بحري",335],["برنقيل",345]],"الشاطئ B":[["محار",20],["حلزون بحري",39],["برنقيل",941]],"معدة الفقمة":[["سرطان البحر",73],["المحار",55],["الحلزون",47],["مزدوجات الأرجل",32],["كريل",18]]};
W.simpson=el=>{el.className="widget";let rows=SP["المثال 2"].map(r=>r.slice());
  el.innerHTML=`<div class="ew-tabs">${Object.keys(SP).map(k=>`<button class="btn ghost sm" data-s="${k}">${k}</button>`).join("")}</div><div class="sp-t"></div><div class="ew-fig sp-f"></div>${bar("D = 1 − Σ(n/N)² • غيّري الأعداد ولاحظي: التنوع يكبر عندما تتقارب أعداد الأنواع.")}`;
  const draw=()=>{const N=rows.reduce((s,r)=>s+(+r[1]||0),0);let S=0;
    const tr=rows.map((r,i)=>{const p=N?(+r[1]||0)/N:0;S+=p*p;return `<tr><td>${r[0]}</td><td><input type="number" min="0" value="${r[1]}" data-i="${i}" style="width:80px"></td><td>${r2(p)}</td><td>${r2(p*p,4)}</td></tr>`}).join("");
    const D=r2(1-S,2);
    $q(el,".sp-t").innerHTML=`<div class="tbl-wrap"><table class="ew-tbl"><thead><tr><th>النوع</th><th>العدد n</th><th>n/N</th><th>(n/N)²</th></tr></thead><tbody>${tr}</tbody><tfoot><tr><td>المجموع</td><td>N = ${N}</td><td></td><td>Σ = ${r2(S,3)}</td></tr></tfoot></table></div><p style="direction:ltr;text-align:center;font-family:var(--display);font-size:20px">D = 1 − ${r2(S,3)} = <b>${D}</b></p><p class="soft">الحساب هنا بلا تقريب؛ الكتاب يقرّب كل قيمة فيحصل على مجموع مختلف قليلًا (0.236 بدل 0.242 في المثال 2)، والجواب النهائي نفسه.</p><p>${D>=.6?"تنوع بيولوجي <b>كبير</b>":D>=.3?"تنوع <b>متوسط</b>":"تنوع <b>منخفض</b>: نوع واحد يسود العينة"}. معنى D = ${D}: لو اخترتِ فردين عشوائيًا فاحتمال أن يكونا من نوعين مختلفين ≈ ${Math.round(D*100)}%.</p>`;
    $q(el,".sp-f").innerHTML=E.simpsonScale({v:D});
    el.querySelectorAll(".sp-t input").forEach(inp=>inp.onchange=()=>{rows[+inp.dataset.i][1]=Math.max(0,+inp.value||0);draw()})};
  el.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{rows=SP[b.dataset.s].map(r=>r.slice());draw()});draw()};

/* 2-2: المربع الشبكي: النسبة المئوية للتغطية و ACFOR */
W.gridq=el=>{el.className="widget";let on=new Set();
  const seed=()=>{on=new Set();for(let r=0;r<10;r++)for(let c=0;c<10;c++){const d=Math.hypot(r-3.5,c-6);if(d<3.2+Math.random()*.8)on.add(r*10+c)}};
  const letter=p=>p>80?["A","وفيرة جدًا"]:p>60?["C","شائعة"]:p>40?["F","متكررة"]:p>20?["O","عرضية"]:p>0?["R","نادرة"]:["N","غير موجودة"];
  el.innerHTML=`<div class="ew-two"><div><p class="ew-q">اضغطي المربعات الصغيرة التي يشغل النبات <b>نصفها على الأقل</b>.</p><div class="gq" role="grid" aria-label="مربع قياسي شبكي 10 × 10">${Array.from({length:100},(_,i)=>`<button class="gq-c" data-i="${i}" aria-label="مربع ${i+1}"></button>`).join("")}</div><div class="ew-b" style="margin-top:8px"><button class="btn ghost sm" id="gqr">نبات جديد</button><button class="btn ghost sm" id="gqc">مسح</button></div></div><div class="ew-card" aria-live="polite"></div></div>${bar("النسبة المئوية للتغطية = (عدد المربعات المغطاة ÷ العدد الكلي) × 100")}`;
  const draw=()=>{el.querySelectorAll(".gq-c").forEach(b=>b.classList.toggle("on",on.has(+b.dataset.i)));const p=on.size;const L=letter(p);
    $q(el,".ew-card").innerHTML=`<p style="direction:ltr;text-align:center;font-family:var(--display);font-size:20px">(${p} ÷ 100) × 100 = <b>${p}%</b></p><h4>مقياس ACFOR: ${L[0]} (${L[1]})</h4><p class="soft">A أكبر من 80% • C من 61 إلى 80% • F من 41 إلى 60% • O من 21 إلى 40% • R من 1 إلى 20% • N تساوي 0%</p><p>العدّ بالشبكة يقلل تحيز الباحث مقارنة بالتقدير بالعين في المربع المفتوح.</p>`};
  el.querySelectorAll(".gq-c").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;on.has(i)?on.delete(i):on.add(i);draw()});
  $q(el,"#gqr").onclick=()=>{seed();draw()};$q(el,"#gqc").onclick=()=>{on=new Set();draw()};seed();draw()};

/* 2-2: النسبة المئوية للتكرار */
W.freq=el=>{el.className="widget";
  el.innerHTML=`<div class="ew-two"><div><label class="ew-rng">عدد المربعات التي وُجد فيها النوع: <b id="fv1"></b><input type="range" id="f1" min="0" max="50" value="6"></label><label class="ew-rng">العدد الكلي للمربعات: <b id="fv2"></b><input type="range" id="f2" min="1" max="50" value="30"></label><div class="ew-b"><button class="btn ghost sm" data-p="6,30">القرع مع الدجاج</button><button class="btn ghost sm" data-p="20,30">القرع بلا دجاج</button><button class="btn ghost sm" data-p="27,35">مرجان ميت مع نجم البحر</button><button class="btn ghost sm" data-p="2,35">مرجان ميت بلا نجم البحر</button></div></div><div class="ew-card" aria-live="polite"></div></div>${bar("النسبة المئوية للتكرار = (عدد المربعات التي يوجد فيها النوع ÷ عدد المربعات الكلي) × 100")}`;
  const f=()=>{const t=+$q(el,"#f2").value,a=Math.min(+$q(el,"#f1").value,t);$q(el,"#f1").value=a;$q(el,"#fv1").textContent=a;$q(el,"#fv2").textContent=t;const p=Math.round(a/t*100);
    $q(el,".ew-card").innerHTML=`<p style="direction:ltr;text-align:center;font-family:var(--display);font-size:20px">(${a} ÷ ${t}) × 100 = <b>${p}%</b></p><div class="ew-meter"><div><i style="width:${p}%"></i></div></div><p>احتمال وجود النوع في مربع قياسي واحد من منطقة العينة ≈ <b>${p}%</b>.</p>`};
  ["#f1","#f2"].forEach(s=>$q(el,s).oninput=f);el.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{const p=b.dataset.p.split(",");$q(el,"#f2").value=p[1];$q(el,"#f1").value=p[0];f()});f()};

/* 2-2: بطاقات التقنيات: الطريقة والفوائد والمحددات */
const TQ=[["المربع القياسي","quadrats","الأنواع الثابتة أو البطيئة جدًا: النباتات، البرنقيل، الحلازين.","يوضع الإطار عند كل إحداثية (عشوائية) أو على طول المقطع كل مسافة ثابتة (منتظمة)، ويُعد أفراد كل نوع أو تُقدّر التغطية.",["سهل وسريع وغير مكلف."],["التقدير قد يؤدي إلى التحيز والحسابات الخاطئة فبيانات غير موثوقة.","الشبكي يحتاج معرفة كافية لتمييز الأنواع المتشابهة."]],
 ["المصيدة الشراكية","pitfall","الحشرات النشطة على سطح الأرض.","كوب يُدفن وحافته مستوية مع الأرض، قرب الغطاء النباتي، ويُترك طوال الليل (أو يُفحص كل بضع ساعات نهارًا)، ثم يُفرغ في صينية وتُحدد الحشرات وتُطلق.",["سهلة وغير مكلفة في الإعداد.","يمكن تركها مدة طويلة لزيادة فرصة جمع العينات."],["قد تأكل المفترسة الحشرات الأخرى (لذا تُضاف مادة مضادة للتجمد).","التعرف على الحشرات يتطلب تدريبًا ومهارة.","زيارة المواقع تستغرق وقتًا فيكون عدد المواقع محدودًا.","قد تمتلئ بالماء فتغرق الحشرات أو تُجرف.","الحشرات الطائرة تهرب.","لا تناسب المناطق الحضرية ذات الأسطح الصلبة."]],
 ["شباك اصطياد الحشرات","sweep","الحشرات واللافقاريات على الأعشاب الطويلة.","تُحرّك الشبكة فوق النباتات بحركة الرقم 8 أو بحركة بندولية بينها، موازية للأرض، ثم تُغلق حتى لا تهرب الحشرات وتُفرغ في صينية.",["غير مكلفة وسهلة.","لا تتطلب وقتًا طويلًا ولا مهارة، ويستطيع المتطوعون المساعدة."],["الغطاء النباتي الكثيف لا يصلح لها.","ليست كل الحشرات سهلة الصيد فقد لا تمثل العينة كل الأنواع.","قد تتلف النباتات."]],
 ["الجمع بالركل","kick","اللافقاريات في قاع نهر أو وادٍ أو فلج.","تُمسك شبكة دقيقة المسامات في اتجاه المجرى، ويُركل القاع مدة محددة فتنجرف الكائنات إلى الشبكة. تُجمع أولًا من أدنى نقطة ثم صعودًا.",["سريع التنفيذ وفعّال من حيث التكلفة."],["قد تُفقد الأنواع الصغيرة إذا كانت فتحات الشبكة كبيرة.","تُفقد الأنواع الملتصقة بالصخور.","صعب في المياه الكثيرة الطمي."]],
 ["ضع علامة - أطلق - أعد الإمساك","mrr","تقدير حجم جماعة حيوانات متنقلة لا يمكن إمساكها كلها (مؤشر لينكولن).","اصطياد مباشر، ثم علامة لا تؤذي (طلاء مضاد للماء، حلقة ملونة، علامة راديو RFID)، وتسجيل البيانات والإطلاق. بعد فترة مناسبة يُعاد الإمساك ويُعد الموسوم وغير الموسوم.",["أدنى حد من الأذى للكائنات.","يمكن تنفيذها في المواقع النائية وإعادة زيارة النقطة نفسها لاحقًا."],["الإمساك أو العلامة قد يقللان فرص نجاة الكائن.","قد لا تُرى العلامة بسهولة.","قد يتعلم الكائن تحاشي المصائد.","يجب فحص المصائد بانتظام حتى لا تتأذى الكائنات."]]];
W.techs=el=>{el.className="widget";let k=0;
  const draw=()=>{const t=TQ[k];el.querySelectorAll("[data-t]").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.t===k));
    $q(el,".tq-b").innerHTML=`<div class="ew-two"><div class="ew-fig">${E[t[1]]()}</div><div><h4 style="font-family:var(--display);margin:0 0 6px">${t[0]}</h4><p><b>لجمع:</b> ${t[2]}</p><p><b>الطريقة:</b> ${t[3]}</p></div></div><div class="ew-two" style="margin-top:10px"><div class="ew-card" style="background:color-mix(in srgb,#3F8A5E 10%,transparent)"><h4>الفوائد</h4><ul>${t[4].map(x=>`<li>${x}</li>`).join("")}</ul></div><div class="ew-card" style="background:color-mix(in srgb,#C8473A 9%,transparent)"><h4 style="color:#B03A2E">المحددات</h4><ul>${t[5].map(x=>`<li>${x}</li>`).join("")}</ul></div></div>`};
  el.innerHTML=`<div class="ew-tabs">${TQ.map((t,i)=>`<button class="btn ghost sm" data-t="${i}">${t[0]}</button>`).join("")}</div><div class="tq-b"></div>${bar("الجدول 2-5 والصفحات 62-67 من كتاب الطالب.")}`;
  el.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{k=+b.dataset.t;draw()});draw()};
})();

/* ===== رسومات تفاعلية: العلوم البيئية، الوحدة الثالثة (التفاعلات في النظم البيئية البحرية) ===== */
(function(){
if(!window.ENVART||!window.ENVART.symb)return;
const E=window.ENVART,W=window.WIDGETS;
const bar=cap=>`<div class="w-bar"><span class="w-cap">${cap}</span></div>`;
const $q=(el,s)=>el.querySelector(s);
Object.assign(window.CLSDATA=window.CLSDATA||{},{
 rel:{q:"ما نوع العلاقة التكافلية؟",c:["تطفل","تعايش","تبادل"],it:[
  ["قمل البحر يتغذى على مخاط السلمون وأنسجته ودمه",0,"المتكافل يستفيد والعائل يتضرر."],["الريمورا تلتصق بشيطان البحر لتنتقل دون استهلاك طاقة",1,"الريمورا تستفيد وشيطان البحر لا يتأثر (رَحَلان)."],
  ["سرطان البحر الملاكم يمسك شقائق النعمان للدفاع، وتلتقط هي بقايا طعامه",2,"كلاهما يستفيد."],["الريمورا تأكل الطفيليات عن جلد شيطان البحر",2,"هنا تصبح العلاقة تبادلية: كلاهما يستفيد."],
  ["دودة شريطية تعيش داخل أمعاء سمكة",0,"طفيل داخلي يتضرر منه العائل."],["الرَّحَلان: كائن يلتصق بآخر للانتقال فقط",1,"نوع من التعايش."]]},
 troph:{q:"ما نوع التغذية؟",c:["آكل أعشاب","قارت","آكل لحوم"],it:[
  ["سمكة الببغاء تتغذى على الطحالب في الشعاب",0,"تتغذى على منتجات."],["سرطان بحر يأكل الطحالب وصغار الأسماك",1,"نباتات وحيوانات."],["الفقمة تصطاد الحبار والأسماك",2,"تتغذى على حيوانات."],
  ["مجدافيات الأرجل غير الطفيلية تأكل الدياتومات",0,"عوالق حيوانية آكلة أعشاب."],["الكريل يأكل عوالق نباتية وحيوانية",1,"قارت."],["القرش يفترس الأسماك",2,"مفترس آكل لحوم."]]},
 auto:{q:"تمثيل ضوئي أم تمثيل كيميائي؟",c:["تمثيل ضوئي","تمثيل كيميائي"],it:[
  ["العوالق النباتية في الطبقة السطحية",0,"تستخدم ضوء الشمس."],["بكتيريا عند الفوهات المائية الحرارية",1,"تستخدم كبريتيد الهيدروجين."],["طحلب الكلب وحشائش البحر",0,"ذاتية التغذية الضوئية."],
  ["يحدث على عمق 2000 m إلى 7700 m",1,"لا يصل الضوء."],["يحدث فقط في أعلى 200 m تقريبًا",0,"المنطقة الضوئية."],["الكائنات المحبة للظروف القاسية تبدأ سلسلتها الغذائية",1,"ضغط عالٍ وحرارة حتى 400°C."]]},
 pyr:{q:"أي هرم؟",c:["الأعداد","الكتلة الحيوية","الطاقة"],it:[
  ["لا يمكن أن يكون مقلوبًا أبدًا",2,"يقيس معدل الإنتاج على مدار سنة."],["يكون مقلوبًا إذا تغذت طفيليات كثيرة على سمكة كبيرة",0,"لا يراعي حجم الكائنات."],
  ["يكون مقلوبًا بسبب المحصول القائم للعوالق النباتية",1,"تؤكل بسرعة لكنها تتكاثر بسرعة."],["وحدته kJ m⁻² year⁻¹",2,"طاقة على مدار سنة."],["يُفضّل فيه استخدام الكتلة الجافة",1,"الماء لا يُسهم في الكتلة الحيوية."],["الأصعب في إنتاجه والأكثر فائدة لفهم النظام البيئي",2,"بيانات على مدى سنة."]]},
 phase:{q:"الطور الحيوي أم غير الحيوي؟",c:["الطور الحيوي","الطور غير الحيوي"],it:[
  ["الجلوكوز في خلايا العوالق النباتية",0,"مركب عضوي داخل كائن حي."],["أيونات النترات الذائبة في ماء البحر",1,"أيون غير عضوي."],["CO₂ في الغلاف الجوي",1,"غاز غير عضوي."],
  ["البروتينات في عضلات سمكة",0,"مركب عضوي."],["رواسب قاع المحيط",1,"تتحول إلى صخور."],["الدهون في جسم فقمة",0,"مركب عضوي."]]},
 nform:{q:"صنّفي المغذي:",c:["غاز","أيون غير عضوي","مركب عضوي"],it:[
  ["CO₂",0,"غاز."],["Mg²⁺",1,"أيون."],["NO₃⁻",1,"أيون النترات."],["PO₄³⁻",1,"أيون الفوسفات."],["CO₃²⁻",1,"أيون الكربونات."],["الكربوهيدرات",2,"مركب عضوي."],["البروتينات",2,"مركب عضوي."],["N₂",0,"غاز."]]},
 elem:{q:"أي عنصر يُستخدم في…؟",c:["النيتروجين","الكربون","المغنيسيوم","الكالسيوم","الفوسفور"],it:[
  ["تكوين الكلوروفيل",2,"Mg في مركز جزيء الكلوروفيل."],["تكوين البروتينات وDNA",0,"الأحماض الأمينية تحوي N."],["تكوين العظام والأصداف والهياكل المرجانية",3,"كربونات الكالسيوم."],
  ["تكوين DNA والعظام",4,"الفوسفات."],["تكوين كافة المركبات العضوية",1,"هيكل كل جزيء عضوي."]]},
 proc:{q:"هل تجدد العملية مخزون المغذيات السطحي أم تستنفده؟",c:["تجدد المخزون","تستنفد المخزون"],it:[
  ["التيارات الصاعدة للمياه",0,"مياه عميقة غنية بالمغذيات."],["امتصاص المنتجات للمغذيات",1,"الطريقة الرئيسية للإزالة."],["الجريان السطحي من اليابسة",0,"يحمل مغذيات التربة."],
  ["الحصاد (صيد الأسماك وجمع الطحالب)",1,"يزيل المغذيات من المحيط."],["ذوبان CO₂ وN₂ في الماء",0,"من الغلاف الجوي."],["سقوط الثلج البحري إلى الأعماق",1,"ينقل المادة العضوية بعيدًا عن السطح."],["الرماد البركاني يسقط في البحر",0,"نشاط تكتوني يضيف أيونات."],["التيار الهابط للمياه",1,"يزيل المغذيات من السطح."]]}
});

/* 3-1: جدول تأثير العلاقات (+ − 0) */
const SY=[["التبادلية","+","+"],["التطفلية","−","+"],["التعايشية","0","+"]];
W.symbio=el=>{el.className="widget";
  el.innerHTML=`<p class="ew-q">اختاري التأثير على العائل وعلى المتكافل (+ يستفيد، − يتضرر، 0 لا يتأثر)، ثم اضغطي «تحقّقي».</p><div class="tbl-wrap"><table class="ew-tbl"><thead><tr><th>العلاقة</th><th>العائل</th><th>المتكافل</th></tr></thead><tbody>${SY.map((r,i)=>`<tr><td><b>${r[0]}</b></td>${[1,2].map(j=>`<td><select data-i="${i}" data-j="${j}" aria-label="${r[0]} ${j===1?"العائل":"المتكافل"}"><option value="">؟</option><option>+</option><option>−</option><option>0</option></select></td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="ew-b" style="margin:8px 0"><button class="btn sm" id="syc">تحقّقي</button><button class="btn ghost sm" id="sys">إظهار الحل</button></div><div class="ew-fig">${E.symb()}</div>${bar("الجدول 3-1 من كتاب الطالب • الإجابة من دليل المعلم.")}`;
  const chk=show=>{let ok=0;el.querySelectorAll("select").forEach(s=>{const a=SY[+s.dataset.i][+s.dataset.j];if(show)s.value=a;const g=s.value===a;if(g)ok++;s.style.outline=s.value?`3px solid ${g?"#3F8A5E":"#C8473A"}`:""});return ok};
  $q(el,"#syc").onclick=()=>{const k=chk(false);$q(el,"#syc").textContent=`تحقّقي (${k} من 6)`};$q(el,"#sys").onclick=()=>chk(true)};

/* 3-2: طبقات المحيط */
const ZD=[["المنطقة الضوئية (0-200 m)","يصلها ضوء الشمس فيحدث التمثيل الضوئي، وفيها نحو 90% من الحياة البحرية ومعظم الكتلة الحيوية."],["المنحدر الحراري (تدرّج الكثافة)","منطقة انتقالية بين ماء سطحي دافئ أقل كثافة وماء بارد أكثر كثافة؛ تقلل اختلاط الطبقتين. وأعلى إنتاجية عادة قربه: توازن الضوء والحرارة والمغذيات."],["المياه العميقة","لا ضوء فلا تمثيل ضوئي، لكنها غنية بالمغذيات (بقايا الكائنات الغارقة). وعند الفوهات الحرارية يحدث التمثيل الكيميائي."]];
W.zones=el=>{el.className="widget";let k=0;
  const draw=()=>{$q(el,".ew-fig").innerHTML=E.oceanZones({hl:k});$q(el,".ew-card").innerHTML=`<h4>${ZD[k][0]}</h4><p>${ZD[k][1]}</p>`;el.querySelectorAll("[data-z]").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.z===k))};
  el.innerHTML=`<div class="ew-tabs">${ZD.map((z,i)=>`<button class="btn ghost sm" data-z="${i}">${z[0].split(" (")[0]}</button>`).join("")}</div><div class="ew-fig"></div><div class="ew-card" aria-live="polite"></div>${bar("الشكل 3-1: طبقات الماء في المحيط.")}`;
  el.querySelectorAll("[data-z]").forEach(b=>b.onclick=()=>{k=+b.dataset.z;draw()});draw()};

/* 3-2: باني الأهرامات */
const PY={"عام (طاقة)":{t:"الطاقة",L:[["المنتجات",100],["مستهلكات أولية",10],["مستهلكات ثانوية",1],["مستهلكات ثالثية",0.1]]},"سؤال 2 (أ)":{t:"الطاقة",L:[["العوالق النباتية",8000],["العوالق الحيوانية",912],["الأسماك",86]]},"ساحل كاليفورنيا":{t:"الأعداد",L:[["العوالق النباتية",809],["العوالق الحيوانية",37],["الرنجة",11],["الماكريل",1]]},"طفيليات على سمكة":{t:"الأعداد",L:[["عوالق نباتية",5000],["عوالق حيوانية",800],["كريل",120],["سلمون",1],["قمل البحر",400]]},"محصول قائم":{t:"الكتلة الحيوية",L:[["عوالق نباتية",21],["عوالق حيوانية",30]]},"السلسلة (الشكل 3-16)":{t:"الطاقة",L:[["عوالق نباتية",5000],["عوالق حيوانية",589],["سردين",61],["أسماك التونة",4]]}};
W.pyrbuild=el=>{el.className="widget";let cur=JSON.parse(JSON.stringify(PY["عام (طاقة)"]));
  const draw=()=>{const L=cur.L;$q(el,".pb-fig").innerHTML=E.pyramid({levels:L,lab:"هرم "+cur.t,log:true,title:"هرم "+cur.t+" (رسم تقريبي)"});
    const inv=L.some((l,i)=>i&&l[1]>L[i-1][1]);
    $q(el,".pb-in").innerHTML=L.map((l,i)=>`<label class="ew-rng" style="display:flex;gap:8px;align-items:center"><span style="min-width:130px">${l[0]}</span><input type="number" min="0" step="any" value="${l[1]}" data-i="${i}" style="width:110px"></label>`).join("");
    el.querySelectorAll(".pb-in input").forEach(inp=>inp.onchange=()=>{cur.L[+inp.dataset.i][1]=Math.max(0,+inp.value||0);draw()});
    const tr=cur.t==="الطاقة"?L.slice(1).map((l,i)=>`${L[i][0]} ← ${l[0]}: <b dir="ltr">${(l[1]/L[i][1]*100).toFixed(1)}%</b>`).join("<br>"):"";
    $q(el,".ew-card").innerHTML=`${inv?`<p><b style="color:#C8473A">هرم غير منتظم/مقلوب:</b> ${cur.t==="الأعداد"?"لا يراعي حجم الكائنات (كائن كبير واحد أو طفيليات كثيرة)، أو قيست الأعداد بعد أن أُكلت العوالق.":cur.t==="الكتلة الحيوية"?"المحصول القائم للعوالق النباتية صغير لأنها تؤكل بسرعة، لكنها تتكاثر بسرعة.":"هرم الطاقة لا يكون مقلوبًا أبدًا: راجعي الأرقام."}</p>`:`<p>هرم منتظم: كل مستوى أصغر من الذي تحته.</p>`}${tr?`<p><b>كفاءة الانتقال</b> (الطاقة في المستوى ÷ الطاقة في السابق × 100):<br>${tr}</p>`:""}<p class="soft">الأشرطة مرسومة تقريبيًا (مقياس لوغاريتمي) لأن الفروق كبيرة جدًا.</p>`};
  el.innerHTML=`<div class="ew-tabs">${Object.keys(PY).map(k=>`<button class="btn ghost sm" data-p="${k}">${k}</button>`).join("")}</div><div class="ew-two"><div><div class="pb-in"></div></div><div class="ew-fig pb-fig"></div></div><div class="ew-card" aria-live="polite"></div>${bar("غيّري الأرقام ولاحظي شكل الهرم وكفاءة الانتقال.")}`;
  el.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{cur=JSON.parse(JSON.stringify(PY[b.dataset.p]));draw()});draw()};

/* 3-2: ازدهار الطحالب */
W.bloom=el=>{el.className="widget";
  el.innerHTML=`<label class="ew-rng">كمية المغذيات الداخلة (نترات وفوسفات): <b id="bv"></b><input type="range" id="bn" min="0" max="100" value="30"></label><div class="ew-card" aria-live="polite"></div>${bar("ازدهار الطحالب: زيادة سريعة في أعداد العوالق النباتية والطحالب (حتى 5 ملايين خلية لكل لتر).")}`;
  const f=()=>{const n=+$q(el,"#bn").value;$q(el,"#bv").textContent=n<20?"قليلة":n<55?"معتدلة":n<75?"كثيرة":"مفرطة";
    const phy=Math.min(100,15+n*1.1),ox=n<55?90-n*.2:Math.max(5,90-(n-50)*1.7),fish=n<20?30+n*1.5:n<55?60+(n-20)*.6:Math.max(3,80-(n-55)*1.9);
    const row=(t,v,c)=>`<div style="display:flex;gap:8px;align-items:center;margin:4px 0"><span style="min-width:150px">${t}</span><div class="ew-meter" style="flex:1"><div><i style="width:${v}%;background:${c}"></i></div></div></div>`;
    $q(el,".ew-card").innerHTML=row("العوالق النباتية",phy,"#3F8A5E")+row("الأكسجين المذاب",ox,"#2E7DB5")+row("الأسماك والمستهلكات",fish,"#D9822B")+`<p>${n<20?"مغذيات قليلة: الإنتاجية محدودة، فالمغذيات عامل محدد.":n<55?"مغذيات معتدلة: إنتاجية أعلى، فتدعم مستهلكات أكثر وسلاسل غذائية أطول.":"ازدهار الطحالب: تسد الخياشيم، ثم تموت فتحللها البكتيريا التي تستهلك الأكسجين المذاب في تنفسها، فتموت المستهلكات. وإن كانت سامة تسمم الدلافين والحيتان والإنسان. (منطقة بحرية ميتة)"}</p>`};
  $q(el,"#bn").oninput=f;f()};

/* 3-2: حسابات تدفق الطاقة */
const EF=[["الشكل 3-7: X (تنفس المستهلكات الثانوية)","in",598,[67],"X = 598 − 67 = 531"],["الشكل 3-7: Y (تنفس المستهلكات الأولية)","in",6421,[598,2389],"Y = 6421 − 598 − 2389 = 3434 (الخارج: 598 إلى المستهلكات الثانوية + 2389 إلى المحللات + Y)"],["الشمس ← المنتجات","pct",1600000,72567,"(72567 ÷ 1.6×10⁶) × 100 = 4.54%"],["المنتجات ← المستهلكات الأولية","pct",72567,6421,"(6421 ÷ 72567) × 100 = 8.85%"],["العوالق الحيوانية ← الأسماك","pct",912,86,"(86 ÷ 912) × 100 = 9.4%"],["العوالق النباتية ← العوالق الحيوانية (س10)","pct",5000,589,"(589 ÷ 5000) × 100 = 11.8%"]];
W.eflow=el=>{el.className="widget";let k=0;
  const draw=()=>{const e=EF[k];el.querySelectorAll("[data-e]").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.e===k));
    $q(el,".ew-card").innerHTML=e[1]==="in"?`<p><b>القاعدة:</b> الطاقة الداخلة إلى الصندوق = مجموع الطاقة الخارجة منه.</p><p>الداخل: <b dir="ltr">${e[2]}</b> • الخارج المعروف: <b dir="ltr">${e[3].join(" + ")}</b></p><label class="ew-rng">احسبي المفقود: <input type="number" id="ea" style="width:120px"></label> <button class="btn sm" id="ec">تحقّقي</button><p class="ef-r"></p>`:`<p><b>القاعدة:</b> النسبة = (الطاقة في المستوى ÷ الطاقة في المستوى السابق) × 100</p><p>السابق: <b dir="ltr">${e[2].toLocaleString("en")}</b> • التالي: <b dir="ltr">${e[3].toLocaleString("en")}</b></p><label class="ew-rng">النسبة %: <input type="number" step="0.01" id="ea" style="width:120px"></label> <button class="btn sm" id="ec">تحقّقي</button><p class="ef-r"></p>`;
    $q(el,"#ec").onclick=()=>{const v=+$q(el,"#ea").value,ans=e[1]==="in"?e[2]-e[3].reduce((a,b)=>a+b,0):e[3]/e[2]*100,ok=Math.abs(v-ans)<=Math.max(.06,ans*.01);$q(el,".ef-r").innerHTML=`<b style="color:${ok?"#2D6B47":"#B03A2E"}">${ok?"صحيح!":"ليس بعد."}</b> <span dir="ltr">${e[4]}</span>`}};
  el.innerHTML=`<div class="ew-tabs">${EF.map((e,i)=>`<button class="btn ghost sm" data-e="${i}">${e[0]}</button>`).join("")}</div><div class="ew-card" aria-live="polite"></div>${bar("أمثلة الكتاب صفحة 100-101 وسؤال نهاية الوحدة 10.")}`;
  el.querySelectorAll("[data-e]").forEach(b=>b.onclick=()=>{k=+b.dataset.e;draw()});draw()};

/* 3-3: عمليات تجديد المخزون */
W.replen=el=>{el.className="widget";let k=null;
  const draw=()=>{$q(el,".ew-fig").innerHTML=E.replenish({hl:k});$q(el,".ew-card").innerHTML=k==null?"<p>اضغطي على أي عملية لتقرئي كيف تضيف المغذيات إلى الطبقة السطحية.</p>":`<h4 style="color:${E.PROC[k][2]}">${E.PROC[k][0]}</h4><p>${E.PROC[k][1]}</p>`;
    el.querySelectorAll(".rpn").forEach(g=>{g.setAttribute("tabindex","0");g.onclick=g.onkeydown=ev=>{if(ev.type==="keydown"&&ev.key!=="Enter")return;k=+g.dataset.i;draw()}})};
  el.innerHTML=`<div class="ew-fig"></div><div class="ew-card" aria-live="polite"></div>${bar("خمس عمليات تجدد المخزون، وامتصاص المنتجات يستنفده.")}`;draw()};
})();
