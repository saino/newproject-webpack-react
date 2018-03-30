import React, { Component } from 'react';
import { connect } from 'react-redux';
import rotoOperationPanelStyle from '../roto-operation-panel.css';
import RotoAi from '../RotoAi/RotoAi';
import RotoedFrameList from '../RotoedFrameList/RotoedFrameList';

class RotoDownload extends Component {
  render() {
    return (
      <div className={ rotoOperationPanelStyle[ 'wrapper' ] }>
        <div className={ rotoOperationPanelStyle[ 'ai-roto' ] }>
          <RotoAi isAiRoto={ true } aiRotoPercent={ 10.2 } filename="帅的没边" />
        </div>
        <div className={ rotoOperationPanelStyle[ 'rotoed-frame-list' ] }>
          <RotoedFrameList frameList={ [] } />
        </div>
        <div className={ rotoOperationPanelStyle[ 'action-type' ] }>
          <div>生成扣像素材</div>
          <div className={ rotoOperationPanelStyle[ 'active' ] }>生成PNG序列帧</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ rotoFrontendActeractive }) => ({ rfa: rotoFrontendActeractive });

export default connect(mapStateToProps)(RotoDownload);
