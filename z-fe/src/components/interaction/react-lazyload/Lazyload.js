import React, { PureComponent, Component, Children, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import { Spin } from 'antd';

export default class Lazyload extends (PureComponent || Component) {
  state = { visibleActualImg: false };

  handleLoadComplete = () => {
    this.setState({ visibleActualImg: true });
  }

  render() {
    return (
      <div className="spin-box">
        { !this.state.visibleActualImg && (<div className="spin"><Spin /></div>) }
        { cloneElement(Children.only(this.props.children), { ref: el => this.el = el }) }
        <style>{`
          .spin-box {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
          }
          .spin {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 1;
          }
        `}</style>
      </div>
    );
  }

  componentDidMount() {
    this.el.addEventListener('load', this.handleLoadComplete, false);
  }
}
