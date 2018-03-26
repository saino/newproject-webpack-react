import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Input, Checkbox, message } from 'antd';
import { isRequired, validPhone } from '../../../utils/validate';
import decodeToken from '../../../utils/decode-token';
import defferPerform from '../../../utils/deffer-perform';
import { set } from '../../../utils/configure-auth';
import { login, recordUser } from '../../../stores/action-creators/app-creator';
import SubmitButton from '../../commons/SubmitButton/SubmitButton';
import style from './style.css';

class LoginPage extends Component {
  static propTypes = {
    isShow: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      phone: props.token,
      password: ''
    };
    // 登录前处理（一般是前端验证）
    this.loginBeforeHandle = () => {
      let { phone, password } = this.state;

      phone = phone.trim();
      password = password.trim();

      if (isRequired(phone)) {
        message.error('手机号不能为空');
        return false;
      }

      else if (!validPhone(phone)) {
        message.error('手机号格式错误');
        return false;
      }

      else if (isRequired(password)) {
        message.error('密码不能为空');
        return false;
      }

      return true;
    };
    // 登录后处理（一般是清楚登录中状态，记录到本地存储，延时跳转）
    this.loginAfterHandle = defferPerform((token, isRecordUser, unLoginHandle) => {
      // 将token和是否记住用户记录到localstorage中
      set('token', token);
      set('isRecordUser', isRecordUser);
      unLoginHandle();
    }, 10);
    // 登录
    this.loginHandle = (unLoginHandle) => {
      const { login, isRecordUser } = this.props;
      const { phone, password } = this.state;

      login(phone, password, (token) => {
        this.loginAfterHandle(token, isRecordUser, unLoginHandle);
      }, unLoginHandle);
    };
    // 手机号和密码改变
    this.changeFieldHandle = (name) => (e) => {
      this.setState({ [ name ]: e.target.value })
    };
    // 记住用户
    this.recordUserHandle = ({ target }) => {
      const { recordUser } = this.props;

      recordUser(target.checked);
    };
  }

  getLoginContent = () => {
    const { isRecordUser } = this.props;

    return (
      <div className={ style[ 'wrapper' ] }>
        <div className={ style[ 'wrapper-inner'] }>
          <ul className={ style[ 'form-control'] }>
            <li className={ style.textbox }>
              <Input onChange={ this.changeFieldHandle('phone') } className={ style[ 'textbox-input' ] } placeholder="请输入手机号" />
            </li>
            <li className={ style.textbox }>
              <Input onChange={ this.changeFieldHandle('password') } className={ style[ 'textbox-input' ] } placeholder="请输入密码" />
            </li>
          </ul>

          <div className={ style['function-bar'] }>
            <span className={ style['left'] }>
              <Checkbox checked={ isRecordUser } onChange={ this.recordUserHandle }>记住用户名</Checkbox>
            </span>
            <span className={ style['right'] }>
              立即注册
            </span>
          </div>

          <div className={ style['bar-login'] }>
            {/* 登录 */}
            <SubmitButton
              text="登录"
              onSubmitBefore={ this.loginBeforeHandle }
              onSubmit={ this.loginHandle } />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { isShow, width, onClose } = this.props;

    return (
      <Modal
        title="登录"
        mask={ false }
        footer={ null }
        width={ 360 }
        visible={ isShow }
        onCancel={ onClose }>
        { this.getLoginContent() }
      </Modal>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  token: app.user == null ? '' : app.user,
  isRecordUser: app.isRecordUser
});

const mapDispatchProps = (dispatch) => bindActionCreators({
  recordUser,
  login
}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(LoginPage);
