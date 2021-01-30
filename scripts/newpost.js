const fs = require('fs');
const path = require('path');

const getNowDate = ()=>{
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
};

const PostContentDirPath = path.resolve(__dirname,'../data/blog/');
const PostImageDirPath = path.resolve(__dirname,'../public/static/images/');
const post_name = process.argv.splice(2)[0];

if( !post_name ){
  console.error("缺少文章名字!");
  process.exit(0);
}


const template = 
`---
title: '这里是标题'
publishedAt: '${getNowDate()}'
summary: '这里是一个简单总述'
---`;

const contentFilePath =  path.resolve(PostContentDirPath,post_name + ".mdx");

if( fs.existsSync(contentFilePath) ){
  console.log("文件名已存在！");
  process.exit(0);
}else{
  fs.writeFileSync(contentFilePath,template);
}


const imageDirPath = path.resolve(PostImageDirPath,post_name);

if( !fs.existsSync(imageDirPath) ){
  fs.mkdirSync(imageDirPath);
}

console.log("文件创建成功！");

console.log("文章路径:",contentFilePath);
console.log("图片文件夹路径:",imageDirPath);