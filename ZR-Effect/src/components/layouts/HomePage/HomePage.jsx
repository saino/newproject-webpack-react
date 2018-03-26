import React, { Component } from 'react';
import config from '../../../config';
import style from './style.css';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Header from '../../containers/Header/Header';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowLoginDialog: false,
      isShowRegisterDialog: false
    };

    this.configureDialogHandle = (key, isShowDialog) =>
      this.setState({ [ `isShow${ key }Dialog` ]: isShowDialog });
  }

  render() {
    const { isShowLoginDialog, isShowRegisterDialog } = this.state;

    return (
      <div className="form-panel">
        {/* 头部导航 */}
        <Header />

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
