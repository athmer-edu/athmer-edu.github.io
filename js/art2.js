/* ===== رسومات الوحدة الثانية (كيمياء 10): تُستخدم في المنصة وفي العروض ===== */
window.U2ART = (function(){
  const K = "#1A2622";
  const t = (x,y,s,fs=16,c=K,ex="") => `<text x="${x}" y="${y}" font-family="IBM Plex Sans Arabic, Baloo Bhaijaan 2, Tahoma, sans-serif" font-weight="700" font-size="${fs}" fill="${c}" text-anchor="middle" ${ex}>${s}</text>`;
  const A = {};

  /* سلسلة النشاط مع طرق الاستخلاص (الجدول 2-2) */
  A.METHODS = [
    {k:"el", n:"التحليل الكهربائي للمركب المصهور", c:"#C4513E", m:[["K","البوتاسيوم"],["Na","الصوديوم"],["Ca","الكالسيوم"],["Mg","الماغنيسيوم"],["Al","الألومنيوم"]]},
    {k:"c", n:"اختزال الأكاسيد بالكربون (تُسخَّن خامات الكبريتيد أولًا لإنتاج الأكسيد)", c:"#C98B12", m:[["Zn","الخارصين"],["Fe","الحديد"],["Sn","القصدير"],["Pb","الرصاص"]]},
    {k:"s", n:"خام الكبريتيد مسخّن في الهواء", c:"#1D6672", m:[["Cu","النحاس"]]},
    {k:"n", n:"توجد بصورة طبيعية نقية (غير مندمجة)", c:"#8A6D1E", m:[["Ag","الفضة"],["Au","الذهب"]]}
  ];
  A.ladder = (o={}) => {
    const rows=[];A.METHODS.forEach(g=>g.m.forEach(m=>rows.push([m,g])));
    const h=46,W=640,H=rows.length*h+30;
    let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="طرق استخلاص الفلزات حسب موقعها في سلسلة النشاط" style="width:100%;height:auto"><rect width="${W}" height="${H}" rx="18" fill="#fff"/>`;
    rows.forEach(([m,g],i)=>{const y=14+i*h;const on=!o.hl||o.hl===g.k;
      s+=`<rect x="300" y="${y}" width="320" height="${h-6}" rx="9" fill="${g.c}" opacity="${on?.92:.18}"/>${t(400,y+28,m[0],20,"#fff",'direction="ltr"')}${t(530,y+28,m[1],18,"#fff")}`});
    let y0=14;A.METHODS.forEach(g=>{const hh=g.m.length*h-6;const on=!o.hl||o.hl===g.k;
      s+=`<path d="M290 ${y0+4}h-12v${hh-8}h12" fill="none" stroke="${g.c}" stroke-width="3" opacity="${on?1:.25}"/>`;
      const words=g.n.split(" ");let line="",lines=[];words.forEach(w=>{if((line+" "+w).length>22){lines.push(line);line=w}else line=(line?line+" ":"")+w});lines.push(line);
      lines.forEach((l,j)=>{s+=t(140,y0+hh/2-(lines.length-1)*10+j*20+6,l,15,g.c,`opacity="${on?1:.3}"`)});
      y0+=g.m.length*h});
    s+=`<path d="M640 ${H-20}" /><text x="20" y="${H/2}" transform="rotate(-90 20 ${H/2})" text-anchor="middle" font-family="IBM Plex Sans Arabic, Tahoma" font-size="14" fill="#5E6B66">← يقلّ النشاط الكيميائي</text>`;
    return s+`</svg>`;
  };

  /* نشاط 2-1: اختزال أكسيد النحاس بالفحم */
  A.cuo = (done) => `<svg viewBox="0 0 560 300" role="img" aria-label="تسخين أكسيد النحاس مع مسحوق الفحم وتمرير الغاز في ماء الجير" style="width:100%;height:auto"><rect width="560" height="300" rx="18" fill="#F6FAFC"/>
    <path d="M60 60h40v170a20 20 0 0 1-40 0z" fill="#fff" stroke="${K}" stroke-width="3"/>
    <rect x="63" y="190" width="34" height="38" fill="${done?"#B5633A":"#2B2B2B"}"/><rect x="63" y="150" width="34" height="40" fill="#555"/>
    ${done?`<rect x="63" y="184" width="34" height="10" fill="#C9763F"/>`:""}
    ${t(195,215,done?"نحاس بُنّي محمر":"أكسيد النحاس (II) أسود",15)}${t(175,165,"مسحوق الفحم",15)}<path d="M100 172h18M100 210h18" stroke="#888" stroke-width="2"/>
    <path d="M80 270l14-30h-28z" fill="#E8701D"/>${t(80,292,"حرارة",14)}
    <path d="M80 60V30H300v120" fill="none" stroke="${K}" stroke-width="3"/>
    <path d="M270 110h60v140a30 30 0 0 1-60 0z" fill="#fff" stroke="${K}" stroke-width="3"/>
    <rect x="273" y="170" width="54" height="108" rx="4" fill="${done?"#E9ECEA":"#E3F1F6"}"/>
    ${done?[0,1,2,3,4,5].map(i=>`<circle cx="${285+(i*9)%40}" cy="${190+i*12}" r="4" fill="#fff" stroke="#999"/>`).join(""):""}
    ${t(420,200,done?"ماء الجير يتعكّر (CO₂)":"ماء الجير",16,done?"#C4513E":K)}</svg>`;

  /* الفرن العالي */
  A.FZ = {
    load:{n:"قمة الفرن: إدخال الحمولة",d:"خام الحديد (الهيماتيت Fe₂O₃) + فحم الكوك + الحجر الجيري CaCO₃."},
    red:{n:"نحو 600 °C: اختزال الخام",d:"أحادي أكسيد الكربون يختزل أكسيد الحديد (III).",eq:"Fe₂O₃(s) + 3CO(g) → 2Fe(l) + 3CO₂(g)"},
    co:{n:"نحو 1000 °C: تكوّن CO",d:"يُختزل ثاني أكسيد الكربون بالكربون عند صعوده.",eq:"CO₂(g) + C(s) → 2CO(g)"},
    burn:{n:"نحو 1900 °C: احتراق الكربون",d:"يحترق فحم الكوك بشدة في تيار الهواء الساخن عند قاعدة الفرن.",eq:"C(s) + O₂(g) → CO₂(g)"},
    air:{n:"دخول الهواء الساخن",d:"تُضخ تيارات قوية من الهواء الساخن عبر ثقوب أسفل الفرن."},
    slag:{n:"مخرج الخبث",d:"الحجر الجيري يتفكك إلى جير حي يتفاعل مع السيليكا مكوّنًا سيليكات الكالسيوم (الخبث) المنصهرة، تطفو فوق الحديد لأنها أقل كثافة.",eq:"CaCO₃(s) → CaO(s) + CO₂(g) • CaO(s) + SiO₂(s) → CaSiO₃(l)"},
    iron:{n:"مخرج الحديد المنصهر",d:"الحديد الناتج يتدفق إلى قاع الفرن لكثافته العالية، ويُجمع سائلًا منصهرًا."},
    gas:{n:"خروج الغازات العادمة الساخنة",d:"تُستخدم كمبادلات حرارية لتسخين الهواء الداخل، فتقلّ تكاليف الطاقة."}
  };
  A.furnace = (o={}) => {const hl=o.hl,lab=o.labels!==false;const z=(k,s)=>`<g class="fz" data-z="${k}" style="cursor:${o.click?"pointer":"default"}" opacity="${!hl||hl===k?1:.35}">${s}</g>`;
    return `<svg viewBox="0 0 640 520" role="img" aria-label="رسم تخطيطي للفرن العالي" style="width:100%;height:auto"><rect width="640" height="520" rx="18" fill="#fff"/>
    <path d="M250 70h140l40 70-20 250h-180l-20-250z" fill="#E6E2DC" stroke="${K}" stroke-width="5"/>
    ${z("load",`<path d="M285 20h70l-20 50h-30z" fill="#7A6A55" stroke="${K}" stroke-width="3"/><circle cx="305" cy="40" r="6" fill="#B0482C"/><circle cx="322" cy="34" r="6" fill="#333"/><circle cx="336" cy="44" r="6" fill="#EEE" stroke="#999"/>${lab?t(320,14,"الحمولة",15):""}`)}
    ${z("gas",`<path d="M250 85h-70M390 85h70" stroke="#8A9AA4" stroke-width="10"/><path d="M180 85l14-10v20zM460 85l-14-10v20z" fill="#8A9AA4"/>${lab?t(120,90,"غازات ساخنة",15)+t(530,90,"غازات ساخنة",15):""}`)}
    ${z("red",`<rect x="255" y="140" width="130" height="70" fill="#C9C3B8"/>${t(320,182,"600 °C",17)}${lab?t(540,180,"اختزال Fe₂O₃",15):""}<path d="M390 175h80" stroke="#999" stroke-dasharray="4 4"/>`)}
    ${z("co",`<rect x="255" y="210" width="130" height="70" fill="#E4B489"/>${t(320,252,"1000 °C",17)}${lab?t(100,250,"CO₂ + C → 2CO",15,K,'direction="ltr"'):""}<path d="M250 245h-80" stroke="#999" stroke-dasharray="4 4"/>`)}
    ${z("burn",`<rect x="245" y="280" width="150" height="60" fill="#F08A3C"/>${t(320,318,"1900 °C",17,"#fff")}${lab?t(540,315,"احتراق الكربون",15):""}<path d="M400 312h70" stroke="#999" stroke-dasharray="4 4"/>`)}
    ${z("air",`<path d="M170 350h70M470 350h-70" stroke="#5B9BE0" stroke-width="10"/><path d="M240 350l-14-10v20zM400 350l14-10v20z" fill="#5B9BE0"/>${lab?t(120,355,"هواء ساخن",15)+t(530,355,"هواء ساخن",15):""}`)}
    ${z("slag",`<rect x="232" y="372" width="176" height="22" fill="#9DB3A0"/><path d="M232 384h-70" stroke="#9DB3A0" stroke-width="10"/>${lab?t(100,390,"الخبث",16):""}`)}
    ${z("iron",`<rect x="232" y="394" width="176" height="30" fill="#E2531C"/><path d="M408 410h80" stroke="#E2531C" stroke-width="10"/>${lab?t(545,415,"حديد منصهر",16):""}`)}
    <path d="M230 372v54h180v-54" fill="none" stroke="${K}" stroke-width="5"/></svg>`};

  /* عملية الأكسجين الأساسية */
  A.bos = (st) => {const S=[["أ","تعبئة الفرن المائل بالحديد الخام المنصهر وخردة الفولاذ"],["ب","إضافة الجير الحي وضخ الأكسجين: C و S تتحول إلى أكاسيد غازية تخرج"],["ج","أكاسيد Si و P الحمضية تتعادل مع الجير وتكوّن خبثًا يطفو، ثم يُسكب الفولاذ بإمالة الفرن"]];
    return `<svg viewBox="0 0 640 280" role="img" aria-label="مراحل عملية الأكسجين الأساسية" style="width:100%;height:auto"><rect width="640" height="280" rx="18" fill="#fff"/>
    ${S.map((s,i)=>{const x=40+i*200,on=st==null||st===i;return `<g opacity="${on?1:.3}"><path d="M${x+20} 80h120l-10 130a20 20 0 0 1-20 18h-60a20 20 0 0 1-20-18z" fill="#E6E2DC" stroke="${K}" stroke-width="4" ${i===2?`transform="rotate(-20 ${x+80} 150)"`:""}/>
      <rect x="${x+32}" y="${i===1?150:160}" width="96" height="${i===1?60:50}" fill="#E2531C" ${i===2?`transform="rotate(-20 ${x+80} 150)"`:""}/>${i>0?`<rect x="${x+32}" y="${i===1?140:150}" width="96" height="10" fill="#9DB3A0" ${i===2?`transform="rotate(-20 ${x+80} 150)"`:""}/>`:""}
      ${i===1?`<path d="M${x+80} 20v110" stroke="#5B9BE0" stroke-width="8"/>${t(x+80,16,"O₂",15,"#1D6672")}<path d="M${x+40} 70q-10-20 0-40M${x+120} 70q10-20 0-40" stroke="#999" stroke-width="3" fill="none"/>`:""}
      ${i===0?`<path d="M${x+40} 30l30 40" stroke="#888" stroke-width="10"/>`:""}
      ${t(x+80,250,s[0],22,"#C4513E")}</g>`}).join("")}</svg>`};
  A.BOS = ["تعبئة الفرن المائل بالحديد الخام المنصهر من الفرن العالي، ثم إضافة خردة الفولاذ لإعادة تدويرها.","إضافة الجير الحي (CaO) وضخ الأكسجين بسرعة عالية عبر خرطوم مبرّد بالماء: يتحول الكربون والكبريت إلى أكاسيد غازية (CO و CO₂ و SO₂) تخرج من الفرن.","السيليكون والفوسفور يحترقان مكوّنين أكاسيد حمضية غير غازية، تتعادل مع الجير مكوّنة خبثًا يطفو فوق الفولاذ. يُسكب الفولاذ بإمالة الفرن ثم يُسكب الخبث."];

  /* تركيب الفلز النقي والسبيكة */
  A.lattice = (kind, shift=0, w) => {const R=18,cols=9,rows=5;let s="";
    const alloyAt=new Set(["1,2","3,5","2,7","4,1"]);
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const top=r<2;const dx=(top?shift:0);const big=kind==="alloy"&&alloyAt.has(r+","+c);
      const x=40+c*2*R+(r%2)*0+dx,y=40+r*2*R;s+=`<circle cx="${x}" cy="${y}" r="${big?R*1.35:R-1}" fill="${big?"#3A4A55":"#D9DEE2"}" stroke="#6E7F88" stroke-width="2"/>`}
    const W=40+cols*2*R+40;
    return `<svg viewBox="0 0 ${W+60} 230" ${w?`width="${w}"`:'style="width:100%;height:auto"'} role="img" aria-label="${kind==="alloy"?"سبيكة: ذرات عنصر مختلف بين ذرات الفلز":"فلز نقي: ذرات متشابهة في ترتيب منتظم"}"><rect width="${W+60}" height="230" rx="16" fill="#fff"/>${s}${shift?`<path d="M${W+10} 60h40" stroke="#C4513E" stroke-width="6"/><path d="M${W+56} 60l-14-9v18z" fill="#C4513E"/>`:""}</svg>`};

  /* أنابيب تجربة الصدأ (الشكل 5-2) */
  A.TUBES = [
    {n:"الأنبوبة 1 (ضابطة)",c:"هواء + ماء مقطر",rust:true,why:"يتوفر الماء والأكسجين معًا، فتصدأ المسامير.",w:"#BFE0EA",top:"air"},
    {n:"الأنبوبة 2",c:"هواء جاف + كلوريد الكالسيوم (عامل تجفيف)",rust:false,why:"الهواء جاف لا ماء فيه، فلا تصدأ.",w:null,top:"dry"},
    {n:"الأنبوبة 3",c:"ماء مقطر مغلي + طبقة زيت",rust:false,why:"الغلي يطرد الهواء الذائب، والزيت يمنع ذوبانه من جديد: لا أكسجين، فلا صدأ.",w:"#BFE0EA",top:"oil"},
    {n:"الأنبوبة 4",c:"أكسجين نقي + ماء مقطر",rust:true,why:"الأكسجين النقي والماء: مسامير صدئة جدًا.",w:"#BFE0EA",top:"o2"}
  ];
  A.tube = (i, show, w=150) => {const T=A.TUBES[i];const rust=show&&T.rust;
    return `<svg viewBox="0 0 120 260" width="${w}" role="img" aria-label="${T.n}: ${T.c}"><path d="M30 20v190a30 30 0 0 0 60 0V20" fill="#fff" stroke="${K}" stroke-width="3"/><rect x="26" y="10" width="68" height="16" rx="4" fill="#6E7F88"/>
     ${T.top==="dry"?`<rect x="33" y="185" width="54" height="40" fill="#EEE"/>${[0,1,2,3,4,5].map(j=>`<circle cx="${40+j*8}" cy="${200+(j%2)*10}" r="5" fill="#fff" stroke="#999"/>`).join("")}<path d="M33 140h54v12H33z" fill="#F4F1E8"/>`:""}
     ${T.w?`<path d="M33 ${T.top==="oil"?120:150}h54v60a27 27 0 0 1-54 0z" fill="${T.w}"/>`:""}
     ${T.top==="oil"?`<rect x="33" y="108" width="54" height="12" fill="#E9C23C"/>`:""}
     <path d="M60 60l-6 150" stroke="${rust?"#A0522D":"#6B7177"}" stroke-width="7" stroke-linecap="round"/><path d="M50 58h22" stroke="${rust?"#A0522D":"#6B7177"}" stroke-width="7" stroke-linecap="round"/>
     ${rust?[0,1,2,3,4].map(j=>`<circle cx="${57-j}" cy="${110+j*20}" r="${4+j%2}" fill="#B5532A"/>`).join(""):""}
     ${T.top==="o2"?t(60,80,"O₂",16,"#1D6672"):""}</svg>`};

  /* الجلفنة والحماية بالتضحية */
  A.galv = `<svg viewBox="0 0 560 240" role="img" aria-label="غمس جسم حديدي في الخارصين المنصهر" style="width:100%;height:auto"><rect width="560" height="240" rx="16" fill="#fff"/>
    <rect x="60" y="120" width="260" height="90" rx="8" fill="#AEB6BD" stroke="${K}" stroke-width="3"/>${t(190,200,"خارصين منصهر",16)}
    <path d="M190 20v60" stroke="#555" stroke-width="3"/><rect x="150" y="80" width="80" height="70" fill="#6B7177" stroke="${K}" stroke-width="3"/>${t(190,120,"حديد",16,"#fff")}
    <rect x="380" y="90" width="110" height="80" fill="#6B7177"/><rect x="374" y="84" width="122" height="92" fill="none" stroke="#C9CED3" stroke-width="10"/>${t(435,135,"حديد",15,"#fff")}${t(435,205,"طبقة خارصين واقية",15)}
    <path d="M330 130h36" stroke="#C4513E" stroke-width="5"/><path d="M372 130l-12-8v16z" fill="#C4513E"/></svg>`;
  A.ship = `<svg viewBox="0 0 560 260" role="img" aria-label="قضبان ماغنيسيوم متصلة بهيكل سفينة فولاذي" style="width:100%;height:auto"><rect width="560" height="260" rx="16" fill="#E8F4FA"/>
    <rect y="120" width="560" height="140" fill="#9FCFE2"/>
    <path d="M60 80h440l-50 110h-340z" fill="#6B7177" stroke="${K}" stroke-width="3"/><rect x="180" y="40" width="200" height="40" fill="#C9CED3" stroke="${K}" stroke-width="3"/>
    ${[160,260,360].map(x=>`<rect x="${x}" y="185" width="26" height="40" rx="4" fill="#E8E8E8" stroke="${K}" stroke-width="2"/>${t(x+13,240,"Mg",13)}`).join("")}
    <path d="M320 150 q30-20 60 0" stroke="#C4513E" stroke-width="3" fill="none"/>${t(400,140,"الإلكترونات من Mg إلى الحديد",14,"#C4513E")}${t(280,105,"هيكل فولاذي (مهبط)",15,"#fff")}</svg>`;
  return A;
})();
