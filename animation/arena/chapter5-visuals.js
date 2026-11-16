/* Chapter 5 scene renderer. It only intercepts c5 lessons; all existing scenes remain unchanged. */
(function(){
 "use strict";
 const V=window.ARENA_VISUALS,old=V.render;
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 const tx=(x,y,s,size=20,color="#f4f7fa",anchor="middle")=>'<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-size="'+size+'" font-weight="800" fill="'+color+'">'+esc(s)+'</text>';
 const rect=(x,y,w,h,color,rx=12)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+color+'"/>';
 const line=(x1,y1,x2,y2,color="#b8c9d8",width=3,dash="")=>'<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" fill="none" stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round" '+(dash?'stroke-dasharray="'+dash+'"':'')+'/>';
 function render(m,s){
  if(m.track!=="c5")return old(m,s);
  const v=Number(s.value),k=s.mode||0;let body="",eq="",note="";
  if(m.scene==="c5-concept"){
   body+=tx(360,38,"算式  ≠  方程",21,"#b8c9d8");
   body+=rect(40,70,285,115,"#496582")+rect(395,70,285,115,"#2d806e");
   body+=tx(182,115,"3 + 2",31)+" "+tx(182,153,"只有计算",16,"#d8e5ee");
   body+=tx(537,115,"3x + 2 = 11",27)+" "+tx(537,153,"未知数 + 等号",16,"#e3f7ef");
   body+=rect(260,220,200,54,"#f4bd7c")+tx(360,255,"把 x = "+v+" 放进去",19,"#263747");
   eq="3×"+v+"+2 = "+(3*v+2)+"；目标是让它等于11";
   note="只有当代入的数使等式成立，它才是这个方程的解。";
  }else if(m.scene==="c5-balance"){
   const lhs=v+5,rhs=12,balanced=lhs===rhs;
   body+=tx(360,35,"等式两边必须一起改变",20);
   body+=line(105,150,615,150,balanced?"#79dfbd":"#f2bd79",8);
   body+=rect(105,92,175,48,"#6489b0")+rect(440,92,175,48,"#6489b0");
   body+=tx(192,124,"x + 5 = "+lhs,19)+" "+tx(527,124,"12 = "+rhs,19);
   body+=line(192,150,192,218,"#a9bed0",3)+line(527,150,527,218,"#a9bed0",3);
   body+=rect(100,220,185,45,"#e8a66f")+rect(435,220,185,45,"#e8a66f");
   body+=tx(192,250,k?"左边 −5":"两边同时 −5",17,"#263747")+tx(527,250,k?"右边 −5":"两边同时 −5",17,"#263747");
   eq=k?"x = "+(12-5)+"；两边都减5":"当前试放 x="+v+"；只有x=7时两边相等";
   note="这不是把数字随便搬家，而是等式两边同时做相同的操作。";
  }else if(m.scene==="c5-machine"){
   const out=3*v+2;
   const labels=[String(v),"× 3",String(3*v),"+ 2",String(out)];
   for(let i=0;i<5;i++){const x=20+i*140;body+=rect(x+4,90,112,92,i%2?"#536f91":i===4?"#3c927a":"#426b83",12)+tx(x+60,145,labels[i],25);}
   body+=line(80,205,640,205,"#b8c9d8",2,"7 7");
   body+=tx(360,252,k?"倒着撤销：先 −2，再 ÷3":"正向：先 ×3，再 +2",19,"#ffc18b");
   eq="正向：x → 3x → 3x+2；倒推：先减2，再除3";
   note="逆向操作的顺序与原来的操作顺序相反。";
  }else if(m.scene==="c5-combine"){
   body+=tx(360,38,"把相同的 x 项放在一起",20);
   const terms=[["2x","#62bda2"],["3x","#62bda2"],["−4","#e8ad72"]];
   terms.forEach((t,i)=>{const x=70+i*205;body+=rect(x,82,150,82,t[1])+tx(x+75,133,t[0],27,"#203849");});
   body+=tx(360,207,"↓ 合并同类项",18,"#b9cddd");
   body+=rect(225,229,270,54,"#78c9aa")+tx(360,264,"5x − 4 = 11",23,"#203849");
   eq="2x + 3x − 4 = 11  →  5x − 4 = 11  →  x = 3";
   note="2x与3x都是x，系数可以相加；常数−4不能与x项合并。";
  }else if(m.scene==="c5-brackets"){
   body+=tx(360,38,"分配律：外面的数，要乘到每一项",19);
   body+=rect(48,80,624,72,"#48617e")+tx(360,125,"2 ( x + 3 )",29);
   body+=line(360,157,190,205,"#78d8b4",3)+line(360,157,530,205,"#f0b77d",3);
   body+=rect(105,208,170,58,"#78c9aa")+rect(445,208,170,58,"#e8ad72");
   body+=tx(190,245,"2 × x = 2x",19,"#203849")+tx(530,245,"2 × 3 = 6",19,"#203849");
   eq="2(x+3)−4=12 → 2x+6−4=12 → x=5";
   note="不要只乘括号里的第一项，括号里的每一项都要乘。";
  }else if(m.scene==="c5-fractions"){
   body+=tx(360,38,"共同倍数：把分母一起消掉",20);
   body+=rect(75,77,570,68,"#47627f")+tx(360,119,"x / 3  +  2  =  5",28);
   body+=line(360,151,360,193,"#ffc18b",3);
   body+=rect(130,200,460,65,"#65b99f")+tx(360,241,"两边每一项都 × 3",22,"#203849");
   eq="x/3+2=5 → x+6=15 → x=9";
   note="乘3不只作用在分数上，等号两边的每一项都要乘3。";
  }else if(m.scene==="c5-model"){
   body+=tx(360,38,"把文字翻译成两个相等的总价",19);
   body+=rect(40,75,280,82,"#47627f")+tx(180,108,"3 个大杯",20)+tx(180,139,"单价 x + 5",19,"#ffc18b");
   body+=rect(400,75,280,82,"#327f70")+tx(540,108,"4 个小杯",20)+tx(540,139,"单价 x",19,"#b7f0d9");
   body+=line(320,116,400,116,"#ffc18b",3);
   body+=tx(360,208,"3 ( x + 5 )  =  4x",25);
   body+=tx(360,253,"解得 x = 15 元",22,"#8ce2bf");
   eq="3(x+5)=4x → 3x+15=4x → x=15";
   note="先定义x是什么，再把每一笔总价表达出来。";
  }else if(m.scene==="c5-pursuit"){
   const t=v,a=1.2*t+1,b=.8*t+3;
   const sx=65,scale=55,ya=110,yb=205;
   body+=tx(360,35,"同一时刻，追上时位置相同",20);
   body+=tx(38,ya+6,"甲",16,"#8ce2bf","start")+rect(sx,ya-27,Math.max(5,a*scale),48,"#5db99a",8)+tx(sx+a*scale+12,ya+5,a.toFixed(1)+" km",17);
   body+=tx(38,yb+6,"乙",16,"#ffc18b","start")+rect(sx,yb-27,Math.max(5,b*scale),48,"#e5ad70",8)+tx(sx+b*scale+12,yb+5,b.toFixed(1)+" km",17);
   body+=line(65,270,655,270,"#a9bed0",2);
   body+=tx(360,300,"时间 "+t+" 小时",18,"#d7e4ee");
   eq="甲：1.2×"+t+"+1="+a.toFixed(1)+"；乙：0.8×"+t+"+3="+b.toFixed(1);
   note=t===5?"两队位置相同，甲追上乙。":"继续调整时间，寻找两条路程相等的时刻。";
  }else if(m.scene==="c5-repeating"){
   const n=v,decimal=(n/9).toFixed(3);
   body+=tx(360,40,"把循环小数设成 x，再整体乘10",20);
   body+=rect(100,78,520,64,"#47627f")+tx(360,119,"x = 0."+String(n).repeat(3)+"…",27);
   body+=line(360,145,360,188,"#ffc18b",3);
   body+=rect(100,194,520,66,"#398875")+tx(360,235,"10x − x = "+n,25);
   eq="9x = "+n+"，所以 x = "+n+"/9";
   note="循环部分错开一位后相减，重复的小数尾巴抵消。";
  }
  return '<svg class="arena-svg" data-drag="1" viewBox="0 0 720 320" role="img" aria-label="'+esc(m.title)+'互动图">'+body+'</svg><div class="arena-equation" aria-live="polite">'+esc(eq)+'</div><div class="arena-scene-note">'+esc(note)+'</div>';
 }
 V.render=render;
})();