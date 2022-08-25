import { useState, useEffect, useMemo } from 'react';
import fileUtils from '../file-utils';
import zwsp from '../zwsp';
import styles from '../style.module.css';

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

const useFileUtil = () => {
  const [utilsDone, setUtilsDone] = useState(false);
  useEffect(() => {
    // You now have access to `window`
    const ALI_CONFIGS = JSON.parse(localStorage.getItem('ALI_CONFIGS') || '{}');
    if (!ALI_CONFIGS.accessKeyId || !ALI_CONFIGS.accessKeySecret) return;
    ALI_CONFIGS.accessKeyId = zwsp.decode(ALI_CONFIGS.accessKeyId);
    ALI_CONFIGS.accessKeySecret = zwsp.decode(ALI_CONFIGS.accessKeySecret);
    const status = fileUtils.init(ALI_CONFIGS);
    setUtilsDone(status);
  }, []);

  const contentJSX = useMemo(() => {
    if (utilsDone) return null;
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
  }, [utilsDone]);

  return { contentJSX, fileUtils };
};

export default useFileUtil;
