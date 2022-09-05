const child_process = require('child_process');
const fs = require('fs');
const tmp = fs.readFileSync('./dist/blog-components.mjs','utf-8');
const appendReact = `import React from 'react';\n${tmp}`;
fs.writeFileSync('./dist/blog-components.mjs',appendReact);
child_process.execSync('mv dist/blog-components.mjs ../../apps/blog/public/blog-components.js');