import Link from 'next/link';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';

const Book = ({ title, link, desc, img }) => (
  <div className="flex mb-8">
    <div className="w-36 h-48 pr-4 flex-shrink-0 ">
      <img className="w-full h-full object-cover rounded-md" src={img} />
    </div>
    <div>
      <h3 className="font-medium mb-2 text-lg">
        <a
          className="flex items-center text-gray-900 dark:text-gray-100"
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
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  </div>
);

export default function About() {
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
        <Book
          title="三体（全集）"
          link="https://weread.qq.com/web/reader/ce032b305a9bc1ce0b0dd2a"
          img="https://wfqqreader-1252317822.image.myqcloud.com/cover/233/695233/t6_695233.jpg"
          desc="刘慈欣经典科幻代表作 每个人的书架上都该有套《三体》！关于宇宙最狂野的想象！就是它！征服世界的中国科幻神作！包揽九项世界顶级科幻大奖！出版16个语种，横扫30国读者！奥巴马、雷军、马化腾、周鸿袆、潘石屹、扎克伯格……强推！刘慈欣获得2018年度克拉克想象力贡献社会奖！刘慈欣是中国科幻小说的最主要代表作家，亚洲首位世界科幻大奖“雨果奖”得主，被誉为中国科幻的领军人物。"
        />

        <h2 className="font-bold text-3xl tracking-tight mb-4 text-black dark:text-white">
          我的足迹
        </h2>
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
