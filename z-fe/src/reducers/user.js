import { post } from '../../fetch/fetch';

const actionTypes = {

  LOGIN: 'LOGIN',

  REGISTER: 'REGISTER',

  AUTH: 'AUTH'

};

const defState = {

  userId: '',

  username: '',

  nickname: '',

  auth: {
    token: ''
  }
};

const actions = {

  login: (username, password) => dispatch => {
    post('/login', { username, password })
      .then(resp => dispatch({
        type: actionTypes.LOGIN,
        username,
        password
      }));
  }

};
