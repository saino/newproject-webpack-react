import { update } from '../utils/stateSet';

/*
  item.materialId Number 素材id,
  item.sceneId Number 场景id
  item.frameId 帧数
  item.time 时长
  item.dataUrl 图片base64码
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

export const setFrameDataUrl = (materialId, sceneId, frameId, dataUrl) => ({
  type: actionTypes.SET_FRAME_DATA_URL,
  materialId,
  sceneId,
  frameId,
  dataUrl
});

export default (state = defState, action) => {
  switch (action.type) {

    case actionTypes.SOLUTION_FRAME:
      return [ ...state, ...action.frames ];

    case actionTypes.SET_FRAME_DATA_URL:
      return update(state, { dataUrl: action.dataUrl }, (item) => item.materialId == action.materialId && item.sceneId == action.sceneId && item.frameId == action.frameId);


    default:
      return state;

  }
};
