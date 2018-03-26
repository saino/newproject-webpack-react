import React, { Component } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import style from './style.css';
import config from '../../../config';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowLoginDialog: false,
      isShowRegisterDialog: true
    };

    this.configureDialogHandle = (key, isShowDialog) =>
      this.setState({ [ `isShow${ key }Dialog` ]: isShowDialog });
  }

  render() {
    const { isShowLoginDialog, isShowRegisterDialog } = this.state;

    return (
      <div className="login-panel">
        {/* 登录框 */}
        <LoginPage
          isShow={ isShowLoginDialog }
          width={ config.dialog.width }
          onClose={ () => this.configureLoginDialogHandle('Login', false) } />

        {/* 注册框 */}
        <RegisterPage
          isShow={ isShowRegisterDialog }
          width={ config.dialog.width }
          onClose={ () => this.configureLoginDialogHandle('Register', false) } />
      </div>
    );
  }
}
