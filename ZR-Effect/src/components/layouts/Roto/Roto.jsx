import React, { Component } from 'react';
/* 路由跳转前验证 -- start */
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
/* 路由跳转前验证 -- end */
import rotoStyle from './roto.css';
import Header from '../../containers/Header/Header';
import MaterialList from './MaterialList/MaterialList';
import RotoMaterialList from './RotoMaterialList/RotoMaterialList';
import RotoToolbar from './RotoToolbar/RotoToolbar';
import RotoOperationPanel from './RotoOperationPanel/RotoOperationPanel';

class Matting extends Component {
  state = {
    // 检测是否存在该用户信息的state，用来做登录跳转
    redirectToReferrer: false,
    // 中间区域是显示添加扣像素材还是帧图片
    // 0-显示帧图片 | 1-添加扣像素材
    showAddMaterialOrFrameImg: 0
  };

  openMaterialListComponent = () =>
    this.setState({ showAddMaterialOrFrameImg: 1 });

  render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div className={ rotoStyle[ 'wrapper' ] }>
        <div className={ rotoStyle[ 'wrapper-inner' ] }>
          <div className={ rotoStyle[ 'header' ] }>
            {/* 头部 */}
            <Header />
          </div>
          <div className={ rotoStyle[ 'content' ] }>
            <div className={ rotoStyle[ 'left' ] }>
              {/* 扣像素材列表 */}
              <RotoMaterialList onAddMaterial={ this.openMaterialListComponent } />
            </div>
            <div className={ rotoStyle[ 'middle' ] }>
              <div className={ rotoStyle[ 'middle-inner' ] }>
                <div className={ rotoStyle[ 'canvas' ] }>
                  <div className={ rotoStyle[ 'canvas-inner' ] }>
                    {/* 画布还是素材列表 */}
                    { this.state.showAddMaterialOrFrameImg
                      ? (
                        <MaterialList />
                      )
                      : void 0
                    }
                  </div>
                </div>
                <div className={ rotoStyle[ 'toolbar' ] }>
                  {/* 扣像工具条 */}
                  <RotoToolbar />
                </div>
              </div>
            </div>
            <div className={ rotoStyle[ 'right' ] }>
              {/* 扣像操作面板 */}
              <RotoOperationPanel />
            </div>
          </div>
          <div className={ rotoStyle[ 'footer' ] }>

          </div>
        </div>
      </div>
    );

    return null;
  }
}

const mapStateToProps = ({ app }) => ({ token: app.token });

export default connect(mapStateToProps)(Matting);
