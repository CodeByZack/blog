import React, { useEffect, useRef, useState } from 'react';
import { KEditor } from 'ui';
import { evaluateMdx } from 'utils';
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
import MDXPreview from '../components/MDXPreview';
import * as runtime from 'react/jsx-runtime';
import * as provider from '@mdx-js/react';
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

interface IProps {}

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
  const { setToast: showToast } = useToasts({ placement: 'topRight' });
  const dataHolder = useRef<{
    editPost: any;
    editor: monaco.editor.IStandaloneCodeEditor;
    monaco: Monaco;
  }>({
    editPost: {},
    editor: null,
    monaco: null,
  });
  const [mdxComp, setMdxComp] = useState<{
    comp: MDXContent;
    postInfo: Partial<IArticleDetail>;
  }>({
    comp: null,
    postInfo: {},
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

  const handleChange = useDebounceFn(async (v: string) => {
    const { data, content } = matter(v);

    const isEmpty = (str: string) => !!str.replaceAll('\n', '');

    const comp = await evaluateMdx(isEmpty(content) ? content : '请输入内容', {
      ...runtime,
      ...provider,
    } as any);

    console.log({ data, content, comp });

    setMdxComp({
      comp: comp?.default,
      postInfo: { ...data, readingTime: readingTime(content) },
    });

    // /**
    //  * 下面这种方式
    //  * 1. 运行时编译mdx。
    //  * 2. 拿上一步的结果，拼凑完整的html
    //  * 3. 在html里，使用 script module 引入 react react-dom 等库，以及样式
    //  * 4. mdx中所使用的组件也需要通过script module形式引入
    //  * 5. 上一步的难点在于 现在很多组件库都不支持script module引入，就算支持也很麻烦，如果没有依赖纯手写还可以。
    //  * */
    // const mdxStr = await compileMdx(valueRef.current);
    // const htmlContent = createHtml({ mdxStr });
    // console.log({ mdxStr, htmlContent });
    // setSrcDoc(htmlContent);
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

  return (
    <>
      <NextSeo title={`博客编辑器 – 行者、空山`} description={'博客编辑器'} />
      <div className="w-screen h-screen bg-[#1e1e1e] overflow-hidden">
        <div className="h-full">
          <div className="flex items-center justify-between h-[38px] b-y-1 b-[#404040] p-1 box-border">
            <div className="flex items-center">
              <Avatar w="25px" h="25px" text="K" mr="8px" />
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
            <Splitter>
              <div className="h-full w-full">
                <KEditor
                  onChange={(v) => {
                    valueRef.current = v;
                    handleChange(v);
                  }}
                  onMount={handleEditorMount}
                />
              </div>
              {showPreview && (
                <div className="h-full w-full overflow-auto">
                  <MDXPreview MdxComp={mdxComp} />
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