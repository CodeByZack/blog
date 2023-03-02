import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkPrism from 'remark-prism'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export const markdown2html = async (mdText) => {
    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkPrism)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(mdText)
    const html = String(file);
    return html;
}