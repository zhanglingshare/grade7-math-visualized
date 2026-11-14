(function visualModule(){
"use strict";
const C={mint:"#75dec5",coral:"#ffbc86",blue:"#5e8aaf",lav:"#bbabeb",ink:"#e8f4ff"};
const E=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const R=(x,y,w,h,c,r=5)=>`<rect x="${x}" y="${y}" width="${Math.max(0,w)}" height="${Math.max(0,h)}" rx="${r}" fill="${c}"/>`;
const T=(x,y,s,z=18,c=C.ink,a="start")=>`<text x="${x}" y="${y}" fill="${c}" font-size="${z}" font-weight="750" text-anchor="${a}">${E(s)}</text>`;
const L=(a,b,c,d,col=C.ink,w=2,extra="")=>`<path d="M ${a} ${b} L ${c} ${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" ${extra}/>`;
const O=(x,y,r,c=C.mint)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const P=(s,c)=>`<polygon points="${s}" fill="${c}"/>`;
const F=x=>Number.isInteger(x)?String(x):Number(x).toFixed(2).replace(/0+$/,"").replace(/\.$/,"");
const scenes={};
function wrap(m,v,mode,body,formula,insight){
const p=(v-m.cfg.min)/(m.cfg.max-m.cfg.min);
const track=L(64,272,556,272,C.blue,7)+L(64,272,64+p*492,272,C.coral,7)+O(64+p*492,272,11,C.coral);
return `<div class="tm-model-visual tv-model"><div class="tv-scene-header"><span>${E(m.title)}</span><span>${mode?"第二种表示":"动态操作"}</span></div><svg data-tm-drag="1" viewBox="0 0 620 305" role="img" aria-label="${E(m.title)}，可在图上左右拖动">${body}${track}${T(64,296,"在图中左右拖动，或使用下方滑杆",11,"#aac5d4")}</svg><div class="tm-model-formula">${E(formula)}</div><p class="tm-model-caption">${E(insight)}</p></div>`;
}
scenes.compare=(m,v,k)=>{
const c=m.cfg,pct=!!c.percent,b=pct?c.total:c.total-v,a=pct?c.total*(1+v/100):c.total,s=430/Math.max(a,b);
let z=T(30,37,pct?"百分比要先确认基准":"先找数量较多的一方",20)+T(30,96,"甲",17)+R(82,63,a*s,49,C.blue)+T(94,94,F(a),20)+T(30,174,"乙",17)+R(82,141,b*s,49,C.mint)+T(94,173,F(b),20,"#1a3d42")+L(82+b*s,55,82+a*s,55,C.coral,5);
if(k)z+=T(86,231,pct?`乙100%，甲${100+v}%`:`乙=甲−${v}=${b}`,24,C.coral);
return wrap(m,v,k,z,pct?`甲=${c.total}×(1+${v}%)=${F(a)}`:`甲${c.total}−差${v}=乙${b}`,"谁是基准，比看见“多”字更重要。");
};
scenes.clock=(m,v,k)=>{
const start=m.cfg.start||0,end=start+v,reverse=!!m.cfg.reverse,clock=n=>`${Math.floor((n/60)%24)}:${String(n%60).padStart(2,"0")}`;
let z=T(31,36,reverse?"知道到达时间，反向倒推出发时间":"时间经过多久，要跨过几个整点？",19);
if(k){
z+=L(40,142,570,142,C.blue,6);
for(let j=0;j<=5;j++){let xx=45+j*105;z+=L(xx,127,xx,157,C.lav,2)+T(xx,187,clock(reverse?end-Math.round(v*j/5):start+Math.round(v*j/5)),13,C.ink,"middle");}
z+=T(45,91,reverse?`向前倒推${v}分钟`:`经过${v}分钟`,25,C.coral);
}else{
const cx=186,cy=139;
z+=`<circle cx="${cx}" cy="${cy}" r="88" fill="#254458" stroke="${C.mint}" stroke-width="3"/>`;
for(let j=1;j<=12;j++){let a=j*Math.PI/6-Math.PI/2;z+=T(cx+Math.cos(a)*67,cy+Math.sin(a)*67+5,j,14,C.ink,"middle");}
let ma=(end%60)*Math.PI/30-Math.PI/2,ha=(end%720)*Math.PI/360-Math.PI/2;
z+=L(cx,cy,cx+60*Math.cos(ma),cy+60*Math.sin(ma),C.coral,5)+L(cx,cy,cx+42*Math.cos(ha),cy+42*Math.sin(ha),C.ink,6)+O(cx,cy,5);
z+=T(331,103,clock(reverse?end:start),24)+T(331,144,`${reverse?"−":"＋"}${v}分钟`,21,C.coral)+T(331,187,clock(reverse?start:end),30,C.mint);
}
return wrap(m,v,k,z,reverse?`${clock(end)} − ${v}分钟 = ${clock(start)}`:`${clock(start)} → ${clock(end)}（${v}分钟）`,"时针与分针走不同速度；每小时60分钟。");
};
scenes.price=(m,v,k)=>{
const c=m.cfg,goods=v*c.unit,sum=goods+c.fee;
let z=T(29,37,"哪些费用每件都算，哪些只算一次？",19);
if(k){z+=R(33,84,Math.min(465,goods*10),50,C.mint)+T(43,117,`商品 ${goods}元`,19,"#194042")+R(33,150,c.fee*18,50,C.coral)+T(41,182,`邮费 ${c.fee}元`,17,"#2e394a");}
else{for(let j=0;j<v;j++){let xx=33+(j%7)*73,yy=81+Math.floor(j/7)*77;z+=R(xx,yy,55,67,C.mint)+R(xx+8,yy+14,39,4,C.blue);}z+=R(421,79,130,94,C.coral,12)+T(429,119,"运费只付",15,"#22374a")+T(430,150,"一次",23,"#22374a");}
z+=T(32,240,`书钱 ${goods}＋邮费 ${c.fee}＝${sum}`,22,C.coral);
return wrap(m,v,k,z,`${v}×${c.unit}+${c.fee}=${sum}`,"变量费用与固定费用是两种不同结构。");
};
scenes.units=(m,v,k)=>{
const isKm=m.cfg.label==="千米",num=isKm?v*1000+(m.cfg.extra||0):v;
let z=T(32,38,"实际长度不变，数字可因单位变化",19);
if(k){
const n=isKm?v:Math.ceil(v/10),cw=Math.min(70,500/n);
for(let j=0;j<n;j++)z+=R(36+j*cw,85,cw-4,67,j%2?C.blue:C.mint)+T(43+j*cw,127,isKm?"1km":"10cm",13,"#26364b");
z+=T(36,220,isKm?`再加${m.cfg.extra||0}米`:`${v}厘米=${F(v/100)}米`,25,C.coral);
}else{
z+=L(35,132,560,132,C.blue,8);
for(let j=0;j<=10;j++){let xx=35+j*52.5;z+=L(xx,120,xx,145,C.ink,1)+T(xx,165,isKm?Math.round(v*j*100):F(v*j/10),11,C.ink,"middle");}
z+=T(35,222,isKm?`${num}米`:`${F(v/100)}米`,30,C.coral);
}
return wrap(m,v,k,z,isKm?`${v}千米 + ${m.cfg.extra||0}米 = ${num}米`:`${v}厘米 = ${F(v/100)}米`,"统一单位后才能直接进行加减或比较。");
};
scenes.motion=function updatedMotion(m,v,k){
  const distance=m.cfg.reverse?180:v*m.cfg.unit;
  const speed=distance/v;
  let z=T(29,36,m.cfg.reverse?"路程固定180千米，时间变化则平均速度变化":"匀速运动：时间与路程联动",19);
  if(k){
    z+=L(49,222,564,222,C.blue,3)+L(49,222,49,55,C.blue,3);
    z+=L(49,222,49+Math.min(420,62*v),92,C.mint,5)+O(49+Math.min(420,62*v),92,8,C.coral);
    z+=T(339,73,"总路程 "+F(distance)+"千米",18)+T(339,111,"用时 "+F(v)+"小时",18)+T(339,149,"平均速度 "+F(speed),23,C.coral);
  }else{
    z+=R(34,173,520,26,"#43637d",3);
    for(let i=0;i<10;i++)z+=R(42+i*50,184,24,3,C.ink,2);
    z+=R(110+Math.min(320,v*42),116,94,50,C.mint,8)+R(126+Math.min(320,v*42),95,53,31,C.blue,8);
    z+=T(30,81,"固定走完"+F(distance)+"千米",23,C.mint);
    z+=T(30,225,F(v)+"小时，平均每小时"+F(speed)+"千米",22,C.coral);
  }
  return wrap(m,v,k,z,F(distance)+"千米 ÷ "+F(v)+"小时 = "+F(speed)+"千米/小时","固定路程时，用时越长，平均速度越慢；不能只看路程。");
};
scenes.sequence=(m,v,k)=>{
const squares=!!m.cfg.squares,total=squares?v*v:v*(v+1)/2,cell=Math.min(squares?27:32,430/(v+2));
let z=T(29,36,squares?"每一级增加一圈，成为更大的正方形":"每一层比上一层多一块",19);
for(let row=0;row<v;row++)for(let col=0;col<(squares?v:row+1);col++)z+=R(31+col*(cell+3),58+row*(cell+3),cell,cell,row===v-1?C.coral:C.mint,3);
if(k)z+=T(343,126,squares?`${v}×${v}`:`1+2+…+${v}`,26,C.ink)+T(344,176,`${total}块`,31,C.coral);
return wrap(m,v,k,z,squares?`${v}² = ${total}`:`1+2+…+${v}=${total}`,"从结构找规律，不代表几项数就能唯一确定所有后项。");
};
scenes.tiles=(m,v,k)=>{
const cols=m.cfg.unit,split=m.cfg.split||Math.floor(cols/2),size=Math.min(26,480/(cols+2),175/(v+1));
let z=T(31,36,"整块 vs 两块：面积与乘积都没改变",19);
for(let a=0;a<v;a++)for(let b=0;b<cols;b++){
  const extra=k&&b>=split?15:0;
  z+=R(31+b*(size+2)+extra,60+a*(size+2),size,size,b<split?C.mint:C.coral,2);
}
z+=T(33,236,`${v}×${cols} = ${v*split}+${v*(cols-split)} = ${v*cols}`,21);
return wrap(m,v,k,z,`${v}×${cols} = ${v}×${split}+${v}×${cols-split}`,"拆分的是一整块，不要漏掉任何一部分。");
};
scenes.blocks=(m,v,k)=>{
const c=m.cfg,amount=c.rows*c.cols*v;
let z=T(32,35,`每层${c.rows}×${c.cols}，高${v}层`,19);
if(k){
for(let layer=0;layer<v;layer++){const yy=207-layer*31;z+=R(42,yy,c.rows*c.cols*32,27,layer%2?C.blue:C.mint,5)+T(55+c.rows*c.cols*32,yy+20,`第${layer+1}层`,13);}
}else{
const dx=33;
for(let layer=0;layer<v;layer++)for(let row=0;row<c.rows;row++)for(let col=0;col<c.cols;col++){
const px=67+col*dx+row*18,py=197-col*2-row*16-layer*25;
z+=P(`${px},${py} ${px+dx},${py-8} ${px+dx+18},${py-22} ${px+18},${py-14}`,C.lav);
z+=P(`${px},${py} ${px+dx},${py-8} ${px+dx},${py+15} ${px},${py+23}`,C.mint);
z+=P(`${px+dx},${py-8} ${px+dx+18},${py-22} ${px+dx+18},${py+1} ${px+dx},${py+15}`,C.blue);
}
}
z+=T(432,137,`${amount}块`,28,C.coral);
return wrap(m,v,k,z,`${c.rows}×${c.cols}×${v}=${amount}`,"层数是第三个维度，体积不能只看底面。");
};
scenes.tree=function treeScene(m,v,k){
const c=m.cfg,coin=!!c.coin,other=c.other||2,count=coin?Math.pow(2,v):v*other;
let z=T(31,37,coin?(k?"改变硬币机制：正面80%，反面20%":"公平硬币：每次正反各50%"):(v+"组，每组"+other+"条分支"),19);
if(coin){
 if(k){
  for(let j=0;j<count;j++){
    const bits=j.toString(2).padStart(v,"0");
    const heads=[...bits].filter(x=>x==="0").length,tails=v-heads;
    const probability=Math.pow(.8,heads)*Math.pow(.2,tails);
    const x=30+(j%4)*136,y=55+Math.floor(j/4)*44;
    z+=R(x,y,126,37,heads>tails?C.mint:C.blue,6);
    z+=T(x+8,y+15,bits.replace(/0/g,"正").replace(/1/g,"反"),10,"#1c3946");
    z+=T(x+8,y+30,"概率"+F(probability*100)+"%",11,"#183d49");
  }
 }else{
  for(let level=0;level<=v;level++){
    const n=Math.pow(2,level),x=45+level*110;
    for(let j=0;j<n;j++){
      const y=51+(j+.5)*180/n;
      z+=O(x,y,level===v?5:7,level===v?C.coral:C.mint);
      if(level<v){
        const child=Math.pow(2,level+1);
        for(let b=0;b<2;b++)z+=L(x+7,y,x+110-7,51+((j*2+b)+.5)*180/child,b===0?C.mint:C.coral,1.8);
      }
    }
  }
  z+=T(38,247,count+"条顺序；公平时每条概率"+F(100/count)+"%",17,C.coral);
 }
 return wrap(m,v,k,z,k?"结果数没有变，但各条路径概率不再相等":count+"条路径，公平且独立时各占"+F(100/count)+"%","数出路径不等于证明等可能；公平和独立性是概率判断的条件。");
}
if(k){
const n=Math.min(count,32);
for(let j=0;j<n;j++){const x=32+(j%8)*64,y=57+Math.floor(j/8)*43;z+=R(x,y,49,35,j%2?C.blue:C.mint,6)+T(x+24,y+23,(Math.floor(j/other)+1)+"-"+(j%other+1),11,"#24364c","middle");}
}else{
for(let j=0;j<v;j++){
const y=59+j*(158/Math.max(1,v-1));
z+=L(39,145,192,y,C.mint,2)+O(192,y,7,C.mint);
for(let b=0;b<other;b++)z+=L(200,y,399,y+(b-(other-1)/2)*15,C.blue,2)+O(402,y+(b-(other-1)/2)*15,5,C.coral);
}
}
z+=T(432,199,count+"种",27,C.coral);
return wrap(m,v,k,z,v+"×"+other+"="+count+"种","每件物品都能和另一类每种选择搭配，组合数才是乘法。");
};
scenes.partwhole=(m,v,k)=>{
const c=m.cfg,den=c.den||v,num=c.den?v:1,total=c.total,qty=total*num/den;
let z=T(32,37,m.id==="m58"?"相同分数不能脱离整体来比较":`整体${total}，其中${num}/${den}`,20);
if(m.id==="m58"){
 z+=T(30,74,"整体6，取一半",18)+R(30,91,420,49,C.blue)+R(30,91,210,49,C.mint)+T(465,126,"3",22,C.coral);
 z+=T(30,173,`整体12，取1/${v}`,18)+R(30,186,420,49,C.blue)+R(30,186,420/v,49,C.coral)+T(465,220,F(12/v),22,C.coral);
}else{
const unit=515/den;
for(let j=0;j<den;j++)z+=R(30+j*unit,93,unit-2,91,j<num?C.mint:C.blue,0);
z+=T(32,231,`这部分有${F(qty)}`,25,C.coral);
}
return wrap(m,v,k,z,m.id==="m58"?`6×1/2=3；12×1/${v}=${F(12/v)}`:`${total}×${num}/${den}=${F(qty)}`,"每次比较份量前，都要确认整体是谁。");
};
scenes.scale=(m,v,k)=>{
const c=m.cfg,b=c.base,w=Math.min(185,v*25),w0=Math.min(185,b*25);
let z=T(30,37,"边长变化，面积按平方变化",20);
if(k){
z+=R(40,76,w0,w0,C.blue)+T(43,67,`原边长${b}`,15);
z+=R(297,76,w,w,C.mint)+T(300,67,`现边长${v}`,15);
}else{
z+=R(43,58,w,w,C.mint);
for(let i=1;i<v;i++)z+=L(43+i*w/v,58,43+i*w/v,58+w,C.blue,1)+L(43,58+i*w/v,43+w,58+i*w/v,C.blue,1);
z+=T(315,96,`边长${v}`,20)+T(315,144,`周长${4*v}`,22,C.mint)+T(315,193,`面积${v*v}`,25,C.coral);
}
return wrap(m,v,k,z,`边长${v}；周长${4*v}；面积${v*v}`,"周长按长度变化；面积沿两个方向变化。");
};
scenes.mirror=(m,v,k)=>{
const y=m.cfg.y,ox=310,oy=144,size=37;
let z=L(60,oy,560,oy,C.blue,3)+L(ox,27,ox,237,C.blue,3);
for(let j=-6;j<=6;j++){let xx=ox+j*size;z+=L(xx,oy-6,xx,oy+6,C.ink,1);if(j%2===0)z+=T(xx,oy+24,j,12,C.ink,"middle");}
const px=ox+v*size,mx=ox-v*size,py=oy-y*size;
z+=L(px,py,mx,py,C.coral,2,'stroke-dasharray="6 6"')+O(px,py,9,C.mint)+O(mx,py,9,C.coral);
z+=T(Math.max(29,Math.min(515,px+12)),py-13,`(${v},${y})`,14,C.mint);
if(k)z+=T(32,242,"到纵轴距离相等，左右方向相反",18);
return wrap(m,v,k,z,`(${v},${y})→(${-v},${y})`,"轴对称改变左右位置，不改变长度和面积。");
};
scenes.fractions=(m,v,k)=>{
const d=m.cfg.den,count=k?d*2:d,filled=k?v*2:v,unit=520/count;
let z=T(32,37,`${v}/${d} = ${F(v/d)} = ${F(100*v/d)}%`,22);
for(let i=0;i<count;i++)z+=R(32+i*unit,89,unit-2,100,i<filled?(k?C.coral:C.mint):C.blue,0);
z+=T(32,229,k?`${2*v}/${2*d}：分得更细，大小不变`:`${v}/${d}：原分割方式`,19,C.coral);
return wrap(m,v,k,z,`${v}/${d}=${F(v/d)}=${F(100*v/d)}%`,"分割单位变了，实际阴影面积可能不变。");
};
scenes.hops=(m,v,k)=>{
const start=m.cfg.start,move=v,end=start+move,ox=313,scale=21;
let z=L(35,151,585,151,C.blue,3)+T(30,38,m.cfg.subtract?"减去负数：方向如何改变？":"位置、方向与路程",20);
for(let j=-12;j<=12;j++){let xx=ox+j*scale;z+=L(xx,143,xx,160,C.lav,1);if(j%3===0)z+=T(xx,181,j,11,C.ink,"middle");}
const x1=ox+start*scale,x2=ox+end*scale;
z+=O(x1,151,9,C.ink)+O(x2,151,11,C.coral);
z+=`<path class="tv-motion" d="M ${x1} ${k?99:121} Q ${(x1+x2)/2} ${k?17:59} ${x2} ${k?99:121}" stroke="${C.mint}" stroke-width="5" fill="none"/>`;
z+=T(31,234,`从${start}出发，终点${end}`,23,C.coral);
return wrap(m,v,k,z,m.cfg.subtract?`${start}−(−${v})=${end}`:`${start}+(${v})=${end}`,"负号在运算中的作用要分清；路程不是负数。");
};
scenes.machine=(m,v,k)=>{
const c=m.cfg,a=v,b=v*c.mul,out=b+c.add;
let z=T(32,37,k?"倒过来：先撤销最后一步":"输入→运算→输出",21);
z+=R(33,103,100,71,C.mint,11)+T(83,147,a,31,"#183b43","middle");
z+=L(136,140,231,140,C.coral,5)+T(173,123,`×${c.mul}`,19);
z+=R(237,103,108,71,C.blue,11)+T(291,147,b,31,C.ink,"middle");
z+=L(351,140,442,140,C.coral,5)+T(382,123,`+${c.add}`,19);
z+=R(449,103,109,71,C.coral,11)+T(505,147,out,31,"#273548","middle");
if(k)z+=L(506,215,83,215,C.lav,3,'stroke-dasharray="8 6"')+T(240,238,`先−${c.add}再÷${c.mul}`,18,C.lav);
return wrap(m,v,k,z,`${v}×${c.mul}+${c.add}=${out}`,"逆向撤销必须逆序，不能按正向再算一次。");
};
scenes.triangle=(m,v,k)=>{
const base=v,height=m.cfg.height,w=Math.min(440,v*35),x=38;
let z=T(31,37,"拼成两倍大的形状，为什么要÷2？",20);
if(k){
z+=P(`${x},216 ${x+w},216 ${x+w},75`,C.mint)+P(`${x},216 ${x},75 ${x+w},75`,C.coral);
z+=T(412,120,"两块一样大",17)+T(415,162,"面积翻倍",20,C.coral);
}else{
z+=P(`${x},216 ${x+w},216 ${x+w/2},75`,C.mint)+L(x+w/2,75,x+w/2,216,C.coral,3,'stroke-dasharray="6 5"');
z+=T(44,239,`底${base}`,17)+T(x+w/2+12,152,`高${height}`,16,C.coral);
}
return wrap(m,v,k,z,`${base}×${height}÷2=${base*height/2}`,"先证明为何除以2，再记住面积公式。");
};
scenes.rebalance=(m,v,k)=>{
const a=m.cfg.left,b=m.cfg.right,sum=a+b;
let z=T(30,37,"从一边搬给另一边，和不变",20);
z+=R(33,78,(a+v)*10,55,C.mint)+T(43,112,a+v,22,"#193d3c");
z+=R(33,161,(b-v)*10,55,C.coral)+T(43,194,b-v,22,"#2e3446");
z+=T(380,104,`+${v}`,23,C.mint)+T(380,185,`−${v}`,23,C.coral);
if(k)z+=T(477,151,`和${sum}`,20,C.ink);
return wrap(m,v,k,z,`${a}+${b}=${a+v}+${b-v}=${sum}`,"不是两个加数都增加，而是一增一减互相抵消。");
};
scenes.balanceScale=(m,v,k)=>{
const c=m.cfg,left=v+c.add,right=c.total,difference=left-right,angle=Math.max(-12,Math.min(12,difference*2));
let z=T(30,38,k?"两边同时去掉相同的重量":"天平的水平就是等号",20);
z+=`<g transform="rotate(${angle} 300 153)">`+L(97,153,502,153,C.mint,8)+R(90,108,107,42,C.blue)+T(144,136,k?v:`${v}+${c.add}`,18,C.ink,"middle")+R(407,108,110,42,C.blue)+T(462,136,k?right-c.add:right,20,C.ink,"middle")+"</g>";
z+=P("285,155 315,155 300,222",C.coral)+R(251,220,98,14,C.lav);
z+=T(34,248,difference===0?"平衡 ✓":`左右差${Math.abs(difference)}，现在不平衡`,18,difference===0?C.mint:C.coral);
return wrap(m,v,k,z,k?`${v} 和 ${right-c.add} 对比`:`${v}+${c.add}=${left}；右边${right}`,"等式两边做同一种操作，等量关系才不会破坏。");
};
scenes.group100=function group100(m,v,k){
  const groups=v,cellW=16;
  let z=T(30,34,"每4个25合成一个100，换一种分组，积不变",19);
  if(!k){
    for(let j=0;j<groups;j++){
      const x=34+j*86;
      z+=R(x-5,69,76,106,"#304c62",8);
      for(let p=0;p<4;p++){
        z+=R(x+p*18,98,cellW,46,p%2?C.coral:C.mint,4)+T(x+p*18+8,125,"25",10,"#253b48","middle");
      }
      z+=T(x+35,199,"100",19,C.ink,"middle");
    }
    z+=T(32,243,(4*groups)+"个25，每4个捆成一组",20,C.coral);
  }else{
    for(let j=0;j<groups;j++){
      const x=36+j*85;z+=R(x,92,70,88,j%2?C.blue:C.mint,8)+T(x+35,144,"100",21,j%2?C.ink:"#173d41","middle");
    }
    z+=T(31,224,groups+"组100，一共"+(100*groups),24,C.coral);
  }
  return wrap(m,v,k,""+z,"25×("+(4*groups)+")=(25×4)×"+groups+"=100×"+groups+"="+(100*groups),"25×16不是16个小点：实际有16个25，四个25合成100。");
};
scenes.fractionCompare=function fractionCompare(m,v,k){
  let z=T(30,37,k?"分母4更大，3/4却比1/2大":"同一整体，先比较单位分数",20);
  const bars=k?[{n:3,d:4,label:"3/4"},{n:1,d:2,label:"1/2"}]:[{n:1,d:2,label:"1/2"},{n:1,d:v,label:"1/"+v}];
  for(let i=0;i<bars.length;i++){
    const b=bars[i],y=79+i*101,width=465,part=b.n/b.d;
    z+=T(32,y-10,b.label,21,i===0?C.mint:C.coral);
    for(let c=0;c<b.d;c++)z+=R(32+c*width/b.d,y,width/b.d-2,55,c<b.n?(i===0?C.mint:C.coral):C.blue,2);
    z+=T(515,y+34,F(part*100)+"%",15,C.ink);
  }
  return wrap(m,v,k,z,k?"3/4 > 1/2（分母4更大，但分数反而更大）":"1/2 "+(v===2?"=":">")+" 1/"+v,"只有同一整体的单位分数，才能直接说分母越大每份越小。");
};
window.TM_VISUALS=scenes;
})();
