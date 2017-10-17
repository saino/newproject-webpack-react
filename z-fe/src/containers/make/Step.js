import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deepCompare } from 'pure-render-immutable-decorator';
import { getStep } from '../../reducers/step';
import logoPNG from '../../statics/logo.png';

class Step extends Component {
  render() {
    return (
      <div className="step">
        <div className="step-inner">

          <div className="logo">
            <Link className="logo-inner" to="/">
              <img className="logo-img" src={ logoPNG } />
              <label className="logo-text">LIANGZIVFX</label>
            </Link>
          </div>

          <ul className="step-to">
            <li className="materials complete">
              <a className="item middle">1.素材上传</a>
            </li>

            <li className="effect active">
              <a className="item middle" href="javaScript:;">2.镜头特效</a>
            </li>
            <li className="combine middle item">
              <a className="item middle" href="javaScript:;">3.镜头组合</a>
            </li>
            <li className="combine middle item">
              <a className="item middle" href="javaScript:;">4.视频配音</a>
            </li>
            <li className="publish middle item">
              <a className="item middle" href="javaScript:;">5.视频发布</a>
            </li>
          </ul>
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

          .step-to .complete {
            background: #006699;
          }

          .step-to .active {
            background: #2d8bbd;
          }

          .step-to .materials {
            display: flex;
            justify-content: flex-end;
            align-items: stretch;
            width: 509px;
            padding-left: 20px;
          }

          .step-inner .logo {
            position: absolute;
            left: 20px;
            top: 0;
            bottom: 0;
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
          }

          .step-to a {
            color: #fff;
          }

        `}</style>
      </div>
    );
  }
}

function mapStateToProps ({ step }) {
  return { step };
}

function mapDispatchToProps (dispatch) {
  return {
    getStep: bindActionCreators(getStep, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step);
