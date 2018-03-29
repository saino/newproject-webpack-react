import React, { Component } from 'react';
import { connect } from 'react-redux';
import rotoMaterialListStyle from './roto-material-list.css';
import addMaterialPNG from './add-material.png';
import videoPNG from './video.png';
import deletePNG from './delete.png';

class RotoMaterialList extends Component {
  render() {
    return (
      <div className={ rotoMaterialListStyle[ 'wrapper' ] }>
        <div className={ rotoMaterialListStyle[ 'material-add' ] }>
          扣像素材
          <img src={ addMaterialPNG } />
        </div>
        <div className={ rotoMaterialListStyle[ 'material-list' ] }>
          <ul className={ rotoMaterialListStyle[ 'material-list-inner' ] }>
            <li className={ rotoMaterialListStyle[ 'material-list-item' ] }>
              <div className={ rotoMaterialListStyle[ 'thum-warp' ] }>
                <div className={ rotoMaterialListStyle[ 'thum-icon' ] }>
                  <img src={ videoPNG } />
                </div>
                视频1
              </div>
              <div>
                <img src={ deletePNG } />
              </div>
              <div className={ rotoMaterialListStyle[ 'bottom-line' ] }></div>
            </li>
            <li className={ `${ rotoMaterialListStyle[ 'material-list-item' ] } ${ rotoMaterialListStyle[ 'active' ] }` }>
              <div className={ rotoMaterialListStyle[ 'thum-warp' ] }>
                <div className={ rotoMaterialListStyle[ 'thum-icon' ] }>
                  <img src={ videoPNG } />
                </div>
                视频2
              </div>
              <div>
                <img src={ deletePNG } />
              </div>
              <div className={ rotoMaterialListStyle[ 'bottom-line' ] }></div>
            </li>
            <li className={ rotoMaterialListStyle[ 'material-list-item' ] }>
              <div className={ rotoMaterialListStyle[ 'thum-warp' ] }>
                <div className={ rotoMaterialListStyle[ 'thum-icon' ] }>
                  <img src={ videoPNG } />
                </div>
                视频3
              </div>
              <div>
                <img src={ deletePNG } />
              </div>
              <div className={ rotoMaterialListStyle[ 'bottom-line' ] }></div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ rotoFrontendActeractive }) => ({
  rfa: rotoFrontendActeractive
});

export default connect(mapStateToProps)(RotoMaterialList);
