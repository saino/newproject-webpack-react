import { update }  from '../utils/stateSet';

const defState = {
  steps:[{
  key: 'materials',
  name: '素材上传',
  status: 'complete'
}, {
  key: 'effect',
  name: '镜头特效',
  status: 'wait'
}, {
  key: 'combine',
  name: '镜头组合',
  status: 'wait'
}, {
  key: 'publish',
  name: '视频发布',
  status: 'wait'
}],current:1};

const actionTypes = { UPDATE_STEP: 'UPDATE_STEP' ,SELECT_STEP:'SELECT_STEP'};

export function updateStep (key, obj) {
  return {
    type: actionTypes.UPDATE_STEP,
    key,
    obj
  };
}
export function selectStep (stepIndex) {
    return {
        type: actionTypes.SELECT_STEP,
        stepIndex
    };
}

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STEP:
      return {current:state.state,steps:update(state.steps, action.obj, action.key, 'key')};
      case actionTypes.SELECT_STEP:
          return {...state,current:action.stepIndex,};
    default:
      return state;
  }
};
