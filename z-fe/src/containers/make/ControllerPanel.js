import React, { Component } from 'react';
import Pick from '../../components/pick/Pick';
import ComposeControl from  './ComposeControl'
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { getSceneType } from '../../reducers/serverFrame';

 class ControllerPanel extends Component {
  render() {
      const {selectStep}=this.props;
      var Control;
       switch (selectStep.key){
           case 'effect':
               Control=Pick;
               break
           case 'combine':
               Control=ComposeControl;
               break;
           default:
               Control=Pick;
       }
    return (
      <div className="controller-panel">
        <Control />

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

function mapStateToProps ({ step }) {
  return {selectStep:step.steps[step.current]};
}
//
// function mapDispatchToProps (dispatch) {
//   return {
//     getSceneType: bindActionCreators(getSceneType, dispatch)
//   };
// }
//
export default connect(
  mapStateToProps
)(ControllerPanel);
