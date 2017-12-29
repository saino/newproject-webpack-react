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

class Timeline extends Component {
  state = {
    isPlay: false
  };

  constructor(props) {
    super(props);

    this.handleForward = this.handlePlayAction(currFrame => currFrame + 1, '已经最后一帧了！');
    this.handleBackward = this.handlePlayAction(currFrame => currFrame - 1, '已经第一帧了！');
    this.execute = this.playOrPausing.bind(this)();
  }

  playOrPausing = function () {
    const timers = {};
    let temp;

    return () => {
      const { isPlay } = this.state;
      const { frame, frameLength, onChangeFrame } = this.props;
      let number = 0;
      let i = frame + 1;

      if (isPlay) {
        for (; i <= frameLength; i++, number++) {
          timers[ i ] = ((idx, number) =>
            setTimeout(() => {
              onChangeFrame(idx);
            }, number * 200)
          )(i, number);
        }
      } else {
        Object.keys(timers).forEach(key => clearTimeout(timers[ key ]));
      }

      // if (isPlay) {
      //   let list = dataSource.slice(currFrame - 1);
      //
      //   list.forEach((item, idx) => {
      //     timers[ idx ] = ((i, imageUrl) => {
      //       temp = currFrame;
      //
      //       return setTimeout(() => {
      //         this.setCurrFrame(i + temp);
      //         this.props.onSelectDataUrl(imageUrl);
      //       }, i * 200);
      //     })(idx, item.imageUrl);
      //   });
      // } else {
      //   Object.keys(timers).forEach(key => {
      //     clearTimeout(item);
      //   });
      // }
    };
  };

  // 播放或暂停
  handlePlayOrPause = () =>
    this.setState({ isPlay: !this.state.isPlay }, this.execute);

  handlePlayAction = function (getCurrFrame, warningMsg) {
    return function () {
      const { isPlay } = this.state;
      const { frame, frameLength, onChangeFrame } = this.props;
      let newFrame;

      if (isPlay) {
        message.warning('正在播放中，请先暂停');
        return;
      }

      newFrame = getCurrFrame(frame);

      if (newFrame <= 0 || newFrame > frameLength) {
        message.warning(warningMsg);
        return;
      }

      onChangeFrame(newFrame);
    }
  };

  render() {
    const { path, frames, frame, time, frameLength, onChangeFrame } = this.props;
    const { isPlay } = this.state;

    return (
        <div className="timeline">

          {/* 转换素材的帧图片 */}
          {/*<ParseMaterialToFrameImage
            videoSrc={ path }
            duration={ time }
            frames={ frames }
            frameLength={ frameLength }
            onGetFrameImage={ this.handleGetFrameImage } />*/}

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

}

function mapDispatchToProps (dispatch) {
  return {
    setImageData: bindActionCreators(setImageData, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Timeline);