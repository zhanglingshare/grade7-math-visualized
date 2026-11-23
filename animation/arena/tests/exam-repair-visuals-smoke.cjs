"use strict";
/* Run: node animation/arena/tests/exam-repair-visuals-smoke.cjs
   No network, browser, dependencies or original student data required. */
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const dir=path.resolve(__dirname,"..");
const visual=fs.readFileSync(path.join(dir,"exam-repair-visuals.js"),"utf8");
const main=fs.readFileSync(path.join(dir,"exam-repair.js"),"utf8");
const html=fs.readFileSync(path.join(dir,"exam-repair.html"),"utf8");
const homepage=fs.readFileSync(path.join(dir,"app.js"),"utf8");
new vm.Script(visual);new vm.Script(main);
assert.match(html,/exam-repair-visuals\.js/);
assert.match(homepage,/href="exam-repair\.html"/);
let nodes={};function elt(){return{innerHTML:"",textContent:"",style:{},value:"",attrs:{},handlers:{},
 addEventListener(k,cb){this.handlers[k]=cb;},querySelector(){return {disabled:false}},
 setAttribute(k,v){this.attrs[k]=v;},getAttribute(k){return this.attrs[k]}};}
const document={getElementById(id){return nodes[id]||(nodes[id]=elt())}};
const location={hash:""},events={};
const window={location,history:{replaceState(_,__,h){location.hash=h;}},addEventListener(k,cb){events[k]=cb;}};
const localStorage={data:{},getItem(k){return this.data[k]||null;},setItem(k,v){this.data[k]=v;}};
const intervals=new Map();let counter=0;
const setInterval=fn=>{intervals.set(++counter,fn);return counter;};
const clearInterval=id=>intervals.delete(id);
const ctx={window,document,location,localStorage,setInterval,clearInterval,console};
vm.runInNewContext(visual,ctx,{filename:"exam-repair-visuals.js",timeout:5000});
vm.runInNewContext(main,ctx,{filename:"exam-repair.js",timeout:5000});
const app=window.EXAM_REPAIR_TEST,viz=window.EXAM_REPAIR_VISUALS;
assert.equal(app.missions.length,6);
assert.equal(app.missions.reduce((sum,m)=>sum+m.steps.length,0),25);
const click=action=>nodes.scene.handlers.click({target:{closest(sel){return sel==="[data-viz]"?{dataset:{viz:action}}:null;}}});
for(const [id,marker] of [["q22","viz-matrix-board"],["q18","viz-polynomial"],["q19","viz-branch-grid"],["q21","viz-ledger-bars"],["q10","viz-machine"]]){
 app.openMission(id);
 assert.match(nodes["repair-visual"].innerHTML,new RegExp(marker));
 assert.match(nodes["repair-visual"].innerHTML,/播放演示/);
 click("play");
 assert.ok(viz.devState().frame>0,"Play did not advance "+id);
 click("next");
 assert.ok(viz.devState().frame>=1,"Next failed "+id);
 click("reset");
 assert.equal(viz.devState().frame,0,"Reset failed "+id);
}
app.openMission("q18");
click("n-plus");click("m-minus");
assert.match(nodes["repair-visual"].innerHTML,/两个条件同时成立/);
app.openMission("q21");
for(let i=0;i<5;i++)click("next");
assert.match(nodes["repair-visual"].innerHTML,/−12 吨/);
assert.match(nodes["repair-visual"].innerHTML,/1720 元/);
app.openMission("q22");
click("next");click("next");click("next");
assert.match(nodes["repair-visual"].innerHTML,/a×d − b×c/);
app.openMission("q23");
assert.match(nodes.scene.innerHTML,/id="playmove" type="button">/);
assert.match(nodes.scene.innerHTML,/id="timerange"/);
nodes.scene.handlers.input({target:{id:"timerange",value:"2"}});
assert.match(nodes.distancetext.textContent,/相遇/);
nodes.scene.handlers.input({target:{id:"timerange",value:"3"}});
assert.match(nodes.distancetext.textContent,/半程/);
for(const mission of app.missions){
 app.openMission(mission.id);
 for(const step of mission.steps){app.correctStep();assert.match(nodes.task.innerHTML,/data-action="advance"/);app.advance();}
}
assert.equal(app.progress().done,6);
assert.ok(localStorage.data["math-exam-repair-2026-v1"],"progress not persisted");
console.log("PASS: six dynamic visual models, play/reset, two-constraint algebra, warehouse totals, math locations, 25 assessment steps, saved progress.");
