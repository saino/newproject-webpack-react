import React, { Component } from "react";
import { Icon } from "antd";
import config from "../../../config";

class WorkMaterialItem extends Component{
    onClickDownload = () => {
        // console.log("download");
    }
    onClickEye = () => {
        // console.log("eye");
    }
    onClickEdit = () => {
        this.props.history.push("/special-effec", {workId: this.props.model.id});
        // console.log("edit");
    }
    onClickDelete = () => {
        const { model } = this.props;
        this.props.onDeleClick(model);
    }
    render() {
        const { model } = this.props;
        return <div className="material-item">
            <div className="material-thumb">
                <img src={`${config.fileUpload.host}:${config.fileUpload.port}${config.proxyTarget.path}/works/${model.id}/thumb.jpg`} />
            </div>
            <div className="material-operation">
                {/* <Icon className="operation" type="download" onClick={this.onClickDownload}/> 
                <Icon className="operation" type="eye-o" onClick={this.onClickEye}/>  */}
                <Icon className="operation" type="edit" onClick={this.onClickEdit}/>
                <Icon className="operation" type="delete" onClick={this.onClickDelete}/>
            </div>
            <div className="material-info">
                {/* <input className="material-name" value={model.name}></input> */}
                <div className="material-name">{ model.name }</div>
                {/* <div className="material-detail">作品描述。。。</div> */}
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