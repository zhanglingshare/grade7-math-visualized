/* 156道基于原卷失分考点的变式题：纯前端题库，可复核可重做。
   不将变式题记为真实错题。孩子记录只留在本浏览器。 */
(function(){
"use strict";
function byId(id){return document.getElementById(id)}
function rnd(seed){var state=seed>>>0;return function(){state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296}}
function pick(r,a,b){return a+Math.floor(r()*(b-a+1))}
function fmt(n){var x=Math.round(n*10000)/10000;return String(Object.is(x,-0)?0:x).replace(/-/g,"−")}
function sup(n){return String(n).replace(/-/g,"⁻").replace(/[0-9]/g,function(x){return "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(x)]})}
function sci(n){if(!n)return "0";var e=Math.floor(Math.log10(Math.abs(n))),a=Math.round(n/Math.pow(10,e)*10000)/10000;return fmt(a)+"×10"+sup(e)}
function fraction(n){if(!n)return "不存在";if(n===1||n===-1)return fmt(n);return (n<0?"−":"")+"1/"+Math.abs(n)}
function grade(t,r,q,a,w,why,think){return {id:t+"-"+String(r).padStart(2,"0"),topic:t,index:r,question:q,correct:String(a),wrongs:w.map(String),why:why,think:think}}
var gates={
reciprocal:["先判断题目在问什么？",["求倒数（乘积应为1）","求相反数（和为0）","求绝对值"],0,"倒数的条件是两个数相乘得1，0没有倒数。"],
sign:["这道题先检查什么？",["只看数字，不管负号","底数、括号和乘方先后","先随便去括号"],1,"没有括号时，−2²是−(2²)。"],
jump:["数轴题先辨别什么？",["最终位置或到0的距离","跳的次数是否为奇数就够了","只数向右的总步数"],0,"位置可能有正负，距离不能为负。"],
symmetric:["这题最先看什么？",["谁写在前面","满足绝对值条件的整数范围","只看正整数"],1,"要注意不等号是否包括端点，也要算上负数与0。"],
branch:["流程题先做哪一步？",["直接选择最后一步","先计算中间结果，再判断条件","把输入值当输出"],1,"按照图的顺序逐步执行，不能跳过判断。"],
mixed:["混合运算先检查什么？",["乘方、绝对值与括号","从左到右见到加号就先加","把负号先全部删掉"],0,"先处理高优先级部分，尤其−a²与(−a)²不同。"],
science:["这题需要先确定什么？",["单位以及数量级","只要数字小就一定为0","只看小数点后有几位"],0,"数量级有助于发现算错10倍的问题。"],
conditions:["给了|m|=k，应当？",["只考虑m为正","只考虑m为负","正负两种可能都考虑"],2,"绝对值等于正数意味着左右各一个可能。"],
sorting:["比较带符号表达式，先做什么？",["只看前面的减号","将每个表达式化为一个数再比较","绝对值大的必定更大"],1,"先化简，再按数轴从左到右比较。"],
algebra:["a、b互为相反数时，最先利用？",["a+b=0且a=−b","a=b>0","随意代入一个数后就结束"],0,"根据条件推导一般关系，不靠一个例子猜答案。"],
binary:["不同进制首先检查什么？",["数字长得像不像","每位的位权","把二进制按十进制直接读"],1,"二进制位权从右向左依次是1、2、4、8……"],
telescoping:["看到连续分式求和，先观察？",["能否拆成相邻项抵消的形式","每一项直接相加小数","只保留第一项"],0,"1/[n(n+k)]=(1/k)(1/n−1/(n+k))。"],
route:["货车题先区分哪两种量？",["位置与累计路程","向东与向南的名称","路程与速度一定相等"],0,"路程分段取绝对值相加，位移则带方向。"]
};
var topics=[
{id:"reciprocal",number:6,title:"倒数与零",why:"倒数的条件，不是变号",gen:function(i,r){
 var n=i===0?0:i===1?-1:i===2?1:pick(r,2,9)*(i%2?-1:1),a=fraction(n),wr=n===0?["0","1","无穷大"]:n===-1?["1","0","不存在"]:n===1?["−1","0","不存在"]:[fraction(-n),fmt(n),fmt(-n)];
 return grade(this.id,i,"求 "+fmt(n)+" 的倒数。",a,wr,n===0?"0乘任何数都等于0，所以不存在与0相乘得1的数。":fmt(n)+"×("+a+")=1。",gates[this.id])
}},
{id:"sign",number:9,title:"负号与乘方",why:"括号是底数的边界",gen:function(i,r){
 var n=pick(r,2,5),type=i%4,ans=type===0?-(n*n):type===1?n*n:type===2?-(n*n*n):-(n*n),q=type===0?"−"+n+"²":type===1?"(−"+n+")²":type===2?"(−"+n+")³":"−(−"+n+")²";
 return grade(this.id,i,"计算："+q,fmt(ans),[fmt(-ans),fmt(n*n),fmt(-n)],type===1?"括号内整个负数平方，得到正数。":type===2?"负数奇次幂为负。":"外面的负号没有参加平方，仍要保留。",gates[this.id])
}},
{id:"jump",number:10,title:"交替跳跃",why:"两跳一组，先找规律",gen:function(i,r){
 var n=5+i*3,position=n%2?(n+1)/2:-n/2,dist=Math.abs(position),askDistance=i%2===0;
 return grade(this.id,i,"从0出发：第1跳右1，第2跳左2，依此交替。第"+n+"跳后，"+(askDistance?"离0有几格？":"坐标是多少？"),fmt(askDistance?dist:position),[fmt(-position),fmt(n),fmt(dist+1)],"偶数跳2k次后坐标−k；奇数跳2k+1次后坐标k+1。"+n+"跳后坐标"+fmt(position)+"，距离"+dist+"格。",gates[this.id])
}},
{id:"symmetric",number:12,title:"绝对值范围与求和",why:"个数不等于总和",gen:function(i,r){
 var k=pick(r,3,8),mode=i%3,q,ans,wr,why;
 if(mode===0){q="满足 |x|＜"+k+" 的整数共有几个？";ans=2*k-1;wr=[2*k+1,2*k, k];why="范围是−"+(k-1)+"到"+(k-1)+"，包括0，一共有"+ans+"个。"}
 else if(mode===1){q="满足 |x|＜"+k+" 的所有整数相加，和是多少？";ans=0;wr=[2*k-1,k, -k];why="正负成对抵消，最后留下0。"}
 else{q="满足 |x|＜"+k+" 的所有正整数相加，和是多少？";ans=k*(k-1)/2;wr=[k*(k+1)/2,2*k-1,k-1];why="正整数从1加到"+(k-1)+"，总和"+ans+"。"}
 return grade(this.id,i,q,fmt(ans),wr.map(fmt),why,gates[this.id])
}},
{id:"branch",number:15,title:"流程与判断",why:"一步一步执行条件",gen:function(i,r){
 var x=pick(r,-6,6),limit=8+2*(i%3),sub=10+i%4,add=4+i%4,n=x*x,ans=n>limit?n-sub:n+add;
 return grade(this.id,i,"输入 "+fmt(x)+" → 平方 → 如果结果＞"+limit+" 则减"+sub+"，否则加"+add+"。输出？",fmt(ans),[fmt(n),fmt(n+(n>limit?add:-sub)),fmt(x+(n>limit?-sub:add))],"先平方为"+n+"，"+(n>limit?"大于":"不大于")+limit+"，所以"+(n>limit?"减"+sub:"加"+add)+"，输出"+fmt(ans)+"。",gates[this.id])
}},
{id:"mixed",number:16,title:"混合运算顺序",why:"符号与优先级不要混",gen:function(i,r){
 var a=pick(r,1,4),b=pick(r,3,9),c=pick(r,2,5),d=pick(r,1,7),ans=-(a*a)+b+c*c-d;
 return grade(this.id,i,"计算：−"+a+"²＋"+b+"＋(−"+c+")²－|−"+d+"|",fmt(ans),[fmt(a*a+b+c*c-d),fmt(-(a*a)+b-c*c-d),fmt(-(a*a)+b+c*c+d)],"先算−"+a+"²＝"+fmt(-(a*a))+"、(−"+c+")²＝"+c*c+"、|−"+d+"|＝"+d+"，再做加减得"+fmt(ans)+"。",gates[this.id])
}},
{id:"science",number:17,title:"科学记数与数量级",why:"先估结果大约几个零",gen:function(i,r){
 var million=2+(i%8),mass=90*million,correct=sci(mass);
 return grade(this.id,i,"氢气每立方厘米约0.00009克，"+million+"百万立方厘米氢气的质量是多少？用科学记数法表示（克）。",correct,[sci(mass/10),sci(mass*10),sci(million*.00009)],million+"×10⁶ × 9×10⁻⁵ ＝"+fmt(mass)+"克＝"+correct+"克。",gates[this.id])
}},
{id:"conditions",number:18,title:"相反数倒数与双解",why:"有两种m，不能漏掉一个",gen:function(i,r){
 var k=2+i,lo=1-k,hi=1+k,correct=fmt(lo)+"或"+fmt(hi);
 return grade(this.id,i,"a与b互为相反数，c与d互为倒数，|m|＝"+k+"。m＋cd＋a＋b 的可能值？",correct,[fmt(lo),fmt(hi),fmt(-k-1)+"或"+fmt(k-1)],"a+b＝0、cd＝1、m＝±"+k+"；因此m+1＝"+correct+"。",gates[this.id])
}},
{id:"sorting",number:19,title:"符号表达式比较",why:"先化简，再比较大小",gen:function(i,r){
 var a=2+(i%7),b=2+((i*3+2)%7);if(b===a)b+=1;
 var c=1+(i%3),d=2+(i%4);
 var options=["−|−"+a+"|","−"+b,"(−"+c+")²","−(−"+d+")"],values=[-a,-b,c*c,d],min=Math.min.apply(null,values),idx=values.indexOf(min);
 return grade(this.id,i,"下面四个表达式中，哪个表示的数最小？",options[idx],options.filter(function(_,j){return j!==idx}),"依次化简为"+values.map(fmt).join("、")+"；其中最小的是"+fmt(min)+"。",gates[this.id])
}},
{id:"algebra",number:20,title:"符号条件推理",why:"不用盲目代入具体数",gen:function(i,r){
 var k=2+i,mode=i%5,expr=["a＋b","a÷b","|a|÷a","−|b|÷b",fmt(k)+"|bc|÷(bc)"][mode],ans=[0,-1,1,1,k][mode];
 return grade(this.id,i,"已知c＜b＜0＜a，|a|＝|b|。求 "+expr+" 的值。",fmt(ans),[fmt(-ans),fmt(ans+1),fmt(ans-1)],"a与b互为相反数；a＞0、b＜0、bc＞0。根据符号化简得"+fmt(ans)+"。",gates[this.id])
}},
{id:"binary",number:21,title:"二进制翻译",why:"位权1、2、4、8……",gen:function(i,r){
 var n=7+i*4,bin=n.toString(2),from=i%2===0,answer=from?bin:fmt(n);
 return grade(this.id,i,from?"十进制"+n+"写成二进制，结果是？":"二进制("+bin+")₂换成十进制是多少？",answer,from?[(n+1).toString(2),(n-1).toString(2),String(n)]:[fmt(n+1),fmt(n-1),String(Number(bin))],from?"将"+n+"逐次除以2取余，倒序读得到("+bin+")₂。":"二进制("+bin+")₂按位权展开，相加得到"+n+"。",gates[this.id])
}},
{id:"telescoping",number:22,title:"裂项与规律求和",why:"中间项抵消，只剩两端",gen:function(i,r){
 var k=2+(i%4),m=3+i,start="1/(1×"+(1+k)+")",last=1+(m-1)*k,den=1+m*k,answer=m+"/"+den;
 return grade(this.id,i,"求和："+start+"＋1/("+(1+k)+"×"+(1+2*k)+")＋…＋1/("+last+"×"+den+")（共"+m+"项）。",answer,[(m-1)+"/"+den,m+"/"+(den-k),"1/"+den],"每项都拆成(1/"+k+")(1/n－1/(n+"+k+"))；中间项抵消，剩(1/"+k+")(1－1/"+den+")＝"+answer+"。",gates[this.id])
}},
{id:"route",number:23,title:"货车坐标与路程",why:"方向带符号，路程非负",gen:function(i,r){
 var a=2+(i%5),b=1.5+(i%3),c=a+b+2+(i%4),pos=a+b-c,home=-pos,road=a+b+c+home,mode=i%3,q,ans,wrong,why;
 var stem="货车从0出发：向东"+fmt(a)+"km，再向东"+fmt(b)+"km，向西"+fmt(c)+"km，最后返回起点。";
 if(mode===0){q=stem+"返回前的坐标是多少？（东正西负）";ans=pos;wrong=[-pos,a+b+c,road];why="有向位移＝"+a+"＋"+b+"－"+c+"＝"+fmt(pos)+"km。"}
 else if(mode===1){q=stem+"全程总路程是多少千米？";ans=road;wrong=[pos,c,a+b+c];why="路程＝"+a+"＋"+b+"＋"+c+"＋"+fmt(home)+"＝"+fmt(road)+"km。"}
 else{q=stem+"每千米耗油0.2升，全程耗油多少升？";ans=Math.round(road*.2*100)/100;wrong=[Math.abs(pos)*.2,c*.2,road*.1];why="总路程"+fmt(road)+"km，油耗＝路程×0.2＝"+fmt(ans)+"升。"}
 return grade(this.id,i,q,fmt(ans),wrong.map(fmt),why,gates[this.id])
}}
];
var bank=[];
topics.forEach(function(topic,topicIndex){var r=rnd(1007+topic.number*15487);for(var i=0;i<12;i++)bank.push(topic.gen(i,r))});
function choices(q){var all=[q.correct].concat(q.wrongs),uniq=[];all.forEach(function(c){c=String(c);if(uniq.indexOf(c)<0)uniq.push(c)});
 var x=0;while(uniq.length<4&&x++<30){var n=parseFloat(q.correct.replace(/−/g,"-"));var fallback=Number.isFinite(n)?fmt(n+2+x):"备选"+x;if(uniq.indexOf(fallback)<0)uniq.push(fallback)}
 var r=rnd(q.id.split("").reduce(function(n,ch){return(n*31+ch.charCodeAt(0))>>>0},17));
 for(var i=uniq.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),t=uniq[i];uniq[i]=uniq[j];uniq[j]=t}
 return uniq.slice(0,4)
}
bank.forEach(function(q){q.options=choices(q)});
if(bank.length!==156||new Set(bank.map(function(q){return q.id})).size!==156||bank.some(function(q){return q.options.length!==4||new Set(q.options).size!==4||!q.options.includes(q.correct)||q.think[2]<0||q.think[2]>=q.think[1].length})){throw new Error("题库验证失败")}
var STORAGE="grade7:practice:v1";var records={};
try{records=JSON.parse(localStorage.getItem(STORAGE)||"{}")||{}}catch(e){records={}}
function persist(){try{localStorage.setItem(STORAGE,JSON.stringify(records))}catch(e){byId("feedback").textContent="浏览器无法保存记录；当前练习仍然可以继续。"}}
var topicIndex=0,questionIndex=0,stage=0,picked=-1;
function topicItems(){var t=topics[topicIndex],all=bank.filter(function(q){return q.topic===t.id});if(byId("practiceMode").value==="wrong")return all.filter(function(q){return records[q.id]&&records[q.id].lastCorrect===false});return all}
function card(topic){var answered=bank.filter(function(q){return q.topic===topic.id&&records[q.id]&&records[q.id].lastCorrect}).length;return answered}
function progress(){var good=0,wrong=0;bank.forEach(function(q){var rec=records[q.id];if(rec){if(rec.lastCorrect)good++;else if(rec.attempts>0)wrong++}});
 byId("masteredCount").textContent=good;byId("wrongCount").textContent=wrong;
 var list=byId("topicList");list.replaceChildren();topics.forEach(function(t,i){var b=document.createElement("button");b.type="button";b.className="topic-btn"+(i===topicIndex?" active":"");b.setAttribute("aria-pressed",String(i===topicIndex));
 var no=document.createElement("span");no.className="topic-no";no.textContent=t.number;
 var name=document.createElement("span");name.className="topic-desc";var strong=document.createElement("strong");strong.textContent=t.title;var small=document.createElement("small");small.textContent=t.why;name.appendChild(strong);name.appendChild(small);
 var done=document.createElement("span");done.className="topic-amount";done.textContent=card(t)+"/12";b.appendChild(no);b.appendChild(name);b.appendChild(done);
 b.addEventListener("click",function(){topicIndex=i;questionIndex=0;stage=0;picked=-1;draw()});list.appendChild(b)})
}
function choiceButton(text,index,act,feedbackClass,disabled){var b=document.createElement("button");b.type="button";b.className="answer"+(feedbackClass?" "+feedbackClass:"");b.disabled=!!disabled;
 var no=document.createElement("b");no.textContent=String.fromCharCode(65+index);var content=document.createElement("span");content.textContent=text;b.appendChild(no);b.appendChild(content);b.addEventListener("click",act);return b}
function draw(){progress();var set=topicItems(),topic=topics[topicIndex],i=Math.max(0,Math.min(questionIndex,Math.max(0,set.length-1)));questionIndex=i;
 byId("topicBadge").textContent="原卷第"+topic.number+"题相关 · "+topic.title;
 byId("questionIndex").textContent=set.length?"第"+(i+1)+"题 / "+set.length+"题 · 原题变式":"当前没有待重练题";
 byId("progressBar").style.width=(card(topic)/12*100)+"%";
 byId("prevQuestion").disabled=i===0||!set.length;byId("nextQuestion").disabled=!set.length||i>=set.length-1;byId("nextQuestion").textContent=i>=set.length-1?"下一组考点 →":"下一题 →";if(set.length&&i>=set.length-1&&topicIndex<topics.length-1)byId("nextQuestion").disabled=false;
 var area=byId("answerChoices");area.replaceChildren();
 if(!set.length){byId("questionText").textContent="这一组目前没有待重练题。";byId("questionPrompt").textContent="可以切回“全部12道”，继续练新题。";byId("feedback").textContent="只有曾经答错、且尚未重练答对的题才进入这里。";byId("stepThink").className="";byId("stepAnswer").className="";byId("practicePaper").dataset.paperId="";return}
 var q=set[i];byId("questionText").textContent=q.question;
 byId("stepThink").className=stage===0?"active":"done";byId("stepAnswer").className=stage===1?"active":"";
 var slot=byId("practicePaper");slot.dataset.paperId=q.id;var existing=slot.querySelector(".dn-root");if(existing&&existing.dataset.dnKey!=="bank:"+q.id)existing.remove();
 if(stage===0){
  byId("questionPrompt").textContent=q.think[0];byId("feedback").textContent="先选解题方向，想清楚再计算。";
  q.think[1].forEach(function(t,j){area.appendChild(choiceButton(t,j,function(){
   if(j!==q.think[2]){byId("feedback").textContent="这一步思路还没对准题意。重新读题再选。";return}
   stage=1;draw()
  },"",false))})
 }else{
  byId("questionPrompt").textContent="现在再计算或判断正确结果：";
  if(picked<0)byId("feedback").textContent="不要急着点，先判断正负号、括号或数量级。";
  else{
   var r=records[q.id]||{},yes=picked===q.options.indexOf(q.correct);
   byId("feedback").textContent=(yes?"算对了。":"这题需要再练。")+" "+q.why;
  }
  q.options.forEach(function(t,j){var answerState=picked<0?"":t===q.correct?"correct":j===picked?"incorrect":"";
   area.appendChild(choiceButton(t,j,function(){
    if(picked>=0)return;
    picked=j;var right=q.correct===q.options[j],entry=records[q.id]||{attempts:0,everWrong:false,lastCorrect:false};
    entry.attempts++;if(!right)entry.everWrong=true;entry.lastCorrect=right;entry.lastAnswer=q.options[j];records[q.id]=entry;persist();
    if(byId("practiceMode").value==="wrong"&&right){
     area.querySelectorAll(".answer").forEach(function(btn,k){btn.disabled=true;btn.classList.toggle("correct",q.options[k]===q.correct);btn.classList.toggle("incorrect",k===j&&!right)});
     byId("feedback").textContent="这题重练答对了，已从待重练列表移除。"+q.why;
     progress();byId("nextQuestion").disabled=false;byId("nextQuestion").textContent="继续练下一题 →";
    }else draw();
   },answerState,picked>=0))
  })
 }
}
function startQuestion(idx){questionIndex=idx;stage=0;picked=-1;draw()}
byId("practiceMode").addEventListener("change",function(){startQuestion(0)});
byId("prevQuestion").addEventListener("click",function(){startQuestion(Math.max(0,questionIndex-1))});
byId("nextQuestion").addEventListener("click",function(){
 var pool=topicItems();
 if(byId("practiceMode").value==="wrong"&&picked>=0){startQuestion(Math.min(questionIndex,Math.max(0,pool.length-1)));return;}
 if(questionIndex>=pool.length-1){if(topicIndex<topics.length-1){topicIndex++;byId("practiceMode").value="all";startQuestion(0)}return;}
 startQuestion(questionIndex+1);
});
byId("resetTopic").addEventListener("click",function(){if(!window.confirm("重新练这一组12题？只清除该组的作答进度，不删除其他组。"))return;var name=topics[topicIndex].id;bank.filter(function(q){return q.topic===name}).forEach(function(q){delete records[q.id]});persist();byId("practiceMode").value="all";startQuestion(0)});
var hand=byId("practiceHandwriting");
hand.addEventListener("toggle",function(){if(hand.open){var n=byId("practicePaper");n.setAttribute("data-paper-id",n.dataset.paperId||"")}}); 
draw();
window.MathPracticeBank={topics:topics,bank:bank}; // 可在浏览器控制台复核题库，不收集用户资料
})();
