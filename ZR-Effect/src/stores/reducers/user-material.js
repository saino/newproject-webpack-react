import { add, update, remove, findItem } from '../../utils/array-handle';
import { post, error as fail } from '../../api/fetch';
import config from "../../config";

const defaultState = {
    workMaterial: {
        materials:[],
        pagination: 1,
    },
    rotoMaterial: {
        materials: [],
        pagination: 1,
    },
    videoMaterial: {
        materials: [],
        pagination: 1,
    },
    imageMaterial: {
        materials: [],
        pagination: 1,
    },
    audioMaterial: {
        materials: [],
        pagination: 1,
    }
}

const actionTypes = {
    GET_WORK_MATERIAL: "GET_WORK_MATERIAL",
    GET_VIDEO_MATERIAL: "GET_VIDEO_MATERIAL",
    GET_ROTO_MATERIAL: "GET_ROTO_MATERIAL",
    GET_IMAGE_MATERIAL: "GET_IMAGE_MATERIAL",
    GET_AUDIO_MATERIAL: "GET_AUDIO_MATERIAL",
    ADD_WORK_MATERIAL: "ADD_WORK_MATERIAL",
    ADD_VIDEO_MATERIAL: "ADD_VIDEO_MATERIAL",
    ADD_ROTO_MATERIAL1: "ADD_ROTO_MATERIAL1",
    ADD_IMAGE_MATERIAL: "ADD_IMAGE_MATERIAL",
    ADD_AUDIO_MATERIAL: "ADD_AUDIO_MATERIAL",
    DELETE_WORK_MATERIAL: "DELETE_WORK_MATERIAL",
    DELETE_ROTO_MATERIAL: "DELETE_ROTO_MATERIAL",
    DELETE_VIDEO_MATERIAL: "DELETE_VIDEO_MATERIAL",
    DELETE_IMAGE_MATERIAL: "DELETE_IMAGE_MATERIAL",
    DELETE_AUDIO_MATERIAL: "DELETE_AUDIO_MATERIAL",
    GET_FIRST_WORK_MATERIAL: "GET_FIRST_WORK_MATERIAL",
    GET_FIRST_ROTO_MATERIAL: "GET_FIRST_ROTO_MATERIAL",
    GET_FIRST_VIDEO_MATERIAL: "GET_FIRST_VIDEO_MATERIAL",
    GET_FIRST_IMAGE_MATERIAL: "GET_FIRST_IMAGE_MATERIAL",
    GET_FIRST_AUDIO_MATERIAL: "GET_FIRST_AUDIO_MATERIAL",
}

export const loadWorkMaterial = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getWorks", body)
        .then((resp)=>{
            const pagination = resp.result.length >= config.page.userCenterPageSize ? body.page + 1 : body.page;
            dispatch({
                type: actionTypes.GET_WORK_MATERIAL,
                materials: resp.result, 
                pagination
            });
            successFUN&&successFUN(resp);
        });
    }
}

