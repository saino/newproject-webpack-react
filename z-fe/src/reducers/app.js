/**
 * 全局state
 */

const actionTypes = {

  FETCH_START: 'FETCH_START',

  FETCH_END: 'FETCH_END'

};
const defState = {

  // 是否正在与服务端发生交互
  isFetching: false,

  // 运行的错误提示
  error: ''

};

export const fetchStart = () => ({ type: actionTypes.FETCH_START });
export const fetchEnd = () => ({ type: actionTypes.FETCH_END });
export default (state = defState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_START:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_END:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
