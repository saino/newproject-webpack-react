/**
 * 扣像交互数据
 */

const defState = [
  {
    // 扣像id
    'id': 0,
    // 素材id
    'material_id': 0,
    // 是否选中 [存入数据库]
    'is_checked': false,
    // 选中的frame
    'checked_frame': 0,
    // 是否开始ai扣像
    'is_ai_roto': false,
    // ai扣像进度 [存入数据库]
    'ai_roto_percent': 0,
    // 是否开始生成扣像素材
    'is_generate_roto_material': false,
    // 生成扣像素材进度 [存入数据库]
    'generate_roto_material_percent': 0,
    // 已经本地扣像的帧集合 [存入数据库]
    'rotoed_frames': [],
    // 扣像工具类别
    'roto_tool_type': 0, // 0-钢笔工具(画线状态)｜1-切换成编辑状态｜2-移动｜3-增加节点｜4-显示遮罩｜5-完成
    // 扣像舞台类别
    'roto_stage_type': 0, // 0-撤销｜1-移动｜2-放大｜3-缩小
  }
];
