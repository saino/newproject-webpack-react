import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import dragPNG from '../../statics/drag_icon.png';
import upPNG from '../../statics/up_icon.png';
import downPNG from '../../statics/down_icon.png';

export default class TransformTollBar extends Component {
  static propTypes = {
    onZoomOut: PropTypes.func.isRequired,
    onZoomIn: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="transform-toolbar">
        <span><Tooltip title="放大"><img src={ upPNG } /></Tooltip></span>
        <span><Tooltip title="缩小"><img src={ downPNG } /></Tooltip></span>
        <style>{`
          .transform-toolbar {
            padding: 12px;
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
          }

          .transform-toolbar span {
            display: block;
            width: 100%;
            height: 100%;
            cursor: pointer;
            margin: 8px 0;
          }

          .transform-toolbar span img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}
