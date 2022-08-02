import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

// import your default seo configuration
import SEO from '../next-seo.config';
import '@unocss/reset/tailwind.css';
import '../styles/heti.css';
import '../styles/code.css';
import '../styles/index.css';
import '../../../uno.css';
import { MDXProvider } from '@mdx-js/react';
import { BlogComponents } from 'ui';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, GeistProvider } from '@geist-ui/core';

const PWA_HEAD_INFO = (
  <>
    <meta name="application-name" content="行者、空山的博客" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="行者、空山的博客" />
    <meta name="description" content="行者、空山的博客，记录一些碎碎生活" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#000000" />

    <link rel="apple-touch-icon" href="/logo180_180.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/logo180_180.png" />

    <link rel="icon" type="image/png" sizes="32x32" href="/logo180_180.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/logo180_180.png" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="mask-icon" href="/logo180_180.png" color="#5bbad5" />
    <link rel="shortcut icon" href="/favicon.ico" />
  </>
);

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <GeistProvider themeType="dark">
      {/* <CssBaseline /> */}
      <SessionProvider session={session}>
        <ThemeProvider attribute="class">
          <MDXProvider components={BlogComponents}>
            <>
              <Head>
                <meta
                  content="width=device-width, initial-scale=1"
                  name="viewport"
                />
                {PWA_HEAD_INFO}
              </Head>
              <DefaultSeo {...SEO} />
              <Component {...pageProps} />
            </>
          </MDXProvider>
        </ThemeProvider>
      </SessionProvider>
    </GeistProvider>
  );
};

export default App;
