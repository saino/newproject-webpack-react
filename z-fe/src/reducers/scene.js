import { add } from '../utils/stateSet';
import packageToken from '../utils/packageToken';
import { post } from '../fetch/fetch';
import { logout } from './user';

/*
  item.work_id Number 作品id
  item.material_id Number 素材id,
  item.id Number 镜头id
  item.type String 镜头类型
  item.thumbnail String 镜头缩略图
  item.name String 镜头名称 '固定广告植入' (前端自己设置)
  item.roto Object 抠像信息
*/
const defState = {
  scenes: []
};

const actionTypes = {
  GET_SCENES: 'GET_SCENES',
  ADD_SCENE: 'ADD_SCENE'
};

export const getScenes = (workId, materialId, scenes) => ({
  type: actionTypes.GET_SCENES,
  scenes: scenes.map(item => ({ ...item, workId, materialId }))
});

export const addScene = (workId, materialId, scene) => ({
  type: actionTypes.ADD_SCENE,
  workId,
  materialId,
  scene
});

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SCENE:
      const { workId, materialId, scene } = action;

      return add(state.scenes, { ...scene, work_id: workId, material_id: materialId });

    case actionTypes.GET_SCENES:
      return [ ...state.scenes, ...action.scenes ];

    default:
      return state;

  }
};
