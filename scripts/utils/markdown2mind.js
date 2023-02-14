import { Transformer } from 'markmap-lib';
import { Markmap, loadCSS, loadJS } from 'markmap-view';




export const markdown2mind = async (mdText) => {
    const transformer = new Transformer();

    // 1. transform Markdown
    const { root, features } = transformer.transform(markdown);
    
    // 2. get assets
    // either get assets required by used features
    const { styles, scripts } = transformer.getUsedAssets(features);
    
    // 1. load assets
    if (styles) loadCSS(styles);
    if (scripts) loadJS(scripts, { getMarkmap: () => markmap });
    
    // 2. create markmap
    // `options` is optional, i.e. `undefined` can be passed here
    Markmap.create('#markmap', options, root); // -> returns a Markmap instance
    return html;
}