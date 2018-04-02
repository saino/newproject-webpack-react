import React, {Component} from "react";
import { connect} from "react-redux"
import { bindActionCreators } from 'redux';
import AudioMaterial from "./audio-material";
import "./audio-container.css";
import AddMaterial from "../../statics/add-material.png";

import { message, Progress } from "antd";
import FileUpload from 'react-fileupload';
import { changeMaterial } from "../../../stores/reducers/material"

class AudioContainer extends Component {

    state = {
        uploading: false,
        uploadProgress: 0
    }
    getAudioMaterial(){
        const { material } = this.props;
        return material.reduce((audioMaterial, materialItem)=>{
            if(materialItem.type==='audio'){
                audioMaterial.push(materialItem);0
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

        const data = {
            "id": new Date().getTime(),
            "user_id": 52938,
            "type": "audio",
            "status": 22771,
            "path": "7Ak5CoLCfM",
            "name": "上传的de",
            "properties": {
                "length": 27145,
                "time": 1522141212838,
                "thumbnail": "B3IDRgiONk",
                "width": 30317,
                "height": 18410
            }
        }
        const { material } = this.props;

        const temMaterial = material.push(data);

        this.props.changeMaterial(temMaterial);

        this.setState({
            uploadProgress: 100,
            progressState: "success",
        });
        // this.props.onUploadMaterial(resp.data);
        setTimeout(() => {
            this.setState({
                uploading: false
            });
        }, 200);
    }
    //上传失败
    _handleUploadFailed = () => {
        const data = {
            "id": new Date().getTime(),
            "user_id": 52938,
            "type": "audio",
            "status": 22771,
            "path": "7Ak5CoLCfM",
            "name": "上传的de",
            "properties": {
                "length": 27145,
                "time": 1522141212838,
                "thumbnail": "B3IDRgiONk",
                "width": 30317,
                "height": 18410
            }
        }
        const { material } = this.props;
        
        const temMaterial = material.push(data);
        // material

        this.props.changeMaterial(temMaterial);
        // console.log("xxxxxxxxx");
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

    render() {

        const upLoadOptions = {
            baseUrl: `./aa/user/uploadMaterial`,
            paramAddToField: {
                work_id: "this.props.workId"
            },
            fileFieldName: "file",
            multiple: false,
            accept: 'audio/*',
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

        return <div className="audio-container">
            <div className="title-name">我的音频</div>
            <div className="audio-content">

                <FileUpload options={upLoadOptions} className="add-action">
                    <div ref="chooseAndUpload">
                        <div className="audio-item add-audio" onClick={this.onAddMaterialClick}>
                            <img src={AddMaterial} />
                        </div>
                    </div>
                </FileUpload>
                {
                    this.getAudioMaterial().map((material) => {
                        return <AudioMaterial key={material.id} model={material} />
                    })
                }
                {
                    this.renderProgress()
                }

                {/* <div className="audio-item add-audio" onClick={this.onAddMaterialClick}>
                    <img src={AddMaterial}/>
                </div>
                {
                    this.getAudioMaterial().map((material)=>{
                        return <AudioMaterial key={material.id} model={material} />
                    })
                } */}
                {/* <AudioMaterial/> */}
            </div>
            <style>{`
                .audio-container{
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
                
            `}</style>
        </div>
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

const mapStateToProps = ({material}) => {
    return {
        material
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMaterial: bindActionCreators(changeMaterial, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer);