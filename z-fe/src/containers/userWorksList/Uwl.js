import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Icon, Tooltip, Popconfirm, Modal, Input } from 'antd';
import { CardList, Card } from '../../components/card';
import { getWorks, getNeedWorks, deleteWork } from '../../reducers/userWorks';
import { getUserInfo } from '../../reducers/user';
import config from '../../config';
import addWorkJPG from '../../statics/add_work_material.jpg';
import defWorkJPG from '../../statics/def-work.jpg';

class Uwl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addWorkModalVisible: false,
      workName: "",
     };
    this.handlePageChange = (current, pageSize) => {
      this.props.getNeedWorks(current);
    };
    this.handleDeleteWork = workId => () =>
      this.props.deleteWork(workId);
    this.handleAddWork = () => {
      this.setState({
        workName: ""
      });
    };
    this.handleOpenAddWorkModal = () =>
      this.setState({ addWorkModalVisible: true });
    this.handleCloseAddWorkModal = () =>
      this.setState({ addWorkModalVisible: false });
  }

  getWorkDoms(arr) {
    arr = arr.map((item, key) => (
      <Card
        style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #dbdbdb' }}
        title={ item.name }
        cover={ <img src={ defWorkJPG } style={{ objectFit: 'cover' }} /> }
        actions={ [
          (<Tooltip title="编辑" placement="bottom">
            <Link className="edit-btn" to={ `/make/${ item.id }` }><Icon type="edit" /></Link>
           </Tooltip>),
          (<Tooltip title="删除" placement="bottom">
            <Popconfirm title="确定要删除吗" okText="确定" cancelText="取消" onConfirm={ this.handleDeleteWork(item.id) }>
              <a className="delete-btn" href="javascript:;">
                <Icon type="delete" />
              </a>
            </Popconfirm>
           </Tooltip>)
        ] }
        actionTAlign="right" />
      )
    );

    arr.unshift(<div className="add-action" onClick={ this.handleOpenAddWorkModal }><img src={ addWorkJPG } /></div>);

    return arr;
  }

  componentWillMount() {
    this.props.getWorks();
  }
  onWorkNameChange = (e) => {
    this.setState({
      workName: e.target.value
    });
  }
  render() {
    const { userInfo, userWorks } = this.props;
    return (
      <div className="work-wrapper">

        {/* 用户信息 */}
        <div className="user-works-list-title">
          <div className='user-works-list-title-image'>
            <Avatar src={ userInfo.avatar || config.avatar } size="large" style={{ verticalAlign: 'middle' }}></Avatar>
            <span className="user-works-username">{ userInfo.nick }</span>
          </div>
        </div>

        {/* 作品列表 */}
        <CardList
          style={{ padding: '20px 0' }}
          paginate={{
            pageSize: userWorks.page.pageSize,
            current: userWorks.page.current,
            total: userWorks.page.total
          }}
          elements={ this.getWorkDoms(userWorks.needWorks) }
          columns={ 4 }
          onPageChange={ this.handlePageChange } />

        {/* 添加作品输入对话框 */}
        <Modal
          title="添加作品"
          width={ 200 }
          wrapClassName={ config.dialog.wrapClassName }
          visible={ this.state.addWorkModalVisible }
          onOk={ this.handleAddWork }
          onCancel={ this.handleCloseAddWorkModal }>
          <Input.TextArea value={this.state.workName} onChange={this.onWorkNameChange} placeholder="请输入作品名称" autosize={{ minRows: 1, maxRows: 3 }} />
        </Modal>

      <style>{`
        ${ config.dialog.centerStyle }
        .user-works-list-title{
            height: 60px;
            width: 100%;
            position: relative;
            border-bottom: 1px solid #dde2e8;
        }
        .user-works-list-title-image{
            float: left;
        }
        .user-works-list-title-image img{
            height: 100%;
            width: 100%;
        }
        .user-works-username {
          font-size: 14px;
          color: #999999;
          margin-left: 15px;
        }
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

const mapStateToProps = ({ user, userWorks }) => ({
  userInfo: user.user,
  userWorks: userWorks
});
const mapDispatchToProps = (dispatch) => ({
  getWorks: bindActionCreators(getWorks, dispatch),
  getNeedWorks: bindActionCreators(getNeedWorks, dispatch),
  deleteWork: bindActionCreators(deleteWork, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Uwl);
