# 行者空山的博客

2022 年，重新使用新一点的技术搭建了自己博客。

## 使用到的部分库

- `turborepo`
- `Next.js`
- `TypeScript`
- `Geist UI`
- `unocss`
- `next-auth` - 用于登录 Github
- `MDX.js` - 用于渲染 Markdown + JSX
- `monaco-editor` - 用于在浏览器编辑 MDX 文件
- `octokit` - 用于拉取、提交 Github 仓库文件

## 比较有意思的部分

### 1.在线 MDX 编辑器

实现了在浏览器内，拉取仓库对应的文件，修改，并提交回仓库。编辑时还能实时预览。

![BlogEditorPreview](https://zackdkblog.oss-cn-beijing.aliyuncs.com/BlogEditor.png)

## TODO

 - [x] 在线 MDX 编辑器
 - [] 优化样式
 - [] 照片墙