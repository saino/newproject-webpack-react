/**
 * React拖拽组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';
import DraggableCore from './DraggableCore.js';

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

      deltaX: this.props.defaultPosition.x,

      deltaY: this.props.defaultPosition.y,

      cursor: 'default',

      hasPressSpace: false

    };
  }

  onDragStart(currX, currY) {
    const { onDragStart } = this.props;
    onDragStart(currX, currY);
  }

  onDrag(newDeltaX, newDeltaY) {
    const { onDrag, defaultPosition: { x, y } } = this.props;
    onDrag(newDeltaX, newDeltaY);

    this.setState({ x: newDeltaX + x, y: newDeltaY + y });
  }

  onDragEnd() {
    const { onDragEnd } = this.props;
    onDragEnd();
  }

  onPressSpace(hasPressSpace) {
    console.log(hasPressSpace, 'md');
    this.setState({ hasPressSpace });
  }

  onHover(cursor) {
    this.setState({ cursor });
  }

  render() {

    return (
      <DraggableCore
        position={{ x: this.state.x, y: this.state.y }}
        cursor={ this.state.cursor }
        onDragStart={ this.onDragStart.bind(this) }
        onDrag={ this.state.hasPressSpace ? this.onDrag.bind(this) : void 0 }
        onDragEnd={ this.onDragEnd.bind(this) }
        onHover={ this.onHover.bind(this) }
        onPressSpace={ this.onPressSpace.bind(this) }>

        {React.cloneElement(React.Children.only(this.props.children), {
          className: classNames(this.props.children.props.className, this.props.className),
          style: { ...this.props.children.props.style, ...this.props.style }
        })}

      </DraggableCore>
    );
  }

}
