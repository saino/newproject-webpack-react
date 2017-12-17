/**
 * 我的素材页
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Avatar, Icon, Tooltip, Popconfirm, Modal, Button, Progress, message, Popover } from 'antd';
import FileUpload from 'react-fileupload';
import { CardList, Card } from '../../components/card';
import { getItemByKey } from '../../utils/stateSet';
import config from '../../config';
import addWorkJPG from '../../statics/add-material.jpg';

export default class UserMaterial extends Component {
  state = {
    uploading: false,
    uploadProgress: 0
  }

  //选择文件之前
  _handleBeforeChoose = () => {
    return true;
  }
  //选择文件
  _handleChooseFile = (files) => {
    return true;
  }
  //上传之前
  _handleBeforeUpload = (files, mill) => {
    const type = files[0].type;
    const size = files[0].size;
    if(type.indexOf("image") >= 0 && (size > 1024*1024*1)){
      message.warning("图片不能超过1M");
      return false;
    }
    if(type.indexOf("video" >= 0) && (size > 1024*1024*10)){
      message.warning("视频不能超过10M");
      return false;
    }
    this.setState({
      uploading: true,
      progressState: "active",
      uploadProgress: 0
    });
  }
  //上传中
  _handleUploading = (progress) => {
    const progressNum = parseInt(100 * progress.loaded / progress.total);
    this.setState({
      uploadProgress: progressNum
    });
  }
  //上传成功
  _handleUploadSuccess = () => {
    this.setState({
      uploadProgress: 100,
      progressState: "success",
    });
    setTimeout(()=>{
      this.setState({
        uploading: false
      });
    }, 200);
    return true;
  }
  //上传失败
  _handleUploadFailed = () => {
    this.setState({
      uploadProgress: 0,
      progressState: "exception"
    })
    setTimeout(()=>{
      this.setState({
        uploading: false
      });
    }, 200);
  }

  handleDeleteMaterial = (materialId) => () =>
    this.props.onDelete(materialId);

  handleEditMaterial = (materialId) => () =>
    this.props.onEdit(materialId);

  handleOpenAddMaterialModal = () => {
    this.setState({
      addMaterialVisible: true
    });
  };

  getMaterialDoms(arr) {
    arr = arr.map((item, key) => (
      <Card
        style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #dbdbdb' }}
        title={ /[^/]+(?=\.)/.exec(item.path)[0] }
        cover={ <img src={ config.api.host + item.properties.thumbnail } style={{ objectFit: 'cover' }} /> }
        actions={ [
          (<Tooltip title="编辑" placement="bottom">
            {/* <Icon type='edit' /> */}
            <Popover title="请选择镜头类型"
              trigger='focus'
              content={<a href='javascript:;'>固定镜头广告植入</a>}>
              <a className="edit-btn" href="javascript:;" onClick={ this.handleEditMaterial(item.id) }><Icon type="edit" /></a>
            </Popover>
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
    const upLoadOptions = {
      baseUrl: '/user/uploadMaterial',
      paramAddToField: {
        work_id: this.props.workId
      },
      fileFieldName: "file",
      multiple: false,
      accept: 'video/*, image/*',
      requestHeaders: {
        Token: this.props.user.token,
      },
      chooseAndUpload: true,
      wrapperDisplay: 'block',
      beforeChoose: this._handleBeforeChoose,
      chooseFile: this._handleChooseFile,
      beforeUpload: this._handleBeforeUpload,
      uploading: this._handleUploading,
      /*上传成功*/
      uploadSuccess: this._handleUploadSuccess,
      /*xhr失败*/
      uploadFail: this._handleUploadFailed,
      uploadError: this._handleUploadFailed
    }
    arr.unshift(
      <FileUpload options={upLoadOptions} className="add-action">
        <div ref="chooseAndUpload">
          <img src={ addWorkJPG } />
        </div>
      </FileUpload>
    );

    return arr;
  }

  renderUploadProgress() {
    if(this.state.uploading){
      return <div className='upload-progress'>
        <Progress type="circle" status={this.state.progressState} percent={this.state.uploadProgress} width={111} />
      </div>
    }
    return null;
  }

  render() {
    return (
      <div className="user-material-wrap">

        {/* 素材列表 */}
        <CardList elements={ this.getMaterialDoms(this.props.materials) } columns={ 5 } isPaginate={ false } />

        {this.renderUploadProgress()}

        <style>{`
          .add-action {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #dbdbdb;
            background: #ececec;
            cursor: pointer;
          }
          .add-action img {
            vertical-align: middle;
            width: 100%;
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
          .upload-progress{
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            background: rgba(0, 0, 0, 0.7);
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            color: #fff;
          }
        `}</style>
      </div>
    );
  }
}
