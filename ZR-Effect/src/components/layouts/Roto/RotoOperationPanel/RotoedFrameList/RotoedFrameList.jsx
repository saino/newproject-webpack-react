import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rotoedFrameListStyle from './rotoed-frame-list.css';

export default class RotoedFrameList extends Component {
  static propTypes = {
    frameList: PropTypes.array
  };

  render() {
    return (
      <div className={ rotoedFrameListStyle[ 'wrapper' ] }>
        <div className={ rotoedFrameListStyle[ 'wrapper-inner' ] }>
            <label>已扣像的关键帧序列</label>
            <ul className={ rotoedFrameListStyle[ 'list' ] }>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
            </ul>
        </div>
      </div>
    );
  }
}
