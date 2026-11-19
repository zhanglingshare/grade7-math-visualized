"use strict";
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const base=path.resolve(__dirname,"..");
const video=fs.readFileSync(path.join(base,"511-video.html"),"utf8");
const week=fs.readFileSync(path.join(base,"511-week.html"),"utf8");
const home=fs.readFileSync(path.join(base,"app.js"),"utf8");
assert.match(home,/href="511-video\.html"/);
assert.match(home,/href="511-week\.html"/);
assert.match(week,/href="511-video\.html"/);
const getJS=h=>{const m=h.match(/<script>([\s\S]*?)<\/script>/);assert.ok(m);return m[1];};
new vm.Script(getJS(video));new vm.Script(getJS(week));
function el(){return {innerHTML:"",textContent:"",disabled:false,style:{},children:[],attrs:{},events:{},
 classList:{add(){},remove(){}},addEventListener(k,f){this.events[k]=f;},
 setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},appendChild(x){this.children.push(x);},
 querySelector(){return {disabled:true}},querySelectorAll(){return[];},insertAdjacentHTML(){},focus(){}};}
const ids=["stage","shot","sceneList","progress","status","play","mute","next","prev"];
const nodes={};ids.forEach(id=>nodes[id]=el());const spoken=[];
function Utterance(text){this.text=text;}
const speechSynthesis={getVoices(){return[{lang:"zh-CN",name:"Mandarin"}]},cancel(){},speak(u){spoken.push([u.text,u.lang])}};
const win={speechSynthesis,SpeechSynthesisUtterance:Utterance,addEventListener(){}};
vm.runInNewContext(getJS(video),{window:win,document:{getElementById:id=>nodes[id],createElement:el},
 SpeechSynthesisUtterance:Utterance,setTimeout(){},clearTimeout(){},console,Date},{timeout:5000});
assert.equal(nodes.sceneList.children.length,8);
assert.match(nodes.stage.innerHTML,/511/);
nodes.play.events.click();assert.equal(spoken.length,1);assert.equal(spoken[0][1],"zh-CN");
nodes.next.events.click();assert.equal(spoken.length,2);
const wids=["week","board","fill","progress"], wn={};wids.forEach(id=>wn[id]=el());
const ls={state:null,getItem(){return this.state},setItem(k,v){this.state=v}};
vm.runInNewContext(getJS(week),{document:{getElementById:id=>wn[id]},localStorage:ls,console},{timeout:5000});
assert.equal((wn.week.innerHTML.match(/data-day=/g)||[]).length,7);
assert.match(wn.board.innerHTML,/x \+ 7 = 12/);
assert.match(wn.board.innerHTML,/先判断/);
wn.week.events.click({target:{closest(sel){return sel==="[data-day]"?{dataset:{day:"5"}}:null}}});
assert.match(wn.board.innerHTML,/休息日|休息/);
wn.week.events.click({target:{closest(sel){return sel==="[data-day]"?{dataset:{day:"6"}}:null}}});
assert.match(wn.board.innerHTML,/4x \+ 2 = 22/);
assert.match(wn.board.innerHTML,/不看/);
console.log("PASS: 8 Chinese-narrated scenes, 7 daily cards, five equations, one rest day, one transfer test, links.");
