import React, { Component } from 'react';
import productIntroStyle from './product-intro.css';

export default class ProductIntro extends Component {
  render() {
    return (
      <div className={ productIntroStyle[ 'intro-wrapper' ] }>
        <div className={ productIntroStyle[ 'intro-wrapper-inner' ] }>
          <h3>产品介绍</h3>
          <p>
            &nbsp;&nbsp;量子特效是一款强大的影视级视频特效制作工具，基于AI人工智能技术和神经网络，将传统影视制作效率提升百倍，          
          </p>
          <p>
            小白用户免学习即可快速制作影视级效果的互联网短视频，解放短视频制作者束缚，发散思维，完成小视频的大制作。
          </p>
        </div>
      </div>
    );
  }
}
