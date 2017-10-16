import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deepCompare } from 'pure-render-immutable-decorator';
import { getStep } from '../../reducers/step';

class Step extends Component {
  render() {
    return (
      <div className="step">

        <style>{`
          .step {
            height: 54px;
          }

        `}</style>
      </div>
    );
  }
}

function mapStateToProps ({ step }) {
  return { step };
}

function mapDispatchToProps (dispatch) {
  return {
    getStep: bindActionCreators(getStep, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step);
