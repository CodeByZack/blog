import { useState } from 'react';

const Divider = () => {
  return (
    <div className="border border-gray-200 dark:border-gray-600 w-full my-8" />
  );
};

const Year = ({ children }) => {
  return (
    <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">
      {children}
    </h3>
  );
};

const Step = ({ title, children }) => {
  return (
    <li className="mb-4 ml-2">
      <div className="flex items-center mb-2 text-green-700 dark:text-green-300">
        <span className="sr-only">Check</span>
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </g>
        </svg>
        <p className="font-medium text-gray-900 dark:text-gray-100">{title}</p>
      </div>
      <p className="text-gray-700 dark:text-gray-400 ml-6">{children}</p>
    </li>
  );
};

const FullTimeline = () => (
  <>
    <Divider />
    <Year>1995</Year>
    <ul>
      <Step title="四川又多了一个聪明的孩子 👶🏼🍼" />
    </ul>
  </>
);

export default function Timeline() {
  const [isShowingFullTimeline, showFullTimeline] = useState(false);

  return (
    <>
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
        时光机
      </h3>
      <Year>2020</Year>
      <ul>
        <Step title="终于旅游了 🏆">
          工作后各种原因，一直没有出去玩过，今年国庆终于腾出时间了，和女朋友一起去了若尔盖、郎木寺。坐车很累，但路上风景真的很好。
        </Step>
        <Step title="重写了风影院">
          使用 Material UI 重写了风影院，支持了日夜间模式切换，支持了观看和搜索记录，最重要的是支持了PWA，可以添加到主屏幕使用了。
        </Step>
        <Step title="上线了小词导航网站 👨🏻‍💻">
          开发中经常要查找资料，每次都需要百度找网站再进去，就自己把常用的站点集合在一起，搭建了一个前端的导航网站。
        </Step>
        <Step title="加入一家新公司">
          年初换工作，加入到新公司。他们在做在线直播的场景，个人对音视频比较感兴趣，所以选择了这家公司。
        </Step>
      </ul>
      <Divider />
      <Year>2019</Year>
      <ul>
        <Step title="技术分享 ✨">
          在公司内部做了一次技术分享，关于JavaScript中的异步，从CallBack到Promise到generator到async、await。这次也给了我一个新视野去看待JS中的一些语法的本质。
        </Step>
        <Step title="上线每日一文小程序🏡">
          大学期间非常喜欢的一个网站，每日一文。使用了云数据库，每天爬虫抓取文章。小程序（每日一篇散文+）支持随机文章，字数统计，声音播放。
        </Step>
        <Step title="搭建风影院后台">
          使用苹果CMS搭建了一个影视站点，期间了解了一系列服务器知识点，包括nginx，宝塔面板，常用linux指令等。完成了风影院App的重构，完全使用自己的api，更加稳定完善。
        </Step>
        <Step title="学习React 🎤">
          自己入门前端学的是Vue，公司使用React，所以自己花了近三周从头学了React及其周边生态，后来因为React更偏向于JavaScript，我也就更偏向于使用React。
        </Step>
      </ul>
      {/* {isShowingFullTimeline ? (
        <FullTimeline />
      ) : (
        <button
          type="button"
          className="flex items-center text-sm my-4 mx-auto px-4 py-2 rounded-md font-medium text-gray-900 dark:text-gray-100"
          onClick={() => showFullTimeline(true)}
        >
          See More
          <svg
            className="h-4 w-4 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )} */}
    </>
  );
}
