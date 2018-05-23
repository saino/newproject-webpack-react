/**
 * 扣像交互数据
 * state.rfa { Array }
 * state.rfa.item { Object }
 *   material_id { Number } 素材id
 *   is_valid_frame_error { Boolean } 是否验证输入帧合法
 *   is_selected { Boolean } 是否选中 [ 存入数据库 ]
 *   is_play { Boolean } 是否正在播放
 *   is_parse_frame { Boolean } 是否开始解帧进度操作
 *   selected_frame { Number } 选中帧
 *   is_visible_mask { Boolean } 是否显示阴影
 *   is_upload_or_detail { Number } 显示上传还是详情 ( 0-详情｜1-上传 )
 *   ai_id { Number } ai抠像、生成抠像素材、生成png序列帧所需要的
 *   is_ai_roto { Boolean } 是否开始ai扣像 [ 存入数据库 ]
 *   ai_roto_percent { Number } ai扣像进度 [ 存入数据库 ]
 *   is_generate_roto_material { Boolean } 是否开始生成扣像素材 [ 存入数据库 ]
 *   generate_roto_material_percent { Number } 生成扣像素材进度 [ 存入数据库 ]
 *   rotoed_frames { Array } 已经本地扣像的帧集合 [ 存入数据库 ]
 *   roto_tool_type { Number } 扣像舞台工具类别 (
       0-撤销｜1-移动｜2-放大｜3-缩小｜4-钢笔工具｜5-切换成编辑状态｜6-移动｜7-增加节点｜8-显示遮罩｜9-完成
    )
 *   zoom { Array } 放大缩小
 *   move { Array } 移动
 *   undo_actions { Array } 撤销操作
 *   undo_count { Number } 撤销次数
 */

import { add, update, remove, findItem, findIndex } from '../../utils/array-handle';

const defState = [];

