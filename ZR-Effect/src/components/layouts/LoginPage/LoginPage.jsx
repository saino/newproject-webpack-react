import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
import { isRequired, validPhone } from '../../../utils/validate';
import FormControl from '../../commons/FormControl/FormControl';
import style from './style.css';

export default class LoginPage extends Component {
  static propTypes = {
    isShow: PropTypes.bool
  };

  static defaultTypes = {
    isShow: false
  };

  getLoginContent = () => {
    return (
      <div className={ style.wrapper }>
        <div className={ style.wrapperInner }>
          <ul className={ style.formControl }>

            {/* 表单交互控件 */}
            <FormControl>
              <li className={ style.textbox } rules=[ validPhone, isRequired ]>
                <Input className={ style.textboxInput } placeholder="请输入手机号" addonAfter="haha" />
              </li>
              <li className={ style.textbox } rules=[ isRequired ]>
                <Input className={ style.textboxInput } placeholder="请输入密码" />
              </li>
            </FormControl>
          </ul>
        </div>
      </div>
    );
  };

  render() {
    const { isShow } = this.props;

    return (
      <Modal
        mask={ false }
        footer={ null }
        width="100%"
        visible={ isShow }>
        { this.getLoginContent() }
      </Modal>
    );
  }
}
