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
    //`${ config.api.host }${ path }${ isPost ? '' : parseQs(body) }`,
    `${ path }${ isPost ? '' : parseQs(body) }`,
    {...fetchConfig, method, body: isPost ? JSON.stringify(body) : void 0 }
  )
  .then(parseResp)
  .then(checkErrorCodeStatus);
};

export function get (path, qs = {}) {
  return request(path, 'GET', qs)
   .then(resp => resp)
   .catch(error => error.message);
};

export function post (path, body = {}) {
  return request(path, 'POST', body)
   .then(resp => resp)
   .catch(error => error.message);
};
