import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import config from '../../../../config';
import defferPerform from '../../../../utils/deffer-perform';
import { normalize } from '../../../../service/format';
import { addMaterialTemp } from '../../../../stores/action-creators/roto-material-temp-creator';
import { getMaterialList } from '../../../../stores/action-creators/roto-material-creator';
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
    const {
      onSelectedRotoMaterial, addMaterialTemp, getMaterialList,
      materialList, materialPage
    } = this.props;
    const { page, perpage } = materialPage;
    const materialId = +material[ 'id' ];
    const deferGetMaterialList = defferPerform(
      () => getMaterialList({ type: 'video', page, perpage}),
      10
    );
    const deferAddMaterialTemp = defferPerform(
      material => {
        if (materialList.length >= perpage) {
          addMaterialTemp(material);
        }
      },
      15
    );
    const deferCheckRotoMaterial = defferPerform(materialId => this.checkMaterialItemHandle(materialId), 30);
    const deferSelectedRotoMaterial = defferPerform(materialId => onSelectedRotoMaterial(materialId), 50);
    const deferUpload = defferPerform(() => {
      this.setState({
        uploadingPercent: 0
      }, () => {
        deferGetMaterialList();
        deferAddMaterialTemp(material);
        deferCheckRotoMaterial(materialId);
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

const mapStateToProps = ({ rotoFrontendActeractive, rotoMaterial }) => ({
  materialList: rotoMaterial.list,
  materialPage: rotoMaterial.pageInfo,
  raf: rotoFrontendActeractive,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMaterialList,
      addRotoMaterial,
      addRoto,
      addMaterialTemp
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialList);
