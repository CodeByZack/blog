import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import { FullFileBrowser } from 'chonky';
import fileUtils from './file-utils';
setChonkyDefaults({ iconComponent: ChonkyIconFA });

interface IProps {}

const MediaManage = (props: IProps) => {
  const [utilsDone, setUtilsDone] = useState(false);

  const files = [
    { id: 'lht', name: 'Projects', isDir: true },
    {
      id: 'mcd',
      name: 'chonky-sphere-v2.png',
      thumbnailUrl: 'https://chonky.io/chonky-sphere-v2.png',
    },
  ];
  const folderChain = [{ id: 'xcv', name: 'Demo', isDir: true }];

  const handleAction = (data) => {
    console.log(data);
  };

  const getFiles = async ()=>{
    const files = await fileUtils.getFileArrByPath("");
    console.log(files);
  };

  useEffect(() => {
    // You now have access to `window`
    const ALI_CONFIGS = JSON.parse(localStorage.getItem('ALI_CONFIGS') || '{}');
    const status = fileUtils.init(ALI_CONFIGS);
    setUtilsDone(status);
  }, []);

  useEffect(()=>{
    if(utilsDone){
      getFiles();
    }
  },[utilsDone]);

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
