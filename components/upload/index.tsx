import React, {
  MouseEventHandler,
  PropsWithChildren,
  useMemo,
  useState
} from 'react';
import { useRef } from 'react';
import { dialog, toast } from '../imperative';
import { IDialogChildProps } from '../imperative/Dialog';
import { doOSSUpload, UploadResult } from './upload';

interface IProps {}
interface IImageUploadProps {
  file: File;
  onUploadSuccess: (str: string) => void;
}

const imageCompTemplate = (name, url, w, h) => `<Image
  alt={'${name}'}
  src={'${url}'}
  width={${w}}
  height={${h}}
/>`;

const formatBytes = (byte: number, b?: number) => {
  if (0 == byte) return '0 B';
  const c = 1024,
    d = b || 2,
    e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    f = Math.floor(Math.log(byte) / Math.log(c));
  return parseFloat((byte / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
};

const getFileSize = (file: File, cb: (w: number, h: number) => void) => {
  const image = new Image();
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = function (e) {
    image.src = e.target.result as string;
  };
  // 加载完成执行
  image.onload = function () {
    console.log(image.width, image.height);
    cb(image.width, image.height);
  };
};

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

export const ImageUploadPreview = (
  props: IImageUploadProps & Partial<IDialogChildProps>
) => {
  const { file, onUploadSuccess, closeDialog } = props;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResult>();
  const [fileSize, setFileSize] = useState<{ w: number; h: number }>();

  console.log(props);

  const { fileUrl, fileInfoStr } = useMemo(() => {
    if (!file) return { fileUrl: '', fileInfoStr: '' };
    const { name, type, size } = file;
    getFileSize(file, (w, h) => {
      setFileSize({ w, h });
    });
    return {
      fileUrl: URL.createObjectURL(new Blob([file])),
      fileInfoStr: `文件名字：${name}，文件大小：${formatBytes(
        size
      )}，文件类型：${type}`
    };
  }, [file]);

  const doUpload = async () => {
    const fileName = document.getElementById('file_name') as HTMLInputElement;
    if (!fileName?.value) {
      //   toast.info('请输入上传文件名！');
      console.log('请输入上传文件名');
      return;
    }
    setLoading(true);
    const res = await doOSSUpload(file, fileName.value);
    if (res.status === 'success') {
      setResult(res.data);
    } else {
      console.log(res);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="rounded-lg overflow-auto preview w-full h-[300px] from-slate-300 bg-gradient-to-t	">
        <img
          className="object-contain w-full h-full"
          onLoad={(e) => {
            console.log(e);
            console.log(this);
          }}
          src={result?.fileUrl || fileUrl}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="file_name"
          className="block text-sm font-medium text-gray-700"
        >
          上传文件名：
        </label>
        <div className="relative rounded-md shadow-sm mt-4">
          <input
            type="text"
            name="file_name"
            id="file_name"
            className="focus:ring-indigo-500 leading-8 focus:border-indigo-500 block w-full px-2 border-gray-300 rounded-md"
            placeholder="请输入上传文件名"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          文件信息：
        </label>
        <div className="mt-4 relative rounded-md shadow-sm text-gray-500 sm:text-sm px-2 ">
          {fileInfoStr}
          {fileSize && `宽：${fileSize.w},高：${fileSize.h}`}
        </div>
      </div>

      {result && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            代码模版：
          </label>
          <div className="mt-4 relative rounded-md shadow-sm text-gray-500 sm:text-sm px-2 ">
            <pre className="overflow-auto">
              {imageCompTemplate(
                result.fileName,
                result.fileUrl,
                fileSize.w,
                fileSize.h
              )}
            </pre>
            <br />
            {`![${result.fileName}](${result.fileUrl})`}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="mr-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={closeDialog}
        >
          关闭
        </button>
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={doUpload}
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          上传
        </button>
      </div>
    </div>
  );
};

export const showImageUploadDialog = (params: IImageUploadProps) => {
  dialog.info({
    title: '上传预览',
    onOk: () => {},
    showFooter: false,
    overlayClose: false,
    content: <ImageUploadPreview {...params} />
  });
};

export default Upload;
