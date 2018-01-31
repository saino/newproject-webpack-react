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
  state = {
    scale: 1,
    imageUrl: '',
    isOpenPen: false,
    visibleShadow: true
  };

  handleSetZoomOut = () =>
    this.setState({ scale: this.state.scale + config.transform.stepScale });

  handleSetZoomIn = () =>
    this.setState({ scale: this.state.scale - config.transform.stepScale });

  handleSetFrameImageUrl = (imageUrl) =>
    this.setState({ imageUrl });

  handleMettingComplete = (svg) =>
    this.setState({ isOpenPen: false }, () => {
      this.props.onCreateRoto([{
        path_type: 'bezier',
        closed: svg.closed,
        points: svg.points
      }]);
    });

 handleRemoveMettingPoint = (points) =>
   this.props.onRemoveMettingPoint(points);

 handleMoveMettingPoint = (points) =>
   this.props.onCreateRoto([{
     path_type: 'bezier',
     closed: false,
     points: points
   }]);

  handleOpenPen = () =>
    this.setState({ isOpenPen: true });

  handleMoveNode = () => {};

  handleAddNode = () => {};

  handleRemoveNode = () => {

  };

  handleVisibleShadow = () =>
    this.setState({ visibleShadow: !this.state.visibleShadow });

  handleComplete = () => {

  };

  render() {
    const {
      path, frameLength, time, frame,
      roto, onSetMaterialTime, width, height, sceneId
    } = this.props;
    const { scale, imageUrl, isOpenPen, visibleShadow } = this.state;
    const points = roto && visibleShadow ? roto.svg.reduce((curr, next) => curr.concat(next.points), []) : [];

    return (
      <div className="scene-center">
        <div className="scene-center-inner">
           <div className="canvas">

             {/* 得到视频的时长 */}
             { path != '' ?
               (<ParseMaterialToTime
                 videoSrc={ `${ config.api.host }${ path }` }
                 frameLength={ frameLength + 1 }
                 sceneId={ sceneId }
                 time={ time }
                 frame={ frame + 1 }
                 width={ width }
                 height={ height }
                 onSetFrameImageUrl={ this.handleSetFrameImageUrl }
                 onSetMaterialTime={ onSetMaterialTime } />) : void 0
             }

             {/* 抠像 */}
             { path != '' ?
               (<Matting
                 ref="matting"
                 onComplete={ this.handleMettingComplete }
                 onRemoveMettingPoint={ this.handleRemoveMettingPoint }
                 onMoveMettingPoint={ this.handleMoveMettingPoint }
                 isMetting={ this.state.isOpenPen }
                 points={ points }>
                 {/* 显示帧图片 */}
                 <VideoRender
                   style={{ width: '100%', height: '100%', transform: `scale(${ scale })`, userSelect: 'none', zIndex: 1 }}
                   width={ width }
                   height={ height }
                   cursor={ isOpenPen ? 'default' : 'move' }
                   frameImageUrl={ imageUrl } />
               </Matting>) : void 0
             }


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
              onVisibleShadow={ this.handleVisibleShadow }
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
