import { checkExpiredStatus, getAuth } from './auth';
import { message } from 'antd';

export default (fn, logout: Function) => (body, successFun) => dispatch => {
  if (checkExpiredStatus()) {
    message.warning('请重新登录');
    dispatch(logout());
    window.location.replace('/');
    return;
  }

  fn(dispatch, { token: getAuth().token, ...body }, successFun);
};