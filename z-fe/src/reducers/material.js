import { add } from '../utils/stateSet';
import packageToken from '../utils/packageToken';
import { post } from '../fetch/fetch';
import { logout } from './user';

/*
  item.materialId Number 素材id,
  item.src String 素材上传后服务端地址,
  item.thumb String 素材缩略图地址,
  item.title String 素材名称,
  item.type Number 素材类别  -- 0: 视频, 1: 图片
*/
const defState = [{
  materialId: 1,
  src: 'http://localhost:7878/test.mp4',
  thumb: '',
  title: '素材是视频，素材是视频',
  type: 0,
  totalFrame: 200
}];

const actionTypes = {

  LIST_MATERIAL: 'LIST_MATERIAL',

  NEW_MATERIAL: 'NEW_MATERIAL',

  REMOVE_MATERIAL: 'REMOVE_MATERIAL'

};

export const list = packageToken((dispatch, { token }) => {
  post('/materials', { token }, resp => dispatch({
    type: actionTypes.LIST_MATERIAL,
    materials: resp
  }));
}, logout);

export default (state = defState, action) => {
  switch (action.type) {

    case actionTypes.LIST_MATERIAL:
      return [ ...state, ...action.materials ];

    default:
      return state;

  }
};
