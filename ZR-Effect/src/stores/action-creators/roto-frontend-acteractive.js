import { post, error as fail } from '../../api/fetch';

export function selectedRotoMatterial (materialId) {
  return {
    type: 'SELECTED_ROTO_MATTERIAL',
    materialId
  };
}

export function cancelSelectedRotoMatterial (materialId) {
  return {
    type: 'CANCEL_SELECTED_ROTO_MATTERIAL',
    materialId
  };
}

export function addRotoMaterial (materialId) {
  return {
    type: 'ADD_ROTO_MATERIAL',
    materialId
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
    type: 'SELECTED_FRAME':
    materialId,
    frame
  };
}

export function configureStartupAiRoto (materialId) {
  return {
    type: 'CONFIGURE_STARTUP_AI_ROTO',
    materialId
  };
}

export function configureCloseAiRoto (materialId) {
  return {
    type: 'CONFIGURE_CLOSE_AI_ROTO',
    materialId
  };
}

export function configureAiRotoPercent (materialId, aiRotoPercent) {
  return {
    type: 'CONFIGURE_AI_ROTO_PERCENT',
    materialId,
    aiRotoPercent
  };
}

export function configureStartupGenerateRotoMaterial (materialId) {
  return {
    type: 'CONFIGURE_STARTUP_GENERATE_ROTO_MATERIAL',
    materialId
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

export function configureRotoToolType (materialId, rotoToolType) {
  return {
    type: 'CONFIGURE_ROTO_TOOL_TYPE',
    materialId,
    rotoToolType
  };
}

export function configureRotoStageToolType (materialId, rotoStageToolType) {
  return {
    type: 'CONFIGURE_ROTO_STAGE_TOOL_TYPE',
    materialId,
    rotoStageToolType
  };
}
