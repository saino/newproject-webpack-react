import React, { Component } from 'react';
import Header from '../header/Header';
import Login from '../auth/Login';
import Register from '../auth/Register';

export default class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
      </div>
    );
  }
}
