import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Progress } from 'antd';

export default class PrePick extends Component {
  getAiRotoProgress = (prevProps, props) => {
    // const { jobId, sceneId, progress, onSetRotoProgress, onStopAiRoto } = props;
    // console.log(prevProps, props, 'd');
    // if (jobId != null || prevProps.progress != progress) {
    //   onSetRotoProgress(jobId);
    // }
    //  else if (jobId != null && sceneId !== prevProps.sceneId) {
    //   console.log('太阳');
    //   onStopAiRoto();
    // }
  };

  componentWillReceiveProps(nextProps) {
    //this.getAiRotoProgress(this.props, nextProps);
    // if (nextProps.sceneId != this.props.sceneId) {
    //   //nextProps.onStopAiRoto(this.props.workId, this.props.sceneId);
    // } else {
    //   this.getAiRotoProgress(this.props, nextProps)
    // }
  }

  render() {
    const {
      filename, app, jobId, progress,
      onAutoRoto
    } = this.props;

    return (
      <div className="pre-pick">
        <div className="video-info">
          <label>素材名称</label>
          <label>{ filename }</label>
        </div>

        { jobId == null ? (
          <div className="auto-start">
            <Button className="autoroto" type="primary" loading={ app.isFetching } onClick={ onAutoRoto }>开始云端AI自动抠像</Button>
          </div>
        ) : (
          <div className="roto-progress">
            <Progress percent={ progress } size="small" />
          </div>
        ) }

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
