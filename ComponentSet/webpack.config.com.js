var webpack = require('webpack');
var path = require('path');

module.exports = function () {
  return {

    entry: {

      'ReactDraggable': './lib/ReactDraggable/Draggable.js'

    },

    output: {

      path: path.resolve(__dirname, 'com-dist'),

      filename: '[name].js'

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
