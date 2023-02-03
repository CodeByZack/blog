---
title: ES6之数组的扩展
url: 'https://www.yuque.com/zackdk/web/hm50zg'
created_at: '2019-03-07 13:44'
updated_at: '2019-11-05 10:22'
---

<a name="0dd83c39"></a>

### Array.from()

Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。

    //类数组对象，即具有length属性
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };

    // ES6的写法
    let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']


    // 将NodeList对象转换为真正的数组
    let ps = document.querySelectorAll('p');
    Array.from(ps).forEach(function (p) {
      console.log(p);
    });

    // arguments对象
    function foo() {
      var args = Array.from(arguments);
      // ...
    }

另外部署了Iterator接口的数据结构，Array.from都能将其转为数组，比如set和字符串。

    Array.from('hello')
    // ['h', 'e', 'l', 'l', 'o']

    let namesSet = new Set(['a', 'b'])
    Array.from(namesSet) // ['a', 'b']

值得注意的是，扩展运算符（...）也可以将某些数据结构转为数组。

    // arguments对象
    function foo() {
      var args = [...arguments];
    }

    // NodeList对象
    [...document.querySelectorAll('div')]

不同的是，扩展运算符依赖于遍历器接口（Symbol.iterator），如果对象没有部署该接口，扩展运算符便不能使用了。而Array.from,不仅支持部署了遍历器接口的对象，还支持类数组对象，即拥有length属性的对象。

    Array.from({ length: 3 });
    // [ undefined, undefined, undefined ]

上面代码中，Array.from返回了一个具有三个成员的数组，每个位置的值都是undefined。扩展运算符转换不了这个对象。

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

    Array.from([1, 2, 3], (x) => x * x)
    // [1, 4, 9]

<a name="2fb7e6ac"></a>

### Array.of()

Array.of 主要用来弥补数组的构造函数的缺陷。

    Array() // []
    Array(3) // [, , ,]
    Array(3, 11, 8) // [3, 11, 8]

    Array.of() // []
    Array.of(3) // [3]
    Array.of(1, 2) // [1, 2]

当你尝试构建一个单个数字的数组时，构造函数会把这个数字当成数组长度。Array.of则不会。

<a name="fc38f1fb"></a>

### Array.prototype.copyWithin()

<a name="b85a3529"></a>

### 数组实例的find()和findIndex()

数组实例的find和findIndex方法，用于找出第一个符合条件的数组成员，不同的是，find返回找到的数组成员，findIndex返回数组下标。它们的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员或者下标。如果没有符合条件的成员，则返回undefined或者-1。

    [1, 4, -5, 10].find((n) => n < 0)
    // -5

    [1, 4, -5, 10].findIndex((n) => n < 0)
    // 2

indexOf也可以用于找到指定元素在数组中的位置，但不同的是findIndex可以找到NaN

    [NaN].indexOf(NaN)
    // -1

    [NaN].findIndex(y => Object.is(NaN, y))
    // 0

<a name="6e1a63ec"></a>

### 数组实例的fill()

fill方法使用给定值，来初始化或者说重置一个数组。可以指定填充位置。。。

    ['a', 'b', 'c'].fill(7)
    // [7, 7, 7]

    new Array(3).fill(7)
    // [7, 7, 7]

    ['a', 'b', 'c'].fill(7, 1, 2)
    // ['a', 7, 'c']

上述最后一个示例中，fill方法从1号位开始，向原数组填充7，到2号位之前结束。

<a name="59bfae56"></a>

### 数组实例的entries()，keys()和values()

ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

    for (let index of ['a', 'b'].keys()) {
      console.log(index);
    }
    // 0
    // 1

    for (let elem of ['a', 'b'].values()) {
      console.log(elem);
    }
    // 'a'
    // 'b'

    for (let [index, elem] of ['a', 'b'].entries()) {
      console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"

如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。

    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    console.log(entries.next().value); // [0, 'a']
    console.log(entries.next().value); // [1, 'b']
    console.log(entries.next().value); // [2, 'c']
