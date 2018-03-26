/**
 * 入口文件
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import createRouter from './route';
import createStore from './stores/store';
import 'antd/dist/antd.css';

// 创建store
const store = createStore();
// 创建路由组件
const Router = createRouter(store);

render(Router, document.querySelector('#app'));
