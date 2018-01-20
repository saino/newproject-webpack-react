import React, { Component } from 'react';
import logoPNG from '../../statics/logo.png';

const style = () => ({

  root: {
    background: '#359fd5',
    color: '#fff',
    padding: '26px 0 33px',
    fontSize: 12
  },

  rootInner: {
    width: 1170,
    height: 63,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },

  companyIntro: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  companyIntroFlag: {
    display: 'flex',
    alignItems: 'center'
  },
  companyIntroFlagImg: {
    display: 'block',
    width: 38,
    height: 33,
    verticalAlign: 'middle'
  },
  companyIntroFlagText: {
    fontSize: 20,
    marginLeft: 10,
    verticalAlign: 'middle'
  },

  companyCroxy: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    textAlign: 'right'
  },
  companyCroxyFlag: {
    fontSize: 13
  },
  companyCroxyFlagItem: {
    display: 'inline-block',
    marginLeft: 35
  },
  companyCroxyFlagItemText: {
    marginLeft: 14
  }

});

export default class Footer extends Component {
  render() {
    const {
      root, rootInner,
      companyIntro, companyIntroFlag, companyIntroFlagImg, companyIntroFlagText,
      companyCroxy, companyCroxyFlag, companyCroxyFlagItem, companyCroxyFlagItemText } = style();

    return (
      <div id='about' style={ root }>
        <div style={ rootInner }>

          <div style={ companyIntro }>
            <div style={ companyIntroFlag }>
              <img src={ logoPNG } style={ companyIntroFlagImg } />
              <span style={ companyIntroFlagText }>LIANGZIVFX</span>
            </div>
            <div>沪公网安备110110203002030442号 © 上海致戎网络科技有限公司 沪ICP备14002500号</div>
          </div>

          <div style={ companyCroxy }>
            <ul style={ companyCroxyFlag }>
              <li style={ companyCroxyFlagItem }>
                &gt;<span style={ companyCroxyFlagItemText }>关于我们</span>
              </li>
              <li style={ companyCroxyFlagItem }>
                &gt;<span style={ companyCroxyFlagItemText }>联系我们</span>
              </li>
              <li style={ companyCroxyFlagItem }>
                &gt;<span style={ companyCroxyFlagItemText }>加入我们</span>
              </li>
              <li style={ companyCroxyFlagItem }>
                &gt;<span style={ companyCroxyFlagItemText }>隐私声明</span>
              </li>
              <li style={ companyCroxyFlagItem }>
                &gt;<span style={ companyCroxyFlagItemText }>用户协议</span>
              </li>
            </ul>
            <div>Copy Right © 2011 - 2018 上海致戎网络科技有限公司   沪ICP备17003463号</div>
          </div>

        </div>
      </div>
    );
  }
}
