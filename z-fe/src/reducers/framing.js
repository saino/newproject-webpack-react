const defState = {

  // 当前第几帧
  currFrame: 0,

  // 总帧数
  totalFrame: 0,

  // 帧对应的秒
  second: 0

};

const actionTypes = {

  SET_TOTAL_FRAME: 'SET_TOTAL_FRAME',

  SET_CURR_FRAME: 'SET_CURR_FRAME',

  PARSE_SECOND: 'PARSE_SECOND'

};

export function setTotalFrame (totalFrame) {
  return {
    type: actionTypes.SET_TOTAL_FRAME,
    totalFrame
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

    case actionTypes.SET_TOTAL_FRAME:
      return { ...state, totalFrame: action.totalFrame };

    case actionTypes.SET_CURR_FRAME:
      return { ...state, currFrame: action.currFrame };

    case actionTypes.PARSE_SECOND:
      return {};
  }
}
