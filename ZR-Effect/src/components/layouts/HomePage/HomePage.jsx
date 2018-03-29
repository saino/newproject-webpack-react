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

export default class HomePage extends Component {
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
          <div className={ style[ 'header' ] }>
            <Header
              onOpenLogin={ () => this.configureDialogHandle('Login', true) }
              onOpenRegister={ () => this.configureDialogHandle('Register', true) } />
          </div>

          {/* banner */}
          <Banner />

          {/* 产品介绍 */}
          <ProductIntro />

          {/* 产品介绍icon展示 */}
          <ProductIntroImg />

          {/* 产品介绍详情 */}
          <ProductIntroDetail />

          {/* 尾部 */}
          <div className={ style[ 'footer' ] }>
            <Footer />
          </div>

          <div className={ style[ 'form-panel' ] }>
            {/* 登录框 */}
            <LoginPage
              isShow={ isShowLoginDialog }
              width={ config.dialog.width }
              onClose={ () => this.configureDialogHandle('Login', false) } />

            {/* 注册框 */}
            <RegisterPage
              isShow={ isShowRegisterDialog }
              width={ config.dialog.width }
              onClose={ () => this.configureDialogHandle('Register', false) } />
          </div>
        </div>
    );
  }
}
