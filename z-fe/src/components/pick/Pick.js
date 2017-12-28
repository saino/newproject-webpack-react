import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PerfectPick from './PerfectPick';
import PrePick from './PrePick';

export default class Pick extends Component {
  getDontSuffixFilename(filename) {
    return /([^/]+)(?=\.)/.exec(filename) ? RegExp.$1 : ''
  }

  render() {
    const {
      filename, app, workId, sceneId,
      rotoFrames, frame, aiRotoed, aiRotoProgress,
      onGenerateRotoMaterial, onSelectFrame, onAutoRoto
    } = this.props;

    return (
      <div className="pick">
        <div className="header">{ !aiRotoed ? '第一步 ：预抠像' : '第二步 ：精抠像' }</div>

        <div className="main">
          { !aiRotoed ?
            (<PrePick filename={ this.getDontSuffixFilename(filename) } app={ app } aiRotoProgress={ aiRotoProgress } onAutoRoto={ onAutoRoto } />) :
            (<PerfectPick app={ app } rotoFrames={ rotoFrames } frame={ frame } onSelectFrame={ onSelectFrame } onGenerateRotoMaterial={ onGenerateRotoMaterial } />)
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
    return !this.state.index ?
      (<PrePick />) : (<PerfectPick />);
  }
}
