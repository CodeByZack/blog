import { useTheme } from 'next-themes';
import Script from 'next/script';
import React, { useEffect } from 'react';

interface IProps {
  id: string;
  url: string;
  title: string;
}

const CommentsBox = (props: IProps) => {
  const { id, url, title } = props;
  const { theme } = useTheme();

  useEffect(() => {
    if (theme) {
      //@ts-ignore
      window.CUSDIS?.setTheme(theme);
    }
  }, [theme]);

  if (!theme) return null;

  return (
    <>
      <div
        className="mt-8"
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="28d124ae-c1c6-4950-93a7-3e9848bff094"
        data-page-id={id}
        data-page-url={url}
        data-page-title={title}
        data-theme={theme}
      ></div>
      <Script src="https://cusdis.com/js/widget/lang/zh-cn.js" defer />
      <Script
        src="https://cusdis.com/js/cusdis.es.js"
        defer
        async
        onLoad={() => {
          console.log({ theme });
          setTimeout(() => {
            //@ts-ignore
            window.CUSDIS?.setTheme(theme);
          }, 500);
        }}
      />
    </>
  );
};
export default CommentsBox;
