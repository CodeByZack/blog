#!/usr/bin/env node

import fs from 'fs-extra';
import buildSite from './build_site.js';
import directory from './utils/directory.js';
import * as cp from 'child_process';

function onChange(type, filename) {
  console.log(`file ${type}: ${filename}`);
  buildSite();
}

const srcDir = directory.SRC;
const dataDir = directory.ARTICLES;

fs.watch(srcDir,{recursive:true},onChange);
fs.watch(dataDir,{recursive:true},onChange);

await buildSite();


cp.exec('npm run http-server', {
  cwd: directory.ROOT,
});
