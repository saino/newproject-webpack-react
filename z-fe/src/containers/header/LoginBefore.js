import React, { Component } from 'react';
import PropTypes from 'prop-types';

const style = () => ({

  root: {
    display: 'inline-block',
    padding: '8px 20px',
    margin: '0 10px',
    color: '#fff',
    textDecoration: 'none',
    boxSizing: 'border-box',
    lineHeight: '1',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent'
  },

  active: {
    borderColor: '#ff6b00',
    color: '#ff6b00',
    borderRadius: 20
  }

});

export default class LoginBefore extends Component {
  static propTypes = {
    onOpenLoginForm: PropTypes.func.isRequired,
    onOpenRegisterForm: PropTypes.func.isRequired
  };
  state = {
    activeIndex: 0
  };

  handleOpenLoginForm = e => {
    this.setState({ activeIndex: 0 });
    this.props.onOpenLoginForm();
    e.preventDefault();
  };

  handleOpenRegisterForm = e => {
    this.setState({ activeIndex: 1 });
    this.props.onOpenRegisterForm();
    e.preventDefault();
  };

  render() {
    const { root, active } = style();
    const { activeIndex } = this.state;

    return (
      <div>
        <a style={ !activeIndex ? { ...root, ...active } : root } onClick={ this.handleOpenLoginForm }>登录</a>
        <a style={ activeIndex ? { ...root, ...active }: root } onClick={ this.handleOpenRegisterForm }>注册</a>
      </div>
    );
  }
}
