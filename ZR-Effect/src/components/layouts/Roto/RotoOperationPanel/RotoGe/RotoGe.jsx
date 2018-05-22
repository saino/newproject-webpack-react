import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { post } from '../../../../../api/fetch';
import { finds, findItem } from '../../../../../utils/array-handle';
import { get, set } from '../../../../../utils/configure-auth';
import { geRoto, updateRotoIsGeRoto } from '../../../../../stores/action-creators/roto-frontend-acteractive-creator';
import { Progress, Button } from 'antd';
import rotoAiStyle from '../roto-ai.css';
import startRotoPNG from '../start-roto.png';

class RotoGe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      geRotoPercent: void 0,
      isGeRotoAction: void 0
    };

    // 定时器
    this.timer = null;

    // 获取抠像id
    this.getAiId = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'ai_id' ]
    );

    this.getIsGenerateMaterial = this.registerGetRotoMaterialInfo(rotoMaterial =>
      rotoMaterial[ 'is_generate_roto_material' ]
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
      setTimeout(() => {
        set(`isGeRotoAction${ materialId }`, true);
        this.setState({ isGeRotoAction: true }, () => this.requestGePercent(this.props, 2000));
      }, 10);
      //this.setState({ isGeRotoAction: true }, () => geRoto(materialId, aiId));
    };
  }

  requestGePercent(props, howTime) {
    const { updateRotoIsGeRoto } = props;
    const materialId = this.getMaterialId(props);
    const isGeRoto = this.getIsGenerateMaterial(props);
    const aiId = this.getAiId(props);
    const { geRotoPercent, isGeRotoAction } = this.state;
    console.log(isGeRoto, geRotoPercent, isGeRotoAction, 'waiwang');
    if (!isGeRoto && geRotoPercent < 100 && isGeRotoAction) {
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
              set(`isGeRotoAction${ materialId }`, false);
              this.setState({ geRotoPercent: parseFloat(progress), isGeRotoAction: false }, () => updateRotoIsGeRoto(materialId, false));
            }
          }
        ),
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
    const geRotoPercent = get(`geRotoPercent${ materialId }`);
    const isGeRotoAction = get(`isGeRotoAction${ materialId }`);

    this.setState({
      geRotoPercent: geRotoPercent,
      isGeRotoAction: !!isGeRotoAction
    }, () => this.requestGePercent(this.props));
  }

  componentWillReceiveProps(nextProps) {
    const prevMaterialId = this.getMaterialId(this.props);
    const nextMaterialId = this.getMaterialId(nextProps);
    const geRotoPercent = get(`geRotoPercent${ nextMaterialId }`);
    const isGeRotoAction = get(`isGeRotoAction${ nextMaterialId }`);

    this.setState({
      geRotoPercent: geRotoPercent,
      isGeRotoAction: !!isGeRotoAction
    }, () => {
      if (prevMaterialId !== nextMaterialId) {
        clearInterval(this.timer);
      }

      if (this.state.isGeRotoAction) {
        this.requestGePercent(this.props, 2000);
      }
    });
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

  render() {
    const { geRotoPercent, isGeRotoAction } = this.state;
    const isGeRoto = this.getIsGenerateMaterial();
    console.log('rotoge');
    return (
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Button className={ rotoAiStyle[ 'ai-roto' ] } disabled={ isGeRoto } onClick={ this.geRotoHandle }>
          <img src={ startRotoPNG } />
          <label>开始生成抠像素材</label>
        </Button>
        {
          !isGeRoto && geRotoPercent < 100 && isGeRotoAction
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
  updateRotoIsGeRoto
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RotoGe);
