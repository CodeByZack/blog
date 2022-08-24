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
import zwsp from './zwsp';
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
              name: file.name.replace("/",""),
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

  const saveConfigs = () => {
    // @ts-ignore
    const accessKeyIdValue = accessKeyId.value;
    // @ts-ignore
    const accessKeySecretValue = accessKeySecret.value;

    if (!accessKeyIdValue || !accessKeySecretValue) {
      alert('请填写后再保存！');
      return;
    }

    localStorage.setItem(
      'ALI_CONFIGS',
      JSON.stringify({
        accessKeyId: zwsp.encode(accessKeyIdValue),
        accessKeySecret: zwsp.encode(accessKeySecretValue),
      }),
    );
    location.reload();
  };

  useEffect(() => {
    // You now have access to `window`
    const ALI_CONFIGS = JSON.parse(localStorage.getItem('ALI_CONFIGS') || '{}');
    if(!ALI_CONFIGS.accessKeyId || !ALI_CONFIGS.accessKeySecret) return;
    ALI_CONFIGS.accessKeyId = zwsp.decode(ALI_CONFIGS.accessKeyId);
    ALI_CONFIGS.accessKeySecret = zwsp.decode(ALI_CONFIGS.accessKeySecret);
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
      const path = folderChain.map((f) => f?.path).join('');
      console.log(path);
      getFiles(path);
    }
  }, [folderChain]);

  if (!utilsDone) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.fileBrowser}>
            <div className={styles.noIdAndSecret}>
              <h2 className={styles.tip}>配置你自己的阿里云 ID 和 Secret。</h2>
              <div className={styles.inputArea}>
                <div className={styles.inputItem}>
                  <label>accessKeyId：</label>
                  <input id="accessKeyId" placeholder="请输入" />
                </div>
                <div className={styles.inputItem}>
                  <label>accessKeySecret：</label>
                  <input id="accessKeySecret" placeholder="请输入" />
                </div>
              </div>
              <button onClick={saveConfigs}>保存</button>
              {/* <code>
                localStorage.setItem("ALI_CONFIGS",
                {` '{ "accessKeyId":"","accessKeySecret":""}'`});
              </code> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
