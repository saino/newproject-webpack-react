/**
 * React拖拽组件
 */

import React, { PropTypes, Component } from 'react';
import classNames from 'classNames';
import DraggableCore from './DraggableCore.js';

export default class Draggable extends Component {

  static propTypes = {

    position: PropTypes.shape({
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

    position: { x: 0, y: 0 },

    className: '',

    style: {},

    onDragStart: function () {},

    onDrag: function () {},

    onDragEnd: function () {}

  };

  constructor(props) {
    super(props);

    this.state = {

      x: props.position.x,

      y: props.position.y,

      hasPressSpace: false

    };
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps &&
      nextProps.position.x != this.props.position.x ||
      nextProps.position.y != this.props.position.y
    ) {
      this.setState({ x: nextProps.position.x, y: nextProps.position.y });
    }
  }

  render() {

    return (
      <DraggableCore position={ this.props.position } onDragStart={ this.onDragStart } onDrag={ this.onDrag } onDragEnd={ this.onDragEnd } onPressSpace={ this.onPressSpace } >
        {React.cloneElement(React.Children.only(this.props.children), {
          className: classNames(this.props.children.props.className, this.props.className)
          style: { ...this.props.children.props.style, ...this.props.style }
        })}
      </DraggableCore>
    );
  }

  onDragStart(e, currX, currY) {
    this.props.onDragStart(e, currX, currY)
  }

  onDrag(e, deltaX, deltaY) {
    this.props.onDrag(e, deltaX, deltaY);
  }

  onDragEnd(e) {
    this.props.onDragEnd(e);
  }

  onPressSpace() {
    this.setState({ hasPressSpace: true });
  }
  
}
