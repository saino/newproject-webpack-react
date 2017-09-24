import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

// 验证规则
// key => 规则名
// value => 验证正则
const commonlyRuleMap = {

  // 非空
  required: {
    validator: (value) => /^[^\s\t\r]+$/.test(value),
    message: '不能为空'
  },

  // 最大值判断
  max: {
    validator: (value, max) => parseFloat(value) <= max,
    message: '大于最大值'
  },

  // 最小值判断
  min: {
    validator: (value, min) => parseFloat(value) >= min,
    message: '小于最小值'
  },

  // 长度
  len: {
    validator: (value, len) => new RegExp('^.{'+ len +'}$').test(value),
    message: '超过了长度范围'
  }

};

export default class Form extends Component {

  render() {

  }


}
