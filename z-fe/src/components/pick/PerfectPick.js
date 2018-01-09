import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Button, Progress } from 'antd';

export default class PerfectPick extends Component {
  columns = [{
    title: '帧',
    dataIndex: 'frame',
    key: 'frame'
  },{
    title: '类别',
    dataIndex: 'category',
    key: 'category'
  }, {
    title: '是否修改',
    dataIndex: 'status',
    key: 'status'
  }];

  render() {
    let {
      rotoFrames, frame, app, materialJobId, generateProgress,
      onGenerateRotoMaterial, onSelectFrame
    } = this.props;
    rotoFrames = rotoFrames.map(({ frame }) => ({ frame, category: 'ROTO', status: '已修改' }));

    return (
      <div className="perfect-pick">

        <div className="pick-title">
          <label>对AI抠像进行错误修正</label>
        </div>

        <div className="pick-grid">
          <Table
            rowKey="frame"
            columns={ this.columns }
            dataSource={ rotoFrames }
            rowSelection={{
              type: 'radio',
              selectedRowKeys: [ frame ],
              onChange: (_, rows) => onSelectFrame(rows[0].frame) }} />
        </div>

        <div className="build">
          { materialJobId == null ?
            (
              <Button
                type="primary"
                className="generate-rotomaterial"
                loading={ app.isFetching }
                onClick={ onGenerateRotoMaterial }>
                开始生成抠像素材
              </Button>
            ) :
            (
              <div className="generateroto-progres">
                <Progress percent={ generateProgress } size="small" />
              </div>
            )
          }
        </div>

        <style>{`
          .perfect-pick {
            width: 100%;
          }

          .perfect-pick .pick-title {
            padding: 0 15px;
            line-height: 45px;
            color: #000;
            background: #fff;
          }

          .perfect-pick .pick-title label {
            letter-spacing: 1px;
          }

          .perfect-pick .pick-grid {
            padding: 15px 15px 0;
          }

          .perfect-pick .ant-table,
          .perfect-pick .ant-table table {
            border-radius: 0;
          }

          .perfect-pick .ant-table-thead > tr > th,
          .perfect-pick .ant-table-tbody > tr > td {
            text-align: center;
            padding-top: 7px;
            padding-bottom: 7px;
          }

          .perfect-pick .ant-table-thead > tr > th {
            background: #2d8bbd;
            color: #fff;
          }

          /*.perfect-pick .ant-table-tbody > tr:nth-child(even) {
            background: #ecf6fd;
          } */

          /*.perfect-pick .ant-table-tbody > tr:hover > td {
            background: transparent;
          }*/

          .perfect-pick .ant-table-tbody > tr > td {
            border: 0 none;
          }

          .perfect-pick .ant-table-tbody {
            background: #fff;
          }

          .perfect-pick .build {
            padding: 40px 15px 0;
          }

          .perfect-pick .build .generate-rotomaterial {
            display: block;
            width: 100%;
            line-height: 30px;
            color: #fff;
            text-align: center;
            background: #2d8bbd;
            border: 0 none;
            outline: none;
            letter-spacing: 1px;
            cursor: pointer;
          }

          .generateroto-progress {
            padding: 12px 15px 0;
          }

        `}</style>
      </div>
    );
  }

  componentWillUnmount() {
    const {
      workId, sceneId, materialJobId, generateProgress,
      onUpdateRotoJobId, onSetRotoMaterialJobId, onSetRotoMaterialProgress, onClearRotoProgress
    } = this.props;

    if (materialJobId != null && generateProgress >= 100) {
      onUpdateRotoJobId(workId, sceneId, null);
      onClearRotoProgress(workId, sceneId, 0);
      onSetRotoMaterialJobId(workId, sceneId, null);
      onSetRotoMaterialProgress(workId, sceneId, 0);
    }
  }
}
