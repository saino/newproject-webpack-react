import React, { Component } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import style from './style.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true
    };

    this.configureLoginDialogHandle = (isShow) =>
      this.setState({ isShow });
  }

  render() {
    const { isShow } = this.state;

    return (
      <div>
        <div className="login-panel">
          {/* 登录框 */}
          <LoginPage
            isShow={ isShow }
            width={ 360 }
            onClose={ () => this.configureLoginDialogHandle(false) } />
        </div>
      </div>
    );
  }
}
