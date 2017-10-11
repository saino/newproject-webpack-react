import React, { Component } from 'react';
import { Button, Input, Icon } from 'antd';
import CustomForm from './CustomForm';
import style from './style.css';

export default class Login extends Component {
  handleLogin = () => {
    alert('开始登录');
  };

  render() {
    return (
      <div className={ style.panel }>

        <CustomForm
          fieldDecorators={[{
            key: 'username',
            rules: [{
              required: true,
              message: '请输入您的用户名'
            }],
            widget: (<Input prefix={ <Icon type="user" /> } className={ style.input } defaultValue="请输入您的用户名" />)
          }, {
            key: 'password',
            rules: [{
              required: true,
              message: '请输入您的密码'
            }],
            widget: (<Input prefix={ <Icon type="lock" /> } className={ style.input } defaultValue="请输入您的密码" />)
          }]}
          onSubmit={ this.handleLogin }></CustomForm>

      </div>
    );
  }
}
