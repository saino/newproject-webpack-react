import { post } from '../../fetch/fetch';

const actionTypes = {

  LOGIN: 'LOGIN',

  REGISTER: 'REGISTER',

  AUTH: 'AUTH'

};

const defState = {

  userInfo: {},

  token: ''

};

export const actions = {

  login: (username, password) => dispatch => {
    post('/login', { username, password }, resp => dispatch({
      type: actionTypes.LOGIN,
      token: resp.token
    }));
  },

  register: (username, password) => dispatch => {
    post('/register', { username, password }, resp => dispatch({
      type: actionTypes.REGISTER,
      username,
      password
    }))
  },

  getUserInfo() {

  },

  destroy: () => ({})

};

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:

  }
};
