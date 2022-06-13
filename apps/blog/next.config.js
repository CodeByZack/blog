const withTM = require('next-transpile-modules')(['ui', 'utils', 'media-manage']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled : false,
});
// const UnoCSS = require('@unocss/webpack').default;

module.exports = withBundleAnalyzer(
  withTM({
    reactStrictMode: true,
    images: {
      domains: ['zackdkblog.oss-cn-beijing.aliyuncs.com'],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      if (isServer) {
        require('./utils/generate-sitemap');
      }
      // Important: return the modified config
      // config.plugins.push(UnoCSS({}));
      // if (buildId !== "development") {
      //   // * disable filesystem cache for build
      //   // * https://github.com/unocss/unocss/issues/419
      //   // * https://webpack.js.org/configuration/cache/
      //   config.cache = false;
      // }
      return config;
    },
  }),
);
