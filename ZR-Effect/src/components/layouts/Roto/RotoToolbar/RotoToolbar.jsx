import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { message } from 'antd';
import { findItem } from '../../../../utils/array-handle';
import { undo, configureZoom, configureRotoStageToolType } from '../../../../stores/action-creators/roto-frontend-acteractive-creator';
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

class RotoToolbar extends Component {
  constructor(props) {
    super(props);

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

    this.moveHandle = () => {
      const { configureRotoStageToolType } = this.props;
      const materialId = this.getMaterialId();

      configureRotoStageToolType(materialId, 1);
    };

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

    // 获取扣像舞台工具类别
    this.getRotoStageToolType = this.registerGetMaterialInfo(
      rotoMaterial => rotoMaterial[ 'roto_stage_tool_type' ]
    );

    // 获取素材id
    this.getMaterialId = this.registerGetMaterialInfo(
      rotoMaterial => rotoMaterial[ 'material_id' ]
    );

    // 获取撤销次数
    this.getUndoCount = this.registerGetMaterialInfo(
      rotoMaterial => rotoMaterial[ 'undo_count' ]
    );
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

  render() {
    const toolType = this.getRotoStageToolType();

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
                  <li title="钢笔工具">
                    <img src={ rotoToolPNG } />
                  </li>
                  <li title="曲线选择">
                    <img src={ selectPathPNG } />
                  </li>
                  <li title="移动曲线或点">
                    <img src={ movePointPNG } />
                  </li>
                  <li title="增加节点">
                    <img src={ addPointPNG } />
                  </li>
                  <li title="显隐遮罩">
                    <img src={ visibleMaskPNG } />
                  </li>
                  <li title="完成">
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
  material
}) => ({
  rfa: rotoFrontendActeractive,
  materialList: material
});

const mapDispatchToProps = dispatch => bindActionCreators({
    undo,
    configureZoom,
    configureRotoStageToolType
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(RotoToolbar);
