import { post } from '../fetch/fetch';
import packageToken from '../utils/packageToken';

const actionTypes = {
  GET_FRAMES: 'GET_FRAMES'
};
const defState = [];

export const getFrames = packageToken((dispatch, token) => {
  post('/aiRoto')
});

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.GET_FRAMES:
      return [ ...action.frames ];
    default:
      return state;
  }
};
