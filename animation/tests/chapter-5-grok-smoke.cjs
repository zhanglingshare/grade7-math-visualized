"use strict";
/* Run: node animation/tests/chapter-5-grok-smoke.cjs */
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const html=fs.readFileSync(path.join(root,"chapter-5.html"),"utf8");
assert.match(html,/<meta[^>]+viewport=/);
assert.match(html,/aria-label="旧版课程章节导航"/);
assert.match(html,/chapter-4\.html/);
assert.match(html,/arena\/chapter5-practice\.html/);
assert.match(html,/cn-math-taxonomy/);
assert.match(html,/CC BY-NC 4\.0/);
const script=html.match(/<script>([\s\S]+)<\/script>/);
assert.ok(script,"Missing inline learning engine");
const js=script[1].replace(/route\(\);\s*$/,"")+"\n;globalThis.TEST_API={LESSONS,genSet,gradeTyped};";
new vm.Script(js,{filename:"chapter-5.html (inline)"});
const win={addEventListener(){},matchMedia(){return {matches:true};}};
const sandbox={window:win,matchMedia:win.matchMedia,localStorage:{getItem(){return null},setItem(){}},
 document:{querySelector(){return null},querySelectorAll(){return[];}},location:{hash:""},
 performance:{now(){return 0}},requestAnimationFrame(){},setTimeout(){},clearTimeout(){},console};
vm.runInNewContext(js,sandbox,{timeout:30000});
const api=sandbox.TEST_API,LESSONS=api.LESSONS,genSet=api.genSet,gradeTyped=api.gradeTyped;
assert.equal(LESSONS.length,8);
let fixed=0,generated=0,typed=0;
for(const L of LESSONS){
 assert.equal(L.quiz.length,30,"Each lesson must have 30 fixed questions");
 for(const [i,q] of L.quiz.entries()){
  fixed++;
  assert.ok(q.q&&q.e,L.id+"/"+i+" missing statement/explanation");
  if(q.in){
   typed++;
   const raw=q.eqw||(q.num||[]).join(" 或 ");
   assert.ok(raw,L.id+"/"+i+" missing expected answer");
   const g=gradeTyped(q,raw);
   assert.ok(g&&g.ok===true,L.id+"/"+i+" fails its expected answer: "+raw);
  }else{
   assert.ok(q.o&&q.a>=0&&q.a<q.o.length,L.id+"/"+i+" malformed options");
   assert.equal(new Set(q.o).size,q.o.length,L.id+"/"+i+" duplicate options");
  }
 }
 for(let group=0;group<100;group++){
  const questions=genSet(L.id,5);
  assert.equal(questions.length,5,L.id+" generator must return 5");
  for(const [i,q] of questions.entries()){
   generated++;
   assert.ok(q.q&&q.e,L.id+"/generated/"+i+" missing statement/explanation");
   if(q.in){
    const raw=q.eqw||(q.num||[]).join(" 或 ");
    const g=gradeTyped(q,raw);
    assert.ok(g&&g.ok===true,L.id+"/generated/"+i+" fails its answer: "+raw);
   }else{
    assert.ok(q.o&&q.a>=0&&q.a<q.o.length,L.id+"/generated/"+i+" malformed options");
   }
  }
 }
}
assert.equal(fixed,240);
assert.equal(generated,4000);
console.log("PASS: 8 lessons; 240 fixed questions; 4,000 generated sample questions; "+typed+" fixed typed responses; nav and license.");
