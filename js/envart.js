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

/* ===== رسومات الوحدة الثانية: البحوث البيئية وجمع البيانات (تُضاف إلى window.ENVART) ===== */
Object.assign(window.ENVART,(function(){
const K="#16302B",LEAF="#3F8A5E",GRASS="#7FB069",SOIL="#B08A5B",SEA="#2E7DB5";
const T=(x,y,t,fs=22,c=K,ex="")=>`<text x="${x}" y="${y}" font-family="Baloo Bhaijaan 2, Tahoma, sans-serif" font-weight="700" font-size="${fs}" fill="${c}" text-anchor="middle" ${ex}>${t}</text>`;
const mk=c=>`<marker id="u2-${c.replace('#','')}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.4" markerHeight="4.4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`;
const ar=(d,c,w=5,dash="")=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" ${dash?`stroke-dasharray="${dash}"`:""} marker-end="url(#u2-${c.replace('#','')})"/>`;
const svg=(w,h,lab,body,cols=[])=>`<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto" role="img" aria-label="${lab}"><defs>${cols.map(mk).join("")}</defs>${body}</svg>`;
/* نبتة بسيطة: x,y قاعدة الساق، h الطول */
const plant=(x,y,h,c=LEAF,n=3)=>{let g=`<path d="M${x} ${y}V${y-h}" stroke="#4E7B3A" stroke-width="5" stroke-linecap="round"/>`;for(let i=0;i<n;i++){const yy=y-h*(i+1)/(n+1),s=i%2?1:-1;g+=`<ellipse cx="${x+s*16}" cy="${yy}" rx="17" ry="8" transform="rotate(${s*-28} ${x+s*16} ${yy})" fill="${c}"/>`}return g+`<ellipse cx="${x}" cy="${y-h}" rx="11" ry="15" fill="${c}"/>`};
const pot=(x,y,w=110)=>`<path d="M${x-w/2} ${y}h${w}l-12 70h${-(w-24)}z" fill="#C46A3C"/><rect x="${x-w/2-6}" y="${y-8}" width="${w+12}" height="16" rx="6" fill="#A85A31"/>`;

/* 1) المنهج العلمي: حلقة تغذية راجعة (الشكل 2-1). hl: رقم الخطوة المضاءة، fail: إظهار مسار «حاولي مرة أخرى» */
const SM=[["لاحظي","#1b5c86"],["اطرحي سؤالًا","#119da4"],["ضعي فرضية تجيب عن السؤال","#3F8A5E"],["تنبّئي بناءً على الفرضية","#7FA032"],["نفّذي تجربة لاختبار التنبؤ","#D9822B"],["حلّلي البيانات واستخلصي الاستنتاجات","#B5487A"],["قدّمي النتائج","#6A5ACD"]];
function smethod(o={}){const hl=o.hl==null?-1:o.hl,fail=!!o.fail;
  const P=[[790,70],[480,70],[170,70],[170,250],[170,430],[480,430],[790,250]];
  const box=(i)=>{const [x,y]=P[i],[t,c]=SM[i],on=hl<0||hl===i;const w=270;const words=t.split(" ");const two=words.length>2;const h=Math.ceil(words.length/2);const l1=two?words.slice(0,h).join(" "):t,l2=two?words.slice(h).join(" "):"";
    return `<g class="smn" data-i="${i}" style="cursor:pointer;opacity:${on?1:.3}"><rect x="${x-w/2}" y="${y-40}" width="${w}" height="80" rx="22" fill="${c}"/><circle cx="${x+w/2-4}" cy="${y-38}" r="18" fill="#fff" stroke="${c}" stroke-width="4"/>${T(x+w/2-4,y-30,i+1,20,c)}${two?T(x,y-6,l1,24,"#fff")+T(x,y+26,l2,24,"#fff"):T(x,y+9,t,27,"#fff")}</g>`};
  const okc=fail?"#b9c6c1":"#3F8A5E",noc=fail?"#C8473A":"#e3b3ae";
  return svg(960,520,"المنهج العلمي: لاحظي، اطرحي سؤالًا، ضعي فرضية، تنبّئي، نفّذي تجربة، حلّلي البيانات؛ إن كانت الفرضية صحيحة قدّمي النتائج، وإن لم تكن صحيحة حاولي مرة أخرى بفرضية جديدة",
   `<rect width="960" height="520" rx="24" fill="#F6FBF9"/>
   ${ar("M648 70H630","#4E6B62",5)}<path d="M650 70H622" stroke="#4E6B62" stroke-width="5"/>${ar("M340 70H318","#4E6B62",5)}<path d="M340 70H312" stroke="#4E6B62" stroke-width="5"/>
   ${ar("M170 112V196","#4E6B62",5)}${ar("M170 292V376","#4E6B62",5)}${ar("M308 430H330","#4E6B62",5)}<path d="M306 430H336" stroke="#4E6B62" stroke-width="5"/>
   ${ar("M618 430H676","#4E6B62",5)}
   <g><path d="M790 372L880 430L790 488L700 430Z" fill="#fff" stroke="#16302B" stroke-width="4"/>${T(790,424,"هل الفرضية",19)}${T(790,450,"صحيحة؟",19)}</g>
   <path d="M790 372V300" stroke="${okc}" stroke-width="6"/>${ar("M790 340V296",okc,6)}${T(862,345,"نعم ✔",22,okc)}
   <path d="M712 418C600 330 420 250 300 104" stroke="${noc}" stroke-width="6" fill="none" stroke-dasharray="16 10"/>${ar("M330 140L296 98",noc,6)}
   <g>${T(600,205,"لا ✘ حاولي مرة أخرى",22,noc)}${T(600,233,"(فرضية جديدة)",18,noc)}</g>
   ${[0,1,2,3,4,5].map(box).join("")}
   ${(()=>{const on=(hl<0||hl===6)&&!fail;const [x,y]=P[6];return `<g class="smn" data-i="6" style="cursor:pointer;opacity:${on?1:.3}"><rect x="${x-135}" y="${y-40}" width="270" height="80" rx="22" fill="#6A5ACD"/><circle cx="${x+131}" cy="${y-38}" r="18" fill="#fff" stroke="#6A5ACD" stroke-width="4"/>${T(x+131,y-30,7,20,"#6A5ACD")}${T(x,y+9,"قدّمي النتائج",27,"#fff")}</g>`})()}`,["#4E6B62","#3F8A5E","#C8473A","#b9c6c1","#e3b3ae"])}

/* 2) المجموعة الضابطة والتجريبية (الشكل 2-3) */
function plants(o={}){return svg(900,470,"تجربة على نبات: المجموعة التجريبية رُويت بمحلول السماد فبلغ طولها 32 cm، والمجموعة الضابطة رُويت بالماء العادي فبلغ طولها 18 cm",
 `<rect width="900" height="470" rx="24" fill="#F6FBF9"/>
 <g>${T(670,46,"المجموعة التجريبية",28,"#D9822B")}${T(670,80,"\u2066200 ml\u2069 محلول سماد • مرتين أسبوعيًا • 3 أسابيع",17,"#4E6B62")}${plant(670,330,192,LEAF,5)}${pot(670,330)}
 <path d="M770 330V138" stroke="#D9822B" stroke-width="4"/><path d="M760 138h20M760 330h20" stroke="#D9822B" stroke-width="4"/>${T(820,240,"32 cm",28,"#D9822B",'direction="ltr"')}</g>
 <g>${T(230,46,"المجموعة الضابطة",28,"#1b5c86")}${T(230,80,"\u2066200 ml\u2069 ماء عادي • مرتين أسبوعيًا • 3 أسابيع",17,"#4E6B62")}${plant(230,330,108,GRASS,3)}${pot(230,330)}
 <path d="M130 330V222" stroke="#1b5c86" stroke-width="4"/><path d="M120 222h20M120 330h20" stroke="#1b5c86" stroke-width="4"/>${T(80,282,"18 cm",28,"#1b5c86",'direction="ltr"')}</g>
 <rect x="250" y="420" width="400" height="38" rx="19" fill="#FFF4D6"/>${T(450,446,"الفرق الوحيد: محلول السماد (المتغير المستقل)",19,"#8a6410")}`)}

/* 3) المتغير المستقل والتابع (الشكل 2-2) */
function ivdv(){return svg(900,330,"المتغير المستقل كمية الماء يُغيَّر، والمتغيرات التابعة حجم النبات وعدد الأوراق وهل تعيش النبتة أم تموت",
 `<rect width="900" height="330" rx="24" fill="#F6FBF9"/>
 <rect x="560" y="40" width="300" height="250" rx="26" fill="#E3F1FB" stroke="${SEA}" stroke-width="4"/>${T(710,84,"المتغير المستقل",30,SEA)}${T(710,116,"المتغير الذي يتم تغييره",19,"#4E6B62")}
 <path d="M680 170h60l-10 34h-40z" fill="#9BC7E8" stroke="${SEA}" stroke-width="3"/><path d="M700 150c0 10 10 10 10 20" stroke="${SEA}" stroke-width="3" fill="none"/>${T(710,256,"كمية الماء",28)}
 ${ar("M545 165H365","#16302B",7)}${T(455,148,"يؤثر في",22)}
 <rect x="40" y="40" width="300" height="250" rx="26" fill="#EAF5EC" stroke="${LEAF}" stroke-width="4"/>${T(190,84,"المتغير التابع",30,LEAF)}${T(190,116,"المتغير الذي يتأثر (يُقاس)",19,"#4E6B62")}
 ${T(190,170,"حجم النبات",24)}${T(190,212,"عدد الأوراق",24)}${T(190,254,"تعيش أم تموت النبتة؟",24)}`,["#16302B"])}

/* 4) أنواع التمثيلات البيانية (الشكل 2-4). k: 0 أعمدة، 1 دائري، 2 خطي، 3 مبعثر؛ بلا k: الأربعة */
const GT=[["تمثيل بياني بالأعمدة","بيانات ذات فئات","#2E7DB5"],["مخطط دائري","بيانات ذات فئات","#D9822B"],["تمثيل بياني خطي","بيانات مستمرة","#3F8A5E"],["تمثيل بياني مبعثر","بيانات مستمرة","#B5487A"]];
function g1(k,x,y,w,h){const c=GT[k][2];let b=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#fff" stroke="#D6E4DF" stroke-width="3"/>${T(x+w/2,y+36,GT[k][0],24,c)}${T(x+w/2,y+62,GT[k][1],17,"#4E6B62")}`;
  const ox=x+50,oy=y+h-40,W=w-90,H=h-120;const ax=`<path d="M${ox} ${oy-H}V${oy}H${ox+W}" stroke="${K}" stroke-width="3" fill="none"/>`;
  if(k===0){const v=[[25,"حمار وحشي"],[12,"ظبي"],[8,"فيل"],[30,"زرافة"]];b+=ax+v.map((d,i)=>{const bw=W/4-18,bx=ox+W-(i+1)*(W/4)+9,bh=d[0]/32*H;return `<rect x="${bx}" y="${oy-bh}" width="${bw}" height="${bh}" rx="5" fill="${c}"/>${T(bx+bw/2,oy+22,d[1],14)}`}).join("")}
  if(k===1){const cx=x+w/2,cy=y+h/2+30,r=Math.min(W,H)/2;const v=[41,105,89,87],tot=322;let a=-Math.PI/2;const cs=["#D9822B","#F2B632","#C46A3C","#E8A87C"];b+=v.map((d,i)=>{const a2=a+d/tot*2*Math.PI,l=a2-a>Math.PI?1:0;const p=`M${cx} ${cy}L${cx+r*Math.cos(a)} ${cy+r*Math.sin(a)}A${r} ${r} 0 ${l} 1 ${cx+r*Math.cos(a2)} ${cy+r*Math.sin(a2)}z`;const m=(a+a2)/2;a=a2;return `<path d="${p}" fill="${cs[i]}" stroke="#fff" stroke-width="3"/>${T(cx+r*.62*Math.cos(m),cy+r*.62*Math.sin(m)+6,d,17,"#fff",'direction="ltr"')}`}).join("")}
  if(k===2){const s1=[20,22,21,25,27,26,30],s2=[14,15,17,16,18,20,19];const pt=(s)=>s.map((v,i)=>`${ox+W-i*W/6} ${oy-(v-10)/22*H}`).join(" L");b+=ax+`<path d="M${pt(s1)}" stroke="${c}" stroke-width="4" fill="none"/><path d="M${pt(s2)}" stroke="#D9822B" stroke-width="4" fill="none" stroke-dasharray="10 7"/>`}
  if(k===3){const P=[[1,4],[1.5,6],[2,9],[2.4,10],[3,14],[3.3,15],[3.8,19],[4.2,20],[2.8,11],[1.2,7]];b+=ax+P.map(p=>`<circle cx="${ox+W-p[0]/4.5*W}" cy="${oy-p[1]/22*H}" r="7" fill="${c}"/>`).join("")}
  return `<g class="gt" data-k="${k}">${b}</g>`}
function graphs(o={}){if(o.k!=null)return svg(440,330,GT[o.k][0]+" للـ"+GT[o.k][1],g1(o.k,0,0,440,330));
  return svg(900,690,"أربعة أنواع من التمثيلات البيانية: الأعمدة والدائري للبيانات ذات الفئات، والخطي والمبعثر للبيانات المستمرة",[0,1,2,3].map(k=>g1(k,k%2?20:460,k<2?10:350,420,330)).join(""))}

/* 5) حقل لجمع العينات: نبات منتشر في منطقتين A وB (الشكل 2-6). mode: rand|sys، kind: point|line، pts: نقاط عشوائية جاهزة */
const FIELD=(()=>{let s=7;const r=()=>(s=(s*9301+49297)%233280)/233280;const P=[];for(let i=0;i<70;i++)P.push([24+r()*442,24+r()*352,0]);for(let i=0;i<55;i++)P.push([514+r()*362,24+r()*166,1]);for(let i=0;i<10;i++)P.push([514+r()*362,200+r()*176,1]);return P})();
function field(o={}){const mode=o.mode||"rand",kind=o.kind||"point";let marks="";
  if(kind==="point"){const pts=mode==="sys"?(()=>{const a=[];for(let y=70;y<380;y+=78)for(let x=70;x<880;x+=100)a.push([x,y]);return a})():(o.pts||[]);
    marks=pts.map(p=>`<rect x="${p[0]-22}" y="${p[1]-22}" width="44" height="44" fill="none" stroke="#16302B" stroke-width="4" rx="3"/>`).join("")}
  else{const ys=mode==="sys"?[80,160,240,320]:(o.ys||[]);marks=ys.map(y=>`<path d="M20 ${y}H880" stroke="#16302B" stroke-width="4" stroke-dasharray="14 8"/>`).join("")}
  return svg(900,420,"منطقة دراسة فيها نبات منتشر؛ المنطقة A يتوزع فيها النبات بانتظام تقريبي، والمنطقة B يتجمع فيها النبات في الجزء العلوي",
  `<rect width="900" height="420" rx="22" fill="#EAF5E2"/><path d="M490 20V400" stroke="#9DB98A" stroke-width="3" stroke-dasharray="8 8"/>
  ${T(250,410,"المنطقة A",22,"#4E6B62")}${T(690,410,"المنطقة B",22,"#4E6B62")}
  ${FIELD.map(p=>`<g transform="translate(${p[0]} ${p[1]})"><circle r="9" fill="#B5487A"/><circle r="4" fill="#F2B632"/></g>`).join("")}${marks}`)}

/* 6) المقطع الخطي من الغابة إلى البحيرة مع مربعات كل 25 m (الشكل 2-7) */
function transect(){return svg(900,300,"مقطع خطي طوله 100 m يمتد من الغابة إلى البحيرة، توضع عليه مربعات قياسية على مسافات منتظمة كل 25 m",
 `<rect width="900" height="300" rx="22" fill="#F6FBF9"/><rect x="20" y="40" width="300" height="200" rx="16" fill="#CFE8F6"/>${T(170,80,"بحيرة",28,SEA)}
 <rect x="580" y="40" width="300" height="200" rx="16" fill="#D7ECD2"/>${[0,1,2,3,4,5].map(i=>`<g transform="translate(${620+(i%3)*95} ${i<3?100:205}) scale(.7)"><rect x="-6" y="-6" width="12" height="40" fill="#7A5230"/><circle cy="-26" r="28" fill="${LEAF}"/></g>`).join("")}${T(730,236,"",1)}${T(830,66,"غابة",24,LEAF)}
 <path d="M840 140H80" stroke="#16302B" stroke-width="5"/>${[0,25,50,75,100].map((m,i)=>{const x=840-i*190;return `<rect x="${x-24}" y="116" width="48" height="48" fill="rgba(255,255,255,.6)" stroke="#D9822B" stroke-width="5"/>${T(x,196,m+" m",19,K,'direction="ltr"')}`}).join("")}
 ${T(450,272,"مقطع \u2066100 m\u2069 • مربع قياسي كل \u206625 m\u2069",22,"#8a6410")}`)}

/* 7) المربع القياسي المفتوح والشبكي (الصورة 2-4) */
function quadrats(){const tuft=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M0 0l-8-22M0 0l0-26M0 0l8-22" stroke="${LEAF}" stroke-width="4" stroke-linecap="round"/></g>`;
 const pts=[[40,50],[90,120],[150,70],[200,180],[60,200],[130,160],[220,60],[180,230],[100,240]];
 return svg(900,380,"مربع قياسي مفتوح إطاره بلا شبكة، ومربع قياسي شبكي مقسّم إلى 100 مربع صغير",
 `<rect width="900" height="380" rx="22" fill="#F6FBF9"/>
 <g transform="translate(560 40)"><rect width="280" height="280" fill="#E7F2DD" stroke="#7A5230" stroke-width="9"/>${pts.map(p=>tuft(p[0],p[1])).join("")}</g>${T(700,360,"مربع قياسي مفتوح",24,"#7A5230")}
 <g transform="translate(60 40)"><rect width="280" height="280" fill="#E7F2DD"/>${[1,2,3,4,5,6,7,8,9].map(i=>`<path d="M${i*28} 0V280M0 ${i*28}H280" stroke="#7A5230" stroke-width="2"/>`).join("")}<rect width="280" height="280" fill="none" stroke="#7A5230" stroke-width="9"/>${pts.map(p=>tuft(p[0],p[1])).join("")}</g>${T(200,360,"مربع قياسي شبكي (10 × 10)",24,"#7A5230")}`)}

/* 8) تقنيات جمع العينات: المصيدة الشراكية، شبكة الاصطياد، الجمع بالركل، ضع علامة-أطلق-أعد الإمساك */
function pitfall(){return svg(440,330,"مصيدة شراكية: كوب مدفون حافته مستوية مع سطح الأرض، وفوقه غطاء مرفوع بمسامير، وفيه مادة مضادة للتجمد",
 `<rect width="440" height="330" rx="20" fill="#F6FBF9"/><rect x="0" y="130" width="440" height="200" fill="${SOIL}"/><path d="M0 130H440" stroke="#7FB069" stroke-width="10"/>
 <path d="M160 130l14 150h92l14-150z" fill="#E9F2F7" stroke="#16302B" stroke-width="4"/><path d="M172 230h96l-4 50h-88z" fill="#8FD0C6"/>
 <rect x="140" y="70" width="160" height="14" rx="5" fill="#7A5230"/><path d="M155 84V130M285 84V130" stroke="#5c5c5c" stroke-width="5"/>
 <g transform="translate(330 120)"><ellipse rx="14" ry="8" fill="#222"/><path d="M-10 4l-8 8M0 6v10M10 4l8 8" stroke="#222" stroke-width="2"/></g>
 ${T(220,60,"سطح علوي (غطاء)",19)}${T(220,262,"مادة مضادة للتجمد",17,"#0F5E57")}${T(370,110,"حشرة",17)}${T(90,180,"كوب مدفون",19,"#fff")}`)}
function sweep(){return svg(440,330,"شبكة اصطياد الحشرات: شبكة على عصا تُحرّك بين الأعشاب الطويلة بحركة على شكل الرقم 8",
 `<rect width="440" height="330" rx="20" fill="#F6FBF9"/><rect y="230" width="440" height="100" fill="#D7ECD2"/>${[30,70,110,150,300,340,380,420].map(x=>`<path d="M${x} 330c-6-40 4-70-4-110M${x+12} 330c4-40-8-60 2-100" stroke="${LEAF}" stroke-width="5" fill="none"/>`).join("")}
 <path d="M60 60L230 190" stroke="#7A5230" stroke-width="10" stroke-linecap="round"/><ellipse cx="270" cy="210" rx="56" ry="26" fill="none" stroke="#16302B" stroke-width="6" transform="rotate(-20 270 210)"/><path d="M226 222c10 70 70 80 100 20" fill="rgba(255,255,255,.7)" stroke="#16302B" stroke-width="3"/>
 <path d="M140 120c40-40 90 40 130 0s-90-40-130 0z" fill="none" stroke="#D9822B" stroke-width="4" stroke-dasharray="9 7"/>${T(340,60,"حركة الرقم 8",19,"#D9822B")}`)}
function kick(){return svg(440,330,"الجمع بالركل: يقف الباحث في مياه ضحلة ويضع الشبكة في اتجاه مجرى الماء ويركل القاع فتنجرف اللافقاريات إلى الشبكة",
 `<rect width="440" height="330" rx="20" fill="#F6FBF9"/><path d="M0 150H440V330H0z" fill="#CFE8F6"/><path d="M0 280H440V330H0z" fill="#B9A27A"/>${[40,110,300,380].map(x=>`<ellipse cx="${x}" cy="285" rx="22" ry="10" fill="#8C7B63"/>`).join("")}
 ${ar("M400 200H300",SEA,5)}${ar("M400 240H300",SEA,5)}${T(355,185,"اتجاه المجرى",17,SEA)}
 <path d="M150 170l40 110" stroke="#7A5230" stroke-width="7"/><path d="M130 190c-10 60 30 90 70 90l-10-100z" fill="rgba(255,255,255,.75)" stroke="#16302B" stroke-width="3"/>
 <path d="M250 60v120l20 100" stroke="#16302B" stroke-width="12" stroke-linecap="round"/><path d="M250 180l-20 90" stroke="#16302B" stroke-width="12" stroke-linecap="round"/><circle cx="250" cy="44" r="20" fill="#16302B"/><path d="M270 280h26" stroke="#16302B" stroke-width="10" stroke-linecap="round"/>
 ${T(110,140,"الشبكة",19)}${T(330,300,"ركل القاع",19,"#fff")}`,[SEA])}
function mrr(o={}){const st=o.st==null?3:o.st;const bug=(x,y,m)=>`<g transform="translate(${x} ${y})"><ellipse rx="16" ry="11" fill="#5B6B3A"/><circle cx="-16" r="6" fill="#5B6B3A"/>${m?`<circle cx="4" cy="-2" r="6" fill="#F2B632" stroke="#fff" stroke-width="2"/>`:""}</g>`;
 const P=[[60,90],[120,150],[90,220],[160,70],[200,190],[40,170]],Q=[[300,80],[360,150],[330,230],[400,90],[390,210],[280,170]];
 return svg(440,330,"ضع علامة - أطلق - أعد الإمساك: تُمسك أفراد وتُوسم ثم تُطلق، ثم تُمسك عينة ثانية ويُعد الموسوم فيها",
 `<rect width="440" height="330" rx="20" fill="#F6FBF9"/><path d="M220 20V300" stroke="#D6E4DF" stroke-width="3"/>${T(115,40,"العينة الأولى: ضعي علامة وأطلقي",16,"#D9822B")}${T(335,40,"العينة الثانية: أعيدي الإمساك",16,"#1b5c86")}
 ${P.map(p=>bug(p[0],p[1]+20,1)).join("")}${Q.map((p,i)=>bug(p[0],p[1]+20,i<2)).join("")}${T(345,318,"الموسومة منها:",17,"#8a6410")}${T(268,318,"m₂",19,"#8a6410",'direction="ltr"')}${T(130,318,"كلها موسومة:",17,"#8a6410")}${T(60,318,"n₁",19,"#8a6410",'direction="ltr"')}`)}

/* 9) مقياس سيمبسون 0 ← 1 */
function simpsonScale(o={}){const v=o.v;const x=v==null?null:60+v*780;return svg(900,170,"مؤشر سيمبسون من 0 (لا تنوع) إلى 1 (تنوع عالٍ جدًا)",
 `<defs><linearGradient id="u2sg" x1="0" x2="1"><stop offset="0" stop-color="#C8473A"/><stop offset=".5" stop-color="#F2B632"/><stop offset="1" stop-color="#3F8A5E"/></linearGradient></defs>
 <rect x="60" y="60" width="780" height="34" rx="17" fill="url(#u2sg)"/>${T(60,130,"0",28,K,'direction="ltr"')}${T(840,130,"1",28,K,'direction="ltr"')}${T(130,40,"عدم وجود تنوع",22,"#C8473A")}${T(770,40,"تنوع عالٍ جدًا",22,"#2D6B47")}${T(450,140,"كلما اقتربت D من 1 ازداد التنوع ←",22,"#4E6B62")}
 ${x!=null?`<path d="M${x} 50v54" stroke="#16302B" stroke-width="6"/><circle cx="${x}" cy="77" r="12" fill="#fff" stroke="#16302B" stroke-width="5"/>${T(x,162,"D = "+v,22,K,'direction="ltr"')}`:""}`)}

/* 10) العينة الممثلة (الشكل 2-5) */
function sampleRep(){const dots=(cx,cy,r,n,seed)=>{let s=seed,g="";const rr=()=>(s=(s*9301+49297)%233280)/233280;for(let i=0;i<n;i++){const a=rr()*6.28,d=Math.sqrt(rr())*r;g+=`<circle cx="${cx+d*Math.cos(a)}" cy="${cy+d*Math.sin(a)}" r="7" fill="${["#2E7DB5","#D9822B","#3F8A5E"][i%3]}"/>`}return g};
 return svg(900,330,"جماعة أحيائية كبيرة تُجمع منها عينة صغيرة ممثلة، ثم يُستدل من العينة على الجماعة كلها",
 `<rect width="900" height="330" rx="22" fill="#F6FBF9"/><circle cx="660" cy="160" r="135" fill="#E3F1FB" stroke="${SEA}" stroke-width="4"/>${dots(660,160,120,90,3)}${T(660,320,"جماعة أحيائية",24,SEA)}
 <circle cx="200" cy="160" r="70" fill="#FFF4D6" stroke="#D9822B" stroke-width="4"/>${dots(200,160,58,15,11)}${T(200,262,"عينة",24,"#D9822B")}
 ${ar("M515 120C440 70 340 80 285 120","#D9822B",5)}${T(400,70,"جمع عينة",22,"#D9822B")}${ar("M285 205C340 250 440 250 515 205","#1b5c86",5,"12 8")}${T(400,270,"استدلال (تعميم)",22,"#1b5c86")}`,["#D9822B","#1b5c86"])}

return {smethod,SM,plants,ivdv,graphs,GT,field,FIELD,transect,quadrats,pitfall,sweep,kick,mrr,simpsonScale,sampleRep};
})());

/* ===== رسومات الوحدة الثالثة: التفاعلات في النظم البيئية البحرية (تُضاف إلى window.ENVART) ===== */
Object.assign(window.ENVART,(function(){
const K="#16302B",SEA="#2E7DB5",DEEP="#0b2a45",LEAF="#3F8A5E";
const T=(x,y,t,fs=22,c=K,ex="")=>`<text x="${x}" y="${y}" font-family="Baloo Bhaijaan 2, Tahoma, sans-serif" font-weight="700" font-size="${fs}" fill="${c}" text-anchor="middle" ${ex}>${t}</text>`;
const mk=c=>`<marker id="u3-${c.replace('#','')}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.4" markerHeight="4.4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`;
const ar=(d,c,w=5,dash="")=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" ${dash?`stroke-dasharray="${dash}"`:""} marker-end="url(#u3-${c.replace('#','')})"/>`;
const svg=(w,h,lab,body,cols=[])=>`<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto" role="img" aria-label="${lab}"><defs>${cols.map(mk).join("")}</defs>${body}</svg>`;
const fish=(x,y,s,c,flip=0)=>`<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})"><path d="M-60 0C-30-34 30-34 52 0C30 34-30 34-60 0z" fill="${c}"/><path d="M48 0l34-26v52z" fill="${c}"/><circle cx="-36" cy="-8" r="6" fill="#fff"/><circle cx="-36" cy="-8" r="3" fill="${K}"/></g>`;
const sign=(x,y,t,c)=>`<circle cx="${x}" cy="${y}" r="24" fill="${c}"/>${T(x,y+10,t,30,"#fff")}`;

/* 1) العلاقات التكافلية الثلاث (k: 0 تطفل، 1 تعايش، 2 تبادل؛ بلا k: الثلاث) */
const REL=[["التطفل","قمل البحر على السلمون","#C8473A","−","+"],["التعايش","الريمورا على شيطان البحر","#2E7DB5","0","+"],["التبادل","سرطان البحر الملاكم وشقائق النعمان","#3F8A5E","+","+"]];
function relPic(k){
  if(k===0)return `${fish(150,120,1.25,"#E8A87C")}${[[110,100],[150,92],[180,128],[125,140]].map(p=>`<g transform="translate(${p[0]} ${p[1]})"><ellipse rx="9" ry="6" fill="#7A4B2A"/><path d="M-6 4l-4 6M6 4l4 6" stroke="#7A4B2A" stroke-width="2"/></g>`).join("")}`;
  if(k===1)return `<g transform="translate(150 118)"><path d="M-130 0C-80-40 -40-50 0-50C40-50 80-40 130 0C80 10 40 30 0 30C-40 30-80 10-130 0z" fill="#33475B"/><path d="M-10 30l-6 60" stroke="#33475B" stroke-width="5"/><circle cx="-60" cy="-20" r="5" fill="#fff"/></g>${fish(150,166,.55,"#8C9AA8")}`;
  return `<g transform="translate(150 125)"><ellipse rx="44" ry="30" fill="#E07A5F"/><circle cx="-14" cy="-24" r="5" fill="${K}"/><circle cx="14" cy="-24" r="5" fill="${K}"/>${[-1,1].map(s=>`<path d="M${s*40} -10l${s*40}-34" stroke="#E07A5F" stroke-width="9" stroke-linecap="round"/><g transform="translate(${s*86} -52)">${[0,1,2,3,4,5,6,7].map(i=>`<path d="M0 0l${Math.cos(i*.8)*22} ${Math.sin(i*.8)*22-6}" stroke="#F2B632" stroke-width="5" stroke-linecap="round"/>`).join("")}<circle r="9" fill="#D9822B"/></g>`).join("")}${[-30,-12,12,30].map(x=>`<path d="M${x} 24l${x>0?14:-14} 22" stroke="#E07A5F" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`}
function symb(o={}){const one=k=>{const r=REL[k];return `<g><rect x="0" y="0" width="300" height="330" rx="22" fill="#fff" stroke="${r[2]}" stroke-width="5"/>${T(150,40,r[0],30,r[2])}<rect x="14" y="54" width="272" height="160" rx="16" fill="#E3F1FB"/>${relPic(k)}${T(150,240,r[1],18,"#4E6B62")}${T(80,276,"العائل",19)}${sign(80,306,r[3],r[3]==="−"?"#C8473A":r[3]==="0"?"#8C9AA8":"#3F8A5E")}${T(220,276,"المتكافل",19)}${sign(220,306,r[4],"#3F8A5E")}</g>`};
  if(o.k!=null)return svg(300,340,REL[o.k][0]+": "+REL[o.k][1],one(o.k));
  return svg(960,340,"ثلاث علاقات تكافلية: التطفل يستفيد فيه المتكافل ويتضرر العائل، والتعايش يستفيد المتكافل ولا يتأثر العائل، والتبادل يستفيد الطرفان",[2,1,0].map((k,i)=>`<g transform="translate(${i*330} 0)">${one(k)}</g>`).join(""))}

/* 2) طبقات المحيط (الشكل 3-1) */
function oceanZones(o={}){const hl=o.hl;return svg(900,520,"طبقات المحيط: المنطقة الضوئية حتى 200 m، ثم المنحدر الحراري حتى 1000 m، ثم المياه العميقة حتى قاع المحيط 5000 m",
 `<defs><linearGradient id="u3z" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7EC8E3"/><stop offset=".25" stop-color="#2E7DB5"/><stop offset=".6" stop-color="#174D78"/><stop offset="1" stop-color="#0b2a45"/></linearGradient></defs>
 <rect x="300" y="40" width="560" height="440" fill="url(#u3z)"/><rect x="300" y="470" width="560" height="40" fill="#8C7B63"/>
 <circle cx="830" cy="26" r="20" fill="#F2B632"/>${[0,1,2,3].map(i=>`<path d="M${800-i*50} 40l-30 70" stroke="#FFE38A" stroke-width="5" opacity=".8"/>`).join("")}
 <path d="M300 110H860" stroke="#fff" stroke-width="3" stroke-dasharray="10 8"/><path d="M300 250H860" stroke="#fff" stroke-width="3" stroke-dasharray="10 8"/>
 <g opacity="${hl==null||hl===0?1:.35}"><rect x="40" y="48" width="240" height="56" rx="14" fill="#7EC8E3"/>${T(160,84,"المنطقة الضوئية",24,DEEP)}</g>
 <g opacity="${hl==null||hl===1?1:.35}"><rect x="40" y="152" width="240" height="56" rx="14" fill="#2E7DB5"/>${T(160,188,"المنحدر الحراري",24,"#fff")}</g>
 <g opacity="${hl==null||hl===2?1:.35}"><rect x="40" y="330" width="240" height="56" rx="14" fill="#174D78"/>${T(160,366,"المياه العميقة",24,"#fff")}</g>
 ${T(160,502,"قاع المحيط",22,"#6B5B45")}
 ${T(580,84,"90% من الحياة البحرية • تمثيل ضوئي",20,DEEP)}${T(580,190,"تدرج الكثافة: ماء دافئ فوق بارد",20,"#fff")}${T(580,360,"لا ضوء • مياه غنية بالمغذيات",20,"#fff")}
 ${[["200 m",110],["1000 m",250],["5000 m",470]].map(d=>T(340,d[1]-8,d[0],17,"#fff",'direction="ltr"')).join("")}
 ${[[420,80],[690,70],[760,95]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#3F8A5E"/>`).join("")}`)}

/* 3) الفوهة المائية الحرارية والتمثيل الكيميائي */
function vent(){return svg(900,420,"فوهة مائية حرارية في قاع المحيط: بكتيريا ذاتية التغذية الكيميائية تستخدم كبريتيد الهيدروجين لصنع جزيئات عضوية، وتبدأ بها سلسلة غذائية بلا ضوء",
 `<rect width="900" height="420" rx="22" fill="#0b2a45"/><path d="M0 360Q200 330 420 350T900 340V420H0z" fill="#3A3A3A"/>
 <path d="M420 350l26-170h40l26 170z" fill="#4A3B33"/><path d="M466 180c-30-40 30-60 0-100c-30-40 40-60 10-90" stroke="#9AA3AD" stroke-width="22" fill="none" opacity=".55" stroke-linecap="round"/>
 ${T(470,40,"H₂S + مياه حارة جدًا (حتى 400°C)",21,"#FFD58A")}
 ${[560,600,640,680].map((x,i)=>`<path d="M${x} 355v-${70+i*12}" stroke="#E9E4D8" stroke-width="12" stroke-linecap="round"/><circle cx="${x}" cy="${285-i*12}" r="11" fill="#D64545"/>`).join("")}${T(625,210,"ديدان أنبوبية",20,"#fff")}
 ${[[300,330],[330,345],[360,325],[280,350],[390,340]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="#8BD17C"/>`).join("")}${T(330,300,"بكتيريا",20,"#8BD17C")}
 <rect x="40" y="90" width="330" height="150" rx="16" fill="rgba(255,255,255,.1)" stroke="#8BD17C" stroke-width="3"/>${T(205,128,"التمثيل الكيميائي",26,"#8BD17C")}${T(205,166,"طاقة كيميائية (كبريتيد الهيدروجين)",18,"#fff")}${T(205,196,"+ CO₂ ذائب ← جزيئات عضوية",18,"#fff")}${T(205,226,"بلا ضوء • بداية السلسلة الغذائية",18,"#FFD58A")}
 ${T(780,300,"سرطان",18,"#fff")}<g transform="translate(780 330)"><ellipse rx="26" ry="16" fill="#E8E2D0"/><path d="M-24 0l-16-14M24 0l16-14" stroke="#E8E2D0" stroke-width="5"/></g>`)}

/* 4) هرم عام: levels=[[الاسم,القيمة]] من الأسفل إلى الأعلى؛ log: مقياس لوغاريتمي تقريبي */
function pyramid(o={}){const L=o.levels||[["منتجات",1000],["مستهلكات أولية",100],["مستهلكات ثانوية",10],["مستهلكات ثالثية",1]];const cols=o.cols||["#3F8A5E","#7FA032","#D9822B","#B5487A","#6A5ACD"];
 const max=Math.max(...L.map(l=>l[1]));const W=o.w||820,bh=Math.min(70,320/L.length),H=L.length*bh+60;
 const wid=v=>{const r=o.log?Math.log10(v+1)/Math.log10(max+1):v/max;return Math.max(30,r*(W-260))};
 return svg(W,H,(o.lab||"هرم بيئي")+": "+L.map(l=>l[0]+" "+l[1]).join("، "),L.map((l,i)=>{const w=wid(l[1]),y=H-30-(i+1)*bh,x=(W-80)/2-w/2+80;return `<rect x="${x}" y="${y}" width="${w}" height="${bh-6}" rx="6" fill="${cols[i%cols.length]}"/>${T(x+w/2,y+bh/2+4,o.noval?"":l[1],18,"#fff",'direction="ltr"')}${T(70,y+bh/2+5,l[0],18,K)}`}).join("")+(o.title?T((W+80)/2,H-6,o.title,18,"#4E6B62"):""))}

/* 5) مصير الطاقة في المستهلك (الشكل 3-3): C = R + F + U + P */
function energyFate(o={}){const p=o.p||{R:60,F:20,U:5,P:15};const parts=[["R","التنفس (حرارة)","#C8473A"],["F","البراز","#8C7B63"],["U","البول والفضلات","#D9822B"],["P","كتلة حيوية جديدة","#3F8A5E"]];let x=820;
 return svg(900,330,"الطاقة المستهلكة C تتوزع: R في التنفس، F في البراز، U في البول، P للنمو وتنتقل إلى المستوى التالي",
 `<rect width="900" height="330" rx="22" fill="#F6FBF9"/>${T(450,44,"C = R + F + U + P",30,DEEP,'direction="ltr"')}<rect x="80" y="70" width="740" height="40" rx="10" fill="${SEA}"/>${T(450,98,"C: الطاقة في الطعام المستهلك (100%)",20,"#fff")}
 ${parts.map(q=>{const w=740*p[q[0]]/100;x-=w;return `<rect x="${x}" y="130" width="${w}" height="60" rx="8" fill="${q[2]}"/>${T(x+w/2,168,q[0],26,"#fff",'direction="ltr"')}`}).join("")}
 ${parts.map((q,i)=>{const sx=i%2?420:830,sy=218+(i>>1)*34;return `<rect x="${sx-12}" y="${sy-12}" width="24" height="24" rx="6" fill="${q[2]}"/>${T(sx-150,sy+6,q[0]+": "+q[1]+" "+p[q[0]]+"%",17,K)}`}).join("")}${T(450,312,"P وحدها تنتقل إلى المستوى الغذائي التالي",18,"#2D6B47")}`,["#3F8A5E"])}

/* 6) دورة مغذٍّ عامة: الطور الحيوي وغير الحيوي (الشكل 3-8) */
function nutCycle(o={}){return svg(900,440,"دورة مغذٍّ عامة: المغذيات في الطور غير الحيوي تمتصها المنتجات فتنتقل إلى الطور الحيوي، ثم المستهلكات، ثم المحللات تعيدها إلى الطور غير الحيوي",
 `<rect width="900" height="440" rx="22" fill="#F6FBF9"/><rect x="20" y="20" width="860" height="210" rx="20" fill="#EAF5EC"/>${T(800,58,"الطور الحيوي",26,LEAF)}${T(800,84,"مركبات عضوية",17,"#4E6B62")}
 <rect x="20" y="250" width="860" height="170" rx="20" fill="#E3F1FB"/>${T(790,404,"الطور غير الحيوي",26,SEA)}
 ${[["منتجات",620,140,"#3F8A5E"],["مستهلكات",400,140,"#D9822B"],["محللات",180,140,"#8C7B63"]].map(b=>`<rect x="${b[1]-90}" y="${b[2]-36}" width="180" height="72" rx="18" fill="${b[3]}"/>${T(b[1],b[2]+9,b[0],26,"#fff")}`).join("")}
 ${ar("M525 140H500","#16302B",6)}<path d="M528 140H496" stroke="#16302B" stroke-width="6"/>${ar("M305 140H282","#16302B",6)}<path d="M308 140H276" stroke="#16302B" stroke-width="6"/>${T(512,112,"تغذية",17)}
 <path d="M620 176Q620 210 620 200" stroke="none"/>${ar("M560 330C640 320 640 230 625 182","#3F8A5E",6)}${T(690,300,"امتصاص وتمثيل غذائي",18,LEAF)}
 ${ar("M180 182C170 260 260 330 330 335","#8C7B63",6)}${T(150,300,"تحلل",18,"#6B5B45")}${ar("M400 180C420 230 420 280 440 318","#8C7B63",4,"10 7")}${T(470,240,"إخراج",17,"#6B5B45")}
 <rect x="330" y="310" width="240" height="96" rx="16" fill="#fff" stroke="${SEA}" stroke-width="3"/>${T(450,340,"أيونات ذائبة في الماء",18,SEA)}${T(450,368,"غازات في الغلاف الجوي",18,SEA)}${T(450,396,"رواسب وصخور",18,SEA)}`,["#16302B","#3F8A5E","#8C7B63"])}

/* 7) التيار الصاعد للمياه الساحلية (الشكل 3-10) */
function upwelling(){return svg(900,420,"التيار الصاعد للمياه الساحلية: رياح سطحية تدفع الطبقة السطحية الدافئة بعيدًا عن الشاطئ، فترتفع مياه عميقة باردة غنية بالمغذيات",
 `<rect width="900" height="420" rx="22" fill="#F6FBF9"/><path d="M0 120H660L900 70V420H0z" fill="#2E7DB5"/><path d="M660 120L900 70V420H780z" fill="#C9A66B"/><path d="M0 120H660V160H0z" fill="#7EC8E3"/>
 ${T(780,52,"الشاطئ",22,"#6B5B45")}${ar("M600 60H380","#16302B",6)}${T(490,44,"رياح سطحية",20)}
 ${ar("M560 140H300","#D9822B",6)}${T(330,196,"طبقة سطحية دافئة تُدفع بعيدًا",18,"#fff")}
 ${ar("M260 380C460 380 620 330 640 180","#fff",7,"14 9")}${T(420,290,"مياه عميقة باردة غنية بالمغذيات تصعد",19,"#fff")}
 ${[[520,200],[560,230],[600,170],[480,250],[620,220]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#8BD17C"/>`).join("")}${T(130,360,"25% من صيد الأسماك",20,"#FFD58A")}${T(130,388,"في 5% من المحيط",20,"#FFD58A")}`,["#16302B","#D9822B","#fff"])}

/* 8) خمس عمليات تجدد مخزون المغذيات + الإزالة */
const PROC=[["ذوبان غازات الغلاف الجوي","N₂ و CO₂ تذوب في الماء؛ يعتمد على الحرارة وتركيز الغاز والأمواج.","#6A5ACD"],["الإخراج والتحلل","CO₂ من الخياشيم، والأمونيا واليوريا، والمحللات تعيد الأيونات.","#8C7B63"],["التيارات الصاعدة","مياه عميقة باردة غنية بالمغذيات ترتفع إلى السطح.","#2E7DB5"],["الجريان السطحي","الماء من اليابسة يحمل مغذيات التربة إلى البحر.","#D9822B"],["النشاط التكتوني","الفوهات الحرارية، وتعرية الصخور الجديدة، والرماد البركاني.","#C8473A"]];
function replenish(o={}){const hl=o.hl;const P=[[450,60],[780,150],[720,330],[180,330],[120,150]];
 return svg(900,420,"خمس عمليات تجدد مخزون المغذيات الذائبة في الطبقة السطحية: ذوبان الغازات، والإخراج والتحلل، والتيارات الصاعدة، والجريان السطحي، والنشاط التكتوني؛ وتمتصها المنتجات فتنضب",
 `<rect width="900" height="420" rx="22" fill="#F6FBF9"/><ellipse cx="450" cy="215" rx="190" ry="80" fill="#7EC8E3"/>${T(450,205,"مخزون المغذيات الذائبة",24,DEEP)}${T(450,236,"في الطبقة السطحية",20,DEEP)}
 ${PROC.map((p,i)=>{const [x,y]=P[i],on=hl==null||hl===i;return `<g class="rpn" data-i="${i}" style="cursor:pointer;opacity:${on?1:.3}"><rect x="${x-110}" y="${y-30}" width="220" height="60" rx="16" fill="${p[2]}"/>${T(x,y+(p[0].length>16?-2:7),p[0].length>16?p[0].split(" ").slice(0,2).join(" "):p[0],p[0].length>16?18:21,"#fff")}${p[0].length>16?T(x,y+20,p[0].split(" ").slice(2).join(" "),18,"#fff"):""}</g>${ar(`M${x+(450-x)*.32} ${y+(215-y)*.32}L${x+(450-x)*.6} ${y+(215-y)*.6}`,p[2],5)}`}).join("")}
 ${ar("M450 296V380","#3F8A5E",6)}${T(450,405,"تنضب: تمتصها المنتجات (ثم الحصاد والثلج البحري)",18,"#2D6B47")}`,["#6A5ACD","#8C7B63","#2E7DB5","#D9822B","#C8473A","#3F8A5E"])}

/* 9) الثلج البحري */
function marineSnow(){let s=3;const r=()=>(s=(s*9301+49297)%233280)/233280;const pts=Array.from({length:60},()=>[30+r()*840,60+r()*300,2+r()*5]);
 return svg(900,420,"الثلج البحري: جسيمات عضوية (براز وكائنات ميتة) تسقط من السطح إلى عمق المحيط فتغذي كائنات الأعماق ويترسب بعضها في القاع",
 `<defs><linearGradient id="u3s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E7DB5"/><stop offset="1" stop-color="#0b2a45"/></linearGradient></defs><rect width="900" height="420" rx="22" fill="url(#u3s)"/><rect y="380" width="900" height="40" fill="#5A4E40"/>
 ${pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}" fill="#fff" opacity=".8"/>`).join("")}${ar("M80 70V330","#fff",5,"10 8")}
 ${T(450,40,"براز + عوالق ميتة + حيوانات ميتة",22,"#fff")}${T(720,250,"غذاء لكائنات الأعماق",20,"#FFD58A")}${T(450,405,"رواسب القاع (سنوات طويلة)",20,"#fff")}`,["#fff"])}

return {REL,symb,oceanZones,vent,pyramid,energyFate,nutCycle,upwelling,PROC,replenish,marineSnow};
})());
