
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

    let userInfo = jwt.decode(resp, config.secretKey, true, "RS256");
    setAuth(resp, userInfo.exp * 1000);
    dispatch({
      type: actionTypes.REGISTER,
      token: resp,
      expired: userInfo.exp * 1000,
      user: userInfo
    });
    success();
  }, fail);
};
export const register = (phone, password, success: Function, fail: Function) => dispatch => {
  post('/auth/register', { phone, password }, resp => {
    let userInfo = jwt.decode(resp, config.secretKey, true, "RS256");
    setAuth(resp, userInfo.exp * 1000);
    dispatch({
      type: actionTypes.REGISTER,
      token: resp,
      expired: userInfo.exp * 1000,
      user: userInfo
    });
    success();
  }, fail);
};

export const logout = empty;

export default (state = defState, action) => {
  switch (action.type) {

    case actionTypes.LOGIN:
      return { ...state, auth: { token: action.token, expired: action.expired }, user: action.user };

    case actionTypes.REGISTER:
      return { ...state, auth: { token: action.token, expired: action.expired }, user: action.user };

    case actionTypes.GET_USERINFO:
      return { ...state, user: action.user };

    case actionTypes.LOGOUT:
      return { user: {}, auth: {} };

    default:
      return state;

  }
};
