import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { message } from 'antd';
import { findItem, findIndex } from '../../../../utils/array-handle';
import defferPerform from '../../../../utils/deffer-perform';
import {
  undo, configureZoom, addRotoedFrame,
  configureRotoToolType, configureRotoVisibleMask
} from '../../../../stores/action-creators/roto-frontend-acteractive-creator';
import { configure } from '../../../../stores/action-creators/roto-creator';
import rotoToolbarStyle from './roto-toolbar.css';
import savePNG from './save.png';
import addPointPNG from './add-point.png';
import finishRotoPNG from './finish-roto.png';
import movePointPNG from './move-point.png';
import rotoToolPNG from './roto-tool.png';
import selectPathPNG from './select-path.png';
import visibleMaskPNG from './visible-mask.png';
import zoomInPNG from './zoom-in.png';
import zoomOutPNG from './zoom-out.png';
import moveCanvasPNG from './move-canvas.png';
import backPNG from './back.png';
import Path from '../../../../libs/Path';

class RotoToolbar extends Component {
  constructor(props) {
    super(props);

    // 延迟执行设置扣像操作模式为画线模式
    this.defferRotoPen = defferPerform(() => {
      const { configure } = this.props;
      const materialId = this.getMaterialId();
      const materialFrame = this.getMaterialFrame();

      configure(materialId, materialFrame, { 'mode': 0 });
    });

    // 钢笔工具
    this.penHandle = () => {
      this.defferRotoPen();
      this.configureToolState(4);
    };

    // 延迟执行设置扣像操作模式为选择模式或编辑模式
    this.defferSelectEntry = defferPerform((modeVal) => {
      const { configure, addRotoedFrame } = this.props;
      const materialId = this.getMaterialId();
      const materialFrame = this.getMaterialFrame();
      const mode = this.getRotoMode();
      const pathSelected = this.getRotoPathSelected();
      let updateObj = { mode: modeVal };

      // 从钢笔工具模式转编辑模式
      if (mode === 0 && pathSelected) {
        pathSelected.closePath();

        updateObj[ 'draw_mode' ] = 0;
        updateObj[ 'path_selected' ] = false;
        updateObj[ 'dragging' ] = false;

        // 添加本地抠像
        addRotoedFrame(materialId, materialFrame);
      }

      configure(materialId, materialFrame, updateObj);
    });

    // 曲线选择工具
    this.selectEntryHandle = () => {
      this.defferSelectEntry(2);
      this.configureToolState(5);
    };

    // 延迟执行移动'point'或'point'
    this.defferMoveEntry = defferPerform(() => {
      const { configure } = this.props;
      const materialId = this.getMaterialId();
      const materialFrame = this.getMaterialFrame();

      configure(materialId, materialFrame, { 'mode': 1 });
    });

    // 移动'path'或'point'
    this.moveEntryHandle = () => {
      this.defferSelectEntry(1);
      this.configureToolState(6);
    };

    // 增加'point'
    this.addPointHandle = () => {
      this.defferSelectEntry(1);
      this.configureToolState(7);
    };

    // 延迟执行显示隐藏
    this.defferVisibleMask = () => {
      const { configure } = this.props;
      const materialId = this.getMaterialId();
      const materialFrame = this.getMaterialFrame();
      const isVisibleMask = this.getRotoIsVisibleMask();

      configure(materialId, materialFrame, { 'is_visible_mask': !isVisibleMask });
    };

    // 显隐阴影
    this.visibleMaskHandle = () => {
      this.defferVisibleMask();
      this.configureToolState(8);
    }

    this.backHandle = () => {
      const { undo } = this.props;
      const materialId = this.getMaterialId();
      const undoCount = this.getUndoCount();

      if (undoCount >= 3) {
        message.warning('只能撤销3次');
        return;
      }

      undo(materialId);
    };

    this.moveHandle = () =>
      this.configureToolState(1);

    this.zoomInHandle = () => {
      const materialId = this.getMaterialId();
      const { configureZoom } = this.props;

      configureZoom(materialId, 2, 'zoomIn');
    };

    this.zoomOutHandle = () => {
      const materialId = this.getMaterialId();
      const { configureZoom } = this.props;

      configureZoom(materialId, 3, 'zoomOut');
    };

    // 延迟执行设置抠像遮罩
    this.deferVisibleMask = defferPerform((materialId, isVisibleMask) => {
      const { configureRotoVisibleMask } = this.props;

      configureRotoVisibleMask(materialId, isVisibleMask);
    }, 10);

    // 统一设置工具状态
    this.configureToolState = (val) => {
      const { configureRotoToolType } = this.props;
      const materialId = this.getMaterialId();
      const isVisibleMask = this.getRotoIsVisibleMask();

      configureRotoToolType(materialId, val);
      this.deferVisibleMask(materialId, isVisibleMask);
    };

    this.rotoCompleteHandle = () => {
      const { addRotoedFrame } = this.props;
      const materialId = this.getMaterialId();
      const materialFrame = this.getMaterialFrame();

      this.defferRotoComplete();
      this.configureToolState(9);

      // 添加本地抠像
      addRotoedFrame(materialId, materialFrame);
    };

    // 延迟将工具状态设置为选中
    this.deferConfigureMoveToolSelect = defferPerform(() => {
      const { configureRotoToolType } = this.props;
      const materialId = this.getMaterialId();

      configureRotoToolType(materialId, 5);
    });

    this.defferRotoComplete = defferPerform(() => {
      const { configure } = this.props;
      const materialId = this.getMaterialId();
      const materialFrame = this.getMaterialFrame();
      const rotoDrawMode = this.getRotoDrawMode();
      const pathSelected = this.getRotoPathSelected();
      const pathData = this.getRotoPathData();
      const updateObj = {};

      if (pathSelected) {
        pathSelected.closePath();
      }

      updateObj[ 'mode' ] = 2;
      updateObj[ 'draw_mode' ] = 0;
      updateObj[ 'path_selected' ] = false;//this.initPathSelected(pathSelected);

      if (pathSelected) {
        this.configurePathDataList(pathSelected);
      }

      this.deferConfigureMoveToolSelect();
      configure(materialId, materialFrame, updateObj);
    }, 10);

    // 获取扣像舞台工具类别
    this.getRotoToolType = this.registerGetRotoActeractiveInfo(
      rotoMaterial => rotoMaterial[ 'roto_tool_type' ]
    );

    // 获取是否显示遮罩
    this.getRotoVisibleMask = this.registerGetRotoActeractiveInfo(
      rotoMaterial => rotoMaterial[ 'is_visible_mask' ]
    );

    // 获取素材id
    this.getMaterialId = this.registerGetRotoActeractiveInfo(
      rotoMaterial => rotoMaterial[ 'material_id' ]
    );

    // 获取选中'frame'
    this.getMaterialFrame = this.registerGetRotoActeractiveInfo(
      rotoMateria => rotoMateria[ 'selected_frame' ]
    );

    // 获取撤销次数
    this.getUndoCount = this.registerGetRotoActeractiveInfo(
      rotoMaterial => rotoMaterial[ 'undo_count' ]
    );

    // 获取扣像操作模式
    this.getRotoMode = this.registerGetRotoInfo(
      roto => roto[ 'mode' ]
    );

    // 获取扣像画线模式
    this.getRotoDrawMode = this.registerGetRotoInfo(
      roto => roto[ 'draw_mode' ]
    );

    // 获取扣像选中的'pathSelected'
    this.getRotoPathSelected = this.registerGetRotoInfo(
      roto => roto[ 'path_selected' ]
    );

    // 获取扣像选中的'pathData'
    this.getRotoPathData = this.registerGetRotoInfo(
      roto => roto[ 'path_data' ]
    );

    // 获取扣像选中的'is_visible_mask'
    this.getRotoIsVisibleMask = this.registerGetRotoInfo(
      roto => roto[ 'is_visible_mask' ]
    );
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
    const pathData = this.getRotoPathData();
    let updateIndex = findIndex(pathData.list, ({ id }) => id === pathSelected.id)

    pathData.list.splice(updateIndex, 1, pathSelected);
  }

