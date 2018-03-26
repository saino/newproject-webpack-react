/**
 * 路由组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import LayoutLoading from './components/commons/LayoutLoading';

export default function createRouter (store) {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          {/*<Route exact path="/" component={
            Loadable({
              loader: () => import('./views/special-effec'),
              loading: LayoutLoading
            })
          }></Route>*/}
          <Route exact path="/" component={ Loadable({
            // loader: () => import('./components/layouts/HomePage/HomePage'),
            loader: () => import('./views/special-effec'),
            loading: LayoutLoading
          }) }></Route>

        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
