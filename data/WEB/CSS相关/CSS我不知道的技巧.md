---
title: CSS我不知道的技巧
url: 'https://www.yuque.com/zackdk/web/pltpnz'
created_at: '2019-03-15 15:08'
updated_at: '2023-02-02 17:07'
---

<a name="2889328f"></a>

## 宽不定，宽高比固定 的图片

```css
.img-container{
	position:relative;
  height:0;
  padding-bottom:100%;//控制高度和宽度一样 1：1
  .img{
  	position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
}
```

原理：
padding 和 margin 后面的值如果是百分比，是相对于父元素的宽度的。
把容器img-container高度设为0，下内边距100%，即让宽高比为1：1。
然后真正的图片作为子元素利用定位占满即可。
