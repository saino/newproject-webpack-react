import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItemByKey } from '../../utils/stateSet';
import Pick from '../../components/pick/Pick';

export default class ControllerPanel extends Component {
  render() {
    const {
      filename, frame, app, rotoFrames, aiRotoed, aiRotoProgress,
      onGenerateRotoMaterial, onSelectFrame, onAutoRoto
    } = this.props;

    return (
      <div className="controller-panel">
       <Pick
         filename={ filename }
         app={ app }
         rotoFrames={ rotoFrames }
         frame={ frame }
         aiRotoed={ aiRotoed }
         aiRotoProgress={ aiRotoProgress }
         onGenerateRotoMaterial={ onGenerateRotoMaterial }
         onAutoRoto={ onAutoRoto }
         onSelectFrame={ onSelectFrame } />

       <style>{`
          .controller-panel {
            flex: 0 0 300px;
            background: #e9e9e9;
          }
       `}</style>
      </div>
     );
  }
}
