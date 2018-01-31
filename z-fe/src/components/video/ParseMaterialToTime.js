import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import VideoFrame from '../../utils/video-frame';

export default class ParseMaterialToTime extends Component {
  constructor(props) {
    super(props);

    this.reset();
  }

  reset() {
    this.hasUpdated = false;
    this.videoEl = this.videoFrame = null;
    this.seekedHandle = () => this.computeFrame();
    this.loadedmetadataHandle = () => {
      this.videoFrame = new VideoFrame({
        duration: this.videoEl.duration,
        frames: this.props.frameLength
      });

      // 设置素材的总时长
      this.props.onSetMaterialTime(this.videoEl.duration);
    };
  }

  computeFrame = () => {
    const canvasWidth = this.props.width;
    const canvasHeight = this.props.height;

    let frameImageData, l, i, r, g, b;

    if (this.frameCanvasContext && this.frameCanvasEl) {
      //this.frameCanvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
      this.frameCanvasContext.drawImage(this.videoEl, 0, 0, canvasWidth, canvasHeight);
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
    this.videoEl.currentTime = this.getFrameTime(props);
  }

  createVideoEl = () => {
    this.videoEl = document.createElement('video');
    this.videoEl.setAttribute('crossOrigin', 'Anonymous');
    this.videoEl.src = this.props.videoSrc;
    this.videoEl.style.display = 'none';
    this.el.appendChild(this.videoEl);

    return () => {
      this.el.removeChild(this.videoEl);
      this.videoEl = null;
    };
  }

  componentWillReceiveProps(nextProps) {
    this.hasUpdated = nextProps.time != this.props.time || nextProps.frame != this.props.frame || nextProps.videoSrc != this.props.videoSrc || nextProps.sceneId != this.props.sceneId;
  }

  componentDidUpdate(prevProps) {
    if (this.hasUpdated) {
      this.removeVideoEl();
      this.removeVideoEl = this.createVideoEl();
      this.videoEl.removeEventListener('seeked', this.seekedHandle);
      this.videoEl.addEventListener('seeked', this.seekedHandle, false);

      if (prevProps.time == null) {
        this.loadedmetadataHandle();
      }

      this.setTime(prevProps);
    }
  }

  render() {
    const { width, height } = this.props;

    return (
      <div ref={ el => this.el = el }>
        <canvas ref='canvas' style={{ display: 'none' }} width={ width } height={ height }></canvas>
      </div>
    );
  }

  componentDidMount() {
    this.frameCanvasEl = findDOMNode(this.refs.canvas);
    this.frameCanvasContext = this.frameCanvasEl.getContext('2d');
    this.removeVideoEl = this.createVideoEl();
    this.videoEl.addEventListener('seeked', this.seekedHandle, false);
    this.videoEl.addEventListener('loadedmetadata', this.loadedmetadataHandle, false);
    this.setTime(this.props);
  }

  componentWillUnmount() {
    this.videoEl.removeEventListener('seeked', this.seekedHandle);
    this.videoEl.removeEventListener('loadedmetadata', this.loadedmetadataHandle);
    this.removeVideoEl();
  }

}
