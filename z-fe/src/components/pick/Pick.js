import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PerfectPick from './PerfectPick';
import PrePick from './PrePick';

export default class Pick extends Component {
  state = { index: 0 };

  getDontSuffixFilename(filename) {
    return /[^/]+(?=\.)/.exec(filename)[0];
  }

  render() {
    const {
      filename, app, workId, sceneId, rotoFrames, frame,
      onSelectFrame, onAutoRoto
    } = this.props;

    return (
      <div className="pick">
        <div className="header">{ !this.state.index ? '第一步 ：预抠像' : '第二步 ：精抠像' }</div>

        <div className="main">
          { !this.state.index ?
            (<PrePick filename={ this.getDontSuffixFilename(filename) } app={ app } onAutoRoto={ onAutoRoto } />) :
            (<PerfectPick app={ app } rotoFrames={ rotoFrames } frame={ frame } onSelectFrame={ onSelectFrame } />)
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
