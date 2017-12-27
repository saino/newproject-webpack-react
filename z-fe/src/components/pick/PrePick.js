import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';

class PrePick extends Component {
  handleAutoRoto = () => {
    // const { onFetchStart, onFetchEnd, workId, sceneId } = this.props;
    // const token = getAuth().token;
    //
    // onFetchStart();
    //
    // post('/user/saveWork', { token, work_id: workId, status: 1, config: {} })

    // post('/user/aiRoto', { token, work_id: workId, scene_id: sceneId }, resp => {
    //   console.log(resp, '提交抠像');
    // }, () => onFetchEnd());
    //this.autoRoto({ workId, sceneId });
  };
  // autoRoto = packageToken((dispatch, { token, workId, sceneId }) => {
  //   console.log(token, workId, 'hhha');
  //   post('/user/aiRoto', { token, work_id: workId, scene_id: sceneId }, resp => {
  //     console.log(resp, '提交抠像');
  //   });
  // });

  render() {
    const { filename, app, onAutoRoto } = this.props;
    const rotoText = app.isFetching ? '作品保存中...' : '开始云端AI自动抠像';

    return (
      <div className="pre-pick">
        <div className="video-info">
          <label>素材名称</label>
          <label>{ filename }</label>
        </div>

        <div className="auto-start">
          <Button className="autoroto" type="primary" loading={ app.isFetching } onClick={ onAutoRoto }>{ rotoText }</Button>
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
