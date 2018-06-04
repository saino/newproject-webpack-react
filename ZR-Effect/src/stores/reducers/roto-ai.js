import { finds, remove } from '../../utils/array-handle';

const defState = [];

export default function rotoAi (state = defState, action) {
  switch (action.type) {
    case 'GET_AI_ROTOS':
      return finds(action.aiRotos, 'type', 'ai')
        .map(aiRoto => ({ ...aiRoto, 'material_id': action.materialId }));

    case 'REMOVE_AI_ROTO':
      return remove(state, item => item[ 'material_id' ] === action.materialId && item[ 'frame' ] === action.frame);

    case 'CLEAR_AI_ROTOS':
      return [];

    default:
      return state;
  }
}
