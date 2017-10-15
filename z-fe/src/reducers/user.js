import { post } from '../fetch/fetch';
import { getAuth, setAuth, removeAuth }  from '../utils/auth';
import packageToken from '../utils/packageToken';

const { token = '', expired = 0 } = getAuth() || {};
const actionTypes = {

  LOGIN: 'LOGIN',

  REGISTER: 'REGISTER',

  GET_USERINFO: 'GET_USERINFO',

  LOGOUT: 'LOGOUT'

};
const defState = {

  user: {},

  auth: {
    token,
    expired
  }

};

function empty () {
  return dispatch => {
    removeAuth();
    dispatch({ type: actionTypes.LOGOUT });
  };
}

export const login = (phone, password, success: Function, fail: Function) => dispatch => {
  post('/auth/login', { phone, password }, resp => {
    const { token, expired } = resp;

    // 持续化存储token
    setAuth(token, expired);

    dispatch({
     type: actionTypes.LOGIN,
     token,
     expired
    });

    success();
  }, fail);
};
export const register = (phone, password, success: Function, fail: Function) => dispatch => {
  post('/auth/register', { phone, password }, resp => {
    const { token, expired } = resp;

    // 持续化存储token
    setAuth(token, expired);

    dispatch({
      type: actionTypes.REGISTER,
      token,
      expired
    });

    success();
  }, fail);
};
export const getUserInfo = packageToken(dispatch => {
  const { token } = getAuth();

  post('/auth/currUser', { token }, resp => dispatch({
    type: actionTypes.GET_USERINFO,
    user: resp
  }));
}, empty);
export const logout = empty;

export default (state = defState, action) => {
  switch (action.type) {

    case actionTypes.LOGIN:
      return { ...state, auth: { token: action.token, expired: action.expired } };

    case actionTypes.REGISTER:
      return { ...state, auth: { token: action.token, expired: action.expired } };

    case actionTypes.GET_USERINFO:
      return { ...state, user: action.user };

    case actionTypes.LOGOUT:
      return { user: {}, auth: {} };

    default:
      return state;

  }
};
