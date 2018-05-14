import { add } from '../../utils/array-handle';

const defState = [];

export default function rotoMaterialTemp (state = defState, action) {
  switch (action.type) {
    case 'ADD_MATERIALS_TEMP':
      return add(state, action.material);

    default:
      return state;
  }
}
