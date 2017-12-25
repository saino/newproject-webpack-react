import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import Point from './utils/Point';
import Path from './utils/Path';
import Core from './MattingCore';

export default class Matting extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      pathData: new Path(props.points)
    };
  }
  //actualCount = 0;

  emptyFn = () => {};

  componentWillReceiveProps(nextProps) {
    let pathData = this.state.pathData;
    let newStatus = null;
    
    if (!nextProps.isMetting && this.state.drawStatus == 1) {
        pathData.closed = true;
        pathData.floatingPoint = new Point('', pathData.lastPoint().x, pathData.lastPoint().y);
        pathData.firstPoint().setControl(Point.CONTROL1, pathData.floatingPoint.getControl(Point.CONTROL1));
        pathData.floatingPoint = false;
        newStatus = { drawStatus: 2, pathData };

    } else {
      newStatus = { x: 0, y: 0, movingControl: false, dragging: false, drawStatus: 1 };
      pathData.closed = false;
      pathData.controls = [];
      pathData.points = nextProps.points;
      newStatus = { pathData: pathData };
    }

    this.setState(newStatus);
  }

  handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    let pathData = this.state.pathData;
    let downState = { x: offsetX, y: offsetY, dragging: true };

    if (!this.state.drawStatus) {
      pathData.floatingPoint = new Point('floating', offsetX, offsetY);
      downState = { ...downState, drawStatus: 1, pathData };
    }

    this.setState(downState);
  };

  handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const { dragging, drawStatus, pathData } = this.state;
    let redraw = false;

    if (!dragging) {
      if (pathData.floatingPoint || drawStatus == 1) {
        pathData.floatingPoint = new Point('floating', offsetX, offsetY);
        pathData.floatingPoint.setControl(Point.CONTROL1, pathData.lastPoint().getOppositeControl(Point.CONTROL2));
        let p1 = pathData.firstPoint();

        if (pathData.points.length > 1 && p1.isInside(offsetX, offsetY)) {
          pathData.floatingPoint.setControl(Point.CONTROL2, p1.getControl(Point.CONTROL2));
        }

        redraw = true;
      }
    } else {
      redraw = true;

      switch (drawStatus) {
        case 1:
          pathData.floatingPoint.setControl(Point.CONTROL2, pathData.floatingPoint.getOppositeControl([ offsetX, offsetY ]));
          //pathData.addPoint(this.actualCount, pathData.floatingPoint);
          break;
        case 2:
          pathData.firstPoint().setControl(Point.CONTROL2, pathData.firstPoint().getOppositeControl([ offsetX, offsetY ]));
          break;
      }
    }

    if (redraw) {
      this.setState({ pathData });
    }
  };

  handleMouseUp = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
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

  render() {
    const { isMetting } = this.props;
    const { x, y, dragging, drawStatus, pathData } = this.state;

    return cloneElement(this.props.children, {
      onMouseDown: isMetting ? this.handleMouseDown : this.emptyFn,
      onMouseMove: isMetting ? this.handleMouseMove : this.emptyFn,
      onMouseUp: isMetting ? this.handleMouseUp : this.emptyFn
    }, (
      <Core
        x={ x }
        y={ y }
        dragging={ dragging }
        drawStatus={ drawStatus }
        pathData={ pathData } />
    ));
    // return (
    //   <div
    //     className="matting"
    //     style={ this.props.style }
    //     onMouseDown={ this.handleMouseDown }
    //     onMouseMove={ this.handleMouseMove }
    //     onMouseUp={ this.handleMouseUp }>
    //     <Core
    //       x={ this.state.x }
    //       y={ this.state.y }
    //       dragging={ this.state.dragging }
    //       drawStatus={ this.state.drawStatus }
    //       pathData={ this.state.pathData }>
    //     </Core>
    //   </div>
    // );
  }
}
