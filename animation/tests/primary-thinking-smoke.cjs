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
const M=win.TM_MISSIONS;
assert.equal(M.length,24);
assert.equal(new Set(M.map(x=>x.id)).size,24);
assert.equal(new Set(M.map(x=>x.s)).size,6);
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
assert.match(app.innerHTML,/六种思维 · 24场实验/);
for(const m of M){
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
assert.equal(Object.keys(saved.records).length,24);
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
console.log('PASS: 24 thinking missions completed, 284 existing nodes linked, original animation route preserved.');
