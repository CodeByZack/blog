import { useMemo, useRef } from 'react';
import { dialog } from '.';
import { IDialogChildProps } from './Dialog';

interface IFormValues {
  post_title: string;
  post_desc: string;
  post_file: string;
}

interface ICreatePostProps {
  onConfirm: (values: IFormValues) => void;
}

export const CreatePostComp = (
  props: ICreatePostProps & Partial<IDialogChildProps>
) => {
  const { onConfirm, closeDialog } = props;

  const formRef = useRef<HTMLFormElement>();

  const handleCommit = () => {
    const values = {
      post_title: formRef.current.post_title.value,
      post_desc: formRef.current.post_desc.value,
      post_file: formRef.current.post_file.value
    };
    if (typeof onConfirm === 'function') {
      onConfirm(values);
    }
    closeDialog();
  };
  return (
    <>
      <div className="mt-2">
        <form ref={formRef}>
          <div className="flex items-center mb-4">
            <label htmlFor="post-title" className="mr-2 flex-shrink-0">
              文章标题：
            </label>
            <input
              id="post-title"
              name="post_title"
              type="post_title"
              autoComplete="post_title"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="输入文章标题"
            />
          </div>
          <div className=" flex items-center mb-4">
            <label htmlFor="post-desc" className="mr-2 flex-shrink-0">
              文章简介：
            </label>
            <input
              id="post-desc"
              name="post_desc"
              type="post_desc"
              autoComplete="post_desc"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="输入文章简介"
            />
          </div>
          <div className=" flex items-center mb-4">
            <label htmlFor="post-file" className="mr-2 flex-shrink-0">
              文件地址：
            </label>
            <input
              id="post-file"
              name="post_file"
              type="post_file"
              autoComplete="post_file"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="输入文件地址"
            />
          </div>
        </form>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="mr-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={closeDialog}
        >
          取消
        </button>
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={handleCommit}
        >
          确定
        </button>
      </div>
    </>
  );
};

export const showCreatePostDialog = (
  onConfirm: ICreatePostProps['onConfirm']
) => {
  dialog.info({
    title: '新增文章',
    showFooter: false,
    content: <CreatePostComp onConfirm={onConfirm} />
  });
};
