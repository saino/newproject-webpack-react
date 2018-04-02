import React, { Component } from 'react';
import { Progress, Icon } from 'antd';
import itemStyle from './item.css';

export default class MaterialCardItem extends Component {
  uploadHandle = () => {

  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { name, thumb } = this.props;

    return (
      <div className={ itemStyle[ 'wrapper' ] }>
        <div className={ itemStyle[ 'gc-show' ] }>
          <div className={ itemStyle[ 'upload-before' ] }>
            <Icon type="plus" style={{  }} />
            <span>上传素材</span>
          </div>
        </div>
      </div>
    );
  }
}
