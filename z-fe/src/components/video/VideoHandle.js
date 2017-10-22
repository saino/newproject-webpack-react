import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class VideoHandle extends Component {
  render() {
    return (
      <div className="video-handle">

        <video ref={ (el) => this.videoEl = el } src={ this.props.videoSrc } controls></video>

        <style>{`
          .video-handle {
            display: block;
          }
        `}</style>

      </div>
    );
  }

  componentDidMount() {
    this.videoEl.addEventListener('', this.handleLoadedMetaData, false);
  }

};

function mapStateToProps ({ framing }) {
  return { framing };
}

export default connect(mapStateToProps)(VideoHandle);
