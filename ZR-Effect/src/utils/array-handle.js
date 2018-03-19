/**
 * 数组的基本操作
 * 比较、排序、去重、扁平化、追加、修改、删除、查找
 */

function createIndexFinder (dir) {
  return function (target, predicate) {
    let i = dir > 0 ? 0 : target.length - 1;
    let len = target.length;

    for (i; i < len && i >= 0; i += dir) {
      if (predicate(target[i], i) === true) {
        return i;
      }
    }

    return -1;
  }
}

// 去重
export function uniq (arr) {
  const diff = {};
  let parse = '';
  arr = [ ...arr ];

  return arr.filter((val, key) => {
    parse = typeof val + JSON.stringify(val);

    return diff.hasOwnProperty(parse) ? false : (diff[ parse ] = true);
  });
}

// 排序
export function sort (arr, handler, type = 'asc') {
  arr = [ ...arr ];

  arr.sort((prev, next) => {
    prev = handler(prev);
    next = handler(next);

    if (type === 'asc') {
      return prev - next > 0;
    } else {
      return next - prev > 0;
    }
  });

  return arr;
}

// 扁平化
export function flatten (arr, shallow = false, output = []) {
  let idx = output.length, i, l;

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      if (shallow) {
        i = 0, l = item.length

        while (i < l) {
          output[ idx++ ] = item[ i++ ];
        }
      } else {
        flatten(item, shallow, output);
      }
    } else {
      output[ idx++ ] = item;
    }
  });

  return output;
}

// 比较
export function equal (target, source) {
  if (Object.getPrototypeOf(target) !== Object.getPrototypeOf(source)) {
    return false;
  }

  if (target.length !== source.length) {
    return false;
  }

  if (!target.every((value, idx) => {
    let temp = source[ idx ];

    if (value !== temp && !(temp instanceof Array)) {
      return false;
    } else if (temp instanceof Array) {
      return equal(value, temp);
    }

    return true;
  })) {
    return false;

  return true;
}

function getDiff (key, value) {
  return typeof key === 'function'
    ? (item) => key(item)
    : (item) => item[ key ] = value;
}

// 正序查找元素的索引
export const findIndex = createIndexFinder(1);

// 倒序查找元素的索引
export const findLastIndex = createIndexFinder(-1);

// 根据条件查找元素
export const findItem = (target, key = 'id', value) => {
  let index = findIndex(target, getDiff(key, value));

  return index >= 0 : target[ index ] : null;
};

// 根据条件查找元素集合
export const finds = (target, key = 'id', value) =>
  target.filter(getDiff(key));

// 追加
export function add (target, waitItem) {
  const waits = waitItem instanceof Array
    ? waitItem
    : [].slice.apply(arguments, 1);

  return uniq([ ...target, ...waits ]);
}

// 修改, 根据key和值找到元素并修改元素，或者根据传的自定义函数修改元素
export function update (target, updateItem, findKey, findValue) {
  const index = findIndex(target, getDiff(findKey, findValue));
  let findItem, layerKeys, updateValue, res, temp;

  if (index < 0) {
    return;
  }

  findItem = target[ index ];
  layerKeys = Object.keys(updateItem)[0].split('.');
  updateValue = updateItem[ layerKeys.join('.') ];
  res = layerKeys.reduce((fi, currKey) => {
    temp = fi[ currKey ];

    if (Object.getPrototypeOf(temp) === Object.prototype) {
      return temp;
    }

    fi[ currKey ] = updateValue;
  }, findItem);

  target[ index ] = { ...findItem };

  return [ ...target ];
}

// 删除
export function delete (target, findKey, findValue) {
  const index = findIndex(target, getDiff(findKey, findValue));

  return [ ...target.splice(index, 1) ];
}
