import React, { Component } from 'react';
import { Avatar } from 'antd';
import style from './header.css';
import logoPNG from './logo.png';

export default class Header extends Component {
  render() {
    return (
      <div className={ style[ 'header-nav' ] }>
          <div className={ style[ 'nav-logo' ] }><img src={ logoPNG }/>LIANGZIVFX</div>
          <a href="#matting" className={ style[ 'nav-btn' ] }>智能抠像</a>
          <a href="#make_effect" className={ style[ 'nav-btn' ] }>特效制作</a>
          <a href="#price_topic" className={ style[ 'nav-btn' ] }>价格方案</a>
          <a href="#help_center" className={ style[ 'nav-btn' ] }>帮助中心</a>
          <a href="#contact_me" className={ style[ 'nav-btn' ] }>联系我们</a>
          <Avatar className={ style[ 'user-img' ] }></Avatar>
      </div>
    );
  }
}
