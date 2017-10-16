import { update }  from '../utils/stateSet';

const defState = [{
  key: 'materialUpload',
  name: '素材上传',
  selected: false
}, {
  key: 'sceneEffect',
  name: '镜头特效',
  selected: true
}, {
  key: 'sceneCombine',
  name: '镜头组合',
  selected: false
}, {
  key: 'videoPublish',
  name: '视频发布',
  selected: false
}];

const actionTypes = {

  GET_STEP: 'GET_STEP',

  UPDATE_STEP: 'UPDATE_STEP'

};

export function getStep () {
  return {
    type: actionTypes.GET_STEP
  };
}

export function updateStep (key, obj) {
  return {
    type: actionTypes.UPDATE_STEP,
    key,
    obj
  };
}

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STEP:
      return update(state, 'key', action.key, action.obj);
    case actionTypes.GET_STEP:
      return [ ...state ];
    default:
      return state;
  }
};
