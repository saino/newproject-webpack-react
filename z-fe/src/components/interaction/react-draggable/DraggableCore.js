import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { addEvent, removeEvent } from './utils/eventFn';
import { getPosition ,matchesSelectorAndParentsTo} from './utils/domFn';

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
    
    handle:PropTypes.string,

    isAble: PropTypes.bool

  };
  static defaultProps = {
    onDragStart: function () {},

    onDrag: function () {},

    onDragEnd: function () {},
    
    handle: null,

    isAble: true
  };

  tempX = 0;
  tempY = 0;
  hasPressSpace = false;

  handleDrag = this.handleDrag.bind(this);
  handleDragEnd = this.handleDragEnd.bind(this);
  handleDragStart = this.handleDragStart.bind(this);
  handlePressSpaceStart = this.handlePressSpaceStart.bind(this);
  handlePressSpaceEnd = this.handlePressSpaceEnd.bind(this);

  handleDragStart(evt) {
    if (!this.hasPressSpace || !this.props.isAble)
      return;

    const el = findDOMNode(this);
    const { ownerDocument } = el;
    const { onDragStart, handle } = this.props;
      if(handle&&!matchesSelectorAndParentsTo(evt.target, handle, el)){
          return ;
      }
    const [ currX, currY ] = getPosition(el);

    onDragStart(currX, currY);

    this.tempX = evt.clientX;
    this.tempY = evt.clientY;
    
    addEvent(ownerDocument, 'selectstart', clearPreDev);
    addEvent(ownerDocument, 'dragstart', clearPreDev);
    addEvent(ownerDocument, eventAlias.move, this.handleDrag);
    addEvent(ownerDocument, eventAlias.end, this.handleDragEnd);

    evt.stopPropagation();
  }

  handleDrag(evt) {
    if (!this.hasPressSpace || !this.props.isAble)
      return;

    const el = findDOMNode(this);
    let { onDrag } = this.props;
    let offsetX, offsetY;

    offsetX = evt.clientX - this.tempX;
    offsetY = evt.clientY - this.tempY;

    onDrag(offsetX, offsetY, el);

    evt.stopPropagation();
  }

  handleDragEnd(evt) {
    if (!this.hasPressSpace || !this.props.isAble)
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

    evt.stopPropagation();
  }

  handlePressSpaceStart(evt) {
    const { ownerDocument } = findDOMNode(this);
    // debugger;
    this.hasPressSpace = evt.keyCode == 32;
    addEvent(ownerDocument, 'keyup', this.handlePressSpaceEnd);
  }

  handlePressSpaceEnd() {
    if(!this.mouted){
      return
    }
    const { ownerDocument } = findDOMNode(this);
    this.hasPressSpace = false;
    removeEvent(ownerDocument, 'keyup', this.handlePressSpaceEnd);
  }

  getCurrStyle() {
    const { cursor, position, deltaPosition } = this.props;

    return {
      position: 'absolute',
      cursor: cursor,
      left: deltaPosition.x||position.x,
      top: deltaPosition.y||position.y
    };
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      style: { ...this.getCurrStyle(),  ...this.props.children.props.style },
      onMouseDown: this.handleDragStart
    });
  }

  componentDidMount() {
    const { ownerDocument } = findDOMNode(this);
    addEvent(ownerDocument, 'keydown', this.handlePressSpaceStart);
    this.mouted = true;
  }

  componentWillUnmount() {
      const { ownerDocument } = findDOMNode(this);
      removeEvent(ownerDocument, 'keydown', this.handlePressSpaceStart);
      this.mouted = false;
  }
}
