import { post, error as fail } from '../../api/fetch';

export function selectedRotoMaterial (materialId) {
  return {
    type: 'SELECTED_ROTO_MATTERIAL',
    materialId
  };
}

export function cancelSelectedRotoMaterial () {
  return {
    type: 'CANCEL_SELECTED_ROTO_MATTERIAL'
  };
}

export function addRotoMaterial (materialId, materialName) {
  return {
    type: 'ADD_ROTO_MATERIAL',
    materialId,
    materialName
  };
}

export function removeRotoMaterial (materialId) {
  return {
    type: 'REMOVE_ROTO_MATERIAL',
    materialId
  };
}

export function selectedFrame (materialId, frame) {
  return {
    type: 'SELECTED_FRAME',
    materialId,
    frame
  };
}

export function configureIsValidFrameError (materialId, isValid) {
  return {
    type: 'CONFIGURE_IS_VALID_FRAME_ERROR',
    materialId,
    isValid
  };
}

export function configureIsPlay (materialId, isPlay) {
  return {
    type: 'CONFIGURE_IS_PLAY',
    materialId,
    isPlay
  };
}

export function saveRoto (materialId, frames) {
  return dispatch => {
    post('/roto/saveRoto', {
      material_id: materialId,
      config: { frames }
    }).then(resp => dispatch({
      type: 'SAVE_ROTO',
      materialId,
      aiId: resp
    })).catch(fail);
  };
}

export function aiRoto (materialId, aiId, isAiRoto) {
  return dispatch => {
    post('/roto/aiRoto', { id: aiId })
      .then(resp => dispatch({
        type: 'AI_ROTO',
        isAiRoto,
        materialId
      }))
      .catch(fail);
  };
}

export function updateRotoIsAiRoto (materialId, isAiRoto) {
  return {
    type: 'UPDATE_ROTO_IS_AI_ROTO',
    materialId,
    isAiRoto
  };
}

export function configureAiRotoPercent (materialId, aiId) {
  return dispatch => {
    post('/getProgress', { type: 'roto', object_id: aiId })
      .then(resp => {
        const { progress, complete } = resp;

        if (!complete) {
          dispatch({
            type: 'AI_ROTO_PERCENT',
            materialId,
            percent: parseFloat(progress)
          });
        } else {
          dispatch({
            type: 'AI_ROTO_COMPLETE',
            materialId,
            percent: parseFloat(progress)
          })
        }

      })
      .catch(fail);
  };
}

export function configureCloseAiRoto (materialId) {
  return {
    type: 'CONFIGURE_CLOSE_AI_ROTO',
    materialId
  };
}

export function geRoto (materialId, aiId) {
  return dispatch => {
    post('/roto/finishRoto', { id: aiId })
      .then(resp => dispatch({
        type: 'GE_ROTO',
        materialId
      }))
      .catch(fail);
  };
}

export function updateRotoIsGeRoto (materialId, isGeRoto) {
  return {
    type: 'UPDATE_ROTO_IS_GE_ROTO',
    materialId,
    isGeRoto,
    isDableBtn: !isGeRoto
  };
}

export function configureCloseGenerateRotoMaterial (materialId) {
  return {
    type: 'CONFIGURE_CLOSE_GENERATE_ROTO_MATERIAL',
    materialId
  };
}

export function configureGenerateRotoMaterialPercent (materialId, generateRotoMaterialPercent) {
  return {
    type: 'CONFIGURE_GENERATE_ROTO_MATERIAL_PERCENT',
    materialId,
    generateRotoMaterialPercent
  };
}

export function configureStartupGeneratePNGFrame (materialId) {
  return {
    type: 'CONFIGURE_STARTUP_GENERATE_PNG_FRAME',
    materialId
  };
}

export function configureCloseGeneratePNGFrame (materialId) {
  return {
    type: 'CONFIGURE_CLOSE_GENERATE_PNG_FRAME',
    materialId
  };
}

export function configureGeneratePNGFramePercent (materialId, generatePNGFramePercent) {
  return {
    type: 'CONFIGURE_GENERATE_PNG_FRAME_PERCENT',
    materialId,
    generatePNGFramePercent
  };
}

export function addRotoedFrame (materialId, frame) {
  return {
    type: 'ADD_ROTOED_FRAME',
    materialId,
    frame
  };
}

export function removeRotoedFrame (materialId, frame) {
  return {
    type: 'REMOVE_ROTOED_FRAME',
    materialId,
    frame
  };
}

export function configureRotoToolType (materialId, rotoToolType) {
  return {
    type: 'CONFIGURE_ROTO_TOOL_TYPE',
    materialId,
    rotoToolType
  };
}

export function configureRotoVisibleMask (materialId, isVisibleMask) {
  return {
    type: 'CONFIGURE_ROTO_VISIBLE_MASK',
    materialId,
    isVisibleMask
  };
}

export function configureZoom (materialId, zoomType, undoAction) {
  return {
    type: 'CONFIGURE_ZOOM',
    materialId,
    zoomType,
    undoAction
  };
}

export function configureMove (materialId, moveValue) {
  return {
    type: 'CONFIGURE_MOVE',
    materialId,
    moveValue
  };
}

export function undo (materialId) {
  return {
    type: 'UNDO',
    materialId
  };
}
