import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ThemeIcon } from 'ui';
import Footer from './Footer';

interface IProps {}

const Container = (props: PropsWithChildren<IProps>) => {
  const { children } = props;
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <nav className="flex justify-between items-center max-w-4xl w-full p-8 my-0 mx-auto bg-white dark:bg-black bg-opacity-60">
        {mounted && <ThemeIcon theme={theme} setTheme={setTheme} />}
        <div>
          {/* <NextLink href="/blog">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">博客</a>
          </NextLink> */}
          <NextLink href="/about">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">关于</a>
          </NextLink>
          <NextLink href="/sentence">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">小词</a>
          </NextLink>
          <NextLink href="/">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">首页</a>
          </NextLink>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto flex flex-col justify-center bg-white dark:bg-black px-8">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Container;
