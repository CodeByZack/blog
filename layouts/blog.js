import Image from 'next/image';
import { parseISO, format } from 'date-fns';

import Container from '@/components/Container';
import ViewCounter from '@/components/ViewCounter';
import BlogSeo from '@/components/BlogSeo';

const editUrl = (slug) =>
  `https://github.com/codebyzack/blog/edit/master/data/blog/${slug}.mdx`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://blog.zackdk.com//${slug}`
  )}`;

export default function BlogLayout({ children, frontMatter }) {
  return (
    <Container>
      <BlogSeo
        url={`https://blog.zackdk.com/${frontMatter.slug}`}
        {...frontMatter}
      />
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {frontMatter.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2 mb-8">
          <div className="flex items-center">
            <Image
              alt="行者、空山"
              height={24}
              width={24}
              src="/avatar.jpg"
              className="rounded-full"
            />
            <p className="text-sm text-gray-700 dark:text-gray-300 ml-2">
              {frontMatter.by}
              {'行者、空山 / '}
              {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
            {frontMatter.readingTime.text}
            {/* {` • `} */}
            {/* <ViewCounter slug={frontMatter.slug} /> */}
          </p>
        </div>
        <div className="prose dark:prose-dark max-w-none w-full mb-6">
          {children}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {/* <a
            href={discussUrl(frontMatter.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Discuss on Twitter'}
          </a>
          {` • `} */}
          纠正错误 {` • `}
          <a
            href={editUrl(frontMatter.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'在GitHub编辑'}
          </a>
        </div>
      </article>
    </Container>
  );
}
