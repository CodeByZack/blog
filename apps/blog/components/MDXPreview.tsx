import React from 'react';
import { MDXContent } from 'mdx/types';
import { IArticleDetail } from '../type';
import { BlogTitle } from './BlogLayout';
interface IProps {
  MdxComp: { comp: MDXContent; postInfo: Partial<IArticleDetail> };
}

const MDXPreview = (props: IProps) => {
  const { MdxComp } = props;
  const { comp : Comp, postInfo } = MdxComp;
  console.log({Comp});
  return (
    <article className="heti heti--sans box-border px-8 flex flex-col justify-center items-start max-w-3xl mx-auto mb-16 w-full">
      <BlogTitle post={postInfo} />
      {typeof Comp === 'function' ? Comp({}) : ''}
    </article>
  );
};

export default React.memo(MDXPreview);