import Timeline from '../components/Timeline';
import Container from '../components/Container';
import BlogPost from '../components/BlogPost';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          行者、空山的博客
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          一个怀揣梦想的前端工程师，喜欢发呆，喜欢看书，喜欢思考，喜欢旅行。
        </h2>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
          推荐文章
        </h3>
        <BlogPost
          title="构造你自己的React（翻译）"
          summary="带你从零实现一个简易版本的React,包含React当中最新的Fiber,Hook,Concurrent等概念。"
          slug="build-your-owen-react"
        />
        <BlogPost
          title="HTTP的强缓存和协商缓存"
          summary="介绍关于浏览器缓存的前因后果，分清强缓存和协商缓存，了解相关的http的头字段。"
          slug="http-cache-intoduce"
        />
        <BlogPost
          title="利用Generator执行异步任务"
          summary="使用generator执行javascript中的异步任务，从generator基础使用到，自己编写执行器，到自己封装类似async/await的功能。"
          slug="use-generator-in-async-task"
        />
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
