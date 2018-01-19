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

    return parseFloat(((frame * (1000 / frameRate)) / 1000).toFixed(2));
  }

  setTime = (props) => {
    console.log(this.getFrameTime(props), 'ddd');
    this.playerEl.currentTime = this.getFrameTime(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.time != this.props.time || nextProps.frame != this.props.frame || nextProps.videoSrc != this.props.videoSrc) {
      this.setTime(nextProps);
    }
  }

  render() {
    const { width, height } = this.props;

    return (
      <div>
        <canvas ref={ el => this.frameCanvasEl = el } style={{ display: 'none' }} width={ width } height={ height }></canvas>
        <video style={{ display: 'none' }} crossOrigin="Anonymous" ref={ el => this.playerEl = el } src={ this.props.videoSrc }></video>
      </div>
    );
  }

  componentDidMount() {
    this.playerEl.addEventListener('seeked', () => { console.log('xxdd');this.computeFrame() }, false);
    this.playerEl.addEventListener('waiting', () => console.log('缓冲'), false);

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
}
