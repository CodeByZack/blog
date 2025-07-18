
import ora from '../utils/ora.js';
import fs from '../utils/fs.js';
import directory from '../utils/directory.js';
import * as path from 'path';

const copyPublic = async () => {
  const spinner = ora.createSpinner('正在复制 public 目录 ...');
  const srcPublic = path.resolve(directory.SRC, 'public');
  const buildPublic = path.resolve(directory.BUILD, 'public');
  if (await fs.exist(srcPublic)) {
    await fs.copy(srcPublic, buildPublic);
  }

  spinner.succeed('复制 public 目录完成');
};

export default copyPublic;