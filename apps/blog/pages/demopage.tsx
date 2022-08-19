import React from 'react';
import { NextSeo } from 'next-seo';
import Container from '../components/Container';
import TimeLine, { ITimeLineCardProps } from '../components/TimeLine';

interface IProps {}

const url = 'https://zackdk.com/photos';
const title = '相册 – 行者、空山';
const description =
  '恍若，不知人间，几年风雪，念念叨叨的，到底是，忧伤还是笑靥，有不倦的指尖，心生两面，年华已褪的情节里，我想念晚风环抱的街。';

const slides: ITimeLineCardProps[] = [
  {
    date: '2022-09-18',
    title: '此处风景独好，辛得人间一见',
    subTitle: '2022-19-09',
    contentText:
      '露下碧梧秋满天，砧声不断思绵绵。北来风俗犹存古，南渡衣冠不后前。苜蓿总肥宛騕□[1]琵琶曾泣汉婵娟。人间俯仰成今古，何地他时始惘然。',
  },
  {
    date: '2022-09-18',
    title: '此处风景独好，辛得人间一见',
    subTitle: '2022-19-09',
    contentText: '豪赌哦图片啊',
    imageUrls: [
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      'https://www.col.com/upload/picture/2022-01-20/upload_5331ba510087a896786e88aedc8c4882.jpg',
    ],
  },
];

const PhotoAlbum = (props: IProps) => {
  return (
    <Container>
      <NextSeo title={title} description={description} canonical={url} />
      恍若，不知人间，几年风雪，念念叨叨的，到底是，忧伤还是笑靥，有不倦的指尖，心生两面，年华已褪的情节里，我想念晚风环抱的街。
      <TimeLine slides={slides}/>
    </Container>
  );
};
export default PhotoAlbum;
