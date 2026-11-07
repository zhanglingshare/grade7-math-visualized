/* Chapter 1旧题升级：仅附加新实验，不改原动画或原题；2026-11 */
(function(){
"use strict";
var lessons=__C1_BANK__;
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