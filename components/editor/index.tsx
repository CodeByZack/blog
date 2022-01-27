import matter from 'gray-matter';
import React, { useEffect, useRef, useState } from 'react';
import SplitContainer from '@/components/SplitContainer';
import repoUtil from '@/lib/repoUtil';
import Loading from '../Loading';
import * as provider from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import mdxPrism from 'mdx-prism';
import NavHeader from './NavHeader';
import Editor from './Editor';
import Preview from './Preview';
import { toast } from '../imperative';
import { format } from 'date-fns';
import { OnMount } from '@monaco-editor/react';
import { registerAutoCompletion } from './configEditor';
import Upload from '../upload';
import {
  showCreatePostDialog,
} from '../imperative/WrapperDialog';

interface IProps {
  path?: string;
  accessToken?: string;
}
export interface IFrontMatter {
  title?: string;
  by?: string;
  publishedAt?: string;
}

const templateValue = (data) => `---
title: '${data.title}'
publishedAt: '${format(new Date(), 'yyyy-MM-dd')}'
summary: '${data.desc}'
---`;

enum EDIT_MODE {
  EDIT,
  ADD
}

const OnlineEdtior = (props: IProps) => {
  const { path, accessToken } = props;

  const [frontMatter, setFrontMatter] = useState<IFrontMatter>({});
  const [editMode, setEditMode] = useState(EDIT_MODE.EDIT);
  const [mdxResult, setMdxResult] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [editPath, setEditPath] = useState(path);
  const [value, setValue] = useState('');
  const repoFileObj = useRef(null);
  const editorRef = useRef(null);

  const getRepoFile = async () => {
    repoUtil.init(accessToken);
    setLoading(true);
    try {
      const res = await repoUtil.getRepoFile(path);
      setValue(res.content);
      repoFileObj.current = res;
      editorRef.current.editor.setValue(res.content);
    } catch (error) {
      console.log(error);
      toast.info(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = { editor, monaco };
    // 注册代码提示
    registerAutoCompletion(monaco);
    if (editPath) {
      getRepoFile();
    } else {
      setTimeout(() => {
        showCreatePostDialog((values) => {
          setEditPath(values.post_file);
          const value = templateValue({
            title: values.post_title,
            desc: values.post_desc
          });
          editorRef.current.editor.setValue(value);
        });
      }, 0);
    }
    // editor.onDidScrollChange((e) => {
    //   const { scrollHeight, scrollTop } = e;
    //   const previewBox = document.querySelector('#preview-box');
    //   previewBox.scrollTop =
    //     (scrollTop / scrollHeight) * previewBox.scrollHeight;
    // });
    // if (repoFileObj.current) {
    //   editorRef.current.editor.setValue(value);
    // }
  };

  const handleChange = async (v, event) => {
    const { data, content } = matter(v);
    setFrontMatter(data);
    setValue(v);

    try {
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
      console.log(res);
      setMdxResult({ comp: res.default });
    } catch (error) {
      toast.info(JSON.stringify(error));
    }
  };

  const save = async () => {
    if (editMode === EDIT_MODE.ADD) {
      setLoading(true);
      const res = await repoUtil.updateRepoFile({
        path: editPath,
        content: value
      });
      setLoading(false);
      toast.info('保存成功！');
    } else {
      setLoading(true);
      const res = await repoUtil.updateRepoFile({
        sha: repoFileObj.current.sha,
        path: repoFileObj.current.path,
        content: value
      });
      setLoading(false);
      toast.info('保存成功！');
    }
  };

  useEffect(() => {
    if (path) {
      setEditMode(EDIT_MODE.EDIT);
      setEditPath(path);
    } else {
      setEditMode(EDIT_MODE.ADD);
    }
  }, [path]);

  const leftChildren = (
    <Upload>
      <Editor onMount={handleEditorDidMount} onChange={handleChange} />
    </Upload>
  );
  const rightChildren = (
    <Preview frontMatter={frontMatter} mdxResult={mdxResult.comp} />
  );

  return (
    <Loading loading={loading}>
      <div className="h-screen flex flex-col">
        <NavHeader title={frontMatter?.title} path={editPath} save={save} />
        <div className="w-full flex-1 flex overflow-hidden">
          <SplitContainer
            leftChildren={leftChildren}
            rightChildren={rightChildren}
            // minRightWidth={700}
          />
        </div>
      </div>
    </Loading>
  );
};
export default OnlineEdtior;
