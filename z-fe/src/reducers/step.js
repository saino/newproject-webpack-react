import { update }  from '../utils/stateSet';

const defState = [{
  key: 'materials',
  name: '素材上传',
  status: 'complete'
}, {
  key: 'effect',
  name: '镜头特效',
  status: 'doing'
}, {
  key: 'combine',
  name: '镜头组合',
  status: 'wait'
}, {
  key: 'publish',
  name: '视频发布',
  status: 'wait'
}];

const actionTypes = { UPDATE_STEP: 'UPDATE_STEP' };

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
      return update(state, action.obj, action.key, 'key');
    default:
      return state;
  }
};
