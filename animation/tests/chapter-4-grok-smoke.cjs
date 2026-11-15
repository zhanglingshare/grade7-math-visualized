(function legacyMathTest(){
 "use strict";
 const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
 const root=path.resolve(__dirname,"../.."),src=fs.readFileSync(path.join(root,"animation/chapter-4.html"),"utf8");
 assert.match(src,/<title>第四章 整式的加减/);
 assert.match(src,/aria-current="page">第四章/);
 assert.match(src,/const f=\{1:'index.html',2:'chapter-2.html',3:'chapter-3.html',4:'chapter-4.html'\}/);
 const before=src.indexOf("<script>"),after=src.lastIndexOf("</script>");
 assert.ok(before>=0&&after>before);
 const code=src.slice(before+"<script>".length,after).replace(/\nroute\(\);\s*$/,"");
 const env={console,window:{addEventListener(){}},location:{href:"http://localhost/animation/chapter-4.html",hash:""},localStorage:{getItem(){return null},setItem(){}},Math,Date,Set,Map,URL,document:{createElementNS(){return{}},createElement(){return{}},querySelector(){return null},querySelectorAll(){return []}},requestAnimationFrame(){},setTimeout(){},clearTimeout(){},performance:{now(){return 0}}};
 env.window.window=env.window;
 const audit=String.raw`
 const checks={fixed:0,generated:0,bad:[],types:{"b":0,"v":0,"e":0}};
 if(LESSONS.length!==6)checks.bad.push("expected 6 lessons");
 function valid(q,label){
  if(!q||!q.q||!q.t){checks.bad.push(label+" invalid definition");return;}
  if(q.in){const grade=gradeTyped(q,q.at);if(!grade||!grade.ok)checks.bad.push(label+" expected answer rejected: "+q.at);}
  else if(!q.o||q.a<0||q.a>=q.o.length||new Set(q.o).size!==q.o.length)checks.bad.push(label+" duplicate or bad options");
 }
 for(const L of LESSONS){
  if(L.quiz.length!==30)checks.bad.push(L.id+" expected 30 fixed");
  for(const q of L.quiz){checks.fixed++;if(checks.types[q.t]!==undefined)checks.types[q.t]++;valid(q,L.id+" fixed");}
  for(let i=0;i<30;i++)for(const gen of GEN[L.id]){const q=gen();checks.generated++;valid(q,L.id+" generated "+i);}
 }
 if(checks.types.b!==60||checks.types.v!==60||checks.types.e!==60)checks.bad.push("wrong difficulty distribution");
 const link=DX.link("cnm_026");
 if(!link.href||!link.href.includes("chapter-3.html"))checks.bad.push("wrong chapter 3 backlink "+JSON.stringify(link));
 const link2=DX.link("cnm_031");
 if(!link2.href||!link2.href.includes("#/L1"))checks.bad.push("wrong in-chapter backlink "+JSON.stringify(link2));
 return checks;
 `;
 const result=vm.runInNewContext(code+"\n"+`(function(){${audit}})();`,env,{timeout:30000});
 assert.deepEqual(result.bad,[]);
 assert.equal(result.fixed,180);
 assert.equal(result.generated,1080);
 console.log("PASS: legacy Grok fourth chapter, 6 interactive lessons, 180 fixed questions, 1080 generated samples, correct grading and real chapter backlinks.");
})();
