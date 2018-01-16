import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Point from './utils/Point';

export default class Core extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    movingControl: PropTypes.bool,
    pointSelected: PropTypes.bool,
    dragging: PropTypes.bool,
    drawStatus: PropTypes.number,
    pathData: PropTypes.object
  };

  state = {
    points: [],
    path: ''
  };

  controlLength = 0;
  recordIndex = 0;

  drawPoint(prevPoints, prevControls, currPoint, otherPoint, isFloating) {
    let state = {}, exec;
    //state.points = [ ...prevPoints, <circle cx={ currPoint.x } stroke={ prevPoints.length } cy={ currPoint.y } r={ currPoint.radius } className={ isFloating ? 'floating' : '' }></circle> ];
    state.points = prevPoints;
    state.controls = prevControls;

    if (currPoint.cx1) {
      exec = `${ otherPoint.generatePath(true) } L${ currPoint.cx1 } ${ currPoint.cy1 }`;
      state.points = [ ...state.points, <circle cx={ currPoint.cx1 } stroke={ state.points.length } cy={ currPoint.cy1 } r={ currPoint.radius } className="control"></circle> ];
      state.controls = [ ...prevControls, (<path d={ exec }></path>) ];
    }
    if (currPoint.cx2) {
      exec = `${ currPoint.generatePath(true) } L${ currPoint.cx2 } ${ currPoint.cy2 }`;
      state.points = [ ...state.points, <circle cx={ currPoint.cx2 } stroke={ state.points.length } cy={ currPoint.cy2 } r={ currPoint.radius } className="control"></circle> ];
      state.controls = [ ...prevControls, (<path d={ exec }></path>) ];
    }

    return state;
  }

  uniqPoints(points) {
    let res = {}, key;

    return [ ...points.filter((item) => {
      key = JSON.stringify({ x: item.props.cx, y: item.props.cy });

      return res.hasOwnProperty(key) ? false : (res[ key ] = true);
    }) ];
  }

  computePath(props) {
    let path = '';

    this.setState({
      points: [],
      controls: [],
    }, () => {
      const { pathData } = props;

      let state = {}, prevPoints;
      pathData.points = pathData.points.map((item) => item instanceof Point ? item : new Point('floating', item.x, item.y, item.cx1, item.cy1, item.cx2, item.cy2));
      prevPoints = pathData.points.map((point, index) => (<circle stroke={ index } cx={ point.x } cy={ point.y } r={ point.radius }></circle>));

      if (pathData.floatingPoint) {
        let className = pathData.floatingPoint.cx1 ? 'control' : pathData.floatingPoint.className;

        //prevPoints = [...prevPoints, <circle cx={ pathData.floatingPoint.x } cy={ pathData.floatingPoint.y } r={ pathData.floatingPoint.radius }></circle>];
        state = this.drawPoint(prevPoints, pathData.controls, pathData.floatingPoint, pathData.lastPoint(), true);
        prevPoints = state.points;
        var d = state.controls.pop();
        d != undefined && (pathData.controls[this.controlLength] = d);
      }

      const temp = this.controlLength;

      pathData.points.forEach((point, i) => {
        path += point.generatePath(i == 0);
        state = this.drawPoint(prevPoints, pathData.controls, point, pathData.prevPoint(i));

        if (pathData.floatingPoint) {
          pathData.controls[ temp + 1 ] = state.controls.slice(-1)[0];
          this.controlLength = this.recordIndex + 2;
        } else {
          this.recordIndex = state.controls.length;
        }

        prevPoints = state.points;
      });

      if (pathData.points.length > 0 && pathData.floatingPoint) {
        path += pathData.floatingPoint.generatePath();
      }

      if (pathData.closed) {
        path += pathData.firstPoint().generatePath();
		    path += 'Z';
      }

      this.setState({ ...state, path });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.computePath(nextProps);
  }

  render() {
    return (
      <svg className="pager">
        <g className="outline">
          <path d={ this.state.path } style={{ fillRule: 'evenodd' }} />
        </g>
        <g className="focus" ref="focus_path">
          <path d={ this.props.focusPath }></path>
        </g>
        <g className="control">
          { this.state.controls }
        </g>
        <g className="points">
          { this.state.points }
        </g>
        <style>{`
          .pager { width: 100%; height: 100%; }
          .outline path {fill: rgba(0, 0, 0, 0.3); stroke: black; stroke-width: 1;}
      		.focus path {fill: none; stroke-width: 2; stroke: lightskyblue;}
      		.control path {stroke: red;}
      		.points circle {fill: white; stroke: blue; stroke-width: 1;}
      		.points circle.selected {fill: lightskyblue;}
      		.points circle.control {fill: red; stroke: transparent;}
        `}</style>
      </svg>
    );
  }
}
