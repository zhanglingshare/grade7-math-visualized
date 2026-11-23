(function examRepairVisuals(){
"use strict";
/* Five distinct interactive mathematical demonstrations, not ornamental images.
   All motion is local and deterministic. No user data is sent externally. */
let state={id:null,step:-1,frame:0,n:2,m:2,timer:null};
const specs={
 q22:{max:3,delay:1050},q18:{max:3,delay:1250},q19:{max:3,delay:1150},
 q21:{max:5,delay:850},q10:{max:10,delay:720}
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function stop(){if(state.timer!==null){clearInterval(state.timer);state.timer=null;}}
function controls(){
 const max=specs[state.id].max;
 return '<div class="viz-actions" aria-label="动画操作"><button type="button" data-viz="play">'+(state.timer!==null?"■ 暂停":"▶ 播放演示")+'</button><button type="button" data-viz="back" '+(state.frame<=0?"disabled":"")+'>← 上一步</button><button type="button" data-viz="next" '+(state.frame>=max?"disabled":"")+'>下一步 →</button><button type="button" data-viz="reset">重来 ↺</button><span class="viz-count">'+state.frame+' / '+max+'</span></div>';
}
const terminal=()=>state.frame>=specs[state.id].max;
function q22(){
 const i=state.step,p=state.frame;
 const cases=[
  {v:["a","b","c","d"],a:"a×d",b:"b×c",end:"结果：a×d − b×c"},
  {v:["−1","2","−3","4"],a:"(−1)×4 = −4",b:"2×(−3) = −6",end:"−4 − (−6) = 2"},
  {v:["2x−1","3x","2","1"],a:"(2x−1)×1 = 2x−1",b:"3x×2 = 6x",end:"(2x−1)−6x=−4x−1"},
  {v:["−3m+1","3","−n","−1"],a:"(−3m+1)×(−1) = 3m−1",b:"3×(−n) = −3n",end:"3m−1−(−3n)=3(m+n)−1"},
  {v:["2","−1","3","4"],a:"2×4 = 8",b:"(−1)×3 = −3",end:"8 − (−3) = 11"}
 ];
 const item=cases[Math.min(cases.length-1,i)],l=item.v;
 const hi=x=>p===1?(x===0||x===3):p===2?(x===1||x===2):p>=3;
 const cells=l.map((v,index)=>'<div class="viz-mcell '+(hi(index)?(index===0||index===3?"viz-warm":"viz-cool"):"")+'" data-corner="'+index+'">'+esc(v)+'</div>').join("");
 const guide=p===0?"先观察：左上与右下是一组，右上与左下是一组":
 p===1?"第一步：左上 × 右下 · "+item.a:p===2?"第二步：右上 × 左下 · "+item.b:"最后相减："+item.end;
 return '<div class="viz-heading"><span>四格新定义 · 位置决定运算</span><b>'+((i+1)<5?"原卷对应结构":"陌生迁移")+'</b></div>'+
 '<div class="viz-matrix-body"><div class="viz-matrix-board"><div class="viz-cross '+(p>=1?"viz-show-a":"")+' '+(p>=2?"viz-show-b":"")+'"><svg viewBox="0 0 200 200" aria-hidden="true"><path d="M40 41 L160 159" class="viz-line-a"/><path d="M160 41 L40 159" class="viz-line-b"/></svg></div><div class="viz-matrix-grid">'+cells+'</div></div>'+
 '<div class="viz-math-story"><span>先看哪两格相乘？</span><strong class="'+(p>=3?"viz-reveal":"")+'">'+esc(guide)+'</strong><small>不用猜哪个是a：先看它在左上角还是右上角。</small></div></div>'+controls();
}
function q18(){
 const p=state.frame,n=state.n,m=state.m;
 if(state.step>=3){
  const degree=m+1,pass=degree===4;
  return '<div class="viz-heading"><span>变式实验：字母指数决定次数</span><b>新条件：四次二项式</b></div>'+
  '<div class="viz-polynomial"><span class="viz-poly-term">5x<sup>'+m+'</sup>y</span><span class="viz-poly-term"> + 7</span></div>'+
  '<div class="viz-value-controls" style="grid-template-columns:1fr"><div><label>亲手改变 k（左边的指数），使次数等于4</label><div><button data-viz="m-minus" '+(m<=0?"disabled":"")+'>−</button><b>k = '+m+'</b><button data-viz="m-plus" '+(m>=4?"disabled":"")+'>+</button></div></div></div>'+
  '<div class="viz-metrics"><span>项数 <b class="viz-good">2 项</b></span><span>最高次数 <b class="'+(pass?"viz-good":"")+'">'+degree+' 次</b></span></div>'+
  '<div class="viz-message '+(pass?"pass":"")+'">'+(pass?"✓ k+1=4，所以k=3。新题必须重新判断次数，不能套原题的m。":"改变k，注意y自身已经贡献1次。")+'</div>'+controls();
 }
 const middle=n-3,count=middle===0?2:3,degree=Math.max(m+2,middle!==0?1:0);
 const pass=count===2&&degree===3;
 return '<div class="viz-heading"><span>两个约束，一起满足才算过关</span><b>项数 + 次数</b></div>'+
 '<div class="viz-polynomial"><span class="viz-poly-term">2x<sup>'+m+'</sup>y²</span><span class="viz-poly-term viz-disappear '+(middle===0?"gone":"")+'"> − ('+middle+')x</span><span class="viz-poly-term"> + 1</span></div>'+
 '<div class="viz-value-controls"><div><label>改变 n：试着消掉中间项</label><div><button data-viz="n-minus" '+(n<=0?"disabled":"")+'>−</button><b>n = '+n+'</b><button data-viz="n-plus" '+(n>=5?"disabled":"")+'>+</button></div></div>'+
 '<div><label>改变 m：让最高次幂变成3</label><div><button data-viz="m-minus" '+(m<=0?"disabled":"")+'>−</button><b>m = '+m+'</b><button data-viz="m-plus" '+(m>=4?"disabled":"")+'>+</button></div></div></div>'+
 '<div class="viz-metrics"><span>化简后的项数 <b class="'+(count===2?"viz-good":"")+'">'+count+' 项</b></span><span>最高次数 <b class="'+(degree===3?"viz-good":"")+'">'+degree+' 次</b></span></div>'+
 '<div class="viz-message '+(pass?"pass":"")+'">'+(pass?"✓ 项数=2且次数=3两个条件同时成立。":p===0?"按+或−自己尝试，或播放演示让中间项消失。":count!==2?"还没变成二项式：先让n−3变成0。":"项数已对；再核对每项字母指数之和。")+'</div>'+controls();
}
function q19(){
 const p=state.frame;const n=state.step>=3?3:2,exponent=state.step>=3?"2024":"2026";
 const ends=n===2?["4","0"]:["5","−1"];
 const item=(text,color,show,result)=>'<div class="viz-branch-card '+color+' '+(show?"viz-lit":"viz-muted")+'"><span>'+esc(text)+'</span><strong>'+esc(show?result:"？")+'</strong></div>';
 return '<div class="viz-heading"><span>绝对值不止一条路</span><b>两种可能，必须穷尽</b></div>'+
 '<div class="viz-pow"><span>m = −1</span><span class="viz-pow-arrow">→</span><span>m<sup>'+exponent+'</sup></span><span class="'+(p>=1?"viz-good":"")+'">'+(p>=1?"= 1":"= ?")+'</span></div>'+
 '<div class="viz-branch-root">|n| = '+n+' <span>↙　↘</span></div><div class="viz-branch-grid">'+
 item("n = −"+n,"warm",p>=2,p>=3?"2−(−"+n+") = "+ends[0]:"代入")+" "+
 item("n = +"+n,"cool",p>=2,p>=3?"2−"+n+" = "+ends[1]:"代入")+'</div>'+
 '<div class="viz-message '+(p>=3?"pass":"")+'">'+(p===0?"−1的偶次幂有什么规律？先按两次、四次想。":p===1?"偶数个−1相乘，结果是+1。下一步要把|n|拆成两支。":p===2?"左右两个点都离0同样远，不能漏掉任何一支。":"两个结果都已找到；现在尝试用新的绝对值条件独立推导。")+'</div>'+controls();
}
function q21(){
 const p=state.frame,changes=[-8,5,-6,3,-6],labels=["−4吨 × 2次","+5吨 × 1次","−2吨 × 3次","+1吨 × 3次","−3吨 × 2次"];
 const outwardFee=state.step>=3?80:70;
 const total=changes.slice(0,p).reduce((a,b)=>a+b,0),incoming=changes.slice(0,p).filter(x=>x>0).reduce((a,b)=>a+b,0),outgoing=-changes.slice(0,p).filter(x=>x<0).reduce((a,b)=>a+b,0);
 const bars=changes.map((x,i)=>'<div class="viz-ledger-col '+(p===i+1?"viz-current":"")+' '+(p<i+1?"viz-future":"")+'"><span>'+esc(labels[i])+'</span><div class="viz-bar-space"><i class="viz-bar '+(x>=0?"positive":"negative")+'" style="height:'+(Math.abs(x)/8*96)+'px"></i></div><b>'+(p>i?(x>0?"+":"")+x:"?")+'</b></div>').join("");
 return '<div class="viz-heading"><span>一笔一笔模拟仓库进出</span><b>入库向上 · 出库向下</b></div>'+
 '<div class="viz-ledger-bars">'+bars+'</div><div class="viz-metrics">'+
 '<span>净变化 <b class="'+(total<0?"viz-negative":"viz-good")+'">'+(total>0?"+":"")+total+' 吨</b></span>'+
 '<span>运进 <b>'+incoming+' 吨</b></span><span>运出 <b>'+outgoing+' 吨</b></span></div>'+
 '<div class="viz-message '+(p===5?"pass":"")+'">'+(p===0?"每一栏的数先乘次数，再沿正负方向累加。":p===5?`五笔完成。净变化 −12 吨；费用按实际搬运量：8×40+20×${outwardFee}=${8*40+20*outwardFee} 元。`:"已处理 "+p+" 笔；下一笔是："+labels[p])+'</div>'+controls();
}
function q10(){
 const p=state.frame,nums=state.step>=2?[96,48,24,12,6,3,6,3,6,3,6]:[48,24,12,6,3,6,3,6,3,6,3],x=nums[p],next=p<10?nums[p+1]:nums[9];
 const instruction=x%2===0?"偶数 ÷ 2":"奇数 + 3";
 const history=nums.slice(0,p+1).map((n,i)=>'<span class="'+(i===p?"viz-latest":"")+'">'+(i===0?"起点":i+"次")+"<b>"+n+'</b></span>').join('<i>→</i>');
 return '<div class="viz-heading"><span>循环机器：先判断奇偶，再执行规则</span><b>第 '+p+' 次输出</b></div>'+
 '<div class="viz-machine"><div class="viz-machine-input">'+x+'</div><div class="viz-machine-rule"><span>规则</span><strong>'+instruction+'</strong><small>下一次 → '+next+'</small></div></div>'+
 '<div class="viz-sequence">'+history+'</div>'+
 '<div class="viz-message '+(p>=6?"pass":"")+'">'+(p>=6?"现在进入 3 ↔ 6 的周期。回到原卷时，仍需从第几次输出开始数清楚。":p===0?"初始值不是“第1次输出”。按规则算出下一个数才是第1次。":"已计算 "+p+" 次。观察什么时候出现重复的两个数。")+'</div>'+controls();
}
function render(id){return '<div class="repair-viz" id="repair-visual" data-repair-viz="'+esc(id)+'"></div>';}
function paint(){
 const stage=document.getElementById("repair-visual");
 if(!stage || !specs[state.id])return;
 stage.innerHTML=state.id==="q22"?q22():state.id==="q18"?q18():state.id==="q19"?q19():state.id==="q21"?q21():q10();
}
function mount(id,step){
 if(!specs[id]){stop();state.id=null;return;}
 if(state.id!==id || state.step!==step){
  stop();state.id=id;state.step=step;state.frame=0;
  state.n=2;state.m=2;
 }
 paint();
}
function next(){if(terminal()){stop();paint();return;}state.frame++;
 if(state.id==="q18"){if(state.frame===1 && state.step<3)state.n=3;if(state.frame===2)state.m=state.step>=3?3:1;}
 if(terminal())stop();
 paint();
}
function play(){
 if(state.timer!==null){stop();paint();return;}
 if(terminal()){state.frame=0;if(state.id==="q18"){state.n=2;state.m=2;}}
 paint();next(); // instant motion so the first click always visibly changes the screen
 if(terminal()){stop();paint();return;}
 state.timer=setInterval(next,specs[state.id].delay);
 paint();
}
function reset(){stop();state.frame=0;state.n=2;state.m=2;paint();}
function act(action){
 if(!state.id)return;
 switch(action){
 case "play":play();break;
 case "next":stop();next();break;
 case "back":stop();state.frame=Math.max(0,state.frame-1);if(state.id==="q18"){state.n=state.frame>=1 && state.step<3?3:2;state.m=state.frame>=2?(state.step>=3?3:1):2;}paint();break;
 case "reset":reset();break;
 case "n-minus":stop();state.n=Math.max(0,state.n-1);paint();break;
 case "n-plus":stop();state.n=Math.min(5,state.n+1);paint();break;
 case "m-minus":stop();state.m=Math.max(0,state.m-1);paint();break;
 case "m-plus":stop();state.m=Math.min(4,state.m+1);paint();break;
 }
}
function init(){
 const root=document.getElementById("scene");
 if(!root)return;
 root.addEventListener("click",e=>{const b=e.target.closest?.("[data-viz]");if(b)act(b.dataset.viz);});
 window.addEventListener("pagehide",stop);
}
window.EXAM_REPAIR_VISUALS={render,mount,init,stop,devState:()=>({...state,timer:state.timer!==null})};
})();
