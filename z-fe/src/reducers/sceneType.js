const actionTypes = {
  GET_SCENETYPE: 'GET_SCENETYPE'
};

const defState = [{
  key: 'fixedAdvert',
  name: '固定广告植入',
  selected: true
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
