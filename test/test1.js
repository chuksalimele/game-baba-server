 'use strict';
 
var n = [];
var m = {};

if (!n) {
    console.log(n);
}
if (!m) {
    console.log(m);
}


console.log(2 % 2);
//[[], [], [], []]
var n = Array(4);
n.fill([]);
//var n = [[], [], [], []];
console.log(n);
n[0].push(3);
n[2].push(7);
n[2].push(7);
n[3].push(5);
console.log(n);

console.log('--------------');

var v = [];
var p;

v.push(p);
v.push(p);
v.push(p);
console.log('v.length ', v.length);
console.log(v);

console.log('--------------');
var objInst;
for (var n in objInst) {
    console.log(n);
}

console.log('--------------');

var bb = {};
var gg;
bb[gg] = 'ss';
console.log(bb);

console.log('-------class-------');

/*function Cls(){
    
    this.method1 = function(){
        
    }
    
    this.method2 = function(){
        
    }
}
*/

class BaseCls{
    constructor() {
        
    }
    basemethod1 (){

     }
    
    basemethod2 (){
        
    }
}
class Cls extends BaseCls{
    constructor() {
        super();
    }
    method1 (){
        this.big = 9;
        console.log('method 1');
    }
    
    method2 (method){
        method();
    }
}



var c =  new Cls();
c['method2'](c.method1.bind(c));
console.log('c ', c);
var arr = Object.getOwnPropertyNames(Cls.prototype);
console.log(Object.getOwnPropertyNames(Cls.prototype));

for(var h in arr){
    console.log('h ', arr[h]);
}