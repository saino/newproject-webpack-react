import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ParseFrameToImageData extends Component {
  static propTypes = {
    videoSrc: PropTypes.string,
    frames: PropTypes.array,
    onComplete: PropTypes.func
  };
  static defaultProps = {
    videoSrc: '',
    frames: [],
    onComplete: function () {}
  };
  dataUrls = [];

  computeFrame(frameId) {
    const width = this.oriCanvasEl.width;
    const height = this.oriCanvasEl.height;

    this.oriCanvasContext.drawImage(this.videoEl, 0, 0, width, height);

    let frame = this.oriCanvasContext.getImageData(0, 0, width, height);
    let l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (g > 100 && r > 100 && b < 43)
        frame.data[i * 4 + 3] = 0;
    }

    this.tmpCanvasContext.putImageData(frame, 0, 0);
    this.dataUrls.push(this.tmpCanvasEl.toDataURL())

    // if (this.dataUrls.length == this.props.frames.length) {
    //   alert('xx');
    //   //this.props.onComplete(this.dataUrls);
    // }
  }

  getNoParseFrames(frames) {
    return frames.filter(frame => !frame.dataUrl);
  }

  parseVideoSecondsToDataUrl(frames) {
    const noParseFrames = this.getNoParseFrames(frames);

    frames.forEach(({ time, frameId }) => {
      (time => setTimeout(() => { this.frameId = frameId; this.videoEl.currentTime = time; }, time * 1000))(time);
    });
  }

  constructor(props) {
    super(props);

    this.oriCanvasEl = this.oriCanvasContext = this.tmpCanvasEl = this.tmpCanvasContext = this.frameId = null;
  }

  componentWillReceiveProps(nextProps) {
    this.parseVideoSecondsToDataUrl(nextProps.frames);
  }

  render() {
    return (
      <div className="parse-frame-to-image-data">
        <canvas ref={ el => this.oriCanvasEl = el } style={{ display: 'none' }}></canvas>
        <canvas ref={ el => this.tmpCanvasEl = el } style={{ display: 'none' }}></canvas>
        <video ref={ el => this.videoEl = el } style={{ display: 'none' }} src={ this.props.videoSrc }></video>
      </div>
    );
  }

  componentDidMount() {
    this.oriCanvasContext = this.oriCanvasEl.getContext('2d');
    this.tmpCanvasContext = this.tmpCanvasEl.getContext('2d');

    this.videoEl.addEventListener('seeked', () => {
      this.computeFrame(this.frameId);
    }, false);
  }

}
