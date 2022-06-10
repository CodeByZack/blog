/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Container from '../components/Container';

const NotFound = () => {
  return (
    <Container>
      <NextSeo title="404 – 行者、空山" />
      <div className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
        <h1 className="font-bold w-full text-center text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          404 – NotFound
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Why show a generic 404 when I can make it sound mysterious? It seems
          you've found something that used to exist, or you spelled something
          wrong. I'm guessing you spelled something wrong. Can you double check
          that URL?
        </p>
        <Link href="/">
          <a className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-100 dark:bg-gray-900 text-center rounded-md text-black dark:text-white">
            Return Home
          </a>
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
