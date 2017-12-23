import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';

/* 交互组件 */
import Draggable from '../../components/interaction/react-draggable/Draggable';

export default class VideoRender extends Component {
  static propTypes = {
    frameImageUrl: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return !is(this.props, nextProps);
  }

  render() {
    const { style, frameImageUrl, onMouseDown, onMouseMove, onMouseUp, children } = this.props;

    return (
      <Draggable>
        <div
          className="video-render"
          style={ this.props.style }>
          <div className="video-render-inner"
            onMouseDown={ onMouseDown }
            onMouseMove={ onMouseMove }
            onMouseUp={ onMouseUp }>
          { children }
          </div>
          <img src={ this.props.frameImageUrl } />
          <style>{`

            .video-render-inner {
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
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
