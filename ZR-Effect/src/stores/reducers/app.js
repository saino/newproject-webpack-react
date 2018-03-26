import { get } from '../../utils/configure-auth';

const isRecordUser = get('isRecordUser');
const defState = {
  isFetch: false,
  user: get('token'),
  isRecordUser: isRecordUser == null ? false : isRecordUser
};

export default function app (state = defState, action) {
  switch (action.type) {
    case 'FETCH':
      return { ...state, isFetch: action.isFetch };

    case 'RECORD_USER':
      return { ...state, isRecordUser: action.isRecordUser };

    case 'LOGIN':
      return { ...state, user: action.token };

    default:
      return state;
  }
}
