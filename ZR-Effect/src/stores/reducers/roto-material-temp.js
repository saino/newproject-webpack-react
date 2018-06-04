import { add } from '../../utils/array-handle';

const defState = [];

export default function rotoMaterialTemp (state = defState, action) {
  switch (action.type) {
    case 'ADD_MATERIALS_TEMP':
      return add(state, action.material);

    case 'CLEAR_ROTO_TEMP_MATERIALS':
      return [];

    default:
      return state;
  }
}
