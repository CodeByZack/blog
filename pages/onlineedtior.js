import matter from 'gray-matter';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { evaluate } from '@mdx-js/mdx';
import { useTheme } from 'next-themes';
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
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  const { query } = router;
  const { path } = query;

  const [result, setResult] = useState({});
  const [value, setValue] = useState(testvalue);
  const [frontMatter, setFrontMatter] = useState({});
  const [repoFileObj, setRepoFile] = useState(null);
  const editorRef = useRef(null);

  const handleChange = async (v, event) => {
    const { data, content } = matter(v);
    setFrontMatter(data);
    setValue(v);
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
    setResult({ comp: res.default });
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = { editor, monaco };
    console.log(editorRef.current);
    editor.onDidScrollChange((e) => {
      const { scrollHeight, scrollTop } = e;
      const previewBox = document.querySelector('#preview-box');
      previewBox.scrollTop =
        (scrollTop / scrollHeight) * previewBox.scrollHeight;
    });
    if (repoFileObj) {
      editorRef.current.editor.setValue(value);
    }
  };

  const save = async () => {
    const res = await repoUtil.updateRepoFile({
      sha: repoFileObj.sha,
      path: repoFileObj.path,
      content: value
    });
    console.log('保存成功！');
  };

  useEffect(() => {
    if (!session?.accessToken) return;
    if (!path) return;
    repoUtil.init(session.accessToken);
    repoUtil.getRepoFile(path).then((res) => {
      setValue(res.content);
      setRepoFile(res);
      if (editorRef.current?.editor) {
        editorRef.current.editor.setValue(res.content);
      }
    });
  }, [session?.accessToken, path]);

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
    <div id="preview-box" className="h-full overflow-auto flex justify-center">
      <div className="prose dark:prose-dark">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {frontMatter.title}
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

  if (!session) {
    return (
      <div className="container mx-auto h-screen text-gray-900 dark:text-gray-100 flex items-center justify-center">
        <button
          onClick={signIn}
          className="py-2 px-3 bg-white text-indigo-600 text-sm font-semibold rounded-md shadow-lg focus:outline-none"
        >
          登录
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <nav className="sticky-nav px-2 h-10 shadow-neutral-500/50 shadow dark:shadow-lg dark:shadow-indigo-500/50 flex justify-between items-center w-full bg-white dark:bg-black bg-opacity-60">
        <div className="text-gray-900 dark:text-gray-100">
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="bg-gray-200 dark:bg-gray-800 rounded p-1 h-6 w-6"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="h-4 w-4 text-gray-800 dark:text-gray-200"
              >
                {theme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
          <span className="ml-4">标题：{frontMatter?.title}</span>
          <span className="ml-4">路径：{path}</span>
        </div>

        <div className="text-gray-900 dark:text-gray-100">
          <span className="cursor-pointer" onClick={save}>
            保存
          </span>
        </div>
      </nav>
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
