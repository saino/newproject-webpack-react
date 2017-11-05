/**
 * React判断当前是否处在最大最小
 */

import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

export default class MaxMinize extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    curr: PropTypes.number
  };
  static defaultProps = {
    min: -Infinity,
    max: Infinity,
    curr: 1
  };

  isMax() {
    const { curr, max } = this.props;
    return curr > max;
  }

  isMin() {
    const { curr, min } = this.props;
    return curr > min;
  }

  render() {
    return cloneElement(Children.only(this.props.children), {
      isMax: this.isMax,
      isMin: this.isMin,
      ...{ this.props.children.props }
    })
  }
}
