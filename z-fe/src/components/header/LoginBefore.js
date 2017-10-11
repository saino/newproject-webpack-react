import React, { Component } from 'react';
import style from './style.css';

export default class LoginBefore extends Component {
  render() {
    return (
      <div>
        <button className={ style.btn }>登录</button>
        <button className={ style.btn }>注册</button>
      </div>
    );
  }
}
