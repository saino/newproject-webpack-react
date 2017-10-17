import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* 第三方组件 */
import Step from './Step';
import SceneType from './SceneType';
import SceneCenter from './SceneCenter';
import ControllerPanel from './ControllerPanel';
import Timeline from './Timeline';

class Make extends Component {
  render() {
    return (
      <div className="make">

        <div className="top">
          {/* 选择步骤 */}
          <Step />
        </div>

        <div className="main">

          {/* 镜头类型 */}
          <SceneType />

          {/* 场景中心 */}
          <SceneCenter />

          {/* 控制面板 */}
          <ControllerPanel />

        </div>

        <div className="bottom">

          {/* 时间轴 */}
          <Timeline />

        </div>


        <style>{`
          .make {
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
            height: 100%;
          }

          .make .main {
            display: flex;
            align-items: stretch;
            flex: 1;
          }

          .make .top {
            flex: 0 0 54px;
          }

          .make .bottom {
            flex: 0 0 128px;
          }
        `}</style>
      </div>
    );
  }
}

export default Make;
