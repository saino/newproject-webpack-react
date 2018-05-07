/**
 * React、Redux、Webpack脚手架基础公共配置文件
 * 声明入口模块，将第三方模块打包一起有利于缓存
 * 声明输出的目录和静态资源编译的公共地址
 * 声明支持哪些默认后缀
 * 声明对js、jsx、json、图片 loader
 * 声明支持html-webpack-plugin(提取文件html)和definePlugin
 */

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var pathEnv = require('./path-env');

module.exports = {
  context: pathEnv.rootPath,
  entry: {
    app: path.join(pathEnv.devPath, 'app.jsx'),
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'react-fileupload',
      'react-draggable',
      'react-loadable',
      'redux',
      'redux-thunk',
      'redux-logger',
      'antd',
      'moment',
      'snapsvg-cjs'
    ]
  },
  output: {
    path: pathEnv.buildPath,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: []
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: path.join(pathEnv.rootPath, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: [
              'syntax-dynamic-import',
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }
      },
      {
        test: /\.json$/i,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: {
          // loader: 'url-loader',
          loader: 'url-loader',
          options: {
            limit: 10240, // 10kb以下的图片使用base64
            name: 'imgs/[name]-[hash:6].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240, // 10kb以下的图片使用base64
            name: 'fonts/[name]-[hash:6].[ext]'
          }
        }
      },
      {
        test: /\.mp4(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: 'videos/[name]-[hash:6].[ext]'
          }
        }
      },
      {
        test: /\.mp3(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: 'audios/[name]-[hash:6].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      title: '量子特效',
      inject: true,
      template: pathEnv.rootPath + '/' + 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(pathEnv.env)
    }),

    new webpack.DefinePlugin({
      fileUploadHost: JSON.stringify('http://192.168.3.116'),
      fileUploadPort: 8899
    })
  ]
};
