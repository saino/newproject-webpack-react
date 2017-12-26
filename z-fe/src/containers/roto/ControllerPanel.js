import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItemByKey } from '../../utils/stateSet';
import Pick from '../../components/pick/Pick';

export default class ControllerPanel extends Component {
  render() {
    const {
      filename, app, workId, sceneId, rotoFrames, frame,
      onSelectFrame, onFetchStart, onFetchEnd
    } = this.props;

    return (
      <div className="controller-panel">
       <Pick
         filename={ filename }
         app={ app }
         rotoFrames={ rotoFrames }
         frame={ frame }
         workId={ workId }
         sceneId={ sceneId }
         onSelectFrame={ onSelectFrame }
         onFetchStart={ onFetchStart }
         onFetchEnd={ onFetchEnd } />

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
