import React, {Component} from "react";
import { connect} from "react-redux"
import { bindActionCreators } from 'redux';
import config from '../../../config';
import AudioMaterial from "./audio-material";
import "./audio-container.css";
import AddMaterial from "../../statics/add-material.png";
import deleImg from "../../statics/dele.png";

import { message, Progress } from "antd";
import FileUpload from 'react-fileupload';
import { changeMaterial, loadMaterials } from "../../../stores/reducers/material"
import { setAudioLibPage } from "../../../stores/reducers/pagination";

class AudioContainer extends Component {
    bottomValueBUF = -1;
    state = {
        uploading: false,
        uploadProgress: 0,
        loading: false,
    }
    componentWillMount(){
        const { pagination } = this.props;
        if (pagination.audioLibPage === 1) {
            this.props.loadMaterials({
                "types": "audio",
                "page": pagination.audioLibPage,
                "perpage": 20
            });
        }
    }
    getAudioMaterial(){
        const { material } = this.props;
        return material.reduce((audioMaterial, materialItem)=>{
            if(materialItem.type==='audio'){
                audioMaterial.push(materialItem);
            }
            return audioMaterial;
        }, []);
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
        if (type.indexOf("image") >= 0 && (size > 1024 * 1024 * 10)) {
            message.warning("图片不能超过10M");
            return false;
        }
        if (type.indexOf("video" >= 0) && (size > 1024 * 1024 * 200)) {
            message.warning("视频不能超过200M");
            return false;
        }
        if (type.indexOf("audio") >= 0 && (size > 1024 * 1024 * 30)) {
            message.warning("音频不能超过30M");
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
            "type": "audio",
            "page": this.props.pagination.audioLibPage,
            "perpage": 20
        });
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
    onCloseClick = () => {
        this.props.changeaActiveContainer("stage");
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
    render() {
        const upLoadOptions = config.fileUpload.configureFileUpload({
            accept: 'audio/*',
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
        
        return <div className="audio-container">
            <div className="title-name">我的音频</div>
            <div className="close-container" onClick={this.onCloseClick}><img src={deleImg}></img></div>
            <div className="audio-content" onScroll={this.onScrolld}>

                <FileUpload options={upLoadOptions} className="add-action">
                    <div ref="chooseAndUpload">
                        <div className="audio-item add-audio" onClick={this.onAddMaterialClick}>
                            <img src={AddMaterial} />
                        </div>
                    </div>
                </FileUpload>
                {
                    this.renderUploadProgress()
                }
                {
                    this.getAudioMaterial().map((material) => {
                        return <AudioMaterial changeaActiveContainer={this.props.changeaActiveContainer} key={material.id} model={material} />
                    })
                }
                {/* {
                    this.renderProgress()
                } */}
            </div>
            <style>{`
                .audio-container{
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
                .audio-content{
                    padding: 0 3px 16px;
                    height: calc(100% - 56px);
                    width: 100%;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: flex-start;
                    overflow-x: hidden;
                    overflow-y: auto;
                }
                .add-audio{
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
        const { offsetHeight, scrollHeight, scrollTop } = target;
        const bottomValue = scrollHeight - scrollTop - offsetHeight;
        //如果是向下滑动则不处理
        if (this.bottomValueBUF !== -1 && this.bottomValueBUF <= bottomValue) {
            this.bottomValueBUF = bottomValue;
            return;
        }
        this.bottomValueBUF = bottomValue;
        if (bottomValue < 50 && !this.state.loading){
            this.state.loading = true;
            const types = "audio";
            const pageNum = this.props.pagination.audioLibPage + 1;
            this.props.loadMaterials({
                "types": types,
                "page": pageNum,
                "perpage": config.page.size
            }, (resp) => {
                setTimeout(() => {
                    this.setState({
                        loading: false
                    });
                }, 500);
                const materials = resp.result;
                if (materials.length === config.page.size) {
                    this.props.setAudioLibPage(pageNum);
                }
            });
        }

    }
    renderProgress = () => {
        if (this.state.uploading) {
            return <div className='upload-progress'>
                <Progress type="circle" status={this.state.progressState} percent={this.state.uploadProgress} width={111} />
            </div>
        }
        return null;
    }

}

const mapStateToProps = ({ material, pagination}) => {
    return {
        material,
        pagination
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMaterial: bindActionCreators(changeMaterial, dispatch),
        loadMaterials: bindActionCreators(loadMaterials, dispatch),
        setAudioLibPage: bindActionCreators(setAudioLibPage, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer);