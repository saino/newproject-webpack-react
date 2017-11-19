import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import { Icon, Checkbox, message } from 'antd';
import { setImageData } from '../../reducers/imageData';
import { getItemByKey, add, finds } from '../../utils/stateSet';
import ParseFrameToImageData from '../../components/video/ParseFrameToImageData';
import Tick from '../../components/interaction/react-tick/Tick';

class Timeline extends Component {
  static propTypes = {
    materialId: PropTypes.number.isRequired,
    sceneId: PropTypes.number.isRequired,
    materials: PropTypes.array.isRequired,
    imageData: PropTypes.array,
    frames: PropTypes.array.isRequired,
    onSelectDataUrl: PropTypes.func.isRequired
  };

  state = {
    isLoop: false,
    isPlay: false,
    currFrameId: 1,
    currFrames: []
  };
  imageUrls = [];

  parseFrameToImageDataComplete = (duration, currentTime, imageUrl) => {
    // 根据帧的时长转成图片完成
    if (duration == currentTime) {
      const {
         materialId, sceneId, frames,
         setImageData, onSelectDataUrl
      } = this.props;

      setImageData(materialId, sceneId, this.imageUrls);

      // 默认选择第一张帧
      onSelectDataUrl(this.imageUrls[0].imageUrl);

      // 获取当前素材、镜头对应的帧数据
      this.setState({
        currFrames: finds(frames,
          item => item.materialId === materialId && item.sceneId === sceneId
        )
      });

      // 创建播放或暂停方法
      this.execute = this.playOrPausing.bind(this)();

    } else {
      this.imageUrls.push({ time: currentTime, imageUrl });
    }
  };

  getKeyFrames = (imageData) => {
    const keyFrame = {},
          res = [],
          matchTimeRE = /^(.*)?(?=\.)/;
    let time;

    imageData.forEach(item => {
      time = matchTimeRE.test(item.time) && RegExp.$1;

      if (!(time in keyFrame)) {
        keyFrame[time] = item;
        res.push(item);
      }

    });

    return res;
  };

  checkFrameId = frameId =>
    getItemByKey(this.state.currFrames, frameId, 'frameId');

  playOrPausing = function () {
    const { imageData, materialId, sceneId } = this.props;
    const { dataSource } = getItemByKey(
      imageData,
      item =>
        item.materialId === materialId && item.sceneId === sceneId
    );
    const timers = [];
    let index = 0;
    let temp;

    return () => {
      const { isPlay } = this.state;

      if (isPlay) {
        let list = dataSource.slice(index + 1);

        list.forEach((item, idx) => {
          timers[ idx ] = ((i, imageUrl) => {
            temp = index;

            return setTimeout(() => {
              index = i + temp;
              this.setState({ currFrameId: index + 1 });
              this.props.onSelectDataUrl(imageUrl);
            }, i * 200);
          })(idx, item.imageUrl);
        });
      } else {
        timers.forEach(item => {
          clearTimeout(item);
        });
      }
    };
  };

  handleSelectDataUrl = (url) => () =>
    this.props.onSelectDataUrl(url);

  // 播放或暂停
  handlePlayOrPause = () =>
    this.setState({ isPlay: !this.state.isPlay }, this.execute);

  // 前进
  handleForward = () => {
    const currFrameId = this.state.currFrameId + 1;

    if (this.checkFrameId(currFrameId)) {
      this.setState({ currFrameId });
    } else {
      message.error('已经是最后一帧了');
    }
  };

  // 后退
  handleBackward = () => {
    const currFrameId = this.state.currFrameId - 1;

    if (this.checkFrameId(currFrameId)) {
      this.setState({ currFrameId });
    } else {
      message.error('已经是第一帧了');
    }
  };

  render() {
    const {
      materialId, sceneId, materials,
      frames, imageData,
      setFrameDataUrl } = this.props;
    const { isPlay, currFrameId, isLoop } = this.state;
    const { src, duration } = getItemByKey(materials, materialId, 'materialId') || {};
    const { dataSource = [] } = getItemByKey(imageData, item => materialId == item.materialId && sceneId == item.sceneId) || {};
    const keyImageData = this.getKeyFrames(dataSource);

    return (
        <div className="timeline">

          {/* 列出每一帧对应的图片 */}
          <ParseFrameToImageData
            videoSrc={ src }
            duration={ duration }
            frames={ frames }
            onComplete={ this.parseFrameToImageDataComplete } />

          <div className="header">

            <div className="player">
              <div className="backward" onClick={ this.handleBackward }><Icon type="backward" /></div>
              <div className="playing" onClick={ this.handlePlayOrPause }><Icon type={ isPlay ? 'pause-circle-o' : 'play-circle-o' } /></div>
              <div className="forward" onClick={ this.handleForward }><Icon type="forward" /></div>
            </div>

            <div className="currframe">
              <label>当前第</label><label>{ currFrameId }</label><label>帧</label>
            </div>

            <div className="singleframe">
              <label>每秒</label><label>5</label><label>帧</label>
            </div>

            <div className="isloop">
              <Checkbox
                checked={ isLoop }
                onChange={ ({ target }) => this.setState({ isLoop: target.checked }) }>
                是否循环
              </Checkbox>
            </div>

          </div>

          <div className="wrapper">

            <div className="ruler">
              <Tick max={ this.state.currFrames.length } unit="f" index={ this.state.currFrameId } />
            </div>

            <div className="frames">
              <ul>
                {keyImageData.map(({ time, imageUrl }) => (
                  <li className="frame" data-time={ time } onClick={ this.handleSelectDataUrl(imageUrl) }>
                    <img src={ imageUrl } />
                  </li>
                ))}
              </ul>
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
              height: 35px;
            }

            .timeline .wrapper .frames {
              padding: 10px 12px;
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
