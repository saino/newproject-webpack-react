import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message, Form, Button } from 'antd';
const FormItem = Form.Item;

const style = () => ({
  display: 'block',
  width: '100%',
  background: '#ff6b00',
  borderColor: '#ff6b00'
});

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

  handleSubmit = (e) => {
    const { form: { validateFields }, onSubmit } = this.props;
    validateFields((err, values) => {
      if (!err)
        onSubmit(values);

      e.preventDefault();
    });
  };

  render() {
    const { form: { getFieldDecorator }, fieldDecorators, okText,  } = this.props;

    return (
      <Form onSubmit={ this.handleSubmit }>
        {fieldDecorators.map(item => {
          const { key, rules, widget } = item;

          return (
            <FormItem hasFeedback>
              {getFieldDecorator(key, { rules })(widget)}
            </FormItem>
          )
        })}
        <FormItem>
          <Button type="primary" htmlType="submit" style={ style() }>{ okText }</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(CustomForm);
