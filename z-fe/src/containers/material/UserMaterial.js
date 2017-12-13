/**
 * 我的素材页
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Icon, Tooltip, Popconfirm } from 'antd';
import { CardList, Card } from '../../components/card';
import { getWorks, deleteMaterial } from '../../reducers/userWorks';
import { getItemByKey } from '../../utils/stateSet';
import addWorkJPG from '../../statics/add_work_material.jpg';

class UserMaterial extends Component {
  static propTypes = {
    workId: PropTypes.string.isRequired
  }

  handlePageChange = (current, pageSize) =>
    this.props.list({ current, pageSize });
  handleDeleteMaterial = materialId => () =>
    this.props.deleteMaterial(+this.props.workId, +materialId);
  handleOpenAddMaterialModal = () => {

  };

  getMaterialDoms(arr) {
    arr = arr.map((item, key) => (
      <Card
        style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #dbdbdb' }}
        title={ item.name }
        cover={ <img src={ item.thumbnail } style={{ objectFit: 'cover' }} /> }
        actions={ [
          (<Tooltip title="编辑" placement="bottom">
            <Link className="edit-btn" to="/make"><Icon type="edit" /></Link>
           </Tooltip>),
          (<Tooltip title="删除" placement="bottom">
            <Popconfirm title="确定要删除吗" okText="确定" cancelText="取消" onConfirm={ this.handleDeleteMaterial(item.id) }>
              <a className="delete-btn" href="javascript:;">
                <Icon type="delete" />
              </a>
            </Popconfirm>
           </Tooltip>)
        ] }
        actionTAlign="right" />
      )
    );

    arr.unshift(<div className="add-action" onClick={ this.handleOpenAddMaterialModal }><img src={ addWorkJPG } /></div>);

    return arr;
  }

  componentWillMount() {
    if (!this.props.userWorks.works.length) {
      this.props.getWorks();
    }
  }

  render() {
    const { userWorks, workId } = this.props;
    const work = getItemByKey(userWorks.works, +workId, 'id');

    return (
      <div className="user-material-wrap">

        {/* 素材列表 */}
        <CardList elements={ this.getMaterialDoms(work ? work.config.materials : []) } columns={ 5 } isPaginate={ false } />

        <style>{`
          .add-action {
            border: 1px solid #dbdbdb;
            background: #ececec;
            height: 100%;
            text-align: center;
            cursor: pointer;
          }
          .add-action img {
            vertical-align: middle;
          }
          .add-action:after {
            content: "";
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          .edit-btn, .delete-btn {
            display: inline-block;
            width: 40px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            border-radius: 25px;
            font-size: 18px;
          }

          .edit-btn:hover, .delete-btn:hover {
            background: #124b68;
          }

          .edit-btn:hover i, .delete-btn:hover i {
            color: #fff;
          }

        `}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ userWorks }) => ({
  userWorks
});
const mapDispatchToProps = (dispatch) => ({
  getWorks: bindActionCreators(getWorks, dispatch),
  deleteMaterial: bindActionCreators(deleteMaterial, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMaterial);
