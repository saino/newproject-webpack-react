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

export const getMaterialList = materialParams => {
  return (dispatch) => {
    post("/user/getMaterials", materialParams)
      .then(resp => {
        dispatch({
          type: 'GET_MATERIALS',
          materials: resp.result,
          page: materialParams.page
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
