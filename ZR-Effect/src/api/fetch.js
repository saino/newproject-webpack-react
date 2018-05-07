import { message } from 'antd';
import config from '../config';
import { parseResp, parseQs } from '../service/format';

const fetchHeadersConfig = { ...config.api.headers };

function checkErrorCodeStatus (resp) {
  if (resp.errorCode == 0)
    return resp;

   throw new Error(resp.errorMessage);
}

const request = (path, method, body) => {
  const isPost = method.toLowerCase() === 'post';
  const token = body.token;
  fetchHeadersConfig.Token = token;
  delete body.token;

  return fetch(
    `${ config.api.host }:${ config.api.port }${ config.api.path }${ path }${ isPost ? '' : parseQs(body) }`,
    //`${ config.api.path }${ path }${ isPost ? '' : parseQs(body) }`,
    { ...fetchHeadersConfig, credentials: 'include', method, body: isPost ? JSON.stringify(body) : void 0 }
  )
  .then(parseResp)
  .then(checkErrorCodeStatus);
};

export function get (path, qs = {}) {
  return request(path, 'GET', qs)
   .then(resp => resp[ 'data' ]);
};

export function post (path, body = {}) {
  return request(path, 'POST', body)
   .then(resp => resp[ 'data' ]);
};

export function error (messageText, errorFunc) {
  message.error(messageText)
  errorFunc && errorFunc();
}
