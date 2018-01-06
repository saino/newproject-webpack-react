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
    const {
      style, frameImageUrl, width, height, children, cursor,
      onMouseDown, onMouseMove, onMouseUp
    } = this.props;

    return (
      <Draggable cursor={ cursor }>
        <div
          className="video-render"
          style={ this.props.style }>
          <div className="video-render-inner"
            onMouseDown={ onMouseDown }
            onMouseMove={ onMouseMove }
            onMouseUp={ onMouseUp }>
            <img src={ this.props.frameImageUrl } />
            <div className="svg-wrap">
              { children }
            </div>
          </div>
          <style>{`
            .video-render-inner {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: ${ width }px;
              height: ${ height }px;
            }
            .video-render img {
              display: block;
              width: 100%;
              height: 100%;
            }
            .svg-wrap {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
          `}</style>
        </div>
      </Draggable>
    );
  }
}
