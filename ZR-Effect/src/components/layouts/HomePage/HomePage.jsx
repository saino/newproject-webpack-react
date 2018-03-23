import React, { Component } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import style from './style.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="login-panel">

          {/* 登录框 */}
          <LoginPage isShow={ true } width={ 360 } />
        </div>
      </div>
    );
  }
}
