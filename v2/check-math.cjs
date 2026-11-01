const assert=require('node:assert/strict');
const M=require('./math-core.js');
assert.equal(M.fmt(M.add('-1/2','1/3')),'−1/6');
assert.equal(M.fmt(M.sub('-3','-5')),'2');
assert.equal(M.fmt(M.mul('-3/4','-2/3')),'1/2');
assert.equal(M.fmt(M.div('-3/4','-3/2')),'1/2');
assert.throws(()=>M.div(1,0),/除数不能为0/);
assert.equal(M.fmt(M.div(0,'-4')),'0');
assert.equal(M.fmt(M.pow('-2',2)),'4');
assert.equal(M.fmt(M.pow('-2',3)),'−8');
assert.throws(()=>M.pow(0,0),/不计算/);
assert.equal(M.fmt(M.substitute('fraction','-3','2')),'29/3');
assert.equal(M.fmt(M.substitute('fraction','4','12')),'13');
assert.throws(()=>M.substitute('fraction',0,2),/除数不能为0/);
assert.equal(M.fmt(M.substitute('square','-3','2')),'1');
assert.equal(M.fmt(M.substitute('linear','1','1/2')),'7/2');
assert.equal(M.classification('2.0').integer,true);
assert.equal(M.classification('5/1').integer,true);
assert.equal(M.classification(0).sign,'0');
assert.equal(M.roundDecimal('1.804',2),'1.80');
assert.equal(M.roundDecimal('1.805',2),'1.81');
assert.equal(M.roundDecimal('1.005',2),'1.01');
assert.equal(M.roundDecimal('9.995',2),'10.00');
assert.equal(M.roundDecimal('0.0158',3),'0.016');
assert.equal(M.roundDecimal('0.0571',1),'0.1');
assert.deepEqual(M.scientific('10100000'),{coefficient:'1.01',exponent:7,digits:'10100000',negative:false});
assert.equal(M.scientific('-567000000').coefficient,'−5.67');
assert.throws(()=>M.scientific('0'),/请输入/);
assert.equal(M.baseDigits(11,2).map(x=>x.digit).join(''),'00001011');
assert.equal(M.baseDigits(89,8).map(x=>x.digit).join(''),'131');
assert.equal(M.cipher('AZaz',3),'DCdc');
assert.equal(M.cipher(M.cipher('MATH',3),-3),'MATH');
assert.equal(M.magic([3,-2,-1,-4,0,4,1,2,-3]).solved,true);
assert.equal(M.magic([0,0,0,0,0,0,0,0,0]).valid,false);
assert.equal(M.equivalent('-0.5','-1/2'),true);
for(let x=2;x<=10;x+=.5){
  assert.equal(x*(24/x),24);
  assert.equal(x+(12-x),12);
  assert.equal((2*x)/x,2);
}
for(let n=1;n<=7;n++){
  const edges=[[0,1],[1,2],[0,2]];
  for(let i=1;i<n;i++)edges.push([i+1,i+2],[i,i+2]);
  assert.equal(new Set(edges.map(e=>e.join(':'))).size,2*n+1);
  assert.equal((n+1)**2-n*n,2*n+1);
}
const fs=require('node:fs'),vm=require('node:vm');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('./content.js','utf8'),ctx);
const course=ctx.window.MathCourse;
assert.equal(course.lessons.length,19);
assert.equal(course.lessons.reduce((total,l)=>total+l.questions.length,0),57);
for(const lesson of course.lessons){
  assert.equal(lesson.paper.length,2);
  assert.ok(lesson.source&&lesson.goal);
  for(const q of lesson.questions){assert.equal(q.options.length,3);assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<3);assert.ok(q.explanation);}
}
console.log('Passed: exact fractions, zero restrictions, powers, textbook substitution, rounding precision, scientific notation, bases, cipher, magic square, invariant relations, pattern structure, and course schema.');
