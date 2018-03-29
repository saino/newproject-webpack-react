import React, { Component } from 'react';
import footerStyle from './footer.css';

export default class Footer extends Component {
  render() {
    const { style } = this.props;

    return (
      <div className={ footerStyle[ 'wrapper' ] }>
        <div className={ footerStyle[ 'wrapper-inner' ] }>
          <div className={ footerStyle[ 'copyright' ] }>
            <p>copyright©上海致戎网络科技有限公司 | 沪ICP备17003643号</p>
            <p>沪公网安备11010102001980号©上海致戎网络科技有限公司 沪ICP备14002500号</p>
          </div>
          <div className={ footerStyle[ 'logo' ] }></div>
        </div>
      </div>
    );
  }
}
