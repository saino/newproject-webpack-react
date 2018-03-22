/**
 * 路由组件
 */

import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import LayoutLoading from './components/commons/LayoutLoading';

export default function createRoute (store) {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Route path="/" component={ Loadable({
          loader: () => import('./components/layouts/HomePage'),
          loading: LayoutLoading
        }) }></Route>
      </BrowserRouter>
    </Provider>
  );
}
