import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';

/* 交互组件 */
import Draggable from '../../components/interaction/react-draggable/Draggable';

export default class VideoRender extends Component {
  static propTypes = {
    frameDataUrl: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return !is(this.props.frameDataUrl, nextProps.frameDataUrl);
  }

  render() {
    return (
      <Draggable>
        <div className="video-render" style={ this.props.style }>
        <div className="video-render-inner"></div>
        <img src={ this.props.frameDataUrl } />
        <style>{`

          .video-render-inner {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(0,0,0,.25);
          }

          .video-render img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

        `}</style>
        </div>
      </Draggable>
    );
  }
}
