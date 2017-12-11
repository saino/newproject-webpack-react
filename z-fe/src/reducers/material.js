import { add, update, remove } from '../utils/stateSet';
import packageToken from '../utils/packageToken';
import { post } from '../fetch/fetch';
import { logout } from './user';

/*
  item.materialId Number 素材id,
  item.src String 素材上传后服务端地址,
  item.thumb String 素材缩略图地址,
  item.title String 素材名称,
  item.type Number 素材类别  -- 0: 视频, 1: 图片
  item.totalFrame Number 总帧数
  item.duration Number 总时长
  item.frameRate Number 帧率 前端自己设置，无需服务端返回
*/
const defState = {
  page: {
    current: 1,
    pageSize: 0,
    total: 0
  },
  materials: []
};

const actionTypes = {
  LIST_MATERIAL: 'LIST_MATERIAL',
  NEW_MATERIAL: 'NEW_MATERIAL',
  DELETE_MATERIAL: 'DELETE_MATERIAL',
  SET_FRAME_RATE: 'SET_FRAME_RATE',
  SET_DURATION: 'SET_DURATION'
};

export const list = packageToken((dispatch, { token, current, pageSize }) => {
  post('/materials', { token, current, pageSize }, resp => {
    const { page, materials } = resp;

    dispatch({
      type: actionTypes.LIST_MATERIAL,
      materials,
      page
    })
  });
}, logout);

export const deleteMaterial = packageToken((dispatch, { token, materialId }) => {
  post('/deleteMaterial', { token, materialId }, resp => {
    const { materialId } = resp;

    dispatch({
      type: actionTypes.DELETE_MATERIAL,
      materialId
    });
  });
}, logout);

export const setDuration = (materialId, duration) => ({
  type: actionTypes.SET_DURATION,
  materialId,
  duration
});

export default (state = defState, action) => {
  switch (action.type) {
    case actionTypes.LIST_MATERIAL:
      const { materials, page } = action;

      return { ...state, materials, page };

    case actionTypes.DELETE_MATERIAL:
      const { materialId } = action;

      return { ...state, works: remove(state.materials, materialId, 'materialId') };

    case actionTypes.SET_DURATION:
      return update(state, { duration: action.duration }, action.materialId, 'materialId')

    default:
      return state;

  }
};
