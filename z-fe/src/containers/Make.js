import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { message } from 'antd';
import Step from './Step';
import Material from './material/Material';
import Roto from './roto/Roto';
import Compose from './compose/ComposeRender';
import ReleaseVideo from './releaseVideo/releaseVideo';
import { fetchStart, fetchEnd } from '../reducers/app';
import ComposeWrap from './compose/index';
import {
  getMaterials, deleteMaterial, uploadMaterial, setCurrFrameByScene,
  createScene, setDuration, clearMaterials, addLayers,
  createRoto, createAiRoto
} from '../reducers/material';
import {
  addMaterial, changeLayer, select,
  removeMaterial, toggleMaterial, changePosision,
  changeContralPosision, removeSelected
} from '../reducers/compose';
import { setRotoJobId, updateRotoJobId, setRotoProgress, setRotoMaterialJobId, setRotoMaterialProgress } from '../reducers/roto-process';
import { finds, getItemByKey, desc } from '../utils/stateSet';

class Make extends Component {
  state = {
    materialId: '',
    selectedIndex: 0,
    currentSceneId: ''
  };

  handleDeleteProjectMaterial = materialId =>
    this.props.deleteMaterial({ materialId }) ;

  handleEditMaterial = materialId => {
    const { material, match } = this.props;
    const descScenes = desc(finds(material.scenes, match.params.workId, 'work_id'));
    const currentSceneId = descScenes[0] ? descScenes[0].id + 1 : 0;
    const currentMaterial = getItemByKey(material.materials, materialId, 'id');

    if (currentMaterial.path.indexOf('.webm') > 0) {
      message.error('目前暂不支持webm格式的素材的抠像');
      return;
    }

    this.setState({
      materialId,
      selectedIndex: 1,
      currentSceneId
    }, () => {
      const { material, createScene, match, addLayers } = this.props;
      const { layers } = material;
      const { materialId, currentSceneId } = this.state;
      const workId = match.params.workId;
      const now = Date.now();
      const currMaterial = getItemByKey(material.materials, materialId, 'id');
      const layer = { ...currMaterial, id: `${ currMaterial.id }-${ now }`, baseLayer: true, order: 0, scene_id: currentSceneId };

      // 进入到抠像页
      createScene({
        id: currentSceneId,
        mtype: 'roto',
        materialId,
        order: currentSceneId,
        workId,
        currFrame: 0
      });

      // 设置基础layer
      addLayers(layer);
    });
  }

  handleUploadMaterial = (material) =>
    this.props.uploadMaterial({ material });

  handleSetMaterialTime = (duration) =>
    this.props.setDuration({ materialId: this.state.materialId, duration });

  handleCreateRoto = (materialId, sceneId, frame, svg) =>
    this.props.createRoto({ materialId, sceneId, frame, mtype: 'manual', svg });

  handleCreateAiRoto = (aiRotos) =>
    this.props.createAiRoto({ aiRotos });

  handleFetchStart = () =>
    this.props.fetchStart();

  handleFetchEnd = () =>
    this.props.fetchEnd();

  handleChangeStep = (index) => {
    this.setState({ selectedIndex: index })};

  handleGetMaterials = () =>
    this.props.getMaterials({ workId: this.props.match.params.workId });

  handleSetCurrFrameByScene = (sceneId, currFrame) =>
    this.props.setCurrFrameByScene({ sceneId, currFrame });

  handleSetRotoJobId = (workId, sceneId, jobId) =>
    this.props.setRotoJobId({ workId, sceneId, jobId });

  handleUpdateRotoJobId = (workId, sceneId, jobId) =>
    this.props.updateRotoJobId({ workId, sceneId, jobId });

  handleSetRotoProgress = (workId, sceneId, progress) =>
    this.props.setRotoProgress({ workId, sceneId, progress });

  handleSetRotoMaterialJobId = (workId, sceneId, materialJobId) =>
    this.props.setRotoMaterialJobId({ workId, sceneId, materialJobId });

