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
  if(!memory.drafts[m.id])memory.drafts[m.id]={stage:"predict",value:m.cfg.v,mode:0,pred:null,transfer:null,expert:false,changed:false,reflection:"",note:"",parent:false,parentChallenge:""};
  return memory.drafts[m.id];
 }
 const tr=id=>T.find(x=>x.id===id);
 const go=(path)=>"#/"+path;
 const playUrl=id=>go("play/"+id);
 function page(s){root.innerHTML=s;}
 function home(){
  const done=ALL.filter(x=>memory.records[x.id]).length;
  const resume=byId.has(memory.last)?memory.last:ALL[0].id;
  page(`<div class="arena-home"><section class="arena-hero"><div class="arena-hero-main"><span class="arena-kicker">数学 · 自己出招</span><h1>数学也有<br><em>值得研究的招式。</em></h1><p>不急着做对。像在球场上一样，观察、尝试、换招、再战。你是自己学习的主教练。</p><div class="arena-hero-actions"><a class="arena-primary" href="${playUrl(resume)}"> ${memory.last?"继续上次挑战":"开始第一场挑战"} →</a><a class="arena-hero-secondary" href="#/track/bridge">自己挑一场</a></div></div><div class="arena-hero-demo" aria-hidden="true"><small>换种看法</small><strong>25 × 16</strong><span>25 × (4 × 4)</span><b>100 × 4</b><small>不改变结果，改变思路</small></div></section><div class="arena-stats"><div><b>${done}</b><span>已留下复盘的实验</span></div><div><b>${ALL.length}</b><span>原创核心挑战</span></div><div><b>4</b><span>小学桥梁＋初一前三章</span></div><a href="#/journal">查看我的发现 ↗</a></div><div class="arena-block-head"><span>自主选择</span><h2>今天想研究什么？</h2></div><div class="arena-track-grid">${T.map(t=>{const ls=ALL.filter(m=>m.track===t.id),n=ls.filter(m=>memory.records[m.id]).length,next=ls.find(m=>!memory.records[m.id])||ls[0];return `<article class="arena-track-card arena-${t.id}"><small>${n} / ${ls.length} 次复盘</small><h3>${E(t.label)}</h3><p>${E(t.sub)}</p><div><a href="#/track/${t.id}">看挑战目录 ↗</a><a href="${playUrl(next.id)}">直接出手 →</a></div></article>`;}).join("")}</div><div class="arena-parent-blurb"><strong>给陪练的爸爸</strong><p>不是检查孩子会不会，而是和他共同研究怎么想。做错可以停下来观察，想不明白也可以保留问题。没有强制倒计时、排名和连胜奖励。</p></div><p class="arena-disclaimer">课程内容为原创互动原型。不能用单次作答判断能力，也不再使用旧开源知识图谱作为课程内核。</p></div>`);
 }
 function trackPage(id){
  const t=tr(id),ls=ALL.filter(x=>x.track===id),groups=[...new Set(ls.map(x=>x.sec))];
  page(`<div class="arena-track-page"><a class="arena-back" href="#/">← 回到数学训练场</a><header class="arena-topic-header arena-${t.id}"><span>自己选择要挑战的课题</span><h1>${E(t.label)}</h1><p>${E(t.sub)}</p></header><p class="arena-trust">可以跳着学，也可以做过后回来重试。这里不是按顺序通关的题海。</p>${groups.map((g,i)=>`<section class="arena-module"><h2><small>0${i+1}</small>${E(g)}</h2><div class="arena-module-list">${ls.filter(m=>m.sec===g).map(m=>`<a class="arena-module-lesson" href="${playUrl(m.id)}"><span class="arena-module-mark">${m.scene==="line"?"↔":m.scene==="fractions"?"½":m.scene==="powers"?"²":"✳"}</span><span><strong>${E(m.title)}</strong><small>${E(m.goal)}</small></span><em>${memory.records[m.id]?"已复盘":memory.drafts[m.id]?"可继续":"去试试"} ↗</em></a>`).join("")}</div></section>`).join("")}</div>`);
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
  if(s.stage==="predict")body=`<section class="arena-paper"><span class="arena-section-kicker">第01步 · 先自己判断</span><h2>${E(m.q.text)}</h2><p>读清楚问题再选。不要追求快，第一次答错也没有关系。</p>${choices(m.q,s.pred,"pred")}${hint(m.q,s.pred,false)}<div class="arena-footer-actions"><button class="arena-next" data-act="stage" data-stage="experiment">亲自验证 →</button></div></section>`;
  else if(s.stage==="experiment")body=`<section class="arena-experiment"><div class="arena-stage-head"><span class="arena-section-kicker">第02步 · 你来操纵数学对象</span><h2>${E(m.action)}</h2></div><div class="arena-blackboard">${V.render(m,s)}</div><div class="arena-controls"><label for="arena-range">改变一个条件 <strong id="arena-value">${E(s.value)}</strong></label><input id="arena-range" type="range" min="${m.cfg.min}" max="${m.cfg.max}" step="1" value="${s.value}"><div class="arena-controls-row"><button data-act="adjust" data-n="-1">− 减少</button><button data-act="adjust" data-n="1">＋ 增加</button><button data-act="flip">↔ 换种看法</button><button data-act="play">▶ 演示变化</button></div>${m.id==="b05"?`<button class="arena-spatial-toggle" data-act="spatial">${s.spatial?"← 回到平面网格":"▧ 看看同样底面如何叠成立体积木"}</button>`:""}<p>也可以直接在黑板图上左右拖动。试试不同的条件，再总结变化。</p></div><div class="arena-expert"><div class="arena-expert-head"><div><strong>观察高手的思路</strong><small>想自己研究就先不打开，没有惩罚。</small></div><button data-act="expert">${s.expert?"收起":"看另一种方法"}</button></div>${s.expert?`<div class="arena-expert-body"><p>${E(m.goal)}</p><p>${E(m.q.reason)}</p><b>${E(m.coach)}</b></div>`:""}</div><div class="arena-footer-actions"><button class="arena-secondary" data-act="stage" data-stage="predict">重新判断</button><button class="arena-next" data-act="stage" data-stage="transfer">换道题试试 →</button></div></section>`;
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
  memory.records[m.id]={date:new Date().toISOString(),pred:s.pred,transfer:s.transfer,transferCorrect:s.transfer===m.transfer.answer,changed:s.changed,expert:s.expert,reflection:s.reflection||"uncertain",note:s.note||"",parent:s.parentChallenge||""};
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
  s.value=final;s.changed=true;save();lesson(m);
 }
 function animation(m){
  stop();const id=m.id,frames=Math.min(8,m.cfg.max-m.cfg.min),min=m.cfg.min,max=m.cfg.max;let i=0;
  change(m,min,true);
  playing=setInterval(()=>{if(current!==id){stop();return;}i++;change(m,min+Math.round((max-min)*i/frames),true);if(i>=frames)stop();},330);
 }
 root.addEventListener("click",e=>{
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
  else if(act==="pred"){s.pred=Number(btn.dataset.index);save();lesson(m);}
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
  const svg=e.target.closest?.('svg[data-drag="1"]');
  if(!svg||!current||draft(byId.get(current)).stage!=="experiment")return;
  stop();drag={id:current,rect:svg.getBoundingClientRect()};
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
