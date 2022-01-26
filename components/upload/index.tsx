import React, { PropsWithChildren, useMemo } from 'react';
import { useRef } from 'react';
import { dialog } from '../imperative';

interface IProps {}
interface IImageUploadProps {
  file: File;
  onUploadSuccess: (str: string) => void;
}

const Upload = (props: PropsWithChildren<IProps>) => {
  const overLayRef = useRef<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>();

  const enterCountRef = useRef(0);

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (event) => {
    if (enterCountRef.current === 0) {
      overLayRef.current.style.display = 'flex';
    }
    enterCountRef.current++;
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (event) => {
    enterCountRef.current--;
    if (enterCountRef.current === 0) {
      overLayRef.current.style.display = 'none';
    }
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (ev) => {
    overLayRef.current.style.display = 'none';
    enterCountRef.current = 0;

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    const files = Array.from(ev.dataTransfer.items || [])
      .filter((i) => i.kind === 'file')
      .map((i) => i.getAsFile());

    if (!files?.length) return;
    if (files.length > 1) return;
    const targetFile = files[0];
    console.log(targetFile);

    showImageUploadDialog({ file: targetFile, onUploadSuccess: () => {} });
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full"
      onDragEnterCapture={handleDragEnter}
      onDragLeaveCapture={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {props.children}
      <div
        ref={overLayRef}
        style={{ display: 'none' }}
        className="absolute flex justify-center items-center text-white top-0 left-0 w-full h-full opacity-50 bg-black"
      >
        拖动上传
      </div>
    </div>
  );
};

export const ImageUploadPreview = (props: IImageUploadProps) => {
  const { file, onUploadSuccess } = props;
  console.log(props);
  const { name, type, size } = file;

  const fileUrl = useMemo(() => {
    if (!file) return '';
    return URL.createObjectURL(new Blob([file]));
  }, [file]);

  return (
    <div>
      <div className="rounded-lg overflow-auto preview w-full h-[300px] from-slate-300 bg-gradient-to-t	">
        <img className="object-contain w-full h-full" src={fileUrl} />
      </div>
      <div className="mt-4">
        <label
          htmlFor="file_name"
          className="block text-sm font-medium text-gray-700"
        >
          文件名：
        </label>
        <div className="relative rounded-md shadow-sm mt-4">
          <input
            type="text"
            name="file_name"
            id="file_name"
            className="focus:ring-indigo-500 leading-8 focus:border-indigo-500 block w-full px-2 border-gray-300 rounded-md"
            placeholder="0.00"
          />
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="file_name"
          className="block text-sm font-medium text-gray-700"
        >
          文件信息：
        </label>
        <div className="mt-4 relative rounded-md shadow-sm text-gray-500 sm:text-sm px-2 ">
          文件信息山山水水
        </div>
      </div>
    </div>
  );
};

export const showImageUploadDialog = (params: IImageUploadProps) => {
  dialog.info({
    title: '上传预览',
    onOk: () => {},
    showFooter: false,
    content: <ImageUploadPreview {...params} />
  });
};

export default Upload;
