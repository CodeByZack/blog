---
title: 重新使用Vuex
url: 'https://www.yuque.com/zackdk/web/vcxi77'
created_at: '2019-03-07 13:05'
updated_at: '2023-02-02 17:07'
---

<a name="b8361951"></a>

## Vuex是什么

**官方说法：**Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
**状态管理模式：**把组件的共享状态抽取出来，以一个全局单例模式管理。
定义很抽象，简单说明下。vue是组件化开发的，当不同的组件要用到同一个状态的时候，你会选择怎么处理呢。

- 把状态提升到父组件去，子组件直接使用父组件的状态。但是当两个组件并不是平级的呢，传递数据就显得十分麻烦了。
- 所以我们就又想到了，直接使用一个全局对象来储存，这样任何地方都能访问到。都能访问过后，当一个地方修改了，怎么同步所有组件的状态呢，直接能想到的用观察者模式。
- vue本身就是响应式的，vuex已经帮你实现了这个功能，而且额外还有其它功能。当然你完全可以自己来实现这个东西。

<a name="ace28e2a"></a>

## 怎么使用Vuex的

<a name="state"></a>

### state

**官方说法：**用一个对象就包含了全部的应用层级状态。
**我的说法：**普通的js的对象，放全局变量的地方。且这个对象是响应式的，具体是借用了vue的响应式机制。

```javascript
// use a Vue instance to store the state tree
// suppress warnings just in case the user has added
// some funky global mixins
store._vm = new Vue({
  data: {
    $$state: state
  },
  computed
})
```

所以使用的时候的，就可以直接借助**computed计算属性**使用。

<a name="mutation"></a>

### mutation

这就是vuex额外的功能之一了，我也不知道之几。
**官方发言：**更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
禁止了直接改动state，至于为啥，自行理解了，无规矩不成方圆嘛。虽然改动变得麻烦了，但好处挺多的。
mutation 都有一个字符串的 **事件类型 (type)** 和 一个** 回调函数 (handler)，默认接受一个state参数，且函数只能为同步函数，**看代码吧。

```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
//increment是ES6的简写赋值,事件类型就是该函数名字 increment 回调函数就是该函数。
//调用该mutation的方法是,store.commit("increment")
//还有一种接受参数的写法
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit("increment", 5);
```

<a name="action"></a>

### action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。
- 很简单明了的说法，其实直接提交mutilation也是可以修改到数据的，我之前也这样做过，因为异步拿数据的操作都放在了组件里。并没有把数据全部抽出到state里，只有通信不方便的地方才会想到去借用这个vuex全局对象来储存数据。所以说我之前使用vuex就和使用全局对象一样，和闹着玩一样。所以重新学习使用vuex。
- 说多了，一句话，Action里可以有异步操作，访问api这些事可以扔到这里来了。视图层里，只需要触发这些action就ok。逻辑数据操作都到vuex里做。

```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
//创建action，默认参数为一个与 store 实例具有相同方法和属性的 context 对象
//不一定要同名，取啥名字都行，我是直接从官网copy的
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
//分发action 也就是调用
store.dispatch("increment");
```

<a name="getter"></a>

### getter

和computed计算属性类似。待续...

<a name="moudle"></a>

### moudle

用于处理state对象过于庞大，分模块拆分state，方便维护。待续...

<a name="26a35101"></a>

## 和全局变量有啥区别

1. vuex的状态存储是响应式的（基于vue的响应式）
2. 我们能够记录所有 store 中发生的 state 改变，同时实现能做到记录变更 (mutation)、保存状态快照、历史回滚/时光旅行的先进的调试工具。
3. 状态管理[链接](https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)
