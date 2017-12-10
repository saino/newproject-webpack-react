import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Avatar, Icon, Tooltip, Popconfirm, Modal, Input } from 'antd';
import { CardList, Card } from '../../components/card';
import { getWorks, deleteWork } from '../../reducers/userWorks'
import config from '../../config';
import addWorkJPG from '../../statics/add_work_material.jpg';

class Uwl extends Component {
  static columns = 4;

  constructor(props) {
    super(props);

    this.state = { addWorkModalVisible: false };
    this.handlePageChange = (current, pageSize) => {
      this.props.getWorks({ current, pageSize });
    };
    this.handleDeleteWork = workId => () =>
      this.props.deleteWork({ workId });
    this.handleAddWork = () => {
      console.log('添加作品');
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
        title={ item.title }
        cover={ <img src={ item.thumb } style={{ objectFit: 'cover' }} /> }
        actions={ [
          (<Tooltip title="编辑" placement="bottom">
            <a className="edit-btn" href="/make"><Icon type="edit" /></a>
           </Tooltip>),
          (<Tooltip title="删除" placement="bottom">
            <Popconfirm title="确定要删除吗" okText="确定" cancelText="取消" onConfirm={ this.handleDeleteWork(item.workId) }>
              <a className="delete-btn" href="javascript:;">
                <Icon type="delete" />
              </a>
            </Popconfirm>
           </Tooltip>)
        ] }
        actionTAlign="right" />
      )
    );

    arr.unshift(<div className="add-work" onClick={ this.handleOpenAddWorkModal }><img src={ addWorkJPG } /></div>);

    return arr;
  }

  componentWillMount() {
    this.handlePageChange(this.props.userWorks.page.current, config.page.pageSize);
  }

  render() {
    const { userInfo, userWorks } = this.props;

    return (
      <div className="work-wrapper">

        {/* 用户信息 */}
        <div className="user-works-list-title">
          <div className='user-works-list-title-image'>
            <Avatar src={ userInfo.avatar } size="large" style={{ verticalAlign: 'middle' }}></Avatar>
            <span className="user-works-username">{ userInfo.usernick }</span>
          </div>
        </div>

        {/* 作品列表 */}
        <CardList
          style={{ paddingTop: 20 }}
          paginate={{
            pageSize: userWorks.page.pageSize,
            current: userWorks.page.current,
            total: userWorks.page.total
          }}
          elements={ this.getWorkDoms(userWorks.works) }
          columns={ Uwl.columns }
          onPageChange={ this.handlePageChange } />

        {/* 添加作品输入对话框 */}
        <Modal
          title="添加作品"
          width={ 200 }
          wrapClassName={ config.dialog.wrapClassName }
          visible={ this.state.addWorkModalVisible }
          onOk={ this.handleAddWork }
          onCancel={ this.handleCloseAddWorkModal }>
          <Input.TextArea placeholder="请输入作品名称" autosize={{ minRows: 1, maxRows: 3 }} />
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
        .add-work {
          border: 1px solid #dbdbdb;
          background: #ececec;
          height: 100%;
          text-align: center;
          cursor: pointer;
        }
        .add-work img {
          vertical-align: middle;
        }
        .add-work:after {
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

const mapStateToProps = ({user, userWorks}) => ({
  userInfo: user.user,
  userWorks: userWorks
});
const mapDispatchToProps = (dispatch) => ({
  getWorks : bindActionCreators(getWorks, dispatch),
  deleteWork: bindActionCreators(deleteWork, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Uwl);
