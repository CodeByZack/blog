import AliInstance from './ali_oss';

export interface IFileItem {
  id: string;
  name: string;
  thumbnailUrl?: string;
  url: string;
}
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

export interface GetFileArrByPath {
  (path: string): Promise<IFileItem[]>;
}

export interface UploadFile {
  (ossPath: string, file: any): Promise<ResultWrapper<UploadResult | null>>;
}

export type OSS_TYPE = 'ali';

export interface OssInstance {
  uploadFile: UploadFile;
  getFileArrByPath: GetFileArrByPath;
  init: (config: any) => boolean;
}

const getInstance = (oss: OSS_TYPE = 'ali') => {
  console.log(oss);
  return AliInstance;
};

export default getInstance();
