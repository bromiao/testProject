const CompressionWebpackPlugin = require('compression-webpack-plugin')

const compress = new CompressionWebpackPlugin({
  filename: info => {
    return `${info.path}.gz${info.query}`
  },
  algorithm: 'gzip',
  threshold: 10240,
  test: new RegExp(
    '\\.(' + ['js'].join('|') +
    ')$'
  ),
  minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
  deleteOriginalAssets: false // 删除原文件
});

module.exports = {
  //该配置能帮助你为项目中的所有资源指定一个基础路径，它被称为公共路径
  publicPath: process.env.NODE_ENV === 'production' ?
    '/' : '/',
  //放置生成的静态资源 (js、css、img、fonts) 的目录
  assetsDir: 'static',
  //关闭生产环境的 source map 以加速生产环境构建
  productionSourceMap: false,
  chainWebpack: config => {
    //最小化代码
    config.optimization.minimize(true);
    //分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    });
    //压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
  configureWebpack: {
    // 通过 compression-webpack-plugin 插件对js文件进行gzip压缩
    plugins: [compress]
  },
  devServer: {
    proxy: {
      '/mock/*': {
        target: 'https://easy-mock.com/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {}
      }
    },
    //在本地服务器开启gzip，线上服务器都支持gzip不需要设置
    before(app) {
      app.get(/.*.(js)$/, (req, res, next) => {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        next();
      })
    }
  }
}
