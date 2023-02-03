---
title: ES6之let const
url: 'https://www.yuque.com/zackdk/web/ldkedk'
created_at: '2019-03-07 13:14'
updated_at: '2023-02-02 17:07'
---

在ES6之前，js只有全局作用域和函数作用域，声明变量一般用var，否则就是全局变量。
ES6，新增了块级作用域，声明变量多了两个关键字let,const。 <a name="0665242f"></a>

## 块级作用域

对于从安卓转到前端的我来说，ES5没有块级作用域，还是很容易造成代码理解的错误的。

```javascript
for(var i=0;i<10;i++){
    //do something...
}

console.log(i);//   10
```

按照java的习惯，i 变量应该是只在for代码块里生效的。但是js里，这样声明的 i 就是全局变量。这就是因为js没有块级作用域。

ES6新增了块级作用域。既let,const,让{ }之间拥有了块级作用域。

```javascript
{
    let t = 0;
}

console.log(t); //Uncaught ReferenceError

for(let i=0;i<10;i++){
    //do something...
}

console.log(i); //Uncaught ReferenceError
```

<a name="f93ec1d0"></a>

## let关键字

<a name="704f29e0"></a>

### 基本用法

```javascript
{
    let t = 0;
    var m = 1; 
}

console.log(t); //Uncaught ReferenceError
console.log(m); //1
```

上面代码在代码块之中，分别用let和var声明了两个变量。然后在代码块之外调用这两个变量，结果let声明的变量报错，var声明的变量返回了正确的值。这表明，let声明的变量只在它所在的代码块有效。

<a name="5625aedb"></a>

### 不存在变量提升

let不像var那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。

```javascript
console.log(foo); // 输出undefined
console.log(bar); // 报错ReferenceError

var foo = 2;
let bar = 2;
```

上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误，所以使用let请先声明，后使用。

<a name="45a566a3"></a>

### 暂时性死区（temporal dead zone）

只要块级作用域内存在let命令，它所声明的变量在声明之前都是不可用的，即使全局变量中存在同名变量。

```javascript
var tmp = 111；

if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称TDZ）。

<a name="dccd9155"></a>

### 不允许重复声明

let不允许在相同作用域内，重复声明同一个变量。

```javascript
// 报错
function () {
  let a = 10;
  var a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;
}
```

因此，不能在函数内部重新声明参数。

```javascript
function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```

<a name="27fce117"></a>

## const关键字

const特性与let基本一致。

const声明一个只读的常量。一旦声明，常量的值就不能改变。

```javascript
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

上面代码表明改变常量的值会报错。

const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。

```javascript
const a = 1;
a // 1

a = 3;
// TypeError: Assignment to constant variable.


const b = { a:1,c:2 };
b //  { a:1,c:2 }

b = {};
// TypeError: Assignment to constant variable.

b.a = 3;

b.c =12;

b //  { a:3,c:12 }
```

js的变量可以分为两类，值类型，引用类型。

引用类型，变量其实储存的可以理解为一个内存地址，真正的内容储存在内存地址所指向的内存。

const修饰引用类型时，const只是限制了引用的地址不能改变，并不会限制地址指向的内容不改变。
