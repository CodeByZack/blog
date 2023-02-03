---
title: JS中Promise的使用问题
url: 'https://www.yuque.com/zackdk/web/vyhgoc'
created_at: '2019-06-04 08:45'
updated_at: '2023-02-02 17:07'
---

这里只是记录对promise的一些疑惑点，不会具体说promise是什么东西，或者怎么使用。

<a name="Qhswp"></a>

## Promise的then的两个参数。

then有两个入参，为两个函数，如果你传其它类型的值进去，会被忽略掉。
比如 `promise.then(1,2)`
其实等同于`promise.then()`

第一个函数为reslove状态下的callback，参数为reslove的值
比如 `Promise.reslove(333).then(res=>console.log(res))`
其中res的值就为333

第二个函数为 reject状态下的callback，参数为错误信息对象
比如 `Promise.reject(111).then(()=>{},err=>console.log(err))`
其中err的值为111
另外，除了在promise内部reject值以外，当promise内部发生语法错误，或者主动抛出了错误，都会被reject捕捉到，当作callback下的入参。

```javascript
var promiseA = new Promise((reslove,reject)=>{
	reslove("这个是正常返回的结果")
})

var promiseB = new Promise((reslove,reject)=>{
	reject("这个是出错返回的结果")
})

var promiseC = new Promise((reslove,reject)=>{
	dodo("这里会产生语法错误")
})

promiseA.then(res=>console.log(res))//这个是正常返回的结果
promiseB.then(1,err=>console.log(err))//这个是出错返回的结果
promiseC.then(1,err=>console.log(err))//ReferenceError: dodo is not defined
```

<a name="YPMDr"></a>

## Promise的then的返回值。

说到底，then是一个函数，那就会有返回值，且then的返回值固定为promise对象，以便链式调用。
而then的返回值，取决于实际上调用了那个callback。具体一点来说，

当调用了resolve状态下的callback，then的返回值就取决于resolve状态下的callback的返回值。
当调用了reject状态下的callback，then的返回值就取决于reject状态下的callback的返回值。

**如果没有走任何callback，then的返回值为原promise。**
即`promiseA.then()`的返回值为promiseA

无论那种状态下，对callback的返回值处理规则都是一样的,下面统一使用resolve的callback。

**1.返回一个promise，那么then的返回值就是这个promise。**
如：`promiseA.then(res=>Promise.resolve("resolve"))`
如：`promiseA.then(res=>Promise.reject("reject"))`
如：`promiseA.then(res=>new Promise())`

**2.返回一个对象obj，那么then的返回值为Promise.resolve(obj)。**
即你返回一个非promise值，then会帮你把该值包装为一个promise，且状态为resolve。

如：`promiseA.then(res=>123)`
返回值为 Promise.resolve(123)
如：`promiseA.then(res=>{key:"123"})`
返回值为 Promise.resolve({key:"123"})

**3.没有显示返回值，那么then的返回值为Promise.resolve(undefined)**
如：promiseA.then(res=>{})

返回值为 Promise.resolve(**undefined**)

```javascript
var promiseA = new Promise((reslove,reject)=>{
	reslove("这个是正常返回的结果")
})

var resPromise = promiseA.then()

var resPromise1 = promiseA.then(res=>{})

var resPromise2 = promiseA.then(res=>123)

var resPromise3 = promiseA.then(res=>({key:123}))

var resPromise4 = promiseA.then(res=>Promise.resolve("resolve"))

var resPromise5 = promiseA.then(res=>Promise.reject("reject"))

setTimeout(()=>{
  console.log( resPromise )
  console.log( resPromise1 )
  console.log( resPromise2 )
  console.log( resPromise3 )
  console.log( resPromise4 )
  console.log( resPromise5 )
},0)

//这里解释一下，为什么需要用setTimeout来打印结果
//因为then同步返回的是一个新生成的promise,是pending状态。
//对于这个新的promise的状态改变,是异步的。
//也就是根据callback的返回值来确定新生成的promise的状态这个操作，是下一个tick才会去做。
//我也是写这个例子的时候才发现这个问题，但是不想改前面的了。
//正确说法请参考MDN相关章节
```

MDN Promise then[链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

<a name="mq8vH"></a>

## Promise的catch。

catch也是设计来捕捉错误的，reject，或者语法错误，或者主动抛出的错误,和then的第二个函数作用一样。

所以这两个是有冲突的，如果promise是reject状态，当既有then(,()=>{})又有catch的时候，catch是执行不到的。

catch也会返回一个新的promise，规则同上面所说的。

```javascript
var promiseB = new Promise((reslove,reject)=>{
	reject("这个是出错返回的结果")
})

promiseB
  .then(1,(err)=>{console.log("then")})
  .catch(err=>{console.log("catch")})
```
