import { post, error as fail } from '../../api/fetch';
import { get, set, clear } from '../../utils/configure-auth';

export function fetch (isFetch) {
  return {
    type: 'FETCH',
    isFetch
  };
}

export function recordUser (isRecordUser, phone) {
  const username = isRecordUser ? phone : '';

  // 持久化是否记录用户名
  set('isRecordUser', isRecordUser);

  // 如果是选中记录用户名，则存储用户名，否则清空
  set('username', username);

  return {
    type: 'RECORD_USER',
    isRecordUser,
    username
  };
}

export function sendVerifyCode (phone, successFunc, errorFunc) {
  return function () {
    post('/auth/sendVerifyCode', { phone })
      .then(resp => successFunc())
      .catch(error => fail(error, errorFunc));
  }
}

export function configureCountdown (countdown) {
  return {
    type: 'CONFIGURE_COUNTDOWN',
    countdown
  };
}

export function login (phone, password, successFunc, errorFunc) {
  return function (dispatch) {
    post('/auth/login', { phone, password })
      .then(resp => {
        set('token', resp[ 'token' ]);

        dispatch({
          type: 'LOGIN',
          token: resp[ 'token' ]
        });

        successFunc(resp);
      })
      .catch(error => fail(error, errorFunc));
  };
}

export function register (phone, password, verifyCode, successFunc, errorFunc) {
  return function (dispatch) {
    post('/auth/register', { phone, password, verifyCode })
      .then(resp => {
        set('token', resp);

        dispatch({
          type: 'REGISTER',
          token: resp || '123'
        });

        successFunc(resp);
      })
      .catch(error => fail(error, errorFunc))
  };
}

export function logout () {
  clear();

  return {
    type: 'LOGOUT'
  };
}
