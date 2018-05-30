/**
 * 解帧得到帧图片，利用canvas drawImage
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get, set } from '../../../../utils/configure-auth';
import { findItem } from '../../../../utils/array-handle';
import config from '../../../../config';
import style from './frame-img.css';

export default class FrameImg extends Component {
  static propTypes = {
    frame: PropTypes.number.isRequired,
    materialId: PropTypes.number.isRequired
  };

  state = {
    visibleFrame: false
  };

  showFrameHandle = () =>
    this.setState({ visibleFrame: true });

  hideFrameHandle = () =>
    this.setState({ visibleFrame: false });

  polishFrameDigit() {
    let frame = String(this.props.frame);
    let polishLen = 5 - frame.length;

    for (let i = 0; i < polishLen; i++) {
      frame = `0${ frame }`;
    }

    return frame;
  }

  validateIsResetRender(prevProps, nextProps) {
    return prevProps.materialId !== nextProps.materialId;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.validateIsResetRender(this.props, nextProps)
      || this.state.visibleFrame !== nextState.visibleFrame;    
  }

  render() {
    const { frame, materialId } = this.props;
    const { visibleFrame } = this.state;
    const { fileUpload: { host, port } } = config;
    const thumb = `${ host }:${ port }/data/materials/${ materialId }/sequence/thumb_${ this.polishFrameDigit() }.jpg`;

    return (
      <div className={ style[ 'wrapper' ] } onMouseEnter={ this.showFrameHandle } onMouseLeave={ this.hideFrameHandle }>
        <img src={ thumb } />

        { visibleFrame
          ? (
            <div className={ style[ 'wrapper-inner' ] }>
              <span>{ frame }</span>
            </div>
          )
          : void 0
        }
      </div>
    )
  }
}
