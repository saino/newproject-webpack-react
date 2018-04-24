/**
 * webpack开发环境下配置文件
 */
var webpack = require('webpack');
var pathEnv = require('./path-env');
var baseConfig = require('./base');

/**
 * output config
 * output.chunkFilename是排除在entry里单独打包出来的文件，比如懒加载
 * @type { String }
 */
baseConfig.output.filename = '[name].js';
baseConfig.output.chunkFilename = '[name].js';
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
  inline: true,
  historyApiFallback: true,
  contentBase: pathEnv.buildPath,
  port: 9000,
  open: true,
  stats: { colors: true },
  proxy: {
    '/api/[0-9\.]+/.*': {
      target: 'http://192.168.3.116:8899',
      rewrite: true,
      secure: false,
      changeOrigin: true
    }
  }
};

/**
 * loader config
 */
baseConfig.module.rules.push({
  test: /\.css$/i,
  include: pathEnv.vendorPath,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader'
    }
  ]
});

baseConfig.module.rules.push({
  test: /\.css$/i,
  exclude: [ pathEnv.staticPath, pathEnv.vendorPath ],
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[name]__[local]-[hash:base64:6]'
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
  new webpack.DefinePlugin({
    host: JSON.stringify('127.0.0.1'),
    port: 3030
  })
);

module.exports = baseConfig;
