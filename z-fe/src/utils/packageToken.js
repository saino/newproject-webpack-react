import { checkExpiredStatus } from './auth';
import { message } from 'antd';

export default (fn, quit: Function) => () => dispatch => {
  if (checkExpiredStatus()) {
    message.warning('请重新登录');
    dispatch(quit());
    location.replace('/');
    return;
  }

  fn(dispatch);
}
