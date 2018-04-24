import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Input, Checkbox, Button, message } from 'antd';
import { isRequired, validPhone } from '../../../utils/validate';
import defferPerform from '../../../utils/deffer-perform';
import { set } from '../../../utils/configure-auth';
import { register, sendVerifyCode, configureCountdown } from '../../../stores/action-creators/app-creator';
import SubmitButton from '../../commons/SubmitButton';
import style from './style.css';

class RegisterPage extends Component {
  static propTypes = {
    isShow: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      verifyCode: '',
      password: '',
      confirmPassword: '',
      sendVerifyCode: false
    };

    // 登录前处理（一般是前端验证）
    this.registerBeforeHandle = () => {
      let { phone, password, confirmPassword, verifyCode } = this.state;

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

      else if (isRequired(confirmPassword)) {
        message.error('重复密码不能为空');
        return false;
      }

      else if (isRequired(verifyCode)) {
        message.error('验证码不能为空');
        return false;
      }

      else if (confirmPassword !== password) {
        message.error('两次输入的密码不一致');
        return false;
      }

      return true;
    };
    // 注册后处理（一般是清除注册中状态，记录到本地存储，延时跳转）
    this.registerAfterHandle = defferPerform((token, unRegisterHandle) => {
      // 将token记到localstorage中
      set('token', token);
      unRegisterHandle();
    }, 10);
    // 注册
    this.registerHandle = (unRegisterHandle) => {
      const { register, isRecordUser } = this.props;
      const { phone, password, verifyCode } = this.state;

      register(phone, password, verifyCode, (token) => {
        this.registerAfterHandle(token, unRegisterHandle);
      }, unRegisterHandle);
    };
    // 发送验证码
    this.sendVerifyCodeHandle = () => {
      const { sendVerifyCode, configureCountdown } = this.props;
      const { phone } = this.state;
      let timer;

      if (phone === '') {
        message.error('手机号不能为空');
        return;
      }

      else if (!validPhone(phone)) {
        message.error('手机号格式错误');
        return;
      }

      sendVerifyCode(phone, () => {
        configureCountdown(60);
        timer = setInterval(() => {
          const countdown = this.props.countdown;
          const res = countdown - 1;

          if (res == 0) {
            configureCountdown(false);
            clearInterval(timer);
          } else {
            configureCountdown(res);
          }
        }, 1000);
      });

    };
    // 手机号和密码改变
    this.changeFieldHandle = (name) => (e) => {
      this.setState({ [ name ]: e.target.value.trim() })
    };
  }

  getRegisterContent = () => {
    const { countdown } = this.props;
    const { phone, verifyCode, password, confirmPassword, sendVerifyCode } = this.state;

    return (
      <div className={ style[ 'wrapper' ] }>
        <div className={ style[ 'wrapper-inner'] }>
          <ul className={ style[ 'form-control'] }>
            <li className={ style.textbox }>
              <Input value={ phone } onChange={ this.changeFieldHandle('phone') } className={ style[ 'textbox-input' ] } placeholder="请输入手机号" />
            </li>
            <li className={ style.textbox }>
              <Input value={ password } onChange={ this.changeFieldHandle('password') } className={ style[ 'textbox-input' ] } placeholder="请输入新密码" />
            </li>
            <li className={ style.textbox }>
              <span className={ style.verifyCode }>
                <Input value={ confirmPassword } onChange={ this.changeFieldHandle('confirmPassword') } className={ style[ 'textbox-input' ] } placeholder="请重复输入新密码" />
              </span>
              <span className={ style[ 'send-verifycode-btn'] }>
                {/* 发送验证码 */}
                <Button loading={ sendVerifyCode } disabled={ countdown } onClick={ this.sendVerifyCodeHandle }>{ countdown ? `还剩(${ countdown })s` : '发送验证码' }</Button>
              </span>
            </li>
            <li className={ style.textbox }>
              <Input value={ verifyCode } onChange={ this.changeFieldHandle('verifyCode') } className={ style[ 'textbox-input' ] } placeholder="请输入验证码" />
            </li>
          </ul>

          <div className={ style['bar-login'] }>
            {/* 注册 */}
            <SubmitButton
              text="注册"
              onSubmitBefore={ this.registerBeforeHandle }
              onSubmit={ this.registerHandle } />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { isShow, width, onClose } = this.props;

    return (
      <Modal
        title="注册"
        wrapClassName="vertical-center-modal"
        footer={ null }
        width={ 360 }
        visible={ isShow }
        onCancel={ onClose }>
        { this.getRegisterContent() }
      </Modal>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isShow) {
      this.setState({
        phone: '',
        verifyCode: '',
        password: '',
        confirmPassword: ''
      });
    }
  }
}

const mapStateToProps = ({ app }) => ({ countdown: app.countdown });

const mapDispatchProps = (dispatch) => bindActionCreators({
  register,
  sendVerifyCode,
  configureCountdown
}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(RegisterPage);
