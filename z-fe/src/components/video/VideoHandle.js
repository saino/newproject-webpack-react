import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import config from '../../config';
import VideoFrame from '../../utils/videoFrame';

export default class VideoHandle extends Component {
  static propTypes = {
    videoSrc: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired
  };

  videoEl = null;
  videoFrame = null;

  handleLoadedMetaData = () => {
    this.videoEl.play();
    //console.log(!!VideoFrame);
    //console.log(!!this.videoEl.getVideoPlaybackQuality);
  }

  render() {
    return (
      <div className="video-handle">

        <video id="video_player" ref={ (el) => this.videoEl = el } controls>
          <source src={ this.props.videoSrc } />
        </video>

      <style>{`
        .video-handle {
          display: block;
        }
      `}</style>

      </div>
    );
  }

  componentDidMount() {
    this.videoEl.addEventListener('loadedmetadata', this.handleLoadedMetaData, false);
    //console.log(VideoFrame, 'mlgd');
    //console.log(VideoFrame, 'ddd');
    this.videoFrame = new VideoFrame({
      id: 'video_player',
      frameRate: config.frame.rate
    });
    console.log(this.videoFrame.toFrames(), 'frames');
  }

};
