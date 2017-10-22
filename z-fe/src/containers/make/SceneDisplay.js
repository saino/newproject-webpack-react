import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItemByKey } from '../../utils/stateSet';

import TransformToolBar from './TransformToolBar';
import PenToolBar from './PenToolBar';
import VideoHandle from '../../components/video/VideoHandle';
import ParseFrameToSecond from '../../components/video/ParseFrameToSecond';
import sceneBgJPG from '../../statics/scene_bg.jpg';

class SceneDisplay extends Component {
  static propTypes = {

    materialId: PropTypes.string.isRequired,

    sceneId: PropTypes.string.isRequired

  };

  render() {
    const { materialId, sceneId, material } = this.props;
    const { src, totalFrame } = getItemByKey(material, materialId, 'materialId') || {};

    return (
      <div className="scene-center">

        <div className="scene-center-inner">
           <div className="canvas">

             {/*<VideoHandle videoSrc="http://localhost:7878/test.mp4" frameRate={ 24 } onComplete={ () => { console.log(1) } } />*/}

             <ParseFrameToSecond videoSrc={ src } totalFrame={ totalFrame }  />

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

function mapStateToProps ({ material }) {
  return { material };
}

export default connect(mapStateToProps)(SceneDisplay);
