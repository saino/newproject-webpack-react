/**
 * 全站配置文件
 */

export default ({
  name: '致戎特效',
  user: {
    secret: `-----BEGIN PUBLIC KEY-----
      MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6HC0L3T6bzNE8c8/8J9o
      3JRetWCoBpAY/uGUIb2AAmelBKEiGIA8iuNa+yl7qaTNNZfwYjmUNo6K436d5zpX
      ospXtNEBanCE9b6xBCYiwsZMNGZWWnPPCf3g28FQCUyDmP70M8f+OvXgbX7ZlA6W
      aXK2QDmzLu/B0bdWbTdeKmk8Ia9tamRq5e8b7qZuF0ikmcqbs8dqBEPg3ZQifftW
      qgqT4+QHIcGGb1jOzGCF+zLiSutQ9fB/yczh9tTFnZS/CQDdDCZ23V9cXhnwAM/Z
      6jZ5oxArjjR/DaBdvkuFeP6tm938y99AQ5qSWrWslM/9zUe3rNN3xBNk9JPXRmR/
      YptIa9mvd9oU3DMlblavAEU+sQq1zWCkULLjXQQDA0NKcN5x5/uNNORg87yuErcU
      98yoTcvDU2k4Bb8gCxwEHBUPzdu9T/KhiuPDhtRY9ZoWr6DVv/QSo3teYgZwHPgI
      oE733zSjGD1Z6UQ4z+lfNgZDBSfBSc/SW1Ro3x0jMrWsXmHQm07m1b8bY+VRpPVd
      6QKsXEhvyDyrVazCawhaQpttRiD8jQaNhpXYteqA1AT3lO57PqPOuUoe1MiOJQCw
      wiLC2uCrnRRrmLiQ9FvRxWSWL97MbWr3eUi37AsDFbHF0nCw7TLGfFsq4HTmKb7M
      9XlcTtf9aT8eC1tXMNNGlT8CAwEAAQ==
      -----END PUBLIC KEY-----`,
    secretType: 'RS256'
  },
  // 数据请求
  api: {
    host: '127.0.0.1',
    path: '/api/1',
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
  },
  // 对话框
  dialog: {
    width: 360
  }
});
