import { add, update, remove, getItemByKey } from '../utils/stateSet';
import packageToken from '../utils/packageToken';
import { post } from '../fetch/fetch';
import { logout } from './user';

const defState = {
  page: {
    current: 1,
    pageSize: 11,
    total: 0
  },
  works: [],
  needWorks: []
};

const actionTypes = {
    GET_WORKS: 'GET_WORKS',
    GET_NEED_WORKS: 'GET_NEED_WORKS',
    DELETE_WORK: 'DELETE_WORK',
    DELETE_MATERIAL: 'DELETE_MATERIAL'
}

export const getWorks = packageToken((dispatch, { token }) => {
  post('/getWorks', { token }, resp => {
    const { works } = resp;
    const current = 1;
    const pageSize = 11;

    dispatch({
      type: actionTypes.GET_WORKS,
      page: {
        current,
        pageSize,
        total: works.length
      },
      works,
      needWorks: works.slice((current - 1) * pageSize, current * pageSize)
    });
  });
}, logout);

export const getNeedWorks = (current) => ({
  type: actionTypes.GET_NEED_WORKS,
  current
});

export const deleteWork = (workId) => ({
  type: actionTypes.DELETE_WORK,
  workId
});

export const deleteMaterial = (workId, materialId) => ({
  type: actionTypes.DELETE_MATERIAL,
  workId,
  materialId
});

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.GET_WORKS:
      const { works, page, needWorks } = action;

      return { ...state, page, works, needWorks };

    case actionTypes.GET_NEED_WORKS:
      const { current } = action;
      const startPos = (current - 1) * state.page.pageSize;
      const endPos = current * state.page.pageSize;

      return { ...state, page: { ...state.page, current }, needWorks: [ ...state.works.slice(startPos, endPos) ] };

    case actionTypes.DELETE_WORK:
      const { workId } = action;
      const startPos1 = (state.page.current - 1) * state.page.pageSize;
      const endPos1 = state.page.current * state.page.pageSize;
      const deletedWorks = remove(state.works, workId, 'id');

      return { ...state, works: deletedWorks, needWorks: [ ...deletedWorks.slice(startPos1, endPos1) ], page: { ...state.page, total: deletedWorks.length } };

    case actionTypes.DELETE_MATERIAL:
      const { materialId } = action;
      const work = getItemByKey(state.works, action.workId, 'id');
      const deleteMaterials = remove(work.config.materials, materialId, 'id');
      work.config.materials = deleteMaterials;

      return { ...state, works: update(state.works, work, action.workId, 'id') };

    default:
      return state;
  }
}
