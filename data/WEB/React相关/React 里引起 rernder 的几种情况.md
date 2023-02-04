---
title: React 里引起 rernder 的几种情况
url: 'https://www.yuque.com/zackdk/web/yt3eclnknmv2qkct'
created_at: '2023-01-31 09:55'
updated_at: '2023-01-31 09:57'
---

React 组件的生命周期大概是这样：

`mount -> init-render -> re-render -> unmount`

在线demo。可对照着查看。

<iframe src="https://stackblitz.com/edit/rerender-in-react?embed=1&file=App.tsx&hideNavigation=1" ></iframe>


由于很久不用类组件了，以下都只针对函数式组件。

## 1. props 变动，引起的渲染

此处省略。

## 2. context 变动，引起的渲染

建议先通读一下官方文档 [React Context](https://reactjs.org/docs/context.html) 。

简单来说， context 是用于组件嵌套过深时，避免一层层传递 props ，传递参数用的。

使用 context ， 需要注意的是：

- 传递给 provider 的 value 值，在两次渲染期间是浅对比，类似于 `Object.is` 的实现。
- 传递给 value 的值， 即便浅对比变动了，是不会触发 React 的 render 的，需要通过其它方式来触发 render 。

## 3. 父组件渲染引起的子组件重新渲染

这是平常开发中比较容易忽略的一点，前端现在都是组件嵌套组件，形成一个巨大的组件树， React 只要确认了组件需要 render ， 在其之下的所有子组件都会走一遍 render 。

在如今动则上百个组件的页面里，很容易就会引起某些子组件额外的 render ，造成性能浪费。

React 提供了两个工具来给开发者手动进行这方面的优化。函数组件的 `React.memo` ， 类组件的 `shouldComponentUpdate` 。


## 4. 组件 unmount -> mount 引起的渲染

这个场景也不常见， unmount 后，再 mount ，触发渲染是理所应当的。所以问题不在触发了渲染，问题在于什么时候触发的 unmount 。

实际遇到的几个场景都写在demo里了。

1. `xx && <Comp>` 这种写法比较常见，会触发组件的 unmount , 但不会马上紧接着 mount , 所以一般情况下是没啥问题的。
2. 列表里长度不一样或者 key 不一样，导致的 unmount 。此外还要分情况，如果列表前后长度不一样了，会导致卸载或者新增的情况，这一般都是期望的行为。
   但如果列表前后长度一致，其中某几个 key 变动了，但是组件的类型是一样的。
   这时候对比前后两轮的 key 值，不存在的 key 对应的组件 unmount ， 新增的 key 对应的组件 mount ， 依旧存在的 key 复用组件实例，触发 render 。
3. 组件的引用地址变动，导致 diff 时判定了 unmount，然而实际上也是同一个组件占了这个位置，继而马上 mount 。
   这种情况比较特别，目前只发现一种情况下会出现，即组件内部声明组件。如下：

```javascript
export const UnmountMountPaper3 = () => {
  const forceUpdate = useForceRender();
  useLogger('ParentNode');

  const InnerChild = () => {
    useLogger('InnerChild');
    const [num, setNum] = React.useState(0);

    return (
      <div>
        <div
          onClick={() => {
            forceUpdate();
            setNum((n) => n + 1);
          }}
        >
          click me : {num}
        </div>
        <Typography p={1} component="p">
          InnerChild
        </Typography>
      </div>
    );
  };

  return (
    <Paper sx={{ m: 1, width: '100%' }}>
      <InnerChild />
      <Button
        onClick={() => {
          forceUpdate();
        }}
      >
        触发组件更新
      </Button>
    </Paper>
  );
};
```

这种情况容易出问题，比如上面例子中的 click me 按钮 ，点击了应该是把 num + 1 才对，可实际不管点击多少次都是0。
这是因为 InnerChild 是 unmount -> mount -> render 这样一个过程。因为走了一遍 mount 过程， num 的值又被初始化为 0 了。

## 5. state 变动，引起的渲染

抛开 Class 组件的 forceUpdate 方法，其实某种意义上，可以说 React 里能触发渲染的就只有一种方式，那就是改变 state 。
上文中，除了 mount 引起的渲染，就剩下 props 和 context 引起的渲染了，可这两者针对的都是组件，这两者的修改都不会导致 React 的渲染。
比如一个组件，你传给 props 或者 context 的 provider 一个任意值，然后你修改这个值，是不会有任何变化的。
因为 React 不是响应式的，你修改了值，你想把结果渲染到页面上，你就需要通知 React 走一次 render 过程，而这个通知的方法就是改变 state 。

这也是个人比较喜欢 React 的原因，简洁，不复杂，纯粹。

1. `setState` 会导致渲染，这个每个人都能理解。
2. 因为自定义hook的出现，出现了很多不是那么直接的 `setState` 。

- 比如 demo 里的 forceUpdate 。

3. Redux 触发更新的方式。

- Redux 并不直接触发 React 的渲染，触发渲染的是 react-redux 。
- react-redux 触发渲染，一个是 Connect 高阶组件，一个是 useSelector 自定义 hook 。

以下摘自 react-redux 7.x 版本的代码:

Connect 最终触发 React 更新的[代码](https://github.com/reduxjs/react-redux/blob/7.x/src/components/connectAdvanced.js#L21)

```typescript
function storeStateUpdatesReducer(state, action) {
  const [, updateCount] = state
  return [action.payload, updateCount + 1]
}
```

useSelector 最终触发 React 更新的[代码](https://github.com/reduxjs/react-redux/blob/7.x/src/hooks/useSelector.js#L15)

```typescript
const [, forceRender] = useReducer((s) => s + 1, 0)
```

由上面代码可以看出来， redux 最终通知 React 进行一次渲染，就是通过state的改变来做的。

4. Mobx 触发更新的方式

以下摘自 mobx-react-lite 的[代码](https://github.com/mobxjs/mobx/blob/main/packages/mobx-react-lite/src/useObserver.ts#L32):

```typescript
const [, setState] = React.useState()
const forceUpdate = () => setState([] as any)
```
