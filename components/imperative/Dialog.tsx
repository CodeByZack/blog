import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, ReactElement, useRef } from 'react';
import { imperative } from './imperative';
interface IShowModal {
  isIn?: boolean;
  done?: () => void;
  close?: () => void;
  onCancel?: () => void;
  onOk?: () => void;
  showFooter?: boolean;
  showHeader?: boolean;
  content: ReactElement;
  title?: string;
}

export interface IDialogChildProps {
  closeDialog: () => void;
}

export default function CommonDialog(props: IShowModal) {
  const {
    isIn,
    done,
    close,
    title,
    onCancel,
    showFooter = true,
    showHeader = true,
    content,
    onOk
  } = props;
  const formRef = useRef<HTMLFormElement>();

  const doClose = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
    done();
  };

  const doConfirm = () => {
    if (typeof onOk === 'function') {
      onOk();
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
              <Dialog.Overlay onClick={doClose} className="fixed inset-0" />
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
                {showHeader && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                )}
                {React.cloneElement(content, { closeDialog: close })}
                {showFooter && (
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
                      onClick={doConfirm}
                    >
                      确定
                    </button>
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export const dialog = {
  info: (params: IShowModal) => {
    const element = <CommonDialog {...params} />;
    imperative.show({ element, autoClose: false });
  }
};
