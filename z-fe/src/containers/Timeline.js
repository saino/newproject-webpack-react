import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import Scrollbar from 'react-custom-scrollbars';
import { Icon, message, Progress } from 'antd';
import { setImageData } from '../reducers/imageData';
import { getItemByKey, add, finds } from '../utils/stateSet';
import ParseMaterialToFrameImage from '../components/video/ParseMaterialToFrameImage';
import Tick from '../components/interaction/react-tick/Tick';
//import Scrollbar from '../../components/interaction/react-scrollbar/Scrollbar';
import config from '../config';
import { getAuth } from '../utils/auth'
import { post } from '../fetch/fetch'
import { addMusic } from '../reducers/material'

import FileUpload from 'react-fileupload';

class Timeline extends Component {
  static defaultProps = {
    onPlayOrPause: () => {},
    onComplete: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isPlay: false,
      frame: props.frame,
      frameLength: props.frameLength,
      uploading: false,
      uploadProgress: 0
    };
    this.timers = {};
    this.handleForward = this.handlePlayAction(currFrame => currFrame + 1, '已经最后一帧了！');
    this.handleBackward = this.handlePlayAction(currFrame => currFrame - 1, '已经第一帧了！');
    this.execute = this.playOrPausing.bind(this)();
  }
  // state = {

  // }
  resetExecute = () =>
    this.execute(this.state.frame, this.state.frameLength);

  clearAllTimer = () =>
    Object.keys(this.timers).forEach(key => clearTimeout(this.timers[ key ]));

  playOrPausing = function () {
    let temp;

    return (frame, frameLength) => {
      const { isPlay } = this.state;
      const { onChangeFrame, onPlayOrPause, onComplete } = this.props;
      let number = 0;
      let i = frame + 1;

      onPlayOrPause(isPlay);

      if (isPlay) {
        for (; i <= frameLength; i++, number++) {
          this.timers[ i ] = ((idx, number) =>
            setTimeout(() => {
              onChangeFrame(idx);

              if (idx == frameLength) {
                onComplete();
              }

            }, number * 200)
          )(i, number);
        }
      } else {
        this.clearAllTimer();
      }
    };
  };

  // 播放或暂停
  handlePlayOrPause = () =>
    this.setState({ isPlay: !this.state.isPlay }, () => this.execute(this.state.frame, this.state.frameLength));

  handlePlayAction = function (getCurrFrame, warningMsg) {
    return function () {
      const { isPlay, frame, frameLength } = this.state;
      const { onChangeFrame } = this.props;
      let newFrame;

      if (isPlay) {
        message.warning('正在播放中，请先暂停');
        return;
      }

      newFrame = getCurrFrame(frame);

      if (newFrame <= -1) {
        message.warning(warningMsg);
      } else if (newFrame > frameLength) {
        message.warning(warningMsg);
      } else {
        onChangeFrame(newFrame);
      }
    }
  };

  componentWillReceiveProps(props) {
    const flag = this.props.flag;
    this.setState({
      frame: props.frame,
      frameLength: props.frameLength
    }, () => {
      if (flag !== props.flag) {
        this.clearAllTimer();
        this.execute(this.state.frame, this.state.frameLength);
      }
    });
  }
  //选择文件之前
  _handleBeforeChoose = () => {
    return true;
  }
  //选择文件
  _handleChooseFile = (files) => {
    return true;
  }
  //上传之前
  _handleBeforeUpload = (files, mill) => {
    this.setState({
      uploading: true,
      progressState: "active",
      uploadProgress: 0
    });  
  }
  //上传中
  _handleUploading = (progress) => {
    // console.log(progress);
    const progressNum = parseInt(100 * progress.loaded / progress.total);
    this.setState({
      uploadProgress: progressNum
    });
  }
   //上传成功
  _handleUploadSuccess = (resp) => {
    console.log("ssssss");
    this.setState({
      uploadProgress: 100,
      progressState: "success",
    });
    // resp.data;
    console.log(resp, this.props);
    const { material } = this.props;
    const { materials, scenes, layers } = material;
    const options = {
      token: getAuth().token,
      work_id: this.props.workId,
      status: 1,
      name: this.props.workName,
      audio: resp.data,
      config: {
          audio: resp.data,
          materials,
          scenes,
          layers
      }
    }
    console.log("sdddsdkjhksdjlsdj");
    this.props.addMusic(resp.data);
    console.log(this.props.material);
    post('/user/saveWork', options, resp => {});

    // this.props.onUploadMaterial(resp.data);
    setTimeout(()=>{
      this.setState({
        uploading: false
      });
    }, 200);
  }
  //上传失败
  _handleUploadFailed = () => {
    console.log("ddddd");
    this.setState({
      uploadProgress: 0,
      progressState: "exception"
    })
    setTimeout(()=>{
      this.setState({
        uploading: false
      });
    }, 200);
  }
  renderUploadProgress() {
    if(this.state.uploading){
      return <div className='upload-progress'>
        <Progress type="circle" status={this.state.progressState} percent={this.state.uploadProgress} width={111} />
      </div>
    }
    return null;
  }
  render() {
    const { path, frames, time, onChangeFrame } = this.props;
    const { isPlay, frame, frameLength } = this.state;
    const upLoadOptions = {
      baseUrl: `${ config.api.host }/user/uploadAudio`,
      paramAddToField: {
        work_id: this.props.workId,
      },
      fileFieldName: "file",
      multiple: false,
      accept: 'audio/*',
      requestHeaders: {
        Token: getAuth().token,
      },
      chooseAndUpload: true,
      wrapperDisplay: 'block',
      beforeChoose: this._handleBeforeChoose,
      chooseFile: this._handleChooseFile,
      beforeUpload: this._handleBeforeUpload,
      uploading: this._handleUploading,
      /*上传成功*/
      uploadSuccess: this._handleUploadSuccess,
      /*xhr失败*/
      uploadFail: this._handleUploadFailed,
      uploadError: this._handleUploadFailed
    }
    return (
        <div className="timeline">

          <div className="header">
            <div className="player">
              <div className="backward" onClick={ this.handleBackward.bind(this) }><Icon type="backward" /></div>
              <div className="playing" onClick={ this.handlePlayOrPause }><Icon type={ isPlay ? 'pause-circle-o' : 'play-circle-o' } /></div>
              <div className="forward" onClick={ this.handleForward.bind(this) }><Icon type="forward" /></div>
            </div>

            <div className="currframe">
              <label>当前第</label><label>{ frame }</label><label>帧</label>
            </div>

            <div className="singleframe">
              <label>每秒</label><label>5</label><label>帧</label>
            </div>
            <FileUpload options={upLoadOptions}>
              <div ref="chooseAndUpload">
                <div className="addMusic">添加音乐</div>
              </div>
            </FileUpload>
            

            {/*<div className="isloop">
              <Checkbox
                checked={ isLoop }
                onChange={ ({ target }) => this.setState({ isLoop: target.checked }) }>
                是否循环
              </Checkbox>
            </div>*/}

          </div>

          <div className="wrapper">

            <div className="ruler">
              <Scrollbar style={{ width: '100%', height: '100%' }}>
                <Tick
                  max={ frameLength }
                  unit="f"
                  index={ frame }
                  onChangeTick={ (frame) => {
                    if (isPlay) {
                      message.warning('正在播放中，请先暂停');
                      return;
                    }

                    onChangeFrame(frame);
                  }} />
              </Scrollbar>
            </div>

            <div className="frames">
            {/*  <ul>
                {keyImageData.map(({ time, imageUrl }) => (
                  <li className="frame" data-time={ time } onClick={ this.handleSelectDataUrl(imageUrl) }>
                    <img src={ imageUrl } />
                  </li>
                ))}
              </ul> */}
            </div>

          </div>
          { this.renderUploadProgress() }
          <style>{`
            .timeline {
              display: flex;
              flex-flow: column nowrap;
              align-items: stretch;
              height: 100%;
              color: #fff;
              position: relative;
              z-index: 1;
            }

            .timeline .header {
              background: #2f5f79;
              width: 100%;
              height: 42px;
              display: flex;
              align-items: center;
              padding: 0 20px;
            }

            .addMusic{
              cursor: pointer;
            }
            .timeline .currframe,
            .timeline .singleframe {
              margin: 0 31px;
            }

            .timeline .singleframe {
              margin-left: 0;
            }

            .timeline .currframe label:nth-child(even),
            .timeline .singleframe label:nth-child(even) {
              margin: 0 10px;
              color: #333;
              background: #97afbc;
              padding: 5px;
              border: 1px solid #647c89;
              width: 40px;
              text-align: center;
              display: inline-block;
            }

            .player {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 100%;
              width: 84px;
            }

            .player > div {
              cursor: pointer;
            }

            .player .backward i:before,
            .player .playing i:before,
            .player .forward i:before {
              color: #fff;
            }

            .player .backward i:before,
            .player .forward i:before {
              font-size: 14px;
            }

            .player .playing i:before {
              font-size: 25px;
            }

            .timeline .wrapper {
              width: 100%;
              background: #264c61;
            }

            .timeline .wrapper .ruler {
              padding: 0 16px 5px;
              height: 65px;
            }

            .timeline .wrapper .frames {
              overflow: auto;
            }

            .timeline .wrapper .frames ul {
              white-space: nowrap;
            }

            .timeline .wrapper .frames .frame {
              display: inline-block;
              width: 44px;
              height: 44px;
              margin: 0 4px;
              vertical-align: top;
              cursor: pointer;
              background: rgba(0,0,0,.25);
            }

            .timeline .wrapper .frames .frame img {
              display: block;
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
            .upload-progress{
              display: flex;
              justify-content: center;
              align-items: center;
              position: fixed;
              background: rgba(0, 0, 0, 0.7);
              height: 100%;
              width: 100%;
              top: 0;
              left: 0;
              color: #fff;
            }

          `}</style>

        </div>
    );
  }

  componentWillUnmount() {
    this.clearAllTimer();
  }
}
const mapStateToProps = ( {material}) => ({
  material
});
const mapDispatchToProps = (dispatch) => ({
  addMusic: bindActionCreators(addMusic, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
