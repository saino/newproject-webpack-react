/**
 * 解帧得到帧图片，利用canvas drawImage
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get, set } from '../../../../utils/configure-auth';
import { findItem } from '../../../../utils/array-handle';
import style from './frame-img.css';

class FrameImg extends Component {
  static propTypes = {
    frame: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    displayFrame: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      visibleFrame: false
    };

    // 直接到localStorage读取素材图片base64
    // this.getMaterialBase64 = (props) => {
    //   const { frame, frameParseList } = props || this.props;
    //   const materialId = this.getMaterialId(props || this.props);
    //
    //   return findItem(
    //     frameParseList,
    //     frameParse =>
    //       frameParse[ 'material_id' ] === materialId && frameParse[ 'frame' ] === frame
    //   );
    // };

    // 获取素材id
    this.getMaterialId = this.registerGetMaterial(material => material[ 'id' ]);

    // 获取素材路径
    this.getMaterialPath = this.registerGetMaterial(material => material[ 'path' ]);

    // 获取素材属性
    this.getMaterialProps = this.registerGetMaterial(material => material[ 'properties' ]);

    // 获取解帧进度
    this.getParseFramePercent = this.registerGetRotoActeractiveInfo(rotoMaterial => rotoMaterial[ 'parse_frame_percent' ]);


    // 将video的'second'绘制到canvas，形成解帧效果
    // this.drawToCanvasHandle = () => {
    //   const { frame, addParseFrame } = this.props;
    //   const [ width, height ] = this.getFinalSize();
    //   const materialId = this.getMaterialId();
    //
    //   this.contextCanvas.drawImage(this.videoEl, 0, 0, width, height);
    //   addParseFrame(materialId, frame, this.canvasEl.toDataURL('image/jpeg'));
    // };

    // 显示帧操作
    this.showFrameHandle = () => 
      this.setState({ visibleFrame: true });

    // 隐藏帧操作
    this.hideFrameHandle = () =>
      this.setState({ visibleFrame: false });
  }

  registerGetRotoActeractiveInfo(fn) {
    return () => {
      const { rfa } = this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);

      if (rotoMaterial == null) {
        return void 0;
      }

      return fn(rotoMaterial);
    };
  }

  registerGetMaterial(fn) {
    return props => {
      const { materialList, materialTempList, rfa } = props || this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);
      let materialId, material;

      if (rotoMaterial == null) {
        return void 0;
      }

      materialId = rotoMaterial[ 'material_id' ];
      material = findItem(materialList, 'id', materialId) || findItem(materialTempList, 'id', materialId);

      if (material == null) {
        return void 0;
      }

      return fn(material);
    };
  }

  getFinalSize() {
    const { width } = this.props;
    const mWidth = this.getMaterialProps().width;
    const mHeight = this.getMaterialProps().height;
    let ratio = (mHeight / mWidth).toFixed(3);
    let finalHeight = width * ratio;

    return [ width, finalHeight ];
  }

  getMsFrame(length, duration) {
    const frameRate = duration / length;

    return frameRate.toFixed(3);
  }

  configureVideoCurrTime() {
    const { frame } = this.props;
    const { length, duration } = this.getMaterialProps();
    const totalMs = this.getMsFrame(length, duration) * frame;

    this.videoEl.currentTime = totalMs;
  }

  render() {
    const { frame, displayFrame } = this.props;
    const { visibleFrame } = this.state;
    const [ width, height ] = this.getFinalSize();
    const path = this.getMaterialPath();

    return (
      <div className={ style[ 'wrapper' ] } onMouseEnter={ this.showFrameHandle } onMouseLeave={ this.hideFrameHandle }>
        <video
          ref={ el => this.videoEl = el }
          style={{ width, height }}
          src={ path }
          crossOrigin="use-credentials" />

        { visibleFrame
          ? (
            <div className={ style[ 'wrapper-inner' ] }>
              <span>{ displayFrame == null ? frame : displayFrame }</span>
            </div>
          )
          : void 0
        }
      </div>
    )
  }

  componentDidMount() {
    this.configureVideoCurrTime();
  }
}

const mapStateToProps = ({
  rotoMaterial,
  rotoFrontendActeractive,
  rotoMaterialTemp
}) => ({
  materialList: rotoMaterial.list,
  materialTempList: rotoMaterialTemp,
  rfa: rotoFrontendActeractive
});

//const mapDispatchToProps = dispatch => bindActionCreators({ addParseFrame }, dispatch);

export default connect(mapStateToProps)(FrameImg);
