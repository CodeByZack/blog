import { defineConfig } from 'tsup'

export default defineConfig({
  entry : ['./components/BlogComponents.tsx'],
  splitting : false,
  outDir: "./public",
  // clean : true,
  format : ['esm'],
  // external : ['../../node_modules/.pnpm/react@17.0.2/node_modules/react/cjs/react.production.min.js'],
  // watch : true,
  // onSuccess : 'node mv-result.js'
})