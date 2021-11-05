'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const cdn = {
  // 忽略打包的第三方库
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
  },

  // 通过cdn方式使用
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
    'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
    'https://cdn.bootcss.com/echarts/4.6.0/echarts.min.js',
  ],
  css: [],
};

module.exports = {
  publicPath: '/', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static',
  indexPath: 'index.html',
  productionSourceMap: false, // 关闭生产环境的 source map
  chainWebpack: (config) => {
    config.module
      .rule('swf')
      .test(/\.swf$/)
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        return {
          limit: 10000,
        };
      });
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'));
    config.plugin('copy').tap((args) => {
      args[0][0].to = 'resource';
      return args;
    });
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index');
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload-index');
    // 配置cdn引入
    config.plugin('html').tap((args) => {
      args[0].cdn = cdn;
      return args;
    });
  },
  // 这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: (config) => {
    // 忽略打包配置
    config.externals = cdn.externals;
    // 生产环境相关配置
    if (isProduction) {
      //gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
      // 公共代码抽离
      config.optimization = {
        // 分割代码块
        splitChunks: {
          cacheGroups: {
            //公用模块抽离
            common: {
              chunks: 'initial',
              minSize: 0, //大于0个字节
              minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
            },
            //第三方库抽离
            vendor: {
              priority: 1, //权重
              test: /node_modules/,
              chunks: 'initial',
              minSize: 0, //大于0个字节
              minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
            },
          },
        },
      };
    }
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
    open: true,
    // host: 'localhost',
    host: '0.0.0.0',
    port: 8081,
    https: false,
    hotOnly: true,
    proxy: {
      '/api': {
        // 代理地址
        target: process.env.VUE_APP_API,
        changeOrigin: true, // 是否跨域
        secure: false,
        pathRewrite: {
          '^/api': '/api/ctrl', //测试环境
          // '/api': '', //需要rewrite重写的, //本地联调
        },
      },
    },
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/variables.scss";`,
      },
    },
  },
};


// index.html中引入cdn
/*<% for (var i in htmlWebpackPlugin.options.cdn &&
htmlWebpackPlugin.options.cdn.js) { %>
    <script
src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"
crossorigin="anonymous"
  ></script>
<% } %>*/
