---
title: Class 组件和 Hook 组件的差异性
updated_at: '2023-06-06 21:34'
created_at: '2019-06-06 21:31'
---

面试的时候突然被问到，我一时半会想不起系统的了。
后来去翻了翻官方文档。

感觉看这个图足够了。
<http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/>

看完图，还可以看看官方对每个周期的描述
<https://react.docschina.org/docs/react-component.html>


## 生命周期


### 挂载时

`constructor`->

`getDerivedStateFromProps`->

`render`->

`componentDidMount`->


### 更新时

`getDerivedStateFromProps`->

`shouldComponentUpdate`->

`render`->

`getSnapshotBeforeUpdate`->

`componentDidUpdate`->


### 卸载时

`componentWillUnmount`


## 与 Hook 组件的差异


1. `Hook` 为函数组件带来了状态的概念，在之前函数组件是没有办法拥有自己的状态的。
2. `Hook` 组件没有了生命周期的各种回调，相应的由副作用这个概念来替代，不过有些生命周期其实可以进行对应的替换。比如常见的**挂载**/**卸载**/**更新**。

    ```javascript
    componentDidMount() { ... }
    useEffect(() => { ... }, [])
    
    componentWillUnmount() { ... }
    useEffect(() => { return () => { ... } }, [])
    
    componentDidUpdate() { ... }
    useEffect(() => { ... })
    ```
3. 逻辑共享/复用的方式不同了。
     `Class` 组件在生命周期里写的各种逻辑，基本上是没法复用的，而且可能出现**重复**/**零散**的问题。然后重用逻辑的方式有两种常见的模式 `HOC` 和 `RenderProps` 。

     这两种方式都有其痛点，`HOC` 会面临`嵌套层级过深`/`合并 props ` 等问题。 `RenderProps` 解决了上面那几个问题，但它无法接触到组件的生命周期，它只能靠传进去的 `props` 进行单纯的渲染。
     
     而 `hook` 则可以用 `customHook` 进行逻辑共享，而且只是单纯的 JavaScript 函数，数据来源清晰，简洁，还能结合 `Effect` 拥有类似生命周期的能力。各个方面都比使用 `Class` 组件进行逻辑复用优雅很多。
     
     当然， `Hook` 也有它的问题， 随着 `Hook` 而来的闭包问题很严重，这需要开发者付出额外的心力去关注这个问题。 

