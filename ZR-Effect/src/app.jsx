/**
 * 入口文件
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import createRoute from './route';
import createStore from './stores/store';

// 创建store
const store = createStore();

// 创建路由组件
const Route = createRoute(store);

render(Route, document.querySelector('#app'));
