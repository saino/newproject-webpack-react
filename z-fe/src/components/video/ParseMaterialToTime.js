import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import VideoFrame from '../../utils/video-frame';

export default class ParseMaterialToTime extends Component {
  constructor(props) {
    super(props);

    this.reset();
  }

  reset() {
    this.playerEl = this.videoFrame = null;
  }

  getFrameTime = (frame) => {
    const { time, frameLength } = this.props;
    const frameRate = frameLength / time;

    return (frame * (1000 / frameRate)) / 1000;
  };

  computeFrame = () => {
    const canvasWidth = this.frameCanvasEl.width;
    const canvasHeight = this.frameCanvasEl.height;
    let frameImageData, l, i, r, g, b;

    this.frameCanvasContext.drawImage(this.playerEl, 0, 0, canvasWidth, canvasHeight);
    frameImageData = this.frameCanvasContext.getImageData(0, 0, canvasWidth, canvasHeight);

    for (i = 0, l = frameImageData.data.length / 4; i < l; i++) {
      r = frameImageData.data[ i * 4 + 0 ];
      g = frameImageData.data[ i * 4 + 1 ];
      b = frameImageData.data[ i * 4 + 2 ];

      // if (g > 100 && r > 100 && b < 43) {
      //   frameImageData.data[ i * 4 + 3 ] = 0;
      // }
    }

    this.frameCanvasContext.putImageData(frameImageData, 0, 0);
    this.props.onSetFrameImageUrl(this.frameCanvasEl.toDataURL('image/jpeg'));
  };

  setTime = (frame) => {
    this.playerEl.currentTime = this.getFrameTime(frame);
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.frame == 1 && this.props.time !== nextProps.time) || (nextProps.frame !== this.props.frame)) {
      this.setTime(nextProps.frame);
    }
  }

  render() {
    return (
      <div>
        <canvas ref={ el => this.frameCanvasEl = el } style={{ display: 'none' }}></canvas>
        <video style={{ display: 'none' }} crossOrigin="Anonymous" ref={ el => this.playerEl = el } src={ this.props.videoSrc }></video>
      </div>
    );
  }

  componentDidMount() {
    this.playerEl.addEventListener('seeked', () => this.computeFrame(), false);
    this.playerEl.addEventListener('loadedmetadata', () => {
      this.videoFrame = new VideoFrame({
        duration: this.playerEl.duration,
        frames: this.props.frameLength
      });

      // 设置素材的总时长
      this.props.onSetMaterialTime(this.playerEl.duration);
    }, false);
    this.frameCanvasContext = this.frameCanvasEl.getContext('2d');
  }
}
