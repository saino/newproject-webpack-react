/**
 * React拖拽组件
 */

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import DraggableCore from './DraggableCore';
import { getOuterWidth, getOuterHeight, getInnerWidth, getInnerHeight } from './utils/domFn';
import { addEvent } from './utils/eventFn';

const emptyFn = () => {};

export default class Draggable extends Component {

  static propTypes = {

    defaultPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),

    className: PropTypes.string,

    style: PropTypes.object,

    onDragStart: PropTypes.func,

    onDrag: PropTypes.func,

    onDragEnd: PropTypes.func,

    isAble: true

  };

  static defaultProps = {

    defaultPosition: { x: 0, y: 0 },

    className: '',

    style: {},

    onDragStart: function () {},

    onDrag: function () {},

    onDragEnd: function () {}

  };

  constructor(props) {
    super(props);

    this.state = {

      deltaX: 0,

      deltaY: 0,

      x: this.props.defaultPosition.x,

      y: this.props.defaultPosition.y,

      cursor: 'default'

    };

    this.minX = this.minY = null;
  }

  onDragStart(currX, currY) {
    const { onDragStart } = this.props;
    onDragStart(currX, currY);

    this.setState({ x: currX, y: currY });
  }

  onDrag(newDeltaX, newDeltaY, el) {
    const { onDrag } = this.props;
    const { ownerDocument } = el;
    const maxX = getInnerWidth(ownerDocument.documentElement) - getOuterWidth(el);
    const maxY = getInnerHeight(ownerDocument.documentElement) - getOuterHeight(el);
    let newX, newY;

    onDrag(newDeltaX, newDeltaY);

    newX = this.state.x + newDeltaX;
    newY = this.state.y + newDeltaY;

    // if (newX < this.minX)
    //   newX = this.minX;
    // else if (newX > maxX + this.minX)
    //   newX = maxX + this.minX;
    //
    // if (newY < this.minY)
    //   newY = this.minY;
    // else if (newY > maxY + this.minY)
    //   newY = maxY + this.minY;

    this.setState({ deltaX: newX, deltaY: newY });
  }

  onDragEnd(endX, endY) {
    const { onDragEnd } = this.props;
    onDragEnd(endX, endY);

    this.setState({ x: endX, y: endY });
  }

  render() {
    return (
        <DraggableCore
          position={{ x: this.state.x, y: this.state.y }}
          deltaPosition={{ x: this.state.deltaX, y: this.state.deltaY }}
          isAble={ this.props.isAble }
          cursor={ this.props.cursor }
          onDragStart={ this.onDragStart.bind(this) }
          onDrag={ this.onDrag.bind(this) }
          onDragEnd={ this.onDragEnd.bind(this) }>

          {cloneElement(this.props.children, {
            className: classNames(this.props.children.props.className, this.props.className),
            style: { ...this.props.children.props.style, ...this.props.style }
          })}

        </DraggableCore>
    );
  }

  componentDidMount() {
    addEvent(findDOMNode(this), 'resize', () => this.setMinPos());
    this.setMinPos();
  }

  setMinPos() {
    const el = findDOMNode(this);

    this.minX = -el.getBoundingClientRect().left;
    this.minY = -el.getBoundingClientRect().top;
  }

}
