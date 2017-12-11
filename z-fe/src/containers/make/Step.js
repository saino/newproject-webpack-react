import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deepCompare} from 'pure-render-immutable-decorator';
import {updateStep, selectStep} from '../../reducers/step';
import logoPNG from '../../statics/logo.png';
import classnames from 'classnames'

class Step extends Component {
    constructor(props) {
        super(props)
        this.selectStep = this.selectStep.bind(this)
    }

    selectStep(index) {
        const {step, selectStep} = this.props;
        if (step.current != index) {
            selectStep(index)
        }
    }

    render() {
        const {step} = this.props;

        return (
            <div className="step">
                <div className="step-inner">
                    <div className="step-to">
                      <div className="logo">
                          <Link className="logo-inner" to="/">
                              <img className="logo-img" src={logoPNG}/>
                              <label className="logo-text">LIANGZIVFX</label>
                          </Link>
                      </div>
                      <ul className="nav">
                        {step.steps.map((item, index) => {
                            let className = classnames({
                                [item.key]: true,
                                [item.status]: true,
                                'selected': index == step.current
                            })
                            return (
                                <li key={item.key} className={className}
                                    onClick={this.selectStep.bind(this, index)}>
                                    <a className="item middle">{item.name}</a>
                                </li>)
                        })}
                      </ul>
                    </div>
                </div>

                <style>{`
          .step {
            background: #114967;
          }

          .step-inner {
            position: relative;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            height: 54px;
          }

          .step-to {
            display: flex;
            align-items: stretch;
            height: 100%;
            color: #fff;
            font-size: 14px;
            font-family: 'microsoft yahei';
            width: 1236px;
            margin: 0 auto;
          }


          .step-to .middle {
            display: -webkit-box;
            -webkit-box-align: center;
            -webkit-box-pack: center;
          }

          .step-to .item {
            width: 135px;
            height: 100%;
          }

          .step-to .doing {
            background: #2d8bbd;
          }

          .step-to .wait a {
            background: #114967;
          }
          .step-to .selected a {
            background: #2d8bbd;
          }
          .step-to .materials {
            display: flex;
            justify-content: flex-end;
            align-items: stretch;
            width: 509px;
            padding-left: 20px;
          }

          .step-inner .nav {
            flex: 1;
            display: flex;
          }

          .step-inner .logo-inner {
            display: flex;
            align-items: center;
            height: 100%;
          }

          .step-inner .logo-img {
            display: inline-block;
            width: 36px;
            height: 31px;
            vertical-align: middle;
          }

          .step-inner .logo-text {
            margin-left: 10px;
            font-size: 20px;
            vertical-align: middle;
            color: #fff;
            cursor: pointer;
          }

          .step-to a {
            color: #fff;
          }

        `}</style>
            </div>
        );
    }
}

function mapStateToProps({step}) {

    return {step};
}


export default connect(
    mapStateToProps,
    {
        updateStep,
        selectStep
    }
)(Step);
