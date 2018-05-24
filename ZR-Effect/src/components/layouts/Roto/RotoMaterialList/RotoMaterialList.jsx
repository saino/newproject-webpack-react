import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from '../../../../config';
import { findItem, findIndex } from '../../../../utils/array-handle';
import defferPerform from '../../../../utils/deffer-perform';
import rotoMaterialListStyle from './roto-material-list.css';
import { cancelSelectedRotoMaterial, removeRotoMaterial } from '../../../../stores/action-creators/roto-frontend-acteractive-creator';
import { removeRotos } from '../../../../stores/action-creators/roto-creator';
import addMaterialPNG from './add-material.png';
import videoPNG from './video.png';
import deletePNG from './delete.png';

class RotoMaterialList extends Component {
  constructor(props) {
    super(props);

    // 延迟10毫秒跳转到素材列表组件
    this.switchToMaterialList = defferPerform(() => {
      const { onOpenMaterialList } = this.props;

      onOpenMaterialList();
    }, 10);

    this.openMaterialListHandle = () => {
      const { cancelSelectedRotoMaterial } = this.props;

      this.switchToMaterialList();
      cancelSelectedRotoMaterial();
    };

    this.selectedRotoMaterialHandle = (materialId) => () => {
      const { onSelectedRotoMaterial } = this.props;

      onSelectedRotoMaterial(materialId);
    };

    this.removeRotoMaterialHandle = (materialId) => (e) => {
      const { removeRotoMaterial, removeRotos } = this.props;

      removeRotoMaterial(materialId);
      removeRotos(materialId);

      e.preventDefault();
      e.stopPropagation();
    };
  }

  getMaterialComponents() {
    const { rfa } = this.props;
    let materialId, materialName;

    return rfa.map(item => {
      materialId = item[ 'material_id' ];
      materialName = item[ 'material_name' ];

      return (
        <li
          key={ materialId }
          className={ `${ rotoMaterialListStyle[ 'material-list-item' ] } ${ item[ 'is_selected' ] ? rotoMaterialListStyle[ 'active' ] : '' }`}
          onClick={ this.selectedRotoMaterialHandle(materialId) }>
          <div className={ rotoMaterialListStyle[ 'thum-warp' ] }>
            <div className={ rotoMaterialListStyle[ 'thum-icon' ] }>
              <img src={ videoPNG } />
            </div>
            { materialName }
          </div>
          <div onClick={ this.removeRotoMaterialHandle(materialId) }>
            <img src={ deletePNG } />
          </div>
          <div className={ rotoMaterialListStyle[ 'bottom-line' ] }></div>
        </li>
      )}
    );
  }

  validateIsRender(prevList, nextList) {
    return prevList.length !== nextList.length
      || findIndex(prevList, item => item[ 'is_selected' ] === true) !== findIndex(nextList, item => item[ 'is_selected' ] === true);
  }

  shouldComponentUpdate(nextProps) {
    return this.validateIsRender(this.props.rfa, nextProps.rfa);
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

const mapStateToProps = ({ rotoFrontendActeractive }) => ({ rfa: rotoFrontendActeractive });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    cancelSelectedRotoMaterial,
    removeRotoMaterial,
    removeRotos
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RotoMaterialList);
