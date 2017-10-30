const actionTypes = {
    ADD_MATERIAL: 'ADD_MATERIAL',
    CHANGELAYER_MATERIAL: 'CHANGELAYER_MATERIAL',
    SELECT_MATERIAL: 'SELECT_MATERIAL',
    CHANGE_MATERIAL_POSITION: 'CHANGE_MATERIAL_POSITION'
};

var id = 1

export function addMaterial(obj) {
    var obj = {...obj, id: id++}
    return {
        type: actionTypes.ADD_MATERIAL,
        obj
    };
}

export function changeLayer(newArr, current) {
    return {
        type: actionTypes.CHANGELAYER_MATERIAL,
        newArr,
        current
    };
}

export function select(current) {
    return {
        type: actionTypes.SELECT_MATERIAL,
        current
    };
}

export function changePosision(item, index) {
    return {
        type: actionTypes.CHANGE_MATERIAL_POSITION,
        item, index
    };
}

export default (state = {current: -1, materials: []}, action) => {
    switch (action.type) {
        case actionTypes.ADD_MATERIAL:
            return {current: state.current, materials: state.materials.concat(action.obj)};
        case actionTypes.CHANGELAYER_MATERIAL:
            return {current: action.current, materials: action.newArr};
        case actionTypes.SELECT_MATERIAL:
            return {...state, current: action.current};
        case actionTypes.CHANGE_MATERIAL_POSITION:
            let materials=state.materials
            return {current: action.current,materials:[...materials.slice(0,action.index-1),action.item,...materials.slice(action.index+1)]};
        default:
            return state;
    }
};
