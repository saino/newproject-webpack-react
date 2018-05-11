import { update, findItem } from '../../utils/array-handle';
import config from '../../config';

const defState = {
  pageInfo: {
    page: 1,
    perpage: 40
  },
  list: []
};

export default function rotoPagination (state = defState, action) {
  switch (action.type) {
    case 'GET_MATERIALS':
      const pageInfo = { page: action.page, perpage: 40 };
      const materialList = action.materials.map(material => ({
        ...material,
        id: +material.id,
        path: `${ config.fileUpload.host }:${ config.fileUpload.port }${ material.path }` })
      );

      return { ...state, pageInfo, list: materialList };

    default:
      return state;
  }
}
