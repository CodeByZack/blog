---
title: JS里继承相关的东西
created_at: '2019-03-18 14:40'
updated_at: '2022-01-26 10:16'
---

 
一直没去看es6的class关键字，按理来说从java转过来的应该更习惯于class这种语法糖的。但深入了解JavaScript过后，发现js里的类和java里的类是有本质差异的。所以更倾向于使用es5，更能理解js这种语言背后的东西。



## ES5的类和继承

JavaScript里是没有其它语言里的类的，真的没有。
类是一种模板，通过这个模板生成对象。
模板不可操作调用，真正可操作的是生成的对象。

JS里，实现对象的手段简单来说利用了this，利用了原型链。
this的运行时绑定特性实现了给新建对象添加自己的属性或者方法。
原型链则让生成的对象和构造函数相互关联上，以便模拟类的继承，公用方法，等特性。

不同点：
js没有模板（类），相对应的就是函数，函数本身是可以操作调用的。
js生成对象的过程其实就是函数的构造方式调用（按照一定规则执行函数，并返回一个新对象）。
js继承是基于原型链的，本质上是一种关联模式。和从类模板生成一个全新的对象有本质差异。

<a name="704f29e0"></a>

### 基本用法

```javascript
function Dog(name){
  //使用new调用Dog时,this会指向新生成的对象,所以以下就是在新对象上添加属性了.
	this.name = name;
  this.barking = function(){
		console.log("名字："+this.name);
  }
}

//goHome函数是定义在Dog.protype上的一个属性
//而通过new 生成的新对象,原型会委托到这个protype上。
Dog.protytpe.goHome = function(){
  //这里的this能访问到新对象的name属性,主要是因为调用方式,让this绑定到了新对象上.
	console.log(this.name + " is go home!");
}

let dog1 = new Dog("汪汪");
dog1.barking();
//名字：汪汪
dog1.goHome();
//汪汪 is go home！


//补充
//构造函数也是对象，也可以添加属性，通常这种用来放一下所谓静态变量，常量等。
Dog.HOME = "地球";


```

其实js模拟类的行为就这些东西，一个this，一个protype。
至于继承这些，也是通过this，protype来模拟，没有更多东西了。

看看这个new到底是怎么创造新对象的。

```javascript
function createObj(func) {
		//创建新函数
    var obj = new Object(),
        
    Constructor = func;
		//让新对象的原型委托到构造函数的protytpe上
    obj.__proto__ = Constructor.prototype;
		
  	//执行构造函数，并显示改变this指向
    var ret = Constructor.apply(obj, arguments);
		
  	//这里是判断构造函数是否返回了一个对象，是的话直接返回构造函数返回的对象，否则返回这里创建的新对象
    return typeof ret === 'object' ? ret : obj;
};
```

大概就这么个流程了，细节可能还有些差异，但大体没跑的，委托原型，绑定this执行函数。
所以js是没有类的，这和从类模板生成一个全新的对象，有本质的差异。
但为什么有这个new操作符，估计得去问js的创造者了。
但猜测一下的话，类这种设计模式，还有面向对象这种思维太流行了，为了避免其它稀奇古怪的模仿，干脆出了一个new语法糖，统一下模仿类的行为。

<a name="M1WEv"></a>

### 组合继承

组合继承就是原型链继承，和借用构造函数继承组合在一起。

<a name="Oa9rB"></a>

#### 借用构造函数继承

```javascript
function Animal(name){
	this.name = name;
  this.barking = function(){
		console.log("名字："+this.name);
  }
}
Animal.prototype.goHome = function(){
	console.log(this.name + " is go home!");
}

//2.借用构造函数动态改变this指向，为作用域添加属性。
function Dog2(){
	Animal.call(this);
}
//dog2只能访问到name,barking属性，且这个属性是dog2本身上的属性。
//访问不到goHome,借用构造函数只添加了属性，而失去了和Animal.prototype的关联。
let dog2 = new Dog2();

//个人看法：丢了（没有关联上）父类protype上的属性。
//其实这样只是把属性全部拷贝到了子类上而已，每个子类都是独一份。
```

<a name="tEwVp"></a>

#### 原型链继承

```javascript
function Animal(name){
	this.name = name;
  this.barking = function(){
		console.log("名字："+this.name);
  }
}
Animal.prototype.goHome = function(){
	console.log(this.name + " is go home!");
}


//1.直接关联原型,将父类的实列对象关联到子类的原型上。
function Dog(){}

//把Dog的prototype 关联到 由Animal函数构造的新对象上.
let obj = new Animal();
Dog.prototype = obj;

//dog1就能访问到name,barking,goHome 这些属性了.
//此时原型链的指向关系 
//dog1.__proto__ --> obj
//obj.__proto__ --> Animal.prototype
let dog1 = new Dog();

//个人看法：很别扭吧  明明就是一个对象通过属性值关联到另一个对象上，强行说成是继承。
//最大的缺点是，所有构造出来的实列共享一个原型对象（obj）上的属性。一个实列去改了，所有都改了。
```

<a name="2BDVp"></a>

#### 组合一下

