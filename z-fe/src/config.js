/**
 * 整个项目的全局配置
 */

export default ({

  name: '量子特效',
  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  // 是否开启数据调试，不会请求后端接口，使用mock数据
  debug: true,
  
  secretKey: `-----BEGIN PUBLIC KEY-----
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

  // 数据请求
  api: {
    host: window.api,
    path: '',
    timeout: 15000
  },

  // 对话框
  dialog: {
    width: 450,
    footerVisible: false,
    wrapClassName: 'vertical-center-modal',
    centerStyle: `
    .vertical-center-modal {
      text-align: center;
      white-space: nowrap;
    }

    .vertical-center-modal:before {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      width: 0;
    }

    .vertical-center-modal .ant-modal {
      display: inline-block;
      vertical-align: middle;
      top: 0;
      text-align: left;
    }`
  },

  // 图片/视频上传(单位：KB)
  upload: {
    imgSizeLimit: 1500,   // 默认的图片上传大小
    videoSizeLimit: 5120  // 默认的视频上传大小
  },

  // 分页
  page: {
    pageSize: 11             // 每页11条
  },

  // 进入其他页面的校验接口
  auth: {
    validate: 'requireAuth'
  },

  // 形变
  transform: {
    stepScale: 0.1
  },

  // 对请求host、path路径处理
  getApiPath() {
    let tempHost = this.api.host,
        tempPath = this.api.path;

    if (tempHost.charAt(tempHost.length - 1) === '/') {
      tempHost = tempHost.slice(0, tempHost.length - 1);
    }

    if (tempPath.charAt(0) === '/') {
      tempPath = tempPath.slice(1);
    }

    return `${ tempHost }${ tempPath }`;
  }

});
