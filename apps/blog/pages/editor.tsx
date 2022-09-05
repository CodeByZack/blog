import React, { useEffect, useRef, useState } from 'react';
import {
  compileMdx,
  FSloader,
  modifyCompileResult,
  OnlineBuilder,
} from 'utils';
import { MoreVertical } from '@geist-ui/icons';
import {
  Avatar,
  Text,
  Button,
  Display,
  useToasts,
  Loading,
  Popover,
  Code,
  Spacer,
} from '@geist-ui/core';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import useDebounceFn from '../hooks/useDebounceFn';
import { MDXContent } from 'mdx/types';
import { Splitter } from '../components/WrapperSplitter';
import matter from 'gray-matter';
import { IArticleDetail } from '../type';
import { signIn, useSession } from 'next-auth/react';
import readingTime from '../utils/read-time';
import repoUtil from 'utils/github-utils';
import { Monaco, OnMount } from '@monaco-editor/react';
import { registerAutoCompletion } from '../utils/configEditor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import showNewPostModal from '../components/NewPostModal';
import dayjs from 'dayjs';
import blogcss from '../styles/blogcss';
import KPreview from '../components/KPreview';
import ErrorOverlay from '../components/ErrorOverlay';
import KEditor from '../components/KEditor';
import { useTheme } from 'next-themes';

interface IProps {}
const externals = { react: 'React', 'react-dom': 'ReactDOM', dayjs: 'dayjs' };

const templateValue = (data) => `---
title: '${data.title}'
publishedAt: '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'
updatedAt: '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'
summary: '${data.desc}'
---`;

const injectUpdateTime = (str: string) => {
  const { data, content } = matter(str);
  data.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const result = matter.stringify(content, data);
  return result;
};

