import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { addEvent, removeEvent } from './utils/domFn';

const eventAlias = {
  start: 'mousedown',
  move: 'mousemove',
  end: 'mouseup'
};


export default class DraggableCore extends Component {

  static propTypes = {

    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number }).isRequired,

    onDragStart: PropTypes.func,

    onDrag: PropTypes.func,

    onDragEnd: PropTypes.func,

    onPressSpace: PropTypes.func

  };


  handleDragStart() {

  }

  handleDrag() {

  }

  handleDragEnd() {

  }

  handlePressSpace() {

  }

  render() {
    return React.cloneElement();      
  }

}
