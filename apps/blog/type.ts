export interface IArticleFrontMatter {
  title: string;
  publishedAt: string;
  updatedAt: string;
  advice: boolean;
  summary: string;
  slug: string;
  path: string;
}

export interface IArticleDetail extends IArticleFrontMatter {
  mdxSource: any;
  wordCount: number;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}
