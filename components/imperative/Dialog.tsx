import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { imperative } from './imperative';

const formKeys = ['title', 'desc', 'postfile'];

interface IShowModal {
  isIn?: boolean;
  done?: () => void;
  close?: () => void;
  onConfirm: (values: { [x: string]: any }) => void;
}

export default function MyModal(props: IShowModal) {
  const { isIn, done, close, onConfirm } = props;
  const formRef = useRef<HTMLFormElement>();

  const handleCommit = () => {
    const values = {
      posttitle: formRef.current.posttitle.value,
      postdesc: formRef.current.postdesc.value,
      postfile: formRef.current.postfile.value
    };
    if (typeof onConfirm === 'function') {
      onConfirm(values);
    }
    done();
  };

  return (
    <>
      <Transition
        appear
        show={isIn}
        afterLeave={() => {
          console.log('afterLeave');
          done();
        }}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={close}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  新增文章
                </Dialog.Title>
                <div className="mt-2">
                  <form ref={formRef}>
                    <div className="flex items-center mb-4">
                      <label
                        htmlFor="post-title"
                        className="mr-2 flex-shrink-0"
                      >
                        文章标题：
                      </label>
                      <input
                        id="post-title"
                        name="posttitle"
                        type="posttitle"
                        autoComplete="posttitle"
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
                        name="postdesc"
                        type="postdesc"
                        autoComplete="postdesc"
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
                        name="postfile"
                        type="postfile"
                        autoComplete="postfile"
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
                    onClick={close}
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export const dialog = {
  info: (parmas: IShowModal) => {
    const { onConfirm } = parmas;
    const element = <MyModal onConfirm={onConfirm} />;
    imperative.show({ element, autoClose: false });
  }
};
