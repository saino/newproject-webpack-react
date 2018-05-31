import { get } from '../../utils/configure-auth';

const isRecordUser = get('isRecordUser');
const defState = {
  isFetch: false,
  token: get('token'),
  isRecordUser: isRecordUser == null ? false : isRecordUser,
  username: get('username'),
  countdown: false
};

export default function app (state = defState, action) {
  switch (action.type) {
    case 'FETCH':
      return { ...state, isFetch: action.isFetch };

    case 'RECORD_USER':
      return { ...state, isRecordUser: action.isRecordUser, username: action.username };

    case 'LOGIN':
      return { ...state, token: action.token };

    case 'REGISTER':
      return { ...state, token: action.token };

    case 'LOGOUT':
      return { ...state, token: void 0, username: '' };

    case 'SEND_VERIFYCODE':
      return { ...state };

    case 'CONFIGURE_COUNTDOWN':
      return { ...state, countdown: action.countdown };

    default:
      return state;
  }
}