  handleSetRotoMaterialProgress = (workId, sceneId, generateProgress) =>
    this.props.setRotoMaterialProgress({ workId, sceneId, generateProgress });

  handleSetRotoStop = (workId, sceneId) =>
    this.props.setRotoStop({ workId, sceneId });

  handleJoinComposePage(index, sceneId) {
    const { material, addLayers } = this.props;
    const { layers } = material;
    const { materialId } = this.state;
    const now = Date.now();
    const currMaterial = getItemByKey(material.materials, materialId, 'id');
    const layer = { ...currMaterial, id: `${ currMaterial.id }-${ now }`, baseLayer: true, order: 0, scene_id: sceneId };
    this.handleChangeStep(index, sceneId);
    //addLayers(layer);

    // rotoLayer = {
    //   ...rotoLayer,
    //   id: `${ rotoLayer.id }-${ now }`,
    //   order: 1,
    //   scene_id: sceneId,
    //   config: {
    //     width: rotoLayer.properties.width,
    //     height: rotoLayer.properties.height,
    //     left: 0,
    //     top: 0,
    //     controls: [
    //       { top: -5, left: -5 },
    //       { top: -5, left: rotoLayer.properties.width - 5 },
    //       { top: rotoLayer.properties.height - 5, left: rotoLayer.properties.width - 5 },
    //       { top: rotoLayer.properties.height - 5, left: -5 }
    //     ]
    // }};

    // if (layers.some(layer => layer.baseLayer && layer.scene_id === sceneId)) {
    //   return;
    // }
  };

  handleChangeCurrentSceneId = (currentSceneId) => {
    this.setState({
      currentSceneId
    });
  }

  renderChild(index) {
    const {
      material, match, user, compose, app, userWorks, rotoProcess,
      addMaterial, changeLayer,
      select, removeMaterial, toggleMaterial,
      changePosision, changeContralPosision, removeSelected, clearMaterials
    } = this.props;
    const { materialId, currentSceneId } = this.state;
    const work = getItemByKey(userWorks.works, match.params.workId, 'id') || { id: material.work_id, name: material.work_name };

    switch (index) {
      case 0:
        return (
          <Material
            user={ user }
            workId={ match.params.workId }
            materials={ material.materials }
            onGetMaterials={ this.handleGetMaterials }
            clearMaterials={ clearMaterials }
            onUploadMaterial={ this.handleUploadMaterial }
            onEdit={ this.handleEditMaterial }
            onDelete={ this.handleDeleteProjectMaterial } />
        );

      case 1:
        return (
          <Roto
            scenes={ finds(material.scenes, work.id, 'work_id') }
            materials={ material.materials }
            rotoProcess={ rotoProcess }
            material={ getItemByKey(material.materials, this.state.materialId, 'id') }
            rotos={ material.rotos }
            aiRotos={ material.aiRotos }
            layers={ material.layers }
            app={ app }
            sceneId={ currentSceneId }
            workId={ work.id }
            workName={ work.name }
            onFetchStart={ this.handleFetchStart }
            onFetchEnd={ this.handleFetchEnd }
            onJoinCompose={ this.handleJoinComposePage.bind(this) }
            onCreateRoto={ this.handleCreateRoto }
            onCreateAiRoto={ this.handleCreateAiRoto }
            onSetRotoJobId={ this.handleSetRotoJobId }
            onUpdateRotoJobId={ this.handleUpdateRotoJobId }
            onSetRotoProgress={ this.handleSetRotoProgress }
            onSetRotoMaterialJobId={ this.handleSetRotoMaterialJobId }
            onSetRotoMaterialProgress={ this.handleSetRotoMaterialProgress }
            onSetRotoStop={ this.handleSetRotoStop }
            onSetCurrFrameByScene={ this.handleSetCurrFrameByScene }
            onSetMaterialTime={ this.handleSetMaterialTime }
            onChangeSceneId={ this.handleChangeCurrentSceneId }/>
        );

      case 2:
        return (
          <Compose
            compose={ compose }
            addMaterial={ addMaterial }
            changeLayer={ changeLayer }
            select={ select }
            removeMaterial={ removeMaterial }
            toggleMaterial={ toggleMaterial }
            changePosision={ changePosision }
            removeSelected={ removeSelected }
            changeContralPosision={ changeContralPosision }
            style={{ width: '900px', height: '700px', left: "20%", top: "100px" }}
            frameDataUrl='http://localhost:3000/sample.jpg' />
          );
      case 999:
        return (
          <ComposeWrap
            materials={ material.materials }
            scenes={ finds(material.scenes, work.id, 'work_id') }
            materialId={ this.state.materialId }
            currentSceneId={ currentSceneId }
            workId={ work.id }
            workName={ work.name }
            handleChangeStep={ this.handleChangeStep }
            onSetCurrFrameByScene={ this.handleSetCurrFrameByScene }
            onChangeSceneId={ this.handleChangeCurrentSceneId } />
        );
      case 3:
        return (<ReleaseVideo workId={ work.id } workName={ work.name}/>);
      default :
          return null;
    }
  }

