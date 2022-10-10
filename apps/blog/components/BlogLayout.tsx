/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import Container from '../components/Container';
import BlogSeo from './BlogSeo';
import { IArticleDetail } from '../type';
import dayjs from 'dayjs';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

// prettier-ignore
const editUrl = (type, slug) =>`https://github.com/codebyzack/blog/edit/master/apps/blog/data/${type}/${slug}.mdx`;
const onLineEditUrl = (slug, type) => `/apps/blog/data/${type}/${slug}.mdx`;

interface IProps {
  post: IArticleDetail;
  type: 'blog' | 'life';
}

export const BlogTitle = (props: { post: Partial<IArticleDetail> }) => {
  const { post } = props;
  return (
    <>
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 dark:text-gray-400">
        {post.title}
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2 mb-8">
        <div className="flex items-center">
          <img
            alt="行者、空山"
            height={24}
            width={24}
            src="/avatar.jpg"
            className="rounded-full"
          />
          <span className="text-sm my-4 md:my-0 text-gray-700 dark:text-gray-300 ml-2">
            {'行者、空山 / '}
            {dayjs(post.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {post.readingTime?.text}
          {/* {` • `} */}
          {/* <ViewCounter slug={frontMatter.slug} /> */}
        </span>
      </div>
    </>
  );
};

const BlogLayout = (props: PropsWithChildren<IProps>) => {
  const { post, type, children } = props;

  return (
    <Container>
      <BlogSeo
        url={`https://zackdk.com/${type}/${post.slug}`}
        image=""
        {...post}
      />
      <article className="heti heti--sans flex flex-col justify-center text-slate-900 items-start max-w-3xl mx-auto mb-16 w-full">
        <BlogTitle post={post} />
        <div className="max-w-none w-full mb-6 dark:text-gray-400">
          {children}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          纠正错误 {` • `}
          <a
            href={editUrl(type, post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'在GitHub编辑'}
          </a>
          {` • `}
          <Link
            href={{
              pathname: '/editor',
              query: { path: onLineEditUrl(post.slug, type) },
            }}
          >
            <a>在线编辑</a>
          </Link>
        </div>
      </article>
    </Container>
  );
};

export default BlogLayout;
