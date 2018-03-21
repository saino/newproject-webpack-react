/**
 * 入口文件
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import createRoute from './route';

render(createRoute(), document.querySelector('#app'));
