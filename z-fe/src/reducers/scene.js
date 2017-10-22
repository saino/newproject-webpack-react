import { add } from '../utils/stateSet';
import packageToken from '../utils/packageToken';
import { post } from '../fetch/fetch';
import { logout } from './user';

/*
  item.materialId Number 素材id,
  item.sceneId Number
  item.text String '固定广告植入'
*/
const defState = [];

const actionTypes = {

  SAVE_SCENE: 'SAVE_SCENE',

  LIST_SCENE: 'LIST_SCENE'

};

export const saveScene = (materialId) => dispatch => {
  
};

export const list = packageToken((dispatch, { token, materialId }) => {
  post('/scenes', { token, materialId }, resp => dispatch({
    type: actionTypes.LIST_SCENE,
    scenes: resp
  }));
}, logout);

export default (state = defState, action) => {
  switch (action.type) {

    case actionTypes.SAVE_SCENE:
      return add(state, {
        materialId: action.materialId,
        cameraId: action.cameraId,
        text: action.text
      });

    case actionTypes.LIST_SCENE:
      return [ ...state, ...action.scenes ];

    default:
      return state;

  }
};
