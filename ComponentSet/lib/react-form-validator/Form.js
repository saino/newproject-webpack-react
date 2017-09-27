import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Button from './childrens/Button';
import Input from './childrens/Input';
import Checkbox from './childrens/Checkbox';
import Radio from './childrens/Radio';
import validate from './validate';

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

  validate(name) {


  }

  validateChangeOrBlur(name, evt) {
    const ruleStr = this.props.ruleMap[ name ];
    const rules = ruleStr.split('|');
  }

  render() {

    return Children.map(this.props.children, child => {
      const { name, errorMesMap } = child.props;
      let params;

      if (!name)
        return cloneElement(child);

      params = [ child, this, errorMesMap[name] ];

      switch (name.toLowerCase()) {

        case 'input':
          return Input.apply(null, params);

        case 'button':
          return Button.apply(null, params);

        case 'checkbox':
          return Checkbox.apply(null, params);

        case 'radio':
          return Radio.apply(null, params);

        default:
          return cloneElement(child);

      }

    });
  }

}
