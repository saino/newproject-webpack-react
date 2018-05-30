import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findItem } from '../../../../utils/array-handle';
import config from '../../../../config';
import { Button } from 'antd';
import rootStyle from './roto-ai.css';
import style from './roto-operation-panel.css';
import RotoDownload from './RotoDownload';

class RotoOperationPanel extends Component {
  constructor(props) {
    super(props);

    // this.getIsGenerateMaterial = this.registerGetRotoMaterialInfo(rotoMaterial =>
    //   rotoMaterial[ 'is_generate_roto_material' ]
    // );

    // this.switchTypeHandle = (type) => () =>
    //   this.setState({
    //     visibleRotoOrPNG: type
    //   }, () => {
    //     const { visibleRotoOrPNG } = this.state;
    //     const isGeto = this.getIsGenerateMaterial();
    //
    //     if (!isGeto) {
    //       message.warning('请先生成抠像素材!!!');
    //       return;
    //     }
    //
    //     if (visibleRotoOrPNG) {
    //       post()
    //     } else {
    //       alert('kx');
    //     }
    //   });
    this.getAiId = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'ai_id' ]
    );

    this.getIsAllowDl = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'is_allow_dl' ]
    );

    this.dlRotoHandle = () => {
      const dlRotoURL = `${ config.fileUpload.host }:${ config.fileUpload.port }/data/rotos/${ this.getAiId() }/export/output.webm`;

      window.open(dlRotoURL, '_blank');
    };

    this.dlFrameHandle = () => {
      const dlFrameURL = `${ config.fileUpload.host }:${ config.fileUpload.port }/data/rotos/${ this.getAiId() }/export/frames.zip`;

      window.open(dlFrameURL, '_blank');
    };
  }

  registerGetRotoMaterialInfo(fn) {
    return () => {
      const { materialList, rfa } = this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);

      if (rotoMaterial == null) {
        return void 0;
      }

      return fn(rotoMaterial);
    };
  }

  render() {
    const allowDl = this.getIsAllowDl();

    return (
      <div className={ style[ 'wrapper' ] }>
        <div className={ style[ 'wrapper-inner' ] }>
          <RotoDownload />
        </div>
        <div className={ style[ 'action-type' ] }>
          <Button
            className={ `${ rootStyle[ 'ai-roto' ] } ${ style[ 'bbtn' ] }` }
            disabled={ !allowDl }
            onClick={ this.dlRotoHandle }>
            下载抠像素材
          </Button>
          <Button
            className={ `${ rootStyle[ 'ai-roto' ] } ${ style[ 'bbtn' ] }` }
            disabled={ !allowDl }
            onClick={ this.dlFrameHandle }>
            下载PNG序列帧
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  rotoMaterial,
  rotoFrontendActeractive
}) => ({
  materialList: rotoMaterial.list,
  rfa: rotoFrontendActeractive
});

export default connect(mapStateToProps)(RotoOperationPanel);
