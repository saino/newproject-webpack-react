import React, { Component } from 'react';
import dragPNG from '../../statics/drag_icon.png';
import upPNG from '../../statics/up_icon.png';
import downPNG from '../../statics/down_icon.png';

export default class TransformTollbar extends Component {
  render() {
    return (
      <div className="transform-toolbar">
        <span><img src={ dragPNG } /></span>
        <span><img src={ upPNG } /></span>
        <span><img src={ downPNG } /></span>
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
