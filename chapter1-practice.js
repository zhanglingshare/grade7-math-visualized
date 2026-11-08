/* 人教版七上第一章分层专项：原72道保留，新增180道（252道独立题位），只覆盖第1章知识。 */
(function(){
"use strict";
function byId(id){return document.getElementById(id)}
function rnd(seed){var v=seed>>>0;return function(){v=(Math.imul(v,1664525)+1013904223)>>>0;return v/4294967296}}
function pick(r,a,b){return a+Math.floor(r()*(b-a+1))}
function fmt(n){return String(Object.is(n,-0)?0:+n.toFixed(4)).replace(/-/g,"−")}
function grade(t,i,q,a,wrongs,why,think){return {id:t+"-"+String(i).padStart(2,"0"),topic:t,index:i,question:q,correct:String(a),wrongs:wrongs.map(String),why:why,think:think}}
var g={
signed:["这一题先看什么？",["基准和正方向的约定","数字有没有小数点","是不是能口算"],0,"正负号是相对于一个约定而言。"],
rational:["分类时主要看？",["写法","数值和定义","位数"],1,"判断是否整数要看实际数值。"],
axis:["完整数轴的要素？",["原点、正方向和单位长度","颜色","一定要画10格"],0,"三要素缺一不可。"],
opposite:["相反数的判断依据？",["两个数的积为1","两个数的和为0","两个数都小于0"],1,"相反数关于原点对称。"],
absolute:["绝对值表示？",["到0的距离","结果一定是负数","任何减法"],0,"距离不能为负。"],
compare:["比较数值大小的依据？",["数轴靠右的数更大","绝对值大的数更大","数的位数更多"],0,"负数绝对值越大，反而越小。"]
};
var topics=[
{id:"signed",number:"1.1",title:"正负数与基准",why:"先定基准，再读负号",gen:function(i,r){
var n=i+3,t=i%4;
if(t===0)return grade(this.id,i,"海平面以下"+n+"米，海平面为0，记录为多少米？",fmt(-n),[fmt(n),"0",fmt(-n-1)],"低于基准记负号。",g.signed);
if(t===1)return grade(this.id,i,"收入为正，支出"+n+"元记录为多少元？",fmt(-n),[fmt(n),"0",fmt(n+1)],"收入、支出相反意义，支出记负。",g.signed);
if(t===2)return grade(this.id,i,"向东为正，向西走"+n+"米，记作多少米？",fmt(-n),[fmt(n),"0",fmt(-n+1)],"西与约定的东相反。",g.signed);
return grade(this.id,i,"与250克标准相比，实际多了"+n+"克，偏差记作多少克？","+"+n,[fmt(-n),"0",fmt(n+1)],"高于标准，偏差记正。",g.signed);
}},
{id:"rational",number:"1.2.1",title:"有理数分类",why:"不同写法可以表示同一个数",gen:function(i,r){
var n=i+2,t=i%6;
if(t===0)return i===0?grade(this.id,i,"0属于正数还是负数？","既非正数也非负数",["正数","负数","既是正数又是负数"],"0不是正数，也不是负数。",g.rational):grade(this.id,i,"0属于负有理数吗？","不属于，但它是有理数",["属于，它是负整数","不属于，0不是有理数","0是负分数"],"0属于有理数，不属于正数或负数。",g.rational);
if(t===1)return grade(this.id,i,n+".0是整数吗？","是，等于整数"+n,["否，有小数点就不是整数","是负整数","不是有理数"],"末尾的.0不改变数值。",g.rational);
if(t===2)return grade(this.id,i,"−"+n+"/"+(n+1)+"属于什么数？","负的非整数有理数",["正整数","负整数","无理数"],"它是负分数，数值介于−1和0之间。",g.rational);
if(t===3)return grade(this.id,i,n+"/"+n+"化简之后属于哪类？","正整数",["负整数","非整数有理数","无理数"],"约分得到1。",g.rational);
if(t===4)return i===4?grade(this.id,i,"0.333…（3循环）是有理数吗？","是，它等于1/3",["否，无限小数都不是","否，因为有小数点","只有整数是有理数"],"循环小数可以写成分数。",g.rational):grade(this.id,i,"0.666…（6循环）属于有理数吗？","是，它等于2/3",["不是，它不能写成分数","不是，只有有限小数可以","是，但只能等于6/10"],"0.666…＝2/3，可以表示为分数。",g.rational);
return grade(this.id,i,"−"+n+"属于哪一类？","负整数",["正整数","非整数有理数","无理数"],"−"+n+"是整数，也属于有理数。",g.rational);
}},
{id:"axis",number:"1.2.2",title:"数轴与位置",why:"找0、方向和每格的数值",gen:function(i,r){
var n=i+2,t=i%4;
if(t===0)return grade(this.id,i,"数轴每格是1，原点左侧"+n+"格表示多少？",fmt(-n),[fmt(n),"0",fmt(-n-1)],"左侧是负方向。",g.axis);
if(t===1)return grade(this.id,i,"数轴每格是1，原点右侧"+n+"格表示多少？",fmt(n),[fmt(-n),"0",fmt(n+1)],"右侧是正方向。",g.axis);
if(t===2)return grade(this.id,i,"每格表示0.5，原点左侧"+n+"格的点表示多少？",fmt(-.5*n),[fmt(.5*n),fmt(-n),fmt(-.5*n-.5)],"左移"+n+"格，每格0.5，对应"+fmt(-.5*n)+"。",g.axis);
if(i===3)return grade(this.id,i,"一条直线有原点和正方向，却没有规定单位长度，它是完整数轴吗？","不是，缺少单位长度",["是，已经有0","是，有箭头就够了","不是，因为必须1厘米一格"],"原点、正方向和单位长度都要明确。",g.axis);
if(i===7)return grade(this.id,i,"直线有原点和统一的刻度，却未规定向哪边为正，它是完整数轴吗？","不是，缺少正方向",["是，刻度相等就行","不是，缺少小数","是，原点已确定"],"数轴必须规定正方向。",g.axis);
return grade(this.id,i,"直线有规定的正方向和单位长度，但没标原点，它是完整数轴吗？","不是，缺少原点",["是，有单位长度就行","是，有箭头就行","不是，只有刻度太短"],"不确定原点就无法给各点确定坐标。",g.axis);
}},
{id:"opposite",number:"1.2.3",title:"相反数",why:"关于0镜像，和为0",gen:function(i,r){
var n=i+2,t=i%4;
if(t===0)return grade(this.id,i,"−"+n+"的相反数是多少？",fmt(n),[fmt(-n),"0","1/"+n],"互为相反数相加为0。",g.opposite);
if(t===1)return grade(this.id,i,n+"的相反数是多少？",fmt(-n),[fmt(n),"0",fmt(n+1)],"正数的相反数为负。",g.opposite);
if(t===2)return grade(this.id,i,"a＝−"+n+"，则−a等于多少？",fmt(n),[fmt(-n),"0",fmt(-n*n)],"−a是a的相反数，可以是正的。",g.opposite);
return grade(this.id,i,"a＝−"+n+"，求−(−a)。",fmt(-n),[fmt(n),"0",fmt(-2*n)],"连续两次取相反数回到a。",g.opposite);
}},
{id:"absolute",number:"1.2.4",title:"绝对值",why:"距离不负，可能双解",gen:function(i,r){
var n=i+2,t=i%4;
if(t===0)return grade(this.id,i,"|−"+n+"|＝？",fmt(n),[fmt(-n),"0",fmt(n+1)],"距原点"+n+"个单位。",g.absolute);
if(t===1)return grade(this.id,i,"离0恰好"+n+"个单位的点有几个？","2",["0","1",fmt(n+1)],"正负两侧各一个。",g.absolute);
if(t===2)return grade(this.id,i,"|x|＝−"+n+"有几个解？","0",["1","2","无穷多个"],"绝对值不能为负。",g.absolute);
if(i===3)return grade(this.id,i,"|x|＝0有几个解？","1",["0","2","无穷多个"],"只有x＝0。",g.absolute);
if(i===7)return grade(this.id,i,"已知一个数到0的距离是0，这个数是多少？","0",["1","−1","2"],"位置只有在原点时，距离才为0。",g.absolute);
return grade(this.id,i,"绝对值等于自身的数一定属于哪一类？","非负数",["负数","非零数","只有正整数"],"若a≥0，则|a|＝a；0也符合。",g.absolute);
}},
{id:"compare",number:"1.2.5",title:"大小比较",why:"数值与到0的距离不同",gen:function(i,r){
var a=pick(r,4,12),b=pick(r,1,a-1),t=i%4;
if(t===0)return grade(this.id,i,"−"+a+"与−"+b+"，哪个数值更大？",fmt(-b),[fmt(-a),fmt(a),fmt(b)],"数轴靠右的−"+b+"更大。",g.compare);
if(t===1)return grade(this.id,i,"−"+a+"与−"+b+"，哪个离0更远？",fmt(-a),[fmt(-b),fmt(b),"0"],"−"+a+"到0距离"+a+"。",g.compare);
if(t===2)return grade(this.id,i,"满足−"+a+"＜x＜"+a+"的整数有几个？",fmt(2*a-1),[fmt(2*a),fmt(2*a+1),fmt(a-1)],"从−"+(a-1)+"到"+(a-1)+"，共"+(2*a-1)+"个整数。",g.compare);
if(i===3)return grade(this.id,i,"−1与0之间有有理数吗？","有，例如−1/2",["没有，相邻整数之间无数","只有整数","只有正分数"],"−1/2等负分数在区间内。",g.compare);
if(i===7)return grade(this.id,i,"0和1之间存在有理数吗？","有，例如1/2",["没有，因为0和1是相邻整数","只有无理数","只有0和1"],"1/2在0与1之间。",g.compare);
return grade(this.id,i,"−2和−1之间存在有理数吗？","有，例如−3/2",["没有负分数","只有−2与−1","只有非负数"],"−1.5在−2与−1之间。",g.compare);
}}
];
var bank=[],advanced=window.MathChapterOneAdvanced;
topics.forEach(function(topic,topicIndex){
 var r=rnd(1007+topicIndex*15487);
 for(var i=0;i<12;i++){var original=topic.gen(i,r);original.level="基础";bank.push(original)}
 if(advanced&&advanced.forTopic)bank.push.apply(bank,advanced.forTopic(topic.id));
});
if(advanced&&advanced.mixed){
 topics.push({id:"mixed",number:"综合",title:"全章综合与迁移",why:"辨条件、识陷阱、跨概念联系"});
 bank.push.apply(bank,advanced.mixed());
}
function choices(q){var all=[q.correct].concat(q.wrongs),uniq=[];all.forEach(function(c){c=String(c);if(uniq.indexOf(c)<0)uniq.push(c)});
 var x=0;while(uniq.length<4&&x++<30){var n=parseFloat(q.correct.replace(/−/g,"-"));var fallback=Number.isFinite(n)?fmt(n+2+x):"备选"+x;if(uniq.indexOf(fallback)<0)uniq.push(fallback)}
 var r=rnd(q.id.split("").reduce(function(n,ch){return(n*31+ch.charCodeAt(0))>>>0},17));
 for(var i=uniq.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),t=uniq[i];uniq[i]=uniq[j];uniq[j]=t}
 return uniq.slice(0,4)
}
bank.forEach(function(q){q.options=choices(q)});
if(bank.length!==(advanced?252:72)||new Set(bank.map(function(q){return q.id})).size!==bank.length||bank.some(function(q){return q.options.length!==4||new Set(q.options).size!==4||!q.options.includes(q.correct)||q.think[2]<0||q.think[2]>=q.think[1].length})){throw new Error("题库验证失败")}
var STORAGE="grade7:practice:chapter1:v1";var records={};
try{records=JSON.parse(localStorage.getItem(STORAGE)||"{}")||{}}catch(e){records={}}
function persist(){try{localStorage.setItem(STORAGE,JSON.stringify(records))}catch(e){byId("feedback").textContent="浏览器无法保存记录；当前练习仍然可以继续。"}}
var topicIndex=0,questionIndex=0,stage=0,picked=-1;
function topicItems(){
 var t=topics[topicIndex],level=byId("practiceLevel").value;
 var all=bank.filter(function(q){return q.topic===t.id&&(level==="all"||t.id==="mixed"||q.level===level)});
 if(byId("practiceMode").value==="wrong")return all.filter(function(q){return records[q.id]&&records[q.id].lastCorrect===false});
 return all;
}
function card(topic){var answered=bank.filter(function(q){return q.topic===topic.id&&records[q.id]&&records[q.id].lastCorrect}).length;return answered}
function progress(){var good=0,wrong=0;bank.forEach(function(q){var rec=records[q.id];if(rec){if(rec.lastCorrect)good++;else if(rec.attempts>0)wrong++}});
 byId("masteredCount").textContent=good;byId("wrongCount").textContent=wrong;
 var list=byId("topicList"),scrollPos=list.scrollLeft;list.replaceChildren();topics.forEach(function(t,i){var b=document.createElement("button");b.type="button";b.className="topic-btn"+(i===topicIndex?" active":"");b.setAttribute("aria-pressed",String(i===topicIndex));
 var no=document.createElement("span");no.className="topic-no";no.textContent=t.number;
 var name=document.createElement("span");name.className="topic-desc";var strong=document.createElement("strong");strong.textContent=t.title;var small=document.createElement("small");small.textContent=t.why;name.appendChild(strong);name.appendChild(small);
 var done=document.createElement("span");done.className="topic-amount";done.textContent=card(t)+"/"+bank.filter(function(q){return q.topic===t.id}).length;b.appendChild(no);b.appendChild(name);b.appendChild(done);
 b.addEventListener("click",function(){topicIndex=i;questionIndex=0;stage=0;picked=-1;if(t.id==="mixed")byId("practiceLevel").value="all";draw()});list.appendChild(b)});list.scrollLeft=scrollPos;
}
function choiceButton(text,index,act,feedbackClass,disabled){var b=document.createElement("button");b.type="button";b.className="answer"+(feedbackClass?" "+feedbackClass:"");b.disabled=!!disabled;
 var no=document.createElement("b");no.textContent=String.fromCharCode(65+index);var content=document.createElement("span");content.textContent=text;b.appendChild(no);b.appendChild(content);b.addEventListener("click",act);return b}
function draw(){progress();var set=topicItems(),topic=topics[topicIndex],i=Math.max(0,Math.min(questionIndex,Math.max(0,set.length-1)));questionIndex=i;
 byId("topicBadge").textContent="第一章 · "+topic.number+" · "+topic.title;
 byId("practiceLevel").disabled=topic.id==="mixed";
 byId("questionIndex").textContent=set.length?"第"+(i+1)+"题 / "+set.length+"题 · "+set[i].level:"当前筛选没有题目";
 byId("progressBar").style.width=(card(topic)/Math.max(1,bank.filter(function(q){return q.topic===topic.id}).length)*100)+"%";
 byId("prevQuestion").disabled=i===0||!set.length;byId("nextQuestion").disabled=!set.length||i>=set.length-1;byId("nextQuestion").textContent=i>=set.length-1?"下一组考点 →":"下一题 →";if(set.length&&i>=set.length-1&&topicIndex<topics.length-1)byId("nextQuestion").disabled=false;
 var area=byId("answerChoices");area.replaceChildren();
 if(!set.length){byId("questionText").textContent="这一组目前没有待重练题。";byId("questionPrompt").textContent="可以调整层级筛选，或切换到全部题目。";byId("feedback").textContent="只有曾经答错、且尚未重练答对的题才进入这里。";byId("stepThink").className="";byId("stepAnswer").className="";byId("practicePaper").dataset.paperId="";return}
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
byId("practiceLevel").addEventListener("change",function(){startQuestion(0)});
byId("prevQuestion").addEventListener("click",function(){startQuestion(Math.max(0,questionIndex-1))});
byId("nextQuestion").addEventListener("click",function(){
 var pool=topicItems();
 if(byId("practiceMode").value==="wrong"&&picked>=0){startQuestion(Math.min(questionIndex,Math.max(0,pool.length-1)));return;}
 if(questionIndex>=pool.length-1){if(topicIndex<topics.length-1){topicIndex++;byId("practiceMode").value="all";startQuestion(0)}return;}
 startQuestion(questionIndex+1);
});
byId("resetTopic").addEventListener("click",function(){if(!window.confirm("重新练当前整组"+bank.filter(function(q){return q.topic===topics[topicIndex].id}).length+"题？仅清除这组作答记录（包括原来的12道），其它组不动。"))return;var name=topics[topicIndex].id;bank.filter(function(q){return q.topic===name}).forEach(function(q){delete records[q.id]});persist();byId("practiceMode").value="all";startQuestion(0)});
var hand=byId("practiceHandwriting");
hand.addEventListener("toggle",function(){if(hand.open){var n=byId("practicePaper");n.setAttribute("data-paper-id",n.dataset.paperId||"")}}); 
draw();
window.MathChapterOnePractice={topics:topics,bank:bank,version:"expanded-252"}; // 可在浏览器控制台复核题库，不收集用户资料
})();
