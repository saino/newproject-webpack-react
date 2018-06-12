import { post, error as fail } from '../../api/fetch';

export function addRoto (materialId, frame) {
  return {
    type: 'ADD_ROTO',
    materialId,
    frame
  };
}

export function removeRotos (materialId) {
  return {
    type: 'REMOVE_ROTOS',
    materialId
  };
}

export function getAiRotos (aiId, materialId) {
  return dispatch => {
    post('/roto/loadRoto', { id: aiId })
      .then(resp => {
        dispatch({
          type: 'GET_AI_ROTOS',
          materialId,
          aiRotos: resp.config.frames
        })
      }).catch(fail);
  };
}

export function configure (materialId, frame, options) {
  return {
    type: 'CONFIGURE',
    materialId,
    frame,
    options
  }
}

export function clear () {
  return {
    type: 'CLEAR_ROTOS'
  };
}
