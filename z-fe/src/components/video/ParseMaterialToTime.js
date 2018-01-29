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
    this.seekedHandle = () => this.computeFrame();
  }

  computeFrame = () => {
    const canvasWidth = this.props.width;
    const canvasHeight = this.props.height;

    let frameImageData, l, i, r, g, b;

    if (this.frameCanvasContext && this.frameCanvasEl) {
      this.frameCanvasContext.drawImage(this.playerEl, 0, 0, canvasWidth, canvasHeight);
      this.props.onSetFrameImageUrl(this.frameCanvasEl.toDataURL('image/png'));
    }


    // frameImageData = this.frameCanvasContext.getImageData(0, 0, canvasWidth, canvasHeight);
    //
    // for (i = 0, l = frameImageData.data.length / 4; i < l; i++) {
    //   r = frameImageData.data[ i * 4 + 0 ];
    //   g = frameImageData.data[ i * 4 + 1 ];
    //   b = frameImageData.data[ i * 4 + 2 ];
    //
    //   // if (g > 100 && r > 100 && b < 43) {
    //   //   frameImageData.data[ i * 4 + 3 ] = 0;
    //   // }
    // }
    //
    // this.frameCanvasContext.putImageData(frameImageData, 0, 0);
  };

  getFrameTime(props) {
    const { time, frame, frameLength } = props;
    const frameRate = frameLength / time;

    return parseFloat(((frame * (1000 / frameRate)) / 1000));
  }

  setTime = (props) => {
    this.playerEl.currentTime = this.getFrameTime(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.time != this.props.time || nextProps.frame != this.props.frame || nextProps.videoSrc != this.props.videoSrc || nextProps.sceneId != this.props.sceneId) {
      this.setTime(nextProps);
    }
  }

  render() {
    const { width, height } = this.props;

    return (
      <div>
        <canvas ref={ el => this.frameCanvasEl = el } style={{ display: 'none' }} width={ width } height={ height }></canvas>
        <video style={{ display: 'none' }} crossOrigin="Anonymous" ref={ el => this.playerEl = el }>
          <source src={ this.props.videoSrc } type='video/mp4' />
        </video>
      </div>
    );
  }

  componentDidMount() {
    this.playerEl.addEventListener('seeked', this.seekedHandle, false);

    if (this.props.time == null) {
      this.playerEl.addEventListener('loadedmetadata', () => {
        this.videoFrame = new VideoFrame({
          duration: this.playerEl.duration,
          frames: this.props.frameLength
        });

        // 设置素材的总时长
        this.props.onSetMaterialTime(this.playerEl.duration);
      }, false);
    } else {
      this.setTime(this.props);
    }

    this.frameCanvasContext = this.frameCanvasEl.getContext('2d');
  }

  componentWillUnmount() {
    this.playerEl.removeEventListener('seeked', this.seekedHandle);
  }

}
