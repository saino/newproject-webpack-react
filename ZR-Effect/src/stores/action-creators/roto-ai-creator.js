import { post, error as fail } from '../../api/fetch';

export function getAiRotos (aiId, materialId) {
  return dispatch => {
    post('/roto/loadRoto', { id: aiId })
      .then(resp => {
        dispatch({
          type: 'GET_AI_ROTOS',
          materialId,
          aiRotos: resp.config.frames
        });
        // dispatch({
        //   type: "SAVE_ROTO",
        //   materialId,
        //   aiId
        // });
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

export function clear () {
  return {
    type: 'CLEAR_AI_ROTOS'
  };
}
