(function chapter4Svg(){
 "use strict";
 const prev=window.ARENA_VISUALS.render;
 const K={ink:"#f0f6fb",dim:"#bad1df",mint:"#78dfc3",peach:"#ffbb8c",blue:"#89b5ec",lilac:"#bca3ed",dark:"#1d374b",low:"#7190a8"};
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 const text=(x,y,s,size=19,color=K.ink,anchor="start")=>`<text x="${x}" y="${y}" fill="${color}" text-anchor="${anchor}" font-size="${size}" font-weight="760">${esc(s)}</text>`;
 const box=(x,y,w,h,color,r=9,attr="")=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${color}" ${attr}/>`;
 const line=(x1,y1,x2,y2,color=K.dim,width=2)=>`<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
 const signed=n=>n>=0?"+"+n:String(n);
 const wrap=(m,b,eq,note)=>`<svg class="arena-svg arena-ch4-svg" data-drag="1" viewBox="0 0 720 320" role="img" aria-label="${esc(m.title)}">${b}</svg><div class="arena-equation" aria-live="polite">${esc(eq)}</div><div class="arena-scene-note">${esc(note)}</div>`;
 const chip=(x,y,w,h,label,color,i,selected,act="inspect")=>`<g data-ch4-action="${act}" data-index="${i}" role="button" tabindex="0" aria-label="${esc(label)}">${box(x,y,w,h,color,12,`stroke="${selected?"#fff":"#ffffff2b"}" stroke-width="${selected?3:1}`)}${text(x+w/2,y+h/2+7,label,Math.min(25,w/4.8),K.dark,"middle")}</g>`;
 function render(m,s){
  if(m.track!=="c4")return prev(m,s);
  const v=Number(s.value),mode=!!s.mode,sel=Number.isInteger(s.ch4Selected)?s.ch4Selected:-1;
  let b="",eq="",note="";
  if(m.scene==="ch4-factors"){
   const f=[{l:mode?"+":"−",k:"数的符号",c:K.peach},{l:String(v),k:"数字因数",c:K.peach},{l:"π",k:"π也是数",c:K.peach},{l:"x",k:"字母x",c:K.mint},{l:"x",k:"字母x",c:K.mint},{l:"y",k:"字母y",c:K.mint}];
   b+=text(29,35,"点击每个因子，判断它属于系数还是次数",20);
   f.forEach((o,i)=>{let x=28+i*113;b+=chip(x,77,98,76,o.l,o.c,i,sel===i);b+=text(x+49,182,i<3?"系数部分":"次数部分",14,i<3?K.peach:K.mint,"middle");});
   b+=line(32,209,344,209,K.peach,4)+line(365,209,697,209,K.mint,4);
   b+=text(45,246,`系数：${mode?"":"−"}${v}π`,22,K.peach)+text(367,246,"次数：2+1=3",22,K.mint);
   b+=text(35,286,sel>=0?f[sel].k:"π 是一个确定的数，不能算进字母的次数。",16,K.dim);
   eq=`${mode?"":"−"}${v}πx²y：系数${mode?"":"−"}${v}π，次数3`;
   note="切换视角能改变符号；点击某个因子检查它的数学身份。";
  }else if(m.scene==="ch4-terms"){
   const arr=[{l:"x²",pow:2,coef:1},{l:`${v>=0?"+":""}${v}x`,pow:1,coef:v},{l:"+5",pow:0,coef:5}],order=mode?[2,1,0]:[0,1,2];
   b+=text(27,35,"每项自带符号，换个顺序数值也不变",20);
   order.forEach((ix,j)=>{let x=27+j*223;b+=chip(x,74,200,103,arr[ix].l,[K.blue,K.mint,K.peach][ix],ix,sel===ix);b+=text(x+99,210,`${arr[ix].pow}次项`,18,K.dim,"middle");});
   const n=v===0?2:3;
   b+=text(42,257,`共${n}项，最高项是2次项`,22,K.peach);
   b+=text(43,288,sel<0?"点击某项查看系数和次数。":`选中${arr[sel].l}：系数${arr[sel].coef}，次数${arr[sel].pow}`,17,K.dim);
   eq=`x²${v>=0?"+":""}${v}x+5，${n}项，2次`;
   note="零项不需要写出来；多项式的次数取最高项次数，不是各次数相加。";
  }else if(m.scene==="ch4-tiles"){
   const n=v+3;
   b+=text(25,32,"蓝绿都是x²方块，黄色却是x长条",20);
   for(let i=0;i<n;i++){let x=28+(i%9)*73,y=59+Math.floor(i/9)*79;b+=chip(x,y,64,61,"x²",i<3?K.mint:K.blue,0,sel===0);}
   for(let i=0;i<2;i++)b+=chip(412+i*112,172,100,37,"x",K.peach,1,sel===1);
   b+=line(26,233,690,233,K.low,1);
   b+=text(32,274,mode?`${n}x² + 2x`:`3x² + ${v}x² + 2x`,22,mode?K.mint:K.peach);
   eq=`3x²+2x+${v}x² = ${n}x²+2x`;
   note=sel===1?"x长条不是x²方块，不能混合合并。":sel===0?"相同平方块可以把数量相加，x²不变。":"点击方块与长条，找出哪些才是同类。";
  }else if(m.scene==="ch4-brackets"){
   const k=v,raw=["x","−2y","+3"],out=[`${k===1?"":k===-1?"−":k}x`,`${signed(-2*k)}y`,signed(3*k)];
   b+=text(29,34,"一个括号外乘数，必须乘到括号内每一项",20);
   b+=box(27,70,80,91,K.lilac,13)+text(68,125,String(k),32,K.dark,"middle")+text(127,126,"× (",27,K.dim);
   raw.forEach((term,i)=>{const x=184+i*165;b+=chip(x,75,141,82,term,[K.mint,K.peach,K.blue][i],i,sel===i);b+=line(x+70,159,x+70,207,K.dim,2);});
   b+=text(676,125,")",28,K.dim);
   out.forEach((term,i)=>{const x=184+i*165,show=mode||(Array.isArray(s.ch4Revealed)&&s.ch4Revealed.includes(i));b+=box(x,216,141,53,show?[K.mint,K.peach,K.blue][i]:K.low);b+=text(x+70,250,show?term:"？",21,show?K.dark:K.ink,"middle");});
   b+=text(29,296,"点开每一张卡：不能只乘第一个。",16,K.dim);
   eq=mode?`${k}(x−2y+3) = ${k}x${signed(-2*k)}y${signed(3*k)}`:`${k}(x−2y+3) → 逐项展开`;
   note="点击括号内三个项，观察每一项乘完后会变成什么。";
  }else if(m.scene==="ch4-subtract"){
   const x=v,A=3*x*x-2*x+1,B=x*x-5*x+4,result=mode?A+B:A-B,coef=mode?[4,-7,5]:[2,3,-3],labels=mode?["x²","−5x","+4"]:["−x²","+5x","−4"];
   b+=text(27,34,mode?"A+B：把两组加起来":"A−B：要减的是整个B",21);
   b+=text(35,80,`A=3x²−2x+1`,22,K.mint)+text(378,80,"B=x²−5x+4",22,K.peach);
   labels.forEach((s0,i)=>{const xx=29+i*225;b+=chip(xx,111,204,72,s0,mode?K.mint:K.peach,i,sel===i);b+=text(xx+101,214,`合并后该类项系数 ${coef[i]}`,15,K.dim,"middle");});
   b+=text(33,264,`当 x=${x}：A=${A}，B=${B}，${mode?"A+B":"A−B"}=${result}`,19,K.mint);
   eq=mode?"A+B=4x²−7x+5":"A−B=2x²+3x−3";
   note="点击B的每一项，看A−B和A+B模式下符号的变化。";
  }else if(m.scene==="ch4-equivalent"){
   const x=v,result=x*x-1;
   b+=text(31,33,"两条不同路线，数值应该相等",20);
   b+=box(29,64,310,145,K.blue,14)+box(383,64,308,145,K.mint,14);
   b+=text(47,101,"原式",18,K.dark)+text(399,100,"化简式",18,K.dark);
   b+=text(47,137,`2(${x*x}−3×${x})−(${x*x}−6×${x}+1)`,15,K.dark)+text(400,140,`${x}²−1`,24,K.dark);
   b+=text(182,184,String(result),29,K.dark,"middle")+text(536,184,String(result),29,K.dark,"middle");
   b+=line(338,139,381,139,K.peach,4);
   b+=mode?text(39,255,"2x²−6x−x²+6x−1",23,K.peach)+text(39,287,"−6x和+6x抵消，只留下x²−1",17,K.mint):text(39,264,"改变x，两条路线始终跑向同一个结果。",19,K.dim);
   eq=`x=${x}：原式=${result}，化简式=${result}`;
   note="改变x检验等值，再切换视角找到被抵消的项。";
  }else if(m.scene==="ch4-counter"){
   const x=v,a=x*x+x,z=2*x*x,width=Math.max(1,Math.abs(a),Math.abs(z)),wa=Math.round(430*Math.abs(a)/width),wz=Math.round(430*Math.abs(z)/width);
   b+=text(31,34,"两个式子某次相等，不代表每次都一样",20);
   b+=text(32,81,`当前 x=${x}`,23,K.peach);
   b+=text(31,126,"x²+x",20,K.mint)+box(171,103,wa,35,K.mint,7,'data-ch4-action="counter" data-index="2"')+text(648,127,String(a),23,K.ink,"middle");
   b+=text(31,190,"2x²",20,K.peach)+box(171,167,wz,35,K.peach,7,'data-ch4-action="counter" data-index="2"')+text(648,192,String(z),23,K.ink,"middle");
   b+=text(31,266,a===z?"这一次相等。点击柱子试x=2找反例！":"发现反例：两条路线跑出了不同结果。",21,a===z?K.peach:K.mint);
   eq=`x=${x}：x²+x=${a}；2x²=${z}`;
   note="点击柱子立即换到x=2，也可拖动滑杆寻找反例。";
  }else if(m.scene==="ch4-calendar"){
   const center=v,offs=[-8,-7,-6,-1,0,1,6,7,8],selected=sel<0?0:Math.min(sel,8);
   b+=text(27,30,"九格完整数阵：横向差1，纵向差7",20);
   offs.forEach((delta,i)=>{const x=42+(i%3)*111,y=45+Math.floor(i/3)*75,active=i===selected||i===8-selected;b+=chip(x,y,95,63,String(center+delta),active?K.peach:i===4?K.mint:K.blue,i,active);});
   b+=text(402,84,`中心数 ${center}`,23,K.mint)+text(402,129,`对称两数和 ${2*center}`,19,K.peach)+text(402,179,`九格总和 ${9*center}`,23,K.ink);
   b+=text(401,244,"偏移量正负抵消",18,K.dim)+text(401,272,"所以总和=中心×9",18,K.mint);
   eq=`九格之和 = 9×${center} = ${9*center}`;
   note="点击一个格子，同时高亮它的中心对称格；月历使用时必须有完整的3×3格。";
  }
  return wrap(m,b,eq,note);
 }
 window.ARENA_VISUALS.render=render;
 window.ARENA_CH4_VISUALS={count:8};
})();
