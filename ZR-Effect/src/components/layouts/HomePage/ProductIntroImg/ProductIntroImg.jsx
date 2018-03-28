import React, { Component } from 'react';
import productIntroStyle from './product-intro-img.css';
import cxPNG from './cx.png';
import gxPNG from './gx.png';
import rhPNG from './rh.png';
import znPNG from './zn.png';

export default class ProductIntroImg extends Component {
  render() {
    return (
      <div className={ productIntroStyle[ 'wrapper' ] }>
        <div className={ productIntroStyle[ 'wrapper-inner' ] }>
          <ul>
            <li>
              <div>
                <span>
                  <img src={ znPNG } />
                </span>
                <i>智能</i>
                <p>一键化智能元素提取</p>
              </div>
            </li>
            <li>
              <div>
                <span>
                  <img src={ gxPNG } />
                </span>
                <i>高效</i>
                <p>效率提升10倍</p>
                <p>流程简化10倍+、学习曲线降低10倍</p>
              </div>
            </li>
            <li>
              <div>
                <span>
                  <img src={ rhPNG } />
                </span>
                <i>融合</i>
                <p>“0”门槛，低学习曲线</p>
              </div>
            </li>
            <li>
              <div>
                <span>
                  <img src={ cxPNG } />
                </span>
                <i>创新</i>
                <p>海量影视级素材，激发创意</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
