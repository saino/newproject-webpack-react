import { add, update, remove, findItem } from '../../utils/array-handle';
import { post, error as fail } from '../../api/fetch';

const defaultState = {
    name: "自定义作品",
    config: {
        videos: [],
        materials: [],
        properties: {
            height: "400",
            width: "800",
            scale: 1,
            videoPlay: false,
            duration: 0,
            positionX: 0,
            positionY: 0,
            videoPX: "px1",
            videoType: "type1",
            currentFrameNum: 0,
        }
    }
}

const actionTypes = {
    "CREATE_WORK": "CREATE_WORK",
    "GET_WORK": "GET_WORK",
    "SAVE_WORK": "SAVE_WORK",
    "CHANGE_WORK_MATERIAL": "CHANGE_WORK_MATERIAL",
    "CHANGE_WORK": "CHANGE_WORK",
    "CHANGE_WORK_VIDEO": "CHANGE_WORK_VIDEO",
    "CHANGE_WORK_PLAY": "CHANGE_WORK_PLAY",
    "CHANGE_WORK_PROPERTIES": "CHANGE_WORK_PROPERTIES"
}

export const createWork = (body) => {
    return (dispatch) => {
        post("/fx/saveWork", body)
        .then((resp)=>{
            dispatch({
                type: actionTypes.CREATE_WORK,
                work: resp
            });
        })
    }
}

export const loadWork = (body) => {
    return (dispatch) => {
        post("/fx/loadWork", body)
        .then((resp)=>{
            dispatch({
                type: actionTypes.CREATE_WORK,
                work: resp
            });
        })
    }
}

export const changVideoPlay = (isPlay) => {
    return {
        type: actionTypes.CHANGE_WORK_PLAY,
        isPlay
    }
}

export const changeWorkProperties = (properties) => {
    return {
        type: actionTypes.CHANGE_WORK_PROPERTIES,
        properties
    }
}

export const changeWorkMaterial = (materialItem) => {
    return {
        type: actionTypes.CHANGE_WORK_MATERIAL,
        materialItem
    }
}
export const changWorkVideo = (videoItem) => {
    return {
        type: actionTypes.CHANGE_WORK_VIDEO,
        videoItem
    }
}
export const changeWork = (newWork) => {
    return {
        type: actionTypes.CHANGE_WORK,
        newWork
    }
}
export const saveWork = (body, successFUN) => {
    return  post("/fx/saveWork", body)
            .then((resp)=>{
                successFUN&&successFUN(resp);
            });
}
export const buildWork = (body, successFUN) => {
    return post("/fx/build", body)
            .then((resp)=>{
                successFUN&&successFUN(resp);
            });
}

export const getProgress = (body, successFUN) => {
    return post("/getProgress", body)
            .then((resp)=>{
                successFUN&&successFUN(resp)
            });
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_WORK: 
            return {...action.work}
        case actionTypes.GET_WORK:
            return state;
        case actionTypes.SAVE_WORK:
            let state1 = { ...action.work, video: [...action.work.video], material: [...action.work.material] }
            return state1;
        case actionTypes.CHANGE_WORK:
            return {...action.newWork};

        case actionTypes.CHANGE_WORK_VIDEO: 
            let videoTmp = [], workDuration = 0;
            if(Array.isArray(action.videoItem)){
                videoTmp = action.videoItem;
            } else {
                videoTmp = state.config.videos.map((videoItem)=>{
                    if (action.videoItem && videoItem.id===action.videoItem.id) {
                        return action.videoItem;
                    }
                    return videoItem;
                });
            }
            videoTmp.forEach(video => {
                let duration = video.properties.duration - 0;
                workDuration += duration;
            });
            return { ...state, config: { ...state.config, videos: [...videoTmp], properties: { ...state.config.properties, duration: workDuration } } };

        case actionTypes.CHANGE_WORK_MATERIAL:
            if (Array.isArray(action.materialItem)) {
                return { ...state, config: {...state.config, materials: [...action.materialItem]}};
            }
            const materialTmp = state.config.materials.map((materialItem) => {
                if (action.materialItem && materialItem.id === action.materialItem.id) {
                    return action.materialItem;
                }
                return materialItem;
            });
            return { ...state, config: {...state.config, materials: [...materialTmp]}}
        
        case actionTypes.CHANGE_WORK_PROPERTIES:
            return {...state, config: {...state.config, properties: {...action.properties}}}

        case actionTypes.CHANGE_WORK_PLAY: 
            return {...state, config: {...state.config, properties: {...state.config.properties, videoPlay: action.isPlay}}};

        case actionTypes.SET_MATERIAL_ACTIVE:

            return state;
        default:
            return state;
    }
}