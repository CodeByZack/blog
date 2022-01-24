import React, { useState } from 'react';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { IFrontMatter } from '.';

interface IProps {
  frontMatter?: IFrontMatter;
  mdxResult?: Function;
}

const Preview = (props: IProps) => {
  const { frontMatter = {}, mdxResult } = props;
  const { title, by, publishedAt } = frontMatter || {};

  const dateTime = publishedAt
    ? format(parseISO(publishedAt), 'MMMM dd, yyyy')
    : '-------';

  return (
    <div id="preview-box" className="h-full overflow-auto flex justify-center pt-8">
      <div className="prose dark:prose-dark">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2 mb-8">
          <div className="flex items-center">
            <Image
              alt="行者、空山"
              height={24}
              width={24}
              src="/avatar.jpg"
              className="rounded-full"
            />
            <p className="text-sm text-gray-700 dark:text-gray-300 ml-2">
              {by}
              {'行者、空山 / '}
              {dateTime}
            </p>
          </div>
        </div>
        {typeof mdxResult === 'function' ? mdxResult() : ''}
      </div>
    </div>
  );
};
export default Preview;
