import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findItem } from '../../../../utils/array-handle';
import style from './material-mapping-frame-img.css';

class MaterialMappingFrameImg extends Component {
  static propTypes = {
    frame: PropTypes.number.isRequired,
    isPlay: PropTypes.bool
  };

  getMaterial = (props) => {
    const { materialList, rfa } = props || this.props;
    const selectedRotoMaterial = findItem(rfa, 'is_selected', true);
    const material = findItem(materialList, 'id', selectedRotoMaterial[ 'material_id' ]);

    return material;
  };

  getMsFrame(frameLength, duration) {
    const frameRate = duration / frameLength;

    return frameRate.toFixed(3);
  }

  setCurrTime() {
    const { frame } = this.props;
    const { properties: { duration, length } } = this.getMaterial();
    const totalMs = this.getMsFrame(length, duration) * frame;

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
    console.log(this.props.frame, 'render')
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
    console.log(this.props.frame, 'update')
    if (isPlay) {
      this.videoEl.play();
    } else {
      this.videoEl.pause();
      this.setCurrTime();
    }
  }

  componentWillUnmount() {
    const { onClearPlayTimer } = this.props;

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

export default connect(mapStateToProps)(MaterialMappingFrameImg);
