var webpack = require('webpack');
var path = require('path');

module.exports = function () {
  return {

    entry: {

      'ReactDraggable': './example/ReactDraggable.js',

      'ReactFormValidator': './example/ReactFormValidator.js'

    },

    output: {

      path: path.resolve(__dirname, 'dist'),

      filename: '[name].compiled.js'

    },

    module: {

      rules: [

        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: [ 'transform-object-rest-spread', 'transform-class-properties' ]
          }
        }

      ]

    },

    resolve: {

      extensions: ['.js', '.json', '.jsx', '.css']
    },

    devtool: 'eval-source-map'

    // plugins: [
    //   new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //       warnings: false
    //     }
    //   })
    // ]



  }
};
