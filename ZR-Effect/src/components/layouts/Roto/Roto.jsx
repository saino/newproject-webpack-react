import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
/* 路由跳转前验证 -- start */
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { findItem } from '../../../utils/array-handle';
/* 路由跳转前验证 -- end */
import defferPerform from '../../../utils/deffer-perform';
import { configureMove, cancelSelectedRotoMaterial, selectedRotoMaterial } from '../../../stores/action-creators/roto-frontend-acteractive-creator';
import { Icon } from 'antd';
import Draggable from 'react-draggable';
import rotoStyle from './roto.css';
import Scale from '../../commons/Scale';
import Header from '../../containers/Header/Header';
import MaterialList from './MaterialList/MaterialList';
import RotoMaterialAdd from './RotoMaterialAdd/RotoMaterialAdd';
import RotoMaterialList from './RotoMaterialList/RotoMaterialList';
import RotoToolbar from './RotoToolbar/RotoToolbar';
import RotoOperationPanel from './RotoOperationPanel/RotoOperationPanel';
import RotoOperationBox from './RotoOperationBox/RotoOperationBox';
import MaterialMappingFrameImg from './MaterialMappingFrameImg/MaterialMappingFrameImg';
import inputPNG from './input.png';
import nextPNG from './next.png';
import prevPNG from './prev.png';

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

    // 获取素材id
    this.getMaterialId = this.registerGetMaterialInfo(rotoMaterial => rotoMaterial[ 'material_id' ]);

    // 获取移动画布值
    this.getMove = this.registerGetMaterialInfo(rotoMaterial => rotoMaterial[ 'move' ]);

    // 获取是否处于准备移动状态
    this.isReadyMove = this.registerGetMaterialInfo(rotoMaterial => rotoMaterial[ 'roto_tool_type' ] === 1);

    // 移动画布
    this.canvasMoveStopHandle = ({ clientX, clientY, offsetX, offsetY }) => {
      const { configureMove } = this.props;
      const materialId = this.getMaterialId();
      const { x, y } = this.middleEl.getBoundingClientRect();
      const offX = clientX - offsetX - x;
      const offY = clientY - offsetY - y;

      configureMove(materialId, { x: offX, y: offY });
    };

    // 延迟10毫秒跳转到显示帧图片组件
    this.switchToVisibleFrameImg = defferPerform(() => this.openVisibleFrameImg(), 10);

    // 延迟10毫秒选中扣像素材
    this.selectedRotoMaterial = defferPerform(materialId => {
      const { selectedRotoMaterial } = this.props;

      this.switchToVisibleFrameImg();
      selectedRotoMaterial(materialId);
    }, 10);

    // 选中抠像素材
    this.selectedRotoMaterialHandle = (materialId) => {
      const { cancelSelectedRotoMaterial } = this.props;
      console.log(materialId, 'mmmid');
      this.selectedRotoMaterial(materialId);
      cancelSelectedRotoMaterial();
    };
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

  getMiddleComponent(rfa, show, zoomValue, isSelected) {
    const moveParam = this.getMove() || {};

    const middleCom = (
      <div className={ rotoStyle[ 'canvas-inner-w' ] } style={{ transform: `translate(${ moveParam.x }px, ${ moveParam.y }px` }}>
        <div className={ rotoStyle[ 'canvas-inner' ] } style={{ transform: `scale(${ zoomValue })` }}>
          { show
            ? (<MaterialList onSelectedRotoMaterial={ this.selectedRotoMaterialHandle } />)
            : !rfa.length
              ? (<RotoMaterialAdd openMaterialList={ this.openMaterialListComponent } />)
              : !isSelected
                ? void 0
                :(<RotoOperationBox>
                    <MaterialMappingFrameImg frame={ 1 } />
                  </RotoOperationBox>)
          }
        </div>
      </div>
    );

    return this.isReadyMove()
      ? (
        <Draggable
          position={{ x: moveParam.x, y: moveParam.y }}
          onStop={ this.canvasMoveStopHandle }>
          { middleCom }
        </Draggable>
      )
      : middleCom;
  }

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
          <div className={ rotoStyle[ 'header-bottom-bar' ] }></div>
          <div className={ rotoStyle[ 'content' ] }>
            <div className={ rotoStyle[ 'content-inner' ] }>
              <div className={ rotoStyle[ 'area' ] }>
                <div className={ rotoStyle[ 'left' ] }>
                  {/* 扣像素材列表 */}
                  <RotoMaterialList
                    onOpenMaterialList={ this.openMaterialListComponent }
                    onSelectedRotoMaterial={ this.selectedRotoMaterialHandle } />
                </div>
                <div className={ rotoStyle[ 'middle' ] }>
                  <div className={ rotoStyle[ 'middle-inner' ] }>
                    <div ref={ el => this.middleEl = el } className={ `${ rotoStyle[ 'canvas' ] } ${ !show && rfa.length && isSelected ? rotoStyle[ 'mapping' ] : '' }` }>
                      {/* 画布、素材列表、上传 */}
                      { this.getMiddleComponent(rfa, show, zoomValue, isSelected) }
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
              </div>
              {/* 扣像帧处理 */}
              { show || !rfa.length
                ? void 0
                : (<div className={ rotoStyle[ 'footer' ] }>
                    <div className={ rotoStyle[ 'frame-player' ] }>
                      <i className={ rotoStyle[ 'prev' ] }><img src={ prevPNG } /></i>
                      <i><Icon type="play-circle-o" style={{ fontSize: 21, color: '#fff' }} /></i>
                      <i className={ rotoStyle[ 'next' ] }><img src={ nextPNG } /></i>
                    </div>
                    <Scale
                      currTick={ 40 }
                      maxTick={ 100 }
                      onEnd={ tick => { console.log(tick, '结束'); } }
                      onChangeTick={ tick => { console.log(tick, '改变中') } } />
                  </div>)
              }
            </div>
            {/* 扣像操作面板 */}
              { show || !rfa.length
                ? void 0
                : (<div className={ rotoStyle[ 'right' ] }>
                    <RotoOperationPanel />
                  </div>)
              }
          </div>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    configureMove,
    cancelSelectedRotoMaterial,
    selectedRotoMaterial
  },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Matting);
