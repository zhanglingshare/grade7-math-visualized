(function(){
"use strict";
const KEY="math-exam-repair-2026-v1";
const missions=[
 {id:"q23",num:"23",name:"追上以后，还会相距多远？",short:"双动点与绝对值",topic:"运动建模 / 双解",evidence:"原卷第23题：位置、相遇与“距离减半”连续设问。卷面可见距离和相遇点的推导出现混淆。",rule:"位置 = 起点 + 速度×时间；距离 = 两个位置的差的绝对值。",steps:[
 {label:"原卷 · 第一步",ask:"P从−2出发，每秒向右走3个单位。t秒后，P表示哪个数？",choices:["−2 + 3t","−2 − 3t","8 − 2t"],answer:0,why:"起点是−2，向右为正，每秒增加3，所以P(t)=−2+3t。",tip:"先只追踪P：出发时t=0必须回到−2。"},
 {label:"原卷 · 第二步",ask:"Q从8出发，每秒向左走2个单位。t秒后，Q表示哪个数？",choices:["8 + 2t","8 − 2t","−2 + 3t"],answer:1,why:"向左移动使坐标减少，Q(t)=8−2t。现在可以拖动下方时间，观察两点。",tip:"当t=1时，Q应从8变成6，而不是10。"},
 {label:"原卷 · 相遇",ask:"两点相遇时，−2+3t = 8−2t。相遇发生在什么时候？",choices:["2秒，坐标4","3秒，坐标7","1秒，坐标1"],answer:0,why:"合并得到5t=10，所以t=2；代回P或Q，坐标都等于4。",tip:"相遇是“两个点位置相同”，不是“路程等于位置”。"},
 {label:"原卷 · 分类讨论",ask:"原来AB距离为10。当PQ距离为5时，可能是什么时间？",choices:["只有1秒","只有3秒","1秒和3秒"],answer:2,why:"|P−Q|=|5t−10|=5，产生5t−10=5或−5，所以t=3或t=1。相遇前后各一次。",tip:"拖到2秒，再向后移动：两点相遇后还会分开。"},
 {label:"换条件 · 陌生题",ask:"换成P从−2向右每秒2单位，Q从8向左每秒1单位。距离变成最初的一半，何时发生？",free:true,expected:[1.6666666666666667,5],format:"填两个时间，例如 5/3, 5",choices:["5/3秒或5秒","只有5/3秒","10/3秒"],answer:0,why:"新相对速度是3：|10−3t|=5，因此t=5/3或t=5。换速度也要考虑越过之后。",tip:"别套上一道题的答案；先换成新的位置表达式。"}
 ]},
 {id:"q22",num:"22",name:"四格新运算，不猜公式",short:"运算定义与代入",topic:"结构识别 / 等价运算",evidence:"原卷第22题：四格运算按ad−bc定义。第一问卷面有错，第二问虽写出正确x值，也要核对推导的每一步。",rule:"先圈a、b、c、d的位置，永远按ad−bc代入，不把这个记号当普通乘法。",steps:[
 {label:"原卷 · 识别定义",ask:"四格是［a  b；c  d］。题目定义的运算结果是什么？",choices:["ab−cd","ad−bc","ac−bd"],answer:1,why:"沿左上到右下相乘得到ad，再减去右上与左下相乘的bc。",tip:"不要记口诀；先把对角配对画出来。"},
 {label:"原卷 · 计算验证",ask:"四格［−1  2；−3  4］的值是多少？",choices:["10","2","−2"],answer:1,why:"(−1)×4−2×(−3)=−4−(−6)=2。减去负数会变为加6。",tip:"先分别算两条对角线：主对角−4，副对角−6。"},
 {label:"原卷 · 把式子装回格子",ask:"［2x−1  3x；2  1］=3，哪一个方程完全符合定义？",choices:["(2x−1)×1−(3x)×2=3","(2x−1)×2−(3x)×1=3","(2x−1)+3x+2=3"],answer:0,why:"展开得到2x−1−6x=3，即−4x=4，所以x=−1。答案对了，过程也要合法。",tip:"左上乘右下、减去右上乘左下，顺序不能换。"},
 {label:"原卷 · 变量关系",ask:"m、n互为相反数。［−3m+1  3；−n  −1］的值是多少？",choices:["1","−1","−6m−1"],answer:1,why:"(−3m+1)(−1)−3(−n)=3m−1+3n=3(m+n)−1=−1。",tip:"m+n=0，关键是先按定义得到含m+n的式子。"},
 {label:"换条件 · 陌生题",ask:"不用任何旧数值，算新四格［2  −1；3  4］的值。",free:true,expected:[11],format:"填四格运算的值",choices:["5","11","−11"],answer:1,why:"2×4−(−1)×3=8−(−3)=11。新数字也能独立套定义。",tip:"副对角线的乘积是−3，最后要减去它。"}
 ]},
 {id:"q18",num:"18",name:"两个条件，一个不能少",short:"次数与项数",topic:"约束联立 / 概念",evidence:"原卷第18题：必须同时满足“三次”和“二项式”。卷面把m取成2，忽略了xy项的总次数。",rule:"先处理项数使一项消失，再逐项相加字母指数判断总次数。",steps:[
 {label:"原卷 · 项数约束",ask:"2xᵐy² − (n−3)x + 1 是二项式。为了让中间那项消失，应取什么？",choices:["n=2","n=3","n=4"],answer:1,why:"n=3时，(n−3)x这一项系数为0，式子只剩2xᵐy²和常数1。",tip:"二项式不是“看起来有两个字母”，而是化简后有两项。"},
 {label:"原卷 · 次数约束",ask:"留下的项2xᵐy²要为三次项：m+2=3。m是多少？",choices:["0","1","2","3"],answer:1,why:"单项式的次数是各字母指数之和：m+2=3，所以m=1。",tip:"y²已有2次，再看x还剩几次，而不是只看x的指数。"},
 {label:"原卷 · 合并结论",ask:"现在m=1、n=3，那么m−n等于？",choices:["−1","−2","−3"],answer:1,why:"m−n=1−3=−2；回代后是2xy²+1，恰好是三次二项式。",tip:"先验“项数=2”和“最高次数=3”，最后才代入m−n。"},
 {label:"换条件 · 陌生题",ask:"5xᵏy+7是四次二项式，且k为正整数。k应为多少？",free:true,expected:[3],format:"填k的值",choices:["2","3","4"],answer:1,why:"xᵏy的次数是k+1=4，因此k=3；它与常数7正好构成二项式。",tip:"次数是每项字母的指数和，常数不提高最高次数。"}
 ]},
 {id:"q19",num:"19",name:"偶次幂与分支，谁被漏掉？",short:"负号与全部可能",topic:"偶次幂 / 分类讨论",evidence:"原卷第19题：m为最大的负整数、|n|=2。卷面列出了两个n，但在m的偶次幂和符号运算上出现偏差。",rule:"奇偶决定负数乘方的符号；|n|=2必须保留n=2与n=−2两条路。",steps:[
 {label:"原卷 · 偶次幂",ask:"最大的负整数m=−1，那么m²⁰²⁶等于多少？",choices:["−1","0","1"],answer:2,why:"2026是偶数，(−1)²⁰²⁶=1；它不是−1×2026。",tip:"先在脑中试(−1)²，再想偶数个负号成对抵消。"},
 {label:"原卷 · 绝对值分支",ask:"|n|=2，所有可能的n是？",choices:["只有−2","只有2","−2和2"],answer:2,why:"距离原点为2的点有两个：−2和2。",tip:"绝对值谈的是到零的距离；不能只看正方向。"},
 {label:"原卷 · 完整算值",ask:"a、b互为倒数，求ab−n+m²⁰²⁶的全部可能值。",choices:["−2或2","0或4","−1或3"],answer:1,why:"ab=1，m²⁰²⁶=1，所以原式=2−n。n=2得0；n=−2得4。",tip:"把表达式先化为2−n，再逐个代入两个n。"},
 {label:"换条件 · 陌生题",ask:"仍有ab=1、m=−1，但|n|=3。求ab−n+m²⁰²⁴的全部可能值。",free:true,expected:[-1,5],format:"填两个可能值，例如 -1, 5",choices:["−1或5","1或−5","2或−2"],answer:0,why:"偶次幂仍为1，式子=2−n。n=3或−3，结果为−1或5。",tip:"指数变成另一个偶数不会改变(−1)的幂。"}
 ]},
 {id:"q21",num:"21",name:"库存减少，不等于运费算错",short:"带符号的数量",topic:"双账本 / 数量与费用",evidence:"原卷第21题：进出库表中的“净变化”卷面写成减少6吨；运费1720元的结果则正确。两问不应混为同一种错误。",rule:"数量按正负求代数和；运费按每次实际搬运吨数的非负数量求和。",steps:[
 {label:"原卷 · 净变化",ask:"进出库量依次为−4×2、5×1、−2×3、1×3、−3×2（吨）。净变化是多少？",choices:["−12吨","−6吨","+12吨"],answer:0,why:"−8+5−6+3−6=−12吨，即减少12吨。进和出要保留正负方向。",tip:"先把每一列乘次数，再把正负数相加。"},
 {label:"原卷 · 分开两本账",ask:"实际搬运的运进、运出吨数分别多少？",choices:["运进8吨，运出20吨","运进20吨，运出8吨","运进8吨，运出12吨"],answer:0,why:"运进5×1+1×3=8吨；运出4×2+2×3+3×2=20吨。净变化是8−20=−12。",tip:"费用按搬运量算；运出用正的“20吨”计算运费，不按−20吨收费。"},
 {label:"原卷 · 费用",ask:"运进每吨40元，运出每吨70元。这天总运费多少？",choices:["1720元","1400元","1200元"],answer:0,why:"8×40+20×70=320+1400=1720元。照片中的这部分计算结果正确，应保留这个能力。",tip:"先算两种业务的费用，再相加。"},
 {label:"换条件 · 陌生题",ask:"仍用同一进出库记录。如果运出运费每吨上涨10元，总费用变成？",free:true,expected:[1920],format:"填总运费（元）",choices:["1800元","1920元","2000元"],answer:1,why:"运出20吨，每吨涨10元，原费1720+20×10=1920元。无需重新计算运进费用。",tip:"把“变化部分”单独算出来，比把全部业务重算更容易核对。"}
 ]},
 {id:"q10",num:"10",name:"规律并非会写几项就结束",short:"周期与序号",topic:"周期识别 / 大序号",evidence:"原卷第10题：输入48，偶数除2，奇数加3；要求第2025次输出，重点在循环稳定之后的序号。",rule:"先实算到出现重复状态，再确认循环从第几项开始，最后处理序号的奇偶。",steps:[
 {label:"原卷 · 找到循环",ask:"48→24→12→6→3，下一次输出是什么？",choices:["0","6","3"],answer:1,why:"3是奇数，下一步要加3，变为6；之后6除2又回到3，进入3↔6的循环。",tip:"不允许只说“猜到了规律”，必须按奇偶规则核对。"},
 {label:"原卷 · 对齐序号",ask:"第1次输出24，第2次12，第3次6，第4次3，第5次6。第2025次输出？",choices:["3","6","24"],answer:1,why:"从第4次开始，偶数次输出3，奇数次（≥5）输出6。2025是奇数，所以输出6。",tip:"先核对第4、5、6、7次，再延长到第2025次。"},
 {label:"换条件 · 陌生题",ask:"改从96出发，规则不变。最后稳定反复出现的两个数是？",free:true,expected:[3,6],format:"填两个循环数，例如 3, 6",choices:["3和6","6和12","3和24"],answer:0,why:"96→48→24→12→6→3→6...。开始部分变长，最终仍进入3↔6循环。",tip:"起点变化可能改变前面的项，不能保证第2025次还是同一奇偶位置。"}
 ]}
];
const byId=Object.fromEntries(missions.map(m=>[m.id,m]));
const $=id=>document.getElementById(id);
const el={map:$("maplist"),head:$("missionhead"),scene:$("scene"),task:$("task"),stat:$("stat"),fill:$("fill")};
const safe=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const savedDefault={done:{},steps:{},attempts:{},last:"q23"};
let store=savedDefault;
try{const parsed=JSON.parse(localStorage.getItem(KEY)||"{}");if(parsed&&typeof parsed==="object")store={done:parsed.done||{},steps:parsed.steps||{},attempts:parsed.attempts||{},last:byId[parsed.last]?parsed.last:"q23"};}catch(e){}
let active=byId[(location.hash||"").replace("#","")]?(location.hash||"").replace("#",""):store.last;
let selected=null,typed="",verified=false,feedback="",bad=false,time=0,playing=null;
function save(){try{localStorage.setItem(KEY,JSON.stringify(store));}catch(e){}}
function stopMovie(){if(playing){clearInterval(playing);playing=null;}window.EXAM_REPAIR_VISUALS?.stop();}
function doneCount(){return missions.filter(m=>store.done[m.id]).length}
function renderMap(){
 const n=doneCount();el.stat.textContent=n+" / "+missions.length+" 个实验通过";el.fill.style.width=(100*n/missions.length)+"%";
 el.map.innerHTML=missions.map((m,i)=>{
 const step=Math.min(store.steps[m.id]||0,m.steps.length-1);
 return '<button type="button" class="mapitem'+(active===m.id?" active":"")+'" data-mission="'+m.id+'" aria-current="'+(active===m.id?"true":"false")+'"><span class="num">'+String(i+1).padStart(2,"0")+'</span><span class="desc"><strong>'+safe(m.short)+'</strong><small>原卷第'+m.num+'题 · '+(store.done[m.id]?"已完成":(store.steps[m.id]||0)>0?"已做 "+step+" 步":"待挑战")+'</small></span><span class="tick">'+(store.done[m.id]?"✓":"›")+'</span></button>';
 }).join("");
}
function sceneHTML(m){
 if(m.id!=="q23" && window.EXAM_REPAIR_VISUALS)return window.EXAM_REPAIR_VISUALS.render(m.id,store.steps[m.id]||0);
 if(m.id==="q23"){
  return '<div class="timeline"><svg class="line-svg" id="line-svg" viewBox="0 0 620 200" role="img" aria-label="两动点运动数轴"><line x1="32" y1="89" x2="592" y2="89" stroke="#9babb3" stroke-width="3" stroke-linecap="round"/><path d="M592 89 L580 81 L580 97 Z" fill="#9babb3"/><g id="ticks"></g><line id="distance" y1="59" y2="59" x1="0" x2="0" stroke="#f4c696" stroke-width="2" stroke-dasharray="5 4"/><circle id="pointP" r="10" cy="89" cx="0" fill="#ffac76" stroke="#112c3d" stroke-width="2"/><circle id="pointQ" r="10" cy="89" cx="0" fill="#7ee7cd" stroke="#112c3d" stroke-width="2"/><text id="nameP" y="49" text-anchor="middle" font-size="18" font-weight="850" fill="#ffbf8e">P</text><text id="nameQ" y="139" text-anchor="middle" font-size="18" font-weight="850" fill="#92f1d8">Q</text><text id="posP" y="31" text-anchor="middle" font-size="13" fill="#ffdab6"></text><text id="posQ" y="161" text-anchor="middle" font-size="13" fill="#baf5e4"></text><text x="310" y="194" text-anchor="middle" font-size="12" fill="#95b4bb">原点、方向和单位不变</text></svg><div class="timecontrols"><label><b>拖动时间，亲眼验证</b><span id="timeval">0.0 秒</span></label><input type="range" id="timerange" min="0" max="4" step="0.1" value="'+time+'" aria-label="模拟时间"><div class="time-actions"><button id="playmove" type="button">▶ 演示运动</button><small id="distancetext">距离：10单位</small></div></div></div>';
 }
 if(m.id==="q22"){
  const s=store.steps[m.id]||0;
  const vals=s>=3?["−3m+1","3","−n","−1"]:s===2?["2x−1","3x","2","1"]:["−1","2","−3","4"];
  return '<div><div class="matrix" aria-label="四格运算"><span class="bracket">|</span><div class="values">'+vals.map(v=>'<span>'+v+'</span>').join("")+'</div><span class="bracket">|</span></div><div class="eqnotes">对角线相乘再相减：<b>a×d − b×c</b></div></div>';
 }
 if(m.id==="q18"){
  const s=store.steps[m.id]||0;
  return '<div><div class="big-eq">2x<sup>m</sup>y<sup>2</sup> − (n−3)x + 1</div><div class="token-row"><span class="token '+(s>=1?"focus":"")+'">n = '+(s>=1?"3":"?")+'</span><span class="token '+(s>=2?"focus":"")+'">m = '+(s>=2?"1":"?")+'</span></div><div class="eqnotes">'+(s>=1?"中间项已变为0，": "先解决项数，再看次数。")+(s>=2?"剩余最高次数 = 1+2 = 3。":"观察还剩多少项。")+'</div></div>';
 }
 if(m.id==="q19"){
  const s=store.steps[m.id]||0;
  return '<div class="graph-cards"><div class="row"><span>a×b</span><strong>1（互为倒数）</strong></div><div class="row"><span>m = −1，m²⁰²⁶</span><strong>'+(s>=1?"1":"?")+'</strong></div><div class="row"><span>|n| = 2，n可能是</span><strong>'+(s>=2?"−2 或 2":"?")+'</strong></div><div class="branch"><div>n=2<br>值：'+(s>=3?"0":"?")+'</div><div>n=−2<br>值：'+(s>=3?"4":"?")+'</div></div></div>';
 }
 if(m.id==="q21"){
  return '<div style="width:100%"><table class="ledger" aria-label="进出库数量与次数"><thead><tr><th>单次数量</th><th>−4</th><th>+5</th><th>−2</th><th>+1</th><th>−3</th></tr></thead><tbody><tr><th>次数</th><td>2</td><td>1</td><td>3</td><td>3</td><td>2</td></tr><tr><th>合计吨数</th><td class="negative">−8</td><td class="positive">+5</td><td class="negative">−6</td><td class="positive">+3</td><td class="negative">−6</td></tr></tbody></table><div class="billbars"><div><span class="bar" style="height:40px;background:#7de4c7"></span><label>运进 8吨</label></div><div><span class="bar" style="height:100px;background:#e7ab80"></span><label>运出 20吨</label></div></div><div class="eqnotes">“净变化”与“运费”是两套计算。</div></div>';
 }
 return '<div><div class="token-row"><span class="token">48</span><span class="token">24</span><span class="token">12</span><span class="token">6</span><span class="token focus">3</span><span class="token focus">?</span></div><div class="eqnotes">偶数÷2，奇数+3<br>第1次输出24，第2次输出12……</div></div>';
}
function redrawNumberLine(){
 const svg=$("line-svg");if(!svg)return;
 const px=x=>32+((x+5)/16)*560;
 const P=-2+3*time,Q=8-2*time;const pxP=px(P),pxQ=px(Q);
 const fmt=n=>(Math.round(n*10)/10).toFixed(1).replace(/\.0$/,"");
 $("ticks").innerHTML=Array.from({length:17},(_,i)=>{const val=i-5,x=px(val);return '<line x1="'+x+'" y1="82" x2="'+x+'" y2="96" stroke="#7a9bac" stroke-width="1"/><text x="'+x+'" y="116" fill="#a6c1c5" font-size="12" text-anchor="middle">'+(val%2===0?val:"")+'</text>';}).join("");
 $("pointP").setAttribute("cx",pxP);$("pointQ").setAttribute("cx",pxQ);
 for(const id of ["nameP","posP"])$(id).setAttribute("x",pxP);
 for(const id of ["nameQ","posQ"])$(id).setAttribute("x",pxQ);
 $("posP").textContent="P="+fmt(P);$("posQ").textContent="Q="+fmt(Q);
 $("distance").setAttribute("x1",pxP);$("distance").setAttribute("x2",pxQ);
 $("timeval").textContent=time.toFixed(1)+" 秒";
 $("distancetext").textContent="距离："+fmt(Math.abs(P-Q))+"单位"+(Math.abs(P-Q)<0.05?" · 相遇！":Math.abs(Math.abs(P-Q)-5)<0.05?" · 相距原来的半程":"");
}
function paint(){
 const m=byId[active];if(!m)return;stopMovie();renderMap();
 const n=store.steps[m.id]||0,step=m.steps[Math.min(n,m.steps.length-1)],completed=!!store.done[m.id];
 el.head.innerHTML='<div><span class="eyebrow">期中卷 · 原题结构与迁移实验</span><h2>'+safe(m.name)+'</h2><p>'+safe(m.topic)+'</p></div><span class="grade">第 '+m.num+' 题</span>';
 el.scene.innerHTML='<div class="scene-top"><span>MATHEMATICS / TEST REPAIR</span><small>可操作的数学黑板</small></div><div class="visual">'+sceneHTML(m)+'</div><div class="scene-explain"><b>本题真正要建立的关系：</b>'+safe(m.rule)+'</div>';
 if(completed){
  el.task.innerHTML='<div class="complete"><span class="star" aria-hidden="true">✦</span><span class="step">本次挑战已完成</span><h3>你把这道题翻过来了。</h3><p>你通过了原题推理和一题变式。但不要靠记答案，过几天换条件再测一次。</p><div class="actions" style="justify-content:center"><button class="btn" data-action="retry">再挑战一次</button><button class="btn secondary" data-action="next-mission">换一道难题 →</button></div></div>';
 } else{
  const responseUI=step.free?'<label class="open-response">自己计算后输入答案<input id="free-answer" type="text" inputmode="text" autocapitalize="off" autocomplete="off" spellcheck="false" placeholder="'+safe(step.format)+'" value="'+safe(typed)+'"></label>':
   '<div class="choices" role="group" aria-label="请选择一个答案">'+step.choices.map((x,i)=>'<button type="button" class="choice '+(selected===i?"selected":"")+'" data-choice="'+i+'" aria-pressed="'+(selected===i?'true':'false')+'"><span class="letter">'+String.fromCharCode(65+i)+'</span><span>'+safe(x)+'</span></button>').join("")+'</div>';
  el.task.innerHTML='<div class="step">'+safe(step.label)+' · '+(n+1)+' / '+m.steps.length+'</div><h3>'+safe(step.ask)+'</h3><div class="fact">'+safe(m.evidence)+'</div>'+responseUI+
   (feedback?'<div class="feedback '+(bad?"warn":"")+'" role="status"><b>'+(bad?"先别猜下一题":"判断成立，解释一下为什么")+'</b>'+safe(feedback)+'</div>':"")+
   '<div class="actions">'+(verified?'<button class="btn dark" data-action="advance">'+(n===m.steps.length-1?"完成本关":"进入下一步 →")+'</button>':'<button class="btn" data-action="check" '+((step.free?!typed.trim():selected===null)?"disabled":"")+'>验证我的判断</button>')+'<button class="btn secondary" data-action="reset-step">重新想</button></div><p class="task-tip">错了可以再试，没有扣分。最后一道是换条件、独立写出数值的新题。</p>';
 }
 if(m.id==="q23")redrawNumberLine();
 else window.EXAM_REPAIR_VISUALS?.mount(m.id,store.steps[m.id]||0);
}
function openMission(id){
 if(!byId[id])return;active=id;store.last=id;selected=null;typed="";verified=false;bad=false;feedback="";time=0;stopMovie();save();paint();
 try{if(window.location.hash!=="#"+id)window.history.replaceState(null,"","#"+id);}catch(e){}
}
function handleChoice(index){
 const m=byId[active];if(store.done[active]||verified)return;selected=index;feedback="";bad=false;paint();
}
function parseAnswer(text){
 const parts=String(text).trim().replace(/[−﹣–]/g,"-").replace(/[，、；;和或\s]+/g,",").split(",").filter(Boolean);
 const values=parts.map(v=>{
  const match=v.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?:\/([+-]?(?:\d+(?:\.\d*)?|\.\d+)))?$/);
  if(!match)return NaN;
  const x=Number(match[1]),y=match[2]===undefined?1:Number(match[2]);
  return y===0?NaN:x/y;
 });
 return values.every(Number.isFinite)?values:[];
}
function verify(){
 const m=byId[active];if(!m||verified||store.done[active])return;
 const step=m.steps[store.steps[active]||0];
 if(step.free?!typed.trim():selected===null)return;
 store.attempts[active]=(store.attempts[active]||0)+1;
 let correct=selected===step.answer;
 if(step.free){
  const entered=parseAnswer(typed),expected=step.expected.slice().sort((a,b)=>a-b);
  correct=entered.length===expected.length && entered.slice().sort((a,b)=>a-b).every((v,i)=>Math.abs(v-expected[i])<1e-5);
 }
 if(correct){verified=true;bad=false;feedback=step.why;}
 else{verified=false;bad=true;feedback=step.tip;}
 save();paint();
}
function advance(){
 if(!verified)return;
 const m=byId[active];const n=store.steps[active]||0;
 if(n>=m.steps.length-1){store.done[active]=true;store.steps[active]=m.steps.length;selected=null;typed="";verified=false;feedback="";bad=false;save();paint();}
 else{store.steps[active]=n+1;selected=null;typed="";verified=false;feedback="";bad=false;save();paint();}
}
function resetStep(){selected=null;typed="";verified=false;feedback="";bad=false;paint();}
function retry(){store.done[active]=false;store.steps[active]=0;selected=null;typed="";verified=false;feedback="";bad=false;time=0;save();paint();}
function nextMission(){const i=missions.findIndex(m=>m.id===active);openMission(missions[(i+1)%missions.length].id);}
el.map.addEventListener("click",e=>{const b=e.target.closest("[data-mission]");if(b)openMission(b.dataset.mission);});
el.task.addEventListener("click",e=>{
 const choice=e.target.closest("[data-choice]");if(choice){handleChoice(Number(choice.dataset.choice));return;}
 const action=e.target.closest("[data-action]")?.dataset.action;
 if(action==="check")verify();if(action==="advance")advance();if(action==="reset-step")resetStep();if(action==="retry")retry();if(action==="next-mission")nextMission();
});
el.task.addEventListener("input",e=>{if(e.target.id==="free-answer"){typed=e.target.value;const b=el.task.querySelector('[data-action="check"]');if(b)b.disabled=!typed.trim();}});
el.task.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.id==="free-answer"){e.preventDefault();verify();}});
el.scene.addEventListener("input",e=>{if(e.target.id==="timerange"){stopMovie();time=Number(e.target.value);redrawNumberLine();}});
el.scene.addEventListener("click",e=>{if(e.target.closest("#playmove")){if(playing){stopMovie();e.target.textContent="▶ 演示运动";return;}
 time=0;redrawNumberLine();const b=e.target;b.textContent="■ 暂停";
 playing=setInterval(()=>{time=Math.min(4,Math.round((time+.1)*10)/10);const range=$("timerange");if(range)range.value=String(time);redrawNumberLine();if(time>=4){stopMovie();const now=$("playmove");if(now)now.textContent="▶ 重新播放";}},100);}});
window.addEventListener("pagehide",stopMovie);
window.addEventListener("hashchange",()=>{const id=(location.hash||"").slice(1);if(byId[id]&&id!==active)openMission(id);});
window.EXAM_REPAIR_VISUALS?.init();
window.EXAM_REPAIR_TEST={missions,openMission,progress:()=>({done:doneCount(),step:{...store.steps},attempts:{...store.attempts}}),correctStep:()=>{const m=byId[active];if(!m)return;const step=m.steps[store.steps[active]||0];if(step.free)typed=step.expected.join(",");else selected=step.answer;verify();},advance};
openMission(active);
})();
