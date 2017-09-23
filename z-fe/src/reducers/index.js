import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import {combineReducers} from 'redux'


const userInfo = (state = {}, action) => {
    if (action.type === ActionTypes.LOGIN_SUCCESS||action.type ===ActionTypes.GETUSER_SUCCESS) {

    }
    switch (action.type){
        case ActionTypes.LOGIN_SUCCESS:
        case ActionTypes.GETUSER_SUCCESS:
            return action.userInfo;
        case ActionTypes.LOGOUT:
            return {};
        default:
            return state;
    }
}

const worksInfo=(state={currentPage:0,page:{}},action)=>{
    switch (action.type){
        case ActionTypes.GETWORKS_SUCCESS:
            var newWorksInfo={...state};
            var pageInfo=action.works;
            var current=pageInfo.currentPage;
            newWorksInfo.currentPage=pageInfo.currentPage;
            if(!newWorksInfo.page){
               newWorksInfo.page={}
            }
            newWorksInfo.page[current]=pageInfo.list;
            newWorksInfo.total=pageInfo.total;

            return newWorksInfo;
        case ActionTypes.SHOWWORKPAGE:
            // debugger
            return {...state,currentPage:action.page}
        case ActionTypes.REMOVEWORK:
            return {...state,page:{}}
    }

    return state
}

const rootReducer = combineReducers({
    userInfo,
    worksInfo
})

export default rootReducer


