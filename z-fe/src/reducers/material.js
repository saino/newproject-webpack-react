import { add, update, remove, updateArray } from '../utils/stateSet';
import packageToken from '../utils/packageToken';
import { post } from '../fetch/fetch';
import { logout } from './user';
import scene from './scene';

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
  layers: [
    {
      baseLayer: true,
      create_time: "1513486522",
      id: "33",
      path: "/data/materials/33/source/video.ogv",
      "properties": {
        height: 192,
        length: 1465,
        thumbnail: "/data/materials/33/sequence/00000.jpg",
        time: null,
        width: 320,
      },
      order: 0,
      scene_id: 3,
      status: "0",
      type: "video",
      update_time: "1513486523",
      user_id: "32",
      work_id: "51",
    }
  ],
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
  ADD_LAYERS: 'ADD_LAYERS',
  DELETE_LAYER: 'DELETE_LAYER',
  UPDATE_LAYERS: 'UPDATE_LAYERS'
};

/**
 * 更新镜头图层
 * param(Array)
 */
export const updateLayers = (layers) => ({
  type: actionTypes.UPDATE_LAYERS,
  layers
});

/**
 * 添加镜头图层
 */
export const addLayers = (layer) => ({
  type: actionTypes.ADD_LAYERS,
  layer
});

/**
 * 删除镜头图层
 */

export const deleteLayer = (layer) => ({
  type: actionTypes.DELETE_LAYER,
  layer
});

/**
 * 获取素材列表
 */
export const getMaterials = packageToken((dispatch, { token, workId }) => {
  post('/user/loadWork', { token, work_id: workId }, resp => {
    dispatch({
      type: actionTypes.GET_MATERIALS,
      materials: resp.materials || [],
      scenes: resp.scenes || [{
        id: 1,
        type: "roto",
        material_id: "33"
      }, {
        id: 2,
        type: "roto",
        material_id: "34",
      }]
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
      return { ...state, materials: [] };

    case actionTypes.ADD_LAYERS:
      return { ...state, layers: add(state.layers, action.layer) };

    case actionTypes.DELETE_LAYER:
      return { ...state, layers: remove(state.layers, action.layer.id, "id") };

    case actionTypes.UPDATE_LAYERS:
      return { ...state, layers: updateArray(state.layers, action.layers, "id") }

    default:
      return state;

  }
};
