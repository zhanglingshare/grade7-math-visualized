/* Second chapter: exact arithmetic and original learning tasks, mapped to the uploaded textbook. */
(function (global) {
'use strict';
var M=global.MathLab;
if(!M&&typeof require==='function')M=require('./math-core.js');
var num=M.num, fmt=function(x){return M.fmt(x);}, par=M.par;
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
var lessons=[
{id:'add',section:'2.1.1',name:'有理数的加法',title:'加上一个数，就一定变大？',pages:'25—30',symbol:'＋',old:'add',steps:['同向累加','异向抵消','遇见零','换位与配对'],summary:'同号相加看累积，异号相加看抵消；加负数会向左。交换、结合时，符号跟着数一起走。',paper:[['计算 (−3/4)＋1/2，并画图说明结果的正负。','−3/4＋2/4＝−1/4。向左3/4再向右1/2，最后在0左侧1/4。'],['计算 17＋(−9)＋(−17)＋4，说明怎样配对更简便。','把17与−17配成0，再算−9＋4＝−5；交换时保留每个数的符号。']]},
{id:'subtract',section:'2.1.2',name:'有理数的减法',title:'减去负数，为什么向右？',pages:'30—36',symbol:'−',old:'add',steps:['把减法改写','减去负数','符号一起走','距离与位移'],summary:'差加回减数，应等于被减数。减去b等于加上b的相反数，先转换再重排；两点的距离是|a−b|，总路程另算。',paper:[['计算 (−2.5)−(−4.2)＋(−1.7)，先写成加法。','−2.5＋4.2＋(−1.7)＝0。'],['从0先向东4km，再向西7km，最后返回0。返回前坐标、到0距离、总路程分别是多少？','返回前坐标−3km，到0距离3km；全程路程4＋7＋3＝14km。']]},
{id:'multiply',section:'2.2.1',name:'有理数的乘法',title:'负负得正，能说清理由吗？',pages:'38—42、50',symbol:'×',old:'multiply',steps:['让规律延续','数负因数','凑出乘积1','分配到每一项'],summary:'先看是否有0，再数负因数；乘积为1才叫互为倒数。分配律要乘到每一项。',paper:[['计算 (−3/5)×(−10/9)×(−3)，先判断符号，再约分。','有3个负因数，积为负；绝对值为(3/5)×(10/9)×3＝2，所以结果−2。'],['用两种方法计算 (1/3−1/4)×12。','先通分：(4/12−3/12)×12＝1；分配：12/3−12/4＝4−3＝1。']]},
{id:'divide',section:'2.2.2',name:'有理数的除法',title:'除以分数，究竟谁翻过来？',pages:'43—49',symbol:'÷',old:'divide',steps:['乘回去验商','只倒除数','分数的负号','同级从左到右'],summary:'除以非零数等于乘它的倒数；被除数保留。乘除同级从左到右；0不能作除数。',paper:[['计算 (−3/4)÷(−9/8)，写出转化后的乘法。','(−3/4)×(−8/9)＝2/3；只把除数−9/8变成其倒数。'],['计算 18÷(−3)×(−2)。为什么不能先算后面的乘法？','从左到右：18÷(−3)＝−6，再乘−2得12。先把(−3)×(−2)算成6会改变原式。']]},
{id:'power',section:'2.3.1',name:'乘方与混合运算',title:'差一对括号，答案就反了？',pages:'51—54、57',symbol:'aⁿ',old:'power',steps:['把幂拆开','括号管着谁','追踪幂的规律','选择下一步'],summary:'乘方是相同因数连乘。看清底数和括号；括号优先，再乘方、乘除、加减，同级从左到右。',paper:[['分别计算 (−3)²、−3²、(−3)³，用连乘形式解释。','分别为9、−9、−27。−3²的平方只作用在3上；(−3)²的底数是整个−3。'],['计算 5＋(−2)³÷4−(−1)²，标出每一步运算顺序。','先乘方：5＋(−8)÷4−1；再除法：5−2−1＝2。']]},
{id:'science',section:'2.3.2',name:'科学记数法',title:'零很多，怎样一眼看清大小？',pages:'54—57',symbol:'10ⁿ',old:'notation',steps:['10的幂','把大数压缩','把数还原','先统一单位'],summary:'把大数写成a×10ⁿ，正数的a在1至10之间且不含10；负数保留负号。转换前先看单位。',paper:[['把703000000写成科学记数法，再把2.004×10⁵写成普通数。','7.03×10⁸；200400。中间的0不能丢。'],['1天有86400秒，按365天计，一年有多少秒？用科学记数法表示。','86400×365＝31536000秒＝3.1536×10⁷秒。']]},
{id:'round',section:'2.3.3',name:'近似数与精确度',title:'1.80最后那个0，能删吗？',pages:'55—57',symbol:'≈',old:'notation',steps:['找到保留位','看下一位','保留末尾0','遇到连续进位'],summary:'先确定精确到哪一位，再看后一位。作为近似记录，1.8和1.80表示的精确度不同。',paper:[['把2.304分别精确到十分位、百分位和千分位。','依次为2.3、2.30、2.304。2.30的0说明精确到百分位。'],['把9.996精确到百分位，再说明结果保留几位小数。','9.996≈10.00。连续进位，但百分位的精度仍要用两位小数表示。']]}
];
function lesson(id){return lessons.find(function(l){return l.id===id;})||lessons[0];}
function choice(prompt,options,correct,why,extra){return Object.assign({prompt:prompt,options:options,correct:correct,why:why},extra||{});}
function alternatives(answer,wrong,rotation){var list=[String(answer)];(wrong||[]).forEach(function(x){if(list.indexOf(String(x))<0)list.push(String(x));});var n=0;while(list.length<3){var t=String(++n+17);if(list.indexOf(t)<0)list.push(t);}list=list.slice(0,3);var r=(rotation||0)%3;while(r--)list.push(list.shift());return {options:list,correct:list.indexOf(String(answer))};}
function numeric(prompt,answer,why,extra,rotation){var f=M.parse(answer),n=num(f),a=alternatives(fmt(f),[fmt(M.fraction(-f.n,f.d)),fmt(M.add(f,1)),fmt(M.sub(f,1))],rotation);return choice(prompt,a.options,a.correct,why,Object.assign({answer:fmt(f),result:n},extra));}
function defaults(id,step,variant){var k=(variant||0)%3,v={a:5+k,b:3,c:-2,n:2,raw:'1.804',digits:2,example:0};
 if(id==='add'){if(step===1){v.a=-3-k;v.b=5+2*k;}if(step===2){v.a=0;v.b=-4-k;}if(step===3){v.a=8+k;v.b=-6-k;}}
 if(id==='subtract'){v.a=3+k;v.b=step===1?-2-k:5+k;if(step===2){v.a=-8-k;v.b=3+k;v.c=-5-k;}if(step===3){v.a=-3-k;v.b=4+k;}}
 if(id==='multiply'){v.a=-3-k;v.b=-2;v.c=step===1?-2:4;v.raw=['-2/3','-3','0'][k];if(step===3){v.b=2;v.c=-5;}}
 if(id==='divide'){v.a=8+k*4;v.b=-4;v.raw=['-3/4','2/3','-5/6'][k];if(step===2){v.a=-6-k*2;v.b=-4;}v.example=k;}
 if(id==='power'){v.a=2+k;v.n=step===2?3:2;v.example=k;}
 if(id==='science'){v.n=5+k;v.raw=['696000','10100000','-567000000'][k];v.example=k;}
 if(id==='round'){v.raw=[['1.804','2.304','6.5378'],['0.0158','0.0571','3.8963'],['1.804','2.304','12.004'],['9.996','1.995','3.999']][step][k];v.digits=step===1?3:2;}
 return v;
}
var orderCases=[
{title:'同级运算不插队',answer:'−8',steps:[{expression:'12 ÷ (−3) × 2',options:['12 ÷ (−3)','(−3) × 2','12 × 2'],correct:0,why:'乘除同级，从左到右，先得到−4。'},{expression:'(−4) × 2',options:['−8','8','−2'],correct:0,why:'异号相乘得负，4×2＝8。'},{expression:'−8',done:true}]},
{title:'先乘方，再乘除',answer:'0',steps:[{expression:'4 ＋ (−2)³ ÷ 2',options:['(−2)³','4＋(−2)','3÷2'],correct:0,why:'先算乘方：(−2)³＝−8。'},{expression:'4 ＋ (−8) ÷ 2',options:['4＋(−8)','(−8)÷2','先去负号'],correct:1,why:'先除法：(−8)÷2＝−4。'},{expression:'4 ＋ (−4)',options:['−8','0','8'],correct:1,why:'互为相反数的两个数相加得0。'},{expression:'0',done:true}]},
{title:'先把括号当整体',answer:'8',steps:[{expression:'[(−3)＋1]² × 2',options:['1²','(−3)＋1','先算2×2'],correct:1,why:'括号内先算：−3＋1＝−2。'},{expression:'(−2)² × 2',options:['(−2)²','−2×2','先去括号'],correct:0,why:'乘方先于乘法：(−2)²＝4。'},{expression:'4 × 2',options:['6','8','−8'],correct:1,why:'4×2＝8。'},{expression:'8',done:true}]},
{title:'负号在乘方外',answer:'−16',steps:[{expression:'−2² ＋ 3×(−4)',options:['2²','(−2)²','先算−2＋3'],correct:0,why:'没有括号时，底数是2，负号在平方外。'},{expression:'−4 ＋ 3×(−4)',options:['−4＋3','3×(−4)','把所有负号删掉'],correct:1,why:'先乘法，3×(−4)＝−12。'},{expression:'−4 ＋ (−12)',options:['16','8','−16'],correct:2,why:'同号相加保留负号，绝对值相加。'},{expression:'−16',done:true}]},
{title:'分数与括号一起看',answer:'−1/2',steps:[{expression:'[(−1/2)＋3/4]÷(−1/2)',options:['(−1/2)＋3/4','3/4÷(−1/2)','先把两个分数都翻面'],correct:0,why:'先算括号：−2/4＋3/4＝1/4。'},{expression:'(1/4)÷(−1/2)',options:['(4)×(−2)','(1/4)×(−2)','(1/4)×(−1/2)'],correct:1,why:'只把除数变成倒数，保留被除数1/4。'},{expression:'(1/4)×(−2)',options:['−1/2','1/2','−8'],correct:0,why:'异号得负，约分后为−1/2。'},{expression:'−1/2',done:true}]},
{title:'减去负商',answer:'9',steps:[{expression:'6−(−3)²÷(−3)',options:['6−(−3)','(−3)²','先算²÷(−3)'],correct:1,why:'先算乘方，括号中整个−3作底数，平方得9。'},{expression:'6−9÷(−3)',options:['6−9','9÷(−3)','把减号改加号但不变数'],correct:1,why:'先除法，9÷(−3)＝−3。'},{expression:'6−(−3)',options:['3','−9','9'],correct:2,why:'减负3等于加正3，结果9。'},{expression:'9',done:true}]}
];
function range(key,label,min,max,step){return {key:key,label:label,min:min,max:max,step:step||1,type:'range'};}
function select(key,label,options){return {key:key,label:label,options:options.map(function(x){return Array.isArray(x)?x:[String(x),String(x)];}),type:'select'};}
function guided(id,step,values,variant){var v=Object.assign(defaults(id,step,variant),values||{}),a=Number(v.a),b=Number(v.b),c=Number(v.c),n=Number(v.n),out,q,model='line',formula='',detail='',controls=[range('a','第一个数',-10,10,.5),range('b','第二个数',-10,10,.5)];
 if(id==='add'){
  var sum=a+b;out=sum;formula=par(a)+' ＋ '+par(b)+' ＝ '+fmt(sum);
  q=numeric('两段变化合起来，最后在哪个数？',sum,'加上的数决定第二段方向；起点与终点要分清。',{},variant);
  if(step===2){q=choice('当一个加数是0时，另一个数会改变吗？',['不会改变','一定变大','一定变小'],0,'加0不移动；改变参数后仍然如此。');v.a=0;a=0;out=b;formula='0 ＋ '+par(b)+' ＝ '+fmt(b);controls=[range('b','另一个加数',-10,10,.5)];}
  if(step===3){model='law';out=b;formula=par(a)+'＋'+par(b)+'＋'+par(-a)+'＝'+fmt(b);q=choice('第1项与第3项先配对，依据是什么？',['互为相反数的两个数相加得0','相乘得到1，所以可以约掉','重排时可以随意去掉负号'],0,'先把互为相反数的两个数配对；交换与结合时，每个数带着自己的符号。');v.c=-a;}
 }
 if(id==='subtract'){
  out=a-b;formula=par(a)+'−'+par(b)+'＝'+par(a)+'＋'+par(-b)+'＝'+fmt(out);
  q=step===0?choice('先把减法变成加法，哪一种改写正确？',[par(a)+'＋'+par(-b),par(a)+'＋'+par(b),'把被减数、减数都取相反数后相加'],0,'差加回减数应得到被减数。因此减去b等于加上−b，被减数不变。'):numeric('减去第二个数，最终落在哪里？',out,'减去一个数等于加它的相反数。减负数会增加，减正数会减少。',{},variant);
  if(step===0&&b===0)q=choice('减去0，哪条规则对任意被减数都成立？',['保留原来的数','结果总是0','把原数变号'],0,'减去0等于加0，结果仍是原数。');
  if(step===2){model='law';out=a+b-c;formula=par(a)+'＋'+par(b)+'−'+par(c)+'＝'+par(a)+'＋'+par(b)+'＋'+par(-c)+'＝'+fmt(out);q=choice('最后一个减法变成加法，应加上谁？',[fmt(-c),fmt(c)],0,'取的是减号后面整个数的相反数；前面的加数不跟着变。');if(c===0)q=choice('最后的减0，会怎样改变前面部分的值？',['不改变前面部分的值','一定变为0','把前面的数全部变号'],0,'减去0等于加0。');controls.push(range('c','被减去的数',-8,8,1));}
  if(step===3){model='distance';out=Math.abs(a-b);formula='两点距离＝|'+fmt(a)+'−'+par(b)+'|＝'+fmt(out);q=numeric('A、B两个点之间的距离是多少？',out,'距离与点的左右顺序无关，距离不为负；a−b本身可能为负。',{},variant);}
 }
 if(id==='multiply'){
  model=step===0?'sequence':step===1?'factors':step===2?'reciprocal':'distribute';out=a*b;formula=par(a)+'×'+par(b)+'＝'+fmt(out);controls=[range('a','因数a',-5,5,1),range('b','因数b',-5,5,1)];
  if(step===0){controls=[range('a','固定第一个因数',-5,5,1),select('b','把第二个因数继续减小',[-1,-2,-3])];q=numeric('让同样的变化规律继续，最后一个积是多少？',out,'第二个因数每减小1，积就减去a；a为负时，积反而增加。规律可帮助猜想，分配律说明见“为什么负负得正”。',{},variant);}
  if(step===1){out=a*b*c;formula=[a,b,c].map(par).join(' × ')+' ＝ '+fmt(out);q=choice('先不算大小，乘积的符号是？',['正数','负数','0'],out===0?2:out>0?0:1,'先检查有没有0；没有0时，负因数偶数个得正、奇数个得负。');controls.push(select('c','第三个因数',[-2,2,0]));}
  if(step===2){a=num(v.raw);controls=[select('raw','选一个数',['-2/3','-3','1/2','1','-1','0'])];out=a===0?null:1/a;formula=a===0?'0 × 任何数都不能得到1':par(v.raw)+' × '+M.par(M.div(1,v.raw))+' ＝ 1';q=a===0?choice('0的倒数是什么？',['0','1','0没有倒数'],2,'0乘任何数都得0，不可能得到1。'):numeric('哪个数乘回原数，恰好等于1？',M.div(1,v.raw),'乘积是1的两个数互为倒数；负数的倒数仍为负数。',{},variant);}
  if(step===3){out=a*(b+c);formula=par(a)+'×['+par(b)+'＋'+par(c)+']＝'+par(a)+'×'+par(b)+'＋'+par(a)+'×'+par(c)+'＝'+fmt(out);q=choice('对任意a、b、c，按分配律怎样展开a×(b＋c)？',['a×b ＋ a×c','a×b ＋ c','a×(b×c)'],0,'括号中的每一项都要乘同一个数；特别留意负号。');controls.push(range('c','括号里的第二项',-6,6,1));}
 }
 if(id==='divide'){
  controls=[range('a','被除数',-24,24,.5),range('b','除数',-8,8,.5)];
  model='division';out=b===0?null:a/b;formula=b===0?'除数为0，这个除法没有意义':par(a)+'÷'+par(b)+'＝'+par(a)+'×'+M.par(M.div(1,b))+'＝'+fmt(M.div(a,b));
  q=b===0?choice('除数是0，这道除法能计算吗？',['商为0','商为被除数','不能，除数不能为0'],2,'除法必须能乘回去。除数为0时，不能确定一个唯一的商。'):numeric('哪个数乘回除数，能得到被除数？',M.div(a,b),'商×除数＝被除数。0能作被除数，但不能作除数。',{},variant);
  if(step===1){a=num(v.raw);b=-.5;out=num(M.div(v.raw,'-1/2'));formula=par(v.raw)+'÷(−1/2)＝'+par(v.raw)+'×(−2)＝'+fmt(M.div(v.raw,'-1/2'));controls=[select('raw','被除数',['-3/4','2/3','-5/6','0'])];q=choice('除以−1/2，正确转化成哪张乘法卡？',[par(v.raw)+'×(−2)',M.par(v.raw==='0'?0:M.div(1,v.raw))+'×(−1/2)',par(v.raw)+'×(−1/2)'],0,'保留被除数，只把除数−1/2变成倒数−2；然后相乘。');if(a===0)q=numeric('0除以非零数−1/2，结果是多少？',0,'0除以任何非零数都得0；除数仍不能为0。',{},variant);}
  if(step===2){model='fraction';q=b===0?q:numeric('分数线表示除法，这个分数的值是多少？',M.div(a,b),'分子、分母同号得正，异号得负；负号不能凭空消失，分母不能为0。',{},variant);}
  if(step===3){model='order';controls=[select('example','选择算式',orderCases.map(function(x,i){return [i,x.title];}))];var oc=orderCases[Number(v.example)%orderCases.length];q=choice('先选第一步，再把整道题算完。',oc.steps[0].options,oc.steps[0].correct,oc.steps[0].why);formula='同级从左到右；先看括号与运算级别。';out=null;}
 }
 if(id==='power'){
  model=step===2?'powers':'power';controls=[range('a','底数的绝对值',1,4,1),range('n','正整数指数',1,5,1)];out=Math.pow(-a,n);formula='(−'+a+')^'+n+'＝'+Array(n).fill(par(-a)).join('×')+'＝'+fmt(out);
  q=numeric('把底数−'+a+'连乘'+n+'次，结果是多少？',out,'指数表示相同因数的个数，不是把底数乘以指数。',{},variant);
  if(step===1){var inside=Math.pow(-a,n),outside=-Math.pow(a,n);out=inside;formula='('+fmt(-a)+')^'+n+'＝'+fmt(inside)+'；−'+a+'^'+n+'＝'+fmt(outside);q=choice('有括号与没括号，两张卡的结果相同吗？',['相同','不同'],inside===outside?0:1,'(−a)^n把负号一起乘方；−a^n的负号在乘方外。奇数次时可相同，不能一概说不同。');}
  if(step===2){out=Math.pow(-a,n);formula='第n项＝(−'+a+')^n；第'+n+'项＝'+fmt(out);q=numeric('第'+n+'项是多少？（每一项都再乘−'+a+'）',out,'绝对值按倍数变化，符号按奇负偶正交替；再比较“每项加2”“每项除2”的数列。',{},variant);}
  if(step===3){model='order';controls=[select('example','选择算式',orderCases.map(function(x,i){return [i,x.title];}))];var op=orderCases[Number(v.example)%orderCases.length];q=choice('先选第一步，再把整道题算完。',op.steps[0].options,op.steps[0].correct,op.steps[0].why);out=null;formula='括号 → 乘方 → 乘除 → 加减；同级从左到右。';}
 }
 if(id==='science'){
  model=step===0?'ten':'science';controls=step===0?[range('n','10的指数',1,9,1)]:[select('raw','选择大数',['696000','10100000','-567000000','200400','8000000000','701000000000'])];
  if(step===0){out=Math.pow(10,n);formula='10^'+n+'＝'+String(out)+'，1后面有'+n+'个0';q=numeric('10的'+n+'次方，一共有几位数字？',n+1,'指数数的是1后面的0；整个整数的位数还要把最前面的1算上。',{},variant);}
  else {var sci=M.scientific(v.raw),answer=sci.coefficient+'×10^'+sci.exponent;out=Number(v.raw);formula=v.raw+' ＝ '+answer;q=choice('哪张卡是规范的科学记数法？',[answer,String(Number(sci.coefficient.replace('−','-'))*10)+'×10^'+(sci.exponent-1),String(Number(sci.coefficient.replace('−','-'))/10)+'×10^'+(sci.exponent+1)],0,'数值相等还不够：系数的绝对值至少为1且小于10，负号保留。');if(step===2)q=numeric('把 '+answer+' 还原成普通数。',M.parse(v.raw),'指数决定小数点移动的位数；中间的0要保留。',{},variant);}
  if(step===3){model='units';var vals=[{title:'1.496亿千米',raw:'149600000',unit:'km'},{title:'3.6万米',raw:'36000',unit:'m'},{title:'2.04亿人',raw:'204000000',unit:'人'}],u=vals[Number(v.example)%3],sc=M.scientific(u.raw);controls=[select('example','选择数量',vals.map(function(t,i){return [i,t.title];}))];out=Number(u.raw);formula=u.title+'＝'+u.raw+u.unit+'＝'+sc.coefficient+'×10^'+sc.exponent+u.unit;q=choice('先换成基础单位，再写科学记数法，哪张正确？',[sc.coefficient+'×10^'+sc.exponent+' '+u.unit,sc.coefficient+'×10^'+(sc.exponent-4)+' '+u.unit,sc.coefficient+'×10^'+(sc.exponent+4)+' '+u.unit],0,'“万”相当于10000，“亿”相当于100000000；不能把单位漏掉。');v.raw=u.raw;v.unit=u.title;}
 }
 if(id==='round'){
  model='round';controls=[select('raw','选择原数',['1.804','0.0158','9.996','3.8963','0.0571','245.635','2.304','6.5378','12.004','1.995','3.999']),select('digits','保留几位小数',[[0,'0位 · 个位'],[1,'1位 · 十分位'],[2,'2位 · 百分位'],[3,'3位 · 千分位'],[4,'4位 · 万分位']])];
  var rounded=M.roundDecimal(v.raw,Number(v.digits)),other=M.roundDecimal(v.raw,Math.max(0,Number(v.digits)-1)),more=M.roundDecimal(v.raw,Math.min(4,Number(v.digits)+1));var al=alternatives(rounded,[other,more,String(Number(rounded.replace('−','-'))+1)],variant);q=choice('精确到'+['个位','十分位','百分位','千分位','万分位'][Number(v.digits)]+'，哪张记录卡符合要求？',al.options,al.correct,'先找保留位，看后一位；进位后仍要写够指定的小数位，末尾0也是精度信息。');out=Number(rounded.replace('−','-'));formula=v.raw+' ≈ '+rounded+'（保留'+v.digits+'位小数）';
 }
 return Object.assign(q,{lesson:id,step:step,values:v,model:model,a:a,b:b,c:c,n:n,result:out,formula:formula,controls:controls});
}
function gate(prompt,options,correct,why){return {prompt:prompt,options:options,correct:correct,why:why};}
var gates={
add:gate('加法在数轴上，第二段的方向由什么决定？',['加上的数的正负','看见加号就向右','只看第一个数的正负'],0,'方向由加上的数决定；加正数向右，加负数向左，加0不动。'),
subtract:gate('把减法变为加法，应该改变谁？',['两个数都变号','减号改加号，减数取相反数','只把被减数变号'],1,'减号和减号后的数一起改；被减数不改。'),
multiply:gate('多个数相乘，先检查哪件事？',['先看有没有0，再数负因数','只看第一个因数','先把所有负号删掉'],0,'有0先得0；否则奇数个负因数得负，偶数个得正。'),
divide:gate('把除法转成乘法，取谁的倒数？',['两个数都取','只取被除数','只取非零除数'],2,'被除数保持原样；除数变成倒数，除号改乘号。'),
power:gate('算乘方前，先认清什么？',['底数和括号的范围','看到指数就把底数乘指数','只看指数大小'],0,'指数表示几个相同因数连乘；括号决定负号是否属于底数。'),
science:gate('科学记数法的正系数a必须满足？',['0＜a＜1','1≤a＜10','10≤a＜100'],1,'先规范系数，再确定10的指数，负数另保留负号。'),
round:gate('四舍五入时，决定进不进位的是？',['保留位前一位','最后一位，无论精度','保留位后紧接的一位'],2,'先确定保留位，再看后一位；结果写出指定精度。')};
var bank=[];
function input(id,i,prompt,answer,why,kind){bank.push({id:'c2:'+id+':'+String(i).padStart(2,'0'),lesson:id,prompt:prompt,answer:String(answer),why:why,kind:kind||'number',gate:gates[id]});}
function pick(id,prompt,options,correct,why){var i=bank.filter(function(q){return q.lesson===id;}).length;bank.push({id:'c2:'+id+':'+String(i).padStart(2,'0'),lesson:id,prompt:prompt,options:options,correct:correct,why:why,kind:'choice',gate:gates[id]});}
[['-6','10'],['-4','-7'],['3','-8'],['-0.9','1.5'],['-3/4','1/2'],['0','-6'],['2/3','-5/6'],['8','-8']].forEach(function(p,i){input('add',i,par(p[0])+'＋'+par(p[1])+'＝？',fmt(M.add(p[0],p[1])),'先看方向和符号，再计算绝对值；分数先通分。');});
pick('add','17＋(−9)＋(−17)，先配哪一组更省力？',['17与−17','17与−9','把−9变成9'],0,'互为相反数先配成0，剩−9。');
pick('add','加上一个负数后，和与原数相比？',['一定更大','一定更小','不一定'],1,'数轴向左移动，所以比原数小。');
pick('add','总质量＝标准×袋数＋什么？',['偏差的绝对值之和','偏差的有理数和','只加正偏差'],1,'负偏差会抵消正偏差，不能把不足当成多出。');
pick('add','加法交换时，−5＋2可以写成？',['2＋(−5)','5＋(−2)','2＋5'],0,'每一个数带着自己的符号移动。');
[['-3','-5'],['0','7'],['2','5'],['7.2','-4.8'],['-1/2','1/4'],['-2.5','-4.2'],['1.9','-0.6'],['-8','-8']].forEach(function(p,i){input('subtract',i,par(p[0])+'−'+par(p[1])+'＝？',fmt(M.sub(p[0],p[1])),'减去一个数，等于加它的相反数；被减数不改变。');});
pick('subtract','最高2℃，最低−5℃，温差列式是？',['2＋(−5)','(−5)−2','2−(−5)'],2,'温差用最高减最低，结果7℃。');
pick('subtract','把(−6)−(−4)＋2改写成和，应是？',['−6＋4＋2','−6−4＋2','6＋4＋2'],0,'只把减去−4改成加4。');
pick('subtract','从0向右4，再向左7。终点坐标与已走路程是？',['−3与11','−3与−3','3与3'],0,'有向变化4−7＝−3，路程4＋7＝11。');
pick('subtract','A=−3，B=4，两点距离为？',['−7','1','7'],2,'距离＝|−3−4|＝7。');
[['-2','3','-4'],['-6','-5','-2'],['-0.5','-4','1'],['-3/5','-10/9','-3'],['0','-9','-2'],['2/3','-9/4','1'],['-1','-1','-1'],['-4','1/4','1']].forEach(function(p,i){input('multiply',i,p.map(par).join('×')+'＝？',fmt(p.reduce(function(a,b){return M.mul(a,b);},M.parse(1))),'先查0，再确定负因数奇偶；最后约分相乘。');});
pick('multiply','(−3)×(2−5)展开正确的是？',['−6−5','−6＋15','−6−15'],1,'−3要同时乘2和−5。');
pick('multiply','一个非零数乘2，一定比原数大吗？',['一定','不一定，负数是反例','只有整数才一定'],1,'例如−3×2＝−6，反而更小。');
pick('multiply','−2/3的倒数为？',['2/3','−3/2','3/2'],1,'乘积必须为1，且负数的倒数为负。');
pick('multiply','负负得正的解释哪项更充分？',['因为老师说过','为了保持分配律等已有运算规律的一致性','两个负号看着顺眼'],1,'数系扩充不能破坏已有运算律。可以用(−1＋1)×(−1)＝0推得。');
[['-36','9'],['-12/25','-3/5'],['0','-8'],['-6.5','0.13'],['-3/4','-9/8'],['1/5','-6'],['-0.25','3/8'],['12','-3']].forEach(function(p,i){input('divide',i,par(p[0])+'÷'+par(p[1])+'＝？',fmt(M.div(p[0],p[1])),'保留被除数，乘非零除数的倒数，再确定符号与约分。');});
pick('divide','12÷(−3)×2，第一步应算？',['(−3)×2','12÷(−3)','12×2'],1,'乘除同级，从左向右，最终得−8。');
pick('divide','哪个式子有意义？',['7÷0','0÷0','0÷(−7)'],2,'只有第三项除数不为0，商是0。');
pick('divide','分子−6、分母−8的分数等于？',['−3/4','3/4','4/3'],1,'同号相除得正，再约分。');
pick('divide','(−3/4)÷(−1/2)应变成？',['(−3/4)×(−2)','(−4/3)×(−2)','(−3/4)×(−1/2)'],0,'只把除数变成它的倒数。');
[[2,3,true],[3,2,false],[2,4,true],[1,7,true],[3,3,true],[4,2,false],[0,5,true],[2,1,true]].forEach(function(p,i){var answer=p[2]?Math.pow(-p[0],p[1]):-Math.pow(p[0],p[1]);input('power',i,(p[0]===0?'0':p[2]?'(−'+p[0]+')':'−'+p[0])+'^'+p[1]+'＝？',fmt(answer),'先认清底数：括号内的负号参与连乘，括号外的负号保留。');});
// Four cumulative calculations complement the single-power checks.
[
 ['(−2)²×5−(−2)³÷4＝？','22','先乘方，再乘除：20−(−2)＝22。'],
 ['4＋(−2)³÷2＝？','0','先算(−2)³＝−8，再除以2，最后4＋(−4)＝0。'],
 ['18÷(−3)×(−2)＝？','12','乘除同级从左到右：−6×(−2)＝12。'],
 ['5＋(−2)³÷4−(−1)²＝？','2','先算两处幂，再除法：5−2−1＝2。']
].forEach(function(x,i){var q=bank.find(function(q){return q.id==='c2:power:0'+(i+4);});q.prompt=x[0];q.answer=x[1];q.why=x[2];});
pick('power','3⁴表示？',['3×4','4个3相加','4个3相乘'],2,'乘方是相同因数连乘，不是乘指数。');
pick('power','4＋(−2)³÷2，先算？',['4＋(−2)','(−2)³','3÷2'],1,'先乘方，再乘除，再加减。');
pick('power','0的正整数次幂是多少？',['0','1','没有意义'],0,'一个或多个0相乘，结果是0；这里不讨论0⁰。');
pick('power','(−2)ⁿ这列数，第6项是？',['−12','−64','64'],2,'第6项＝(−2)⁶，指数为偶数，结果正64。');
['235000000','10100000','701000000000','696000','-567000000','200400','8000000000','31536000'].forEach(function(raw,i){var s=M.scientific(raw);input('science',i,'用科学记数法表示 '+raw+'。',s.coefficient+'×10^'+s.exponent,'移动小数点，让系数的绝对值至少为1且小于10；原数的数值不变。','science');});
pick('science','50×10⁵是规范科学记数法吗？',['是，只要数值对就行','不是，应写5×10⁶','不是，应写0.5×10⁷'],1,'50不在1至10之间；指数相应增加1。');
pick('science','2.004×10⁵还原成普通数是？',['200400','204000','20004'],0,'中间0的位置要保留。');
pick('science','1.496亿千米正确表示为？',['1.496×10⁴km','1.496×10⁸km','1.496×10¹²km'],1,'亿表示10⁸，单位仍为千米。');
pick('science','一个9位的正整数，用科学记数法表示时指数为？',['9','10','8'],2,'整数位数比指数多1。');
[['1.804',2],['0.0158',3],['9.996',2],['3.8963',2],['0.0571',1],['245.635',1],['2.304',2],['1.005',2]].forEach(function(p,i){input('round',i,'把'+p[0]+'四舍五入，保留'+p[1]+'位小数。',M.roundDecimal(p[0],p[1]),'找到保留位，看后一位决定进位；必须写足指定的小数位。','exact');});
pick('round','1.8与1.80作为近似数，精确度相同吗？',['相同，数值一样','不同，分别精确到十分位和百分位','不同，1.8更精确'],1,'数值相同，表示的精确度不同；末尾的0不能随意删。');
pick('round','保留两位小数，9.996应记为？',['10','10.0','10.00'],2,'进位后仍须保留两位小数。');
pick('round','报道“共有505人”和“约500人”，哪个给的是准确数？',['505人','约500人','两者都是准确数'],0,'准确数与近似数要结合语境判断。');
pick('round','精确到百分位，要看哪一位决定进位？',['十分位','千分位','个位'],1,'保留百分位，紧接着的一位是千分位。');
function normalize(value){return String(value).trim().replace(/[−﹣－]/g,'-').replace(/[＋]/g,'+').replace(/[／]/g,'/').replace(/\s+/g,'');}
function parseScience(value){var s=normalize(value).replace(/[xX＊*]/g,'×').replace(/１０/g,'10').replace(/\*\*/g,'^');var m=s.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))×10\^([0-9]{1,2})$/);if(!m)return null;var a=Number(m[1]),n=Number(m[2]);if(Math.abs(a)<1||Math.abs(a)>=10||n>11)return null;try{return M.mul(M.parse(m[1]),M.fraction(Math.pow(10,n)));}catch(e){return null;}}
function grade(q,value){if(q.kind==='choice')return Number.isInteger(value)&&value===q.correct;if(q.kind==='exact'){var text=normalize(value),expected=normalize(q.answer);return /^[+-]?\d+(?:\.\d+)?$/.test(text)&&M.equivalent(text,expected)&&(text.split('.')[1]||'').length===(expected.split('.')[1]||'').length;}if(q.kind==='science'){var a=parseScience(value),b=parseScience(q.answer);return !!a&&!!b&&M.equivalent(a,b);}return M.equivalent(normalize(value),q.answer);}
function ledger(values,opening){var income=M.parse(0),expense=M.parse(0),balance=M.parse(opening||0),balances=[];values.forEach(function(raw){var a=M.parse(raw);if(a.n>=0)income=M.add(income,a);else expense=M.add(expense,M.fraction(-a.n,a.d));balance=M.add(balance,a);balances.push(balance);});return {income:income,expense:expense,net:M.sub(income,expense),balance:balance,balances:balances,average:values.length?M.div(expense,values.length):M.parse(0)};}
function octalValue(digits){if(!Array.isArray(digits)||digits.length!==3||digits.some(function(d){return !Number.isInteger(d)||d<0||d>7;}))throw Error('八进制每位只能用0至7。');return digits[0]*64+digits[1]*8+digits[2];}
function baseAddition(a,b,base){if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||[2,8,10,60].indexOf(base)<0)throw Error('请使用非负整数与有效进制。');var aa=a.toString(base===60?10:base),bb=b.toString(base===60?10:base);if(base===60)return {hours:Math.floor((a+b)/60),minutes:(a+b)%60};var width=Math.max(aa.length,bb.length),carry=0,columns=[],digits='';for(var i=0;i<width;i++){var x=Number(aa[aa.length-1-i]||0),y=Number(bb[bb.length-1-i]||0),total=x+y+carry;columns.push({a:x,b:y,carryIn:carry,digit:total%base,carryOut:Math.floor(total/base)});digits=String(total%base)+digits;carry=Math.floor(total/base);}if(carry)digits=carry+digits;return {digits:digits,columns:columns,value:a+b};}
var review=[];
lessons.forEach(function(l){[1,4,10].forEach(function(i,j){var original=bank.filter(function(q){return q.lesson===l.id;})[i];review.push(Object.assign({},original,{id:'c2:review:'+l.id+':'+j}));});});
var api={lessons:lessons,lesson:lesson,defaults:defaults,guided:guided,bank:bank,review:review,gates:gates,grade:grade,normalize:normalize,parseScience:parseScience,ledger:ledger,octalValue:octalValue,baseAddition:baseAddition,orderCases:orderCases,esc:esc};
global.ChapterTwoCore=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
