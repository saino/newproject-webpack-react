/**
 * 素材页
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import Step from '../make/Step';
import UserMaterial from './UserMaterial';

export default class Material extends Component {
  static propTypes = {
    flag: PropTypes.number
  };
  static defaultProps = {
    flag: 0
  };

  renderChildMaterial(flag) {
    switch (flag) {
      case 0:
        return (<UserMaterial />);
    }
  }

  render() {
    return (
      <div className="material-wrap">
        <div className="material-header">
          <Step />
        </div>
        <div className="material-middle">
          <div className="material-middle-inner">
            <ul className="material-middle-left-nav">
              <li><NavLink className="item-inner" to="/materials/project" ><Icon type="picture" />项目素材</NavLink></li>
              <li><NavLink className="item-inner" to="/materials/public" ><Icon type="picture" />公共素材</NavLink></li>
              <li><NavLink className="item-inner" to="/materials/user" ><Icon type="picture" />我的素材</NavLink></li>
            </ul>
            <div className="material-middle-right-main">
              { this.renderChildMaterial(this.props.flag) }
            </div>
          </div>
        </div>
        <style>{`
          .material-wrap {
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
          }
          .material-header {
            flex: 0 0 54px;
          }
          .material-middle {
            padding-top: 20px;
            flex: 1;
          }
          .material-middle-inner {
            display: flex;
            flex-flow: row nowrap;
            width: 1236px;
            height: 100%;
            margin: 0 auto;
          }
          .material-middle-left-nav {
            flex: 0 0 190px;
            background: #f2f2f2;
          }
          .material-middle-left-nav li {
            display: block;
            line-height: 60px;
            font-size: 14px;
          }
          .material-middle-left-nav li .item-inner.active {
            background: #124967;

          }
          .material-middle-left-nav li .item-inner {
            display: block;
            height: 60px;
            color: #030303;
            padding: 0 20px;
          }
          .material-middle-left-nav li .item-inner i {
            margin-right: 15px;
          }
          .material-middle-right-main {
            flex: 1;
            padding: 20px;
          }

        `}</style>
      </div>
    );
  }
}
