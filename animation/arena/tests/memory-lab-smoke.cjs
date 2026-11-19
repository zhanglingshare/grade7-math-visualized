"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),vm=require("node:vm");
const base=path.resolve(__dirname,"..");
const page=fs.readFileSync(path.join(base,"memory-lab.html"),"utf8");
const home=fs.readFileSync(path.join(base,"app.js"),"utf8");
const script=(page.match(/<script>([\s\S]*?)<\/script>/)||[])[1];
assert.ok(script,"learning-video JS missing");
new vm.Script(script);
assert.match(page,/name="viewport"/);
assert.ok(home.includes('href="memory-lab.html"'),"missing math homepage link");
function element(){
 return {innerHTML:"",textContent:"",style:{},attrs:{},children:[],disabled:false,
 classList:{add(){},remove(){}},
 events:{},addEventListener(k,fn){this.events[k]=fn;},
 setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},
 appendChild(x){this.children.push(x);}};
}
const nodes={};for(const id of ["stage","shot","sceneList","progress","status","play","mute","next","prev"])nodes[id]=element();
const spoken=[],windowEvents={};
function Utterance(text){this.text=text;}
const synth={paused:false,getVoices(){return [{lang:"zh-CN",name:"Mandarin test voice"}]},
 cancel(){},speak(u){spoken.push({text:u.text,lang:u.lang});}};
const window={speechSynthesis:synth,SpeechSynthesisUtterance:Utterance,addEventListener(k,fn){windowEvents[k]=fn;}};
const document={getElementById(id){return nodes[id];},createElement(){return element();}};
vm.runInNewContext(script,{window,document,SpeechSynthesisUtterance:Utterance,
 setTimeout(){return 1;},clearTimeout(){},Date,console},{timeout:5000});
assert.equal(nodes.sceneList.children.length,9);
assert.match(nodes.stage.innerHTML,/不是记性差/);
nodes.play.events.click();
assert.equal(spoken.length,1);
assert.equal(spoken[0].lang,"zh-CN");
assert.ok(spoken[0].text.length>10);
nodes.next.events.click();
assert.equal(spoken.length,2);
assert.match(nodes.stage.innerHTML,/合上书/);
nodes.mute.events.click();
assert.equal(nodes.mute.attrs["aria-pressed"],"true");
nodes.play.events.click();
assert.match(nodes.play.textContent,/播放并朗读/);
console.log("PASS: 9 authored scenes, Chinese TTS, playback controls, chapter navigation and math homepage link.");
