import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { deepCompare } from 'pure-render-immutable-decorator';
import logoPNG from '../statics/logo.png';

export default class Step extends Component {
    handleChangeStep = (step) => () =>
      this.props.onChangeStep(step);

    render() {
        const { step } = this.props;

        return (
            <div className="step">
                <div className="step-inner">
                    <div className="step-to">
                      <div className="logo">
                          <Link className="logo-inner" to="/">
                              <img className="logo-img" src={ logoPNG }/>
                              <label className="logo-text">LIANGZIVFX</label>
                          </Link>
                      </div>
                      <ul className="nav">
                        <li onClick={ this.handleChangeStep(0) }>
                           <span className={`item middle ${ step == 0 ? 'selected' : '' }`}>素材上传</span>
                        </li>
                        <li onClick={ this.handleChangeStep(1) }>
                           <span className={`item middle ${ step != 0 ? 'selected' : '' }`}>镜头特效</span>
                        </li>
                        {/*<li onClick={ this.handleChangeStep(2) }>
                           <span className={`item middle ${ step == 2 ? 'selected' : '' }`}>3.镜头组合</span>
                        </li>
                        <li onClick={ this.handleChangeStep(3) }>
                           <span className={`item middle ${ step == 3 ? 'selected' : '' }`}>4.视频发布</span>
                        </li>*/}
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

              .step-to .wait {
                background: #114967;
              }
              .step-to .selected {
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
                margin-left: 282px;
              }

              .step-inner .nav li {
                cursor: pointer;
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
        `}</style>
            </div>
        );
    }
}
