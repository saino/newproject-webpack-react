import { add, update, remove } from '../utils/stateSet';
import packageToken from '../utils/packageToken';
import { post } from '../fetch/fetch';
import { logout } from './user';

/*
  item.work_id Number 作品id
  item.id Number 素材id,
  item.type String 素材类别
  item.status String 状态
  item.local_path String 本地路径
  item.path String 服务器路径
  item.thumb String 素材缩略图地址,
  item.name String 素材名称,
  item.properties Object 帧信息
  item.totalFrame Number 总帧数
  item.duration Number 总时长
  item.frameRate Number 帧率 前端自己设置，无需服务端返回
*/
const defState = {
  materials: [],
  scenes: []
};

const actionTypes = {
  GET_MATERIALS: 'GET_MATERIALS',
  UPLOAD_MATERIAL: 'UPLOAD_MATERIAL',
  DELETE_MATERIAL: 'DELETE_MATERIAL',
  CREATE_SCENE: 'CREATE_SCENE',
  SET_FRAME_RATE: 'SET_FRAME_RATE',
  SET_DURATION: 'SET_DURATION',
  SET_FRAMES: 'SET_FRAMES',
  CLEAR_MATERIALS: 'CLEAE_MATERIALS'
};

/**
 * 获取素材列表
 */
export const getMaterials = packageToken((dispatch, { token, workId }) => {
  post('/user/loadWork', { token, work_id: workId }, resp => {
    dispatch({
      type: actionTypes.GET_MATERIALS,
      materials: resp.materials || [],
      scenes: resp.scenes || []
    });
  });
});

/**
 * 清空素材列表
 */
export const clearMaterials = () => {
  return {
    type: actionTypes.CLEAR_MATERIALS
  };
};

/**
 * 删除素材
 * @param id { String } 素材id
 */
export const deleteMaterial = (materialId) => ({
  type: actionTypes.DELETE_MATERIAL,
  materialId
});

/**
 * 上传素材
 */
export const uploadMaterial = (material) => ({
  type: actionTypes.UPLOAD_MATERIAL,
  material
});

/**
 * 创建镜头
 */
export const createScene = ({ id, mtype, materialId, roto }) => ({
  type: actionTypes.CREATE_SCENE,
  id,
  mtype,
  materialId,
  roto
});

/**
 * 设置素材时长
 */
export const setDuration = (materialId, duration) => ({
  type: actionTypes.SET_DURATION,
  materialId,
  duration
});

/**
 * 设置素材帧图片集合
 */
export const setFrames = (materialId, frames) => {
  return {
    type: actionTypes.SET_FRAMES,
    materialId,
    frames
  };
};

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.GET_MATERIALS:
      const { materials, scenes } = action;

      return { ...state, materials, scenes };

    case actionTypes.DELETE_MATERIAL:
      const { materialId } = action;

      return { ...state, materials: remove(state.materials, materialId, 'id') };

    case actionTypes.UPLOAD_MATERIAL:
      const { material } = action;

      return { ...state, materials: add(state.materials, material) };

    case actionTypes.CREATE_SCENE:
      const scene = { id: action.id, type: action.mtype, material_id: action.materialId, roto: action.roto };

      return { ...state, scenes: add(state.scenes, scene) };

    case actionTypes.SET_FRAMES:
      console.log(action.frames, action.materialId, 'xxxoo');
      return { ...state, materials: update(state.materials, { 'properties.frames': action.frames }, action.materialId, 'id') };

    case actionTypes.SET_DURATION:
      return { ...state, materials: update(state.materials, { 'properties.time': action.duration }, action.materialId, 'id') };

    case actionTypes.CLEAR_MATERIALS:
      return { ...state, materials: []}

    default:
      return state;

  }
};
