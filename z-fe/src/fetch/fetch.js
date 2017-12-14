import { message } from 'antd';
import config from '../config';

function checkErrorCodeStatus (resp: Object) {
  if (resp.errorCode == 0)
    return resp;

   throw new Error(resp.errorMessage);
}

function parseResp (resp: Object) {
  return resp.json();
}

function parseQs (qs) {
  let res = '?', key;

  for (key in qs) {
    res += `${ encodeURIComponent(key) }=${ encodeURIComponent(qs[ key ]) }&`
  }

  return res;
}

const fetchConfig = {
  headers: { 
    'Content-Type': 'application/json'
  }
};
const request = (path: String, method: String, body: Object) => {
  const isPost = method.toLowerCase() === 'post';
  const token = body.token;
  fetchConfig.headers.Token = token;
  delete body.token;

  return fetch(
    `${ path }${ isPost ? '' : parseQs(body) }`,
    {...fetchConfig, method, body: isPost ? JSON.stringify(body) : void 0 }
  )
  .then(parseResp)
  .then(checkErrorCodeStatus);
};

export function get (path: String, qs = {}, success: Function, fail: Function) {
  return request(path, 'GET', qs)
   .then(resp => success(resp.data))
   .catch(error => {
     message.error(error.message);
     fail && fail(error.message);
   });
};

export function post (path: String, body = {}, success: Function, fail: Function) {
  return request(path, 'POST', body)
   .then(resp => success(resp.data))
   .catch(error => {
     console.log(error, 'ggggg'); 
     message.error(error.message);
     fail && fail(error.message);
   });
};
