/**
 * React拖拽组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';
import DraggableCore from './DraggableCore.js';

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

    onDragEnd: PropTypes.func

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
  }

  onDragStart(currX, currY) {
    const { onDragStart } = this.props;
    onDragStart(currX, currY);

    this.setState({ x: currX, y: currY });
  }

  onDrag(newDeltaX, newDeltaY) {
    const { onDrag } = this.props;
    onDrag(newDeltaX, newDeltaY);

    this.setState({ deltaX: this.state.x + newDeltaX, deltaY: this.state.y + newDeltaY });
  }

  onDragEnd(endX, endY) {
    const { onDragEnd } = this.props;
    onDragEnd(endX, endY);

    this.setState({ x: endX, y: endY });
  }

  onHover(cursor) {
    this.setState({ cursor });
  }

  render() {

    return (
      <DraggableCore
        position={{ x: this.state.x, y: this.state.y }}
        deltaPosition={{ x: this.state.deltaX, y: this.state.deltaY }}
        cursor={ this.state.cursor }
        onDragStart={ this.onDragStart.bind(this) }
        onDrag={ this.onDrag.bind(this) }
        onDragEnd={ this.onDragEnd.bind(this) }
        onHover={ this.onHover.bind(this) }>

        {React.cloneElement(React.Children.only(this.props.children), {
          className: classNames(this.props.children.props.className, this.props.className),
          style: { ...this.props.children.props.style, ...this.props.style }
        })}

      </DraggableCore>
    );
  }

}
