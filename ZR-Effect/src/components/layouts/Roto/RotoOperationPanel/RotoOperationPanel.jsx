import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './roto-operation-panel.css';
import RotoDownload from './RotoDownload/RotoDownload';

class RotoOperationPanel extends Component {
  state = {
    // 显示 “生成扣像素材” 或 ”生成序列帧” 0-扣像素材 | 1-序列帧
    visibleRotoOrPNG: 0
  };

  switchTypeHandle = (type) => () =>
    this.setState({ visibleRotoOrPNG: type });

  render() {
    const { visibleRotoOrPNG } = this.state;

    return (
      <div className={ style[ 'wrapper' ] }>
        <div className={ style[ 'wrapper-inner' ] }>
          <RotoDownload />
        </div>
        <div className={ style[ 'action-type' ] }>
          <div className={ !visibleRotoOrPNG ? style[ 'active' ] : '' } onClick={ this.switchTypeHandle(0) }>下载抠像素材</div>
          <div className={ visibleRotoOrPNG ? style[ 'active' ] : '' } onClick={ this.switchTypeHandle(1) }>下载PNG序列帧</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  material,
  rotoFrontendActeractive
}) => ({
  materialList: material,
  rfa: rotoFrontendActeractive
});

export default connect(mapStateToProps)(RotoOperationPanel);
