/**
 * 全站配置文件
 */

export default ({
  name: '致戎特效',

  // 数据请求
  api: {
    host: '127.0.0.1',
    port: 3030,
    timeout: 15000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  },

  // 分页
  page: {
    size: 10
  }
});
