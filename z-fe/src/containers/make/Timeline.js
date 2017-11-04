import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import { Icon, Checkbox } from 'antd';
import { setImageData } from '../../reducers/imageData';
import { getItemByKey, add } from '../../utils/stateSet';

import ParseFrameToImageData from '../../components/video/ParseFrameToImageData';
import MaxMinize from '../../components/interaction/react-maxminize/MaxMinize';

class Timeline extends Component {
  static propTypes = {
    materialId: PropTypes.number.isRequired,
    sceneId: PropTypes.number.isRequired,
    materials: PropTypes.array.isRequired,
    imageData: PropTypes.array,
    frames: PropTypes.array.isRequired,
    onSelectDataUrl: PropTypes.func.isRequired
  };
  static defaultProps = {
    imageData: []
  };

  state = {
    isLoop: false,
    isPlay: false,
    curr: 1
  };
  imageUrls = [];

  parseFrameToImageDataComplete = (duration, currentTime, imageUrl) => {
    // 根据帧的时长转成图片完成
    if (duration == currentTime) {
      const { materialId, sceneId, setImageData, onSelectDataUrl } = this.props;

      setImageData(materialId, sceneId, this.imageUrls);

      // 默认选择第一张帧
      onSelectDataUrl(this.imageUrls[0].imageUrl);
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

  handleSelectDataUrl = (url) => () =>
    this.props.onSelectDataUrl(url);

  // 播放或暂停
  handlePlayOrStop = () => {

  };

  // 前进
  handleForward = () => {
    alert('前进');
  };

  // 后退
  handleBackward = () => {
    alert('后退');
  };

  render() {
    const {
      materialId, sceneId, materials,
      frames, imageData,
      setFrameDataUrl } = this.props;

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

        <MaxMinize
          min={ 1 }>
          <div className="header">

            <div className="player">
              <div className="backward" onClick={ this.handleBackward }><Icon type="backward" /></div>
              <div className="playing"><Icon type="play-circle-o" /></div>
              <div className="forward" onClick={ this.handleForward }><Icon type="forward" /></div>
            </div>

            <div className="currframe">
              <label>当前第</label><label>{ this.state.curr }</label><label>帧</label>
            </div>

            {/*<div className="singleframe">
              <label>每秒</label><label>60</label><label>帧</label>
            </div>*/}

            <div className="isloop">
              <Checkbox checked={ this.state.isLoop } onChange={ ({ target }) => this.setState({ isLoop: target.checked }) }>是否循环</Checkbox>
            </div>

          </div>
        </MaxMinize>

        <div className="wrapper">

          <div className="ruler">

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
