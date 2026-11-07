/* 数学电子草稿本 · 支持手指/触控笔与键盘；数据只保存在当前浏览器。
   选择题继续使用原有直接点选；手写不作自动识别或自动评分。 */
(function(){
"use strict";
var PREFIX="grade7:digital-notebook:v1:",scheduled=false;
function el(tag,className,label){var n=document.createElement(tag);if(className)n.className=className;if(label!==undefined)n.textContent=label;return n}
function safeParse(key){try{var x=JSON.parse(localStorage.getItem(PREFIX+key)||"null");if(x&&Array.isArray(x.strokes))return x;}catch(e){}return {strokes:[],answer:"",status:"",color:"#284f8a"}}
function save(key,obj){try{localStorage.setItem(PREFIX+key,JSON.stringify(obj));return true}catch(e){return false}}
function button(label,title){var b=el("button","dn-tool",label);b.type="button";if(title)b.setAttribute("aria-label",title);return b}
function path(){var h=location.hash.replace(/^#/,"").split("/");return h}
function taskKey(type,n,element){
 if(type==="studio")return "v2:chapter1:"+((path()[2])||"unknown")+":paper:"+n;
 if(type==="v2")return "v2:lesson:"+((path()[1])||"unknown")+":paper:"+n;
 if(type==="c1"){var view=element.closest(".view"),lesson=view?view.id:"unknown",tabs=element.closest(".c1-lab").querySelectorAll(".c1-tabs .c1-btn"),active=0;Array.prototype.forEach.call(tabs,function(btn,i){if(btn.classList.contains("on"))active=i});return "v1:"+lesson+":question:"+active}
 if(type==="think"){var sel=document.getElementById("thinkQSelect");return "exam:thinking:"+((sel&&sel.value)||"0")}
 return "exam:extra:"+type;
}
function build(root,key,compact,reference){
 var old=root.querySelector(":scope > .dn-root");if(old&&old.dataset.dnKey===key)return;
 if(old)old.remove();
 var state=safeParse(key),color=state.color==="#b64e3a"?"#b64e3a":"#284f8a";
 var wrap=el("section","dn-root"+(compact?" dn-compact":""));wrap.dataset.dnKey=key;wrap.setAttribute("aria-label","可以手写或键入答案的电子草稿本");
 var head=el("div","dn-head"),label=el("strong","", "电子草稿本 · 直接在屏幕上写"),stat=el("span","dn-state",state.status==="correct"?"自评已掌握":state.status==="retry"?"标记需再练":state.status==="done"?"已写完":state.strokes.length||state.answer?"已保存草稿":"待开始");
 head.appendChild(label);head.appendChild(stat);wrap.appendChild(head);
 var tools=el("div","dn-tools"),blue=button("蓝笔"),red=button("红笔"),grow=button("扩大书写区"),undo=button("撤销一笔"),clear=button("清空草稿");
 tools.appendChild(blue);tools.appendChild(red);tools.appendChild(grow);tools.appendChild(undo);tools.appendChild(clear);wrap.appendChild(tools);
 var canvas=el("canvas","dn-inkpad");canvas.setAttribute("aria-label","手写草稿区域，手指或触控笔在此书写");canvas.setAttribute("role","img");wrap.appendChild(canvas);
 var guide=el("p","dn-help","用手指或触控笔在上方书写。也可在下方用屏幕键盘输入。手写笔迹不会自动识别成答案。");wrap.appendChild(guide);
 var row=el("div","dn-answer-row"),input=el("input","dn-answer"),done=button("完成后核对");
 input.type="text";input.inputMode="text";input.autocomplete="off";input.spellcheck=false;input.setAttribute("aria-label","用屏幕键盘输入计算过程或答案");input.placeholder="键盘输入算式／结果（可选）";input.value=state.answer||"";done.classList.add("dn-complete");row.appendChild(input);row.appendChild(done);wrap.appendChild(row);
 var fb=el("p","dn-feedback","输入和笔迹保存在当前设备的浏览器中，不上传到服务器。");fb.setAttribute("aria-live","polite");wrap.appendChild(fb);
 var rating=el("div","dn-rating"),rateLabel=el("span","dn-rate-label","看过参考或核对结果后："),passed=button("这题做对了"),retry=button("这题要再练");
 rating.appendChild(rateLabel);rating.appendChild(passed);rating.appendChild(retry);wrap.appendChild(rating);
 function rate(value){state.status=value;persist();passed.classList.toggle("active",value==="correct");retry.classList.toggle("active",value==="retry");fb.textContent=value==="correct"?"已记录：这题做对了。下一次请试试变式题。":"已记录：这题需要再练。下次先回看条件和解题步骤。";}
 passed.addEventListener("click",function(){rate("correct")});retry.addEventListener("click",function(){rate("retry")});
 if(reference&&reference.parentNode===root)root.insertBefore(wrap,reference);else root.appendChild(wrap);
 var ctx=canvas.getContext("2d"),ratio=window.devicePixelRatio||1,scaleW=1,scaleH=1,stroke=null,activePointer=null,readOnly=false;
 function selected(){blue.classList.toggle("active",color==="#284f8a");red.classList.toggle("active",color==="#b64e3a");passed.classList.toggle("active",state.status==="correct");retry.classList.toggle("active",state.status==="retry");undo.disabled=!state.strokes.length;clear.disabled=!state.strokes.length}
 function persist(){state.color=color;if(!save(key,state))fb.textContent="当前浏览器未能保存（可能是无痕模式或储存空间不足）；本页仍可以继续书写。";else{stat.textContent=state.status==="correct"?"自评已掌握":state.status==="retry"?"标记需再练":state.status==="done"?"已写完":"草稿已保存";}}
 function render(){
  if(!ctx)return;var w=canvas.clientWidth||420,h=canvas.clientHeight||200;ctx.clearRect(0,0,w,h);
  ctx.lineJoin="round";ctx.lineCap="round";
  state.strokes.forEach(function(s){var pts=s.points;if(!pts||!pts.length)return;
   ctx.beginPath();ctx.strokeStyle=s.color||"#284f8a";ctx.fillStyle=s.color||"#284f8a";ctx.lineWidth=3.1;
   pts.forEach(function(p,i){var x=p[0]*w,y=p[1]*h;if(!i)ctx.moveTo(x,y);else ctx.lineTo(x,y)});
   if(pts.length===1){ctx.arc(pts[0][0]*w,pts[0][1]*h,1.7,0,Math.PI*2);ctx.fill()}else ctx.stroke();
  });
  if(stroke&&stroke.points.length){var p=stroke.points;ctx.beginPath();ctx.strokeStyle=stroke.color;ctx.lineWidth=3.1;p.forEach(function(q,i){var x=q[0]*w,y=q[1]*h;if(!i)ctx.moveTo(x,y);else ctx.lineTo(x,y)});
   if(p.length===1){ctx.arc(p[0][0]*w,p[0][1]*h,1.7,0,Math.PI*2);ctx.fill()}else ctx.stroke()}
  selected()
 }
 function resize(){var w=canvas.clientWidth||420,h=canvas.clientHeight||200;ratio=Math.min(2.5,window.devicePixelRatio||1);canvas.width=Math.max(1,Math.round(w*ratio));canvas.height=Math.max(1,Math.round(h*ratio));ctx.setTransform(ratio,0,0,ratio,0,0);render()}
 function point(ev){var box=canvas.getBoundingClientRect();return [Math.min(1,Math.max(0,(ev.clientX-box.left)/box.width)),Math.min(1,Math.max(0,(ev.clientY-box.top)/box.height))]}
 function down(ev){if(ev.button!==0&&ev.pointerType!=="touch"&&ev.pointerType!=="pen")return;if(activePointer!==null||state.strokes.length>=160){if(state.strokes.length>=160)fb.textContent="这一页草稿已很长，可以先核对或撤销一些笔画。";return}
  ev.preventDefault();activePointer=ev.pointerId;stroke={color:color,points:[point(ev)]};canvas.setPointerCapture(ev.pointerId);render()}
 function move(ev){if(ev.pointerId!==activePointer||!stroke)return;ev.preventDefault();var points=stroke.points,pos=point(ev),last=points[points.length-1];if(Math.abs(pos[0]-last[0])+Math.abs(pos[1]-last[1])>.0015&&points.length<450)points.push(pos);render()}
 function up(ev){if(ev.pointerId!==activePointer)return;ev.preventDefault();if(stroke){state.strokes.push(stroke);stroke=null;state.status="draft";persist()}activePointer=null;render()}
 canvas.addEventListener("pointerdown",down);canvas.addEventListener("pointermove",move);canvas.addEventListener("pointerup",up);canvas.addEventListener("pointercancel",up);canvas.addEventListener("lostpointercapture",function(){if(activePointer!==null&&stroke){state.strokes.push(stroke);stroke=null;activePointer=null;persist();render()}});
 blue.addEventListener("click",function(){color="#284f8a";selected()});red.addEventListener("click",function(){color="#b64e3a";selected()});grow.addEventListener("click",function(){var large=wrap.classList.toggle("dn-large");grow.textContent=large?"恢复正常大小":"扩大书写区";resize()});
 undo.addEventListener("click",function(){if(state.strokes.length){state.strokes.pop();state.status="draft";persist();render()}});
 clear.addEventListener("click",function(){if(!state.strokes.length)return;if(window.confirm("只清空这一题的手写草稿？键盘答案会保留。")){state.strokes=[];state.status="draft";persist();render()}});
 input.addEventListener("input",function(){state.answer=input.value.slice(0,1500);state.status="draft";persist()});
 done.addEventListener("click",function(){
  if(!state.strokes.length&&!String(input.value).trim()){fb.textContent="先在屏幕上写点过程，或键盘输入答案，再核对。";return}
  state.status="done";persist();
  if(reference){reference.open=true;reference.scrollIntoView({behavior:"smooth",block:"nearest"});fb.textContent="已展开原题参考答案。请对照过程，判断哪里需要修改；手写不作自动识别。";}
  else{fb.textContent="已记录完成。若这道题另有“核对答案”按钮，请继续点它进行自动判题；手写仅用于过程。";}
 });
 if(typeof ResizeObserver!=="undefined"){var observer=new ResizeObserver(function(){if(wrap.isConnected)resize();else observer.disconnect()});observer.observe(canvas)}else{window.addEventListener("resize",function(){if(wrap.isConnected)resize()})}
 resize();
}
/* Patch only the writing slots; don't re-create or replace preexisting experiments. */
function install(){
 document.querySelectorAll(".s1-paper-task").forEach(function(item,i){
  var sp=item.querySelector(".s1-paper-space"),ref=item.querySelector("details");
  if(sp){if(sp.style.display!=="none")sp.style.display="none";build(item,taskKey("studio",i,item),false,ref)}
 });
 document.querySelectorAll(".paper-task").forEach(function(item,i){
  var sp=item.querySelector(".paper-space"),ref=item.querySelector("details");
  if(sp){if(sp.style.display!=="none")sp.style.display="none";build(item,taskKey("v2",i,item),false,ref)}
 });
 document.querySelectorAll(".c1-lab .c1-foot").forEach(function(slot){build(slot,taskKey("c1",0,slot),true,null)});
 var think=document.querySelector(".think-answer.visible");if(think)build(think,taskKey("think",0,think),true,null);

 /* Original V1 open-ended "小思考": optional on-screen handwriting without deleting original prompts. */
 document.querySelectorAll(".view .quiz").forEach(function(quiz,i){
  if(quiz.querySelector(".dn-optional"))return;
  var detail=el("details","dn-optional"),summary=el("summary","","在屏幕上写这道小思考（不用纸笔）"),slot=el("div","dn-slot");
  detail.appendChild(summary);detail.appendChild(slot);quiz.appendChild(detail);
  var view=quiz.closest(".view"),viewId=view?view.id:"unknown",localIndex=0;
  if(view){var all=view.querySelectorAll(".quiz");Array.prototype.forEach.call(all,function(q,j){if(q===quiz)localIndex=j})}
  detail.addEventListener("toggle",function(){if(detail.open)build(slot,"v1:original:"+viewId+":quiz:"+localIndex,true,null)});
 });
 document.querySelectorAll("main .lab[id]:not(#overview):not(#thinking-gate) > .stage").forEach(function(stage){
  if(stage.querySelector(".dn-optional"))return;
  var details=el("details","dn-optional"),summary=el("summary","","需要演算？打开屏幕草稿（选用）"),space=el("div","dn-slot");details.appendChild(summary);details.appendChild(space);stage.appendChild(details);
  var parent=stage.closest(".lab"),id=parent?parent.id:"other";
  details.addEventListener("toggle",function(){if(details.open)build(space,taskKey(id,0,space),true,null)});
 });
}
/* Rendering in v2 replaces the page content on every route; observe and rehydrate. */
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(function(){scheduled=false;install()})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){install();new MutationObserver(schedule).observe(document.getElementById("app")||document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["class","style","value"]})});
else{install();new MutationObserver(schedule).observe(document.getElementById("app")||document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["class","style","value"]})}
window.addEventListener("hashchange",schedule);
})();
