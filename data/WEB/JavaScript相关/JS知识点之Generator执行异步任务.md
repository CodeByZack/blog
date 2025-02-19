---
title: JS知识点之Generator执行异步任务
url: 'https://www.yuque.com/zackdk/web/uqt0t2'
created_at: '2019-07-03 09:38'
updated_at: '2023-02-02 17:07'
---

<a name="c8ff2c48"></a>

### Generator基本的语法

```javascript
function* a(){
	console.log('hello generator');
}
var a1 = a();//这里不会执行函数内部任何代码，只会返回一个迭代器
a1.next();//这里会打印hello generator，返回值为{value:undefined,done:true}
function* b(){
    yield 1;
    yield 2;
    return 3;
}
var b1 = b();
b1.next();//{value:1,done:false}
b1.next();//{value:2,done:false}
b1.next();//{value:3,done:true}
```

<a name="9fdc86c9"></a>

#### generator可以向外输出数据

```javascript
function* b(){
    yield 1;
    yield 2;
    return 3;
}
var b1 = b();
b1.next();//{value:1,done:false}
b1.next();//{value:2,done:false}
b1.next();//{value:3,done:true}
```

其中value的值 有几种情况。

1. 遇到yield ：value为 yield后表达式的值，done为false。
2. 遇到return ：value为 return 后表达式的值，done为true。
3. 函数执行完毕，没有return ： value为undfined，done为true。

<a name="a53b1d21"></a>

#### generator可以接受外部的输入数据

yield本身并没有返回值，但next可以接收一个参数。
该参数会被当作上一个yield的返回值。

```javascript
function* c(){
    let a = yield 1;
    let b = yield a;
	return b;
}
var c1 = c();
c1.next();//{value:1,done:false}
c1.next(2);//{value:2,done:false}
c1.next(3);//{value:3,done:true}
```

<a name="d3cb8f20"></a>

#### generator特别的地方

1. 可控制代片段的暂停与执行，遇到yield暂停执行代码，外部手动调用next恢复执行。
2. 对于每一个代码段，你可以通过next函数的返回值获得代码段的输出，通过next函数传参，向代码段输入参数。
3. generator函数调用后，返回的是一个迭代器，迭代器每一次迭代都是执行某段代码片段，获得返回值。

<a name="ceed1589"></a>

### generator的执行器

generator遇到yield后回暂停执行，并不会自动恢复执行，恢复执行必须手动调用next。像下面这样。

```javascript
function *main(){
    let a = yield 1 + 2;
    let b = yield 3 + a;
    let c = yield 7 + b;
	console.log(c);
}
//这里生成迭代器，并不会执行任何函数内的代码
let m = main();
//执行到第一个yield表达式
let resObj = m.next();//{value:3,done:false}
//执行到第二个yield表达式,并把上一个yield获得的值传入，作为yield的返回值
resObj = m.next(resObj.value);//{value:6,done:false}
resObj = m.next(resObj.value);//{value:13,done:false}
```

观察上面的表达式，可以看到，手动调用next，显得很繁琐，而且其中有重复的逻辑。
把next获得的返回值作为下一次next的入参，传进generator内部。

<a name="adeca386"></a>

#### 同步任务的自动执行

所以可以写一个自动执行器，像下面这样

```javascript
function makeCall(num){
    console.log(`${num} 进行*2操作`)
    return num * 2
}
function run(generator){
    let it = generator();
    let resObj = it.next();
    while(!resObj.done){
        resObj = it.next(resObj.value);
    }
}
function *main(){
    let a = yield makeCall(2);
    let b = yield makeCall(a);
    let c = yield makeCall(b);
	console.log(c);
}
run(main);
```

因为每一次判断还可以迭代的时候，是立马执行下一个it.next()的。所以这个执行器是只能执行同步的任务。假如任务是异步的，是没法一个接一个的执行的。

<a name="c3846e8c"></a>

#### 异步任务的自动执行

异步任务，简单理解就是，发请求，请求回来过后会有一个callback来处理返回结果。
有些时候下一个异步任务需要依赖于上一个异步任务的返回值。这样的依赖一多，就会形成callback hell了。

```javascript
function makeCall(arg,callback){
    console.log(`${arg} 进行*2操作,并在1s后通知操作完成`)
	setTimeout(()=>{callback(arg*2)},1000);
}
//经典的callback形式
makeCall(111,(arg)=>{
	console.log(arg)
});
//经典的回掉地狱
makeCall(111,(res)=>{
	console.log(res)
	makeCall(res,(res2)=>{
    	console.log(res2);
	})
});
```

