import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Snap from 'snapsvg-cjs';
import { flatten, findItem } from '../../../../utils/array-handle';
import style from './style.css';
import Point from '../../../../libs/Point';

class SVG extends Component {
  constructor(props) {
    super(props);

    this.paper = Snap();

    // 获取素材id
    this.getMaterialId = this.registerGetRotoMaterialInfo(
      rotoMaterial => rotoMaterial[ 'material_id' ]
    );

    // 获取素材Frame
    this.getMaterialFrame = this.registerGetRotoMaterialInfo(
      rotoMaterial => rotoMaterial[ 'selected_frame' ]
    );

    // 获取工具条操作类别
    this.getRotoToolType = this.registerGetRotoMaterialInfo(
      rotoMaterial => rotoMaterial[ 'roto_tool_type' ]
    );

    // 获取'mode'操作模式
    this.getMode = this.registerGetRotoInfo(
      roto => roto[ 'mode' ]
    );

    // 获取选择的'path'
    this.getPathSelected = this.registerGetRotoInfo(
      roto => roto[ 'path_selected' ]
    );

    this.getDrawMode = this.registerGetRotoInfo(
      roto => roto[ 'draw_mode' ]
    );

    // 获取'path'集合
    this.getPaths = this.registerGetRotoInfo(
      roto => roto[ 'path_data' ].list
    );

    // 获取扣像选中的'is_visible_mask'
    this.getIsVisibleMask = this.registerGetRotoInfo(
      roto => roto[ 'is_visible_mask' ]
    );

  }

