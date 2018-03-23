import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Checkbox } from 'antd';
import { isRequired, validPhone } from '../../../utils/validate';
import FormControl from '../../commons/FormControl/FormControl';
import style from './style.css';

export default class LoginPage extends Component {
  static propTypes = {
    isShow: PropTypes.bool,
    width: PropTypes.number.isRequired
  };

  static defaultTypes = {
    isShow: false
  };

  getLoginContent = () => {
    return (
      <div className={ style[ 'wrapper' ] }>
        <div className={ style[ 'wrapper-inner'] }>
          <ul className={ style[ 'form-control'] }>

            {/* 表单交互控件 */}
            <FormControl>
              <li className={ style.textbox } data-rules={[ validPhone, isRequired ]}>
                <Input className={ style[ 'textbox-input' ] } placeholder="请输入手机号" />
              </li>
              <li className={ style.textbox } data-rules={[ isRequired ]}>
                <Input className={ style[ 'textbox-input' ] } placeholder="请输入密码" />
              </li>
            </FormControl>
          </ul>

          <div className={ style['function-bar'] }>
            <span className={ style['left'] }>
              <Checkbox>下次自动登录</Checkbox>
            </span>
            <span className={ style['right'] }>
              立即注册
            </span>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { isShow, width } = this.props;

    return (
      <Modal
        title="登录"
        mask={ false }
        footer={ null }
        width={ 360 }
        visible={ isShow }>
        { this.getLoginContent() }
      </Modal>
    );
  }
}
