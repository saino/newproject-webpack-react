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
    // "/data/materials/*": {
    //   "target": "http://192.168.3.116:8899",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH",
    //   "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With, Cookie",
    //   "Access-Control-Allow-Credentials": "true",
    // },


    // onProxyRes: function (proxyRes, req, res) {
    //   var cookies = proxyRes.headers['set-cookie'];
    //   var cookieRegex = /Path=\/XXX\//i;
    //   //修改cookie Path
    //   console.log(proxyRes, req, res, "kkkkkkkkkkkk");
    //   if (cookies) {
    //     var newCookie = cookies.map(function (cookie) {
    //       if (cookieRegex.test(cookie)) {
    //         return cookie.replace(cookieRegex, 'Path=/');
    //       }
    //       return cookie;
    //     });
    //     //修改cookie path
    //     delete proxyRes.headers['set-cookie'];
    //     proxyRes.headers['set-cookie'] = newCookie;
    //   }
    // }

  }
};

/**
 * loader config
 */
baseConfig.module.rules.push({
  test: /\.css$/i,
  include: [ pathEnv.staticPath, pathEnv.vendorPath ],
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
    host: JSON.stringify('http://192.168.3.116'),
    port: 8899,
    path: JSON.stringify('/api/1'),
    fileUploadHost: JSON.stringify('http://192.168.3.116'),
    fileUploadPort: 8899
  })
);

module.exports = baseConfig;
