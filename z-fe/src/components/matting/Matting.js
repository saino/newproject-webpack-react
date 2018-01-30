import React, { Component, cloneElement, Children } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Snap from 'snapsvg-cjs';
import Point from './utils/Point';
import Path from './utils/Path';
import Core from './MattingCore';
import { finds } from '../../utils/stateSet';

export default class Matting extends Component {
  constructor(props) {
    super(props);

    this.currPoint = null;
    this.state = {
      // x坐标
      x: 0,
      // y坐标
      y: 0,
      lastX: 0,
      lastY: 0,
      // 选中的点
      pointSelected: false,
      // 拖拽的是否是控制点
      movingControl: false,
      // 是否拖拽
      dragging: false,
      // 绘制状态(0 => 未开始；1 => 未闭合；2 => 已闭合)
      drawStatus: 0,
      // path信息
      pathData: new Path(props.points),
      focusPath: ''
    };
  }
  //actualCount = 0;

  emptyFn = () => {};

  componentWillReceiveProps(nextProps) {
    let pathData = this.state.pathData;
    let newStatus = null;
    pathData.closed = false;

    if (!nextProps.isMetting && this.state.drawStatus == 1) {
      pathData.closed = true;
      pathData.floatingPoint = new Point('', pathData.lastPoint().x, pathData.lastPoint().y);
      pathData.firstPoint().setControl(Point.CONTROL1, pathData.floatingPoint.getControl(Point.CONTROL1));
      pathData.floatingPoint = false;
      newStatus = { drawStatus: 2, pathData, focusPath: '' };
      this.setState(newStatus);
    } else if (this.state.drawStatus == 0) {
      newStatus = { x: 0, y: 0, movingControl: false, dragging: false, drawStatus: 1 };
      //pathData.closed = false;
      pathData.controls = [];
      pathData.points = nextProps.points;
      newStatus = { pathData, focusPath: '' };
      this.setState(newStatus);
    } else {
      this.setState({ drawStatus: 0, focusPath: '' });
    }
  }

  handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const { onComplete } = this.props;
    const { pathData, drawStatus, pointSelected } = this.state;
    let downState = { x: offsetX, y: offsetY, dragging: true }, index, points, focusPath;

    if (e.target.tagName.toLowerCase() === 'circle' && e.target.getAttribute('class') !== 'floating') {
      if (drawStatus == 1) {
        pathData.closed = true;
        pathData.floatingPoint = new Point('', pathData.lastPoint().x, pathData.lastPoint().y);
        pathData.firstPoint().setControl(Point.CONTROL1, pathData.floatingPoint.getControl(Point.CONTROL1));
        this.setState({ dragging: true });
        onComplete(pathData);
      } else {
        index = e.target.getAttribute('stroke');

        if (index != null) {
          index = +index;
          this.currPoint = pathData.points[ index ];

          if (this.currPoint != null && pathData.points.length > 1) {
            focusPath = pathData.prevPoint(index).generatePath(true) + this.currPoint.generatePath();
            this.setState({ focusPath, dragging: true, lastX: offsetX, lastY: offsetY });
          }
        }
      }
    } else if (!drawStatus) {
      pathData.closed = false;
      pathData.floatingPoint = new Point('floating', offsetX, offsetY);
      downState = { ...downState, drawStatus: 1, pathData };
      this.setState(downState);
    } else {
      pathData.closed = false;
      this.setState(downState);
    }
  };

  handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const { dragging, drawStatus, pathData, lastX, lastY, movingControl } = this.state;
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
      console.log(drawStatus, 'dd');
      switch (drawStatus) {
        case 1:
          pathData.floatingPoint.setControl(Point.CONTROL2, pathData.floatingPoint.getOppositeControl([ offsetX, offsetY ]));
          //pathData.addPoint(this.actualCount, pathData.floatingPoint);
          break;
        case 2:
          pathData.firstPoint().setControl(Point.CONTROL2, pathData.firstPoint().getOppositeControl([ offsetX, offsetY ]));
          break;
        default:
          if (this.currPoint != null) {
            pathData.movePoint(this.currPoint, offsetX - lastX, offsetY - lastY, movingControl);
            this.setState({
              lastX: offsetX,
              lastY: offsetY
            });
            this.props.onMoveMettingPoint(pathData.points);
          }
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

  handleKeyCode = (e) => {
    const { pathData, movingControl } = this.state;
    let points, downState, pathEl, length, params, p;

    if (this.currPoint != null && !movingControl) {
      switch (e.keyCode) {
        case 8:
          points = finds(pathData.points, (item) => item.x == this.currPoint.x && item.y == this.currPoint.y);
          pathData.removePoint(points[ 0 ]);
          downState = { pathData, focusPath: '' };
          this.props.onRemoveMettingPoint(pathData.points);
          this.setState(downState);
          break;
        case 220:
          pathEl = Snap(findDOMNode(this.refs['matting_core'].refs['focus_path'])).children()[0];
          length = pathEl.getTotalLength();
          params = Snap.parsePathString(pathEl.getSubpath(0, length / 2))[1];	// 前半段
					p = new Point('floating',params[5], params[6], params[1], params[2], params[3], params[4]);
					params = Snap.parsePathString(pathEl.getSubpath(length / 2, length))[1];	// 后半段
					pathData.insertPoint(pathData.indexOf(this.currPoint), p);
					this.currPoint.setControl(Point.CONTROL1, [params[1], params[2]]);
					this.currPoint.setControl(Point.CONTROL2, [params[3], params[4]]);
          downState = { pathData };
          this.setState(downState);
          this.props.onRemoveMettingPoint(pathData.points);
          break;
      }
    }
  };

  render() {
    const { isMetting } = this.props;
    const { x, y, dragging, drawStatus, pathData, focusPath } = this.state;

    return cloneElement(this.props.children, {
      onMouseDown: isMetting ? this.handleMouseDown : this.emptyFn,
      onMouseMove: isMetting ? this.handleMouseMove : this.emptyFn,
      onMouseUp: isMetting ? this.handleMouseUp : this.emptyFn
    }, (
      <Core
        ref="matting_core"
        x={ x }
        y={ y }
        focusPath={ focusPath }
        dragging={ dragging }
        drawStatus={ drawStatus }
        pathData={ pathData } />
    ));
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyCode, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyCode, false);
  }
}
