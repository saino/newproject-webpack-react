import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import { Icon, Checkbox } from 'antd';
import { setFrameDataUrl } from '../../reducers/frame';
import { getItemByKey, add } from '../../utils/stateSet';

import ParseFrameToImageData from '../../components/video/ParseFrameToImageData';

class Timeline extends Component {
  static propTypes = {
    materialId: PropTypes.number.isRequired,
    sceneId: PropTypes.number.isRequired,
    materials: PropTypes.array.isRequired,
    frames: PropTypes.array.isRequired,
    onSelectDataUrl: PropTypes.func.isRequired
  };

  state = {
    isLoop: false,
    isPlay: false,
    currFrame: 1,
    dataUrls: []
  };

  parseFrameToImageDataComplete = dataUrl => {
    this.props.onSelectDataUrl(dataUrl);
    this.setState({ dataUrls: [ ...this.state.dataUrls, dataUrl ] });
  };
  getKeyFrames = (frames) => {
    const keyFrame = {};
    let matchSecondRE = /^(.*)?(?=\.)/;
    let second;

    frames.forEach(frame => {
      second = matchSecondRE.test(frame.time) && RegExp.$1;

      if (!(second in keyFrame))
        keyFrame[second] = frame;
    });

    return keyFrame;
  };

  handleSelectDataUrl = (url) => () =>
    this.props.onSelectDataUrl(url);

  render() {
    const { materialId, sceneId, materials, frames, setFrameDataUrl } = this.props;
    const { src, duration } = getItemByKey(materials, materialId, 'materialId') || {};
    const keyFrame = this.getKeyFrames(frames);

    return (
      <div className="timeline">

        {/* 列出每一帧对应 */}
        <ParseFrameToImageData
          videoSrc={ src }
          keyFrame={ keyFrame }
          onComplete={ this.parseFrameToImageDataComplete } />

        <div className="header">

          <div className="player">
            <div className="backward"><Icon type="backward" /></div>
            <div className="playing"><Icon type="play-circle-o" /></div>
            <div className="forward"><Icon type="forward" /></div>
          </div>

          <div className="currframe">
            <label>当前第</label><label>{ this.state.currFrame }</label><label>帧</label>
          </div>

          {/*<div className="singleframe">
            <label>每秒</label><label>60</label><label>帧</label>
          </div>*/}

          <div className="isloop">
            <Checkbox checked={ this.state.isLoop } onChange={ ({ target }) => this.setState({ isLoop: target.checked }) }>是否循环</Checkbox>
          </div>

        </div>

        <div className="wrapper">

          <div className="ruler">

          </div>


          <div className="frames">
            <ul>
              {this.state.dataUrls.map(url => (
                <li className="frame" onClick={ this.handleSelectDataUrl(url) }>
                  <img src={ url } />
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
            padding: 10px 16px;
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
  return { setFrameDataUrl: bindActionCreators(setFrameDataUrl, dispatch) };
}

export default connect(null, mapDispatchToProps)(Timeline);
