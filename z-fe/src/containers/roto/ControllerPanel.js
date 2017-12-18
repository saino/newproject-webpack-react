import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItemByKey } from '../../utils/stateSet';

/* 自定义组件 */
import Pick from '../../components/pick/Pick';
//import ComposeControl from  '../make/ComposeControl';
// import { bindActionCreators } from 'redux';

// import { getSceneType } from '../../reducers/serverFrame';

export default class ControllerPanel extends Component {
  render() {
    var Control = Pick;

   //  switch (selectStep.key){
   //     case 'effect':
   //         Control=Pick;
   //         break
   //     case 'combine':
   //         Control=ComposeControl;
   //         break;
   //     default:
   //         Control=Pick;
   // }

   return (
     <div className="controller-panel">
       <Control material={ this.props.material } />

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
