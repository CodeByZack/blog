/**
 *
 * 拼接完整的Html
 *
 * @param head
 * @param body
 * @returns html string
 */

export const assembleHtml = (head: string, body: string) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8" />
      <style>
        body{ min-height : 100vh; background-color:#1e1e1e; color : #fff; }   
      </style>
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@unocss/reset@0.33.5/tailwind.css"/>
      ${head}
  </head>
  <body>
      ${body}
  </body>
  </html>`;
};

export interface IHtmlSource {
  /** mdx-js 编译出来的结果 需要放到script标签上*/
  mdxStr?: string;
  /** 直接放入body标签之间的css相关字符串 使用<style></style>包裹*/
  cssStr?: string;
  /** script url 地址数组 */
  scripts?: string[];
  /** css url 地址数组 */
  cssLinks?: string[];
}

const PREVIEW_CONTAINER = '<div id="PREVIEW_CONTAINER"></div>';
const PREVIEW_IMPORT_MAP = `<script async src="https://ga.jspm.io/npm:es-module-shims@1.5.5/dist/es-module-shims.js"></script>
  <script type="importmap">
  {
    "imports": {
      "react": "https://cdn.skypack.dev/react",
      "react-dom": "https://cdn.skypack.dev/react-dom",
      "@geist-ui/core": "https://cdn.skypack.dev/@geist-ui/core",
      "components": "./blog-components.js"
    }
  }
  </script>`;
const PREVIEW_MDX_WRAPPER = `<script type="module">
    import ReactDom from 'react-dom';
    import components from 'components';    
    MDX_STRING
    ReactDom.render(
      React.createElement(MDXContent,{ components }),
      document.querySelector('#PREVIEW_CONTAINER')
    );
  </script>`;

export const createHtml = (htmlSources: IHtmlSource) => {
  const { mdxStr, scripts, cssLinks, cssStr } = htmlSources;
  const getCssTag = () => {
    if (!cssLinks?.length) return '';
    return cssLinks
      .map((l) => `<link rel="stylesheet" type="text/css" href="${l}" />`)
      .join('\n');
  };
  const getScriptTag = () => {
    if (!scripts?.length) return '';
    return scripts.map((l) => `<script src="${l}" />`).join('\n');
  };
  const getStyleTag = () => {
    if (!cssStr) return '';
    return `<style>${cssStr}</style>`;
  };
  const head = `<head>\n${getCssTag()}${getScriptTag()}\n${getStyleTag()}\n</head>`;
  const MDX_SCRIPT = mdxStr
    ? PREVIEW_MDX_WRAPPER.replace('MDX_STRING', mdxStr)
    : '';
  const body = `<body>\n${PREVIEW_CONTAINER}\n${PREVIEW_IMPORT_MAP}\n${MDX_SCRIPT}\n</body>`;
  const finalHtml = assembleHtml(head, body);
  return finalHtml;
};
