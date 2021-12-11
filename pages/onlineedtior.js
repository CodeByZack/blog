import CodeMirror from 'rodemirror';
import { basicSetup } from '@codemirror/basic-setup';
import { markdown as langMarkdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import matter from 'gray-matter';
import { useMemo, useState } from 'react';
import { compile, evaluate } from '@mdx-js/mdx';
import mdxPrism from 'mdx-prism';
import * as provider from '@mdx-js/react'
import * as runtime from 'react/jsx-runtime';

export default function OnlineEdtior(props) {
  const extensions = useMemo(() => [basicSetup, oneDark, langMarkdown()], []);

  const [result, setResult] = useState({});

  const onUpdate = async (v) => {
    if (v.docChanged) {
      console.log(v);

      const doc = String(v.state.doc);
      const { data, content } = matter(doc);

      console.log(data);

      const res = await evaluate(content, {
        ...provider,
        ...runtime,
        remarkPlugins: [
          require('remark-autolink-headings'),
          require('remark-slug'),
          require('remark-code-titles')
        ],
        rehypePlugins: [mdxPrism]
      });

      console.log(res.default);
      setResult({ comp: res.default });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/4  flex-shrink-0 h-full overflow-auto">
        <CodeMirror
          elementProps={{
            className: 'h-full'
          }}
          onUpdate={onUpdate}
          extensions={extensions}
        />
      </div>
      <div className="w-2/4 flex-shrink-0 h-full overflow-auto flex justify-center">
        <div className="prose dark:prose-dark">
          {typeof result.comp === 'function' ? result.comp() : ''}
        </div>
      </div>
    </div>
  );
}

// export async function getStaticProps() {
//   const newsletters = await getAllFilesFrontMatter('newsletter');

//   return { props: { newsletters } };
// }
