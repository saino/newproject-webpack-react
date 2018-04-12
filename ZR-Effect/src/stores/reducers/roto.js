/**
 * 扣像数据
 * state.roto { Array }
 * state.roto.item { Object }
 *  material_id { Number } 素材id
 *  frame { Number } 帧
 *  mode { Number } 操作模式 0-钢笔工具(画线) | 1-编辑工具
 *  draw_mode { Number } 画线模式 0-未开始 | 1-未闭合 | 2-已闭合
 *  path_selected { Object } 选中的path对象
 *  dragging { Boolean } 是否是拖拽中
 *  paths { Array } path集合
 *  points { Array } point集合
 *  control_points { Array } 控制controls集合
 */

import { add, update, remove, findItem } from '../../utils/array-handle';

const defState = [];

export default function roto (state = defState, action) {
  switch (action.type) {
    case 'ADD_ROTO':
      const initRoto = {
        'material_id': action.materialId,
        'frame': action.frame,
        'mode': 0,
        'draw_mode': 0,
        'path_selected': null,
        'dragging': false,
        'paths': [],
        'focus_paths': [],
        'points': [],
        'control_points': []
      };

      return add(state, initRoto);

    case 'CONFIGURE':
      return update(
        state,
        { ...action.options },
        roto =>
          roto[ 'material_id' ] === action.materialId
            && roto[ 'frame' ] === action.frame
      );

    default:
      return state;
  }
}
