import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { addEvent, removeEvent } from './utils/eventFn';
import { getPosition } from './utils/domFn';

const eventAlias = {
  start: 'mousedown',
  move: 'mousemove',
  end: 'mouseup'
};

function clearPreDev (evt) {
  evt.stopPropagation();
  evt.preventDefault();
}

export default class DraggableCore extends Component {

  static propTypes = {

    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),

    deltaPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),

    cursor: PropTypes.string,

    onDragStart: PropTypes.func,

    onDrag: PropTypes.func,

    onDragEnd: PropTypes.func,

    onHover: PropTypes.func,

  };
  static defaultProps = {

    onDragStart: function () {},

    onDrag: function () {},

    onDragEnd: function () {}

  };

  tempX = 0;
  tempY = 0;
  hasPressSpace = false;

  handleDrag = this.handleDrag.bind(this);
  handleDragEnd = this.handleDragEnd.bind(this);
  handleDragStart = this.handleDragStart.bind(this);
  handlePressSpaceStart = this.handlePressSpaceStart.bind(this);
  handlePressSpaceEnd = this.handlePressSpaceEnd.bind(this);
  handleMouseOver = this.handleMouseOver.bind(this);
  handleMouseOut = this.handleMouseOut.bind(this);

  handleDragStart(evt) {
    if (!this.hasPressSpace)
      return;

    const el = findDOMNode(this);
    const { ownerDocument } = el;
    const { onDragStart } = this.props;
    const [ currX, currY ] = getPosition(el);

    onDragStart(currX, currY);

    this.tempX = evt.clientX;
    this.tempY = evt.clientY;

    addEvent(ownerDocument, 'selectstart', clearPreDev);
    addEvent(ownerDocument, 'dragstart', clearPreDev);
    addEvent(ownerDocument, eventAlias.move, this.handleDrag);
    addEvent(ownerDocument, eventAlias.end, this.handleDragEnd);
  }

  handleDrag(evt) {
    if (!this.hasPressSpace)
      return;

    const el = findDOMNode(this);
    let { onDrag } = this.props;
    let offsetX, offsetY;

    offsetX = evt.clientX - this.tempX;
    offsetY = evt.clientY - this.tempY;

    onDrag(offsetX, offsetY, el);
  }

  handleDragEnd(evt) {
    if (!this.hasPressSpace)
      return;

    const { onDragEnd } = this.props;
    const el = findDOMNode(this);
    const { ownerDocument } = el;
    const [ endX, endY ] = getPosition(el);

    onDragEnd(endX, endY);

    removeEvent(ownerDocument, 'selectstart', clearPreDev);
    removeEvent(ownerDocument, 'dragstart', clearPreDev);
    removeEvent(ownerDocument, eventAlias.move, this.handleDrag);
    removeEvent(ownerDocument, eventAlias.end, this.handleDragEnd);
  }

  handlePressSpaceStart(evt) {
    const { ownerDocument } = findDOMNode(this);

    this.hasPressSpace = evt.keyCode == 32;
    addEvent(ownerDocument, 'keyup', this.handlePressSpaceEnd);
  }

  handlePressSpaceEnd() {
    const { ownerDocument } = findDOMNode(this);

    this.hasPressSpace = false;
    removeEvent(ownerDocument, 'keyup', this.handlePressSpaceEnd);
  }

  handleMouseOver() {
    const { onHover } = this.props;
    onHover('move');
  }

  handleMouseOut() {
    const { onHover } = this.props;
    onHover('default');
  }

  getCurrStyle() {
    const { cursor, position, deltaPosition } = this.props;

    return {
      position: 'relative',
      cursor: cursor,
      left: deltaPosition.x,
      top: deltaPosition.y
    };
  }

  render() {

    return React.cloneElement(React.Children.only(this.props.children), {
      style: { ...this.getCurrStyle(),  ...this.props.children.props.style },
      onMouseDown: this.handleDragStart,
      onMouseOver: this.handleMouseOver,
      onMouseOut: this.handleMouseOut
    });
  }

  componentDidMount() {
    const { ownerDocument } = findDOMNode(this);

    addEvent(ownerDocument, 'keydown', this.handlePressSpaceStart);
  }

}