export const loadVideokMaterial = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
            .then((resp) => {
                const pagination = resp.result.length >= config.page.userCenterPageSize ? body.page + 1 : body.page;
                dispatch({
                    type: actionTypes.GET_VIDEO_MATERIAL,
                    materials: resp.result,
                    pagination
                });
                successFUN && successFUN(resp);
            });
    }
}
export const loadRotokMaterial = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getRotos", body)
            .then((resp) => {
                const pagination = resp.result.length >= config.page.userCenterPageSize ? body.page + 1 : body.page;
                dispatch({
                    type: actionTypes.GET_ROTO_MATERIAL,
                    materials: resp.result,
                    pagination
                });
                successFUN && successFUN(resp);
            });
    }
}
export const loadImagekMaterial = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
            .then((resp) => {
                const pagination = resp.result.length >= config.page.userCenterPageSize ? body.page + 1 : body.page;
                dispatch({
                    type: actionTypes.GET_IMAGE_MATERIAL,
                    materials: resp.result,
                    pagination
                });
                successFUN && successFUN(resp);
            });
    }
}
export const loadAudiokMaterial = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
            .then((resp) => {
                const pagination = resp.result.length >= config.page.userCenterPageSize ? body.page + 1 : body.page;
                dispatch({
                    type: actionTypes.GET_AUDIO_MATERIAL,
                    materials: resp.result,
                    pagination
                });
                successFUN && successFUN(resp);
            });
    }
}
export const loadMoreWorkMaterial = (body, successFUN) => {
    return (dispatch) => {
        console.log(body,"gggggg");
        post("/user/getWorks", body)
        .then((resp)=> {
            const pagination = resp.result.length >= config.page.userCenterPageSize ? body.page+1 : body.page;
            dispatch({
                type: actionTypes.ADD_WORK_MATERIAL,
                materials: resp.result,
                pagination
            });
            successFUN&&successFUN(resp);
        });
    }
}
export const loadMoreVideoMaterial = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
            .then((resp) => {
                const pagination = resp.result.length >= config.page.userCenterPageSize ? body.page + 1 : body.page;
                dispatch({
                    type: actionTypes.ADD_VIDEO_MATERIAL,
                    materials: resp.result,
                    pagination
                });
                successFUN && successFUN(resp);
            });
    }
}
export const loadMoreRotoMaterial = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getRotos", body)
            .then((resp) => {
                const pagination = resp.result.length >= config.page.userCenterPageSize ? body.page + 1 : body.page;
                dispatch({
                    type: actionTypes.ADD_ROTO_MATERIAL1,
                    materials: resp.result,
                    pagination
                });
                successFUN && successFUN(resp);
            });
    }
}
export const loadMoreImageMaterial = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
            .then((resp) => {
                const pagination = resp.result.length >= config.page.userCenterPageSize ? body.page + 1 : body.page;
                dispatch({
                    type: actionTypes.ADD_IMAGE_MATERIAL,
                    materials: resp.result,
                    pagination
                });
                successFUN && successFUN(resp);
            });
    }
}
export const loadMoreAudioMaterial = (body, successFUN) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
            .then((resp) => {
                const pagination = resp.result.length >= config.page.userCenterPageSize ? body.page + 1 : body.page;
                dispatch({
                    type: actionTypes.ADD_AUDIO_MATERIAL,
                    materials: resp.result,
                    pagination
                });
                successFUN && successFUN(resp);
            });
    }
}
export const deleteWorkMaterial = (work, successFUN) => {
    return (dispatch) => {
        post("/fx/deleteWork", {id: work.id})
        .then((resp)=> {
            dispatch({
                type: actionTypes.DELETE_WORK_MATERIAL,
                work
            });
            successFUN&&successFUN(resp);
        })
    }
}
export const deleteRotoMaterial = (roto, successFUN) => {
    return (dispatch) => {
        post("/roto/deleteRoto", {id: roto.id})
        .then((resp)=> {
            dispatch({
                type: actionTypes.DELETE_ROTO_MATERIAL,
                roto
            });
            successFUN&&successFUN(resp);
        });
    }
}
export const deleteVideoMaterial = (material, successFUN) => {
    return (dispatch) => {
        post("/user/deleteMaterial", { id: material.id})
        .then((resp)=>{
            dispatch({
                type: actionTypes.DELETE_VIDEO_MATERIAL,
                material
            });
            successFUN&&successFUN(resp);
        });
    }
}
export const deleteImageMaterial = (material, successFUN) => {
    return (dispatch) => {
        post("/user/deleteMaterial", { id: material.id })
            .then((resp) => {
                dispatch({
                    type: actionTypes.DELETE_IMAGE_MATERIAL,
                    material
                });
                successFUN && successFUN(resp);
            });
    }
}

export const deleteAudioMaterial = (material, successFUN) => {
    return (dispatch) => {
        post("/user/deleteMaterial", { id: material.id })
            .then((resp) => {
                dispatch({
                    type: actionTypes.DELETE_AUDIO_MATERIAL,
                    material
                });
                successFUN && successFUN(resp);
            });
    }
}

export const loadFirstPageWorkMaterial = (body) => {
    return (dispatch) => {
        post("/user/getWorks", body)
        .then((resp)=>{
            dispatch({
                type: actionTypes.GET_FIRST_WORK_MATERIAL,
                materials: resp.result
            });
        });
    }
}

export const loadFirstPageRotoMaterial = (body) => {
    return (dispatch) => {
        post("/user/getRotos", body)
        .then((resp)=>{
            dispatch({
                type: actionTypes.GET_FIRST_ROTO_MATERIAL,
                materials: resp.result
            });
        });
    }
}

export const loadFirstPageVideoMaterial = (body) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
        .then((resp)=>{
            dispatch({
                type: actionTypes.GET_FIRST_VIDEO_MATERIAL,
                materials: resp.result
            });
        });
    }
}

export const loadFirstPageImageMaterial = (body) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
            .then((resp) => {
                dispatch({
                    type: actionTypes.GET_FIRST_IMAGE_MATERIAL,
                    materials: resp.result
                });
            });
    }
}

