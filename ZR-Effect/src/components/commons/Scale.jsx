import React, { Component } from 'react';
import PropTypes from 'prop-types';
import commonComStyle from './common.com.css';
import config from '../../config';
import Draggable from 'react-draggable';

export default class Scale extends Component {
  static propTypes = {
    currTick: PropTypes.number,
    maxTick: PropTypes.number.isRequired,
    onChangeTick: PropTypes.func,
    onEnd: PropTypes.func
  };

  static defaultProps = {
    currTick: 1,
    onChangeTick: () => {},
    onEnd: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      actualWidth: 0,
      parentWidth: void 0
    };

    this.tempTick = this.props.currTick;
  }

  movingTickHandle = ({ clientX }) => {
    const { onChangeTick } = this.props;
    const tick = this.getTickByLeft(clientX);

    if (tick != null && tick !== this.tempTick) {
      this.tempTick = tick;
      onChangeTick(tick);
    }
  };

  movedTickHandle = ({ clientX }) => {
    const { onEnd } = this.props;
    const tick = this.getTickByLeft(clientX);

    if (tick != null) {
      this.tempTick = tick;
      onEnd(tick);
    }
  };

  getTickByLeft(clientX) {
    let { maxTick } = this.props;
    const offsetX = this.getTickOffsetX(clientX);
    let tick = offsetX - config.tick.posLeft === config.tick.gap ? 1 : Math.floor((offsetX + 3.5 - config.tick.posLeft)  / config.tick.gyro);

    maxTick = this.getMaxTick(maxTick);

    if (tick < 1) {
      return;
    }
    else if (tick > maxTick) {
      return;
    }

    return tick;
  }

  getTickOffsetX(clientX) {
    return clientX - this.el.getBoundingClientRect().x;
  }

  getMaxTick(oldMaxTick) {
    const { actualWidth } = this.state;

    return (oldMaxTick - 1) * config.tick.gyro >= actualWidth
      ? oldMaxTick
      : Math.floor(actualWidth / config.tick.gyro);
  }

  getTickComs() {
    const coms = [];
    let { maxTick } = this.props;
    let className, i;

    maxTick = this.getMaxTick(maxTick);

    for (i = 1; i <= maxTick; i++) {
      className = (i === 1 || i % 5 === 0) ? commonComStyle[ 'large-tick' ] : commonComStyle[ 'small-tick' ];

      coms.push(
        <span key={ `t_${ i }` } className={ `${ commonComStyle[ 'tick' ] } ${ className }` }></span>
      );
    }

    return coms;
  }

  configureParentWidth(width) {
    const { maxTick } = this.props;
    const visualWidth = (maxTick - 1) * config.tick.gyro;
    let parentWidth = visualWidth > width ? visualWidth : width;

    this.setState({ parentWidth });
  }

  configureActualWidth(width) {
    this.setState({ actualWidth: width });
  }

  componentWillReceiveProps(nextProps) {
    this.tempTick = nextPoint.currTick;
  }

  render() {
    const { currTick, children } = this.props;
    const { actualWidth, parentWidth } = this.state;
    const tickPosLeft = currTick === 1 ? config.tick.posLeft : (currTick - 1) * config.tick.gyro + config.tick.posLeft;
    const defPosX = [  ]

    return (
      <div ref={ el => this.el = el } className={ commonComStyle[ 'scale-box' ] }>
        <div className={ commonComStyle[ 'scale-box-inner' ] }>
          <div className={ commonComStyle[ 'scale-box-actual' ] } style={{ width: actualWidth }}>
            <div className={ commonComStyle[ 'scale-box-actual-inner' ] } style={{ width: parentWidth }}>
              { actualWidth ? this.getTickComs() : void 0 }
              <div className={ commonComStyle[ 'scale-bottom-bar' ] }></div>
            </div>
          </div>
          <Draggable axis="x"
            onDrag={ this.movingTickHandle }
            onStop={ this.movedTickHandle }>
            <i style={{ left: tickPosLeft }}></i>
          </Draggable>
          { children }
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.configureParentWidth(this.el.offsetWidth);
    this.configureActualWidth(this.el.offsetWidth);
  }
}
