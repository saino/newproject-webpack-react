import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import config from '../../config';
import { solutionFrame } from '../../reducers/frame';
import { getItemByKey } from '../../utils/stateSet';

/* 业务组件 */
import TransformToolBar from './TransformToolbar';
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
    imageUrl: '',
    isOpenPen: false
  };

  parseFrameComplete = (frames) => {
    const { materialId, sceneId, solutionFrame } = this.props;

    solutionFrame(frames.map(item => ({ ...item, materialId, sceneId })));
  };

  handleSetZoomOut = () =>
    this.setState({ scale: this.state.scale + config.transform.stepScale });

  handleSetZoomIn = () =>
    this.setState({ scale: this.state.scale - config.transform.stepScale });

  handleSetFrameImageUrl = (imageUrl) =>
    this.setState({ imageUrl });

  handleOpenPen = () =>
    this.setState({ isOpenPen: true });

  handleMoveNode = () => {};

  handleAddNode = () => {};

  handleRemoveNode = () => {};

  handleAddLayer = () => {};

  handleComplete = () =>
    this.setState({ isOpenPen: false });

  render() {
    const { path, frameLength, time, frame, scene } = this.props;
    const { scale, imageUrl, plyIndex } = this.state;

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
             <Matting isMetting={ this.state.isOpenPen }>
               {/* 显示帧图片 */}
               <VideoRender
                 style={{ width: '100%', height: '100%', transform: `scale(${ scale })`, zIndex: 1 }}
                 frameImageUrl={ imageUrl } />
             </Matting>

           </div>
        </div>

        <div className="tooltip">

          <div className="node">
            {/* 钢笔工具栏 */}
            <PenTool
              onOpenPen={ this.handleOpenPen }
              onMoveNode={ this.handleMoveNode }
              onAddNode={ this.handleAddNode }
              onRemoveNode={ this.handleRemoveNode }
              onAddLayer={ this.handleAddLayer }
              onComplete={ this.handleComplete } />
          </div>

          <div className="transform">
            {/* 变形栏 */}
            <TransformToolBar
              onZoomOut={ this.handleSetZoomOut }
              onZoomIn={ this.handleSetZoomIn } />
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
            overflow: hidden;
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
