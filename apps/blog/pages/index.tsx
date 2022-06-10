import ArticleEnter from '../components/ArticleEnter';
import Container from '../components/Container';
import { getAllFilesFrontMatter } from '../utils/mdx';
import { IArticleFrontMatter } from '../type';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface IProps {
  posts: IArticleFrontMatter[];
}

const Index = (props: IProps) => {
  const { posts } = props;
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const filteredBlogPosts = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    )
    .filter((frontMatter) =>
      frontMatter.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value === 'new post') {
      router.push('/editor');
    }
  };
  return (
    <Container>
      <div className="heti heti--serif">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          行者、空山的网站
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          习惯了无话，习惯了自己的世界，习惯了音乐和雨，习惯了就是这样一个自己，安静的回忆，安静的看着回忆也渐渐远离，那有你的情绪，在我的心里，终遁成了冬季。。。
        </h2>
        <div className="w-full">
          <input
            type="text"
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="搜索文章"
            className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        {filteredBlogPosts.map((p) => {
          return <ArticleEnter key={p.slug} data={p} />;
        })}
      </div>
    </Container>
  );
};

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter();
  return { props: { posts } };
}

export default Index;
