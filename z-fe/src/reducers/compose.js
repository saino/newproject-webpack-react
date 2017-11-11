const actionTypes = {
    ADD_MATERIAL: 'ADD_MATERIAL',
    CHANGELAYER_MATERIAL: 'CHANGELAYER_MATERIAL',
    SELECT_MATERIAL: 'SELECT_MATERIAL',
    CHANGE_MATERIAL_POSITION: 'CHANGE_MATERIAL_POSITION',
    REMOVE_MATERIAL: 'REMOVE_MATERIAL',
    CHANGE_MATERIAL_CONTRSL_POSITION: 'CHANGE_MATERIAL_CONTRSL_POSITION'
};

var id = 1

export function addMaterial(obj) {
    var obj = {...obj, id: id++}
    return {
        type: actionTypes.ADD_MATERIAL,
        obj
    };
}

export function removeMaterial(index) {
    return {
        type: actionTypes.REMOVE_MATERIAL,
        index
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

export function changeContralPosision(itemIndex, controlIndex, controlPos,transformString) {
    return {
        type: actionTypes.CHANGE_MATERIAL_CONTRSL_POSITION,
        itemIndex, controlIndex, controlPos,transformString
    };
}

export default (state = {current: -1, materials: []}, action) => {
    switch (action.type) {
        case actionTypes.ADD_MATERIAL:
            const {obj} = action
            action.obj.controls = [{top: 0, left: 0}, {top: 0, left: obj.width}, {
                top: obj.height,
                left: obj.width
            }, {top: obj.height, left: 0}];
            return {current: state.current, materials: state.materials.concat(action.obj)};
        case actionTypes.CHANGELAYER_MATERIAL:
            return {current: action.current, materials: action.newArr};
        case actionTypes.SELECT_MATERIAL:
            return {...state, current: action.current};
        case actionTypes.CHANGE_MATERIAL_POSITION:
            var materials = state.materials;
            return {
                current: action.current,
                materials: [...materials.slice(0, action.index), action.item, ...materials.slice(action.index + 1)]
            };
        case actionTypes.REMOVE_MATERIAL:
            var materials = state.materials;
            var current = action.current;
            if (current === materials.length - 1) {
                current -= 1
            }
            return {
                current: current,
                materials: [...materials.slice(0, action.index), ...materials.slice(action.index + 1)]
            };
        case actionTypes.CHANGE_MATERIAL_CONTRSL_POSITION:
            var materials = state.materials;
            var controls = materials[action.itemIndex].controls;
            var newControls = [...controls.slice(0, action.controlIndex), action.controlPos, ...controls.slice(action.controlIndex + 1)]
            return {
                current: action.current,
                materials: [...materials.slice(0, action.itemIndex), {
                    ...materials[action.itemIndex],
                    controls: newControls,
                    transformString:action.transformString
                }, ...materials.slice(action.itemIndex + 1)]
            };
        default:
            return state;
    }
};
