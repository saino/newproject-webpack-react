import { set, get } from '../../utils/configure-auth';
import { add } from '../../utils/array-handle';

const defState = get('base64') || [];

export default function frameParse (state = defState, action) {
  switch (action.type) {
    case 'ADD_PARSE_FRAME':
      const { materialId, frame, frameBase64 } = action;
      const res = add(state, {
        'material_id': materialId,
        frame,
        'frame_base64': frameBase64
      });

      // 添加图片解帧base
      set('base64', res);

      return res;

    default:
      return state;
  }
}
