/**
 * React拖拽组件
 */

import React, { PropTypes, Component } from 'react';

class ReactDraggable extends Component {

  static propTypes = {

    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),

    className: PropTypes.string,

    style: PropTypes.object

  };

  static defaultProps = {
    position: { x: 0, y: 0 }
  };

  _addEvent() {

  },

  constructor(props) {
    super(props);

    this.state = {

      x: props.position.x,

      y: props.position.y,

      hasEnterSpace: false

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

}
