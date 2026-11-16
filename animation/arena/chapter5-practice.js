(function chapter5Practice(){
 "use strict";
 const root=document.getElementById("c5-practice-app"),BANK=window.C5_QUESTION_BANK||[],KEY="math-arena-c5-bank-v1";
 const E=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const defaults={section:"5.1",level:0,topic:"全部",status:"全部",index:0,answers:{}};
 let state=defaults;
 try{const old=JSON.parse(localStorage.getItem(KEY)||"null");if(old&&typeof old==="object")state={...defaults,...old,answers:old.answers||{}};}catch(e){}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}};
 const sectionItems=()=>BANK.filter(q=>q.section===state.section);
 const qstate=q=>{
  if(!state.answers[q.id])state.answers[q.id]={values:{},done:[],attempts:{},feedback:{},finished:false,mistakes:0};
  return state.answers[q.id];
 };
 const filtered=()=>BANK.filter(q=>{
  if(q.section!==state.section)return false;
  if(state.level&&q.level!==state.level)return false;
  if(state.topic!=="全部"&&q.topic!==state.topic)return false;
  const a=state.answers[q.id];
  if(state.status==="已完成")return !!a?.finished;
  if(state.status==="未完成")return !a?.finished;
  if(state.status==="错题复练")return !!a&&a.mistakes>0;
  return true;
 });
 const progress=()=>{
  const all=sectionItems(),done=all.filter(q=>state.answers[q.id]?.finished).length;
  const wrong=all.filter(q=>(state.answers[q.id]?.mistakes||0)>0).length;
  return {all,done,wrong,totalDone:BANK.filter(q=>state.answers[q.id]?.finished).length};
 };
 const topics=()=>[...new Set(sectionItems().map(q=>q.topic))];
 const numValue=v=>{
  const s=String(v==null?"":v).trim().replace(/[−－]/g,"-").replace(/，/g,"");
  if(/^-?\d+(?:\.\d+)?\/-?\d+(?:\.\d+)?$/.test(s)){const [a,b]=s.split("/").map(Number);return b===0?NaN:a/b;}
  return s!==""&&Number.isFinite(Number(s))?Number(s):NaN;
 };
 const norm=s=>String(s||"").toLowerCase().replace(/\s+/g,"").replace(/[−－]/g,"-").replace(/[＋]/g,"+").replace(/[×·]/g,"*").replace(/[÷]/g,"/").replace(/(\d)\*(x)/g,"$1x");
 const sectionName={"5.1":"认识方程","5.2":"解一元一次方程","5.3":"实际问题"};
 const levelName={1:"基础",2:"进阶",3:"挑战"};
 function stepHtml(q,a,s,i,active){
  const done=!!a.done[i],locked=i>active&&!done,cls=done?"is-done":locked?"is-locked":"is-current";
  const chosen=a.values[i]==null?"":String(a.values[i]);
  let form="";
  if(!done&&!locked){
   if(s.kind==="choice"){
    form='<div class="c5p-choice-grid">'+s.options.map((v,j)=>'<button type="button" class="c5p-choice" data-bank-choice="'+i+'" data-index="'+j+'" aria-pressed="'+(chosen===String(j))+'">'+E(v)+'</button>').join("")+'</div>';
   }else{
    const ph=s.kind==="equation"?"例如：3x+5=11，也可以写 x=2":"例如：12、−3 或 3/4";
    form='<div class="c5p-input-row"><input class="c5p-answer-input" type="text" autocomplete="off" inputmode="'+(s.kind==="number"?"decimal":"text")+'" data-bank-input="'+i+'" value="'+E(chosen)+'" placeholder="'+ph+'" aria-label="第'+(i+1)+'步答案"/><button type="button" class="c5p-check" data-bank-check="'+i+'">检查这一步</button></div>';
   }
   if(s.kind==="choice")form+='<div class="c5p-input-row"><button type="button" class="c5p-check" data-bank-check="'+i+'" '+(chosen===""?"disabled":"")+'>确认选择</button></div>';
  }
  let feedback="";
  if(done){
   let value=chosen;
   if(s.kind==="choice"&&chosen!=="")value=s.options[Number(chosen)];
   feedback='<p class="c5p-step-explain">✓ '+E(s.explain)+(value!==""?'　<span>你的答案：'+E(value)+'</span>':"")+'</p>';
  }else if(!locked&&a.feedback[i]){
   const f=a.feedback[i];
   feedback='<div class="c5p-feedback '+(f.ok?"good":"try")+'">'+E(f.text)+'</div>';
  }else if(locked){
   feedback='<p class="c5p-locked-note">完成上一步后，这一步才会打开。</p>';
  }
  return '<article class="c5p-step '+cls+'"><div class="c5p-step-head"><span class="c5p-step-num">'+(done?"✓":String(i+1).padStart(2,"0"))+'</span><div class="c5p-step-title">'+E(s.prompt)+'</div></div>'+form+feedback+'</article>';
 }
 function render(){
  if(!BANK.length){root.innerHTML='<div class="c5p-loading"><strong>题库没有加载成功。</strong><p>请刷新页面，或返回第五章课程。</p></div>';return;}
  const list=filtered(),p=progress(),topicsList=topics();
  if(state.index>=list.length)state.index=Math.max(0,list.length-1);
  if(state.index<0)state.index=0;
  const q=list[state.index];
  const percent=p.all.length?Math.round(p.done/p.all.length*100):0;
  const sectionCounts={"5.1":100,"5.2":200,"5.3":200};
  const topicOptions=['<option value="全部">全部题型（'+p.all.length+'题）</option>'].concat(topicsList.map(t=>'<option value="'+E(t)+'" '+(state.topic===t?"selected":"")+'>'+E(t)+'（'+sectionItems().filter(q=>q.topic===t).length+'）</option>')).join("");
  const sectionButtons=["5.1","5.2","5.3"].map(s=>'<button class="c5p-filter" data-section="'+s+'" aria-pressed="'+(state.section===s)+'">'+s+' '+sectionName[s]+' · '+sectionCounts[s]+'题</button>').join("");
  const levelButtons=[[0,"全部难度"],[1,"基础"],[2,"进阶"],[3,"挑战"]].map(([v,n])=>'<button class="c5p-filter" data-level="'+v+'" aria-pressed="'+(state.level===v)+'">'+n+'</button>').join("");
  const statusButtons=["全部","未完成","错题复练","已完成"].map(v=>'<button class="c5p-filter" data-status="'+v+'" aria-pressed="'+(state.status===v)+'">'+v+(v==="错题复练"?" · "+p.wrong:"")+'</button>').join("");
  let question="";
  if(!q){
   question='<div class="c5p-empty"><strong>这个筛选下暂时没有题目。</strong><p>试试切换难度、题型或状态。</p><button class="c5p-check" data-clear-filter>清除筛选</button></div>';
  }else{
   const a=qstate(q),active=q.steps.findIndex((s,i)=>!a.done[i]),finished=active<0||a.finished;
   const stepList=q.steps.map((s,i)=>stepHtml(q,a,s,i,active)).join("");
   const solved=finished?'<div class="c5p-solution"><strong>这道题的完整思路</strong><p>'+E(q.solution)+'</p></div>':"";
   const wrongText=a.mistakes?'<span class="c5p-tag">曾经卡过 '+a.mistakes+' 次</span>':"";
   question='<section class="c5p-question"><div class="c5p-question-top"><div><div class="c5p-question-id">'+q.id+'　·　第 '+(state.index+1)+' / '+list.length+' 题</div></div><div class="c5p-tags"><span class="c5p-tag">'+E(q.topic)+'</span><span class="c5p-tag level-'+q.level+'">'+levelName[q.level]+'</span>'+wrongText+'</div></div><div class="c5p-question-body"><h2>'+E(q.stem)+'</h2><p class="c5p-question-help">先自己想，再逐步写。每一步检查通过后，下一步才会打开。可以重试，不计时、不扣分。</p><div class="c5p-step-list">'+stepList+'</div>'+solved+'</div></section>';
  }
  root.innerHTML='<div class="c5p-shell">'+
   '<section class="c5p-hero"><div class="c5p-eyebrow">GRADE 7 · CHAPTER 05</div><h1>方程，不靠猜。<br/>一步一步把它解开。</h1><p>这不是500道选择题。你要自己判断未知数、写出等量关系、完成每一步变形，再把答案放回题目检查。</p><div class="c5p-stats"><div class="c5p-stat"><strong>500</strong><span>分层题目</span></div><div class="c5p-stat"><strong>50</strong><span>不同题型与问题家族</span></div><div class="c5p-stat"><strong>'+p.done+'</strong><span>本章已完成</span></div><div class="c5p-stat"><strong>'+p.totalDone+'</strong><span>全章累计完成</span></div></div><div class="c5p-hero-foot"><span>5.1 认识方程 · 100题</span><span>5.2 解方程 · 200题</span><span>5.3 实际问题 · 200题</span><span>过程比速度重要</span></div></section>'+
   '<section class="c5p-controls"><div class="c5p-filter-row"><span class="c5p-filter-label">选章节</span>'+sectionButtons+'</div><div class="c5p-filter-row"><span class="c5p-filter-label">难度</span>'+levelButtons+'</div><div class="c5p-filter-row"><span class="c5p-filter-label">题型</span><select class="c5p-topic-select" data-topic>'+topicOptions+'</select></div><div class="c5p-filter-row"><span class="c5p-filter-label">进度</span>'+statusButtons+'</div></section>'+
   '<div class="c5p-progress"><div class="c5p-progress-track"><div class="c5p-progress-fill" style="width:'+percent+'%"></div></div><small>'+p.done+' / '+p.all.length+' 已完成 · '+percent+'%</small></div>'+
   question+
   (q?'<div class="c5p-nav"><button data-nav="prev" '+(state.index===0?"disabled":"")+'>'+((state.index===0)?"已经是第一题":"← 上一题")+'</button><div class="c5p-nav-right"><button data-reset>重新做本题</button><button class="primary" data-nav="next" '+(state.index>=list.length-1?"disabled":"")+'>'+(state.index>=list.length-1?"已经是最后一题":"下一题 →")+'</button></div></div>':"")+
   '<p class="c5p-footnote">进度只保存在当前浏览器和设备中。换手机或平板不会自动同步。若某一步连续出错，先读提示、回到实验页观察，再回来尝试。</p>'+
   '</div>';
  save();
 }
 function activeQuestion(){const list=filtered();return list[state.index]||null;}
 function checkStep(i){
  const q=activeQuestion();if(!q)return;
  const s=q.steps[i],a=qstate(q);if(!s||a.done[i])return;
  let raw=a.values[i],correct=false;
  if(s.kind==="choice")correct=Number(raw)===s.answer;
  else if(s.kind==="equation")correct=(s.accepted||[s.expected]).some(v=>norm(v)===norm(raw));
  else if(s.kind==="number"){const n=numValue(raw),expected=numValue(s.answer);correct=Number.isFinite(n)&&Number.isFinite(expected)&&Math.abs(n-expected)<1e-7;}
  const attempts=(a.attempts[i]||0)+1;a.attempts[i]=attempts;
  if(correct){
   a.done[i]=true;a.feedback[i]={ok:true,text:"这一步正确。"+s.explain};
   if(q.steps.every((step,j)=>a.done[j])){a.finished=true;a.completedAt=new Date().toISOString();}
  }else{
   a.mistakes=(a.mistakes||0)+1;
   a.feedback[i]={ok:false,text:attempts>=2?"提示："+s.hint:"还差一点。先别急着看答案，检查符号、等号两边和题目问的量。"};
  }
  save();render();
 }
 root.addEventListener("click",e=>{
  const section=e.target.closest("[data-section]");if(section){state.section=section.dataset.section;state.topic="全部";state.level=0;state.status="全部";state.index=0;save();render();return;}
  const level=e.target.closest("[data-level]");if(level){state.level=Number(level.dataset.level);state.index=0;save();render();return;}
  const status=e.target.closest("[data-status]");if(status){state.status=status.dataset.status;state.index=0;save();render();return;}
  const choice=e.target.closest("[data-bank-choice]");if(choice){const q=activeQuestion();if(!q)return;const a=qstate(q),i=Number(choice.dataset.bankChoice);a.values[i]=choice.dataset.index;delete a.feedback[i];save();render();return;}
  const check=e.target.closest("[data-bank-check]");if(check){checkStep(Number(check.dataset.bankCheck));return;}
  const nav=e.target.closest("[data-nav]");if(nav){const list=filtered();state.index=Math.max(0,Math.min(list.length-1,state.index+(nav.dataset.nav==="next"?1:-1)));save();render();return;}
  if(e.target.closest("[data-reset]")){const q=activeQuestion();if(q){delete state.answers[q.id];save();render();}return;}
  if(e.target.closest("[data-clear-filter]")){state.level=0;state.topic="全部";state.status="全部";state.index=0;save();render();return;}
 });
 root.addEventListener("input",e=>{
  if(e.target.matches("[data-bank-input]")){
   const q=activeQuestion();if(!q)return;const a=qstate(q),i=Number(e.target.dataset.bankInput);
   a.values[i]=e.target.value;save();
  }
 });
 root.addEventListener("change",e=>{
  if(e.target.matches("[data-topic]")){state.topic=e.target.value;state.index=0;save();render();}
 });
 root.addEventListener("keydown",e=>{
  if(e.key==="Enter"&&e.target.matches("[data-bank-input]")){
   e.preventDefault();const i=Number(e.target.dataset.bankInput);checkStep(i);
  }
 });
 render();
})();