import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Input, Icon } from 'antd';
import { fetchStart, fetchEnd } from '../../reducers/app';
import { login } from '../../reducers/user';
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

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  handleLogin = ({ username, password }) => {
    const { fetchStart, fetchEnd, login, onLogin } = this.props;

    // 请求后端中，显示请求状态
    fetchStart();

    // 登录操作
    login(username, password, () => {
      // 登录成功，删除请求状态
      fetchEnd();
      onLogin();
    }, () => {
      // 登录失败，删除请求状态
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
            widget: (<Input type="password" prefix={ <Icon type="lock" /> } style={ input } placeholder="请输入您的密码" />)
          }]}
          onSubmit={ this.handleLogin }></CustomForm>

      </div>
    );
  }
}

function mapStateToProps ({ app }) {
  return { app };
}

function mapDispatchToProps (dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
    fetchStart: bindActionCreators(fetchStart, dispatch),
    fetchEnd: bindActionCreators(fetchEnd, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
