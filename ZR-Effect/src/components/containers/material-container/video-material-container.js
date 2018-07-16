import React, { Component } from "react";
import MaterialContainer from "./material-container";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { loadVideokMaterial, loadMoreVideoMaterial, deleteVideoMaterial, loadFirstPageVideoMaterial } from "../../../stores/reducers/user-material";
import AddWork from "../../../views/statics/add-work.png";
import VideoMaterialItem from "./video-material-item";
import config from "../../../config";
import FileUpload from 'react-fileupload';
import AddMaterial from "../../../views/statics/add-material1.png";

class VideoMaterialContainer extends MaterialContainer {
    constructor() {
        super();
    }
    componentWillMount() {
        const { pagination } = this.props;
        if (pagination === 1) {
            this.props.loadVideokMaterial({
                "page": pagination,
                "perpage": config.page.userCenterPageSize,
                "types": "video",
            });
        }
        this.loadFirstPageMaterial();
    }
    renderAddNew() {
        const upLoadOptions = config.fileUpload.configureFileUpload({
            accept: "video/*",
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
                <div className="material-item add-material">
                    <img src={AddMaterial} />
                </div>
            </div>
        </FileUpload>
        // {
        //     this.renderUploadProgress()
        // }
    }
    loadFirstPageMaterial = () => {
        this.props.loadFirstPageVideoMaterial({
            "page": 1,
            "perpage": config.page.userCenterPageSize,
            "types": "video",
        })
    }
    renderMaterialItem() {
        const { materials } = this.props;
        return materials.map((materialItem, index) => {
            return <VideoMaterialItem key={materialItem.id} model={materialItem} onDeleClick={this.onDeleClick}/>
        });
    }
    onDeleClick = (model) => {
        const { pagination } = this.props;
        this.props.deleteVideoMaterial(model, () => {
            this.props.loadMoreVideoMaterial({
                "page": pagination,
                "perpage": config.page.userCenterPageSize,
                "types": "video",
            })
        });
    }
    loadMoreMaterial(loadEndFUN) {
        const { pagination } = this.props;
        this.props.loadMoreVideoMaterial({
            "page": pagination,
            "perpage": config.page.userCenterPageSize,
            "types": "video",
        }, loadEndFUN);
    }
}
const mapStateToProps = ({ userMaterial }) => {
    return { ...userMaterial.videoMaterial };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadFirstPageVideoMaterial: bindActionCreators(loadFirstPageVideoMaterial, dispatch),
        loadVideokMaterial: bindActionCreators(loadVideokMaterial, dispatch),
        loadMoreVideoMaterial: bindActionCreators(loadMoreVideoMaterial, dispatch),
        deleteVideoMaterial: bindActionCreators(deleteVideoMaterial, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoMaterialContainer);