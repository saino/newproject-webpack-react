import React, { Component } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import VideoMaterial from "./video-material";
import { message } from "antd";
import FileUpload from 'react-fileupload';

import "./audio-container.css";
import AddMaterial from "../../statics/add-material1.png";

class MaterialContainer extends Component {
    getVideoMaterial() {
        const { material } = this.props;
        return material.reduce((videoMaterial, materialItem) => {
            if (materialItem.type === 'video' || materialItem.type === "image") {
                videoMaterial.push(materialItem); 
            }
            return videoMaterial;
        }, []);
    }

    //选择文件之前
    _handleBeforeChoose = () => {
        console.log("before choose");
        return true;
    }
    //选择文件
    _handleChooseFile = (files) => {
        console.log("choose", files);
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
        // this.setState({
        //     uploading: true,
        //     progressState: "active",
        //     uploadProgress: 0
        // });
    }
    render() {

        const upLoadOptions = {
            baseUrl: `./aa/user/uploadMaterial`,
            paramAddToField: {
                work_id: "this.props.workId"
            },
            fileFieldName: "file",
            multiple: false,
            accept: 'video/*, image/*',
            requestHeaders: {
                Token: "this.props.user.token",
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

        return <div className="material-container">
            <div className="title-name">我的素材</div>
            <div className="material-content">
                <FileUpload options={upLoadOptions} className="add-action">
                    <div ref="chooseAndUpload">
                        <div className="video-item add-video">
                            <img src={AddMaterial} />
                        </div>
                    </div>
                </FileUpload>
                
                {
                    this.getVideoMaterial().map((material) => {
                        return <VideoMaterial key={material.id} model={material} />
                    })
                }
            </div>
            <style>{`
                .material-container{
                    height: 100%;
                    width: 100%;
                    background: #031016;
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
                
            `}</style>
        </div>
    }
    onAddMaterialClick = () => {
        console.log("上传素材");
    }
}

const mapStateToProps = ({ material }) => {
    return {
        material
    };
}


export default connect(mapStateToProps)(MaterialContainer);