/**
 * 整个项目的全局配置
 */

export default ({

  name: '量子特效',

  // 是否开启数据调试，不会请求后端接口，使用mock数据
  debug: true,

  // 数据请求
  api: {
    host: window.api,
    path: '/api',
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
    size: 10              // 每页10条
  },

  // 进入其他页面的校验接口
  auth: {
    validate: 'requireAuth'
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

    return `${ tempHost }/${ tempPath }`;
  }

});
