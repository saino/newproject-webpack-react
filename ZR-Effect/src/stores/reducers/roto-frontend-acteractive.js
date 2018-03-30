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

import { add, update, remove } from '../../utils/array-handle';

const defState = [];
