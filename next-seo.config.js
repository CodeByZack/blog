const title = '行者、空山 – 走吧，走吧，人总要学着自己长大。';
const description = '一个热爱 JavaScript , React 的前端工程师。';

const SEO = {
  title,
  description,
  canonical: 'https://blog.zackdk.com',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://blog.zackdk.com',
    title,
    description,
    images: [
      {
        url: 'https://blog.zackdk.com/static/images/banner.jpg',
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  }
};

export default SEO;
