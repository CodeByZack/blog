import { MDXRemote } from 'next-mdx-remote';
import BlogLayout from '../../components/BlogLayout';
import { getFileBySlug, getFiles } from '../../utils/mdx';
import { IArticleDetail } from '../../type';
import { BlogComponents } from 'ui';

interface IBlogProps {
  post: IArticleDetail;
}

const Blog = (props: IBlogProps) => {
  const { post } = props;

  return (
    <BlogLayout type="blog" post={post}>
      <MDXRemote {...post.mdxSource} components={BlogComponents} />
    </BlogLayout>
  );
};

export async function getStaticPaths() {
  const posts = await getFiles('blog');
  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug('blog', params.slug);
  return { props: { post } };
}

export default Blog;
