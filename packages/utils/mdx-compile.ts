import { compile, evaluate, EvaluateOptions } from '@mdx-js/mdx';
//@ts-ignore
import mdxPrism from 'mdx-prism';
//@ts-ignore
import remarkCodeTitles from 'remark-code-titles';
import remarkSlug from 'remark-slug';
import remarkGfm from 'remark-gfm';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import { serialize } from 'next-mdx-remote/serialize';

export const compileMdx = async (content: string) => {
  if(!content) return null;
  try {
    const res = await compile(content, {
      remarkPlugins: [
        remarkAutolinkHeadings,
        remarkSlug,
        remarkCodeTitles,
        remarkGfm,
      ],
      jsxRuntime: 'classic',
      rehypePlugins: [mdxPrism],
    });
    return res.value as string;
  } catch (error) {
    console.log(error);
    throw new Error(error as any);
  }
};

export const evaluateMdx = async (content: string, config: EvaluateOptions) => {
  try {
    const res = await evaluate(content, {
      remarkPlugins: [
        remarkAutolinkHeadings,
        remarkSlug,
        remarkCodeTitles,
        remarkGfm,
      ],
      useDynamicImport : true,
      ...config,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const compileMdx_node = async (content: string) => {
  try {
    const res = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [
          remarkAutolinkHeadings,
          remarkSlug,
          remarkCodeTitles,
          remarkGfm,
        ],
        rehypePlugins: [mdxPrism],
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error as any);
  }
};
