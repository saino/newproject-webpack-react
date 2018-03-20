/**
 * webpack开发环境下配置文件
 */

var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var pathEnv = require('./path-env');
var baseConfig = require('./base');

/**
 * output config
 * output.chunkFilename是排除在entry里单独打包出来的文件，比如懒加载
 * @type { String }
 */
baseConfig.output.filename = '[name].js';
baseConfig.output.chunkFilename = '[id].js';
baseConfig.output.publicPath = '/';

/**
 * devtool config
 * @type { String }
 */
baseConfig.devtool = 'cheap-eval-source-map';

/**
 * devServer config
 * @type { Object }
 */
baseConfig.devServer = {
  hot: true,
  contentBase: pathEnv.buildPath,
  port: 7878,
  stats: { colors: true }
};

/**
 * loader config
 */
baseConfig.module.rules.push({
  test: /\.css$/i,
  include: pathEnv.devPath,
  exclude: pathEnv.staticPath,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[name]__[local]-[hash:base64:3]'
      }
    }
  ]
});

/**
 * plugins config
 */
baseConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BrowserSyncPlugin({
    host: '127.0.0.1',
    port: 9090,
    proxy: 'http://127.0.0.1:9090',
    logConnections: false,
    notify: false
  }, { reload: false }) // 服务器代理，跨域处理
);

module.exports = baseConfig;
