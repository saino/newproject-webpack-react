var path = require('path');
var rootPath = path.join(__dirname, '..', '..');

module.exports = {
  rootPath: rootPath,                         // 项目根目录
  devPath: path.join(rootPath, 'src'),        // 开发目录
  staticPath: path.join(rootPath, 'static'),  // 静态资源目录
  buildPath: path.join(rootPath, 'build'),    // 构建目录
  env: process.env.NODE_ENV.trim()            // 当前环境
};