**利用thunk结合generator处理异步任务：**
原有的makeCall函数，callback是作为函数参数传入的，异步的请求和返回结果处理在一个函数，没有分开。在结合yield时候很不方便，或者说复杂。
所以这里需要对callback形式做一些改变，引入thunk，thunk函数介绍[链接](http://es6.ruanyifeng.com/#docs/generator-async#Thunk-%E5%87%BD%E6%95%B0)

```javascript
function makeCall(arg,callback){
    console.log(`${arg} 进行*2操作,并在1s后通知操作完成`)
	setTimeout(()=>{callback(arg*2)},1000);
}
//改造makeCall为thunk形式
function makeCallThunk (arg) {
    return function (callback) {
        return makeCall(arg, callback);
    };
};
//调用应该像下面这样
makeCallThunk(arg)(cb);
```

函数thunk化后，如果需要发起请求，需要调用两次。
第一次调用返回的是函数
第二次调用才会真正发起请求
有了thunk函数，写一个针对异步操作的自动执行器就容易多了

```javascript
//thunk版本的自动执行器
function run(fn) {
    let it = fn();
    function next(data) {
        var resObj = it.next(data);
        if (resObj.done) return;
        resObj.value(next);
    }
    next();
}
//可以仔细看下面这个代码，和执行同步任务的时候并没有什么差别。
function *makeCallGenerator(){
    let res = yield makeCallThunk(2);
    let res2 = yield makeCallThunk(res);
    let res3 = yield makeCallThunk(res2);
    console.log(res3)
}
run(makeCallGenerator)
```

**利用promise结合generator处理异步任务：**
promise都比较熟悉了，先给makeCall包装一层promise。

```javascript
function makeCall(arg,callback){
    console.log(`${arg} 进行*2操作,并在1s后通知操作完成`)
setTimeout(()=>{callback(arg*2)},1000);
}
//makeCall 包装一层promise
function makeCallPromise(arg){
	return new Promise((resolve,reject)=>{
		makeCall(arg,(res)=>{
			if(res>1000){reject(res);}else{resolve(res);}
		});
	})
}
//promise形式调用。
makeCallPromise(111)
	.then((res)=>{console.log(res)});
//promise让回调减少了一些层级，好看一些了。
makeCallPromise(111)
	.then((res)=>makeCallPromise(222))
	.then((res)=>console.log(res));
```

promise版本的执行器

```javascript
function* makeCallGenerator(){
let res = yield makeCallPromise(2);
    let res2 = yield makeCallPromise(res);
    let res3 = yield makeCallPromise(res2);
    console.log(res3)
}
//执行器
function run(gen){
	let it = gen();
	function next(data){
    	let resObj = it.next(data);
        if(resObj.done)return;
        resObj.value.then((res)=>next(res));
	}
    next();
}
run(makeCallGenerator)
```

<a name="23abcbd1"></a>

### 两个问题

1. **使用generator执行异步操作的好处。**
2. **与async，await的差异。**

<a name="04b6391b"></a>

#### 使用generator执行异步操作的好处。

```javascript
//异步任务
function* makeCallGenerator(){
	let res = yield makeCallPromise(2);
    let res2 = yield makeCallPromise(res);
    let res3 = yield makeCallPromise(res2);
    console.log(res3)
}
run(makeCallGenerator)
console.log(1);
//同步任务
function *main(){
    let a = yield makeCall(2);
    let b = yield makeCall(a);
    let c = yield makeCall(b);
	console.log(c);
}
run(main);
console.log(1);
```

抛开generator的执行器不看，异步任务和同步任务的写法几乎一模一样。

<a name="923a5f2b"></a>

#### 与async，await的差异。

```javascript
//generator
function* makeCallGenerator(){
	let res = yield makeCallPromise(2);
    let res2 = yield makeCallPromise(res);
    let res3 = yield makeCallPromise(res2);
    console.log(res3)
}
run(makeCallGenerator)
//async await
async function makeCallCopy(){
    let res = await makeCallPromise(2);
    let res2 = await makeCallPromise(res);
    let res3 = await makeCallPromise(res2);
    console.log(res3)
}
makeCallCopy();
```

写法几乎一模一样，只不过 * 号变成了 async，yield 变成了 await。
但async/await执行器是自带的，generator执行器需要自己去手写，但也意味着更多可能。
另外 async/await 默认是 使用的 generator + promise的形式执行异步任务，是这个模式之上的语法糖，能很好的解决异步任务。
但generator除了结合promise 和可以结合类似thunk之类的去执行异步任务。 <a name="end"></a>

#
