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

  movedTickHandle = ({ clientX, offsetX }) => {
    const { onEnd } = this.props;
    const tick = this.getTickByLeft(clientX);
    const x = this.el.getBoundingClientRect().x;

    if (tick != null) {
      this.tempTick = tick;
      onEnd(tick);
    }
  };

  getTickByLeft(clientX) {
    let { maxTick } = this.props;
    const offsetX = this.getTickOffsetX(clientX);
    let tick = offsetX === config.tick.gap ? 1 : Math.floor((offsetX + 3.5)  / config.tick.gyro);
    console.log(tick, 'tk');
    maxTick = this.getMaxTick(maxTick);

    if (tick < 0) {
      return;
    }
    else if (tick >= maxTick) {
      return;
    }

    return tick;
  }

  getTickOffsetX(clientX) {
    return clientX - this.el.getBoundingClientRect().x;
  }

  getMaxTick(oldMaxTick) {
    const { actualWidth } = this.state;

    return oldMaxTick * config.tick.gyro >= actualWidth
      ? oldMaxTick
      : Math.floor(actualWidth / config.tick.gyro);
  }

  getTickComs() {
    const coms = [];
    let { maxTick } = this.props;
    let className, i;

    maxTick = this.getMaxTick(maxTick);

    for (i = 0; i < maxTick; i++) {
      className = i % 5 === 0 ? commonComStyle[ 'large-tick' ] : commonComStyle[ 'small-tick' ];

      coms.push(
        <span key={ `t_${ i }` } className={ `${ commonComStyle[ 'tick' ] } ${ className }` }></span>
      );
    }

    return coms;
  }

  configureParentWidth(width) {
    const { maxTick } = this.props;
    const visualWidth = maxTick * config.tick.gyro;
    let parentWidth = visualWidth > width ? visualWidth : width;

    this.setState({ parentWidth });
  }

  configureActualWidth(width) {
    this.setState({ actualWidth: width });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currTick !== this.props.currTick) {
      this.tempTick = nextProps.currTick;
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.currTick != null;
  }

  render() {
    const { currTick, children } = this.props;
    const { actualWidth, parentWidth, tempX } = this.state;
    const tickPosLeft = currTick === 0 ? 0 : currTick * config.tick.gyro;

    return (
      <div ref={ el => this.el = el } className={ commonComStyle[ 'scale-box' ] }>
        <div className={ commonComStyle[ 'scale-box-inner' ] }>
          <div className={ commonComStyle[ 'scale-box-actual' ] } style={{ width: actualWidth }}>
            <div className={ commonComStyle[ 'scale-box-actual-inner' ] } style={{ width: parentWidth }}>
              { actualWidth ? this.getTickComs() : void 0 }
              <div className={ commonComStyle[ 'scale-bottom-bar' ] }></div>
            </div>
          </div>
          <Draggable
            axis="x"
            position={{ x: tickPosLeft, y: 0 }}
            onDrag={ this.movingTickHandle }
            onStop={ this.movedTickHandle }>
            <i></i>
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
