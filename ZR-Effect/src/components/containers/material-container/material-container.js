import React, { Component } from "react";
import AddWork from "../../../views/statics/add-work.png";
import material from "../../../stores/reducers/material";
import { message, Progress } from "antd";
class MaterialContainer extends Component {

    bottomValueBUF = -1;
    
    constructor(){
        super();
        this.state = {
            loading: false,
            uploading: false,
            progressState: "active",
            uploadProgress: 0
        }
    }
    componentDidMount(){
        // console.log(this.props.type);
    }
    renderMaterialItem() {
    }
    loadMoreMaterial(loadEndFUN) {
        loadEndFUN&&loadEndFUN();
    }
    loadEnd = () => {
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 100);
    }
    onScrolld = (event) => {
        const target = event.target;
        const { offsetHeight, scrollHeight, scrollTop } = target;
        const bottomValue = scrollHeight - scrollTop - offsetHeight;
        //如果是向下滑动则不处理
        if (this.bottomValueBUF !== -1 && this.bottomValueBUF <= bottomValue) {
            this.bottomValueBUF = bottomValue;
            return;
        }
        this.bottomValueBUF = bottomValue;
        //如何滑到底部并且不再加载中则加载下一页
        if (bottomValue < 50 && !this.state.loading) {
            this.state.loading = true;
            this.loadMoreMaterial(this.loadEnd);
        }
    }
    renderUploadProgress = () => {
        if (!this.state.uploading) {
            return null;
        }
        return <div className="material-item">
            <div className="material-upload">
                <Progress className="material-progress" percent={this.state.uploadProgress} size="small" showInfo={false} strokeWidth={5} />
                {this.state.uploadProgress}%
            </div>
            <div className="material-upload-title">
                正在上传......
            </div>
            <style>{`
                .material-upload{
                    height: 110px;;
                    width: 147px;
                    color: #fff;
                    background: #000;
                    text-align: center;
                    line-height: 110px;
                }
                .material-upload-title{
                    height: 44px;
                    width: 147px;
                    color: #fff;
                    line-height: 44px;
                    text-indent: 8px;
                }
                .material-progress {
                    width: 74%;
                    margin-right: 4px;
                }
            `}</style>
        </div>
    }
    render(){
        return <div className="material-container" onScroll={this.onScrolld}>
                { this.renderAddNew() }
                {this.renderUploadProgress()}
                { this.renderMaterialItem()}
            <style>{`
                .material-item:hover {
                    box-shadow: 0 0 9px 6px rgba(255,255,255,0.50);
                }
                .material-container {
                    height: calc(100% - 40px);
                    width: 100%;
                    padding-left: 18px;
                    color: #fff;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: flex-start;
                    overflow-x: hidden;
                    overflow-y: auto;
                }
                .material-item.add{
                    cursor: pointer;
                }
                .material-item{
                    position: relative;
                    height: 154px;
                    width: 147px;
                    margin: 16px;
                    background: rgba(45,75,80,0.80);
                }
                .add-material{
                    cursor: pointer;
                }
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
                .name-edit{
                    padding-top: 8px;
                    height: 44px;
                }
                .video-name{
                    font-size: 12px;
                    color: #fff;
                    text-indent: 8px;
                    // margin-top: 8px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .video-detail{
                    font-size: 10px;
                    color: #818B8A;
                    text-indent: 8px;
                }
            `}</style>
        </div>
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
        // if (type.indexOf("image") >= 0 && (size > 1024 * 1024 * 10)) {
        //     message.warning("图片不能超过10M");
        //     return false;
        // }
        // if (type.indexOf("video" >= 0) && (size > 1024 * 1024 * 200)) {
        //     message.warning("视频不能超过200M");
        //     return false;
        // }
        // if (type.indexOf("audio") >= 0 && (size > 1024 * 1024 * 30)) {
        //     message.warning("音频不能超过30M");
        // }
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
        this.loadFirstPageMaterial();
        // this.props.loadMaterials({
        //     "type": "audio",
        //     "page": this.props.pagination.audioLibPage,
        //     "prepage": 20
        // });
        setTimeout(() => {
            this.setState({
                uploading: false
            });
        }, 50);
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
    loadFirstPageMaterial(){

    }
}

export default MaterialContainer;