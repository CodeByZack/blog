import Link from 'next/link';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import { useState } from 'react';

const Book = ({ title, link, desc, img }) => (
  <div
    className="w-full relative"
    style={{ paddingBottom: '120%', overflow: 'hidden' }}
  >
    <img
      className="absolute inset-0 w-full h-full object-cover rounded-md"
      src={img}
    />
    <a
      className="absolute w-full bg-gray-600 left-0 text-base bottom-0 flex justify-center bg-opacity-70 items-center text-gray-200 dark:text-gray-100"
      target="_blank"
      rel="noopener noreferrer"
      href={link}
    >
      {title}
      <div>
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
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>
    </a>
  </div>
);

const BookData = [
  {
    title: '你不知道的JavaScript',
    link:'https://book.douban.com/subject/26351021/',
    img:'https://img2.doubanio.com/view/subject/s/public/s28033372.jpg'
  },
  {
    title: 'JavaScript权威指南',
    link: 'https://book.douban.com/subject/2228378/',
    img:'https://img3.doubanio.com/view/subject/s/public/s5860151.jpg'
  },
  {
    title: '三体全集',
    link: 'https://book.douban.com/subject/6518605/',
    img:'https://img9.doubanio.com/view/subject/s/public/s28357056.jpg'
  },
  {
    title: '银河帝国完整版',
    link: 'https://weread.qq.com/web/reader/716320805d2344716703998kc4c329b011c4ca4238a0201',
    img: 'https://wfqqreader-1252317822.image.myqcloud.com/cover/996/860996/t6_860996.jpg'
  },
  {
    title: '世纪三部曲',
    link:'https://weread.qq.com/web/reader/f8d325005d1c21f8da814ffkc4c329b011c4ca4238a0201',
    img:'https://wfqqreader-1252317822.image.myqcloud.com/cover/169/859169/t6_859169.jpg'
  },
  {
    title: '明朝那些事儿',
    link: 'https://weread.qq.com/web/reader/a57325c05c8ed3a57224187',
    img:'https://wfqqreader-1252317822.image.myqcloud.com/cover/995/822995/t6_822995.jpg'
  },
  {
    title: '藏地密码',
    link: 'https://weread.qq.com/web/reader/018324f05c896401803c751kc4c329b011c4ca4238a0201',
    img:'https://wfqqreader-1252317822.image.myqcloud.com/cover/604/821604/t6_821604.jpg'
  },
  {
    title: '大秦帝国',
    link:'https://weread.qq.com/web/reader/ca632ad05a4f5eca6543d01kc81322c012c81e728d9d180',
    img:'https://wfqqreader-1252317822.image.myqcloud.com/cover/678/675678/t6_675678.jpg'
  },
  {
    title: '百年孤独',
    link:'https://weread.qq.com/web/reader/8bc329705e46708bcb0c164',
    img:'https://wfqqreader-1252317822.image.myqcloud.com/cover/536/935536/t6_935536.jpg'
  }
];

export default function About() {
  const [showTotalBooks, setShowTotalBooks] = useState(false);

  const books = showTotalBooks ? BookData : BookData.slice(0, 8);

  return (
    <Container>
      <NextSeo
        title="关于 – 行者、空山"
        canonical="https://blog.zackdk.top/about"
        openGraph={{
          url: 'https://blog.zackdk.top/about',
          title: '关于 – 行者、空山'
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          关于我
        </h1>
        <div className="mb-8 prose leading-6 text-gray-600 dark:text-gray-400">
          <p>
            欢迎您来到我的博客站点,
            我是空山。2017年毕业于一所普通的本科学校，最开始做Android开发。后来因为喜欢JavaScript的弱类型，动态性，自学JavaScript过后成为了一名普普通通的前端开发者。使用过
            Vue 和 React ，更喜欢 React ，因为 React
            更倾向于使用原生JavaScript实现一些功能。
          </p>
          <p>
            闲暇时间做了两个自己经常使用到的网站，一个是不需要VIP，没有广告的影视网站
            &nbsp;
            <a
              href="https://movie.zackdk.top"
              target="_blank"
              rel="noopener noreferrer"
            >
              风影院
            </a>
            &nbsp;
            ，支持了PWA，可以添加到手机主屏幕使用。另一个是前端专用的导航站点
            &nbsp;
            <a
              href="https://xclinks.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              小词导航
            </a>
            &nbsp;，欢迎体验。
          </p>
        </div>
        <h2 className="font-bold text-3xl tracking-tight mb-4 text-black dark:text-white">
          阅读书单
        </h2>
        <div className="w-full relative grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {books.map((book, i) => {
            return <Book key={i} {...book} />;
          })}
        </div>
        <button
          type="button"
          className="flex items-center text-sm my-4 mx-auto px-4 py-2 rounded-md font-medium text-gray-900 dark:text-gray-100"
          onClick={() => setShowTotalBooks(!showTotalBooks)}
        >
          查看全部
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
        <iframe
          height="280"
          src="https://www.google.com/maps/d/embed?mid=1grYNI0S0_7oWSY9tyeFnN8yFuSV3qYak"
          title="董凯去过的地方"
          width="100%"
        />
      </div>
    </Container>
  );
}
