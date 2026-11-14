(function(){
"use strict";
var D=window.MATHLAB_DATA, root=document.getElementById("root");
if(!D||!root){return}
var KEY="visible-math:thinking-lab:2026-v1",store={attempts:[]};
try{var raw=JSON.parse(localStorage.getItem(KEY)||"null");if(raw&&Array.isArray(raw.attempts))store={attempts:raw.attempts.slice(-500)}}catch(e){}
var ui={step:0,choice:null,transfer:null,reason:"",skipped:false,slider:null,graphFocus:null,graphMode:"all",graphZoom:1,message:""};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function save(){try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){ui.message="当前浏览器未允许保存学习记录。"}}
function href(id){return "#/learn/"+encodeURIComponent(id)}
function get(id){return D.units.find(function(u){return u.id===id})}
function attempts(id){return store.attempts.filter(function(a){return a.id===id})}
function last(id){var a=attempts(id);return a.length?a[a.length-1]:null}
function next(u){var a=D.units.filter(function(t){return t.ch===u.ch}),i=a.findIndex(function(t){return t.id===u.id});return a[(i+1)%a.length]}
function chapter(ch){return D.chapters.find(function(c){return c.id===ch})}
function dateFmt(ts){return new Date(ts).toLocaleDateString("zh-CN",{month:"numeric",day:"numeric"})}
function daysUntil(ts){var d=Math.ceil((ts-Date.now())/86400000);return d<=0?"现在可以复查":d+"天后复查"}
function badge(u){var a=last(u.id);return a?(a.transferCorrect?"已尝试 · 待复查":"需要再验证"):"尚无学习证据"}
function nav(active){return '<nav class="top-nav" aria-label="学习区域"><a class="tab '+(active==="home"?"active":"")+'" href="#/home">总览</a><a class="tab '+(active==="learn"?"active":"")+'" href="#/learn/p1">动手实验</a><a class="tab '+(active==="graph"?"active":"")+'" href="#/graph">思维模型图谱</a><a class="tab '+(active==="review"?"active":"")+'" href="#/review">我的复盘</a></nav>'}
function hero(k,t,p){return '<section class="hero"><div class="eyebrow">'+esc(k)+'</div><h1>'+t+'</h1><p>'+esc(p)+'</p></section>'}
function counts(){var ids=new Set(store.attempts.map(function(a){return a.id}));return {done:ids.size,due:D.units.filter(function(u){var a=last(u.id);return a&&a.due<=Date.now()}).length,reflections:store.attempts.filter(function(a){return a.reason.length>=6}).length}}
function home(){var c=counts(),h=hero("THINK · TEST · REBUILD","别急着算。<em>先猜一猜。</em>","把小学的漏洞补上，再走进初一前三章。每一步让想法与证据碰撞。")+nav("home");
h+='<div class="stats"><div class="stat"><strong>'+D.units.length+'</strong><span>原创思维实验</span></div><div class="stat"><strong>'+c.done+'</strong><span>已有练习记录的实验</span></div><div class="stat"><strong>'+c.due+'</strong><span>待延迟复查</span></div></div>';
h+='<div class="node-list">';
D.chapters.forEach(function(ch){var u=D.units.filter(function(x){return x.ch===ch.id});h+='<a class="node-card" href="'+href(u[0].id)+'"><span class="tiny">'+esc(ch.sub)+'</span><h2 style="margin:6px 0">'+esc(ch.title)+'</h2><p>'+u.length+'个可操作实验 · 独立章节导航</p><strong>开始探索 →</strong></a>'});
h+='</div><section class="white-panel summary" style="margin:20px 0"><h2>真正的学习，在答题之前和之后。</h2><div class="reflection-grid"><div><strong>01 · 先预测</strong><span>把直觉变成明确的猜想，不能一看题就立刻计算。</span></div><div><strong>02 · 操作验证</strong><span>移动数字、改变变量，寻找可以重复观察的规律。</span></div><div><strong>03 · 自己解释</strong><span>用文字、图形或反例说清楚，哪里改变了想法。</span></div><div><strong>04 · 换题迁移</strong><span>再遇到变式，检验是否只记住了刚才的答案。</span></div></div><div class="action-row"><a class="btn" href="#/learn/p1">从小学基础开始</a><a class="btn alt" href="#/graph">探索数学思维地图</a></div></section>';
h+='<p class="notes">本版不替换旧版 Grok 动画和题库，原页面、旧深链继续有效。数据默认只保存在当前浏览器。</p>';
return h}
function chaptersNav(ch){return '<nav class="chapters" aria-label="按课本章节选择">'+D.chapters.map(function(c){var first=D.units.find(function(u){return u.ch===c.id});return '<a class="chapter-tab '+(ch===c.id?"active":"")+'" href="'+href(first.id)+'">'+esc(c.title)+'<small>'+D.units.filter(function(u){return u.ch===c.id}).length+'个实验</small></a>'}).join("")+'</nav>'}
function topicSidebar(ch,id){return '<aside class="sidebar white-panel" aria-label="当前章实验清单"><div class="sidebar-title">选择实验 · '+esc(chapter(ch).sub)+'</div>'+D.units.filter(function(u){return u.ch===ch}).map(function(u,i){var a=last(u.id);return '<a class="lesson '+(id===u.id?"active ":"")+(a?"done":"")+'" href="'+href(u.id)+'"><span class="lesson-index">'+(a?"✓":String(i+1).padStart(2,"0"))+'</span><span><strong>'+esc(u.title)+'</strong><small>'+esc(u.tag)+' · '+(a?"已留思维证据":"等待探索")+'</small></span></a>'}).join("")+'</aside>'}
function choices(opts,which,selected){return '<div class="options" role="group" aria-label="选择你自己的判断">'+opts.map(function(o,i){return '<button class="option '+(selected===i?"selected":"")+'" data-'+which+'="'+i+'" aria-pressed="'+(selected===i)+'">'+String.fromCharCode(65+i)+'. '+esc(o)+'</button>'}).join("")+'</div>'}
function cleanMessage(){return ui.message?'<p role="status" class="feedback warn">'+esc(ui.message)+'</p>':""}
function lab(u){var ch=chapter(u.ch),all=D.units.filter(function(x){return x.ch===u.ch}),idx=all.findIndex(function(x){return x.id===u.id});
var h=hero("EXPERIMENT · "+esc(u.tag),"把一道题，<em>变成实验。</em>",ch.title+" · "+ch.sub)+nav("learn")+chaptersNav(u.ch);
h+='<div class="layout">'+topicSidebar(u.ch,u.id)+'<article class="workbench"><div class="white-panel work-card"><div class="lab-header"><div class="pills"><span class="pill">'+esc(u.tag)+'</span><span class="pill gray">'+esc(badge(u))+'</span></div><h2>'+(idx+1).toString().padStart(2,"0")+'. '+esc(u.title)+'</h2><p class="subtitle">'+esc(u.hook)+'</p><div class="progress" aria-label="实验进度"><i style="width:'+((ui.step+1)*25)+'%"></i></div></div>';
if(ui.step===0){h+='<section class="stage"><div class="step-kicker">STEP 01 · 先提出猜想</div><h3>'+esc(u.q)+'</h3><p>先在心里说明理由。现在只记录你最初的判断，不立即揭晓答案。</p>'+choices(u.opts,"choice",ui.choice)+'<div class="action-row"><button class="btn" data-action="predict" '+(ui.choice===null?"disabled":"")+'>锁定我的猜想 →</button></div></section>'}
if(ui.step===1){h+='<section class="stage"><div class="step-kicker">STEP 02 · 动手改变条件</div><h3>把规则放到实验台上</h3><p>拖动控制杆，观察数量、位置或结构变化。别只看动画：要描述哪个量变了，哪个关系没变。</p>'+experiment(u)+'</section>';
h+='<div class="thinking-box"><label for="reason-input">用自己的话解释：为什么？</label><textarea id="reason-input" maxlength="600" placeholder="我原来认为……，操作后发现……，因为……">'+esc(ui.reason)+'</textarea><p class="notes">不用抄标准答案。可以提出不同想法；解释长度并不等于质量。</p><div class="action-row"><button class="btn" data-action="explain">提交解释，挑战变式 →</button><button class="btn alt" data-action="skip">我还解释不了</button></div>'+cleanMessage()+'</div>'}
if(ui.step===2){h+='<section class="stage"><div class="step-kicker">STEP 03 · 换题再检验</div><h3>'+esc(u.tq)+'</h3><p>不给原题提示。换一个条件，你的解释还站得住吗？</p>'+choices(u.topts,"transfer",ui.transfer)+'<div class="action-row"><button class="btn" data-action="finish" '+(ui.transfer===null?"disabled":"")+'>检验迁移结果 →</button></div></section>'}
if(ui.step===3){var result=last(u.id),correct=result&&result.transferCorrect;
h+='<section class="stage"><div class="step-kicker">STEP 04 · 形成学习证据</div><h3>'+(correct?"这次迁移答对了。下一步，看能否隔天也做到。":"这次迁移还没通过。错误是一条需要验证的线索。")+'</h3><div class="feedback '+(correct?"":"warn")+'"><strong>本题解释：</strong>'+esc(u.te)+'</div><p>首次猜想：'+(result&&result.predictionCorrect?"与答案一致":"与答案不同")+' · 解释：'+(result&&!result.skipped?"已记录":"暂未独立完成")+' · 迁移：'+(correct?"正确":"需继续核查")+'。</p><p>下次复查：'+(result?dateFmt(result.due):"待安排")+'。一次正确不等于已经掌握。</p><div class="action-row"><a class="btn" href="'+href(next(u).id)+'">进入下一个实验 →</a><a class="btn ghost" href="#/review">查看我的复盘</a><button class="btn ghost" data-action="retry">重新推演这题</button></div></section>'}
if(ui.step>=1){h+='<div class="inner"><h3>数学上为什么成立？</h3><p>'+esc(u.explain)+'</p><div class="reflection-grid"><div><strong>容易掉进去的坑</strong><span>'+esc(u.trap)+'</span></div><div><strong>牵涉的思维模型</strong><span>'+esc(D.models.find(function(m){return m.id===u.model}).name)+'</span></div></div></div>'}
h+='</div><div class="notes">本实验仅收集预测、解释、迁移等观察线索，不凭一道题给孩子贴能力标签。原版可视化动画仍可从页面右上角进入。</div></article></div>';
return h}
function svgWrap(s){return '<svg viewBox="0 0 600 210" role="img" aria-label="可随控制杆变化的数学图形"><defs><filter id="glow"><feGaussianBlur stdDeviation="2"/></filter></defs>'+s+'</svg>'}
function experiment(u){var v=u.visual;var lo=(v.min===undefined?-10:v.min),hi=(v.max===undefined?10:v.max);var min=v.kind==="fraction"?0:v.kind==="grid"?1:v.kind==="ratio"?1:v.kind==="power"?1:v.kind==="line"?lo:v.kind==="bars"?0:v.kind==="precedence"?-6:-6;var max=v.kind==="fraction"?v.b:v.kind==="grid"?Math.max(6,v.b):v.kind==="ratio"?6:v.kind==="power"?6:v.kind==="line"?hi:v.kind==="bars"?Math.ceil(Math.max(Math.abs(v.a),Math.abs(v.b))*1.5):v.kind==="precedence"?6:8;var val=ui.slider===null?(v.kind==="line"?v.b:v.kind==="fraction"?v.a:v.kind==="grid"?v.b:v.kind==="ratio"?1:v.kind==="power"?v.b:v.kind==="bars"?v.b:v.kind==="precedence"?v.c:2):ui.slider;
val=Math.max(min,Math.min(max,val));
var step=(v.kind==="line"&&hi-lo<=1)?0.01:1;
var description="";
if(v.kind==="line")description="移动蓝色点，观察位置与距离。";
else if(v.kind==="fraction")description="改动第一条分数条已涂色的份数。";
else if(v.kind==="grid")description="改变每组数量，观察整个矩阵如何改变。";
else if(v.kind==="ratio")description="同时扩大同一配比，比较两类数量。";
else if(v.kind==="power")description="改变相同因数出现的次数。";
else if(v.kind==="machine")description="改变输入，观察表达式输出。";
else if(v.kind==="precedence")description="改变最后一个因数，比较两种括号结构。";
else description="改变对照数量，比较大小与比值。";
return '<div class="experiment" id="experiment-canvas">'+drawVisual(u,val)+'</div><div class="exp-controls"><label for="exp-slider">'+description+'</label><input type="range" id="exp-slider" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'"><output class="exp-value" id="exp-output">'+val+'</output></div><p class="notes" style="color:#a4bfd2">图形是概念探索工具，不自动证明所有数学规则。结合文字解释与反例检验。</p>'}
function drawVisual(u,val){var v=u.visual,parts="",i,j;
function label(x,y,t,size,color){return '<text x="'+x+'" y="'+y+'" font-size="'+(size||16)+'" fill="'+(color||"#dcecfb")+'" text-anchor="middle" font-weight="700">'+esc(t)+'</text>'}
if(v.kind==="line"){
var lo=(v.min===undefined?-10:v.min),hi=(v.max===undefined?10:v.max),x=function(z){return 40+520*(z-lo)/(hi-lo)},zero=Math.max(lo,Math.min(hi,0));parts+='<line x1="40" y1="117" x2="560" y2="117" stroke="#7895ae" stroke-width="3"/><line x1="'+x(zero)+'" y1="45" x2="'+x(zero)+'" y2="166" stroke="#58d8ab" stroke-dasharray="4 5" opacity=".55"/>';
var n=hi-lo<=1?5:Math.min(21,Math.floor(hi-lo)+1);
for(i=0;i<n;i++){var t=lo+(hi-lo)*i/(n-1);parts+='<line x1="'+x(t)+'" x2="'+x(t)+'" y1="110" y2="123" stroke="#7895ae"/>';parts+=label(x(t),144,Number(t.toFixed(2)),10,"#9db2c5")}
var xa=x(v.a),xb=x(val);parts+='<line x1="'+xa+'" x2="'+xb+'" y1="90" y2="90" stroke="#f6b872" stroke-width="4"/><circle cx="'+xa+'" cy="90" r="9" fill="#ff8758"/><circle cx="'+xb+'" cy="90" r="10" fill="#83baff"/>'+label(xa,66,v.a,15,"#ffad79")+label(xb,66,Number(val.toFixed(2)),15,"#a6d4ff")+label(300,190,"两点距离 "+Number(Math.abs(v.a-val).toFixed(2))+" 单位",15);
}
else if(v.kind==="fraction"){
function fracBar(y,n,d,color){var w=480/d,s='<rect x="60" y="'+y+'" width="480" height="52" rx="8" fill="#324b62"/>';for(var k=0;k<d;k++){s+='<rect x="'+(60+k*w+2)+'" y="'+(y+2)+'" width="'+Math.max(0,w-4)+'" height="48" rx="5" fill="'+(k<n?color:"#263b50")+'"/>'}return s}
parts+=fracBar(35,val,v.b,"#7dc5ff")+fracBar(116,v.c,v.d,"#ffae79")+label(300,24,val+"/"+v.b+"  VS  "+v.c+"/"+v.d,16)+label(300,198,"同样大小的整体，分割方式不同",12,"#b3cadd");
}
else if(v.kind==="grid"){
var count=Math.min(10,Math.round(val)),rows=Math.min(8,Math.max(1,Math.round(v.a))),w=Math.min(42,420/count),hh=Math.min(27,150/rows),start=300-count*w/2;
for(i=0;i<rows;i++)for(j=0;j<count;j++)parts+='<rect x="'+(start+j*w+2)+'" y="'+(23+i*hh)+'" width="'+(w-4)+'" height="'+(hh-3)+'" rx="4" fill="'+((i+j)%2?"#77b9ef":"#ffad75")+'"/>';
parts+=label(300,195,rows+" 组 × "+count+" 个 = "+(rows*count)+" 个",16);
}
else if(v.kind==="ratio"){
var water=Math.round(v.a*val),juice=Math.round(v.b*val);
for(i=0;i<Math.min(water,12);i++)parts+='<rect x="'+(45+i*43)+'" y="46" width="30" height="45" rx="6" fill="#78b9ff"/>';
for(i=0;i<Math.min(juice,12);i++)parts+='<rect x="'+(45+i*43)+'" y="118" width="30" height="45" rx="6" fill="#ffc078"/>';
parts+=label(440,109,water+" : "+juice,23)+label(170,33,"水",13)+label(170,193,"果汁",13);
}
else if(v.kind==="power"){
var exp=Math.max(1,Math.round(val)),n=v.a;
for(i=0;i<exp;i++){parts+='<rect x="'+(45+i*84)+'" y="55" width="66" height="66" rx="12" fill="'+(i%2?"#ff9f72":"#80b9e8")+'"/>'+label(78+i*84,97,n,24,"#1a2c40");if(i<exp-1)parts+=label(118+i*84,98,"×",18)}
parts+=label(300,172,n+" 连乘 "+exp+" 次 = "+Math.pow(n,exp),17);
}
else if(v.kind==="precedence"){
var ans1=v.a+v.b*val,ans2=(v.a+v.b)*val;
parts+=label(300,35,"相同的数字，不同的运算结构",17);
parts+='<rect x="45" y="60" width="245" height="100" rx="14" fill="#294763"/><rect x="310" y="60" width="245" height="100" rx="14" fill="#42516b"/>';
parts+=label(168,97,v.a+" + "+v.b+" × ("+val+")",18)+label(168,136,"= "+ans1,24,"#78d9bb");
parts+=label(432,97,"("+v.a+" + "+v.b+") × ("+val+")",18)+label(432,136,"= "+ans2,24,"#ffad79");
}
else if(v.kind==="machine"){
var a=v.a,b=v.b,out=a*val+b;
parts+='<rect x="30" y="58" width="128" height="90" rx="15" fill="#376078"/><rect x="215" y="58" width="162" height="90" rx="15" fill="#ed966b"/><rect x="444" y="58" width="128" height="90" rx="15" fill="#4b9f8e"/>';
parts+=label(94,91,"输入",13)+label(94,123,val,28)+label(295,92,"×"+a+"，再加 "+b,16,"#21364c")+label(295,122,"运算机器",12,"#243d51")+label(509,92,"输出",13)+label(509,125,out,28);
parts+='<path d="M160 103 L210 103 M380 103 L436 103" stroke="#a5bbca" stroke-width="4"/><path d="M199 95 l10 8 -10 8 M424 95 l10 8 -10 8" fill="none" stroke="#a5bbca" stroke-width="3"/>';
}
else{
var a=Number(v.a),b=Number(v.b),values=[a,Number(val)],max=Math.max(1,Math.abs(a),Math.abs(val));parts+=label(300,25,"保持统一的数量单位，再比较",15);
values.forEach(function(n,i){var hh=115*Math.abs(n)/max;parts+='<rect x="'+(145+i*190)+'" y="'+(160-hh)+'" width="110" height="'+hh+'" rx="8" fill="'+(i?"#ffae77":"#79b9f0")+'"/>'+label(200+i*190,183,n,19)});
}
return svgWrap(parts)}
function review(){var c=counts(),h=hero("REPLAY · REFLECT","错误不是终点。<em>它是线索。</em>","保留你曾经的猜想、独立解释和迁移表现。隔天再试一次，寻找真正稳定的理解。")+nav("review");
h+='<div class="stats"><div class="stat"><strong>'+store.attempts.length+'</strong><span>实验完成记录</span></div><div class="stat"><strong>'+c.reflections+'</strong><span>有自主解释的记录</span></div><div class="stat"><strong>'+c.due+'</strong><span>现在需要复查的实验</span></div></div>';
h+='<section class="white-panel summary" style="margin-bottom:18px"><h2>你的延迟复查清单</h2><p>做过的题并不自动算作掌握。首次记录后隔天复查；后续通过则将复查间隔延长。</p>';
var tried=D.units.filter(function(u){return !!last(u.id)}).sort(function(a,b){return last(a.id).due-last(b.id).due});
if(!tried.length)h+='<div class="empty">这里还没有学习记录。先完成一个完整实验，复盘才有真实依据。</div>';
else tried.forEach(function(u){var x=last(u.id);h+='<div class="review-item"><div><strong>'+esc(u.title)+'</strong><small>'+esc(chapter(u.ch).title)+' · '+daysUntil(x.due)+' · '+(x.transferCorrect?"迁移答对":"迁移未通过")+'</small></div><a class="btn alt" href="'+href(u.id)+'">再次验证</a></div>'});
h+='</section><section class="white-panel summary"><h2>你的思维日志</h2><p>以下内容仅存在这台设备的浏览器里，你可以复读自己的解释，查找当时忽略的地方。</p>';
var log=store.attempts.slice().reverse().slice(0,35);if(!log.length)h+='<div class="empty">尚无文字复盘记录。</div>';
log.forEach(function(a){var u=get(a.id);h+='<div class="journal"><strong>'+esc(u?u.title:a.id)+' · '+dateFmt(a.at)+' · '+(a.transferCorrect?"迁移正确":"迁移待校验")+'</strong><p>'+esc(a.reason||"本次没有独立完成解释。")+'</p><a class="mini-line" href="'+href(a.id)+'">重新探索 →</a></div>'});
h+='</section><p class="notes">这是学习过程证据，不是心理测量结果；不据此对智商或学习能力下结论。</p>';return h}
function graph(){var h=hero("HOW MATHEMATICS CONNECTS","看见的不是目录。<em>是思维。</em>","把先修关系、易错迁移、思维模型三层叠在一起。点一个节点，找出它的原理、前因与挑战。")+nav("graph");
h+='<section class="white-panel summary"><h2>数学思维模型图谱</h2><p>蓝线：知识先修关系；橙线：易错迁移；绿线：共用思维模型。连线是教学设计假设，不是假装有学生数据验证的因果关系。</p><div class="graph-area"><div class="graph-toolbar"><span>关系：</span><button data-graph-mode="all" aria-pressed="'+(ui.graphMode==="all")+'">全部</button><button data-graph-mode="prerequisite" aria-pressed="'+(ui.graphMode==="prerequisite")+'">先修</button><button data-graph-mode="misconception" aria-pressed="'+(ui.graphMode==="misconception")+'">易错传递</button><button data-graph-mode="model" aria-pressed="'+(ui.graphMode==="model")+'">思维模型</button><button data-action="zoomout">−</button><button data-action="zoomin">＋</button><div class="graph-legend"><span><i style="background:#77b7ff"></i>先修</span><span><i style="background:#ffad79"></i>易错</span><span><i style="background:#75d9aa"></i>思维</span></div></div><div class="graph-viewport"><svg class="graph-svg" style="width:'+(1320*ui.graphZoom)+'px;height:'+(650*ui.graphZoom)+'px" viewBox="0 0 1320 650" role="img" aria-label="四列学习主题与右侧思维模型组成的可点击网络">'+graphSVG()+'</svg></div></div>';
var unit=get(ui.graphFocus)||D.units[0],model=D.models.find(function(m){return m.id===unit.model});
h+='<div class="graph-panel"><div class="pills"><span class="pill">'+esc(chapter(unit.ch).title)+'</span><span class="pill gray">'+esc(model.name)+'</span></div><h3>'+esc(unit.title)+'</h3><p><strong>思维挑战：</strong>'+esc(unit.hook)+'</p><p><strong>容易误解：</strong>'+esc(unit.trap)+'</p><p><strong>先修基础：</strong>'+(unit.parents.length?unit.parents.map(function(id){var a=get(id);return '<a href="'+href(id)+'"><u>'+esc(a.title)+'</u></a>'}).join("、"):"本图起点")+'</p><p><strong>跨主题的思考：</strong>'+esc(model.test)+'</p><div class="action-row"><a class="btn" href="'+href(unit.id)+'">进入这个实验 →</a></div></div></section>';
h+='<section class="white-panel summary" style="margin:18px 0"><h2>七类可迁移的数学思维</h2>'+D.models.map(function(m){return '<div class="model-row"><span class="model-icon">'+esc(m.icon)+'</span><div><strong>'+esc(m.name)+'</strong><p>'+esc(m.what)+' '+esc(m.test)+'</p></div></div>'}).join("")+'</section>';
return h}
function graphSVG(){var pos={},parts="",cols={p:70,"1":320,"2":570,"3":820};D.chapters.forEach(function(ch){var us=D.units.filter(function(u){return u.ch===ch.id});parts+='<text x="'+(cols[ch.id]+83)+'" y="24" text-anchor="middle" fill="'+ch.color+'" font-size="15" font-weight="900">'+esc(ch.title)+'</text>';us.forEach(function(u,i){pos[u.id]={x:cols[ch.id],y:40+i*65}})});
var mp={};D.models.forEach(function(m,i){mp[m.id]={x:1090,y:45+i*83}});
var focus=ui.graphFocus,visible=function(type){return ui.graphMode==="all"||ui.graphMode===type};
function edge(a,b,color,type){if(!a||!b||!visible(type))return "";var x1=a.x+165,y1=a.y+18,x2=b.x,y2=b.y+18;if(type==="model"){x1=a.x+165;x2=b.x}
return '<path d="M'+x1+' '+y1+' C'+(x1+55)+' '+y1+','+(x2-55)+' '+y2+','+x2+' '+y2+'" stroke="'+color+'" fill="none" stroke-width="'+(focus?1.5:1.9)+'" opacity="'+(focus?".4":".45")+'"/>'}
D.edges.forEach(function(e){parts+=edge(pos[e.from],pos[e.to],"#77b7ff","prerequisite")});
var wrong=[["c11","c22"],["c14","c26"],["p3","c25"],["p7","c31"],["p8","c33"],["c15","c24"],["c21","c23"],["c27","c34"],["c31","c35"]];
wrong.forEach(function(e){parts+=edge(pos[e[0]],pos[e[1]],"#ffad79","misconception")});
D.units.forEach(function(u){parts+=edge(pos[u.id],mp[u.model],"#75d9aa","model")});
D.units.forEach(function(u){var p=pos[u.id],active=(focus===u.id),color=chapter(u.ch).color;parts+='<g class="graph-node '+(active?"active":"")+'" data-graph-unit="'+u.id+'" tabindex="0" role="button" aria-label="查看'+esc(u.title)+'"><rect x="'+p.x+'" y="'+p.y+'" width="165" height="38" rx="10" fill="'+(active?"#415775":"#243950")+'" stroke="'+color+'" stroke-opacity=".65"/><text x="'+(p.x+82)+'" y="'+(p.y+24)+'" fill="#e9f1fb" text-anchor="middle" font-size="12" font-weight="700">'+esc(u.title.length>11?u.title.slice(0,10)+"…":u.title)+'</text></g>'});
parts+='<text x="1170" y="24" fill="#75d9aa" text-anchor="middle" font-size="15" font-weight="900">思维模型</text>';
D.models.forEach(function(m){var p=mp[m.id];parts+='<g><rect x="'+p.x+'" y="'+p.y+'" width="175" height="43" rx="12" fill="#254c4c" stroke="#66bf9e"/><text x="'+(p.x+86)+'" y="'+(p.y+27)+'" fill="#d9fbe8" font-size="13" font-weight="850" text-anchor="middle">'+esc(m.name)+'</text></g>'});
return parts}
function record(u){var prior=attempts(u.id),answerCorrect=ui.transfer===u.tc,predictionCorrect=ui.choice===u.correct;var successfulPrior=prior.filter(function(a){return a.transferCorrect&&!a.skipped}).length;
var days=answerCorrect&&!ui.skipped?(successfulPrior===0?1:successfulPrior===1?7:14):1;
store.attempts.push({id:u.id,at:Date.now(),prediction:ui.choice,predictionCorrect:predictionCorrect,transfer:ui.transfer,transferCorrect:answerCorrect,reason:ui.reason.trim().slice(0,600),skipped:ui.skipped,due:Date.now()+days*86400000});
store.attempts=store.attempts.slice(-500);save()}
function reset(){ui.step=0;ui.choice=null;ui.transfer=null;ui.reason="";ui.skipped=false;ui.slider=null;ui.message=""}
function route(){var path=(location.hash||"#/home").replace(/^#\/?/,"").split("/");if(path[0]==="learn"){var u=get(decodeURIComponent(path[1]||"p1"));return {view:"learn",unit:u||D.units[0]}}if(path[0]==="graph")return {view:"graph"};if(path[0]==="review")return {view:"review"};return {view:"home"}}
function render(){var r=route(),html=r.view==="home"?home():r.view==="learn"?lab(r.unit):r.view==="graph"?graph():review();root.innerHTML=html}
root.addEventListener("click",function(e){var o=e.target.closest("button, [data-graph-unit]");if(!o)return;
var r=route(),u=r.unit;
if(o.dataset.choice!==undefined){ui.choice=Number(o.dataset.choice);ui.message="";render();return}
if(o.dataset.transfer!==undefined){ui.transfer=Number(o.dataset.transfer);render();return}
if(o.dataset.graphUnit){ui.graphFocus=o.dataset.graphUnit;render();return}
if(o.dataset.graphMode){ui.graphMode=o.dataset.graphMode;render();return}
var a=o.dataset.action;if(!a)return;
if(a==="predict"&&u&&ui.choice!==null){ui.step=1;ui.slider=null;render();return}
if(a==="explain"&&u){var x=document.getElementById("reason-input");ui.reason=(x&&x.value||"").trim();if(ui.reason.length<6){ui.message="请至少写出一句自己的观察。如果暂时解释不了，请点击旁边按钮。";render();return}ui.skipped=false;ui.step=2;ui.message="";render();return}
if(a==="skip"&&u){ui.reason="";ui.skipped=true;ui.step=2;ui.message="";render();return}
if(a==="finish"&&u&&ui.transfer!==null){record(u);ui.step=3;render();return}
if(a==="retry"&&u){reset();render();return}
if(a==="zoomin"){ui.graphZoom=Math.min(1.65,Math.round((ui.graphZoom+.15)*100)/100);render();return}
if(a==="zoomout"){ui.graphZoom=Math.max(.75,Math.round((ui.graphZoom-.15)*100)/100);render();return}
});
root.addEventListener("input",function(e){if(e.target.id==="reason-input"){ui.reason=e.target.value;return}if(e.target.id==="exp-slider"){var r=route();if(r.view!=="learn")return;ui.slider=Number(e.target.value);var canvas=document.getElementById("experiment-canvas"),output=document.getElementById("exp-output");if(canvas)canvas.innerHTML=drawVisual(r.unit,ui.slider);if(output)output.textContent=String(ui.slider)}});
root.addEventListener("keydown",function(e){var g=e.target.closest("[data-graph-unit]");if(g&&(e.key==="Enter"||e.key===" ")){e.preventDefault();ui.graphFocus=g.dataset.graphUnit;render()}});
window.addEventListener("hashchange",function(){reset();render();window.scrollTo(0,0)});
var bad=D.units.filter(function(u){return u.opts.length<3||u.topts.length<3||u.correct<0||u.correct>=u.opts.length||u.tc<0||u.tc>=u.topts.length||!D.models.some(function(m){return m.id===u.model})||u.parents.some(function(p){return !get(p)})});
if(bad.length){console.warn("数学实验数据需要修复:",bad.map(function(x){return x.id}))}
render();
})();