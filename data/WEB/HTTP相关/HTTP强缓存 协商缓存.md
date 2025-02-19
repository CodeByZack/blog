---
title: HTTP强缓存 协商缓存
created_at: '2020-02-18 16:26'
updated_at: '2020-09-07 14:34'
---

缓存，首先肯定是在第一次访问之后的事。

第一次访问网页，要显示完整的网页需要加载很多 诸如css/js/html/图片等资源文件。每一个文件都需要经过你的电脑然后各种各样的中间服务器到达最后的资源服务器，不用说也知道这是需要花费一定时间的，加上资源文件这么多，所以第一次打开网页，你需要等一段时间才能看到完整的网页。
相比之下，第二次访问就会好很多，这正是由于浏览器做了缓存的缘故，浏览器把所有的资源都缓存下来了，当你再次请求的时候，就不会再去资源服务器上下载了，而是直接从你本地的缓存里拿，那当然快很多了。

从实际上来说，这些资源文件，比如图片，在很长一段时间内，都不会变动，应该都是同一个文件。如果每次请求都重新下载一次。不仅增加服务器压力（网页中这些资源文件请求频率是很高的），还浪费用户流量。
但这些资源文件，毕竟不是永远不变的，一旦发生改变，就应该马上使用新的，这样用户才能看到最新的。所以我们需要某种机制来确认，当前缓存的资源是否与服务器的资源是一致的。

言归正传。上面一大堆我只是想说，缓存真的是很有必要的。

缓存，是靠http头部字段，来控制的。一般分了强缓存和协商缓存。涉及到的字段有：

| 强缓存 | [**Expires**](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires) | [**Cache-Control**](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control) |
| --- | --- | --- |
| 协商缓存 | [Last-modified/If-Modified-Since](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Last-Modified) | [Etag/If-None-Match](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag) |


## 强缓存

强缓存最大的特点是：如果缓存判定没有过期，则不会请求服务器，直接从缓存拿数据。


### Expires

和单词字面意思一样，过期时间。后面跟的是一个时间字符串，过了这个时间，代表缓存过期了。需要走下面的步骤（协商缓存，或者重新获取资源）。但有明显的问题，客户端和服务器时间存在不一致，导致判定过期或者不过期。

```http
Expires: Wed, 21 Oct 2015 07:28:00 GMT
```


### Cache-Control

首先第一点，cache-control的优先级比expires高；
然后和expires不同，这个后面可以跟多个指令。常见的有代表，

是否可缓存？ public，private，no-cache，nostore

| 指令名字 | 意义 |
| --- | --- |
| public | 可以被任意对象缓存，包括代理服务器 |
| private | 只能被客户端缓存，代理服务器之类的不能缓存。 |
| no-cache | 客户端使用缓存之前，必须把请求发到服务器，进行验证。（走协商缓存?） |
| no-store | 不允许任何对象对请求或者响应进行缓存。 |

到期时间的相关。max-age最常用。其它请参考MDN。
**max-age=<seconds>**
max-age后面跟秒数，代表客户端拿到这个请求，多少秒后会过期。这个就避免了expires的客户端服务器时间不一致的问题了。

```http
Cache-Control: no-store//关闭缓存
Cache-Control:public, max-age=31536000//对于长久不变的资源文件，缓存时间很长。

Cache-Control: no-cache//强制对缓存进行有效性检验（协商缓存？）
Cache-Control: max-age=0//代表收到请求资源就已过期，需要验证缓存有效性（协商缓存？）。
```


## 协商缓存

当强缓存判断过期了，或者cache-control设置为no-cache时，需要去验证资源是否有效。这时候就走协商缓存了。

协商缓存，会像服务器发请求，然后服务器判断资源是否还有效，有效就返回304状态码，带上最新的头信息。没有body内容。如果无效，就正常返回新的资源内容。

协商缓存如其名，需要客户端和服务器协商。协商是靠[Etag](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag)和[Last-modified](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Last-Modified)来进行的。


### Last-modified/If-Modified-Since

指令后面跟的值都是GMT的标准时间字符串。

```http
//出现在响应头中
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT 

//出现在请求头中
If-Modified-Since: Wed, 21 Oct 2015 07:28:00 GMT
```

其中last-modified是响应头字段，即客户端像服务器请求某个资源，服务器响应回来的头字段里会包含该字段。标记此文件在服务期端最后被修改的时间
然后if-modified-since是请求头字段，即需要验证资源有效的时候，像服务器发送的请求会带这个字段，值为响应头的last-modified的值。

这样一来一去，服务器收到验证请求的时候，拿这个if-modified-since的值去对比资源修改的时间，如果资源在那之后有过修改，就返回新的资源，否则就返回304状态码。浏览器则继续使用当前缓存。

该指令只能精确到秒。所有有了后面精确度更高的Etag的出现。


### Etag/If-None-Match

etag原理和last-modified差不多。但etag优先级更高。
但etag的值一般使用文件内容或者文件最后修改日期的hash值。代表该资源的唯一标识符，一旦文件改变，该标识就会改变。

```http
//出现在响应头中
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4
//出现在请求头中
If-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

其中ETag是响应头字段，即客户端像服务器请求某个资源，服务器响应回来的头字段里会包含该字段。代表此文件的唯一标识。
然后if-none-match是请求头字段，即需要验证资源有效的时候，像服务器发送的请求会带这个字段，值为响应头的ETag的值。t

这样一来一去，服务器收到验证请求的时候，拿这个if-none-match的值去对比服务器上文件的etag值，如果不一致，就返回新的资源，否则就返回304状态码。浏览器则继续使用当前缓存。


## 缓存的流程

还是看图片比较清楚，虽然我是偷的。下面的图来自[链接](https://www.cnblogs.com/leftJS/p/11082777.html)


### 第一次请求资源的时候

![](../assets/pb4bb7/1582640123545-d65336fa-0135-44b8-842a-951a205159b2.png)


### 后续请求资源的时候

![](../assets/pb4bb7/1582640112044-a2da9ec8-099d-4169-b929-e15b2d5de851.png)


## 缓存实际中的使用场景

由于现在基本上没折腾过这些，所以我也木知啊。
感觉这个说的还不错，可以参考参考。
[大公司里怎样开发和部署前端代码？](https://www.zhihu.com/question/20790576)


## 参考

1. [200（强缓存）和304（协商缓存）的区别](https://www.cnblogs.com/leftJS/p/11082777.html)
2. [MDN headers相关章节](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
