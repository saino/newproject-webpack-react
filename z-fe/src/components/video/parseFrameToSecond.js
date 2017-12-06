import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deepCompare } from 'pure-render-immutable-decorator';
import VideoFrame from '../../utils/video-frame';
import { setDuration } from '../../reducers/material';

class ParseFrameToSecond extends Component {
  static propTypes = {
    videoSrc: PropTypes.string,
    materialId: PropTypes.string,
    totalFrame: PropTypes.number,
    onComplete: PropTypes.func
  };
  static defaultProps = {
    videoSrc: '',
    materialId: '',
    totalFrame: 0,
    onComplete: function () {}
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

    for (let i = 1; i <= this.props.totalFrame; i++) {
      res.push({ frameId: i, time: this.videoFrame.toTime(i) });
    }

    return res;
  }

  shouldComponentUpdate(nextProps) {
    return deepCompare(this, nextProps);
  }

  render() {
    return (
      <video style={{ display: 'none' }} ref={ el => this.playerEl = el } src={ this.props.videoSrc } controls></video>
    );
  }

  componentDidMount() {
    this.playerEl.addEventListener('loadedmetadata', () => {
      this.videoFrame = new VideoFrame({
        duration: this.playerEl.duration,
        frames: this.props.totalFrame
      });

      const { materialId, setDuration, onComplete } = this.props;

      // 得到素材的总时长
      setDuration(materialId, this.playerEl.duration);
      onComplete(this.mapSecondAndFrame());
    }, false);
  }
}

function mapDispatchToProps (dispatch) {
  return { setDuration: bindActionCreators(setDuration, dispatch) };
}

export default connect(null, mapDispatchToProps)(ParseFrameToSecond);
