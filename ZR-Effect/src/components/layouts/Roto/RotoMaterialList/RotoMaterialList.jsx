import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from '../../../../config';
import { findItem } from '../../../../utils/array-handle';
import defferPerform from '../../../../utils/deffer-perform';
import rotoMaterialListStyle from './roto-material-list.css';
import { selectedRotoMaterial, cancelSelectedRotoMaterial, removeRotoMaterial } from '../../../../stores/action-creators/roto-frontend-acteractive-creator';
import addMaterialPNG from './add-material.png';
import videoPNG from './video.png';
import deletePNG from './delete.png';

class RotoMaterialList extends Component {
  constructor(props) {
    super(props);

    // 延迟10毫秒跳转到显示帧图片组件
    this.switchToVisibleFrameImg = defferPerform(() => {
      const { onOpenVisibleFrameImg } = this.props;

      onOpenVisibleFrameImg();
    }, 10);

    // 延迟10毫秒跳转到扣像列表组件
    this.switchToMaterialList = defferPerform(() => {
      const { onOpenMaterialList } = this.props;

      onOpenMaterialList();
    }, 10);

    // 延迟10毫秒选中扣像素材
    this.selectedRotoMaterial = defferPerform(materialId => {
      const { selectedRotoMaterial } = this.props;

      this.switchToVisibleFrameImg();
      selectedRotoMaterial(materialId);
    }, 10);

    this.openMaterialListHandle = () => {
      const { cancelSelectedRotoMaterial } = this.props;

      this.switchToMaterialList();
      cancelSelectedRotoMaterial();
    };

    this.selectedRotoMaterialHandle = (materialId) => () => {
      const { cancelSelectedRotoMaterial } = this.props;

      this.selectedRotoMaterial(materialId);
      cancelSelectedRotoMaterial();
    };

    this.removeRotoMaterialHandle = (materialId) => (e) => {
      const { removeRotoMaterial } = this.props;

      removeRotoMaterial(materialId);

      e.preventDefault();
      e.stopPropagation();
    };
  }

  getMaterialComponents() {
    const { rfa, materialList } = this.props;
    let material, materialId;

    return rfa.map(item => {
      material = findItem(materialList, 'id', item[ 'material_id' ]);
      materialId = item[ 'material_id' ];

      return (
        <li
          key={ materialId }
          className={ `${ rotoMaterialListStyle[ 'material-list-item' ] } ${ item[ 'is_selected' ] ? rotoMaterialListStyle[ 'active' ] : '' }`}
          onClick={ this.selectedRotoMaterialHandle(materialId) }>
          <div className={ rotoMaterialListStyle[ 'thum-warp' ] }>
            <div className={ rotoMaterialListStyle[ 'thum-icon' ] }>
              <img src={ videoPNG } />
            </div>
            { config.getFilenameByPath(material.path) }
          </div>
          <div onClick={ this.removeRotoMaterialHandle(materialId) }>
            <img src={ deletePNG } />
          </div>
          <div className={ rotoMaterialListStyle[ 'bottom-line' ] }></div>
        </li>
      )}
    );
  }

  render() {
    return (
      <div className={ rotoMaterialListStyle[ 'wrapper' ] }>
        <div className={ rotoMaterialListStyle[ 'material-add' ] } onClick={ this.openMaterialListHandle }>
          抠像素材
          <img src={ addMaterialPNG } />
        </div>
        <div className={ rotoMaterialListStyle[ 'material-list' ] }>
          <ul className={ rotoMaterialListStyle[ 'material-list-inner' ] }>
            { this.getMaterialComponents() }
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  rotoFrontendActeractive,
  material
}) => ({
  rfa: rotoFrontendActeractive,
  materialList: material
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    selectedRotoMaterial,
    cancelSelectedRotoMaterial,
    removeRotoMaterial
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RotoMaterialList);
