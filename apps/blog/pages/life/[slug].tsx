import { MDXRemote } from 'next-mdx-remote';
import BlogLayout from '../../components/BlogLayout';
import { getFileBySlug, getFiles } from '../../utils/mdx';
import { IArticleDetail } from '../../type';
import BlogComponents from '../../components/BlogComponents';
import CommentsBox from '../../components/CommentsBox';

interface IBlogProps {
  post: IArticleDetail;
}

const Blog = (props: IBlogProps) => {
  const { post } = props;

  return (
    <BlogLayout type="life" post={post}>
      <MDXRemote {...post.mdxSource} components={BlogComponents} />
      <CommentsBox
        id={post.slug}
        url={`https://zackdk.com/life/${post.slug}`}
        title={post.title}
      />
    </BlogLayout>
  );
};

export async function getStaticPaths() {
  const posts = await getFiles('life');
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
  const post = await getFileBySlug('life', params.slug);
  return { props: { post } };
}

export default Blog;
