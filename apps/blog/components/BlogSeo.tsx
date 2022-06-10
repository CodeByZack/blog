import { NextSeo, ArticleJsonLd } from 'next-seo';

const BlogSeo = ({ title, summary, publishedAt, url, image }) => {
  const date = new Date(publishedAt).toISOString();
  return (
    <>
      <NextSeo
        title={`${title} – 行者、空山`}
        description={summary}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: date,
          },
          url,
          title,
          description: summary,
          images: [],
        }}
      />
      <ArticleJsonLd
        authorName="行者、空山"
        dateModified={date}
        datePublished={date}
        description={summary}
        images={[]}
        // publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName="行者、空山"
        title={title}
        url={url}
      />
    </>
  );
};

export default BlogSeo;
