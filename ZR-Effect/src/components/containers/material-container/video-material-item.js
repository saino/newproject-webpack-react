import React, { Component } from "react";
import { Icon } from "antd";
import config from "../../../config";
import moment from "moment";
import PreView from "../../../views/components1/ui-layout/pre-view";
import AlertView from "./alert-view";

class VideoMaterialItem extends Component {
    constructor() {
        super();
        this.state = {
            showUse: false
        }
    }
    showTime = () => {
        const { model } = this.props;
        const { properties } = model;
        if (model.type === "image") {
            return "";
        }

        const formatTime = moment.duration(properties.duration * 1000);
        return `${formatTime.hours() < 10 ? "0" + formatTime.hours() : formatTime.hours()} :
                ${formatTime.minutes() < 10 ? "0" + formatTime.minutes() : formatTime.minutes()} :
                ${formatTime.seconds() < 10 ? "0" + formatTime.seconds() : formatTime.seconds()}`;

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
    onPreViewClick = () => {
        AlertView.render(<PreView model={this.props.model} />);
    }
    onDeleClick = () => {
        const { model } = this.props;
        this.props.onDeleClick(model);
    }
    render() {
        const { model } = this.props;
        const { properties } = model;
        const useClass = "material-use " + (this.state.showUse ? "show" : "hide");
        return <div className="material-item" onMouseOver={this.onShowUse} onMouseOut={this.onHideUse}>
            <div className="material-thumb">
                <img src={`${config.fileUpload.host}:${config.fileUpload.port}${config.proxyTarget.path}/materials/${model.id}/thumb.jpg`} />
            </div>
            <div className="name-edit" onMouseOver={this.onNameMouseOver}>
                <div className="video-name">{model.name}</div>
                <div className="video-detail">{`
                    ${properties.format} 
                    ${Math.round(properties.filesize / 1024)}K 
                    ${this.showTime()}
            `}</div>
            </div>
            <div className={useClass}>
                <div className="use-item" onClick={this.onPreViewClick}>预览</div>
                {/* <div className="use-item" onClick={this.onUseClick}>使用</div> */}
                <div className="use-item" onClick={this.onDeleClick}>删除</div>
            </div>
            <style>{`
                .material-item:hover {
                    box-shadow: 0 0 9px 6px rgba(255,255,255,0.50);
                }
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

export default VideoMaterialItem;