const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
require('./math-core.js');
const original={window:{}};
vm.runInNewContext(fs.readFileSync(__dirname+'/content.js','utf8'),original);
const before=JSON.stringify(original.window.MathCourse.lessons.filter(l=>l.chapter!==1));
global.MathCourse=JSON.parse(JSON.stringify(original.window.MathCourse));
const C=require('./chapter-one.js');
assert.equal(JSON.stringify(global.MathCourse.lessons.filter(l=>l.chapter!==1)),before,'第二、三章保持不变');
for(const l of global.MathCourse.lessons.filter(l=>l.chapter===1)){
  const old=original.window.MathCourse.lessons.find(a=>a.id===l.id);
  assert.deepEqual(l.questions.slice(0,3),JSON.parse(JSON.stringify(old.questions)),'保留原题顺序，兼容已有作答记录');
  assert.ok(l.questions.length>=7);
  for(const q of l.questions){assert.ok(q.correct>=0&&q.correct<q.options.length);assert.equal(new Set(q.options).size,q.options.length);}
}
assert.deepEqual(C.integers(-3,4,false),[-2,-1,0,1,2,3]);
assert.deepEqual(C.integers(-3,4,true),[-3,-2,-1,0,1,2,3,4]);
assert.deepEqual(C.integers(-1,0,false),[]);
assert.deepEqual(C.integers(-2.5,1.5,false),[-2,-1,0,1]);
assert.equal(C.opposite(-3,1),3);assert.equal(C.opposite(-3,2),-3);assert.equal(C.opposite(0,3),0);
assert.equal(C.inverseCount(-1),0);assert.equal(C.inverseCount(0),1);assert.equal(C.inverseCount(2.5),2);
assert.ok(C.classification('6/3').integer);assert.ok(C.classification('2.0').integer);assert.equal(C.classification('1/3').integer,false);
assert.equal(C.classification('0').sign,'0');assert.throws(()=>C.classification('1/0'));
let v={...C.defaults,actual:2530,tolerance:30};let c={selected:[],lo:-50,hi:50,guessCount:0};
assert.equal(C.model('baseline','tolerance',v,c).good,true);v.actual=2531;assert.equal(C.model('baseline','tolerance',v,c).good,false);v.actual=2470;assert.equal(C.model('baseline','tolerance',v,c).good,true);
v={...C.defaults,height:3,zero:0,direction:'down'};assert.equal(C.model('baseline','direction',v,c).value,-3);
for(let a=-5;a<=5;a+=.5){v={...C.defaults,a};const m=C.model('mirror','absolute',v,c);assert.equal(m.value,Math.abs(a));assert.equal(Number(m.choices[m.expected].replace('−','-')),Math.abs(a));}
assert.equal(C.model('compare','closest',{...C.defaults,ballSet:'0'},c).expected,4);
assert.equal(C.model('compare','closest',{...C.defaults,ballSet:'1'},c).expected,2);
for(let secret=-50;secret<=50;secret++){
 let lo=-50,hi=50,count=0;
 while(true){const g=Math.floor((lo+hi)/2),r=C.guessStep(secret,lo,hi,g);assert.ok(!r.error);count++;assert.ok(r.lo<=secret&&r.hi>=secret);if(r.solved)break;assert.ok(r.hi-r.lo<hi-lo);lo=r.lo;hi=r.hi;}
 assert.ok(count<=7);
}
assert.ok(C.guessStep(8,-5,10,11).error);assert.ok(C.guessStep(8,-5,10,2.5).error);
const totals=global.MathCourse.lessons.filter(l=>l.chapter===1).reduce((a,l)=>({questions:a.questions+l.questions.length,paper:a.paper+l.paper.length}),{questions:0,paper:0});
console.log('通过：端点、0、方向、分类、相反数、绝对值、整数区间、101个猜数目标、旧答题顺序、第二三章内容保留。');
console.log(JSON.stringify({modes:Object.values(C.spec).reduce((n,s)=>n+s.modes.length,0),...totals}));
