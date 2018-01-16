import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import Scrollbar from 'react-custom-scrollbars';
import { Icon, message } from 'antd';
import { setImageData } from '../reducers/imageData';
import { getItemByKey, add, finds } from '../utils/stateSet';
import ParseMaterialToFrameImage from '../components/video/ParseMaterialToFrameImage';
import Tick from '../components/interaction/react-tick/Tick';
//import Scrollbar from '../../components/interaction/react-scrollbar/Scrollbar';
import config from '../config';

export default class Timeline extends Component {
  static defaultProps = {
    onPlayOrPause: () => {},
    onComplete: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isPlay: false,
      frame: props.frame,
      frameLength: props.frameLength
    };
    this.timers = {};
    this.handleForward = this.handlePlayAction(currFrame => currFrame + 1, '已经最后一帧了！');
    this.handleBackward = this.handlePlayAction(currFrame => currFrame - 1, '已经第一帧了！');
    this.execute = this.playOrPausing.bind(this)();
  }

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

  render() {
    const { path, frames, time, onChangeFrame } = this.props;
    const { isPlay, frame, frameLength } = this.state;

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

          `}</style>

        </div>
    );
  }

  componentWillUnmount() {
    this.clearAllTimer();
  }
}
