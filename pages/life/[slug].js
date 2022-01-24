import { MDXRemote } from 'next-mdx-remote';

import { getFiles, getFileBySlug } from '@/lib/mdx';
import BlogLayout from '@/layouts/blog';

export default function Blog({ mdxSource, frontMatter }) {
  return (
    <BlogLayout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles('life');

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, '')
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug('life', params.slug);

  return { props: post };
}
