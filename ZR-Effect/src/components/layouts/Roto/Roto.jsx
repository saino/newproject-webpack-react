import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
/* 路由跳转前验证 -- start */
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { findItem } from '../../../utils/array-handle';
/* 路由跳转前验证 -- end */
import defferPerform from '../../../utils/deffer-perform';
import config from '../../../config';
import {
  configureMove,
  cancelSelectedRotoMaterial,
  selectedRotoMaterial,
  selectedFrame,
  configureIsValidFrameError,
  configureIsPlay
} from '../../../stores/action-creators/roto-frontend-acteractive-creator';
import { addRoto, configure } from '../../../stores/action-creators/roto-creator';
import { Icon, Progress, message } from 'antd';
import Draggable from 'react-draggable';
import ScrollArea from 'react-custom-scrollbars';
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
import ParseFrameList from './ParseFrameList/ParseFrameList';
import FrameImg from './FrameImg/FrameImg';
import nextPNG from './next.png';
import prevPNG from './prev.png';

class Matting extends Component {
  constructor(props) {
    super(props);

    // 获取当前选中哪帧
    this.getSelectedFrame = this.registerGetRotoActeractiveInfo(rotoMaterial => rotoMaterial[ 'selected_frame' ]);

    this.state = {
      // 中间区域是显示添加扣像素材还是帧图片 0-显示帧图片 | 1-添加扣像素材
      showAddMaterialOrFrameImg: 0,

      // 临时帧，主要是为了frame input value 绑定了 store
      tempFrame: this.getSelectedFrame()
    };

    // 获取素材属性
    this.getMaterialProps = this.registerGetMaterialInfo(material => material[ 'properties' ]);

    // 获取素材路径
    this.getMaterialPath = this.registerGetMaterialInfo(material => material[ 'path' ]);

    // 获取是否正在解帧
    this.getIsParseFrame = this.registerGetRotoActeractiveInfo(rotoMaterial => rotoMaterial[ 'is_parse_frame' ]);

    // 获取解帧进度
    this.getParseFramePercent = this.registerGetRotoActeractiveInfo(rotoMaterial => rotoMaterial[ 'parse_frame_percent' ]);

    // 获取是否正在播放
    this.getIsPlay = this.registerGetRotoActeractiveInfo(rotoMaterial => rotoMaterial[ 'is_play' ]);

    // 获取验证帧是否合法
    this.getIsValidFrameError = this.registerGetRotoActeractiveInfo(rotoMaterial => rotoMaterial[ 'is_valid_frame_error' ]);

    // 获取放大、缩小画布值
    this.getZoom = this.registerGetRotoActeractiveInfo(rotoMaterial => rotoMaterial[ 'zoom' ]);

    // 获取素材id
    this.getMaterialId = this.registerGetRotoActeractiveInfo(rotoMaterial => rotoMaterial[ 'material_id' ]);

    // 获取移动画布值
    this.getMove = this.registerGetRotoActeractiveInfo(rotoMaterial => rotoMaterial[ 'move' ]);

    // 获取是否处于准备移动状态
    this.isReadyMove = this.registerGetRotoActeractiveInfo(rotoMaterial => rotoMaterial[ 'roto_tool_type' ] === 1);

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
    this.switchToVisibleFrameImg = () => this.openVisibleFrameImg(); //defferPerform(() => this.openVisibleFrameImg(), 10);

    // // 延迟10毫秒选中扣像素材
    // this.selectedRotoMaterial = defferPerform(materialId => {
    //   const { selectedRotoMaterial } = this.props;
    //
    //   this.switchToVisibleFrameImg();
    //   selectedRotoMaterial(materialId);
    // }, 10);

    // 选中抠像素材操作
    this.selectedRotoMaterialHandle = materialId => {
      const { cancelSelectedRotoMaterial, selectedRotoMaterial } = this.props;

      //this.selectedRotoMaterial(materialId);
      this.switchToVisibleFrameImg();
      cancelSelectedRotoMaterial();
      selectedRotoMaterial(materialId);

      // setTimeout(() => {
      //
      // }, 10);
      //cancelSelectedRotoMaterial();
      //selectedRotoMaterial(materialId);
    };

    // 延迟10毫秒设置抠像素材的选择帧
    this.deferConfigureRotoMaterialFrame = defferPerform((materialId, frame) => {
      const { selectedFrame } = this.props;

      selectedFrame(materialId, frame);
    }, 10);

    // 延迟15毫秒设置是否合法
    this.deferConfigureIsValidFrameError = defferPerform((materialId, isValid) => {
      const { configureIsValidFrameError } = this.props;

      configureIsValidFrameError(materialId, isValid);
    }, 15);

    // 延迟20毫秒添加抠像信息
    this.deferAddRoto = defferPerform((materialId, frame) => {
      const { addRoto } = this.props;

      addRoto(materialId, frame);
    }, 20);

    // 延迟15毫秒设置frame state
    this.deferConfigureFrame = defferPerform(frame => this.setState({ tempFrame: frame }), 15);

    // 延时10毫秒恒定24fps播放帧动画(更改帧)
    this.playing = (() => {
      const { configureIsPlay, rfa } = this.props;
      const unsetTimer = mId => {
        const isSelected = !!findItem(rfa, 'is_selected', true);

        clearInterval(timer);
        timer = null;

        isSelected && configureIsPlay(mId, false);
      };
      let timer;

      return {
        startTimer: defferPerform(() => {
          const isPlay = this.getIsPlay();
          const materialId = this.getMaterialId();
          const { length, duration } = this.getMaterialProps();
          const ms = parseFloat((duration / length).toFixed(3)) * 1000;
          let { tempFrame } = this.state;

          if (isPlay) {
            timer = setInterval(() => {
              if (tempFrame >= length) {
                unsetTimer(materialId);
                return;
              }

              this.configureTickHandle(++tempFrame);
            }, ms);
          } else {
            unsetTimer(materialId);
          }
        }, 80),
        unsetTimer
      };
    })();

    // 播放或暂停操作
    this.playOrPauseHandle = () => {
      const { configureIsPlay } = this.props;
      const isPlay = this.getIsPlay();
      const materialId = this.getMaterialId();

      configureIsPlay(materialId, !isPlay);
      this.playing.startTimer();
    };

    // 播放上一帧操作
    this.playPrevFrameHandle = () => {
      const { addRoto, configureIsValidFrameError } = this.props;
      const { tempFrame } = this.state;
      const materialId = this.getMaterialId();
      const parsedFrame = isNaN(+tempFrame) ? this.getSelectedFrame() : +tempFrame;
      const currFrame = parsedFrame - 1;

      if (currFrame < 0) {
        message.warning('不能小于最小帧');
        configureIsValidFrameError(materialId, false);
        this.deferConfigureFrame(-1);

        return;
      }
      else {
        if (!this.checkRotoFrame(currFrame)) {
          addRoto(materialId, currFrame);
        }

        // 只要用户输入合法并且在限制之内，就消除红框提示
        configureIsValidFrameError(materialId, true);
        // 设置当前抠像素材的帧
        this.deferConfigureRotoMaterialFrame(materialId, currFrame);
      }
    };

    // 播放下一帧操作
    this.playNextFrameHandle = () => {
      const { addRoto, configureIsValidFrameError } = this.props;
      const { tempFrame } = this.state;
      const totalFrame = this.getMaterialProps()[ 'length' ];
      const materialId = this.getMaterialId();
      const parsedFrame = isNaN(+tempFrame) ? this.getSelectedFrame() : +tempFrame;
      const currFrame = parsedFrame + 1;

      if (currFrame >= totalFrame) {
        message.warning('不能大于最大帧');
        configureIsValidFrameError(materialId, false);
        this.deferConfigureFrame(totalFrame);

        return;
      }
      else {
        if (!this.checkRotoFrame(currFrame)) {
          addRoto(materialId, currFrame);
        }

        // 只要用户输入合法并且在限制之内，就消除红框提示
        configureIsValidFrameError(materialId, true);
        // 设置当前抠像素材的帧
        this.deferConfigureRotoMaterialFrame(materialId, currFrame);
      }
    };

    // 输入框'change'改变帧
    this.changeFrameHandle = ({ target }) =>
      this.deferConfigureFrame(target.value);

    // 输入框'blur'改变帧
    this.importFrameHandle = () => {
      const { addRoto, configureIsValidFrameError } = this.props;
      const { tempFrame } = this.state;
      const totalFrame = this.getMaterialProps()[ 'length' ];
      const materialId = this.getMaterialId();
      const parsedFrame = +tempFrame;

      if (isNaN(parsedFrame)) {
        configureIsValidFrameError(materialId, false);
        this.deferConfigureFrame(totalFrame);
      } else {
        if (parsedFrame >= totalFrame) {
          message.warning('不能大于最大帧');
          this.deferConfigureFrame(totalFrame);

          return;
        }
        else if (parsedFrame < 0) {
          message.warning('不能小于最小帧');
          this.deferConfigureFrame(0);

          return;
        }
        else {
          // 设置当前抠像素材的帧
          this.deferConfigureRotoMaterialFrame(materialId, parsedFrame);

          // 只要用户输入合法并且在限制之内，就消除红框提示
          this.deferConfigureIsValidFrameError(materialId, true);

          if (!this.checkRotoFrame(parsedFrame)) {
            // 添加当前这帧的抠像信息
            this.deferAddRoto(materialId, parsedFrame);
          }
        }
      }
    };

    // 设置tick操作
    this.configureTickHandle = currFrame => {
      const materialId = this.getMaterialId();

      // 设置当前抠像素材的帧
      this.deferConfigureRotoMaterialFrame(materialId, currFrame);

      // 只要用户输入合法并且在限制之内，就消除红框提示
      this.deferConfigureIsValidFrameError(materialId, true);

      if (!this.checkRotoFrame(currFrame)) {
        // 添加当前这帧的抠像信息
        this.deferAddRoto(materialId, currFrame);
      }
    };

    this.openMaterialListComponent = () =>
      this.setState({ showAddMaterialOrFrameImg: 1 });

    this.openVisibleFrameImg = () =>
      this.setState({ showAddMaterialOrFrameImg: 0 });
  }

