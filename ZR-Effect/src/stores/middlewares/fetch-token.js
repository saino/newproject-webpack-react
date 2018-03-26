/**
 * 每次提交都自动带上token
 */
import { get } from '../../utils/configure-auth';

export default function getLocalCache ({ dispatch, getState }) {
  return (next) => (action) => {
    if (typeof action === 'function') {
      return next(action);
    }

    return next({ ...action, token: get()});  
  };
};
