/* رسومات العلوم البيئية، الوحدة الأولى (window.ENVART)
   تُستخدم في المنصة (js/widgets-env.js) وتُضمَّن داخل عروض الدروس. لا تُسمّى ART لأن index.html فيه const ART. */
window.ENVART=(function(){
const K="#16302B",SKY="#DCEFF8",SEA="#2E7DB5",SEA2="#5FA6D4",LAND="#C9B98F",GRASS="#7FB069",LEAF="#3F8A5E",SUN="#F2B632",ROCK="#8C7B63";
const T=(x,y,t,fs=22,c=K,ex="")=>`<text x="${x}" y="${y}" font-family="Baloo Bhaijaan 2, Tahoma, sans-serif" font-weight="700" font-size="${fs}" fill="${c}" text-anchor="middle" ${ex}>${t}</text>`;
const arr=(d,c,w=5,id="")=>`<path ${id} d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah-${c.replace('#','')})"/>`;
const defs=cols=>`<defs>${cols.map(c=>`<marker id="ah-${c.replace('#','')}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`).join("")}</defs>`;
const tree=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-10" width="12" height="46" fill="#7A5230"/><circle cx="0" cy="-30" r="30" fill="${LEAF}"/><circle cx="-22" cy="-14" r="20" fill="#4E9B6C"/><circle cx="22" cy="-14" r="20" fill="#4E9B6C"/></g>`;
const cloud=(x,y,s=1,f="#fff")=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-60 20a26 26 0 0 1 8-50a34 34 0 0 1 62-12a28 28 0 0 1 46 18a22 22 0 0 1 4 44z" fill="${f}" stroke="#9DB7C6" stroke-width="3"/></g>`;
const sun=(x,y,r=34)=>`<g><circle cx="${x}" cy="${y}" r="${r}" fill="${SUN}"/>${[...Array(10)].map((_,i)=>{const a=i*Math.PI/5;return `<path d="M${x+Math.cos(a)*(r+8)} ${y+Math.sin(a)*(r+8)}L${x+Math.cos(a)*(r+20)} ${y+Math.sin(a)*(r+20)}" stroke="${SUN}" stroke-width="5" stroke-linecap="round"/>`}).join("")}</g>`;

/* ===== دورة الماء (الشكل 1-1) ===== */
const WP={evap:["التبخر","#D9822B"],transp:["النتح","#3F8A5E"],cond:["التكثف","#6A5ACD"],precip:["الهطول","#2E7DB5"],interc:["الاعتراض","#B5487A"],runoff:["الجريان السطحي","#1B6F86"],ground:["الجريان الجوفي","#7A5230"]};
function water(o={}){const L=o.letters||null,lab=k=>L?(L[k]||""):WP[k][0];const show=k=>!o.only||o.only.includes(k);
  const cols=Object.values(WP).map(v=>v[1]);
  return `<svg viewBox="0 0 960 560" style="width:100%;height:auto" role="img" aria-label="دورة الماء: التبخر من البحر، والنتح من النباتات، والتكثف في السحب، والهطول، والاعتراض، والجريان السطحي والجوفي">${defs(cols)}
  <rect width="960" height="560" rx="22" fill="${SKY}"/>
  ${sun(110,80)}
  <path d="M0 380 Q120 370 240 384 T470 386 L470 560 L0 560z" fill="${SEA}"/><path d="M0 392 q40 -10 80 0 t80 0 t80 0 t80 0 t80 0" stroke="#9BC9E8" stroke-width="4" fill="none"/>
  ${T(170,470,"البحر",30,"#fff")}
  <path d="M440 390 Q520 360 600 330 Q700 230 790 160 Q860 120 960 170 L960 560 L440 560z" fill="${LAND}"/>
  <path d="M780 168 L820 130 L850 150 L880 120 L930 160" fill="#fff" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>
  <path d="M440 470 Q650 440 960 460 L960 560 L440 560z" fill="#A9946B"/>
  ${tree(590,330,1.1)}${tree(660,300,1)}${tree(720,270,.9)}
  <rect x="520" y="352" width="190" height="10" rx="5" fill="#9C7A4A" opacity=".55"/>
  ${cloud(330,110,1.05)}${cloud(720,70,1.15,"#EEF3F7")}
  <g class="wp" data-p="evap" style="${show("evap")?"":"display:none"}">${arr("M180 360 C170 300 200 250 250 190","#D9822B",6)}${arr("M300 362 C290 300 300 250 300 185","#D9822B",6)}<rect x="60" y="250" width="${L?56:120}" height="40" rx="12" fill="#fff" stroke="#D9822B" stroke-width="3"/>${T(L?88:120,279,lab("evap"),24,"#B5641A")}</g>
  <g class="wp" data-p="transp" style="${show("transp")?"":"display:none"}">${arr("M660 240 C650 200 660 160 690 130","#3F8A5E",6)}<rect x="${L?690:672}" y="190" width="${L?56:96}" height="40" rx="12" fill="#fff" stroke="#3F8A5E" stroke-width="3"/>${T(L?718:720,219,lab("transp"),24,"#2D6B47")}</g>
  <g class="wp" data-p="cond" style="${show("cond")?"":"display:none"}">${arr("M400 100 C480 70 560 66 630 72","#6A5ACD",6)}<rect x="${L?470:450}" y="24" width="${L?56:110}" height="40" rx="12" fill="#fff" stroke="#6A5ACD" stroke-width="3"/>${T(L?498:505,53,lab("cond"),24,"#4B3FA3")}</g>
  <g class="wp" data-p="precip" style="${show("precip")?"":"display:none"}">${[0,1,2,3,4,5].map(i=>`<path d="M${790+i*18} ${118} l-10 34" stroke="#2E7DB5" stroke-width="4" stroke-linecap="round"/><path d="M${786+i*18} ${165} l-10 34" stroke="#2E7DB5" stroke-width="4" stroke-linecap="round"/>`).join("")}<rect x="${L?860:846}" y="196" width="${L?56:100}" height="40" rx="12" fill="#fff" stroke="#2E7DB5" stroke-width="3"/>${T(L?888:896,225,lab("precip"),24,"#1E5F8C")}</g>
  <g class="wp" data-p="interc" style="${show("interc")?"":"display:none"}">${[0,1,2].map(i=>`<path d="M${600+i*55} ${190+i*18} l-6 22" stroke="#B5487A" stroke-width="4" stroke-linecap="round"/>`).join("")}<path d="M560 255 q40 -14 80 0 q40 -14 80 0" stroke="#B5487A" stroke-width="4" fill="none" stroke-dasharray="6 6"/><rect x="${L?520:490}" y="160" width="${L?56:112}" height="40" rx="12" fill="#fff" stroke="#B5487A" stroke-width="3"/>${T(L?548:546,189,lab("interc"),24,"#8E2F5C")}</g>
  <g class="wp" data-p="runoff" style="${show("runoff")?"":"display:none"}">${arr("M860 190 C800 260 720 330 640 372 C560 400 520 396 470 392","#1B6F86",6)}<rect x="${L?760:700}" y="352" width="${L?56:160}" height="40" rx="12" fill="#fff" stroke="#1B6F86" stroke-width="3"/>${T(L?788:780,381,lab("runoff"),24,"#1B6F86")}</g>
  <g class="wp" data-p="ground" style="${show("ground")?"":"display:none"}">${arr("M900 480 C780 520 600 520 470 500","#7A5230",6,'stroke-dasharray="12 9"')}<rect x="${L?640:600}" y="508" width="${L?56:150}" height="40" rx="12" fill="#fff" stroke="#7A5230" stroke-width="3"/>${T(L?668:675,537,lab("ground"),24,"#5C3B1F")}</g>
  </svg>`}

/* ===== مسارات الهطول في الغابة (الشكل 1-3) ===== */
function interception(){return `<svg viewBox="0 0 900 440" style="width:100%;height:auto" role="img" aria-label="اعتراض المظلة النباتية والنثار للهطول، وصافي المطر الذي يدخل التربة">${defs(["#2E7DB5","#D9822B"])}
 <rect width="900" height="440" rx="22" fill="${SKY}"/>${cloud(450,60,1.2)}
 ${[...Array(14)].map((_,i)=>`<path d="M${150+i*48} 95 l-8 26" stroke="#2E7DB5" stroke-width="4" stroke-linecap="round"/>`).join("")}
 <rect x="0" y="330" width="900" height="110" fill="#8C6B45"/><rect x="0" y="312" width="900" height="22" fill="#C2A06B"/>
 ${T(780,395,"تربة معدنية",24,"#fff")}${T(110,328,"النثار",22,"#5C3B1F")}
 ${tree(330,200,2.1)}${tree(600,250,1.2)}
 <path d="M200 140 q130 -40 260 0" stroke="#D9822B" stroke-width="5" fill="none" stroke-dasharray="8 7"/>${arr("M330 130 C320 110 330 92 350 78","#D9822B",5)}
 <rect x="20" y="140" width="250" height="68" rx="14" fill="#fff" stroke="#D9822B" stroke-width="3"/>${T(145,168,"اعتراض المظلة النباتية",22)}${T(145,196,"ثم التبخر",22,"#B5641A")}
 ${arr("M720 300 C730 280 745 268 760 250","#D9822B",5)}<rect x="690" y="200" width="190" height="50" rx="14" fill="#fff" stroke="#D9822B" stroke-width="3"/>${T(785,233,"اعتراض النثار والتبخر",20)}
 ${T(600,175,"أشجار الطبقة السفلى",20)}
 ${arr("M470 140 L470 360","#2E7DB5",6)}${arr("M820 120 L820 360","#2E7DB5",6)}
 <rect x="480" y="370" width="220" height="50" rx="14" fill="#fff" stroke="#2E7DB5" stroke-width="3"/>${T(590,403,"صافي المطر الذي يدخل التربة",19,"#1E5F8C")}</svg>`}

/* ===== مستويات تركيب النظام البيئي ===== */
const fish=(x,y,s=1,c="#E58E3B")=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-18 0q18-14 34 0q-16 14-34 0z" fill="${c}"/><path d="M-18 0l-10-8v16z" fill="${c}"/><circle cx="8" cy="-2" r="2" fill="${K}"/></g>`;
const crab=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="16" ry="10" fill="#C8473A"/><path d="M-14 -4l-12 -10M14 -4l12 -10M-12 6l-12 8M12 6l12 8" stroke="#C8473A" stroke-width="3"/></g>`;
const weed=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0c-8-20 8-30 0-50M8 0c8-18-6-28 4-46M-8 0c-8-14 4-26-4-38" stroke="#3F8A5E" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
function hierarchy(o={}){const lv=[["الفرد","كائن حي واحد"],["الجماعة الأحيائية","أفراد النوع نفسه"],["المجتمع الأحيائي","جماعات أحيائية مختلفة"],["النظام البيئي","المجتمع + العوامل غير الحيوية"],["المنطقة الأحيائية","نظم بيئية في منطقة واسعة"]];
 const W=980,w=184,g=15;
 const pics=[fish(92,95,1.6),[0,1,2,3,4].map(i=>fish(40+(i%3)*42,70+Math.floor(i/3)*44+(i%2)*6,1.05)).join(""),[fish(50,70),fish(110,64,.9,"#4D8FCC"),fish(80,112,.8),crab(130,118,.9),weed(40,140,.7)].join(""),`<rect x="10" y="40" width="164" height="110" rx="10" fill="#BFE0F0"/><rect x="10" y="130" width="164" height="20" fill="${LAND}"/>${fish(60,80)}${fish(120,72,.9,"#4D8FCC")}${crab(120,124,.8)}${weed(40,150,.7)}${sun(150,30,12)}`,`<rect x="8" y="34" width="168" height="120" rx="10" fill="#BFE0F0"/><path d="M8 110 q40 -30 84 -6 t84 -4 V154 H8z" fill="${GRASS}"/>${tree(140,96,.55)}${tree(110,104,.45)}<path d="M8 74 q40 -12 84 0 t84 0" stroke="#fff" stroke-width="4" fill="none"/>${fish(46,96,.7)}`];
 return `<svg viewBox="0 0 ${W} 290" style="width:100%;height:auto" role="img" aria-label="مستويات تركيب النظام البيئي من الفرد إلى المنطقة الأحيائية">${defs([K])}
 ${lv.map((l,i)=>{const x=W-(i+1)*w-i*g;return `<g class="hl" data-l="${i}" transform="translate(${x} 10)"><rect width="${w}" height="270" rx="18" fill="#fff" stroke="${o.hl===i?SUN:"#B9D3C9"}" stroke-width="${o.hl===i?6:3}"/>${pics[i]}${T(w/2,200,l[0],21)}${T(w/2,232,l[1],16,"#4E6B62")}${T(w/2,260,String(i+1),20,"#119da4")}</g>${i<4?arr(`M${x-2} 120 L${x-g+4} 120`,K,3):""}`}).join("")}</svg>`}

/* ===== الهرم البيئي (الشكل 1-6) ===== */
function pyramid(o={}){const L=[["المستهلكات الثالثية","#C8473A"],["المستهلكات الثانوية","#E58E3B"],["المستهلكات الأولية","#E8C547"],["المنتجات","#5FA36A"]];const E=o.energy;
 return `<svg viewBox="0 0 900 470" style="width:100%;height:auto" role="img" aria-label="هرم بيئي من أربعة مستويات غذائية، ينتقل نحو 10% فقط من الطاقة إلى المستوى التالي">${defs(["#C8473A",SUN,"#7A5230"])}
 ${L.map((l,i)=>{const top=40+i*90,h=86,w1=230+i*130,w2=230+(i+1)*130,cx=440;return `<g class="pl" data-k="${3-i}"><path d="M${cx-w1/2} ${top}H${cx+w1/2}L${cx+w2/2} ${top+h}H${cx-w2/2}z" fill="${l[1]}" stroke="#fff" stroke-width="4"/>${T(cx,top+(E?40:52),l[0],24,"#fff")}${E?T(cx,top+72,E[3-i],22,"#fff"):""}</g>`}).join("")}
 ${sun(820,400,30)}${arr("M780 400 L700 400",SUN,6)}
 ${[0,1,2,3].map(i=>arr(`M${440+(230+(i+.5)*130)/2+8} ${85+i*90} L${440+(230+(i+.5)*130)/2+60} ${85+i*90}`,"#C8473A",4)).join("")}
 ${T(810,40,"فقدان حرارة",24,"#C8473A")}${T(810,68,"(تنفّس، فضلات…)",18,"#8E3A2E")}
 <rect x="20" y="40" width="130" height="350" rx="16" fill="#EFE6D8" stroke="#7A5230" stroke-width="3"/>${T(85,200,"المحلّلات",24,"#5C3B1F")}${T(85,232,"فطريات",18,"#5C3B1F")}${T(85,256,"بكتيريا",18,"#5C3B1F")}
 </svg>`}

/* ===== سلسلة غذائية (الشكل 1-7) ===== */
function chain(items,o={}){items=items||["نبات","الجندب","صائد الذباب"];const n=items.length,W=900,gap=W/n;
 return `<svg viewBox="0 0 ${W} 240" style="width:100%;height:auto" role="img" aria-label="سلسلة غذائية: ${items.join(" ثم ")}">${defs([K,"#C8473A",SUN])}
 ${items.map((t,i)=>{const x=W-gap*(i+.5);return `<rect x="${x-gap/2+16}" y="70" width="${gap-32}" height="76" rx="18" fill="${i?"#fff":"#E7F4E4"}" stroke="${i?"#E58E3B":LEAF}" stroke-width="4"/>${T(x,116,t,26)}${o.levels?T(x,176,o.levels[i],18,"#4E6B62"):""}${i<n-1?arr(`M${x-gap/2+12} 108 L${x-gap/2-12} 108`,K,5):""}${i&&o.heat!==false?arr(`M${x} 70 L${x} 26`,"#C8473A",4)+T(x+44,30,"حرارة",16,"#C8473A"):""}`}).join("")}
 </svg>`}

/* ===== شبكة غذائية عامة ===== */
function web(nodes,edges,o={}){const W=o.w||900,H=o.h||520;return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto" role="img" aria-label="${o.label||"شبكة غذائية"}">${defs(["#5B7A73","#C8473A"])}
 ${edges.map(([a,b])=>{const A=nodes[a],B=nodes[b];const dx=B[1]-A[1],dy=B[2]-A[2],d=Math.hypot(dx,dy)||1;const x1=A[1]+dx/d*34,y1=A[2]+dy/d*24,x2=B[1]-dx/d*44,y2=B[2]-dy/d*28;return `<path class="we" data-a="${a}" data-b="${b}" d="M${x1} ${y1}L${x2} ${y2}" stroke="#5B7A73" stroke-width="3" marker-end="url(#ah-5B7A73)"/>`}).join("")}
 ${Object.entries(nodes).map(([k,n])=>`<g class="wn" data-n="${k}" tabindex="0"><rect x="${n[1]-n[0].length*8-14}" y="${n[2]-20}" width="${n[0].length*16+28}" height="40" rx="14" fill="${n[3]||"#fff"}" stroke="#2E5E55" stroke-width="2.5"/>${T(n[1],n[2]+8,n[0],20)}</g>`).join("")}</svg>`}

/* ===== دورة الكربون (الشكل 1-9) ===== */
const CP={photo:["تمثيل ضوئي","#3F8A5E"],respP:["تنفّس","#D9822B"],respA:["تنفّس","#D9822B"],respD:["تنفّس","#D9822B"],feed:["تغذية","#6A5ACD"],death:["موت وفضلات","#7A5230"],decomp:["تحلّل","#7A5230"],fossil:["ضغط وحرارة لفترة طويلة","#5C4A3A"],comb:["احتراق","#C8473A"]};
function carbon(o={}){const L=o.letters||null,lab=k=>L?(L[k]||""):CP[k][0];const box=(x,y,w,h,t,f,s,sub)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${f}" stroke="${s}" stroke-width="3"/>${T(x+w/2,y+(sub?h/2-4:h/2+8),t,19)}${sub?T(x+w/2,y+h/2+22,sub,16,"#4E6B62"):""}`;
 const tag=(k,x,y)=>L&&!L[k]?"":`<g class="cp" data-p="${k}"><rect x="${x-(L?24:lab(k).length*7.5+12)}" y="${y-18}" width="${L?48:lab(k).length*15+24}" height="34" rx="11" fill="#fff" stroke="${CP[k][1]}" stroke-width="2.5"/>${T(x,y+7,lab(k),L?22:18,CP[k][1])}</g>`;
 return `<svg viewBox="0 0 960 600" style="width:100%;height:auto" role="img" aria-label="دورة الكربون: ثاني أكسيد الكربون في الهواء، والنباتات، والحيوانات، والمحلّلات، والوقود الأحفوري، والعمليات بينها">${defs(Object.values(CP).map(v=>v[1]))}
 <rect width="960" height="600" rx="22" fill="#F2F8F4"/>${sun(70,70,30)}
 ${box(330,22,300,70,"ثاني أكسيد الكربون في الهواء","#DCEFF8","#2E7DB5")}
 ${box(660,210,280,80,"مركّبات الكربون في النباتات","#E3F2E1",LEAF)}
 ${box(345,250,270,80,"مركّبات الكربون في الحيوانات","#FCEBD9","#D9822B")}
 ${box(40,250,250,90,"المحلّلات في التربة","#EFE6D8","#7A5230","كائنات دقيقة وغيرها")}
 ${box(300,470,360,96,"مركّبات الكربون في الوقود الأحفوري","#E8E2DA","#5C4A3A","فحم، نفط (بنزين)، غاز طبخ")}
 ${arr("M640 70 C760 90 800 140 800 205","#3F8A5E",5)}${tag("photo",800,140)}
 ${arr("M760 205 C720 150 680 110 610 95","#D9822B",5)}${tag("respP",690,180)}
 ${arr("M660 270 L620 275","#6A5ACD",5)}${tag("feed",640,320)}
 ${arr("M480 245 L480 98","#D9822B",5)}${tag("respA",480,180)}
 ${arr("M170 245 C190 160 260 110 325 70","#D9822B",5)}${tag("respD",210,180)}
 ${arr("M345 300 L295 300","#7A5230",5)}${tag("death",320,360)}
 ${arr("M680 290 C560 400 300 400 200 345","#7A5230",4,'stroke-dasharray="10 7"')}${tag("decomp",560,395)}
 ${arr("M165 345 C170 430 230 500 295 515","#5C4A3A",5)}${tag("fossil",215,450)}
 ${arr("M665 500 C900 470 900 200 640 60","#C8473A",5)}${tag("comb",890,330)}
 </svg>`}

/* ===== التمثيل الضوئي في الورقة (الشكل 1-10) ===== */
function leaf(){return `<svg viewBox="0 0 900 400" style="width:100%;height:auto" role="img" aria-label="الورقة تستخدم طاقة الضوء وثاني أكسيد الكربون والماء لتكوين الجلوكوز، وتطلق الأكسجين">${defs([SUN,"#2E7DB5","#5B7A73","#3F8A5E"])}
 <rect width="900" height="400" rx="22" fill="#F4FAF2"/>${sun(820,70,36)}
 <path d="M240 210 C320 80 560 70 660 200 C560 330 330 330 240 210z" fill="#4FA36B" stroke="#2D6B47" stroke-width="4"/><path d="M240 210 H660 M330 210 L400 150 M430 210 L500 140 M530 210 L590 160 M330 210 L400 270 M430 210 L500 280 M530 210 L590 260" stroke="#2D6B47" stroke-width="3" fill="none"/>
 <path d="M240 210 L150 250" stroke="#2D6B47" stroke-width="8" stroke-linecap="round"/>
 ${arr("M780 100 L640 150",SUN,7)}${T(745,160,"طاقة الضوء",22,"#9A6B00")}
 ${arr("M120 80 L270 160","#5B7A73",6)}${T(120,62,"ثاني أكسيد الكربون",22)}
 ${arr("M70 330 L210 240","#2E7DB5",6)}${T(90,360,"ماء (من الجذور)",22,"#1E5F8C")}
 ${arr("M620 270 L760 330","#3F8A5E",6)}${T(790,365,"أكسجين + بخار ماء",21,"#2D6B47")}
 <rect x="370" y="190" width="180" height="40" rx="12" fill="#fff" opacity=".92"/>${T(460,218,"جلوكوز يُخزَّن",22,"#2D6B47")}
 ${T(450,375,"الكلوروفيل (الصبغة الخضراء) يمتص طاقة الضوء",21,"#2D6B47")}</svg>`}

/* ===== منحنى العامل المحدد (الشكل 1-11) ===== */
function limitGraph(o={}){const x0=110,y0=330,W=640,H=250;const k=o.k||1;const pts=[...Array(41)].map((_,i)=>{const x=i/40;const y=Math.min(x*1.6,.62*k)*(1)/(1);return [x0+x*W,y0-Math.min(y,1)*H]});
 const pts2=o.second?[...Array(41)].map((_,i)=>{const x=i/40;return [x0+x*W,y0-Math.min(x*1.6,.9)*H]}):null;
 return `<svg viewBox="0 0 820 400" style="width:100%;height:auto" role="img" aria-label="معدل التمثيل الضوئي يزداد مع شدة الضوء ثم يصبح ثابتًا">
 <rect width="820" height="400" rx="20" fill="#fff"/>
 <path d="M${x0} 60V${y0}H${x0+W+20}" stroke="${K}" stroke-width="4" fill="none"/>
 ${pts2?`<polyline points="${pts2.map(p=>p.join(",")).join(" ")}" fill="none" stroke="#9DB7C6" stroke-width="5" stroke-dasharray="10 8"/>`:""}
 <polyline class="lg" points="${pts.map(p=>p.join(",")).join(" ")}" fill="none" stroke="#3F8A5E" stroke-width="6"/>
 ${T(x0+W/2,y0+50,"شدة الضوء",24)}${T(40,200,"معدل التمثيل الضوئي",22,K,'transform="rotate(-90 40 200)"')}
 <rect x="150" y="70" width="230" height="64" rx="12" fill="#E7F4E4"/>${T(265,98,"يزداد المعدل بزيادة",19)}${T(265,124,"شدة الضوء (الضوء محدِّد)",19)}
 <rect x="480" y="150" width="300" height="64" rx="12" fill="#FCEBD9"/>${T(630,178,"يصبح المعدل ثابتًا: عامل آخر",19)}${T(630,204,"(CO₂ أو الحرارة) صار المحدِّد",19)}
 </svg>`}

/* ===== انبعاثات سلطنة عُمان 2021 (الشكل 1-12) ===== */
const SECT=[["قطاع الصناعة",28.4,"#C8473A"],["قطاع النفط والغاز",22.9,"#E58E3B"],["قطاع الطاقة",17.1,"#E8C547"],["قطاع النقل",15.9,"#2E7DB5"],["قطاع النفايات",5.4,"#7A5230"]];
function omanBars(){const max=30,x0=250,W=560;return `<svg viewBox="0 0 900 380" style="width:100%;height:auto" role="img" aria-label="الانبعاثات الكربونية لسلطنة عمان عام 2021 حسب القطاع بالمليون طن مكافئ CO2">
 <rect width="900" height="380" rx="20" fill="#fff"/>
 ${SECT.map((s,i)=>{const y=40+i*62,w=s[1]/max*W;return `<g class="sb" data-i="${i}">${T(770,y+30,s[0],22)}<rect x="${660-w}" y="${y}" width="${w}" height="44" rx="10" fill="${s[2]}"/>${T(660-w-40,y+30,String(s[1]),22,s[2])}</g>`}).join("")}
 ${T(450,365,"مليون طن مكافئ لثاني أكسيد الكربون (المجموع نحو 90)",18,"#4E6B62")}</svg>`}

/* ===== تقنيات الحياد الكربوني (الشكلان 1-13 و 1-17) ===== */
const TECH=[["الكهرباء ومصادر الطاقة المتجددة",35,"#2E9E8F","توفير بديل نظيف ومستدام للمركبات القائمة على محركات الاحتراق الداخلي التقليدية."],["تقنيات تخزين الطاقة",20,"#4D8FCC","توفير وسيلة نقل طاقة نظيفة وفعّالة لدعم الانتقال إلى أنظمة طاقة منخفضة الكربون."],["تقنيات احتجاز الكربون وتخزينه",15,"#6A5ACD","التقاط CO₂ من مصادر الانبعاثات الكبيرة وتخزينه بشكل دائم تحت الأرض."],["الهيدروجين المستدام",8,"#E58E3B","تقليل الاعتماد على الوقود الأحفوري وانبعاثات الغازات الدفيئة، وتعزيز الطاقة المستدامة."],["حلول الانبعاثات السلبية",7,"#3F8A5E","إزالة الكربون من الغلاف الجوي بحلول تقنية وطبيعية، مثل زراعة أشجار القرم أو تخزينه في الآبار المستنفدة."],["كفاءة الطاقة والموارد",6,"#B5487A","تحسين استخدام الموارد وتقليل النفايات وخفض استهلاك الطاقة في مختلف القطاعات."]];
function techBars(o={}){const x0=70,y0=330,bw=104,g=22;return `<svg viewBox="0 0 900 430" style="width:100%;height:auto" role="img" aria-label="معدل الانخفاض التقديري في الانبعاثات لكل تقنية: الكهرباء والطاقة المتجددة 35%، التخزين 20%، الاحتجاز 15%، الهيدروجين 8%، الحلول السلبية 7%، الكفاءة 6%">
 <rect width="900" height="430" rx="20" fill="#fff"/><path d="M${x0} 30V${y0}H880" stroke="${K}" stroke-width="3" fill="none"/>
 ${[0,10,20,30].map(v=>`<path d="M${x0} ${y0-v*8}H880" stroke="#E3ECE9" stroke-width="2"/>${T(x0-24,y0-v*8+7,String(v),18,"#4E6B62")}`).join("")}
 ${TECH.map((t,i)=>{const x=840-i*(bw+g)-bw,h=t[1]*8;const words=t[0].split(" ");const half=Math.ceil(words.length/2);return `<g class="tb" data-i="${i}"><rect x="${x}" y="${y0-h}" width="${bw}" height="${h}" rx="8" fill="${t[2]}"/>${T(x+bw/2,y0-h-10,t[1]+"%",22,t[2],'direction="ltr"')}${T(x+bw/2,y0+30,words.slice(0,half).join(" "),16)}${T(x+bw/2,y0+52,words.slice(half).join(" "),16)}</g>`}).join("")}
 </svg>`}

return {water,WP,interception,hierarchy,pyramid,chain,web,carbon,CP,leaf,limitGraph,omanBars,SECT,techBars,TECH,tree,sun,cloud,fish};
})();
