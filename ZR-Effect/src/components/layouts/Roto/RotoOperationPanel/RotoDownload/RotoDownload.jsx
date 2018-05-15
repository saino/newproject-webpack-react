import React, { Component } from 'react';
import RotoAi from '../RotoAi/RotoAi';
import rotoOperationPanelStyle from '../roto-operation-panel.css';
import RotoedFrameList from '../RotoedFrameList/RotoedFrameList';

export default class RotoDownload extends Component {
  render() {
    return (
      <div className={ rotoOperationPanelStyle[ 'wrapper-p' ] }>
        <div className={ rotoOperationPanelStyle[ 'ai-roto' ] }>
          <RotoAi />
        </div>
        <div className={ rotoOperationPanelStyle[ 'rotoed-frame-list' ] }>
          <RotoedFrameList />
        </div>
      </div>
    );
  }
}
