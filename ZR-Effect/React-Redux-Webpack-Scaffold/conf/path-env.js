var path = require('path');

module.exports = {
  rootPath: path.join(__dirname, '..', '..'),   // 项目根目录
  devPath: path.join(rootPath, 'src'),    // 开发目录
  buildPath: path.join(rootPath, 'build') // 构建目录
  env: process.env.NODE_ENV.trim()        // 当前环境
};
