import * as path from 'path';

import md5 from 'md5';

import fs from './fs.js';
import directory from './directory.js';

const map = {};

export const clearMemoMap = ()=>{
  Object.keys(map).forEach(k=>{
    delete map[k];
  });
};

export default async (originalPath) => {
  let filename = map[originalPath];
  if (!filename) {
    const data = await fs.readFile(originalPath);
    const dataMd5 = md5(data);
    filename = `${dataMd5}${path.parse(originalPath).ext}`;
    await fs.writeFile(`${directory.BUILD}/static/${filename}`, data);
    map[originalPath] = filename;
  }
  return filename;
};
