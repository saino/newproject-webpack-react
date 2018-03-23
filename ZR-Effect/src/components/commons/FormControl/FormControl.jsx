import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

export default class FormControl extends Component {
  focusHandle = (rules) => (e) => {
    const value = e.target.value;
    const validRes = rules.every(rule => rule(value));

    return validRes;
  };

  blurHandle = () => {
    
  };

  render() {
    return Children.map(this.props.children, Com =>
      cloneElement(Com, {
        ...Com.props
      }), cloneElement(Com.props.children, {
        ...Com.props.children.props,
        onFocus: this.focusHandle(Com.props.rules)
      });
    );
  }
}
