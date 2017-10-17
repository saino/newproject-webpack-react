import React, { Component } from 'react';
import { Icon, Checkbox } from 'antd';

export default class Timeline extends Component {
  render() {
    return (
      <div className="timeline">

        <div className="header">

          <div className="player">
            <div className="backward"><Icon type="backward" /></div>
            <div className="playing"><Icon type="play-circle-o" /></div>
            <div className="forward"><Icon type="forward" /></div>
          </div>

          <div className="currframe">
            <label>当前第</label><label>30</label><label>帧</label>
          </div>

          <div className="singleframe">
            <label>每秒</label><label>60</label><label>帧</label>
          </div>

          <div className="isloop">
            <Checkbox>是否循环</Checkbox>
          </div>

        </div>

        <div className="wrapper"></div>

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
            flex: 1;
            background: #264c61;
          }

        `}</style>

      </div>
    );
  }
}
