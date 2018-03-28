
const defaultState = {
    id: "work001",
    name: "作品1",
    video: [
        { id: "video0001",duration: 5000, src: "../../statics/aaa.mp4", order: 2 },
        { id: "video0002",duration: 4000, src: "../../statics/bbb.mp4", order: 1 }
    ],
    duration: 9000,
    material: [{
        id: "material0001",
        type: "video",
        src: "",
        name: "视频素材",
        active: false,
        order: 1,
        duration: 1000,
        timeStart: {
            hour: "",
            minute: "",
            second: "",
            millisecond: "",
        },
        timeEnd: {
            hour: "",
            minute: "",
            second: "",
            millisecond: "",
        },
        width: 100,
        height: 100,
        positionX: 0,
        positionY: 0,
        rotateZ:0,
        control: [
            { x: "", y: "" },
            { x: "", y: "" },
            { x: "", y: "" },
            { x: "", y: "" },
        ],

    }, {
        id: "material0002",
        type: "image",
        src: "",
        name: "图片素材",
        active: true,
        order: 2,
        timeStart: {
            hour: "",
            minute: "",
            second: "",
            millisecond: "",
        },
        timeEnd: {
            hour: "",
            minute: "",
            second: "",
            millisecond: "",
        },
        width: 1000,
        height: 1000,
        positionX: 0,
        positionY: 0,
        rotateZ: 0,
        transform: "",
        control: [
            { x: "", y: "" },
            { x: "", y: "" },
            { x: "", y: "" },
            { x: "", y: "" },
        ],
    }, {
        id: "material0003",
        type: "audio",
        src: "",
        name: "音频素材",
        active: false,
        loop: false,
        duration: 1000,
        timeStart: {
            hour: "",
            minute: "",
            second: "",
            millisecond: "",
        },
        timeEnd: {
            hour: "",
            minute: "",
            second: "",
            millisecond: "",
        },
    }],
};

const actionTypes = {
    "GET_WORK": "GET_WORK",
    "SAVE_WORK": "SAVE_WORK",
    "CHANGE_MATERIAL": "CHANGE_MATERIAL"
}

export const changeMaterial = (materialItem) => {
    return {
        type: actionTypes.CHANGE_MATERIAL,
        materialItem
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_WORK:
            return state;
        case actionTypes.SAVE_WORK:
            let state1 = { ...action.work, video: [...action.work.video], material: [...action.work.material] }
            return state1;
        case actionTypes.CHANGE_MATERIAL:
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
        case actionTypes.SET_MATERIAL_ACTIVE:

            return state;
        default:
            return state;
    }
}