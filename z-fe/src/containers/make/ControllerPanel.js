import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItemByKey } from '../../utils/stateSet';

/* 自定义组件 */
import Pick from '../../components/pick/Pick';
import ComposeControl from  './ComposeControl';
// import { bindActionCreators } from 'redux';

// import { getSceneType } from '../../reducers/serverFrame';

class ControllerPanel extends Component {
  static propTypes = {
    materialId: PropTypes.string
  };
  static defaultProps = {
    materialId: ''
  };

render() {
    const { materialId, material, selectStep }= this.props;
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
      <Control material={ getItemByKey(material, materialId, 'materialId') } />

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

function mapStateToProps ({ material, step }) {
  return {
    material,
    selectStep: step.steps[step.current]
  };
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
