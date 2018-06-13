import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import config from '../../../../../config';
import { Progress, Button } from 'antd';
import { aiRoto, saveRoto, updateRotoIsGeRoto, updateRotoIsAiRoto } from '../../../../../stores/action-creators/roto-frontend-acteractive-creator';
import { getAiRotos } from '../../../../../stores/action-creators/roto-creator';
import { post, error } from '../../../../../api/fetch';
import defferPerform from '../../../../../utils/deffer-perform';
import { finds, findItem } from '../../../../../utils/array-handle';
import { get, set, del } from '../../../../../utils/configure-auth';
import rotoAiStyle from '../roto-ai.css';
import startRotoPNG from '../start-roto.png';

class RotoAi extends Component {
  constructor(props) {
    super(props);

    this.state = { aiRotoPercent: void 0 };

    // 每次重新进入该组件，清空本地存储的ai抠像进度
    //del(``)

    // 定时器
    this.timer = null;

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
        roto => roto[ 'material_id' ] === materialId && roto.type === 'manual' && !!roto[ 'path_data' ].list.length
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

    // 获取是否开始生成抠像素材
    this.getIsGenerateMaterial = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'is_generate_roto_material' ]
    );

    // 获取生成抠像素材进度
    this.getGenerateMaterialPercent = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'generate_roto_material_percent' ]
    );

    // 获取materialId
    this.getMaterialId = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'material_id' ]
    );

    // 延迟100毫秒开启ai抠像
    this.deferAiRoto = defferPerform(materialId => {
      const { aiRoto } = this.props;
      const aiId = this.getAiId();

      aiRoto(materialId, aiId, true);
      //this.requestAiPercent(this.props, 2000);
    }, 100);

    this.aiRotoHandle = () => {
      const materialId = this.getMaterialId();
      const aiId = this.getAiId();

      del(`geRotoPercent${ materialId }`);

      this.saveRoto();
      this.deferAiRoto(materialId);
    }
  }

  saveRoto() {
    const { saveRoto } = this.props;
    const materialId = this.getMaterialId();
    const frames = this.getRotoFrames().map(frame => {
      return {
        frame: frame.frame,
        type: frame.type,
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

    saveRoto(materialId, frames);
  }

  requestAiPercent(props, howTime = 0) {
    const { aiRoto, updateRotoIsAiRoto, updateRotoIsGeRoto, getAiRotos } = props;
    const materialId = this.getMaterialId(props);
    const isAiRoto = this.getIsAiRoto(props);
    const aiId = this.getAiId(props);
    const { aiRotoPercent } = this.state;

    if (isAiRoto && aiRotoPercent < 100) {
      this.timer = setInterval(() =>
        post('/getProgress', { type: 'roto', object_id: aiId })
          .then(resp => {
            const { progress, complete } = resp;

            if (!complete) {
              set(`aiRotoPercent${ materialId }`, parseFloat(progress));
              this.setState({ aiRotoPercent: parseFloat(progress) });
            } else {
              clearInterval(this.timer);
              del(`aiRotoPercent${ materialId }`);
              this.setState({ aiRotoPercent: 0 }, () => {
                updateRotoIsAiRoto(materialId, false);
                updateRotoIsGeRoto(materialId, true);

                // 加载ai抠像
                getAiRotos(aiId, materialId);
              });
            }
          }
        )
        .catch(errorMessage => error(errorMessage.message, () => clearInterval(this.timer))),
        howTime
      )
    }
  }

  registerGetRotoMaterialInfo(fn) {
    return props => {
      const { materialList, rfa } = props || this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);

      if (rotoMaterial == null) {
        return void 0;
      }

      return fn(rotoMaterial);
    };
  }

  componentWillMount() {
    const aiRotoPercent = get(`aiRotoPercent${ this.getMaterialId() }`);

    this.setState({
      aiRotoPercent: aiRotoPercent == null ? 0 : aiRotoPercent,
    }, () =>
      this.requestAiPercent(this.props, 2000)
    );
  }

  // 抠像素材不一样，是否开始ai抠像状态不一样，抠像进度不一样
  validateIsResetRender(prevProps, nextProps) {
    const prevMaterialId = this.getMaterialId(prevProps);
    const prevIsAiRoto = this.getIsAiRoto(prevProps);
    const nextMaterialId = this.getMaterialId(nextProps);
    const nextIsAiRoto = this.getIsAiRoto(nextProps);

    return prevMaterialId !== nextMaterialId
      || prevIsAiRoto !== nextIsAiRoto;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.validateIsResetRender(this.props, nextProps)
      || this.state.aiRotoPercent !== nextState.aiRotoPercent;
  }

  render() {
    const filename = this.getMaterialProps()[ 'name' ];
    const isAiRoto = this.getIsAiRoto();
    const { aiRotoPercent } = this.state;

    return (
      <div className={ rotoAiStyle[ 'wrapper' ] }>
        <Button className={ rotoAiStyle[ 'ai-roto' ] } disabled={ isAiRoto } onClick={ this.aiRotoHandle }>
          {/*<img src={ startRotoPNG } />*/}
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

  componentDidUpdate() {
    const materialId = this.getMaterialId(this.props);
    const aiRotoPercent = get(`aiRotoPercent${ materialId }`);

    this.setState({
      aiRotoPercent: aiRotoPercent == null ? 0 : aiRotoPercent
    }, () => {
      clearInterval(this.timer);
      this.requestAiPercent(this.props, 2000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
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
  getAiRotos,
  saveRoto,
  updateRotoIsAiRoto,
  updateRotoIsGeRoto
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RotoAi);
