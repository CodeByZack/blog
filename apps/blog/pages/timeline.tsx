import React from 'react';
import { NextSeo } from 'next-seo';
import Container from '../components/Container';
import TimeLine from '../components/TimeLine';
import timeLineData from '../data/timeline';

interface IProps {}

const url = 'https://zackdk.com/timeline';
const title = '我的时间轴 – 行者、空山';
const description =
  '恍若，不知人间，几年风雪，念念叨叨的，到底是，忧伤还是笑靥，有不倦的指尖，心生两面，年华已褪的情节里，我想念晚风环抱的街。';

const PhotoAlbum = (props: IProps) => {
  return (
    <Container>
      <NextSeo title={title} description={description} canonical={url} />
      恍若，不知人间，几年风雪，念念叨叨的，到底是，忧伤还是笑靥，有不倦的指尖，心生两面，年华已褪的情节里，我想念晚风环抱的街。
      <TimeLine slides={timeLineData} />
    </Container>
  );
};
export default PhotoAlbum;
