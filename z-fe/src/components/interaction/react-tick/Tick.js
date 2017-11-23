import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

function changeTick (i) {
  return function () {
    this.props.onChangeTick(i);
  }
}

export default class Tick extends PureComponent {

  static propTypes = {
    unit: PropTypes.string.isRequired,
    max: PropTypes.number,
    step: PropTypes.number,
    index: PropTypes.number,
    getSize: PropTypes.func,
    onChangeTick: PropTypes.func
  };

  static defaultProps = {
    max: 0,
    step: 5,
    index: 0,
    onChangeTick: () => {}
  };

  getStepComponents () {
    const res = [];

    for (let i = 1; i <= this.props.max; i++) {
      res.push(
        i % this.props.step == 0
          ? (<li onClick={ changeTick(i).bind(this) }>
              <div className="inner large">
                <label>
                  { i }{ this.props.unit }
                </label>
                <span></span>
              </div>
            </li>)
          : (<li onClick={ changeTick(i).bind(this) }>
              <div className="inner">
                <span></span>
              </div>
            </li>)
      );
    }

    return res;
  }

  render() {
    const { step, unit, index, max } = this.props;

    return (
      <div className="tick">
        { max
           ? (<div className="tick-triangle" style={{ transform: `translateX(${ (index - 1) * 8 }px)` }}></div>)
           : void 0 }

        <ul className="clearfix">
          { this.getStepComponents() }
        </ul>

        <style>{
          `
            .tick {
              position: absolute;
              left: 0;
              top: 0;
              height: -webkit-calc(100% - 10px);
              color: #6b7580;
              padding: 0 4px;
            }

            .tick-triangle {
              position: absolute;
              width: 0;
              height: 0;
              border-bottom: 4px solid #be624b;
              border-left: 4px solid transparent;
              border-right: 4px solid transparent;
              left: 0;
              bottom: -10px;
            }

            .tick ul {
              height: 100%;
              white-space: nowrap;
            }

            .tick ul li {
              display: inline-block;
              height: 100%;
              vertical-align: top;
              border-bottom: 1px solid #909496;
            }

            .tick ul li:last-of-type {
              border: 0 none;
            }

            .tick ul .inner {
              display: flex;
              flex-flow: column nowrap;
              height: 100%;
              width: 8px;
              justify-content: flex-end;
              align-items: stretch;
            }

            .tick ul .inner span {
              flex-basis: 4px;
              width: 1px;
              background: #909496;
            }

            .tick ul .inner label {
              line-height: 1;
            }

            .tick ul .inner.large {
              justify-content: space-between;
            }

            .tick ul .inner.large span {
              flex-basis: 8px;
            }

          `
        }
        </style>
      </div>
    );
  }

  componentDidUpdate() {
    const el = findDOMNode(this);

    this.props.getSize({ width: el.clientWidth, height: el.clientHeight });
  }

}
