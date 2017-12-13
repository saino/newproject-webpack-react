/**
 * 路由预处理
 */

import React, { cloneElement } from 'react';
import { Redirect } from 'react-router-dom';
import { checkExpiredStatus } from './auth';
import { message } from 'antd';

export const requireAuth = (SuccessComponent, props) => (originProps) => {
  if (checkExpiredStatus()) {
    message.error('请您先登录', 1);

    return <Redirect to="/" />
  }

  return cloneElement(<SuccessComponent />, { ...originProps, ...props });
}
