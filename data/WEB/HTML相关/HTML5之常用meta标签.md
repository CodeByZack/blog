---
title: HTML5之常用meta标签
url: 'https://www.yuque.com/zackdk/web/oegtky'
created_at: '2019-03-07 15:35'
updated_at: '2023-02-02 17:07'
---

## **charset**

示意：

作用： 声明文档使用的字符编码

## **http-equiv**

通常和content一起使用，（我理解就是键值对一样的东西）

格式：

```html
<meta http-equiv="属性值" content="http-equiv属性值的内容">
```

使用：

| http-equiv | content常用值 | content可取值 | 作用 |
| --- | --- | --- | --- |
| X-UA-Compatible | IE=edge,chrome=1 | 忽略吧 | 指定IE和Chrome使用最新版本渲染当前页面 |
| content-security-policy | 不常用 | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) | 定义当前页的内容策略 |
| content-type | text/html;charset=utf-8 | 不知道 | 定义该文档的 MIME type，不要使用该指令因为它已过时。. 使用 元素的charset 属性 代替。 |
| refresh | 5 | 3;url=https://baidu.com | 5秒后刷新页面/3秒后跳转到百度页面 |

## **name**

通常和content一起使用，（我理解就是键值对一样的东西）

格式：

```html
<meta name="属性值" content="name属性值的内容">
```

使用：

| name | content常用值 | content可取值 | 作用 |
| --- | --- | --- | --- |
| application-name | 自定义 | 自定义 | 用于定义运行在该网页上的应用名称 |
| author | 自定义 | 自定义 | 用于定义该文档的作者 |
| description | 自定义 | 自定义 | 用于描述该网站简短而有精确的摘要 |
| keywords | 自定义 | 自定义 | 和该网站高度相关的关键字 |
| generator | 自定义 | 自定义 | 可以是某软件的名称，该软件之前用于生成该网页 |
| creator | 自定义 | 自定义 | 用于定义这个文档的创造者，可以是组织或者机构。如果多于一个，那么就要使用多个meta 标签 |
| referrer | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) | 如果从这个页面跳转到下一个页面，这个页面meta 标签中referrer 的值，会影响到下一个页面获取得到前一个页面URL 的地址。 |
| robots | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) | 用于定义爬虫以怎样的方式检索本页面，用逗号分隔属性值 |
| viewport | 参见下表 | 参见下表 | 这个相当常用，用于响应式页面和移动端页面设计。 |

| viewport取值 | 作用 |
| --- | --- |
| width | 如果是数值，那么视口的宽度等于单位像素乘以数值；如果是`device-width`，那么视口的宽度适应设备屏幕的宽度。 |
| initial-scale | 0.0 ~ 10.0，是设备的宽度和视口的大小的比例 |
| maxmum-scale | 0.0 ~ 10.0, 定义网页放大的最大比例，要大于或等于 `minmum-scale` |
| minmum-scale | 0.0 ~ 10.0, 定义网页放大的最大比例，要小于或等于 `maxmum-scale` |
| user-scalable | yes or no， 用于定义用户是否能够放大或缩小页面 |
