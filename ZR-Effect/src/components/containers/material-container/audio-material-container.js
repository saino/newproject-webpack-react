import React, { Component } from "react";
import MaterialContainer from "./material-container";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { loadAudiokMaterial, loadMoreAudioMaterial, deleteAudioMaterial, loadFirstPageAudioMaterial } from "../../../stores/reducers/user-material";
import AddWork from "../../../views/statics/add-work.png";
import AudioMaterialItem from "./audio-material-item";
import config from "../../../config";
import FileUpload from 'react-fileupload';
import AddMaterial from "../../../views/statics/add-material.png";
import { message, Progress } from "antd";

class AudioMaterialContainer extends MaterialContainer {
    constructor() {
        super();
    }
    componentWillMount() {
        const { pagination } = this.props;
        if (pagination === 1) {
            this.props.loadAudiokMaterial({
                "page": pagination,
                "perpage": config.page.userCenterPageSize,
                "types": "audio",
            });
        }
        this.loadFirstPageMaterial();
    }
    renderAddNew() {
        const upLoadOptions = config.fileUpload.configureFileUpload({
            accept: "audio/*",
            beforeChoose: this._handleBeforeChoose,
            chooseFile: this._handleChooseFile,
            beforeUpload: this._handleBeforeUpload,
            uploading: this._handleUploading,
            /*上传成功*/
            uploadSuccess: this._handleUploadSuccess,
            /*xhr失败*/
            uploadFail: this._handleUploadFailed,
            uploadError: this._handleUploadFailed
        });
        return <FileUpload options={upLoadOptions} className="add-action">
            <div ref="chooseAndUpload">
                <div className="audio-item add-material">
                    <img src={AddMaterial} />
                </div>
            </div>
        </FileUpload>
    }
    renderUploadProgress = () => {
        if (!this.state.uploading) {
            return null;
        }
        return <div className="audio-item add-audio">
            <div className="audio-control">
                <Progress className="audio-progress" percent={this.state.uploadProgress} size="small" showInfo={false} strokeWidth={5} />
                {this.state.uploadProgress}%
            </div>
            <div className="progress-title">上传中......</div>
            <style>{`
                .audio-item:hover {
                    box-shadow: 0 0 9px 6px rgba(255,255,255,0.50);
                }
                .audio-item{
                    width: 147px;
                    height: 70px;
                    margin: 16px;
                    background: rgba(45,75,80,0.80);
                    position: relative;
                }
                .audio-control{
                   color: #fff; 
                }
                .audio-progress{
                    width: 80%;
                    margin-right: 4px;
                }
                .progress-title{
                    text-indent: 8px;
                    line-height: 44px;
                    color: #fff;
                }
            `}</style>
        </div>
    }
    loadFirstPageMaterial = () => {
        this.props.loadFirstPageAudioMaterial({
            "page": 1,
            "perpage": config.page.userCenterPageSize,
            "types": "audio",
        })
    }
    renderMaterialItem() {
        const { materials } = this.props;
        return materials.map((materialItem, index) => {
            return <AudioMaterialItem key={materialItem.id} model={materialItem} onDeleClick={this.onDeleClick} />
        });
    }
    onDeleClick = (model) => {
        const { pagination } = this.props;
        this.props.deleteAudioMaterial(model, () => {
            this.props.loadMoreAudioMaterial({
                "page": pagination,
                "perpage": config.page.userCenterPageSize,
                "types": "audio",
            })
        });
    }
    loadMoreMaterial(loadEndFUN) {
        const { pagination } = this.props;
        this.props.loadMoreAudioMaterial({
            "page": pagination,
            "perpage": config.page.userCenterPageSize,
            "types": "audio",
        }, loadEndFUN);
    }
}
const mapStateToProps = ({ userMaterial }) => {
    return { ...userMaterial.audioMaterial };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadFirstPageAudioMaterial: bindActionCreators(loadFirstPageAudioMaterial, dispatch),
        loadAudiokMaterial: bindActionCreators(loadAudiokMaterial, dispatch),
        loadMoreAudioMaterial: bindActionCreators(loadMoreAudioMaterial, dispatch),
        deleteAudioMaterial: bindActionCreators(deleteAudioMaterial, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AudioMaterialContainer);