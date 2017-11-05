import { add, update } from '../utils/stateSet';
import packageToken from '../utils/packageToken';
import { post } from '../fetch/fetch';
import { logout } from './user';

const defaulState = {
    curr: 0,
    pageSize: 0,
    total: 0, 
    works: []
};

const actionTypes = {
    GET_WORKS: "GET_WORKS",
    DELETE_WORK: "DELETE_WORK",
}

export const getWorks = packageToken((dispatch, { token, curr, pageSize }) => {
  post('/getWorks', { token, curr, pageSize }, resp => {
    const { total, works } = resp;

    dispatch({
      type: actionTypes.GET_WORKS,
      curr,
      pageSize,
      total,
      works
    })      
  });
}, logout);


export default (state = defaulState, action) => {
    switch (action.type) {

        case actionTypes.GET_WORKS:
            const { curr, pageSize, total, works } = action;
            
            return { ...state, ...{ curr, pageSize, total, works } };

        case actionTypes.DELETE_PROJECT:
            return state;

        default: 
            return state;

    }
}