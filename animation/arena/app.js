(function arenaApp(){
 "use strict";
 const D=window.MATH_ARENA,V=window.ARENA_VISUALS,ALL=D.lessons,T=D.tracks;
 const byId=new Map(ALL.map(x=>[x.id,x])),root=document.getElementById("arena-app"),KEY="math-arena-original-v1";
 const E=s=>String(s==null?"":s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
 let memory={drafts:{},records:{},last:""},current=null,drag=null,playing=null;
 try{const val=JSON.parse(localStorage.getItem(KEY)||"{}");if(val&&typeof val==="object")memory={drafts:val.drafts||{},records:val.records||{},last:val.last||""};}catch(e){}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(memory));}catch(e){}};
 const stop=()=>{if(playing!==null){clearInterval(playing);playing=null;}};
 function draft(m){
  if(!memory.drafts[m.id])memory.drafts[m.id]={stage:"predict",value:m.cfg.v,mode:0,pred:null,read:null,readMisses:0,transfer:null,expert:false,changed:false,reflection:"",note:"",parent:false,parentChallenge:""};
  return memory.drafts[m.id];
 }
 const tr=id=>T.find(x=>x.id===id);
 const go=(path)=>"#/"+path;
 const playUrl=id=>go("play/"+id);
 function page(s){root.innerHTML=s;}

 function home(){
  const chapterInfo={
   c1:{
    name:"数轴冒险",prompt:"负号到底是什么意思？去数轴上找答案！",
    topics:["正数与负数","数轴","比较大小"],
    art:'<svg viewBox="0 0 300 132" class="arena-chapter-art" role="img" aria-label="数轴上的负数、零和正数"><path d="M24 70 H277" stroke="#476a92" stroke-width="3" stroke-linecap="round"/><path d="M270 64 L280 70 L270 76" fill="none" stroke="#476a92" stroke-width="3"/><g stroke="#6987aa" stroke-width="2"><path d="M30 59 V81 M60 59 V81 M90 59 V81 M120 59 V81 M150 59 V81 M180 59 V81 M210 59 V81 M240 59 V81 M270 59 V81"/></g><text x="60" y="110" class="arena-art-text">−3</text><text x="150" y="110" class="arena-art-text">0</text><text x="240" y="110" class="arena-art-text">+3</text><path d="M60 52 Q150 -5 240 52" class="arena-arc" fill="none" stroke="#e99154" stroke-width="4" stroke-dasharray="6 7"/><circle cx="60" cy="70" r="12" fill="#e99154" class="arena-float-dot"/><circle cx="150" cy="70" r="7" fill="#4e9bb2"/><circle cx="240" cy="70" r="12" fill="#4bbba1"/></svg>'
   },
   c2:{
    name:"运算高手训练营",prompt:"加减乘除和乘方，换个方法就能看懂！",
    topics:["正负数运算","乘除规律","乘方"],
    art:'<svg viewBox="0 0 300 132" class="arena-chapter-art" role="img" aria-label="3加负5，三对正负筹码抵消后剩负2"><text x="18" y="24" class="arena-art-formula">3 + (−5)</text><g class="arena-op-positive"><circle cx="44" cy="61" r="15"/><circle cx="86" cy="61" r="15"/><circle cx="128" cy="61" r="15"/><text x="44" y="67">+</text><text x="86" y="67">+</text><text x="128" y="67">+</text></g><g class="arena-op-negative"><circle cx="44" cy="105" r="15"/><circle cx="86" cy="105" r="15"/><circle cx="128" cy="105" r="15"/><circle cx="170" cy="105" r="15"/><circle cx="212" cy="105" r="15"/><text x="44" y="111">−</text><text x="86" y="111">−</text><text x="128" y="111">−</text><text x="170" y="111">−</text><text x="212" y="111">−</text></g><g stroke="#a9b8bb" stroke-width="2" stroke-dasharray="4 4"><path d="M44 77 V88 M86 77 V88 M128 77 V88"/></g><text x="265" y="105" class="arena-art-result">−2</text></svg>'
   },
   c3:{
    name:"字母魔法实验室",prompt:"让 a 动起来，看公式怎样藏着一个规律。",
    topics:["字母表示数","列代数式","代入求值"],
    art:'<svg viewBox="0 0 300 132" class="arena-chapter-art" role="img" aria-label="正方形边长a，周长4a，面积为a的平方"><rect x="22" y="28" width="85" height="85" rx="7" fill="#cbb0f2" stroke="#835ab8" stroke-width="3" class="arena-algebra-shape"/><g stroke="#9f81ce" stroke-width="1"><path d="M50 28 V113 M78 28 V113 M22 56 H107 M22 85 H107"/></g><text x="65" y="75" class="arena-art-square">a²</text><text x="65" y="21" class="arena-art-small">a</text><text x="138" y="64" class="arena-art-algebra">周长 = 4a</text><text x="138" y="100" class="arena-art-algebra">面积 = a²</text></svg>'
   },
   c4:{
    name:"代数砖实验室",prompt:"同类才能合并，负号会让整个括号翻转！",
    topics:["单项式","同类项","去括号","化简"],
    art:'<svg viewBox="0 0 300 132" class="arena-chapter-art" role="img" aria-label="两个平方块与一个长条代表不同代数项"><rect x="30" y="19" width="72" height="72" rx="9" fill="#84d7bb" stroke="#328d76" stroke-width="3"/><text x="66" y="61" font-size="22" font-weight="900" text-anchor="middle" fill="#255c50">x²</text><rect x="119" y="19" width="72" height="72" rx="9" fill="#7bafe1" stroke="#4780b5" stroke-width="3"/><text x="155" y="61" font-size="22" font-weight="900" text-anchor="middle" fill="#264d7d">x²</text><rect x="214" y="24" width="32" height="64" rx="8" fill="#f1b784" stroke="#cf874c" stroke-width="3"/><text x="230" y="63" font-size="18" font-weight="900" text-anchor="middle" fill="#8e552d">x</text><text x="72" y="115" font-size="15" text-anchor="middle" fill="#4a8271">同类</text><text x="231" y="115" font-size="15" text-anchor="middle" fill="#aa7045">不同类</text></svg>'
   }
  };
  const chapterCard=t=>{
   const info=chapterInfo[t.id],lessons=ALL.filter(m=>m.track===t.id);
   const completed=lessons.filter(m=>memory.records[m.id]).length;
   const chips=info.topics.map(item=>'<span>'+E(item)+'</span>').join("");
   return '<a href="#/track/'+t.id+'" class="arena-chapter-card arena-chapter-'+t.id+'" aria-label="'+E(t.label)+'，'+E(info.name)+'，进入这一章">'+
    '<div class="arena-chapter-top"><span class="arena-chapter-index">'+E(t.label)+'</span><span class="arena-chapter-total">'+lessons.length+' 个实验</span></div>'+
    '<div class="arena-chapter-visual">'+info.art+'</div>'+
    '<div class="arena-chapter-content"><h3>'+E(info.name)+'</h3><p>'+E(info.prompt)+'</p><div class="arena-chapter-chips">'+chips+'</div></div>'+
    '<div class="arena-chapter-bottom"><span>'+(completed?'已探索 '+completed+' 场，可随时重试':'从好奇心开始')+'</span><strong>进入挑战 <i aria-hidden="true">→</i></strong></div></a>';
  };
  const resume=byId.has(memory.last)?memory.last:null;
  const bridgeCount=ALL.filter(m=>m.track==="bridge").length;
  page('<div class="arena-home arena-kid-home">'+
    '<header class="arena-kid-intro"><div class="arena-kid-eyebrow">✦ 我的数学挑战场</div><h1>今天，你想<span>挑战哪一章？</span></h1><p>不用抢快，也不用怕错。自己选一张卡片，试试看能发现什么新招！</p><div class="arena-kid-steps" aria-label="挑战玩法"><span>先想一想</span><i>→</i><span>动手试试</span><i>→</i><span>换题再战</span><i>→</i><span>说说发现</span></div></header>'+
    '<section class="arena-kid-chapters" aria-label="四张章节卡片"><div class="arena-kid-chapter-title"><h2>选一张，开始玩</h2><span>四张卡片，四种新本领</span></div><div class="arena-chapter-grid">'+T.filter(t=>t.id!=="bridge").map(chapterCard).join("")+'</div></section>'+
    '<section class="arena-bridge-strip" aria-label="小学数学基础训练"><div class="arena-bridge-icon" aria-hidden="true">🧩</div><div class="arena-bridge-copy"><span>小学数学 · 基础训练区</span><h2>有些数学招式还不熟？来这里练练！</h2><p>审题、分数、空间拼搭、逆向思考 · '+bridgeCount+' 个基础实验</p></div><a href="#/track/bridge" class="arena-bridge-link">去练基础 <span aria-hidden="true">→</span></a></section>'+
    '<div class="arena-kid-footer"><p>🌱 每次认真研究一个问题就有收获。做错不扣分，累了就休息。</p><div>'+(resume?'<a href="'+playUrl(resume)+'">继续上次挑战 ↗</a>':'')+'<a href="#/journal">看看我的发现 ↗</a></div></div>'+
    '<details class="arena-parent-guide"><summary>给爸爸看的陪练小提示</summary><p>先听孩子讲自己的猜测。可以问：“你刚才是怎么想的？”“换个办法试试？”不要责骂，不用奖励连胜，也不要拿打球时间交换数学练习。</p></details>'+
   '</div>');
 }
 function trackPage(id){
  const t=tr(id),ls=ALL.filter(x=>x.track===id),groups=[...new Set(ls.map(x=>x.sec))];
  page(`<div class="arena-track-page"><a class="arena-back" href="#/">← 回到数学训练场</a><header class="arena-topic-header arena-${t.id}"><span>自己选择要挑战的课题</span><h1>${E(t.label)}</h1><p>${E(t.sub)}</p></header><p class="arena-trust">可以跳着学，也可以做过后回来重试。这里不是按顺序通关的题海。</p>${groups.map((g,i)=>`<section class="arena-module"><h2><small>0${i+1}</small>${E(g)}</h2><div class="arena-module-list">${ls.filter(m=>m.sec===g).map(m=>`<a class="arena-module-lesson" href="${playUrl(m.id)}"><span class="arena-module-mark">${m.scene==="line"?"↔":m.scene==="fractions"?"½":m.scene==="powers"?"²":"✳"}</span><span><strong>${E(m.title)}</strong><small>${E(m.goal)}</small></span><em>${memory.records[m.id]?"已复盘":memory.drafts[m.id]?"可继续":"去试试"} ↗</em></a>`).join("")}</div></section>`).join("")}${id==="c4"?'<div class="arena-track-legacy"><span>还想做分层练习？旧版第四章有6节互动课和180道专项题。</span><a href="../chapter-4.html">去旧版完整练习 ↗</a></div>':""}</div>`);
 }
 function choices(q,selected,action){
  return `<div class="arena-choices">${q.opts.map((v,i)=>`<button type="button" data-act="${action}" data-index="${i}" class="arena-choice ${selected===i?"selected":""}" aria-pressed="${selected===i}"><span>${"ABC"[i]}</span><b>${E(v)}</b><i>${selected===i?"✓":""}</i></button>`).join("")}</div>`;
 }
 function hint(q,value,transfer){
  if(value===null)return "";
  const correct=value===q.answer;
  return `<div class="arena-result ${correct?"arena-result-yes":"arena-result-again"}"><strong>${correct?"这次判断与结果一致。":"有一个值得重新研究的地方。"}</strong><p>${transfer?E(q.reason):"不急着背答案，先去实验里验证你的猜测。"} </p></div>`;
 }
 function lesson(m){
  const s=draft(m),stages=[["predict","先出手"],["experiment","动手实验"],["transfer","换招再战"],["reflect","自己复盘"]];
  const header=`<a class="arena-back" href="#/track/${m.track}">← ${E(tr(m.track).label)}</a><header class="arena-lesson-heading"><span class="arena-kicker">${E(m.sec)}</span><h1>${E(m.title)}</h1><p>${E(m.goal)}</p></header><nav class="arena-step-nav" aria-label="挑战环节">${stages.map(([id,name],i)=>`<button data-act="stage" data-stage="${id}" class="${s.stage===id?"active":""}"><small>0${i+1}</small><b>${name}</b></button>`).join("")}</nav>`;
  let body="";
  if(s.stage==="predict"){
   const understood=!m.read||s.read===m.read.answer;
   const reading=m.read?`<div class="arena-reading-gate"><h3>先确认：这一题究竟要求什么？</h3><div class="arena-read-options">${m.read.opts.map((x,i)=>`<button type="button" data-act="read" data-index="${i}" class="${s.read===i?"selected":""}">${E(x)}</button>`).join("")}</div>${s.read!==null&&s.read!==undefined?(understood?'<p class="arena-read-ok">✓ 已找到问题目标，再选择你的办法。</p>':'<p class="arena-read-retry">再看看题目的最后一句，找真正要求的量。</p>'):""}</div>`:"";
   body=`<section class="arena-paper"><span class="arena-section-kicker">第01步 · 先自己判断</span><h2>${E(m.q.text)}</h2><p>读清楚问题再选。不要追求快，第一次答错也没有关系。</p>${reading}${understood?choices(m.q,s.pred,"pred")+hint(m.q,s.pred,false):""}<div class="arena-footer-actions"><button class="arena-next" data-act="stage" data-stage="experiment">亲自验证 →</button></div></section>`;
  }
  else if(s.stage==="experiment")body=`<section class="arena-experiment"><div class="arena-stage-head"><span class="arena-section-kicker">第02步 · 你来操纵数学对象</span><h2>${E(m.action)}</h2></div><div class="arena-blackboard">${V.render(m,s)}</div><div class="arena-controls"><label for="arena-range">改变一个条件 <strong id="arena-value">${E(s.value)}</strong></label><input id="arena-range" type="range" min="${m.cfg.min}" max="${m.cfg.max}" step="1" value="${s.value}"><div class="arena-controls-row"><button data-act="adjust" data-n="-1">− 减少</button><button data-act="adjust" data-n="1">＋ 增加</button><button data-act="flip">↔ 换种看法</button><button data-act="play">▶ 演示变化</button></div>${m.id==="b05"?`<button class="arena-spatial-toggle" data-act="spatial">${s.spatial?"← 回到平面网格":"▧ 看看同样底面如何叠成立体积木"}</button>`:""}<p>${m.track==="c4"?"点黑板中的代数卡片来发现变化。手机上可以左右滑动查看图形，改变数值请用上方滑杆。":"也可以直接在黑板图上左右拖动。试试不同的条件，再总结变化。"}</p></div><div class="arena-expert"><div class="arena-expert-head"><div><strong>观察高手的思路</strong><small>想自己研究就先不打开，没有惩罚。</small></div><button data-act="expert">${s.expert?"收起":"看另一种方法"}</button></div>${s.expert?`<div class="arena-expert-body"><p>${E(m.goal)}</p><p>${E(m.q.reason)}</p><b>${E(m.coach)}</b></div>`:""}</div><div class="arena-footer-actions"><button class="arena-secondary" data-act="stage" data-stage="predict">重新判断</button><button class="arena-next" data-act="stage" data-stage="transfer">换道题试试 →</button></div></section>`;
  else if(s.stage==="transfer")body=`<section class="arena-paper"><span class="arena-section-kicker">第03步 · 换了数字，还能看见同一结构吗</span><h2>${E(m.transfer.text)}</h2><p>先独立试，再去实验室重新观察。</p>${choices(m.transfer,s.transfer,"transfer")}${hint(m.transfer,s.transfer,true)}<div class="arena-footer-actions"><button class="arena-secondary" data-act="stage" data-stage="experiment">回去验证</button><button class="arena-next" data-act="stage" data-stage="reflect">复盘这次发现 →</button></div></section>`;
  else body=`<section class="arena-paper arena-reflection"><span class="arena-section-kicker">第04步 · 记住发现，不是记住分数</span><h2>刚才你学到了什么？</h2><p>真实地记录自己现在的状态，不要求全部答对。</p><div class="arena-reflection-options">${[["understood","我想明白一个原理"],["retry","我还想换种方法"],["uncertain","还没完全弄明白"]].map(([k,v])=>`<button data-act="reflect" data-value="${k}" class="${s.reflection===k?"selected":""}">${v}</button>`).join("")}</div><label for="arena-reflection-text">我自己的话（可选）</label><textarea id="arena-reflection-text" maxlength="240" placeholder="例如：我发现减号和负号不是同一种工作。">${E(s.note||"")}</textarea><div class="arena-parent"><button data-act="parent">${s.parent?"收起父子挑战":"我来出题考爸爸 ↗"}</button>${s.parent?`<div><p>${E(m.coach)}</p><textarea id="arena-parent-text" maxlength="160" placeholder="你来编题，爸爸来想……">${E(s.parentChallenge||"")}</textarea></div>`:""}</div><div class="arena-footer-actions"><button class="arena-secondary" data-act="stage" data-stage="experiment">还想再试</button><button class="arena-next" data-act="complete">保存我的发现 ✓</button></div></section>`;
  page(`<div class="arena-lesson">${header}${body}<footer class="arena-lesson-bottom">${memory.records[m.id]?"这场以前复盘过，可以重新探索。":"随时暂停，下次打开会保留当前的探索。"} <a href="#/journal">我的发现 ↗</a></footer></div>`);
  const textarea=document.getElementById("arena-reflection-text");
  if(textarea)textarea.addEventListener("input",e=>{s.note=e.target.value;save();});
  const father=document.getElementById("arena-parent-text");
  if(father)father.addEventListener("input",e=>{s.parentChallenge=e.target.value;save();});
 }
 function journal(){
  const seen=ALL.filter(m=>memory.records[m.id]).sort((x,y)=>memory.records[y.id].date.localeCompare(memory.records[x.id].date));
  page(`<div class="arena-journal"><a class="arena-back" href="#/">← 返回数学训练场</a><span class="arena-kicker">自己留下的思考</span><h1>不是分数榜，是新发现。</h1><p>无连胜、排名和限时任务。错题也能留下有价值的复盘。</p>${seen.length?`<div class="arena-journal-list">${seen.map(m=>{const r=memory.records[m.id];return `<article><small>${E(tr(m.track).label)} · ${E(r.date.slice(0,10))}</small><h2>${E(m.title)}</h2><p>${E(r.note||"这一次完成了一场探索。")}</p><a href="${playUrl(m.id)}">再挑战 ↗</a></article>`;}).join("")}</div>`:`<div class="arena-empty">还没有复盘。选一场挑战开始研究吧。</div>`}</div>`);
 }
 function complete(m,s){
  memory.records[m.id]={date:new Date().toISOString(),pred:s.pred,readFirst:m.read?(s.readMisses||0)===0:null,transfer:s.transfer,transferCorrect:s.transfer===m.transfer.answer,changed:s.changed,expert:s.expert,reflection:s.reflection||"uncertain",note:s.note||"",parent:s.parentChallenge||""};
  save();
  page(`<div class="arena-finished"><span class="arena-finished-star">✦</span><span class="arena-kicker">一次有价值的探索</span><h1>你留下了一项发现。</h1><p>不用为了答对所有题才可以结束。下次可以回来继续研究。</p><blockquote>${E(s.note||"我发现数学可以用新的方法来尝试。")}</blockquote><div class="arena-finished-actions"><a href="#/track/${m.track}" class="arena-primary">回到本章</a><a href="#/journal" class="arena-outline">我的复盘</a></div></div>`);
 }
 function navigate(){
  stop();drag=null;
  const parts=(location.hash.slice(1)||"/").split("/").filter(Boolean);
  if(parts[0]==="play"&&byId.has(parts[1])){current=parts[1];memory.last=current;save();lesson(byId.get(current));}
  else{current=null;if(parts[0]==="track"&&tr(parts[1]))trackPage(parts[1]);else if(parts[0]==="journal")journal();else home();}
  if(typeof window.scrollTo==="function")window.scrollTo(0,0);
 }
 function change(m,value,absolute){
  const s=draft(m),num=absolute?Number(value):s.value+Number(value);
  if(!Number.isFinite(num))return;
  const final=Math.min(m.cfg.max,Math.max(m.cfg.min,Math.round(num)));
  if(final===s.value)return;
  s.value=final;s.changed=true;save();
  const board=root.querySelector?root.querySelector(".arena-blackboard"):null;
  if(s.stage==="experiment"&&board){
   board.innerHTML=V.render(m,s);
   const label=root.querySelector("#arena-value"),range=root.querySelector("#arena-range");
   if(label)label.textContent=String(s.value);
   if(range)range.value=String(s.value);
  }else lesson(m);
 }
 function animation(m){
  stop();const id=m.id,frames=Math.min(8,m.cfg.max-m.cfg.min),min=m.cfg.min,max=m.cfg.max;let i=0;
  change(m,min,true);
  playing=setInterval(()=>{if(current!==id){stop();return;}i++;change(m,min+Math.round((max-min)*i/frames),true);if(i>=frames)stop();},330);
 }
 root.addEventListener("click",e=>{
  const ch4=e.target.closest?.("[data-ch4-action]");
  if(ch4&&current){
   const m=byId.get(current),d=draft(m),ix=Number(ch4.dataset.index);
   if(m.track==="c4"){
    if(ch4.dataset.ch4Action==="counter"){change(m,2,true);return;}
    if(ch4.dataset.ch4Action==="expand"){d.mode=d.mode?0:1;d.changed=true;save();lesson(m);return;}
    if(ch4.dataset.ch4Action==="inspect"&&Number.isInteger(ix)){
     d.ch4Selected=ix;d.changed=true;
     if(m.scene==="ch4-brackets"){if(!Array.isArray(d.ch4Revealed))d.ch4Revealed=[];d.ch4Revealed=d.ch4Revealed.includes(ix)?d.ch4Revealed.filter(z=>z!==ix):[...d.ch4Revealed,ix];}
     save();lesson(m);return;
    }
   }
  }
  const sceneAction=e.target.closest?.("[data-scene-action]");
  if(sceneAction&&current){
   const m=byId.get(current),d=draft(m);
   if(sceneAction.dataset.sceneAction==="regroup"||sceneAction.dataset.sceneAction==="remove"){
    d.mode=d.mode?0:1;d.changed=true;save();lesson(m);return;
   }
  }
  const slice=e.target.closest?.("[data-part-index]");
  if(slice&&current){
   const m=byId.get(current),d=draft(m);
   if(m.scene==="fractions"){d.selected=Number(slice.dataset.partIndex)+1;d.changed=true;save();lesson(m);return;}
  }
  const sceneItem=e.target.closest?.("[data-choice-index]");
  if(sceneItem&&current){change(byId.get(current),Number(sceneItem.dataset.choiceIndex),true);return;}
  const btn=e.target.closest?.("[data-act]");if(!btn||!current)return;
  const m=byId.get(current),s=draft(m),act=btn.dataset.act;
  if(act==="stage"){s.stage=btn.dataset.stage;save();lesson(m);}
  else if(act==="read"){s.read=Number(btn.dataset.index);if(m.read&&s.read!==m.read.answer)s.readMisses=(s.readMisses||0)+1;save();lesson(m);}
  else if(act==="pred"){if(m.read&&s.read!==m.read.answer)return;s.pred=Number(btn.dataset.index);save();lesson(m);}
  else if(act==="transfer"){s.transfer=Number(btn.dataset.index);save();lesson(m);}
  else if(act==="adjust")change(m,btn.dataset.n,false);
  else if(act==="flip"){s.mode=s.mode?0:1;s.changed=true;save();lesson(m);}
  else if(act==="spatial"){s.spatial=!s.spatial;s.mode=0;s.changed=true;save();lesson(m);}
  else if(act==="expert"){s.expert=!s.expert;save();lesson(m);}
  else if(act==="play")animation(m);
  else if(act==="reflect"){s.reflection=btn.dataset.value;save();lesson(m);}
  else if(act==="parent"){s.parent=!s.parent;save();lesson(m);}
  else if(act==="complete")complete(m,s);
 });
 root.addEventListener("input",e=>{if(e.target.id==="arena-range"&&current)change(byId.get(current),e.target.value,true);});
 root.addEventListener("pointerdown",e=>{
  if(e.target.closest?.("[data-ch4-action]"))return;
  const svg=e.target.closest?.('svg[data-drag="1"]');
  if(!svg||!current||draft(byId.get(current)).stage!=="experiment")return;
  stop();drag={id:current,rect:svg.getBoundingClientRect()};
 });
 root.addEventListener("keydown",e=>{
  if(e.key!=="Enter"&&e.key!==" ")return;
  const target=e.target.closest?.("[data-ch4-action]");
  if(!target)return;
  e.preventDefault();
  target.dispatchEvent(new MouseEvent("click",{bubbles:true}));
 });
 document.addEventListener("pointermove",e=>{
  if(!drag||drag.id!==current||!drag.rect.width)return;
  const m=byId.get(current),ratio=Math.max(0,Math.min(1,(e.clientX-drag.rect.left)/drag.rect.width));
  change(m,m.cfg.min+ratio*(m.cfg.max-m.cfg.min),true);
 });
 document.addEventListener("pointerup",()=>{drag=null;});
 document.addEventListener("pointercancel",()=>{drag=null;});
 window.addEventListener("hashchange",navigate);
 navigate();
 window.MATH_ARENA_TEST={count:ALL.length,getDraft:id=>memory.drafts[id],getRecord:id=>memory.records[id],navigate};
})();
