import React, { Component } from 'react';
import config from '../../../config';
import style from './style.css';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';
import Banner from './Banner/Banner';
import ProductIntro from './ProductIntro/ProductIntro';
import ProductIntroImg from './ProductIntroImg/ProductIntroImg';
import ProductIntroDetail from './ProductIntroDetail/ProductIntroDetail';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowLoginDialog: false,
      isShowRegisterDialog: false
    };

    this.configureDialogHandle = (key, isShowDialog) =>
      this.setState({[ `isShow${ key }Dialog` ]: isShowDialog });
  }

  render() {
    const { isShowLoginDialog, isShowRegisterDialog } = this.state;

    return (
      <div className={ style[ 'home-wrapper' ] }>
        {/* 头部导航 */}
        <Header style={{ height: 50, background: 'rgba(4, 6, 11, .2)' }} />

        {/* banner */}
        <Banner />

        {/* 产品介绍 */}
        <ProductIntro />

        {/* 产品介绍icon展示 */}
        <ProductIntroImg />

        {/* 产品介绍详情 */}
        <ProductIntroDetail />

        {/* 尾部 */}
        <Footer style={{ backgroundImage: 'radial-gradient(ellipse farthest-corner at 0 0, #011f27 50%, #04060b 1450%)' }} />

        <div className={ style[ 'form-panel' ] }>
          {/* 登录框 */}
          <LoginPage
            isShow={ isShowLoginDialog }
            width={ config.dialog.width }
            onClose={ () => this.configureLoginDialogHandle('Login', false) } />

          {/* 注册框 */}
          <RegisterPage
            isShow={ isShowRegisterDialog }
            width={ config.dialog.width }
            onClose={ () => this.configureLoginDialogHandle('Register', false) } />
        </div>
      </div>
    );
  }
}
