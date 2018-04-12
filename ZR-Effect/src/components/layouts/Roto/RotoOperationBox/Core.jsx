import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import style from './style.css';

export default class Core extends Component {
  mouseDownHandle = (e) => {
    const { onMouseDown } = this.props;
    const { offX, offY } = this.getOffPosition(e.clientX, e.clientY);

    onMouseDown(offX, offY);
    this.resetEvent(e);
  };

  mouseMoveHandle = e => {
    const { onMouseMove } = this.props;
    const { offX, offY } = this.getOffPosition(e.clientX, e.clientY);

    onMouseMove(offX, offY);
    this.resetEvent(e);
  };

  mouseUpHandle = e => {
    const { onMouseUp } = this.props;
    const { offX, offY } = this.getOffPosition(e.clientX, e.clientY);

    onMouseUp(offX, offY);
    this.resetEvent(e);
  };

  getOffPosition(clientX, clientY) {
    const el = findDOMNode(this);
    const { x, y } = el.getBoundingClientRect();

    return { offX: clientX - x, offY: clientY - y };
  }

  resetEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const { children } = this.props;

    return (
      <div className={ style[ 'wrapper-core' ] }
      onMouseDown={ this.mouseDownHandle }
      onMouseMove={ this.mouseMoveHandle }
      onMouseUp={ this.mouseUpHandle }>
        { children }
      </div>
    );
  }
}
