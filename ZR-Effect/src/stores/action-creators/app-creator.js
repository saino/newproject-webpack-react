import { post, error as fail } from '../../api/fetch';
import { set } from '../../utils/configure-auth';

export function fetch (isFetch) {
  return {
    type: 'FETCH',
    isFetch
  };
}

export function recordUser (isRecordUser) {
  return {
    type: 'RECORD_USER',
    isRecordUser
  };
}

export function sendVerifyCode (phone, successFunc, errorFunc) {
  return function () {
    post('/auth/sendVerifyCode', { phone })
      .then(resp => successFunc())
      .catch(error => fail(error.message, errorFunc));
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
        dispatch({
          type: 'LOGIN',
          token: resp
        });

        successFunc(resp);
      })
      .catch(error => fail(error.message, errorFunc));
  };
}

export function register (phone, password, verifyCode, successFunc, errorFunc) {
  return function (dispatch) {
    post('/auth/register', { phone, password, verifyCode })
      .then(resp => {
        dispatch({
          type: 'REGISTER',
          token: resp
        });

        successFunc(resp);
      })
      .catch((error) => fail(error.message, errorFunc))
  };
}
