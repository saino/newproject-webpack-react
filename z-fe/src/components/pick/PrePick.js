import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchStart, fetchEnd } from '../../reducers/app';

class PrePick extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="pre-pick">

        <div className="video-info">
          <label>视频名称</label>
          <label>xxxx.avi</label>
        </div>

        <div className="auto-start">
          <button onClick={ this.props.onNext }>开始云端AI自动抠像</button>
        </div>

        <style>{`
          .pre-pick {
            width: 100%;
          }

          .pre-pick > .video-info {
            padding: 0 15px;
            line-height: 45px;
            color: #000;
            background: #fff;
          }

          .pre-pick > .video-info label:last-of-type {
            margin-left: 18px;
            font-size: 16px;
          }

          .pre-pick .auto-start {
            padding: 40px 15px 0;
          }

          .pre-pick .auto-start button {
            display: block;
            width: 100%;
            line-height: 30px;
            color: #fff;
            text-align: center;
            background: #2d8bbd;
            border: 0 none;
            outline: none;
            letter-spacing: 1px;
            cursor: pointer;
          }

        `}</style>
      </div>
    );
  }
}

function mapStateToProps ({ api }) {
  return { api };
}

// function mapDispatchToProps (dispatch) {
//   return {
//     getSceneType: bindActionCreators(getSceneType, dispatch)
//   };
// }

export default connect(mapStateToProps)(PrePick);
