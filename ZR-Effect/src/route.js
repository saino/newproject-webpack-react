/**
 * 路由组件
 */

import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import LayoutLoading from './components/commons/LayoutLoading';

import SpecialEffec from './views/special-effec';


export default function createRoute (store) {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/specialeffec" component={SpecialEffec}/> */}
          <Route exact path="/specialeffec" component={
            Loadable({
              loader: () => import('./views/special-effec'),
              loading: LayoutLoading
            })
          }></Route>
          <Route exact path="/" component={ Loadable({
            loader: () => import('./components/layouts/HomePage'),
            // loader: () => import('./views/special-effec'),
            loading: LayoutLoading
          }) }></Route>
          
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
