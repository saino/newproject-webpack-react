import { update, findItem, remove, add } from '../../utils/array-handle';
import config from '../../config';

const defState = {
  pageInfo: {
    page: 0,
    perpage: 40
  },
  // 是否正在加载，主要用于因为是异步取数据，在数据没到时候，有可能多次滚动到底部
  isLoading: false,
  // 是否所有数据加载完成，避免频繁请求服务器
  isLoaded: false,
  list: []
};

export default function rotoMaterial (state = defState, action) {
  switch (action.type) {
    case 'GET_MATERIALS':
      const pageInfo = { page: action.page, perpage: 40 };

      const materialList = action.materials.map(material => ({
        ...material,
        id: +material.id,
        path: `${ config.fileUpload.host }:${ config.fileUpload.port }${ material.path }` })
      );

      return {
        ...state,
        pageInfo,
        isLoading: false,
        isLoaded: action.isLoaded,
        list: add(state.list, materialList)
      };

    case 'LOADING':
      return { ...state, isLoading: true };

    case 'CLEAR_LOAD_INFO':
      return { ...state, pageInfo: { page: 0, perpage: 40 }, isLoading: false, isLoaded: false };

    case 'REMOVE_MATERIAL':
      return { ...state, list: remove(state.list, 'id', action.materialId) };

    default:
      return state;
  }
}
