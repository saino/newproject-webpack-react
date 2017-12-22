import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import config from '../../config';
import { solutionFrame } from '../../reducers/frame';
import { getItemByKey } from '../../utils/stateSet';

/* 业务组件 */
import TransformToolBar from '../make/TransformToolbar';
import PenTool from './PenTool';
import VideoRender from '../../components/video/VideoRender';
import Matting from '../../components/matting/Matting';
import ParseMaterialToTime from '../../components/video/ParseMaterialToTime';
// import ComposeRender from './ComposeRender';
import sceneBgJPG from '../../statics/scene_bg.jpg';

export default class SceneDisplay extends Component {
  static propTypes = {
    materialId: PropTypes.number.isRequired,
    sceneId: PropTypes.number.isRequired,
    materials: PropTypes.array.isRequired,
    frameDataUrl: PropTypes.string
  };
  static defaultProps = {
    frameDataUrl: ''
  };
  state = {
    scale: 1,
    imageUrl: ''
  };

  parseFrameComplete = (frames) => {
    const { materialId, sceneId, solutionFrame } = this.props;

    solutionFrame(frames.map(item => ({ ...item, materialId, sceneId })));
  };

  handleZoomOut = () =>
    this.setState({ scale: this.state.scale + config.transform.stepScale });

  handleZoomIn = () =>
    this.setState({ scale: this.state.scale - config.transform.stepScale });

  handleSetFrameImageUrl = (imageUrl) =>
    this.setState({ imageUrl });

  render() {
    const { path, frameLength, time, frame, scene } = this.props;
    const { scale, imageUrl } = this.state;

    // const { src, totalFrame } = getItemByKey(materials, materialId, 'materialId') || {};
    // let renderSomething = (
    //   <VideoRender
    //     ref="video_render"
    //     style={{ width: '100%', height: '100%', zIndex: 9999, transform: `scale(${ scale })` }}
    //     frameDataUrl={ frameDataUrl } />
    // );

    // switch (selectStep.key){
    //     case 'effect':
    //     {/* 画出在video中每帧对应的秒数的图片 */}
    //         renderSomething= <VideoRender
    //             ref="video_render"
    //             style={{ width: '100%', height: '100%', zIndex: 9999, transform: `scale(${ scale })` }}
    //             frameDataUrl={ frameDataUrl } />
    //         break
    //     case 'combine':
    //        renderSomething=<ComposeRender
    //            style={{ width: '100%', height: '100%' }}
    //            frameDataUrl='http://localhost:3000/sample.jpg'></ComposeRender>
    //         break;
    //     default:
    //         renderSomething= <VideoRender
    //             ref="video_render"
    //             style={{ width: '100%', height: '100%', zIndex: 9999, transform: `scale(${ scale })` }}
    //             frameDataUrl={ frameDataUrl } />
    //}

    return (
      <div className="scene-center">

        <div className="scene-center-inner">
           <div className="canvas">

             {/* 得到视频的时长 */}
             <ParseMaterialToTime
               videoSrc={ path }
               frameLength={ frameLength }
               time={ time }
               frame={ frame }
               onSetFrameImageUrl={ this.handleSetFrameImageUrl  }
               onSetMaterialTime={ this.props.onSetMaterialTime } />

             {/* 抠像 */}
             <Matting style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0)', position: 'absolute', left: 0, top: 0, zIndex: 10000 }}></Matting>

             {/* 播放视频每张帧图片 */}
             <VideoRender
               style={{ width: '100%', height: '100%', zIndex: 9999, transform: `scale(${ scale })` }}
               frameImageUrl={ imageUrl } />

           </div>
        </div>

        <div className="tooltip">

          <div className="node">
            <PenTool />
          </div>

          <div className="transform">
            <TransformToolBar
              onZoomOut={ this.handleZoomOut }
              onZoomIn={ this.handleZoomIn } />
          </div>

        </div>

        <style>{`
          .scene-center {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
          }
          .scene-center-inner {
            flex: 1;
            padding: 20px;
            display: flex;
            align-items: stretch;
            background: #fff;
          }
          .scene-center-inner,
          .scene-center-inner .canvas {
            position: relative;
            height: 100%;
          }
          .scene-center-inner .canvas {
            flex: 1;
            position:relative;
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

// function mapDispatchToProps (dispatch) {
//   return {
//     solutionFrame: bindActionCreators(solutionFrame, dispatch)
//   };
// }
//
// export default connect(
//   null,
//   mapDispatchToProps
// )(SceneDisplay);
