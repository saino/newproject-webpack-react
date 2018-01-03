import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItemByKey, finds } from '../../utils/stateSet';
import { post } from '../../fetch/fetch.js';
import { getAuth } from '../../utils/auth';
import { message } from 'antd';
import Scenes from './Scenes';
import SceneDisplay from './SceneDisplay';
import ControllerPanel from './ControllerPanel';
import Timeline from '../Timeline';

export default class Roto extends Component {
  state = {
    sceneId: null,
    aiRotoed: false,
    aiRotoProgress: null
  };

  handleChangeScene = (sceneId) => {
    this.setState({ sceneId })};

  handleChangeFrame = (frame) =>
    this.props.onSetCurrFrameByScene(this.state.sceneId, frame);

  handleSetMaterialTime = (duration) =>
    this.props.onSetMaterialTime(duration);

  handleCreateRoto = (svg) => {
    const { scenes, onCreateRoto } = this.props;
    const { sceneId } = this.state;
    const scene = getItemByKey(scenes, sceneId, 'id');

    onCreateRoto(this.state.sceneId, scene.currFrame, svg);
  };

  handlePreAiRoto = () => {
    const { workId, onFetchStart, onFetchEnd, onSetRotoJobId } = this.props;
    const { sceneId } = this.state;
    const token = getAuth().token;

    onFetchStart();

    return post('/user/aiRoto', { token, work_id: workId, scene_id: sceneId }, (resp) => {
      onFetchEnd();
      onSetRotoJobId(workId, sceneId, resp);

      this.handleSetRotoProgress(resp);
    }, () => onFetchEnd());
  };

  handleSetRotoProgress = (jobId) => {
    const { workId, onSetRotoProgress } = this.props;
    const { sceneId } = this.state;
    const token = getAuth().token;
    let percent = 0;
    const timer = setInterval(() => {
      post('/user/getProgress',
        {
          token,
          job_id: jobId
        },
        (resp) => {
          percent = resp.progress == false ? 0 : parseFloat(resp.progress);

          if (Math.floor(resp.progress) >= 100) {
            onSetRotoProgress(workId, sceneId, percent);
            clearInterval(timer);
            return;
          }

          onSetRotoProgress(workId, sceneId, percent);
        }
      );
    }, 1000);
  };

  handleAutoRoto = () => {
    const {
      workId, workName, material,
      materials, scenes, rotos,
      onFetchStart, onFetchEnd,
      onSetAiRotoedProgressByScene, onSetAiJobIdByScene
    } = this.props;
    const { sceneId } = this.state;
    const scene = getItemByKey(scenes, sceneId, 'id');
    const token = getAuth().token;

    if (workId == null) {
      message.error('请回退到作品页，编辑一个作品');
      return;
    }

    scene.roto = finds(rotos, ({ material_id, scene_id }) => material_id == material.id && scene_id == scene.id);

    onFetchStart();

    post('/user/saveWork', { token, work_id: workId, status: 1, name: workName, config: { materials, scenes } }, resp => {
      onFetchEnd();
      this.handlePreAiRoto();
    }, () => onFetchEnd());
  };

  handleGenerateRotoMaterial = () => {
    this.props.onJoinCompose(999, this.state.sceneId);
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.sceneId == null) {
      this.setState({ sceneId: nextProps.scenes[0].id });
    }
  }

  render() {
    const {
      scenes, material, rotos,
      app, workId, rotoProcess
    } = this.props;
    const { sceneId } = this.state;
    const scene = getItemByKey(scenes, sceneId, 'id') || { currFrame: 1 };
    const roto = getItemByKey(rotos, (item) => item.material_id == material.id && item.scene_id == scene.id && item.frame == scene.currFrame);
    const rotoFrames = finds(rotos, (item) => item.material_id == material.id && item.scene_id == scene.id);
    const rotoPro = getItemByKey(rotoProcess, (item) => item.work_id == workId && item.scene_id == sceneId) || { 'job_id': null, progress: null };
    const { currFrame } = scene;

    return (
      <div className="roto-wrap">
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
            jobId={ rotoPro['job_id'] }
            progress={ rotoPro['progress'] }
            onGenerateRotoMaterial={ this.handleGenerateRotoMaterial }
            onAutoRoto={ this.handleAutoRoto }
            onSetRotoProgress={ this.handleSetRotoProgress }
            onSelectFrame={ this.handleChangeFrame } />

        </div>
        <div className="roto-bottom">
          {/* 时间轴 */}
          <Timeline
            path={ material.path }
            frameLength={ material.properties.length }
            frame={ scene.currFrame }
            time={ material.properties.time }
            frameLength={ material.properties.length }
            onChangeFrame={ this.handleChangeFrame } />

        </div>
        <style>{`
          .roto-wrap {
            display: flex;
            flex-flow: column nowrap;
            width: 100%;
            height: 100%;
          }
          .roto-inner {
            display: flex;
            flex: 1 0 0;
            flex-flow: row nowrap;
          }
          .scenes {
            flex: 0 0 200px;
            height: 100%;
            overflow: auto;
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
