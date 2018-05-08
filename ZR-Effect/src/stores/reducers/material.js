import { add, update, remove, findItem } from '../../utils/array-handle';
import { post, error as fail } from '../../api/fetch';

const defaultState = [];

const actionTypes = {
    "GET_MATERIAL": "GET_MATERIAL",
    "GET_MATERIAL_BEFORE": "GET_MATERIAL_BEFORE",
    "CHANGE_MATERIAL": "CHANGE_MATERIAL",
    "DELETE_MATERIAL": "DELETE_MATERIAL",
}

export const changeMaterial = (materialItems) => {
    return  {
        type: actionTypes.CHANGE_MATERIAL,
        materialItems
    };
};
export const deleteMaterial = (material, successFUN) =>{
    return (dispatch)=> {
        post("/user/deleteMaterial", {id: material.id})
        .then((resp)=>{
            dispatch({
                type: actionTypes.DELETE_MATERIAL,
                material
            });
            successFUN&&successFUN(resp);
        })
        .then(()=>{
            dispatch({
                type: "DELETE_VIDEO_MATERIAL",
                material
            })
        });
    }
}

export const loadMaterials = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
        .then((resp)=>{
            dispatch({
                type: actionTypes.GET_MATERIAL,
                materials: resp.data.result
            });
            successFUN && successFUN(resp);
        });
    }
}
export const loadFirstMaterials = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
        .then((resp)=>{
            dispatch({
                type: actionTypes.GET_MATERIAL_BEFORE,
                materials: resp.data.result
            });
            successFUN&&successFUN(resp);
        });
    }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_MATERIAL:
        return add(state, action.materials);
    case actionTypes.GET_MATERIAL_BEFORE:
        return add(action.materials, state);
    case actionTypes.DELETE_MATERIAL: 
        return [...state.filter(masterialItem=>masterialItem.id!=action.material.id)];
    case actionTypes.CHANGE_MATERIAL:
        if(Array.isArray(action.materialItems)){
            return [...action.materialItems];
        }
      const tmpState = state.map((materialItem)=>{
            if(materialItem.id===action.materialItems.id){
                return action.materialItems;
            }
            return materialItem;
      })
      return [...tmpState];
    case 'UPLOAD_MATERIAL':
      return add(state, action.material);
    default:
      return state;
  }
}