export default function rotoFrontendActerActive (state = defState, action) {
  switch (action.type) {
    case 'SELECTED_ROTO_MATTERIAL':
      return update(state, { 'is_selected': true }, 'material_id', action.materialId);

    case 'CANCEL_SELECTED_ROTO_MATTERIAL':
      return state.map(item => ({ ...item, 'is_selected': false }));

    case 'ADD_ROTO_MATERIAL':
      const initRotoMaterial = {
        'material_id': action.materialId,
        'material_name': action.materialName,
        'is_selected': false,
        'selected_frame': 0,
        'is_valid_frame_error': true,
        'is_play': false,
        'is_upload_or_detail': 0,
        'ai_id': 0,
        'is_ai_roto': false,
        'ai_roto_percent': void 0,
        'is_generate_roto_material': false,
        'is_disabled_roto_material_btn': true,
        'generate_roto_material_percent': void 0,
        'is_generate_png_frame': false,
        'generate_png_frame_percent': void 0,
        'rotoed_frames': [],
        'roto_tool_type': 4,
        'zoom': 1,
        'move': { x: 0, y: 0 },
        'undo_actions': [],
        'undo_count': 0
      };

      return add(state, initRotoMaterial);

    case 'REMOVE_ROTO_MATERIAL':
      return remove(state, 'material_id', action.materialId);

    case 'PARSE_FRAME_PERCENT':
      return update(
        state,
        { 'parse_frame_percent': action.percent },
        'material_id',
        action.materialId
      );

    case 'SELECTED_FRAME':
      return update(
        state,
        { 'selected_frame': action.frame },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_IS_VALID_FRAME_ERROR':
      return update(
        state,
        { 'is_valid_frame_error': action.isValid },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_IS_PLAY':
      return update(
        state,
        { 'is_play': action.isPlay },
        'material_id',
        action.materialId
      );

    case 'SAVE_ROTO':
      return update(
        state,
        { 'ai_id': action.aiId },
        'material_id',
        action.materialId
      );

    case 'AI_ROTO':
      return update(
        state,
        { 'is_ai_roto': action.isAiRoto },
        'material_id',
        action.materialId
      );

    case 'AI_ROTO_PERCENT':
      return update(
        state,
        {
          'is_ai_roto': true,
          'ai_roto_percent': action.percent
        },
        'material_id',
        action.materialId
      );

    case 'AI_ROTO_COMPLETE':
      return update(
        state,
        {
          'is_ai_roto': false,
          'ai_roto_percent': action.percent
        },
        'material_id',
        action.materialId
      );

    case 'GE_ROTO':
      return update(
        state,
        {
          'is_generate_roto_material': false,
          'is_disabled_roto_material_btn': true
        },
        'material_id',
        action.materialId
      );

    case 'UPDATE_ROTO_IS_GE_ROTO':
      return update(
        state,
        {
          'is_generate_roto_material': action.isGeRoto,
          'is_disabled_roto_material_btn': action.isDableBtn
        },
        'material_id',
        action.materialId
      );

    case 'UPDATE_ROTO_IS_AI_ROTO':
      return update(
        state,
        { 'is_ai_roto': action.isAiRoto },
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

    case 'REMOVE_ROTOED_FRAME':
      const rrMaterial = findItem(state, 'material_id', action.materialId);
      const rotoedFramesRemovedIndex = findIndex(rrMaterial[ 'rotoed_frames' ], fra => fra === frame);
      let rotoedFramesRemoved;

      rrMaterial[ 'rotoed_frames' ].splice(rotoedFramesRemovedIndex, 1);
      rotoedFramesRemoved = [ ...rrMaterial[ 'rotoed_frames' ] ];

      return update(
        state,
        { 'rotoed_frames': rotoedFramesRemoved },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_ROTO_TOOL_TYPE':
      return update(
        state,
        {
          'roto_tool_type': action.rotoToolType,
          'undo_count': 0
        },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_ROTO_VISIBLE_MASK':
      return update(
        state,
        { 'is_visible_mask': action.isVisibleMask },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_ZOOM':
      const { zoomType, undoAction } = action;
      const rMaterial = findItem(state, 'material_id', action.materialId);
      let zoomValue = rMaterial[ 'zoom' ] + (zoomType == 2 ? 0.25 : -0.25);
      let undoActions = [ ...rMaterial[ 'undo_actions' ], `${ undoAction }|${ zoomValue }`];

      zoomValue = zoomValue < 0.25 ? 0.25 : zoomValue;

      return update(
        state,
        {
          'zoom': zoomValue,
          'undo_actions': undoActions,
          'roto_tool_type': zoomType,
          'undo_count': 0
        },
        'material_id',
        action.materialId
      );

    case 'CONFIGURE_MOVE':
      const { moveValue } = action;
      const { x, y } = moveValue;
      const rotMaterial = findItem(state, 'material_id', action.materialId);
      let nodoActions = [ ...rotMaterial[ 'undo_actions' ], `move|${ x }|${ y }`];

      return update(
        state,
        {
          'move': moveValue,
          'undo_actions': nodoActions
        },
        'material_id',
        action.materialId
      );

    case 'UNDO':
      const roMaterial = findItem(state, 'material_id', action.materialId);
      const noActions = roMaterial[ 'undo_actions' ];
      let undoCount = roMaterial[ 'undo_count' ];

      noActions.pop();

      let prevAction = noActions.slice(-1)[0];

      prevAction || (prevAction = '');

      const [ na, value, value2 ] = prevAction.split(/\|/g);
      let updateObj = {};

      if (na.indexOf('zoom') >= 0) {
        updateObj[ 'zoom' ] = +value;
      }
      else if (na.indexOf('move') >= 0) {
        updateObj[ 'move' ] = {
          x: +value,
          y: +value2
        };
      }

      undoCount++;

      return update(
        state,
        {
          ...updateObj,
          'undo_actions': [ ...noActions ],
          'undo_count': undoCount,
          'roto_tool_type': 0
        },
        'material_id',
        action.materialId
      );

    default:
      return state;
  }
}
