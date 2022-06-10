import { NextSeo } from 'next-seo';

import sentenceData from '../data/sentence';
import Container from '../components/Container';

const url = 'https://zackdk.com/sentence';
const title = '小词 – 行者、空山';
const description = '年少时的梦啊，像朵永不凋零的花儿。';

export default function Sentence() {
  return (
    <Container>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <div className="heti heti--sans flex w-full	flex-col justify-center items-start max-w-3xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          风小词~
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          年少时的梦啊，像朵永不凋零的花儿。
        </p>
        {sentenceData
          .filter((v) => v)
          .map((txt) => (
            <p key={txt} className="text-gray-800 dark:text-gray-200 mb-4">
              {txt}
            </p>
          ))}
      </div>
    </Container>
  );
}
