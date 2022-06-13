import ALI_OSS from 'ali-oss';
import { OssInstance, UploadFile } from '.';

// const accessKeyId = process.env.NEXT_PUBLIC_ALI_OSS_ACCESS_KEY_ID;
// const accessKeySecret = process.env.NEXT_PUBLIC_ALI_OSS_ACCESS_KEY_SECRET;
let OSS_CLIENT: ALI_OSS | null = null;

const uploadFile: UploadFile = async (ossPath: string, file: any) => {
  if (!OSS_CLIENT)
    return { status: 'error', message: 'init oss first', data: null };
  try {
    const uploadRes = await OSS_CLIENT.put(ossPath, file);
    console.log(uploadRes);
    return {
      status: 'success',
      message: '上传成功！',
      data: {
        fileUrl: uploadRes.url,
        fileName: uploadRes.name,
        originalResult: uploadRes,
      },
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
  console.log(result);
  const files = result.objects.map((o) => ({
    id: o.url,
    name: o.name,
    url: o.url,
  }));

  return files;
};

const AliInstance: OssInstance = {
  uploadFile,
  getFileArrByPath,
  init,
};

export default AliInstance;