  // 检测抠像数据里是否存在该帧的记录
  checkRotoFrame(frame) {
    const { rotoList } = this.props;
    const materialId = this.getMaterialId();

    return !!findItem(rotoList,
      roto =>
        roto[ 'material_id' ] === materialId
          && roto[ 'frame' ] === frame
    );
  }

  registerGetMaterialInfo(fn) {
    return () => {
      const { materialList, rfa, materialTempList } = this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);
      let materialId, material;

      if (rotoMaterial == null) {
        return void 0;
      }

      materialId = rotoMaterial[ 'material_id' ];
      material = findItem(materialList, 'id', materialId) || findItem(materialTempList, 'id', materialId);

      return fn(material);
    };
  }

  registerGetRotoActeractiveInfo(fn) {
    return nextProps => {
      const { rfa } = nextProps || this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);

      if (rotoMaterial == null) {
        return void 0;
      }

      return fn(rotoMaterial);
    };
  }

  getMiddleComponent(rfa, show, zoomValue, isSelected) {
    const moveParam = this.getMove() || {};
    const frame = this.getSelectedFrame();
    const middleCom = (
      <div className={ rotoStyle[ 'canvas-inner-w' ] }>
        <div className={ rotoStyle[ 'canvas-inner' ] } style={{ transform: `scale(${ zoomValue })` }}>
          { show
            ? (<MaterialList onSelectedRotoMaterial={ this.selectedRotoMaterialHandle } />)
            : !rfa.length
              ? (<RotoMaterialAdd openMaterialList={ this.openMaterialListComponent } />)
              : !isSelected
                ? void 0
                : (
                  <Draggable
                    position={{ x: moveParam.x, y: moveParam.y }}
                    onStop={ this.canvasMoveStopHandle }>
                    <div style={{
                      transform: `translate(${ moveParam.x }px, ${ moveParam.y }px`,
                      left: '50%',
                      top: '50%',
                      marginLeft: -this.getMaterialProps()[ 'width' ] / 2,
                      marginTop: -this.getMaterialProps()[ 'height' ] / 2,
                      height: this.getMaterialProps()[ 'height' ],
                      width: this.getMaterialProps()[ 'width' ],
                      position: 'absolute',
                      background: 'transparent' }}>
                      <RotoOperationBox disabled={ this.isReadyMove() }>
                        <MaterialMappingFrameImg
                          frame={ frame }
                          isPlay={ this.getIsPlay() }
                          onClearPlayTimer={ this.playing.unsetTimer } />
                      </RotoOperationBox>
                    </div>
                  </Draggable>
                )
          }
        </div>
      </div>
    );

    return middleCom;
  }

  getParseFrameCom(isParseFrame, percent) {
    const { width, iterate, gap } = config.parseFrame;
    const materialId = this.getMaterialId();
    const materialPath = this.getMaterialPath();
    const { length, duration } = this.getMaterialProps();
    const totalIterate = Math.floor(length / iterate) + 1;
    const boxWidth = totalIterate * (width + 2) + (totalIterate - 1) * gap;

    return (
      <div className={ rotoStyle[ 'frame-img-list' ] } style={{ width: boxWidth }}>
        <ParseFrameList
          materialId={ materialId }
          materialPath={ materialPath }
          isParseFrame={ isParseFrame }
          percent={ percent }
          totalFrame={ length }
          frameRate={ duration / length }
          iterate={ iterate }
          onClick={ frame => this.configureTickHandle(frame) } />
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const frame = this.getSelectedFrame(nextProps);

    if (frame != null) {
      this.setState({ tempFrame: frame });
    }
  }

  render() {
    const { showAddMaterialOrFrameImg, tempFrame } = this.state;
    const { rfa, token } = this.props;
    const isParseFrame = this.getIsParseFrame
    const parseFramePercent = this.getParseFramePercent();
    const frame = this.getSelectedFrame();
    const isValidFrameError = this.getIsValidFrameError();
    const isPlay = this.getIsPlay();
    const isSelected = !!findItem(rfa, 'is_selected', true);
    let zoomValue = this.getZoom();
    let show = showAddMaterialOrFrameImg;

    zoomValue == null && (zoomValue = 1);

    if (show === 0) {
      show = false;
    } else {
      show = true;
    }

    if (token == null) {
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
                    {show || !rfa.length
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
              { show || !rfa.length || !isSelected
                ? void 0
                : (<div className={ rotoStyle[ 'footer' ] }>
                    <ScrollArea style={{ width: '100%', height: '100%' }}>
                      <div className={ rotoStyle[ 'frame-player' ] }>
                        <i onClick={ this.playPrevFrameHandle } className={ rotoStyle[ 'prev' ] }><img src={ prevPNG } /></i>
                        <i onClick={ this.playOrPauseHandle }><Icon type={ isPlay === true ? 'pause-circle-o' : 'play-circle-o' } style={{ fontSize: 21, color: '#fff' }} /></i>
                        <i onClick={ this.playNextFrameHandle } className={ rotoStyle[ 'next' ] }><img src={ nextPNG } /></i>
                        <label className={ rotoStyle[ 'txt' ] }>当前第</label>
                        <input
                          value={ tempFrame }
                          className={ isValidFrameError !== false ? void 0 : rotoStyle[ 'valid-error' ] }
                          onChange={ this.changeFrameHandle }
                          onBlur={ this.importFrameHandle } />
                        <label className={ rotoStyle[ 'txt' ] }>帧</label>
                      </div>
                      <div className={ rotoStyle[ 'auto-scale' ] }>

                        {/* 时间轴 */}
                        <Scale
                          currTick={ frame }
                          maxTick={ 100 }
                          onEnd={ this.configureTickHandle }>

                          {/* 解帧区展示帧图片 */}
                          {this.getParseFrameCom(isParseFrame, parseFramePercent) }
                        </Scale>
                      </div>
                    </ScrollArea>
                  </div>)
              }
            </div>

            {/* 扣像操作面板 */}
              {show || !rfa.length || !isSelected
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

  componentWillUnmount() {
    if (this.getMaterialId()) {
      this.playing.unsetTimer(this.getMaterialId());
    }
  }
}

const mapStateToProps = ({
  app,
  rotoFrontendActeractive,
  rotoMaterial,
  roto,
  rotoMaterialTemp
}) => ({
  token: app.token,
  materialList: rotoMaterial.list,
  materialTempList: rotoMaterialTemp,
  rfa: rotoFrontendActeractive,
  rotoList: roto
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    configureMove,
    cancelSelectedRotoMaterial,
    selectedRotoMaterial,
    selectedFrame,
    configureIsValidFrameError,
    configureIsPlay,
    addRoto,
    configure
  },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Matting);
