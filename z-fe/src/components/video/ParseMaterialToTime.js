import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import VideoFrame from '../../utils/video-frame';

export default class ParseMaterialToTime extends Component {
  static propTypes = {
    videoSrc: PropTypes.string,
    onSetMaterialTime: PropTypes.func,
    frameLength: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.reset();
  }

  reset() {
    this.playerEl = this.videoFrame = null;
  }

  mapSecondAndFrame() {
    const res = [];

    for (let i = 1; i <= this.props.frameLength; i++) {
      res.push({ frameId: i, time: this.videoFrame.toTime(i) });
    }

    return res;
  }

  shouldComponentUpdate(nextProps) {
    return deepCompare(this, nextProps);
  }

  render() {
    return (
      <video style={{ display: 'none' }} ref={ el => this.playerEl = el } src={ this.props.videoSrc }></video>
    );
  }

  componentDidMount() {
    this.playerEl.addEventListener('loadedmetadata', () => {
      this.videoFrame = new VideoFrame({
        duration: this.playerEl.duration,
        frames: this.props.frameLength
      });

      // 设置素材的总时长
      this.props.onSetMaterialTime(this.playerEl.duration);

      // const { materialId, setDuration, onComplete } = this.props;
      //
      // // 得到素材的总时长
      // setDuration(materialId, this.playerEl.duration);
      // onComplete(this.mapSecondAndFrame());
    }, false);
  }
}
