import { post, error as fail } from '../../api/fetch';

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

export function removeAiRoto (materialId, frame) {
  return {
    type: 'REMOVE_AI_ROTO',
    materialId,
    frame
  };
}
