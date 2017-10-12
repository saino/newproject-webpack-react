import React, { Component } from 'react';
import { Button, Input, Icon } from 'antd';
import CustomForm from './CustomForm';

const style = () => ({

  panel: {
    padding: '15px 60px',
    background: '#fff'
  },

  input: {
    fontSize: 13,
    height: 38
  }

});

export default class Login extends Component {
  handleLogin = () => {
    alert('开始登录');
  };

  render() {
    const { panel, input } = style();

    return (
      <div style={ panel }>

        <CustomForm
          okText="登录"
          fieldDecorators={[{
            key: 'username',
            rules: [{
              required: true,
              message: '请输入您的用户名'
            }],
            widget: (<Input prefix={ <Icon type="user" /> } style={ input } placeholder="请输入您的用户名" />)
          }, {
            key: 'password',
            rules: [{
              required: true,
              message: '请输入您的密码'
            }],
            widget: (<Input prefix={ <Icon type="lock" /> } style={ input } placeholder="请输入您的密码" />)
          }]}
          onSubmit={ this.handleLogin }></CustomForm>

      </div>
    );
  }
}
