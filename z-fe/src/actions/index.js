import {getServerJson, postInfo, setUserInfo} from "../utils/index";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

export const loginSuc = (userInfo) => ({
    type: LOGIN_SUCCESS,
    userInfo
})

const logoutSuc = () => ({
    type: LOGOUT
})
export const logout = () => {
    return function (dispatch) {
        setUserInfo()
        dispatch(logoutSuc());
    }

}

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
const registerStart = () => ({
    type: REGISTER_REQUEST
})
const registerSuc = (userInfo) => ({
    type: REGISTER_SUCCESS,
    userInfo
})
const registerFailure = (msg) => ({
    type: REGISTER_FAILURE,
    msg
})
export const register = (obj) => {
    var cb=obj.cb;
    delete obj.cb;
    return function (dispatch) {
        dispatch(registerStart());
        postInfo({
            url: `${window.api}register`,
            data:obj,
            success: function (d) {
                dispatch(registerSuc(d));
                if(cb){
                    cb();
                }
            }, error: function (msg) {
                dispatch(registerFailure(msg))
            }
        })
    }
}

export const UPDATEUSER_REQUEST = 'UPDATEUSER_REQUEST'
export const UPDATEUSER_SUCCESS = 'UPDATEUSER_SUCCESS'
export const UPDATEUSER_FAILURE = 'UPDATEUSER_FAILURE'
const updateUserStart = (userInfo) => ({
    type: UPDATEUSER_REQUEST,
    userInfo
})
const updateUserSuc = (userInfo) => ({
    type: UPDATEUSER_SUCCESS,
    userInfo
})
const updateUserFailure = (msg) => ({
    type: UPDATEUSER_FAILURE,
    msg
})
export const updateUser = userInfo => {
    return (dispatch, getState) => {
        var user = getState().userInfo;
        if (!user.fullInfo) {
            dispatch(getUserStart())
            postInfo({
                url: `${window.api}updateuser`,
                success: function (d) {
                    setUserInfo(d)
                    dispatch(getUserSuc(d));
                }, error: function (msg) {
                    dispatch(getUserFailure(msg))
                }
            })
        } else {
            dispatch(getUserSuc(user))
        }

    }

}
export const GETUSER_REQUEST = 'GETUSER_REQUEST'
export const GETUSER_SUCCESS = 'GETUSER_SUCCESS'
export const GETUSER_FAILURE = 'GETUSER_FAILURE'

export const getUser = (redirect) => {
    return (dispatch, getState) => {
        var user = getState().userInfo;
        if (!user.name) {
            dispatch(getUserStart())
            getServerJson({
                url: `${window.api}userinfo`,
                success: function (d) {
                    if(d.status==0){
                        const {data}=d
                        dispatch(getUserSuc(data));
                    }else {
                        if(redirect){
                            redirect()
                        }else{
                            window.location.pathname="/login"
                        }
                    }


                }, error: function (msg) {
                    dispatch(getUserFailure(msg))
                }
            })
        } else {
            dispatch(getUserSuc(user))
        }

    }
}

const getUserStart = () => ({
    type: GETUSER_REQUEST
})
export const getUserSuc = (userInfo) => ({
    type: GETUSER_SUCCESS,
    userInfo
})
export const getUserFailure = (msg) => ({
    type: GETUSER_FAILURE,
    msg
})