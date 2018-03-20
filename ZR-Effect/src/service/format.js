/**
 * 数据格式转换
 */

// 对fetch取的数据json化
export function parseResp (resp) {
  return resp.json();
}

// 将object转换成xx=10&oo=100形式
export function parseQs (qs) {
  let res = '?', key;

  for (key in qs) {
    res += `${ encodeURIComponent(key) }=${ encodeURIComponent(qs[ key ]) }&`
  }

  return res;
}
