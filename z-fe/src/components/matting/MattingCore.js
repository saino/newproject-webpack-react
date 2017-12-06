import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Point from './utils/Point';

export default class Core extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    dragging: PropTypes.bool,
    drawStatus: PropTypes.number,
    pathData: PropTypes.object
  };

  state = {
    points: [],
    focus: [],
    path: '',
    controls: []
  };

  drawPoint(prevPoints, prevControls, currPoint, otherPoint, isFloating) {
    let state = {}, exec;
    state.points = [ ...prevPoints, <circle cx={ currPoint.x } cy={ currPoint.y } r={ currPoint.radius } className={ isFloating ? 'floating' : '' }></circle> ];
    state.controls = [];

    if (currPoint.cx1) {
      exec = `${ otherPoint.generatePath(true) } L${ currPoint.cx1 } ${ currPoint.cy1 }`;
      console.log(prevPoints, 'gm');
      state.points = [ ...state.points, <circle cx={ currPoint.cx1 } cy={ currPoint.cy1 } r={ currPoint.radius } className="control"></circle> ];
      state.controls = [ ...prevControls, (<path d={ exec }></path>) ];

    } else if (currPoint.cx2) {
      exec = `${ currPoint.generatePath(true) } L${ currPoint.cx2 } ${ currPoint.cy2 }`;
      state.points = [ ...state.points, <circle cx={ currPoint.cx2 } cy={ currPoint.cy2 } r={ currPoint.radius } className="control"></circle> ];
      state.controls = [ ...prevControls, (<path d={ exec }></path>) ];
    }

    return state;
  }

  computePath(props) {
    let path = '';

    this.setState({
      points: [],
      controls: [],
    }, () => {
      const { pathData } = props;
      let state = {}, prevPoints, prevControls;

      prevPoints = pathData.points.map(point => (<circle cx={ point.x } cy={ point.y } r={ point.radius } className={ point.className }></circle>));
      prevControls = state.points || pathData.controls;

      if (pathData.floatingPoint) {
        let className = pathData.floatingPoint.cx1 ? 'control': pathData.floatingPoint.className;
        prevPoints = [...prevPoints, <circle cx={ pathData.floatingPoint.x } cy={ pathData.floatingPoint.y } r={ pathData.floatingPoint.radius } className={ className }></circle>];
        state = this.drawPoint(prevPoints, pathData.controls, pathData.floatingPoint, pathData.lastPoint(), true);
        pathData.controls[0] = state.controls.pop();
      }

      pathData.points.forEach((point, i) => {
        path += point.generatePath(i == 0);
        state = this.drawPoint(prevPoints, pathData.controls, point, pathData.prevPoint(i));
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
        <g className="focus"></g>
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
