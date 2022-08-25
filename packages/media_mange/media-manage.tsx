import React, { useEffect, useMemo, useState } from 'react';
import styles from './style.module.css';
import {
  ChonkyActions,
  ChonkyActionUnion,
  ChonkyIconName,
  defineFileAction,
  FileActionHandler,
  FileArray,
  FileData,
  GenericFileActionHandler,
  setChonkyDefaults,
} from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import { FullFileBrowser } from 'chonky';
import fileUtils from './file-utils';
import fsHelper from './fs-helper';
import zwsp from './zwsp';
import useFileUtil from './hooks/useFileUtil';
setChonkyDefaults({ iconComponent: ChonkyIconFA });

interface IProps {
  path: string;
}

const useFileManage = ()=>{
  

};

const MediaManage = (props: IProps) => {
  const { path = '' } = props;

  const [files, setFiles] = useState<FileArray>([]);
  const [folderChain, setFolderChain] = useState<FileArray>([]);
  const { contentJSX, fileUtils } = useFileUtil();

  const uploadFile = async () => {
    try {
      const fileHandle = await fsHelper.getFileHandle();
      const file = await fileHandle.getFile();
      const _files: FileArray = [...files, null];
      setFiles(_files);
      const prefix = folderChain.map((f) => f?.path).join('');
      console.log(prefix);
      const uploadRes = await fileUtils.uploadFile(
        `${prefix}${file.name}`,
        file,
      );
      console.log(uploadRes);
      const { data } = uploadRes;
      const uploadFile: FileData = {
        id: data?.fileUrl!,
        name: data?.fileName!,
        url: data?.fileUrl!,
        thumbnailUrl: data?.fileUrl!,
      };
      setFiles([...files, uploadFile]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFile = async (file: Parameters<FileActionHandler>['0']) => {
    const { state } = file;
    const { selectedFilesForAction } = state;
    const paths = selectedFilesForAction.map((s) => s.id);
    await fileUtils.deleteFileByPath(paths);
    const restFiles = files.filter((f) => !paths.includes(f?.id!));
    setFiles(restFiles);
  };

  const handleAction: FileActionHandler = (data) => {
    if (data.id === ChonkyActions.OpenFiles.id) {
      const { payload } = data;
      const { files } = payload;
      console.log(files);
      if (files.length === 1 && files[0].isDir) {
        const file = files[0];
        if (file.isPath) {
          const chain = folderChain.slice(
            0,
            folderChain.findIndex((f) => f?.id === file.id) + 1,
          );
          setFolderChain(chain);
        } else {
          const chain = [
            ...folderChain,
            {
              id: file.id,
              name: file.name.replace('/', ''),
              path: file.path,
              isDir: true,
              isPath: true,
            },
          ];
          setFolderChain(chain);
        }
      }
    } else if (data.id === ChonkyActions.UploadFiles.id) {
      if (files.includes(null)) return;
      uploadFile();
    } else if (data.id === ChonkyActions.DeleteFiles.id) {
      deleteFile(data);
    }
  };

  const getFiles = async (path: string) => {
    const files = await fileUtils.getFileArrByPath(path);
    console.log(files);
    setFiles(files);
  };

  useEffect(() => {
    if (!contentJSX) {
      setFolderChain([
        { id: '.', path: '', name: '.', isDir: true, isPath: true },
      ]);
    }
  }, [contentJSX]);

  useEffect(() => {
    if (folderChain.length > 0) {
      const path = folderChain.map((f) => f?.path).join('');
      console.log(path);
      getFiles(path);
    }
  }, [folderChain]);

  if (contentJSX) return contentJSX;

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.fileBrowser}>
          <FullFileBrowser
            files={files}
            disableDefaultFileActions={true}
            fileActions={[
              ChonkyActions.UploadFiles,
              ChonkyActions.EnableListView,
              ChonkyActions.EnableGridView,
              ChonkyActions.DeleteFiles,
            ]}
            folderChain={folderChain}
            onFileAction={handleAction}
          />
        </div>
      </div>
    </div>
  );
};
export default MediaManage;
