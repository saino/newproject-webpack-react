/**
 * 数据验证
 * 非空('', undefined, NaN, Infinity, -Infinity)、手机格式、邮箱格式、是否全数字、最大长度、最小长度
 */

// 校验是否为空
export function isRequired (val) {
  return val === '' || val === void 0 || val !== val || val === Infinity || val === -Infinity;
}

// 校验手机格式
export function validPhone (phone) {
  return /^1(3|4|5|7|8)[0-9]{9}$/.test(phone);
}

// 校验邮箱格式
export function validEmail (email) {
  return /^[a-z0-9]+([._\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email);
}

// 校验是否全数字
export function validNumeric (val) {
  return /^[0-9]*?$/.test(val);
}

// 校验最大长度
export function validMaxLength (val, max) {
  return String(val).length <= max;
}

// 校验最小长度
export function validMinLength (val, min) {
  return String(val).length >= min;
}
