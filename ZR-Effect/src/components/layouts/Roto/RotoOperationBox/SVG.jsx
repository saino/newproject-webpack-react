import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Snap from 'snapsvg-cjs';
import { flatten, findItem } from '../../../../utils/array-handle';
import style from './style.css';

class SVG extends Component {
  constructor(props) {
    super(props);

    // 获取素材id
    this.getMaterialId = this.registerGetMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'material_id' ]
    );

    // 获取素材Frame
    this.getMaterialFrame = this.registerGetMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'selected_frame' ]
    );

    // 获取工具条操作类别
    this.getRotoToolType = this.registerGetMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'roto_tool_type' ]
    );

    // 获取'mode'操作模式
    this.getMode = this.registerGetRotoInfo(roto =>
      roto[ 'mode' ]
    );

    // 获取选择的'path'
    this.getPathSelected = this.registerGetRotoInfo(roto =>
      roto[ 'path_selected' ]
    );

    // 获取'path'集合
    this.getPaths = this.registerGetRotoInfo(roto =>
      roto[ 'path_data' ].list
    );

    // 获取'control_point'集合
    this.getControlPoints = this.registerGetRotoInfo(roto => {
      const { controlPoints } = this.props;

      return [];
    });
  }

  registerGetMaterialInfo(fn) {
    return () => {
      const { rfa } = this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);

      return rotoMaterial == null ? void 0 : fn(rotoMaterial);
    };
  }

  registerGetRotoInfo(fn) {
    return () => {
      const { rotoList } = this.props;
      const materialId = this.getMaterialId();
      const materialFrame = this.getMaterialFrame();
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
    const paper = Snap();
    const pointEls = [];
    const maskPathEls = [];
    const focusPathEls = [];
    let className = '';
    let focusPath;
    console.log(paths, 'paths');
    const pathEls = paths.map(path => {
      const isCurrPath = pathSelected.id === path.id;
      const svgPathEl = paper.path(path.svgStr());

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
            className = '';
            focusPath = path.prevPointByPoint(point).generatePath(true) + point.generatePath();
            focusPathEls.push(
              <path
                id={ path.id }
                key={ path.id }
                d={ paper.path(focusPath).node.getAttribute('d') } />
            )
          }
        });

        // if (mode == 0) {
        //   // 画浮动'point'
        //   pointEls.push(this.getPointEl(path.floatingPoint, path.id, true));
        // }
      }

      maskPathEls.push(
        <path
          id={ path.id }
          fill-rule="evenodd"
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
      pathEls,
      maskPathEls,
      focusPathEls
    };
  }

  getPointEl(point, pathId, isFloatingPoint) {
    const paper = Snap();
    const svgPointEl = paper.circle(point.x, point.y, 3);
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
    const { pointEls, pathEls, maskPathEls, focusPathEls } = this.getPathAndPointEls();
    const visibleDrawingClassName = this.getMode() === 0 && this.getRotoToolType() === 4;

    return (
      <svg className={ `${ style[ 'svg' ] } ${ visibleDrawingClassName ? style[ 'drawing' ]: '' }` } id="svg_app">
        <g className={ style[ 'outline' ] }>
          { pathEls }
        </g>
        <g className={ style[ 'focus' ] }>
          { focusPathEls }
        </g>
        <g className={ style[ 'mask' ] }>
          { maskPathEls }
        </g>
        <g className={ style[ 'control' ] }>
          { this.getControlPoints() }
        </g>
        <g className={ style[ 'points' ] }>
          { pointEls }
        </g>
      </svg>
    );
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
