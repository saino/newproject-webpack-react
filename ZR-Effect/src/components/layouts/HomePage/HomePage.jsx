import React, { Component } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import style from './style.css';

export default class Home extends Component {
  render() {
    return (
      <div className={ style.wrapper }>
        <div className={ style.wrapperInner }>
          <div className="login-panel">

            {/* 登录框 */}
            <LoginPage isShow={ true } />
          </div>
        </div>
      </div>
    );
  }
}
