---
title: JS知识点之数据类型一览
created_at: '2019-03-07 14:33'
updated_at: '2022-07-28 13:28'
---

## JavaScript中的变量类型有哪些？

### 值类型：

字符串（string）、数值（number）、布尔值（boolean）、undefined


### 引用类型：

对象（Object）、数组（Array）、函数（Function） 

## 标题值类型和引用类型的区别

### 值类型（基本类型）：

1. 占用空间固定，保存在栈中。
2. 保存与复制的是值本身。
3. 使用typeof检测数据的类型
4. 基本类型数据是值类型

```javascript
//复制的是值本身
var a = 10; 
var b = a;
b = 12;
console.log(a); //10
console.log(b); //12

//使用typeof 检测数据类型
typeof(10) //"number"
typeof("") //"string"
typeof(true) //"boolean"
typeof(undefined) //"undefined"

//无法检测出null，可检测出function
typeof(null) //"object"
typeof(function(){}) //"function"
```



### 引用类型（Object）：

1. 占用空间不固定，保存在堆中，栈中保存的只是一个指针。
2. 保存与复制的是指向对象的一个指针。
3. 使用instanceof检测数据类型。

```javascript
//复制的是执向对象的指针
var a = {t:10}; 
var b = a;
b.t = 12;
console.log(a); //{t:12}
console.log(b); //{t:12}

//使用instanceof检测数据类型，
//实际上是判断对象的__proto__是否指向了构造函数的prototype。
var a = function(){};
a instanceof Function//true
a.__proto__ == Function.prototype//true

var a = [];
a instanceof Array//true
a.__proto__ == Array.prototype//true

function study(){};
var a = new study();
a instanceof study//true
a.__proto__ == study.prototype//true
```



## 使用tostring方法检测类型

toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 \[\[Class]] 。这是一个内部属性，其格式为 \[object Xxx] ，其中 Xxx 就是对象的类型。

对于 Object 对象，直接调用 toString()  就能返回 \[object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。

```javascript
Object.prototype.toString.call('') ;   // [object String]

Object.prototype.toString.call(1) ;    // [object Number]

Object.prototype.toString.call(true) ; // [object Boolean]

Object.prototype.toString.call(Symbol()); //[object Symbol]

Object.prototype.toString.call(undefined) ; // [object Undefined]

Object.prototype.toString.call(null) ; // [object Null]

Object.prototype.toString.call(new Function()) ; // [object Function]

Object.prototype.toString.call(new Date()) ; // [object Date]

Object.prototype.toString.call([]) ; // [object Array]

Object.prototype.toString.call(new RegExp()) ; // [object RegExp]

Object.prototype.toString.call(new Error()) ; // [object Error]

Object.prototype.toString.call(document) ; // [object HTMLDocument]

Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用
```

稍微封装一下

```javascript
const isObject = function(target){ 
    return Object.prototype.toString.call(target) === '[object Object]'; 
}

const isNumber = function(target){ 
    return Object.prototype.toString.call(target) === '[object Number]'; 
}

const isString = function(target){ 
    return Object.prototype.toString.call(target) === '[object String]'; 
}

const isUndefined = function(target){ 
    return Object.prototype.toString.call(target) === '[object Undefined]'; 
}

const isBoolean = function(target){ 
    return Object.prototype.toString.call(target) === '[object Boolean]'; 
}

const isArray = function(target){ 
    return Object.prototype.toString.call(target) === '[object Array]'; 
}

const isFunction = function(target){ 
    return Object.prototype.toString.call(target) === '[object Function]'; 
}
```

再次封装一下

```javascript
const checkType = (type)=>{
	return (target)=>{
		return Object.prototype.toString.call(target) === `[object ${type}]`;
	}
}

isObject = checkType('Object');
isArray = checkType('Array');
isFunction = checkType('Function');
isBoolean = checkType('Boolean');
isString = checkType('String');
isNumber = checkType('Number');
isUndefined = checkType('Undefined');

```
