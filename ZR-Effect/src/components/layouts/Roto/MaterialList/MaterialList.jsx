import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../../../config';
import materialListStyle from './material-list.css';
import MaterialItem from './MaterialItem/MaterialItem';
import MaterialUploadBeforeItem from './MaterialUploadBeforeItem/MaterialUploadBeforeItem';

class MaterialList extends Component {
  state = {
    // 上传进度
    uploadingPercent: 0,
    // 上传结果
    uploadSituation: 0
  };

  // 上传中
  fileUploadingHandle = (percent) =>
    this.setState({ uploadingPercent: percent });

  // 上传成功
  fileUploadSuccessHandle = () =>
    this.setState({
      uploadingPercent: 100,
      uploadSituation: 0
    });

  // 上传失败
  fileUploadFailHandle = () =>
    this.setState({
      uploadingPercent: 100,
      uploadSituation: 1
    });

  getChildComponent() {
    const { materialList } = this.props;

    return materialList.map(material => (
      <div key={ material.id } className={ materialListStyle[ 'list-item' ] }>
        <MaterialItem
          visibleUploadOrDetail={ 0 }
          materialName={ config.getFilenameByPath(material.path) }
          materialThumb={ material.properties.thumbnail } />
      </div>
    ));
  }

  getAddUploadComponent() {
    return (
      <div className={ materialListStyle[ 'list-item' ]}>
        <MaterialUploadBeforeItem
          onUploading={ this.fileUploadingHandle }
          onUploadSuccess={ this.fileUploadSuccessHandle }
          onUploadFail={ this.fileUploadFailHandle } />
      </div>
    );
  }

  getUploadComponent() {
    const { uploadingPercent, uploadSituation } = this.state;

    if (uploadingPercent > 0) {
      
      return (
        <div className={ materialListStyle[ 'list-item' ]}>
          <MaterialItem
            visibleUploadOrDetail={ 1 }
            uploadingPercent={ uploadingPercent }
            uploadSituation={ uploadSituation } />
        </div>
      );
    }

    return null;
  }

  componentWillMount() {
    // 请求素材action

  }

  render() {
    const { uploadingSituation } = this.state;

    return (
      <div className={ materialListStyle[ 'wrapper' ] }>
        <div className={ materialListStyle[ 'list' ] }>
          {/* 增加上传素材项 */}
          { this.getAddUploadComponent() }

          {/* 显示上传状态项 */}
          { this.getUploadComponent() }

          {/* 素材项 */}
          { this.getChildComponent() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ material }) => ({ materialList: material });

export default connect(mapStateToProps)(MaterialList);
