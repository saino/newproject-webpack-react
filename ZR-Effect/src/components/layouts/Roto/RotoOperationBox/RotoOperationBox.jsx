import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { configureSelectedPath, configureDrawMode, configureDragging } from '../../../../stores/action-creators/roto-creator';
import { undo, configureZoom, configureRotoToolType } from '../../../../stores/action-creators/roto-creator';
import { findItem, findIndex } from '../../../../utils/array-handle';
import Path from '../../../../libs/Path';
import PathList from '../../../../libs/PathList';
import Point from '../../../../libs/Point';
import style from './style.css';
import SVG from './SVG';

class RotoOperationBox extends Component {
  constructor(props) {
    super(props);

    const pathData = new PathList;

    this.mouseDownHandle = (e) => {
      const { offX, offY } = this.getOffPosition(e.clientX, e.clientY);
      const { rotoMode, pathSelected, dragging, rotoDrawMode, pathData } = this.state;
      let updateObj = {};

      // 如果操作模式是钢笔工具
      if (rotoMode === 0) {
        // 是否在当前'path'进行操作，如果不存在1个'path'那么就创建'path'
        updateObj[ 'pathSelected' ] = pathSelected || pathData.lastEmpty();
        updateObj[ 'dragging' ] = true;

        // 如果当前画线模式是未开始
        if (rotoDrawMode === 0) {
          // 画浮动'point'
          updateObj[ 'pathSelected' ].floatingPoint = new Point(offX, offY);
          // 画线模式为未闭合
          updateObj[ 'rotoDrawMode' ] = 1;
        }
        // 如果当前画线模式是未闭合，并且点击到初始
        else if (rotoDrawMode === 1 && pathSelected.firstPoint().isInside(offX, offY)) {
          // 当点击起始point，如果pathSelected只有1个point的时候，那么就是未闭合状态，且删除该点
          // 如果大于1个point或者本身closed为true，则是闭合状态
          if (pathSelected.closePath()) {
            updateObj[ 'rotoDrawMode' ] = 2;
          } else {
            updateObj[ 'rotoDrawMode'] = 0;
          }

          updateObj[ 'pathSelected' ] = this.initPathSelected(pathSelected);
          this.configurePathDataList(pathSelected);
        }

        this.setState(updateObj);
      }
    };

    this.mouseMoveHandle = (e) => {
      const { offX, offY } = this.getOffPosition(e.clientX, e.clientY);
      const { rotoMode, pathSelected, dragging, rotoDrawMode, pathData } = this.state;
      let updateObj = {};

      // 如果是操作模式是钢笔工具并且存在正在画的"path"
      if (rotoMode === 0 && pathSelected) {
        // 如果是mouseup后
        if (!dragging) {
          // 如果还是在未闭合时
          if (pathSelected.floatingPoint || rotoDrawMode === 1) {
            // 不停的画'pathSelected'的浮动'point'
            pathSelected.floatingPoint = new Point(offX, offY);

            // 创建浮动'point'的控制杆，因为浮动'point'在mouseup后
            pathSelected.floatingPoint.setControl(
              Point.CONTROL1,
              pathSelected.lastPoint().getOppositeControl(Point.CONTROL2)
            );
            updateObj[ 'pathSelected' ] = this.initPathSelected(pathSelected);
            this.configurePathDataList(updateObj[ 'pathSelected' ]);
          }
        }
      }

      this.setState(updateObj);
    };

    this.mouseUpHandle = (e) => {
      const { offX, offY } = this.getOffPosition(e.clientX, e.clientY);
      const { rotoMode, pathSelected, dragging, rotoDrawMode, pathData } = this.state;
      let updateObj = {};

      // 如果是按下了mousedown键后
      if (dragging) {
        // 如果当前操作模式是钢笔工具，并且存在path，并且存在浮动'point'
        if (rotoMode === 0 && pathSelected && pathSelected.floatingPoint) {
          // 将floatingPoint添加到pathSelected里
          pathSelected.confirmFloating();
          updateObj[ 'pathSelected' ] = this.initPathSelected(pathSelected);
          this.configurePathDataList(updateObj[ 'pathSelected' ]);
        }

        // 结束拖拽
        updateObj[ 'dragging' ] = false;
      }

      // 如果是闭合了
      if (rotoDrawMode === 2) {
        updateObj[ 'rotoDrawMode' ] = 0;
        updateObj[ 'pathSelected' ] = false;
      }

      this.setState(updateObj);
    };

    // 获取素材id
    this.getMaterialId = this.registerGetMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'material_id' ]
    );

    // 获取素材frame
    this.getMaterialFrame = this.registerGetRotoInfo(rotoMaterial =>
      rotoMaterial[ 'selected_frame' ]
    );

    // 获取素材属性
    this.getMaterialProps = this.registerGetMaterialInfo(rotoMateria => {
      const { materialList } = this.props;
      const material = findItem(materialList, 'id', rotoMateria[ 'material_id' ]);

      return material[ 'properties' ];
    });

    // 获取扣像里操作模式
    this.getRotoMode = this.registerGetRotoInfo(roto =>
      roto[ 'mode' ]
    );

    // 获取扣像里画线模式
    this.getRotoDrawMode = this.registerGetRotoInfo(roto =>
      roto[ 'draw_mode' ]
    );

    // 获取扣像里选中的"path"
    this.getRotoPathSelected = this.registerGetRotoInfo(roto =>
      roto[ 'path_selected' ]
    );

    // 获取扣像里拖拽状态
    this.getRotoDragging = this.registerGetRotoInfo(roto =>
      roto[ 'dragging' ]
    );

    // 获取扣像里得到焦点的path
    this.getFocusPaths = this.registerGetRotoInfo(roto =>
      roto[ 'focus_paths' ]
    );

    this.state = {
      pathData,
      rotoMode: this.getRotoMode(),
      rotoDrawMode: this.getRotoDrawMode(),
      pathSelected:  this.getRotoPathSelected(),
      dragging: this.getRotoDragging(),
      focusPaths: this.getFocusPaths()
    };
  }

  // 初始化pathSelected
  initPathSelected(pathSelected) {
    const newPathSelected = new Path();

    newPathSelected.id = pathSelected.id;
    newPathSelected.points = [ ...pathSelected.points ];
    newPathSelected.floatingPoint = pathSelected.floatingPoint;
    newPathSelected.closed = pathSelected.closed;

    return newPathSelected;
  }

  // 更新pathData list
  configurePathDataList(pathSelected) {
    const { pathData } = this.state;
    let updateIndex = findIndex(pathData, ({ id }) => id === pathSelected.id)

    pathData.list.splice(updateIndex, 1, pathSelected);
  }

  registerGetMaterialInfo(fn) {
    return () => {
      const { rfa } = this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);

      if (rotoMaterial == null) {
        return void 0;
      }

      return fn(rotoMaterial);
    };
  }

  registerGetRotoInfo(fn) {
    return () => {
      const { rotoList } = this.props;
      const materialId = this.getMaterialId();
      const roto = findItem(rotoList, 'material_id', materialId);

      if (roto == null) {
        return void 0;
      }

      return fn(roto);
    };
  }

  resetEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  getOffPosition(clientX, clientY) {
    const el = findDOMNode(this);
    const { x, y } = el.getBoundingClientRect();

    return { offX: clientX - x, offY: clientY - y };
  }

  render() {
    const { width, height } = this.getMaterialProps();
    const {
      pathData, rotoMode, rotoDrawMode,
      pathSelected, dragging, focusPaths } = this.state;

    return (
      <div
        className={ style[ 'wrapper' ] }
        style={{ width, height }}
        onMouseDown={ this.mouseDownHandle }
        onMouseMove={ this.mouseMoveHandle }
        onMouseUp={ this.mouseUpHandle }>
        {/* 显示svg的point和path */}
        <SVG
          paths={ [ ...pathData.list ] }
          rotoMode={ rotoMode }
          rotoDrawMode={ rotoDrawMode }
          pathSelected={ pathSelected }
          dragging={ dragging }
          focusPaths={ [ ...focusPaths ] } />

        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = ({
  material,
  rotoFrontendActeractive,
  roto
}) => ({
  materialList: material,
  rfa: rotoFrontendActeractive,
  rotoList: roto
});

export default connect(mapStateToProps)(RotoOperationBox);
