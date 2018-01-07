import { add, update, remove, updateArray, getItemByKey, asc } from '../utils/stateSet';

const defState = [];
const actionTypes = {
  SET_ROTO_JOBID: 'SET_ROTO_JOBID',
  UPDATE_ROTO_JOBID: 'UPDATE_ROTO_JOBID',
  SET_ROTO_PROGRESS: 'SET_ROTO_PROGRESS',
  SET_ROTO_MATERIAL_JOBID: 'SET_ROTO_MATERIAL_JOBID',
  SET_ROTO_MATERIAL_PROGRESS: 'SET_ROTO_MATERIAL_PROGRESS'
};

export function setRotoJobId ({ workId, sceneId, jobId }) {
  return {
    type: actionTypes.SET_ROTO_JOBID,
    workId,
    sceneId,
    jobId
  };
}

export function updateRotoJobId ({ workId, sceneId, jobId }) {
  return {
    type: actionTypes.UPDATE_ROTO_JOBID,
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

export function setRotoMaterialJobId ({ workId, sceneId, materialJobId }) {
  return {
    type: actionTypes.SET_ROTO_MATERIAL_JOBID,
    workId,
    sceneId,
    materialJobId
  };
}

export function setRotoMaterialProgress ({ workId, sceneId, generateProgress }) {
  return {
    type: actionTypes.SET_ROTO_MATERIAL_PROGRESS,
    workId,
    sceneId,
    generateProgress
  };
}

export default function rotoProgress (state = defState, action) {
  switch (action.type) {
    case actionTypes.SET_ROTO_JOBID:
      const isAddAction = !getItemByKey(state, (item) => item[ 'work_id' ] == action.workId && item[ 'scene_id' ] == action.sceneId);

      if (isAddAction) {
        return add(state, { 'work_id': action.workId, 'scene_id': action.sceneId, 'job_id': action.jobId, progress: 0 });
      } else {
        return update(state, { 'job_id': action.jobId }, (item) => item[ 'work_id' ] == action.workId && item[ 'scene_id' ] == action.sceneId);
      }
    case actionTypes.UPDATE_ROTO_JOBID:
      return update(state, { 'job_id': action.jobId }, (item) => item[ 'work_id' ] == action.workId && item[ 'scene_id' ] == action.sceneId);
    case actionTypes.SET_ROTO_PROGRESS:
      return update(state, { progress: action.progress }, (item) => item.work_id == action.workId && item.scene_id == action.sceneId);
    case actionTypes.SET_ROTO_MATERIAL_JOBID:
      return update(state, { 'material_job_id': action.materialJobId, 'generate_progress': 0 }, (item) => item[ 'work_id' ] == action.workId && item[ 'scene_id' ] == action.sceneId);
    case actionTypes.SET_ROTO_MATERIAL_PROGRESS:
      return update(state, { 'generate_progress': action.generateProgress }, (item) => item.work_id == action.workId && item.scene_id == action.sceneId);
    default:
      return state;
  }
}
