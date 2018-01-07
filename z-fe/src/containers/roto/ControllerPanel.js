import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItemByKey } from '../../utils/stateSet';
import Pick from '../../components/pick/Pick';

export default class ControllerPanel extends Component {
  render() {
    const {
      filename, frame, app, rotoFrames, jobId, materialJobId, progress, generateProgress, workId, sceneId,
      onGenerateRotoMaterial, onSelectFrame, onAutoRoto, onSetRotoProgress, onStopAiRoto,
      onUpdateRotoJobId, onSetRotoMaterialJobId, onSetRotoMaterialProgress, onClearRotoProgress
    } = this.props;
    console.log(progress, 'xxdd');
    return (
      <div className="controller-panel">
       <Pick
         filename={ filename }
         app={ app }
         rotoFrames={ rotoFrames }
         frame={ frame }
         workId={ workId }
         sceneId={ sceneId }
         jobId={ jobId }
         materialJobId={ materialJobId }
         progress={ progress }
         generateProgress={ generateProgress }
         onUpdateRotoJobId={ onUpdateRotoJobId }
         onSetRotoMaterialJobId={ onSetRotoMaterialJobId }
         onSetRotoMaterialProgress={ onSetRotoMaterialProgress }
         onClearRotoProgress={ onClearRotoProgress }
         onGenerateRotoMaterial={ onGenerateRotoMaterial }
         onAutoRoto={ onAutoRoto }
         onSetRotoProgress={ onSetRotoProgress }
         onStopAiRoto={ onStopAiRoto }
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
