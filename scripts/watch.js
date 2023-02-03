#!/usr/bin/env node

import fs from 'fs-extra';
import buildSite from './build_site.js';
import directory from './utils/directory.js';

function onChange(type, filename) {
  console.log(`file ${type}: ${filename}`);
  buildSite();
}

const srcDir = directory.SRC;
const dataDir = directory.ARTICLES;

fs.watch(srcDir,{recursive:true},onChange);
fs.watch(dataDir,{recursive:true},onChange);

await buildSite();
