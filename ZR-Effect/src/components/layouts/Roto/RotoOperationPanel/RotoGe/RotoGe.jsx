import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { post, error } from '../../../../../api/fetch';
import { finds, findItem } from '../../../../../utils/array-handle';
import { get, set, del } from '../../../../../utils/configure-auth';
import { geRoto, updateRotoIsGeRoto, setDl } from '../../../../../stores/action-creators/roto-frontend-acteractive-creator';
import { Progress, Button } from 'antd';
import rotoAiStyle from '../roto-ai.css';
import startRotoPNG from '../start-roto.png';

class RotoGe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      geRotoPercent: void 0
    };

    // 定时器
    this.timer = null;

    // 获取抠像id
    this.getAiId = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'ai_id' ]
    );

    this.getIsAiRoto = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'is_ai_roto' ]
    );

    this.getIsGenerateMaterial = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'is_generate_roto_material' ]
    );

    this.getIsDisabledBtn = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'is_disabled_roto_material_btn' ]
    );

    // 获取materialId
    this.getMaterialId = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'material_id' ]
    );

    this.geRotoHandle = () => {
      const { geRoto } = this.props;
      const materialId = this.getMaterialId();
      const aiId = this.getAiId();

      geRoto(materialId, aiId);
    };
  }

  requestGePercent(props, howTime) {
    return;
    const { updateRotoIsGeRoto, setDl } = props;
    const materialId = this.getMaterialId(props);
    const isGeRoto = this.getIsGenerateMaterial(props);
    const aiId = this.getAiId(props);
    const isAiRoto = this.getIsAiRoto();
    const { geRotoPercent } = this.state;

    if (!isGeRoto && geRotoPercent < 100 && aiId > 0 && !isAiRoto) {
      this.timer = setInterval(() =>
        post('/getProgress', { type: 'export', object_id: aiId })
          .then(resp => {
            const { progress, complete } = resp;

            if (!complete) {
              set(`geRotoPercent${ materialId }`, parseFloat(progress));
              this.setState({ geRotoPercent: parseFloat(progress) });
            } else {
              clearInterval(this.timer);
              set(`geRotoPercent${ materialId }`, parseFloat(progress));
              setDl(materialId, true);
              this.setState({ geRotoPercent: parseFloat(progress) }, () => updateRotoIsGeRoto(materialId, false));
            }
          }
        )
        .catch(errorMessage => {
          error(errorMessage.message, () => clearInterval(this.timer))
        }),
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
    const materialId = this.getMaterialId();
    const geRotoPercent = get(`geRotoPercent${ materialId }`) || void 0;

    this.setState({
      geRotoPercent
    }, () => this.requestGePercent(this.props, 2000));
  }

  validateIsResetRender(prevProps, nextProps) {
    const prevMaterialId = this.getMaterialId(prevProps);
    const prevIsGeRoto = this.getIsGenerateMaterial(prevProps);
    const nextMaterialId = this.getMaterialId(nextProps);
    const nextIsGeRoto = this.getIsGenerateMaterial(nextProps);

    return prevMaterialId !== nextMaterialId
      || prevIsGeRoto !== nextIsGeRoto;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.validateIsResetRender(this.props, nextProps)
      || this.state.geRotoPercent !== nextState.geRotoPercent;
  }

  componentDidUpdate() {
    const materialId = this.getMaterialId(this.props);
    const isGenerateMaterial = this.getIsGenerateMaterial(this.props);
    const geRotoPercent = get(`geRotoPercent${ materialId }`) || 0;

    this.setState({
      geRotoPercent
    }, () => {
      clearInterval(this.timer);
      this.requestGePercent(this.props, 2000);
    });

    // this.setState({
    //   geRotoPercent: geRotoPercent,
    // }, () => {
    //   clearInterval(this.timer);
    //   this.requestGePercent(this.props, 2000);
    // });
  }

  render() {
    const { geRotoPercent } = this.state;
    const aiId = this.getAiId();
    const isAiRoto = this.getIsAiRoto();
    const isGeRoto = this.getIsGenerateMaterial();
    const isDable = this.getIsDisabledBtn();

    return (
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Button className={ rotoAiStyle[ 'ai-roto' ] } disabled={ isDable } onClick={ this.geRotoHandle }>
          {/*<img src={ startRotoPNG } />*/}
          <label>开始生成抠像素材</label>
        </Button>
        {
          !isGeRoto && geRotoPercent < 100 && aiId > 0 && !isAiRoto
            ? (
                <div className={ rotoAiStyle[ 'roto-percent' ] }>
                  <div className={ rotoAiStyle[ 'percent-inner' ] }>
                    <div className={ rotoAiStyle[ 'percent' ] }>
                      <div>
                        <Progress percent={ geRotoPercent } />
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

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
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
  geRoto,
  updateRotoIsGeRoto,
  setDl
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RotoGe);
