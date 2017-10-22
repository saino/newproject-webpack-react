import { add } from '../utils/stateSet';

/*
  item.materialId Number 素材id,
  item.cameraId Number 场景id
  item.frameId 帧数
  item.second 秒数
*/
const defState = [];

const actionTypes = { SOLUTION_FRAME: 'SOLUTION_FRAME' };

export const solutionFrame = (materialId, cameraId, frameId, second) => ({
  type: actionTypes.SOLUTION_FRAME,
  materialId,
  cameraId,
  frameId,
  second
});

export default (state = defState, action) => {
  switch (action.type) {

    case actionTypes.SOLUTION_FRAME:
      return [ ...action.frames ];

    default:
      return state;

  }
};
