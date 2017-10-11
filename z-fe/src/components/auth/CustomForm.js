import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message, Form, Button } from 'antd';
import style from './style.css';
const FormItem = Form.Item;

class CustomForm extends Component {

  /**
   * fieldDecorators
   * item: { key: 'username', rules: [], widget: <xx /> }
   */
  static propTypes = {
    okText: PropTypes.string.isRequired,
    fieldDecorators: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  handleSubmit = () => {
    const { form: { validateFields }, onSubmit } = this.props;
    validateFields((err, values) => {
      if (!err)
        onSubmit(values);
    });
  };

  render() {
    const { form: { getFieldDecorator }, fieldDecorators, okText,  } = this.props;

    return (
      <Form onSubmit={ this.handleSubmit }>
        {fieldDecorators.map(item => {
          const { key, rules, widget } = item;

          return (
            <FormItem>
              {getFieldDecorator(key, { rules })(widget)}
            </FormItem>
          )
        })}
        <FormItem>
          <Button type="primary" htmlType="submit" className={ style.btn }>{ okText }</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(CustomForm);
