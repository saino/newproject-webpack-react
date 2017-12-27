import { add, update, remove, getItemByKey } from '../utils/stateSet';
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
  scenes: [],
  rotos: []
};

const actionTypes = {
  GET_MATERIALS: 'GET_MATERIALS',
  UPLOAD_MATERIAL: 'UPLOAD_MATERIAL',
  DELETE_MATERIAL: 'DELETE_MATERIAL',
  CREATE_SCENE: 'CREATE_SCENE',
  SET_FRAME_RATE: 'SET_FRAME_RATE',
  SET_DURATION: 'SET_DURATION',
  SET_FRAMES: 'SET_FRAMES',
  CLEAR_MATERIALS: 'CLEAE_MATERIALS',
  CREATE_ROTO: 'CREATE_ROTO'
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
 */
export const deleteMaterial = ({ materialId }) => ({
  type: actionTypes.DELETE_MATERIAL,
  materialId
});

/**
 * 上传素材
 */
export const uploadMaterial = ({ material }) => ({
  type: actionTypes.UPLOAD_MATERIAL,
  material
});

/**
 * 创建镜头
 */
export const createScene = ({ id, mtype, materialId }) => ({
  type: actionTypes.CREATE_SCENE,
  id,
  mtype,
  materialId
});

/**
 * 设置素材时长
 */
export const setDuration = ({ materialId, duration }) => ({
  type: actionTypes.SET_DURATION,
  materialId,
  duration
});

/**
 * 创建抠像svg path
 * @param option { Object }
 *  option.materialId 素材id
 *  option.sceneId 镜头id
 *  option.frame 帧
 *  option.type 抠像类别
 *  option.svg svg集合
 */
export const createRoto = ({ materialId, sceneId, frame, mtype, svg }) => ({
  type: actionTypes.CREATE_ROTO,
  materialId,
  sceneId,
  frame,
  mtype,
  svg
});

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
      const scene = { id: action.id, type: action.mtype, material_id: action.materialId };

      return { ...state, scenes: add(state.scenes, scene) };

    case actionTypes.CREATE_ROTO:
      const diffFn = (item) => item.materialId == action.materialId && item.sceneId == action.sceneId && item.frame == action.frame;
      const hasRoto = !!getItemByKey(state.rotos, diffFn);
      const roto = { material_id: action.materialId, scene_id: action.sceneId, frame: action.frame, type: action.mtype, svg: action.svg };

      if (!hasRoto) {
        return { ...state, rotos: add(state.rotos, roto) };
      } else {
        return { ...state, rotos: update(state.rotos, roto, diffFn) };
      }

    case actionTypes.SET_DURATION:
      return { ...state, materials: update(state.materials, { 'properties.time': action.duration }, action.materialId, 'id') };

    case actionTypes.CLEAR_MATERIALS:
      return { ...state, materials: []}

    default:
      return state;

  }
};
