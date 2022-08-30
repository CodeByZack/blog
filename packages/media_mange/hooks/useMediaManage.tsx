import { FileActionHandler, FileArray, FileData } from 'chonky';
import { useEffect, useState } from 'react';
import { OssInstance } from '../file-utils';
import fsHelper from '../fs-helper';

const baseFolder = { id: '.', path: '', name: '.', isDir: true, isPath: true };

const useMediaManage = (fileUtils: OssInstance) => {
  const [files, setFiles] = useState<FileArray>([]);
  const [folderChain, setFolderChain] = useState<FileArray>([]);

  const uploadFiles = async () => {
    try {
      const fileHandleArr = await fsHelper.getFileHandle({ multiple: true });
      if (!fileHandleArr) return;

      const allFiles = await Promise.all(
        fileHandleArr.map(async (fileHandle) => {
          const file = await fileHandle.getFile();
          return file;
        }),
      );
      const _files: FileArray = [...files, null];
      setFiles(_files);
      const prefix = folderChain.map((f) => f?.path).join('');
      console.log(prefix);
      const uploadRes = await fileUtils.uploadFiles(
        allFiles.map((f) => ({ ossPath: `${prefix}${f.name}`, file: f })),
      );
      console.log(uploadRes);
      const { data } = uploadRes;
      const uploadFiles: FileData[] = (data || [])?.map((d) => ({
        id: d?.fileUrl!,
        name: d?.fileName!,
        url: d?.fileUrl!,
        thumbnailUrl: d?.fileUrl!,
      }));
      setFiles([...files, ...uploadFiles]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFiles = async (file: Parameters<FileActionHandler>['0']) => {
    const { state } = file;
    const { selectedFilesForAction } = state;
    const paths = selectedFilesForAction.map((s) => s.id);
    await fileUtils.deleteFileByPathArr(paths);
    const restFiles = files.filter((f) => !paths.includes(f?.id!));
    setFiles(restFiles);
  };

  const getFiles = async (path: string) => {
    const files = await fileUtils.getFileArrByPath(path);
    setFiles(files);
  };

  const createFolder = async () => {
    const folderName = prompt('请输入文件夹名字');
    if (!folderName) return;
    const folder: FileData = {
      id: folderName,
      name: folderName,
      path: `${folderName}/`,
      isDir: true,
      isPath: true,
      isFront: true,
    };
    setFolderChain([...folderChain, folder]);
  };

  useEffect(() => {
    if (!fileUtils) return;

    setFolderChain([baseFolder]);
  }, [fileUtils]);

  useEffect(() => {
    if (!folderChain.length) return;

    const path = folderChain.map((f) => f?.path).join('');
    console.log(path);
    getFiles(path);
  }, [folderChain]);

  return {
    uploadFiles,
    deleteFiles,
    files,
    folderChain,
    setFolderChain,
    createFolder
  };
};

export default useMediaManage;
