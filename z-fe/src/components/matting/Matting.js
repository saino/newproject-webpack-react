import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import Point from './utils/Point';
import Path from './utils/Path';
import Core from './MattingCore';

export default class Matting extends Component {
  static propTypes = {
    style: PropTypes.object,
    onComplete: PropTypes.func.isRequired
  };
  static defaultProps = {
    style: {}
  };

  state = {
    // x坐标
    x: 0,
    // y坐标
    y: 0,
    // 拖拽的是否是控制点
    movingControl: false,
    // 是否拖拽
    dragging: false,
    // 绘制状态(0 => 未开始；1 => 未闭合；2 => 已闭合)
    drawStatus: 0,
    // path信息
    pathData: new Path
  };

  handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    let downState = { x: offsetX, y: offsetY, dragging: true };
    let pathData = this.state.pathData;

    if (!this.state.drawStatus) {
      pathData.floatingPoint = new Point(offsetX, offsetY);
      downState = { ...downState, drawStatus: 1, pathData };
    }

    this.setState(downState);
  };

  handleMouseMove = () => {

  };

  handleMouseUp = () => {
    let { dragging, pathData, drawStatus, movingControl } = this.state;

    if (dragging) {
      if (pathData.floatingPoint) {
        pathData.confirmFloating();

        if (!drawStatus) {
          drawStatus = 1;
        }
      }

      movingControl = dragging = false;

      this.setState({ movingControl, dragging, drawStatus });
    }

    if (drawStatus == 2) {
      this.setState({ drawStatus: 0 });
    }
  };

  addPoint(point) {
    const pathData = this.state.pathData;
    pathData.points = [ point ];

    this.setState({ pathData });
  }

  render() {
    return (
      <div
        className="matting"
        style={ this.props.style }
        onMouseDown={ this.handleMouseDown }
        onMouseMove={ this.handleMouseMove }
        onMouseUp={ this.handleMouseUp }>
        <Core
          x={ this.state.x }
          y={ this.state.y }
          dragging={ this.state.dragging }
          drawStatus={ this.state.drawStatus }
          pathData={ this.state.pathData }
          onAddPoint={ this.addPoint.bind(this) }
          onComplete={ this.props.onComplete }>
        </Core>
      </div>
    );
  }
}
