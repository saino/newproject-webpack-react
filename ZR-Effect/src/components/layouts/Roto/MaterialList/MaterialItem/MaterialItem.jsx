import React, { Component } from 'react';
import PropTypes from 'prop-types';
import materialItemStyle from './item.css';
import MaterialCardItem from './MaterialCardItem';
import MaterialUploadFinishItem from './MaterialUploadFinishItem';
import MaterialUploadingItem from './MaterialUploadingItem';

export default class MaterialItem extends Component {
  static propTypes = {
    // 显示上传还是上传详情状态还是上传前，0-详情 | 1-上传
    visibleUploadOrDetail: PropTypes.number,
    // 上传结果
    uploadSituation: PropTypes.number,
    // 上传进度
    uploadingPercent: PropTypes.number,
    // 素材名
    materialName: PropTypes.string,
    // 素材缩略图
    materialThumb: PropTypes.string
  };

  // 计算上传进度
  getUploadingPercentHandle = (percent) => {

  };

  getChildComponent() {
    const {
      visibleUploadOrDetail,
      uploadSituation, uploadingPercent,
      materialName, materialThumb } = this.props;
    let childComponent = null;

    if (visibleUploadOrDetail < 1) {
      childComponent = (<MaterialCardItem name={ materialName } thumb={ materialThumb } />);
    }
    else {
      if (uploadingPercent < 100) {
        childComponent = (<MaterialUploadingItem percent={ uploadingPercent } />)
      } else {
        childComponent = (<MaterialUploadFinishItem situation={ uploadSituation } />);
      }
    }

    return childComponent;
  }

  render() {
    return (
      <div className={ materialItemStyle[ 'wrapper' ] }>
        { this.getChildComponent() }
      </div>
    );
  }
}
