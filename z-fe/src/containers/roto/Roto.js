import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItemByKey, finds } from '../../utils/stateSet';
import { post } from '../../fetch/fetch.js';
import { getAuth } from '../../utils/auth';
import Scenes from './Scenes';
import SceneDisplay from './SceneDisplay';
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

  handleAutoRoto = () => {
    const {
      workId, workName, material,
      materials, scenes, rotos,
      onFetchStart, onFetchEnd
    } = this.props;
    const { sceneIndex } = this.state;
    const scene = scenes[ sceneIndex ];
    const token = getAuth().token;
    scene.roto = finds(rotos, ({ material_id, scene_id }) => material_id == material.id && scene_id == scene.id);

    onFetchStart();
    post('/user/saveWork', { token, work_id: workId, status: 1, name: workName, config: { materials, scenes } }, resp => {
      onFetchEnd();
      //post('/user/aiRoto', {  });
    }, () => onFetchEnd());
  };

  handleSelectFrame = (frame) =>
    this.setState({ currFrame: frame });

  render() {
    const { scenes, material, rotos, app, workId } = this.props;
    const { currFrame } = this.state;
    const scene = scenes[ this.state.sceneIndex ];
    const roto = getItemByKey(rotos, (item) => item.material_id == material.id && item.scene_id == scene.id && item.frame == currFrame);
    const rotoFrames = finds(rotos, (item) => item.material_id == material.id && item.scene_id == scene.id);

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
            rotoFrames={ rotoFrames }
            frame={ currFrame }
            onAutoRoto={ this.handleAutoRoto }
            onSelectFrame={ this.handleSelectFrame } />

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
