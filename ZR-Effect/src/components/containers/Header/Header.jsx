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
            <a href="#matting" className={ headerStyle[ 'nav-btn' ] }>智能抠像</a>
            <a href="#make_effect" className={ headerStyle[ 'nav-btn' ] }>特效制作</a>
            <a href="javascript:;" className={ headerStyle[ 'nav-btn-disabled' ] }>价格方案</a>
            <a href="javascript:;" className={ headerStyle[ 'nav-btn-disabled' ] }>帮助中心</a>
            <a href="javascript:;" className={ headerStyle[ 'nav-btn-disabled' ] }>联系我们</a>

            <div className={ headerStyle[ 'user-control-bar' ] }>
              { isLogined ? (
                  <Avatar className={ headerStyle[ 'user-img' ] }></Avatar>
                ) : (
                  <ul className={ headerStyle[ 'user-auth' ] }>
                    <li>
                      <a href="javascript:;">登录LOGIN</a>
                    </li>
                    <li>|</li>
                    <li>
                      <a href="javascript:;">注册SIGN UP</a>
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
