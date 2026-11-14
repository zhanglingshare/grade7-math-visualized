"use strict";
/* Run from repository root: node animation/arena/tests/smoke.cjs */
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const dir=path.resolve(__dirname,"..");
const read=name=>fs.readFileSync(path.join(dir,name),"utf8");
const window={listeners:{},addEventListener(k,fn){this.listeners[k]=fn;},scrollTo(){}};
const run=(name,env)=>vm.runInNewContext(read(name),env);
run("curriculum.js",{window});
run("visuals.js",{window});
const m=window.MATH_ARENA.lessons;
assert.equal(m.length,28);
assert.equal(new Set(m.map(x=>x.id)).size,28);
assert.deepEqual(["bridge","c1","c2","c3"].map(id=>m.filter(x=>x.track===id).length),[7,6,9,6]);
for(const mission of m){
 for(const test of [mission.q,mission.transfer]){
  assert.equal(test.opts.length,3);
  assert.ok(test.answer>=0&&test.answer<3);
  assert.ok(test.reason);
 }
 for(const mode of [0,1]){
  for(const value of [mission.cfg.min,mission.cfg.v,mission.cfg.max]){
   const scene=window.ARENA_VISUALS.render(mission,{value,mode});
   assert.match(scene,/<svg/);
   assert.match(scene,/<\/svg>/);
   assert.doesNotMatch(scene,/NaN|Infinity|undefined/);
  }
 }
}
const area=m.find(x=>x.id==="b05");
for(const mode of [0,1]){
 const cube=window.ARENA_VISUALS.render(area,{value:6,mode,spatial:true});
 assert.match(cube,/两层/);
 assert.match(cube,/48/);
 assert.match(cube,/polygon/);
}
const fraction=window.ARENA_VISUALS.render(m.find(x=>x.id==="b02"),{value:3,mode:0,selected:2});
assert.match(fraction,/12×2\/3=8/);
const grouping=window.ARENA_VISUALS.render(m.find(x=>x.id==="o06"),{value:3,mode:1});
assert.match(grouping,/3×\(4−2\)=12−6=6/);
const local=new Map(),localStorage={getItem:key=>local.get(key)||null,setItem:(key,value)=>local.set(key,value)};
const root={innerHTML:"",listeners:{},addEventListener(k,fn){this.listeners[k]=fn;},querySelector(){return null;}};
const inputListeners={};
const document={listeners:{},addEventListener(k,fn){this.listeners[k]=fn;},getElementById(id){if(id==="arena-app")return root;return {addEventListener(k,fn){inputListeners[id]=fn;}};}};
const location={hash:"#/"};
run("app.js",{window,document,localStorage,location,Date,setInterval:()=>1,clearInterval:()=>{}});
assert.match(root.innerHTML,/数学也有/);
assert.equal(window.MATH_ARENA_TEST.count,28);
const click=(act,values={})=>{
 const target={dataset:{act,...values},closest(s){return s==="[data-act]"?target:null;}};
 root.listeners.click({target});
};
const tap=(attr,val)=>{
 const choice={dataset:{[attr]:val}};
 const exact="[data-"+attr.replace(/[A-Z]/g,c=>"-"+c.toLowerCase())+"]";
 root.listeners.click({target:{closest:s=>s===exact?choice:null}});
};
for(const lesson of m){
 location.hash="#/play/"+lesson.id;window.MATH_ARENA_TEST.navigate();
 assert.ok(root.innerHTML.includes(lesson.q.text));
 if(lesson.read){
  assert.doesNotMatch(root.innerHTML,/data-act="pred"/);
  click("read",{index:String((lesson.read.answer+1)%3)});
  assert.match(root.innerHTML,/再看看题目的最后一句/);
  click("read",{index:String(lesson.read.answer)});
  assert.match(root.innerHTML,/data-act="pred"/);
 }
 click("pred",{index:String(lesson.q.answer)});
 click("stage",{stage:"experiment"});
 assert.match(root.innerHTML,/arena-blackboard/);
 click("flip");
 if(lesson.id==="b02"){
  tap("partIndex","1");
  assert.equal(window.MATH_ARENA_TEST.getDraft(lesson.id).selected,2);
 }
 if(lesson.id==="b03"||lesson.id==="o06"||lesson.id==="b04"){
  const before=window.MATH_ARENA_TEST.getDraft(lesson.id).mode;
  tap("sceneAction","regroup");
  assert.notEqual(window.MATH_ARENA_TEST.getDraft(lesson.id).mode,before);
 }
 if(lesson.id==="r03"){
  tap("choiceIndex","4");
  assert.equal(window.MATH_ARENA_TEST.getDraft(lesson.id).value,4);
 }
 if(lesson.id==="b05"){
  click("spatial");
  assert.match(root.innerHTML,/立体积木/);
 }
 click("stage",{stage:"transfer"});
 click("transfer",{index:String(lesson.transfer.answer)});
 assert.ok(root.innerHTML.includes(lesson.transfer.reason));
 click("stage",{stage:"reflect"});
 click("reflect",{value:"understood"});
 click("complete");
 assert.ok(window.MATH_ARENA_TEST.getRecord(lesson.id));
}
location.hash="#/journal";window.MATH_ARENA_TEST.navigate();
assert.match(root.innerHTML,/不是分数榜/);
assert.match(read("index.html"),/curriculum.js/);
assert.match(read("index.html"),/visuals.js/);
assert.match(read("index.html"),/app.js/);
console.log("PASS: 28 complete lesson flows, 11 targeted reading gates, 168 SVG parameter views, object manipulation, 3D cubes and local progress.");