const BlogEditor = (props: IProps) => {
  const valueRef = useRef('');
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [resizing, setResizing] = useState(false);
  const [buildError, setBuildError] = useState<any>(null);
  const { theme, setTheme } = useTheme();
  const { setToast: showToast } = useToasts({ placement: 'topRight' });
  const previewRef = useRef<HTMLIFrameElement>();
  const dataHolder = useRef<{
    editPost: any;
    editor: monaco.editor.IStandaloneCodeEditor;
    monaco: Monaco;
    esbuild?: { fs: FSloader; builder: OnlineBuilder };
  }>({
    editPost: {},
    editor: null,
    monaco: null,
  });

  const router = useRouter();
  const { query } = router;
  const { path } = query;

  useEffect(() => {
    if (!editorReady) return;
    if (!session?.accessToken) return;
    repoUtil.init(session.accessToken as string);
    if (path) {
      editPost(path as string);
    } else {
      newAdd();
    }
  }, [path, session?.accessToken, editorReady]);

  useEffect(() => {
    if (dataHolder.current.esbuild) return;
    const FSloaderInstance = new FSloader();
    const OnlineBuilderInstance = new OnlineBuilder({
      loader: FSloaderInstance.readFile,
      externals,
    });
    const BuildOnline = {
      fs: FSloaderInstance,
      builder: OnlineBuilderInstance,
    };
    dataHolder.current.esbuild = BuildOnline;
  }, []);

  const handleChange = useDebounceFn(async (v: string) => {
    const { data, content } = matter(v);

    // const isEmpty = (str: string) => !!str.replaceAll('\n', '');

    // const comp = await evaluateMdx(isEmpty(content) ? content : '请输入内容', {
    //   ...runtime,
    //   ...provider,
    // } as any);

    // setMdxComp({
    //   comp: comp?.default,
    //   postInfo: { ...data, readingTime: readingTime(content) },
    // });
    // console.log({ data, content });

    const mdxResult = await compileMdx(content);
    const { error, msg, result } = mdxResult;

    if (error) {
      setBuildError({ msg });
      return;
    }

    const resultStr = modifyCompileResult(result, data);
    if (dataHolder.current.esbuild) {
      dataHolder.current.esbuild.fs.writeFile('/index.jsx', resultStr);
      const text = await dataHolder.current.esbuild.builder.build({
        entryPoints: ['index.jsx'],
        outfile: 'out.js',
      });
      console.log({ text });
      const html = `<div id="app"></div><script>${text}</script>`;
      previewRef.current.contentWindow.postMessage({ html }, '*');
    }
    setBuildError(null);
  }, 1000);

  const handleEditorMount: OnMount = (editor, monaco) => {
    dataHolder.current.editor = editor;
    dataHolder.current.monaco = monaco;
    // 注册代码提示
    registerAutoCompletion(monaco);
    setEditorReady(true);
  };
  const newAdd = async () => {
    const info: any = await showNewPostModal({});
    const content = templateValue({
      title: info.title,
      desc: info.desc,
    });
    dataHolder.current.editor.setValue(content);
    dataHolder.current.editPost = {
      path: info.path,
      content,
    };
  };

  const afterIframeLoad = () => {
    previewRef.current.contentWindow.postMessage({ css: blogcss }, '*');
  };

  const editPost = async (filePath: string) => {
    try {
      setLoading(true);
      const res = await repoUtil.getRepoFile(filePath);
      dataHolder.current.editPost = res;
      dataHolder.current.editor.setValue(res.content);
    } catch (error) {
      showToast({ text: JSON.stringify(error), type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const savePost = async () => {
    const { path, sha } = dataHolder.current.editPost;
    const hasUpdateDateContent = injectUpdateTime(valueRef.current);
    try {
      setLoading(true);
      const res = await repoUtil.updateRepoFile({
        path,
        sha: sha || undefined,
        content: hasUpdateDateContent,
      });
      dataHolder.current.editPost.sha = res.data.content.sha;
      setLoading(false);
      showToast({ text: '保存成功！' });
    } catch (error) {
      showToast({ text: JSON.stringify(error), type: 'error' });
    }
  };

  const toggleTheme = () => {
    const t = theme === 'dark' ? 'light' : 'dark';
    setTheme(t);
    previewRef.current.contentWindow.postMessage({ theme: t }, '*');
  };

  return (
    <>
      <NextSeo title={`博客编辑器 – 行者、空山`} description={'博客编辑器'} />
      <div className="w-screen h-screen bg-[#fff] dark:bg-[#1e1e1e] overflow-hidden">
        <div className="h-full">
          <div className="flex items-center justify-between h-[38px] b-y-1 b-[#404040] p-1 box-border">
            <div className="flex items-center">
              <Avatar
                w="25px"
                h="25px"
                text="K"
                mr="8px"
                onClick={toggleTheme}
              />
              <Text margin={0} font="1rem" b>
                Blog Editor
                <Spacer inline w={1} />
                <Code>{`path : ${dataHolder.current.editPost.path}`}</Code>
              </Text>
            </div>
            <Popover
              placement="bottomEnd"
              content={
                <div style={{ width: 80 }}>
                  <Popover.Item>
                    <div
                      onClick={() => {
                        savePost();
                      }}
                      className="w-full cursor-pointer text-center"
                    >
                      保存
                    </div>
                  </Popover.Item>
                  <Popover.Item>
                    <div
                      onClick={() => {
                        setShowPreview(!showPreview);
                      }}
                      className="w-full cursor-pointer text-center"
                    >
                      {showPreview ? '关闭预览' : '打开预览'}
                    </div>
                  </Popover.Item>
                  <Popover.Item line />
                  <Popover.Item>
                    <div className="w-full cursor-pointer text-center">
                      关于
                    </div>
                  </Popover.Item>
                </div>
              }
            >
              <Button type="abort" icon={<MoreVertical />} auto />
            </Popover>
          </div>
          <div style={{ height: 'calc(100% - 38px)' }}>
            <Splitter
              onResizeStarted={() => {
                setResizing(true);
              }}
              onResizeFinished={() => {
                setResizing(false);
              }}
            >
              <div className="h-full w-full">
                <KEditor
                  onChange={(v) => {
                    valueRef.current = v;
                    handleChange(v);
                  }}
                  theme={theme === 'light' ? 'light' : 'vs-dark'}
                  onMount={handleEditorMount}
                />
              </div>
              {showPreview && (
                <div className="h-full w-full overflow-auto relative">
                  {/* <MDXPreview MdxComp={mdxComp} /> */}
                  <KPreview
                    resizing={resizing}
                    ref={previewRef}
                    onLoad={afterIframeLoad}
                  />
                  <ErrorOverlay error={buildError} />
                </div>
              )}
            </Splitter>
          </div>
        </div>
      </div>
      {(loading || !editorReady) && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-opacity-60 bg-black flex justify-center items-center">
          <Loading>加载中</Loading>
        </div>
      )}
      {!session && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-opacity-60 bg-black flex justify-center items-center">
          <Display shadow caption="在线编辑，需要先登录github。">
            <Button onClick={() => signIn()}>登录</Button>
          </Display>
        </div>
      )}
    </>
  );
};
export default BlogEditor;
