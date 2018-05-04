import React, { Component } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import config from '../../../config';
import VideoMaterial from "./video-material";
import { message, Progress } from "antd";
import FileUpload from 'react-fileupload';
import { changeMaterial, loadMaterials } from "../../../stores/reducers/material"
import { loadVideoMaterials } from '../../../stores/reducers/video-mateiral'
import deleImg from "../../statics/dele.png";

import "./audio-container.css";
import AddMaterial from "../../statics/add-material1.png";

class MaterialContainer extends Component {

    state = {
        uploading: false,
        uploadProgress: 0,
        loading: false,
    }
    componentWillMount(){
        const { pagination } = this.props;
        if (pagination.videoLibPage === 1){
            this.props.loadVideoMaterials({
                "types": "video",
                "page": pagination.videoLibPage,
                "prepage": 20
            });
        }
        if (pagination.videoAndImgLibPage === 1){
            this.props.loadMaterials({
                "types": "video|image",
                "page": pagination.videoAndImgLibPage,
                "prepage": 20
            });
        }
    }

    getMaterial() {
        const { material, videoMaterial, materialContainerType } = this.props;
        const type = materialContainerType.join("|");
        // console.log(type, "dffffffffffffff");
        if(type === "video"){
            return [...videoMaterial];
        }else{
            return [...material.filter(materialItem=>materialItem.type!=="audio")];
        }
    }

    //选择文件之前
    _handleBeforeChoose = () => {
        // console.log("before choose");
        return true;
    }
    //选择文件
    _handleChooseFile = (files) => {
        // console.log("choose", files);
        return true;
    }
    //上传之前
    _handleBeforeUpload = (files, mill) => {
        const type = files[0].type;
        const size = files[0].size;
        if (type.indexOf("image") >= 0 && (size > 1024 * 1024 * 10)) {
            message.warning("图片不能超过10M");
            return false;
        }
        if (type.indexOf("video" >= 0) && (size > 1024 * 1024 * 200)) {
            message.warning("视频不能超过200M");
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
    _handleUploadSuccess = (resp) => {
        this.setState({
            uploadProgress: 100,
            progressState: "success",
        });
        this.props.loadMaterials({
            "types": "image|video",
            "page": 1,
            "perpage": 20
        });
        this.props.loadVideoMaterials({
            "types": "video",
            "page": 1,
            "prepage": 20
        })
        setTimeout(() => {
            this.setState({
                uploading: false
            });
        }, 200);
    }
    //上传失败
    _handleUploadFailed = (resp) => {
        this.setState({
            uploadProgress: 0,
            progressState: "exception"
        })
        setTimeout(() => {
            this.setState({
                uploading: false
            });
        }, 200);
    }
    onCloseClick = () => {
        this.props.changeaActiveContainer("stage", ["video", "image"]);
    }
    renderUploadProgress = () => {
        if(!this.state.uploading){
            return null;
        }
        return <div className="video-item">
            <div className="video-upload">
                <Progress className="audio-progress" percent={this.state.uploadProgress} size="small" showInfo={false} strokeWidth={5} />
                {this.state.uploadProgress}%
            </div>
            <div className="video-upload-title">
                正在上传......
            </div>
            <style>{`
                .video-upload{
                    height: 110px;;
                    width: 147px;
                    color: #fff;
                    background: #000;
                    text-align: center;
                    line-height: 110px;
                }
                .video-upload-title{
                    height: 44px;
                    width: 147px;
                    color: #fff;
                    line-height: 44px;
                    text-indent: 8px;
                }
                .audio-progress {
                    width: 74%;
                    margin-right: 4px;
                }
            `}</style>
        </div>
    }
    render() { 
        const {materialContainerType } = this.props;
        let acceptType = "video/*";
        if(materialContainerType.indexOf("image")>=0){
            acceptType += ", image/*";
        }
        const upLoadOptions = config.fileUpload.configureFileUpload({
            accept: acceptType,
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
        return <div className="material-container">
            <div className="title-name">我的素材</div>
            <div className="close-container" onClick={this.onCloseClick}><img src={deleImg}></img></div>
            <div className="material-content" onScroll={this.onScrolld}>
                <FileUpload options={upLoadOptions} className="add-action">
                    <div ref="chooseAndUpload">
                        <div className="video-item add-video">
                            <img src={AddMaterial} />
                        </div>
                    </div>
                </FileUpload>
                {
                    this.renderUploadProgress()
                }
                {
                    this.getMaterial().map((material) => {
                        return <VideoMaterial changeaActiveContainer={this.props.changeaActiveContainer} useType={this.props.materialContainerType} key={material.id} model={material} />
                    })
                }
            </div>
            <style>{`
                .material-container{
                    height: 100%;
                    width: 100%;
                    background: #031016;
                    position: relative;
                }
                .title-name{
                    height: 40px;
                    width: 94px;
                    color: #818B8A;
                    font-size: 14px;
                    background: rgba(0,0,0,0.6);
                    text-align: center;
                    line-height: 40px;
                }
                .material-content{
                    padding: 0 3px 16px;
                    height: calc(100% - 56px);
                    width: 100%;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: flex-start;
                    overflow-x: hidden;
                    overflow-y: auto;
                }
                .add-video{
                    cursor: pointer;
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

                .close-container{
                    position: absolute;
                    color: #fff;
                    right: 0;
                    top: 0;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    width: 40px;
                    cursor: pointer;
                }
                
            `}</style>
        </div>
    }
    onScrolld = (event) => {
        const target = event.target;
        const { offsetHeight, scrollHeight, scrollTop} = target;
        const bottomValue = scrollHeight - scrollTop - offsetHeight;
        if(bottomValue < 50 ) {
            if(this.state.loading){
                return;
            }
            this.state.loading = true;
            console.log("加载中。。。")
            setTimeout(() => {
                console.log("加载完毕....");
                this.state.loading = false;
            }, 5000);
            // console.log("jiazai");
        }
    }
}

const mapStateToProps = ({ material, videoMaterial, pagination }) => {
    return {
        material,
        videoMaterial,
        pagination
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMaterial: bindActionCreators(changeMaterial, dispatch),
        loadMaterials: bindActionCreators(loadMaterials, dispatch),
        loadVideoMaterials: bindActionCreators(loadVideoMaterials,dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialContainer);
