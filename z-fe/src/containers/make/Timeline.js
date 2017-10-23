import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deepCompare } from 'pure-render-immutable-decorator';
import { Icon, Checkbox } from 'antd';
import { getItemByKey } from '../../utils/stateSet';

export default class Timeline extends Component {
  static propTypes = {

    materialId: PropTypes.number.isRequired,

    sceneId: PropTypes.number.isRequired,

    materials: PropTypes.array.isRequired,

    frames: PropTypes.array.isRequired

  };

  constructor(props) {
    super(props);

    this.state = {
      isLoop: false,
      isPlay: false,
      currFrame: 1,
      imageDatas: props.frames
    };
    this.videoEl = this.oriCanvasEl = this.tmpCanvasEl = null;
  }

  parseVideoSecondsToImageData(frames) {
    this.videoEl.currentTime = frames[10].time;
    // frames[0].forEach(({ time }) => {
    //   this.videoEl.currentTime = time;
    // });
  }

  componentWillReceiveProps(nextProps) {
    this.parseVideoSecondsToImageData(nextProps.frames);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return deepCompare(this, nextProps, nextState);
  }

  render() {
    const { materialId, sceneId, materials } = this.props;
    const { src } = getItemByKey(materials, materialId, 'materialId') || {};

    return (
      <div className="timeline">

        <canvas ref={ el => this.oriCanvasEl = el } style={{ display: 'none' }}></canvas>
        <canvas ref={ el => this.tmpCanvasEl = el } style={{ display: 'none' }}></canvas>
        <video ref={ el => this.videoEl = el } src={ src } controls></video>

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
            <Checkbox checked={ this.state.isLoop }>是否循环</Checkbox>
          </div>

        </div>

        <div className="wrapper">

          <div className="ruler">

          </div>


          <div className="frames">
            <ul>
              {this.state.imageDatas.map(item => (
                <li className="frame"></li>
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
            background: #ccc;
            margin: 0 4px;
            vertical-align: top;
          }

        `}</style>

      </div>
    );
  }

  computeFrame() {
    this.oriCanvasEl.drawImage(this.videoEl, 0, 0, 44, 44);

    let frame = this.oriCanvasEl.getImageData(0, 0, 44, 44);
    let l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (g > 100 && r > 100 && b < 43)
        frame.data[i * 4 + 3] = 0;
    }
    this.tmpCanvasEl.putImageData(frame, 0, 0);
  }

  componentDidMount() {
    const { frames } = this.props;

    this.videoEl.addEventListener('timeupdate', () => {
      console.log(this.videoEl.currentTime, 'www');
    }, false);
  }
}