export const loadFirstPageAudioMaterial = (body) => {
    return (dispatch) => {
        post("/user/getMaterials", body)
            .then((resp) => {
                dispatch({
                    type: actionTypes.GET_FIRST_AUDIO_MATERIAL,
                    materials: resp.result
                });
            });
    }
}

// export 

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_WORK_MATERIAL:
            return {...state, workMaterial: {...state.workMaterial, materials: action.materials, pagination: action.pagination}}
        case actionTypes.ADD_WORK_MATERIAL:
            return {...state, workMaterial: {...state.workMaterial, materials: add(state.workMaterial.materials, action.materials), pagination: action.pagination}}

        case actionTypes.GET_VIDEO_MATERIAL:
            return { ...state, videoMaterial: { ...state.videoMaterial, materials: action.materials, pagination: action.pagination } }
        case actionTypes.ADD_VIDEO_MATERIAL:
            return { ...state, videoMaterial: { ...state.videoMaterial, materials: add(state.videoMaterial.materials, action.materials), pagination: action.pagination } }

        case actionTypes.GET_ROTO_MATERIAL:
            return { ...state, rotoMaterial: { ...state.rotoMaterial, materials: action.materials, pagination: action.pagination } }
        case actionTypes.ADD_ROTO_MATERIAL1:
            return { ...state, rotoMaterial: { ...state.rotoMaterial, materials: add(state.rotoMaterial.materials, action.materials), pagination: action.pagination } }

        case actionTypes.GET_IMAGE_MATERIAL:
            return { ...state, imageMaterial: { ...state.imageMaterial, materials: action.materials, pagination: action.pagination } }
        case actionTypes.ADD_IMAGE_MATERIAL:
            return { ...state, imageMaterial: { ...state.imageMaterial, materials: add(state.imageMaterial.materials, action.materials), pagination: action.pagination } }

        case actionTypes.GET_AUDIO_MATERIAL:
            return { ...state, audioMaterial: { ...state.audioMaterial, materials: action.materials, pagination: action.pagination } }
        case actionTypes.ADD_AUDIO_MATERIAL:
            return { ...state, audioMaterial: { ...state.audioMaterial, materials: add(state.audioMaterial.materials, action.materials), pagination: action.pagination } }    

        case actionTypes.DELETE_WORK_MATERIAL:
            return { ...state, workMaterial: { ...state.workMaterial, materials: [...state.workMaterial.materials.filter(workItem => workItem.id != action.work.id)] } }
        case actionTypes.DELETE_ROTO_MATERIAL:
            return { ...state, rotoMaterial: { ...state.rotoMaterial, materials: [...state.rotoMaterial.materials.filter(rotoItem => rotoItem.id != action.roto.id)] } }
        case actionTypes.DELETE_VIDEO_MATERIAL:
            return { ...state, videoMaterial: { ...state.videoMaterial, materials: [...state.videoMaterial.materials.filter(masterialItem => masterialItem.id != action.material.id)]}}
        case actionTypes.DELETE_IMAGE_MATERIAL:
            return { ...state, imageMaterial: { ...state.imageMaterial, materials: [...state.imageMaterial.materials.filter(masterialItem => masterialItem.id != action.material.id)] } }
        case actionTypes.DELETE_AUDIO_MATERIAL:
            return { ...state, audioMaterial: { ...state.audioMaterial, materials: [...state.audioMaterial.materials.filter(masterialItem => masterialItem.id != action.material.id)] } }

        case actionTypes.GET_FIRST_WORK_MATERIAL:
            return { ...state, workMaterial: { ...state.workMaterial, materials: add(action.materials, state.workMaterial.materials) } };
        case actionTypes.GET_FIRST_ROTO_MATERIAL:
            return { ...state, rotoMaterial: { ...state.rotoMaterial, materials: add(action.materials, state.rotoMaterial.materials) } };
        case actionTypes.GET_FIRST_VIDEO_MATERIAL:
            return { ...state, videoMaterial: { ...state.videoMaterial, materials: add(action.materials, state.videoMaterial.materials)}};
        case actionTypes.GET_FIRST_IMAGE_MATERIAL:
            return { ...state, imageMaterial: { ...state.imageMaterial, materials: add(action.materials, state.imageMaterial.materials) } };
        case actionTypes.GET_FIRST_AUDIO_MATERIAL:
            return { ...state, audioMaterial: { ...state.audioMaterial, materials: add(action.materials, state.audioMaterial.materials) } };
        default:
            return state;
    }
}

