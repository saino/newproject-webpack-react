/**
 * 数组的增删改查
 */

const uniq = (arr: Array, obj: Object) =>
  arr.filter((item, idx) => !idx || arr.indexOf(obj) === idx);
const inArray = (arr: Array, item) =>
  arr.indexOf(item) >= 0;

export const getItemByKey = (target: Array, idValue, idKey = 'id') =>
  [ ...finds(target, idValue, idKey) ].pop();

export const finds = (target: Array, idValue, idKey = 'id') => {
  let processer = typeof idValue === 'function'
    ? item => idValue(item)
    : item => item[ idKey ] == idValue;

  return target.filter(processer);
};

// 添加元素，避免重复
export const add = (target: Array, origin) => {
  if (!target || origin == null)
    return target;

  Array.isArray(origin) || (origin = [ origin ]);
  origin = origin.filter(item => !inArray(target, item));

  return [ ...origin, ...target ];
};

export const update = (target: Array, origin: Object, idValue, idKey = 'id') => {
  let waitUpdate, waitUpdateIndex, processer;

  if (!target || origin == null)
    return target;

  processer = typeof idValue === 'function' ?
    item => idValue(item) :
    item => item[ idKey ] == idValue;

  waitUpdateIndex = target.findIndex(processer);

  if (waitUpdateIndex < 0)
    return target;

  waitUpdate = target[waitUpdateIndex];
  target.splice(waitUpdateIndex, 1, { ...waitUpdate, ...origin });

  return [ ...target ];
};

export const remove = (target: Array, idValue, idKey = 'id') => {
  let waitUpdateIndex, processer;

  if (!target)
    return target;

  processer = typeof idValue === 'function' ?
    item => idValue(item) :
    item => item[ idKey ] == idValue;

  waitUpdateIndex = target.findIndex(processer);

  if (waitUpdateIndex < 0)
    return target;

  target.splice(waitUpdateIndex, 1);

  return [ ...target ];
};
