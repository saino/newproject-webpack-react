import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../utils/array-handle';
import rotoMaterialListStyle from './roto-material-list.css';
import addMaterialPNG from './add-material.png';
import videoPNG from './video.png';
import deletePNG from './delete.png';

class RotoMaterialList extends Component {
  getMaterialComponents() {
    const { rfa, materialList } = this.props;
    let material;
    console.log(materialList, 'mlist');
    return rfa.map(item => {
      material = findItem(materialList, 'id', item[ 'material_id' ]);

      return (
        <li className={ `${ rotoMaterialListStyle[ 'material-list-item' ] } ${ item[ 'is_selected' ] ? rotoMaterialListStyle[ 'material-list-item' ] : '' }` }>
          <div className={ rotoMaterialListStyle[ 'thum-warp' ] }>
            <div className={ rotoMaterialListStyle[ 'thum-icon' ] }>
              <img src={ videoPNG } />
            </div>
            { material.name }
          </div>
          <div>
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
        <div className={ rotoMaterialListStyle[ 'material-add' ] }>
          扣像素材
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

export default connect(mapStateToProps)(RotoMaterialList);
