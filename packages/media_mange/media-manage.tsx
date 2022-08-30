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
import useMediaManage from './hooks/useMediaManage';
setChonkyDefaults({ iconComponent: ChonkyIconFA });

interface IProps {
  path: string;
}

const MediaManage = (props: IProps) => {
  const { path = '' } = props;
  const { contentJSX, fileUtils } = useFileUtil();
  const {
    files,
    folderChain,
    setFolderChain,
    uploadFiles,
    createFolder,
    deleteFiles,
  } = useMediaManage(fileUtils);

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
      uploadFiles();
    } else if (data.id === ChonkyActions.DeleteFiles.id) {
      deleteFiles(data);
    } else if (data.id === ChonkyActions.CreateFolder.id) {
      createFolder();
    }
  };

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
              ChonkyActions.CreateFolder,
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
