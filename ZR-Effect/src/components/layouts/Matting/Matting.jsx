import React, { Component } from 'react';
/* 路由跳转前验证 -- start */
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
/* 路由跳转前验证 -- end */

class Matting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 检测是否存在该用户信息的state
      redirectToReferrer: props.token == null
    };
  }

  render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to="/" />
      );
    }

    return null;
  }
}

const mapStateToProps = ({ app }) => ({ token: app.token });

export default connect(mapStateToProps)(Matting);
