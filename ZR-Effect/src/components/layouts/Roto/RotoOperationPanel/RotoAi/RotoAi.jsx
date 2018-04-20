import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress, Button } from 'antd';
import config from '../../../../../config';
import { findItem } from '../../../../../utils/array-handle';
import rotoAiStyle from './roto-ai.css';
import startRotoPNG from './start-roto.png';

class RotoAi extends Component {
  constructor(props) {
    super(props);

    // 获取扣像素材名
    this.getFilename = this.registerGetMaterialInfo(rotoMaterial => {
      const { materialList } = this.props;
      const material = findItem(materialList, 'id', rotoMaterial[ 'material_id' ]);

      return config.getFilenameByPath(material.path);
    });

    // 获取是否开始ai扣像
    this.getIsAiRoto = this.registerGetMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'is_ai_roto' ]
    );

    // 获取ai扣像进度
    this.getAiPercent = this.registerGetMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'ai_roto_percent' ]
    );

    // 获取materialId
    this.getMaterialId = this.registerGetMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'material_id' ]
    );

    this.aiRotoHandle = () => {
      const { onAiRoto } = this.props;

      onAiRoto(this.getMaterialId());
    }
  }

  registerGetMaterialInfo(fn) {
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
    const filename = this.getFilename();
    const isAiRoto = this.getIsAiRoto();
    const aiRotoPercent = this.getAiPercent();

    return (
      <div className={ rotoAiStyle[ 'wrapper' ] }>
        <Button className={ rotoAiStyle[ 'ai-roto' ] } disabled={ isAiRoto } onClick={ this.aiRotoHandle }>
          <img src={ startRotoPNG } />
          <label>开始云端智能扣像</label>
        </Button>
        {
          isAiRoto && aiRotoPercent > 0
            ? (
              <div className={ rotoAiStyle[ 'roto-percent' ] }>
                <div className={ rotoAiStyle[ 'percent-inner' ] }>
                  <label>{ filename }</label>
                  <div className={ rotoAiStyle[ 'percent' ] }>
                    <div>
                      <Progress percent={ aiRotoPercent } />
                    </div>
                  </div>
                </div>
              </div>
            )
            : void 0
        }
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

export default connect(mapStateToProps)(RotoAi);
