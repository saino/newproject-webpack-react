import React from 'react';
import ReactDOM from 'react-dom';
import ReactFormValidator from '../lib/react-form-validator/Form';

ReactDOM.render(
  <ReactFormValidator
    ruleMap={{
      username: 'required',
      email: 'email|required',
      phone: 'phone|required'
    }}
    errorRuleMesMap={{
      required: '不能为空',
      email: '邮箱格式错误',
      phone: '手机号格式错误'
    }}>
      <input type="input" name="username" />
      <input type="input" name="email" />
      <input type="input" name="phone" />
      <button type="submit" name="submit">提交</button>
    </ReactFormValidator>,

  document.querySelector('#app')
);