  registerGetRotoMaterialInfo(fn) {
    return props => {
      const { rfa } = props || this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);

      return rotoMaterial == null ? void 0 : fn(rotoMaterial);
    };
  }

  registerGetRotoInfo(fn) {
    return props => {
      const { rotoList } = props || this.props;
      const materialId = this.getMaterialId(props || this.props);
      const materialFrame = this.getMaterialFrame(props || this.props);
      const roto = findItem(rotoList, item =>
        item[ 'material_id' ] === materialId
          && item[ 'frame' ] === materialFrame
      );

      return roto == null ? void 0 : fn(roto);
    };
  }

  getPathAndPointEls() {
    const pathSelected = this.getPathSelected();
    const paths = this.getPaths();
    const mode = this.getMode();
    const drawMode = this.getDrawMode();
    const pointEls = [];
    const controlPointEls = [];
    const maskPathEls = [];
    const focusPathEls = [];
    const controlPathEls = [];
    let pointSelected;
    let ctrls, ctrls1, ctrls2;
    let className = '';
    let focusPath;
    let draggingPoint;

    const pathEls = paths.map(path => {
      const isCurrPath = pathSelected.id === path.id;
      const svgPathEl = this.paper.path(path.svgStr());

      // 如果在编辑模式下选中了该path
      if (mode !== 0 && isCurrPath && path.isSelected) {
        className = 'selected';
      } else {
        className = '';
      }

      if (isCurrPath) {
        path.points.forEach(point => {
          pointEls.push(this.getPointEl(point, path.id));

          if (point.isSelected) {
            pointSelected = point;
            className = '';
            focusPath = path.prevPointByPoint(point).generatePath(true) + point.generatePath();
            focusPathEls.push(
              <path
                id={ path.id }
                key={ path.id }
                d={ this.paper.path(focusPath).node.getAttribute('d') } />
            )
          }
        });

        if (mode == 0) {
          // 画浮动'point'
          pointEls.push(this.getPointEl(path.floatingPoint, path.id, true));

          draggingPoint = drawMode === 2
            ? path.firstPoint()
            : path.floatingPoint;

          // 画控制点和控制线
          ctrls = this.getControlPointAndPathEl(path, draggingPoint, Point.CONTROL2, draggingPoint);
          controlPathEls.push(ctrls[ 1 ]);
          controlPointEls.push(ctrls[ 0 ]);
        }

        if (pointSelected) {
          pointSelected = findItem(path.points, 'id', pointSelected.liveControlPointId);
          // 显示选中点的控制点和控制杆
          ctrls = path.realSelected(pointSelected, false);
          // ctrlPoint1 = new Point(ctrls[0].x, ctrls[0].y, ctrls[0].cx1, ctrls[0].cy1, ctrls[0].cx2, ctrls[0].cy2);
          // ctrlPoint2 = new Point(ctrls[1].x, ctrls[1].y, ctrls[1].cx1, ctrls[1].cy1, ctrls[1].cx2, ctrls[1].cy2);
          ctrls1 = this.getControlPointAndPathEl(path, ctrls[ 1 ], Point.CONTROL1, ctrls[ 0 ], pointSelected.id);
          ctrls2 = this.getControlPointAndPathEl(path, ctrls[ 0 ], Point.CONTROL2, ctrls[ 0 ], pointSelected.id);
          controlPointEls.push(ctrls1[ 0 ]);
          controlPathEls.push(ctrls1[ 1 ]);
          controlPointEls.push(ctrls2[ 0 ]);
          controlPathEls.push(ctrls2[ 1 ]);
        }
      }

      maskPathEls.push(
        <path
          id={ path.id }
          fillRule="evenodd"
          key={ `m-${ path.id }`}
          d={ svgPathEl.node.getAttribute('d') } />
      );

      return (
        <path
          key={ path.id }
          className={ className }
          id={ path.id }
          d={ svgPathEl.node.getAttribute('d') } />
      );
    });

    return {
      pointEls,
      controlPointEls,
      pathEls,
      maskPathEls,
      focusPathEls,
      controlPathEls
    };
  }

  getControlPointAndPathEl(path, point, type, linkPoint, pointId) {
    if (!point || !point.hasControl(type)) {
      return [];
    }

    const ctrlPoint = point.getControl(type);
    let className = 'control';

    return [
      (
        <circle
          key={ point.id }
          id={ `${ path.id }-${ point.id }-${ pointId }-${ type }` }
          className={ className }
          cx={ ctrlPoint[ 0 ] }
          cy={ ctrlPoint[ 1 ] }
          r={ 3 } />
      ),
      (
        <path
          key={ `ctrl-${ point.id }` }
          d={ this.paper.path(linkPoint.generatePath(true) + 'L' + ctrlPoint[ 0 ] + ' ' + ctrlPoint[ 1 ]).node.getAttribute('d') } />
      )
    ];
  }

  getPointEl(point, pathId, isFloatingPoint) {
    const svgPointEl = this.paper.circle(point.x, point.y, 3);
    let className = '';
    let cx, cy, r;

    if (isFloatingPoint) {
      className = 'floating';
    }
    else if (point.isSelected) {
      className = 'selected';
    }
    else {
      className = '';
    }

    cx = svgPointEl.node.getAttribute('cx');
    cy = svgPointEl.node.getAttribute('cy');
    r = svgPointEl.node.getAttribute('r');

    return (
      <circle
        key={ point.id }
        id={ `${ pathId }-${ point.id }` }
        className={ className }
        cx={ cx }
        cy={ cy }
        r={ r } />
    );
  }

  render() {
    const {
      pointEls, controlPointEls, pathEls,
      maskPathEls, focusPathEls, controlPathEls } = this.getPathAndPointEls();
    const visibleDrawingClassName = this.getMode() === 0 && this.getRotoToolType() === 4;
    const visibleMovingClassName = this.getRotoToolType() === 1;
    const className = visibleDrawingClassName
      ? style[ 'drawing' ]
      : visibleMovingClassName
        ? style[ 'moving' ]
        : '';
    const isVisibleMask = this.getIsVisibleMask();
    console.log(visibleDrawingClassName, 'gggg');
    return (
      <svg className={ `${ style[ 'svg' ] } ${ className }` } id="svg_app">
        <g className={ style[ 'outline' ] }>
          { pathEls }
        </g>
        <g id="roto_path_focus" className={ style[ 'focus' ] }>
          { focusPathEls }
        </g>
        <g className={ style[ 'mask' ] }>
          { isVisibleMask ? maskPathEls : void 0 }
        </g>
        <g className={ style[ 'control' ] }>
          { controlPathEls }
        </g>
        <g className={ style[ 'points' ] }>
          { pointEls }
          { controlPointEls }
        </g>
      </svg>
    );
  }

  componentDidMount() {
    document.body.removeChild(this.paper.node);
  }
}

const mapStateToProps = ({
  rotoFrontendActeractive,
  roto
}) => ({
  rfa: rotoFrontendActeractive,
  rotoList: roto
});

export default connect(mapStateToProps)(SVG);
