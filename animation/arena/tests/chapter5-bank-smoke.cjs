"use strict";
/* Run: node animation/arena/tests/chapter5-bank-smoke.cjs */
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const dir=path.resolve(__dirname,".."),source=fs.readFileSync(path.join(dir,"chapter5-bank.js"),"utf8");
const window={};vm.runInNewContext(source,{window});
const B=window.C5_QUESTION_BANK;
assert.equal(B.length,500);
assert.equal(new Set(B.map(q=>q.id)).size,500);
assert.deepEqual(["5.1","5.2","5.3"].map(s=>B.filter(q=>q.section===s).length),[100,200,200]);
assert.ok(new Set(B.map(q=>q.stem)).size>=480,"problem stems should not collapse into a tiny set");
assert.equal(new Set(B.map(q=>q.topic)).size,50);
for(const q of B){
 assert.ok(q.id&&q.section&&q.topic&&q.stem&&q.solution);
 assert.ok(q.steps.length>=2&&q.steps.length<=7);
 for(const s of q.steps){
  assert.ok(s.prompt&&s.explain);
  if(s.kind==="choice"){assert.ok(Array.isArray(s.options)&&s.options.length>=2);assert.ok(s.answer>=0&&s.answer<s.options.length);assert.equal(new Set(s.options).size,s.options.length);}
  if(s.kind==="equation"){assert.ok(s.expected&&s.accepted.includes(s.expected));}
  if(s.kind==="number"){assert.notEqual(s.answer,undefined);}
 }
}
function numeric(v){
 if(typeof v==="number")return v;
 const s=String(v).trim();
 if(/^-?\d+(?:\.\d+)?\/-?\d+(?:\.\d+)?$/.test(s)){const [a,b]=s.split("/").map(Number);return a/b;}
 return Number(s);
}
function evaluateLinear(s,x){
 s=String(s).replace(/[−－]/g,"-").replace(/[＋]/g,"+").replace(/[×·]/g,"*").replace(/[÷]/g,"/");
 const raw=s.match(/\d+(?:\.\d+)?|x|[()+\-*/]/gi);assert.ok(raw,"unreadable expression: "+s);
 const t=[];
 for(let i=0;i<raw.length;i++){
  const cur=raw[i],next=raw[i+1];t.push(cur);
  if(next&&(/^\d/.test(cur)||cur==="x"||cur===")")&&(next==="x"||next==="("))t.push("*");
 }
 let p=0;
 function expression(){let v=term();while(t[p]==="+"||t[p]==="-"){const op=t[p++],w=term();v=op==="+"?[v[0]+w[0],v[1]+w[1]]:[v[0]-w[0],v[1]-w[1]];}return v;}
 function term(){let v=unary();while(t[p]==="*"||t[p]==="/"){const op=t[p++],w=unary();if(op==="*"){assert.ok(!(v[0]!==0&&w[0]!==0),"nonlinear expression "+s);v=[v[0]*w[1]+w[0]*v[1],v[1]*w[1]];}else{assert.equal(w[0],0,"non-constant divisor "+s);assert.notEqual(w[1],0);v=[v[0]/w[1],v[1]/w[1]];}}return v;}
 function unary(){if(t[p]==="+"){p++;return unary();}if(t[p]==="-"){p++;const v=unary();return[-v[0],-v[1]];}if(t[p]==="("){p++;const v=expression();assert.equal(t[p++],")");return v;}const z=t[p++];if(z==="x")return[1,0];if(/^\d/.test(z))return[0,Number(z)];throw Error("bad token "+z);}
 const v=expression();assert.equal(p,t.length,"unparsed tokens in "+s);return v[0]*x+v[1];
}
for(const q of B.filter(q=>q.section!=="5.1")){
 const n=q.steps.filter(s=>s.kind==="number");assert.ok(n.length,q.id+" must ask for a numeric result");
 const x=numeric(n[n.length-1].answer);
 for(const s of q.steps.filter(s=>s.kind==="equation")){
  const sides=s.expected.split("=");assert.equal(sides.length,2,q.id+" equation needs one equals sign");
  const checkAt=s.checkAt===undefined?x:s.checkAt;
  const left=evaluateLinear(sides[0],checkAt),right=evaluateLinear(sides[1],checkAt);
  assert.ok(Math.abs(left-right)<1e-7,q.id+" step does not hold at its answer: "+s.expected+" ("+left+" vs "+right+")");
 }
 if(q.audit)assert.ok(Math.abs(q.audit.left-q.audit.right)<1e-7,q.id+" audit values differ");
}
for(const q of B.filter(q=>q.section==="5.1"&&q.audit&&q.topic!=="检验方程的解"))assert.ok(Math.abs(q.audit.left-q.audit.right)<1e-7,q.id+" 5.1 substitution audit differs");
for(const q of B.filter(q=>q.topic==="检验方程的解")){
 const left=q.audit.left,right=q.audit.right,said=q.steps[0].options[q.steps[0].answer];
 assert.equal(said,left===right?"是":"不是",q.id+" root check mismatch");
}
for(const topic of ["等式的性质","合并同类项","移项与变号","去括号与分配律","去分母：单个分数项","无限循环小数化分数","生产配套","分段工作量","销售盈亏与百分率","球赛积分与整数检验","能效与长期费用","分段收费与临界点","月票费用比较"]){
 assert.ok(B.some(q=>q.topic===topic),"missing curriculum topic "+topic);
}
console.log("PASS: 500 unique IDs, 50 problem families, 100/200/200 section split, guided steps, and 400 equation/model items algebraically checked.");
