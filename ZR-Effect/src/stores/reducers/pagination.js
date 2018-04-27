const defaultState = {
    videoLibPage: 1,
    audioLibPage: 1,
    videoAndImgLibPage: 1,
}

const actionTypes = {
    SET_VIDEOLIBPAGE: "SET_VIDEOLIBPAGE",
    SET_AUDIOLIBPAGE: "SET_AUDIOLIBPAGE",
    SET_VIDEOANDIMGLIBPAGE: "SET_VIDEOANDIMGLIBPAGE"
}

export const setVideoAndImgLibPage = (page) => {
    return {
        type: actionTypes.SET_VIDEOANDIMGLIBPAGE,
        page
    }
}

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_VIDEOANDIMGLIBPAGE:
            return {...state, videoAndImgLibPage: action.page}
        default:
            return state;
    }
}