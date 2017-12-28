import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Progress } from 'antd';

class PrePick extends Component {
  render() {
    const { filename, app, aiRotoProgress, onAutoRoto } = this.props;

    return (
      <div className="pre-pick">
        <div className="video-info">
          <label>素材名称</label>
          <label>{ filename }</label>
        </div>

        <div className="auto-start">
          <Button className="autoroto" type="primary" loading={ app.isFetching } onClick={ onAutoRoto }>开始云端AI自动抠像</Button>
        </div>

        <div className="roto-progress">
          { aiRotoProgress != null ? (<Progress percent={ aiRotoProgress } size="small" />) : void 0 }
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

          .pre-pick .auto-start .autoroto {
            display: block;
            width: 100%;
            line-height: 30px;
            font-size: 14px;
            text-align: center;
            border: 0 none;
            outline: none;
            letter-spacing: 1px;
            cursor: pointer;
          }

          .roto-progress {
            padding: 12px 15px 0;
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
