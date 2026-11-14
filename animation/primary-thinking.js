(function installThinkingLab(){
  'use strict';
  const M = window.TM_MISSIONS || [];
  const SKILLS = window.TM_SKILLS || [];
  const STORE = "primary-thinking-rebuild-v1";
  const REFLECT = [
    "我一看到数字就想套公式",
    "我没确认题目到底求什么",
    "我把图形和算式看成了两回事",
    "我忽略了条件变化或边界",
    "我发现自己以前的想法不完整",
    "我能解释原理，但还需要练习"
  ];
  const STAGES = ["先想","动手","找反例","换题","复盘"];
  const B = v=>String(v).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  function load(){
    try{const x=JSON.parse(localStorage.getItem(STORE)||"{}");return x&&typeof x==="object"?{drafts:x.drafts||{},records:x.records||{}}:{drafts:{},records:{}};}
    catch(e){return {drafts:{},records:{}};}
  }
  const DB=load();
  function save(){try{localStorage.setItem(STORE,JSON.stringify(DB));}catch(e){}}
  const lookup=new Map(M.map(m=>[m.id,m]));
  function route(id){
    if(id==="library"){renderLibrary();return;}
    if(id==="report"){renderReport();return;}
    if(lookup.has(id)){renderMission(id);return;}
    renderHome();
  }
  window.renderPrimaryThinking=route;
  function app(){return document.getElementById("app");}
  function shell(html){
    const el=app();
    el.innerHTML='<div class="tm-root">'+html+'</div>';
  }
  function completed(){return M.filter(x=>DB.records[x.id]);}
  function card(m,number){
    const rec=DB.records[m.id];
    const status=rec?'<span class="tm-done">已完成</span>':DB.drafts[m.id]?'<span class="tm-draft">进行中</span>':'<span class="tm-open">待探索</span>';
    return '<a class="tm-task" href="#/train/'+m.id+'"><div class="tm-task-icon">'+String(number||"↗").padStart(2,'0')+'</div><div class="tm-task-text"><span class="tm-mini">'+B("小学"+m.g+"年级 · "+SKILLS[m.s])+'</span><strong>'+B(m.title)+'</strong><small>'+B(m.q)+'</small></div><span class="tm-task-state">'+status+'<span aria-hidden="true">↗</span></span></a>';
  }
  let gradeFilter="all",skillFilter="all";
  function renderHome(){
    const finished=completed();
    const tPassed=finished.filter(m=>DB.records[m.id].transferCorrect).length;
    const cPassed=finished.filter(m=>DB.records[m.id].counterCorrect).length;
    const list=M.filter(m=>(gradeFilter==="all"||m.g===Number(gradeFilter))&&(skillFilter==="all"||m.s===Number(skillFilter)));
    const elements=SKILLS.map((skill,i)=>{
      const group=list.filter(m=>m.s===i);
      if(!group.length)return "";
      const done=group.filter(m=>DB.records[m.id]).length;
      return '<section class="tm-group"><div class="tm-group-head"><div><span class="tm-group-no">0'+(i+1)+'</span><h2>'+B(skill)+'</h2></div><span>'+done+' / '+group.length+' 已完成</span></div><div class="tm-tasks">'+group.map(m=>card(m,M.indexOf(m)+1)).join("")+'</div></section>';
    }).join("");
    shell(
      '<div class="tm-home"><div class="tm-eyebrow">ELEMENTARY MATH · THINKING RESET</div>'+
      '<section class="tm-hero"><div class="tm-hero-copy"><p class="tm-hero-kicker">小学数学 · 思维习惯重建</p><h1>别急着算。<em>先看清问题。</em></h1>'+
      '<p>从熟悉的小学题出发，不背新口诀。先判断，动手改变条件，再找反例。最终要能解释：为什么这样做？</p>'+
      '<div class="tm-hero-actions"><a class="tm-primary-btn" href="#/train/'+(M.find(x=>!DB.records[x.id])||M[0]).id+'">开始下一场实验 <span aria-hidden="true">→</span></a>'+
      '<a class="tm-subtle-btn" href="#/train/report">查看思维复盘</a></div></div>'+
      '<div class="tm-hero-visual" aria-hidden="true"><div class="tm-scene-prompt">25 × 16 = ?</div><div class="tm-scene-transform">25 × <b>(4 × 4)</b></div><div class="tm-scene-result"><span>100</span> × 4</div><div class="tm-scene-caption">改变看法，不改变数学关系。</div></div></section>'+
      '<section class="tm-metrics" aria-label="我的进度"><div><strong>'+finished.length+'<small>/ '+M.length+'</small></strong><span>完整思维实验</span></div>'+
      '<div><strong>'+tPassed+'<small> / '+finished.length+'</small></strong><span>首次迁移正确</span></div>'+
      '<div><strong>'+cPassed+'<small> / '+finished.length+'</small></strong><span>反例判断正确</span></div>'+
      '<a href="#/train/library"><strong>284</strong><span>原图谱小学知识点 · 可检索</span></a></section>'+
      '<div class="tm-steps-ribbon"><span>01 先预测</span><span>02 动手改变</span><span>03 找反例</span><span>04 陌生迁移</span><span>05 自己复盘</span></div>'+
      '<div class="tm-section-title"><div><p>不是按年级重刷，而是重建思考方式</p><h2>六种思维 · 24场实验</h2></div><a href="#/learn/L1">原有12节 Grok 动画 →</a></div>'+
      '<div class="tm-filters"><label>按年级 <select id="tm-grade"><option value="all">全部年级</option>'+
      [1,2,3,4,5,6].map(n=>'<option value="'+n+'"'+(gradeFilter===String(n)?" selected":"")+'>小学'+n+'年级</option>').join("")+'</select></label>'+
      '<label>思维重点 <select id="tm-skill"><option value="all">全部思维</option>'+SKILLS.map((x,i)=>'<option value="'+i+'"'+(skillFilter===String(i)?" selected":"")+'>'+B(x)+'</option>').join("")+'</select></label></div>'+
      (elements||'<p class="tm-empty">这个筛选条件暂时没有实验，换个条件看看。</p>')+
      '<div class="tm-assets"><div><span>保留原作品</span><h2>旧动画，不删除。图谱，不藏起来。</h2><p>原有12节动画按原逻辑播放；小学284个知识点依旧可逐年级查看。新思维实验是入口，不取代原作。</p></div><div><a class="tm-outline-btn" href="#/learn/L1">看原动画</a><a class="tm-outline-btn" href="#/train/library">按年级查知识点</a><a class="tm-outline-btn" href="#/cat">原知识目录</a></div></div>'+
      '<p class="tm-method">这些题目是针对思维习惯设计的教学实验，尚未经过真实学生的难度和效度校准。答对不等于已经形成稳定能力。</p></div>');
  }
  function draft(id,m){
    if(!DB.drafts[id])DB.drafts[id]={step:0,slider:m.cfg.v,touched:false,read:null,readMisses:0,pred:null,counter:null,transfer:null,reflection:null,note:"",started:Date.now()};
    return DB.drafts[id];
  }
  function getCurrent(){
    const id=location.hash.split("/")[2];
    return lookup.has(id)?id:null;
  }
  function renderMission(id){
    const m=lookup.get(id),d=draft(id,m);
    const index=M.indexOf(m)+1;
    const total=M.length;
    const stage=Math.max(0,Math.min(4,d.step||0));
    d.step=stage;
    const heading='<div class="tm-lesson-top"><a class="tm-back" href="#/train">← 全部实验</a><span>小学'+m.g+'年级 · '+B(SKILLS[m.s])+'</span><span>第 '+index+' / '+total+' 场</span></div>'+
      '<div class="tm-lesson-head"><div><p class="tm-eyebrow">THINKING EXPERIMENT / '+String(index).padStart(2,"0")+'</p><h1>'+B(m.title)+'</h1></div>'+
      '<a class="tm-old-lesson" href="#/learn/'+m.old+'">查看原版 Grok 动画 ↗</a></div>'+
      '<div class="tm-stage-nav">'+STAGES.map((s,i)=>'<span class="'+(i===stage?"tm-on":i<stage?"tm-past":"")+'"><b>'+String(i+1).padStart(2,"0")+'</b>'+s+'</span>').join("")+'</div>';
    let body="";
    if(stage===0){
      body='<section class="tm-panel"><div class="tm-panel-label">01 / 读懂再预测</div><h2>'+B(m.q)+'</h2>'+
      '<div class="tm-reading"><h3>第一关：这道题究竟要你求什么？</h3><div class="tm-reading-choices">'+m.readOpts.map((x,i)=>choice("read",i,x,d.read===i)).join("")+'</div>'+
      (d.read!==null?(d.read===m.readAnswer?'<p class="tm-reading-ok">✓ 题目目标已确认。现在再想解法。</p>':'<p class="tm-reading-warning">先看清最后问的是什么、单位是什么，再选择一次。</p>'):'<p class="tm-hint">不用列式。先抓住题目真正要求的量。</p>')+'</div>'+
      (d.read===m.readAnswer?'<div class="tm-predict"><h3>第二关：预测你的答案</h3><div class="tm-choices">'+m.opts.map((x,i)=>choice("pred",i,x,d.pred===i)).join("")+'</div><div class="tm-note">暂不公布对错，下一步用动态实验验证自己的想法。</div></div>':'')+'</section>';
    }else if(stage===1){
      body='<section class="tm-panel tm-interact"><div class="tm-panel-label">02 / 改变一个条件，看发生什么</div>'+
      '<h2>'+B(m.change)+'</h2><div class="tm-stage-scene" id="tm-scene">'+scene(m,d.slider)+'</div>'+
      '<div class="tm-slider-head"><label for="tm-range">你控制的变量</label><strong id="tm-slider-value">'+B(String(d.slider))+'</strong></div>'+
      '<input id="tm-range" class="tm-range" type="range" min="'+m.cfg.min+'" max="'+m.cfg.max+'" step="'+(m.cfg.step||1)+'" value="'+d.slider+'" />'+
      '<div class="tm-slider-actions"><button type="button" data-tm="minus">− 减少</button><button type="button" data-tm="plus">＋ 增加</button><span id="tm-explored">'+(d.touched?'已经改变条件 ✓':'请至少改变一次条件')+'</span></div>'+
      (d.touched?'<p class="tm-discovery">观察：'+B(sceneInsight(m,d.slider))+'</p><div class="tm-pred-feedback"><strong>刚才的预测：'+B(m.opts[m.a])+'</strong><p>'+B(m.why)+'</p></div>':'<p class="tm-hint">拖动滑块或点击加减按钮，先观察再总结。</p>')+
      '</section>';
    }else if(stage===2){
      const chosen=d.counter;
      body='<section class="tm-panel"><div class="tm-panel-label">03 / 找规律的边界</div><p class="tm-eyebrow">这句话一定成立吗？</p><h2>'+B(m.claim)+'</h2>'+
      '<div class="tm-binary"><button class="'+(chosen===true?"tm-selected":"")+'" data-tm="counter" data-v="true">成立</button><button class="'+(chosen===false?"tm-selected":"")+'" data-tm="counter" data-v="false">不成立</button></div>'+
      (chosen!==null?'<div class="tm-feedback '+(chosen===m.truth?'tm-good':'tm-bad')+'"><strong>'+(chosen===m.truth?'判断正确':'这个判断需要修正')+'</strong><p>'+B(m.proof)+'</p></div>':'<p class="tm-hint">先自己选，再看理由。不要只背“总是”“一定”。</p>')+'</section>';
    }else if(stage===3){
      body='<section class="tm-panel"><div class="tm-panel-label">04 / 不同题面，相同结构？</div><h2>'+B(m.transfer)+'</h2>'+
      '<div class="tm-choices">'+m.choices.map((x,i)=>choice("transfer",i,x,d.transfer===i)).join("")+'</div>'+
      (d.transfer!==null?'<div class="tm-feedback '+(d.transfer===m.t?'tm-good':'tm-bad')+'"><strong>'+(d.transfer===m.t?'这次迁移答对了':'需要调整你刚才的思路')+'</strong><p>'+B(m.explain)+'</p></div>':'<p class="tm-hint">没有见过同一道题也没关系。先找相同的数学结构。</p>')+
      '</section>';
    }else{
      body='<section class="tm-panel"><div class="tm-panel-label">05 / 复盘：不是抄标准答案</div><h2>刚才哪种想法最值得你留意？</h2>'+
      '<div class="tm-reflections">'+REFLECT.map((x,i)=>'<button type="button" data-tm="reflect" data-i="'+i+'" class="'+(d.reflection===i?'tm-selected':'')+'">'+B(x)+'</button>').join("")+'</div>'+
      '<label class="tm-reflection-label" for="tm-reflection-note">下次遇到类似问题，你准备先检查什么？</label>'+
      '<textarea id="tm-reflection-note" maxlength="240" placeholder="例如：先画出谁多、谁少，再决定用加还是减。">'+B(d.note||"")+'</textarea>'+
      '<div class="tm-note">请用自己的话写至少6个字。暂时说不清也可以写“还没想明白哪里不变”。</div>'+
      '<div class="tm-summary"><span>第一次预测：'+(d.pred===m.a?'✓ 与结果一致':'需修正')+'</span><span>反例判断：'+(d.counter===m.truth?'✓':'需修正')+'</span><span>迁移新题：'+(d.transfer===m.t?'✓':'需修正')+'</span></div></section>';
    }
    const ready = stage===0?d.read===m.readAnswer&&d.pred!==null:stage===1?d.touched:stage===2?d.counter!==null:stage===3?d.transfer!==null:d.reflection!==null&&(d.note||"").trim().length>=6;
    const next=M[index]||null;
    shell('<div class="tm-lesson">'+heading+body+
      '<div class="tm-lesson-footer"><button class="tm-nav-secondary" type="button" data-tm="previous" '+(stage===0?'disabled':'')+'>上一步</button>'+
      '<button class="tm-nav-main" type="button" data-tm="next" '+(ready?"":"disabled")+'>'+(stage===4?"完成这场实验":"继续探索 →")+'</button></div>'+
      '<div class="tm-next-preview">'+(DB.records[id]?'你曾完成过这一场实验。本次重新作答不会覆盖首次迁移成绩。':'本场完成后自动保留思考记录，仅保存在当前浏览器。')+'</div>'+
      (stage===4&&next?'<p class="tm-next-hint">下一场：'+B(next.title)+'</p>':"")+'</div>');
    const ta=document.getElementById("tm-reflection-note");
    if(ta)ta.addEventListener("input",e=>{
      d.note=e.target.value;save();
      const btn=document.querySelector('[data-tm="next"]');
      if(btn)btn.disabled=d.reflection===null||d.note.trim().length<6;
    });
    save();
  }
  function choice(kind,i,text,selected){
    return '<button type="button" data-tm="'+kind+'" data-i="'+i+'" class="tm-answer '+(selected?'tm-selected':'')+'"><span class="tm-key">'+String.fromCharCode(65+i)+'</span><span>'+B(text)+'</span><span class="tm-answer-mark">'+(selected?'✓':'')+'</span></button>';
  }
  function complete(id){
    const m=lookup.get(id),d=draft(id,m);
    if(!DB.records[id]){
      DB.records[id]={
        date:new Date().toISOString(),
        readCorrectFirst:(d.readMisses||0)===0,
        predictionCorrect:d.pred===m.a,
        counterCorrect:d.counter===m.truth,
        transferCorrect:d.transfer===m.t,
        reflection:d.reflection,
        note:d.note.trim(),
        changed:true
      };
    }
    delete DB.drafts[id];save();
    const n=M.find(x=>!DB.records[x.id]);
    shell('<div class="tm-complete"><div class="tm-complete-mark">✓</div><p class="tm-eyebrow">FINISHED · 不只是做完一道题</p><h1>你完成了一场思维实验。</h1><p>重要的不是这次答对多少，而是你主动改变了条件、检验了反例，并写下下一次要检查的事情。</p>'+
      '<div class="tm-complete-stats"><span>首次预测：'+(d.pred===m.a?"正确":"修正")+'</span><span>反例：'+(d.counter===m.truth?"正确":"修正")+'</span><span>迁移：'+(d.transfer===m.t?"正确":"修正")+'</span></div>'+
      '<blockquote>'+B(d.note)+'</blockquote><div class="tm-hero-actions">'+
      (n?'<a class="tm-primary-btn" href="#/train/'+n.id+'">继续下一场 →</a>':'<a class="tm-primary-btn" href="#/train/report">查看完整复盘 →</a>')+
      '<a class="tm-subtle-btn" href="#/train">回训练地图</a><a class="tm-subtle-btn" href="#/learn/'+m.old+'">复看原 Grok 动画</a></div></div>');
  }
  function renderReport(){
    const list=completed();
    const rows=SKILLS.map((s,i)=>{
      const tasks=M.filter(m=>m.s===i),done=tasks.filter(m=>DB.records[m.id]);
      const transfer=done.filter(m=>DB.records[m.id].transferCorrect).length;
      return '<div class="tm-stat-row"><div><strong>'+B(s)+'</strong><small>已完成 '+done.length+' / '+tasks.length+' 场</small></div><div class="tm-stat-track"><i style="width:'+(100*done.length/tasks.length)+'%"></i></div><span>迁移 '+transfer+' / '+done.length+'</span></div>';
    }).join("");
    const notes=list.slice().reverse().slice(0,10).map(m=>'<div class="tm-journal-item"><span>'+B(m.title)+' · '+DB.records[m.id].date.slice(0,10)+'</span><p>'+B(DB.records[m.id].note)+'</p></div>').join("");
    shell('<div class="tm-report"><a href="#/train" class="tm-back">← 回学习首页</a><p class="tm-eyebrow">反思比刷题数量更重要</p><h1>我的思维复盘</h1>'+
      '<p class="tm-hint">这是学习记录，不是智力评分；迁移正确只是当前题目上的表现，需要后续新题反复验证。</p>'+
      '<div class="tm-report-grid"><section class="tm-report-card"><h2>六种能力 · 练习进度</h2>'+rows+'</section><section class="tm-report-card"><h2>近期反思</h2>'+(notes||'<p class="tm-hint">完成第一场实验后，这里会出现你自己的复盘记录。</p>')+'</section></div>'+
      '<div class="tm-report-actions"><a class="tm-primary-btn" href="#/train">继续练习 →</a><a class="tm-outline-btn" href="#/train/library">检查原小学知识图谱</a></div></div>');
  }
  function renderLibrary(){
    const all=typeof LIST==="undefined"?[]:LIST.filter(x=>x.b==="P");
    const groups=[1,2,3,4,5,6].map(g=>{
      const items=all.filter(x=>x.g===g);
      return '<details class="tm-grade-folder" '+(g===5?"open":"")+'><summary><strong>小学'+g+'年级</strong><span>'+items.length+' 个知识点</span><span aria-hidden="true">⌄</span></summary>'+
      '<div class="tm-knowledge-links">'+items.map(t=>'<a href="#/g/'+encodeURIComponent(t.i)+'/1/1">'+B(t.n)+' ↗</a>').join("")+'</div></details>';
    }).join("");
    shell('<section class="tm-library"><a class="tm-back" href="#/train">← 思维训练</a><p class="tm-eyebrow">知识索引 · 不等于训练量</p><h1>小学数学知识地图</h1><p>沿用原有'+all.length+'个小学知识点及先修关系。知识点列表用来定位补漏；做过一道旧自测题，不代表已经理解。</p>'+
      '<div class="tm-library-tools"><a class="tm-outline-btn" href="knowledge.html?from=primary">打开独立知识图谱</a><a class="tm-outline-btn" href="#/cat">原版完整目录</a><a class="tm-outline-btn" href="#/learn/L1">12节原版动画</a></div>'+
      '<div class="tm-grade-list">'+groups+'</div><p class="tm-method">原知识节点、文字、原题目与先修关系的数据来源和许可沿用本站底部说明。新增24场思维实验为独立编写的教学原型。</p></section>');
  }
  function sceneInsight(m,v){
    const c=m.cfg;
    switch(m.scene){
      case "bars":return "甲固定"+c.total+"，相差"+v+"，乙是"+(c.total-v)+"。差距改变，未知量跟着变。";
      case "place":return v+"＝"+Math.floor(v/10)+"个十＋"+v%10+"个一；每个位置有自己的单位。";
      case "array":return v+"组、每组"+c.unit+"，总数"+(v*c.unit)+"；分组方式改变，总数按结构计算。";
      case "residue":return v+"÷"+c.unit+"＝"+Math.floor(v/c.unit)+"余"+(v%c.unit)+"，余数始终小于除数。";
      case "area":return "面积"+(v*c.unit)+"平方格；周长"+(2*(v+c.unit))+"格。两种测量不能混用。";
      case "pattern":return v+"个紧邻的正方形有"+(3*v+1)+"根火柴；每增加1格只需再加3根。";
      case "onepart":return "同样一块整体，只取1份，分成"+v+"份时是1/"+v+"；份数越多，一份越小。";
      case "fraction":return c.k+"/"+c.n+"与"+(c.k*v)+"/"+(c.n*v)+"的阴影一样宽，改变的是分割方法。";
      case "decimal":return v+"/10＝0."+v+"＝"+(v*10)+"%，三种写法指向同一份量。";
      case "line":return "终点位置"+v+"，从0走的距离"+Math.abs(v)+"。位置与路程不是同一种量。";
      case "ratio":return "面粉"+(c.a*v)+"份，水"+(c.b*v)+"份，比例依然"+c.a+":"+c.b+"。";
      case "balance":return v+"＋"+c.plus+"＝"+(v+c.plus)+"；左右保持同一个整体。";
      case "expression":return v+"本书×"+c.unit+"元＋一次运费"+c.fee+"元＝"+(v*c.unit+c.fee)+"元。";
      case "riseFall":return "涨幅和跌幅各"+v+"%，但第二次是按新价格计算，所以最后是"+(100*(1+v/100)*(1-v/100)).toFixed(1)+"，不是100。";
      case "percent":return v+"%表示100份里取"+v+"份。比较百分比时务必确认“整体”是谁。";
    }
    return "";
  }
  const svg=(body,view="0 0 620 270")=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+view+'" role="img" aria-label="随参数变化的数学模型">'+body+'</svg>';
  function scene(m,val){
    const c=m.cfg,v=Number(val);
    const rect=(x,y,w,h,color,rad=6)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rad+'" fill="'+color+'"/>';
    const txt=(x,y,text,size=18,color="#eef5ff",weight=650)=>'<text x="'+x+'" y="'+y+'" fill="'+color+'" font-size="'+size+'" font-weight="'+weight+'">'+B(text)+'</text>';
    const fg="#68e0bd",alt="#ffbc79",pale="#5d7694";
    let drawing="",formula="";
    if(m.scene==="bars"){
      drawing+=txt(24,45,"甲")+" "+rect(75,21,c.total*35,48,pale)+rect(75,21,(c.total-v)*35,48,fg)+rect(75+(c.total-v)*35,21,v*35,48,alt)+txt(84,54,String(c.total),19,"#122339");
      drawing+=txt(24,123,"乙")+" "+rect(75,99,(c.total-v)*35,48,fg)+txt(83,130,String(c.total-v),19,"#122339");
      drawing+=txt(75,190,"多出的 "+v+" 颗",19,alt)+txt(75,230,"乙 = "+c.total+" − "+v+" = "+(c.total-v));
    }else if(m.scene==="place"){
      let tens=Math.floor(v/10),ones=v%10;
      drawing+=txt(30,36,"十位 · "+tens+"个十",20,fg);
      for(let i=0;i<tens;i++)drawing+=rect(30+i*70,58,58,102,fg);
      drawing+=txt(30,208,"个位 · "+ones+"个一",20,alt);
      for(let i=0;i<ones;i++)drawing+=rect(30+i*43,225,30,30,alt,15);
      formula=tens+" × 10 ＋ "+ones+" = "+v;
    }else if(m.scene==="array"){
      const cols=c.unit,cut=c.cut||Math.max(1,Math.floor(cols/2)),size=Math.min(51,390/cols,200/v);
      for(let row=0;row<v;row++)for(let col=0;col<cols;col++)drawing+=rect(32+col*(size+3),19+row*(size+3),size,size,col<cut?fg:alt,4);
      drawing+=txt(445,68,v+" 组",22);
      drawing+=txt(445,111,"每组 "+cols,18);
      drawing+=txt(445,158,"总数 "+(v*cols),26,alt);
      formula=v+"×"+cols+"＝"+(v*cut)+"＋"+(v*(cols-cut));
    }else if(m.scene==="residue"){
      const per=c.unit;
      for(let i=0;i<v;i++){
        const col=i%per,row=Math.floor(i/per);
        drawing+=rect(36+col*90,18+row*34,23,23,row<Math.floor(v/per)?fg:alt,12);
      }
      drawing+=txt(415,48,"每组 "+per,19);
      drawing+=txt(415,96,"装满 "+Math.floor(v/per)+" 组",22,fg);
      drawing+=txt(415,141,"余 "+(v%per),23,alt);
      formula=v+"＝"+per+"×"+Math.floor(v/per)+"＋"+(v%per);
    }else if(m.scene==="area"){
      const unit=c.unit,cell=Math.min(41,485/v,170/unit);
      for(let row=0;row<unit;row++)for(let col=0;col<v;col++)drawing+=rect(32+col*(cell+2),20+row*(cell+2),cell,cell,(row+col)%2?fg:"#3cab9f",3);
      drawing+=txt(40,238,"长 "+v+" · 宽 "+unit+" · 面积 "+(v*unit),18);
      formula="周长 2×("+v+"＋"+unit+")＝"+2*(v+unit);
    }else if(m.scene==="pattern"){
      const cell=51;const left=29,top=72;
      for(let i=0;i<v;i++){
        const x=left+i*cell;
        drawing+='<path d="M '+x+' '+top+' h '+cell+' M '+x+' '+(top+cell)+' h '+cell+'" fill="none" stroke="'+fg+'" stroke-width="6" stroke-linecap="round"/>';
      }
      for(let i=0;i<=v;i++){const x=left+i*cell;drawing+='<path d="M '+x+' '+top+' v '+cell+'" fill="none" stroke="'+(i===0?alt:fg)+'" stroke-width="6" stroke-linecap="round"/>';}
      drawing+=txt(29,190,v+" 个正方形",20);
      drawing+=txt(29,227,"火柴棒："+(3*v+1)+" 根",24,alt);
    }else if(m.scene==="fraction"){
      const n=c.n,k=c.k,p=510/n,small=510/(n*v);
      for(let i=0;i<n;i++)drawing+=rect(40+i*p,52,p-2,68,i<k?fg:pale,0);
      for(let i=0;i<n*v;i++)drawing+=rect(40+i*small,156,small-1.3,68,i<k*v?alt:pale,0);
      drawing+=txt(40,39,k+"/"+n,20,fg)+txt(40,146,(k*v)+"/"+(n*v),20,alt);
      formula="同一份面积："+k+"/"+n+" = "+k*v+"/"+n*v;
    }else if(m.scene==="onepart"){
      const w=520/v;
      for(let i=0;i<v;i++)drawing+=rect(40+i*w,75,w-2,70,i===0?fg:pale,0);
      drawing+=txt(40,56,"平均分 "+v+" 份，每份 1/"+v,22);
      drawing+=txt(40,188,"阴影比例："+(100/v).toFixed(1)+"%",22,alt);
    }else if(m.scene==="decimal"){
      for(let i=0;i<10;i++)drawing+=rect(33+i*54,79,49,70,i<v?fg:pale,4);
      drawing+=txt(35,59,"10 个同样大小的单位小格",19);
      drawing+=txt(35,210,v+"/10 = 0."+v+" = "+(v*10)+"%",26,alt);
    }else if(m.scene==="line"){
      drawing+='<path d="M 40 124 H 585" stroke="#9bb2ce" stroke-width="3"/>';
      for(let i=-10;i<=10;i++){const x=313+i*25;drawing+='<path d="M '+x+' 113 v22" stroke="#9bb2ce" stroke-width="2"/>';if(i%2===0)drawing+=txt(x-7,155,String(i),12);}
      const end=313+v*25;
      drawing+='<path d="M 313 82 L '+end+' 82" stroke="'+(v<0?alt:fg)+'" stroke-width="9" stroke-linecap="round"/>'+rect(end-7,75,14,14,alt,7);
      drawing+=txt(35,42,"从0出发，终点 "+v,22)+txt(35,216,"位置 "+v+"  ·  距离 "+Math.abs(v),24,alt);
    }else if(m.scene==="ratio"){
      const w=Math.min(34,500/(Math.max(c.a,c.b)*v));
      drawing+=txt(28,47,"面粉 "+c.a*v+" 份",19,fg)+rect(28,62,c.a*v*w,56,fg);
      drawing+=txt(28,157,"水 "+c.b*v+" 份",19,alt)+rect(28,172,c.b*v*w,56,alt);
      formula="面粉 : 水 = "+c.a+":"+c.b+"（共同放大"+v+"倍）";
    }else if(m.scene==="balance"){
      const total=v+c.plus;const token=Math.min(39,550/total);
      drawing+=txt(30,51,"左边：未知数 + "+c.plus,21);
      for(let i=0;i<v;i++)drawing+=rect(30+i*token,78,Math.min(30,token-4),30,fg,15);
      for(let i=0;i<c.plus;i++)drawing+=rect(30+(v+i)*token,78,Math.min(30,token-4),30,alt,15);
      drawing+=txt(30,155,"右边：总数 "+total,21);
      for(let i=0;i<total;i++)drawing+=rect(30+i*token,175,Math.min(30,token-4),30,pale,15);
      formula=v+" + "+c.plus+" = "+total;
    }else if(m.scene==="expression"){
      for(let i=0;i<v;i++)drawing+=rect(27+i*65,69,54,88,fg,5);
      drawing+=rect(27,184,120,43,alt);
      drawing+=txt(31,48,v+" 本书，每本 "+c.unit+" 元",18);
      drawing+=txt(41,212,"运费 "+c.fee,19,"#152338");
      formula=c.unit+"×"+v+"＋"+c.fee+"＝"+(c.unit*v+c.fee)+" 元";
    }else if(m.scene==="riseFall"){
      const rise=v,up=100*(1+v/100),down=up*(1-v/100);
      drawing+=txt(26,41,"相同的百分比，基数不一样",19);
      drawing+=rect(27,68,330,46,pale)+txt(34,99,"起点 100",19,"#142a3d");
      drawing+=rect(27,133,330*up/180,46,fg)+txt(34,164,"涨 "+rise+"% → "+up.toFixed(0),19,"#142a3d");
      drawing+=rect(27,200,330*down/180,46,alt)+txt(34,230,"再跌 "+rise+"% → "+down.toFixed(1),19,"#142a3d");
      drawing+=txt(398,126,"先 ×"+(1+v/100).toFixed(2),17,fg);
      drawing+=txt(398,202,"再 ×"+(1-v/100).toFixed(2),17,alt);
      formula="100 → "+up.toFixed(0)+" → "+down.toFixed(1)+"（不能直接抵消）";
    }else if(m.scene==="percent"){
      let on=Math.max(0,Math.min(100,v));
      for(let i=0;i<100;i++)drawing+=rect(26+(i%10)*25,16+Math.floor(i/10)*24,22,21,i<on?fg:pale,2);
      drawing+=txt(325,93,on+"%",39,alt);
      drawing+=txt(325,132,"100份取"+on+"份",19);
      drawing+=txt(325,170,on+"/100",24);
    }
    return '<div class="tm-model-visual">'+svg(drawing)+'</div>'+
      (formula?'<div class="tm-model-formula">'+B(formula)+'</div>':"")+
      '<p class="tm-model-caption">'+B(sceneInsight(m,v))+'</p>';
  }
  function changeSlider(delta,isAbsolute){
    const id=getCurrent();if(!id)return;
    const m=lookup.get(id),d=draft(id,m);
    const min=m.cfg.min,max=m.cfg.max,step=m.cfg.step||1;
    const val=isAbsolute?Number(delta):Number(d.slider)+delta*step;
    const fixed=Math.max(min,Math.min(max,val));
    if(fixed!==d.slider){d.touched=true;d.slider=fixed;save();}
    const input=document.getElementById("tm-range"),display=document.getElementById("tm-slider-value"),sceneHost=document.getElementById("tm-scene");
    if(input)input.value=d.slider;if(display)display.textContent=String(d.slider);if(sceneHost)sceneHost.innerHTML=scene(m,d.slider);
    const text=document.getElementById("tm-explored");
    if(text)text.textContent=d.touched?"已经改变条件 ✓":"请至少改变一次条件";
    if(d.touched){
      const panel=document.querySelector(".tm-interact");
      let box=panel&&panel.querySelector(".tm-discovery");
      if(!box&&panel){box=document.createElement("p");box.className="tm-discovery";panel.appendChild(box);}
      if(box)box.textContent="观察："+sceneInsight(m,d.slider);
      let prediction=panel&&panel.querySelector(".tm-pred-feedback");
      if(!prediction&&panel){prediction=document.createElement("div");prediction.className="tm-pred-feedback";panel.appendChild(prediction);}
      if(prediction)prediction.innerHTML="<strong>刚才的预测："+B(m.opts[m.a])+"</strong><p>"+B(m.why)+"</p>";
      const next=document.querySelector('[data-tm="next"]');if(next)next.disabled=false;
    }
  }
  document.addEventListener("input",e=>{
    if(e.target.id==="tm-range")changeSlider(e.target.value,true);
  });
  document.addEventListener("change",e=>{
    if(e.target.id==="tm-grade"){gradeFilter=e.target.value;renderHome();}
    if(e.target.id==="tm-skill"){skillFilter=e.target.value;renderHome();}
  });
  document.addEventListener("click",e=>{
    const btn=e.target.closest("[data-tm]");if(!btn)return;
    const action=btn.dataset.tm,id=getCurrent();
    if(!id)return;
    const m=lookup.get(id),d=draft(id,m);
    if(action==="minus"||action==="plus"){changeSlider(action==="minus"?-1:1);return;}
    if(["read","pred","counter","transfer","reflect"].includes(action)){
      if(action==="read"){d.read=Number(btn.dataset.i);if(d.read!==m.readAnswer)d.readMisses=(d.readMisses||0)+1;}
      if(action==="pred")d.pred=Number(btn.dataset.i);
      if(action==="counter")d.counter=btn.dataset.v==="true";
      if(action==="transfer")d.transfer=Number(btn.dataset.i);
      if(action==="reflect")d.reflection=Number(btn.dataset.i);
      save();renderMission(id);return;
    }
    if(action==="previous"){d.step=Math.max(0,d.step-1);save();renderMission(id);return;}
    if(action==="next"){
      const ready=d.step===0?d.read===m.readAnswer&&d.pred!==null:d.step===1?d.touched:d.step===2?d.counter!==null:d.step===3?d.transfer!==null:d.reflection!==null&&(d.note||"").trim().length>=6;
      if(!ready)return;
      if(d.step>=4){complete(id);return;}
      d.step++;save();renderMission(id);
    }
  });
})();
