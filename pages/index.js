import Timeline from '../components/Timeline';
import Container from '../components/Container';
import BlogPost from '../components/BlogPost';
import ProjectCard from '../components/ProjectCard';
import { getAdvicePost } from '@/lib/mdx';

export default function Home({ posts }) {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          行者、空山的网站
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          怎么找，也找不到我要的快乐，怎么笑，也笑不出颜色...
        </h2>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
          推荐文章
        </h3>
        {posts.map((p) => {
          return <BlogPost key={p.slug} title={p.title} summary={p.summary} slug={p.slug} />;
        })}
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          个人项目
        </h3>
        <ProjectCard
          title="风影院"
          description="一个没有广告，没有VIP，免费追美剧，动漫，电视剧的影视网站。另外也支持安卓APP，从2017年稳定运行至今。"
          href="https://movie.zackdk.top/"
          icon="project"
        />
        <ProjectCard
          title="小词导航"
          description="一个适用于前端开发者使用的导航网站，包含了大量常用的前端技术的官网，也包含了一些有趣适合放松的网站，还有一些素材网站。"
          href="https://xclinks.com/"
          icon="project"
        />
        <Timeline />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getAdvicePost();
  return { props: { posts } };
}
