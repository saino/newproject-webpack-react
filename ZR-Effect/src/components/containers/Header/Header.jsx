import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import headerStyle from './header.css';
import logoPNG from './logo.png';

class Header extends Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
    onOpenLogin: PropTypes.func.isRequired,
    onOpenRegister: PropTypes.func.isRequired
  };

  loginHandle = () => {
    this.props.onOpenLogin();
  };

  registerHandle = () => {
    this.props.onOpenRegister();
  };

  render() {
    const { style, token } = this.props;
    const isLogined = !!token;

    return (
      <div className={ headerStyle[ 'header' ] } style={ style }>
        <div className={ headerStyle[ 'header-nav' ] }>
            <Link to="/" className={ headerStyle[ 'nav-logo' ] }>
              <img src={ logoPNG }/>
            </Link>
            <Link to="/matting" className={ headerStyle[ 'nav-btn' ] }>智能抠像</Link>
            <Link to="/special-effec" className={ headerStyle[ 'nav-btn' ] }>特效制作</Link>
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
