const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
require('./math-core.js');
const S = require('./chapter-one-studio.js');
assert.equal(S.lessons.length, 6);
assert.equal(new Set(S.lessons.map(l => l.section)).size, 6);
assert.equal(S.checks.length, 12);
for (const l of S.lessons) {
  assert.equal(l.steps.length, 5);
  assert.equal(l.paper.length, 2);
  for (let step = 0; step < 4; step++) {
    const q = S.question(l.id, step, S.values(l.id, step));
    if (q.operation) continue;
    assert.ok(q.correct >= 0 && q.correct < q.options.length);
    assert.equal(new Set(q.options).size, q.options.length);
    assert.ok(q.why && q.hint);
  }
}
for (let h = -5; h <= 5; h++) for (let z = -4; z <= 4; z++) for (const direction of [-1, 1]) {
  const v = {height:h, zero:z, direction};
  const q = S.question('signed', 0, v);
  assert.equal(S.relative(v)||0, ((h-z)*direction)||0);
  assert.equal(Number(q.options[q.correct].replace('−','-')), ((h-z)*direction)||0);
}
for (let a = -5; a <= 5; a += .5) {
  for (const flips of [1, 2, 3]) {
    const q = S.question('opposite', 0, {a, flips});
    assert.equal(Number(q.options[q.correct].replace('−','-')), a === 0 ? 0 : a*(flips%2 ? -1 : 1));
    assert.equal(Math.abs(S.flip(a,flips)), Math.abs(a));
  }
  const q = S.question('absolute', 0, {a});
  assert.equal(Number(q.options[q.correct].replace('−','-')), Math.abs(a));
  assert.ok(Math.abs(a) >= 0);
}
for (let radius = -2; radius <= 5; radius += .5) {
  assert.equal(S.question('absolute', 2, {radius}).correct, radius < 0 ? 0 : radius === 0 ? 1 : 2);
}
for (const unit of [.5,1,2]) {
  const q = S.question('axis',2,{unit});
  assert.equal(Number(q.options[q.correct]), 3*unit);
  assert.equal(S.fractionPosition(-2.5,unit),-2.5/unit);
  assert.ok(S.question('axis',3,{unit,cursor:-2.5,target:-2.5}).good);
  assert.ok(!S.question('axis',3,{unit,cursor:2.5,target:-2.5}).good);
}
for (const origin of [false,true]) for (const arrow of [false,true]) for (const spacing of [false,true]) {
  assert.equal(S.question('axis',1,{origin,arrow,spacing}).correct,origin&&arrow&&spacing?0:1);
}
for (const sample of S.samples) {
  const actual = global.MathLab.classification(sample.raw);
  assert.equal(actual.integer,sample.integer);
  assert.equal(S.question('rational',0,{sample:sample.raw}).correct,sample.integer?0:1);
  assert.equal(S.question('rational',3,{sample:sample.raw}).correct,sample.sign+1);
}
for (let a=-5;a<=5;a+=.5) for (let b=-5;b<=5;b+=.5) {
  assert.equal(S.question('order',0,{a,b}).correct,a<b?0:a===b?1:2);
  assert.equal(S.question('order',1,{a,b}).correct,Math.abs(a)<Math.abs(b)?0:Math.abs(a)===Math.abs(b)?1:2);
  assert.equal(S.distance(a,b),Math.abs(a-b));
}
for (const item of S.checks) {
  assert.ok(S.lessons.some(l=>l.id===item.lesson));
  assert.ok(item.q.correct>=0&&item.q.correct<item.q.options.length);
}
const original={window:{}};
vm.runInNewContext(fs.readFileSync(__dirname+'/content.js','utf8'),original);
const unchanged=JSON.stringify(original.window.MathCourse);
vm.runInNewContext(fs.readFileSync(__dirname+'/chapter-one-studio.js','utf8'),original);
assert.equal(JSON.stringify(original.window.MathCourse),unchanged,'新课程不改写原有课题与旧作答顺序');
console.log('通过：六节24步；基准与方向198种组合；相反数与绝对值；距离正零负；三种单位；数轴三要素8种组合；全部数字卡；大小与距离441组比较；原有课程保留。');
