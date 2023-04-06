---
title: HTTP Table 元素的宽度问题
created_at: '2023-03-03 20:18'
updated_at: '2023-03-03 20:20'
hidden : false
---

## ColGroup

`Table` 元素里有一个不怎么常见的元素 [`colgroup`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup) 和 [`col`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col) ，这个主要用于批量控制 `cell` 的样式，宽度、颜色等等。 

## Table 容器的宽度

宽度和几个因素有关：**table-layout** 、**整个 table 设置的宽度**、**`col` 设置的格子宽度** 、**第一行 `cell` 的宽度** 。

其中 `col` 和 `cell` 如果同时设置的话，`col` 的设置会覆盖 `cell`。


### auto （默认值）

宽度为自适应 `cell` 的内容宽度，也就是整个 `table` 总是能最大化显示所有 `cell` 中的内容。

### fixed 

宽度由 `table` 的设置宽度或者 `col` 宽度或者第一行所有 `cell` 的宽度决定。
其中 `col` 和 `cell` 如果同时设置的话，`col` 的优先级要高于 `cell`。

1. 所有的 `cell` 都设置了宽度的情况下

    - 如果设置了 `table` 宽度和 `cell` 的宽度，如果两个宽度不等，则按照比例重新分配给每个 `cell` 的宽度。

    - 如果设置了 `table` 宽度和 `col` 的宽度，如果 `table` 宽度大于 `col` 宽度， 则按照比例重新分配给每个 `cell` 的宽度，如果小于，则宽度会被 `col` 宽度撑开。

2. 某些 `cell` 设置了宽度，某些 `cell` 没有设置宽度

    - 剩余宽度被没有设置宽度的 `cell` 等分。


### 简单的DEMO

<iframe src="https://stackblitz.com/edit/web-platform-qej9h4?embed=1&file=index.html&hideExplorer=1&hideNavigation=1&view=preview" />