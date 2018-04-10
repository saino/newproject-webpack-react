import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rotoedFrameListStyle from './rotoed-frame-list.css';
// 测试的图片关键帧图片模块
import testPNG from '../RotoAi/start-roto.png';

export default class RotoedFrameList extends Component {
  static propTypes = {
    frameList: PropTypes.array
  };

  render() {
    return (
      <div className={ rotoedFrameListStyle[ 'wrapper' ] }>
        <div className={ rotoedFrameListStyle[ 'wrapper-inner' ] }>
            <label>已扣像的关键帧序列</label>
            <div className={ rotoedFrameListStyle[ 'list' ] }>
              <ul>
                <li>
                  <i>1</i>
                  <img src={ testPNG } />
                </li>
                <li>
                  <i>2</i>
                  <img src={ testPNG } />
                </li>
                <li>
                  <i>3</i>
                  <img src={ testPNG } />
                </li>
                <li>
                  <i>4</i>
                  <img src={ testPNG } />
                </li>
                <li>
                  <i>5</i>
                  <img src={ testPNG } />
                </li>
                <li>
                  <i>6</i>
                  <img src={ testPNG } />
                </li>
              </ul>
            </div>
        </div>
      </div>
    );
  }
}
