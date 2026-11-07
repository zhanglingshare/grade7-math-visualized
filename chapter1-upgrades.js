/* Chapter 1旧题升级：仅附加新实验，不改原动画或原题；2026-11 */
(function(){
"use strict";
var lessons=function G(p,a,b,c,i,why){return [p,[a,b,c],i,why]}
function Q(title,gates,answer,accepted,why,visual,tag){return {title:title,gates:gates,answer:answer,accepted:accepted,why:why,visual:visual,tag:tag}}
var lessons=[
{id:"1-1",focus:"先读符号在现实中的意义，别看见负号就认定在做减法",items:[
Q("收入记作＋50元，那么支出20元记作什么？",[
G("这里要记录的是？","收入","支出","收支差",1,"支出是与收入意义相反的量。"),
G("收入为正，支出的符号？","负","正","没区别",0,"约定相反意义的量用相反符号。"),
G("这个数和0比？","大于0","小于0","等于0",1,"支出记负数。")],"−20",["-20"],"支出20元记作−20元。不要误解为从50元减去20元。",{type:"sign",n:-20,unit:"元"},"原小思考"),
Q("海平面以下30米，记作多少米？",[
G("题目以哪里为0？","海平面","海底","山顶",0,"先确定基准面。"),
G("“以下”应该记？","正数","负数","零",1,"低于基准面是负方向。"),
G("这个位置在0的？","上方","下方","就是0",1,"高度为负。")],"−30",["-30"],"记作−30米。正负是相对基准约定的。",{type:"sign",n:-30,unit:"米"},"海拔变式"),
Q("零下3℃后来升高5℃，现在是多少℃？",[
G("“升高5℃”意味着？","加5","减5","直接变5",0,"从原有温度加上正向变化。"),
G("正确算式是？","−3−5","−3＋5","3＋5",1,"从−3起，向右走5。"),
G("结果在哪一侧？","0右边","0左边","等于0",0,"−3加5跨过原点。")],"2",["2","+2"],"−3＋5＝2℃。",{type:"line",a:-3,b:2,unit:"℃"},"温度变化"),
Q("零下5℃和零下1℃，哪一个更冷？请填温度数值。",[
G("题目在比较？","气温谁更低","哪个数的绝对值更小","温差是多少",0,"比较温度的大小。"),
G("数轴上温度越低就？","越靠右","越靠左","越靠近0",1,"温度数值越小越靠左。"),
G("哪一个更靠左？","−1","−5","0",1,"−5比−1小。")],"−5",["-5"],"−5℃比−1℃更冷。",{type:"line",a:-1,b:-5,unit:"℃"},"负数比较")
]},
{id:"1-2",focus:"先找0、单位与正方向，分清数值、坐标、距离",items:[
Q("−3和−1哪个更大？",[
G("题目问的是？","绝对值","数值大小","相反数",1,"不是比较距离。"),
G("数轴上越靠右的数？","越大","越小","始终为正",0,"数轴越往右，数越大。"),
G("哪个更靠右？","−3","−1","相同",1,"−1在−3右边。")],"−1",["-1"],"−3＜−1。",{type:"line",a:-3,b:-1},"原小思考"),
Q("点A在−4，它到0的距离是几格？",[
G("问的是？","坐标","距离","方向",1,"距离与坐标不是一回事。"),
G("距离应该看？","−4","|−4|","4−(−4)",1,"到0距离取绝对值。"),
G("距离可能为负吗？","可以","不可以","随便",1,"距离是非负数。")],"4",["4"],"距离为4格，点坐标−4不等于距离−4。",{type:"line",a:-4,b:0,unit:"格"},"距离辨别"),
Q("离0恰好2格的点，有哪两个可能坐标？",[
G("“离0”只确定？","方向","距离","正负号",1,"没有限制左右。"),
G("需要考虑几个方向？","1个","2个","3个",1,"0左右各一处。"),
G("正确的一组是？","−2与2","0与2","−2与0",0,"两个点关于0对称。")],"−2，2",["-2,2","2,-2","±2"],"−2和2都离0有2格。",{type:"mirror",n:2},"两个答案"),
Q("从−2出发向右走5格，终点坐标是多少？",[
G("起点在哪？","0","−2","5",1,"起点是−2，不是0。"),
G("向右5格，应该？","加5","减5","乘5",0,"向右是加正向位移。"),
G("终点在0的？","左侧","右侧","原点",1,"−2加5会过0。")],"3",["3"],"−2＋5＝3。",{type:"line",a:-2,b:3,unit:"格"},"位置变式")
]},
{id:"1-3",focus:"先辨认题目要相反数、绝对值还是倒数",items:[
Q("−5的相反数是多少？",[
G("题目要找？","相反数","绝对值","倒数",0,"相反数相加等于0。"),
G("求相反数的规则是？","改变符号","乘5","变成倒数",0,"位置关于0对称。"),
G("结果在哪？","0左边","0右边","等于0",1,"−5的相反数是5。")],"5",["5"],"−5＋5＝0。",{type:"mirror",n:5},"相反数"),
Q("|−7|等于多少？",[
G("竖线表示？","求绝对值","求倒数","减法",0,"绝对值是到0的距离。"),
G("距离可以为负吗？","不能","能","随情况",0,"距离不小于0。"),
G("离0七格，距离是？","−7","7","0",1,"只谈远近不谈方向。")],"7",["7"],"|−7|＝7。",{type:"line",a:-7,b:0,unit:"格"},"原小思考"),
Q("|x|＝5，x有哪两种可能？",[
G("绝对值限定什么？","距离为5","只有正数","只有负数",0,"距离对左右两个点相同。"),
G("应该考虑？","只有1个解","左右2个解","无解",1,"左右各一个。"),
G("哪一组正确？","−5、5","0、5","−1、1",0,"两数到0都为5。")],"−5，5",["-5,5","5,-5","±5"],"x＝−5或x＝5。不要漏掉负数解。",{type:"mirror",n:5},"原小思考"),
Q("−|4|等于多少？",[
G("先做什么？","外侧负号","竖线内绝对值","随便",1,"先处理绝对值。"),
G("|4|得到？","−4","4","0",1,"4离0有4格。"),
G("外侧的负号最后得到？","正数","负数","0",1,"负号在绝对值外。")],"−4",["-4"],"−|4|＝−4，外面的负号不是绝对值的一部分。",{type:"line",a:0,b:-4},"易错题")
]},
{id:"1-4",focus:"把减法转成加法，再由加上的数决定方向",items:[
Q("(−6)＋10＝？",[
G("数轴起点是什么？","0","−6","10",1,"先站在−6。"),
G("加正10向哪里移动？","左","右","不动",1,"加正数向右。"),
G("终点的符号会是？","正","负","0",0,"从−6右移10会过0。")],"4",["4"],"−6＋10＝4。",{type:"line",a:-6,b:4},"原小思考"),
Q("(−3)−4＝？",[
G("减去的是？","正4","负4","0",0,"减去正数4。"),
G("改成加法是哪一个？","−3＋4","−3＋(−4)","−3×4",1,"减正4＝加负4。"),
G("小球往？","右","左","不动",1,"加负数向左。")],"−7",["-7"],"−3−4＝−7。",{type:"line",a:-3,b:-7},"原小思考"),
Q("3＋(−2)＝？",[
G("加上的数是？","正2","负2","0",1,"括号内是负数。"),
G("移动方向由什么决定？","前面的加号","加上的数的符号","看心情",1,"加负数向左。"),
G("比起点3？","更大","更小","相等",1,"向左走2格。")],"1",["1"],"3＋(−2)＝1，加法也可能向左。",{type:"line",a:3,b:1},"方向纠错"),
Q("3−(−2)＝？",[
G("减去的是？","正2","负2","0",1,"不要忽略括号。"),
G("转换成加法是？","3＋2","3＋(−2)","3−2",0,"减去负数等于加上正数。"),
G("终点比3？","大","小","相等",0,"向右走2格。")],"5",["5"],"3−(−2)＝5。减号并不必然意味着向左。",{type:"line",a:3,b:5},"减负纠错")
]},
{id:"1-5",focus:"先确定结果正负，再计算绝对值",items:[
Q("(−2)×3×(−4)＝？",[
G("要求什么？","乘积","加和","平均数",0,"三个数相乘。"),
G("负因数共有几个？","1","2","3",1,"−2与−4。"),
G("偶数个负因数乘积？","正","负","零",0,"无零因数，偶数个负号积为正。")],"24",["24"],"(−2)×3×(−4)＝24。",{type:"blocks",parts:["−2","×3","×−4"],result:"＋24"},"原小思考"),
Q("(−8)÷(−2)＝？",[
G("这是？","乘法","除法","减法",1,"注意除号。"),
G("同号相除得到？","正数","负数","零",0,"同号得正。"),
G("绝对值相除是多少？","4","16","6",0,"8÷2＝4。")],"4",["4"],"(−8)÷(−2)＝4。",{type:"blocks",parts:["−8","÷−2"],result:"4"},"除法变式"),
Q("6÷(−2)＝？",[
G("除数是哪一个？","6","−2","−6",1,"除号右边是−2。"),
G("异号相除的符号？","正","负","零",1,"异号得负。"),
G("结果的绝对值？","3","8","12",0,"6÷2＝3。")],"−3",["-3"],"6÷(−2)＝−3。",{type:"blocks",parts:["6","÷−2"],result:"−3"},"符号判断"),
Q("(−3)×5＝？",[
G("哪一个因数为负？","−3","5","都为负",0,"−3是负数。"),
G("负×正结果？","负","正","零",0,"负正异号得负。"),
G("绝对值是多少？","8","15","2",1,"3×5＝15。")],"−15",["-15"],"(−3)×5＝−15。",{type:"blocks",parts:["−3","×5"],result:"−15"},"换数字")
]},
{id:"1-6",focus:"看清括号范围，先确认底数，再判断幂的符号",items:[
Q("(−2)³＝？",[
G("底数是谁？","2","−2","3",1,"有括号，−2整体为底数。"),
G("三次方是？","−2×3","三个−2相乘","两个−2相乘",1,"重复乘3次。"),
G("负数奇次方的符号？","负","正","零",0,"3个负因数，积为负。")],"−8",["-8"],"(−2)³＝−8。",{type:"blocks",parts:["−2","×−2","×−2"],result:"−8"},"原小思考"),
Q("−2²＝？",[
G("没有括号，乘方底数是？","−2","2","−1",1,"幂作用于2。"),
G("先算哪一步？","先算2²","先把负号放进平方","先算−2×−2",0,"乘方优先。"),
G("最终符号是？","正","负","零",1,"外侧负号仍保留。")],"−4",["-4"],"−2²＝−(2²)＝−4，不等于(−2)²。",{type:"blocks",parts:["2","×2","外侧−"],result:"−4"},"括号雷达"),
Q("(−2)²＝？",[
G("底数是？","2","−2","−1",1,"括号包含负号。"),
G("两个−2相乘结果？","负","正","零",1,"负×负＝正。"),
G("数值大小？","2","4","8",1,"2×2＝4。")],"4",["4"],"(−2)²＝4，与−2²＝−4不同。",{type:"blocks",parts:["−2","×−2"],result:"＋4"},"对照题"),
Q("2¹⁰与10²，较大的值是多少？",[
G("题目真正要求？","较大数的数值","两数相乘","两数相加",0,"要先算两个幂。"),
G("2¹⁰和10²分别是？","20和20","1024和100","100和1024",1,"指数不等于简单乘法。"),
G("哪一个更大？","2¹⁰","10²","相同",0,"1024比100大。")],"1024",["1024"],"2¹⁰＝1024＞10²＝100。",{type:"blocks",parts:["2","×2","×…","×2"],result:"1024"},"原小思考")
]},
{id:"1-7",focus:"位置可以是负的，距离与总路程都不能是负的",items:[
Q("A从0向右2格/秒，B从12向左1格/秒。几秒相遇？",[
G("问的是？","相遇时间","相遇坐标","距离原点多远",0,"先求时间。"),
G("相向而行，每秒缩短？","2−1格","2＋1格","1格",1,"相对速度3格/秒。"),
G("初始距离12，相遇约？","4秒","12秒","6秒",0,"12÷3＝4。")],"4",["4"],"相遇时间4秒，位置为8。",{type:"line",a:0,b:8,unit:"格"},"原小思考"),
Q("青蛙从0开始奇数次右跳、偶数次左跳，步长依次1、2、3…，第99跳离0多远？",[
G("题目问？","第99跳的路程总和","最终坐标到0距离","速度",1,"距离不是累计路程。"),
G("每两跳净位移？","＋1","−1","0",1,"(2k−1)−2k＝−1。"),
G("98跳后在−49，再右跳99，结果？","50","−50","−148",0,"−49＋99＝50。")],"50",["50"],"99跳后在50，离0也是50。",{type:"line",a:-49,b:50,unit:"格"},"试卷迁移"),
Q("货车东3、东2.5、西10，最后回超市。一共行驶几千米？",[
G("题目求？","最终坐标","总路程","位移",1,"路程是走过的长度累加。"),
G("向西10千米，算路程时？","加10","减10","忽略",0,"方向不影响这段路程的长度。"),
G("从−4.5回到0，需走？","−4.5","4.5","10",1,"返回也要算路程。")],"20",["20"],"3＋2.5＋10＋4.5＝20千米。",{type:"route",parts:[3,2.5,-10,4.5]},"试卷迁移"),
Q("从0出发东3、东2.5、西10，终点坐标？",[
G("题目求？","总路程","终点坐标","油耗",1,"坐标可以有正负。"),
G("东正西负应列式？","3＋2.5−10","3＋2.5＋10","3−2.5−10",0,"方向决定正负。"),
G("终点在0的？","右侧","左侧","恰好在0",1,"最后越过了0。")],"−4.5",["-4.5"],"3＋2.5−10＝−4.5千米。",{type:"line",a:0,b:-4.5,unit:"千米"},"一题多问")
]}];
if(!Array.isArray(lessons)||lessons.length!==7||lessons.some(function(l){return l.items.length!==4||l.items.some(function(q){return q.gates.length!==3||!q.accepted.length})})){return;}
var learned={};
function e(t,c,txt){var n=document.createElement(t);if(c)n.className=c;if(txt!==undefined)n.textContent=txt;return n}
function s(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}
function line(svg,x1,y1,x2,y2,col,w){var n=s("line");["x1","y1","x2","y2"].forEach(function(k,i){n.setAttribute(k,[x1,y1,x2,y2][i])});n.setAttribute("stroke",col);n.setAttribute("stroke-width",w||2);svg.appendChild(n);return n}
function labtext(svg,x,y,txt,col,size){var n=s("text");n.setAttribute("x",x);n.setAttribute("y",y);n.setAttribute("fill",col||"#bdcbdb");n.setAttribute("font-size",size||13);n.setAttribute("font-weight","750");n.setAttribute("text-anchor","middle");n.textContent=txt;svg.appendChild(n)}
function draw(v,host){host.replaceChildren();if(!v)return;var svg=s("svg");svg.setAttribute("viewBox","0 0 600 126");svg.setAttribute("role","img");
 if(v.type==="line"||v.type==="mirror"){var a=v.type==="mirror"?-v.n:v.a,b=v.type==="mirror"?v.n:v.b,lo=Math.min(a,b,0),hi=Math.max(a,b,0),pad=Math.max(2,(hi-lo)*.15),min=lo-pad,max=hi+pad;
  function x(n){return 35+(n-min)/(max-min)*530}
  svg.setAttribute("aria-label","数轴：从"+a+"到"+b);
  line(svg,27,65,570,65,"#c0ceda",2);var step=Math.max(1,Math.ceil((hi-lo)/12));
  for(var k=Math.ceil(lo/step)*step;k<=hi;k+=step){line(svg,x(k),59,x(k),72,"#afbecd",1);labtext(svg,x(k),91,String(k),k===0?"#f2b73f":"#afbecd",11)}
  line(svg,x(a),65,x(b),65,"#F2B73F",6);labtext(svg,(x(a)+x(b))/2,22,v.type==="mirror"?"关于0对称":"从"+a+"到"+b,"#ffe9a8",15);
  var c=s("circle");c.setAttribute("cx",x(b));c.setAttribute("cy",65);c.setAttribute("r",11);c.setAttribute("fill",b<0?"#F2604F":"#34B879");c.setAttribute("stroke","#fff");c.setAttribute("stroke-width",2);svg.appendChild(c);labtext(svg,x(b),116,String(b)+(v.unit||""),"#ffe9a8",14)
 }else if(v.type==="sign"){labtext(svg,300,28,v.n<0?"负向量（基准左侧或下方）":"正向量（基准右侧或上方）","#c1d3e6",17);var rect=s("rect");rect.setAttribute("x",v.n<0?90:300);rect.setAttribute("y",48);rect.setAttribute("width",210);rect.setAttribute("height",25);rect.setAttribute("rx",9);rect.setAttribute("fill",v.n<0?"#F2604F":"#34B879");svg.appendChild(rect);line(svg,300,36,300,94,"#fff",2);labtext(svg,300,113,String(v.n)+(v.unit||""),"#ffe9a8",16)
 }else if(v.type==="blocks"){var p=v.parts||[],width=Math.min(91,530/p.length),x0=(600-width*p.length)/2;
  p.forEach(function(t,i){var box=s("rect");box.setAttribute("x",x0+i*width+2);box.setAttribute("y",35);box.setAttribute("width",width-4);box.setAttribute("height",43);box.setAttribute("rx",10);box.setAttribute("fill",String(t).indexOf("−")>=0?"#a64b4b":"#298265");svg.appendChild(box);labtext(svg,x0+i*width+width/2,63,t,"#fff",14)});labtext(svg,300,114,"结果："+v.result,"#ffe9a8",18)
 }else if(v.type==="route"){var sum=v.parts.reduce(function(a,b){return a+Math.abs(b)},0),x1=30;v.parts.forEach(function(n,i){var w=540*Math.abs(n)/sum;var r=s("rect");r.setAttribute("x",x1);r.setAttribute("y",39);r.setAttribute("width",Math.max(0,w-3));r.setAttribute("height",30);r.setAttribute("rx",5);r.setAttribute("fill",["#35b982","#5d9af5","#f1b94d","#ed7358"][i%4]);svg.appendChild(r);labtext(svg,x1+w/2,93,String(Math.abs(n))+"km","#e5eaf1",13);x1+=w});labtext(svg,300,117,"总路程 "+sum+" km","#ffe9a8",17)}
 host.appendChild(svg);
}
function normalize(v){return String(v).trim().replace(/[−–—]/g,"-").replace(/，/g,",").replace(/\s+/g,"").replace(/^＋/,"").replace(/^\+/,"")}
function mount(l){
 var host=document.getElementById("view-"+l.id);if(!host||host.querySelector(".c1-lab"))return;
 var head=host.querySelector(".view-head");
 var jump=e("button","c1-quick","旧题升级 · 先想再写（4道可互动练习）　↓");jump.type="button";if(head&&head.nextSibling)head.parentNode.insertBefore(jump,head.nextSibling);else host.insertBefore(jump,host.firstChild);
 var lab=e("div","c1-lab");lab.id="oldq-"+l.id;var labhead=e("div","c1-head");labhead.appendChild(e("span","c1-tag","第一章旧题 · 保留原实验"));labhead.appendChild(e("strong","",l.id.replace("-",".")+" 先想 → 判断 → 动笔"));lab.appendChild(labhead);lab.appendChild(e("p","c1-explain",l.focus+"。下面题目围绕原有小思考进行升级，原演示和原题均在上方。"));
 var stage=e("div","c1-board");lab.appendChild(stage);
 var tabs=e("div","c1-tabs");stage.appendChild(tabs);
 var title=e("div","c1-scenario");stage.appendChild(title);
 var progress=e("div","c1-progress");stage.appendChild(progress);["①看题意","②找规则","③先预判","④再动笔"].forEach(function(t){progress.appendChild(e("span","",t))});
 var ask=e("div","c1-question");stage.appendChild(ask);
 var choices=e("div","c1-choices");stage.appendChild(choices);
 var message=e("div","c1-feedback");message.setAttribute("aria-live","polite");stage.appendChild(message);
 var form=e("div","c1-foot");stage.appendChild(form);
 var answer=e("input","c1-answer");answer.type="text";answer.setAttribute("inputmode","decimal");answer.setAttribute("autocomplete","off");answer.setAttribute("aria-label","结果：可用逗号分隔两个数");answer.placeholder="此时才填写答案";form.appendChild(answer);
 var check=e("button","c1-btn primary","核对");check.type="button";form.appendChild(check);
 var graphic=e("div","c1-visual");stage.appendChild(graphic);
 var count=e("div","c1-summary");stage.appendChild(count);
 var foot=e("div","c1-hint","能用自己的话解释“为什么”，比抢先写下答案更重要。");lab.appendChild(foot);
 var index=0,phase=0;
 function updateCount(){var n=0;l.items.forEach(function(q,i){if(learned[l.id+"-"+i])n++});count.textContent="本节通过 "+n+" / 4 道 · 已有旧动画、题目仍可继续使用";}
 function render(){
  var item=l.items[index];title.textContent=item.title;
  Array.prototype.forEach.call(tabs.children,function(n,i){n.classList.toggle("on",i===index)});
  Array.prototype.forEach.call(progress.children,function(n,i){n.className=i<phase?"passed":i===phase?"current":""});
  choices.replaceChildren();graphic.replaceChildren();form.style.display=phase===3?"flex":"none";updateCount();
  if(phase<3){
   var g=item.gates[phase];ask.textContent=g[0];message.textContent="先在心里说出理由，再点击。选错也可以重新思考。";
   g[1].forEach(function(label,i){var btn=e("button","c1-choice",label);btn.type="button";btn.addEventListener("click",function(){
    if(i!==g[2]){btn.classList.add("wrong");message.textContent="这一步还没想清楚。再看一遍条件和问题，换个答案试试。";return}
    btn.classList.add("right");Array.prototype.forEach.call(choices.children,function(b){b.disabled=true});
    message.textContent="判断正确："+g[3];var next=e("button","c1-btn primary","下一关 →");next.type="button";next.addEventListener("click",function(){phase++;render()});choices.appendChild(next)
   });choices.appendChild(btn)})
  }else{ask.textContent="想清楚了：现在才开始计算。";message.textContent="核对正负号、运算顺序和数量级；若有两种答案，用逗号隔开。";answer.value="";answer.focus()}
  foot.textContent="换一道旧题变式，再用同样的方法：问什么 → 有什么 → 怎么办 → 最后写。";
 }
 l.items.forEach(function(q,i){var tab=e("button","c1-btn",(i+1)+" · "+q.tag);tab.type="button";tab.addEventListener("click",function(){index=i;phase=0;render()});tabs.appendChild(tab)});
 check.addEventListener("click",function(){var q=l.items[index],v=normalize(answer.value);if(!v){message.textContent="请先填入答案，并检查符号和单位。";return}
  if(q.accepted.some(function(a){return normalize(a)===v})){learned[l.id+"-"+index]=true;message.textContent="答对了！"+q.why;draw(q.visual,graphic);foot.textContent="完成后再口头解释一次原因，再换另一道变式题。";updateCount()}
  else{message.textContent="答案还不对。先查“求的是位置还是距离、符号还是数值、底数是否带括号”，不要急着看解析。";foot.textContent="请用思考关的理由重新审视过程。即使错了，也能再次输入。"}
 });
 answer.addEventListener("keydown",function(event){if(event.key==="Enter")check.click()});
 jump.addEventListener("click",function(){lab.scrollIntoView({behavior:window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})});
 host.appendChild(lab);render()
}
lessons.forEach(mount);
})();