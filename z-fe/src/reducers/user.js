// var jwt = require('jwt-simple');
import jwt from 'jwt-simple';

import { post } from '../fetch/fetch';
import { getAuth, setAuth, removeAuth }  from '../utils/auth';
import packageToken from '../utils/packageToken';
import config from '../config'

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
    // const { data, errorCode, errorMessage }  = resp;
    // if(errorCode == 0){
    //   jwt.decode(data, config.secretKey)
    // }
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
    let userInfo = jwt.decode(resp, config.secretKey);
    setAuth(resp, userInfo.exp);
    dispatch({
      type: actionTypes.REGISTER,
      token: resp,
      expired: userInfo.exp
    });
    // const token = resp;
    // console.log(resp);
  // const { data, errorCode, errorMessage }  = resp;
  // if(errorCode == 0){
  //   let userInfo = jwt.decode(data, config.secretKey);
  //   console.log(userInfo);
  //   setAuth(data, userInfo.exp);
  //   dispatch({
  //     type: actionTypes.REGISTER,
  //     token: data,
  //     expired: userInfo.exp
  //   });
  //   success();
  // }
    // const { token, expired } = resp;
    // // jwt.decode()
    // // 持续化存储token
    // setAuth(token, expired);

    // dispatch({
    //   type: actionTypes.REGISTER,
    //   token,
    //   expired
    // });

    // success();
  }, fail);
};
export const getUserInfo = packageToken((dispatch, { token }) => {
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
