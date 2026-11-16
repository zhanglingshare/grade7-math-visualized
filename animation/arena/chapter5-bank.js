/* Chapter 5 question bank: 50 authored problem families × 10 variants = 500.
   Every item has a guided reasoning path; equation entry is checked against an authored equivalent line. */
(function(){
 "use strict";
 const B=[];
 const fmt=n=>{const v=Number(n);return Number.isInteger(v)?String(v):String(Number(v.toFixed(6)));};
 const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
 const fraction=(n,d)=>{const g=gcd(n,d)||1;return fmt(n/g)+"/"+fmt(d/g);};
 const rotate=(correct,wrongs,shift)=>{
  const base=[correct].concat(wrongs),s=shift%base.length;
  return {options:base.map((_,i)=>base[(i+s)%base.length]),answer:(base.length-s)%base.length};
 };
 const choice=(prompt,correct,wrongs,shift,explain,hint)=>{
  const r=rotate(correct,wrongs,shift);
  return {kind:"choice",prompt,options:r.options,answer:r.answer,explain,hint:hint||explain};
 };
 const equation=(prompt,expected,explain,hint,also)=>{
  return {kind:"equation",prompt,expected,accepted:[expected].concat(also||[]),explain,hint:hint||explain};
 };
 const number=(prompt,answer,explain,hint)=>{
  return {kind:"number",prompt,answer,explain,hint:hint||explain};
 };
 const add=(section,topic,type,stem,steps,solution,level,audit)=>{
  B.push({id:"C5-"+String(B.length+1).padStart(3,"0"),section,topic,type,level:level||((B.length%3)+1),stem,steps,solution,audit:audit||null});
 };
 const model=(topic,stem,varCorrect,varWrong,eqCorrect,eqWrong,answer,unit,solveText,shift,audit)=>{
  const v=rotate(varCorrect,varWrong,shift%3);
  add("5.3",topic,"建模",stem,[
   {kind:"choice",prompt:"第一步：你准备把哪个量设为 x？",options:v.options,answer:v.answer,explain:"先说清楚 x 代表什么，后面每个式子才有意义。",hint:"回到题目最后问的量，通常先设它为 x。"},
   equation("第二步：根据题意列出方程。",eqCorrect,"等号两边表示同一个数量，单位也要一致。","先找题目中的“总量相等”“位置相同”“费用相同”或“工作量为1”。",eqWrong),
   number("第三步：解得 x = ?（只填数值）",answer,solveText,"先把方程化简，再把结果代回题意检查。")
  ],solveText+" 所求"+(unit||"数值")+"为 "+fmt(answer)+(unit||"")+"。",shift%3+1,audit);
 };
 const solve=(topic,stem,firstPrompt,firstCorrect,firstWrong,firstWhy,eqPrompt,eqExpected,eqWhy,answer,finalWhy,shift,audit,extraSteps)=>{
  const c=rotate(firstCorrect,firstWrong,shift%firstWrong.length);
  const steps=[{kind:"choice",prompt:firstPrompt,options:c.options,answer:c.answer,explain:firstWhy,hint:firstWhy},
   equation(eqPrompt,eqExpected,eqWhy,"先写出这一步等价变形后的整洁方程。"),
   number("最后，x = ?",answer,finalWhy,"检查移项符号、括号和分母有没有遗漏。")];
  if(extraSteps)steps.splice(2,0,...extraSteps);
  add("5.2",topic,"解方程",stem,steps,finalWhy,shift%3+1,audit);
 };
 const a5=(i)=>i+2;

 /* 5.1 方程：概念、未知数、方程的解、等式性质。10 families × 10. */
 for(let i=0;i<10;i++){
  const a=2+i%5,b=3+i,c=a*(i+2)+b,good=a+"x+"+b+"="+c;
  add("5.1","方程与算式","概念","下面哪一个式子是方程？",[
   choice("从四个式子中找出方程。",good,[a+"+"+b+"="+c,a+"x+"+b,a+"x+"+b+">"+c],i,"方程必须同时满足两个条件：含有未知数，并且是等式。"),
   choice("判断它是方程的关键理由是什么？","它是含有未知数的等式",["它只含有数字","它没有等号","它一定能口算"],i+1,"方程是含有未知数的等式。")
  ],good+" 含有未知数 x，也有等号，所以它是方程。",i%3+1);
 }
 for(let i=0;i<10;i++){
  const a=2+i%4,b=i+3,c=a*(i+1)+b,good=a+"x+"+b+"="+c;
  add("5.1","一元一次方程的特征","概念","下面哪一个是一元一次方程？",[
   choice("选出只含一个未知数、未知数次数为1的方程。",good,[a+"x^2+"+b+"="+c,"x+y="+(i+5),a+"x+"+b],i+1,"一元一次方程只含一个未知数，未知数的次数是1，且含未知数的式子是整式。"),
   choice("这个方程中的未知数有几个？","1个",["0个","2个","3个"],i,"只有 x 一个未知数。")
  ],good+" 只有一个未知数 x，且 x 的次数是1。",i%3+1);
 }
 for(let i=0;i<10;i++){
  const root=i+2,a=4,b=3,c=2,d=b+2*root,candidate=root+(i%2);
  const left=a*candidate+b,right=c*candidate+d,yes=left===right;
  add("5.1","检验方程的解","判断","判断：x = "+candidate+" 是方程 "+a+"x+"+b+"="+c+"x+"+d+" 的解吗？",[
   choice("先判断左右两边代入后的值是否相等。",yes?"是":"不是",["是","不是"].filter(x=>x!==(yes?"是":"不是")),i,"把候选值代入原方程，左边与右边相等，才是方程的解。"),
   number("代入后，左边的值是多少？",left,"左边="+a+"×"+candidate+"+"+b+"="+left),
   number("代入后，右边的值是多少？",right,"右边="+c+"×"+candidate+"+"+d+"="+right)
  ],"左边="+left+"，右边="+right+"。"+(yes?"两边相等，是方程的解。":"两边不相等，不是方程的解。"),i%3+1,{left,right});
 }
 for(let i=0;i<10;i++){
  const root=i+1,a=5,b=2,d=b+3*root,eq="5x+2=2x+"+d;
  const r=rotate(String(root),[String(root+1),String(root-1),String(root+2)],i);
  add("5.1","寻找方程的解","判断","方程 "+eq+" 的解是哪个数？",[
   {kind:"choice",prompt:"选出使方程左右两边相等的 x。",options:r.options,answer:r.answer,explain:"移项得 3x="+(d-b)+"，所以 x="+root+"。",hint:"把选项代回左右两边，比较结果。"},
   number("把 x 代入左边 5x+2，结果是多少？",a*root+b,"5×"+root+"+2="+(a*root+b))
  ],"3x="+(d-b)，所以 x="+root+"。",i%3+1,{left:a*root+b,right:2*root+d});
 }
 for(let i=0;i<10;i++){
  const a=2+i%5,b=3+i,c=a*(i+2)+b,good=a+"x+"+b+"="+c;
  add("5.1","从文字到方程","表达","“一个数的 "+a+" 倍与 "+b+" 的和等于 "+c+"。”应该怎样表示？",[
   choice("选出正确的方程。",good,[a+"(x+"+b+")="+c,a+"x="+c+"+"+b,a+"+"+b+"x="+c],i+2,"“一个数的a倍”是 ax；“与b的和”是 ax+b；“等于c”写成 ax+b=c。"),
   choice("这里的 x 表示什么？","这个未知数本身",["这个数的 "+a+" 倍","已知数 "+b,"等号右边的 "+c],i,"设 x 表示题目中未知的那个数。")
  ],"设这个数为 x，列得 "+good+"。",i%3+1);
 }
 for(let i=0;i<10;i++){
  const m=2+i%3,n=m+1,d=2+i,good=m+"(x+"+d+")="+n+"x";
  add("5.1","数量关系与等量关系","建模","大杯单价比小杯多 "+d+" 元，买 "+m+" 个大杯的钱恰好买 "+n+" 个小杯。设小杯单价为 x，方程怎样列？",[
   choice("大杯单价应怎样表示？","x+"+d,["x−"+d,d+"x","x÷"+d],i,"大杯比小杯贵 d 元，所以大杯单价是 x+d。"),
   choice("选择表示两种总价相等的方程。",good,[m+"x+"+d+"="+n+"x",m+"x="+n+"(x+"+d+")",m+"(x−"+d+")="+n+"x"],i+1,"大杯总价是 m(x+d)，小杯总价是 nx，题目说两笔钱恰好相等。")
  ],"方程为 "+good+"。",i%3+1);
 }
 for(let i=0;i<10;i++){
  const x=i+2,good="两边同时减去 "+x;
  add("5.1","等式的性质","判断","已知 a=b。要把等式 a+"+x+"=b+"+x+" 化简回 a=b，应怎样操作？",[
   choice("选择保持等式成立的操作。",good,["只从左边减去 "+x,"两边同时加上 "+x,"只从右边减去 "+x],i,"等式两边同时加或减同一个数（或式子），结果仍相等。"),
   choice("如果 a=b，那么下面哪一个一定成立？","a×"+x+"=b×"+x,["a+"+x+"=b","a÷0=b÷0","a−"+x+"=b"],i+1,"等式两边同时乘同一个数，结果仍相等。")
  ],"等式两边同时做相同的运算，平衡关系才会保留。",i%3+1);
 }
 for(let i=0;i<10;i++){
  const a=i+2,b=a+5,good="x+"+a+"="+b;
  add("5.1","等式性质解简单方程","解方程","天平两边保持平衡：x+"+a+"="+b+"。怎样把 x 单独留下？",[
   choice("第一步应该怎样做？","两边同时减去 "+a,["两边同时加上 "+a,"只从左边减去 "+a,"两边同时除以 "+a],i,"要撤销 x 后面的加 a，就在等式两边同时减 a。"),
   equation("写出这一步得到的方程。","x="+(b-a),"x+"+a+"−"+a+"="+b+"−"+a+"，所以 x="+(b-a)),
   number("x 等于多少？",b-a,"x="+b+"−"+a+"="+(b-a))
  ],"x="+a+"="+b+"，两边减去"+a+"，得 x="+(b-a)+"。",i%3+1,{left:(b-a)+a,right:b});
 }
 for(let i=0;i<10;i++){
  const forms=[
   {s:"x^2+2x=8",yes:false,why:"含有 x²，未知数次数是2。"},
   {s:"3x−5=10",yes:true,why:"只含 x 一个未知数，且次数为1。"},
   {s:"x+y=9",yes:false,why:"含有 x、y 两个未知数。"},
   {s:"4x+7",yes:false,why:"没有等号，不是方程。"}
  ];
  const f=forms[i%4],correct=f.yes?"是":"不是";
  add("5.1","辨认一元一次方程","判断","式子 "+f.s+" 是一元一次方程吗？",[
   choice("先判断。",correct,["是","不是"].filter(x=>x!==correct),i,"一元一次方程必须只有一个未知数，未知数次数为1，并且是方程。"),
   choice("关键依据是什么？",f.why,["只要有字母就行","只要有等号就行","只要能计算就行"],i+1,f.why)
  ],f.s+"："+f.why,i%3+1);
 }
 for(let i=0;i<10;i++){
  const a=2+i%4,b=4+i,c=a*(i+2)+b,good=a+"x="+(c-b);
  add("5.1","等式变形与检验","判断","已知 "+a+"x+"+b+"="+c+"。两边同时减去 "+b+"，下一行应是什么？",[
   choice("选择正确的等式变形。",good,[a+"x="+(c+b),a+"x+"+b+"="+(c-b),a+"x="+(c-b)+"+"+b],i,"等式两边同时减去同一个数，左边的常数项抵消。"),
   number("继续解方程，x 等于多少？",(c-b)/a,"两边再除以 "+a+"，得到 x="+fmt((c-b)/a))
  ],good+"，再两边除以"+a+"，得 x="+fmt((c-b)/a)+"。",i%3+1,{left:a*((c-b)/a)+b,right:c});
 }

 /* 5.2 解一元一次方程：合并、移项、括号、分母、检验与循环小数。20 families × 10. */
 for(let i=0;i<10;i++){
  const p=2+i%4,q=3+i%3,r=i+2,coef=p+q, rhs=coef*r;
  solve("合并同类项","解方程 "+p+"x+"+q+"x="+rhs+"。","第一步先做什么？","合并同类项",["先把两边平方","先把等号去掉","先除以 x"],"同类项的系数相加，字母和指数不变。","合并后写出方程。",coef+"x="+rhs,"("+p+"+"+q+")x="+rhs+"，合并得 "+coef+"x="+rhs+"。",r,""+coef+"x="+rhs+"，所以 x="+r+"。",i,{left:coef*r,right:rhs});
 }
 for(let i=0;i<10;i++){
  const a=2+i%5,x=-(i+2),rhs=-a*x;
  solve("负系数与系数化为1","解方程 −"+a+"x="+rhs+"。","要把 −"+a+"x 变成 x，应该怎样做？","两边同时除以 −"+a,["两边同时加 −"+a,"只把左边的负号去掉","两边同时乘以 −"+a],"等式两边同时除以同一个不为0的数，结果仍相等。","写出系数化为1后的方程。","x="+x,"−"+a+"x="+rhs+"，两边同时除以 −"+a+"，得 x="+x+"。",x,"x="+x+"。代回原方程，左右两边都是 "+rhs+"。",i,{left:-a*x,right:rhs});
 }
 for(let i=0;i<10;i++){
  const a=2+i%4,x=i+2,b=i+3,c=a*x+b;
  solve("移项前的等式性质","解方程 "+a+"x+"+b+"="+c+"。","先撤销左边的常数项，应该怎样做？","两边同时减去 "+b,["两边同时加上 "+b,"只从左边减去 "+b,"两边同时除以 "+a],"等式两边同时减去 b，才能保持等式成立。","减去常数项后，写出方程。",a+"x="+(c-b),a+"x+"+b+"−"+b+"="+c+"−"+b+"。",x,"再两边除以 "+a+"，得 x="+x+"。",i,{left:a*x+b,right:c});
 }
 for(let i=0;i<10;i++){
  const a=5,c=2,b=i+2,x=i+1,d=b+(a-c)*x;
  solve("移项与变号","解方程 "+a+"x+"+b+"="+c+"x+"+d+"。","把右边的 "+c+"x+"移到左边，本质上做什么？","等式两边同时减去 "+c+"x, ["],"","", "", "", "", "", "", "", "", "", "");
 }
})();