export function addRoto (materialId, frame) {
  return {
    type: 'ADD_ROTO',
    materialId,
    frame
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
