'use strict';
/* Run with: node animation/tests/primary-thinking-smoke.cjs */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const base=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(base,'K1-6.html'),'utf8');
const raw=html.split('const DATA=')[1]?.split(';</script>')[0];
assert.ok(raw,'Original graph JSON not found');
const legacy=JSON.parse(raw);
assert.equal(legacy.T.filter(x=>x.b==='P').length,284);
const win={};
vm.runInNewContext(fs.readFileSync(path.join(base,'primary-thinking-data.js'),'utf8'),{window:win});
vm.runInNewContext(fs.readFileSync(path.join(base,'primary-thinking-extra.js'),'utf8'),{window:win});
vm.runInNewContext(fs.readFileSync(path.join(base,'primary-thinking-visuals.js'),'utf8'),{window:win});
vm.runInNewContext(fs.readFileSync(path.join(base,'primary-thinking-curation.js'),'utf8'),{window:win});
assert.equal(Object.keys(win.TM_VISUALS).length,20);
const M=win.TM_MISSIONS;
assert.equal(M.length,41);
assert.equal(new Set(M.map(x=>x.id)).size,41);
assert.equal(Object.keys(win.TM_MERGES).length,19);
assert.ok(Object.values(win.TM_MERGES).every(x=>M.some(m=>m.id===x.to)));
assert.deepEqual(Array.from({length:6},(_,i)=>M.filter(x=>x.s===i).length),[6,6,5,7,8,9]);
assert.ok(M.every(m=>m.readOpts.length===3&&m.opts.length===3&&m.choices.length===3&&m.readAnswer>=0&&m.readAnswer<3));
const events={};let textareaInput=null;const app={innerHTML:''};
const document={
  addEventListener(name,fn){events[name]=fn;},
  getElementById(id){
    if(id==='app')return app;
    if(id==='tm-reflection-note')return {addEventListener(name,fn){if(name==='input')textareaInput=fn;}};
    return null;
  },
  querySelector(){return null;}
};
const memory=new Map();
const localStorage={
  getItem(key){return memory.get(key)||null;},
  setItem(key,value){memory.set(key,value);}
};
const location={hash:'#/train'};
vm.runInNewContext(fs.readFileSync(path.join(base,'primary-thinking.js'),'utf8'),{
  window:win,document,location,localStorage,LIST:legacy.T,Date,URLSearchParams
});
function click(name,values={}){
  const node={dataset:{tm:name,...values}};
  node.closest=()=>node;
  events.click({target:node});
}
win.renderPrimaryThinking();
assert.match(app.innerHTML,/六种思维 · 41场精选实验/);
for(const [index,m] of M.entries()){
  location.hash='#/train/'+m.id;
  win.renderPrimaryThinking(m.id);
  assert.match(app.innerHTML,/这道题究竟要你求什么/);
  assert.doesNotMatch(app.innerHTML,/data-tm="pred"/);
  click('read',{i:String((m.readAnswer+1)%3)});
  assert.match(app.innerHTML,/先看清最后问的是什么/);
  click('read',{i:String(m.readAnswer)});
  click('pred',{i:String(m.a)});
  click('next');
  assert.match(app.innerHTML,/<svg/);
  if(win.TM_VISUALS[m.scene]){
    assert.match(app.innerHTML,/data-tm-drag="1"/);
    assert.doesNotMatch(app.innerHTML,/NaN|Infinity/);
    click('flip');
    assert.match(app.innerHTML,/第二种表示/);
    if(m.id==='m14')assert.match(app.innerHTML,/25×\(16\).*400/);
    if(m.id==='m24')assert.match(app.innerHTML,/3\/4.*1\/2/);
    if(m.id==='m54')assert.match(app.innerHTML,/千米\/小时/);
    if(m.id==='m60')assert.match(app.innerHTML,/80%/);
    const svg={getBoundingClientRect:()=>({left:0,width:620})};
    const target={closest:()=>svg};
    events.pointerdown({target,clientX:260});
    events.pointermove({target,clientX:360});
    events.pointerup({});
  }
  const step=m.cfg.step||1;
  const val=m.cfg.v+step<=m.cfg.max?m.cfg.v+step:m.cfg.v-step;
  events.input({target:{id:'tm-range',value:String(val)}});
  click('next');
  click('counter',{v:String(m.truth)});
  click('next');
  assert.ok(app.innerHTML.includes(m.transfer));
  click('transfer',{i:String(m.t)});
  click('next');
  click('reflect',{i:'4'});
  assert.equal(typeof textareaInput,'function');
  textareaInput({target:{value:'先看清问题究竟问什么，再用图形寻找数量关系。'}});
  click('next');
  assert.match(app.innerHTML,/完成了一场思维实验/);
}
const saved=JSON.parse(memory.get('primary-thinking-rebuild-v1'));
assert.equal(Object.keys(saved.records).length,41);
const snapshot=memory.get('primary-thinking-rebuild-v1');
for(const [oldId,merge] of Object.entries(win.TM_MERGES)){
 location.hash='#/train/'+oldId;
 win.renderPrimaryThinking(oldId);
 assert.match(app.innerHTML,/已合并/);
 assert.ok(app.innerHTML.includes('#/train/'+merge.to));
}
assert.equal(memory.get('primary-thinking-rebuild-v1'),snapshot,'Legacy deep links must not erase progress');
location.hash='#/train/library';
win.renderPrimaryThinking('library');
assert.equal((app.innerHTML.match(/\/train\/check\/cnm_p/g)||[]).length,284);
const topic=legacy.T.find(x=>x.b==='P');
location.hash='#/train/check/'+topic.i;
win.renderPrimaryThinking('check',topic.i);
assert.ok(app.innerHTML.includes(topic.q));
click('reveal');
assert.ok(app.innerHTML.includes(topic.a));
click('self',{v:'uncertain'});
assert.match(app.innerHTML,/最近一次自评/);
location.hash='#/train/report';
win.renderPrimaryThinking('report');
assert.match(app.innerHTML,/我的思维复盘/);
assert.match(html,/if\(seg\[0\]==='learn'\)/);
assert.match(html,/function showPrimaryLesson\(/);
assert.match(html,/primary-thinking-extra\.js/);
assert.match(html,/primary-thinking-visuals\.js/);
assert.match(html,/primary-thinking-curation\.js/);
console.log('PASS: 41 distinct missions, 19 legacy merge links, 20 enhanced visuals, math scene checks, 284 unchanged elementary nodes.');
