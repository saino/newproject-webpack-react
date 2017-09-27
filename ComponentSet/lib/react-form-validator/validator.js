const catchRuleValueRE = /(?:\:)([^\s\t\r\:\|]+)/g;

const customRuleREMap = {

  required: value =>
    /^[^\s\t\r]+$/.test(value),

  max: (value, limit) =>
    new RegExp('^[^\s\t\r]{'+ limit +',}$').test(value),

  min: (value, limit) =>
    new RegExp('^[^\s\t\r]{0,'+ limit +'}$').test(value),

  email: value =>
    /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value),

  phone: value =>
    /^1[358]\d{9}$/.test(value)

};

function bedeckRuleMap (arr) {
  const ret = {};
  let method, params;

  arr.forEach(name => {
    params = name.match(catchRuleValueRE) || [];

    if (params.length) {
      name = name.slice(0, name.indexOf(params.join('')));
      params = params.map(param => param.replace(':', ''));
    }

    method = customRuleREMap[name];

    ret[ name ] = (value) => {
      return method.apply(null, [ value, ...params]);
    };
  });

  return ret;
};

/**
 *
 */
export default (value, rules) => {
  const parseRuleMap = bedeckRuleMap(rules),
        errorRules = Object.keys(parseRuleMap).filter(key => !parseRuleMap[ key ](value));

  return !res.length ? false : errorRules;
};
