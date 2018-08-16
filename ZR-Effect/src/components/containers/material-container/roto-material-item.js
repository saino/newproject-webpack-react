import React, { Component } from "react";
import { Icon } from "antd";
import config from "../../../config";

class RotoMaterialItem extends Component {
    constructor() {
        super();
        this.state = {
            showUse: false
        }
    }
    onShowUse = () => {
        this.setState({
            showUse: true
        });
    }
    onHideUse = () => {
        this.setState({
            showUse: false
        });
    }
    onDeleClick = () => {
        const { model } = this.props;
        this.props.onDeleClick(model);
    }
    onEditClick = () => {
        const { model } = this.props;
        this.props.history.push(`/roto?rotoId=${ model.id }`, { rotoId: model.id });
    }
    render() {
        const { model } = this.props;
        const useClass = "material-use " + (this.state.showUse ? "show" : "hide");
        return <div className="material-item" onMouseOver={this.onShowUse} onMouseOut={this.onHideUse}>
            <div className="material-thumb">
                <img src={`${config.fileUpload.host}:${config.fileUpload.port}${config.proxyTarget.path}/materials/${model.material_id}/thumb.jpg`} />
            </div>
            {/* <div className="material-operation">
                <Icon className="operation" type="download" onClick={this.onClickDownload} />
                <Icon className="operation" type="eye-o" onClick={this.onClickEye} />
                <Icon className="operation" type="edit" onClick={this.onClickEdit} />
                <Icon className="operation" type="delete" onClick={this.onClickDelete} />
            </div>*/}
            <div className="material-info">
                <div className="material-name">{model.material.name}</div>
            </div>
            <div className={useClass}>
                <div className="use-item" onClick={this.onEditClick}>编辑</div>
                <div className="use-item" onClick={this.onDeleClick}>删除</div>
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
                .material-use{
                    position: absolute;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    color: #fff;
                    width: 100%;
                    height: 44px;
                    line-height: 44px;
                    text-align: center;
                    font-size: 16px;
                }
                .show{
                    display: flex;
                    justify-content: space-around;
                }
                .hide{
                    display: none;
                }
                .use-item{
                    cursor: pointer;
                }
            `}</style>
        </div>
    }


}

export default RotoMaterialItem;
