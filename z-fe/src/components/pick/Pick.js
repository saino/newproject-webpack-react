import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import PerfectPick from './PerfectPick';
import PrePick from './PrePick';

export default class Pick extends Component {
  getDontSuffixFilename(filename) {
    return /([^/]+)(?=\.)/.exec(filename) ? RegExp.$1 : ''
  }

  render() {
    const {
      filename, app, workId, sceneId,
      rotoFrames, frame, jobId, materialJobId, progress, generateProgress,
      onGenerateRotoMaterial, onSelectFrame, onAutoRoto, onSetRotoProgress, onStopAiRoto,
      onUpdateRotoJobId, onSetRotoMaterialJobId, onSetRotoMaterialProgress, onClearRotoProgress
    } = this.props;

    return (
      <div className="pick">
        <div className="header">抠像</div>

        <div className="main">
          <PrePick
            rotoFrames={ rotoFrames }
            filename={ this.getDontSuffixFilename(filename) }
            frame={ frame }
            app={ app }
            workId={ workId }
            sceneId={ sceneId }
            jobId={ jobId }
            progress={ progress }
            materialJobId={ materialJobId }
            generateProgress={ generateProgress }
            onSetRotoProgress={ onSetRotoProgress }
            onStopAiRoto={ onStopAiRoto }
            onUpdateRotoJobId={ onUpdateRotoJobId }
            onSetRotoMaterialJobId={ onSetRotoMaterialJobId }
            onSetRotoMaterialProgress={ onSetRotoMaterialProgress }
            onClearRotoProgress={ onClearRotoProgress }
            onGenerateRotoMaterial={ onGenerateRotoMaterial }
            onSelectFrame={ onSelectFrame }
            onAutoRoto={ onAutoRoto } />
          {/* !isAiRotoed ?
            (<PrePick
              filename={ this.getDontSuffixFilename(filename) }
              app={ app }
              workId={ workId }
              sceneId={ sceneId }
              jobId={ jobId }
              progress={ progress }
              onSetRotoProgress={ onSetRotoProgress }
              onStopAiRoto={ onStopAiRoto }
              onAutoRoto={ onAutoRoto } />) :
            (<PerfectPick
              rotoFrames={ rotoFrames }
              frame={ frame }
              app={ app }
              workId={ workId }
              sceneId={ sceneId }
              materialJobId={ materialJobId }
              generateProgress={ generateProgress }
              onUpdateRotoJobId={ onUpdateRotoJobId }
              onSetRotoMaterialJobId={ onSetRotoMaterialJobId }
              onSetRotoMaterialProgress={ onSetRotoMaterialProgress }
              onClearRotoProgress={ onClearRotoProgress }
              onSelectFrame={ onSelectFrame }
              onGenerateRotoMaterial={ onGenerateRotoMaterial } />)*/
          }
        </div>

        <style>{`
          .pick {
            font-size: 14px;
            font-family: 'microsoft yahei';
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
          }

          .pick > .header {
            text-align: center;
            line-height: 40px;
            color: #fff;
            background: #2d8bbd;
          }

          .pick > .main {
            flex: 1;
          }

        `}</style>

      </div>
    );
  }
}
