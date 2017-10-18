import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { fetchStart, fetchEnd } from '../../reducers/app';

function mapStateToProps ({ api }) {
  return { api };
}

class PerfectPick extends Component {
  static propTypes = {
    onPrev: PropTypes.func.isRequired
  };

  columns = [{
    title: '帧',
    dataIndex: 'frameId',
    key: 'frameId'
  }, {
    title: '准确率',
    dataIndex: 'rate',
    key: 'rate'
  }, {
    title: '类别',
    dataIndex: 'category',
    key: 'category'
  }, {
    title: '是否修改',
    dataIndex: 'status',
    key: 'status'
  }];

  render() {
    return (
      <div className="perfect-pick">

        <div className="pick-title">
          <label>对AI抠像进行错误修正</label>
        </div>

        <div className="pick-grid">
          <Table columns={ this.columns } dataSource={[{
            frameId: 3,
            rate: '75%',
            category: 'AI',
            status: 'true'
          }, {
            frameId: 3,
            rate: '75%',
            category: 'AI',
            status: 'true'
          }, {
            frameId: 3,
            rate: '75%',
            category: 'AI',
            status: 'true'
          }, {
            frameId: 3,
            rate: '75%',
            category: 'AI',
            status: 'true'
          }]}></Table>
        </div>

        <div className="build">
          <button onClick={ this.props.onPrev }>开始生成抠像素材</button>
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

          .perfect-pick .ant-table-tbody > tr:nth-child(even) {
            background: #ecf6fd;
          }

          .perfect-pick .ant-table-tbody > tr:hover > td {
            background: transparent;
          }

          .perfect-pick .ant-table-tbody > tr > td {
            border: 0 none;
          }

          .perfect-pick .ant-table-tbody {
            background: #fff;
          }

          .perfect-pick .build {
            padding: 40px 15px 0;
          }

          .perfect-pick .build button {
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

        `}</style>
      </div>
    );
  }
}

// function mapDispatchToProps (dispatch) {
//   return {
//     getSceneType: bindActionCreators(getSceneType, dispatch)
//   };
// }

export default connect(mapStateToProps)(PerfectPick);
