import React, { Component, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Tip from './Tip';

export default class FormControl extends Component {

  static propTypes = {

    // 显示文字
    label: PropTypes.string,

    // 默认显示文字
    placeholder: PropTypes.string,

    // 验证状态
    validateStatus: PropTypes.bool

  };

  static defaultProps = {

    label: '',

    placeholder: '',

    validateStatus: true

  };

  render() {
    const { label, placeholder, validateStatus } = this.props;

    return (
      <div style={{ display: 'inline-block' }}>
        { cloneElement(children, {
            value: label,
            placeholder
        }) }
        <Tip visible={ validateStatus } />
      </div>
    );
  }

}
