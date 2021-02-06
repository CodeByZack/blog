import { useState } from 'react';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import { getAllFilesFrontMatter } from '@/lib/mdx';

const url = 'https://blog.zackdk.com';
const title = '行者、空山的日志';
const description =
  '记录自己在前端路上的点点滴滴，关于JavaScript，React，Vue，当然还关于我自己。';

export default function Blog({ posts }) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter((frontMatter) =>
      frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
    );

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
          日志
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {`我从2017年开始踏入编程行业，担任过安卓开发，前端开发，现在主要从事前端开发。无知无畏的度过了三年时光，回首才发现自己毫无积累，所有2021年初有了这个网站。
            到现在为止，一共写了${posts.length}篇文章。你可以在下方搜索你感兴趣的关键字。`}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
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
        {!searchValue && (
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
        )}
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          所有文章
        </h3>
        {!filteredBlogPosts.length && 'No posts found.'}
        {filteredBlogPosts.map((frontMatter) => (
          <BlogPost key={frontMatter.title} {...frontMatter} />
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');

  return { props: { posts } };
}
