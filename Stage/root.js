// require.js配置
require.config({

  baseUrl: './',

  paths: {

    _: 'vender/underscore',

    AbstractElement: 'AbstractElement',

    bC: 'vender/buildClass',

    Transform: 'Transform',

    Stage: 'Stage'
  },

  shim: {
    bC: {
      exports: 'buildClass'
    },

    _: {
      exports: '_'
    }
  }

});


// 初始化入口文件
require(['Stage'], function (Stage) {
  (new Stage).startUp();
});
