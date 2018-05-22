import React, { Component } from 'react';
import config from '../../../../config';
import FrameImg from '../FrameImg/FrameImg';

export default class ParseFrameList extends Component {
  constructor(props) {
    super(props);

    this.clickHandle = frame =>
      () => this.props.onClick(frame);
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

  render() {
    return (
      <ul style={{ width: '100%' }}>
        { this.getFrameComs() }
      </ul>
    );
  }
}
