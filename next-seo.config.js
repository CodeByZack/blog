const title = '行者、空山 – 天真的是天，还是我的眼。';
const description = '一个热爱 JavaScript , React 的前端工程师。';

const SEO = {
  title,
  description,
  canonical: 'https://blog.zackdk.top',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://blog.zackdk.top',
    title,
    description,
    images: [
      {
        url: 'https://blog.zackdk.top/static/images/banner.jpg',
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  }
};

export default SEO;
