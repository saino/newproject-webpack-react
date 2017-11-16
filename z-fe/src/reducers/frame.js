import { update } from '../utils/stateSet';

/*
  item.materialId Number 素材id,
  item.sceneId Number 场景id
  item.frameId 帧数
  item.time 时长
*/
const defState = [];

const actionTypes = {
  SOLUTION_FRAME: 'SOLUTION_FRAME',
  SET_FRAME_DATA_URL: 'SET_FRAME_DATA_URL'
};

export const solutionFrame = frames => ({
  type: actionTypes.SOLUTION_FRAME,
  frames
});

export const setFrameDataUrl = (materialId, sceneId, time, dataUrl) => ({
  type: actionTypes.SET_FRAME_DATA_URL,
  materialId,
  sceneId,
  time,
  dataUrl
});

export default (state = defState, action) => {
  switch (action.type) {

    case actionTypes.SOLUTION_FRAME:
      return [ ...state, ...action.frames ];

    case actionTypes.SET_FRAME_DATA_URL:
      return update(state, { dataUrl: action.dataUrl }, ({ materialId, sceneId, time }) => materialId == action.materialId && sceneId == action.sceneId && time == action.time);

    default:
      return state;

  }
};
