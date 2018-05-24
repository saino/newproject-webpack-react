import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import rotoedFrameListStyle from './rotoed-frame-list.css';
import { findItem } from '../../../../../utils/array-handle';
import config from '../../../../../config';
import { selectedFrame } from '../../../../../stores/action-creators/roto-frontend-acteractive-creator';
import FrameImg from '../../FrameImg/FrameImg';

class RotoedFrameList extends Component {
  constructor(props) {
    super(props);

    this.getMaterialId = this.registerGetRotoActeractiveInfo(
      rotoMaterial => rotoMaterial[ 'material_id' ]
    );
    this.getRotoedFrames = this.registerGetRotoActeractiveInfo(
      rotoMaterial => rotoMaterial[ 'rotoed_frames' ]
    );
  }

  selectedFrameHandle = (frame) => () => {
    const { selectedFrame } = this.props;
    const materialId = this.getMaterialId();

    selectedFrame(materialId, frame);
  };

  getParseFrameCom() {
    const rotoedFrames = this.getRotoedFrames();
    const materialId = this.getMaterialId();
    const coms = [];
    let frame;

    for (let i = 0; i < rotoedFrames.length; i++) {
      frame = rotoedFrames[ i ];

      coms.push(
        <li key={ `p_f_${ i }` } onClick={ this.selectedFrameHandle(frame) }>
          <FrameImg materialId={ materialId } frame={ frame } />
        </li>
      );
    }

    return (
      <ul>{ coms }</ul>
    );
  }

  registerGetRotoActeractiveInfo(fn) {
    return props => {
      const { rfa } = props || this.props;
      const rotoMaterial = findItem(rfa, 'is_selected', true);

      if (rotoMaterial == null) {
        return void 0;
      }

      return fn(rotoMaterial);
    };
  }

  // 抠像素材不一样，抠像数据里的本地帧个数不一样
  validateIsResetRender(prevProps, nextProps) {
    const prevMaterialId = this.getMaterialId(prevProps);
    const prevRotoedFrames = this.getRotoedFrames(prevProps);
    const nextMaterialId = this.getMaterialId(nextProps);
    const nextRotoedFrames = this.getRotoedFrames(nextProps);

    return prevMaterialId !== nextMaterialId || prevRotoedFrames.length !== nextRotoedFrames.length;
  }

  shouldComponentUpdate(nextProps) {
    return this.validateIsResetRender(this.props, nextProps);
  }

  render() {
    return (
      <div className={ rotoedFrameListStyle[ 'wrapper' ] }>
        <div className={ rotoedFrameListStyle[ 'wrapper-inner' ] }>
            <label>已抠像的关键帧序列</label>
            <div className={ rotoedFrameListStyle[ 'list' ] }>
              { this.getParseFrameCom() }
            </div>
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
  rfa: rotoFrontendActeractive,
});

const mapDispatchToProps = dispatch => bindActionCreators({ selectedFrame }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RotoedFrameList);
