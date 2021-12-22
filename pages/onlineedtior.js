import CodeMirror from 'rodemirror';
import { basicSetup } from '@codemirror/basic-setup';
import { markdown as langMarkdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import matter from 'gray-matter';
import { useEffect, useMemo, useState } from 'react';
import { evaluate } from '@mdx-js/mdx';
import mdxPrism from 'mdx-prism';
import * as provider from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';
import { signIn, signOut, useSession } from 'next-auth/react';
import repoUtil from '@/lib/repoUtil';
import { useRouter } from 'next/router';

export default function OnlineEdtior(props) {
  const extensions = useMemo(() => [basicSetup, oneDark, langMarkdown()], []);

  const { data: session } = useSession();
  const router = useRouter();
  const { query } = router;
  console.log(query);
  const { path } = query;

  const [result, setResult] = useState({});
  const [value, setValue] = useState('');
  const [repoFileObj, setRepoFile] = useState(null);

  const onUpdate = async (v) => {
    if (v.docChanged) {
      console.log(v);

      const doc = String(v.state.doc);

      const { data, content } = matter(doc);
      setValue(doc);
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

  useEffect(() => {
    if (!session?.accessToken) return;
    if (!path) return;
    repoUtil.init(session.accessToken);
    repoUtil.getRepoFile(path).then((res) => {
      setValue(res.content);
      setRepoFile(res);
    });
  }, [session?.accessToken, path]);

  const test = async () => {
    const res = await repoUtil.updateRepoFile({
      sha: repoFileObj.sha,
      path: repoFileObj.path,
      content: value
    });
  };

  if (!session) {
    return <div className='bg-red-500' onClick={signIn}>登录</div>;
  }

  return (
    <div>
      <div className='flex'>

      <div className="bg-red-500" onClick={test}>
        点我测试
      </div>
      <div className='bg-green-500' onClick={signOut}>
        登出
      </div>
      </div>
      <div className="flex h-screen">
        <div className="w-2/4  flex-shrink-0 h-full overflow-auto">
          <CodeMirror
            elementProps={{
              className: 'h-full'
            }}
            value={value}
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
    </div>
  );
}

// export async function getStaticProps() {
//   const newsletters = await getAllFilesFrontMatter('newsletter');

//   return { props: { newsletters } };
// }