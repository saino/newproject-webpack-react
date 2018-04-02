import React, { Component } from 'react';
import PropTypes from 'prop-types';
import materialItemStyle from './item.css';
import MaterialCardItem from './MaterialCardItem';
import MaterialUploadingItem from './MaterialUploadingItem';
import MaterialUploadFinishItem from './MaterialUploadFinishItem';
import MaterialUploadBeforeItem from './MaterialUploadBeforeItem';

export default class MaterialItem extends Component {
  static propTypes = {
    // 显示上传还是上传详情状态还是上传前，0-上传前 | 1-上传 | 2-详情
    visibleUploadOrDetail: PropTypes.number,
    // 素材名
    materialName: PropTypes.string,
    // 素材缩略图
    materialThumb: PropTypes.string
  };

  state = {
    // 上传进度
    uploadingPercent: 0
  };

  getChildComponent() {
    const { visibleUploadOrDetail, materialName, materialThumb } = this.props;
    const { uploadingPercent } = this.state;
    let childComponent = null;

    if (visibleUploadOrDetail > 1) {
      childComponent = (<MaterialCardItem name={ materialName } thumb={ materialThumb } />);
    }
    else if (!visibleUploadOrDetail) {
      childComponent = (<MaterialUploadBeforeItem />);
    }
    else {
      if (uploadingPercent < 100) {
        childComponent = (<MaterialUploadingItem percent={ uploadingPercent } />)
      } else {
        childComponent = (<MaterialUploadFinishItem />);
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
