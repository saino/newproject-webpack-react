import React, { Component } from "react";
import MaterialContainer from "./material-container";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { loadImagekMaterial, loadMoreImageMaterial, deleteImageMaterial, loadFirstPageImageMaterial } from "../../../stores/reducers/user-material";
import AddWork from "../../../views/statics/add-work.png";
import ImageMaterialItem from "./image-material-item";
import config from "../../../config";
import FileUpload from 'react-fileupload';
import AddMaterial from "../../../views/statics/add-material1.png";

class ImageMaterialContainer extends MaterialContainer {
    constructor() {
        super();
    }
    componentWillMount() {
        const { pagination } = this.props;
        if (pagination === 1) {
            this.props.loadImagekMaterial({
                "page": pagination,
                "perpage": config.page.userCenterPageSize,
                "types": "image",
            });
        }
        this.loadFirstPageMaterial();
    }
    renderAddNew() {
        const upLoadOptions = config.fileUpload.configureFileUpload({
            accept: "image/*",
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
    }
    loadFirstPageMaterial = () => {
        this.props.loadFirstPageImageMaterial({
            "page": 1,
            "perpage": config.page.userCenterPageSize,
            "types": "image",
        })
    }
    renderMaterialItem() {
        const { materials } = this.props;
        return materials.map((materialItem, index) => {
            return <ImageMaterialItem key={materialItem.id} model={materialItem} onDeleClick={this.onDeleClick}/>
        });
    }
    onDeleClick = (model) => {
        const { pagination } = this.props;
        this.props.deleteImageMaterial(model, () => {
            this.props.loadMoreImageMaterial({
                "page": pagination,
                "perpage": config.page.userCenterPageSize,
                "types": "image",
            })
        });
    }
    loadMoreMaterial(loadEndFUN) {
        const { pagination } = this.props;
        this.props.loadMoreImageMaterial({
            "page": pagination,
            "perpage": config.page.userCenterPageSize,
            "types": "image",
        }, loadEndFUN);
    }
}
const mapStateToProps = ({ userMaterial }) => {
    return { ...userMaterial.imageMaterial };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadFirstPageImageMaterial: bindActionCreators(loadFirstPageImageMaterial, dispatch),
        loadImagekMaterial: bindActionCreators(loadImagekMaterial, dispatch),
        loadMoreImageMaterial: bindActionCreators(loadMoreImageMaterial, dispatch),
        deleteImageMaterial: bindActionCreators(deleteImageMaterial, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ImageMaterialContainer);