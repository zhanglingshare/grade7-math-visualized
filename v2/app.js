(function(){
  'use strict';
  var course=window.MathCourse,M=window.MathLab,V=window.MathScenes,app=document.getElementById('app');
  if(!course||!M||!V){app.textContent='课程尚未加载完成，请刷新页面。';return;}
  var esc=V.esc,states={},frame=null,activePlayback=null,storageKey='grade7-math-visualized-v2',record={};
  try{record=JSON.parse(localStorage.getItem(storageKey)||'{}')||{};}catch(error){record={};}
  function save(){try{localStorage.setItem(storageKey,JSON.stringify(record));}catch(error){}updateHeader();}
  function entry(id){if(!record[id]||typeof record[id]!=='object')record[id]={seen:false,answers:[],reflection:'',status:''};return record[id];}
  function getLesson(id){return course.lessons.find(function(l){return l.id===id;})||course.lessons[0];}
  function getState(id){
    if(!states[id])states[id]={values:Object.assign({},V.defaults[id]),phase:'explore',question:0,played:false,animation:0,orderStep:0,secret:Math.floor(Math.random()*101)-50};
    return states[id];
  }
  function stopAnimation(){if(window.ChapterTwoStudio)window.ChapterTwoStudio.stop();if(window.ChapterOneStudio)window.ChapterOneStudio.stop();if(window.ChapterOne)window.ChapterOne.stop();if(frame!==null)cancelAnimationFrame(frame);frame=null;activePlayback=null;var pause=document.getElementById('pause-experiment');if(pause)pause.hidden=true;}
  function updateHeader(){
    var seen=course.lessons.filter(function(l){return entry(l.id).seen;}).length;
    document.getElementById('header-progress').textContent='原实验已体验 '+seen+' / '+course.lessons.length;
  }
  function chapterLabel(id){return id===1?'第一章':id===2?'第二章':'第三章';}
  function chapterName(id){var ch=course.chapters.find(function(c){return Number(c.id)===Number(id);});return ch?ch.title:'';}
  function navActive(name){document.querySelectorAll('[data-nav]').forEach(function(a){a.classList.toggle('active',a.dataset.nav===name);});}
  function lessonLink(id,label){return '<a href="#lab/'+id+'">'+esc(label||getLesson(id).title)+'</a>';}
  function renderRoute(){
    stopAnimation();
    var route=location.hash.replace(/^#/,'')||'chapter/1';
    var chapter=route.indexOf('chapter/')===0?Number(route.split('/')[1]):route.indexOf('lab/')===0?getLesson(route.split('/')[1]).chapter:0;
    var pnav=document.getElementById('navPracticeChapter');
    if(pnav){
      pnav.href=chapter===2?'../practice-bank.html':'../chapter1-practice.html';
      pnav.title=chapter===2?'第二章：156道有理数运算专项':'第一章：72道有理数基础专项';
    }
    document.querySelectorAll('[data-course-chapter]').forEach(function(a){if(Number(a.dataset.courseChapter)===chapter)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    if((route==='chapter/2'||route.indexOf('chapter/2/')===0)&&window.ChapterTwoStudio){navActive('chapter2');window.ChapterTwoStudio.render(app,route);return;}
    if(route.indexOf('chapter/1')===0&&window.ChapterOneStudio){navActive('chapter1');window.ChapterOneStudio.render(app,route);return;}
    if(route==='plan'){navActive('plan');renderPlan();return;}
    if(route==='notes'){navActive('notes');renderNotes();return;}
    navActive('lab');var targetLesson=getLesson(route.split('/')[1]);if(targetLesson.chapter===1&&route.split('/')[2])getState(targetLesson.id).phase='explore';renderLab(targetLesson.id);
  }
  function renderLab(id){
    var lesson=getLesson(id),state=getState(id),rec=entry(id),sameChapter=course.lessons.filter(function(l){return l.chapter===lesson.chapter;});
    document.body.dataset.activeChapter=lesson.chapter;
    var localIndex=sameChapter.findIndex(function(l){return l.id===id;});
    var chapterSymbol=lesson.chapter===1?'±':lesson.chapter===2?'×':'x';
    var chapterNav=course.chapters.map(function(ch){
      var selected=Number(ch.id)===lesson.chapter,first=course.lessons.find(function(l){return l.chapter===Number(ch.id);});
      return '<button type="button" class="chapter-btn '+(selected?'active':'')+'" data-chapter="'+ch.id+'" aria-pressed="'+selected+'"><span>'+ch.id+'</span><span><strong>'+esc(ch.title)+'</strong><small>'+esc(ch.subtitle)+'</small></span></button>';
    }).join('');
    app.innerHTML='<div class="workspace"><aside class="sidebar" aria-label="课程目录"><div class="sidebar-kicker">动手，把问题弄懂</div><div class="chapter-switch">'+chapterNav+'</div><nav class="lesson-list" aria-label="本章实验">'+sameChapter.map(function(l,i){return '<button type="button" class="lesson-btn '+(l.id===id?'active':'')+'" data-lesson="'+l.id+'" data-done="'+entry(l.id).seen+'" '+(l.id===id?'aria-current="page"':'')+'><span class="lesson-dot" aria-hidden="true">'+String(i+1).padStart(2,'0')+'</span>'+esc(l.title)+'</button>';}).join('')+'</nav><label class="mobile-lesson"><span class="sr-only">选择本章实验</span><select id="mobile-lesson-select">'+sameChapter.map(function(l,i){return '<option value="'+l.id+'" '+(l.id===id?'selected':'')+'>'+String(i+1).padStart(2,'0')+' · '+esc(l.title)+'</option>';}).join('')+'</select></label><div class="sidebar-note">每次做一两个实验就好。<br>允许暂停，也允许再来一次。</div></aside><main class="lesson-main"><header class="lesson-hero"><div class="hero-copy"><div class="hero-meta"><span class="hero-kicker">动手发现 · 讲清理由</span><span class="hero-count">实验 '+String(localIndex+1).padStart(2,'0')+' / '+String(sameChapter.length).padStart(2,'0')+'</span></div><div class="lesson-eyebrow"><span>'+chapterLabel(lesson.chapter)+' · '+esc(chapterName(lesson.chapter))+'</span><i class="eyebrow-dot"></i><span>'+esc(lesson.source)+'</span></div><h1>'+esc(lesson.title)+'</h1><p class="lesson-subtitle">'+esc(lesson.subtitle)+' '+esc(lesson.goal)+'</p></div><div class="hero-emblem" aria-hidden="true"><span class="emblem-ring"></span><span class="emblem-face">'+chapterSymbol+'</span><span class="emblem-corner"></span></div></header>'+(lesson.chapter===1&&window.ChapterOne?'<a class="s1-back-guide" href="#chapter/1">← 第一章逐步探索</a>'+window.ChapterOne.nav(id,(location.hash.split('/')[2]||((state.chapterOne||{}).mode))):'')+'<section class="lab-card" aria-label="'+esc(lesson.title)+'"><div class="phase-tabs" role="tablist" aria-label="学习环节">'+[['explore','动手实验'],['challenge','猜一猜'],['explain','讲一讲'],['paper','屏幕作答']].map(function(pair,i){return '<button type="button" role="tab" aria-selected="'+(state.phase===pair[0])+'" id="phase-'+pair[0]+'" aria-controls="phase-panel" data-phase="'+pair[0]+'" class="'+(state.phase===pair[0]?'active':'')+'"><span class="tab-index">0'+(i+1)+'</span>'+pair[1]+'</button>';}).join('')+'</div><div id="phase-panel" role="tabpanel" aria-labelledby="phase-'+state.phase+'"></div></section><details class="parent-tip"><summary>陪孩子时，可以这样问</summary><p>'+esc(lesson.talk[0])+'</p><p>'+esc(lesson.talk[1])+'</p><p><strong>留意：</strong>'+esc(lesson.misconception)+'</p><div class="source-note">'+esc(lesson.source)+'；实验与练习为本套课改编设计。</div></details><div class="lesson-bottom"><span class="source">'+(rec.seen?'这个实验已体验过。':'先猜结果，再让画面动起来。')+'</span>'+nextLink(id)+'</div></main></div>';
    document.querySelectorAll('[data-chapter]').forEach(function(button){button.addEventListener('click',function(){var first=course.lessons.find(function(l){return l.chapter===Number(button.dataset.chapter);});location.hash=Number(button.dataset.chapter)===2?'chapter/2':'lab/'+first.id;});});
    document.querySelectorAll('[data-lesson]').forEach(function(button){button.addEventListener('click',function(){location.hash='lab/'+button.dataset.lesson;});});
    document.getElementById('mobile-lesson-select').addEventListener('change',function(e){location.hash='lab/'+e.target.value;});
    document.querySelectorAll('[data-phase]').forEach(function(button){button.addEventListener('click',function(){stopAnimation();state.animation=state.played?1:0;state.phase=button.dataset.phase;renderLab(id);});});
    if(state.phase==='explore')renderExplore(lesson,state);
    else if(state.phase==='challenge')renderChallenge(lesson,state);
    else if(state.phase==='explain')renderExplain(lesson,state);
    else renderPaper(lesson,state);
    updateHeader();
    var map=document.querySelector('.c1-map'),current=map&&map.querySelector('[aria-current]');if(map&&current&&map.scrollWidth>map.clientWidth)map.scrollLeft+=current.getBoundingClientRect().left-map.getBoundingClientRect().left-(map.clientWidth-current.offsetWidth)/2;
  }
  function nextLink(id){
    var index=course.lessons.findIndex(function(l){return l.id===id;}),next=course.lessons[index+1];
    return next?'<a class="btn" href="#lab/'+next.id+'">下一个实验 →</a>':'<a class="btn" href="#plan">回到周六课表 →</a>';
  }
  function promptFor(lesson,state){
    var prompts={baseline:'换一个基准，先猜正负号。',classify:'这个数，应该进入哪个区域？',axis:'拖动点A，检查刻度与位置。',mirror:'翻到零点另一边，距离会改变吗？',compare:state.values.mode==='guess'?'先选一个数，再让比较帮你缩小范围。':'A和B，谁在右边？',add:'先猜最后的位置，再观察实际变化。',multiply:'乘数跨过0，积的方向怎样变化？',divide:'把商乘回去，能回到原数吗？',laws:'换一种运算过程，结果会变吗？',power:'括号里的负号，和外面的负号一样吗？',order:'下一步，先完成哪一部分？',notation:'换一种记法，或者换一种精度。',activities:'选一项活动，用规则解决问题。',expression:'括号圈住了什么？',proportion:'先找：什么保持不变？',substitute:'替换字母，保留运算关系。',geometry:'把图形拆开，就能读懂式子。',patterns:'再加一个图形，究竟增加了什么？',cipher:'规则相同，输入改变，输出跟着变。'};
    return prompts[lesson.id];
  }
  function controlsHtml(lesson,state){
    return V.controls(lesson.id,state.values).map(function(control){
      var value=state.values[control.key],id='control-'+control.key,field;
      if(control.type==='range')field='<input id="'+id+'" type="range" data-value="'+control.key+'" min="'+control.min+'" max="'+control.max+'" step="'+control.step+'" value="'+esc(value)+'">';
      else if(control.type==='select')field='<select id="'+id+'" data-value="'+control.key+'">'+control.options.map(function(option){return '<option value="'+esc(option[0])+'" '+(String(value)===String(option[0])?'selected':'')+'>'+esc(option[1])+'</option>';}).join('')+'</select>';
      else field='<input id="'+id+'" type="text" data-value="'+control.key+'" value="'+esc(value)+'" autocomplete="off" spellcheck="false">';
      return '<div class="control"><label for="'+id+'">'+esc(control.label)+(control.type==='range'?'<output id="output-'+control.key+'" for="'+id+'">'+M.decimal(Number(value))+'</output>':'')+'</label>'+field+'</div>';
    }).join('');
  }
  function playLabel(lesson,state){
    if(lesson.id==='order')return '从头再做';
    if(lesson.id==='compare'&&state.values.mode==='guess')return '用这个数来猜';
    if(lesson.id==='activities')return state.values.mode==='magic'?'检查幻方':state.values.mode==='ledger'?'计算并核对':'观察位值';
    return state.played?'再看一次':'播放实验';
  }
  function renderExplore(lesson,state){
    var panel=document.getElementById('phase-panel');
    if(lesson.chapter===1&&window.ChapterOne){window.ChapterOne.render(panel,lesson,state,{seen:function(){entry(lesson.id).seen=true;save();},phase:function(phase){stopAnimation();state.phase=phase;renderLab(lesson.id);}});return;}
    panel.innerHTML='<div class="experiment"><div class="experiment-top"><div><div class="experiment-label">你的数学实验台</div><p class="experiment-prompt">'+esc(promptFor(lesson,state))+'</p></div><span class="experiment-tag">先想一想 · 再动手</span></div><div class="control-grid">'+controlsHtml(lesson,state)+'</div><div class="stage" id="scene-stage"></div><div class="formula-strip" id="scene-formula" aria-live="off"></div><div class="experiment-actions"><button class="btn btn-primary" id="play-experiment" type="button">'+playLabel(lesson,state)+'</button><button class="btn" id="pause-experiment" type="button" hidden>暂停画面</button>'+(lesson.id==='compare'&&state.values.mode==='guess'?'<button class="btn" id="new-guess" type="button">新一轮</button>':'')+'<button class="btn" id="to-challenge" type="button">我来试三题 →</button><span class="action-hint">也可以暂停画面，用手指、纸条或草图重现。</span></div><div id="scene-result" class="result-line" aria-live="polite"></div></div>';
    panel.querySelectorAll('[data-value]').forEach(function(input){
      var eventName=input.tagName==='SELECT'?'change':'input';
      input.addEventListener(eventName,function(){setValue(lesson,state,input.dataset.value,input.type==='range'?Number(input.value):input.value);});
    });
    document.getElementById('play-experiment').addEventListener('click',function(){playExperiment(lesson,state);});
    document.getElementById('pause-experiment').addEventListener('click',function(){
      if(!activePlayback)return;
      var pb=activePlayback;
      if(pb.paused){pb.paused=false;pb.started=performance.now();this.textContent='暂停画面';frame=requestAnimationFrame(pb.tick);}
      else{pb.elapsed+=performance.now()-pb.started;pb.paused=true;if(frame!==null)cancelAnimationFrame(frame);frame=null;this.textContent='继续播放';}
    });
    document.getElementById('to-challenge').addEventListener('click',function(){state.phase='challenge';stopAnimation();renderLab(lesson.id);});
    var newGuess=document.getElementById('new-guess');
    if(newGuess)newGuess.addEventListener('click',function(){state.secret=Math.floor(Math.random()*101)-50;state.guessLow=-50;state.guessHigh=50;state.guessMessage='';state.guessCount=0;state.guessSolved=false;state.played=false;renderExplore(lesson,state);});
    renderScene(lesson,state,true);
  }
  function setValue(lesson,state,key,value,played){
    stopAnimation();state.values[key]=value;state.played=!!played;state.animation=played?1:0;
    if(lesson.id==='notation'&&key==='mode')state.values.raw=value==='science'?'696000':'1.804';
    if(lesson.id==='order'&&key==='example'){state.orderStep=0;state.orderMessage='';}
    if(lesson.id==='compare'&&key==='mode'&&value==='guess'){state.guessLow=-50;state.guessHigh=50;state.guessCount=0;state.guessMessage='';state.guessSolved=false;}
    var needsControls=key==='mode'||key==='law'||key==='group'||key==='kind'||key==='example';
    if(needsControls)renderExplore(lesson,state);
    else{
      var output=document.getElementById('output-'+key);if(output)output.textContent=M.decimal(Number(value));
      var input=document.getElementById('control-'+key);if(input&&input.value!==String(value))input.value=value;
      renderScene(lesson,state,true);
      var play=document.getElementById('play-experiment');if(play){play.disabled=false;play.textContent=playLabel(lesson,state);}
    }
  }
  function sceneAction(lesson,state,type,data){
    if(type==='drag'){
      state.values[data.key]=data.value;
      var input=document.getElementById('control-'+data.key),out=document.getElementById('output-'+data.key);
      if(input)input.value=data.value;if(out)out.textContent=M.decimal(data.value);
      document.getElementById('scene-formula').textContent='A表示 '+M.decimal(data.value)+' · 距离0为 '+M.decimal(Math.abs(data.value));
      return;
    }
    if(type==='set'){setValue(lesson,state,data.key,data.value,data.played);return;}
    if(type==='dirty'){
      stopAnimation();state.played=false;state.animation=0;
      var playDirty=document.getElementById('play-experiment');playDirty.disabled=false;playDirty.textContent=playLabel(lesson,state);
      document.getElementById('scene-formula').textContent='输入已改变，重新计算并核对。';
      document.getElementById('scene-result').textContent='先预测这笔变化会怎样影响结果。';
      return;
    }
    if(type==='magicHint'){state.values.cell0='3';state.values.cell1='-2';state.values.cell2='-1';state.played=false;renderScene(lesson,state,true);return;}
    if(type==='orderChoice'){
      var example=M.orderCases[Number(state.values.example)],step=example.steps[state.orderStep||0];
      if(step.done)return;
      if(data.index===step.answer){state.orderMessage=step.why;state.orderStep=(state.orderStep||0)+1;entry(lesson.id).seen=true;save();}
      else state.orderMessage='再看一眼运算关系。'+(Number(state.values.example)===2?'乘除同级，从左到右。':'先处理括号内的内容，再按乘方、乘除、加减的次序。');
      renderScene(lesson,state,true);
    }
  }
  function renderScene(lesson,state,announce){
    var root=document.getElementById('scene-stage');if(!root)return;
    var result=V.render(root,lesson.id,state,function(type,data){sceneAction(lesson,state,type,data);});
    document.getElementById('scene-formula').innerHTML='<span>'+result.formula+'</span>';
    var detail=document.getElementById('scene-result');
    detail.classList.toggle('error',!!result.error);
    if(announce||state.animation===1)detail.textContent=result.detail;
  }
  function playExperiment(lesson,state){
    stopAnimation();
    document.querySelectorAll('#phase-panel [data-value]').forEach(function(input){state.values[input.dataset.value]=input.type==='range'?Number(input.value):input.value;});
    document.querySelectorAll('#phase-panel [data-entry]').forEach(function(input){state.values['entry'+input.dataset.entry]=input.value;});
    document.querySelectorAll('#phase-panel [data-cell]').forEach(function(input){state.values['cell'+input.dataset.cell]=input.value;});
    if(lesson.id==='compare'&&state.values.mode==='guess'){
      if(state.guessSolved){state.guessMessage='已经猜中了，点“新一轮”再开始。';renderScene(lesson,state,true);return;}
      var guess=Number(state.values.guess),lo=state.guessLow===undefined?-50:state.guessLow,hi=state.guessHigh===undefined?50:state.guessHigh;
      state.guessCount=(state.guessCount||0)+1;
      if(guess===state.secret){state.guessMessage='相等！你猜中了 '+guess+'。';state.guessSolved=true;state.guessLow=guess;state.guessHigh=guess;}
      else if(guess<state.secret){state.guessMessage='小了，目标比'+guess+'大。';state.guessLow=Math.max(lo,guess+1);state.guessHigh=hi;}
      else{state.guessMessage='大了，目标比'+guess+'小。';state.guessHigh=Math.min(hi,guess-1);state.guessLow=lo;}
      state.played=true;state.animation=1;entry(lesson.id).seen=true;save();renderScene(lesson,state,true);return;
    }
    if(lesson.id==='order'){state.orderStep=0;state.orderMessage='从第一步重新开始，由你选择。';state.played=true;state.animation=1;renderScene(lesson,state,true);return;}
    state.played=true;state.animation=0;entry(lesson.id).seen=true;save();
    var play=document.getElementById('play-experiment');play.textContent='正在变化…';play.disabled=true;
    var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var immediate=['axis','divide','laws','expression','activities'].indexOf(lesson.id)>=0;
    var duration=lesson.id==='power'?2600:1800;
    function complete(){state.animation=1;renderScene(lesson,state,true);if(document.getElementById('play-experiment')){document.getElementById('play-experiment').disabled=false;document.getElementById('play-experiment').textContent=playLabel(lesson,state);}var pauseDone=document.getElementById('pause-experiment');if(pauseDone)pauseDone.hidden=true;frame=null;activePlayback=null;}
    if(reduced||immediate){complete();return;}
    var pb={duration:duration,started:performance.now(),elapsed:0,paused:false,tick:null};activePlayback=pb;
    var pauseButton=document.getElementById('pause-experiment');pauseButton.hidden=false;pauseButton.textContent='暂停画面';
    function step(now){
      if(pb!==activePlayback||pb.paused)return;
      state.animation=Math.min(1,(pb.elapsed+now-pb.started)/duration);
      renderScene(lesson,state,false);
      if(state.animation>=1){complete();return;}
      frame=requestAnimationFrame(step);
    }
    pb.tick=step;
    renderScene(lesson,state,true);frame=requestAnimationFrame(step);
  }
  function renderChallenge(lesson,state){
    var index=Math.max(0,Math.min(state.question,lesson.questions.length-1)),question=lesson.questions[index],rec=entry(lesson.id);
    if(!Array.isArray(rec.answers))rec.answers=[];
    var selected=rec.answers[index],answered=selected!==undefined&&selected!==null;
    var panel=document.getElementById('phase-panel');
    panel.innerHTML='<div class="phase-body"><div class="question-count">独立判断 · '+(index+1)+' / '+lesson.questions.length+'</div><h2 class="question-title">'+esc(question.prompt)+'</h2><div class="answer-options">'+question.options.map(function(option,i){return '<button type="button" class="answer-option '+(answered&&i===question.correct?'is-correct':answered&&i===selected?'is-wrong':'')+'" data-answer="'+i+'" '+(answered?'disabled':'')+'><span>'+String.fromCharCode(65+i)+'</span><span>'+esc(option)+'</span></button>';}).join('')+'</div>'+(answered?'<div class="answer-explanation" aria-live="polite">'+(selected===question.correct?'这一步判断得对。':'看看这一步的依据。')+' '+esc(question.explanation)+'</div>':'<p class="phase-intro">先自己选。需要时，可以在屏幕草稿区写写画画。</p>')+'<div class="question-actions"><button class="btn" type="button" id="previous-question" '+(index===0?'disabled':'')+'>上一题</button>'+(answered?'<button class="btn" type="button" id="retry-question">再想一次</button>':'')+'<button class="btn btn-primary" type="button" id="next-question">'+(index===lesson.questions.length-1?'把理由讲出来 →':'下一题 →')+'</button></div></div>';
    panel.querySelectorAll('[data-answer]').forEach(function(button){button.addEventListener('click',function(){rec.answers[index]=Number(button.dataset.answer);save();renderChallenge(lesson,state);});});
    document.getElementById('previous-question').addEventListener('click',function(){state.question=index-1;renderChallenge(lesson,state);});
    var retry=document.getElementById('retry-question');if(retry)retry.addEventListener('click',function(){rec.answers[index]=null;save();renderChallenge(lesson,state);});
    document.getElementById('next-question').addEventListener('click',function(){if(index===lesson.questions.length-1){state.phase='explain';renderLab(lesson.id);}else{state.question=index+1;renderChallenge(lesson,state);}});
  }
  function renderExplain(lesson,state){
    var rec=entry(lesson.id),panel=document.getElementById('phase-panel');
    panel.innerHTML='<div class="phase-body"><div class="question-count">把你的想法说出来</div><h2>用自己的话，讲清一件事。</h2><p class="phase-intro">可以先在屏幕上画图，再用自己的话讲清楚。家长先听完，再给一个小提示。</p>'+lesson.talk.map(function(prompt){return '<div class="talk-prompt">'+esc(prompt)+'</div>';}).join('')+'<label for="reflection" class="inline-label">也可以把发现记在这里（选填）</label><textarea id="reflection" class="reflection" placeholder="我先发现……，因为……">'+esc(rec.reflection||'')+'</textarea><p class="save-hint">这段记录保存在当前浏览器。</p><details class="answer-detail"><summary>家长参考：可以听哪些依据</summary>'+lesson.why.map(function(reason){return '<p>'+esc(reason)+'</p>';}).join('')+'</details><div class="question-actions"><button class="btn" id="back-explore" type="button">回到实验</button><button class="btn btn-primary" id="to-paper" type="button">收起画面，试'+lesson.paper.length+'题 →</button></div></div>';
    document.getElementById('reflection').addEventListener('input',function(e){rec.reflection=e.target.value.slice(0,3000);save();});
    document.getElementById('back-explore').addEventListener('click',function(){state.phase='explore';renderLab(lesson.id);});
    document.getElementById('to-paper').addEventListener('click',function(){state.phase='paper';renderLab(lesson.id);});
  }
  function statusButtons(id){
    var value=entry(id).status;
    return '<div class="status-group">'+[['help','仍需提示'],['today','当天能独立'],['review','隔周仍会做']].map(function(pair){return '<button class="btn '+(value===pair[0]?'active':'')+'" type="button" data-status="'+pair[0]+'" data-record-id="'+id+'" aria-pressed="'+(value===pair[0])+'">'+pair[1]+'</button>';}).join('')+'</div>';
  }
  function wireStatus(root){
    root.querySelectorAll('[data-status]').forEach(function(button){button.addEventListener('click',function(){entry(button.dataset.recordId).status=button.dataset.status;save();button.parentElement.querySelectorAll('button').forEach(function(peer){var active=peer===button;peer.classList.toggle('active',active);peer.setAttribute('aria-pressed',String(active));});});});
  }
  function renderPaper(lesson,state){
    var panel=document.getElementById('phase-panel');
    panel.innerHTML='<div class="phase-body"><div class="question-count">收起动画 · 换一道题</div><h2>现在，换你自己来。</h2><p class="phase-intro">直接在平板或手机上书写、输入，再展开参考答案。画图和解释也是答案的一部分。</p>'+lesson.paper.map(function(task,i){return '<div class="paper-task"><p>'+(i+1)+'. '+esc(task.prompt)+'</p><div class="paper-space" aria-hidden="true"></div><details class="answer-detail"><summary>完成后，再看参考</summary><p>'+esc(task.answer)+'</p></details></div>';}).join('')+'<div class="status-title no-print">家长记录：这次完成时，孩子需要多少帮助？</div>'+statusButtons(lesson.id)+'<p class="save-hint">体验记录与独立完成分开保存；这些标记由家长根据实际表现选择。</p><div class="question-actions no-print">'+nextLink(lesson.id)+'</div></div>';
    wireStatus(panel);
  }
  function renderPlan(){
    app.innerHTML='<main class="page"><div class="page-kicker">每个周六，多弄懂一点</div><h1>每周六，弄懂一点。</h1><p class="page-intro">先按10次课排。每次两小时包含休息，完成速度随孩子调整。一个卡点可以多用一周；进位制、幻方与密码留作有余力时的拓展。</p><div class="rhythm"><div><span>0—45分钟</span><strong>旧题回访，预测与操作</strong></div><div><span>45—55分钟</span><strong>屏幕书写、画图与解释</strong></div><div><span>55—65分钟</span><strong>离桌休息</strong></div><div><span>65—120分钟</span><strong>改条件、独立做题、说理由</strong></div></div><div class="session-grid">'+course.sessions.map(function(session,i){return '<article class="session-card"><span class="session-no">第 '+String(i+1).padStart(2,'0')+' 次周六课</span><h2>'+esc(session.title)+'</h2><p>'+esc(session.focus)+'</p><div class="session-links">'+session.lessons.map(function(id){return lessonLink(id);}).join('')+'</div><div class="offline-task"><strong>离开屏幕后：</strong>'+esc(session.offlineTask)+'</div></article>';}).join('')+'</div></main>';
  }
  function renderNotes(){
    var statuses={help:'仍需提示',today:'当天能独立',review:'隔周仍会做'};
    app.innerHTML='<main class="page"><div class="page-kicker">给陪在身边的你</div><h1>鼠标和笔，交给孩子。</h1><p class="page-intro">先观察他的第一步。卡住时给一个小提示，再让他接着做。反馈说到具体动作：“你找到了基准”“你代入负数时保留了括号”。</p><div class="notes-grid"><section class="note-card"><h2>第一堂课，先找一个卡点。</h2><p>下面六道是小学基础回访，按孩子已经学过的内容选择。请他边做边说，记录“独立完成／一次提示／需要示范”。</p>'+course.diagnostic.map(function(q,i){return '<details><summary>'+(i+1)+'. '+esc(q.prompt)+'</summary><p>参考：'+esc(q.options[q.correct])+'。'+esc(q.explanation)+'</p></details>';}).join('')+'<h2 style="margin-top:26px">每次只改一个条件。</h2><ul><li>播放前先猜；看到结果后，比较哪里与原来的想法不同。</li><li>在屏幕草稿区画图，或在原实验中移动图形验证。</li><li>最后关掉提示，独立做题；下周再用旧题回访。</li></ul><a class="btn" href="parent-guide.md" download>下载家长课表与答案</a></section><section class="note-card"><h2>本机学习记录</h2><p>“体验过”只表示操作过。是否能独立完成，由你根据屏幕书写和解释记录。</p><div class="progress-list">'+course.lessons.map(function(lesson){var rec=entry(lesson.id),answered=(rec.answers||[]).filter(function(a){return a!==null&&a!==undefined;}).length;return '<div class="progress-row">'+lessonLink(lesson.id)+'<small>'+(rec.seen?'已体验':'尚未体验')+' · 已作答 '+answered+'/'+lesson.questions.length+' · '+(statuses[rec.status]||'独立表现待观察')+'</small>'+statusButtons(lesson.id)+'</div>';}).join('')+'</div></section></div><section class="note-card" style="margin-top:24px"><h2>这套课覆盖什么</h2><p>依据上传的人教版七年级数学上册，逐节核对第一至第三章（原书1—87页）后编排。第三章包括正反比例、列式与代入；整式加减和系统解方程留待后续章节。原书PDF中的插入广告未纳入课程，页面不转载整本教材。</p><p>动画用于观察和检验想法。乘法翻转图、面积图都有各自适用的范围；理由仍要回到数轴、运算律、数量关系和图形结构。不同数字都试过，也不自动等于证明了一般规律。</p><p class="save-hint">学习记录保存在当前浏览器，换设备不会自动同步。</p></section></main>';
    wireStatus(app);
  }
  window.addEventListener('hashchange',function(){renderRoute();window.scrollTo({top:0,behavior:'auto'});});
  var resizeTimer;
  window.addEventListener('resize',function(){clearTimeout(resizeTimer);resizeTimer=setTimeout(function(){var route=location.hash.replace(/^#/,'')||'lab/baseline';if(route.indexOf('lab/')===0){var lesson=getLesson(route.split('/')[1]),state=getState(lesson.id);if(state.phase==='explore')renderScene(lesson,state,false);}},120);});
  renderRoute();
})();

