import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../../../stores/action-creators/app-creator';
import { clear as clearAiRotos } from '../../../stores/action-creators/roto-ai-creator';
import { clear as clearRotos } from '../../../stores/action-creators/roto-creator';
import { clear as clearRFAs } from '../../../stores/action-creators/roto-frontend-acteractive-creator';
import { clear as clearRotoMaterials } from '../../../stores/action-creators/roto-material-creator';
import { clear as clearRotoTempMaterials } from '../../../stores/action-creators/roto-material-temp-creator';
import { post } from '../../../api/fetch'
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

  loginHandle = () =>
    this.props.onOpenLogin();

  registerHandle = () =>
    this.props.onOpenRegister();

  logoutHandle = () => {
    this.props.logout();

    // 刷新token
    post('/user/refreshToken');

    const { clearAiRotos, clearRotos, clearRFAs, clearRotoMaterials, clearRotoTempMaterials } = this.props;

    // 前端数据清空
    clearAiRotos();
    clearRotos();
    clearRFAs();
    clearRotoMaterials();
    clearRotoTempMaterials();
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
          <NavLink to={{ pathname: "/special-effec", state:{workId: false}}} className={ headerStyle[ 'nav-btn' ] } activeClassName={ headerStyle[ 'active' ] }>
              特效制作
              <div></div>
            </NavLink>
            <NavLink to="/user-center" className={headerStyle['nav-btn']} activeClassName={headerStyle['active']}>
              个人中心
              <div></div>
            </NavLink>
            <a href="javascript:;" className={ headerStyle[ 'nav-btn-disabled' ] }>价格方案</a>
            <a href="javascript:;" className={ headerStyle[ 'nav-btn-disabled' ] }>帮助中心</a>
            <a href="javascript:;" className={ headerStyle[ 'nav-btn-disabled' ] }>联系我们</a>

            <div className={ headerStyle[ 'user-control-bar' ] }>
              { isLogined ? (
                  <div>
                    <a className={ headerStyle[ 'logout' ] } onClick={ this.logoutHandle }>退出</a>
                    <Avatar className={ headerStyle[ 'user-img' ] }></Avatar>
                  </div>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    logout,
    clearAiRotos,
    clearRotos,
    clearRFAs,
    clearRotoMaterials,
    clearRotoTempMaterials
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
