import * as esbuild from 'esbuild-wasm';
import { Path } from './path';

const namespace = 'build-react-online';

export class FSloader {
  static fileMap = new Map<string, string>();
  constructor() {}
  public writeFile = async (path: string, content: string) => {
    FSloader.fileMap.set(path, content);
  };
  public readFile = async (path: string) => {
    console.log({ path });
    if (FSloader.fileMap.has(path)) return FSloader.fileMap.get(path);
    const content = await (await fetch(path)).text();
    FSloader.fileMap.set(path, content);
    return content;
  };
}

type LoadFromPath = (path: string) => Promise<string>;

interface OnlineBuilderOptions {
  loader: (path: string) => Promise<string>;
  wasmURL?: string;
  externals?: { [x: string]: string };
}

export class OnlineBuilder {
  private textDecoder: TextDecoder;
  private loadPromise: Promise<void>;
  private externals: { [x: string]: string };
  private memoMap: Map<string, esbuild.OnLoadResult>;
  private loadFromPath: LoadFromPath;
  constructor(options: OnlineBuilderOptions) {
    const {
      loader,
      wasmURL = 'https://www.unpkg.com/esbuild-wasm@0.15.6/esbuild.wasm',
      externals = {},
    } = options;
    this.textDecoder = new TextDecoder();
    this.externals = externals;
    this.memoMap = new Map();
    this.loadFromPath = loader;

    this.loadPromise = new Promise(async (resolve, reject) => {
      try {
        await esbuild.initialize({
          wasmURL,
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  public async build(options: esbuild.BuildOptions) {
    await this.loadPromise;

    const { entryPoints } = options;
    // @ts-ignore
    const entry = entryPoints[0].replace('/', '');

    const result = await esbuild.build({
      entryPoints: [entry],
      external: ['react'],
      outfile: 'out.js',
      plugins: [
        {
          name: namespace,
          setup: (build) => {
            build.onResolve({ filter: /.*/ }, (args) =>
              this.onResolveCallback(args),
            ),
              build.onLoad({ filter: /.*/ }, (args) =>
                this.onLoadCallBack(args),
              );
          },
        },
      ],
      ...options,
      bundle: true,
      write: false,
    });
    const contents = result.outputFiles![0].contents;
    return this.textDecoder.decode(contents);
  }

  private onResolveCallback(args: esbuild.OnResolveArgs) {
    console.table(args);
    const externalKeys = Object.keys(this.externals);
    if (externalKeys.includes(args.path)) {
      return { path: '/externals/' + args.path };
    }

    if (args.kind === 'entry-point') {
      return { path: '/' + args.path };
    }
    if (args.kind === 'import-statement') {
      const dirname = Path.dirname(args.importer);
      const fileName = args.path.replace(';', '');
      const path = Path.join(dirname, fileName);
      return { path };
    }
    throw Error('not resolvable');
  }

  private async onLoadCallBack(args: esbuild.OnLoadArgs) {
    console.table(args);

    if (this.memoMap.has(args.path)) {
      return this.memoMap.get(args.path);
    }

    if (args.path.startsWith('/externals/')) {
      const moduleName = args.path.replace('/externals/', '');
      const contents = `module.exports = ${this.externals[moduleName]}`;
      const result = { contents };
      this.memoMap.set(args.path, result);
      return result;
    }

    const contents = await this.loadFromPath(args.path);
    const extname = Path.extname(args.path);
    const loader: esbuild.OnLoadResult['loader'] =
      extname === '.ts'
        ? 'ts'
        : extname === '.tsx'
        ? 'tsx'
        : extname === '.js' || extname === '.mjs'
        ? 'js'
        : extname === '.jsx'
        ? 'jsx'
        : 'default';

    return { contents, loader };
  }
}
