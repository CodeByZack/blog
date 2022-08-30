import ALI_OSS from 'ali-oss';
import { DeleteFileByPathArr, IFileItem, OssInstance, UploadFiles } from '.';

// const accessKeyId = process.env.NEXT_PUBLIC_ALI_OSS_ACCESS_KEY_ID;
// const accessKeySecret = process.env.NEXT_PUBLIC_ALI_OSS_ACCESS_KEY_SECRET;
let OSS_CLIENT: ALI_OSS | null = null;

const BASE_URL = 'http://zackdkblog.oss-cn-beijing.aliyuncs.com/';

const uploadFiles: UploadFiles = async (fileArr) => {
  if (!OSS_CLIENT)
    return { status: 'error', message: 'init oss first', data: null };
  try {
    const resultArr = [];

    for (const f of fileArr) {
      const { ossPath, file } = f;
      const uploadRes = await OSS_CLIENT.put(ossPath, file);
      console.log(uploadRes);
      resultArr.push({
        fileUrl: uploadRes.url,
        fileName: uploadRes.name,
        originalResult: uploadRes,
      });
    }
    return {
      status: 'success',
      message: '上传成功！',
      data: resultArr,
    };
  } catch (error) {
    console.log(error);
    return { status: 'error', message: '', data: null };
  }
};

const init = (options: ALI_OSS.Options) => {
  if (OSS_CLIENT) return true;
  if (!options.accessKeyId || !options.accessKeySecret) return false;
  OSS_CLIENT = new ALI_OSS({
    region: 'oss-cn-beijing',
    accessKeyId: options.accessKeyId,
    accessKeySecret: options.accessKeySecret,
    bucket: 'zackdkblog',
  });
  return true;
};

const getFileArrByPath = async (path: string) => {
  if (!OSS_CLIENT) return [];

  const result = await OSS_CLIENT.list(
    { prefix: path, delimiter: '/', 'max-keys': 100 },
    {},
  );
  const files: IFileItem[] = [];

  result.objects.forEach((o) => {
    files.push({
      id: o.url,
      name: o.name,
      url: o.url,
      thumbnailUrl: o.url,
    });
  });

  result.prefixes?.forEach((p) => {
    files.push({
      isDir: true,
      id: p,
      name: p.replace(path, ''),
      url: `${BASE_URL}${p}`,
      path: p.replace(path, ''),
    });
  });

  return files;
};

const deleteFileByPathArr: DeleteFileByPathArr = async (pathArr) => {
  if (!OSS_CLIENT)
    return { status: 'error', message: 'init oss first', data: null };
  try {
    const deleteRes = await OSS_CLIENT.deleteMulti(
      pathArr.map((p) => p.replace(BASE_URL, '')),
    );
    console.log(deleteRes);
    return {
      status: 'success',
      message: '删除成功！',
      data: true,
    };
  } catch (error) {
    console.log(error);
    return { status: 'error', message: '', data: null };
  }
};

const AliInstance: OssInstance = {
  uploadFiles,
  getFileArrByPath,
  deleteFileByPathArr,
  init,
};

export default AliInstance;