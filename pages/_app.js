import '@/styles/global.css';

import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

import SEO from '../next-seo.config';
import MDXComponents from '@/components/MDXComponents';
import { useAnalytics } from '@/lib/analytics';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  // useAnalytics();

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <MDXProvider components={MDXComponents}>
          <Head>
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
          </Head>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
