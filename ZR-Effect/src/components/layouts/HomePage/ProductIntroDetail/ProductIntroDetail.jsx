import React, { Component } from 'react';
import productIntroDetailStyle from './product-intro-detail.css';
import actionPNG from './intro-action.png';
import mattingPNG from './intro-matting.png';
import mattingAnimatePNG from './intro-matting-animate.png';

export default class ProductIntroDetail extends Component {
  render() {
    return (
      <div className={ productIntroDetailStyle[ 'wrapper' ] }>
        <div className={ productIntroDetailStyle[ 'wrapper-inner' ] }>
          <ul className={ productIntroDetailStyle[ 'list' ] }>
            <li className={ productIntroDetailStyle[ 'item' ] }>
              <div className={ productIntroDetailStyle[ 'item-txt-show' ] }>
                <h3>大幅度动作展示</h3>
                <p>大范围的移动，精准连续扣像</p>
              </div>
              <div className={ productIntroDetailStyle[ 'item-img-show480' ] }>
                <img src={ actionPNG } />
              </div>
            </li>
            <li className={ productIntroDetailStyle[ 'item' ] }>
              <div className={ productIntroDetailStyle[ 'item-img-show420' ] }>
                <img src={ mattingPNG } />
              </div>
              <div className={ productIntroDetailStyle[ 'item-txt-show' ] }>
                <h3 className={ productIntroDetailStyle[ 'tright' ] }>复杂背景扣像展示</h3>
                <p className={ productIntroDetailStyle[ 'tright' ] }>镜面复杂背景，植入高反差纯色背景</p>
              </div>
            </li>
            <li className={ productIntroDetailStyle[ 'item' ] }>
              <div className={ productIntroDetailStyle[ 'item-txt-show' ] }>
                <h3>动画扣像展示</h3>
                <p>镜面复杂背景，植入高反差纯色背景多形态动漫角色<br />进行精准扣像</p>
              </div>
              <div className={ productIntroDetailStyle[ 'item-img-show420' ] }>
                <img src={ mattingAnimatePNG } />
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
