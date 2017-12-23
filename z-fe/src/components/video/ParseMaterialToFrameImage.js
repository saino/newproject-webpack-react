import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import { is, Map } from 'immutable';
import { getItemByKey } from '../../utils/stateSet';

export default class ParseMaterialToFrameImage extends Component {
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
    this.props.onGetFrameImage(this.props.duration, currentTime, this.tmpCanvasEl.toDataURL('image/jpeg'));
  }

  parseVideoSecondsToDataUrl(nextProps) {
    const { duration, frameLength } = nextProps;
    const frameRate = Math.floor(frameLength / duration);
    const msByFrame = 1000 / frameRate;
    let isEnd = false;
    let isContinue = true;
    let i = 1;
    let timer = null;
    let time;

    for (i; i <= Math.floor(frameLength / 100); i++) {
      ((idx) => {
        let time = idx * msByFrame;

        timer = setTimeout(() => {
          clearTimeout(timer);
          // isEnd = (time / 1000) >= duration;
          //
          // if (isContinue) {
          //   this.videoEl.currentTime = time / 1000;
          // }
          //
          // if (isEnd && isContinue) {
          //   isContinue = false;
          // }
          this.videoEl.currentTime = time / 1000;

        }, time);

      })(i);
    }
  }

  constructor(props) {
    super(props);

    this.oriCanvasEl = this.oriCanvasContext = this.tmpCanvasEl = this.tmpCanvasContext = this.frameId = null;
  }

  // shouldComponentUpdate(nextProps) {
  //
  //   return true;
  //   // const isUpdate = nextProps.videoSrc !== this.props.videoSrc
  //   //   || nextProps.duration !== this.props.duration
  //   //   || !(is(Map(this.props.frames), Map(nextProps.frames)));
  //   //
  //   // if (isUpdate)
  //   //   this.parseVideoSecondsToDataUrl(nextProps);
  //   //
  //   // return isUpdate;
  // }

  componentWillReceiveProps(nextProps) {
    this.parseVideoSecondsToDataUrl(nextProps);
  }

  render() {
    return (
      <div className="parse-frame-to-image-data">
        <canvas ref={ el => this.oriCanvasEl = el } style={{ display: 'none' }}></canvas>
        <canvas ref={ el => this.tmpCanvasEl = el } style={{ display: 'none' }}></canvas>
        <video ref={ el => this.videoEl = el } crossOrigin="Anonymous" style={{ display: 'none' }} src={ this.props.videoSrc }></video>
      </div>
    );
  }

  componentDidMount() {
    this.oriCanvasContext = this.oriCanvasEl.getContext('2d');
    this.tmpCanvasContext = this.tmpCanvasEl.getContext('2d');
    this.videoEl.addEventListener('seeked', () => { this.computeFrame(this.videoEl.currentTime) }, false);
  }

}
