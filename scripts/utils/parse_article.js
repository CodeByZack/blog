import * as path from 'path';

import frontMatter from 'front-matter';
import * as cheerio from 'cheerio';
import fs from './fs.js';
import directory from './directory.js';
import toBuild from './to_build.js';
import config from '../config.js';
import readingTime from './read_time.js';
import { markdown2html } from './markdown2html.js';

const transformNormalMarkdown = async (mdBody,mdPath)=>{
  const html = await markdown2html(mdBody);

  const $ = cheerio.load(html);

  const buildLocalResource = async (type) => {
    const resourceNodeList = $(`[${type}]`).toArray();
    for (const resourceNode of resourceNodeList) {
      const node = $(resourceNode);
      const resourcePath = node.attr(type);
      if (resourcePath[0] !== '.') {
        continue;
      }
      const localPath = path.join(path.dirname(mdPath), resourcePath);
      const filename = await toBuild(localPath);
      $(resourceNode).attr(
        type,
        `${config.public_path}/static/${filename}`,
      );
    }
  };
  await buildLocalResource('src');
  await buildLocalResource('href');

  // img
  const imgNodeList = $('img').toArray();
  for (const imgNode of imgNodeList) {
    const node = $(imgNode);
    const src = node.attr('src');
    const alt = node.attr('alt');
    node.parent().replaceWith(`
      <figure class="figure-img">
        <a href="${src}" target="_blank">
          <img src="${src}" alt="${alt}" title="${alt}" loading="lazy" />
        </a>
        ${alt ? `<figcaption>${alt}</figcaption>` : ''}
      </figure>
    `);
  }

  // video
  const videoNodeList = $('video').toArray();
  for (const videoNode of videoNodeList) {
    const node = $(videoNode);
    const src = node.attr('src');
    const alt = node.attr('alt') || '';
    node.replaceWith(`
      <figure class="figure-video">
        <video src="${src}" loading="lazy" controls></video>
        ${alt ? `<figcaption>${alt}</figcaption>` : ''}
      </figure>
    `);
  }

  // iframe
  const iframeNodeList = $('iframe').toArray();
  for (const iframeNode of iframeNodeList) {
    const node = $(iframeNode);
    const nodeTitle = node.attr('title');
    const src = node.attr('src');
    node.replaceWith(`
      <figure class="figure-iframe">
        <iframe src="${src}" title="${nodeTitle}" loading="lazy"></iframe>
        ${
          nodeTitle
            ? `<figcaption>${nodeTitle}</figcaption>`
            : ''
        }
      </figure>
    `);
  }

  // table
  const tableNodeList = $('table').toArray();
  for (const tableNode of tableNodeList) {
    const node = $(tableNode);
    const nodeHtml = node.html();
    node.replaceWith(`
      <div class="table-container">
        <table>
          ${nodeHtml}
        </table>
      </div>
    `);
  }

  // code
  const codeNodeList = $('code').toArray();
  for (const codeNode of codeNodeList) {
    const node = $(codeNode);
    node.html(node.html());
  }

  return $.html();
};

/**
 * 
 * todo
 * 
 * markmap 不支持在 node 环境直接导出 svg
 * 
 * @param {*} mdBody 
 * @returns 
 */
const transformMindMarkdown = (mdBody)=>{
  const template = `<div class="markmap"><script type="text/template">---
markmap:
  initialExpandLevel: 1
---
  [MARKDOWN]</script></div>`
  return template.replace('[MARKDOWN]',mdBody);
};

export default async (id) => {
  let mdPath = `${directory.DRAFT}/${id}`;
  let exist = await fs.exist(mdPath);
  if (!exist) {
    mdPath = `${directory.ARTICLES}/${id}`;
    exist = await fs.exist(mdPath);
    if (!exist) {
      return null;
    }
  }

  const mdText = (await fs.readFile(mdPath)).toString();
  if (!mdText) {
    return null;
  }
  const { attributes, body: mdBody } = frontMatter(mdText);

  const readTimeStr = readingTime(mdBody).text;

  let content = "";

  if(attributes.isMind){
    content = await transformMindMarkdown(mdBody);
  }else{
    content = await transformNormalMarkdown(mdBody,mdPath);
  }



  return {
    id,
    title: attributes.title || '',
    // 取 markdown 内容的前 150 个字符作为页面的 description
    description:
      mdBody.substring(0, 150).replace(/\s/gm, ' ') + '...',
    publishTime: attributes.created_at || '2000-01-01',
    updates: attributes.updates || [],
    hidden: attributes.hidden || false,
    content,
    mdText,
    readTimeStr,
    isMind: attributes.isMind
  };
};
