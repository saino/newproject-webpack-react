import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

export default class Tick extends PureComponent {

  static propTypes = {
    max: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    step: PropTypes.number,
    index: PropTypes.number,
    getSize: PropTypes.func
  };

  static defaultProps = {
    step: 5,
    index: 0
  };

  getStepComponents () {
    const res = [];

    for (let i = 1; i <= this.props.max; i++) {
      res.push(
        i % this.props.step == 0
          ? (<li>
              <div className="inner large">
                <label>
                  { i }{ this.props.unit }
                </label>
                <span></span>
              </div>
            </li>)
          : (<li>
              <div className="inner">
                <span></span>
              </div>
            </li>)
      );
    }

    return res;
  }

  render() {
    const { step, unit, index } = this.props;

    return (
      <div className="tick">
        <div className="tick-triangle" style={{ transform: `translateX(${ (index - 1) * 8 }px)` }}></div>
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
              border-bottom: 1px solid #909496;
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
