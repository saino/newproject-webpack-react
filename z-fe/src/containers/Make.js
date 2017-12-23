import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Step from './Step';
import Material from './material/Material';
import Roto from './roto/Roto';
import Compose from './compose/ComposeRender';
import ComposeWrap from './compose/index';
import {
  getMaterials, deleteMaterial, uploadMaterial,
  createScene, setDuration, setFrames, clearMaterials
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
    this.props.deleteMaterial(materialId);

  handleEditMaterial = materialId =>
    this.setState({
      materialId,
      selectedIndex: 999
    }, () => {
      const { material, createScene } = this.props;
      const { materialId } = this.state;

      // 进入到抠像页
      createScene({
        id: material.scenes.length + 1,
        mtype: 'roto',
        materialId,
        roto: []
      });
    });

  handleSetMaterialTime = (duration) =>
    this.props.setDuration(this.state.materialId, duration);

  handleSetMaterialFrames = (frames) =>
    this.props.setFrames(this.state.materialId, frames);

  renderChild(index) {
    const {
      material, match, user, compose,
      uploadMaterial, addMaterial, changeLayer,
      select, removeMaterial, toggleMaterial,
      changePosision, changeContralPosision, removeSelected, clearMaterials
    } = this.props;

    switch (index) {
      case 0:
        return (
          <Material
            user={ user }
            workId={ match.params.workId }
            materials={ material.materials }
            clearMaterials={ clearMaterials }
            onUploadMaterial={ uploadMaterial }
            onEdit={ this.handleEditMaterial }
            onDelete={ this.handleDeleteProjectMaterial } />
        );

      case 2:
        return (
          <Roto
            scenes={ finds(material.scenes, this.state.materialId, 'material_id') }
            material={ getItemByKey(material.materials, this.state.materialId, 'id') }
            onSetMaterialFrames={ this.handleSetMaterialFrames }
            onSetMaterialTime={ this.handleSetMaterialTime } />
        );

      case 1:
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
          <ComposeWrap materialId={this.state.materialId} />
        );
      default : 
          return null;
    }
  }

  componentWillMount() {
    this.props.getMaterials({ workId: this.props.match.params.workId });
  }

  render() {
    const { selectedIndex } = this.state;

    return (
      <div className="make-wrap">

        <div className="make-header">
          <Step step={ selectedIndex } />
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

const mapStateToProps = ({ material, user, compose }) => ({
  material,
  user,
  compose
});
const mapDispatchToProps = (dispatch) => ({
  getMaterials: bindActionCreators(getMaterials, dispatch),
  deleteMaterial: bindActionCreators(deleteMaterial, dispatch),
  uploadMaterial: bindActionCreators(uploadMaterial, dispatch),
  createScene: bindActionCreators(createScene, dispatch),
  setDuration: bindActionCreators(setDuration, dispatch),
  setFrames: bindActionCreators(setFrames, dispatch),
  addMaterial: bindActionCreators(addMaterial, dispatch),
  changeLayer: bindActionCreators(changeLayer, dispatch),
  select: bindActionCreators(select, dispatch),
  removeMaterial: bindActionCreators(removeMaterial, dispatch),
  toggleMaterial: bindActionCreators(toggleMaterial, dispatch),
  changePosision: bindActionCreators(changePosision, dispatch),
  removeSelected: bindActionCreators(removeSelected, dispatch),
  changeContralPosision: bindActionCreators(changeContralPosision, dispatch),
  clearMaterials: bindActionCreators(clearMaterials, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Make);
