# Turborepo

尝试使用 turborepo.

## 项目结构

- `blog`: 我的博客，使用[Next.js](https://nextjs.org)搭建
- `ui`: `blog` 使用到的一些组件
- `config`: `eslint` 配置文件
- `tsconfig`: 整个 `turborepo` 使用的 `tsconfig.json`

所有项目都采用了[TypeScript](https://www.typescriptlang.org/).

### 构建

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```
