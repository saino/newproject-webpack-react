import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import config from '../../../../../config';
import { Progress, Button } from 'antd';
import { configureStartupAiRoto, configureAiRotoPercent } from '../../../../../stores/action-creators/roto-frontend-acteractive-creator';
import { findItem } from '../../../../../utils/array-handle';
import rotoAiStyle from './roto-ai.css';
import startRotoPNG from './start-roto.png';

class RotoAi extends Component {
  constructor(props) {
    super(props);

    // 获取扣像素材名
    this.getFilename = this.registerGetRotoMaterialInfo(rotoMaterial => {
      const { materialList } = this.props;
      const material = findItem(materialList, 'id', rotoMaterial[ 'material_id' ]);

      return config.getFilenameByPath(material.path);
    });

    // 获取是否开始ai扣像
    this.getIsAiRoto = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'is_ai_roto' ]
    );

    // 获取ai扣像进度
    this.getAiPercent = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'ai_roto_percent' ]
    );

    // 获取materialId
    this.getMaterialId = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'material_id' ]
    );

    this.aiRotoHandle = () => {
      const { configureStartupAiRoto } = this.props;
      const materialId = this.getMaterialId();

      configureStartupAiRoto(materialId);
    }
  }

  requestAiPercent(props) {
    const { configureAiRotoPercent } = props;
    const materialId = this.getMaterialId(props);
    const isAiRoto = this.getIsAiRoto(props);
    const aiPercent = this.getAiPercent(props);

    if (isAiRoto && aiPercent < 100) {
      configureAiRotoPercent();
    }
  }

  registerGetRotoMaterialInfo(fn) {
    return (props) => {
      const { materialList, rfa } = props || this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);

      if (rotoMaterial == null) {
        return void 0;
      }

      return fn(rotoMaterial);
    };
  }

  componentWillMount() {
    this.requestAiPercent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.requestAiPercent(nextProps);
  }

  render() {
    const filename = this.getFilename();
    const isAiRoto = this.getIsAiRoto();
    const aiRotoPercent = this.getAiPercent();

    return (
      <div className={ rotoAiStyle[ 'wrapper' ] }>
        <Button className={ rotoAiStyle[ 'ai-roto' ] } disabled={ isAiRoto } onClick={ this.aiRotoHandle }>
          <img src={ startRotoPNG } />
          <label>开始云端智能抠像</label>
        </Button>
        {
          isAiRoto && aiRotoPercent < 100
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
  rotoMaterial,
  rotoFrontendActeractive
}) => ({
  materialList: rotoMaterial.list,
  rfa: rotoFrontendActeractive
});

const mapDispatchToProps = dispatch => bindActionCreators({
  configureStartupAiRoto,
  configureAiRotoPercent
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RotoAi);
