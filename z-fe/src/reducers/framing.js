const defState = {

  // 每秒多少帧
  frameSize: 24,

  // 当前第几帧
  currFrame: 0,

  // 总帧数
  total: 0,

  // 帧对应的秒
  second: 0

};

const actionTypes = {

  SOLUTION_FRAME: 'SOLUTION_FRAME',

  SET_CURR_FRAME: 'SET_CURR_FRAME',

  PARSE_SECOND: 'PARSE_SECOND'

};

export function solutionFrame (frame) {
  return {
    type: actionTypes.SOLUTION_FRAME,
    frame
  };
}

export function setCurrFrame (currFrame) {
  return {
    type: actionTypes.SET_CURR_FRAME,
    currFrame
  };
}

export function parseFrameToSecond () {
  return {
    type: actionTypes.PARSE_SECOND
  };
}

export default function (state = defState, action) {
  switch (action.type) {

    case actionTypes.SOLUTION_FRAME:
      return { ...state, ..action.frame };

    case actionTypes.SET_CURR_FRAME:
      return { ...state, currFrame: action.currFrame };

    case actionTypes.PARSE_SECOND:
      return {};
  }
}
