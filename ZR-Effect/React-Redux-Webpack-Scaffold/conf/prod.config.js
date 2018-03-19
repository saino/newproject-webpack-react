/**
 * webpack生产环境配置文件
 */

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pathEnv = require('./path-env');
var baseConfig = require('./base');

/**
 * output config
 * @type { String }
 */
baseConfig.output.filename = '[name].[chunkhash:6].js';
baseConfig.output.chunkFilename = '[id].[chunkhash:6].js';

/**
 * devtool config
 * @type { String }
 */
baseConfig.devtool = 'cheap-source-map';

/**
 * loader config
 * @type { Object }
 */
baseConfig.module.rules.push({
  test: /\.css$/i,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    name: '[name]:[chunkhash:6].css',
    use: 'css-loader'
  })
});

/**
 * plugins config
 */
baseConfig.plugins.push(
  // 压缩、混淆
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }),
  // 提取entry里的公共模块
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks: 2
  }),
  // 提取第三方模块，例如react、redux
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vender',
    minChunks: Infinity
  }),
  // 提取webpack runtime(引用业务模块的方法)
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  })
);
