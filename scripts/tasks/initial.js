import directory from '../utils/directory.js';
import ora from '../utils/ora.js';
import fs from '../utils/fs.js';
import { clearMemoMap } from '../utils/to_build.js';

export default async () => {
  const spinner = ora.createSpinner('正在初始化...');
  await fs.ensureDir(directory.BUILD);
  await fs.emtpyDir(directory.BUILD);
  clearMemoMap();
  spinner.succeed('初始化完成');
};
