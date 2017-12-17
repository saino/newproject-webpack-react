import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Step from './Step';
import Material from './material/Material';
import Roto from './roto/Roto';
import { getMaterials, deleteMaterial } from '../reducers/material';

class Make extends Component {
  state = {
    materialId: '',
    selectedIndex: 0
  };

  handleDeleteProjectMaterial = materialId =>
    this.props.deleteMaterial(materialId);

  handleEditMaterial = materialId => {
    alert(materialId);
    // this.setState({
    //   materialId,
    //   selectedIndex: 1
    // });
  };

  renderChild(index) {
    const { material, match, user } = this.props;

    switch (index) {
      case 0:
        return (
          <Material
            user={ user }
            workId={ match.params.workId }
            materials={ material.materials }
            onEdit={ this.handleEditMaterial }
            onDelete={ this.handleDeleteProjectMaterial } />
        );

      case 1:
        return (
          <Roto
            works={ this.props.userWorks.works }
            workId={ this.props.match.params.workId }
            materialId={ this.state.materialId } />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Make);
