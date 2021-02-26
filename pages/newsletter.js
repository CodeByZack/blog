import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import NewsletterLink from '@/components/NewsletterLink';
import { getAllFilesFrontMatter } from '@/lib/mdx';

const url = 'https://zackdk.com/newsletter';
const title = '最新动向 – 行者、空山';
const description = '关于编程技术，个人生活的一些想法和计划';

export default function Newsletter({ newsletters }) {
  return (
    <Container>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          计划列表
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          存放一些自己计划做的事，或者已经完成的事，有关前端技术或者有关我的生活。让一年到头忙碌的自己，看看到底做了些什么事。
        </p>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          归档
        </h3>
        <div className="prose dark:prose-dark">
          <ul>
            {newsletters
              .sort(
                (a, b) =>
                  Number(new Date(b.publishedAt)) -
                  Number(new Date(a.publishedAt))
              )
              .map((frontMatter) => (
                <NewsletterLink key={frontMatter.title} {...frontMatter} />
              ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const newsletters = await getAllFilesFrontMatter('newsletter');

  return { props: { newsletters } };
}
