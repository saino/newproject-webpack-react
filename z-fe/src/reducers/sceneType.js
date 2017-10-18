const actionTypes = {
  GET_SCENETYPE: 'GET_SCENETYPE'
};

const defState = [{
  key: 'fixedAdvert1',
  name: '固定广告植入',
  selected: true
}, {
  key: 'fixedAdvert2',
  name: '固定广告植入',
  selected: false
}];

export function getSceneType () {
  return {
    type: actionTypes.GET_SCENETYPE
  };
}

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.GET_SCENETYPE:
      return [ ...state ];
    default:
      return state;
  }
};
