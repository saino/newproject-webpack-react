import React, { Component } from 'react';
import itemStyle from './item.css';

export default class MaterialCardItem extends Component {
  render() {
    const { name, thumb } = this.props;

    return (
      <div className={ itemStyle[ 'wrapper' ] }>
        <div className={ itemStyle[ 'gc-show' ] }>
          <div>
            <img src={ thumb } />
          </div>
        </div>
        <div className={ itemStyle[ 'detail-show' ] }>{ name }</div>
      </div>
    );
  }
}
