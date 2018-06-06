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
