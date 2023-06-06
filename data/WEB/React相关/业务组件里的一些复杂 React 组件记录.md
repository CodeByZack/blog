---
title: 业务组件里的一些复杂 React 组件记录
created_at: '2023-04-24 10:26'
updated_at: '2023-04-27 10:02'
hidden: true
---

## 全键盘组件表格

先说需求，普通表格就是纯展示组件。因为业务需要， Table 需要支持实时输入，即点击一个格子需要可以编辑这个格子的内容，格子需要支持普通输入组件，
以及自定义输入的组件，且需要支持远程搜索数据。所以，编辑格子的数据，然后把数据写入到 record 里时，是异步的操作。

其它还有一点比较特殊的是焦点问题，当编辑完一个格子，按 Enter 键是聚焦到这一行下一个需要填写的格子里。按 Enter 键进行焦点跳转有一个问题，某些输入组件
比如 Select 组件， Enter 键其实是选中操作，这是有冲突的，再比如 SearchInput 组件，输入文字后， Enter 键是触发搜索，调用 API ，也是有冲突的。
所以对基础输入组件都做了一层包装，来处理焦点问题。

看看实际操作中是什么样的：

![KeyboardTable.png](../assets/keyboardTable.gif)

下面记录一下实现的步骤，基于 Antd 的 Table 组件自定义 Cell 进行改造。

1. 每个格子有**编辑**和**展示**两种状态，用户手动点击格子的时候，将格子的状态切换**编辑**。

```js
const [isEditing,setEditing] = useState(false);
```

2. 如何让确定每个格子是处于**编辑**还是**展示**状态，表格天然拥有横纵坐标，使用 `columnName` 和 `rowKey` 进行定位，确定当前那个格子处于**编辑**状态。


```js
const [editColKey,setEditColKey] = useState("");
const [editRowKey,setEditRowKey] = useState("");
```

3. 将格子从展示状态切换为编辑状态时，需要自动获取焦点，但 Antd 的基础输入组件，其实都获取不到 DOM ,所以有了如下方法。

```js
  useEffect(() => {
    if (editColKey === cellColKey && editRowKey === cellRowKey) {
      setEditing(true);
      if (wrapperRef.current) {
        const input = wrapperRef.current.querySelector('input');
        if (input) {
          input!.focus();
        }
      }
    }
  }, [activeIndex, record && recordIndex, editKey, canFocus]);
```
