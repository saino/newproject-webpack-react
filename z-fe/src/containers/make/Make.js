import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { list as listScene } from '../../reducers/scene';
import { getItemByKey } from '../../utils/stateSet';

/* 第三方组件 */
import Step from './Step';
import SceneList from './SceneList';
import SceneDisplay from './SceneDisplay';
import ControllerPanel from './ControllerPanel';
import Timeline from './Timeline';

class Make extends Component {
  state = {
    currMaterialId: 1, // 等素材做完后，在换初始默认值
    currSceneId: 1,
    frameDataUrl: ''
  };

  componentWillMount() {
    // 根据当前选中的素材查找镜头
    this.props.listScene({ materialId: this.state.currMaterialId });
  }

  render() {
    return (
      <div className="make">

        <div className="top">
          {/* 选择步骤 */}
          <Step />
        </div>

        <div className="main">

          {/* 镜头列表 */}
          <SceneList onSelect={ ({ sceneId }) => this.setState({ currSceneId: sceneId }) } />

          {/* 镜头展示 */}
          <SceneDisplay
            materialId={ this.state.currMaterialId }
            sceneId={ this.state.currSceneId }
            materials={ this.props.material }
            selectStep={this.props.selectStep}
            frameDataUrl={ this.state.frameDataUrl } />

          {/* 控制面板 */}
          <ControllerPanel />

        </div>

        <div className="bottom">

          {/* 时间轴 */}
          <Timeline
            materialId={ this.state.currMaterialId }
            sceneId={ this.state.currSceneId }
            materials={ this.props.material }
            frames={ this.props.frame }
            onSelectDataUrl={ frameDataUrl => this.setState({ frameDataUrl }) } />

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

        `}</style>
      </div>
    );
  }
}

function mapStateToProps ({ material, frame ,step}) {
  return {
    material,
    frame, selectStep:step.steps[step.current]
  };
}

function mapDispatchToProps (dispatch) {
  return {
    listScene: bindActionCreators(listScene, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Make);
