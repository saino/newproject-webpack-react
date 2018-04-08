export function uploadMaterial (material) {
  return {
    type: 'UPLOAD_MATERIAL',
    material
  }
}

export function changeMaterial (materialItems) {
  return {
      type: 'CHANGE_MATERIAL',
      materialItems
  };
};
