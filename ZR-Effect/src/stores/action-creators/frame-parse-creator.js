export function addParseFrame (materialId, frame, frameBase64) {
  return {
    type: 'ADD_PARSE_FRAME',
    materialId,
    frame,
    frameBase64  
  };
}
