---
title: React生命周期/及class对比hook组件
url: https://www.yuque.com/zackdk/web/ahlwf2
---

面试的时候突然被问到，我一时半会想不起系统的了。
后来去翻了翻官方文档。

感觉看这个图足够了。
<http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/>

看完图，还可以看看官方对每个周期的描述
<https://react.docschina.org/docs/react-component.html>

<a name="gNRjv"></a>

## 生命周期

<a name="qwK7A"></a>

### 挂载时

constructor
getDerivedStateFromProps
render
componentDidMount

<a name="9nHu7"></a>

### 更新时

getDerivedStateFromProps
shouldComponentUpdate
render
getSnapshotBeforeUpdate
componentDidUpdate

<a name="Jft0Z"></a>

### 卸载时

componentWillUnmount

<a name="MCykt"></a>

## 与hook组件的差异

还真不好说

1. 没有了生命周期，用相应的useEffect之类的替代
2. hook更方便做逻辑共享，相比于HOC或者renderProps，看起来更简单，代码也更少。
