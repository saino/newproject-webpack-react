import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import videoFrame from '../../utils/videoFrame';
import { solutionFrame } from '../../reducers/frame';

class ParseFrameToSecond extends Component {
  static propTypes = {
    videoSrc: PropTypes.string,
    totalFrame: PropTypes.number
  };
  static defaultProps = {
    videoSrc: '',
    totalFrame: 0
  };

  render() {
    return (
      <div>1</div>
    );
  }

}

function mapStateToProps ({ frame }) {
  return { frame };
}

function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps
)(ParseFrameToSecond);
