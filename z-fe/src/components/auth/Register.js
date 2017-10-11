import React, { Component } from 'react';
import { Button, Input, Icon } from 'antd';
import CustomForm from './CustomForm';
import style from './style.css';

export default class Register extends Component {
  handleRegister = () => {
    alert('开始注册');
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
          }, {
            key: 'again_password',
            rules: [{
              required: true,
              message: '请再次输入您的密码'
            }],
            widget: (<Input prefix={ <Icon type="lock" /> } className={ style.input } defaultValue="请再次输入您的密码" />)
          }]}
          onSubmit={ this.handleRegister }></CustomForm>

      </div>
    );
  }
}
