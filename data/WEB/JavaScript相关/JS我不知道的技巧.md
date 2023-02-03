---
title: JS我不知道的技巧
url: 'https://www.yuque.com/zackdk/web/uys2r2'
created_at: '2019-03-07 13:55'
updated_at: '2021-12-30 11:17'
---

<a name="5da89314"></a>

## 最大值

```javascript
Math.max(10,2,33,55); //55
//针对数组
Math.max(...[10,2,33,55]);
```

<a name="d93a8b48"></a>

## 数组，字符串去重

```javascript
// 去除数组的重复成员
[...new Set(array)]
//字符串去重
[...new Set('ababbc')].join('')
```

<a name="b06baad0"></a>

## 关于箭头函数的疑惑

```javascript
let test = {bar:()=>{console.log(this)}};
function scope(){
	let test2 = {bar:()=>{console.log(this)}};
	test.bar();
	test2.bar();
}
let t = {run:scope};
t.run();
```

- 函数运行时（执行环境）会有一个this参数传递进来。
- 对象不会运行，不存在this。
- 箭头函数没有this，this是外层执行作用域上的一个变量，外层执行作用域的this指向由绑定规则决定。

<a name="iOVU5"></a>

## 关于取整

```javascript
~~3.122222

//3
```

<a name="4aoCG"></a>

## deepGet

当对象嵌套层级太深时，可以使用这个方法来获取你想要的值。

```javascript
const deepGet = (obj, keys) => keys.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), obj);

let index = 2;
const data = {
  foo: {
    foz: [1, 2, 3],
    bar: {
      baz: ['a', 'b', 'c']
    }
  }
};
deepGet(data, ['foo', 'foz', index]); // get 3
deepGet(data, ['foo', 'bar', 'baz', 8, 'foz']); // null
```

<a name="8soBn"></a>

## 深拷贝

```javascript
function deepClone(obj, cache = []){
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const has = cache.filter(c => c.orignal === obj)[0];
  if (has) {
    return has.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  cache.push({
    orignal: obj,
    copy
  });

  Object.keys(obj).forEach(key => {
    copy[key] = deepClone(obj[key], cache);
  });
  return copy;
}

const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```

<a name="rgAy8"></a>

## 挖掘

```javascript
const dig = (obj, target) =>
  target in obj
    ? obj[target]
    : Object.values(obj).reduce((acc, val) => {
      if (acc !== undefined) return acc;
      if (typeof val === 'object') return dig(val, target);
    }, undefined);


const data = {
  level1: {
    level2: {
      level3: 'some data'
    }
  }
};
dig(data, 'level3'); // 'some data'
dig(data, 'level4'); // undefined
```

<a name="MMGjv"></a>

##

<a name="zfmxi"></a>

## 生成随机整数

```javascript
const randomNum = (min,max)=>{
	max || (max=min,min=0)
	return  parseInt(Math.random()*(max-min+1)+min,10);
}
```

<a name="ZJKrs"></a>

## axios缺失content-type

在浏览器端使用的时候，post请求如果没有带data，会缺失content-type这个头部信息。
这是因为axios在发请求时做了一次过滤，当data为空，会主动删除content-type。
axios源码如下

```javascript
  // Add headers to the request
  if ('setRequestHeader' in request) {
    utils.forEach(requestHeaders, function setRequestHeader(val, key) {
      if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
        // Remove Content-Type if data is undefined
        delete requestHeaders[key];
      } else {
        // Otherwise add header to the request
        request.setRequestHeader(key, val);
      }
    });
  }
```


其实应该删除，因为没有data（即请求体/body/request-payload），content-type确实没必要。
