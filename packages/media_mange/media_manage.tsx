import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import {
  ChonkyActions,
  ChonkyActionUnion,
  FileActionHandler,
  FileData,
  GenericFileActionHandler,
  setChonkyDefaults,
} from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import { FullFileBrowser } from 'chonky';
import fileUtils from './file-utils';
setChonkyDefaults({ iconComponent: ChonkyIconFA });

interface IProps {
  path: string;
}

const MediaManage = (props: IProps) => {
  const { path = '' } = props;

  const [utilsDone, setUtilsDone] = useState(false);
  const [files, setFiles] = useState<FileData[]>([]);
  const [folderChain, setFolderChain] = useState<FileData[]>([]);

  const handleAction: FileActionHandler = (data) => {
    console.log(data);
    if (data.id === ChonkyActions.OpenFiles.id) {
      const { payload } = data;
      const { files } = payload;
      if (files.length === 1 && files[0].isDir) {
        const file = files[0];
        if (file.isPath) {
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
