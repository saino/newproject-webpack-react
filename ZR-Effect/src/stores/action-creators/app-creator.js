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
      .catch((error) => fail(error.message, errorFunc))
  };
}
