import React, { Component } from 'react';
import { Progress } from 'antd';
import itemStyle from './item.css';

export default class MaterialCardItem extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.percent !== this.props.percent;
  }
  render() {
    const { percent } = this.props;

    return (
      <div className={ itemStyle[ 'wrapper' ] }>
        <div className={ `${ itemStyle[ 'gc-show' ] } ${ itemStyle[ 'up' ] }` }>
          <div>
            <Progress percent={ percent } />
          </div>
        </div>
        <div className={ itemStyle[ 'detail-show' ] }>正在上传...</div>
      </div>
    );
  }
}
