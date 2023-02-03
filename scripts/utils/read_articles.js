
import fs from './fs.js';
import * as path from 'path';

const extNames = ['.md'];

const readArticles = async (dirpath) => {
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
    await readdir(dirpath);
    // return article_paths.map(p => p.replace(dirpath, "")).map(p => p.replace(path.extname(p), ""));
    return article_paths.map(p => p.replace(dirpath, ""));

};

export default readArticles;