  componentWillMount() {
    this.handleGetMaterials();
  }

  render() {
    const { handleChangeStep } = this.props;
    const { selectedIndex } = this.state;

    return (
      <div className="make-wrap">

        <div className="make-header">
          <Step step={ selectedIndex } onChangeStep={ this.handleChangeStep } />
        </div>

        <div className="make-main">
          <div className="make-main-inner">
            { this.renderChild(selectedIndex) }
          </div>
        </div>

        <style>{`
          .make-wrap {
            display: flex;
            flex-flow: column nowrap;
            height: 100%;
          }
          .make-header {
            flex-basis: 0 0 54px;
          }
          .make-main {
            flex: 1;
            padding-top: 20px;
          }
          .make-main-inner {
            display: flex;
            height: 100%;
            flex-flow: row nowrap;
            align-items: stretch;
            width: 1236px;
            margin: 0 auto;
          }
        `}</style>

      </div>
    );
  }
}

const mapStateToProps = ({
  material,
  user,
  compose,
  userWorks,
  app,
  rotoProcess
}) => ({
  material,
  user,
  compose,
  userWorks,
  app,
  rotoProcess
});
const mapDispatchToProps = (dispatch) => ({
  fetchStart: bindActionCreators(fetchStart, dispatch),
  fetchEnd: bindActionCreators(fetchEnd, dispatch),
  getMaterials: bindActionCreators(getMaterials, dispatch),
  deleteMaterial: bindActionCreators(deleteMaterial, dispatch),
  uploadMaterial: bindActionCreators(uploadMaterial, dispatch),
  createScene: bindActionCreators(createScene, dispatch),
  addLayers: bindActionCreators(addLayers, dispatch),
  setDuration: bindActionCreators(setDuration, dispatch),
  setCurrFrameByScene: bindActionCreators(setCurrFrameByScene, dispatch),
  setRotoJobId: bindActionCreators(setRotoJobId, dispatch),
  updateRotoJobId: bindActionCreators(updateRotoJobId, dispatch),
  setRotoProgress: bindActionCreators(setRotoProgress, dispatch),
  setRotoMaterialJobId: bindActionCreators(setRotoMaterialJobId, dispatch),
  setRotoMaterialProgress: bindActionCreators(setRotoMaterialProgress, dispatch),
  addMaterial: bindActionCreators(addMaterial, dispatch),
  createRoto: bindActionCreators(createRoto, dispatch),
  createAiRoto: bindActionCreators(createAiRoto, dispatch),
  changeLayer: bindActionCreators(changeLayer, dispatch),
  select: bindActionCreators(select, dispatch),
  removeMaterial: bindActionCreators(removeMaterial, dispatch),
  toggleMaterial: bindActionCreators(toggleMaterial, dispatch),
  changePosision: bindActionCreators(changePosision, dispatch),
  removeSelected: bindActionCreators(removeSelected, dispatch),
  changeContralPosision: bindActionCreators(changeContralPosision, dispatch),
  clearMaterials: bindActionCreators(clearMaterials, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Make);
