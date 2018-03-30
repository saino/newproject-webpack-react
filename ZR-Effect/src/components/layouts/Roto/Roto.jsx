import React, { Component } from 'react';
/* 路由跳转前验证 -- start */
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
/* 路由跳转前验证 -- end */
import rotoStyle from './roto.css';
import Header from '../../containers/Header/Header';
import RotoMaterialList from './RotoMaterialList/RotoMaterialList';
import RotoToolbar from './RotoToolbar/RotoToolbar';
import RotoOperationPanel from './RotoOperationPanel/RotoOperationPanel';

class Matting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 检测是否存在该用户信息的state
      redirectToReferrer: false
    };
  }

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
              <RotoMaterialList />
            </div>
            <div className={ rotoStyle[ 'middle' ] }>
              <div className={ rotoStyle[ 'middle-inner' ] }>
                <div className={ rotoStyle[ 'canvas' ] }>
                  <div className={ rotoStyle[ 'canvas-inner' ] }>

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
