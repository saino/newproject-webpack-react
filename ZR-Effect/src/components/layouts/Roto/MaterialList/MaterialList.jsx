import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import config from '../../../../config';
import { post } from '../../../../api/fetch';
import defferPerform from '../../../../utils/deffer-perform';
import { findItem } from '../../../../utils/array-handle';
import { normalize } from '../../../../service/format';
import { addMaterialTemp } from '../../../../stores/action-creators/roto-material-temp-creator';
import { getMaterialList, removeMaterial } from '../../../../stores/action-creators/roto-material-creator';
import { addRotoMaterial } from '../../../../stores/action-creators/roto-frontend-acteractive-creator';
import { message } from 'antd';
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
        uploadingPercent: 101,
        uploadSituation: 0
      }, () => this.uploadMaterial(resp[ 'data' ]));
    };

    // 上传失败
    this.fileUploadFailHandle = () => {
      this.setState({
        uploadingPercent: 101,
        uploadSituation: 1
      });
    };

    // 选中素材
    this.checkMaterialItemHandle = (materialId, materialName) => {
      this.addRotoMaterial(materialId, materialName);
      this.addRoto(materialId);
    };

    // 删除素材
    this.removeMaterialHandle = materialId => {
      const { removeMaterial, raf } = this.props;
      const isLiveRotoMaterial = !!findItem(raf, 'material_id', materialId);

      if (isLiveRotoMaterial) {
        message.warning('该素材已被添加进抠像中了，不能直接删除!!!');
        return;
      }

      removeMaterial(materialId);
    };
  }

  addRotoMaterial(materialId, materialName) {
    const { addRotoMaterial, raf } = this.props;

    // 这里不能按照数组去重冗余的方法，因为抠像素材
    if (!findItem(raf, 'material_id', materialId)) {
      addRotoMaterial(materialId, materialName);
    }
  }

  addRoto(materialId) {
    const { addRoto, rotoList } = this.props;

    // 同添加抠像素材一样不能直接用基础库的去重
    if (!findItem(rotoList, 'material_id', materialId)) {
      addRoto(materialId, 0);  
    }
  }

  uploadMaterial(material) {
    const {
      onSelectedRotoMaterial, addMaterialTemp, getMaterialList,
      materialList, materialPage, saveRoto
    } = this.props;
    const { page, perpage } = materialPage;
    const materialId = +material[ 'id' ];
    const materialName = material[ 'name' ];
    const deferAddMaterialTemp = defferPerform(
      material => {
        if (materialList.length >= perpage) {
          addMaterialTemp(material);
        }
      },
      15
    );
    const deferCheckRotoMaterial = defferPerform((materialId, materialName) => this.checkMaterialItemHandle(materialId, materialName), 30);
    const deferSelectedRotoMaterial = defferPerform(materialId => onSelectedRotoMaterial(materialId), 60);
    const deferUpload = defferPerform(() => {
      this.setState({
        uploadingPercent: 0
      }, () => {
        getMaterialList({ type: 'video', page, perpage});
        deferAddMaterialTemp(material);
        deferCheckRotoMaterial(materialId, materialName);
        deferSelectedRotoMaterial(materialId);
      });
    }, 100);

    deferUpload();
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
            materialName={ material.name }
            onRemoveMaterial={ this.removeMaterialHandle }
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
    const { getMaterialList, materialPage } = this.props;
    const { page, perpage } = materialPage;

    getMaterialList({
      type: 'video',
      page,
      perpage
    });
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

const mapStateToProps = ({ rotoFrontendActeractive, rotoMaterial, roto }) => ({
  materialList: rotoMaterial.list,
  materialPage: rotoMaterial.pageInfo,
  raf: rotoFrontendActeractive,
  rotoList: roto
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMaterialList,
      removeMaterial,
      addRotoMaterial,
      addRoto,
      addMaterialTemp
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialList);
