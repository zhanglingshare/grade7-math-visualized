'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const M=require('./math-core.js'),C=require('./chapter-two-core.js'),val=q=>M.num(q.options[q.correct]);
A.equal(C.lessons.length,7);A.equal(C.bank.length,84);A.equal(C.review.length,21);
A.equal(new Set(C.bank.concat(C.review).map(q=>q.id)).size,105);
for(const l of C.lessons){A.equal(l.steps.length,4);A.equal(l.paper.length,2);A.equal(C.bank.filter(q=>q.lesson===l.id).length,12);for(let s=0;s<4;s++)for(let v=0;v<3;v++){const q=C.guided(l.id,s,null,v);A.ok(q.options.length>=2&&q.options.length<=3);A.equal(new Set(q.options).size,q.options.length,l.id+'/'+s);A.ok(q.correct>=0&&q.correct<q.options.length);A.ok(q.formula&&q.why&&q.controls.length);}}
for(let a=-8;a<=8;a+=.5)for(let b=-8;b<=8;b+=.5){for(const s of [0,1])A.equal(val(C.guided('add',s,{a,b})),a+b);A.equal(val(C.guided('subtract',1,{a,b})),a-b);A.equal(val(C.guided('subtract',3,{a,b})),Math.abs(a-b));A.equal(C.guided('add',2,{a,b}).result,b);A.equal(C.guided('add',3,{a,b}).result,b);if(b)A.ok(Math.abs(val(C.guided('divide',0,{a,b}))-a/b)<1e-10);else A.equal(C.guided('divide',0,{a,b}).correct,2);}
for(let a=-5;a<=5;a++)for(let b=-3;b<=3;b++)for(const c of [-2,0,2]){const q=C.guided('multiply',1,{a,b,c}),product=a*b*c;A.equal(q.result,product);A.equal(q.correct,product===0?2:product>0?0:1);A.equal(C.guided('multiply',3,{a,b,c}).result,a*(b+c));}
for(const raw of ['-2/3','-3','1/2','1','-1'])A.ok(Math.abs(val(C.guided('multiply',2,{raw}))-1/M.num(raw))<1e-10);
A.equal(C.guided('multiply',2,{raw:'0'}).result,null);
for(let a=1;a<=4;a++)for(let n=1;n<=5;n++){A.equal(val(C.guided('power',0,{a,n})),(-a)**n);A.equal(C.guided('power',1,{a,n}).correct,(-a)**n===-(a**n)?0:1);A.equal(val(C.guided('power',2,{a,n})),(-a)**n);}
for(const q of C.bank.concat(C.review)){A.ok(q.gate.options.length===3&&q.gate.correct>=0&&q.gate.correct<3);if(q.kind==='choice'){A.equal(new Set(q.options).size,q.options.length,q.id);A.ok(C.grade(q,q.correct));A.ok(!C.grade(q,(q.correct+1)%3));}else{A.ok(C.grade(q,q.answer),q.id);A.ok(!C.grade(q,'not a number'),q.id);}}
const get=id=>C.bank.find(q=>q.id===id);
A.ok(C.grade(get('c2:add:04'),'-0.25'));
A.ok(!C.grade(get('c2:round:00'),'1.8'),'Retain the precision zero');A.ok(C.grade(get('c2:round:00'),'1.80'));
A.ok(C.grade(get('c2:science:03'),'6.96x10^5'));
for(const s of ['69.6×10^4','0.696×10^6','6.96×10^5;alert(1)','1×10^9999','0×10^5'])A.equal(C.parseScience(s),null);
const ledger=C.ledger(['30','-6.5','-15.2','0','-3','10','-2.3'],'15');
for(const [key,value]of Object.entries({income:'40',expense:'27',net:'13',balance:'28',average:'27/7'}))A.equal(M.fmt(ledger[key]),value);
A.throws(()=>C.ledger(['1/0'],'0'));
for(let a=0;a<64;a++)for(let b=0;b<64;b++){const sum=C.baseAddition(a,b,2);A.equal(sum.digits,(a+b).toString(2));let prior=0;sum.columns.forEach(c=>{A.equal(c.carryIn,prior);A.equal(c.a+c.b+c.carryIn,c.digit+2*c.carryOut);prior=c.carryOut;});}
for(let a=0;a<8;a++)for(let b=0;b<8;b++)for(let c=0;c<8;c++)A.equal(C.octalValue([a,b,c]),parseInt(`${a}${b}${c}`,8));
A.throws(()=>C.octalValue([1,8,0]));A.deepEqual(C.baseAddition(105,35,60),{hours:2,minutes:20});
A.equal(M.magic([3,-2,-1,-4,0,4,1,2,-3]).solved,true);A.equal(M.magic([3,-2,-1,-4,0,4,1,2,-2]).valid,false);
for(const sequence of C.orderCases){A.ok(sequence.steps.at(-1).done);A.equal(sequence.steps.at(-1).expression,sequence.answer);for(const step of sequence.steps.slice(0,-1))A.ok(step.correct>=0&&step.correct<step.options.length);}
const before={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/content.js','utf8'),before);const original=JSON.stringify(before.window.MathCourse);before.window.MathLab=M;vm.runInNewContext(fs.readFileSync(__dirname+'/chapter-two-core.js','utf8'),before);A.equal(JSON.stringify(before.window.MathCourse),original,'Original experiments and answer ordering are retained');
console.log('通过：7主题28步、84练习＋21复习；1089组数轴/除法、231组乘法符号；括号奇偶、精度末尾0；4096组二进制加法、512组八进制；账本及原课程。');

let controls=0;
for(const l of C.lessons)for(let step=0;step<4;step++)for(let variant=0;variant<3;variant++){
 const q=C.guided(l.id,step,null,variant);
 for(const c of q.controls){const v=q.values[c.key];if(c.type==='range')A.ok(v>=c.min&&v<=c.max,l.id+'/'+step+'/'+c.key);else A.ok(c.options.some(o=>String(o[0])===String(v)),l.id+'/'+step+'/'+c.key);
 const cases=c.type==='range'?[c.min,0,c.max].filter(x=>x>=c.min&&x<=c.max):c.options.map(o=>o[0]);for(const value of cases){const changed=C.guided(l.id,step,Object.assign({},q.values,{[c.key]:value}),variant);A.equal(new Set(changed.options).size,changed.options.length,l.id+'/'+step+' '+JSON.stringify(changed.values));controls++;}}
}
A.ok(C.grade(get('c2:round:00'),'+01.80'));A.ok(!C.grade(get('c2:round:00'),'1.800'));console.log({controlCases:controls});
