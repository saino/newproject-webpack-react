import React, { Component } from 'react';
/* 路由跳转前验证 -- start */
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { findItem } from '../../../utils/array-handle';
/* 路由跳转前验证 -- end */
import rotoStyle from './roto.css';
import Header from '../../containers/Header/Header';
import MaterialList from './MaterialList/MaterialList';
import RotoMaterialAdd from './RotoMaterialAdd/RotoMaterialAdd';
import RotoMaterialList from './RotoMaterialList/RotoMaterialList';
import RotoToolbar from './RotoToolbar/RotoToolbar';
import RotoOperationPanel from './RotoOperationPanel/RotoOperationPanel';
import MaterialMappingFrameImg from './MaterialMappingFrameImg/MaterialMappingFrameImg';

class Matting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 检测是否存在该用户信息的state，用来做登录跳转
      redirectToReferrer: false,
      // 中间区域是显示添加扣像素材还是帧图片 0-显示帧图片 | 1-添加扣像素材
      showAddMaterialOrFrameImg: 0
    };

    // 获取放大、缩小画布值
    this.getZoom = this.registerGetMaterialInfo(rotoMaterial => rotoMaterial[ 'zoom' ]);

    // 获取移动画布值
    this.getMove = this.registerGetMaterialInfo(rotoMaterial => rotoMaterial[ 'move' ]);
  }

  registerGetMaterialInfo(fn) {
    return () => {
      const { materialList, rfa } = this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);

      if (rotoMaterial == null) {
        return void 0;
      }

      return fn(rotoMaterial);
    };
  }

  openMaterialListComponent = () =>
    this.setState({ showAddMaterialOrFrameImg: 1 });

  openVisibleFrameImg = () =>
    this.setState({ showAddMaterialOrFrameImg: 0 });

  render() {
    const { redirectToReferrer, showAddMaterialOrFrameImg } = this.state;
    const { rfa } = this.props;
    const isSelected = findItem(rfa, 'is_selected', true);
    let zoomValue = this.getZoom();
    let show = showAddMaterialOrFrameImg;

    zoomValue == null && (zoomValue = 1);

    if (rfa.length === 0 && show === 0) {
      show = false;
    }

    if (redirectToReferrer) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div className={ rotoStyle[ 'wrapper' ] }>
        <div className={ rotoStyle[ 'wrapper-inner' ] }>
          <div className={ rotoStyle[ 'header' ] }>
            {/* 头部 */}
            <Header />
          </div>
          <div className={ rotoStyle[ 'content' ] }>
            <div className={ rotoStyle[ 'left' ] }>
              {/* 扣像素材列表 */}
              <RotoMaterialList
                onOpenMaterialList={ this.openMaterialListComponent }
                onOpenVisibleFrameImg={ this.openVisibleFrameImg } />
            </div>
            <div className={ rotoStyle[ 'middle' ] }>
              <div className={ rotoStyle[ 'middle-inner' ] }>
                <div className={ `${ rotoStyle[ 'canvas' ] } ${ !show && rfa.length && isSelected ? rotoStyle[ 'mapping' ] : '' }` }>
                  <div className={ rotoStyle[ 'canvas-inner' ] } style={{ transform: `scale(${ zoomValue })` }}>
                    {/* 画布还是素材列表 */}
                    { show
                      ? (<MaterialList />)
                      : !rfa.length
                        ? (<RotoMaterialAdd openMaterialList={ this.openMaterialListComponent } />)
                        : !isSelected
                          ? void 0
                          :(<MaterialMappingFrameImg frame={ 1 } />)
                    }
                  </div>
                </div>

                {/* 扣像工具条 */}
                { show || !rfa.length
                  ? void 0
                  : (
                      <div className={ rotoStyle[ 'toolbar' ] }>
                        <RotoToolbar />
                      </div>
                    )
                }
              </div>
            </div>

            {/* 扣像操作面板 */}
              { show || !rfa.length
                ? void 0
                : (<div className={ rotoStyle[ 'right' ] }>
                    <RotoOperationPanel />
                  </div>)
              }
          </div>

          {/* 扣像帧处理 */}
          { show || !rfa.length
            ? void 0
            : (<div className={ rotoStyle[ 'footer' ] }></div>)
          }

        </div>
      </div>
    );

  }
}

const mapStateToProps = ({
  app,
  rotoFrontendActeractive
}) => ({
  token: app.token,
  rfa: rotoFrontendActeractive
});

export default connect(mapStateToProps)(Matting);
