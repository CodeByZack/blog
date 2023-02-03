---
title: JS知识点之神奇的闭包
url: 'https://www.yuque.com/zackdk/web/zmu3a7'
created_at: '2019-12-30 13:48'
updated_at: '2020-10-20 11:48'
---

<a name="usF9A"></a>

## 1.定义

> 函数与对其状态即**词法环境**（**lexical environment**）的引用共同构成**闭包**（**closure**）。[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

<br />
> A closure is a pair consisting of the **function code** and the **environment** in which the function is created.[链接](http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-1-lexical-environments-common-theory/#static-lexical-scope)

最开始看这个定义的时候，不知所云。当随着对闭包的理解，看这个定义就觉得简练而准确。这两个定义，是我现在比较认同的定义。

定义提到了两个东西 **函数本身 **和 **定义函数时的词法环境**。

函数本身，比较简单，就是定义函数时写的代码。
词法环境，也叫[静态作用域](https://baike.baidu.com/item/%E9%9D%99%E6%80%81%E4%BD%9C%E7%94%A8%E5%9F%9F/7794656?fr=aladdin)，简单来说，就是你定义函数时，函数内部使用的变量是根据你书写代码的位置来确定的，而不是根据调用来确定的。函数的外部作用域之所以被闭包保存下来，是用于将来函数执行时的变量查找。

[语雀内容](JavaScript之作用域.md)

<a name="8ufke"></a>

## 2.理解

js里函数是头等公民“first-class”，意味着函数可以作为参数传递进另一个函数，可以作为函数的返回值返回。本来是没什么问题的，但当函数内部还存在自由变量时，这就会导致一个很经典的问题[Funarg problem]()。

<a name="WIO6s"></a>

### 自由变量

除了以下两种，函数参数，函数内部定义的变量，之外的变量。

<a name="hS3ae"></a>

### Funarg Problem

这个还细分为两个子类：
当函数作为参数传进另一个函数的时候。一般称为***downward funarg problem。***
当函数作为返回值的时候。一般称为***upward funarg problem*\_。\_**

1.***downward funarg problem***
**

```javascript
let x = 10;
 
function foo() {
  console.log(x);
}
 
function bar(funArg) {
  let x = 20;
  funArg(); // 10, not 20!
}
 
// Pass `foo` as an argument to `bar`.
bar(foo);
```

对于函数foo来说，x是自由变量。当函数调用的时候（通过funArg），x应该如何解析呢，是定义时候的外部作用域里去找，还是执行时的作用域呢？此时变量的查找就会存在多义性。

JS采用词法作用域来避免这个多义性，使用\[\[Scope]]来保存这个词法作用域的引用。
这一手段其实就是闭包的核心，在创建函数的时候，保存以词法作用域为准的父作用域的引用，用以将来函数调用时进行变量查找。

*2.****upward funarg problem***
**

```javascript
function foo() {
  let x = 10;
   
  // Closure, capturing environment of `foo`.
  function bar() {
    return x;
  }
 
  // Upward funarg.
  return bar;
}
 
let x = 20;
 
// Call to `foo` returns `bar` closure.
let bar = foo();
 
bar(); // 10, not 20!

```

正常来说，函数执行完毕后，函数会被回收掉。所以当foo执行完毕后，foo就被回收掉了。此时bar的父环境作用域已经不存在了，如果bar函数中依赖父环境中的变量，那么函数执行结果就不会符合预期了。

由于JS中闭包的存在，foo执行完毕后，并没有释放而是被bar函数引用，而保留下来了。所以这个问题也就迎刃而解了。

<a name="RPGAe"></a>

### 小结

那闭包到底是个什么东西呢？
首先你得明白两个名词 ，词法作用域和自由变量。
然后JS里函数是可以作为变量传递的，那就意味着1.函数可以作为参数传递进另一个函数，2.函数可以作为另一个函数的返回值返回出去。先抛开静态作用域和闭包，就可以发现函数式语言的经典问题，funarg problem。

针对第一种情况，作为参数传入另一个函数。那就意味着函数定义的地方和函数执行的地方不一定是一个作用域，很可能是两个作用域。那么这个时候如果函数内部存在自由变量，该去那个作用域里查找变量呢?这时便存在二义性。
JS里采用了词法作用域，来消除这个二义性，即自由变量的值由函数定义时的作用域查找而来。这只是确定了规则，还无法实施，既然要在定义时的作用域里查找，那么就需要把这个作用域的引用保存下来，如何保存呢？JS里在定义函数的时候有一个隐藏属性叫\[\[scope]]，就是用来指向作用域的。这就是我理解的闭包背后所做的事情了，保留函数定义时的作用域用于自由变量的查找。

第二种情况，其实也差不多，函数作为另一个函数的返回值。正常来说函数执行完毕，会立即释放。那么要是返回的函数依赖于已经释放的变量，那么返回的函数执行的时候就会有问题。解决的方法同样是闭包 ，这种情况，由于作为返回值的函数持有定义时作用域的引用，所以函数执行完了，并没有释放，而是保留下来了。

所以闭包是什么，我个人认为说闭包是一种解决funarg的技术手段更合理一些，这也是导致我们经常感觉说不清楚 闭包是什么的原因。看完这乱起八糟的一团，我也觉得文章最开始给的那个定义也蛮合适的。闭包是由函数代码和其外部作用域的引用共同构成的。

综上所述，可以看出闭包和词法作用域，的确是解决了funarg问题。但为什么一定是闭包和词法作用域呢？可以是其它的手段么？

js里只有全局作用域和函数作用域（ES5）,函数定义的时候，就持有了一个全局作用域的引用，这个意义上所有函数都使用了闭包。

<a name="k4oLo"></a>

## 3.作用

1.私有变量
2.模块化
