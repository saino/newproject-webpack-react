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
  SET_FRAME_RATE: 'SET_FRAME_RATE',
  SET_DURATION: 'SET_DURATION'
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

export const setDuration = (materialId, duration) => ({
  type: actionTypes.SET_DURATION,
  materialId,
  duration
});

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.GET_MATERIALS:
      const { materials, page } = action;

      return { ...state, materials, page };

    case actionTypes.DELETE_MATERIAL:
      const { workId, id } = action;

      return { ...state, materials: remove(state.materials, (item) => item.work_id === workId && item.id === id ) };

    case actionTypes.UPLOAD_MATERIAL:
      const { material } = action;

      return { ...state, materials: add(state.materials, material) };

    case actionTypes.SET_DURATION:
      return update(state, { duration: action.duration }, action.materialId, 'materialId')

    default:
      return state;

  }
};
