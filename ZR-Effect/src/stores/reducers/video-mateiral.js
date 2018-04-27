import { add, update, remove, findItem } from '../../utils/array-handle';
import { post, error as fail } from '../../api/fetch';

const defaultState = [];

const actionTypes = {
    "GET_VIDEO_MATERIAL": "GET_VIDEO_MATERIAL",
    "DELETE_VIDEO_MATERIAL": "DELETE_VIDEO_MATERIAL",
}

export const loadVideoMaterials = (body) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
        .then((resp) => {
            dispatch({
                type: actionTypes.GET_VIDEO_MATERIAL,
                materials: resp.data.result
            });
        });
    }
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_VIDEO_MATERIAL:
            return add(state, action.materials);
        case actionTypes.DELETE_VIDEO_MATERIAL:
            return [...state.filter(masterialItem => masterialItem.id != action.material.id)];
        default:
            return state;
    }
}
