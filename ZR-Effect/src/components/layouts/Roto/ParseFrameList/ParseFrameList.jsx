import React, { Component } from 'react';
import config from '../../../../config';
import FrameImg from '../FrameImg/FrameImg';

export default class ParseFrameList extends Component {
  clickHandle = frame => () => this.props.onClick(frame);

  shouldComponentUpdate(nextProps) {
    return this.props.materialId !== nextProps.materialId
  }

  getFrameComs() {
    const { totalFrame, iterate } = this.props;
    const { width } = config.parseFrame;
    const coms = [];

    for (let frame = 1; frame <= totalFrame; frame += iterate) {
      coms.push(
        <li key={ `p_f_${ frame }` } onClick={ this.clickHandle(frame) }>
          <FrameImg width={ width } frame={ frame } displayFrame={ frame - 1 } />
        </li>
      );
    }

    return coms;
  }

  render() {
    return (
      <ul style={{ width: '100%' }}>
        { this.getFrameComs() }
      </ul>
    );
  }
}