```javascript
function Animal(name){
	this.name = name;
  this.barking = function(){
		console.log("名字："+this.name);
  }
}
Animal.prototype.goHome = function(){
	console.log(this.name + " is go home!");
}

function Dog3(){
	//借用构造函数
  Animal.call(this);
}

//关联原型
Dog3.prototype = new Animal();

//修复constructor,之前一直没提过这个，这里简单一句话介绍下。
//function本身带了一个prototype属性，是一个对象，只有一个属性constructor指向函数本身。
//不把事情搞复杂了，详情请自行查询，其实就是一个容器，提供给子类存放公共函数之类的东西。
Dog3.prototype.constructor = Dog3;

//看起来没啥问题了，每个子类都有一份单独的属性，且父类上的公共方法也能关联到了。
let dog3 = new Dog3();


//个人看法：已经很好了，就一点需要注意，在关联原型时执行了一次父类构造函数，所有原型上也有一份父类属性。
//生成子类时，借用了构造函数，也生成了一份属性，所以时重复了的。
//访问的时候由于先访问到子类上的属性，所以原型上的那份属性永远不会被用到。有一点浪费。
//当然你可以想办法把它干掉，很容易。这里就不继续写了，已经差不多了。继承就这么些东西。
//============================
```

<a name="fskil"></a>

### 寄生继承

寄生继承，可以解决上面组合继承的一个问题。可以解决子类实例上那份浪费的原型属性。
其实也就是间接等同于拿父类的prototype直接作为子类的prototype。
寄生继承，看起来是下面这样的。

```javascript
//这个函数现在可以用Object.create代替
function object(o) {
  function F() {};
  F.prototype = o;
  return new F();
}

function Animal(name){
	this.name = name;
  this.barking = function(){
		console.log("名字："+this.name);
  }
}

Animal.prototype.goHome = function(){
	console.log(this.name + " is go home!");
}
function Dog4(){
	//借用构造函数
  var that = object(Animal.prototype);
  //可以对that添加属性。
  that.name = "xxx";
  return that;
}

var dog4 = new Dog4();

console.log(dog4);
```

<a name="huQYv"></a>

### 组合寄生继承

顾名思义，组合和寄生再二次组合。
至于为什么要组合，就是寄生继承能解决，组合产生的那份冗余属性。
看代码吧。

```javascript
function Animal(name){
	this.name = name;
  this.barking = function(){
		console.log("名字："+this.name);
  }
}
Animal.prototype.goHome = function(){
	console.log(this.name + " is go home!");
}

function Dog3(){
	//借用构造函数
  Animal.call(this);
}

//关联原型
Dog3.prototype = Object.create(Animal.prototype);
//其实如果不介意constructor指向混乱，你完全可以直接赋值
//Dog3.prototype = Animal.prototype;

//修复constructor
Dog3.prototype.constructor = Dog3;

//看起来没啥问题了，每个子类都有一份单独的属性，且父类上的公共方法也能关联到了。
let dog3 = new Dog3();

//============================
```

<a name="399c08f4"></a>

## ES6的class

其实理解了js的类，class其实也就是语法糖而已，更统一规范了js里面向对象的写法用法。
这里只列出了我关心的两点，更多请参考阮一峰的Class[链接](http://es6.ruanyifeng.com/#docs/class)。 <a name="704f29e0-1"></a>

### 基本用法

```javascript
class Dog{
	constructor(name){
    //this的调用同样会添加到新生成的对象上。
  	this.name = name;
    this.barking = function(){
    	console.log("姓名：" + this.name);
    }
  }
  //这样写的函数会挂载到protype上。
  goHome(){
  	console.log(this.name + " is go home!");
  }
  //静态变量，会挂载到DOG对象上
  static HOME = "地球";
}

//用法一样
let dog1 = new Dog("汪汪");
dog1.barking();
//名字：汪汪
dog1.goHome();
//汪汪 is go home！
```

<a name="2dde3029-1"></a>

### 继承（待补充）

不得不说，es6 class里的继承，东西其实有点多。想要详细了解还是得看看阮一峰的Class继承[链接](http://es6.ruanyifeng.com/#docs/class)。
这里先简单总结一下：

1. 多了静态变量，静态方法的说法。即在class内部使用static声明函数和变量，这样声明的属性会挂载在构造函数这个对象上。
2. 继承存在两条链，一条是 **子类构造函数**的 **原型对象**会关联到 **父类构造函数。**另一条是**子类构造函数**的**prototype**属性的**原型对象**会关联到**父类构造函数**的prototype属性。
3. 还有超级强大**super**关键字。
   - 子类构造函数里可以当作函数使用。
   - 普通方法里可以当作对象，指向父类的prototype属性。
   - 静态方法里可以当作对象，指向父类自己。

例子就不举了，实际用到的时候再来补充。

<a name="ab2470fa"></a>

## 一些参考。

闭包是解决函数式语言的一个问题的一种技术，这个问题就是如何保证将函数当做值创造并传来传去的时候函数仍能正确运行。[链接](https://www.cnblogs.com/yyrdl/p/5330274.html)

闭包使得函数可以继续访问定义时的 词法作用域。

需要明确的是，事实上 JavaScript 并不具有动态作用域。它只有词法作用域，简单明了。 但是 this 机制某种程度上很像动态作用域。
主要区别：词法作用域是在写代码或者说定义时确定的，而动态作用域是在运行时确定 的。（this 也是！）词法作用域关注函数在何处声明，而动态作用域关注函数从何处调用。

需要明确的是，this 在任何情况下都不指向函数的词法作用域。

在 JavaScript 中，构造函数只是一些 使用 new 操作符时被调用的函数。
