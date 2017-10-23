import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { solutionFrame } from '../../reducers/frame';
import { getItemByKey } from '../../utils/stateSet';

import TransformToolBar from './TransformToolBar';
import PenToolBar from './PenToolBar';
import VideoRender from '../../components/video/VideoRender';
import ParseFrameToSecond from '../../components/video/ParseFrameToSecond';
import sceneBgJPG from '../../statics/scene_bg.jpg';

class SceneDisplay extends Component {
  static propTypes = {

    materialId: PropTypes.number.isRequired,

    sceneId: PropTypes.number.isRequired,

    materials: PropTypes.array.isRequired

  };

  parseFrameComplete = (frames) => {
    const { materialId, sceneId, solutionFrame } = this.props;
    
    solutionFrame(frames.map(item => ({ ...item, materialId, sceneId })));
  };

  render() {
    const { materialId, sceneId, materials } = this.props;
    const { src, totalFrame } = getItemByKey(materials, materialId, 'materialId') || {};

    return (
      <div className="scene-center">

        <div className="scene-center-inner">
           <div className="canvas">

             {/* 处理视频得到每帧对应的视频秒数 */}
             <ParseFrameToSecond videoSrc={ src } totalFrame={ totalFrame } onComplete={ this.parseFrameComplete } />

             {/* 画出在video中每帧对应的秒数的图片 */}
             <VideoRender videoSrc={ src } second={ 3 } />


           </div>
        </div>

        <div className="tooltip">

          <div className="node">
            <PenToolBar />
          </div>

          <div className="transform">
            <TransformToolBar />
          </div>

        </div>

        <style>{`

          .scene-center {
            display: flex;
            align-items: stretch;
            flex: 1;
          }

          .scene-center-inner {
            flex: 1;
            padding: 80px 20px;
            display: flex;
            align-items: stretch;
            background: #fff;
          }

          .scene-center-inner,
          .scene-center-inner .canvas {
            height: 100%;
          }

          .scene-center-inner .canvas {
            flex: 1;
          }

          .scene-center-inner .canvas img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .tooltip {
            width: 40px;
            background: #f2f2f2;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: stretch;
          }

        `}</style>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    solutionFrame: bindActionCreators(solutionFrame, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SceneDisplay);
