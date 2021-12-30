import matter from 'gray-matter';
import { useEffect, useState, useRef } from 'react';
import { evaluate } from '@mdx-js/mdx';
import mdxPrism from 'mdx-prism';
import * as provider from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';
import { signIn, signOut, useSession } from 'next-auth/react';
import repoUtil from '@/lib/repoUtil';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import Editor from '@monaco-editor/react';
import SplitContainer from '@/components/SplitContainer';

const testvalue = ``;

export default function OnlineEdtior(props) {
  const { data: session } = useSession();
  const router = useRouter();
  const { query } = router;
  console.log(query);
  const { path } = query;

  const [result, setResult] = useState({});
  const [value, setValue] = useState(testvalue);
  const [frontMatter, setFrontMatter] = useState({});
  const [repoFileObj, setRepoFile] = useState(null);
  const editorRef = useRef(null);

  const handleChange = async (v, event) => {
    const { data, content } = matter(v);
    console.log(data, content);
    setFrontMatter(data);
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
  };

  const handleEditorDidMount = (editor, monaco) => {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = { editor, monaco };
    console.log(editorRef);
    // editorRef.current.editor.setValue('哈哈哈哈哈');
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
    console.log('保存成功！');
  };

  // if (!session) {
  //   return (
  //     <div className="bg-red-500" onClick={signIn}>
  //       登录
  //     </div>
  //   );
  // }

  const leftChildren = (
    <div className="h-full">
      <Editor
        onMount={handleEditorDidMount}
        theme="vs-dark"
        onChange={handleChange}
        defaultLanguage="markdown"
        defaultValue={testvalue}
      />
    </div>
  );

  const rightChildren = (
    <div className="h-full overflow-auto flex justify-center">
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
              {frontMatter.publishedAt
                ? format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')
                : '-------'}
            </p>
          </div>
        </div>
        {typeof result.comp === 'function' ? result.comp() : ''}
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col">
      <div className="px-3 item-center flex flex-wrap justify-between text-gray-600 dark:text-gray-400">
        <span>路径：{path}</span>
        <span
          className="text-gray-900 dark:text-gray-100 cursor-pointer"
          onClick={test}
        >
          保存
        </span>
      </div>
      <div className="w-full flex-1 flex overflow-hidden">
        <SplitContainer
          leftChildren={leftChildren}
          rightChildren={rightChildren}
        />
      </div>
    </div>
  );
}

// export async function getStaticProps() {
//   const newsletters = await getAllFilesFrontMatter('newsletter');

//   return { props: { newsletters } };
// }
