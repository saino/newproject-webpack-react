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

export const desc = (arr, idKey = 'id') =>
  arr.sort((prev, next) => next[ idKey ] - prev[ idKey ]);

// 添加元素，避免重复
export const add = (target: Array, origin) => {
  if (!target || origin == null)
    return target;

  Array.isArray(origin) || (origin = [ origin ]);
  origin = origin.filter(item => !inArray(target, item));

  return [ ...origin, ...target ];
};

export const updateArray = (target: Array, origin, idKey = "id") => {
  if(!target || origin == null){
    return target;
  }

  Array.isArray(origin) || (origin = [ origin ]);
  const notUpdateList = target.filter(targetItem => {
    return origin.every(originItem => originItem[idKey]!==targetItem[idKey]);
  });
  return [...notUpdateList, ...origin];
}

export const update = (target: Array, origin: Object, idValue, idKey = 'id') => {
  let waitUpdate, waitUpdateIndex, processer, newOrigin, keys, prevKey, key, value, slices;

  if (!target || origin == null)
    return target;

  processer = typeof idValue === 'function' ?
    item => idValue(item) :
    item => item[ idKey ] == idValue;

  waitUpdateIndex = target.findIndex(processer);

  if (waitUpdateIndex < 0)
    return target;

  waitUpdate = target[ waitUpdateIndex ];
  newOrigin = {};
  keys = Object.keys(origin)[0].split('.');
  value = origin[ keys.join('.') ];
  slices = keys.slice(0, -1);

  for (let i = 0, len = slices.length; i < len; i++) {
    key = keys[ i ];

    if (prevKey) {
      newOrigin[ prevKey ][ key ] = waitUpdate[ prevKey ][ key ];
    } else {
      newOrigin[ key ] = waitUpdate[ key ];
    }

    prevKey = key;
  }

  key = keys[ keys.length - 1 ];

  if (prevKey) {
    newOrigin[ prevKey ][ key ] = value;
  } else {
    newOrigin[ key ] = value;
  }

  target.splice(waitUpdateIndex, 1, { ...waitUpdate, ...newOrigin });

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
