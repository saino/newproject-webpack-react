import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { message } from 'antd';
import { configure } from '../../../../stores/action-creators/roto-creator';
import { findItem, findIndex } from '../../../../utils/array-handle';
import style from './style.css';
import SVG from './SVG';
import Path from '../../../../libs/Path';
import PathList from '../../../../libs/PathList';
import Point from '../../../../libs/Point';
import ClickTimer from '../../../../libs/ClickTimer';

class RotoOperationBox extends Component {
  constructor(props) {
    super(props);

    this.clickTimer = new ClickTimer;
    //this.moveControl =

    // 删除'path'或'point'
    this.removeHandle = (e) => {
      const { configure } = this.props;
      const materialId = this.getMaterialId();
      const materialFrame = this.getMaterialFrame();
      const pathSelected = this.getRotoPathSelected();
      const pathData = this.getPathData();
      const rotoMode = this.getRotoMode();
      const updateObj = {};
      let point;

      if (e.keyCode) {
        if (rotoMode !== 0 && pathSelected) {
          point = findItem(pathSelected.points, 'isSelected', true);

          // 如果选中了'point'
          if (point) {
            pathSelected.removePoint(point);

            // 删除完最后1个点，则删除整条'path'
            if (pathSelected.points.length <= 1) {
              pathData.delPath(pathSelected);
              updateObj[ 'pathSelected' ] = false;
            } else {
              updateObj[ 'pathSelected' ] = this.initPathSelected(pathSelected);
            }

          }
          // 选中了'path'
          else {
            pathData.delPath(pathSelected);
            updateObj[ 'pathSelected' ] = false;
          }

          configure(materialId, materialFrame, updateObj);
        }
      }
    };

    this.mouseDownHandle = (e) => {
      const { configure } = this.props;
      const materialId = this.getMaterialId();
      const materialFrame = this.getMaterialFrame();
      const rotoToolType = this.getRotoToolType();
      const pathData = this.getPathData();
      const rotoMode = this.getRotoMode();
      const rotoDrawMode = this.getRotoDrawMode();
      const pathSelected = this.getRotoPathSelected();
      const dragging = this.getRotoDragging();
      const focusPaths = [];
      const { offX, offY } = this.getOffPosition(e.clientX, e.clientY);
      const updateObj = {};

      let path, point, entryIds, pathId, pointId, realPointId, type;

      // 如果操作模式是钢笔工具并且操作条类别是钢笔工具
      if (rotoMode === 0 && rotoToolType === 4) {
        updateObj[ 'dragging' ] = true;

        // 如果当前画线模式是未开始
        if (rotoDrawMode === 0) {
          // 闭合后，画线模式就是未开始，所以需要重新创建1条新'path'
          updateObj[ 'path_selected' ] = pathData.lastEmpty();
          // 画浮动'point'
          updateObj[ 'path_selected' ].floatingPoint = new Point(offX, offY);
          // 画线模式为未闭合
          updateObj[ 'draw_mode' ] = 1;
        }
        // 如果当前画线模式是未闭合，并且点击到初始
        else if (rotoDrawMode === 1 && pathSelected.firstPoint().isInside(offX, offY)) {
          // 当点击起始point，如果pathSelected只有1个point的时候，那么就是未闭合状态，且删除该点
          // 如果大于1个point或者本身closed为true，则是闭合状态
          // if (pathSelected.closePath()) {
          //   updateObj[ 'draw_mode' ] = 2;
          // } else {
          //   updateObj[ 'draw_mode'] = 0;
          // }
          //
          // updateObj[ 'path_selected' ] = this.initPathSelected(pathSelected);
          // this.configurePathDataList(pathSelected);
        }

        configure(materialId, materialFrame, updateObj);
        //this.setState(updateObj);
      }
      // 如果操作模式是编辑，并且选中工具类别也是编辑
      else if (rotoMode === 1 && rotoToolType === 5) {
        entryIds = e.target.getAttribute('id')
          ? e.target.getAttribute('id').split('-')
          : [];

        // 如果选中了点
        if (entryIds.length > 1) {
          pathId = entryIds[ 0 ], pointId = entryIds[ 1 ], type = entryIds[ 2 ], realPointId = entryIds[3];
          pathId = pathId.charAt(0) === 'c' ? +pathId.slice(2) : +pathId;
          pointId = pointId.charAt(0) === 'c' ? +pointId.slice(2) : +pointId;
          path = findItem(pathData.list, 'id', pathId);
          point = findItem(path.points, 'id', pointId);

          // 对point双击
          if (this.clickTimer.isOn(point)) {
            const i = pathSelected.indexOf(point);
            let next = pathSelected.nextPoint(i);

            // 如果有控制点，就删除所有控制点
            if (point.hasControl(Point.CONTROL2) || next.hasControl(Point.CONTROL1)) {
              point.removeControl(Point.CONTROL2);
              next.removeControl(Point.CONTROL1);
            }
            // 没有控制点的节点就增加控制点
            else {
              let prev = pathSelected.prevPoint(i);
              let vector = next.subtract(prev).normalize();
              let ctrl1 = point.add(vector.normalize(point.subtract(prev).length() / 3));
              let ctrl2 = point.subtract(vector.normalize(point.subtract(next).length() / 3));
              point.setControl(Point.CONTROL2, [ ctrl2.x, ctrl2.y ]);
              next.setControl(Point.CONTROL1, [ ctrl1.x, ctrl1.y ]);
            }

            this.clickTimer.turnOff();
          } else {
            if (e.target.getAttribute('class') !== 'control') {
              path.points = this.clearPointSelected(path.points);
              point.isSelected = true;
              point.type = false;
              this.clickTimer.turnOn(point);
            } else {
              point = findItem(path.points, 'id', +realPointId);
              point.type = +type;
            }
          }

          updateObj[ 'path_selected' ] = this.initPathSelected(path);
          this.configurePathDataList(updateObj[ 'path_selected' ]);
        }
        // 如果选中了path
        else if (entryIds.length === 1) {
          pathId = +entryIds[ 0 ], pointId = void 0;
          path = findItem(pathData.list, 'id', pathId);

          // 避免没有'path'选中svg容器导致报错
          if (path) {
            //updateObj[ 'pathSelected' ] = this.initPathSelected(pathData.findInside(offX, offY, pathSelected) || path);
            this.clearPathSelected();
            path.points = this.clearPointSelected(path.points);
            path.isSelected = true;

            updateObj[ 'path_selected' ] = this.initPathSelected(path);
            this.configurePathDataList(updateObj[ 'path_selected' ]);
          }
        }
        // 没选中任何'path'或'point'
        else {
          updateObj[ 'path_selected' ] = false;
        }

        if (updateObj[ 'path_selected' ]) {
          updateObj[ 'dragging' ] = true;
        }

        configure(materialId, materialFrame, updateObj);
      }
      // 如果操作模式是编辑，并且是移动'point'和'path'
      else if (rotoMode === 1 && rotoToolType === 6) {
        updateObj[ 'dragging' ] = true;
        updateObj[ 'move_x' ] = offX;
        updateObj[ 'move_y' ] = offY;

        configure(materialId, materialFrame, updateObj);
      }
    };

    this.mouseMoveHandle = (e) => {
      const { configure } = this.props;
      const materialId = this.getMaterialId();
      const materialFrame = this.getMaterialFrame();
      const rotoToolType = this.getRotoToolType();
      const pathData = this.getPathData();
      const rotoMode = this.getRotoMode();
      const rotoDrawMode = this.getRotoDrawMode();
      const pathSelected = this.getRotoPathSelected();
      const dragging = this.getRotoDragging();
      const moveX = this.getMoveX();
      const moveY = this.getMoveY();
      const focusPaths = [];
      const { offX, offY } = this.getOffPosition(e.clientX, e.clientY);
      const updateObj = {};
      let entryIds, pathId, pointId, path, point, p;

      // 如果是操作模式是钢笔工具并且存在正在画的"path"
      if (rotoMode === 0 && pathSelected && rotoToolType === 4) {
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

            p = pathSelected.firstPoint();

            if (pathSelected.points.length > 1 && p.isInside(offX, offY)) {
              pathSelected.floatingPoint.setControl(
                Point.CONTROL2,
                p.getControl(Point.CONTROL2)
              );
            }

            updateObj[ 'path_selected' ] = this.initPathSelected(pathSelected);
            this.configurePathDataList(updateObj[ 'path_selected' ]);
          }
        }
        // 如果是按住鼠标不放的进行移动
        else {
          if (rotoDrawMode === 1) {
            pathSelected.floatingPoint.setControl(
              Point.CONTROL2,
              pathSelected.floatingPoint.getOppositeControl([ offX, offY ])
            );
            updateObj[ 'path_selected' ] = this.initPathSelected(pathSelected);
            this.configurePathDataList(updateObj[ 'path_selected' ]);
          }
        }

        configure(materialId, materialFrame, updateObj);
      }
      // 如果是进行移动'path'或'point'
      else if (rotoMode === 1 && dragging && rotoToolType === 6) {
        const point = findItem(pathSelected.points, 'isSelected', true);

        // 如果选中了点
        if (point) {
          // 选中了点旁边的控制点
          pathSelected.movePoint(point, offX - moveX, offY - moveY, point.type);
        }
        // 如果选中了'path'
        else if (pathSelected
          && pathSelected.isSelected
          && pathData.findInside(offX, offY, pathSelected)
        ) {
          pathSelected.move(offX - moveX, offY - moveY);
        }

        updateObj[ 'move_x' ] = offX;
        updateObj[ 'move_y' ] = offY;

        configure(materialId, materialFrame, updateObj);


        // 如果选中了某'path'
        // if (pathSelected
        //     && pathSelected.isSelected
        //     && pathData.findInside(offX, offY, pathSelected)) {
        //
        // }
      }
    };

    this.mouseUpHandle = (e) => {
      const { configure } = this.props;
      const materialId = this.getMaterialId();
      const materialFrame = this.getMaterialFrame();
      const rotoToolType = this.getRotoToolType();
      const rotoMode = this.getRotoMode();
      const rotoDrawMode = this.getRotoDrawMode();
      const pathSelected = this.getRotoPathSelected();
      const dragging = this.getRotoDragging();
      const focusPaths = [];
      const { offX, offY } = this.getOffPosition(e.clientX, e.clientY);
      const updateObj = {};

      // 如果是按下了mousedown键后
      if (dragging && rotoToolType === 4) {
        // 如果当前操作模式是钢笔工具，并且存在path，并且存在浮动'point'
        if (rotoMode === 0 && pathSelected && pathSelected.floatingPoint) {
          // 将floatingPoint添加到pathSelected里
          pathSelected.confirmFloating();
          pathSelected.floatingPoint = new Point(offX, offY);
          updateObj[ 'path_selected' ] = this.initPathSelected(pathSelected);

          this.configurePathDataList(updateObj[ 'path_selected' ]);
        }
        // 结束拖拽
        updateObj[ 'dragging' ] = false;

        configure(materialId, materialFrame, updateObj);
      }
      else if (dragging && rotoToolType === 5) {
        updateObj[ 'dragging' ] = false;

        configure(materialId, materialFrame, updateObj);
      }
      else if (dragging && rotoToolType === 6) {
        updateObj[ 'dragging' ] = false;

        configure(materialId, materialFrame, updateObj);
      }

      // // 如果是闭合了
      // if (rotoDrawMode === 2) {
      //   updateObj[ 'draw_mode' ] = 0;
      //   updateObj[ 'path_selected' ] = false;
      // }


    };

    // 获取素材id
    this.getMaterialId = this.registerGetMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'material_id' ]
    );

    // 获取素材frame
    this.getMaterialFrame = this.registerGetMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'selected_frame' ]
    );

    // 获取工具条操作类别
    this.getRotoToolType = this.registerGetMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'roto_tool_type' ]
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

    // 获取扣像里选中的'path'
    this.getRotoPathSelected = this.registerGetRotoInfo(roto =>
      roto[ 'path_selected' ]
    );

    // 获取扣像里拖拽状态
    this.getRotoDragging = this.registerGetRotoInfo(roto =>
      roto[ 'dragging' ]
    );

    // 获取扣像里得到焦点的'path'
    this.getFocusPaths = this.registerGetRotoInfo(roto =>
      roto[ 'focus_paths' ]
    );

    // 获取'path_data'
    this.getPathData = this.registerGetRotoInfo(roto =>
      roto[ 'path_data' ]
    );

    // 获取'moveX'
    this.getMoveX = this.registerGetRotoInfo(roto =>
      roto[ 'move_x' ]
    );

    // 获取'moveY'
    this.getMoveY = this.registerGetRotoInfo(roto =>
      roto[ 'move_y' ]
    );
  }

  // 清除所有的path的选中状态
  clearPathSelected() {
    const pathData = this.getPathData();

    pathData.list = pathData.list.map(path => {
      path.isSelected = false;

      return path;
    });
  }

  // 清除path中的所有point的选中状态
  clearPointSelected(points) {
    return points.map(point => {
      point.isSelected = false;

      return point;
    });
  }

  // 初始化pathSelected
  initPathSelected(pathSelected) {
    const newPathSelected = new Path();

    newPathSelected.id = pathSelected.id;
    newPathSelected.isSelected = pathSelected.isSelected;
    newPathSelected.points = [ ...pathSelected.points ];
    newPathSelected.floatingPoint = pathSelected.floatingPoint;
    newPathSelected.closed = pathSelected.closed;

    return newPathSelected;
  }

  // 更新pathData list
  configurePathDataList(pathSelected) {
    const pathData = this.getPathData();
    let updateIndex = findIndex(pathData.list, ({ id }) => id === pathSelected.id)

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
      const materialFrame = this.getMaterialFrame();
      const roto = findItem(rotoList, (item) =>
        item[ 'material_id' ] === materialId
          && item[ 'frame' ] === materialFrame
      );

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
    const pathData = this.getPathData();
    const rotoMode = this.getRotoMode();
    const rotoDrawMode = this.getRotoDrawMode();
    const pathSelected = this.getRotoPathSelected();
    const dragging = this.getRotoDragging();
    const focusPaths = [];

    return (
      <div
        className={ style[ 'wrapper' ] }
        style={{ width, height }}
        onMouseDown={ this.mouseDownHandle }
        onMouseMove={ this.mouseMoveHandle }
        onMouseUp={ this.mouseUpHandle }>
        {/* 显示svg的point和path */}
        <SVG />

        { this.props.children }
      </div>
    );
  }

  componentDidMount() {
    // 绑定body事件，用来监听点击'backspace'键删除'path'或'point'
    document.body.addEventListener('keyup', this.removeHandle, false)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.removeHandle, false);
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ configure }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RotoOperationBox);
