---
title: JS里各种循环总结
url: 'https://www.yuque.com/zackdk/web/xmo7kg'
created_at: '2019-03-07 14:19'
updated_at: '2023-02-02 17:07'
---

这篇文章起源于一道面试题，找出一个字符串中，出现次数最多的字符。面试题不难,正常思路是遍历字符串，统计下字符个数，再排个序，找出最大的。
可是可是，好久没手写代码的我，写不来for循环了，平时太依赖自动提示了，依赖调试工具了，都是写错了，然后看报错信息然后改就行。所以所以有了这篇文章。 <a name="9e260d4a"></a>

## 普通for循环

普通for循环可 遍历** 数组** **字符串**。

```javascript
//遍历数组
let array = [1,2,3];
for(let i =0; i<array.length; i++){
   const value = array[i];
   console.log(value);
}
//遍历字符串
let str = "hello zack!";
for(let i =0; i<str.length; i++){
   const value = str[i];
   console.log(value);
}
```

<a name="c6ef0d10"></a>

## for...in遍历

for...in可用于遍历**字符串**，**对象**，**数组**

```javascript
//遍历数组
let array = [1,2,3];
for(let i in array){
   const value = array[i];
   console.log(value);
}
//遍历字符串
let str = "hello zack!";
for(let i in str){
   const value = str[i];
   console.log(value);
}
//遍历对象
let obj={name:"zack",age:24};
for(let i in obj){
   const value = obj[i];
   console.log(value);
}
```

<a name="00b9902a"></a>

## forEach 遍历

forEach在ES6之前是数组特有的方法，只能用于遍历数组。ES6之后，新增了Set和Map数据解构，也带有forEach方法。

```javascript
//遍历数组
let array = [1,2,3,4];
array.forEach(function(value){
   console.log(value);
})
//遍历Set
let array = [1,2,3,4];
let set = new Set(array);
set.forEach(function(value){
   console.log(value);
})
//遍历Map
let map= new Map([["a",{}],["b","sss"],["c",222]]);
map.forEach(function(value,key){
   console.log(key+"=="+value);
})
```

<a name="ffb76f6a"></a>

## for...of ES6新增

for...of 用于遍历部署了迭代器接口`Symbol.iterator`的数据解构。
ES6以后部署了迭代器接口的数据解构有，数组，字符串，Set，Map。对象是没有这个接口的，也就是说for...of不能用于遍历对象。

```javascript
//遍历字符串
let str ="string";
for(let v of str){
   console.log(v);
}
//遍历数组
let array = [1,2,3,4];
for(let v of array){
   console.log(v);
}
//遍历Set
let array = [1,2,3,4];
let set = new Set(array);
for(let v of set ){
   console.log(v);
}
//遍历Map
let map= new Map([["a",{}],["b","sss"],["c",222]]);
for(let v of map){
   console.log(v[0]+":"+v[1]);
}
//利用解构直接获取key，value
for(let [key,value] of map){
   console.log(key+":"+value);
}
for(let v of map.keys()){
   console.log(v);
}
for(let v of map.values()){
   console.log(v);
}
```

通过一些操作也是可以遍历对象的，可以选择手动给对象添加一个迭代器接口，或者是把对象转换为其它数据结构。

```javascript
//通过Object.valuse 获取对象的所有值。
let obj={name:"zack",age:24};
for(let v of Object.values(obj)){
   console.log(v);
}
```

<a name="c4bb1b6c"></a>

## 最后给出开始那道面试题的参考。

```javascript
function findMax(str){
   //统计字符
   let count = {};
   for(let char of str){
       if(count[char] == null){
           count[char]=1;
       }else{
           count[char]++;
       }
   }
   //排序
   let res = Object.entries(count).sort((a,b)=>{
       return b[1]-a[1];
   })
   
   return res[0];
}
```
