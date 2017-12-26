import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItemByKey, finds } from '../../utils/stateSet';
//import { list as listScene } from '../reducers/scene';

/* 第三方组件 */
import Scenes from './Scenes';
import SceneDisplay from './SceneDisplay';
//import XX from './xx.js';
import ControllerPanel from './ControllerPanel';
import Timeline from './Timeline';

export default class Roto extends Component {
  state = {
    sceneIndex: 0,
    currFrame: 1
  };

  handleChangeScene = (sceneIndex) =>
    this.setState({ sceneIndex });

  handleChangeFrame = (currFrame) =>
    this.setState({ currFrame });

  handleSetMaterialTime = (duration) =>
    this.props.onSetMaterialTime(duration);

  handleCreateRoto = (svg) => {
    const { scenes, onCreateRoto } = this.props;
    const { currFrame } = this.state;

    onCreateRoto(scenes[ this.state.sceneIndex ].id, currFrame, svg);
  };

  handleSelectFrame = (frame) =>
    this.setState({ currFrame: frame })

  render() {
    const {
      scenes, material, rotos, app, workId,
      onFetchStart, onFetchEnd } = this.props;
    const { currFrame } = this.state;
    const scene = scenes[ this.state.sceneIndex ];
    const roto = getItemByKey(rotos, (item) => item.materialId == material.id && item.sceneId == scene.id && item.frame == currFrame);
    const rotoFrames = finds(rotos, (item) => item.materialId == material.id && item.sceneId == scene.id);

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
              path={ material.path }
              frameLength={ material.properties.length }
              time={ material.properties.time }
              frame={ currFrame }
              scene={ scene }
              roto={ roto }
              onCreateRoto={ this.handleCreateRoto }
              onSetMaterialTime={ this.handleSetMaterialTime } />
          </div>

          {/* 控制面板 */}
          <ControllerPanel
            app={ app }
            filename={ material.path }
            workId={ workId }
            rotoFrames={ rotoFrames }
            frame={ currFrame }
            sceneId={ scene ? scene.id : void 0 }
            onSelectFrame={ this.handleSelectFrame }
            onFetchStart={ onFetchStart }
            onFetchEnd={ onFetchEnd } />

        </div>
        <div className="roto-bottom">

          {/* 时间轴 */}
          <Timeline
            path={ material.path }
            frameLength={ material.properties.length }
            frame={ currFrame }
            time={ material.properties.time }
            frameLength={ material.properties.length }
            onChangeFrame={ this.handleChangeFrame } />

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
        `}</style>
      </div>
    );
  }
}
