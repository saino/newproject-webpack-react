import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ParseFrameToSecond from '../../components/video/parseFrameToSecond';
import VideoRender from '../../components/video/VideoRender';

export default class XX extends Component {
  static propTypes = {
    material: PropTypes.object,
    scene: PropTypes.object
  }

  getMaterialVideoTime = (time) => {};

  preProcess() {
    const { material, scene } = this.props;

    if (material && scene && !scene.roto.length) {
      return (
        <div>

          {/* 处理素材(视频)，得到每帧对应的时长 */}
          <ParseFrameToSecond videoSrc={ material.path } frameLength={ material.frame_length } onGetMaterialVideoTime={ this.getMaterialVideoTime } />

          {/* 在canvas中画出每一帧的图片 */}
          <VideoRender
            frameDataUrl={ 10 }
            style={{ width: '100%', height: '100%', zIndex: 9999, transform: `scale(1)` }} />
        </div>
      );
    }
  }

  render() {
    const { material, scene } = this.props;

    return (
      <div className="scene-center">
        <div className="scene-center-inner">
          <div className="canvas">
            { this.preProcess() }
          </div>
        </div>
      </div>
    );
  }
}
