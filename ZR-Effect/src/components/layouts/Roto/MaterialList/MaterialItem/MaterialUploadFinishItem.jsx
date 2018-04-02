import React, { Component } from 'react';
import { Progress } from 'antd';
import itemStyle from './item.css';

export default class MaterialCardItem extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { name, thumb } = this.props;

    return (
      <div className={ itemStyle[ 'wrapper' ] }>
        <div className={ itemStyle[ 'gc-show' ] }>
          <div>
            <Progress percent={ 100 } />
          </div>
        </div>
        <div className={ itemStyle[ 'detail-show' ] }>完成，已同步到我的云</div>
      </div>
    );
  }
}
