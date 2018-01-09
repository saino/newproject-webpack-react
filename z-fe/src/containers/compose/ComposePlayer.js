/**
 * 播放图层里的基础素材
 */

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { finds } from '../../utils/stateSet';

export default class ComposePlayer extends Component {
  static propTypes = {
    /**
     *
       item.id
       item.x 显示的x坐标
       item.y 显示的y坐标
       item.width 宽度
       item.height 高度
       item.transformStyle 变形样式
       item.materialPath 当前素材路径
     */
    players: PropTypes.array.isRequired,
    frame: PropTypes.number.isRequired,
    frameRate: PropTypes.number.isRequired
  };

  renderVideos() {
    return this.props.players.map(({ id, materialPath }) =>
      <video
        ref={ `player_${ id }` }
        key={ id }
        crossOrigin="Anonymous"
        src={ materialPath }
        style={{ display: 'none' }}></video>
    );
  }

  renderComposes() {
    const { players, positionX, positionY } = this.props;

    return finds(players, ({ baseLayer }) => !baseLayer).map(({ id, x, y, width, height, order, transformStyle }) =>
      <div
        key={ id }
        ref={ `render_${ id }` }
        className="compose-item"
        style={{ left: `${ x + positionX }px`, top: `${ y + positionY }px`, width: `${ width }px`, height: `${ height }px`, zIndex: order, ...transformStyle }}>
        <img />
      </div>
    );
  }

  renderCanvas() {
    return this.props.players.map(({ id }) =>
      <canvas key={ id } ref={ `canvas_${ id }` } style={{ display: 'none' }}></canvas>
    );
  }

  bindVideoSeekedEvent() {
    this.props.players.forEach(({ id }) => {
      findDOMNode(this.refs[`player_${ id }`]).addEventListener('seeked', () => this.computeFrame(), false);
    });
  }

  getFrameTime(frame, frameRate) {
    return (frame * (1000 / frameRate)) / 1000;
  }

  setVideoTime(players, frame, frameRate) {
    console.log(frame, this.getFrameTime(frame, frameRate), 'frame');
    players.forEach(({ id }) => {
      findDOMNode(this.refs[`player_${ id }`]).currentTime = this.getFrameTime(frame, frameRate);
    });
  }

  computeFrame() {
    const { players, roto } = this.props;
    let canvasContext, canvas, player, frameImageData, l, i, r, g, b, width, height, el;
    const points = roto[0].svg[0].points.map((item) => `${ item.x }px ${ item.y }px`);

    players.forEach(({ id, baseLayer }) => {
      canvas = findDOMNode(this.refs[`canvas_${ id }`]);

      if (canvas) {
        canvasContext = canvas.getContext('2d');
        player = findDOMNode(this.refs[`player_${ id }`]);
        width = canvas.width;
        height = canvas.height;
        canvasContext.drawImage(player, 0, 0, width, height);
        frameImageData = canvasContext.getImageData(0, 0, width, height);

        for (i = 0, l = frameImageData.data.length / 4; i < l; i++) {
          r = frameImageData.data[ i * 4 + 0 ];
          g = frameImageData.data[ i * 4 + 1 ];
          b = frameImageData.data[ i * 4 + 2 ];
        }

        canvasContext.putImageData(frameImageData, 0, 0);

        if (baseLayer) {
          el = findDOMNode(this.refs.base_item).querySelector('img')
          el.src = canvas.toDataURL('image/jpeg');
        } else {
          el = findDOMNode(this.refs[`render_${ id }`]).querySelector('img');
          el.style[ 'webkitClipPath' ] = `polygon(${ points.join(', ') })`;
          el.style[ 'clipPath' ] = `polygon(${ points.join(', ') })`;
          el.src = canvas.toDataURL('image/jpeg');
        }
      }

    });
  }

  componentWillReceiveProps(nextProps) {
    this.setVideoTime(nextProps.players, nextProps.frame, nextProps.frameRate);
  }

  render() {
    return (
      <div className="compose-player-wrap">
        { this.renderVideos() }
        { this.renderCanvas() }

        <div className="compose-player-render">
          <div ref="base_item" className="compose-base-item">
            <img />
          </div>
          { this.renderComposes() }
        </div>
        <style>{`
          .compose-player-wrap {
            width: 100%;
            height: 100%;
          }
          .compose-player-render {
            position: relative;
            width: 100%;
            height: 100%;
          }
          .compose-player-render img {
            display: block;
            width: 100%;
          }
          .compose-base-item {
            position: relative;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
          }
          .compose-item {
            position: absolute;
          }
        `}</style>
      </div>
    );
  }

  componentDidMount() {
    this.bindVideoSeekedEvent();
    this.setVideoTime(this.props.players, this.props.frame, this.props.frameRate);
  }
}
