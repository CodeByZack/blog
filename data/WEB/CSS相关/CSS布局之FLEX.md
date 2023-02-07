---
title: CSS布局之弹性布局 FLEX
created_at: '2020-12-16 17:41'
updated_at: '2021-01-21 20:24'
---

flex容器有两条轴一条叫**主轴**，另一条叫**交叉轴**，与**主轴**垂直。主轴要么横向，要么纵向，可以用**flex-direction**来切换。

![](../assets/zyeezs/1608169716977-42be2cc6-309b-4051-97a1-19423f8dee6b.png)

当用**display:flex**将一个容器变为flex容器后。会有初始值。引用自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)。

> - 元素排列为一行 (`flex-direction` 属性的初始值是 `row`)。
> - 元素从主轴的起始线开始。
> - 元素不会在主维度方向拉伸，但是可以缩小。
> - 元素被拉伸来填充交叉轴大小。
> - [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) 属性为 `auto。`
> - [`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) 属性为 `nowrap。`

翻译成属性

> flex容器
>
> - flex-direction : row
> - justify-content : flex-start
> - flex-warp : nowrap
> - align-items ： stretch
> - align-contents : stretch

flex元素

> - flex-shrink : 大于0的值 且 每个元素值应该相等
> - flex-basis : auto
> - flex-grow : 0


## Flex容器的属性


### flex-direction

控制主轴的方向。可取值有：

- `row`（默认值）：主轴为水平方向，起点在左端。
- `row-reverse`：主轴为水平方向，起点在右端。
- `column`：主轴为垂直方向，起点在上沿。
- `column-reverse`：主轴为垂直方向，起点在下沿。


### flex-wrap

控制 当容器**元素占主轴总和** 大于 **容器主轴** 时换行与否。可取值有：

- `nowrap`  (默认值) ： 不换行
- `wrap`  ：换行
- `wrap-reverse`  : 换行，且行顺序由下往上


### justify-content

用于对齐主轴上的元素。可取值有：

- `flex-start`（默认值）：左对齐 （受书写模式影响）
- `flex-end`：右对齐（受书写模式影响）
- `center`： 居中
- `space-between`：两端对齐，项目之间的间隔都相等。

### align-items

用于对齐交叉轴上的元素。可取值有：

- `flex-start`：交叉轴的起点对齐。（受书写模式影响）
- `flex-end`：交叉轴的终点对齐。（受书写模式影响）
- `center`：交叉轴的中点对齐。
- `baseline`: 项目的第一行文字的基线对齐。
- `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。


### align-contents

产生多行元素时，用于控制多根主轴 在交叉轴上的对齐方式。只有一根轴（一行元素时）该属性不起作用。可取值有 ：

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐。
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- `stretch`（默认值）：轴线占满整个交叉轴。


## Flex子元素的属性

flex子元素的属性主要用于控制，子元素自己占据**主轴**多少空间，以及是否允许被**压缩**或者**放大**。还可以独立控制自己在**交叉轴上的对齐方式**。

**剩余空间 ：** 当flex容器宽500px，主轴方向为 row 。 拥有三个子元素，宽分别为 100px 。子元素总宽小于容器宽度。剩余了200px 。这段空间就称之为剩余空间。flex-grow 用于控制剩余空间如何分配给子元素进行放大。

**负剩余空间 ：** 当flex容器宽500px，主轴方向为 row 。 拥有三个子元素，宽分别为 200px 。子元素总宽大于容器宽度。超出了100px 。这段空间就称之为负剩余空间。flex-shrink 用于控制负剩余空间如何分配给子元素进行缩放。


### flex-basis

控制元素占据主轴多少空间，没错，元素本身的宽度有可能被忽略，可取值有 ：

- 具体值 ： 例如200px 就占据主轴200px。
- auto ：根据width、height属性来占据主轴宽度。
- content ： 基于元素的内容自动调整大小。


### flex-grow

取值为number，为 0 不允许放大。大于 0 的值参考如下解释：

设置了一个flex项主轴长度的flex增长系数。它指定了flex容器中**剩余空间**的多少应该分配给项目。当flex容器中所有元素只有一个设置了一个大于0的值，它会独占所有**剩余空间**。如果有多个元素都设置了该值，会根据该值的比例来进行分配。


### flex-shrink

取值为number，为 0 不允许缩放。大于 0 的值参考如下解释：

设置了一个flex项主轴长度的flex缩放系数。它指定了flex容器中**负剩余空间**的多少应该分配给项目。当flex容器中所有元素只有一个设置了一个大于0的值，它会独自承担所有**负剩余空间**。如果有多个元素都设置了该值，会根据该值的比例来进行分配。


### align-self

效果同设置在flex容器上的 align-items ，但只是针对该子元素。取值参考 align-items 。


## [demo](https://codebyzack.github.io/web_demo/demo/flex)
