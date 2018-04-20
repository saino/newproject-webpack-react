
const defaultState = {
    id: "work001",
    name: "作品1",
    videoPX: "px1",
    videoType: "type1",
    scaleX: 1,
    scaleY: 1,
    
    video: [
        { id: "video0001", duration: 9985, path: "../../statics/aaa.mp4", order: 2 },
        { id: "video0002", duration: 60095, path: "../../statics/bbb.mp4", order: 1 }
    ],
    duration: 70080,
    currentVideoTime: 0,
    videoPlay: false,
    material: [
    {
        id: "material0001",
        materialId: "9995",
        type: "video",
        path: "",
        name: "视频素材",
        width: 100,
        height: 100,
        duration: 1000,        
        status: 96995,

        active: false,
        order: 1,
        timeEnd: {
            hour: 0,
            minute: 1,
            second: 10,
            millisecond: 80,
        },
        timeStart : {
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        },
        positionX: 0,
        positionY: 0,
        rotateZ:0,
        control: [
            { x: "", y: "" },
            { x: "", y: "" },
            { x: "", y: "" },
            { x: "", y: "" },
        ],

    }, 
    {
        id: "material0002",
        type: "image",
        src: "",
        name: "图片素材",
        active: true,
        order: 2,
        timeEnd: {
            hour: 0,
            minute: 0,
            second: 6,
            millisecond: 0,
        },
        timeStart: {
            hour: 0,
            minute: 0,
            second: 3,
            millisecond: 0,
        },
        width: 1000,
        height: 1000,
        positionX: 100,
        positionY: 100,
        rotateZ: 0,
        transform: "",
        control: [
            { x: "", y: "" },
            { x: "", y: "" },
            { x: "", y: "" },
            { x: "", y: "" },
        ],
    }, 
    // {
    //     id: "material0003",
    //     type: "audio",
    //     src: "",
    //     name: "音频素材",
    //     active: false,
    //     loop: false,
    //     duration: 1000,
    //     timeEnd: {
    //         hour: 0,
    //         minute: 1,
    //         second: 10,
    //         millisecond: 80,
    //     },
    //     timeStart: {
    //         hour: 0,
    //         minute: 0,
    //         second: 0,
    //         millisecond: 0,
    //     },
    // }
    ],
};

const actionTypes = {
    "GET_WORK": "GET_WORK",
    "SAVE_WORK": "SAVE_WORK",
    "CHANGE_WORK_MATERIAL": "CHANGE_WORK_MATERIAL",
    "CHANGE_WORK": "CHANGE_WORK",
    "CHANGE_WORK_VIDEO": "CHANGE_WORK_VIDEO",
    "CHANGE_WORK_PLAY": "CHANGE_WORK_PLAY"
}

export const changVideoPlay = (isPlay) => {
    return {
        type: actionTypes.CHANGE_WORK_PLAY,
        isPlay
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

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_WORK:
            return state;
        case actionTypes.SAVE_WORK:
            let state1 = { ...action.work, video: [...action.work.video], material: [...action.work.material] }
            return state1;
        case actionTypes.CHANGE_WORK:
            return {...action.newWork};
        case actionTypes.CHANGE_WORK_VIDEO: 
            if(Array.isArray(action.videoItem)){
                return { ...state, video: [...action.videoItem]}
            }
            const videoTmp = state.video.map((videoItem)=>{
                if (action.videoItem && videoItem.id===action.videoItem.id) {
                    return action.videoItem;
                }
                return videoItem;
            });
            return { ...state, video: [...videoTmp]};
        case actionTypes.CHANGE_WORK_MATERIAL:
            if (Array.isArray(action.materialItem)) {
                return { ...state, material: [...action.materialItem] };
            }
            const materialTmp = state.material.map((materialItem) => {
                if (action.materialItem && materialItem.id === action.materialItem.id) {
                    return action.materialItem;
                }
                return materialItem;
            });
            return { ...state, material: [...materialTmp] }
        case actionTypes.CHANGE_WORK_PLAY: 
            console.log("xxxxxxxxxxxxx");
            return {...state, videoPlay: action.isPlay};
        case actionTypes.SET_MATERIAL_ACTIVE:

            return state;
        default:
            return state;
    }
}