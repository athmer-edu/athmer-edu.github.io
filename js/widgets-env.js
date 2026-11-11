/* ===== رسومات تفاعلية: العلوم البيئية، الوحدة الأولى ===== */
(function(){
if(!window.ENVART)return;
const E=window.ENVART,W=window.WIDGETS;
const bar=cap=>`<div class="w-bar"><span class="w-cap">${cap}</span></div>`;

/* رسم ثابت من ENVART: <div data-widget="efig" data-f="interception" data-cap="..."> */
W.efig=el=>{el.className="widget";const f=el.dataset.f;el.innerHTML=`<div class="ew-fig">${E[f]()}</div>${el.dataset.cap?bar(el.dataset.cap):""}`};

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
