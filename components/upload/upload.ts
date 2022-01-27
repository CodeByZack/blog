import ALI_OSS from 'ali-oss';

const accessKeyId = process.env.NEXT_PUBLIC_ALI_OSS_ACCESS_KEY_ID;
const accessKeySecret = process.env.NEXT_PUBLIC_ALI_OSS_ACCESS_KEY_SECRET;

const OSS_CLIENT = new ALI_OSS({
  region: 'oss-cn-beijing',
  accessKeyId,
  accessKeySecret,
  bucket: 'zackdkblog'
});

export interface ResultWrapper<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
}

export interface UploadResult {
  fileUrl: string;
  fileName: string;
  originalResult: any;
}

export interface IDoUpload {
  (file: File, uploadName: string): Promise<ResultWrapper<UploadResult | null>>;
}

export const doOSSUpload: IDoUpload = async (
  file: File,
  uploadName: string
) => {
  try {
    const uploadRes = await OSS_CLIENT.put(uploadName, file);
    console.log(uploadRes);
    return {
      status: 'success',
      message: '上传成功！',
      data: { fileUrl: uploadRes.url, fileName : uploadRes.name ,originalResult: uploadRes }
    };
  } catch (error) {
    console.log(error);
    return { status: 'error', message: '', data: null };
  }
};
