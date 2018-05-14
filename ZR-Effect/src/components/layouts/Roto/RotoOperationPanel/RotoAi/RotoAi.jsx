import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import config from '../../../../../config';
import { Progress, Button } from 'antd';
import { aiRoto, saveRoto, configureAiRotoPercent } from '../../../../../stores/action-creators/roto-frontend-acteractive-creator';
import defferPerform from '../../../../../utils/deffer-perform';
import { finds, findItem } from '../../../../../utils/array-handle';
import rotoAiStyle from './roto-ai.css';
import startRotoPNG from './start-roto.png';

class RotoAi extends Component {
  constructor(props) {
    super(props);

    // 获取素材属性
    this.getMaterialProps = this.registerGetRotoMaterialInfo(rotoMaterial => {
      const { materialList } = this.props;

      return findItem(materialList, 'id', rotoMaterial[ 'material_id' ]);
    });

    // 获取抠像数据属性
    this.getRotoFrames = this.registerGetRotoMaterialInfo(rotoMaterial => {
      const { rotoList } = this.props;
      const materialId = rotoMaterial[ 'material_id' ];

      return finds(
        rotoList,
        roto => roto[ 'material_id' ] === materialId
      );
    });

    // 获取是否开始ai扣像
    this.getIsAiRoto = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'is_ai_roto' ]
    );

    // 获取ai抠像id
    this.getAiId = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'ai_id' ]
    );

    // 获取ai扣像进度
    this.getAiPercent = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'ai_roto_percent' ]
    );

    // 获取materialId
    this.getMaterialId = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'material_id' ]
    );

    // 延迟10毫秒开启ai抠像
    this.deferAiRoto = defferPerform(materialId => {
      const { aiRoto } = this.props;
      const aiId = this.getAiId();

      aiRoto(materialId, aiId);
    }, 100);

    this.aiRotoHandle = () => {
      const materialId = this.getMaterialId();

      this.saveRoto();
      this.deferAiRoto(materialId);
    }
  }

  saveRoto() {
    const materialId = this.getMaterialId();
    const frames = this.getRotoFrames().map(frame => {
      return {
        frame: frame.frame,
        type: 'manual',
        svg: frame[ 'path_data' ].list.map(path => ({
          points: path.points.map(point => ({
            x: point.x,
            y: point.y,
            cx1: point.cx1,
            cy1: point.cy1,
            cx2: point.cx2,
            cy2: point.cy2
          }))
        }))
      };
    });
    const { saveRoto } = this.props;

    saveRoto(materialId, frames);
  }

  requestAiPercent(props) {
    const { configureAiRotoPercent } = props;
    const materialId = this.getMaterialId(props);
    const isAiRoto = this.getIsAiRoto(props);
    const aiPercent = this.getAiPercent(props);
    const aiId = this.getAiId();

    if (isAiRoto && aiPercent < 100) {
      configureAiRotoPercent(materialId, aiId);
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
    const filename = this.getMaterialProps()[ 'name' ];
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
  roto,
  rotoFrontendActeractive
}) => ({
  materialList: rotoMaterial.list,
  rotoList: roto,
  rfa: rotoFrontendActeractive
});

const mapDispatchToProps = dispatch => bindActionCreators({
  aiRoto,
  saveRoto,
  configureAiRotoPercent
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RotoAi);
