import { add, update, remove, updateArray, getItemByKey, asc } from '../utils/stateSet';

const defState = [];
const actionTypes = {
  SET_ROTO_JOBID: 'SET_ROTO_JOBID',
  SET_ROTO_PROGRESS: 'SET_ROTO_PROGRESS',
};

export function setRotoJobId ({ workId, sceneId, jobId }) {
  return {
    type: actionTypes.SET_ROTO_JOBID,
    workId,
    sceneId,
    jobId
  };
}

export function setRotoProgress ({ workId, sceneId, progress }) {
  return {
    type: actionTypes.SET_ROTO_PROGRESS,
    workId,
    sceneId,
    progress
  };
}

export default function rotoProgress (state = defState, action) {
  switch (action.type) {
    case actionTypes.SET_ROTO_JOBID:
      return add(state, { 'work_id': action.workId, 'scene_id': action.sceneId, 'job_id': action.jobId });
    case actionTypes.SET_ROTO_PROGRESS:
      return update(state, { progress: action.progress }, (item) => item.work_id == action.workId && item.scene_id == action.sceneId);
    default:
      return state;
  }
}
