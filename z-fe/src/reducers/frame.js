import { add } from '../utils/stateSet';

/*
  item.materialId Number 素材id,
  item.cameraId Number 场景id
  item.frameId 帧数
  item.second 秒数
*/
const defState = [];

const actionTypes = { SOLUTION_FRAME: 'SOLUTION_FRAME' };

export const solutionFrame = frames => ({
  type: actionTypes.SOLUTION_FRAME,
  frames
});

export default (state = defState, action) => {
  switch (action.type) {

    case actionTypes.SOLUTION_FRAME:
      return [ ...state, ...action.frames ];

    default:
      return state;

  }
};
