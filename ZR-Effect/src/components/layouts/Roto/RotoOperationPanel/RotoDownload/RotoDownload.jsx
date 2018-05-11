import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { configureStartupAiRoto, configureAiRotoPercent } from '../../../../../stores/action-creators/roto-frontend-acteractive-creator';
import RotoAi from '../RotoAi/RotoAi';
import rotoOperationPanelStyle from '../roto-operation-panel.css';
import RotoedFrameList from '../RotoedFrameList/RotoedFrameList';

class RotoDownload extends Component {
  aiRotoHandle = materialId => {
    const { configureStartupAiRoto } = this.props;

    configureStartupAiRoto(materialId);
  };

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

const mapStateToProps = ({ rotoFrontendActeractive }) => ({ rfa: rotoFrontendActeractive });
const mapDispatchToProps = dispatch => bindActionCreators({
  configureStartupAiRoto,
  configureAiRotoPercent
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RotoDownload);
