---
title: JavaScript之作用域
url: 'https://www.yuque.com/zackdk/web/uikgt9'
created_at: '2019-03-07 14:37'
updated_at: '2023-02-02 17:07'
---

<a name="4705b884"></a>

## 作用域

作用域（scope），程序设计概念，通常来说，一段程序代码中所用到的名字并不总是有效/可用的，而限定这个名字的可用性的代码范围就是这个名字的作用域。（来自百度百科）。

***

<a name="74835e2c"></a>

## 词法作用域与动态作用域

- 词法作用域，也叫静态作用域（lexical scope），函数的作用域在函数书写的时候就决定了。JavaScript即采用的词法作用域。
- 动态作用域，是在运行时根据程序的流程信息来动态确定的，即根据程序的调用栈来确定的。

***

<a name="d5519b00"></a>

## JS之词法作用域

先看一个例子

```javascript
var a= 1;

function foo() {
    console.log(a);
}

function bar() {
    var a= 2;
    foo();
}

bar();

// 结果是 ???
```

上面的例子中，先定义变量a，再定义了函数foo，然后是函数bar，并在bar中调用了foo，最后调用bar。

**如果JS是静态作用域**，则foo函数运行时，查找自己内部是否有a变量，没有则向外层查找，此时会找到全局作用域中的a，（注意，并不是从它调用的位置向外去找，而是定义的位置向外去找）然后输出1。

**如果JS是动态作用域**，则foo函数运行时，查找自己内部是否有a变量，没有则向外层查找，此时会找到bar函数中的a，（注意，此时是从调用函数的地方开始向外找）然后输出2。

**bash脚本是采用的动态作用域。**

```bash
#!/bin/bash
a=1
foo(){
  echo $a
}
bar(){
	a=2
  foo
}
bar
```

***

<a name="3cd1dce8"></a>

## 思考题

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

结果：两段代码都会打印：local scope。

***

<a name="9fb7988a"></a>

## JS无块级作用域

**块级作用域**，任何一对花括号中的语句集都属于一个块，在这之中定义的所有变量在代码块外都是不可见的，我们称之为块级作用域。

大多数类c语言都是拥有块级作用域的，比如下面的

```c
//C语言 
#include <stdio.h> 
void main() 
{ 
    if(1) { 
        int j=3; 
    } 
    printf("%d/n",j); 
}
```

这段代码会抛出错误：

```c
error: use of undeclared identifier 'j'
```

JavaScript是无块级作用域的，同样的代码如下

```javascript
if(true) { 
    var j=3; 
} 
console.log(j);
```

是能够正常输出结果的。

再看另一个例子

```javascript
var test = 111;
var a ={
	test:222,
	b:function(){
		console.log(test);
	}
}
a.b()
```

按照静态作用域来理解的话，b函数定义在a内，b中找不到test变量，则在a中去找，找到222，输出222？

但实际运行时，输出的是111，因为a是一个对象，仅仅是一个变量，不会有作用域，b函数去找test会直接找到全局作用域中的111。

ES5中，只有全局作用域，和函数作用域两种。其它都不会产生作用域。

ES6中，已经增加块级作用域。使用let定义变量即会有块级作用域。
