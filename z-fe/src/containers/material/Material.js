/**
 * 素材页
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import UserMaterial from './UserMaterial';
import { getItemByKey, desc } from '../../utils/stateSet';
import { deleteMaterial } from '../../reducers/material';

export default class Material extends Component {
  componentWillMount() {
    this.props.onGetMaterials();
  }

  renderChildMaterial() {
    const {
      materials, user, workId, clearMaterials,
      onUploadMaterial, onDelete, onEdit
    } = this.props;

    return (
      <UserMaterial
        user={ user }
        workId={ workId }
        clearMaterials={ clearMaterials }
        onUploadMaterial={ onUploadMaterial }
        materials={ desc(materials) }
        onEdit={ onEdit }
        onDelete={ onDelete } />
    );
  }

  render() {
    return (
      <div className="material-wrap">
        <div className="material-middle">
          <div className="material-middle-inner">
            <ul className="material-middle-left-nav">
              <li><a href="javascript:;" className={`item-inner active`}><Icon type="picture" />项目素材</a></li>
            </ul>
            <div className="material-middle-right-main">
              { this.renderChildMaterial() }
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
          .material-middle-left-nav li .item-inner:hover {
            background: #c6d1d7;
            color: #32373a;
          }
          .material-middle-left-nav li .item-inner.active {
            background: #124967;
            color: #fff;
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
            padding: 0 20px 20px;
          }

        `}</style>
      </div>
    );
  }
}
