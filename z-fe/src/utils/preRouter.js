/**
 * 路由预处理
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import { checkExpiredStatus } from './auth';
import { message } from 'antd';

export const requireAuth = (SuccessComponent) => () => {
  if (checkExpiredStatus()) {
    return <Redirect to="/" />
  }

  return (<SuccessComponent />);
}