import { add, update, remove } from '../utils/stateSet';
import packageToken from '../utils/packageToken';
import { post } from '../fetch/fetch';
import { logout } from './user';

const defState = {
    page: {
      current: 1,
      pageSize: 0,
      total: 0
    },
    works: []
};

const actionTypes = {
    GET_WORKS: "GET_WORKS",
    DELETE_WORK: "DELETE_WORK",
}

export const getWorks = packageToken((dispatch, { token, current, pageSize }) => {
  post('/getWorks', { token, current, pageSize }, resp => {
    const { page, works } = resp;

    dispatch({
      type: actionTypes.GET_WORKS,
      works,
      page
    })
  });
}, logout);

export const deleteWork = packageToken((dispatch, { token, workId }) => {
  post('/deleteWork', { token, workId }, resp => {
    const { workId } = resp;

    dispatch({
      type: actionTypes.DELETE_WORK,
      workId
    });
  });
}, logout);

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.GET_WORKS:
      const { works, page } = action;

      return { ...state, works, page };

    case actionTypes.DELETE_WORK:
      const { workId } = action;

      return { ...state, works: remove(state.works, workId, 'workId') };

    default:
      return state;
  }
}
