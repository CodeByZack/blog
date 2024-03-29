---
title: 使用 Esbuild 在浏览器内编译 React
url: 'https://www.yuque.com/zackdk/web/nvup03561w4z8x90'
created_at: '2023-01-31 09:51'
updated_at: '2023-01-31 09:53'
---

## 为什么要在浏览器内编译 React ?

博客编写时需要实时预览，使用的 MDX 需要经过编译，预览则采用了 iframe 进行预览，所以我需要把 MDX 编译成 JavaScript ，放到 iframe 里。

## esbuild 怎么跑在浏览器内的 ?

esbuild 提供了 wasm 版本，是支持在浏览器内运行的，具体可以参考[官网](https://esbuild.github.io/api/#running-in-the-browser)。

## esbuild 在浏览器内运行，有啥问题么 ?

有的，浏览器内没有文件系统，所以你会看到如下的错误：

```shell
Uncaught (in promise) Error: Build failed with 3 errors:
error: Cannot read directory ".": not implemented on js
error: Cannot read directory ".": not implemented on js
error: Could not resolve "index.jsx"
```

但可以通过 esbuild 提供的插件机制来解决。

## 亲手尝试一下在浏览器内使用 esbuild 编译

1. 引入 esbuild

```html
<script src="https://www.unpkg.com/esbuild-wasm/lib/browser.min.js"></script>
<script>
    esbuild
    .initialize({
        wasmURL: 'https://www.unpkg.com/esbuild-wasm/esbuild.wasm',
    })
    .then(() => {
        build();
    });

    const build = () => {
        console.log(esbuild);
    };
</script>
```

2. 使用 esbuild

```javascript

esbuild.build({
    entryPoints: ['index.jsx'],
    bundle: true,
    write: false,
});
```

不出意外，你就能看到上面那个错误了，因为在浏览器里， esbuild 并不知道去那里读取 `index.jsx` 这个文件。

3. 使用插件解决在浏览器内读取文件的问题

esbuild 插件格式如下：

```javascript
const myPlugin = {
    name: 'myPlugin',
    setup: (build) => {
        build.onResolve({ filter: /.*/ }, (args) => {});
        build.onLoad({ filter: /.*/ }, (args) => {});
    },
};
```

`onResolve` 是用来解析引入模块的地址的，要求模块的具体地址， `onLoad` 则是根据 `onResolve` 返回的 path 去拿到实际的文件内容。

这个机制正好能解决我们的问题。

```javascript
const files = {
    '/index.jsx': indexJSX,
    '/App.jsx': appJSX,
};
const myPlugin = {
    name: 'myPlugin',
    setup: (build) => {
        build.onResolve({ filter: /.*/ }, (args) => {
            // 入口文件单独处理
            if (args.kind === 'entry-point') {
                return { path: '/' + args.path };
            }
            // 这里只是简单处理一下
            if (args.path === './App.jsx') {
                return { path: '/App.jsx' };
            }
        });
        build.onLoad({ filter: /.*/ }, (args) => {
            if (args.path === '/index.jsx') {
                return {
                contents: files['/index.jsx'],
                loader: 'jsx',
                };
            }
            if (args.path === '/App.jsx') {
                return {
                contents: files['/App.jsx'],
                loader: 'jsx',
                };
            }
            return null;
        });
    },
};
esbuild.build({
    entryPoints: ['index.jsx'],
    bundle: true,
    write: false,
    plugins: [myPlugin],

});
```

如上的插件能解决我们自己的文件引入问题，但控制台还有个错误

```javascript
Uncaught (in promise) Error: Build failed with 2 errors:
error: Cannot read directory ".": not implemented on js
index.jsx:1:18: ERROR: Could not resolve "react"
```

针对第三方包，我们并没有处理。我们当然可以继续沿着上面的逻辑处理，去引入 cdn 上的 React 文件，因为 `onLoad` 可以是异步的。
这里我们换一种方式，使用 script 标签引入 React 和 ReactDOM ， esbuild 直接使用 window 上的变量。所以继续对插件进行改造。

```javascript
const files = {
    '/index.jsx': indexJSX,
    '/App.jsx': appJSX,
};

const externals = {
    react: 'React',
    'react-dom/client': 'ReactDOM',
};

const myPlugin = {
    name: 'myPlugin',
    setup: (build) => {
        build.onResolve({ filter: /.*/ }, (args) => {
            // 入口文件单独处理
            if (args.kind === 'entry-point') {
                return { path: '/' + args.path };
            }
            // 这里只是简单处理一下
            if (args.path === './App.jsx') {
                return { path: '/App.jsx' };
            }
            if (Object.keys(externals).includes(args.path)) {
                return { path: `/externals/${args.path}` };
            }
        });
        build.onLoad({ filter: /.*/ }, (args) => {
            if (args.path === '/index.jsx') {
                return {
                contents: files['/index.jsx'],
                loader: 'jsx',
                };
            }
            if (args.path === '/App.jsx') {
                return {
                contents: files['/App.jsx'],
                loader: 'jsx',
                };
            }
            if (args.path.startsWith('/externals/')) {
                const libName = args.path.replace('/externals/', '');
                const contents = `module.exports = ${externals[libName]}`;
                return { contents };
            }
            return null;
        });
    },
};

const res = await esbuild.build({
    entryPoints: ['index.jsx'],
    bundle: true,
    write: false,
    plugins: [myPlugin],
});

console.log(res);
```

好了能正常编译出来了。但输出的是 `Uint8Array` 。需要 decode 一下。

```javascript
const contents = res.outputFiles[0].contents;
const decoder = new TextDecoder();
const text = decoder.decode(contents);
```

## 以上最终代码的集合

<iframe src="https://stackblitz.com/edit/web-platform-tqkzwj?embed=1&file=index.html&hideExplorer=1" />