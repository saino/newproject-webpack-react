import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';

export default class VideoRender extends Component {
  static propTypes = {
    frameDataUrl: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return !is(this.props.frameDataUrl, nextProps.frameDataUrl);
  }

  render() {
    return (
      <div className="video-render">
        <div className="video-render-inner"></div>
        <img src={ this.props.frameDataUrl } />
        <style>{`

          .video-render {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .video-render-inner {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: transparent;
          }

          .video-render img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

        `}</style>
      </div>
    );
  }
}
