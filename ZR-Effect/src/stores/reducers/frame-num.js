
const defaultState = {
    frameNum: 0
};

const actionTypes = {
    CHANGE_FRAMENUM: "CHANGE_FRAMENUM"
}
export const changeFrameNum = (frameNum) => {
    return {
        type: actionTypes.CHANGE_FRAMENUM,
        frameNum
    }
}


export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_FRAMENUM:
            return {...state, frameNum: action.frameNum}
        default:
            return state;
    }
}