const defaultState = {
    videoLibPage: 1,
    audioLibPage: 1,
    videoAndImgLibPage: 1,
}

const actionTypes = {
    SET_VIDEOLIBPAGE: "SET_VIDEOLIBPAGE",
    SET_AUDIOLIBPAGE: "SET_AUDIOLIBPAGE",
    SET_VIDEOANDIMGLIBPAGE: "SET_VIDEOANDIMGLIBPAGE",
    CHANG_PAGINATION: "CHANG_PAGINATION",
}

export const setVideoAndImgLibPage = (page) => {
    return {
        type: actionTypes.SET_VIDEOANDIMGLIBPAGE,
        page
    }
}
export const setVideoLibPage = (page) => {
    return {
        type: actionTypes.SET_VIDEOLIBPAGE,
        page
    }
}
export const setAudioLibPage = (page) => {
    return {
        type: actionTypes.SET_AUDIOLIBPAGE,
        page
    }
}
export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_VIDEOANDIMGLIBPAGE:
            return {...state, videoAndImgLibPage: action.page}
        case actionTypes.SET_VIDEOLIBPAGE: 
            return {...state, videoLibPage: action.page}
        case actionTypes.SET_AUDIOLIBPAGE:
            return {...state, audioLibPage: action.page}
        default:
            return state;
    }
}