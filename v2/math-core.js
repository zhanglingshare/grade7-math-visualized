(function(global){
  'use strict';
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
  function fraction(n,d){if(d===undefined)d=1;if(!Number.isFinite(n)||!Number.isFinite(d)||d===0)throw Error('分母不能为0。');if(!Number.isSafeInteger(n)||!Number.isSafeInteger(d))throw Error('这个数太大，请换一个较小的数。');if(d<0){n=-n;d=-d;}var g=gcd(n,d);return {n:n/g,d:d/g};}
  function parse(value){if(value&&typeof value==='object'&&'n' in value)return fraction(value.n,value.d);var str=String(value).trim().replace(/−/g,'-');if(str.indexOf('/')>=0){var parts=str.split('/');if(parts.length!==2)throw Error('请填写整数、小数或分数，例如 −3、0.5、−1/2。');return div(parse(parts[0]),parse(parts[1]));}if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(str))throw Error('请填写整数、小数或分数，例如 −3、0.5、−1/2。');var negative=str.charAt(0)==='-';str=str.replace(/^[+-]/,'');var bits=str.split('.');var digits=(bits[1]||'');if(digits.length>6)throw Error('本实验最多输入6位小数。');return fraction((negative?-1:1)*Number((bits[0]||'0')+digits),Math.pow(10,digits.length));}
  function add(a,b){a=parse(a);b=parse(b);return fraction(a.n*b.d+b.n*a.d,a.d*b.d);}
  function sub(a,b){b=parse(b);return add(a,fraction(-b.n,b.d));}
  function mul(a,b){a=parse(a);b=parse(b);return fraction(a.n*b.n,a.d*b.d);}
  function div(a,b){a=parse(a);b=parse(b);if(b.n===0)throw Error('除数不能为0；0没有倒数。');return fraction(a.n*b.d,a.d*b.n);}
  function pow(a,n){a=parse(a);if(!Number.isInteger(n)||n<0)throw Error('这里的指数取非负整数。');if(n===0&&a.n===0)throw Error('本课程不计算0的0次方。');return fraction(Math.pow(a.n,n),Math.pow(a.d,n));}
  function num(a){a=parse(a);return a.n/a.d;}
  function fmt(a){a=parse(a);var sign=a.n<0?'−':'';return sign+Math.abs(a.n)+(a.d===1?'':'/'+a.d);}
  function decimal(a,places){var v=typeof a==='number'?a:num(a);if(!Number.isFinite(v))return '—';return String(Number(v.toFixed(places===undefined?4:places))).replace('-','−');}
  function signed(a){var n=typeof a==='number'?a:num(a);return n>0?'+'+decimal(n):decimal(n);}
  function par(a){var f=parse(a);return f.n<0?'('+fmt(f)+')':fmt(f);}
  function roundDecimal(source,digits){var text=String(source).trim().replace(/−/g,'-');if(!/^[+-]?(?:\d+)(?:\.\d*)?$/.test(text))throw Error('请输入普通小数或整数。');if(!Number.isInteger(digits)||digits<0||digits>4)throw Error('请选择0至4位小数。');var neg=text.charAt(0)==='-';text=text.replace(/^[+-]/,'');var parts=text.split('.'),whole=parts[0],tail=parts[1]||'';var keep=(tail+'00000').slice(0,digits);var n=BigInt(whole+keep);if(Number((tail+'0').charAt(digits))>=5)n+=1n;var str=n.toString().padStart(digits+1,'0');var answer=digits?str.slice(0,-digits)+'.'+str.slice(-digits):str;return (neg&&n!==0n?'−':'')+answer;}
  function scientific(source){var text=String(source).trim().replace(/−/g,'-');if(!/^-?\d{2,12}$/.test(text))throw Error('请输入绝对值至少为10、最多12位的整数。');var negative=text.charAt(0)==='-';var digits=text.replace('-','').replace(/^0+/,'');if(digits.length<2)throw Error('本节先研究绝对值至少为10的整数。');var tail=digits.slice(1).replace(/0+$/,'');return {coefficient:(negative?'−':'')+digits[0]+(tail?'.'+tail:''),exponent:digits.length-1,digits:digits,negative:negative};}
  function substitute(kind,a,b){a=parse(a);b=parse(b);if(kind==='linear')return add(mul(2,a),mul(3,b));if(kind==='square')return add(add(pow(a,2),mul(mul(2,a),b)),pow(b,2));return sub(pow(a,2),div(b,a));}
  function classification(raw){var v=num(raw);return {sign:v>0?'正有理数':v<0?'负有理数':'0',integer:Number.isInteger(v),fraction:parse(raw)};}
  function baseDigits(value,base){if(!Number.isInteger(value)||value<0||value>255)throw Error('本实验使用0至255的整数。');if([2,8,10].indexOf(base)<0)throw Error('请选择二、八或十进制。');var count=base===2?8:3;return value.toString(base).padStart(count,'0').split('').map(function(d,i){var power=count-i-1;return {digit:Number(d),power:power,weight:Math.pow(base,power)};});}
  function cipher(text,shift){return String(text).replace(/[a-z]/gi,function(c){var start=c===c.toUpperCase()?65:97;return String.fromCharCode(start+((c.charCodeAt(0)-start+shift)%26+26)%26);});}
  function magic(values){if(values.length!==9||values.some(function(v){return !Number.isInteger(v)||v< -4||v>4;})||new Set(values).size!==9)return {valid:false,message:'把−4到4这9个整数各用一次，每格填一个。'};var lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].map(function(ids){return ids.reduce(function(total,i){return total+values[i];},0);});return {valid:true,solved:lines.every(function(v){return v===0;}),lines:lines};}
  function equivalent(a,b){try{var aa=parse(a),bb=parse(b);return aa.n===bb.n&&aa.d===bb.d;}catch(e){return false;}}
  var orderCases=[
    {title:'先乘方，再乘除',steps:[{expression:'4 + (−2)³ ÷ 2',choices:['(−2)³','4 + (−2)','3 ÷ 2'],answer:0,why:'底数是整个−2，先算它的三次方，得到−8。'},{expression:'4 + (−8) ÷ 2',choices:['4 + (−8)','(−8) ÷ 2','先把所有负号去掉'],answer:1,why:'乘除在加减之前，先算(−8)÷2=−4。'},{expression:'4 + (−4)',choices:['8','−8','0'],answer:2,why:'互为相反数的两个数相加，结果为0。'},{expression:'0',done:true}]},
    {title:'括号里先完成',steps:[{expression:'[(−3) + 1]² × 2',choices:['1²','(−3) + 1','先把2×2'],answer:1,why:'先算括号内的−3+1，得到−2。'},{expression:'(−2)² × 2',choices:['(−2)²','2 × 2','−2 + 2'],answer:0,why:'先算乘方，(−2)²=4。'},{expression:'4 × 2',choices:['6','−8','8'],answer:2,why:'4×2=8。'},{expression:'8',done:true}]},
    {title:'同级，从左到右',steps:[{expression:'12 ÷ (−3) × 2',choices:['(−3) × 2','12 ÷ (−3)','12 × 2'],answer:1,why:'乘除同级，按从左到右的顺序，先得到−4。'},{expression:'(−4) × 2',choices:['−8','−2','8'],answer:0,why:'异号两数相乘得负，4×2=8。'},{expression:'−8',done:true}]}
  ];
  var api={fraction:fraction,parse:parse,add:add,sub:sub,mul:mul,div:div,pow:pow,num:num,fmt:fmt,decimal:decimal,signed:signed,par:par,roundDecimal:roundDecimal,scientific:scientific,substitute:substitute,classification:classification,baseDigits:baseDigits,cipher:cipher,magic:magic,equivalent:equivalent,orderCases:orderCases};
  global.MathLab=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
