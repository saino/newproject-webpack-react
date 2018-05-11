/**
 * 解帧得到帧图片，利用canvas drawImage
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

    // 获取素材路径
    this.getMaterialPath = this.registerGetMaterial(material => material[ 'path' ]);

    // 获取素材属性
    this.getMaterialProps = this.registerGetMaterial(material => material[ 'properties' ]);

    // 将video的'second'绘制到canvas，形成解帧效果
    this.drawToCanvasHandle = () => {
      const [ width, height ] = this.getFinalSize();

      this.contextCanvas.drawImage(this.videoEl, 0, 0, width, height);
    };

    // 显示帧操作
    this.showFrameHandle = () =>
      this.setState({ visibleFrame: true });

    // 隐藏帧操作
    this.hideFrameHandle = () =>
      this.setState({ visibleFrame: false });
  }

  registerGetMaterial(fn) {
    return () => {
      const { materialList, materialTempList, rfa } = this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);
      let materialId, material;

      if (rotoMaterial == null) {
        return void 0;
      }

      materialId = rotoMaterial[ 'material_id' ];
      material = findItem(materialList, 'id', materialId) || findItem(materialTempList, 'id', materialId);;

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
        <canvas ref={ el => this.canvasEl = el } width={ width } height={ height }></canvas>
        <video src={ path } ref={ el => this.videoEl = el } crossOrigin="use-credentials" style={{ display: 'none' }}></video>
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

  componentDidUpdate() {
    this.configureVideoCurrTime();
  }

  componentDidMount() {
    this.contextCanvas = this.canvasEl.getContext('2d');
    this.videoEl.addEventListener('seeked', this.drawToCanvasHandle, false);
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

export default connect(mapStateToProps)(FrameImg);
