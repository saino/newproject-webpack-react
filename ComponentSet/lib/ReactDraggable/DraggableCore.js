import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { addEvent, removeEvent } from './utils/eventFn';
import { getOuterWidth, getOuterHeight, getInnerWidth, getInnerHeight } from './utils/domFn';

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

    cursor: PropTypes.string,

    onDragStart: PropTypes.func,

    onDrag: PropTypes.func,

    onDragEnd: PropTypes.func,

    onPressSpace: PropTypes.func,

    onHover: PropTypes.func,

  };
  static defaultProps = {

    onDragStart: function () {},

    onDrag: function () {},

    onDragEnd: function () {}

  };

  tempX = 0;
  tempY = 0;
  handleDrag = this.handleDrag.bind(this);
  handleDragEnd = this.handleDragEnd.bind(this);
  handleDragStart = this.handleDragStart.bind(this);
  handlePressSpaceStart = this.handlePressSpaceStart.bind(this);
  handlePressSpaceEnd = this.handlePressSpaceEnd.bind(this);
  handleMouseOver = this.handleMouseOver.bind(this);
  handleMouseOut = this.handleMouseOut.bind(this);

  handleDragStart(evt) {
    const { ownerDocument } = findDOMNode(this);
    const { onDragStart, position: { x, y } } = this.props;

    this.tempX = evt.clientX;
    this.tempY = evt.clientY;

    onDragStart(x, y);

    addEvent(ownerDocument, 'selectstart', clearPreDev);
    addEvent(ownerDocument, 'dragstart', clearPreDev);
    addEvent(ownerDocument, eventAlias.move, this.handleDrag);
    addEvent(ownerDocument, eventAlias.end, this.handleDragEnd);
    addEvent(ownerDocument, 'keydown', this.handlePressSpaceStart);
    addEvent(ownerDocument, 'keyup', this.handlePressSpaceEnd);
  }

  handleDrag(evt) {
    const el = findDOMNode(this);
    const { ownerDocument } = el;
    const maxX = getInnerWidth(ownerDocument) - getOuterWidth(el);
    const maxY = getInnerHeight(ownerDocument) - getOuterHeight(el);

    let { onDrag } = this.props;
    let offsetX, offsetY;

    offsetX = evt.clientX - this.tempX;
    offsetY = evt.clientY - this.tempY;

    // if (newX < 0) {
    //   newX = 0;
    // } else if (newX > maxX) {
    //   newX = maxX;
    // }
    //
    // if (newY < 0) {
    //   newY = 0;
    // } else if (newY > maxY) {
    //   newY = maxY;
    // }

    onDrag(offsetX, offsetY);
  }

  handleDragEnd(evt) {
    const { onDragEnd } = this.props;
    const { ownerDocument } = findDOMNode(this);

    onDragEnd();

    removeEvent(ownerDocument, 'selectstart', clearPreDev);
    removeEvent(ownerDocument, 'dragstart', clearPreDev);
    removeEvent(ownerDocument, eventAlias.move, this.handleDrag);
    removeEvent(ownerDocument, eventAlias.end, this.handleDragEnd);
    removeEvent(ownerDocument, 'keydown', this.handlePressSpaceStart);
    removeEvent(ownerDocument, 'keyup', this.handlePressSpaceEnd);
  }

  handlePressSpaceStart(evt) {
    const { onPressSpace } = this.props;
    onPressSpace(evt.keyCode == 32);
  }

  handlePressSpaceEnd() {
    const { onPressSpace } = this.props;
    onPressSpace(false);
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
    const { cursor, position: { x, y } } = this.props;

    return {
      position: 'relative',
      cursor: cursor,
      left: x,
      top: y
    };
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps &&
      nextProps.position.x != this.props.position.x ||
      nextProps.position.y != this.props.position.y
    ) {
      this.setState({ position: nextProps.position });
    }
  }

  render() {

    return React.cloneElement(React.Children.only(this.props.children), {
      style: { ...this.getCurrStyle(),  ...this.props.children.props.style },
      onMouseDown: this.handleDragStart,
      onMouseOver: this.handleMouseOver,
      onMouseOut: this.handleMouseOut
    });
  }

}
