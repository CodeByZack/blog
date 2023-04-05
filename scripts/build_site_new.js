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
import requestPool from './utils/request_pool.js';

const articleTemplate = `${directory.TEMPLATE}/article/index.ejs`;
const indexTemplate = `${directory.TEMPLATE}/index.ejs`;

const MultiLineLog = (id) => {
  if (!MultiLineLog.spinner) {
    MultiLineLog.spinner = ora.createSpinner();
  }
  if (!MultiLineLog.logTasks) {
    MultiLineLog.logTasks = [];
  }
  const cancelLogTask = () => {
    const targetTaskIndex = MultiLineLog.logTasks.findIndex(
      (t) => t.id === id,
    );
    if (targetTaskIndex > -1) {
      // MultiLineLog.spinner.succeed(MultiLineLog.logTasks[targetTaskIndex].msg);
      MultiLineLog.spinner.start();
      MultiLineLog.logTasks.splice(targetTaskIndex, 1);
    }
  };
  const log = (msg) => {
    let targetTask = MultiLineLog.logTasks.find(
      (t) => t.id === id,
    );
    if (!targetTask) {
      targetTask = { id, msg };
      MultiLineLog.logTasks.push(targetTask);
    }
    targetTask.msg = msg;
    MultiLineLog.spinner.color = 'blue';
    MultiLineLog.spinner.text =
      '===正在构建===' +
      '\n' +
      MultiLineLog.logTasks.map((t) => t.msg).join('\n');
  };

  const succeed = (msg)=>MultiLineLog.spinner.succeed(msg);
  const fail = (msg)=>MultiLineLog.spinner.fail(msg);
  const info = (msg)=>MultiLineLog.spinner.info(msg);

  return {
    log,
    cancel: cancelLogTask,
    succeed,
    fail,
    info,
  };
};

export const buildSinglePost = (articleList) => async (obj) => {
  const { item: articleId } = obj;
  const logTask = MultiLineLog(articleId);
  try {
    logTask.log(`${articleId}:::解析 markdown`);
    const articleIdNoExt = articleId
      .replace(path.extname(articleId), '')
      .replace('/', '');
    const data = await parseArticle(articleId);
    if (!data) {
      logTask.fail(`文章为空 ${articleId}`);
      return;
    }
    logTask.log(`${articleId}:::渲染html`);
    let html = await ejs.renderFile(articleTemplate, {
      ...data,
      config,
    });
    logTask.log(`${articleId}:::处理资源文件`);
    html = await parseHtmlResource(html);
    logTask.log(`${articleId}:::写入到文件中`);
    await fs.writeFile(
      `${directory.BUILD}/${articleIdNoExt}.html`,
      html,
    );

    if (data.hidden) {
      logTask.info(`隐藏文章 ${articleId}`);
    } else {
      let id = articleIdNoExt.split(path.sep).join('/');
      if (id.startsWith('/')) {
        id = id.substr(1);
      }
      articleList.push({
        id,
        title: data.title,
        description: data.description,
        publishTime: data.publishTime,
      });
      logTask.succeed(`已构建 ${articleId}`);
    }
  } catch (error) {
    logTask.fail(`${articleId} 出错了-${error.message}`);
  } finally {
    logTask.cancel();
  }
};

const buildSite = async () => {
  await initial();

  let spinner = ora.createSpinner('正在查找文章列表...');
  const articleIdList = await readArticles(directory.ARTICLES);
  spinner.succeed(`共有 ${articleIdList.length} 篇文章`);

  const articleList = [];
  const taskProcess = buildSinglePost(articleList);
  await requestPool({
    data: articleIdList,
    maxLimit: 5,
    iteratee: taskProcess,
  });
  MultiLineLog.spinner.succeed('构建成功');

  spinner = ora.createSpinner('正在构建首页...');
  let indexHtml = await ejs.renderFile(indexTemplate, {
    articleList: articleList.sort(
      (a, b) =>
        new Date(b.publishTime) - new Date(a.publishTime),
    ),
    config,
  });
  indexHtml = await parseHtmlResource(indexHtml);
  await fs.writeFile(
    `${directory.BUILD}/index.html`,
    indexHtml,
  );
  spinner.succeed('首页已构建');

  await generateRobots();
  await generateSitemap(articleList);
  await generateRss(articleList);
};

export default buildSite;
