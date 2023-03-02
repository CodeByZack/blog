#!/usr/bin/env node
import * as path from 'path';
import ejs from 'ejs';
import initial from './tasks/initial.js';
import generateRobots from './tasks/generate_robots.js';
import generateSitemap from './tasks/generate_sitemap.js';
import generateRss from './tasks/generate_rss.js';
import parseArticle from './utils/parse_article.js';
import ora from './utils/ora.js';
import fs from './utils/fs.js';
import directory from './utils/directory.js';
import parseHtmlResource from './utils/parse_html_resource.js';
import config from './config.js';
import readArticles from './utils/read_articles.js';

const articleTemplate = `${directory.TEMPLATE}/article/index.ejs`;
const indexTemplate = `${directory.TEMPLATE}/index.ejs`;


const buildSite = async () => {

  await initial();

  let spinner = ora.createSpinner('正在查找文章列表...');
  const articleIdList = await readArticles(directory.ARTICLES);
  spinner.succeed(`共有 ${articleIdList.length} 篇文章`);

  const articleList = [];

  for (
    let i = 0, { length } = articleIdList;
    i < length;
    i += 1
  ) {
    const articleId = articleIdList[i];
    const articleIdNoExt = articleId.replace(path.extname(articleId), "").replace("/", "");
    const createLog = (text) =>
      `(${i + 1}/${length}) ${articleId} ${text}`;
    const innerSpinner = ora.createSpinner(
      createLog('正在构建...'),
    );
    const data = await parseArticle(articleId);
    if (!data) {
      innerSpinner.fail(createLog('文章为空'));
      continue;
    }

    let html = await ejs.renderFile(articleTemplate, {
      ...data,
      config,
    });
    html = await parseHtmlResource(html);
    await fs.writeFile(
      `${directory.BUILD}/${articleIdNoExt}.html`,
      html,
    );
    if (data.hidden) {
      innerSpinner.info(createLog('已构建, 属于隐藏文章'));
    } else {
      innerSpinner.succeed(createLog('已构建'));

      let id = articleIdNoExt.split(path.sep).join('/');
      if(id.startsWith("/")){
        id = id.substr(1);
      }

      articleList.push({
        id,
        title: data.title,
        description: data.description,
        publishTime: data.publishTime,
      });
    }
  }

  spinner = ora.createSpinner('正在构建首页...');

  let indexHtml = await ejs.renderFile(indexTemplate, {
    articleList: articleList.sort(
      (a, b) => new Date(b.publishTime) - new Date(a.publishTime),
    ),
    config,
  });
  indexHtml = await parseHtmlResource(indexHtml);
  await fs.writeFile(`${directory.BUILD}/index.html`, indexHtml);
  spinner.succeed('首页已构建');

  await generateRobots();
  await generateSitemap(articleList);
  await generateRss(articleList);
};

export default buildSite;
