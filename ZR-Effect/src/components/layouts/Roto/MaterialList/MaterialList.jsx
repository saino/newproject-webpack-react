import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import config from '../../../../config';
import defferPerform from '../../../../utils/deffer-perform';
import { uploadMaterial } from '../../../../stores/action-creators/material-creator';
import { addRotoMaterial } from '../../../../stores/action-creators/roto-frontend-acteractive-creator';
import { addRoto } from '../../../../stores/action-creators/roto-creator';
import materialListStyle from './material-list.css';
import MaterialItem from './MaterialItem/MaterialItem';
import MaterialUploadBeforeItem from './MaterialUploadBeforeItem/MaterialUploadBeforeItem';

class MaterialList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 上传进度
      uploadingPercent: 0,
      // 上传结果
      uploadSituation: 0
    };

    // 上传中
    this.fileUploadingHandle = (percent) =>
      this.setState({ uploadingPercent: percent });

    // 上传成功
    this.fileUploadSuccessHandle = (resp) => {
      this.setState({
        uploadingPercent: 100,
        uploadSituation: 0
      });
    };

    // 上传失败
    this.fileUploadFailHandle = () => {
      this.setState({
        uploadingPercent: 100,
        uploadSituation: 1
      }, () => this.uploadMaterial());
    };

    this.checkMaterialItemHandle = materialId => {
      this.addRotoMaterial(materialId);
      this.addRoto(materialId);
    };
  }

  addRotoMaterial(materialId) {
    const { addRotoMaterial } = this.props;

    addRotoMaterial(materialId);
  }

  addRoto(materialId) {
    const { addRoto } = this.props;

    addRoto(materialId, 0);
  }

  uploadMaterial(material) {
    material || (material = {
      "id": new Date().getTime(),
      "user_id": 52938,
      "type": "video",
      "status": 22771,
      "path": "http://ohjdda8lm.bkt.clouddn.com/course/sample1.mp4",
      "properties": {
          "length": 300,
          "time": 60000,
          "thumbnail": "http://img2.imgtn.bdimg.com/it/u=773138821,3059386791&fm=27&gp=0.jpg",
          "width": 640,
          "height": 480
      }
    });
    const { uploadMaterial, onSelectedRotoMaterial } = this.props;
    const deferSelectedRotoMaterial = defferPerform(materialId => onSelectedRotoMaterial(materialId));
    const deferCheckRotoMaterial = defferPerform(materialId => {
      this.checkMaterialItemHandle(materialId);
      deferSelectedRotoMaterial(materialId);
    }, 30);
    const defer = defferPerform(() => {
      this.setState({
        uploadingPercent: 0
      }, () => {
        uploadMaterial(material);
        deferCheckRotoMaterial(material[ 'id' ]);
        deferSelectedRotoMaterial(material[ 'id' ]);
      });
    }, 100);

    defer();
  }

  getChildComponent() {
    const { materialList, raf } = this.props;
    let rotoMaterial = null;

    return materialList.map(material => {
      return (
        <div key={ material.id } className={ materialListStyle[ 'list-item' ] }>
          <MaterialItem
            visibleUploadOrDetail={ 0 }
            materialId={ material.id }
            materialName={ config.getFilenameByPath(material.path) }
            materialThumb={ material.properties.thumbnail }
            onCheck={ this.checkMaterialItemHandle }/>
        </div>
      );
    });
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

const mapStateToProps = ({ material, rotoFrontendActeractive }) => ({
  materialList: material,
  raf: rotoFrontendActeractive
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      uploadMaterial,
      addRotoMaterial,
      addRoto
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialList);
