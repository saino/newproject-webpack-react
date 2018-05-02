import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import headerStyle from './header.css';
import logoPNG from './logo.png';

class Header extends Component {
  static propTypes = {
    onOpenLogin: PropTypes.func,
    onOpenRegister: PropTypes.func,
    activeIndex: PropTypes.number
  };

  static defaultProps = {
    activeIndex: 0
  };

  loginHandle = () => {
    this.props.onOpenLogin();
  };

  registerHandle = () => {
    this.props.onOpenRegister();
  };

  render() {
    const { token, activeIndex } = this.props;
    const isLogined = !!token;

    return (
      <div className={ headerStyle[ 'header' ] }>
        <div className={ headerStyle[ 'header-nav' ] }>
            <NavLink to="/" className={ headerStyle[ 'nav-logo' ] }>
              <img src={ logoPNG }/>
            </NavLink>
            <NavLink to="/roto" className={ headerStyle[ 'nav-btn' ] } activeClassName={ headerStyle[ 'active' ] }>
              智能抠像
              <div></div>
            </NavLink>
            <NavLink to="/special-effec" className={ headerStyle[ 'nav-btn' ] } activeClassName={ headerStyle[ 'active' ] }>
              特效制作
              <div></div>
            </NavLink>
            <a href="javascript:;" className={ headerStyle[ 'nav-btn-disabled' ] }>价格方案</a>
            <a href="javascript:;" className={ headerStyle[ 'nav-btn-disabled' ] }>帮助中心</a>
            <a href="javascript:;" className={ headerStyle[ 'nav-btn-disabled' ] }>联系我们</a>

            <div className={ headerStyle[ 'user-control-bar' ] }>
              { isLogined ? (
                  <Avatar className={ headerStyle[ 'user-img' ] }></Avatar>
                ) : (
                  <ul className={ headerStyle[ 'user-auth' ] }>
                    <li>
                      <a href="javascript:;" onClick={ this.loginHandle }>登录LOGIN</a>
                    </li>
                    <li>|</li>
                    <li>
                      <a href="javascript:;" onClick={ this.registerHandle }>注册SIGN UP</a>
                    </li>
                  </ul>
                )
              }
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => ({ token: app.token });

export default connect(mapStateToProps)(Header);
