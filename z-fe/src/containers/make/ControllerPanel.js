import React, { Component } from 'react';
import Pick from '../../components/pick/Pick';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { getSceneType } from '../../reducers/serverFrame';

export default class ControllerPanel extends Component {
  render() {
    return (
      <div className="controller-panel">
        <Pick />

        <style>{`
          .controller-panel {
            flex: 0 0 300px;
            background: #e9e9e9;
          }


        `}</style>
      </div>
    );
  }
}

// function mapStateToProps ({ sceneType }) {
//   return { sceneType };
// }
//
// function mapDispatchToProps (dispatch) {
//   return {
//     getSceneType: bindActionCreators(getSceneType, dispatch)
//   };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SceneType);
