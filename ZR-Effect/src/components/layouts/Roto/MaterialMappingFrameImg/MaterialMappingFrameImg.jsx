import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findItem } from '../../../../utils/array-handle';
import style from './material-mapping-frame-img.css';

class MaterialMappingFrameImg extends Component {
  static propTypes = {
    frame: PropTypes.number.isRequired
  };

  drawToCanvasHandle = () => {
    const currTime = this.videoEl.currentTime;
    const { properties: { width, height } } = this.getMaterial();;

    this.contextCanvas.drawImage(this.videoEl, 0, 0, width, height);
  };

  getMsFrame(frameLength, duration) {
    const frameRate = duration / frameLength;

    return frameRate.toFixed(3);
  }

  getMaterial() {
    const { materialList, rfa } = this.props;
    const selectedRotoMaterial = findItem(rfa, 'is_selected', true);
    const material = findItem(materialList, 'id', selectedRotoMaterial[ 'material_id' ]);

    return material;
  }

  setCurrTime() {
    const { frame } = this.props;
    const { properties: { duration, length } } = this.getMaterial();
    const totalMs = this.getMsFrame(length, duration) * frame;

    this.videoEl.currentTime = totalMs;
  }

  render() {
    const { path, properties: { width, height } } = this.getMaterial();

    return (
      <div className={ style[ 'wrapper' ] }>
        <canvas ref={ el => this.canvasEl = el } width={ width } height={ height }></canvas>
        <video src={ path } ref={ el => this.videoEl = el } crossOrigin="use-credentials" style={{ display: 'none' }}></video>
      </div>
    );
  }

  componentDidUpdate() {
    this.setCurrTime();
  }

  componentDidMount() {
    this.contextCanvas = this.canvasEl.getContext('2d');
    this.videoEl.addEventListener('seeked', this.drawToCanvasHandle, false);
    this.setCurrTime();
  }
}

const mapStateToProps = ({
  material,
  rotoFrontendActeractive
}) => ({
  materialList: material,
  rfa: rotoFrontendActeractive
});

export default connect(mapStateToProps)(MaterialMappingFrameImg);
