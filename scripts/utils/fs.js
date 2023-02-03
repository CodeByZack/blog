import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';

const writeFile = async (file,...restParams)=>{
  const dirName = path.dirname(file);
  try {
    await fs.promises.stat(dirName);
  } catch (error) {
    await fs.promises.mkdir(dirName,{ recursive : true });
  }
  await fs.promises.writeFile(file,...restParams);
};

export default {
  mkdir: fsExtra.mkdirp,
  ensureDir: fsExtra.ensureDir,
  emtpyDir: fsExtra.emptyDir,
  copy: fsExtra.copy,
  exist: fsExtra.pathExists,
  readFile: fs.promises.readFile,
  writeFile: writeFile,
  readdir: fs.promises.readdir
};
