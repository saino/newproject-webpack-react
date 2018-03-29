/**
 * 路由组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import LayoutLoading from './components/commons/LayoutLoading';
import NotMatch from './components/layouts/NotMatch';

export default function createRouter (store) {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={
            Loadable({
              loader: () => import('./components/layouts/HomePage/HomePage'),
              loading: LayoutLoading
            })
          }></Route>
          <Route exact path="/special-effec" component={
            Loadable({
              loader: () => import('./views/special-effec'),
              loading: LayoutLoading
            })
          }></Route>
          <Route exact path="/matting" component={
            Loadable({
              loader: () => import('./components/layouts/Matting/Matting'),
              loading: LayoutLoading
            })
          }></Route>
          <Route component={ NotMatch }></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
