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

import { post } from '../../api/fetch';

export const getMaterialList = materialParams => {
  return (dispatch) => {
    post("/user/getMaterials", materialParams)
      .then(resp => {
        dispatch({
          type: 'GET_MATERIALS',
          materials: resp.result,
          page: resp.currentPage
        });
      })
  }
};
