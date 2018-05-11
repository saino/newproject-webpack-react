import { add, update, remove, findItem } from '../../utils/array-handle';
import { post, error as fail } from '../../api/fetch';

const defaultState = [];

export const changeMaterial = (materialItems) => {
    return  {
        type: 'CHANGE_MATERIAL',
        materialItems
    };
};

export const deleteMaterial = (material, successFUN) =>{
    return (dispatch)=> {
        post("/user/deleteMaterial", {id: material.id})
        .then((resp)=>{
            dispatch({
                type: 'DELETE_MATERIAL',
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
                type: 'GET_MATERIAL',
                materials: resp.result
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
                type: 'GET_MATERIAL_BEFORE',
                materials: resp.result
            });
            successFUN&&successFUN(resp);
        });
    }
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_MATERIAL':
        return add(state, action.materials);
    case 'GET_MATERIAL_BEFORE':
        return add(action.materials, state);
    case 'DELETE_MATERIAL':
        return [...state.filter(masterialItem=>masterialItem.id!=action.material.id)];
    case 'CHANGE_MATERIAL':
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
    default:
      return state;
  }
}
