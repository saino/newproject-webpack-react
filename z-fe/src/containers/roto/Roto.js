import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItemByKey } from '../../utils/stateSet';
//import { list as listScene } from '../reducers/scene';

/* 第三方组件 */
import Scenes from './Scenes';
import SceneDisplay from './SceneDisplay';
//import XX from './xx.js';
import ControllerPanel from './ControllerPanel';
import Timeline from './Timeline';

export default class Roto extends Component {
  state = {
    sceneIndex: 0
  };

  handleChangeScene = (sceneIndex) =>
    this.setState({ sceneIndex });

  handleSetMaterialTime = (duration) =>
    this.props.onSetMaterialTime(duration);

  handleSetMaterialFrames = (frames) =>
    this.props.onSetMaterialTime(frames);

  render() {
    const {
      scenes, material,
      onSetMaterialTime, onSetMaterialFrames
    } = this.props;
    const scene = scenes[ this.state.sceneIndex ];

    return (
      <div className="roto">
        <div className="roto-inner">
          {/* 镜头列表 */}
          <div className="scenes">
            <Scenes scenes={ scenes } onChangeScene={ this.handleChangeScene } />
          </div>

          {/* 镜头展示 */}
          <div className="scene-display">
            <SceneDisplay
              material={ material }
              scene={ scene }
              onSetMaterialTime={ this.handleSetMaterialTime } />
          </div>

          {/*<SceneDisplay
            materialId={ this.state.currMaterialId }
            sceneId={ this.state.currSceneId }
            materials={ this.props.material }
            selectStep={ this.props.selectStep }
            frameDataUrl={ this.state.frameDataUrl } /> */}

          {/* 控制面板 */}
          <ControllerPanel material={ material } />
        </div>
        <div className="roto-bottom">
          {/* 时间轴 */}
          <Timeline
            onSetMaterialFrames={ this.handleSetMaterialFrames }
            material={ material } />
          {/*<Timeline
            onSetMaterialFrames={ this.handleSetMaterialFrames }
            material={ material }
            frames={ this.props.frame }
            imageData={ this.props.imageData }
            onSelectDataUrl={ frameDataUrl => this.setState({ frameDataUrl }) } />*/}
        </div>
        <style>{`
          .roto {
            display: flex;
            flex-flow: column nowrap;
            width: 100%;
            height: 100%;
          }
          .roto-inner {
            display: flex;
            flex: 1;
            flex-flow: row nowrap;
            height: 100%;
          }
          .scenes {
            flex: 0 0 218px;
            height: 100%;
          }
          .scene-display {
            display: flex;
            flex: 1;
          }
          .roto-bottom {
            height: 120px;
          }
        `}</style>
      </div>
    );
  }
}

// function mapStateToProps ({ material, frame, imageData, step }) {
//   return {
//     material,
//     frame,
//     imageData,
//     selectStep: step.steps[step.current]
//   };
// }
//
// function mapDispatchToProps (dispatch) {
//   return {
//     listScene: function () {}//bindActionCreators(listScene, dispatch)
//   };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Roto);
