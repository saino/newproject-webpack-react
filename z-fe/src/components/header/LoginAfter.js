import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginAfter extends Component {
  static propTypes = {
    userInfo: PropTypes.object
  };
  static defaultProps = {
    userInfo: {}
  };

  render() {
    const { userInfo } = this.props;

    return (
      <div>欢迎您，{ userInfo.nickname }</div>  
    );
  }
}
