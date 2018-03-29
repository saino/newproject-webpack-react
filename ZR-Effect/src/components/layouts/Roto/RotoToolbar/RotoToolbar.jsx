import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  render() {
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
                  <li title="回退">
                    <img src={ backPNG } />
                  </li>
                  <li title="移动画布">
                    <img src={ moveCanvasPNG } />
                  </li>
                  <li title="放大画布">
                    <img src={ zoomInPNG } />
                  </li>
                  <li title="缩小画布">
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

const mapStateToProps = ({ rotoFrontendActeractive }) => ({
  rfa: rotoFrontendActeractive
});

export default connect(mapStateToProps)(RotoToolbar);
