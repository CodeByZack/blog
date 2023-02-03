---
title: ES6之变量的解构赋值
url: 'https://www.yuque.com/zackdk/web/nw7yy2'
created_at: '2019-03-07 13:21'
updated_at: '2023-02-02 17:07'
---

解构赋值（Destructuring）：从数组和对象中提取值，对变量进行赋值。 <a name="47f40e55"></a>

## 数组的解构赋值

<a name="704f29e0"></a>

### 基本用法

```javascript
//基本用法
let [a, b, c] = [1, 2, 3];
// a = 1,b = 2,c = 3

//解构失败
let [a, b, c, d ] = [1, 2, 3];
// a = 1,b = 2,c = 3,d=undefined

//部分解构 
let [a, b] = [1, 2, 3];
// a = 1,b = 2
```

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

如果解构不成功，变量的值就等于undefined。

部分解构，既变量数不相等，仍然可以解构成功。

```javascript
//以下用法都会报错

let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

//is not iterable
```

数组的解构是要求右边的值部署有Iterator接口的。

上面的语句之所以报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。

这就是说等号的右边如果不是数组（或者严格地说，不是可遍历的结构），那么将会报错。

```javascript
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"

function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

因为Set 具备Iterator接口 可以进行解构赋值。

fibs是一个 Generator 函数，原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。

<a name="225f3ed0"></a>

### 默认值

解构赋值允许指定默认值。

```javascript
let [foo = true] = [];
foo // true
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，**只有当一个数组成员****严格等于undefined****，默认值才会生效。**

因为null不严格等于undefined,所以默认值不会生效。

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```javascript
function f() {
  console.log('aaa');
}
let [x = f()] = [1];
```

上面代码中，因为x能取到值，所以函数f根本不会执行。

默认值可以引用解构赋值的其他变量，但该变量必须已经声明，所以声明顺序很重要。

```javascript
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

因为x用y做默认值时，y还没有声明,所以会报错。

<a name="19ad6b0b"></a>

## 对象的解构赋值

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。对象的结构是依靠key值，也就是属性名来进行的。

```javascript
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
```

如果希望变量名与属性名不同。必须像下面这样写。

```javascript
let { foo:too, bar:boo } = { foo: "aaa", bar: "bbb" };
too // "aaa"
boo // "bbb"
```

这实际上证明了对象的解构赋值时如下方式的简写。

```javascript
let { foo:foo, bar:bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
```

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，前者是同名属性。所以如下代码是会报错的。

```javascript
let { foo:bar} = { foo: "aaa" };
bar // "aaa"
foo // error: foo is not defined
```

和数组一样对象的解构也可以指定默认值，生效的条件也是属性值严格等于undefined。

```javascript
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```

<a name="8b161c94"></a>

## 函数参数的解构赋值

```javascript
//参数为数组时
function add([x,y=0]){
    return x+y;
}

add([1,2]) // 3
add([1]) // 1

//参数为对象时
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

上述add函数传入的参数值为一个数组，但对于函数来说，这个数组被解构为了 x 和 y 两个变量，同样也支持默认值，当对应位置的值严格等于undefined时，默认值生效。

move函数同理。两个最大的差别在于。数组是有序的，而对象的属性是可以无序的。
另外上面 ={} 是参数的默认值，不写这个，直接调用move()，不传参数时，是会报错的。因为无法对不存在的参数解构。

<a name="83ebda29"></a>

## 其它情况

<a name="5ccd658c"></a>

## 解构赋值的常见用途

<a name="082ed663"></a>

### 交换变量的值

```javascript
let x = 1;
let y = 2;

[x, y] = [y, x];
```

上面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰。

<a name="95cf6d22"></a>

### 函数参数的定义

```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

解构赋值可以方便地将一组参数与变量名对应起来。

<a name="5e505215"></a>

### 函数参数的默认值

```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

<a name="fae5ceed"></a>

### 遍历 Map 结构

任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```javascript
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```

<a name="d150ea02"></a>

### 输入模块的指定方法

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
```

大部分参考自阮一峰老师的：[变量的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring#%E6%95%B0%E7%BB%84%E7%9A%84%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC)
