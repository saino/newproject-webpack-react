import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import { is, Map } from 'immutable';

export default class ParseFrameToImageData extends Component {
  static propTypes = {
    videoSrc: PropTypes.string,
    keyFrame: PropTypes.object,
    onComplete: PropTypes.func
  };
  static defaultProps = {
    videoSrc: '',
    keyFrame: {},
    onComplete: function () {}
  };
  dataUrls = [];
  secondKey = '1';

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
    this.props.onComplete(this.tmpCanvasEl.toDataURL());

    // if (this.dataUrls.length == this.props.frames.length) {
    //   alert('xx');
    //   //this.props.onComplete(this.dataUrls);
    // }
  }

  parseVideoSecondsToDataUrl(nextProps) {
    const { keyFrame } = nextProps;

    Object.keys(keyFrame).forEach(second => {
      const { time } = keyFrame[ second ];
      setTimeout(() => this.videoEl.currentTime = time, time * 1000);
    });
    //
    // if (!(this.secondKey in keyFrame)) {
    //   this.secondKey = '1';
    //   return;
    // }
    //
    // this.videoEl.currentTime = keyFrame[this.secondKey].time;
    // this.secondKey = (Number(this.secondKey) + 1).toString();
    //
    // setTimeout( () => this.parseVideoSecondsToDataUrl(nextProps), 0);

    // keys.forEach(second => {
    //   const { time } = keyFrame[second];
    //
    //   this.videoEl.currentTime = time;
    //
    //   // setTimeout(() => {
    //   //   console.log(this.dataUrls);
    //   //   this.computeFrame();
    //   // }, 0);
    //   // setTimeout(() =>
    //   //
    //   //
    //   //
    //   // );
    // });
      //setTimeout(() => this.videoEl.currentTime = keyFrame[ second ].time, time * 1000));
    // frames.forEach(({ time, frameId }) => {
    //   (time => setTimeout(() => { this.frameId = frameId; this.videoEl.currentTime = time; }, time * 1000))(time);
    // });
  }

  constructor(props) {
    super(props);

    this.oriCanvasEl = this.oriCanvasContext = this.tmpCanvasEl = this.tmpCanvasContext = this.frameId = null;
  }

  shouldComponentUpdate(nextProps) {
    const isUpdate = !(is(Map(this.props.keyFrame), Map(nextProps.keyFrame)))
      || !(is(this.props.videoSrc, nextProps.videoSrc))
      || !(is(this.props.onComplete, nextProps.onComplete));

    //console.log(nextProps.keyFrame, this.props.keyFrame);
    //console.log(is(nextProps.keyFrame, this.props.keyFrame), 'ddd');
    //const isUpdate = deepCompare(this, nextProps);
    //console.log(isUpdate, 'ss');
    if (isUpdate) {
      this.parseVideoSecondsToDataUrl(nextProps);
    }

    //console.log(is(currKeyFrame, nextKeyFrame), 'dd');
    // if (isUpdate) {
    //   this.parseVideoSecondsToDataUrl(nextProps);
    // }
    //
    // return isUpdate;
    return isUpdate;
  }

  render() {
    console.log(1);
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
      this.computeFrame();
    }, false);
  }

}
