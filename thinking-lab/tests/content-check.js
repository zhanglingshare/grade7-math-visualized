/* Run: node thinking-lab/tests/content-check.js
   Structural and independently typed answer-key audit; not psychometric validation. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,"..","curriculum.js"),"utf8"),sandbox);
const D=sandbox.window.MATHLAB_DATA;
const keys={
p1:["不可以，302和32不同","305"],
p2:["6×10+6×2","56"],
p3:["3/4","2/3"],
p4:["有无数个","0.25"],
p5:["2杯","4杯"],
p6:["2米","300"],
p7:["7","7"],
p8:["原来的2倍","3倍"],
p9:["70","4"],
c11:["−3℃","−1℃"],
c12:["−4，0，3/2","−0.5"],
c13:["6","5"],
c14:["7","−9"],
c15:["8","9"],
c16:["−10<−2","−4<−3"],
c21:["2","3"],
c22:["7","8"],
c23:["6","10"],
c24:["4","−6"],
c25:["1/4","1/6"],
c26:["前者16，后者−16","−9"],
c27:["−10","10"],
c28:["693","120"],
c29:["3.5×10⁶","6.4×10⁵"],
c31:["3x","4a"],
c32:["x+4","3x+2"],
c33:["2(a+b)","2a+2"],
c34:["−5","−5"],
c35:["2x+3","3(x−2)"],
c36:["2n+1","奇数"]
};
assert.equal(D.units.length,30,"30 original experiments");
assert.equal(D.models.length,7,"7 thinking models");
assert.equal(Object.keys(D.retests).length,D.units.length,"1 alternate transfer per experiment");
const ids=new Set(D.units.map(u=>u.id));
assert.equal(ids.size,D.units.length,"unique topic IDs");
assert.equal(Object.keys(keys).length,D.units.length,"independent key audit covers every topic");
const modelIDs=new Set(D.models.map(m=>m.id));
const chapterIDs=new Set(D.chapters.map(c=>c.id));
for(const u of D.units){
 assert.ok(chapterIDs.has(u.ch),"chapter: "+u.id);
 assert.ok(modelIDs.has(u.model),"thinking model: "+u.id);
 assert.ok(u.parents.every(p=>ids.has(p)&&p!==u.id),"prerequisites: "+u.id);
 assert.ok(u.q&&u.tq&&u.explain&&u.trap,"thinking content: "+u.id);
 assert.equal(u.opts.length,3,"initial choices: "+u.id);
 assert.equal(new Set(u.opts).size,3,"unique initial choices: "+u.id);
 assert.equal(u.topts.length,3,"transfer choices: "+u.id);
 assert.equal(new Set(u.topts).size,3,"unique transfer choices: "+u.id);
 assert.equal(u.opts[u.correct],keys[u.id][0],"independent initial key: "+u.id);
 assert.ok(D.retests[u.id],"alternate transfer: "+u.id);
 const t=D.retests[u.id];
 assert.ok(t.q&&t.explain,"alternate explanation: "+u.id);
 assert.equal(t.opts.length,3,"alternate choices: "+u.id);
 assert.equal(new Set(t.opts).size,3,"unique alternate choices: "+u.id);
 assert.equal(t.opts[t.correct],keys[u.id][1],"independent alternate key: "+u.id);
 const kind=u.visual.kind;
 assert.ok(["line","fraction","grid","ratio","bars","power","machine","precedence"].includes(kind),"visual type: "+u.id);
}
function visit(id,active,done){
 if(done.has(id))return;
 assert.ok(!active.has(id),"prerequisite cycle at "+id);
 active.add(id);
 const u=D.units.find(x=>x.id===id);
 for(const p of u.parents)visit(p,active,done);
 active.delete(id);done.add(id);
}
const done=new Set();for(const u of D.units)visit(u.id,new Set(),done);
assert.equal(D.edges.length,D.units.reduce((n,u)=>n+u.parents.length,0));
const power=D.units.find(u=>u.id==="c26").visual;
assert.equal(power.a,-2,"negative base retained");
assert.equal((-2)**4,16);
assert.equal(-2**4,-16);
const ratio=D.units.find(u=>u.id==="p5").visual;
for(let n=1;n<=4;n++)assert.equal((ratio.a*n)/(ratio.b*n),3,"ratio invariant");
const order=D.units.find(u=>u.id==="c27").visual;
assert.equal(order.a+order.b*order.c,-10,"order of operations");
assert.equal((order.a+order.b)*order.c,-20,"parentheses change result");
console.log("PASS: 30 initial questions + 60 transfer questions / 47 prerequisite edges / 7 thinking models.");
console.log("Limit: no item difficulty, discrimination, learning-gain or causal-efficacy validation from real pupils.");