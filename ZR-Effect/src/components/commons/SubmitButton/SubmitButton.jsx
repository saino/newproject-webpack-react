import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { fetch } from '../../../stores/action-creators/app-creator';
import defferPerform from '../../../utils/deffer-perform.js';

class SubmitButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onSubmitBefore: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.submit = defferPerform(function () {
      const { onSubmit } = this.props;
      onSubmit(this.unSubmit);
    }, 0);
    this.unSubmit = () => {
      const { fetch } = this.props;

      fetch(false);
    };
    this.submitHandle = () => {
      const { fetch, onSubmitBefore } = this.props;

      if (onSubmitBefore()) {
        fetch(true);
        this.submit();
      }
    };
  }

  render() {
    const { isFetch, text } = this.props;

    return (
      <Button loading={ isFetch } onClick={ this.submitHandle }>{ text }</Button>
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.isFetch !== this.props.isFetch;
  }
}

const mapStateToProps = ({ app }) => ({ isFetch: app.isFetch });

const mapDispatchProps = (dispatch) => ({ fetch: bindActionCreators(fetch, dispatch) })

export default connect(mapStateToProps, mapDispatchProps)(SubmitButton);
