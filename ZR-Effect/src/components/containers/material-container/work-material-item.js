import React, { Component } from "react";
import { Icon } from "antd";
import config from "../../../config";
// import download from "downloadjs";

class WorkMaterialItem extends Component{
    onClickDownload = () => {
        const { model } = this.props;
        window.open(`${config.fileUpload.host}:${config.fileUpload.port}${config.proxyTarget.path}/works/${model.id}/output.mp4?download=1`);
    }
    onClickEye = () => {
        const {model} = this.props;
        window.open(`${config.fileUpload.host}:${config.fileUpload.port}${config.proxyTarget.path}/works/${model.id}/output.mp4`);
    }
    onClickEdit = () => {
        this.props.history.push("/special-effec", {workId: this.props.model.id});
    }
    onClickDelete = () => {
        const { model } = this.props;
        this.props.onDeleClick(model);
    }
    renderPreView = () => {
        const { model } = this.props;
        if (model.build_job && model.build_job.status=="3"){
            return <Icon className="operation" type="eye-o" onClick={this.onClickEye} />;
        }
        return null;
    }
    renderDownLoad = () => {
        const { model } = this.props;
        if(model.build_job && model.build_job.status=="3"){
            return     <Icon className="operation" type="download" onClick={this.onClickDownload} />
        }
        return null;
    }
    render() {
        const { model } = this.props;
        return <div className="material-item">
            <div className="material-thumb">
                <img src={`${config.fileUpload.host}:${config.fileUpload.port}${config.proxyTarget.path}/works/${model.id}/thumb.jpg`} />
            </div>
            <div className="material-operation">
                {this.renderDownLoad()}
                {this.renderPreView()}
                <Icon className="operation" type="edit" onClick={this.onClickEdit}/>
                <Icon className="operation" type="delete" onClick={this.onClickDelete}/>
            </div>
            <div className="material-info">
                <div className="material-name">{ model.name }</div>
            </div>
            <style>{`
                .material-thumb{
                    height: 110px;
                    width: 100%;
                    background: #000;
                }
                .material-operation{
                    height: 20px;
                    width: 100%;
                    background: rgba(0,0,0,0.5);
                    position: absolute;
                    top: 90px;
                    text-align: right;
                }
                .operation{
                    margin-right: 10px;
                    cursor: pointer;
                }
                .material-info{
                    padding-left: 8px;
                    font-size: 12px;
                }
                .material-name{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    background: rgba(0,0,0,0);
                    border: none;
                    outline: none;
                }
                .material-detail{
                    color: #818B8A;
                }
            `}</style>
        </div>
    }
    

}

export default WorkMaterialItem;