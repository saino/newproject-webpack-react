import React, { Component } from 'react';
import { connect } from 'react-redux';
import RotoDownload from './RotoDownload/RotoDownload';

class RotoOperationPanel extends Component {
  render() {
    return (
      <RotoDownload />
    );
  }
}

const mapStateToProps = ({ rotoFrontendActeractive }) => ({ rfa: rotoFrontendActeractive });

export default connect(mapStateToProps)(RotoOperationPanel);
