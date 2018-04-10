import React, { Component } from 'react';
import { connect } from 'react-redux';
import RotoAi from '../RotoAi/RotoAi';
import rotoOperationPanelStyle from '../roto-operation-panel.css';
import RotoedFrameList from '../RotoedFrameList/RotoedFrameList';

class RotoDownload extends Component {
  render() {
    return (
      <div className={ rotoOperationPanelStyle[ 'wrapper-p' ] }>
        序列帧 
      </div>
    );
  }
}

const mapStateToProps = ({ rotoFrontendActeractive }) => ({ rfa: rotoFrontendActeractive });

export default connect(mapStateToProps)(RotoDownload);
