(function(global){
  'use strict';
  var M=global.MathLab;
  var C={ink:'#15213a',muted:'#596780',teal:'#2b54ff',blue:'#7252d7',orange:'#f56e3d',line:'#b9c9df',soft:'#e0e8ff',light:'#ece6ff',paper:'#ffffff',yellow:'#ffe363'};
  var defaults={
    baseline:{mode:'height',height:3,zero:0,actual:2490,tolerance:30},
    classify:{sample:'-3/4',group:'sign'},axis:{a:-2.5,unit:'1'},mirror:{a:-3},
    compare:{mode:'compare',a:-5,b:-2,guess:0},
    add:{mode:'single',a:-3,b:5,c:-2,op:'add'},multiply:{a:-3,b:-2},
    divide:{a:'8',b:'-4'},laws:{law:'distribute',a:3,b:2,c:-4},
    power:{a:2,n:2},order:{example:'0'},notation:{mode:'science',raw:'696000',precision:'2'},
    activities:{mode:'binary',value:11,base:'2',entry0:'8',entry1:'-5',entry2:'10',entry3:'-7'},
    expression:{x:4},proportion:{mode:'inverse',x:6},
    substitute:{kind:'fraction',a:'-3',b:'2'},
    geometry:{mode:'track',a:67.3,b:52.6,R:6,r:2},
    patterns:{mode:'triangles',n:3},cipher:{mode:'letters',shift:3,text:'MATH',numbers:'26 2 19 7'}
  };
  function range(key,label,min,max,step){return {key:key,label:label,type:'range',min:min,max:max,step:step||1};}
  function select(key,label,options){return {key:key,label:label,type:'select',options:options};}
  function text(key,label){return {key:key,label:label,type:'text'};}
  function controls(id,v){
    switch(id){
      case 'baseline':return [select('mode','实验场景',[['height','相对位置'],['tolerance','允许偏差']])].concat(v.mode==='height'?[range('height','物体高度',-6,6),range('zero','把这里当作零点',-4,4)]:[range('actual','实际质量 / 克',2450,2550),range('tolerance','允许偏差 / 克',10,50)]);
      case 'classify':return [select('sample','选一个数',[['-3/4','−3/4'],['0','0'],['2.0','2.0'],['1/3','0.333…（3循环）'],['-3','−3'],['5/1','5/1']]),select('group','分类角度',[['sign','按正负分类'],['integer','按是否为整数分类']])];
      case 'axis':return [range('a','点A表示的数',-5,5,.5),select('unit','每个大格代表',[['0.5','0.5'],['1','1'],['2','2']])];
      case 'mirror':return [range('a','数轴上的数',-5,5,.5)];
      case 'compare':return [select('mode','实验玩法',[['compare','比较两个数'],['guess','−50到50猜数']])].concat(v.mode==='guess'?[range('guess','这次猜多少',-50,50)]:[range('a','数A',-6,6,.5),range('b','数B',-6,6,.5)]);
      case 'add':return [select('mode','实验路线',[['single','一次变化'],['route','连续路线']])].concat(v.mode==='single'?[range('a','起点a',-7,7,.5),range('b','变化量b',-7,7,.5),select('op','怎样使用这个变化',[['add','加上'],['subtract','减去']])]:[range('a','第一段变化',-8,8),range('b','第二段变化',-8,8),range('c','第三段变化',-8,8)]);
      case 'multiply':return [range('a','原数a',-4,4,.5),range('b','乘数b',-3,3,.5)];
      case 'divide':return [text('a','被除数a'),text('b','除数b（可填分数）')];
      case 'laws':return [select('law','选一种运算律',[['distribute','分配律'],['addSwap','加法交换律'],['addGroup','加法结合律'],['mulSwap','乘法交换律'],['mulGroup','乘法结合律']]),range('a','a',-4,4),range('b','b',-4,4),range('c','c',-4,4)];
      case 'power':return [range('a','负底数的绝对值',1,4),range('n','指数n（乘数个数）',1,5)];
      case 'order':return [select('example','选一道运算',[['0','先乘方，再乘除'],['1','括号里先完成'],['2','同级，从左到右']])];
      case 'notation':return [select('mode','实验主题',[['science','科学记数法'],['round','四舍五入']]),text('raw',v.mode==='science'?'输入一个大整数':'输入一个小数')].concat(v.mode==='round'?[select('precision','精确到',[['0','个位'],['1','十分位（0.1）'],['2','百分位（0.01）'],['3','千分位（0.001）'],['4','万分位（0.0001）']])]:[]);
      case 'activities':return [select('mode','拓展活动',[['binary','进位制拨灯'],['magic','−4到4幻方'],['ledger','四天小账本']])].concat(v.mode==='binary'?[range('value','十进制数',0,255),select('base','显示进制',[['2','二进制'],['8','八进制'],['10','十进制']])]:[]);
      case 'expression':return [range('x','每个盒子中的数x',0,8)];
      case 'proportion':return [select('mode','什么保持不变',[['direct','比值固定：y是x的2倍'],['inverse','乘积固定：xy=24'],['sum','和固定：x+y=12']]),range('x','把x从2变到',2,10,.5)];
      case 'substitute':return [select('kind','选择代数式',[['linear','2a + 3b'],['fraction','a² − b/a'],['square','a² + 2ab + b²']]),text('a','a的值'),text('b','b的值')];
      case 'geometry':return [select('mode','图形场景',[['track','两段直道与两段半圆'],['ring','大圆中挖去一个小圆']])].concat(v.mode==='track'?[range('a','一段直道a / 米',30,90,.1),range('b','半圆直径b / 米',20,60,.1)]:[range('R','大圆半径R / 厘米',4,10,.5),range('r','小圆半径r / 厘米',1,3,.5)]);
      case 'patterns':return [select('mode','拼图材料',[['triangles','共享边的三角形'],['squares','逐层长大的正方形']]),range('n','第n个图形',1,7)];
      case 'cipher':return [select('mode','密码玩法',[['letters','转动字母环'],['numbers','按规则解数字密码']])].concat(v.mode==='letters'?[text('text','明文（英文字母）'),range('shift','向后移动几位',-5,5)]:[text('numbers','密文数字，用空格隔开')]);
    }return [];
  }
  function esc(value){return String(value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  var ns='http://www.w3.org/2000/svg';
  function makeSvg(root,label){
    var w=Math.max(220,root.getBoundingClientRect().width),h=w<500?250:270;
    root.innerHTML='';
    var svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.setAttribute('role','img');svg.setAttribute('aria-label',label);root.appendChild(svg);
    return {svg:svg,w:w,h:h};
  }
  function el(s,tag,attrs,content){
    var item=document.createElementNS(ns,tag);Object.keys(attrs||{}).forEach(function(k){item.setAttribute(k,attrs[k]);});if(content!==undefined)item.textContent=content;s.appendChild(item);return item;
  }
  function txt(s,x,y,value,cls,anchor){return el(s,'text',{x:x,y:y,'class':cls||'','text-anchor':anchor||'start'},value);}
  function line(s,x1,y1,x2,y2,color,width,dash){var attrs={x1:x1,y1:y1,x2:x2,y2:y2,stroke:color||C.line,'stroke-width':width||1.5,'stroke-linecap':'round'};if(dash)attrs['stroke-dasharray']=dash;return el(s,'line',attrs);}
  function arrow(s,x1,x2,y,color,width){
    if(Math.abs(x2-x1)<1)return;
    var d=x2>x1?1:-1;
    line(s,x1,y,x2-d*7,y,color||C.teal,width||3);
    el(s,'polygon',{points:x2+','+y+' '+(x2-d*8)+','+(y-5)+' '+(x2-d*8)+','+(y+5),fill:color||C.teal});
  }
  function point(s,x,y,color,r){return el(s,'circle',{cx:x,cy:y,r:r||7,fill:color||C.teal});}
  function box(s,x,y,w,h,color,r){return el(s,'rect',{x:x,y:y,width:w,height:h,rx:r||0,fill:color});}
  function axis(d,max,y,step){
    var s=d.svg,w=d.w,p=27;
    var x=function(value){return p+(value+max)/(2*max)*(w-2*p);};
    line(s,p-7,y,w-p+7,y,C.line,1.5);
    step=step||max/5;
    var tickCount=Math.floor(max/step);
    for(var i=-tickCount;i<=tickCount;i++){
      var value=i*step;
      line(s,x(value),y-(i===0?8:4),x(value),y+(i===0?8:4),i===0?C.ink:C.line,1);
      var label=d.w<480?(i===0||i===-tickCount||i===tickCount):((Math.abs(i)%2===0)||i===0);
      if(label)txt(s,x(value),y+25,M.decimal(value),'axis-tick','middle');
    }
    return x;
  }
  function datum(value){return M.decimal(Number(value));}
  function bindPoint(node,d,config,onAction,key){
    node.setAttribute('class','draggable');
    var drag=false;
    node.addEventListener('pointerdown',function(e){drag=true;node.setPointerCapture(e.pointerId);e.preventDefault();});
    node.addEventListener('pointermove',function(e){
      if(!drag)return;
      var rect=d.svg.getBoundingClientRect(),px=(e.clientX-rect.left)/rect.width*d.w;
      var v=(px-27)/(d.w-54)*2*config.max-config.max;
      v=Math.max(config.min,Math.min(config.limit,Math.round(v/config.step)*config.step));
      node.setAttribute('cx',27+(v+config.max)/(2*config.max)*(d.w-54));
      var label=d.svg.querySelector('[data-axis-current]');
      if(label){label.textContent='A：'+M.decimal(v);label.setAttribute('x',node.getAttribute('cx'));}
      onAction('drag',{key:key,value:v});
    });
    ['pointerup','pointercancel','lostpointercapture'].forEach(function(name){node.addEventListener(name,function(){drag=false;});});
  }
  function render(root,id,state,onAction){
    var v=state.values,p=state.played?state.animation:0,revealed=state.played;
    var output={formula:'',detail:'先预测，再播放。',error:false};
    function setFormula(value){output.formula=value;}
    try{
      if(['laws','order','activities'].indexOf(id)>=0)return special(root,id,state,onAction);
      var d=makeSvg(root,'数学互动图：'+id),s=d.svg,w=d.w,h=d.h;
      if(id==='baseline'){
        if(v.mode==='height'){
          var y=function(n){return 205-(n+6)/12*150;},baseY=y(v.zero),itemY=y(v.height);
          line(s,w*.28,35,w*.28,217,C.line,2);
          for(var k=-6;k<=6;k+=2){line(s,w*.28-5,y(k),w*.28+5,y(k),C.line);txt(s,w*.28-15,y(k)+4,k,'minor','end');}
          line(s,35,baseY,w-35,baseY,C.blue,1.5,'5 5');
          txt(s,w-35,baseY-10,'把这里当作0','minor','end');
          var iy=itemY;
          el(s,'polygon',{points:(w*.43)+','+(iy-18)+' '+(w*.43+8)+','+(iy-24)+' '+(w*.43+62)+','+(iy-24)+' '+(w*.43+54)+','+(iy-18),fill:'#8da3ff'});el(s,'polygon',{points:(w*.43+54)+','+(iy-18)+' '+(w*.43+62)+','+(iy-24)+' '+(w*.43+62)+','+(iy+12)+' '+(w*.43+54)+','+(iy+18),fill:'#1936ab'});box(s,w*.43,iy-18,54,36,C.teal,5);txt(s,w*.43+27,iy+5,'物体','','middle').setAttribute('style','fill:#fff');
          if(revealed){var endY=baseY+(itemY-baseY)*p;line(s,w*.72,baseY,w*.72,endY,C.orange,3);point(s,w*.72,baseY,C.orange,4);point(s,w*.72,endY,C.orange,4);txt(s,w*.72+12,(baseY+itemY)/2+4,M.signed(v.height-v.zero),'strong');}
          txt(s,25,27,'位置不动，基准改变，表示也改变','minor');
          setFormula('相对位置 = '+datum(v.height)+' − '+M.par(v.zero)+' = '+(revealed?M.signed(v.height-v.zero):'？'));
          output.detail='零点对应实际高度'+datum(v.zero)+'。'+(revealed?'物体相对它的表示为'+M.signed(v.height-v.zero)+'。':'先说出正负号在这个场景中的意思。');
        }else{
          var deviation=v.actual-2500,max=60;
          var ax=function(a){return 35+(a+max)/(max*2)*(w-70);};
          box(s,ax(-v.tolerance),115,ax(v.tolerance)-ax(-v.tolerance),52,C.soft,9);
          line(s,35,145,w-35,145,C.line,1.5);
          [-50,0,50].forEach(function(a){line(s,ax(a),140,ax(a),150,C.muted);txt(s,ax(a),177,M.signed(a),'minor','middle');});
          txt(s,w/2,50,'标准质量 2500克','strong','middle');
          txt(s,w/2,85,'允许偏差 ±'+v.tolerance+'克','minor','middle');
          point(s,ax(revealed?deviation*p:0),145,C.teal,9);
          txt(s,w/2,216,revealed?(Math.abs(deviation)<=v.tolerance?'在允许范围内':'超出允许范围'):'先判断这个包装是否合格','','middle');
          setFormula('偏差 = '+v.actual+' − 2500 = '+(revealed?M.signed(deviation)+'克':'？'));
          output.detail='合格范围是'+(2500-v.tolerance)+'至'+(2500+v.tolerance)+'克，包括两个端点。';
        }
      }else if(id==='classify'){
        var value=M.classification(v.sample),labels=v.group==='sign'?['负有理数','0','正有理数']:['整数','非整数有理数'];
        var index=v.group==='sign'?(value.sign==='0'?1:value.sign==='正有理数'?2:0):(value.integer?0:1);
        var gap=12,bw=(w-40-gap*(labels.length-1))/labels.length;
        labels.forEach(function(label,i){box(s,20+i*(bw+gap),146,bw,62,i===index&&revealed?C.soft:'#e9efec',12);txt(s,20+i*(bw+gap)+bw/2,185,label,'','middle');});
        var targetX=20+index*(bw+gap)+bw/2;
        var cx=w/2+(targetX-w/2)*p,cy=62+(125-62)*p;
        box(s,cx-35,cy-20,70,40,C.paper,10);txt(s,cx,cy+6,v.sample==='1/3'?'1/3':String(v.sample).replace('-','−'),'strong','middle');
        txt(s,w/2,237,'按数值分类，不只看书写形式','minor','middle');
        setFormula(revealed?(v.group==='sign'?value.sign:(value.integer?'整数':'非整数有理数'))+' · 可以写成 '+M.fmt(value.fraction):'这个数应该进入哪个区域？');
        output.detail=v.sample==='1/3'?'0.333…（3循环）等于1/3，是有理数。':value.integer?'即使写成'+v.sample+'，值仍是整数。':'它可以写成整数相除的形式，分母不为0。';
      }else if(id==='axis'){
        var unit=Number(v.unit),extent=Math.max(6*unit,Math.ceil(Math.abs(v.a)/unit+1)*unit);
        var x=axis(d,extent,151,unit);
        point(s,x(v.a),151,C.teal,9);
        line(s,x(0),79,x(unit),79,C.orange,3);
        line(s,x(0),74,x(0),84,C.orange);line(s,x(unit),74,x(unit),84,C.orange);
        txt(s,w/2,34,'原点 · 正方向 · 相同的单位长度','minor','middle');
        txt(s,w/2,63,'每个大格代表 '+datum(unit),'','middle');
        txt(s,w-27,124,'正方向 →','minor','end');
        txt(s,x(v.a),213,'A：'+datum(v.a),'strong','middle').setAttribute('data-axis-current','true');
        setFormula('A表示 '+datum(v.a)+' · 距离0为 '+datum(Math.abs(v.a)));
        output.detail='调节每格代表的数，观察同一个数怎样找到位置。点A也可用下面的滑块控制。';
        bindPoint(s.querySelector('circle'),d,{max:extent,min:Math.max(-5,-extent),limit:Math.min(5,extent),step:.5},onAction,'a');
      }else if(id==='mirror'){
        var mx=axis(d,6,160,1),a=Number(v.a);
        box(s,mx(a)-5,155,10,10,C.muted,2);
        var current=a*(1-2*p),cy=160-45*Math.sin(Math.PI*p);
        point(s,mx(current),cy,C.teal,9);
        if(revealed){line(s,mx(0),206,mx(a),206,C.orange,3);txt(s,w/2,236,'到0的距离：'+datum(Math.abs(a)),'','middle');}
        txt(s,26,36,'原数 '+datum(a),'');
        txt(s,w-26,36,'相反数 '+(revealed?datum(-a):'？'),'','end');
        setFormula('相反数：'+(revealed?datum(-a):'？')+'　|'+datum(a)+'| = '+(revealed?datum(Math.abs(a)):'？'));
        output.detail=a===0?'0的相反数是0，绝对值也是0。':'关于0对称，距离相同，方向相反。距离没有负数。';
      }else if(id==='compare'){
        var cx2=axis(d,v.mode==='guess'?50:7,157,v.mode==='guess'?10:1);
        if(v.mode==='guess'){
          var lo=state.guessLow===undefined?-50:state.guessLow,hi=state.guessHigh===undefined?50:state.guessHigh;
          box(s,cx2(lo),146,Math.max(2,cx2(hi)-cx2(lo)),22,C.soft,7);
          point(s,cx2(Number(v.guess)),157,C.teal,8);
          txt(s,w/2,55,'还可能在 '+lo+' 到 '+hi+' 之间','strong','middle');
          txt(s,w/2,95,state.guessMessage||'心里藏着一个整数，你来猜','minor','middle');
          txt(s,w/2,226,'每次都能用比较缩小范围','minor','middle');
          setFormula(state.guessMessage||'猜一个−50到50的整数');
          output.detail='已猜 '+(state.guessCount||0)+' 次。'+(state.guessSolved?'换一轮，再试一种策略。':'先想一想，猜哪个数能排除更多可能。');
        }else{
          point(s,cx2(v.a),157,C.teal,8);point(s,cx2(v.b),157,C.orange,5);
          txt(s,27,47,'A：'+datum(v.a),'strong');txt(s,w-27,47,'B：'+datum(v.b),'strong','end');
          line(s,cx2(v.a),90,cx2(v.a),144,C.teal,1.5);line(s,cx2(v.b),113,cx2(v.b),148,C.orange,1.5);
          txt(s,w/2,220,'越靠右，数越大','minor','middle');
          var comparison=v.a<v.b?' < ':v.a>v.b?' > ':' = ';
          setFormula(datum(v.a)+(revealed?comparison:'　？　')+datum(v.b));
          output.detail=v.a<0&&v.b<0?'两个负数比较：离0更远的那个，反而更小。':'大小看左右位置；绝对值看离0的距离。';
        }
      }else if(id==='add'){
        var changes=v.mode==='route'?[v.a,v.b,v.c]:[v.a,v.op==='subtract'?-v.b:v.b];
        var positions=[0],total=0,distance=0;
        changes.forEach(function(change){total+=Number(change);distance+=Math.abs(change);positions.push(total);});
        var domainPositions=positions.slice();
        if(v.mode==='single'&&v.op==='subtract')domainPositions.push(Number(v.a)+Number(v.b));
        var maxA=Math.max(10,Math.ceil(Math.max.apply(null,domainPositions.map(Math.abs))+2));
        var ax2=axis(d,maxA,180,Math.ceil(maxA/6));
        if(v.mode==='single'){
          var delta=changes[1],current2=Number(v.a)+delta*p;
          arrow(s,ax2(0),ax2(v.a),84,C.muted,2);
          txt(s,26,35,'起点 '+datum(v.a));
          if(v.op==='subtract'&&v.b!==0){arrow(s,ax2(v.a),ax2(Number(v.a)+Number(v.b)),48,C.blue,2);txt(s,w-26,30,'原变化 '+M.signed(v.b),'minor','end');}
          if(revealed)arrow(s,ax2(v.a),ax2(current2),122,C.teal,4);
          point(s,ax2(current2),180,C.teal,9);
          box(s,ax2(v.a)-4,176,8,8,C.muted,1);
          txt(s,w/2,232,revealed?'实际移动：'+(delta===0?'不移动':(delta>0?'向右':'向左')+datum(Math.abs(delta))+'个单位长度'):'先猜终点在哪边','minor','middle');
          setFormula(M.par(v.a)+(v.op==='subtract'?' − ':' + ')+M.par(v.b)+' = '+(revealed?datum(total):'？'));
          output.detail=v.op==='subtract'?'减去一个变化，等于使用它的相反变化。可把结果与减数相加，检查是否回到起点。':'从起点出发接上第二个变化；同向延长，反向可以抵消。';
        }else{
          for(var j=0;j<3;j++){
            var local=Math.max(0,Math.min(1,p*3-j)),y=55+j*35;
            if(local>0)arrow(s,ax2(positions[j]),ax2(positions[j]+changes[j]*local),y,j%2?C.orange:C.teal,3);
          }
          var segment=Math.min(2,Math.floor(p*3)),localP=Math.min(1,p*3-segment);
          var currentP=positions[segment]+changes[segment]*localP;
          point(s,ax2(revealed?currentP:0),180,C.teal,9);
          txt(s,w/2,232,'位移有方向，累计路程没有负值','minor','middle');
          setFormula(revealed?'最后位置 '+datum(total)+'　累计路程 '+datum(distance):'最后位置？　累计走过多少？');
          output.detail='这里从0出发。三段变化为'+changes.map(M.signed).join('、')+'；路程要把各段距离相加。';
        }
      }else if(id==='multiply'){
        var product=Number(v.a)*Number(v.b),mx2=axis(d,14,159,2),valueNow;
        if(Number(v.b)<0)valueNow=p<.5?Number(v.a)*(1-4*p):(-Number(v.a))*(1+(Math.abs(Number(v.b))-1)*(p*2-1));
        else valueNow=Number(v.a)*(1+(Number(v.b)-1)*p);
        point(s,mx2(revealed?valueNow:Number(v.a)),159,C.teal,9);
        box(s,mx2(v.a)-4,155,8,8,C.muted,1);
        txt(s,25,36,'原数 '+datum(v.a));txt(s,w-25,36,'乘以 '+datum(v.b),'','end');
        txt(s,w/2,75,Number(v.b)===0?'缩到0':Number(v.b)<0?'先反向，再按绝对值伸缩':'保持方向，按倍数伸缩','minor','middle');
        var cols=[2,1,0,-1,-2],cell=(w-42)/5;
        cols.forEach(function(f,i){txt(s,21+cell*(i+.5),207,'×'+M.par(f),'minor','middle');txt(s,21+cell*(i+.5),232,revealed?datum(Number(v.a)*f):'？','','middle');});
        setFormula(M.par(v.a)+' × '+M.par(v.b)+' = '+(revealed?datum(product):'？'));
        output.detail='下方每次把乘数减1，积也按固定变化继续。翻转图帮助观察，运算规律的一致性给出依据。';
      }else if(id==='divide'){
        var aa=M.parse(v.a),bb=M.parse(v.b),qq=M.div(aa,bb),rec=M.div(1,bb);
        var centers=[w*.18,w*.5,w*.82],by=111;
        centers.forEach(function(center,i){box(s,center-39,by-30,78,60,i===1?C.soft:C.paper,13);});
        txt(s,centers[0],by+7,M.fmt(aa),'strong','middle');
        txt(s,centers[1],by+6,'÷ '+M.fmt(bb),'','middle');
        txt(s,centers[2],by+7,revealed?M.fmt(qq):'？','strong','middle');
        arrow(s,centers[0]+42,centers[1]-42,by,C.muted,2);arrow(s,centers[1]+42,centers[2]-42,by,C.teal,2);
        txt(s,w/2,46,'商乘回除数，能回到原数吗？','minor','middle');
        if(revealed){arrow(s,centers[2],centers[0],190,C.orange,2);txt(s,w/2,219,'商 × 除数 = '+M.fmt(M.mul(qq,bb)),'','middle');}
        setFormula(M.fmt(aa)+' ÷ '+M.par(bb)+' = '+M.fmt(aa)+' × '+M.par(rec)+' = '+(revealed?M.fmt(qq):'？'));
        output.detail=M.fmt(bb)+'的倒数是'+M.fmt(rec)+'，因为两者乘积为1。试试把被除数改成0，再把除数改成0。';
      }else return renderMore(d,id,state,onAction,output);
      return output;
    }catch(error){root.innerHTML='<div class="special-panel"><div class="field-error" role="alert">'+esc(error.message)+'</div></div>';return {formula:'先检查输入条件',detail:error.message,error:true};}
  }
  function renderMore(d,id,state,onAction,output){
    var v=state.values,p=state.played?state.animation:0,revealed=state.played,s=d.svg,w=d.w,h=d.h;
    if(id==='power'){
      var m=Number(v.a),n=Number(v.n),magnitude=Math.pow(m,n),left=Math.pow(-m,n),right=-magnitude;
      var ax=axis(d,Math.max(3,magnitude*1.25),162,Math.max(1,magnitude/2));
      var count=Math.min(n,Math.floor(p*n)),partial=Math.min(1,p*n-count);
      var current=Math.pow(-m,count);
      if(count<n)current=current+(Math.pow(-m,count+1)-current)*partial;
      point(s,ax(revealed?current:1),162,C.teal,8);
      txt(s,w/2,36,'指数表示：同一个底数重复相乘几次','minor','middle');
      var factors=Array(n).fill('('+M.decimal(-m)+')').join(' × ');
      txt(s,w/2,77,factors,'','middle');
      txt(s,w/2,112,revealed?'已经乘了 '+count+' 个底数':'从乘法的起始值1出发','minor','middle');
      if(revealed&&p===1){point(s,ax(right),162,C.orange,4);txt(s,w/2,220,'先算正数的幂，再取相反数','minor','middle');}
      output.formula='('+M.decimal(-m)+')<sup>'+n+'</sup> = '+(revealed?M.decimal(left):'？')+'　；　−'+m+'<sup>'+n+'</sup> = '+(revealed?M.decimal(right):'？');
      output.detail=n%2===0?'偶数个负乘数得到正数；不带括号的外层负号仍要保留。':'奇数个负乘数得到负数；这一次两个写法数值相同，但底数不同。';
    }else if(id==='notation'){
      if(v.mode==='science'){
        var sci=M.scientific(v.raw),digits=sci.digits,space=Math.min(24,(w-70)/(digits.length+1)),start=(w-digits.length*space)/2;
        txt(s,w/2,39,'数字不变，改写它的表示方法','minor','middle');
        for(var i=0;i<digits.length;i++)txt(s,start+(i+.5)*space,112,digits[i],'large','middle');
        if(sci.negative)txt(s,start-10,112,'−','large','middle');
        var dotX=start+digits.length*space+(start+space-(start+digits.length*space))*p;
        point(s,dotX,117,C.orange,3);
        line(s,start+space,137,start+digits.length*space,137,C.line,1.5);
        txt(s,w/2,179,revealed?'小数点向左移动 '+sci.exponent+' 位':'移到首个非零数字后面','minor','middle');
        txt(s,w/2,217,'系数的绝对值至少为1，小于10','minor','middle');
        output.formula=esc(v.raw.replace('-','−'))+' = '+(revealed?sci.coefficient+' × 10<sup>'+sci.exponent+'</sup>':'？ × 10<sup>？</sup>');
        output.detail='原数有'+digits.length+'位，10的指数是'+sci.exponent+'。本节先研究大整数。';
      }else{
        var f=M.parse(v.raw),places=Number(v.precision),factor=Math.pow(10,places),loIndex=Math.floor(f.n*factor/f.d),lo=loIndex/factor,hi=(loIndex+1)/factor,value=M.num(f);
        if(Math.abs(value)>1000000)throw Error('本实验请选择绝对值不超过100万的数。');
        var answer=M.roundDecimal(v.raw,places),answerNumber=Number(answer.replace('−','-'));
        var x=function(a){return 45+(a-lo)/(hi-lo)*(w-90);};
        line(s,45,155,w-45,155,C.line,2);
        line(s,45,148,45,162,C.teal,2);line(s,w-45,148,w-45,162,C.teal,2);
        line(s,w/2,141,w/2,168,C.orange,1.5,'4 4');
        txt(s,45,191,lo.toFixed(places),'','middle');txt(s,w-45,191,hi.toFixed(places),'','middle');
        txt(s,w/2,40,'两个相邻刻度，选更接近的那个','minor','middle');
        var actualX=x(value),roundX=x(answerNumber);
        point(s,actualX+(roundX-actualX)*p,155,C.teal,9);
        txt(s,w/2,94,String(v.raw).replace('-','−'),'large','middle');
        txt(s,w/2,228,places?'结果保留'+places+'位小数，包括末尾的0':'结果精确到个位','minor','middle');
        output.formula=esc(String(v.raw).replace('-','−'))+' ≈ '+(revealed?answer:'？');
        output.detail='精确到'+(places===0?'个位':places===1?'十分位':places===2?'百分位':places===3?'千分位':'万分位')+'。四舍五入看下一位；表示精度的末尾0要留下。';
      }
    }else if(id==='expression'){
      var xval=Number(v.x),half=w/2;
      txt(s,half/2,33,'两倍之后，再加3','','middle');
      txt(s,half+half/2,33,'先加3，再取两倍','','middle');
      line(s,half,56,half,221,C.line,1);
      function unitGroup(cx,y,extra){
        box(s,cx-40,y-20,80,40,C.soft,9);
        txt(s,cx,y+6,'x = '+xval,'','middle');
        if(extra){for(var q=0;q<3;q++)point(s,cx-20+q*20,y+35,C.orange,5);}
      }
      unitGroup(half/2,85,false);unitGroup(half/2,145,false);
      for(var q=0;q<3;q++)point(s,half/2-20+q*20,193,C.orange,5);
      unitGroup(half+half/2,85,true);unitGroup(half+half/2,165,true);
      if(revealed){txt(s,half/2,237,'合计 '+(2*xval+3),'strong','middle');txt(s,half+half/2,237,'合计 '+(2*(xval+3)),'strong','middle');}
      output.formula='2x + 3'+(revealed?' = '+(2*xval+3):'')+'　；　2(x + 3)'+(revealed?' = '+(2*(xval+3)):'');
      output.detail='左边只有一组3，右边每一份都包含3。括号圈住了被当作整体的部分。';
    }else if(id==='proportion'){
      var target=Number(v.x),xx=2+(target-2)*p,yy=v.mode==='direct'?2*xx:v.mode==='inverse'?24/xx:12-xx;
      if(v.mode==='direct'){
        var scale=(w-86)/20;
        txt(s,w/2,33,'长纸带始终是短纸带的2倍','minor','middle');
        box(s,43,88,xx*scale,30,C.teal,5);txt(s,43,77,'x = '+datum(xx),'minor');
        box(s,43,156,yy*scale,30,C.orange,5);txt(s,43,145,'y = '+datum(yy),'minor');
        txt(s,w/2,228,'变的是长度，不变的是比值','minor','middle');
      }else{
        var sc=Math.min((w-65)/12,14),rw=xx*sc,rh=yy*sc,left=(w-rw)/2,top=43+(168-rh)/2;
        box(s,left,top,rw,rh,v.mode==='inverse'?C.soft:C.light,3);
        el(s,'rect',{x:left,y:top,width:rw,height:rh,fill:'none',stroke:C.teal,'stroke-width':2});
        txt(s,w/2,top+rh+25,'x = '+datum(xx),'','middle');
        txt(s,left-9,top+rh/2+4,datum(yy),'','end');
        txt(s,w/2,25,v.mode==='inverse'?'面积始终是24':'周长始终是24','minor','middle');
        txt(s,w/2,239,v.mode==='inverse'?'一个变宽，一个变矮，面积不变':'一增一减，面积也会改变','minor','middle');
      }
      var targetY=v.mode==='direct'?2*target:v.mode==='inverse'?24/target:12-target;
      output.formula=v.mode==='direct'?'y/x = '+(revealed?'2':'？'):v.mode==='inverse'?'xy = '+(revealed?'24':'？'):'x + y = '+(revealed?'12':'？');
      var targetYLabel=v.mode==='inverse'?M.fmt(M.div(24,target)):datum(targetY);
      output.detail=revealed?'x='+datum(target)+'时，y='+targetYLabel+'。'+(v.mode==='sum'?'和固定不等于乘积固定，因此不是反比例关系。':v.mode==='inverse'?'两个量为正，乘积固定，所以成反比例。':'比值固定，所以成正比例。'):'先猜：x从2变到'+datum(target)+'时，y会怎样变化？';
    }else if(id==='substitute'){
      var a=M.parse(v.a),b=M.parse(v.b),answerS=M.substitute(v.kind,a,b),leftS,rightS,labelL,labelR,symbol;
      if(v.kind==='linear'){leftS=M.mul(2,a);rightS=M.mul(3,b);labelL='2a';labelR='3b';symbol='+';}
      else if(v.kind==='fraction'){leftS=M.pow(a,2);rightS=M.div(b,a);labelL='a²';labelR='b/a';symbol='−';}
      else{leftS=M.pow(a,2);rightS=M.pow(b,2);labelL='a²';labelR='b²';symbol='+';}
      var leftX=w*.25,rightX=w*.75;
      box(s,leftX-44,37,88,43,C.paper,9);box(s,rightX-44,37,88,43,C.paper,9);
      txt(s,leftX,64,'a = '+M.fmt(a),'','middle');txt(s,rightX,64,'b = '+M.fmt(b),'','middle');
      line(s,leftX,82,leftX,106,C.line,2);line(s,rightX,82,rightX,106,C.line,2);
      var termReady=revealed&&p>=.45,totalReady=revealed&&p>=.9;
      if(v.kind==='square'){
        var xs=[w*.17,w*.5,w*.83],terms=[leftS,M.mul(M.mul(2,a),b),rightS],names=['a²','2ab','b²'];
        xs.forEach(function(tx,i){box(s,tx-35,108,70,49,i===1?C.light:C.soft,9);txt(s,tx,129,names[i],'minor','middle');txt(s,tx,148,termReady?M.fmt(terms[i]):'？','','middle');line(s,tx,161,w/2,185,C.line,1.5);});
      }else{
        box(s,leftX-49,108,98,49,C.soft,10);box(s,rightX-49,108,98,49,C.light,10);
        txt(s,leftX,129,labelL,'minor','middle');txt(s,rightX,129,labelR,'minor','middle');
        txt(s,leftX,148,termReady?M.fmt(leftS):'？','','middle');txt(s,rightX,148,termReady?M.fmt(rightS):'？','','middle');
        txt(s,w/2,142,symbol,'strong','middle');
        line(s,leftX,161,w/2,185,C.line,2);line(s,rightX,161,w/2,185,C.line,2);
      }
      txt(s,w/2,217,totalReady?M.fmt(answerS):'待求的值','large','middle');
      var expression=v.kind==='linear'?'2a + 3b':v.kind==='fraction'?'a² − b/a':'a² + 2ab + b²';
      output.formula=expression+' = '+(totalReady?M.fmt(answerS):'？');
      output.detail='代入后：'+(v.kind==='linear'?'2×'+M.par(a)+' + 3×'+M.par(b):v.kind==='fraction'?M.par(a)+'² − '+M.par(b)+' ÷ '+M.par(a):M.par(a)+'² + 2×'+M.par(a)+'×'+M.par(b)+' + '+M.par(b)+'²')+'。同一字母每次都代入相同的值。';
    }else if(id==='geometry'){
      if(v.mode==='track'){
        var aG=Number(v.a),bG=Number(v.b),scaleG=Math.min((w-70)/(aG+bG),150/bG),straight=aG*scaleG,radius=bG*scaleG/2;
        var xg=(w-straight)/2,yg=132;
        line(s,xg,yg-radius,xg+straight,yg-radius,C.teal,4);line(s,xg,yg+radius,xg+straight,yg+radius,C.teal,4);
        el(s,'path',{d:'M '+xg+' '+(yg-radius)+' A '+radius+' '+radius+' 0 0 0 '+xg+' '+(yg+radius),fill:'none',stroke:C.orange,'stroke-width':4});
        el(s,'path',{d:'M '+(xg+straight)+' '+(yg-radius)+' A '+radius+' '+radius+' 0 0 1 '+(xg+straight)+' '+(yg+radius),fill:'none',stroke:C.orange,'stroke-width':4});
        var perimeter=2*aG+3.14*bG;
        txt(s,w/2,35,'两段半圆合成一个圆的周长','minor','middle');
        txt(s,w/2,yg-radius-13,'a = '+datum(aG)+'米','','middle');
        txt(s,w/2,yg+4,'直径 b = '+datum(bG)+'米','minor','middle');
        if(revealed){var runLength=(2*straight+2*Math.PI*radius)*p;
          var path='M '+xg+' '+(yg-radius)+' L '+(xg+straight)+' '+(yg-radius)+' A '+radius+' '+radius+' 0 0 1 '+(xg+straight)+' '+(yg+radius)+' L '+xg+' '+(yg+radius)+' A '+radius+' '+radius+' 0 0 1 '+xg+' '+(yg-radius);
          el(s,'path',{d:path,fill:'none',stroke:C.ink,'stroke-width':2,'stroke-dasharray':runLength+' 100000'});}
        txt(s,w/2,240,'π取3.14，长度单位为米','minor','middle');
        output.formula='2a + πb ≈ '+(revealed?M.decimal(perimeter,3)+'米':'？');
        output.detail=revealed?'本例周长约'+M.roundDecimal(String(perimeter.toFixed(6)),0)+'米（取整数）。两段直道共2a，弯道共πb。':'只改a，哪些部分变长？只改b，哪些部分一起变化？';
      }else{
        var R=Number(v.R),r=Number(v.r),scR=8,cyR=132,cxR=w/2,outerRadius=R*scR;
        point(s,cxR,cyR,C.teal,outerRadius);
        point(s,cxR,cyR,C.paper,Math.max(.1,r*scR*(revealed?p:0)));
        line(s,cxR,cyR,cxR+outerRadius,cyR,C.orange,2);txt(s,cxR+outerRadius*.6,cyR-10,'R','minor','middle');
        if(revealed){line(s,cxR,cyR,cxR,cyR-r*scR,C.ink,2);txt(s,cxR-11,cyR-r*scR/2,'r','minor','end');}
        txt(s,w/2,28,'保留的面积 = 大圆面积 − 小圆面积','minor','middle');
        txt(s,w/2,237,'π取3.14，面积单位为平方厘米','minor','middle');
        var ring=M.mul('3.14',M.sub(M.pow(R,2),M.pow(r,2)));
        output.formula='πR² − πr² ≈ '+(revealed?M.decimal(ring,4)+'平方厘米':'？');
        output.detail='大圆与小圆半径均为正，小圆在大圆内部。代入前先说清每一部分表示的面积。';
      }
    }else if(id==='patterns'){
      var nP=Number(v.n);
      if(v.mode==='triangles'){
        var dx=(w-60)/(nP+1),y1=92,y2=176;
        var points=[];for(var kP=0;kP<nP+2;kP++)points.push({x:30+kP*dx,y:kP%2?y1:y2});
        var edges=[[0,1],[1,2],[0,2]];
        for(var tri=1;tri<nP;tri++){edges.push([tri+1,tri+2]);edges.push([tri,tri+2]);}
        var maxEdges=revealed?Math.max(1,Math.ceil(edges.length*p)):3;
        edges.forEach(function(edge,index){if(index>=maxEdges)return;line(s,points[edge[0]].x,points[edge[0]].y,points[edge[1]].x,points[edge[1]].y,nP>1&&index>=edges.length-2?C.orange:C.teal,4);});
        txt(s,w/2,35,'相邻两个三角形共享一条边','minor','middle');
        txt(s,w/2,226,revealed?nP+'个三角形 · '+(2*nP+1)+'根火柴棍':'先数第1个，再找每增加1个要添几根','minor','middle');
        output.formula='3 + 2(n − 1) = 2n + 1'+(revealed?' = '+(2*nP+1):'');
        output.detail='第一个用3根，以后每添一个只增加2根。用图形结构解释，不只凭前几个数字猜。';
      }else{
        var size=nP+1,cell=Math.min((w-65)/size,162/size),side=size*cell,xP=(w-side)/2,yP=49;
        for(var row=0;row<size;row++)for(var col=0;col<size;col++){
          var fresh=row===size-1||col===size-1;
          if(fresh&&!revealed)continue;
          var offset=fresh?(1-p)*13:0;
          box(s,xP+col*cell+offset,yP+row*cell+offset,cell-1.8,cell-1.8,fresh?C.orange:C.soft,2);
        }
        txt(s,w/2,25,'第1个是2×2，第n个边长是n+1','minor','middle');
        txt(s,w/2,237,'先看n×n，再添一行一列','minor','middle');
        output.formula='(n + 1)²'+(revealed?' = '+(size*size):'')+'　新增 2n + 1'+(revealed?' = '+(2*nP+1):'');
        output.detail='橙色部分是一列n个、一行n个，再加转角1个。n=1时，1×1只是辅助的第0个图形。';
      }
    }else if(id==='cipher'){
      if(v.mode==='letters'){
        var ringY=130,outer=88,inner=58,shift=Number(v.shift);
        el(s,'circle',{cx:w/2,cy:ringY,r:outer,fill:'none',stroke:C.line,'stroke-width':1});
        el(s,'circle',{cx:w/2,cy:ringY,r:inner,fill:'none',stroke:C.line,'stroke-width':1});
        for(var ch=0;ch<26;ch++){
          var angle=ch/26*Math.PI*2-Math.PI/2,angleOuter=(ch-shift*p)/26*Math.PI*2-Math.PI/2;
          txt(s,w/2+Math.cos(angle)*inner,ringY+Math.sin(angle)*inner+4,String.fromCharCode(65+ch),'minor','middle');
          txt(s,w/2+Math.cos(angleOuter)*outer,ringY+Math.sin(angleOuter)*outer+4,String.fromCharCode(65+ch),'','middle');
        }
        txt(s,w/2,ringY+4,'A → '+(revealed?M.cipher('A',shift):'？'),'','middle');
        txt(s,w/2,25,'内圈是明文，外圈是密文','minor','middle');
        txt(s,w/2,242,'字母到Z之后，继续回到A','minor','middle');
        output.formula=revealed?esc(M.cipher(String(v.text).slice(0,30),shift)):'先猜字母会移动到哪里';
        output.detail='规则：每个英文字母向后移动'+shift+'位。负数表示向前移动；非英文字母保持原样。';
      }else{
        var parts=String(v.numbers).trim().split(/[\s,，]+/).map(Number);
        if(!parts.length||parts.length>12||parts.some(function(n){return !Number.isInteger(n)||n<1||n>26;}))throw Error('请输入1至26之间的整数，最多12个，用空格隔开。');
        var decoded=parts.map(function(n){return n%2?n+1:n/2;});
        var columns=Math.min(6,parts.length),rows=Math.ceil(parts.length/6);
        var widthSlot=Math.min(54,(w-38)/columns);
        parts.forEach(function(n,i){
          var row=Math.floor(i/6),col=i%6,countInRow=Math.min(6,parts.length-row*6);
          var xx=(w-countInRow*widthSlot)/2+(col+.5)*widthSlot,baseY=(rows===1?60:35)+row*100;
          txt(s,xx,baseY,n,'strong','middle');txt(s,xx,baseY+32,n%2?'+1':'÷2','minor','middle');
          line(s,xx,baseY+44,xx,baseY+64,C.line,2);
          txt(s,xx,baseY+86,revealed?String.fromCharCode(64+decoded[i]):'？','strong','middle');
        });
        txt(s,w/2,rows===1?224:244,'奇数加1，偶数除以2，再找字母','minor','middle');
        output.formula=revealed?decoded.map(function(n){return String.fromCharCode(64+n);}).join(''):'按同一套规则逐个解读';
        output.detail='字母A到Z对应1到26。先判断奇偶，再计算，最后找字母。';
      }
    }
    return output;
  }
  function renderSpecial(root,id,state,onAction){
    var v=state.values,revealed=state.played;
    var output={formula:'',detail:'先操作，再解释。',error:false};
    if(id==='laws'){
      var a=Number(v.a),b=Number(v.b),c=Number(v.c),left,right,value;
      var block=function(n){return '<span class="math-block'+(n<0?' negative':'')+'">'+M.decimal(n)+'</span>';};
      var plus='<span class="law-symbol">+</span>',times='<span class="law-symbol">×</span>';
      if(v.law==='distribute'){left=block(a)+times+'('+block(b)+plus+block(c)+')';right=block(a*b)+plus+block(a*c);value=a*(b+c);output.formula=M.par(a)+' × ['+M.par(b)+' + '+M.par(c)+'] = '+(revealed?M.decimal(value):'？');output.detail='分配给括号里的每一项：先分别相乘，再相加。可与先算括号的结果核对。';}
      else if(v.law==='addSwap'){left=block(a)+plus+block(b);right=block(b)+plus+block(a);value=a+b;output.formula='a + b = b + a';output.detail='交换的是两个加数的位置，最终的和不变。减法不能直接照搬。';}
      else if(v.law==='mulSwap'){left=block(a)+times+block(b);right=block(b)+times+block(a);value=a*b;output.formula='ab = ba';output.detail='交换两个乘数，积不变。除法不能直接照搬。';}
      else if(v.law==='addGroup'){left='('+block(a)+plus+block(b)+')'+plus+block(c);right=block(a)+plus+'('+block(b)+plus+block(c)+')';value=a+b+c;output.formula='(a + b) + c = a + (b + c)';output.detail='只改变相加的分组，符号跟着原来的数走。';}
      else{left='('+block(a)+times+block(b)+')'+times+block(c);right=block(a)+times+'('+block(b)+times+block(c)+')';value=a*b*c;output.formula='(ab)c = a(bc)';output.detail='只改变相乘的分组，积不变。';}
      root.innerHTML='<div class="special-panel"><div class="special-heading">同一组数，比较两种运算过程</div><div class="law-row">'+left+'</div><div class="law-row" style="transform:translateY('+(revealed?(1-state.animation)*18:0)+'px)">'+(revealed?right:'<span class="inline-label">先预测：换一种方式后，结果会相同吗？</span>')+'</div><div class="law-row">'+(revealed?'<span class="result-pill">两边的结果都是 '+M.decimal(value)+'</span>':'')+'</div></div>';
    }else if(id==='order'){
      var example=M.orderCases[Number(v.example)],step=example.steps[Math.min(state.orderStep||0,example.steps.length-1)];
      root.innerHTML='<div class="special-panel"><div class="special-heading">选出下一步要先完成的部分</div><div class="order-expression">'+esc(step.expression)+'</div>'+(step.done?'<div class="law-row"><span class="result-pill">按顺序完成了</span></div>':'<div class="order-choices">'+step.choices.map(function(option,i){return '<button type="button" data-order-choice="'+i+'">'+esc(option)+'</button>';}).join('')+'</div>')+'<div class="order-history" aria-live="polite">'+esc(state.orderMessage||'括号、乘方、乘除、加减，各有次序。')+'</div></div>';
      root.querySelectorAll('[data-order-choice]').forEach(function(button){button.addEventListener('click',function(){onAction('orderChoice',{index:Number(button.dataset.orderChoice)});});});
      output.formula=step.expression;output.detail=state.orderMessage||'这次由你决定下一步；完成后，再关掉画面独立算一次。';
    }else if(id==='activities'){
      if(v.mode==='binary'){
        var base=Number(v.base),bits=M.baseDigits(Number(v.value),base);
        root.innerHTML='<div class="special-panel"><div class="special-heading">每个位置的数值：数字 × 该位置的权</div><div class="binary-row" style="grid-template-columns:repeat('+bits.length+',minmax(0,1fr))">'+bits.map(function(bit,i){return '<button type="button" class="binary-bit '+(bit.digit?'on':'')+'" data-bit="'+i+'" aria-label="权为'+bit.weight+'，当前数字'+bit.digit+'，点击改变" '+(base===2?'':'disabled')+'>'+bit.digit+'<small>×'+bit.weight+'</small></button>';}).join('')+'</div><div class="binary-sum">'+(bits.filter(function(bit){return bit.digit;}).map(function(bit){return bit.digit+'×'+bit.weight;}).join(' + ')||'0')+'</div><div class="law-row"><button class="btn" type="button" data-increment '+(Number(v.value)>=255?'disabled':'')+'>加1，观察进位</button></div></div>';
        root.querySelectorAll('[data-bit]').forEach(function(button){button.addEventListener('click',function(){var bit=bits[Number(button.dataset.bit)];onAction('set',{key:'value',value:Number(v.value)+(bit.digit?-bit.weight:bit.weight),played:true});});});
        root.querySelector('[data-increment]').addEventListener('click',function(){onAction('set',{key:'value',value:Math.min(255,Number(v.value)+1),played:true});});
        output.formula='('+bits.map(function(bit){return bit.digit;}).join('')+')<sub>'+base+'</sub> = '+Number(v.value);
        output.detail='二进制逢2进1，八进制逢8进1。本页的范围为0至255，到达上限后不再执行加1。';
      }else if(v.mode==='magic'){
        var vals=Array.from({length:9},function(_,i){return v['cell'+i]===undefined?'':v['cell'+i];});
        root.innerHTML='<div class="special-panel"><div class="special-heading">−4到4各用一次：每行、每列、两条对角线的和都相等</div><div class="magic-grid">'+vals.map(function(value,i){return '<input type="number" min="-4" max="4" step="1" value="'+esc(value)+'" data-cell="'+i+'" aria-label="第'+(Math.floor(i/3)+1)+'行第'+(i%3+1)+'列">';}).join('')+'</div><div class="magic-detail" aria-live="polite"></div><div class="law-row"><button type="button" class="btn" data-magic-hint>给第一行一个提示</button></div></div>';
        root.querySelectorAll('[data-cell]').forEach(function(input){input.addEventListener('input',function(){v['cell'+input.dataset.cell]=input.value;state.played=false;root.querySelector('.magic-detail').textContent='改好后，点下方按钮检查。';});});
        root.querySelector('[data-magic-hint]').addEventListener('click',function(){onAction('magicHint',{});});
        if(revealed){
          var result=vals.some(function(n){return n==='';})?{valid:false,message:'还有空格，先把9个数填完。'}:M.magic(vals.map(Number));
          var message=!result.valid?result.message:result.solved?'八条线的和都是0，成功！':'横行：'+result.lines.slice(0,3).join('、')+'；竖列：'+result.lines.slice(3,6).join('、')+'；对角线：'+result.lines.slice(6).join('、');
          root.querySelector('.magic-detail').textContent=message;
          output.detail=message;output.error=!result.valid;output.formula=result.valid&&result.solved?'每条线的和 = 0':'怎样让八条线的和都相等？';
        }else{output.formula='9个数 · 8条线';output.detail='九个数总和是0，所以三行同和时，每行的和应是多少？';}
      }else{
        var entries=Array.from({length:4},function(_,i){return String(v['entry'+i]);});
        root.innerHTML='<div class="special-panel"><div class="special-heading">收入为正，支出为负。这里是虚拟的四天账目。</div><table class="ledger"><thead><tr><th>日期</th><th>收支 / 元</th><th>含义</th></tr></thead><tbody>'+entries.map(function(value,i){var meaning;try{var amount=M.parse(value);meaning=amount.n>0?'收入':amount.n<0?'支出':'无变化';}catch(error){meaning='待检查';}return '<tr><td>第'+(i+1)+'天</td><td><input type="text" inputmode="decimal" value="'+esc(value)+'" data-entry="'+i+'" aria-label="第'+(i+1)+'天收支"></td><td>'+meaning+'</td></tr>';}).join('')+'</tbody></table></div>';
        root.querySelectorAll('[data-entry]').forEach(function(input){input.addEventListener('input',function(){v['entry'+input.dataset.entry]=input.value;state.played=false;var meaning;try{var amount=M.parse(input.value);meaning=amount.n>0?'收入':amount.n<0?'支出':'无变化';}catch(error){meaning='待检查';}input.closest('tr').lastElementChild.textContent=meaning;onAction('dirty',{});});});
        try{
          var amounts=entries.map(M.parse),net=amounts.reduce(M.add,M.parse(0)),income=amounts.filter(function(a){return a.n>0;}).reduce(M.add,M.parse(0)),expense=amounts.filter(function(a){return a.n<0;}).reduce(M.add,M.parse(0));
          output.formula=revealed?'结余变化 '+M.fmt(net)+'元':'四天总收入？ 总支出？ 结余变化？';
          output.detail=revealed?'总收入'+M.fmt(income)+'元；总支出'+M.fmt(M.mul(-1,expense))+'元；平均每天支出'+M.fmt(M.div(M.mul(-1,expense),4))+'元。':'改动一笔，再预测总收入、总支出和结余分别怎样变化。';
        }catch(error){output.formula='先检查账目';output.detail=error.message;output.error=true;}
      }
    }
    return output;
  }
  function special(root,id,state,onAction){return renderSpecial(root,id,state,onAction);}
  global.MathScenes={defaults:defaults,controls:controls,render:render,esc:esc};
})(window);
