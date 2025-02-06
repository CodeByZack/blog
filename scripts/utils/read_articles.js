
import fs from './fs.js';
import * as path from 'path';

const extNames = ['.md'];

const readArticles = async (dirpaths) => {
    const article_paths = [];
    const readdir = async (_dirpath) => {
        const paths = await fs.readdir(_dirpath, { withFileTypes: true });
        for (const d of paths) {
            const absolutePath = path.join(_dirpath, d.name);
            if (d.isFile()) {
                if (extNames.includes(path.extname(absolutePath))) {
                    article_paths.push(absolutePath);
                }
            } else {
                await readdir(absolutePath)
            }
        }
    };
    for (const dirpath of dirpaths) {
        await readdir(dirpath);
    }
    return article_paths.map(p => {
        for (const dirpath of dirpaths) {
            if (p.startsWith(dirpath)) {
                return p.replace(dirpath, "");
            }
        }
        return p;
    });
};

export default readArticles;