import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import config from '../../../../config';
import { configureParseFramePercent } from '../../../../stores/action-creators/roto-frontend-acteractive-creator';
import FrameImg from '../FrameImg/FrameImg';

class ParseFrameList extends Component {
  constructor(props) {
    super(props);

    this.clickHandle = frame =>
      () => this.props.onClick(frame);

    this.frameLoadHandle = this.statisticalFrameLoad();

    this.loadedNum = 0;
  }


  statisticalFrameLoad() {
    const {
      totalFrame, iterate,
      configureParseFramePercent } = this.props;
    let maxNum = Math.floor(totalFrame / iterate);

    return () => {
      const { isParseFrame, materialId } = this.props;
      ++this.loadedNum;

      if (this.loadedNum >= maxNum) {
        configureParseFramePercent(materialId, 100);
      } else {
        configureParseFramePercent(materialId, parseFloat((this.loadedNum / maxNum * 100).toFixed(2)));
      }
    };
  }

  getFrameComs() {
    const { totalFrame, iterate } = this.props;
    const { width } = config.parseFrame;
    const coms = [];

    for (let frame = 1; frame <= totalFrame; frame += iterate) {
      coms.push(
        <li key={ `p_f_${ frame }` } onClick={ this.clickHandle(frame) }>
          <FrameImg
            width={ width }
            frame={ frame }
            displayFrame={ frame - 1 }
            onFrameLoad={ this.frameLoadHandle } />
        </li>
      );
    }

    return coms;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.materialId !== nextProps.materialId
  }

  componentDidUpdate() {
    this.loadedNum = 0;
  }

  render() {
    return (
      <ul style={{ width: '100%' }}>
        { this.getFrameComs() }
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ configureParseFramePercent }, dispatch);

export default connect(null, mapDispatchToProps)(ParseFrameList);
