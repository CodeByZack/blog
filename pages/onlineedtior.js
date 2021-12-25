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
import Image from 'next/image';
import { parseISO, format } from 'date-fns';

export default function OnlineEdtior(props) {
  const extensions = useMemo(() => [basicSetup, oneDark, langMarkdown()], []);

  const { data: session } = useSession();
  const router = useRouter();
  const { query } = router;
  console.log(query);
  const { path } = query;

  const [result, setResult] = useState({});
  const [value, setValue] = useState('');
  const [frontMatter, setFrontMatter] = useState({});
  const [repoFileObj, setRepoFile] = useState(null);

  const onUpdate = async (v) => {
    if (v.docChanged) {
      console.log(v);

      const doc = String(v.state.doc);

      const { data, content } = matter(doc);
      setValue(doc);
      setFrontMatter(data);
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
    <div className='h-screen flex flex-col'>
      <div className='px-3 item-center flex flex-wrap justify-between text-gray-600 dark:text-gray-400'>
        <span>路径：{path}</span><span className='text-gray-900 dark:text-gray-100 cursor-pointer'>保存</span>
      </div>
      <div className="flex-1 flex overflow-hidden">
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
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {frontMatter.title || '标题'}
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2 mb-8">
              <div className="flex items-center">
                <Image
                  alt="行者、空山"
                  height={24}
                  width={24}
                  src="/avatar.jpg"
                  className="rounded-full"
                />
                <p className="text-sm text-gray-700 dark:text-gray-300 ml-2">
                  {frontMatter.by}
                  {'行者、空山 / '}
                  {frontMatter.publishedAt ? format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy') : '-------'}
                </p>
              </div>
            </div>
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
