import { add, update, remove, updateArray, getItemByKey, asc } from '../utils/stateSet';
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
  rotos: [],
  aiRotos: [],
  layers: [],
  buildVideo: {},
  work_id: '',
  work_name: ''
};

const actionTypes = {
  GET_MATERIALS: 'GET_MATERIALS',
  UPLOAD_MATERIAL: 'UPLOAD_MATERIAL',
  DELETE_MATERIAL: 'DELETE_MATERIAL',
  CREATE_SCENE: 'CREATE_SCENE',
  SET_CURRFRAME: 'SET_CURRFRAME',
  SET_FRAME_RATE: 'SET_FRAME_RATE',
  SET_DURATION: 'SET_DURATION',
  SET_FRAMES: 'SET_FRAMES',
  CLEAR_MATERIALS: 'CLEAE_MATERIALS',
  CREATE_ROTO: 'CREATE_ROTO',
  CREATE_AI_ROTO: 'CREATE_AI_ROTO',
  ADD_LAYERS: 'ADD_LAYERS',
  DELETE_LAYER: 'DELETE_LAYER',
  UPDATE_LAYERS: 'UPDATE_LAYERS',
  UPDATE_SCEBES: 'UPDATE_SCENES',
  UPDATE_BUILDVIDEO: 'UPDATE_BUILDVIDEO'
};

/**
 * 更新合成视频数据
 */
export const updateBuildVideo = ( buildVideo ) => ({
  type: actionTypes.UPDATE_BUILDVIDEO,
  buildVideo
});

/**
 * 更新镜头
 */
export const updateScenes = (scenes) => ({
  type: actionTypes.UPDATE_SCEBES,
  scenes
});

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
export const addLayers = (layers) => ({
  type: actionTypes.ADD_LAYERS,
  layers
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
      scenes: resp.config.scenes || [],
      layers: resp.config.layers || [],
      workId: resp.id,
      workName: resp.name
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
export const createScene = ({ id, mtype, materialId, workId, currFrame, order }) => ({
  type: actionTypes.CREATE_SCENE,
  id,
  mtype,
  materialId,
  workId,
  currFrame,
  order
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
 * 设置镜头当前帧
 */
export const setCurrFrameByScene = ({ sceneId, currFrame }) => ({
  type: actionTypes.SET_CURRFRAME,
  sceneId,
  currFrame
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

/**
 * 创建ai抠像
 * @param option { Object }
 * option.materialId { Number } 素材id
 * option.sceneId { Number } 镜头id
 * option.frame { Number } 帧
 * option.type { String } 抠像类别
 * option.svg { Array } svg集合
 */
export const createAiRoto = ({ aiRotos }) => ({
  type: actionTypes.CREATE_AI_ROTO,
  aiRotos
});

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.GET_MATERIALS:
      let { materials, scenes, layers, workId, workName } = action;
      const addScenes = [];

      return { ...state, work_id: workId, work_name: workName, materials, scenes, layers };

    case actionTypes.DELETE_MATERIAL:
      const { materialId } = action;

      return { ...state, materials: remove(state.materials, materialId, 'id') };

    case actionTypes.UPLOAD_MATERIAL:
      const { material } = action;

      return { ...state, materials: add(state.materials, material) };

    case actionTypes.CREATE_SCENE:
      const scene = { id: action.id, type: action.mtype, material_id: action.materialId, work_id: action.workId, currFrame: action.currFrame, order: action.order };

      return { ...state, scenes: asc(add(state.scenes, scene)) };

    case actionTypes.SET_CURRFRAME:
      return { ...state, scenes: update(state.scenes, { currFrame: action.currFrame }, action.sceneId, 'id') };

    case actionTypes.CREATE_ROTO:
      const diffFn = (item) => item.material_id == action.materialId && item.scene_id == action.sceneId && item.frame == action.frame;
      const hasRoto = !!getItemByKey(state.rotos, diffFn);
      const roto = { material_id: action.materialId, scene_id: action.sceneId, frame: action.frame, type: action.mtype, svg: action.svg };

      if (!hasRoto) {
        return { ...state, rotos: add(state.rotos, roto) };
      } else {
        return { ...state, rotos: update(state.rotos, { svg: roto.svg }, diffFn) };
      }

    case actionTypes.CREATE_AI_ROTO:
      return { ...state, aiRotos: add(state.aiRotos, action.aiRotos) };

    case actionTypes.SET_DURATION:
      return { ...state, materials: update(state.materials, { 'properties.time': action.duration }, action.materialId, 'id') };

    case actionTypes.CLEAR_MATERIALS:
      return { ...state, materials: [] };

    case actionTypes.ADD_LAYERS:
      return { ...state, layers: add(state.layers, action.layers) };

    case actionTypes.DELETE_LAYER:
      return { ...state, layers: remove(state.layers, action.layer.id, "id") };

    case actionTypes.UPDATE_LAYERS:
      return { ...state, layers: updateArray(state.layers, action.layers, "id") };

    case actionTypes.UPDATE_SCEBES:
      return { ...state, scenes: updateArray(state.scenes, action.scenes, "id") };
    case actionTypes.UPDATE_BUILDVIDEO: 
      return { ...state, buildVideo: action.buildVideo}

    default:
      return state;

  }
};
