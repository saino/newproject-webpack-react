import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import {combineReducers} from 'redux'


const userInfo = (state = {}, action) => {
    if (action.type === ActionTypes.LOGIN_SUCCESS||action.type ===ActionTypes.GETUSER_SUCCESS) {
        return action.userInfo
    }
    if(action.type===ActionTypes.LOGOUT){
        return {}
    }
    return state
}

const rootReducer = combineReducers({
    userInfo
})

export default rootReducer
