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
   equation("第二步：根据题意列出方程。",eqCorrect,"等号两边表示同一个数量，单位也要一致。","先找题目中的“总量相等”“位置相同”“费用相同”或“工作量为1”。"),
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
  ],"3x="+(d-b)+"，所以 x="+root+"。",i%3+1,{left:a*root+b,right:2*root+d});
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
  const a=2+i%5,b=i+2,c=3*i+8;
  const forms=[
   {s:"x^2+"+b+"x="+(b+5),yes:false,why:"含有 x²，未知数次数是2。"},
   {s:a+"x−"+b+"="+c,yes:true,why:"只含 x 一个未知数，且次数为1。"},
   {s:"x+y="+(i+9),yes:false,why:"含有 x、y 两个未知数。"},
   {s:a+"x+"+b,yes:false,why:"没有等号，不是方程。"}
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
  const a=5,c=2,b=i+2,x=i+1,d=b+(a-c)*x,coef=a-c,rhs=d-b;
  solve("移项与变号","解方程 "+a+"x+"+b+"="+c+"x+"+d+"。","把右边的 "+c+"x 移到左边，本质上做什么？","等式两边同时减去 "+c+"x",["等式两边同时加上 "+c+"x","只在右边减去 "+c+"x","把 "+c+"x 直接删掉"],"移项变号不是口诀，而是等式两边同时减去同一个含 x 的项。","移项后先写出方程。",coef+"x+"+b+"="+d,a+"x−"+c+"x+"+b+"="+d+"，合并后得到 "+coef+"x+"+b+"="+d+"。",x,"再把常数项移到右边，"+coef+"x="+rhs+"，所以 x="+x+"。",i,{left:a*x+b,right:c*x+d},[
   equation("再把常数项移到右边，写出下一行。",coef+"x="+rhs,"两边同时减去 "+b+"，得到 "+coef+"x="+rhs)
  ]);
 }
 for(let i=0;i<10;i++){
  const a=2,c=1,b=30+i,x=i+1,d=b-(a+c)*x,coef=a+c,rhs=d-b;
  solve("负号与两边都有未知数","解方程 "+b+"−"+a+"x="+c+"x+"+d+"。","先把右边的 "+c+"x 移到左边，依据是什么？","等式两边同时减去 "+c+"x",["等式两边同时加上 "+c+"x","只在右边减去 "+c+"x","把左边的 −"+a+"x 改成 +"+a+"x"],"等式两边同时减去 cx，未知数项才能集中到一边。","整理含 x 的项后，写出方程。",b+"−"+coef+"x="+d,"右边减去 cx 后，左边的未知数项合并为 −"+coef+"x。",x,"移项得 −"+coef+"x="+rhs+"，两边除以 −"+coef+"，所以 x="+x+"。",i,{left:b-a*x,right:c*x+d},[
   equation("再把左边的常数 b 移到右边。","−"+coef+"x="+rhs,"两边同时减去 "+b+"，得 −"+coef+"x="+rhs)
  ]);
 }
 for(let i=0;i<10;i++){
  const a=2+i%4,b=i+1,x=i+2,c=a*(x+b),ab=a*b;
  solve("去括号与分配律","解方程 "+a+"(x+"+b+")="+c+"。","括号前的 "+a+" 应怎样处理？","用 "+a+" 乘括号里的每一项",["只乘括号里的 x","只乘括号里的 "+b,"把括号直接删掉"],"分配律要求括号外的数乘到括号内每一项。","去括号后，写出方程。",a+"x+"+ab+"="+c,a+"(x+"+b+")="+c+"，展开得 "+a+"x+"+ab+"="+c+"。",x,"两边减去 "+ab+"，再除以 "+a+"，得到 x="+x+"。",i,{left:a*(x+b),right:c},[
   equation("把常数项移到右边。",a+"x="+(c-ab),"两边同时减去 "+ab+"，得到 "+a+"x="+(c-ab))
  ]);
 }
 for(let i=0;i<10;i++){
  const a=2+i%4,b=i+1,x=i+2,rhs=-a*(x-b),ab=a*b;
  solve("括号前是负数","解方程 −"+a+"(x−"+b+")="+rhs+"。","去括号时，括号里的每一项会怎样？","都要乘以 −"+a,["只让 x 变号","只让 "+b+" 变号","括号前的负号可以直接删掉"],"−a(x−b)=−ax+ab。负号要分配到括号里的每一项。","正确去括号后，写出方程。","−"+a+"x+"+ab+"="+rhs,"−"+a+"×x 加上 −"+a+"×(−"+b+")，所以常数项是 +"+ab+"。",x,"两边减去 "+ab+"，再除以 −"+a+"，得 x="+x+"。",i,{left:-a*(x-b),right:rhs},[
   equation("继续把常数项移到右边。","−"+a+"x="+(rhs-ab),"两边同时减去 "+ab+"，得到 −"+a+"x="+(rhs-ab))
  ]);
 }
 for(let i=0;i<10;i++){
  const a=4,c=2,b=i+1,x=i+2,d=2*b+x,ab=a*b,cd=c*d,rhs=a*x+ab;
  solve("两边都有括号","解方程 "+a+"(x+"+b+")="+c+"(x+"+d+")。","先把等号两边的括号展开，依据是什么？","分别使用分配律",["只展开左边","只展开右边","先把两边的 x 消掉"],"等号两边都要正确使用分配律，不能漏掉括号内的常数项。","展开两边后，写出方程。",a+"x+"+ab+"="+c+"x+"+cd,a+"(x+"+b+")="+c+"(x+"+d+")，展开后两边分别是 "+a+"x+"+ab+" 与 "+c+"x+"+cd+"。",x,"移项得 "+(a-c)+"x="+(cd-ab)+"，所以 x="+x+"。",i,{left:a*(x+b),right:c*(x+d)},[
   equation("把右边的 x 项移到左边，再把常数移到右边。",(a-c)+"x="+(cd-ab),"两边同时减去 "+c+"x+"+ab+"，整理得 "+(a-c)+"x="+(cd-ab))
  ]);
 }
 for(let i=0;i<10;i++){
  const a=5,c=2,b=i+1,d=i+2,x=i+2,coef=a-c,constant=a*b+c*d,e=coef*x+constant;
  solve("多重括号与合并","解方程 "+a+"(x+"+b+")−"+c+"(x−"+d+")="+e+"。","先展开括号，再把 x 项合并。应该使用什么？","分配律，再合并同类项",["只展开第一个括号","只合并常数项","把两个括号相乘"],"先用分配律展开，再把同类的 x 项合并，常数项也要合并。","整理后写出方程。",coef+"x+"+constant+"="+e,a+"(x+"+b+")−"+c+"(x−"+d+") 展开后，x 项系数是 "+coef+"，常数项是 "+constant+"。",x,"移项得 "+coef+"x="+(e-constant)+"，所以 x="+x+"。",i,{left:a*(x+b)-c*(x-d),right:e},[
   equation("把常数项移到右边。",coef+"x="+(e-constant),"两边同时减去 "+constant+"，得到 "+coef+"x="+(e-constant))
  ]);
 }
 for(let i=0;i<10;i++){
  const a=2+i%5,k=i+2,b=i+1,x=a*k,c=k+b,ab=a*b,ac=a*c;
  solve("去分母：单个分数项","解方程 x/"+a+"+"+b+"="+c+"。","怎样消去分母 "+a+"？","方程两边每一项都乘以 "+a,["只把分数项乘以 "+a,"两边都除以 "+a,"只把等号右边乘以 "+a],"等式两边的每一项都要乘同一个数，不能漏掉常数项。","去分母后，写出方程。","x+"+ab+"="+ac,"两边乘 "+a+"，得到 x+"+ab+"="+ac+"。",x,"移项得 x="+(ac-ab)+"，所以 x="+x+"。",i,{left:x/a+b,right:c},[
   equation("移项后，写出 x 的值。","x="+x,"两边同时减去 "+ab+"，得到 x="+x)
  ]);
 }
 for(let i=0;i<10;i++){
  const b=2+i%4,k=i+2,a=i+1,x=b*k-a,c=k;
  solve("去分母：分子含有加法","解方程 (x+"+a+")/"+b+"="+c+"。","去分母时，两边应怎样变形？","两边同时乘以 "+b,["只把 x 乘以 "+b,"两边同时除以 "+b,"只把等号右边乘以 "+b],"分数的整个分子是 x+"+a+"，两边乘 "+b+" 后得到 x+"+a+"="+(b*c)+"。","去分母后，写出方程。","x+"+a+"="+(b*c),"两边同乘 "+b+"，分母消失。",x,"移项得 x="+(b*c-a)+"，所以 x="+x+"。",i,{left:(x+a)/b,right:c},[
   equation("移项后写出 x = ?", "x="+x,"两边同时减去 "+a+"，得到 x="+x)
  ]);
 }
 for(let i=0;i<10;i++){
  const pairs=[[2,3],[3,4],[4,5],[5,6],[3,5],[4,7],[5,8],[2,7],[3,8],[5,9]];
  const a=pairs[i][0],b=pairs[i][1],k=i+1,x=a*b*k,c=(a+b)*k,rhs=a*b*c;
  solve("多个分数项去分母","解方程 x/"+a+"+x/"+b+"="+c+"。","两个分母的最小公倍数是多少？",""+(a*b),[String(a+b),String(a*b+1),String(a*b*2)],"这组分母互质，最小公倍数是它们的乘积 "+(a*b)+"。","两边同乘最小公倍数后，写出方程。",b+"x+"+a+"x="+rhs,"两边乘 "+(a*b)+"，左边两项分别变成 "+b+"x 和 "+a+"x。",x,"合并同类项得 "+(a+b)+"x="+rhs+"，所以 x="+x+"。",i,{left:x/a+x/b,right:c},[
   equation("合并同类项后写出方程。",(a+b)+"x="+rhs,"把 "+b+"x 与 "+a+"x 合并。")
  ]);
 }
 for(let i=0;i<10;i++){
  const c=2+i%3,k=i+2,a=2+i%4,b=c*(i+1),x=c*k,d=a*k+b/c,cd=c*d;
  solve("分式方程的等价变形","解方程 ("+a+"x+"+b+")/"+c+"="+fmt(d)+"。","去分母时，两边同乘多少？","两边同时乘以 "+c,["只乘分子","两边同时除以 "+c,"只乘右边"],"分母是 "+c+"，两边同时乘 "+c+"，得到 "+a+"x+"+b+"="+fmt(cd)+"。","去分母后写出方程。",a+"x+"+b+"="+fmt(cd),"两边乘 "+c+"，得到 "+a+"x+"+b+"="+fmt(cd)+"。",x,"移项得 "+a+"x="+fmt(cd-b)+"，再除以 "+a+"，得 x="+x+"。",i,{left:(a*x+b)/c,right:d},[
   equation("把常数项移到右边。",a+"x="+fmt(cd-b),"两边同时减去 "+b+"。")
  ]);
 }
 for(let i=0;i<10;i++){
  const a=2+i%4,b=5+i,x=i+2,c=a*x+b;
  const A=a,Bb=b,C=c;
  solve("小数系数方程","解方程 "+fmt(A/10)+"x+"+fmt(Bb/10)+"="+fmt(C/10)+"。","为了让小数系数更容易计算，可以怎样做？","方程两边每一项都乘以 10",["只把 x 的系数乘以 10","两边同时除以 10","先把所有小数改成整数但不变等式"],"把等号两边每一项都乘10，等式仍然成立。","去掉小数后，写出方程。",A+"x+"+Bb+"="+C,A+"x+"+Bb+"="+C+"，小数点统一右移一位。",x,"移项得 "+A+"x="+(C-Bb)+"，所以 x="+x+"。",i,{left:(A/10)*x+Bb/10,right:C/10},[
   equation("把常数项移到右边。",A+"x="+(C-Bb),"两边同时减去 "+Bb+"。")
  ]);
 }
 for(let i=0;i<10;i++){
  const A=5,C=2,Bb=10+i,x=i+2,D=Bb+(A-C)*x;
  solve("小数系数与移项","解方程 "+fmt(A/10)+"x+"+fmt(Bb/10)+"="+fmt(C/10)+"x+"+fmt(D/10)+"。","先把小数系数统一变成整数，应该怎样做？","两边每一项都乘以 10",["只把左边乘以 10","两边同时除以 10","只把含 x 的项乘以 10"],"两边同乘10，得到 "+A+"x+"+Bb+"="+C+"x+"+D+"。","化成整数系数后写出方程。",A+"x+"+Bb+"="+C+"x+"+D,"小数方程两边同乘10，得到整数系数方程。",x,"移项得 "+(A-C)+"x="+(D-Bb)+"，所以 x="+x+"。",i,{left:(A/10)*x+Bb/10,right:(C/10)*x+D/10},[
   equation("把 x 项移到左边、常数项移到右边。",(A-C)+"x="+(D-Bb),"移项后合并同类项。")
  ]);
 }
 for(let i=0;i<10;i++){
  const p=6,q=2,r=3,coef=p+q-r,x=i+1,rhs=coef*x;
  solve("多项式合并与系数化1","解方程 "+p+"x+"+q+"x−"+r+"x="+rhs+"。","先把所有 x 项合并，应该怎样做？","把同类项的系数相加减",["把系数相乘","只合并正号项","把 x 与数字合并"],"同类项的系数相加减，"+p+"+"+q+"−"+r+"="+coef+"。","合并后写出方程。",coef+"x="+rhs,"合并后得到 "+coef+"x="+rhs+"。",x,"两边除以 "+coef+"，得到 x="+x+"。",i,{left:(p+q-r)*x,right:rhs});
 }
 for(let i=0;i<10;i++){
  const a=2+i%3,b=a+1,k=i+1,x=a*b*k,c=(b-a)*k,rhs=a*b*c;
  solve("分数系数与相减","解方程 x/"+a+"−x/"+b+"="+c+"。","去分母时，最小公倍数是多少？","两边同时乘以 "+(a*b),["两边同时乘以 "+(a+b),"只乘第一项","两边同时除以 "+(a*b)],"分母 "+a+" 与 "+b+" 的最小公倍数是 "+(a*b)+"。","去分母后写出方程。",b+"x−"+a+"x="+rhs,"两边乘 "+(a*b)+"，得到 "+b+"x−"+a+"x="+rhs+"。",x,"合并得 "+(b-a)+"x="+rhs+"，所以 x="+x+"。",i,{left:x/a-x/b,right:c},[
   equation("合并同类项后写出方程。",(b-a)+"x="+rhs,"把 "+b+"x−"+a+"x 合并。")
  ]);
 }
 for(let i=0;i<10;i++){
  const a=2+i%4,b=i+2,x=b+1,rhs=-a*(x-b),bad="−"+a+"x−"+(a*b)+"="+rhs,good="−"+a+"x+"+(a*b)+"="+rhs;
  solve("去括号错误诊断","小明解方程 −"+a+"(x−"+b+")="+rhs+"，却写成了 "+bad+"。他错在哪里？","先判断错误原因。","把负数乘到括号内每一项时，第二项应变成正数",["只把 x 项乘以 −"+a,"把括号前的负号直接删掉","先把等号两边交换"],"−"+a+"×(−"+b+") 是正数 "+(a*b)+"，不能写成负数。","正确去括号后，写出方程。",good,"正确展开是 −"+a+"x+"+(a*b)+"="+rhs+"。",x,"移项并除以 −"+a+"，得 x="+x+"。",i,{left:-a*(x-b),right:rhs},[
   equation("移项后写出方程。","−"+a+"x="+(rhs-a*b),"两边减去 "+(a*b)+"，得到 −"+a+"x="+(rhs-a*b))
  ]);
 }
 for(let i=0;i<10;i++){
  const k=i+2,x=6*k,c=5*k-1,expected="3x+2(x−3)="+(6*c);
  solve("最小公倍数与去括号顺序","解方程 x/2+(x−3)/3="+c+"。","去分母时，最小公倍数是多少？","6",["5","3","12"],"2和3的最小公倍数是6。","两边同乘6后，写出方程。",expected,"x/2 乘6得到3x，(x−3)/3乘6得到2(x−3)。",x,"去括号、合并得 5x−6="+(6*c)+"，所以 x="+x+"。",i,{left:x/2+(x-3)/3,right:c},[
   equation("去括号后写出方程。","3x+2x−6="+(6*c),"使用分配律：2(x−3)=2x−6。"),
   equation("合并同类项后写出方程。","5x−6="+(6*c),"3x+2x 合并成5x。")
  ]);
 }
 for(let i=0;i<10;i++){
  let n,period,expected,den,numValue;
  if(i<5){n=i+1;period=1;expected="9x="+n;den=9;numValue=n;}
  else{n=[12,23,34,45,56][i-5];period=2;expected="99x="+n;den=99;numValue=n;}
  const ans=fraction(numValue,den),mult=period===1?10:100;
  solve("无限循环小数化分数","把无限循环小数 0."+String(n).repeat(3)+"… 化成最简分数。","循环节有 "+period+" 位，小数点向右移动几位后，循环部分会对齐？","乘以 "+mult,["乘以 10","乘以 1000","乘以 10000"].filter(x=>x!=="乘以 "+mult),"循环节有几位，就把小数点向右移动几位：一位乘10，两位乘100。","两式相减后，得到哪个方程？",expected,"相减后循环部分抵消，得到 "+expected+"。",ans,"解得 x="+ans+"，所以原循环小数等于 "+ans+"。",i,{left:numValue,right:den*(numValue/den)},[
   equation("把方程化成 x = 分数。","x="+ans,"两边同除以 "+den+"，得到 x="+ans)
  ]);
 }

 /* 5.3 实际问题：每题走“设未知数 → 列方程 → 求解”。 */
 for(let i=0;i<10;i++){
  const total=2050+10*i,extra=150+2*i,x=(total-extra)/2;
  model("产量增长与反推","某造纸厂去年10月生产再生纸 "+total+" 吨，比前年10月产量的2倍还多 "+extra+" 吨。前年10月生产多少吨？","设前年10月再生纸产量为 x 吨","设去年10月再生纸产量为 x 吨","2x+"+extra+"="+total,["2x−"+extra+"="+total,"x+2×"+extra+"="+total],x,"吨","前年产量设为x，去年是2x+"+extra+"，所以2x+"+extra+"="+total+"，解得 x="+x+" 吨。",i,{left:2*x+extra,right:total});
 }
 for(let i=0;i<10;i++){
  const x=300+10*i,total=1.4*x;
  model("百分率与总量","灌溉三块同样大的田地：第一块用漫灌，第二块用水量是第一块的25%，第三块是第一块的15%。三块田共用水 "+fmt(total)+" 吨。第一块田用了多少吨？","设第一块漫灌田的用水量为 x 吨","设三块田的总用水量为 x 吨","x+0.25x+0.15x="+fmt(total),["x+25+15="+fmt(total),"0.25x+0.15x="+fmt(total)],x,"吨","三块田用水量分别为x、0.25x、0.15x，总量为1.4x="+fmt(total)+"，解得 x="+x+" 吨。",i,{left:1.4*x,right:total});
 }
 for(let i=0;i<10;i++){
  const k=i+2,total=11*k,x=5*k,left=2000*(total-x),right=2400*x;
  model("生产配套","一个车间有 "+total+" 名工人。每人每天生产1200个螺栓或2000个螺母，1个螺栓配2个螺母。应安排多少人生产螺栓？","设生产螺栓的工人数为 x","设生产螺母的工人数为 x","2000("+total+"−x)=2400x",["2000x=1200("+total+"−x)","1200x=2000x","2000("+total+"−x)=1200x"],x,"名","螺母总数要等于螺栓总数的2倍：2000("+total+"−x)=2400x，解得 x="+x+"。",i,{left,right});
 }
 for(let i=0;i<10;i++){
  const x=2+i,t1=4+i,t2=8+i%3,extra=2+i%2,total=t1*x+t2*(x+extra);
  model("分段工作量","整理一批资料，先安排若干人工作 "+t1+" 小时，再增加 "+extra+" 人一起工作 "+t2+" 小时，刚好完成全部任务。每人效率相同，最初安排多少人？","设最初安排的人数为 x","设增加人员后的总人数为 x+"+extra,t1+"x+"+t2+"(x+"+extra+")="+total,[""+t1+"x+"+t2+"x="+total,""+t1+"(x+"+extra+")+"+t2+"x="+total],x,"人","把总工作量看成 "+total+" 个相同的“人·小时”单位，列式 "+t1+"x+"+t2+"(x+"+extra+")="+total+"，解得 x="+x+"。",i,{left:t1*x+t2*(x+extra),right:total});
 }
 for(let i=0;i<10;i++){
  const a=12+3*i,b=2*a,x=2*a/3;
  model("合作工程","甲单独完成一项工作需要 "+a+" 天，乙单独完成需要 "+b+" 天。两人合作完成需要多少天？","设两人合作需要 x 天","设甲单独完成这项工作需要 x 天","x/"+a+"+x/"+b+"=1",["x/"+a+"−x/"+b+"=1","x+"+a+"+"+b+"=1"],x,"天","甲每天完成1/"+a+"，乙每天完成1/"+b+"；合作 x 天的工作量之和为1，解得 x="+x+" 天。",i,{left:x/a+x/b,right:1});
 }
 for(let i=0;i<10;i++){
  const total=64+2*i,blue=26+i,black=total-blue,cost=8*blue+9*black;
  model("两种布料的总价","买蓝布和黑布共 "+total+" 米，花费 "+cost+" 元。蓝布每米8元，黑布每米9元。蓝布和黑布各买多少米？","设蓝布买了 x 米","设黑布买了 x 米","8x+9("+total+"−x)="+cost,["9x+8("+total+"−x)="+cost,"8x+9x="+cost],blue,"米","黑布买了"+(total-blue)+"米，蓝布买了"+blue+"米；总价8×"+blue+"+9×"+(total-blue)+"="+cost+"元。",i,{left:8*blue+9*black,right:cost});
 }
 for(let i=0;i<10;i++){
  const x=12+i,length=1.5*x,perimeter=2*(x+length);
  model("周长与倍数关系","用一根 "+perimeter+" 米长的绳子围成一个长方形，长是宽的1.5倍。这个长方形的宽是多少米？","设长方形的宽为 x 米","设长方形的长为 x 米","2(x+1.5x)="+fmt(perimeter),["x+1.5x="+fmt(perimeter),"2(x−1.5x)="+fmt(perimeter)],x,"米","长为1.5x，周长是2(x+1.5x)，所以宽 x="+x+" 米。",i,{left:2*(x+length),right:perimeter});
 }
 for(let i=0;i<10;i++){
  const s=6+i,x=s;
  model("人数与余缺问题","一批树苗分给若干人。如果每人种10棵，还剩 "+s+" 棵；如果每人种12棵，就缺 "+s+" 棵。参加种树的有多少人？","设参加种树的人数为 x","设树苗总数为 x","10x+"+s+"=12x−"+s,["10x−"+s+"=12x+"+s,"10(x+"+s+")=12x"],x,"人","树苗总数既是10x+"+s+"，也是12x−"+s+"，列方程解得人数 "+x+" 人。",i,{left:10*x+s,right:12*x-s});
 }
 for(let i=0;i<10;i++){
  const m=[3,2,4,3,2,4,3,2,4,3][i],d=[1,2,1,2,1,2,1,2,1,2][i],x=[2,1,1,2,3,1,2,2,2,2][i],tens=m*x+d,sum=(m+1)*x+d;
  model("数字问题","一个两位数，个位数字为 x，十位数字是个位数字的 "+m+" 倍再加 "+d+"，两个数字之和为 "+sum+"。个位数字是多少？","设个位上的数字为 x","设十位上的数字为 x","x+("+m+"x+"+d+")="+sum,["10x+("+m+"x+"+d+")="+sum,"x+("+m+"x−"+d+")="+sum],x,"","个位数字是 x，十位数字是"+m+"x+"+d+"，数字和为"+sum+"，解得 x="+x+"。",i,{left:x+tens,right:sum});
 }
 for(let i=0;i<10;i++){
  const z=10+i,l=z+5+i%3,k=6+i,lead=(l-z)*k,time=l*k,height=z*time;
  model("登山先后出发","张华先出发登山，平均每分钟登高 "+z+" 米；李明每分钟登高 "+l+" 米，比张华晚出发 "+lead+" 分钟。两人同时到达山顶。张华登山用了多少分钟？","设张华登山用了 x 分钟","设李明登山用了 x 分钟",""+z+"x="+l+"(x−"+lead+")",[""+l+"x="+z+"(x−"+lead+")",""+z+"x="+l+"(x+"+lead+")"],time,"分钟","同时到达山顶，登高路程相等：张华"+z+"x米，李明"+l+"(x−"+lead+")米，解得 x="+time+" 分钟。",i,{left:z*time,right:l*(time-lead)});
 }
 for(let i=0;i<10;i++){
  const slow=74+2*i,fast=slow+20,distance=slow+10;
  model("相向行驶与速度差","甲、乙两辆汽车从相距 "+distance+" 千米的两地同时相向出发，半小时后相遇。甲比乙每小时快20千米。乙车速度是多少？","设乙车速度为 x 千米/时","设甲车速度为 x 千米/时","0.5x+0.5(x+20)="+distance,["0.5x+0.5(x−20)="+distance,"x+(x+20)="+distance],slow,"千米/时","两车各行驶0.5小时，路程和等于"+distance+"千米，解得乙车速度 "+slow+" 千米/时。",i,{left:0.5*slow+0.5*fast,right:distance});
 }
 for(let i=0;i<10;i++){
  const wind=24+2*i,down=2.8,up=3,still=wind*(down+up)/(up-down),distance=down*(still+wind);
  model("顺风逆风与相同航程","飞机在风速 "+wind+" 千米/时的条件下，顺风飞行一条航线用2.8小时，逆风飞行同一航线用3小时。飞机无风时的平均航速是多少？","设飞机无风时的平均航速为 x 千米/时","设飞机顺风时的速度为 x 千米/时","2.8(x+"+wind+")=3(x−"+wind+")",["2.8(x−"+wind+")=3(x+"+wind+")","2.8x+3x="+wind],still,"千米/时","顺风速度为x+"+wind+"，逆风速度为x−"+wind+"，两段航程相同，解得无风航速 "+fmt(still)+" 千米/时。",i,{left:down*(still+wind),right:up*(still-wind)});
 }
 for(let i=0;i<10;i++){
  const length=300+10*i,tunnel=length;
  model("列车过灯与过隧道","一列火车匀速行驶，通过一盏灯需要10秒，通过一条长 "+tunnel+" 米的隧道需要20秒。火车长多少米？","设火车长度为 x 米","设火车通过隧道的速度为 x 米/秒","x/10=(x+"+tunnel+")/20",["x/20=(x+"+tunnel+")/10","x/10=(x−"+tunnel+")/20"],length,"米","过灯时火车走过自身长度x，过隧道时走过x+"+tunnel+"米。速度相同，x/10=(x+"+tunnel+")/20，解得车长 "+length+" 米。",i,{left:length/10,right:(length+tunnel)/20});
 }
 for(let i=0;i<10;i++){
  const sale=60+15*i,profitCost=sale/1.25,lossCost=sale/0.75,loss=profitCost+lossCost-2*sale;
  const firstEq=equation("根据进价加利润等于售价，列出盈利那件衣服的方程。","1.25x="+sale,"盈利25%，售价是进价的1.25倍。","把利润率25%转成1.25倍。");firstEq.checkAt=profitCost;
  const secondEq=equation("再设另一件衣服进价为 x，列出亏损那件的方程。","0.75x="+sale,"亏损25%，售价是进价的0.75倍。","售价是进价的75%，不是进价的125%。");secondEq.checkAt=lossCost;
  add("5.3","销售中的盈亏","建模推理","商店以每件 "+sale+" 元卖出两件衣服，一件盈利25%，另一件亏损25%。这笔生意合计盈利还是亏损？金额是多少？",[
   choice("先设哪个量为 x？","设盈利25%那件衣服的进价为 x 元",["设亏损25%那件衣服的进价为 x 元","设两件衣服的总售价为 x 元"],i,"先分别求出两件衣服的进价，才能比较总进价与总售价。"),
   firstEq,
   number("盈利那件衣服的进价 x 是多少元？",profitCost,"1.25x="+sale+"，所以 x="+fmt(profitCost)+" 元。"),
   choice("接下来应该怎样处理另一件衣服？","重新设亏损25%那件衣服的进价为 x 元",["沿用第一件衣服的进价","把售价直接当成进价"],i+1,"两件衣服的进价不同，要分别设未知数、分别列方程。"),
   secondEq,
   number("亏损那件衣服的进价是多少元？",lossCost,"0.75x="+sale+"，所以 x="+fmt(lossCost)+" 元。"),
   number("两件衣服合计亏损多少元？",loss,"总进价="+fmt(profitCost)+"+"+fmt(lossCost)+"="+fmt(profitCost+lossCost)+"元；总售价="+(2*sale)+"元，差额为"+fmt(loss)+"元。")
  ],"盈利那件进价"+fmt(profitCost)+"元，亏损那件进价"+fmt(lossCost)+"元。两件总进价"+fmt(profitCost+lossCost)+"元，总售价"+(2*sale)+"元，所以合计亏损"+fmt(loss)+"元。",i%3+1,{left:profitCost+lossCost,right:2*sale+loss});
 }
 for(let i=0;i<10;i++){
  const x=150+10*i,sale=0.96*x;
  model("先提价再打折","一件商品按成本提高20%标价，再打八折销售，售价为 "+fmt(sale)+" 元。商品成本是多少？","设商品成本为 x 元","设商品最后的售价为 x 元","1.2x×0.8="+fmt(sale),["1.2x×0.2="+fmt(sale),"0.8x="+fmt(sale)],x,"元","提价后标价1.2x，再打八折，售价为1.2x×0.8=0.96x。解得成本 "+x+" 元。",i,{left:1.2*x*0.8,right:sale});
 }
 for(let i=0;i<10;i++){
  const games=[14,16,17,19,20,22,23,25,26,28][i],x=games/3,ans=fraction(games,3);
  add("5.3","球赛积分与整数检验","建模推理","某队参加 "+games+" 场比赛，胜一场得2分、负一场得1分。如果胜场总积分恰好等于负场总积分，这种情况可能发生吗？",[
   choice("先设哪个量为 x？","设胜场数为 x",["设负场数为 x","设总积分为 x"],i,"胜场积分是2x，负场数是"+games+"−x，负场积分就是"+games+"−x。"),
   equation("根据“胜场总积分=负场总积分”列方程。","2x="+games+"−x","胜场积分2x，负场积分"+games+"−x。"),
   number("解方程，得到 x = ?（可以填分数）",ans,"移项得3x="+games+"，所以x="+ans+"。"),
   choice("胜场数必须是整数。这个结果符合实际吗？","不可以",["可以"],i+1,"胜场数不能是分数，所以这个方程的数值解不符合比赛实际。")
  ],"方程解为 x="+ans+"，但胜场数必须是整数。因此这种积分相等的情况不可能发生。",3,{left:2*x,right:games-x});
 }
 for(let i=0;i<10;i++){
  const x=3+i,total=3*x+21;
  model("日历中的等差关系","某月日历中，同一列相邻三行的日期依次相差7天。若这三个日期之和为 "+total+"，最上面的日期是多少？","设最上面的日期为 x","设中间的日期为 x","x+(x+7)+(x+14)="+total,["x+(x+1)+(x+2)="+total,"x+(x+7)+(x+21)="+total],x,"日","同一列三行日期是x、x+7、x+14，列式解得最上面的日期为 "+x+" 日。",i,{left:x+(x+7)+(x+14),right:total});
 }
 for(let i=0;i<10;i++){
  const t=i+5,diff=80+10*i,pB=2600+100*i,kA=320,kB=kA+diff,pA=pB+diff*t;
  model("能效与长期费用","高能效空调售价 "+pA+" 元，每年电费 "+kA+" 元；普通空调售价 "+pB+" 元，每年电费 "+kB+" 元。使用多少年后两者总费用相同？","设使用年数为 x","设高能效空调每年的电费为 x 元",pA+"+"+kA+"x="+pB+"+"+kB+"x",[""+pA+"−"+kA+"x="+pB+"+"+kB+"x",pA+"+"+kB+"x="+pB+"+"+kA+"x"],t,"年","总费用=售价+每年电费×年数。列方程并移项，解得 x="+t+" 年。",i,{left:pA+kA*t,right:pB+kB*t});
 }
 for(let i=0;i<10;i++){
  const n=10+2*i,pages=3*n;
  model("分段收费与临界点","甲复印店前 "+n+" 页每页0.12元，超过部分每页0.09元；乙店每页0.10元。复印多少页时两店收费相同？","设总复印页数为 x 页","设超过起步页数后的页数为 x 页","0.12×"+n+"+0.09(x−"+n+")=0.10x",["0.12x+0.09x=0.10x","0.12×"+n+"+0.10(x−"+n+")=0.09x"],pages,"页","甲店费用为0.12×"+n+"+0.09(x−"+n+")，乙店为0.10x，解得总页数 "+pages+" 页。",i,{left:0.12*n+0.09*(pages-n),right:0.10*pages});
 }
 for(let i=0;i<10;i++){
  const base=200+5*i,k=4+i%3,other=base+25*k,trips=10+k;
  model("月票费用比较","机场线月票A售价 "+base+" 元，含10次；月票B售价 "+other+" 元，含20次。超出次数后每次另付25元。乘坐多少次时，A的总费用与B相同？","设每月乘坐次数为 x 次","设月票A的票价为 x 元",""+base+"+25(x−10)="+other,[""+base+"+25x="+other,""+base+"+25(x−20)="+other],trips,"次","在10至20次区间，A的费用为"+base+"+25(x−10)，与B的"+other+"元相等，解得 x="+trips+" 次。",i,{left:base+25*(trips-10),right:other});
 }

 if(B.length!==500)throw new Error("Chapter 5 bank count mismatch: "+B.length);
 window.C5_QUESTION_BANK=B;
})();