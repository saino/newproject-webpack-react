import { add } from '../utils/stateSet';
/*
  item.materialId 素材id
  sceneId 镜头id
  dataSource: []
    item.time 时长
    item.imageUrl 图片地址
*/

const defState = [];

const actionTypes = { SET_IMAGEDATA: 'SET_IMAGEDATA' };

export const setImageData = (materialId, sceneId, dataSource) => ({
  type: actionTypes.SET_IMAGEDATA,
  materialId,
  sceneId,
  dataSource
});

export default (state = defState, action) => {
  switch (action.type) {

    case actionTypes.SET_IMAGEDATA:
      const { materialId, sceneId, dataSource } = action;

      return add(state, { materialId, sceneId, dataSource });

    default:
      return state;

  }
};
