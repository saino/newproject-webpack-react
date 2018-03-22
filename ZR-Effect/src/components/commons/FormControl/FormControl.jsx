import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

export default class FormControl extends Component {
  static propTypes = {
    formItems: PropTypes.array.isRequired
  };

  focusHandle = (rules, handle) => (e) => {
    const value = e.target.value;
    const validRes = rules.every(rule => rule(value));

    return validRes;
  };

  blurHandle = () => {

  };

  createFormItemComponent = ({ rules, Com }) => (
    <li>
      <Com onFocus={ this.focusHandle(rules) }></Com>
    </li>
  );

  render() {
    const { formItems } = this.props;

    return (
      <div className={ style.wrapper }>
        <ul>
          {
            formItems.map(
              formItem => this.createFormItemComponent(formItem)
            )
          }
        </ul>
      </div>
    );
  }

  componentDidMount() {

  }
}
