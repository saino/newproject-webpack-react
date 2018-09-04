import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileUpload from 'react-fileupload';
import { Progress, Icon, message } from 'antd';
import config from '../../../../../config';
import itemStyle from './item.css';

export default class MaterialUploadedBeforeItem extends Component {
  static propTypes = {
    onUploading: PropTypes.func.isRequired,
    onUploadSuccess: PropTypes.func,
    onUploadFail: PropTypes.func
  };

  static defaultProps = {
    onUploadSuccess: () => {},
    onUploadFail: () => {}
  };

  // 上传前
  uploadBeforeHandle = (files) => {
    const file = files[ 0 ];
    const { type, size } = file;
    const { fileUpload: { roto: { maxSize, typeExp } } } = config;

    if (!typeExp.test(type)) {
      message.warning('为了更好的体验，请选择后缀为mp4,ogg,webp格式的文件');
      return false;
    }

    // if (size > maxSize) {
    //   message.warning(`请选择小于${ maxSize / 1024 / 1024 }M的文件`);
    //   return false;
    // }

    return true;
  };

  // 上传中，计算上传进度
  uploadingHandle = (progress) => {
    const { onUploading } = this.props;
    const { loaded, total } = progress;
    const percent = Math.floor(100 * (loaded / total ));

    onUploading(percent);
  };

  // 上传成功
  uploadSuccessHandle = resp => {
    const { onUploadSuccess } = this.props;

    onUploadSuccess(resp);
  };

  // 上传失败
  uploadFailHandle = () => {
    const { onUploadFail } = this.props;

    onUploadFail();
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { name, thumb } = this.props;
    const fileUploadOptions = config.fileUpload.configureFileUpload({
      beforeUpload: this.uploadBeforeHandle,
      uploading: this.uploadingHandle,
      uploadSuccess: this.uploadSuccessHandle,
      uploadFail: this.uploadFailHandle,
      uploadError: this.uploadFailHandle
    });

    return (
      <div className={ itemStyle[ 'wrapper' ] } style={{ cursor: 'pointer' }}>
        <div className={ itemStyle[ 'gc-show' ] }>
          <div className={ itemStyle[ 'upload-before' ] }>
            <FileUpload options={ fileUploadOptions }>
              <div ref="chooseAndUpload">
                <Icon type="plus" />
                <span>上传素材</span>
              </div>
            </FileUpload>
          </div>
        </div>
      </div>
    );
  }
}
