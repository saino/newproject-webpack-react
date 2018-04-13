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

    // 获取'mode'操作模式
    this.getMode = this.registerGetRotoInfo(roto =>
      roto[ 'mode' ]
    );

    // 获取'path'集合
    this.getPaths = this.registerGetRotoInfo(roto =>
      roto[ 'path_data' ].list
    );

    // 获取'focus_path'集合
    this.getFocusPaths = this.registerGetRotoInfo(roto => {
      const { focusPaths } = this.props;
      return [];
      //return [ ...roto[ 'focus_paths' ], ...focusPaths ];
    });

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
    const paths = this.getPaths();
    const { pathSelected, rotoMode } = this.props;
    const paper = Snap();
    const pointEls = [];
    const maskPathEls = [];
    const pathEls = paths.map(path => {
      const isCurrPath = pathSelected.id === path.id;
      const svgPathEl = paper.path(path.svgStr());

      svgPathEl.node.path = path;

      if (isCurrPath) {
        path.points.forEach(point => {
          pointEls.push(this.getPointEl(point));
        });

        if (rotoMode == 0) {
          // 画浮动'point'
          pointEls.push(this.getPointEl(path.floatingPoint, true));
        }
      }

      maskPathEls.push(
        <path
          fill-rule="evenodd"
          key={ `m-${ path.id }`}
          d={ svgPathEl.node.getAttribute('d') } />
      );

      return (
        <path key={ path.id } d={ svgPathEl.node.getAttribute('d') } />
      );
    });

    return {
      pointEls,
      pathEls,
      maskPathEls
    };
  }

  getPointEl(point, isFloatingPoint) {
    const paper = Snap();
    const svgPointEl = paper.circle(point.x, point.y, 3);
    let className = '';
    let cx, cy, r;

    svgPointEl.node.point = point;

    if (isFloatingPoint) {
      className = 'floating';
    }

    if (className !== '') {
      svgPointEl.addClass(className);
    }

    cx = svgPointEl.node.getAttribute('cx');
    cy = svgPointEl.node.getAttribute('cy');
    r = svgPointEl.node.getAttribute('r');

    return (
      <circle key={ point.id } cx={ cx } cy={ cy } r={ r } />
    );
  }

  render() {
    const { pointEls, pathEls, maskPathEls } = this.getPathAndPointEls();
    const visibleDrawingClassName = this.getMode() === 0;

    return (
      <svg className={ `${ style[ 'svg' ] } ${ visibleDrawingClassName ? style[ 'drawing' ]: '' }` } id="svg_app">
        <g className={ style[ 'outline' ] }>
          { pathEls }
        </g>
        <g className={ style[ 'focus' ] }>
          { this.getFocusPaths() }
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
