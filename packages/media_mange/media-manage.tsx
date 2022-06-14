import React, { useEffect, useState } from 'react';
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
setChonkyDefaults({ iconComponent: ChonkyIconFA });

interface IProps {
  path: string;
}

const MediaManage = (props: IProps) => {
  const { path = '' } = props;

  const [utilsDone, setUtilsDone] = useState(false);
  const [files, setFiles] = useState<FileArray>([]);
  const [folderChain, setFolderChain] = useState<FileArray>([]);

  const uploadFile = async () => {
    try {
      const fileHandle = await fsHelper.getFileHandle();
      const file = await fileHandle.getFile();
      const _files: FileArray = [...files, null];
      setFiles(_files);
      const prefix = folderChain.map((f) => f.path).join('');
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
            folderChain.findIndex((f) => f.id === file.id) + 1,
          );
          setFolderChain(chain);
        } else {
          const chain = [
            ...folderChain,
            {
              id: file.id,
              name: file.name,
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
      console.log(data);
    }
  };

  const getFiles = async (path: string) => {
    const files = await fileUtils.getFileArrByPath(path);
    console.log(files);
    setFiles(files);
  };

  useEffect(() => {
    // You now have access to `window`
    const ALI_CONFIGS = JSON.parse(localStorage.getItem('ALI_CONFIGS') || '{}');
    const status = fileUtils.init(ALI_CONFIGS);
    setUtilsDone(status);
  }, []);

  useEffect(() => {
    if (utilsDone) {
      setFolderChain([
        { id: '.', path: '', name: '.', isDir: true, isPath: true },
      ]);
    }
  }, [utilsDone]);

  useEffect(() => {
    if (folderChain.length > 0) {
      const path = folderChain.map((f) => f.path).join('');
      console.log(path);
      getFiles(path);
    }
  }, [folderChain]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.fileBrowser}>
          {utilsDone ? (
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
          ) : (
            <div className={styles.noIdAndSecret}>
              <span>配置你自己的阿里云 ID 和 Secret。</span>
              <code>
                localStorage.setItem("ALI_CONFIGS",
                {` '{ "accessKeyId":"","accessKeySecret":""}'`});
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MediaManage;
