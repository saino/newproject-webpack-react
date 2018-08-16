// export function uploadMaterial (material) {
//   return {
//     type: 'UPLOAD_MATERIAL',
//     material
//   }
// }

// export function changeMaterial (materialItems) {
//   return {
//       type: 'CHANGE_MATERIAL',
//       materialItems
//   };
// };

import { post, error as fail } from '../../api/fetch';

export const loading = () => ({
  type: 'LOADING'
});

export const clearLoadInfo = () => ({
  type: 'CLEAR_LOAD_INFO'
});

export const addMaterial = material => {
  return {
    type: 'ADD_MATERIAL',
    material
  };
};

export const getMaterialList = materialParams => {
  return (dispatch) => {
    post("/user/getMaterials", materialParams)
      .then(resp => {
        dispatch({
          type: 'GET_MATERIALS',
          materials: resp.result,
          page: resp.currentPage < 1 ? 1 : resp.currentPage,
          isLoaded: !resp.result.length
        });
      })
      .catch(fail);
  }
};

export const removeMaterial = materialId => dispatch => {
  post('/user/deleteMaterial', { id: materialId })
    .then(resp => dispatch({
      type: 'REMOVE_MATERIAL',
      materialId
    }))
    .catch(fail);
}

export const clear = () => ({
  type: 'CLEAR_ROTO_MATERIALS'
});
