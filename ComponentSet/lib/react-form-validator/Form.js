import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Submit from './childrens/Submit';
import Input from './childrens/Input';
import Checkbox from './childrens/Checkbox';
import Radio from './childrens/Radio';
import validator from './validator';

export default class Form extends Component {

  // 需要传递的属性
  static propTypes = {

    ruleMap: PropTypes.object,

    errorRuleMesMap: PropTypes.object

  };
  static defaultProps = {

    ruleMap: {},

    errorRuleMesMap: {}

  };

  state = {

    errors: {},

    values: {}

  };

  validate(name, value) {
    const { errorRuleMesMap } = this.props;
    const ruleStr = this.ruleMap[ name ];
    const rules = ruleStr ? ruleStr.split('|') : [];
    const errorRules = validator(value, rules);

    if (!errorRules)
      return;

    this.setState({
      errors: {
        ...this.state.errors,
        [ name ]: this.props.errorRuleMesMap[ errorRules[0] ]
      }
    });
  }

  onChange(name, { target }) {
    this.setState({ values: { ...this.state.values, [ name ]: target.value } });
  }

  onSubmit(name) {
    const children = Children.toArray(this.props.children).filter(child => child.props.name !== name);

    children.forEach(child => {
      const { name, value } = child.props;

      this.validate(name, value);
    })
  }

  render() {

    return Children.map(this.props.children, child => {
      const { name, value, type } = child.props;
      const setValue = this.state.values[ name ] || value;

      if (!name)
        return cloneElement(child);

      switch (type.toLowerCase()) {

        case 'input':
          return Input(child, this, setValue, this.state.errors[ name ]);

        case 'submit':
          return Submit.apply(null, this);

        case 'checkbox':
          return Checkbox();

        case 'radio':
          return Radio();

        default:
          return cloneElement(child);

      }

    });
  }

}
