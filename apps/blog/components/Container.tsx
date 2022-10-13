import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import React, { PropsWithChildren } from 'react';
import Footer from './Footer';
import ThemeIcon from './ThemeIcon';
import Script from 'next/script';

interface IProps {}

const Container = (props: PropsWithChildren<IProps>) => {
  const { children } = props;
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <nav className="sticky-nav box-border flex justify-between items-center max-w-4xl w-full p-8 my-0 mx-auto bg-white dark:bg-black bg-opacity-60">
        <ThemeIcon theme={theme} setTheme={setTheme} />
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
      <Script id="show-banner">
        {`var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?fa87ddc53c2456da86ad9beaa3f0e2a1";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`}
      </Script>
    </div>
  );
};

export default Container;
