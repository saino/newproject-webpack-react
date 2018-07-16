import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findItem } from '../../../../utils/array-handle';
//import { configureIsPlay } from '../../../../stores/action-creators/roto-frontend-acteractive-creator';
import style from './material-mapping-frame-img.css';

class MaterialMappingFrameImg extends Component {
  static propTypes = {
    frame: PropTypes.number.isRequired,
    isPlay: PropTypes.bool,
    materialId: PropTypes.number
  };

  // playEndHandle = () => {
  //   const { configureIsPlay, materialId } = this.props;
  //   console.log('播放完成！！！');
  //   configureIsPlay(materialId, false);
  // };

  getMaterial = (props) => {
    const { materialList, rfa } = props || this.props;
    const selectedRotoMaterial = findItem(rfa, 'is_selected', true);
    const material = findItem(materialList, 'id', selectedRotoMaterial[ 'material_id' ]);

    return material;
  };

  setCurrTime() {
    const { frame } = this.props;
    const { properties } = this.getMaterial();
    const totalMs = (frame + 0.35) / properties.fps + (properties.start_time == null ? 0 : properties.start_time);

    this.videoEl.currentTime = totalMs;
  }

  // 避免不必要的渲染就是如果当前抠像素材变化或帧变化
  validateIsResetRender(prevProps, nextProps) {
    const prevMaterialId = this.getMaterial(prevProps)[ 'id' ];
    const prevFrame = prevProps.frame;
    const prevIsPlay = prevProps.isPlay;
    const nextMaterialId = this.getMaterial(nextProps)[ 'id' ];
    const nextFrame = nextProps.frame;
    const nextIsPlay = nextProps.isPlay;

    return prevMaterialId !== nextMaterialId
      || prevIsPlay !== nextIsPlay
      || (nextIsPlay === false && prevFrame !== nextFrame);
  }

  shouldComponentUpdate(nextProps) {
    return this.validateIsResetRender(this.props, nextProps);
  }

  render() {
    const { path, properties: { width, height } } = this.getMaterial();

    return (
      <div className={ style[ 'wrapper' ] }>
        <video
          ref={ el => this.videoEl = el }
          style={{ width, height }}
          src={ path }
          crossOrigin="use-credentials" />
      </div>
    );
  }

  componentDidUpdate() {
    const { isPlay } = this.props;

    if (isPlay) {
      this.videoEl.play();
    } else {
      // if (!this.videoEl.paused) {
      //   this.videoEl.pause();
      // }
      this.videoEl.pause();
      this.setCurrTime();
    }
  }

  componentDidMount() {
    this.setCurrTime();

    // 监听当前视频播放完成后事件
    // 将当前播放状态改为不在播放状态
    //this.videoEl.addEventListener('ended', this.playEndHandle, false);
  }

  componentWillUnmount() {
    const { onClearPlayTimer } = this.props;

    //this.videoEl.removeEventListener('ended', this.playEndHandle, false);
    onClearPlayTimer(this.getMaterial().id);
  }
}

const mapStateToProps = ({
  rotoMaterial,
  rotoFrontendActeractive
}) => ({
  materialList: rotoMaterial.list,
  rfa: rotoFrontendActeractive
});

//const mapDispatchToProps = dispatch => bindActionCreators({ configureIsPlay }, dispatch)

export default connect(mapStateToProps)(MaterialMappingFrameImg);
