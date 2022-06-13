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
  const { path = 'images/' } = props;

  const [utilsDone, setUtilsDone] = useState(false);
  const [files, setFiles] = useState<FileData[]>([]);
  const [folderChain, setFolderChain] = useState<FileData[]>([
    { id: '.', path: '', name: '.', isDir: true, isPath: true },
  ]);

  // const files = [
  //   { id: 'lht', name: 'Projects', isDir: true },
  //   {
  //     id: 'mcd',
  //     name: 'chonky-sphere-v2.png',
  //     thumbnailUrl: 'https://chonky.io/chonky-sphere-v2.png',
  //   },
  // ];
  // const folderChain = [
  //   { id: '.', name: '.', isDir: true, isPath: true },
  //   { id: 'images', name: 'images', isDir: true, isPath: true },
  // ];

  useEffect(()=>{
    const chain = [...folderChain,{ id : path, name : path, path, isDir : true, isPath : true }];
    setFolderChain(chain);
  },[path]);


  const handleAction: FileActionHandler = (data) => {
    console.log(data);
    if (data.id === ChonkyActions.OpenFiles.id) {
      const { payload } = data;
      const { files } = payload;
      if (files.length === 1 && files[0].isDir) {
        if (files[0].isPath) {
        } else {
          const chain = [...folderChain,{ id : path, name : path, path, isDir : true, isPath : true }];


        }
      }
    }
  };

  const getFiles = async () => {
    const files = await fileUtils.getFileArrByPath('images/');
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
      getFiles();
    }
  }, [utilsDone]);

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
