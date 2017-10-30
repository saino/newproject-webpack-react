import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import { is, Map } from 'immutable';
import { getItemByKey } from '../../utils/stateSet';

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

  computeFrame(currentTime) {
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
    this.props.onComplete(currentTime, this.tmpCanvasEl.toDataURL());
  }

  parseVideoSecondsToDataUrl(nextProps) {
    console.log(nextProps.frames,'dd');
    this.videoEl.play();
    //this.draw(frames);
    // frames.forEach(({ time }) =>
    //   setTimeout(() =>
    //     this.videoEl.currentTime = time,
    //     time * 1000
    //   )
    // );
  }

  draw() {
    if (this.videoEl.paused || this.videoEl.ended) {
      clearTimeout(rid);
      return;
    }

    const { frames } = this.props;
    const currentTime = this.videoEl.currentTime;
    let rid;

    console.log(currentTime);
    if (getItemByKey(frames, currentTime, 'time')) {
      console.log(currentTime, 'dd');
    }

    rid = setTimeout(this.draw.bind(this), Math.floor(1000 / 22.97436));
  }

  constructor(props) {
    super(props);

    this.oriCanvasEl = this.oriCanvasContext = this.tmpCanvasEl = this.tmpCanvasContext = this.frameId = null;
  }

  shouldComponentUpdate(nextProps) {
    const isUpdate = !(is(Map(this.props.frames), Map(nextProps.frames)))
      || !(is(this.props.videoSrc, nextProps.videoSrc))
      || !(is(this.props.onComplete, nextProps.onComplete));

    if (isUpdate)
      this.parseVideoSecondsToDataUrl(nextProps);

    return isUpdate;
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

    this.videoEl.addEventListener('play', this.draw.bind(this), false);
  }

}
