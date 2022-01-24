import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import { getAllFilesFrontMatter } from '@/lib/mdx';

const url = 'https://zackdk.com/life';
const title = '行者、空山的生活日志';
const description =
  '记录自己在生活上点点滴滴，关于日常，关于生活，关于过去，关于未来。';

export default function Blog({ posts }) {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const filteredBlogPosts = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter((frontMatter) =>
      frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value === 'new post') {
      console.log('new post');
      router.push('/onlineedtior');
    }
  };

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
          关于生活
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {`西风轻敲慢打，几处温暖人家，几处灯下无话，伤痛愈合成花，情绪挥挥洒洒，点落人间诗画，素白，淡雅，年岁本该如此，单纯无华。。。`}
          <br />
          <br />
          {`这里一共有${posts.length}篇记录。你可以在下方搜索你感兴趣的关键字。`}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="搜索文章"
            className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {/* {!searchValue && (
          <>
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
              推荐文章
            </h3>
            <BlogPost
              title="利用Generator执行异步任务"
              summary="使用generator执行javascript中的异步任务，从generator基础使用到，自己编写执行器，到自己封装类似async/await的功能。"
              slug="use-generator-in-async-task"
            />
          </>
        )} */}
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          所有文章
        </h3>
        {!filteredBlogPosts.length && 'No posts found.'}
        {filteredBlogPosts.map((frontMatter) => (
          <BlogPost key={frontMatter.title} {...frontMatter} type='life' />
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('life');

  return { props: { posts } };
}
