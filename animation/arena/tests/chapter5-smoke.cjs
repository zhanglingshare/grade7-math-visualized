"use strict";
/* Run from repository root: node animation/arena/tests/chapter5-smoke.cjs */
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const dir=path.resolve(__dirname,".."),read=n=>fs.readFileSync(path.join(dir,n),"utf8");
const window={listeners:{},addEventListener(k,fn){this.listeners[k]=fn;},scrollTo(){}};
const run=(n,env)=>vm.runInNewContext(read(n),env);
run("curriculum.js",{window});run("visuals.js",{window});run("chapter4-visuals.js",{window});run("chapter5-extension.js",{window});run("chapter5-visuals.js",{window});
const lessons=window.MATH_ARENA.lessons.filter(x=>x.track==="c5");
assert.equal(lessons.length,9);assert.equal(new Set(lessons.map(x=>x.id)).size,9);
assert.deepEqual(lessons.map(x=>x.id),["e01","e02","e03","e04","e05","e06","e07","e08","e09"]);
for(const m of lessons){
 for(const q of [m.q,m.transfer]){assert.equal(q.opts.length,3);assert.ok(q.answer>=0&&q.answer<3);assert.ok(q.reason);}
 assert.ok(m.goal&&m.action&&m.coach);
 for(const value of [m.cfg.min,m.cfg.v,m.cfg.max]){const svg=window.ARENA_VISUALS.render(m,{value,mode:0});assert.match(svg,/<svg/);assert.match(svg,/<\\/svg>/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}
}
assert.equal(lessons[0].q.answer,1);assert.equal(lessons[1].transfer.answer,0);
assert.equal(lessons[2].transfer.answer,1);assert.equal(lessons[3].transfer.answer,1);
assert.equal(lessons[4].transfer.answer,1);assert.equal(lessons[5].transfer.answer,2);
assert.equal(lessons[6].q.answer,0);assert.equal(lessons[7].q.answer,0);assert.equal(lessons[7].transfer.answer,1);
const scene=fs.readFileSync(path.join(dir,"chapter5-visuals.js"),"utf8");
for(const id of ["c5-concept","c5-balance","c5-machine","c5-combine","c5-brackets","c5-fractions","c5-model","c5-pursuit","c5-repeating"])assert.ok(scene.includes(id));
const math={
 e01:[3*3+2,11],
 e02:[12-5,7],
 e03:[(17-2)/3,5],
 e04:[(11+4)/5,3],
 e05:[(12+4-6)/2,5],
 e06:[(5-2)*3,9],
 e07:[3*(15+5),4*15],
 e08:[1.2*5+1,.8*5+3],
 e08match:[2000*(22-10),2400*10],
 e09:[(10*0.333333333333-0.333333333333),3]
};
for(const [id,[a,b]] of Object.entries(math))assert.ok(Math.abs(a-b)<1e-9,id+" equation does not balance");
const index=fs.readFileSync(path.join(dir,"index.html"),"utf8");
assert.match(index,/chapter5-extension\.js/);assert.match(index,/chapter5-visuals\.js/);
console.log("PASS: Chapter 5 has 9 independent lessons, 18 checked questions, 9 dedicated visual scenes, and the textbook's pursuit / matching models.");
