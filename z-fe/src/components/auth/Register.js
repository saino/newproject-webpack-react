import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Input, Icon, message } from 'antd';
import CustomForm from './CustomForm';
import { fetchStart, fetchEnd } from '../../reducers/app';
import { register } from '../../reducers/user';

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

class Register extends Component {
  static propTypes = {
    onRegister: PropTypes.func.isRequired
  };

  handleRegister = ({ username, newPassword, againNewPassword }) => {
    const { fetchStart, fetchEnd, register, onRegister } = this.props;

    // 将表单验证单独封装成组件，ant design无法做到自定义验证，这里采取的就是用message.error，以后再优化
    if (newPassword !== againNewPassword) {
      message.error('两次密码输入不一致');
      return;
    }

    // 显示请求状态
    fetchStart();

    // 注册
    register(username, newPassword, () => {
      fetchEnd();
      onRegister();
    }, () => {
      fetchEnd();
    });
  };

  render() {
    const { panel, input } = style();
    const { app } = this.props;

    return (
      <div style={ panel }>

        <CustomForm
          isFetching={ app.isFetching }
          okText="注册"
          fieldDecorators={[{
            key: 'username',
            rules: [{
              required: true,
              message: '请输入您的用户名'
            }],
            widget: (<Input prefix={ <Icon type="user" /> } style={ input } placeholder="请输入您的用户名" />)
          }, {
            key: 'newPassword',
            rules: [{
              required: true,
              message: '请输入您的密码'
            }],
            widget: (<Input type="password" prefix={ <Icon type="lock" /> } style={ input } placeholder="请输入您的密码" />)
          }, {
            key: 'againNewPassword',
            rules: [{
              required: true,
              message: '请再次输入您的密码'
            }],
            widget: (<Input type="password" prefix={ <Icon type="lock" /> } style={ input } placeholder="请再次输入您的密码" />)
          }]}
          onSubmit={ this.handleRegister }></CustomForm>

      </div>
    );
  }
}

function mapStateToProps ({ app }) {
  return { app };
}

function mapDispatchToProps (dispatch) {
  return {
    register: bindActionCreators(register, dispatch),
    fetchStart: bindActionCreators(fetchStart, dispatch),
    fetchEnd: bindActionCreators(fetchEnd, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
