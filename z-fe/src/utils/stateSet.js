/**
 * reducer中数组的增删改查
 */

const uniq = (arr: Array, obj: Object) =>
  arr.filter((item, idx) => !idx || arr.indexOf(obj) === idx);
const inArray = (arr: Array, item) =>
  arr.find(item) != null;

// 添加元素，避免重复
export const add = (target: Object, key: String, origin) => {
  const arr = target[ key ];

  if (!arr || origin == null)
    return target;

  if (inArray(arr, origin))
    return target;

  return { ...target, [ key ]: [ ...arr, origin ] };
};

export const update = (target: Object, key: String, idKey = 'id', idValue, origin: Object) => {
  let arr = tarObj[key], waitUpdate, waitUpdateIndex;

  if (!arr || origin == null)
    return target;

  waitUpdateIndex = arr.findIndex(item => item[ idKey ] == idValue);

  if (waitUpdateIndex < 0)
    return target;

  waitupdate = arr[waitUpdateIndex];
  arr.splice(waitUpdateIndex, 1, { ...waitupdate, ...origin });

  return { ...target, [ key ]: [ ...arr ] };
};

export const remove = (target: Object, key: String, idKey = 'id', idValue) => {
  let arr = tarObj[key], waitUpdateIndex;

  if (!arr)
    return target;

  waitUpdateIndex = arr.findIndex(item => item[ idKey ] == idValue);

  if (waitUpdateIndex < 0)
    return target;

  arr.splice(waitUpdateIndex, 1);

  return { ...target, [ key ]: [ ...arr ] };
};
