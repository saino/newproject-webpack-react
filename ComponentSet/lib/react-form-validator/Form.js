import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Input from './Input';
import Checkbox from './Checkbox';
import Radio from './Radio';

export default class Form extends Component {

  // 需要传递的属性
  static propTypes = {

    ruleMap: PropTypes.object,

    errorMesMap: PropTypes.object

  };
  static defaultProps = {

    ruleMap: {},

    errorMesMap: {}

  };

  validate() {


  }

  onBlurOrChange() {

  }

  render() {

    return Children.map(this.props.children, child => {
      const { name, type } = child.props;

      if (!name)
        return cloneElement(child);

      switch (name.toLowerCase()) {

        case 'input':
          return Input(child, this, { ...child.props }, this.props.errorMesMap[name] || '');

        case 'button':
          return Button(child, this, this.props.errorMesMap[name] || '');

        case 'checkbox':
          return Checkbox(child, this, this.props.errorMesMap[name] || '');

        case 'radio':
          return Radio(child, this, this.props.errorMesMap[name] || '');

        default:
          return cloneElement(child);
      }

    });
  }

}
