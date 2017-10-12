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

export default class Register extends Component {
  handleRegister = () => {
    alert('开始注册');
  };

  render() {
    const { panel, input } = style();

    return (
      <div style={ panel }>

        <CustomForm
          okText="注册"
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
          }, {
            key: 'again_password',
            rules: [{
              required: true,
              message: '请再次输入您的密码'
            }],
            widget: (<Input prefix={ <Icon type="lock" /> } style={ input } placeholder="请再次输入您的密码" />)
          }]}
          onSubmit={ this.handleRegister }></CustomForm>

      </div>
    );
  }
}
