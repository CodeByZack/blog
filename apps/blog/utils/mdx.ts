import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { compileMdx_node } from 'utils';
import { IArticleFrontMatter } from '../type';
import readingTime from './read-time';

const root = process.cwd();

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, 'data', type));
}

export async function getFileBySlug(type, slug) {
  const source = slug
    ? fs.readFileSync(path.join(root, 'data', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'data', `${type}.mdx`), 'utf8');

  const { data, content } = matter(source);
  const mdxSource = (await compileMdx_node(content)) as any;
  return {
    ...data,
    mdxSource,
    wordCount: content.split(/\s+/gu).length,
    readingTime: readingTime(content),
    slug: slug || null,
  };
}

export async function getAllFilesFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, 'data', type));
  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, 'data', type, postSlug),
      'utf8',
    );
    const { data } = matter(source);
    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', ''),
        path: `/${type}/${postSlug.replace('.mdx', '')}`,
      },
      ...allPosts,
    ];
  }, []) as IArticleFrontMatter[];
}

export const getAdvicePost = async () => {
  const blog_posts = await getAllFilesFrontMatter('blog');
  const life_posts = await getAllFilesFrontMatter('life');
  return [
    ...blog_posts.map((p) => ({ ...p, type: 'blog' })),
    ...life_posts.map((p) => ({ ...p, type: 'life' })),
  ].filter((p) => p.advice);
};
