/**
 * reducer中数组的增删改查
 */

const uniq = (arr: Array, obj: Object) =>
  arr.filter((item, idx) => !idx || arr.indexOf(obj) === idx);
const inArray = (arr: Array, item) =>
  arr.find(item) != null;

// 添加元素，避免重复
export const add = (target: Array, origin) => {
  if (!target || origin == null)
    return target;

  if (inArray(target, origin))
    return target;

  return [ ...target, origin ];
};

export const update = (target: Array, idKey = 'id', idValue, origin: Object) => {
  let waitUpdate, waitUpdateIndex;

  if (!target || origin == null)
    return target;

  waitUpdateIndex = target.findIndex(item => item[ idKey ] == idValue);

  if (waitUpdateIndex < 0)
    return target;

  waitUpdate = target[waitUpdateIndex];
  target.splice(waitUpdateIndex, 1, { ...waitUpdate, ...origin });

  return [ ...target ];
};

export const remove = (target: Array, idKey = 'id', idValue) => {
  let waitUpdateIndex;

  if (!target)
    return target;

  waitUpdateIndex = target.findIndex(item => item[ idKey ] == idValue);

  if (waitUpdateIndex < 0)
    return target;

  target.splice(waitUpdateIndex, 1);

  return [ ...target ];
};
