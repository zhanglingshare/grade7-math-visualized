(function buildVisuals(){
"use strict";
const C={a:"#70e3c3",b:"#ffc18b",c:"#7295cf",d:"#ad9be4",ink:"#f2f8ff",muted:"#a7bed0",dark:"#24364d",low:"#47627f"};
const esc=s=>String(s).replace(/[&<>"']/g,k=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[k]));
const text=(x,y,t,size=18,color=C.ink,anchor="start")=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="720" text-anchor="${anchor}">${esc(t)}</text>`;
const box=(x,y,w,h,col,r=7,more="")=>`<rect x="${x}" y="${y}" width="${Math.max(0,w)}" height="${Math.max(0,h)}" rx="${r}" fill="${col}" ${more}/>`;
const path=(d,col=C.ink,sw=2,extra="")=>`<path d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const dot=(x,y,r=8,col=C.a,extra="")=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" ${extra}/>`;
const nice=n=>Number.isInteger(n)?String(n):Number(n.toFixed(2)).toString();
function wrap(m,s,body,eq,caption){
  return `<svg class="arena-svg" data-drag="1" viewBox="0 0 720 320" role="img" aria-label="${esc(m.title)}的可操作数学示意图">${body}</svg><div class="arena-equation" aria-live="polite">${esc(eq)}</div><div class="arena-scene-note">${esc(caption)}</div>`;
}
function render(m,state){
const v=Number(state.value),k=state.mode||0,c=m.cfg;
let z="",eq="",note="";
switch(m.scene){
case "bars":{
 const left=c.total-v,scale=40,common=Math.max(0,left);
 z+=text(30,35,"甲：固定12颗",19)+box(75,62,c.total*scale,54,C.c,7)+box(75,62,common*scale,54,C.a,7)+box(75+common*scale,62,v*scale,54,C.b,7);
 z+=text(83,95,String(c.total),18,C.dark)+text(30,158,"乙：未知数量",19)+box(75,179,common*scale,54,C.a,7)+text(84,212,String(left),18,C.dark);
 z+=text(76+common*scale,47,`多${v}`,17,C.b);
 eq=`${c.total}−${v}=${left}`;note=k?"黄色部分属于甲，不属于乙。":"拖动改变黄色差值，观察乙怎样变化。";break;
}
case "fractions":{
 const denom=Math.max(2,Math.round(v)); const q1=6/2,step=560/denom;
 z+=text(34,39,"整体A：6个苹果，取一半",19)+box(42,58,560,56,C.low)+box(42,58,280,56,C.a);
 z+=text(620,95,`3个`,19,C.a);
 const selected=Math.max(1,Math.min(denom,Math.round(state.selected||1))),actual=12*selected/denom;
 z+=text(34,155,`整体B：12个苹果，取${selected}/${denom}`,19);
 for(let j=0;j<denom;j++)z+=box(42+j*step,173,step-3,57,j<selected?C.b:C.low,3,`data-part-index="${j}"`);
 z+=text(620,211,`${nice(actual)}个`,17,C.b)+text(44,270,k?"换个整体比较，结果可能反转。":"点击下面的分数格，改变选中的份数。",17,C.muted);
 eq=`6×1/2=${nice(q1)}；12×${selected}/${denom}=${nice(actual)}`;
 note="同一个分数，必须先说清楚‘整体’是什么。";break;
}
case "groups":{
 if(c.cut){
 const rows=Math.round(v),cols=c.unit||4,cut=c.cut,size=Math.min(46,410/cols,165/rows);
 z+=text(34,37,"从每一行拿走同样的部分",20);
 for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
 const x=38+col*(size+5)+(k&&col>=cut?20:0),y=65+row*(size+5);
 z+=box(x,y,size,size,col<cut?C.a:C.b,3,'data-scene-action="regroup"');
 }
 z+=text(38,270,k?"这两块重组后，剩下的总格数不变。":"点击色块切开，观察每一行都怎样分割。",17,C.muted);
 eq=`${rows}×(${cols}−${cut})=${rows*cols}−${rows*cut}=${rows*(cols-cut)}`;
 note="拿掉的黄色部分也是每一行都有，不能漏乘。";
 }else{
 const n=c.group||4,unit=c.unit||25,total=v*n*unit;
 z+=text(34,35,`共有${v}组，每组${n}个${unit}`,20);
 if(k){
 for(let i=0;i<v;i++){const x=40+i*100;z+=box(x,80,86,99,C.a,10,'data-scene-action="regroup"')+text(x+43,138,String(n*unit),24,C.dark,"middle");}
 }else{
 for(let i=0;i<v;i++)for(let j=0;j<n;j++){
 const x=36+i*104+j*22;z+=box(x,91,19,62,j%2?C.b:C.a,3,'data-scene-action="regroup"');
 }
 }
 z+=text(38,241,"点击色块：四个25先组成一个100。",19,C.b);
 eq=`${v}×(${n}×${unit})=${total}`;
 note="重组数学对象，不需要先做竖式。";
 }break;
}
case "balance":{
 const sum=v+c.add,target=m.id==="b04"?12:sum,removed=k?c.add:0;
 const left=v+c.add-removed,right=target-removed;
 const tilt=Math.max(-9,Math.min(9,(left-right)*2));
 z+=text(30,35,k?"左右各移走相同数量":"未知数＋已知数，与目标比较",19);
 z+=`<g data-scene-action="remove" transform="rotate(${tilt} 357 148)">`+path("M128 150 H586",C.a,9)+box(126,100,147,48,C.c)+box(436,100,147,48,C.c)+text(199,132,String(left),24,C.ink,"middle")+text(508,132,String(right),24,C.ink,"middle")+"</g>";
 z+=`<polygon points="343,153 371,153 357,224" fill="${C.b}"/>`+box(308,226,98,14,C.d);
 eq=k?`${v} 与 ${target-c.add} 比较`:`${v}+${c.add} 与 ${target} 比较`;
 note=left===right?"两端平衡，等量关系成立。":"调节未知数，让天平重新达到水平。";break;
}
case "area":{
 const w=Math.round(v),h=c.height||4,size=33,xx=40,yy=64;
 for(let i=0;i<h;i++)for(let j=0;j<w;j++)z+=box(xx+j*(size+2),yy+i*(size+2),size,size,(i+j)%2?C.a:C.c,2);
 z+=path(`M ${xx-3} ${yy-3} h${w*(size+2)} v${h*(size+2)} h${-w*(size+2)} Z`,C.b,4);
 z+=text(390,100,`长 ${w} × 宽 ${h}`,22)+text(390,147,`面积 ${w*h}格`,24,C.a)+text(390,193,`周长 ${2*(w+h)}格`,23,C.b);
 if(k)z+=text(30,259,"比较：8×3面积24，周长22",18,C.muted);
 eq=`面积 ${w*h}；周长 ${2*(w+h)}`;note="绿色方格是面积；黄色边界是周长。";break;
}
case "machine":{
 const mul=c.mul,add=c.add,out=mul*v+add,canInvert=mul!==0;
 const list=[String(v),`×${mul}`,String(v*mul),`+${add}`,String(out)];
 for(let i=0;i<5;i++){let x=25+i*139;
 if(i%2===0){z+=box(x,95,110,90,i===0?C.a:i===2?C.c:C.b,12)+text(x+55,150,list[i],27,i===0||i===4?C.dark:C.ink,"middle");}
 else{z+=path(`M ${x-12} 140 H${x+103}`,C.d,3)+text(x+50,122,list[i],21,C.ink,"middle");}}
 if(k){z+=path("M 650 222 H 80",C.a,4,'stroke-dasharray="9 7"')+text(232,254,canInvert?`倒推：先−${add}，再÷${mul}`:"乘0会丢失输入信息，无法唯一逆推",18,C.b);}
 eq=`${v}×${mul}+${add}=${nice(out)}`;
 note=canInvert?"倒推时先撤销最后一步；不能按原顺序倒着猜。":"任意输入乘0都得到0，所以除0无定义。";break;
}
case "ratio":{
 const a=c.a*v,b=c.b*(k?1:v),factor=15;
 z+=text(32,39,`面粉 ${c.a}份：水 ${c.b}份`,20);
 z+=text(34,79,"面粉",18)+box(116,58,a*factor,58,C.a)+text(127,96,String(a),20,C.dark);
 z+=text(34,168,"水",18)+box(116,146,b*factor,58,k?C.d:C.b)+text(128,184,String(b),20,C.dark);
 z+=text(35,245,k?"如果只增加面粉，比例会被破坏。":"同时增减两种材料，味道保持。",18,k?C.b:C.a);
 eq=`当前面粉:水 = ${a}:${b}`;
 note=k?"这是特意展示的错误配比，用来寻找反例。":"两种量乘同样倍数，比例才保持。";break;
}
case "line":{
 const scale=28,ox=358,oy=154,start=c.start||0,phys=v,translated=c.subtract?-v:v;
 z+=path("M 35 154 H690",C.muted,3);
 for(let n=-11;n<=11;n++){let x=ox+n*scale;z+=path(`M${x} 143 V166`,C.low,2);if(n%2===0)z+=text(x,189,n,12,C.muted,"middle");}
 let sx=ox+start*scale,px=ox+phys*scale;
 if(c.mirror){
 z+=dot(px,oy,10,C.a)+dot(ox-phys*scale,oy,10,C.b)+path(`M${px} 111 H${ox-phys*scale}`,C.d,3,'stroke-dasharray="6 5"');
 }else if(c.compare){
 z+=dot(px,oy,10,C.a)+dot(sx,oy,10,C.b);
 }else if(c.journey||c.subtract){
 let ex=ox+(start+translated)*scale;z+=dot(sx,oy,9,C.a)+dot(ex,oy,11,C.b)+path(`M${sx} 113 Q${(sx+ex)/2} 40 ${ex} 113`,C.a,4);
 }else{
 z+=dot(px,oy,12,C.b)+path(`M${ox} 108 H${px}`,C.a,4);
 }
 z+=text(35,48,c.subtract?"减去负数：分清减法与符号":c.journey?"起点＋位移＝终点":c.mirror?"相反数是0两侧的镜像":c.distance?"位置可负，距离不负":c.compare?"数轴右边更大":"方向由参照系决定",19);
 const result=c.journey||c.subtract?start+translated:phys;
 eq=c.mirror?`${nice(v)} 的相反数 = ${nice(-v)}`:c.distance?`位置 ${v}；距离 ${Math.abs(v)}`:c.subtract?`${start}−(${v})=${nice(result)}`:c.journey?`${start}+(${v})=${nice(result)}`:c.compare?`${start} 与 ${v}，右侧更大`:`实际位置 ${v}；${k?"向左为正，读数 "+(-v):"向右为正，读数 "+v}`;
 note=c.subtract?"减去一个量，等于加上它的相反数。":"沿数轴直接操作点，找大小、方向、距离或运算。";break;
}
case "signed":{
 if(m.id==="r02"){z+=text(42,48,"同样的横线，承担不同职责",20);
 z+=box(49,98,264,104,C.c,14)+box(370,98,289,104,C.a,14);
 z+=text(180,140,v,29,C.ink,"middle")+text(509,140,`5−(${v})`,29,C.dark,"middle");
 z+=text(180,178,"数的符号",15,C.ink,"middle")+text(509,178,"运算符号",15,C.dark,"middle");
 eq=`数卡：${v}；运算：5−(${v})=${5-v}`;note="数字属于什么数，与减号正在做什么，是两个问题。";
 }else{
 const positive=c.positive||5,negative=Math.abs(v),unit=39;
 z+=text(38,38,`正筹码 ${positive}个`,20,C.a)+text(38,149,`负筹码 ${negative}个`,20,C.b);
 for(let i=0;i<positive;i++)z+=dot(55+i*unit,86,16,C.a);
 for(let i=0;i<negative;i++)z+=dot(55+i*unit,198,16,C.b);
 if(k){let pairs=Math.min(positive,negative);for(let i=0;i<pairs;i++)z+=path(`M${55+i*unit} 109 V174`,C.ink,3,'stroke-dasharray="4 5"');}
 eq=`${positive}+(${v})=${positive+v}`;note="一正一负可抵消为0，留下的方向决定结果。";
 }break;
}
case "classify":{
 const cards=["0","−3","−1/2","2","0.5","−0.5"], val=[0,-3,-0.5,2,0.5,-0.5];
 const ix=Math.max(0,Math.min(5,Math.floor(v)));let selected=val[ix];
 z+=text(29,35,"点击一张数卡，看它同时属于哪些集合",20);
 for(let i=0;i<6;i++){let x=30+(i%3)*218,y=64+Math.floor(i/3)*82;z+=box(x,y,196,61,i===ix?C.b:C.low,10,`data-choice-index="${i}"`)+text(x+98,y+39,cards[i],23,i===ix?C.dark:C.ink,"middle");}
 let names=[Number.isInteger(selected)?"整数":"分数",selected>0?"正有理数":selected<0?"负有理数":"既非正也非负"];
 z+=text(32,283,`当前：${cards[ix]} → ${names.join("、")}`,17,C.a);
 eq=`${cards[ix]} 是 ${names.join(" · ")}`;note="正负与整数、分数属于不同分类维度。";break;
}
case "pattern":{
 const unit=c.unit||-3;
 z+=text(35,39,`−3乘以不同的数，看乘积怎样变化`,20);
 for(let i=0;i<7;i++){
 const n=3-i,result=unit*n,y=68+i*29;
 z+=box(38,y-18,390,26,n===v?C.b:i%2?C.low:C.c,3);
 z+=text(58,y,`${unit} × (${n}) = ${result}`,16,n===v?C.dark:C.ink);
 }
 z+=text(466,125,"每下降1行",17)+text(465,158,"结果增加3",21,C.a);
 eq=`${unit}×(${v})=${unit*v}`;note="用规律帮助理解负乘负，最终仍须符合运算律。";break;
}
case "powers":{
 const base=c.variable?v:c.base,exp=c.power||v;
 const val=base**exp,without=-(Math.abs(base)**exp),barWidth=Math.min(470,Math.abs(val)*7);
 z+=text(30,38,c.variable?"负数代入，为什么要保留括号？":"负底数乘方，指数改变符号",20);
 z+=box(39,73,590,96,C.low,13);
 const factors=Array.from({length:Math.max(1,exp)},()=>`(${nice(base)})`).join(" × ");
 z+=text(52,111,c.variable?`${nice(base)}² = ${nice(val)}`:factors.slice(0,46),19,C.ink);
 z+=text(52,145,k?`不带括号：−${Math.abs(base)}^${exp} = ${nice(without)}`:`带括号：(${nice(base)})^${exp} = ${nice(val)}`,20,k?C.b:C.a);
 z+=box(39,194,barWidth,34,k?C.b:C.a);
 eq=k?`−${Math.abs(base)}^${exp}=${nice(without)}`:`(${nice(base)})^${exp}=${nice(val)}`;
 note="括号决定负号是否属于底数；不要把−2²与(−2)²混同。";break;
}
case "expression":{
 let a=Math.max(1,v),first=-(a**2),mult=c.coef*c.other,normal=first+mult,bracket=a*a+mult;
 z+=text(30,38,"先乘方 → 再乘法 → 最后加法",20);
 for(const [i,t] of ["① 乘方","② 乘法","③ 合并"].entries()){const x=35+i*224;z+=box(x,85,201,95,i===0?C.a:i===1?C.c:C.b,14)+text(x+100,130,t,22,i===2?C.dark:C.ink,"middle")+text(x+100,163,[first,mult,k?bracket:normal][i],21,i===2?C.dark:C.ink,"middle");}
 eq=k?`(−${a})²+${c.coef}×${c.other}=${bracket}`:`−${a}²+${c.coef}×${c.other}=${normal}`;
 note="先确认括号和乘方，再计算其他操作。";break;
}
case "variable":{
 const a=v,size=22*a;
 z+=text(34,37,"同一个a，周长与面积的变化不同",20);
 z+=box(40,64,size,size,C.a,3);
 for(let i=1;i<a;i++)z+=path(`M${40+i*22} 64 V${64+size} M40 ${64+i*22} H${40+size}`,C.c,1);
 z+=text(330,106,`边长 a=${a}`,22,C.ink)+text(330,152,`周长 4a=${4*a}`,22,C.b)+text(330,199,`面积 a²=${a*a}`,22,C.a);
 if(k)z+=text(331,245,`相差 ${Math.abs(4*a-a*a)}`,18,C.muted);
 eq=`a=${a}；4a=${4*a}；a²=${a*a}`;
 note="拖动正方形边长，看线性与平方增长的差别。";break;
}
case "formula":{
 const price=c.price||5,fee=c.fee||0,total=price*v+fee;
 z+=text(28,39,c.unit?"每秒处理面积，随时间变化":"商品费随件数变化，一次运费固定",20);
 if(k){
 z+=box(32,96,Math.min(485,price*v*13),62,C.a,8)+text(43,135,`${price*v}（变化部分）`,20,C.dark);
 if(fee)z+=box(32,171,fee*31,52,C.b,8)+text(42,204,`${fee}（固定）`,18,C.dark);
 }else{
 for(let i=0;i<v;i++){let x=35+i*62;z+=box(x,88,51,81,C.a,7)+text(x+25,137,price,20,C.dark,"middle");}
 z+=text(37,232,fee?`另加一次${fee}`:`总量=${price}×${v}`,22,C.b);
 }
 eq=`${price}×${v}${fee?`+${fee}`:""}=${total}${c.unit||"元"}`;
 note="一次性的常量与随数量变化的部分，必须分开。";break;
}
case "dual":{
 const a=c.mul*(v+c.add),b=c.mul*v+c.add;
 z+=text(36,37,`两台机器输入 x=${v}`,20);
 z+=box(37,75,289,120,C.a,16)+box(388,75,289,120,C.c,16);
 z+=text(181,121,"先+2，再×3",19,C.dark,"middle")+text(181,162,a,28,C.dark,"middle");
 z+=text(530,121,"先×3，再+2",19,C.ink,"middle")+text(530,162,b,28,C.ink,"middle");
 z+=text(39,239,`结果总是差 ${Math.abs(a-b)}，因为乘到的部分不同。`,19,C.b);
 eq=`3(${v}+2)=${a}；3×${v}+2=${b}`;
 note="多一个括号，会让‘×3’作用到不同的整体。";break;
}
}
return wrap(m,state,z,eq,note);
}
window.ARENA_VISUALS={render};
})();
