(function (global) {
  'use strict';
  var M = global.MathLab;
  var storageKey = 'grade7-math-chapter-one-studio-v1';
  var active = null, memory = {}, record = {}, storageOK = true;
  var palette = {blue:'#64d7ff', gold:'#ffe17b', ink:'#eaf2ff', soft:'#9daecb', line:'#516482', orange:'#ff9d7d'};
  var lessons = [
    {id:'signed', no:'01', section:'1.1', name:'正数和负数', title:'同一个位置，为什么变了符号？', intro:'固定小球，换一个零点。亲手看看正负号由什么决定。', pages:'2—6', icon:'±', old:'baseline', modes:[['reference','换一个零点'],['direction','换正方向'],['tolerance','允许偏差']], steps:['选定基准','换个约定','抽出数轴','理解零点','屏幕作答'], definition:'大于0的数是正数；在正数前添上负号得到负数。0既不是正数，也不是负数。', takeaway:'先说清基准和正方向，再解释这个数。', paper:[['以2500克为标准，多65克、少30克和恰好达标，各怎样表示偏差？','+65克、−30克、0克。0克表示没有偏差，产品仍有质量。'],['约定向右为正。点A在基准左侧2米，怎样记录？若改为向左为正呢？','原约定记−2米；改变约定后记+2米。实际位置保持不动。']]},
    {id:'rational', no:'02', section:'1.2.1', name:'有理数的概念', title:'写法不同，还能是同一个数？', intro:'拆开一张数字卡，看看它的数值，再给它找到正确的家。', pages:'7—8', icon:'½', old:'classify', modes:[['sign','按正负分'],['family','整数与非整数']], steps:['先看数值','把零放对','循环的写法','换种分类','屏幕作答'], definition:'可以写成分数形式的数称为有理数。这里的分子、分母都是整数，分母不能为0。', takeaway:'分类看数值；整数也能写成分数形式。', paper:[['把0、2.0、6/3、−3/4、0.333…（3循环）分成整数与非整数有理数两组。','整数：0、2.0、6/3；非整数有理数：−3/4、0.333…（3循环）。'],['再按正数、零、负数分类。两种分类方法有什么不同？','正数：2.0、6/3、0.333…；零：0；负数：−3/4。一种看是否为整数，一种看正负。']]},
    {id:'axis', no:'03', section:'1.2.2', name:'数轴', title:'把一条街，变成一条数轴。', intro:'车站、方向、一米的长度，怎样让每一个位置都有一个数？', pages:'8—11', icon:'↔', old:'axis', modes:[['build','搭一条数轴'],['locate','把点放对']], steps:['从街道出发','三个约定','读清每一格','亲手放点','屏幕作答'], definition:'规定了原点、正方向和单位长度的直线叫作数轴。', takeaway:'先找0、方向和每格大小，再读点或放点。', paper:[['画一条数轴，每格表示0.5，标出−2.5、0、1.5。','从左到右为−2.5、0、1.5。−2.5在原点左侧5格；1.5在右侧3格。'],['点A表示−3，沿数轴向某一方向移动4个单位到达B。B可能表示什么数？','向右到1，向左到−7；题目没有规定方向，应考虑两种情况。']]},
    {id:'opposite', no:'04', section:'1.2.3', name:'相反数', title:'位置对称，什么没有变？', intro:'把点翻到原点另一侧，保留原位置，再量一量两边的距离。', pages:'11—12', icon:'⇄', old:'mirror', modes:[['opposite','连续取相反数']], steps:['找对称位置','再取一次','零会去哪里','读懂字母','屏幕作答'], definition:'只有符号不同的两个数互为相反数。0的相反数是0。一般地，a和−a互为相反数。', takeaway:'−a表示a的相反数；a可以是正数、负数或0。', paper:[['分别求−2.5、0、3的相反数，并标在同一条数轴上。','依次为2.5、0、−3。每对数所对应的点关于原点对称。'],['若a=−4，求−a和−(−a)。为什么不能一看见负号就说它是负数？','−a=4，−(−a)=−4。−a表示取相反数，结果取决于a的值。']]},
    {id:'absolute', no:'05', section:'1.2.4', name:'绝对值', title:'位置有正负，距离呢？', intro:'移动一个点，同时追踪它的位置和到原点的距离。', pages:'13—14', icon:'|a|', old:'mirror', modes:[['absolute','量到原点的距离'],['inverse','已知距离找数']], steps:['量到零的距离','找另一个点','已知距离找数','位置与距离','屏幕作答'], definition:'数轴上表示数a的点与原点的距离叫作数a的绝对值，记作|a|。', takeaway:'正数的绝对值是本身；负数的绝对值是它的相反数；0的绝对值是0。', paper:[['分别找出满足|x|=2.5、|x|=0、|x|=−2的所有数。','依次为：x=2.5或−2.5；x=0；没有符合条件的数。'],['若a分别为−3、0、2，求|a|，并在数轴上说明。','依次为3、0、2。距离非负；当a为负数时，|a|=−a，此时−a是正数。']]},
    {id:'order', no:'06', section:'1.2.5', name:'有理数的大小比较', title:'离零更远，就一定更大吗？', intro:'分别比较数值和距离，再把几个数排到同一条数轴上。', pages:'14—17', icon:'<>', old:'compare', modes:[['order','谁在右边'],['closest','谁最接近标准'],['interval','区间里的整数'],['guess','猜数缩小范围']], steps:['比较数值','比较距离','给几个数排序','再靠近一点','屏幕作答'], definition:'在水平数轴上，左边的数小于右边的数。正数大于0，0大于负数；两个负数，绝对值大的反而小。', takeaway:'比较数值看左右；比较绝对值看离原点多远。', paper:[['把−3、2、0、−1.5从小到大排列，再指出绝对值最大的数。','−3<−1.5<0<2。绝对值最大的是−3。'],['写出−3与4之间不包括端点的所有整数。−1与0之间还有有理数吗？','−2、−1、0、1、2、3。−1与0之间有−0.5、−0.25等有理数，但没有整数。']]}
  ];
  var samples = [
    {raw:'6/3', label:'6/3', value:2, fraction:'2/1', integer:true, sign:1, visual:[6,3]},
    {raw:'2.0', label:'2.0', value:2, fraction:'2/1', integer:true, sign:1, visual:[2,1]},
    {raw:'0', label:'0', value:0, fraction:'0/1', integer:true, sign:0, visual:[0,1]},
    {raw:'-3/4', label:'−3/4', value:-.75, fraction:'−3/4', integer:false, sign:-1, visual:[3,4]},
    {raw:'1/3', label:'0.333…（3循环）', value:1/3, fraction:'1/3', integer:false, sign:1, visual:[1,3]},
    {raw:'17/200', label:'8.5%', value:.085, fraction:'17/200', integer:false, sign:1, visual:null},
    {raw:'-3', label:'−3', value:-3, fraction:'−3/1', integer:true, sign:-1, visual:[3,1]}
  ];
  var initial = {signed:{height:3,zero:0,direction:1}, rational:{sample:'6/3'}, axis:{origin:false,arrow:false,spacing:false,unit:.5,cursor:0,target:-2.5}, opposite:{a:-3,flips:1}, absolute:{a:-3,radius:2.5}, order:{a:-5,b:-2,between:-.5}};
  function number(n) { return String(Object.is(n,-0)?0:Number(Number(n).toFixed(4))).replace('-','−'); }
  function signed(n) { return n>0?'+'+number(n):number(n); }
  function esc(s) { return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function find(id) { return lessons.find(function(l){return l.id===id;})||lessons[0]; }
  function sampleFor(raw) { return samples.find(function(s){return s.raw===raw;})||samples[0]; }
  function relative(v) { return (v.height-v.zero)*v.direction; }
  function flip(a,times) { return a===0?0:a*(times%2?-1:1); }
  function countAt(r) { return r<0?0:r===0?1:2; }
  function distance(a,b) { return Math.abs(a-b); }
  function fractionPosition(value,unit) { return value/unit; }
  function q(prompt,options,correct,why,hint) { return {prompt:prompt,options:options,correct:correct,why:why,hint:hint||'对照图中的原点、位置和长度，再试一次。'}; }
  function numericQ(prompt,n,why,hint) { var choices=[n,-n,n===0?1:0,n+1].filter(function(a,i,all){return all.indexOf(a)===i;}).slice(0,3).sort(function(a,b){return a-b;});return q(prompt,choices.map(number),choices.indexOf(n),why,hint); }
  function questionFor(id,step,v) {
    var value, s;
    if(id==='signed') {
      value=relative(v);
      if(step===0||step===1)return numericQ('按现在的基准和方向，小球的位置记作多少？',value,'小球固定在高度'+number(v.height)+'，把高度'+number(v.zero)+'记作0；'+(v.direction===1?'向上':'向下')+'为正，所以记作'+signed(value)+'。','先比较小球与零点，再看约定哪个方向为正。');
      if(step===2)return q('小球固定，改变零点以后，什么可能变化？',['小球实际位置','相对位置的数值','小球的颜色'],1,'基准改变，相对位置的数值可能改变，小球并没有移动。','分别指一指固定的小球与作为0的基准。');
      return q('温度为0℃，这句话应该怎样理解？',['没有温度','一个确定的温度，既不是正数也不是负数','属于正数'],1,'0℃是确定的温度。0还可以表示基准或恰好达标，不只表示“没有”。','0可以表示基准，想一想温度计的0刻度。');
    }
    if(id==='rational') {
      s=sampleFor(v.sample);
      if(step===0)return q('只看这张卡的数值，它属于哪一类？',['整数','非整数有理数'],s.integer?0:1,'它可以写成'+s.fraction+'，'+(s.integer?'数值是整数。':'数值不是整数。')+'分类要看值。','先把不同的写法换成同一个数值。');
      if(step===1)return q('0应该放在哪里？',['正整数','负整数','属于整数，既不是正数也不是负数'],2,'0属于整数，在正、负、零的分类中单独成一组。','整数包括正整数、0和负整数。');
      if(step===2)return q('0.333…（3无限循环）与哪个数相等？',['1/3','3/10','不是有理数'],0,'3无限循环的小数等于1/3，所以是有理数。有限小数和无限循环小数都可以写成分数形式。','把1平均分成3份，每份是1/3。');
      return q('现在按正、负、零分类，这张卡放哪一组？',['负有理数','0','正有理数'],s.sign+1,'按符号分类时看正负；按整数与非整数分类时看数值是否为整数。两种分类要分别使用。','先判断它与0的大小关系。');
    }
    if(id==='axis') {
      if(step===0)return q('以车站为0，向东为正。西侧3米处的树，记作多少？',['−3','0','3'],0,'西与约定的正方向相反，因此用−3表示。','先从车站出发，再辨认东和西。');
      if(step===1){var good=v.origin&&v.arrow&&v.spacing;return q('现在的图，具备数轴的三个约定吗？',['已经具备','还缺要素'],good?0:1,good?'原点、正方向、单位长度都已规定。':'还缺：'+[!v.origin?'原点':'',!v.arrow?'正方向':'',!v.spacing?'单位长度':''].filter(Boolean).join('、')+'。','检查三个开关，每一个约定都有作用。');}
      if(step===2)return numericQ('从0向右数3个大格，这个点表示多少？',3*v.unit,'每大格表示'+number(v.unit)+'，向右3格表示'+number(3*v.unit)+'。','先看每格表示多少，不能直接把格数当数值。');
      return {prompt:'把蓝点A放到'+number(v.target)+'，再核对。',options:[],correct:0,operation:true,good:v.cursor===v.target,why:'每格表示'+number(v.unit)+'；蓝点在'+number(v.cursor)+'，目标是'+number(v.target)+'。',hint:'先找0，再按每格的数值向左数；可以拖动蓝点，也可以移动滑块。'};
    }
    if(id==='opposite') {
      if(step<=2)return numericQ('a='+number(v.a)+'，连续取'+v.flips+'次相反数，最后是多少？',flip(v.a,v.flips),'每次关于原点对称，离原点的距离保持为'+number(Math.abs(v.a))+'。'+(v.a===0?'0仍在原点。':v.flips%2?'奇数次到相反的位置。':'偶数次回到原来的位置。'),'保留原位置，每次只取一次相反数。');
      return q('“−a一定是负数”，这句话对吗？',['对，看见负号就是负数','不对，a为负数时−a为正数','只有a=0时不对'],1,'例如a=−3时，−a=3。字母a可以表示正数、负数或0。','把a换成一个负数，再读−a。');
    }
    if(id==='absolute') {
      if(step===0)return numericQ('a='+number(v.a)+'，它到原点的距离是多少？',Math.abs(v.a),'|'+number(v.a)+'|='+number(Math.abs(v.a))+'。绝对值表示到原点的距离，距离非负。','用尺线量到0的长度，位置的正负不改变距离的非负性。');
      if(step===1)return numericQ('哪个数与'+number(v.a)+'互为相反数，并且到0一样远？',flip(v.a,1),'a和−a互为相反数，|a|=|−a|。当a=0时，它们是同一个数0。','寻找关于原点对称的位置。');
      if(step===2)return q('|a|='+number(v.radius)+'，这样的数有几个？',['0个','1个','2个'],countAt(v.radius),v.radius<0?'距离不能为负，所以没有。':v.radius===0?'只有原点到自己的距离为0，所以只有一个数0。':'原点两侧各有一个，分别是'+number(-v.radius)+'和'+number(v.radius)+'。','分别试一试正距离、0和负距离。');
      return q('−3和3的数值与绝对值，哪句正确？',['数值相等，绝对值相等','−3<3，绝对值相等','−3<3，且|−3|<|3|'],1,'−3在3左侧，但两点到0都相距3个单位。','比较数值看左右；比较绝对值看距离。');
    }
    if(step===0)return q('A='+number(v.a)+'，B='+number(v.b)+'，比较它们的数值。',['A < B','A = B','A > B'],v.a<v.b?0:v.a===v.b?1:2,'在水平数轴上，右边的数更大。','分别指出A、B，谁更靠右？');
    if(step===1)return q('A='+number(v.a)+'，B='+number(v.b)+'，比较绝对值。',['|A| < |B|','|A| = |B|','|A| > |B|'],Math.abs(v.a)<Math.abs(v.b)?0:Math.abs(v.a)===Math.abs(v.b)?1:2,'A到0距离'+number(Math.abs(v.a))+'，B到0距离'+number(Math.abs(v.b))+'。','这次比较长度，不能直接沿用数值大小的答案。');
    if(step===2)return q('把−3、2、0、−1.5从小到大排列。',['−3 < −1.5 < 0 < 2','−1.5 < −3 < 0 < 2','0 < −1.5 < 2 < −3'],0,'数轴从左到右依次是−3、−1.5、0、2。','先按负数、0、正数分组，再比较两个负数。');
    return q('−1与0之间，有哪些数？',['没有任何数','有负整数','有负有理数，但没有整数'],2,'例如−0.5、−0.25都在其间。最大的负整数是−1；负有理数可以继续靠近0。','把−1到0这一段放大，再把蓝点放进去。');
  }
  function valuesFor(id,step) {var v=Object.assign({},initial[id]);if(id==='signed'&&step===1)v.direction=-1;if(id==='signed'&&step===3){v.height=0;v.zero=0;}if(id==='rational'&&step===1)v.sample='0';if(id==='rational'&&step===2)v.sample='1/3';if(id==='opposite'&&step===1)v.flips=2;if(id==='opposite'&&step===2)v.a=0;return v;}
  var guidance = {
    signed:[['小球保持不动。移动紫色的基准线。','看看同一个位置，怎样由正数变成0，再变成负数。'],['基准与物体不变，换成“向下为正”。','正负号还与方向的约定有关。'],['把场景逐渐收起，留下位置和约定。','生活中的基准、方向、长度，分别变成数轴上的约定。'],['0可以表示基准、没有变化、恰好达标。','温度为0℃，并不表示没有温度。']],
    rational:[['同样大小的一份，三个拼成一个整体。','6份，每3份拼一个整体，正好是两个整体。'],['把0放进数的家族。','它属于整数；按符号分时，它自己成一组。'],['1被平均分成3份。取其中一份。','1/3也可以写成0.333…，这里的3无限循环。'],['同一张数字卡，用两种方法看。','先看它的数值是否为整数，再看它是正、负还是0。']],
    axis:[['以车站为基准，向东为正。','树在西侧3米，另一个位置在东侧3米。'],['给直线逐项加上约定。','缺少其中任何一项，都不能按本课的约定确定数轴。'],['移动滑块，改变每个大格的数值。','三个大格不一定表示3。先看每格代表多少。'],['先读目标，再把点放到数轴上。','拖动蓝点或使用滑块；橙色目标在核对后出现。']],
    opposite:[['保留原点与原位置，再取相反数。','两点在原点两侧，到原点的距离相同。'],['连续取两次相反数。','第一次到另一侧，第二次回到原位置。'],['把a改成0，再取相反数。','原点关于自己对称，仍是原点。'],['让a在正数、0、负数之间变化。','观察−a；字母前的负号表示“取相反数”。']],
    absolute:[['蓝点表示位置，金色尺线表示长度。','从点到原点量一量，长度可以是负数吗？'],['找到到原点一样远的两个位置。','非零时原点两侧各一个；0只对应原点。'],['把距离分别改成正数、0和负数。','先判断个数，核对后再显示所有落点。'],['两点一起看，分别回答两个问题。','数值按左右比较；绝对值按距离比较。']],
    order:[['两个点都在原点左侧。','向右更靠近0的那个负数，数值更大。'],['保留这两个点，展开两条距离线。','你会看到：数值更小的负数，绝对值反而更大。'],['把四个数放在同一条数轴上。','先猜排列，再核对点从左到右的顺序。'],['把−1到0的一小段放大。','拖动蓝点，找几个处在两者之间的负有理数。']]
  };
  function loadRecord(){try{var r=JSON.parse(global.localStorage.getItem(storageKey)||'{}');record=r&&typeof r==='object'&&!Array.isArray(r)?r:{};}catch(e){record={};storageOK=false;}}
  function saveRecord(){try{global.localStorage.setItem(storageKey,JSON.stringify(record));storageOK=true;}catch(e){storageOK=false;}}
  function lessonRecord(id){if(!record[id]||typeof record[id]!=='object')record[id]={};if(!Array.isArray(record[id].checked))record[id].checked=[];return record[id];}
  function stateFor(id,step){var key=id+'/'+step;if(!memory[key])memory[key]={v:valuesFor(id,step),answer:null,checked:false,attempts:0,message:'',p:0};return memory[key];}
  function path(id,step){return '#chapter/1/'+id+'/'+(step||0);}
  function button(label,id,primary){return '<button type="button" class="s1-button '+(primary?'s1-primary':'')+'" id="'+id+'">'+label+'</button>';}
  function routeLink(label,url,extra){return '<a class="s1-button '+(extra||'')+'" href="'+url+'">'+label+'</a>';}
  function shell(content){return '<main class="s1-shell">'+content+'</main>';}
  function breadcrumbs(label){return '<div class="s1-breadcrumb">'+routeLink('← 第一章','#chapter/1')+'<span>有理数 / '+esc(label)+'</span></div>';}
  function doneCount(id){return lessonRecord(id).checked.filter(function(s){return Number.isInteger(s)&&s>=0&&s<4;}).length;}
  function home(root){
    var done=lessons.reduce(function(n,l){return n+doneCount(l.id);},0), next=lessons.find(function(l){return doneCount(l.id)<4;})||lessons[0];
    root.innerHTML=shell('<section class="s1-hero"><div class="s1-hero-copy"><span class="s1-eyebrow">第一章 · 有理数 · 教材 1—23 页</span><h1>把负数，<br>放到眼前。</h1><p>换零点、放点、翻到另一侧。<br>让每个符号，都能在图里找到依据。</p><div class="s1-hero-actions">'+routeLink(done?'接着探索 →':'从第一个实验开始 →',path(next.id,0),'s1-primary') +routeLink('全章检验','#chapter/1/check')+routeLink('第一章专项 · 72题','../chapter1-practice.html')+'</div><div class="s1-home-progress"><span>已核对 '+done+' / 24 个探索步骤</span><div><i style="width:'+(done/24*100)+'%"></i></div><small>操作记录与屏幕独立表现分别记录</small></div></div><div class="s1-hero-art" aria-label="负3与正3到原点的距离相同"><span class="s1-orbit"></span><span class="s1-float s1-float-a">−3</span><span class="s1-float s1-float-zero">0</span><span class="s1-float s1-float-b">+3</span><span class="s1-hero-axis"></span><div class="s1-art-note"><span>相反的位置</span><strong>一样的距离</strong></div><span class="s1-art-label">先猜 · 动手 · 讲清楚</span></div></section><section class="s1-section"><div class="s1-section-heading"><div><span class="s1-eyebrow">六个概念，逐个弄懂</span><h2>今天，从哪里开始？</h2></div><span class="s1-small">每节 4 步探索 + 屏幕检验</span></div><div class="s1-lesson-grid">'+lessons.map(function(l){var count=doneCount(l.id);return '<a class="s1-lesson-card" href="'+path(l.id,0)+'"><div class="s1-card-meta"><span>'+l.section+' · '+l.name+'</span><span>'+l.no+'</span></div><div class="s1-card-visual s1-icon-'+l.id+'"><span>'+esc(l.icon)+'</span><i></i></div><h3>'+l.title+'</h3><p>'+l.intro+'</p><div class="s1-card-bottom"><span>'+(count?'已核对 '+count+'/4 步':'进入探索')+'</span><b>↗</b></div></a>';}).join('')+'</div></section><section class="s1-section s1-workshop-links"><div><span class="s1-eyebrow">把这一章用起来</span><h2>还有这些，值得试一试。</h2><p>允许偏差、猜数活动、负数的来历，以及全章关系与复习。</p></div><div>'+[['允许偏差','tolerance'],['猜数缩小范围','guess'],['负数怎样走进数学','history'],['全章关系图','map']].map(function(a){return routeLink(a[0]+' ↗','#chapter/1/workshop/'+a[1]);}).join('')+'</div></section><p class="s1-storage-note">'+(storageOK?'进度保存在当前浏览器；换设备不会自动同步。':'当前浏览器无法保存记录；本次仍可正常探索。')+'</p>');
  }
  var NS='http://www.w3.org/2000/svg';
  function el(parent,name,attrs,text){var n=document.createElementNS(NS,name);Object.keys(attrs||{}).forEach(function(k){n.setAttribute(k,attrs[k]);});if(text!==undefined)n.textContent=text;parent.appendChild(n);return n;}
  function text(svg,x,y,label,size,color,anchor){
    size=size||14;anchor=anchor||'middle';var root=svg.tagName==='svg'?svg:svg.ownerSVGElement,w=root?Number(root.getAttribute('width')):600;
    var n=el(svg,'text',{x:x,y:y,fill:color||palette.ink,'font-size':size,'text-anchor':anchor,'font-weight':600});
    var chars=Array.from(String(label)),lines=[],current='',used=0,limit=(w-32)/size;
    chars.forEach(function(c){var units=/[\u2e80-\uffff]/.test(c)?1:.58;if(anchor==='middle'&&used+units>limit&&current){lines.push(current);current='';used=0;}current+=c;used+=units;});if(current)lines.push(current);
    lines.forEach(function(l,i){el(n,'tspan',{x:x,dy:i?size+4:0},l);});return n;
  }
  function line(svg,x1,y1,x2,y2,color,width,dash){return el(svg,'line',{x1:x1,y1:y1,x2:x2,y2:y2,stroke:color||palette.line,'stroke-width':width||2,'stroke-linecap':'round','stroke-dasharray':dash||'none'});}
  function box(svg,x,y,w,h,fill,r){return el(svg,'rect',{x:x,y:y,width:w,height:h,fill:fill,rx:r||0});}
  function dot(svg,x,y,color,r,key){if(key)el(svg,'circle',{cx:x,cy:y,r:22,fill:'transparent','data-s1-drag':key,'class':'s1-draggable'});var c=el(svg,'circle',{cx:x,cy:y,r:r||8,fill:color||palette.blue,stroke:'#10213d','stroke-width':3});if(key){c.setAttribute('data-s1-drag',key);c.setAttribute('class','s1-draggable');}return c;}
  function ruler(svg,a,b,y,color,label){line(svg,a,y,b,y,color,4);line(svg,a,y-5,a,y+5,color,2);line(svg,b,y-5,b,y+5,color,2);if(label!==undefined)text(svg,(a+b)/2,y-13,label,15,color);}
  function horizontal(svg,w,y,min,max,step,labels){var x=function(a){return 31+(a-min)/(max-min)*(w-62);};line(svg,16,y,w-17,y,palette.line,2);el(svg,'path',{d:'M '+(w-25)+' '+(y-5)+' L '+(w-17)+' '+y+' L '+(w-25)+' '+(y+5),stroke:palette.ink,fill:'none','stroke-width':2});for(var i=Math.ceil(min/step);i<=Math.floor(max/step);i++){var a=Number((i*step).toFixed(6));line(svg,x(a),y-4,x(a),y+5,a===0?palette.ink:palette.line,1.5);if(labels===false)continue;if(w>480||a===0||i%2===0)text(svg,x(a),y+24,number(a),12,palette.soft);}return x;}
  function caption(svg,w,s){text(svg,w/2,296,s,12,palette.soft);}
  function draw(root,id,step,v,p,revealed){
    var w=Math.max(250,Math.floor(root.getBoundingClientRect().width)),h=320;root.innerHTML='';
    var svg=el(root,'svg',{viewBox:'0 0 '+w+' '+h,width:w,height:h,role:'img','aria-label':find(id).name+'，'+find(id).steps[step]});var x,a,b,y=191;
    if(id==='signed'){
      var left=w*.19, right=w*.78, yy=function(n){return 237-(n+5)/10*166;}, ball=yy(v.height), zero=yy(v.zero), abstract=step>=2?p:0;
      var building=el(svg,'g',{opacity:1-abstract*.8});box(building,left-22,56,w*.37,197,'#253751',9);for(var j=-5;j<=5;j++){line(building,left-18,yy(j),left+w*.37-26,yy(j),'#42516c',1);if(j%2===0)text(building,left-29,yy(j)+4,number(j),11,palette.soft,'end');}box(building,left+w*.37-25,49,14,211,'#334965',3);
      line(svg,15,zero,w-16,zero,'#bd9cff',2,'6 5');text(svg,w-18,zero+19,'约定的 0',12,'#cfb5ff','end');dot(svg,left+w*.16,ball,palette.blue,11);text(svg,left+w*.16,ball-19,'小球',13,palette.blue);
      line(svg,right,55,right,251,palette.line,2);for(var k=-5;k<=5;k++){line(svg,right-4,yy(k),right+4,yy(k),palette.line,1);if(k%2===0)text(svg,right+13,yy(k)+4,number((k-v.zero)*v.direction),11,palette.soft,'start');}dot(svg,right,zero,'#bd9cff',5);dot(svg,right,ball,palette.blue,8);if(p>0)ruler(svg,right-18,right-18,zero+(ball-zero)*p,palette.gold);if(p>0)line(svg,right-18,zero,right-18,zero+(ball-zero)*p,palette.gold,4);
      text(svg,w/2,30,(v.direction===1?'↑ 向上':'↓ 向下')+'为正',15,palette.gold);caption(svg,w,step===3?'0是一个确定的位置或数量基准':'左边是情境，右边是同一位置的数学表示');
    }else if(id==='rational'){
      var s=sampleFor(v.sample), label=s.label;
      text(svg,w/2,40,label,label.length>10?20:30,palette.blue);
      if(step===0||step===2){var ratio=s.visual;if(ratio){var n=ratio[0],d=ratio[1],pieces=Math.max(d,n),unit=Math.min(37,(w-50)/pieces),start=(w-unit*pieces)/2;for(var i=0;i<pieces;i++){box(svg,start+i*unit,85,unit-3,39,i<n?(s.sign<0?'#ff9d7d':palette.gold):'#2a3c59',4);if(i%d===0)line(svg,start+i*unit,79,start+i*unit,131,palette.soft,1);}text(svg,w/2,156,s.sign<0?'长度表示大小；负号另表示相反意义':d===1?'每一块表示1':'每'+d+'小份拼成1个整体',13,palette.soft);}else text(svg,w/2,107,'8.5% = 0.085 = 17/200',19,palette.gold);
        text(svg,w/2,211,revealed?label+' = '+s.fraction:'先判断数值，再核对写法',step===2?18:21,palette.gold);caption(svg,w,'相同的数值，可以用不同形式表示');
      }else{
        var top=w/2;box(svg,top-56,71,112,39,'#344766',8);text(svg,top,97,step===1?'整数':'有理数',17);var categories=step===1?['正整数','0','负整数']:['负有理数','0','正有理数'];var gap=8,bw=(w-40-gap*2)/3;line(svg,top,110,top,144,palette.line);for(var t=0;t<3;t++){var cx=20+bw/2+t*(bw+gap);line(svg,top,144,cx,144,palette.line);line(svg,cx,144,cx,172,palette.line);box(svg,cx-bw/2,172,bw,50,revealed&&t===(step===1?1:s.sign+1)?'#675e37':'#253a58',8);text(svg,cx,202,categories[t],w<340?12:15,revealed&&t===(step===1?1:s.sign+1)?palette.gold:palette.ink);}text(svg,w/2,254,step===1?'整数还包括0；另有非整数有理数':'这一次按符号分类',13,palette.soft);caption(svg,w,step===1?'0属于整数，既不是正数也不是负数':'另一种分法：整数 / 非整数有理数');
      }
    }else if(id==='axis'){
      if(step===0){box(svg,12,79,w-24,101,'#203a45',12);line(svg,17,157,w-17,157,'#8a9384',3);var xx=function(n){return 31+(n+5)/10*(w-62);};box(svg,xx(0)-16,91,32,28,palette.blue,5);line(svg,xx(0),119,xx(0),155,palette.blue);text(svg,xx(0),72,'车站',13,palette.blue);dot(svg,xx(-3),157,palette.gold,7);text(svg,xx(-3),130,'树',14,palette.gold);dot(svg,xx(3),157,palette.orange,7);text(svg,xx(3),130,'标志',14,palette.orange);text(svg,25,206,'西',13,palette.soft,'start');text(svg,w-25,206,'东 →',13,palette.soft,'end');ruler(svg,xx(-3),xx(0),237,palette.gold,'3米');if(p>0){x=horizontal(svg,w,271,-5,5,1,false);text(svg,x(-3),297,'−3',14,palette.gold);text(svg,x(0),297,'0',14,palette.blue);text(svg,x(3),297,'3',14,palette.orange);}}
      else if(step===1){line(svg,20,y,w-20,y,palette.line,2);if(v.spacing)for(var k=-3;k<=3;k++){var px=w/2+k*(w-70)/6;line(svg,px,y-5,px,y+5,palette.ink,2);if(v.origin)text(svg,px,y+26,number(k),12,palette.soft);}if(v.origin){dot(svg,w/2,y,palette.blue,6);text(svg,w/2,y-24,'原点0',14,palette.blue);}if(v.arrow){el(svg,'path',{d:'M '+(w-29)+' '+(y-6)+' L '+(w-20)+' '+y+' L '+(w-29)+' '+(y+6),stroke:palette.ink,fill:'none','stroke-width':2});text(svg,w-24,254,'正方向 →',13,palette.ink,'end');}text(svg,w/2,48,'原点 · 正方向 · 单位长度',w<340?16:21,palette.gold);caption(svg,w,'逐个打开开关，观察每一个约定的作用');}
      else {var ext=step===2?4*v.unit:Math.max(3.5,4*v.unit);x=horizontal(svg,w,y,-ext,ext,v.unit);a=step===2?3*v.unit:v.cursor;dot(svg,x(a),y,palette.blue,10,step===3?'cursor':null);text(svg,w/2,38,'每个大格表示 '+number(v.unit),18,palette.gold);if(step===3){text(svg,w/2,78,'目标：'+number(v.target),19,palette.orange);text(svg,x(a),y-26,'A '+number(a),15,palette.blue);if(revealed)dot(svg,x(v.target),y,'none',16).setAttribute('stroke',palette.orange);}else {ruler(svg,x(0),x(3*v.unit),119,palette.blue,'3个大格');}caption(svg,w,step===3?'拖动蓝点，或者使用下方滑块':'改变每格大小，观察同一格数表示的数值');}
    }else if(id==='opposite'){
      x=horizontal(svg,w,y,-6,6,1);line(svg,x(0),69,x(0),245,palette.line,1,'4 4');a=v.a;b=flip(a,v.flips);var qn=p*v.flips,n=Math.floor(qn),part=qn-n,from=flip(a,n),pos=from*Math.cos(Math.PI*part);dot(svg,x(a),y,'#60728c',8);if(p>0||revealed){dot(svg,x(pos),y-40*Math.sin(Math.PI*part),palette.blue,10);text(svg,w/2,44,revealed?'位置对称，距离保持不变':'连续取 '+v.flips+' 次相反数',19,palette.gold);}else{dot(svg,x(a),y,palette.blue,10);text(svg,w/2,44,'a = '+number(a),24,palette.blue);}ruler(svg,x(0),x(a),121,palette.blue,'原距离 '+number(Math.abs(a)));if(revealed)ruler(svg,x(0),x(b),255,palette.gold,'现在仍是 '+number(Math.abs(b)));caption(svg,w,'每一次操作，落点都与操作前的位置关于0对称');
    }else if(id==='absolute'){
      x=horizontal(svg,w,y,-6,6,1);line(svg,x(0),74,x(0),246,palette.line,1,'4 4');
      if(step===2){text(svg,w/2,39,'|a| = '+number(v.radius),27,palette.gold);if(revealed&&v.radius>=0){dot(svg,x(v.radius),y,palette.blue,10);if(v.radius!==0)dot(svg,x(-v.radius),y,palette.orange,10);text(svg,w/2,100,countAt(v.radius)+'个落点',18,palette.ink);}else text(svg,w/2,100,v.radius<0&&revealed?'距离不能是负数':'先判断个数，再显示位置',16,palette.soft);caption(svg,w,'试试正距离、0与负距离');}
      else {a=step===3?-3:v.a;dot(svg,x(a),y,palette.blue,10,step===0||step===1?'a':null);text(svg,x(a),y-25,'a = '+number(a),15,palette.blue);if(p>0)ruler(svg,x(0),x(0)+(x(a)-x(0))*p,114,palette.gold,revealed?'|a| = '+number(Math.abs(a)):'');if(step===1||step===3){if(p>0){dot(svg,x(-a),y,palette.orange,8);text(svg,x(-a),y+55,'−a = '+number(-a),15,palette.orange);ruler(svg,x(0),x(-a),263,palette.orange,revealed?'距离也是 '+number(Math.abs(a)):'');}}text(svg,w/2,40,step===3?'分别比较位置与距离':'蓝点是位置，金色线是距离',w<340?16:20,palette.gold);if(step!==1&&step!==3)caption(svg,w,'拖动点a，距离始终大于或等于0');}
    }else{
      if(step===3){x=horizontal(svg,w,y,-1.2,.2,.2);dot(svg,x(v.between),y,palette.blue,10,'between');text(svg,x(-1),y-30,'−1',17,palette.gold);text(svg,x(0),y-30,'0',17,palette.gold);text(svg,w/2,44,'把 −1 与 0 之间放大',21,palette.gold);text(svg,w/2,98,'蓝点：'+number(v.between),20,palette.blue);caption(svg,w,'这一段没有整数，但还能找到很多有理数');}
      else {x=horizontal(svg,w,y,-6,6,1);a=v.a;b=v.b;if(step===2){[-3,-1.5,0,2].forEach(function(n,i){if(p>0)dot(svg,x(n),y,i%2?palette.gold:palette.blue,8);});text(svg,w/2,43,'−3，2，0，−1.5',22,palette.gold);caption(svg,w,revealed?'从左到右：−3 < −1.5 < 0 < 2':'先排序，核对后再显示四个位置');}else{dot(svg,x(a),y,palette.blue,10,'a');dot(svg,x(b),y,palette.orange,7,'b');text(svg,x(a),y-28,'A '+number(a),14,palette.blue);text(svg,x(b),y+51,'B '+number(b),14,palette.orange);text(svg,w/2,39,step===0?'数值：谁在右边？':'绝对值：谁离0更远？',20,palette.gold);if(step===1||p>0){ruler(svg,x(0),x(a),99,palette.blue,number(Math.abs(a)));ruler(svg,x(0),x(b),268,palette.orange,number(Math.abs(b)));}if(step===0)caption(svg,w,'改变A、B的位置，再比较数值');}}
    }
  }
  function controls(id,step,v){
    var out=[];
    function range(key,label,min,max,by){out.push({key:key,label:label,type:'range',min:min,max:max,step:by||1});}
    function select(key,label,opts){out.push({key:key,label:label,type:'select',options:opts});}
    if(id==='signed'&&step<3){range('height','小球固定在哪个高度',-5,5);range('zero','把哪个高度记作0',-4,4);select('direction','规定哪个方向为正',[[1,'向上为正'],[-1,'向下为正']]);}
    if(id==='rational'&&(step===0||step===3))select('sample','换一张数字卡',samples.map(function(s){return [s.raw,s.label];}));
    if(id==='axis'&&step===1)[['origin','规定原点'],['arrow','规定正方向'],['spacing','规定等长单位']].forEach(function(a){out.push({key:a[0],label:a[1],type:'checkbox'});});
    if(id==='axis'&&(step===2||step===3))select('unit','每个大格代表多少',[[.5,'0.5'],[1,'1'],[2,'2']]);
    if(id==='axis'&&step===3)range('cursor','移动蓝点A',-3,3,.5);
    if(id==='opposite'){range('a','改变a',-5,5,.5);select('flips','连续取几次相反数',[[1,'1次：−a'],[2,'2次：−(−a)'],[3,'3次：−(−(−a))']]);}
    if(id==='absolute'&&step<=1)range('a','移动点a',-5,5,.5);
    if(id==='absolute'&&step===2)range('radius','指定绝对值',-2,5,.5);
    if(id==='order'&&step<=1){range('a','移动蓝点A',-5,5,.5);range('b','移动橙点B',-5,5,.5);}
    if(id==='order'&&step===3)range('between','在−1与0之间放点',-.9,-.1,.05);
    return out;
  }
  function controlHTML(id,step,v){return controls(id,step,v).map(function(c){var inputId='s1-value-'+c.key;if(c.type==='checkbox')return '<label class="s1-toggle"><input id="'+inputId+'" type="checkbox" data-s1-value="'+c.key+'" '+(v[c.key]?'checked':'')+'><span>'+c.label+'</span></label>';return '<div class="s1-control"><label for="'+inputId+'">'+c.label+(c.type==='range'?'<output id="s1-output-'+c.key+'">'+number(v[c.key])+'</output>':'')+'</label>'+(c.type==='range'?'<input id="'+inputId+'" data-s1-value="'+c.key+'" type="range" min="'+c.min+'" max="'+c.max+'" step="'+c.step+'" value="'+v[c.key]+'">':'<select id="'+inputId+'" data-s1-value="'+c.key+'">'+c.options.map(function(a){return '<option value="'+esc(a[0])+'" '+(String(v[c.key])===String(a[0])?'selected':'')+'>'+esc(a[1])+'</option>';}).join('')+'</select>')+'</div>';}).join('');}
  function formulaFor(id,step,v,show){
    if(!show)return id==='axis'&&step===3?'目标 '+number(v.target):id==='rational'?sampleFor(v.sample).label+' → 看数值':id==='opposite'?'a = '+number(v.a)+'；取'+v.flips+'次相反数':id==='absolute'&&step===2?'|a| = '+number(v.radius):'先作判断，再展开数学关系';
    if(id==='signed')return step===3?'0℃ 是确定的温度':signed(relative(v))+'：按基准与方向记录位置';
    if(id==='rational'){var s=sampleFor(v.sample);return s.label+' = '+s.fraction+' · '+(step===3?(s.sign<0?'负有理数':s.sign===0?'0':'正有理数'):(s.integer?'整数':'非整数有理数'));}
    if(id==='axis')return step===0?'西侧3米 → −3':step===1?(v.origin&&v.arrow&&v.spacing?'原点 + 正方向 + 单位长度':'把三个约定补完整'):step===2?'3格 × 每格'+number(v.unit)+' = '+number(3*v.unit):'A = '+number(v.cursor)+'；目标 '+number(v.target);
    if(id==='opposite'){var expression=['','−a','−(−a)','−(−(−a))'][v.flips],substitution=number(v.a);for(var t=0;t<v.flips;t++)substitution='−('+substitution+')';return expression+' = '+substitution+' = '+number(flip(v.a,v.flips));}
    if(id==='absolute')return step===2?v.radius<0?'没有符合条件的数':v.radius===0?'a = 0':'a = '+number(-v.radius)+' 或 '+number(v.radius):step===3?'−3 < 3；|−3| = |3| = 3':step===1?'|'+number(v.a)+'| = |'+number(-v.a)+'| = '+number(Math.abs(v.a)):'|'+number(v.a)+'| = '+number(Math.abs(v.a));
    if(step===2)return '−3 < −1.5 < 0 < 2';if(step===3)return '−1 < '+number(v.between)+' < 0';
    var a=step===1?Math.abs(v.a):v.a,b=step===1?Math.abs(v.b):v.b;return (step===1?'|'+number(v.a)+'|':number(v.a))+(a<b?' < ':a===b?' = ':' > ')+(step===1?'|'+number(v.b)+'|':number(v.b));
  }
  function stop(){if(active){if(active.frame!==null)global.cancelAnimationFrame(active.frame);if(active.observer)active.observer.disconnect();active=null;}if(global.document)global.document.body.classList.remove('s1-active');}
  function enter(){global.document.body.dataset.activeChapter='1';global.document.body.classList.add('s1-active');}
  function learning(root,id,step){
    var l=find(id);step=Math.max(0,Math.min(4,step||0));var st=stateFor(id,step),v=st.v,rec=lessonRecord(id),intro=step===4?['收起动画，把理由写在屏幕上。','先独立完成，再展开参考答案。']:guidance[id][step];
    root.innerHTML=shell(breadcrumbs(l.name)+'<header class="s1-lesson-heading"><div><span class="s1-eyebrow">'+l.section+' · '+l.name+' · 教材 '+l.pages+' 页</span><h1>'+l.title+'</h1></div><span class="s1-step-count">'+(step+1)+'<small>/ 5</small></span></header><nav class="s1-stepper" aria-label="本节学习步骤">'+l.steps.map(function(s,i){return '<a href="'+path(id,i)+'" '+(i===step?'aria-current="step"':'')+'><span>'+(rec.checked.indexOf(i)>=0?'✓':i+1)+'</span><b>'+s+'</b></a>';}).join('')+'</nav>'+(step===4?paperHTML(l,rec):'<section class="s1-experience"><div class="s1-scene-column"><div class="s1-scene-top"><span>观察台 / '+l.steps[step]+'</span><span>拖动 · 比较 · 验证</span></div><div id="s1-stage" class="s1-stage"></div><div class="s1-formula" id="s1-formula"></div><div class="s1-scene-controls">'+button('▶ 播放变化','s1-play',false)+button('暂停','s1-pause',false)+'<span>画面可暂停，条件可改变</span></div></div><div class="s1-task-column"><div class="s1-step-intro"><span class="s1-eyebrow">这一步，你来发现</span><h2>'+intro[0]+'</h2><p>'+intro[1]+'</p></div><div class="s1-controls">'+controlHTML(id,step,v)+'</div><div class="s1-question"><span class="s1-eyebrow">先判断</span><h3 id="s1-prompt"></h3><div class="s1-options" id="s1-options"></div>'+button('核对我的判断','s1-check',true)+'<p class="s1-feedback" id="s1-feedback" role="status"></p></div></div></section><div class="s1-discovery" id="s1-discovery" hidden><span>这一步的依据</span><p>'+esc(l.takeaway)+'</p></div>')+'<section class="s1-lesson-bottom"><details class="s1-definition"><summary>把图与教材定义对起来</summary><p>'+esc(l.definition)+'</p><p>'+esc(l.takeaway)+'</p></details><details class="s1-more"><summary>换条件，再试其他实验</summary><div>'+l.modes.map(function(a){return routeLink(a[1]+' ↗','#lab/'+l.old+'/'+a[0]);}).join('')+routeLink('本节独立检验 ↗','#chapter/1/check/'+id)+'</div></details></section><div class="s1-bottom-nav">'+(step>0?routeLink('← 上一步',path(id,step-1)):routeLink('← 全章目录','#chapter/1'))+(step<4?routeLink('下一步：'+l.steps[step+1]+' →',path(id,step+1),'s1-next-link'):routeLink(lessons.indexOf(l)<5?'下一节 →':'全章检验 →',lessons.indexOf(l)<5?path(lessons[lessons.indexOf(l)+1].id,0):'#chapter/1/check','s1-primary'))+'</div>');
    if(step===4){wirePaper(root,id);return;}
    var stage=root.querySelector('#s1-stage'),options=root.querySelector('#s1-options'),prompt=root.querySelector('#s1-prompt'),feedback=root.querySelector('#s1-feedback'),check=root.querySelector('#s1-check'),formula=root.querySelector('#s1-formula'),play=root.querySelector('#s1-play'),pause=root.querySelector('#s1-pause');
    active={frame:null,observer:null,elapsed:0,started:0,paused:false};var owner=active;pause.hidden=true;
    function halt(){if(owner.frame!==null)global.cancelAnimationFrame(owner.frame);owner.frame=null;pause.hidden=true;play.disabled=false;}
    function paint(){if(active!==owner)return;draw(stage,id,step,v,st.p,st.checked);formula.textContent=formulaFor(id,step,v,st.checked);}
    function refreshQuestion(){var question=questionFor(id,step,v);prompt.textContent=question.prompt;options.innerHTML=question.options.map(function(o,i){return '<button class="s1-option '+(st.answer===i?'selected':'')+'" type="button" data-s1-answer="'+i+'" aria-pressed="'+(st.answer===i)+'" '+(st.checked?'disabled':'')+'><span>'+String.fromCharCode(65+i)+'</span>'+esc(o)+'</button>';}).join('');options.querySelectorAll('[data-s1-answer]').forEach(function(b){b.addEventListener('click',function(){st.answer=Number(b.dataset.s1Answer);st.message='';feedback.textContent='已选好。核对时，看看图给出的依据。';refreshQuestion();});});check.disabled=!question.operation&&st.answer===null;check.textContent=question.operation?'核对落点':'核对我的判断';root.querySelector('#s1-discovery').hidden=!st.checked;}
    function changed(){halt();st.answer=null;st.checked=false;st.attempts=0;st.message='';st.p=0;feedback.textContent='条件改变了，请重新判断。';feedback.className='s1-feedback';refreshQuestion();paint();}
    root.querySelectorAll('[data-s1-value]').forEach(function(input){input.addEventListener(input.tagName==='SELECT'||input.type==='checkbox'?'change':'input',function(){v[input.dataset.s1Value]=input.type==='checkbox'?input.checked:input.dataset.s1Value==='sample'?input.value:Number(input.value);var output=root.querySelector('#s1-output-'+input.dataset.s1Value);if(output)output.textContent=number(v[input.dataset.s1Value]);changed();});});
    check.addEventListener('click',function(){var qn=questionFor(id,step,v),good=qn.operation?qn.good:st.answer===qn.correct;st.attempts++;halt();st.p=1;if(good){st.checked=true;feedback.textContent='判断与图形一致。'+qn.why;feedback.className='s1-feedback correct';if(rec.checked.indexOf(step)<0)rec.checked.push(step);saveRecord();}else{st.checked=false;feedback.textContent='再对照一次：'+qn.hint;feedback.className='s1-feedback rethink';}st.message=feedback.textContent;refreshQuestion();paint();});
    play.addEventListener('click',function(){halt();st.p=0;owner.elapsed=0;owner.started=global.performance.now();owner.paused=false;play.disabled=true;pause.hidden=false;pause.textContent='暂停';var duration=id==='opposite'?3500:2100;function tick(now){if(active!==owner||owner.paused||!stage.isConnected)return;st.p=Math.min(1,(owner.elapsed+now-owner.started)/duration);paint();if(st.p<1)owner.frame=global.requestAnimationFrame(tick);else halt();}owner.tick=tick;if(global.matchMedia('(prefers-reduced-motion: reduce)').matches){st.p=1;paint();halt();}else owner.frame=global.requestAnimationFrame(tick);});
    pause.addEventListener('click',function(){if(owner.paused){owner.paused=false;owner.started=global.performance.now();pause.textContent='暂停';owner.frame=global.requestAnimationFrame(owner.tick);}else{owner.paused=true;owner.elapsed+=global.performance.now()-owner.started;if(owner.frame!==null)global.cancelAnimationFrame(owner.frame);owner.frame=null;pause.textContent='继续';}});
    var dragKey=null;stage.addEventListener('pointerdown',function(e){var target=e.target.closest('[data-s1-drag]');if(!target)return;dragKey=target.getAttribute('data-s1-drag');stage.setPointerCapture(e.pointerId);e.preventDefault();move(e);});
    function move(e){if(!dragKey)return;var rect=stage.getBoundingClientRect(),w=Math.max(250,Math.floor(rect.width)),pos=(e.clientX-rect.left-31)/(w-62),n;if(id==='axis'){var ext=Math.max(3.5,4*v.unit);n=Math.max(-3,Math.min(3,Math.round((pos*2*ext-ext)*2)/2));}else if(dragKey==='between')n=Math.max(-.9,Math.min(-.1,Math.round((pos*1.4-1.2)*20)/20));else n=Math.max(-5,Math.min(5,Math.round((pos*12-6)*2)/2));v[dragKey]=Number(n.toFixed(3));var input=root.querySelector('#s1-value-'+dragKey),out=root.querySelector('#s1-output-'+dragKey);if(input)input.value=v[dragKey];if(out)out.textContent=number(v[dragKey]);changed();}
    stage.addEventListener('pointermove',move);['pointerup','pointercancel','lostpointercapture'].forEach(function(ev){stage.addEventListener(ev,function(){dragKey=null;});});
    if(typeof global.ResizeObserver!=='undefined'){owner.observer=new global.ResizeObserver(paint);owner.observer.observe(stage);}refreshQuestion();paint();if(st.message)feedback.textContent=st.message;
  }
  function paperHTML(l,rec){return '<section class="s1-paper"><div class="s1-paper-top"><span class="s1-eyebrow">离开动画，独立完成</span><h2>把刚才的发现，写在屏幕上。</h2><p>用手指、触控笔或屏幕键盘写过程，再展开参考。这里的记录由陪伴者按实际表现选择。</p></div>'+l.paper.map(function(a,i){return '<article class="s1-paper-task"><span>0'+(i+1)+'</span><h3>'+esc(a[0])+'</h3><div class="s1-paper-space"></div><details><summary>完成以后，查看参考</summary><p>'+esc(a[1])+'</p></details></article>';}).join('')+'<div class="s1-paper-record"><label for="s1-reflection">用一句话记录发现（选填）</label><textarea id="s1-reflection" maxlength="1500" placeholder="我发现……，因为……">'+esc(typeof rec.reflection==='string'?rec.reflection:'')+'</textarea><p>这次屏幕作答，需要多少帮助？</p><div class="s1-status-buttons">'+[['help','仍需提示'],['today','当天能独立'],['review','隔周仍会做']].map(function(a){return '<button type="button" class="s1-button '+(rec.status===a[0]?'selected':'')+'" data-s1-status="'+a[0]+'" aria-pressed="'+(rec.status===a[0])+'">'+a[1]+'</button>';}).join('')+'</div>'+'<p class="s1-storage-note" id="s1-saved-note">记录保存在当前浏览器。</p></div></section>';}
  function wirePaper(root,id){var rec=lessonRecord(id);root.querySelector('#s1-reflection').addEventListener('input',function(e){rec.reflection=e.target.value.slice(0,1500);saveRecord();root.querySelector('#s1-saved-note').textContent=storageOK?'已保存到当前浏览器。':'当前浏览器无法保存记录。';});root.querySelectorAll('[data-s1-status]').forEach(function(b){b.addEventListener('click',function(){rec.status=b.dataset.s1Status;saveRecord();root.querySelectorAll('[data-s1-status]').forEach(function(peer){peer.classList.toggle('selected',peer===b);peer.setAttribute('aria-pressed',String(peer===b));});root.querySelector('#s1-saved-note').textContent=storageOK?'独立表现已记录。':'当前浏览器无法保存记录。';});});}
  var checks=[
    {lesson:'signed',q:q('以2500克为标准，偏差0克表示什么？',['没有质量','恰好达标','比标准少2500克'],1,'偏差为0表示实际质量等于标准质量。')},
    {lesson:'signed',q:q('“不是正数就一定是负数”，对吗？',['对','不对，0是反例','只有分数例外'],1,'0既不是正数也不是负数。')},
    {lesson:'rational',q:q('2.0和6/3属于哪一组？',['都是整数','都不是整数','只有2.0是整数'],0,'两种写法都表示整数2。')},
    {lesson:'rational',q:q('0.333…（3循环）属于有理数吗？',['属于，它等于1/3','不属于，因为没有写完','不属于，因为有小数点'],0,'无限循环小数能写成分数；这里等于1/3。')},
    {lesson:'axis',q:q('原点左侧4小格，每格表示0.5，这个点表示什么数？',['−4','−2','2'],1,'向左为负，四个0.5合起来是2，所以是−2。')},
    {lesson:'axis',q:q('一条直线已有原点和箭头，但未规定单位长度，具备数轴三要素吗？',['具备','不具备','看线段长短'],1,'还需要规定单位长度。')},
    {lesson:'opposite',q:q('当a=−2时，−a是多少？',['−2','2','0'],1,'−a表示a的相反数，所以是2。')},
    {lesson:'opposite',q:q('相反数是它本身的数是？',['1','没有','0'],2,'0关于原点对称以后仍是0。')},
    {lesson:'absolute',q:q('若|a|=2.5，a的全部可能值是？',['只有2.5','只有−2.5','2.5或−2.5'],2,'原点两侧各有一个到0距离为2.5的点。')},
    {lesson:'absolute',q:q('若|a|=−2，a的可能值是？',['−2','2','没有'],2,'距离非负，绝对值不能等于−2。')},
    {lesson:'order',q:q('关于−5和−2，哪一句正确？',['−5<−2，而且|−5|>|−2|','−5>−2，而且|−5|>|−2|','−5<−2，而且|−5|<|−2|'],0,'−5在−2左侧，数值更小；但到0的距离5大于2。')},
    {lesson:'order',q:q('−1与0之间，哪一句正确？',['没有数','有负整数','有负有理数，但没有整数'],2,'例如−0.5处在−1和0之间，它不是整数。')}
  ];
  function assessment(root,filter){var bank=checks.map(function(a,i){return {item:a,index:i};}).filter(function(a){return !filter||a.item.lesson===filter;}),answers=Array.isArray(record.checkAnswers)?record.checkAnswers:[],answered=bank.filter(function(a){return Number.isInteger(answers[a.index])&&answers[a.index]>=0&&answers[a.index]<a.item.q.options.length;}).length,correct=bank.filter(function(a){return answers[a.index]===a.item.q.correct;}).length;
    root.innerHTML=shell(breadcrumbs('独立检验')+'<header class="s1-review-heading"><span class="s1-eyebrow">'+(filter?find(filter).name:'第一章全章')+' · 收起图形独立判断</span><h1>换个问题，<br>还讲得清吗？</h1><p>已作答 '+answered+' / '+bank.length+' 题'+(answered===bank.length?' · 本轮答对 '+correct+' 题':'')+'。答题记录与屏幕独立表现分别保存。</p></header><div class="s1-check-grid">'+bank.map(function(a,i){var qn=a.item.q,val=answers[a.index],has=Number.isInteger(val)&&val>=0&&val<qn.options.length;return '<article class="s1-check-card"><span class="s1-eyebrow">'+String(i+1).padStart(2,'0')+' / '+find(a.item.lesson).name+'</span><h2>'+esc(qn.prompt)+'</h2><div class="s1-options">'+qn.options.map(function(o,j){return '<button type="button" class="s1-option '+(has&&j===val?'selected':'')+'" data-s1-check="'+a.index+'" data-s1-option="'+j+'" '+(has?'disabled':'')+'><span>'+String.fromCharCode(65+j)+'</span>'+esc(o)+'</button>';}).join('')+'</div>'+(has?'<p class="s1-feedback '+(val===qn.correct?'correct':'rethink')+'">'+(val===qn.correct?'这一步判断正确。':'对照依据再想一想。')+esc(qn.why)+'</p>'+routeLink('回到这个概念 ↗',path(a.item.lesson,0)):'')+'</article>';}).join('')+'</div><div class="s1-review-end">'+button('重新检验这一组','s1-reset-checks',false)+routeLink('回到全章目录','#chapter/1','s1-primary')+'</div>');
    root.querySelectorAll('[data-s1-check]').forEach(function(b){b.addEventListener('click',function(){answers[Number(b.dataset.s1Check)]=Number(b.dataset.s1Option);record.checkAnswers=answers;saveRecord();var scroll=global.scrollY;assessment(root,filter);global.scrollTo(0,scroll);});});root.querySelector('#s1-reset-checks').addEventListener('click',function(){bank.forEach(function(a){answers[a.index]=null;});record.checkAnswers=answers;saveRecord();assessment(root,filter);});
  }
  function workshop(root,mode){
    var allowed=['tolerance','guess','history','map'];if(allowed.indexOf(mode)<0)mode='tolerance';var tabs=[['tolerance','允许偏差'],['guess','猜数活动'],['history','负数的来历'],['map','全章关系']];
    var inner='';
    if(mode==='tolerance')inner='<div class="s1-workshop-copy"><span class="s1-eyebrow">阅读与思考 · 教材 6 页</span><h1>多一点、少一点，<br>什么时候算合格？</h1><p>标准质量2500克，允许偏差±30克。合格范围从2470克到2530克，包括两个端点。先判断，再到实验里改变实际质量和允许偏差。</p><div class="s1-tolerance-demo"><span>偏轻 −30克</span><b>合格范围</b><span>偏重 +30克</span></div><div class="s1-workshop-actions">'+routeLink('进入允许偏差实验 →','#lab/baseline/tolerance','s1-primary')+routeLink('比较谁最接近标准 →','#lab/compare/closest')+'</div><details class="s1-reading"><summary>离开屏幕，试一试</summary><p>将2470、2490、2500、2530、2531克分成合格与不合格两组。再把允许偏差改为±20克，哪些结果会变化？</p><p>参考：原来除2531克外都合格；改为±20克后，2470与2530克也不合格。</p></details></div>';
    if(mode==='guess')inner='<div class="s1-workshop-copy"><span class="s1-eyebrow">数学活动 · 教材 20 页</span><h1>每次比较，<br>都划掉一段不可能。</h1><p>目标是−50到50之间的一个整数。根据“大了”“小了”“相等”不断缩小范围。试试每次猜剩余范围的中间数，并记录用了几次。</p><div class="s1-guess-demo"><span>−50</span><b>小了 → 保留右侧</b><span>50</span></div><div class="s1-workshop-actions">'+routeLink('开始猜数 →','#lab/compare/guess','s1-primary')+routeLink('练习区间里的整数 →','#lab/compare/interval')+'</div><details class="s1-reading"><summary>和家长交换角色</summary><p>由孩子记住一个整数，家长猜。每次请孩子写下新范围：猜10得到“大了”，下一轮上界应该是9，不能还包括10。</p></details></div>';
    if(mode==='history')inner='<div class="s1-workshop-copy"><span class="s1-eyebrow">图说数学史 · 教材 18—19 页</span><h1>负数，<br>也曾让人很困惑。</h1><p>用熟悉的数表示“有多少”以后，怎样表示亏损、低于基准和相反方向？新的需要，推动人们扩大数的范围。</p><div class="s1-history-grid"><article><span>生活提出问题</span><h2>收入与支出</h2><p>同样是3，收到3和付出3，意义相反，需要区分。</p></article><article><span>换一种表示</span><h2>不同颜色的算筹</h2><p>教材介绍，刘徽用红色与黑色的算筹分别表示正数与负数。颜色帮助辨认相反意义。</p></article><article><span>本章的工具</span><h2>让数拥有位置</h2><p>数轴把正负、大小与距离放在同一幅图里，为继续研究数提供工具。</p></article></div><details class="s1-reading"><summary>讲一讲：为什么需要负数？</summary><p>先说一个生活问题，再说明正负号各表示什么。比如以收款为正，付款记负。换一种约定也可以，但必须说明并保持一致。</p></details></div>';
    if(mode==='map')inner='<div class="s1-workshop-copy"><span class="s1-eyebrow">小结与复习 · 教材 21—23 页</span><h1>六个概念，<br>其实连在一起。</h1><div class="s1-concept-map">'+lessons.map(function(l,i){var relation=['用正负数表示相反意义','把认识的数归入有理数','给数一个确定的位置','关于原点对称','量到原点的距离','比较左右与距离'][i];return '<a href="'+path(l.id,0)+'"><span>'+l.no+'</span><strong>'+l.name+'</strong><small>'+relation+'</small><b>↗</b></a>';}).join('')+'</div><div class="s1-map-note"><strong>同一条数轴，三个问题。</strong><p>点在哪儿？哪个数更大？离0有多远？让孩子分别用位置、左右顺序和距离来回答。</p></div><div class="s1-workshop-actions">'+routeLink('做全章独立检验 →','#chapter/1/check','s1-primary')+'</div><details class="s1-reading"><summary>复习时，再追问三件事</summary><p>1. 写法变了，数值一定变吗？举一个例子。</p><p>2. 数值更大，绝对值一定更大吗？用两个负数反驳。</p><p>3. 相反数、绝对值和大小比较，分别用到了数轴的什么关系？</p></details></div>';
    root.innerHTML=shell(breadcrumbs('活动与复习')+'<nav class="s1-workshop-tabs">'+tabs.map(function(a){return '<a href="#chapter/1/workshop/'+a[0]+'" '+(mode===a[0]?'aria-current="page"':'')+'>'+a[1]+'</a>';}).join('')+'</nav><section class="s1-workshop">'+inner+'</section>');
  }
  function render(root,route){stop();enter();if(!Object.keys(record).length)loadRecord();var bits=route.split('/'),id=bits[2];if(!id)home(root);else if(id==='check')assessment(root,lessons.some(function(l){return l.id===bits[3];})?bits[3]:null);else if(id==='workshop')workshop(root,bits[3]);else if(lessons.some(function(l){return l.id===id;}))learning(root,id,Number(bits[3])||0);else home(root);}
  var api={render:render,stop:stop,lessons:lessons,samples:samples,initial:initial,question:questionFor,values:valuesFor,relative:relative,flip:flip,countAt:countAt,distance:distance,fractionPosition:fractionPosition,checks:checks,formula:formulaFor};
  global.ChapterOneStudio=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
