/**
 * 扣像交互数据
 * state.rfa { Array }
 * state.rfa.item { Object }
 *   material_id { Number } 素材id
 *   is_selected { Boolean } 是否选中 [ 存入数据库 ]
 *   selected_frame { Number } 选中帧
 *   is_ai_roto { Boolean } 是否开始ai扣像 [ 存入数据库 ]
 *   ai_roto_percent { Number } ai扣像进度 [ 存入数据库 ]
 *   is_generate_roto_material { Boolean } 是否开始生成扣像素材 [ 存入数据库 ]
 *   generate_roto_material_percent { Number } 生成扣像素材进度 [ 存入数据库 ]
 *   is_generate_png_frame { Boolean } 是否开始生成png序列帧 [ 存入数据库 ]
 *   generate_png_frame_percent { Number } 生成png序列帧进度 [ 存入数据库 ]
 *   rotoed_frames { Array } 已经本地扣像的帧集合 [ 存入数据库 ]
 *   roto_tool_type { Number } 扣像工具类别 ( 0-钢笔工具(画线状态)｜1-切换成编辑状态｜2-移动｜3-增加节点｜4-显示遮罩｜5-完成 )
 *   roto_stage_tool_type { Number } 扣像舞台工具类别 ( 0-撤销｜1-移动｜2-放大｜3-缩小 )
 */

import { add, update, remove, findItem } from '../../utils/array-handle';

const defState = [];

export default function rotoFrontendActerActive (state = defState, action) {
  switch (action.type) {
    case 'SELECTED_ROTO_MATTERIAL':
      return update(state, { 'is_selected': true }, 'material_id', action.materialId);

    case 'CANCEL_SELECTED_ROTO_MATTERIAL':
      return update(state, { 'is_selected': false }, 'material_id', action.materialId);

    case 'ADD_ROTO_MATERIAL':
      const initRotoMaterial = {
        'material_id': action.materialId,
        'is_selected': true,
        'selected_frame': 0,
        'is_ai_roto': false,
        'ai_roto_percent': 0,
        'is_generate_roto_material': false,
        'generate_roto_material_percent': 0,
        'is_generate_png_frame': false,
        'generate_png_frame_percent': 0,
        'rotoed_frames': [],
        'roto_tool_type': 0,
        'roto_stage_tool_type': 0
      };

      return add(state, initRotoMaterial);

    case 'REMOVE_ROTO_MATERIAL':
      return remove(state, 'material_id', action.materialId);

    case 'SELECTED_FRAME':
      return update(state, { 'selected_frame': action.frame }, 'material_id', action.materialId);

    case 'CONFIGURE_STARTUP_AI_ROTO':
      return update(
        state,
        { 'is_ai_roto': true, 'ai_roto_percent': 0 },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_CLOSE_AI_ROTO':
      return update(
        state,
        { 'is_ai_roto': false, 'ai_roto_percent': 0 },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_AI_ROTO_PERCENT':
      return update(
        state,
        { 'ai_roto_percent': action.aiRotoPercent },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_STARTUP_GENERATE_ROTO_MATERIAL':
      return update(
        state,
        { 'is_generate_roto_material': true, 'generate_roto_material_percent': 0 },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_CLOSE_GENERATE_ROTO_MATERIAL':
      return update(
        state,
        { 'is_generate_roto_material': false, 'generate_roto_material_percent': 0 },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_GENERATE_ROTO_MATERIAL_PERCENT':
      return update(
        state,
        { 'generate_roto_material_percent': action.generateRotoMaterialPercent },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_STARTUP_GENERATE_PNG_FRAME':
      return update(
        state,
        { 'is_generate_png_frame': true, generate_png_frame_percent: 0 },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_CLOSE_GENERATE_PNG_FRAME':
      return update(
        state,
        { 'is_generate_png_frame': false, generate_png_frame_percent: 0 },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_GENERATE_PNG_FRAME_PERCENT':
      return update(
        state,
        { 'generate_png_frame_percent': action.generatePNGFramePercent },
        'material_id',
        action.materialId
      );

    case 'ADD_ROTOED_FRAME':
      const { materialId, frame } = action;
      const rotoMaterial = findItem(state, 'material_id', materialId);
      const rotoedFrames = rotoMaterial[ 'rotoed_frames' ] = add(rotoMaterial[ 'rotoed_frames' ], frame);

      return update(
        state,
        { 'rotoed_frames': rotoedFrames },
        'material_id',
        materialId
      );

    case 'CONFIGURE_ROTO_TOOL_TYPE':
      return update(
        state,
        { 'roto_tool_type': action.rotoToolType },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_ROTO_STAGE_TOOL_TYPE':
      return update(
        state,
        { 'roto_stage_tool_type': action.rotoStageToolType },
        'material_id',
        action.materialId
      );
  }
}
