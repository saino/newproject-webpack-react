import React, { Component, PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

export default class Core extends (PureComponent || Component) {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    dragging: PropTypes.bool,
    drawStatus: PropTypes.number,
    pathData: PropTypes.object,
    onAddPoint: PropTypes.func
  };

  state = {
    focus: [],
    controls: [],
    path: ''
  };

  drawPoint(currPoint, otherPoint, isFloating) {

  }

  computePath(props) {
    let path = '';

    this.setState({
      controls: []
    }, () => {
      const { pathData } = props;

      if (pathData.floatingPoint) {
        this.drawPoint(pathData.floatingPoint, pathData.lastPoint(), true);
      }

      pathData.points.forEach((point, i) => {
        path += point.generatePath(i == 0);
        this.drawPoint(point, pathData.prevPoint(i))
      });

      if (pathData.points.length > 0 && pathData.floatingPoint) {
        path += pathData.floatingPoint.generatePath();
      }

      if (pathData.closed) {
        path += pathData.firstPoint().generatePath();
		    path += 'Z';
      }

      this.setState({ path });
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
        <g className="control"></g>
        <g className="points">
          { this.props.pathData.points.map(({ x, y, radius }) => (<circle cx={ x } cy={ y } r={ radius }></circle>)) }
        </g>
        <style>{`
          .pager {
            width: 100%;
            height: 100%;
          }
          .points circle {
            fill: white;
            stroke: blue;
            stroke-width: 1;
          }
        `}</style>
      </svg>
    );
  }
}
