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
