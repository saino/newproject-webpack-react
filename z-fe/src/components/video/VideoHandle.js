import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

export default class VideoHandle extends Component {
  static propTypes = {
    videoSrc: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired
  };

  videoEl = null;
  handleLoadedMetaData = () => {
    this.videoEl.play();
    console.log(this.videoEl.duration, '秒');
  }

  render() {
    return (
      <div className="video-handle">

        <video ref={ (el) => this.videoEl = el } controls>
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
    function xx () {
      var time = +new Date;
      var diff = time - currTime;
      console.log(diff);
      currTime = time;

      setTimeout(function () {
        xx();
      }, 0);
    }

    this.videoEl.addEventListener('loadedmetadata', this.handleLoadedMetaData, false);
    var self = this;
    var currTime = +new Date;

    this.videoEl.addEventListener('playing', function () {
      if (self.videoEl.paused || self.videoEl.ended)
        return;

      //xx();
    }, false);
  }

};
