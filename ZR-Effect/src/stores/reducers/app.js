import { get } from '../../utils/configure-auth';

const isRecordUser = get('isRecordUser');
const defState = {
  isFetch: false,
  user: get('token'),
  isRecordUser: isRecordUser == null ? false : isRecordUser,
  countdown: false
};

export default function app (state = defState, action) {
  switch (action.type) {
    case 'FETCH':
      return { ...state, isFetch: action.isFetch };

    case 'RECORD_USER':
      return { ...state, isRecordUser: action.isRecordUser };

    case 'LOGIN':
      return { ...state, user: action.token };

    case 'REGISTER':
      return { ...state, user: action.token };

    case 'SEND_VERIFYCODE':
      return { ...state };

    case 'CONFIGURE_COUNTDOWN':
      return { ...state, countdown: action.countdown };

    default:
      return state;
  }
}
