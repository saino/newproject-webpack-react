import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Step from './Step';
import Material from './material/Material';
import Roto from './roto/Roto';
import Compose from './compose/ComposeRender';
import { fetchStart, fetchEnd } from '../reducers/app';
import ComposeWrap from './compose/index';
import {
  getMaterials, deleteMaterial, uploadMaterial, setCurrFrameByScene,
  createScene, setDuration, clearMaterials, createRoto, addLayers
} from '../reducers/material';
import {
  addMaterial, changeLayer, select,
  removeMaterial, toggleMaterial, changePosision,
  changeContralPosision, removeSelected
} from '../reducers/compose';
import { finds, getItemByKey } from '../utils/stateSet';

class Make extends Component {
  state = {
    materialId: '',
    selectedIndex: 0
  };

  handleDeleteProjectMaterial = materialId =>
    this.props.deleteMaterial({ materialId });

  handleEditMaterial = materialId =>
    this.setState({
      materialId,
      selectedIndex: 1
    }, () => {
      const { material, createScene } = this.props;
      const { materialId } = this.state;

      // 进入到抠像页
      createScene({
        id: material.scenes.length,
        mtype: 'roto',
        materialId,
        currFrame: 1
      });
    });

  handleUploadMaterial = (material) =>
    this.props.uploadMaterial({ material });

  handleSetMaterialTime = (duration) =>
    this.props.setDuration({ materialId: this.state.materialId, duration });

  handleCreateRoto = (sceneId, frame, svg) =>
    this.props.createRoto({ materialId: this.state.materialId, sceneId, frame, mtype: 'manual', svg });

  handleFetchStart = () =>
    this.props.fetchStart();

  handleFetchEnd = () =>
    this.props.fetchEnd();

  handleChangeStep = (index) =>
    this.setState({ selectedIndex: index });

  handleGetMaterials = () =>
    this.props.getMaterials({ workId: this.props.match.params.workId });

  handleSetCurrFrameByScene = (sceneId, currFrame) =>
    this.props.setCurrFrameByScene({ sceneId, currFrame });

  handleJoinComposePage = (index, sceneId) => {
    const { material, addLayers } = this.props;
    const materialObj = { ...getItemByKey(material.materials, this.state.materialId, 'id'), baseLayer: true, order: 0, scene_id: sceneId };
    console.log(sceneId);
    this.handleChangeStep(index);
    addLayers(materialObj);
  };

  renderChild(index) {
    const {
      material, match, user, compose, app, userWorks,
      addMaterial, changeLayer,
      select, removeMaterial, toggleMaterial,
      changePosision, changeContralPosision, removeSelected, clearMaterials
    } = this.props;
    const work = getItemByKey(userWorks.works, match.params.workId, 'id') || {};

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
            scenes={ finds(material.scenes, this.state.materialId, 'material_id') }
            materials={ material.materials }
            material={ getItemByKey(material.materials, this.state.materialId, 'id') || { properties: {} } }
            rotos={ material.rotos }
            app={ app }
            workId={ work.id }
            workName={ work.name }
            onFetchStart={ this.handleFetchStart }
            onFetchEnd={ this.handleFetchEnd }
            onJoinCompose={ this.handleJoinComposePage }
            onCreateRoto={ this.handleCreateRoto }
            onSetCurrFrameByScene={ this.handleSetCurrFrameByScene }
            onSetMaterialTime={ this.handleSetMaterialTime } />
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
          <ComposeWrap materialId={ this.state.materialId } />
        );
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

const mapStateToProps = ({ material, user, compose, userWorks, app }) => ({
  material,
  user,
  compose,
  userWorks,
  app
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
  addMaterial: bindActionCreators(addMaterial, dispatch),
  createRoto: bindActionCreators(createRoto, dispatch),
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
