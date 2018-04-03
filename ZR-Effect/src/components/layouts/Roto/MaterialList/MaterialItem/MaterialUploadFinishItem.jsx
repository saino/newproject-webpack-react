import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import itemStyle from './item.css';

export default class MaterialCardItem extends Component {
  static propTypes = {
    // 完成情况 0-成功 | 1-失败
    situation: PropTypes.number
  };

  static defaultProps = {
    situation: 0
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.situation !== this.props.situation;
  }

  render() {
    const { situation } = this.props;
    const isSuccess = situation < 1;
    console.log(isSuccess, situation, 'dd');
    return (
      <div className={ itemStyle[ 'wrapper' ] }>
        <div className={ itemStyle[ 'gc-show' ] }>
          <div>
            <Progress percent={ 100 } status={ isSuccess ? 'success' : 'exception' }/>
          </div>
        </div>
        <div className={ itemStyle[ 'detail-show' ] }>{ isSuccess ? '完成，已同步到我的云' : '上传失败，请重新上传' }</div>
      </div>
    );
  }
}