  registerGetRotoActeractiveInfo(fn) {
    return props => {
      const { rfa } = props || this.props;
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

  shouldComponentUpdate(nextProps) {
    const prevToolType = this.getRotoToolType(this.props);
    const prevIsVisibleMask = this.getRotoVisibleMask(this.props);
    const nextToolType = this.getRotoToolType(nextProps);
    const nextIsVisibleMask = this.getRotoVisibleMask(nextProps);

    return prevToolType !== nextToolType || prevIsVisibleMask !== nextIsVisibleMask;
  }

  render() {
    const toolType = this.getRotoToolType();
    const isVisibleMask = this.getRotoVisibleMask();

    return (
      <div className={ rotoToolbarStyle[ 'wrapper' ] }>
        <div className={ rotoToolbarStyle[ 'wrapper-inner' ] }>
          <div className={ rotoToolbarStyle[ 'tool-save' ] }>
            <div className={ rotoToolbarStyle[ 'tool-save-inner' ] }>
              <img src={ savePNG } />
              <div>保存</div>
            </div>
          </div>
          <div className={ rotoToolbarStyle[ 'tool-list' ] }>
            <div className={ rotoToolbarStyle[ 'tool-list-inner' ] }>
              <div className={ rotoToolbarStyle[ 'tool-list-detail' ] }>
                <ul className={ rotoToolbarStyle[ 'tool-action-list' ] }>
                  <li onClick={ this.penHandle } title="钢笔工具" className={ toolType === 4 ? rotoToolbarStyle[ 'active' ] : '' }>
                    <img src={ rotoToolPNG } />
                  </li>
                  <li onClick={ this.selectEntryHandle } title="曲线选择" className={ toolType === 5 ? rotoToolbarStyle[ 'active' ] : '' }>
                    <img src={ selectPathPNG } />
                  </li>
                  <li onClick={ this.moveEntryHandle } title="移动曲线或点" className={ toolType === 6 ? rotoToolbarStyle[ 'active' ] : '' }>
                    <img src={ movePointPNG } />
                  </li>
                  <li onClick={ this.addPointHandle } title="增加节点" className={ toolType === 7 ? rotoToolbarStyle[ 'active' ] : '' }>
                    <img src={ addPointPNG } />
                  </li>
                  <li onClick={ this.visibleMaskHandle } title="显隐遮罩" className={ (toolType === 8 || isVisibleMask) ? rotoToolbarStyle[ 'active' ] : '' }>
                    <img src={ visibleMaskPNG } />
                  </li>
                  <li onClick={ this.rotoCompleteHandle } title="完成" className={ toolType === 9 ? rotoToolbarStyle[ 'active' ] : '' }>
                    <img src={ finishRotoPNG } />
                  </li>
                </ul>
                <div className={ rotoToolbarStyle[ 'tool-stage-list' ] }>
                  <li onClick={ this.backHandle } title="回退" className={ toolType === 0 ? rotoToolbarStyle[ 'active' ] : '' }>
                    <img src={ backPNG } />
                  </li>
                  <li onClick={ this.moveHandle } title="移动画布" className={ toolType === 1 ? rotoToolbarStyle[ 'active' ] : '' }>
                    <img src={ moveCanvasPNG } />
                  </li>
                  <li onClick={ this.zoomInHandle } title="放大画布" className={ toolType === 2 ? rotoToolbarStyle[ 'active' ] : '' }>
                    <img src={ zoomInPNG } />
                  </li>
                  <li onClick={ this.zoomOutHandle } title="缩小画布" className={ toolType === 3 ? rotoToolbarStyle[ 'active' ] : '' }>
                    <img src={ zoomOutPNG } />
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  rotoFrontendActeractive,
  rotoMaterial,
  roto
}) => ({
  rfa: rotoFrontendActeractive,
  materialList: rotoMaterial.list,
  rotoList: roto
});

const mapDispatchToProps = dispatch => bindActionCreators({
    undo,
    configureZoom,
    configureRotoToolType,
    configure,
    configureRotoVisibleMask,
    addRotoedFrame
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(RotoToolbar);
