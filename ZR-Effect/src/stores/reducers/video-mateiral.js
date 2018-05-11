import { add, update, remove, findItem } from '../../utils/array-handle';
import { post, error as fail } from '../../api/fetch';

const defaultState = [];

const actionTypes = {
    "GET_VIDEO_MATERIAL": "GET_VIDEO_MATERIAL",
    "GET_VIDEO_MATERIAL_BEFORE": "GET_VIDEO_MATERIAL_BEFORE",
    "DELETE_VIDEO_MATERIAL": "DELETE_VIDEO_MATERIAL",
}

export const loadVideoMaterials = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
        .then((resp) => {
            dispatch({
                type: actionTypes.GET_VIDEO_MATERIAL,
                materials: resp.result
            });
            successFUN&&successFUN(resp);
        });
    }
}

export const loadFirstVideoMaterials = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
        .then((resp)=>{
            // console.log(resp, "ddddddddddddddddddddd", resp.data);
            // console.log(resp.data.result, "dddddddddjjjjjjjjjjjjjjjj");
            dispatch({
                type: actionTypes.GET_VIDEO_MATERIAL_BEFORE,
                materials: resp.result
            });
            successFUN&&successFUN(resp);
        });
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_VIDEO_MATERIAL:
            return add(state, action.materials);
        case actionTypes.GET_VIDEO_MATERIAL_BEFORE:
            return add(action.materials, state);
        case actionTypes.DELETE_VIDEO_MATERIAL:
            return [...state.filter(masterialItem => masterialItem.id != action.material.id)];
        default:
            return state;
    }
}
