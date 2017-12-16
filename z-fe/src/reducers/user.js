
//import jwt from 'jwt-simple';

import { post } from '../fetch/fetch';
import { getAuth, setAuth, removeAuth }  from '../utils/auth';
import packageToken from '../utils/packageToken';
import config from '../config';
var jwt = require('jwt-simple');

const { token = '', expired = 0 } = getAuth() || {};
const actionTypes = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  GET_USERINFO: 'GET_USERINFO',
  LOGOUT: 'LOGOUT'
};

const auth = getAuth() || {};

const defState = {
  token: auth.token,
  user: auth.user || {}
};

function empty () {
  return dispatch => {
    removeAuth();
    dispatch({ type: actionTypes.LOGOUT });
  };
}

export const login = (phone, password, success: Function, fail: Function) => dispatch => {
  post('/auth/login', { phone, password }, resp => {
    let user = jwt.decode(resp, config.secretKey, true, "RS256");
    user.exp = user.exp * 1000;

    setAuth(resp, user);
    dispatch({
      type: actionTypes.REGISTER,
      token: resp,
      user
    });
    success();
  }, fail);
};
export const register = (phone, password, success: Function, fail: Function) => dispatch => {
  post('/auth/register', { phone, password }, resp => {
    let user = jwt.decode(resp, config.secretKey, true, "RS256");
    user.exp = user.exp * 1000;

    setAuth(resp, user);
    dispatch({
      type: actionTypes.REGISTER,
      token: resp,
      user
    });
    success();
  }, fail);
};

export const logout = empty;

export default (state = defState, action) => {
  switch (action.type) {

    case actionTypes.LOGIN:
      return { ...state, token: action.token, user: action.user };

    case actionTypes.REGISTER:
      return { ...state, token: action.token, user: action.user };

    case actionTypes.LOGOUT:
      return { token: '', user: null };

    default:
      return state;

  }
};
