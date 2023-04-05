#!/usr/bin/env node

import buildSite, { buildSinglePost } from './build_site_new.js';
import directory from './utils/directory.js';
import * as cp from 'child_process';
import chokidar from 'chokidar';

const srcDir = directory.SRC;
const dataDir = directory.ARTICLES;
chokidar.watch([srcDir,dataDir],{ ignoreInitial : true }).on('all', (event, path) => {
  console.log(event, path);
  if(event === "change"){
    buildSinglePost([])({ item : path.replace(directory.ARTICLES,'') });
  }

});

await buildSite();


cp.exec('npm run http-server', {
  cwd: directory.ROOT,
});
