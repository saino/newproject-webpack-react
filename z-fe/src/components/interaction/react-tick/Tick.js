import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Tick extends PureComponent {

  static propTypes = {
    max: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    step: PropTypes.number,
    index: PropTypes.number
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
      <div className="tick-out">
        <div className="tick-triangle" style={{ transform: `translateX(${ (index - 1) * 8 }px)` }}></div>
        <div className="tick" ref={ el => this.el = el }>
          <div className="bottom">
            <ul className="clearfix">
              { this.getStepComponents() }
            </ul>
          </div>
        </div>
        <style>{
          `
            .tick-out {
              position: relative;
              height: 100%;
            }

            .tick-triangle {
              position: absolute;
              width: 0;
              height: 0;
              border-bottom: 4px solid #be624b;
              border-left: 4px solid transparent;
              border-right: 4px solid transparent;
              left: -4px;
              bottom: -8px;
            }

            .tick {
              height: 100%;
              display: flex;
              flex-flow: column nowrap;
              justify-content: space-between;
              align-items: stretch;
              color: #909496;
              font-size: 10px;
            }

            .tick .bottom {
              overflow: auto;
              flex-basis: 100%;
              border-bottom: 1px solid #909496;
              box-sizing: border-box;
            }

            .tick .bottom ul {
              height: 100%;
            }

            .tick .bottom ul li {
              float: left;
              height: 100%;
            }

            .tick .bottom ul .inner {
              display: flex;
              flex-flow: column nowrap;
              height: 100%;
              width: 8px;
              justify-content: flex-end;
              align-items: stretch;
            }

            .tick .bottom ul .inner span {
              flex-basis: 4px;
              width: 1px;
              background: #909496;
            }

            .tick .bottom ul .inner label {
              line-height: 1;
            }

            .tick .bottom ul .inner.large {
              justify-content: space-between;
            }

            .tick .bottom ul .inner.large span {
              flex-basis: 8px;
            }

          `
        }
        </style>
      </div>
    );
  }

}
