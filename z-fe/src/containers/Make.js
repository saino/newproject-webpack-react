import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Step from './Step';
import Material from './material/Material';
import Roto from './roto/Roto';
import {
  getMaterials, deleteMaterial, uploadMaterial,
  createScene, setDuration, clearMaterials
} from '../reducers/material';
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
      selectedIndex: 1
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

  handleSetMaterialTime = (materialId, duration) =>
    this.props.setDuration(materialId, duration);

  renderChild(index) {
    const { material, match, user, uploadMaterial, clearMaterials } = this.props;

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

      case 1:
        return (
          <Roto
            scenes={ finds(material.scenes, this.state.materialId, 'material_id') }
            material={ getItemByKey(material.materials, this.state.materialId, 'id') }
            materialId={ this.state.materialId }
            onSetMaterialTime={ this.handleSetMaterialTime } />
        );
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

const mapStateToProps = ({ material, user }) => ({ material, user });
const mapDispatchToProps = (dispatch) => ({
  getMaterials: bindActionCreators(getMaterials, dispatch),
  deleteMaterial: bindActionCreators(deleteMaterial, dispatch),
  uploadMaterial: bindActionCreators(uploadMaterial, dispatch),
  createScene: bindActionCreators(createScene, dispatch),
  setDuration: bindActionCreators(setDuration, dispatch),
  clearMaterials: bindActionCreators(clearMaterials, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Make);
